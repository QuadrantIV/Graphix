import { Area, AreaType, PanelConfig } from "./area";

export class Skeleton {
  private areas: Area[] = [];

  constructor() {
    Object.values(AreaType).forEach((type: AreaType) => {
      this.areas.push(new Area(type));
    });
  }

  add(config: PanelConfig) {
    const area = this.areas.find(v => v.getType() === config.area);
    area?.add(config);
  }

  getArea(type: AreaType) {
    return this.areas.find(v => v.getType() === type);
  }

  dispose() {
    this.areas = [];
  }
}

export const skeleton = new Skeleton();