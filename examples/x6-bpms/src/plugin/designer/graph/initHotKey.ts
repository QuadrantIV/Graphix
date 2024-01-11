import { utils, workspace } from 'graphix-engine';
import hotkeys from 'hotkeys-js';
import { EdgeType } from '../../../component/types';

export default function initHotkey() {
  const doc = workspace.getDocument();

  hotkeys('backspace, del', (event: KeyboardEvent) => {
    event.preventDefault();

    const selections = doc.getSelection().getKeys();
    if (selections.length) {
      const selected = doc.getNode(selections[0]);
      const ins = doc.getNodes().filter(node => node.getType() === EdgeType.SequenceFlow && node.getPropData('target')?.id === selected?.getId());
      const outs = doc.getNodes().filter(node => node.getType() === EdgeType.SequenceFlow && node.getPropData('source')?.id === selected?.getId());

      [...ins, ...outs].map(n => n.remove());
      selected?.remove();
    }
  });

  hotkeys('command+s, ctrl+s', (event: KeyboardEvent) => {
    event.preventDefault();
  });

  hotkeys('command+z, ctrl+z', (event: KeyboardEvent) => {
    event.preventDefault();
    doc.getTimeline().back();
  });

  hotkeys('command+shift+z, ctrl+shift+z', (event: KeyboardEvent) => {
    event.preventDefault();
    doc.getTimeline().forward();
  });
}
