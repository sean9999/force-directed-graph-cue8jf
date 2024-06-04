// Import stylesheets
import { ForceDirected, ForceDirectedNode, ForceDirectedEdge } from './src';
import { edges, nodes } from './src/mock';
import './style.css';
// Write TypeScript code!

const $canvas = document.querySelector<HTMLCanvasElement>('#canvas');
const canvasCtx = $canvas.getContext('2d');

$canvas.width = $canvas.clientWidth * window.devicePixelRatio;
$canvas.height = $canvas.clientHeight * window.devicePixelRatio;
canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio); //设置缩放比例，防止高清屏模糊

const fd = new ForceDirected(nodes, edges, {
  animation: true,
  width: 1000,
  height: 600,
  repulsion: 30,
  traction: 2,
  gravitation: 1,
  damping: 1,
  edgeLength: 80,
  tickInterval: (1000 / 60) * 8,
  maxSpeed: 1000,
});

fd.register('render', (data) => {
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
  data.edges.forEach((edge: ForceDirectedEdge) => {
    const source = edge.getSource();
    const target = edge.getTarget();
    const sx = source.position.getX();
    const sy = source.position.getY();
    const tx = target.position.getX();
    const ty = target.position.getY();
    canvasCtx.beginPath();
    canvasCtx.moveTo(sx, sy);
    canvasCtx.lineTo(tx, ty);
    canvasCtx.strokeStyle = '#666';
    canvasCtx.stroke();
  });
  data.nodes.forEach((node: ForceDirectedNode) => {
    const { x, y } = node.position;
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, node.radius, 0, Math.PI * 2);
    canvasCtx.fillStyle = '#333';
    canvasCtx.fill();
    canvasCtx.closePath();
  });
});

fd.start();
