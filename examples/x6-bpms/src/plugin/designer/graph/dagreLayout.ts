import { Edge, Node } from "@antv/x6";
import dagre from 'dagre';

/**
 * dagre 布局
 * @param nodes
 * @param edges 
 * @param groupId 
 * @returns 
 */
export default function dagreLayout(nodes: Node[], edges: Edge[], groupId: string = '') {
  const padding = 10;
  const nodesep = 20;
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    ranksep: 50,
    nodesep
  });
  g.setDefaultEdgeLabel(function() { return {}; });

  // group 内的 nodes
  const groupNodes = nodes.filter(n => (n.parent?.id || '') === groupId);
  const groupEdges = edges.filter(edge => groupNodes.find(n => n.id === edge.source?.cell || n.id === edge.target?.cell));

  // group 内的 edge
  groupEdges.forEach(edge => {
    g.setEdge(edge.source?.cell, edge.target?.cell);
  });

  for (const node of groupNodes) {
    const hasSub = nodes.find(n => n.parent?.id === node.id);
    if (hasSub) {
      // 动态计算节点宽度
      const layout = dagreLayout(nodes, edges, node.id);
      node.size({
        width: layout.width! + padding * 2,
        height: layout.height! + padding * 2
      });
      const { width, height } = node.size();
      g.setNode(node.id, { width, height });
    } else {
      const { width, height } = node.size();
      g.setNode(node.id, { width, height });
    }
  }
  dagre.layout(g);

  groupNodes.forEach(node => {
    const position = g.node(node.id);
    const { width, height } = node.size();
    let _position = {
      x: position.x - width / 2,
      y: position.y - height / 2,
    };
    if (groupId !== '') {
      _position = {
        x: position.x - width / 2 + padding,
        y: position.y - height / 2 + padding
      }
    } 
    node.position(_position.x, _position.y, {
      // 用相对坐标
      relative: true,
      deep: true
    });
  });
  return {
    nodes,
    edges,
    width: g.graph().width,
    height: g.graph().height
  };
}