import { skeleton, PluginConfig } from 'graphix-engine';
import Designer from './designer';
import ComponentsPanel from './components-panel';
import './index.less';

export default function graph(options: any): PluginConfig {
  return {
    name: "Designer",
    init() {
      skeleton.add({
        area: 'mainArea',
        content: Designer,
      });
      
      skeleton.add({
        area: 'leftArea',
        content: ComponentsPanel
      });
    }
  }
}