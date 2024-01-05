import { ReactElement, ComponentType } from 'react';

export interface PaneConfig {
  // 放置区域
  area: 'toolbar' | 'topbar' | 'mainArea' | 'leftArea' | 'rightArea';
  // 放置方向
  align?: 'left' | 'right' | 'center';
  key?: string;
  content: string | ReactElement | ComponentType<any>;
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
  private visible: boolean;
  private panels: PaneConfig[];
  private title: string;

  constructor(private type: AreaType) {
    this.visible = true;
    this.panels = [];
    this.title = '';
  }

  getType() {
    return this.type;
  }

  getVisible() {
    return this.visible;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  getPanels() {
    return this.panels;
  }

  add(config: PaneConfig) {
    this.panels.push(config);
  }

  delete(config: PaneConfig) {
    const newItems = this.panels.filter(item => item.key !== config.key);
    this.panels = newItems;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }
}