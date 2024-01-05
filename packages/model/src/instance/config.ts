import Document from '../document';
import { SettingConfig } from '../document/setting';

interface Configs {
  [key: string]: any;
}

export default class Config {
  private configs: Configs = {};
  private docSettings: Array<SettingConfig>;

  setConfig(name: string, value: any): void {
    this.configs[name] = value;
  }

  getConfig(name: string): any {
    return this.configs[name];
  }

  setDocSettings(config: Array<SettingConfig>): void {
    this.docSettings = config;
  }

  getDocSettings(): Array<SettingConfig> {
    return this.docSettings;
  }
}
