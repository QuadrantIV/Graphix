# Graphix

Graphix 是一个可快速构建和扩展的图形编辑器研发框架，面向图形编辑器场景提供一套通用的模型和骨架视图。可以轻松通过扩展插件和组件来组合生成任意图形编辑器（流程图编辑器，3D 编辑器等等）

简体中文 | [English](./README-EN.md)

## ✨ 特性

- 🧱 基于 MVC 架构模式，提供一套通用的编辑器模型和骨架视图，框架与渲染无关，你可以适配任意你需要的图形渲染引擎。
- 🧩 极易扩展，通过扩展自定义插件和组件即可组合出任意图形编辑器。
- 🔌 简洁易用的 API 设计。

## 🔍 名词解释
| 名词         | 术语                                                       |
| ------------ | ---------------------------------------------------------- |
| 骨架（Skeleton） | Topbar，Toolbar，MainArea, LeftArea，RightArea                |
| 插件（Plugin）   | 通常用于扩展编辑器各面板展示                                       |
| 原型（Prototype）| 用于描述可从 LeftArea 拖拽出使用的最小单元组件，描述包含该组件的 view，设置面板等信息 |
| 渲染引擎       | 用于中心区域的画布渲染，常见引擎有：Dom，AntV X6/G6/G，Three.js，Pixi.js。 |

## 🎬 Demo
### [Bpm 场景](./examples/bpms/)（graphix + antv x6）
![](https://img.alicdn.com/imgextra/i4/O1CN01Mi0IFn1jgm6RmetQW_!!6000000004578-1-tps-1792-890.gif)

### 3D 场景
todo

## 🚀 快速开始
```bash
npm install graphix-engine --save-dev
```

```ts
import { init, pluginRegistry, skeleton } from 'graphix-engine';
import 'graphix-engine/dist/index.css';

pluginRegistry.register(() => ({
  name: 'brand',
  init() {
    skeleton.add({
      area: 'topbar',
      align: 'left',
      content: <div>这是一个超帅的标题</div>,
    });
  },
}));

init({
  schema: {},
});
```

## 📖 文档
todo

## 💻 本地调试

```bash
$ npm install
$ npm run bootstrap

// 选择合适的 demo 启动
$ npm run example-bpms
```

## 👥 贡献

欢迎所有形式的贡献，无论是新功能，bug修复，文档改进或是其他类型的更新。

强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。（此段参考 [antd](https://github.com/ant-design/ant-design)）

关于提交 PR：
请将目标合并分支设置为 **develop**，不要指定 **main** 分支，在发布正式版本后，develop 分支将会合入 main 分支。

## 📄 许可证

Graphix 是在 MIT 许可证下发布的。有关详细信息，请阅读许可证文件。
