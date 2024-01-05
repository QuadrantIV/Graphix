import { graph } from "../graph/initGraph";
import { dnd } from "../graph/initDnd";
import { prototypeRegistry } from "graphix-model";
import { componentsInfo } from "../../../constant";

const ComponentsPanel = () => {
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => {
    const view: any = prototypeRegistry.getPrototypeByType(type)?.getView() || {};
    (view.data || {})['type'] = type;
    const node = graph.createNode({
      ...view,
    });
    dnd.start(node, e.nativeEvent);
  };

  return (
    <div className="components-panel">
      <div className="components-panel-title">节点库</div>
      <div className="components-panel-content">
        {
          Object.keys(componentsInfo).map(key => {
            // @ts-ignore
            const compInfo = componentsInfo[key] || {};
            return (
              <div className="components-panel-item" onMouseDown={(e) => startDrag(e, key)}>
              <div>{compInfo.icon}</div>
              <div>
                <div className="components-panel-item-name">{compInfo.name}</div>
                <div className="components-panel-item-description">{compInfo.description}</div>
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ComponentsPanel;