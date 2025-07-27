import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Import textures
import planetTexture from '../assets/planet.jpg';
import ringTexture from '../assets/ring.jpg';

const Planet = ({
  color = '#ffffff',
  size = 20, // 2x larger
  position = [-150, -100, -300], // Bottom left position
  rotationSpeed = 0.1,
  hasRings = true
}) => {
  const groupRef = useRef();
  const moonRef = useRef();
  const angleRef = useRef(0);

  // Static constants (internal use only)
  const tilt = Math.PI / 4;
  const ringInner = size * 2.2;
  const ringOuter = size * 3.2;
  const moonOrbitSpeed = 0.5;
  const planetRadius = size * 2;

  // Use textures with useTexture
  const planetTextureMap = useTexture(planetTexture);
  const ringTextureMap = useTexture(ringTexture);

  // Animate rotation and moon orbit
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }

    if (moonRef.current) {
      angleRef.current += delta * moonOrbitSpeed;
      const orbitRadius = planetRadius * 1.25;
      moonRef.current.position.set(
        Math.cos(angleRef.current) * orbitRadius,
        0,
        Math.sin(angleRef.current) * orbitRadius
      );
    }
  });

  return (
    <group ref={groupRef} position={position} castShadow receiveShadow>
      {/* 🌍 Main Planet */}
      <Sphere args={[planetRadius, 64, 64]} castShadow receiveShadow>
        <meshStandardMaterial map={planetTextureMap} />
      </Sphere>

      {/* 🪐 Rings (optional) */}
      {hasRings && (
        <mesh rotation={[tilt, 0, 0]}>
          <ringGeometry args={[ringInner, ringOuter, 64]} />
          <meshBasicMaterial
            map={ringTextureMap}
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
};

const Planets = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[100, 100, 100]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Planet
        position={[-400, -200, -200]} // Bottom left position
        color="#ffaa88"
        rotationSpeed={0.1}
        hasRings
        size={40} // 2x larger
      />
    </>
  );
};

export default Planets;
