import React, { useEffect } from 'react';
import { Setting } from 'graphix-engine';
import { Input } from '@alifd/next';
import './index.less';

interface IProps {
  setting: Setting;
  title?: string;
}

/**
 * 输入框设置器
 */
const InputSetter = (props: IProps) => {
  const { setting, title } = props;
  const onChange = (value: string) => {
    setting.setValue(value);
  }

  const value = setting.getVaule();
  return (
    <div className='input-setter'>
      <div className='input-setter-title'>{title || ''}</div>
      <Input defaultValue={value} onChange={onChange} />
    </div>
  )
}

export default InputSetter;
