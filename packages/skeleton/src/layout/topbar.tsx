import React from 'react';
import { Area, AreaType, PaneConfig } from '../area';
import { createContent } from '../utils';
import { skeleton } from '../skeleton-model';
import { utils } from 'graphix-model';

export default class TopBar extends React.PureComponent {
  renderItem(item: PaneConfig) {
    const { content, contentProps = {} } = item;
    return (
      <div key={utils.uniqueId('topbar-item')} className="graphix-skeleton-topbar-item">
        {
          createContent(content, {
            ...contentProps,
          })
        }
      </div>
    )
  }

  render() {
    const area = skeleton.getArea(AreaType.TopBar);
    if (!area || !area.getVisible()) {
      return null;
    }
    const left: PaneConfig[] = [];
    const center: PaneConfig[] = [];
    const right: PaneConfig[] = [];
    area.getPanels().forEach(item => {
      if (item.align === 'center') {
        center.push(item);
      } else if (item.align === 'left') {
        left.push(item);
      } else {
        right.push(item);
      }
    });
    return (
      <div className="graphix-skeleton-topbar">
        <div className="graphix-skeleton-topbar-left">{left.map(v => this.renderItem(v))}</div>
        <div className="graphix-skeleton-topbar-center">{center.map(v => this.renderItem(v))}</div>
        <div className="graphix-skeleton-topbar-right">{right.map(v => this.renderItem(v))}</div>
      </div>
    );
  }
}
