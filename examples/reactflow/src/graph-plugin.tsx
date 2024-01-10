import React, { useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  Edge,
  Node,
  OnSelectionChangeParams,
} from 'reactflow';
import { PluginConfig, skeleton, workspace } from 'graphix-engine';
import 'reactflow/dist/style.css';

// 从 docment 模型数据中获取转换成 reacflow 渲染需要的数据
const getModelFromDoc = () => {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  const doc = workspace.getDocument();
  for (const n of doc.getNodes()) {
    if (n.getType() === 'node') {
      nodes.push({ id: n.getId(), position: n.getPropData('position'), data: n.getPropsData() });
    } else {
      edges.push({ id: n.getId(), source: n.getPropData('source'), target: n.getPropData('target') });
    }
  }
  return { nodes, edges };
};

// 画布
function GraphView() {
  const doc = workspace.getDocument();
  const { nodes: initialNodes, edges: initialEdges } = getModelFromDoc();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 监听 document 模型数据变化，同步渲染
  useEffect(() => {
    const unsubscribe = doc.getTimeline().onStateChange((state) => {
      const { nodes: curNodes, edges: curEdges } = getModelFromDoc();
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
    doc.getSelection().setKeys(nodes.map((n) => n.id));
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

// graph 插件
export default function (): PluginConfig {
  return {
    name: 'graph-plugin',
    init() {
      skeleton.add({ area: 'mainArea', content: GraphView });
    },
  };
}
