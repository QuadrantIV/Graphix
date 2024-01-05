import { workspace, skeleton, PluginConfig } from "graphix-engine";
import SaveButton from "./save-button";
import './index.less';
import Brand from "./brand";

export default function(options: any): PluginConfig {
  return {
    name: 'Topbar',
    init() {    
      skeleton.add({
        area: 'topbar',
        align: 'left',
        content: Brand
      });
      
      skeleton.add({
        area: 'topbar',
        content: SaveButton,
      });
    }
  }
}