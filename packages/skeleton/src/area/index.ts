import EventEmitter from 'events';
import { ReactElement, ComponentType } from 'react';

/**
 * 可扩展面板配置
 */
export interface PanelConfig {
  // 放置区域
  area: 'toolbar' | 'topbar' | 'mainArea' | 'leftArea' | 'rightArea';
  // 放置方向
  align?: 'left' | 'right' | 'center';
  // 面板 key
  key?: string;
  // 面板 view
  content: string | ReactElement | ComponentType<any>;
  // 面板 view props
  contentProps?: object;
}

export enum AreaType {
  TopBar = 'topbar',
  ToolBar = 'toolbar',
  MainArea = 'mainArea',
  LeftArea = 'leftArea',
  RightArea = 'rightArea'
}

export class Area {
  private emitter: EventEmitter = new EventEmitter();
  private visible: boolean;
  private panels: PanelConfig[];
  private title: string;

  constructor(private type: AreaType) {
    this.title = '';
    this.visible = true;
    this.panels = [];
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getType() {
    return this.type;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.emitter.emit('visibleChange', visible);
  }

  getPanels() {
    return this.panels;
  }

  add(config: PanelConfig) {
    this.panels.push(config);
  }

  onVisibleChange(fn: (visible: boolean) => void) {
    this.emitter.on('visibleChange', fn);
    return () => {
      this.emitter.removeListener('visibleChange', fn);
    };
  }
}