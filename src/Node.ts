import Edge from './Edge';
import Vector from './Vector';

type NodeOption = {
  radius: number;
  /**
   * 圆心坐标
   */
  position: Vector;
  /**
   * 速度
   */
  velocity: Vector;
  /**
   * 加速度
   */
  accelerate: Vector;
};
class Node {
  private id: string;
  position = Vector.create();
  radius = 20;
  velocity = Vector.create();
  accelerate = Vector.create();
  force = Vector.create();
  M = 1;
  Q = 128;
  edges: Edge[] = [];

  constructor(id: string, x: number, y: number) {
    this.position.set(x, y);
    this.id = id;
  }

  update = (time: number) => {
    // 加速度 F = ma
    this.force.scale(1 / this.M, this.accelerate);

    // 速度 V = V0 + at
    const v = Vector.create();
    this.accelerate.scale(time / 1000, v);
    this.velocity.add(v);

    // 位置 P = P0 + Vt
    const distance = Vector.create();
    this.velocity.scale(time / 1000, distance);
    this.position.add(distance);
  };

  render = (ctx: CanvasRenderingContext2D) => {
    const { x, y } = this.position;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#F90';
    ctx.fill();
    ctx.closePath();
  };

  calculateDistance(otherNode: Node) {
    const { x: x1, y: y1 } = this.position;
    const { x: x2, y: y2 } = otherNode.position;
    const distX = x1 - x2;
    const distY = y1 - y2;
    return {
      distX: distX,
      distY: distY,
      distance: Math.sqrt(x1 * x1 + y1 * y1),
    };
  }

  getId = () => this.id;

  getEdges = () => this.edges;
}

export default Node;
