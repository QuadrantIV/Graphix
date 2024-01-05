export enum NodeType {
  StartEvent = 'StartEvent',
  EndEvent = 'EndEvent',
  UserTask = 'UserTask',
  ServiceTask = 'ServiceTask',
  ExclusiveGateway = 'ExclusiveGateway',
  ParallelGateway = 'ParallelGateway'
}

export enum EdgeType {
  SequenceFlow = 'SequenceFlow',
}

export enum ShapeType {
  Common = 'Common',
}