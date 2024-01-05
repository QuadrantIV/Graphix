# Graphix

Graphix is a highly adaptable graphic editor development framework designed for quick construction and scalability. It offers a universal model and skeleton views for graphic editor scenarios, allowing for the easy creation of any type of graphic editor (flowchart editor, 3D editor, etc.) through the extension of plugins and components.

English | [简体中文](./README-zh_CN.md)

## ✨ Features

- 🧱 Based on the MVC architecture pattern, it provides a set of common editor models and skeleton views. The framework is rendering agnostic, meaning you can adapt it to any graphic rendering engine you need.
- 🧩 Highly extensible, you can combine any graphic editor by extending custom plugins and components.
- 🔌 Simple and user-friendly API design.

## 🚀 Getting Started
```bash
npm install graphix-engine --save-dev
```

```ts
import { init, pluginRegistry, skeleton } from 'graphix-engine';

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

## Demo
### BPM scenario (graphix + antv x6)
[![](https://img.alicdn.com/imgextra/i4/O1CN01Mi0IFn1jgm6RmetQW_!!6000000004578-1-tps-1792-890.gif)](./examples/bpms/)

### 3D scenario (graphix + three.js)
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
