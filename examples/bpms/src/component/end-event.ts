import { PrototypeConfig } from 'graphix-engine';
import { NodeType } from './types';
import { EndEventView } from './shape';

const prototype: PrototypeConfig = {
  type: NodeType.EndEvent,
  view: EndEventView,
  props: [],

  settings: [],
};

export default prototype;
