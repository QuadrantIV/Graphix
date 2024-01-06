import { EventEmitter } from 'events';
import { Plugin } from '../plugin';
import { PluginConfig } from '../types';

export interface RegisterOptions {
  autoInit?: boolean;
}

export default class PluginRegistry {
  private emitter: EventEmitter;
  private registry: Plugin[] = [];
  private pluginMap: Map<string, Plugin> = new Map();

  constructor() {
    this.emitter = new EventEmitter();
    this.registry = [];
    this.pluginMap = new Map();
  }

  /**
   * 注册插件
   */
  async register(
    pluginConfigCreator: (pluginOptions?: any) => PluginConfig,
    pluginOptions?: any,
    options?: RegisterOptions,
  ): Promise<void> {
    const config = pluginConfigCreator(pluginOptions);
    const plugin = new Plugin(config);
    if (options?.autoInit) {
      await plugin.init();
    }
    this.registry.push(plugin);
    this.pluginMap.set(plugin.name, plugin);
  }

  getPluginByName(name: string): Plugin | null {
    return this.pluginMap.get(name) || null;
  }

  getRegistry(): Plugin[] {
    return this.registry;
  }

  getPluginMap() {
    return this.pluginMap;
  }

  destroy() {
    this.registry = [];
    this.pluginMap = new Map();
  }
}
