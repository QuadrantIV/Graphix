import React, { useEffect, useState } from 'react';
import { Area, AreaType, PanelConfig } from '../area';
import { createContent } from '../utils';
import { skeleton } from '../skeleton-model';
import { utils } from 'graphix-model';

const Topbar = () => {
  const area = skeleton.getArea(AreaType.TopBar)!;
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
      <div key={utils.uniqueId('topbar-item')} className="graphix-skeleton-topbar-item">
        {
          createContent(content, {
            ...contentProps,
          })
        }
      </div>
    );
  }

  if (!visible) {
    return null;
  }
  const left: PanelConfig[] = [];
  const center: PanelConfig[] = [];
  const right: PanelConfig[] = [];
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
      <div className="graphix-skeleton-topbar-left">{left.map(v => renderItem(v))}</div>
      <div className="graphix-skeleton-topbar-center">{center.map(v => renderItem(v))}</div>
      <div className="graphix-skeleton-topbar-right">{right.map(v => renderItem(v))}</div>
    </div>
  );
}

export default Topbar;
