import { SetterComponentType } from '../document/setting';

interface TypedMaps {
  [typeName: string]: SetterComponentType;
}

export default class SetterRegistry {
  private typedMaps: TypedMaps = {};
  private registry: SetterComponentType[] = [];
  private defaultType: string;

  constructor() {
    this.typedMaps = {};
  }

  register(type: string, setter: SetterComponentType, setDefaultType: boolean = false): void {
    this.typedMaps[type] = setter;
    if (setDefaultType) {
      this.defaultType = type;
    }
  }

  getSetter(type: string): SetterComponentType | null {
    return this.typedMaps[type] || null;
  }

  getDefaultSetter(): SetterComponentType | null {
    return this.getSetter(this.defaultType);
  }

  getRegistry(): SetterComponentType[] {
    return this.registry;
  }
}
