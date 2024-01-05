import { workspace, skeleton, PluginConfig } from "graphix-engine";
import Timelne from "./timeline";

export default function(options: any): PluginConfig {
  return {
    name: 'Toolbar',
    init() {
      skeleton.add({
        area: 'toolbar',
        content: Timelne
      });
    }
  }
}