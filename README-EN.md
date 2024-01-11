> Translate by chatGPT
# [Graphix](https://graphix-editor.github.io/graphix-docs/)
A lightweight, pluggable, OOP-style graphics editing engine.

[简体中文](./README.md) | English

## ✨ Features
- 💡 Domain-Driven Design: An OOP-style editor domain model based on TypeScript, providing complete data service support, including undo/redo mechanisms and selection management, among other features.
- 🎨 User Interface: Offers a highly customizable, responsive view framework called Skeleton View, tailored to meet diverse interface requirements.
- 🧩 Extensible Architecture: A plugin-based architecture allows for seamless expansion of editor capabilities without the need to alter any core code, making the addition of functions more flexible and convenient.

## 🔍 Glossary
| Term              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Skeleton          | Topbar, Toolbar, MainArea, LeftArea, RightArea               |
| Plugin            | Typically used to extend the display of various panels in the editor |
| Prototype         | Description of node prototypes, used to describe the view, attribute setters, default attribute values, etc. for different types of graphic nodes in the editor |
| Setting          | Used to describe how to configure the properties of graphic nodes    |
| Rendering Engine  | Used for rendering the graphic canvas in the central area, common 2D/3D rendering libraries: three.js, babylon.js, reactflow, d3, etc. |

## 📚 Architecture
![](https://img.alicdn.com/imgextra/i2/O1CN01ZdMroZ1OVgaRB2RNq_!!6000000001711-2-tps-1600-1082.png)

## 🎬 Demo
- [example-x6-bpms](https://graphix-editor.github.io/graphix-docs/example-bpms)
- example-reactflow
- example-threejs-3d （wip）

## 🚀 Getting Started
Graphix is independent of graphic rendering and can adapt to any required graphic rendering engine based on the scenario. Here is an example with reactflow.
```bash
npm install graphix-engine reactflow --save-dev
```

```ts
// flow.tsx
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
```
```ts
// index.ts
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
```

## 💻 Local Development

```bash
$ npm install
$ npm run bootstrap

// Choose the appropriate demo to start
$ npm run example-x6-bpms
$ npm run example-reactflow
```

## 👥 Contributing

We welcome all forms of contribution, whether it's new features, bug fixes, documentation improvements or other types of updates.

Strongly recommend reading [《The Wisdom of Asking Questions》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way), [《How to Ask Questions to the Open Source Community》](https://github.com/seajs/seajs/issues/545) and [《How to Report Bugs Effectively》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html), [《How to Submit Unanswerable Questions to Open Source Projects》](https://zhuanlan.zhihu.com/p/25795393), better questions are easier to get help. 

Regarding submitting PRs:
Please set the target merge branch to develop, not main. The develop branch will be merged into the main branch after the official version is released.

## 📄 License

Graphix is released under the MIT License. For more details, please read the license file.
