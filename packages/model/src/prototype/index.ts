import { SettingConfig } from '../document/setting';

export type View = React.ComponentType<any> | object;

export interface PropConfig {
  [key: string]: any;
}

export interface PrototypeConfig {
  /**
   * 组件类型名，用于注册
   */
  type: string;
  /**
   * 组件视图
   */
  view: View;
  /**
   * 组件参数枚举
   */
  props?: PropConfig;
  /**
   * 组件设置枚举
   */
  settings?: Array<SettingConfig>;
  /**
   * 其它扩展配置信息
   */
  [extraKey: string]: any;
}

export default class Prototype {
  private type: string;
  private view: View;
  private props: PropConfig;
  private settings: Array<SettingConfig>;
  private config: PrototypeConfig;

  constructor(config: PrototypeConfig) {
    this.config = config;
    this.type = config.type || '';
    this.settings = config.settings || [];
    this.props = config.props || {};
    this.view = config.view;
  }

  getConfig(configKey: string): PrototypeConfig | any {
    if (!configKey) {
      return this.config;
    }
    return this.config[configKey];
  }

  getType(): string {
    return this.type;
  }

  getSettings() {
    return this.settings;
  }

  getProps() {
    return this.props;
  }

  getView(): View {
    return this.view;
  }
}
