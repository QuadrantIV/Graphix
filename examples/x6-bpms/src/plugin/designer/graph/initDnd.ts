import { getContext } from 'graphix-engine';
import { Edge, Graph, Node, Point } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";

export let dnd: Dnd;
export default function initDnd(graph: Graph) {
  dnd = new Dnd({
    target: graph,
    validateNode: (node: Node, options: any) => {
      getContext().addNode({
        type: node.data.type,
        props: {
          position: node.getPosition()
        }
      });
      return false;
    }
  });
  return dnd;
}