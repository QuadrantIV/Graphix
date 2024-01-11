import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { ServiceTaskIcon } from '../icon';

const prototype: PrototypeConfig = {
  icon: ServiceTaskIcon,
  type: NodeType.ServiceTask,
  view: {
    shape: ShapeType.Common,
  },
  props: {
    name: '服务任务',
    description: '由系统或外部服务处理的任务'
  },
  settings: [
    {
      target: 'name',
      setter: InputSetter,
    },
    {
      target: 'description',
      setter: InputSetter,
    }
  ],
};

export default prototype;
