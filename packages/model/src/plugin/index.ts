import { PluginConfig } from "../types";

/**
 * 设计器插件
 */
export class Plugin {
  constructor(private config: PluginConfig) {
    this.config = config;
  }

  get name() {
    return this.config.name;
  }

  async init(forceInit?: boolean) {
    await this.config.init?.call(undefined);
  }

  async destroy() {
    await this.config?.destroy?.call(undefined);
  }
}
