import EventEmitter from 'events';
import { uniqueId } from '../../utils';
import Node from '../node';
import Context from '..';
import { SetterType, SettingConfig } from '../../types'; 

export default class Setting {
  private uid: string = uniqueId('setting');
  private emitter: EventEmitter = new EventEmitter();
  private target: string;
  private setter: SetterType;

  constructor(private owner: Node | Context, config: SettingConfig) {
    this.target = config.target;
    this.setter = config.setter;
  }

  getId(): string {
    return this.uid;
  }

  getOwner() {
    return this.owner;
  }

  getTarget() {
    return this.target;
  }

  getSetter(): SetterType {
    return this.setter;
  }

  getVaule() {
    const { owner, target: key } = this;
    return owner.getPropData(key);
  }

  setValue(value: any) {
    const { owner, target: key } = this;
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
