import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const Asteroids = ({ count = 100 }) => {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Create initial asteroid state
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        -100 + Math.random() * 200,
        -100 + Math.random() * 200,
        -100 + Math.random() * 200
      )
      const speed = 0.5 + Math.random() * 1.5
      const direction = new THREE.Vector3(1, 1, 0.3).normalize().multiplyScalar(speed)
      const scale = 0.5 + Math.random() * 1.5
      arr.push({ position, direction, scale })
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
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
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#828282" roughness={0.8} />
    </instancedMesh>
  )
}

export default Asteroids
