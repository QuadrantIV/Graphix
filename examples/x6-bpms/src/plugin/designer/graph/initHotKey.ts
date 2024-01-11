import { getContext } from 'graphix-engine';
import hotkeys from 'hotkeys-js';
import { EdgeType } from '../../../component/types';

export default function initHotkey() {
  const context = getContext();

  hotkeys('backspace, del', (event: KeyboardEvent) => {
    event.preventDefault();

    const selections = context.getSelection().getKeys();
    if (selections.length) {
      const selected = context.getNode(selections[0]);
      const ins = context.getNodes().filter(node => node.getType() === EdgeType.SequenceFlow && node.getPropData('target')?.id === selected?.getId());
      const outs = context.getNodes().filter(node => node.getType() === EdgeType.SequenceFlow && node.getPropData('source')?.id === selected?.getId());

      [...ins, ...outs].map(n => n.remove());
      selected?.remove();
    }
  });

  hotkeys('command+s, ctrl+s', (event: KeyboardEvent) => {
    event.preventDefault();
  });

  hotkeys('command+z, ctrl+z', (event: KeyboardEvent) => {
    event.preventDefault();
    context.getTimeline().back();
  });

  hotkeys('command+shift+z, ctrl+shift+z', (event: KeyboardEvent) => {
    event.preventDefault();
    context.getTimeline().forward();
  });
}
