import EventEmitter from 'events';
import { uniqueId } from '../../utils';
import Node from '../node';
import Document from '..';
import { SetterType, SettingConfig } from '../../types'; 

export default class Setting {
  private uid: string = uniqueId('setting');
  private emitter: EventEmitter = new EventEmitter();
  private key: string;
  private setter: SetterType;
  private setterProps: object

  constructor(private owner: Node | Document, config: SettingConfig) {
    this.key = config.key;
    this.setter = config.setter;
    this.setterProps = config.setterProps || {};
  }

  getId(): string {
    return this.uid;
  }

  getOwner() {
    return this.owner;
  }

  getKey() {
    return this.key;
  }

  getSetter(): SetterType {
    return this.setter;
  }

  getSetterProps() {
    return this.setterProps;
  }

  getVaule() {
    const { owner, key } = this;
    return owner.getPropData(key);
  }

  setValue(value: any) {
    const { owner, key } = this;
    owner.setPropData(key, value);
    this.emitter.emit('valuechange');
  }

  onValueChange(fn: () => void): () => void {
    this.emitter.on('valuechange', fn);
    return () => {
      this.emitter.removeListener('valuechange', fn);
    };
  }
}
