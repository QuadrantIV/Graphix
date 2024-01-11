import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { UserTaskIcon } from '../icon';

const prototype: PrototypeConfig = {
  icon: UserTaskIcon,
  type: NodeType.UserTask,
  view: {
    shape: ShapeType.Common,
  },
  props: {
    name: '用户任务',
    description: '由人工处理的任务'
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
