import React, { createElement, useEffect, useState } from 'react';
import { Area, AreaType, PanelConfig } from '../area';
import { utils } from 'graphix-model';
import { createContent } from '../utils';
import { skeleton } from '../skeleton-model';

const Toolbar = () => {
  const area = skeleton.getArea(AreaType.ToolBar)!;
  const [visible, setVisible] = useState(area.getVisible());

  useEffect(() => {
    const unsubscribe = area.onVisibleChange((visible) => {
      setVisible(visible);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const renderItem = (item: PanelConfig) => {
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

  if (!visible) {
    return null;
  }
  return (
    <div className="graphix-skeleton-content-toolbar">
      {
        area.getPanels().map(item => renderItem(item))
      }
    </div>
  );
}

export default Toolbar;