export interface DocumentData {
  id?: string;
  documentType?: string;
  documentVersion?: string;
  nodes?: NodeData[];
  props?: PropsData;
  [key: string]: any;
}

export interface PropsData {
  [propName: string]: any;
}
export interface NodeData {
  id?: string;
  type: string;
  props?: PropsData;
  [key: string]: any;
}

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
  view?: View;
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

export type SetterType = string | {
  type: string;
  props?: object;
} | React.ComponentType<any> | React.ReactElement<any>;

export interface SettingConfig {
  key: string;
  setter: SetterType;
  setterProps?: object;
}