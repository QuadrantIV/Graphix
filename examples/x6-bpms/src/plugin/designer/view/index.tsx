import React from 'react';
import NodeComponent from './node';
import EdgeComponent from './edge';
import { Node, Edge, Graph } from '@antv/x6';
import { Node as GraphixNode, getContext } from 'graphix-engine';
import { EdgeType, NodeType } from '../../../component/types';

interface Props {
  graph: Graph;
}

/**
 * render node & edge model
 */
class Views extends React.PureComponent<Props> {
  x6Nodes: Node[] = [];
  x6Edges: Edge[] = [];
  mounted: boolean = false;

  componentDidMount() {
    const { graph } = this.props;

    graph.resetCells([...this.x6Nodes, ...this.x6Edges]);
    this.mounted = true;

    getContext().getTimeline().onStateChange(state => {
      this.forceUpdate();
    });
  }

  // 收集 edge
  onMountEdge = (edge: Edge) => {
    const { graph } = this.props;
    this.x6Edges.push(edge);

    if (this.mounted) { 
      graph.addEdge(edge);
    }
  }

  // 收集 node
  onMountNode = (node: Node) => {
    const { graph } = this.props;
    this.x6Nodes.push(node);

    if (this.mounted) {
      graph.addNode(node);
    }
  }

  onUnMountNode = (node: Node) => {
    const { graph } = this.props;
    const index = this.x6Nodes.indexOf(node);
    this.x6Nodes.splice(index, 1);

    // 删节点需要后置，否则 x6 会删掉关联边
    requestAnimationFrame(() => {
      if (this.mounted) {
        graph.removeCell(node);
      }
    })
  }

  onUnMountEdge = (edge: Edge) => {
    const { graph } = this.props;
    const index = this.x6Edges.indexOf(edge);
    this.x6Edges.splice(index, 1);

    if (this.mounted) {
      graph.removeCell(edge);
    }
  }

  render() {
    const { graph } = this.props;
    let nodes: GraphixNode[] = [];
    let edges: GraphixNode[] = [];
    for(const item of getContext().getNodes()) {
      if (item.getType() === EdgeType.SequenceFlow) {
        edges.push(item);
      } else {
        nodes.push(item);
      }
    }
    return (
      <>
        {
          nodes.map(node => (
            <NodeComponent
              key={node.getId()}
              graph={graph}
              id={node.getId()}
              type={node.getType()}
              nodeProps={node.getPropsData()}
              onMountNode={this.onMountNode}
              onUnMountNode={this.onUnMountNode}
            />
          ))
        }
        {
          edges.map(edge => (
            <EdgeComponent
              key={edge.getId()}
              graph={graph}
              id={edge.getId()}
              type={edge.getType()}
              nodeProps={edge.getPropsData()}
              onMountEdge={this.onMountEdge}
              onUnMountEdge={this.onUnMountEdge}
            />
          ))
        }
      </>
    )
  }
}

export default Views;
