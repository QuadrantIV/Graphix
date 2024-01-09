import React, { useEffect, useState } from 'react';
import { Area, AreaType, PanelConfig } from '../area';
import { createContent } from '../utils';
import { skeleton } from '../skeleton-model';

const LeftArea = () => {
  const area = skeleton.getArea(AreaType.LeftArea)!;
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
    <div className="graphix-skeleton-content-leftarea">
      {
        area.getPanels().map(item => renderItem(item))
      }
    </div>
  )
}

export default LeftArea;