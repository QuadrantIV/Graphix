import React, { useEffect, useState } from 'react';
import { Document, Node, workspace, utils } from 'graphix-model';
import { Area, AreaType } from '../area';
import { skeleton } from '../skeleton-model';
import { createContent } from '../utils';

const { uniqueId } = utils;
const RightArea = () => {
  const area = skeleton.getArea(AreaType.RightArea)!;
  const [visible, setVisible] = useState(area.getVisible());
  const [selected, setSelected] = useState<Node | null>(null);
  const doc = workspace.getDocument();

  useEffect(() => {
    const unsubscribe = area.onVisibleChange((visible) => {
      setVisible(visible);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const selections = doc.getSelection().getKeys();
    if (selections.length) {
      setSelected(doc.getNode(selections[0]));
    }
    const unsubscribe = doc.getSelection().onSelectionChange((keys) => {
      if (keys.length) {
        setSelected(doc.getNode(keys[0]));
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
  const settings = selected ? selected.getSettings() : doc.getSettings();
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
            {createContent(setting.getSetter(), { key: uniqueId('setter'), setting, ...setting.getSetterProps() })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightArea;
