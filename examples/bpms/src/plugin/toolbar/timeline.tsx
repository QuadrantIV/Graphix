import { workspace } from 'graphix-engine';
import { Button } from '@alifd/next';

const Timeline = () => {
  const undo = () => {
    workspace.getDocument().getTimeline().back();
  }

  const redo = () => {
    workspace.getDocument().getTimeline().forward();
  }
  return (
    <div>
      <Button className="mr-8" type="normal" onClick={undo}>撤销</Button>
      <Button type="normal" onClick={redo}>恢复</Button>
    </div>
  )
}

export default Timeline;