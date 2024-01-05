import { workspace } from 'graphix-engine';
import { Button } from '@alifd/next';

const SaveButton = () => {
  const onClick = () => {
    const data = workspace.getDocument().getData();
    console.log(data);
  }
  return (
    <div>
      <Button type="primary" onClick={onClick}>保存</Button>
    </div>
  )
}

export default SaveButton;