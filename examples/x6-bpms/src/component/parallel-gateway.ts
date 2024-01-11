import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { GatewayParallel } from '../icon';

const prototype: PrototypeConfig = {
  icon: GatewayParallel,
  type: NodeType.ParallelGateway,
  view: {
    shape: ShapeType.Common,
  },
  props: {
    name: '并行网关',
    description: '在流程中进行并行处理的节点'
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
