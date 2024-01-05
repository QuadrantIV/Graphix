import { ReactNode, ComponentType, isValidElement, cloneElement, createElement } from 'react';
import { ComponentClass, Component, FunctionComponent } from 'react';

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;

export function isReactClass(obj: any): obj is ComponentClass<any> {
  return obj && obj.prototype && (obj.prototype.isReactComponent || obj.prototype instanceof Component);
}

function isForwardRefType(obj: any): boolean {
  return obj?.$$typeof && obj?.$$typeof === REACT_FORWARD_REF_TYPE;
}

export function isReactComponent(obj: any): obj is ComponentType<any> {
  return obj && (isReactClass(obj) || typeof obj === 'function' || isForwardRefType(obj));
}

export function createContent(content: ReactNode | ComponentType<any>, props?: Record<string, unknown>): ReactNode {
  if (isValidElement(content)) {
    return props ? cloneElement(content, props) : content;
  }
  if (isReactComponent(content)) {
    return createElement(content, props);
  }

  return content;
}
