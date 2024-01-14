import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { getContext } from 'graphix-engine';

const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = getContext();

  const init = useCallback((container) => {
    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const nodes = context.getNodes();
    const meshes = nodes.map(n => {
      const { position, size } = n.getPropsData();
      const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position.x, position.y, position.z);
      mesh.userData.gid = n.getId();
      scene.add(mesh);
      return mesh;
    });

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const dragControls = new DragControls(meshes, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', (event) => controls.enabled = false);
    dragControls.addEventListener('dragend', (event) => controls.enabled = true);

    const raycaster = new THREE.Raycaster();
    const onMouseDown = (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      let selected;
      for (const mesh of meshes) {
        const intersects = raycaster.intersectObject(mesh);
        if (intersects.length > 0) {
          selected = intersects[0].object;
          break;
        }
      }
      onSelect(selected);
    };

    const onSelect = (object?: THREE.Object3D) => {
      console.log("Selected object:", object);
      if (object) {
        context.getSelection().setKeys([object.userData.gid]);
      } else {
        context.getSelection().setKeys([]);
      }
    };
    container.addEventListener('mousedown', onMouseDown);
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      container.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const dispose = init(containerRef.current);
      return dispose;
    }
  }, [init]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
  );
};

export default Scene;