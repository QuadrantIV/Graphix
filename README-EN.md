> Translate by chatGPT
# Graphix
Graphix is a rapidly constructible and extensible graphical editor development framework, offering a universal model and a set of scaffold views for graphic editor scenarios. It allows for the easy composition of any graphic editor (e.g., flowchart editor, 3D editor, etc.) by extending plugins and components.

[简体中文](./README.md) | English

## ✨ Features
- 🧱 Based on the MVC architectural pattern, it provides a universal editor model and scaffold views, framework-independent rendering, enabling you to adapt any graphic rendering engine of your choice.
- 🧩 Highly extensible, effortlessly combining any graphic editor by extending custom plugins and components.
- 🔌 Clean and user-friendly API design.

## 🔍 Glossary
| Term              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Skeleton          | Topbar, Toolbar, MainArea, LeftArea, RightArea               |
| Plugin            | Typically used to expand the display of various panels within the editor |
| Prototype         | Describes the smallest unit component that can be dragged from the LeftArea, including the view of the component, settings panel, etc. |
| Rendering Engine  | Used for canvas rendering in the central area, common engines include: Dom, AntV X6/G6/G, Three.js, Pixi.js. |

## 🎬 Demo
### [BPM Scenario](https://graphix-editor.github.io/Graphix/) (graphix + antv x6)
[![](https://img.alicdn.com/imgextra/i4/O1CN01Mi0IFn1jgm6RmetQW_!!6000000004578-1-tps-1792-890.gif)](./examples/bpms/)
### 3D Scenario
todo

## 🚀 Getting Started
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

## 📖 Documentation
todo

## 💻 Local Debugging

```bash
$ npm install
$ npm run bootstrap

// Launch the appropriate demo
$ npm run example-bpms
```

## 👥 Contributing

We welcome all forms of contribution, whether it's new features, bug fixes, documentation improvements or other types of updates.

Strongly recommend reading [《The Wisdom of Asking Questions》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way), [《How to Ask Questions to the Open Source Community》](https://github.com/seajs/seajs/issues/545) and [《How to Report Bugs Effectively》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html), [《How to Submit Unanswerable Questions to Open Source Projects》](https://zhuanlan.zhihu.com/p/25795393), better questions are easier to get help. (This paragraph refers to [antd](https://github.com/ant-design/ant-design))

Regarding submitting PRs:
Please set the target merge branch to develop, not main. The develop branch will be merged into the main branch after the official version is released.

## 📄 License

Graphix is released under the MIT License. For more details, please read the license file.
