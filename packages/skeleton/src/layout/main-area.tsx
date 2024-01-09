import { Document } from 'graphix-model';
import { createContent } from '../utils';
import React, { useEffect, useState } from 'react';
import { Area, AreaType, PanelConfig } from '../area';
import { skeleton } from '../skeleton-model';

const MainArea = () => {
  const area = skeleton.getArea(AreaType.MainArea)!;
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
      <>
        {
          createContent(content, {
            ...contentProps,
          })
        }
      </>
    )
  }

  if (!visible) {
    return null;
  }
  return (
    <div className="graphix-skeleton-content-mainarea">
      {
        area.getPanels().map(item => renderItem(item))
      }
    </div>
  )
}

export default MainArea;
