import React from 'react';
import TopBar from './layout/topbar';
import LeftArea from './layout/left-area';
import RightPanel from './layout/right-area';
import Toolbar from './layout/toolbar';
import MainArea from './layout/main-area';
import './style/index.less';
import { Context } from 'graphix-model';

interface Props {
  context: Context;
}

export class SkeletonView extends React.PureComponent<Props> {
  render() {
    const { context } = this.props;
    return (
      <div className="graphix-skeleton">
        <TopBar/>
        <div className="graphix-skeleton-content">
          <LeftArea />
          <div className='graphix-skeleton-content-main'>
            <Toolbar />
            <MainArea />
          </div>
          <RightPanel context={context} />
        </div>
      </div>
    )
  }
}