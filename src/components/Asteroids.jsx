import * as THREE from 'three'
import React, { useRef, useMemo, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import ringTextureUrl from '../assets/ring.jpg'

const Asteroids = ({ count = 100 }) => {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const [particles, setParticles] = useState([])
  const spawnTimer = useRef(0)
  const texture = useLoader(TextureLoader, ringTextureUrl)

  // Create initial asteroid state
  useMemo(() => {
    const initialParticles = []
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        -100 + Math.random() * 200,
        -100 + Math.random() * 200,
        -100 + Math.random() * 200
      )
      const speed = 0.5 + Math.random() * 1.5
      const direction = new THREE.Vector3(1, 1, 0.3).normalize().multiplyScalar(speed)
      const scale = 0.5 + Math.random() * 1.5
      initialParticles.push({ position, direction, scale })
    }
    setParticles(initialParticles)
  }, [count])

  useFrame((_, delta) => {
    spawnTimer.current += delta
    
    // Spawn new asteroids every 2-4 seconds
    if (spawnTimer.current > 2 + Math.random() * 2) {
      spawnTimer.current = 0
      
      const newParticle = {
        position: new THREE.Vector3(
          -100 + Math.random() * 200,
          -100 + Math.random() * 200,
          -100 + Math.random() * 200
        ),
        direction: new THREE.Vector3(1, 1, 0.3).normalize().multiplyScalar(0.5 + Math.random() * 1.5),
        scale: 0.5 + Math.random() * 1.5
      }
      
      setParticles(prev => [...prev, newParticle])
    }

    particles.forEach((p, i) => {
      // Move in a straight line
      p.position.addScaledVector(p.direction, delta)

      dummy.position.copy(p.position)
      dummy.scale.set(p.scale, p.scale, p.scale)
      dummy.rotation.set(p.scale * 5, p.scale * 5, p.scale * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, particles.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial map={texture} roughness={0.8} />
    </instancedMesh>
  )
}

export default Asteroids;
