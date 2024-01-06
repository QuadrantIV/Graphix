import React, { createElement } from 'react';
import { Area, AreaType, PaneConfig } from '../area';
import { utils } from 'graphix-model';
import { createContent } from '../utils';
import { skeleton } from '../skeleton-model';

export default class Toolbar extends React.PureComponent{
  renderItem(item: PaneConfig) {
    const { content, contentProps = {} } = item;
    return (
      <div key={utils.uniqueId('toolbar-item')} className="graphix-skeleton-content-toolbar-item">
        {
          createContent(content, {
            ...contentProps,
          })
        }
      </div>
    )
  }

  render() {
    const area = skeleton.getArea(AreaType.ToolBar);
    if (!area || !area.getVisible()) {
      return null;
    }
    return (
      <div className="graphix-skeleton-content-toolbar">
        {
          area.getPanels().map(item => this.renderItem(item))
        }
      </div>
    );
  }
}