import { EventEmitter } from 'events';
import Prototype from '../prototype';
import { PrototypeConfig } from '../types';

interface TypedMaps {
  [typeName: string]: Prototype;
}

interface NamedMaps {
  [name: string]: Prototype;
}

export default class PrototypeRegistry {
  private emitter: EventEmitter;
  private registry: Prototype[];
  private maps: Map<string, Prototype>;

  constructor() {
    this.emitter = new EventEmitter();
    this.registry = [];
    this.maps = new Map();
  }

  /**
   * 注册组件
   * @param prototype
   */
  register(prototype: PrototypeConfig): void {
    const proto: Prototype = new Prototype(prototype);
    this.registry.push(proto);
    this.maps.set(proto.getType(), proto);
  }

  getPrototypeByType(typeName: string): Prototype | undefined {
    return this.maps.get(typeName);
  }

  getRegistry(): Prototype[] {
    return this.registry;
  }

  getMaps() {
    return this.maps;
  }

  onRegistryChange(func: () => void): () => void {
    this.emitter.on('registrychange', func);
    return () => {
      this.emitter.removeListener('registrychange', func);
    };
  }

  destroy() {
    this.registry = [];
    this.maps = new Map();
  }
}
