import Edge from './Edge';
import Node from './Node';
import Vector from './Vector';

type ForceDirectedOption = {
  width: number;
  height: number;
  /**
   * 斥力常数，[10,50]
   */
  repulsion: number;
  /**
   * 吸引力常数，[0.5,2.5]
   */
  traction: number;
  /**
   * 中心引力常数，[0,1]
   */
  gravitation: number;
  /**
   * 阻尼系数，[0.1,0.9]
   */
  damping: number;
  /**
   * 连线长度，[30,200]
   */
  edgeLength: number;
  /**
   * 是否开启动画
   */
  animation: boolean;
  /**
   * 切片时间
   */
  tickInterval: number;
  /**
   * 最大速度
   */
  maxSpeed: number;
};

const defaultOption: ForceDirectedOption = {
  width: 1000,
  height: 600,
  repulsion: 30,
  traction: 2,
  gravitation: 1,
  damping: 1,
  edgeLength: 80,
  animation: true,
  tickInterval: (1000 / 60) * 8,
  maxSpeed: 1000,
};

type Registers = {
  render: (params: any) => any;
};

class ForceDirected {
  static CANVAS_WIDTH = 1000;
  static CANVAS_HEIGHT = 600;
  private centerPosition: Vector;
  private nodes: Node[] = [];
  private nodesMap: Map<string, Node> = new Map();
  private edgesMap: Map<string, string[]> = new Map();
  private edges: Edge[] = [];
  private options = defaultOption;
  private registers = new Map<keyof Registers, (params: any) => any>();
  done = false;
  raf = 0;
  constructor(
    nodes: Node[],
    edges: Edge[],
    ops: Partial<ForceDirectedOption> = {}
  ) {
    if (!nodes.length) throw new Error('nodes is empty');
    this.options = Object.assign(this.options, ops);
    const { width, height } = this.options;
    this.nodes = nodes;
    this.edges = edges;
    this.centerPosition = new Vector(width / 2, height / 2);

    this.nodes.forEach((node) => {
      this.nodesMap.set(node.getId(), node);
    });

    this.edges.forEach((edge) => {
      const source = edge.getSource();
      const target = edge.getTarget();
      this.nodesMap.get(source.getId())?.getEdges().push(edge);
      this.nodesMap.get(target.getId())?.getEdges().push(edge);
    });
  }

  register = (type: keyof Registers, func: (params: any) => any) => {
    this.registers.set(type, func);
  };

  start = () => {
    const { animation } = this.options;
    this.init();
    if (animation) {
      this.animate();
    } else {
      this.silent();
    }
  };

  stop = () => {
    this.done = true;
    this.cancelAnimationFrame(this.raf);
  };
  init = () => {
    const { width, height } = this.options;

    const nodeLength = this.nodes.length;
    this.nodes.forEach((node, index) => {
      const center = [width / 2, height / 2];
      const radius = 100;
      const angle = (index / nodeLength) * Math.PI * 2;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);

      if (node.position.x === 0 && node.position.y === 0) {
        node.position.set(x, y);
      }
    });
  };

  animate = () => {
    const animationFrameCallback = () => {
      this.tick();
      this.render();

      if (!this.done) {
        this.raf = this.requestAnimationFrame(animationFrameCallback);
      }
    };
    // animationFrameCallback();
    this.raf = this.requestAnimationFrame(animationFrameCallback);
  };

  silent = () => {
    for (let i = 0; i < 500; i++) {
      this.tick();
    }
    this.render();
  };

  // 斥力计算 库伦定律：F = (Q1 * Q2) / (distance ** 2) * k
  computeCoulombForce = () => {
    const { repulsion } = this.options;
    const nodesLength = this.nodes.length;
    for (let i = 0; i < nodesLength; i++) {
      const source = this.nodes[i];

      for (let j = i; j < nodesLength; j++) {
        const target = this.nodes[j];
        if (source === target) continue;
        let distance = source.position.distance(target.position);
        distance = distance < 50 ? 50 : distance;
        const f = ((source.Q * target.Q) / distance ** 2) * repulsion;

        const sourceUnit = Vector.create();
        const targetUnit = Vector.create();
        Vector.subtract(sourceUnit, source.position, target.position);
        Vector.subtract(targetUnit, target.position, source.position);
        sourceUnit.normalize();
        targetUnit.normalize();
        source.force.add(sourceUnit.scale(f));
        target.force.add(targetUnit.scale(f));
      }
    }
  };

  // 中心引力计算 胡克定律：F = k * (distance - r)
  computeTractionForce = () => {
    const { edgeLength, traction } = this.options;
    this.edges.forEach((edge) => {
      const source = edge.getSource();
      const target = edge.getTarget();
      const distance = source.position.distance(target.position);
      const length = distance - edgeLength > 0 ? distance - edgeLength : 0;
      const f = traction * length;

      const sourceUnit = Vector.create();
      const targetUnit = Vector.create();
      Vector.subtract(sourceUnit, target.position, source.position);
      Vector.subtract(targetUnit, source.position, target.position);
      sourceUnit.normalize();
      targetUnit.normalize();

      source.force.add(sourceUnit.scale(f));
      target.force.add(targetUnit.scale(f));
    });
  };

  // 中心引力计算 胡克定律：F = k * (distance - r)
  computeGravitationForce = () => {
    const { gravitation } = this.options;
    this.nodes.forEach((node) => {
      const distance = node.position.distance(this.centerPosition);
      const f = gravitation * distance;

      const unit = Vector.create();
      Vector.subtract(unit, this.centerPosition, node.position);
      unit.normalize();

      const gravitationForce = Vector.create();
      Vector.scale(gravitationForce, unit, f);
      node.force.add(gravitationForce);
    });
  };

  // 阻尼力计算：F = k * v
  computeDampingForce = () => {
    const { damping } = this.options;

    this.nodes.forEach((node) => {
      const v = node.velocity.length();
      const f = damping * v;
      const unit = Vector.create();
      Vector.negate(unit, node.velocity);
      unit.normalize();

      const dampingForce = Vector.create();
      Vector.scale(dampingForce, unit, f);

      node.force.add(dampingForce);
    });
  };

  // 更新位置和速度
  updateNode = () => {
    const { tickInterval, maxSpeed } = this.options;
    this.nodes.forEach((node) => {
      // 根据合力计算节点加速度 F = ma

      node.force.scale(1 / node.M, node.accelerate);

      // 速度 V = V0 + at
      const v = Vector.create();
      node.accelerate.scale(tickInterval / 1000, v);
      node.velocity.add(v);

      if (node.velocity.length() > maxSpeed) {
        node.velocity.normalize().scale(maxSpeed);
      }

      // 位置 P = P0 + Vt
      const distance = Vector.create();
      node.velocity.scale(tickInterval / 1000, distance);
      node.position.add(distance);
      node.force.set(0, 0);
    });
  };

  tick = () => {
    this.computeCoulombForce();
    this.computeTractionForce();
    this.computeGravitationForce();
    this.computeDampingForce();
    this.updateNode();
  };

  render = () => {
    const render = this.registers.get('render');
    if (render) {
      render({
        nodes: this.nodes,
        edges: this.edges,
      });
    } else {
      throw new Error('need a render function');
    }
  };

  getNodes() {
    return this.nodes;
  }

  requestAnimationFrame = (fn: FrameRequestCallback) => {
    return window.requestAnimationFrame(fn);
  };

  cancelAnimationFrame = (handleId: number) => {
    window.cancelAnimationFrame(handleId);
  };
}

export default ForceDirected;
