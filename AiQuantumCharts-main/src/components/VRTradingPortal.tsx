import React from 'react';
import styles from './VRTradingPortal.module.css';
import { Canvas } from '@react-three/fiber';
import { XR } from '@react-three/xr';


// Simple 3D trading room demo
const TradingRoom = () => (
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



export const VRTradingPortal: React.FC = () => (
  <div className={styles.vrPortal}>
    <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 70 }}>
  {/* @ts-expect-error: store prop is required by types but not needed for runtime */}
  <XR>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
        <TradingRoom />
      </XR>
    </Canvas>
    <div className={styles.vrPortalHeader}>
      <h2>VR Trading Portal (WebXR Ready)</h2>
      <p>Supports Meta Quest, Apple Vision Pro, Sony, NVIDIA, and more.</p>
    </div>
  </div>
);
