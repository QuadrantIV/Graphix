export interface Schema {
  id?: string;
  type?: string;
  version?: string;
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
  name: string;
  init?(): void;
  destroy?(): void;
  exports?(): any;
}

export type View = any;

export interface PropConfig {
  [key: string]: any;
}

/**
 * 节点原型描述
 */
export interface PrototypeConfig {
  /**
   * 节点类型
   */
  type: string;
  /**
   * 节点视图
   */
  view?: View;
  /**
   * 节点默认属性
   */
  props?: PropConfig;
  /**
   * 节点可配置设置
   */
  settings?: Array<SettingConfig>;
  /**
   * 其它扩展配置信息
   */
  [extraKey: string]: any;
}

export type SetterType = string | { type: string; props?: object } | React.ComponentType<any> | React.ReactElement<any>;

/**
 * 设置器描述
 */
export interface SettingConfig {
  // 设置对应属性 key
  target: string;
  // 设置器视图
  setter: SetterType;
}