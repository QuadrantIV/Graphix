import { Prototype, PrototypeConfig, pluginRegistry, prototypeRegistry, workspace, DocumentData } from 'graphix-model';
import { skeleton, SkeletonView } from 'graphix-skeleton';
import { createElement } from 'react';
import { render } from 'react-dom';

interface InitOptions {
  container?: Element;
  schema: DocumentData;
}

/**
 * 框架初始化
 * @param container 
 */
export async function init(options: InitOptions) {
  const { container, schema } = options;
  let engineContainer = container;
  if (!engineContainer) {
    engineContainer = document.createElement('div');
    document.body.appendChild(engineContainer);
  }
  engineContainer.id = 'graphix-engine';

  // init document
  workspace.initDocument(schema);

  // init plugins
  for(const plugin of pluginRegistry.getRegistry()) {
    await plugin.init();
  }

  render(
    createElement(SkeletonView),
    engineContainer,
  );
}

export * from 'graphix-skeleton';
export * from 'graphix-model';