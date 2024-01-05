export interface PluginConfig {
  /**
   * 插件名称
   */
  name: string;
  /**
   *  插件初始化
   */
  init?(): void;
  /**
   * 插件销毁
   */
  destroy?(): void;
  /**
   * 插件导出
   */
  exports?(): any;
}

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
