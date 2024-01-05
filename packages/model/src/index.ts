import { Plugin, PluginConfig } from './plugin';
import Prototype, { PrototypeConfig } from './prototype';
import * as utils from './utils';
import {
  config,
  prototypeRegistry,
  setterRegistry,
  pluginRegistry
} from './instance';
import Workspace from './workspace';
import Document from './document';
import Node, { NodeData, PropsData} from './document/node';
import DocumentCollection from './document/collection';
import Selection from './document/selection';
import Timeline from './document/timeline';
import Setting from './document/setting';

const workspace = new Workspace();

// instrance
export {
  workspace,
  config,
  prototypeRegistry,
  setterRegistry,
  pluginRegistry,
  utils
}

// class，type
export {
  Workspace,
  Document,
  DocumentCollection,
  Prototype, PrototypeConfig, Plugin, PluginConfig,
  Node, NodeData, PropsData, Setting,
  Selection, Timeline
};