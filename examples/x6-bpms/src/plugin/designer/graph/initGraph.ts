import { CommonLineView } from '../../../component/shape';
import { Graph } from '@antv/x6';
import { Snapline } from '@antv/x6-plugin-snapline';
import { getContext } from 'graphix-engine';
import { EdgeType } from '../../../component/types';

export let graph: Graph = undefined!;
export default function initGraph(container: HTMLDivElement) {
  const context = getContext();
  graph = new Graph({
    container,
    autoResize: true,
    background: {
      color: '#fafafa',
      image: 'https://img.alicdn.com/imgextra/i3/O1CN01LVUi4y1e6WRzwnhIh_!!6000000003822-55-tps-22-22.svg',
      repeat: 'repeat',
      position: '0, 0',
      size: '11px',
    },
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    connecting: {
      snap: {
        radius: 40,
      },
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      highlight: false,
      createEdge() {
        return this.createEdge({
          shape: 'edge',
          ...CommonLineView
        });
      },
      validateEdge({ edge }) {
        context.addNode({
          type: EdgeType.SequenceFlow,
          props: {
            source: { id: edge.getSourceCellId(), port: edge.getSourcePortId() },
            target: { id: edge.getTargetCellId(), port: edge.getTargetPortId() }
          }
        });
        return false;
      }
    },
  });

  graph.use(
    new Snapline({
      enabled: true,
    }),
  );

  graph.on('blank:click', ({ e, x, y}) => {
    context.getSelection().setKeys([]);
  });

  graph.on('cell:click', ({ e, x, y, cell, view }) => {
    context.getSelection().setKeys([cell.id]);
  });

  graph.on('node:moved', ({ e, x, y, cell, view  }) => {
    const node = context.getNode(cell.id);
    const position = cell.getPosition();
    node?.setPropData('position', position);
  });
  return graph;
}
