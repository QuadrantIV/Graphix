import React, { useEffect, useState } from 'react';
import { Context, Node, uniqueId } from 'graphix-model';
import { Area, AreaType } from '../area';
import { skeleton } from '../skeleton-model';
import { createContent } from '../utils';

const RightArea = (props: { context: Context }) => {
  const area = skeleton.getArea(AreaType.RightArea)!;
  const [visible, setVisible] = useState(area.getVisible());
  const [selected, setSelected] = useState<Node | null>(null);
  const { context } = props;

  useEffect(() => {
    const unsubscribe = area.onVisibleChange((visible) => {
      setVisible(visible);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const selections = context.getSelection().getKeys();
    if (selections.length) {
      setSelected(context.getNode(selections[0]));
    }
    const unsubscribe = context.getSelection().onSelectionChange((keys) => {
      if (keys.length) {
        setSelected(context.getNode(keys[0]));
      } else {
        setSelected(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!visible) {
    return null;
  }
  const defaultTitle = area.getTitle() || 'Settings';
  const settings = selected ? selected.getSettings() : context.getSettings();
  return (
    <div className="rightarea">
      <div className="rightarea-header">
        <div className="rightarea-header-title">
          {selected ? selected.getPropData('name') || selected.getPropData('label')  || selected.getType() : defaultTitle}
        </div>
        <div></div>
      </div>

      <div className="rightarea-content">
        {settings.map((setting) => (
          <div className="rightarea-content-setter-item">
            {createContent(setting.getSetter(), { key: uniqueId('setter'), setting })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightArea;
