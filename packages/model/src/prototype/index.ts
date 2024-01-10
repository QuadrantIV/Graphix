import { PropConfig, PrototypeConfig, SettingConfig, View } from '../types';

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
    this.view = config.view || {};
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
