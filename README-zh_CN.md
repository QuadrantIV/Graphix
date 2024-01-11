# [Graphix](https://graphix-editor.github.io/graphix-docs/)
一个轻量级、可插拔、OOP 式图形编辑器开发引擎。

简体中文 | [English](./README.md)

## ✨ 特性
- 💡 领域驱动设计：基于 TypeScript 的 OOP 式编辑器领域模型，提供完整的数据服务支持，包括撤销/重做机制和选区管理等功能。
- 🎨 用户界面：提供高度可定制的响应式视图框架 Skeleton View，以满足不同的界面需求。
- 🧩 可扩展架构：基于插件的体系结构允许无缝扩展编辑器功能，无需更改任何核心代码，使得功能增加更加灵活和便捷。

## 🔍 名词解释
| 名词         | 说明                                                       |
| ------------ | ---------------------------------------------------------- |
| 骨架（Skeleton） | Topbar，Toolbar，MainArea, LeftArea，RightArea ![](https://img.alicdn.com/imgextra/i2/O1CN019QcFzr1GdSNRsXzXC_!!6000000000645-2-tps-3584-1854.png)                |
| 插件（Plugin）   | 通常用于扩展编辑器骨架各面板展示                                       |
| 原型（Prototype）| 节点原型描述，用于描述编辑器不同类型图形节点的 视图、属性设置器、默认属性值等等 |
| 设置器（Setting）| 用于描述图形节点的属性如何配置                                      |
| 图形渲染引擎       | 用于中心区域的图形画布渲染，常见 2d/3d 渲染库：three.js, babylon.js，reactflow，d3 等等 |

## 📚 架构
![](https://img.alicdn.com/imgextra/i2/O1CN01ZdMroZ1OVgaRB2RNq_!!6000000001711-2-tps-1600-1082.png)

## 🎬 Demo
- [example-x6-bpms](https://graphix-editor.github.io/graphix-docs/example-bpms)
- example-reactflow
- example-threejs-3d （wip）

## 🚀 快速开始
Graphix 与图形渲染无关，可以根据场景适配任意需要的图形渲染引擎，这里用 reactflow 举 🌰。
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

## 💻 本地调试

```bash
$ npm install
$ npm run bootstrap

// 选择合适的 demo 启动
$ npm run example-x6-bpms
$ npm run example-reactflow
```

## 🤝 贡献

欢迎所有形式的贡献，无论是新功能，bug修复，文档改进或是其他类型的更新。

强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

关于提交 PR：
请将目标合并分支设置为 **develop**，不要指定 **main** 分支，在发布正式版本后，**develop** 分支将会合入  **main** 分支。

## 📄 许可证

Graphix 是在 MIT 许可证下发布的。有关详细信息，请阅读许可证文件。