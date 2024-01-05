import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { componentsInfo } from '../constant';

const prototype: PrototypeConfig = {
  type: NodeType.UserTask,
  view: {
    shape: ShapeType.Common,
    data: componentsInfo.UserTask
  },
  props: {
    name: componentsInfo.UserTask.name,
    description: componentsInfo.UserTask.description
  },
  settings: [
    {
      key: 'name',
      setter: InputSetter,
      setterProps: {
        title: '名称'
      }
    },
    {
      key: 'description',
      setter: InputSetter,
      setterProps: {
        title: '描述'
      }
    }
  ],
};

export default prototype;
