import { init, skeleton } from 'graphix-engine';
import Flow from './flow';

skeleton.add({
  area: 'mainArea',
  content: Flow
});

init({
  schema: {
    // id
    id: 'd94bc0d46131c',
    // 类型
    type: 'Demo',
    // 版本
    version: '1.0.0',
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