import React from 'react';
import TopBar from './layout/topbar';
import LeftArea from './layout/left-area';
import RightPanel from './layout/right-area';
import Toolbar from './layout/toolbar';
import MainArea from './layout/main-area';
import './style/index.less';

export class SkeletonView extends React.PureComponent {
  render() {
    return (
      <div className="graphix-skeleton">
        <TopBar/>
        <div className="graphix-skeleton-content">
          <LeftArea />
          <div className='graphix-skeleton-content-main'>
            <Toolbar />
            <MainArea />
          </div>
          <RightPanel />
        </div>
      </div>
    )
  }
}