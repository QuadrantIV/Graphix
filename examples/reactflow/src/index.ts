import { init, pluginRegistry } from 'graphix-engine';
import Graph from './graph-plugin';

pluginRegistry.register(Graph);

init({
  schema: {
    // id
    id: 'd94bc0d46131c',
    // 文档类型
    documentType: 'Demo',
    // 文档版本
    documentVersion: '1.0.0',
    // 全局属性
    props: {},
    // 节点集合
    nodes: [
      {
        id: '1',
        type: 'node',
        props: { label: 'node1', position: { x: 200, y: 200 } },
      },
      {
        id: '2',
        type: 'node',
        props: { label: 'node2',  position: { x: 200, y: 300 } },
      },
      {
        id: '3',
        type: 'edge',
        props: { label: 'edge1', source: '1', target: '2' },
      }
    ],
  }
});