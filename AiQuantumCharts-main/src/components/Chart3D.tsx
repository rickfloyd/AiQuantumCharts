import React, { useRef, useEffect } from "react";
// @ts-ignore
import * as THREE from 'three';

// 3D/VR Charting Component (WebGL/Three.js)
export const Chart3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = 600;
    const height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Example: 3D candlestick bars
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BoxGeometry(0.3, Math.random() * 2 + 0.5, 0.3);
      const material = new THREE.MeshStandardMaterial({ color: i % 2 ? 0x00ff00 : 0xff0055 });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = i - 10;
      bar.position.y = geometry.parameters.height / 2;
      scene.add(bar);
    }

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 15;

    const animate = function () {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="my-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">3D/VR Charting (Experimental)</h2>
      <div ref={mountRef} className="rounded-xl border border-cyan-700 shadow-lg" />
    </div>
  );
};
