import { EventEmitter } from 'events';
import Setting from './setting';
import { SettingConfig } from './setting';
import { uniqueId } from '../utils';
import Selection from './selection';
import Timeline from './timeline';
import Node, { NodeData, PropsData } from './node';

export interface DocumentData {
  id?: string;
  documentType?: string;
  documentVersion?: string;
  nodes?: NodeData[];
  props?: PropsData;
  [key: string]: any;
}
interface NodeMap {
  [uid: string]: Node | null;
}
function isNode(node: any): node is Node {
  return true;
}

export default class Document {
  private emitter: EventEmitter = new EventEmitter();
  private id: string;
  private documentType: string;
  private documentVersion: string;
  private propsData: PropsData;
  private settings: Setting[];
  private nodes: Node[];
  private nodesMap: NodeMap = {};
  private selection: Selection;
  private timeline: Timeline;

  constructor(data: DocumentData, settingsConfig: Array<SettingConfig> = []) {
    const { id, documentType, documentVersion, props = {}, nodes = [] } = data;
    this.id = id || uniqueId('document');
    this.documentType = documentType || '';
    this.documentVersion = documentVersion || '';
    // init nodes
    this.nodes = nodes.map((nodeData: NodeData) => {
      const node = new Node(this, nodeData);
      this.nodesMap[node.getId()] = node;
      return node;
    });
    // init propsdata
    this.propsData = props;
    // init settings
    this.settings = settingsConfig.map(config => new Setting(this, config));
    // init selection
    this.selection = new Selection(this);
    // init timeline
    this.timeline = new Timeline(
      () => this.getData(),
      (pointData: DocumentData) => this.applyTimelinePointData(pointData),
    );
  }

  getId() {
    return this.id;
  }

  getSettings() {
    return this.settings;
  }

  getSelection(): Selection {
    return this.selection;
  }

  getTimeline(): Timeline {
    return this.timeline;
  }

  getNodes(): Array<Node> {
    return this.nodes;
  }

  getNode(id: string): Node | null {
    return this.nodesMap[id];
  }

  addNode(nodeData: NodeData) {
    const node = new Node(this, nodeData);
    this.nodes.push(node);
    this.nodesMap[node.getId()] = node;
    this.getTimeline().log(`Add node ${node.getType()} #${node.getId()}`);
  }

  removeNode(node: Node | string) {
    if (typeof node === 'string') {
      node = this.nodesMap[node]!;
    }
    if (node && isNode(node)) {
      this.nodesMap[node.getId()] = null;
      const i = this.nodes.indexOf(node);
      if (i > -1) {
        this.nodes.splice(i, 1);
        this.getTimeline().log(`Remove node ${node.getType()} #${node.getId()}`);
      }
    }
  }

  getPropsData(): PropsData {
    return this.propsData;
  }

  setPropsData(value: PropsData) {
    this.propsData = value;
    const desc = `Modify document(#${this.getId()}) props ${Object.keys(value)}`;
    this.getTimeline().log(desc);
    this.emitter.emit('propsChange', value);
  }

  getPropData(key: string) {
    return this.propsData[key];
  }

  setPropData(key: string, value: any) {
    this.propsData[key] = value;
    const prop = { key, value };
    const desc = `Modify document(#${this.getId()}) props ${key}`;
    this.getTimeline().log(desc);
    this.emitter.emit('propsChange', prop);
  }

  applyTimelinePointData(data: DocumentData): void {
    const { props, nodes } = data;
    this.propsData = props || {};

    const originNodes = this.nodes.slice();
    this.nodes = nodes.map((nodeData: NodeData): Node => {
      let node: Node | null;
      if (nodeData.id) {
        node = this.getNode(nodeData.id);
        if (node) {
          node.applyTimelinePointData(nodeData);
          const i = originNodes.indexOf(node);
          if (i > -1) {
            originNodes.splice(i, 1);
          }
          return node;
        }
      }
      node = new Node(this, nodeData);
      this.nodesMap[node.getId()] = node;
      return node;
    });

    if (originNodes.length > 0) {
      originNodes.forEach((node) => {
        this.nodesMap[node.getId()] = null;
      });
    }
  }

  getData(): DocumentData {
    return {
      id: this.id,
      documentType: this.documentType,
      documentVersion: this.documentVersion,
      props: this.propsData,
      nodes: this.nodes.map(node => node.getData()),
    };
  }

  onPropsChange(fn: (propsData: PropsData) => void): () => void {
    this.emitter.on('propsChange', fn);
    return () => {
      this.emitter.removeListener('propsChange', fn);
    };
  }
}
