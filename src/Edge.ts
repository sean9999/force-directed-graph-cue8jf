import Node from './Node';

class Edge {
  private source: Node;
  private target: Node;
  constructor(source: Node, target: Node) {
    this.source = source;
    this.target = target;
  }

  getSource = () => this.source;

  getTarget = () => this.target;
}

export default Edge;
