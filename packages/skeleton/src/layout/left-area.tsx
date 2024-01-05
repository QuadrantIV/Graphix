import React from 'react';
import { Area, AreaType, PaneConfig } from '../area';
import { Document } from 'graphix-model';
import { createContent } from '../utils';
import { skeleton } from '../skeleton-model';

export default class LeftArea extends React.PureComponent {
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
    const area = skeleton.getArea(AreaType.LeftArea);
    if (!area || !area.getVisible()) {
      return null;
    }
    return (
      <div className="graphix-skeleton-content-leftarea">
        {
          area.getPanels().map(item => this.renderItem(item))
        }
      </div>
    )
  }
}
