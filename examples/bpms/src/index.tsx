import { init, config, pluginRegistry, prototypeRegistry, skeleton, AreaType } from 'graphix-engine';
import { DemoSchema } from './schema/demo';
import {
  StartEvent,
  EndEvent,
  UserTask,
  SequenceFlow,
  ServiceTask,
  ExclusiveGateway,
  ParallelGateway,
} from './component';
import TopbarPlugin from './plugin/topbar';
import Designer from './plugin/designer';
import Toolbar from './plugin/toolbar';
import InputSetter from './component/setter/input-setter';

(async () => {
  // skeleton 适配
  skeleton.getArea(AreaType.RightArea)?.setTitle('全局设置');

  // 注册组件
  [StartEvent, EndEvent, UserTask, ServiceTask, ExclusiveGateway, ParallelGateway, SequenceFlow].forEach((comp) => {
    prototypeRegistry.register(comp);
  });

  // 注册全局 setter
  config.setDocSettings([
    {
      key: 'variables',
      setter: InputSetter,
      setterProps: {
        title: '全局变量',
      },
    },
  ]);

  // 注册插件
  pluginRegistry.register(TopbarPlugin);
  pluginRegistry.register(Toolbar);
  pluginRegistry.register(Designer);
  init({
    schema: DemoSchema,
  });
})();
