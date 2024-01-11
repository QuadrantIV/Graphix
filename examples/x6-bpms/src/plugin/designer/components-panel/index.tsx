import { graph } from "../graph/initGraph";
import { dnd } from "../graph/initDnd";
import { prototypeRegistry, createContent } from "graphix-engine";
import { NodeType } from "../../../component/types";

export const Components = [
  NodeType.UserTask,
  NodeType.ServiceTask,
  NodeType.ExclusiveGateway,
  NodeType.ParallelGateway
]

const ComponentsPanel = () => {
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, type: string) => {
    const view: any = prototypeRegistry.getPrototypeByType(type)?.getView() || {};
    const node = graph.createNode({
      ...view,
      data: {
        type
      }
    });
    dnd.start(node, e.nativeEvent);
  };

  return (
    <div className="components-panel">
      <div className="components-panel-title">节点库</div>
      <div className="components-panel-content">
        {
          Components.map(type => {
            const prototype = prototypeRegistry.getPrototypeByType(type)!;
            const { icon } = prototype.getConfig();
            const { name, description } = prototype.getProps();
            return (
              <div className="components-panel-item" onMouseDown={(e) => startDrag(e, type)}>
              <div>{createContent(icon)}</div>
              <div>
                <div className="components-panel-item-name">{name}</div>
                <div className="components-panel-item-description">{description}</div>
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