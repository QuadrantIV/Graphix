import { init, prototypeRegistry, skeleton } from 'graphix-engine';
import Scene from './scene';
import InputSetter from './setter/input-setter';

// 配置 mesh 类型节点设置器
prototypeRegistry.register({
  type: 'mesh',
  settings: [
    {
      target: 'data',
      setter: InputSetter
    }
  ]
});

skeleton.add({
  area: 'mainArea',
  content: Scene
});

init({
  schema: {
    id: 'd94bc0d46131c',
    type: 'Demo',
    version: '1.0.0',
    props: {}, // 全局属性
    nodes: [ // 节点集合
      {
        id: '1',
        type: 'mesh',
        props: {
          position: { x: -20, y: 0, z: 20 },
          size: { width: 10, height: 10, depth: 10 },
          data: 1
        },
      },
      {
        id: '2',
        type: 'mesh',
        props: {
          position: { x: 0, y: 0, z: 0 },
          size: { width: 10, height: 10, depth: 10 },
          data: 2
        },
      },
      {
        id: '3',
        type: 'mesh',
        props: {
          position: { x: 20, y: 0, z: -20 },
          size: { width: 10, height: 10, depth: 10 },
          data: '3'
        },
      },
    ],
  }
});