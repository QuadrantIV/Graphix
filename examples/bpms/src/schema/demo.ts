export const DemoSchema = {
  id: 'd94bc0d46131c',
  documentType: 'bpms',
  documentVersion: '1.0.0',
  props: {
    variables: '{}',
  },
  nodes: [
    {
      type: 'StartEvent',
      props: {
        position: {
          x: 450,
          y: 150,
        },
      },
      id: 'node-start',
    },
    {
      type: 'EndEvent',
      props: {
        position: {
          x: 450,
          y: 550,
        },
      },
      id: 'node-end',
    },
    {
      type: 'UserTask',
      props: {
        name: '用户任务',
        description: '由人工处理的任务',
        position: {
          x: 352,
          y: 410,
        },
      },
      id: 'node_lqyw35yl',
    },
    {
      type: 'SequenceFlow',
      props: {
        source: {
          id: 'node_lqyw35yl',
          port: 'bottom',
        },
        target: {
          id: 'node-end',
          port: 'top',
        },
      },
      id: 'node_lqyw35yo',
    },
    {
      type: 'ServiceTask',
      props: {
        name: '服务任务',
        description: '由系统或外部服务处理的任务',
        position: {
          x: 352,
          y: 266,
        },
      },
      id: 'node_lr0konzp',
    },
    {
      type: 'SequenceFlow',
      props: {
        source: {
          id: 'node-start',
          port: 'bottom',
        },
        target: {
          id: 'node_lr0konzp',
          port: 'top',
        },
      },
      id: 'node_lr0konzs',
    },
    {
      type: 'SequenceFlow',
      props: {
        source: {
          id: 'node_lr0konzp',
          port: 'bottom',
        },
        target: {
          id: 'node_lqyw35yl',
          port: 'top',
        },
      },
      id: 'node_lr0konzt',
    },
  ],
};
