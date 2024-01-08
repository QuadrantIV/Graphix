import PrototypeRegistry from './prototype-registry';
import SetterRegistry from './setter-registry';
import PluginRegistry from './plugin-registry';

const pluginRegistry = new PluginRegistry();
const prototypeRegistry = new PrototypeRegistry();
const setterRegistry = new SetterRegistry();

export {
  prototypeRegistry,
  setterRegistry,
  pluginRegistry
};
