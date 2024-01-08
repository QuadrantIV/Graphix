import { Plugin } from './plugin';
import Prototype from './prototype';
import * as utils from './utils';
import {
  prototypeRegistry,
  setterRegistry,
  pluginRegistry
} from './instance';
import Workspace from './workspace';
import Document from './document';
import Node from './document/node';
import DocumentCollection from './document/collection';
import Selection from './document/selection';
import Timeline from './document/timeline';
import Setting from './document/setting';

const workspace = new Workspace();

// instrance
export {
  workspace,
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
  Prototype, Plugin,
  Node, Setting,
  Selection, Timeline
};

export * from './types';