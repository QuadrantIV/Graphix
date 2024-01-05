import { Document } from 'graphix-model';
import { createContent } from '../utils';
import React from 'react';
import { Area, AreaType, PaneConfig } from '../area';
import { skeleton } from '../skeleton-model';

export default class MainArea extends React.PureComponent {
  renderItem(item: PaneConfig) {
    const { content, contentProps = {} } = item;
    return (
      <>
        {
          createContent(content, {
            ...contentProps,
          })
        }
      </>
    )
  }

  render() {
    const area = skeleton.getArea(AreaType.MainArea);
    if (!area || !area.getVisible()) {
      return null;
    }
    return (
      <div className="graphix-skeleton-content-mainarea">
        {
          area.getPanels().map(item => this.renderItem(item))
        }
      </div>
    )
  }
}
