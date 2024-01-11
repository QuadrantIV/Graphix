import { prototypeRegistry, PropsData } from 'graphix-engine';
import { Graph, Node } from '@antv/x6';
import React, { memo, useEffect, useRef } from 'react';

interface Props {
  graph: Graph;
  id: string;
  type: string;
  nodeProps: PropsData;
  onMountNode: (node: Node) => void;
  onUnMountNode: (node: Node) => void;
}

const NodeComponent = memo((props: Props) => {
  const x6NodeRef = useRef<Node>();

  useEffect(() => {
    const { id, type, graph, onMountNode, onUnMountNode } = props;
    const view = prototypeRegistry.getPrototypeByType(type)?.getView();
    // 创建 x6 node
    const x6Node = graph.createNode({
      id,
      ...view,
    });
    x6NodeRef.current = x6Node;
    // 收集 node 统一添加到画布
    onMountNode(x6Node);
    return () => {
      onUnMountNode(x6Node);
    }
  }, []);

  useEffect(() => {
    const x6Node = x6NodeRef.current;
    if (x6Node) {
      const { position, name, description } = props.nodeProps;
      x6Node.setPosition(position);

      x6Node.setData({
        type: props.type,
        name,
        description
      });
    }
  }, [props.nodeProps]);

  return null;
});

export default NodeComponent;

