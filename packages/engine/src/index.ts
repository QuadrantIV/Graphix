import { pluginRegistry, workspace, DocumentData, SettingConfig } from 'graphix-model';
import { SkeletonView } from 'graphix-skeleton';
import { createElement } from 'react';
import { render as reactRender } from 'react-dom';

interface InitOptions {
  // 挂载点
  container?: Element;
  // schema 描述
  schema: DocumentData;
  // 全局设置
  globalSettings?: SettingConfig[];
}

/**
 * 框架初始化
 * @param container 
 */
export async function init(options: InitOptions) {
  const { container, schema, globalSettings = [] } = options;
  let engineContainer = container;
  if (!engineContainer) {
    engineContainer = document.createElement('div');
    document.body.appendChild(engineContainer);
    engineContainer.id = 'graphix-engine';
  }

  // init document
  workspace.initDocument(schema, globalSettings);

  // init plugins
  for(const plugin of pluginRegistry.getRegistry()) {
    await plugin.init();
  }

  render(engineContainer);
}

/**
 * render skeleton view
 * @param container 
 */
export function render(container: Element) {
  reactRender(
    createElement(SkeletonView),
    container,
  );
}

export * from 'graphix-skeleton';
export * from 'graphix-model';