

import React, { useEffect, useRef, useState } from 'react';
import Views from './view';
import initGraph from './graph/initGraph';
import initDnd from './graph/initDnd';
import { Graph } from '@antv/x6';
import initHotkey from './graph/initHotKey';

export default function Designer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<Graph>();

  useEffect(() => {
    const graph = initGraph(containerRef.current!);
    initDnd(graph);
    initHotkey();
    setGraph(graph);
  }, []);

  return (
    <div ref={containerRef}>
      {
        graph && <Views graph={graph} />
      }
    </div>
  )
}