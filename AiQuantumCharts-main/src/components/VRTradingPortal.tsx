import React, { useRef, useEffect } from 'react';
// @ts-ignore
import { Canvas } from '@react-three/fiber';
// @ts-ignore
import { XR, Controllers, Hands, useXR } from '@react-three/xr';

// Simple 3D trading room demo
const TradingRoom = () => {
  // XR session info (headset detection, etc.)
  const { player } = useXR();
  useEffect(() => {
    if (player) {
      // You can add device-specific logic here
      // e.g., if (player.device === 'oculus') { ... }
    }
  }, [player]);

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Trading Desk */}
      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[2, 0.2, 1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Chart Panel */}
      <mesh position={[0, 1, -2]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#0ff" />
      </mesh>
      {/* Avatar (placeholder) */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#f0f" />
      </mesh>
    </group>
  );
};

export const VRTradingPortal: React.FC = () => (
  <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
    <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 70 }}>
      <XR>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
        <Controllers />
        <Hands />
        <TradingRoom />
      </XR>
    </Canvas>
    <div style={{ position: 'absolute', top: 20, left: 20, color: '#fff', zIndex: 10 }}>
      <h2>VR Trading Portal (WebXR Ready)</h2>
      <p>Supports Meta Quest, Apple Vision Pro, Sony, NVIDIA, and more.</p>
    </div>
  </div>
);
