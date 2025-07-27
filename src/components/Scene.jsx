import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Planets from './Planets';
import Asteroids from './Asteroids';

const Scene = () => {
  return (
    <>
      {/* Image positioned at top right */}
      <img 
        src="/image.png" 
        alt="Top right decoration" 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 2,
          maxWidth: '150px',
          maxHeight: '150px',
          objectFit: 'contain'
        }}
      />
      <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} intensity={2} />
        <Suspense fallback={null}>
          <Stars
            radius={300}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />
          <Planets />
          <Asteroids />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Scene;
