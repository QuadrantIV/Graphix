import { Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import './index.less';
import { ShapeType } from '../types';
import { prototypeRegistry, createContent } from 'graphix-engine';

const TaskShape = ({ node }: { node: Node }) => {
  // 当前节点属性数据
  const { type, name, description } = node.getData();
  // 节点原型描述
  const prototype = prototypeRegistry.getPrototypeByType(type)!;
  const { icon } = prototype.getConfig();
  const { name: defaultName, description: defaultDescription } = prototype.getProps();
  
  return (
    <div className="task-shape">
      <div>{ createContent(icon) }</div>
      <div>
        <div className="task-shape-name">{name || defaultName}</div>
        <div className="task-shape-description">{description || defaultDescription}</div>
      </div>
    </div>
  )
}

const portProps = (position: string) => ({
  position,
  attrs: {
    circle: {
      r: 4,
      magnet: true,
      stroke: '#C2C8D5',
      strokeWidth: 1,
      fill: '#fff',
    },
  },
});

register({
  shape: ShapeType.Common,
  width: 240,
  height: 57,
  effect: ['data'],
  component: TaskShape,
  ports: {
    groups: {
      top: portProps('top'),
      bottom: portProps('bottom'),
    },
    items: [
      {
        id: 'top',
        group: 'top',
      },
      {
        id: 'bottom',
        group: 'bottom'
      }
    ],
  },
});

export const CommonLineView = {
  attrs: {
    line: {
      stroke: '#687078',
      strokeWidth: 1,
      strokeDasharray: 5,
      targetMarker: {
        name: 'block',
        size: 6
      },
      style: {
        animation: 'animate-line 30s infinite linear',
      },
    },
  },
  connector: { name: 'rounded' },
  router: {
    name: 'manhattan',
  },
};

export const StartEventView = {
  shape: 'circle',
  width: 44,
  height: 44,
  label: '开始',
  attrs: {
    body: {
      fill: '#2c2c2c',
    },
    text: {
      fill: '#fff',
      fontSize: '12px'
    }
  },
  ports: {
    groups: {
      bottom: portProps('bottom'),
    },
    items: [
      {
        id: 'bottom',
        group: 'bottom'
      }
    ],
  },
};

export const EndEventView = {
  shape: 'circle',
  width: 44,
  height: 44,
  label: '结束',
  attrs: {
    body: {
      fill: '#2c2c2c',
    },
    text: {
      fill: '#fff',
      fontSize: '12px'
    }
  },
  ports: {
    groups: {
      top: portProps('top'),
    },
    items: [
      {
        id: 'top',
        group: 'top'
      }
    ],
  },
}