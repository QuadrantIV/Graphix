import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { componentsInfo } from '../constant';

const prototype: PrototypeConfig = {
  type: NodeType.ServiceTask,
  view: {
    shape: ShapeType.Common,
    data: componentsInfo.ServiceTask
  },
  props: {
    name: componentsInfo.ServiceTask.name,
    description: componentsInfo.ServiceTask.description
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
