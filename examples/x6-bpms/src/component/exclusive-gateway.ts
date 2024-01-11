import { PrototypeConfig } from 'graphix-engine';
import { NodeType, ShapeType } from './types';
import InputSetter from './setter/input-setter';
import { GatewayXOR } from '../icon';

const prototype: PrototypeConfig = {
  icon: GatewayXOR,
  type: NodeType.ExclusiveGateway,
  view: {
    shape: ShapeType.Common,
  },
  props: {
    name: '排他网关',
    description: '在流程中进行条件分支的节点',
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
