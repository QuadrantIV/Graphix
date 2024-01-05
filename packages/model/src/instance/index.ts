import PrototypeRegistry from './prototype-registry';
import SetterRegistry from './setter-registry';
import Config from './config';
import PluginRegistry from './plugin-registry';

const pluginRegistry = new PluginRegistry();
const prototypeRegistry = new PrototypeRegistry();
const setterRegistry = new SetterRegistry();
const config = new Config();

export {
  config,
  prototypeRegistry,
  setterRegistry,
  pluginRegistry
};
