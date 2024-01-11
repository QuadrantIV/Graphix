import React, { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background, BackgroundVariant, Edge, Node, OnSelectionChangeParams } from 'reactflow';
import { getContext } from 'graphix-engine';
import 'reactflow/dist/style.css';

// 从 graphix context 模型数据中获取转换成 reacflow 渲染需要的数据
const getDataFromContext = () => {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  for (const n of getContext().getNodes()) {
    if (n.getType() === 'node') {
      nodes.push({ id: n.getId(), position: n.getPropData('position'), data: n.getPropsData() });
    } else {
      edges.push({ id: n.getId(), source: n.getPropData('source'), target: n.getPropData('target') });
    }
  }
  return { nodes, edges };
};

// reactflow 画布
export default function Flow() {
  const context = getContext();
  const { nodes: initialNodes, edges: initialEdges } = getDataFromContext();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 监听 context 模型数据变化，同步渲染
  useEffect(() => {
    const unsubscribe = context.getTimeline().onStateChange((state) => {
      const { nodes: curNodes, edges: curEdges } = getDataFromContext();
      setNodes(curNodes);
      setEdges(curEdges);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  // selection 选区管理
  const onSelectionChange = (changes: OnSelectionChangeParams) => {
    const { nodes } = changes;
    context.getSelection().setKeys(nodes.map((n) => n.id));
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#fafafa' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange}
      >
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
