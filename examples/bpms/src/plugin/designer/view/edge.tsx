import { Graph, Edge } from '@antv/x6';
import React, { memo, useEffect, useRef } from 'react';
import { PropsData, prototypeRegistry } from 'graphix-engine';

interface Props {
  graph: Graph;
  id: string;
  type: string;
  nodeProps: PropsData;
  onMountEdge: (edge: Edge) => void;
  onUnMountEdge: (edge: Edge) => void;
}

const EdgeComponent = memo((props: Props) => {
  const x6EdgeRef = useRef<Edge>();

  useEffect(() => {
    const { id, type, graph } = props;
    const view = prototypeRegistry.getPrototypeByType(type)?.getView();
    // 创建 x6 edge
    const x6Edge = graph.createEdge({
      id,
      ...view
    });
    x6EdgeRef.current = x6Edge;
    // 收集 edge 统一添加到画布
    props.onMountEdge(x6Edge);

    return () => {
      props.onUnMountEdge(x6Edge);
    }
  }, []);

  useEffect(() => {
    const x6Edge = x6EdgeRef.current;
    if (x6Edge) {
      const { source, target } = props.nodeProps;
      x6Edge.setSource({ cell: source?.id, port: source?.port });
      x6Edge.setTarget({ cell: target?.id, port: target?.port });
    }
  }, [props.nodeProps]);

  return null;
})

export default EdgeComponent;

