import { GatewayParallel, GatewayXOR, ServiceTaskIcon, UserTaskIcon } from "./icon";
import { NodeType } from "./component/types";

export const componentsInfo = {
  [NodeType.UserTask]: {
    icon: <UserTaskIcon />,
    name: '用户任务',
    description: '由人工处理的任务'
  },
  [NodeType.ServiceTask]: {
    icon: <ServiceTaskIcon />,
    name: '服务任务',
    description: '由系统或外部服务处理的任务'
  },
  [NodeType.ExclusiveGateway]: {
    icon: <GatewayXOR />,
    name: '排他网关',
    description: '在流程中进行条件分支的节点'
  },
  [NodeType.ParallelGateway]: {
    icon: <GatewayParallel />,
    name: '并行网关',
    description: '在流程中进行并行处理的节点'
  }
}