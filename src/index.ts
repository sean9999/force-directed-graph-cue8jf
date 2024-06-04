import ForceDirected from './ForceDirected';
import ForceDirectedNode from './Node';
import ForceDirectedEdge from './Edge';

// interface ForceDirected extends ForceDirectedController {
//   Node: typeof ForceDirectedNode;
//   Edge: typeof ForceDirectedEdge;
// }
// const ForceDirected = ForceDirectedController as unknown as ForceDirected;
// ForceDirected.Node = ForceDirectedNode;
// ForceDirected.Edge = ForceDirectedEdge;

export { ForceDirected, ForceDirectedNode, ForceDirectedEdge };
