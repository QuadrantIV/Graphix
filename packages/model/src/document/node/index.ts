import { EventEmitter } from 'events';
import { prototypeRegistry } from '../../instance';
import Prototype from '../../prototype';
import Settings from '../setting';
import { hasOwn, uniqueId } from '../../utils';
import Document from '..';
import Setting from '../setting';

export interface PropsData {
  [propName: string]: any;
}
export interface NodeData {
  id?: string;
  type: string;
  props?: PropsData;
  [key: string]: any;
}

export default class Node {
  private emitter: EventEmitter = new EventEmitter();
  private id: string;
  private type: string;
  private prototype: Prototype;
  private propsData: PropsData;
  private settings: Setting[];

  constructor(private document: Document, nodeData: NodeData) {
    this.id = nodeData.id || uniqueId('node');
    this.type = nodeData.type;
    // get prototype
    const prototype = prototypeRegistry.getPrototypeByType(this.type);
    if (!prototype) {
      throw Error(`The ${this.type} type component (prototype) does not exist`);
    }
    this.prototype = prototype;

    // init propsData
    const propsData = nodeData.props || {};
    this.propsData = {
      ...prototype.getProps(),
      ...propsData
    };

    // init settings
    this.settings = prototype.getSettings().map(config => new Setting(this, config));
  }

  getDocument() {
    return this.document;
  }

  getId(): string {
    return this.id;
  }

  getType(): string {
    return this.type;
  }

  getPrototype(): Prototype {
    return this.prototype;
  }

  getPropsData(): PropsData {
    return this.propsData;
  }

  setPropsData(value: PropsData) {
    this.propsData = value;
    
    const desc = `Modify node(#${this.getId()}) props ${Object.keys(value)}`;
    this.document.getTimeline().log(desc);
    this.emitter.emit('propsChange', value);
  }

  getPropData(key: string) {
    return this.propsData[key];
  }

  setPropData(key: string, value: any) {
    this.propsData = { ...this.propsData };
    this.propsData[key] = value;

    const prop = { key, value };
    const desc = `Modify node(#${this.getId()}) props ${key}`;
    this.document.getTimeline().log(desc);
    this.emitter.emit('propsChange', prop);
  }

  getSettings(): Setting[] {
    return this.settings;
  }

  getData(): NodeData {
    return {
      type: this.getType(),
      props: this.propsData,
      id: this.getId(),
    }
  }

  select(): void {
    const { document, id } = this;
    document.getSelection().setKeys([id]);
  }

  remove() {
    this.document.removeNode(this);
  }

  copy() {
    const newContentNode = this.document.addNode({
      type: this.getType(),
      props: this.propsData,
    });
    return newContentNode;
  }

  applyTimelinePointData(nodeData: NodeData): void {
    this.propsData = nodeData.props || {};
  }

  onPropsChange(fn: (propsData: PropsData) => void): () => void {
    this.emitter.on('propsChange', fn);
    return () => {
      this.emitter.removeListener('propsChange', fn);
    };
  }
}
