import { EventEmitter } from 'events';
import Prototype from '../prototype';
import { PrototypeConfig } from '../types';

export default class PrototypeRegistry {
  private emitter: EventEmitter;
  private registry: Prototype[];
  private prototypeMap: Map<string, Prototype>;

  constructor() {
    this.emitter = new EventEmitter();
    this.registry = [];
    this.prototypeMap = new Map();
  }

  /**
   * 注册组件
   * @param prototype
   */
  register(prototype: PrototypeConfig): void {
    const proto: Prototype = new Prototype(prototype);
    this.registry.push(proto);
    this.prototypeMap.set(proto.getType(), proto);
  }

  getPrototypeByType(typeName: string): Prototype | undefined {
    return this.prototypeMap.get(typeName);
  }

  getRegistry(): Prototype[] {
    return this.registry;
  }

  getPrototypeMap() {
    return this.prototypeMap;
  }

  onRegistryChange(func: () => void): () => void {
    this.emitter.on('registrychange', func);
    return () => {
      this.emitter.removeListener('registrychange', func);
    };
  }

  destroy() {
    this.registry = [];
    this.prototypeMap = new Map();
  }
}
