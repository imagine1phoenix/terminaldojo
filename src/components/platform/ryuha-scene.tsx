'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { RyuhaSceneType } from '@/lib/constants/ryuha-schools'

interface SceneProps {
  type: RyuhaSceneType
  active?: boolean
  primary: string
  secondary: string
}

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453123
  return value - Math.floor(value)
}

function DockerScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const droplets = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => ({
      id: i,
      offset: (i / 11) * Math.PI * 2,
      radius: 0.45 + (i % 3) * 0.22,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.24 * speed
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.35} transparent opacity={0.42} />
      </mesh>
      {droplets.map((drop) => (
        <mesh
          key={drop.id}
          position={[
            Math.cos(drop.offset) * drop.radius,
            Math.sin(drop.offset * 1.6) * 0.32,
            Math.sin(drop.offset) * drop.radius,
          ]}
        >
          <icosahedronGeometry args={[0.12, 1]} />
          <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function GitScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const rootRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!rootRef.current) return
    rootRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55 * speed) * 0.12
    rootRef.current.rotation.y = state.clock.elapsedTime * 0.16 * speed
  })

  return (
    <group ref={rootRef}>
      <mesh position={[0, -0.15, 0]} rotation={[0.3, 0.2, 0.5]}>
        <boxGeometry args={[1.2, 0.08, 0.14]} />
        <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.5} />
      </mesh>
      <Line points={[[0, 0, 0], [0.65, 0.42, 0], [1.05, 0.64, 0.12]]} color={secondary} lineWidth={2.4} />
      <Line points={[[0, 0, 0], [-0.62, 0.35, -0.12], [-0.95, 0.78, -0.16]]} color={secondary} lineWidth={2.2} />
      <Line points={[[0.1, -0.08, 0], [0.55, -0.52, 0.12]]} color={secondary} lineWidth={1.8} />
    </group>
  )
}

function AwsScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)
  const nodes = useMemo(() => [
    [0.7, 0.3, 0],
    [-0.6, 0.2, 0.2],
    [0.2, -0.55, -0.1],
    [-0.2, 0.65, -0.2],
  ] as const, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.12 * speed
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.04
  })

  return (
    <group ref={ref}>
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.62, 30, 30]} />
        <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.42} transparent opacity={0.34} />
      </mesh>
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.45} />
        </mesh>
      ))}
      <Line points={[nodes[0], nodes[1], nodes[2], nodes[0]]} color={secondary} lineWidth={1.5} />
      <Line points={[nodes[1], nodes[3], nodes[0]]} color={secondary} lineWidth={1.2} />
    </group>
  )
}

function KubernetesScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)
  const crystals = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2
      return {
        id: i,
        position: [Math.cos(angle) * 0.75, Math.sin(angle) * 0.25, Math.sin(angle) * 0.55] as [number, number, number],
      }
    })
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.18 * speed
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.16
  })

  return (
    <group ref={ref}>
      {crystals.map((crystal) => (
        <mesh key={crystal.id} position={crystal.position}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={primary} emissive={secondary} emissiveIntensity={0.32} />
        </mesh>
      ))}
      <mesh>
        <torusGeometry args={[0.62, 0.04, 12, 64]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.48} />
      </mesh>
    </group>
  )
}

function BashScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)
  const points = useMemo(
    () => [
      [-1.1, 0.2, 0],
      [-0.6, 0.62, 0],
      [-0.22, -0.18, 0],
      [0.22, 0.28, 0],
      [0.85, -0.35, 0],
      [1.08, 0.15, 0],
    ] as [number, number, number][],
    [],
  )

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.26 * speed) * 0.25
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 * speed) * 0.05
  })

  return (
    <group ref={ref}>
      <Line points={points} color={primary} lineWidth={2.8} />
      <mesh position={[0.95, 0.12, 0.14]}>
        <boxGeometry args={[0.28, 0.22, 0.22]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.44} />
      </mesh>
    </group>
  )
}

function CurlScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)
  const points = useMemo(() => {
    const arr: [number, number, number][] = []
    for (let i = 0; i < 26; i++) {
      const t = (i / 25) * Math.PI * 2
      arr.push([Math.cos(t) * 0.92, Math.sin(t * 1.9) * 0.32, Math.sin(t) * 0.65])
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
  })

  return (
    <group ref={ref}>
      <Line points={points} color={primary} lineWidth={2.1} />
      <mesh position={[-0.65, 0.14, -0.12]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.42} />
      </mesh>
      <mesh position={[0.75, -0.18, 0.2]}>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.42} />
      </mesh>
    </group>
  )
}

function HomebrewScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.15 * speed
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.03
  })

  return (
    <group ref={ref}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.75, 0.6, 32]} />
        <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.36} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.22, 0.42, 12]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.52} />
      </mesh>
      <mesh position={[0.34, 0.04, 0.22]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.48, 0.06, 0.08]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.45} />
      </mesh>
    </group>
  )
}

function NodeScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.18 * speed
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.14
  })

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.36} wireframe />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.55} />
      </mesh>
    </group>
  )
}

function PythonScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const ref = useRef<THREE.Group>(null)
  const points = useMemo(() => {
    const arr: [number, number, number][] = []
    for (let i = 0; i < 30; i++) {
      const t = (i / 29) * Math.PI * 2
      arr.push([Math.sin(t * 1.2) * 0.45, Math.cos(t) * 0.72, Math.sin(t) * 0.35])
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
  })

  return (
    <group ref={ref}>
      <Line points={points} color={primary} lineWidth={3} />
      <mesh position={[0.24, 0.28, 0.02]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.2, -0.3, -0.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function CloudCliScene({ speed = 1, primary, secondary }: { speed?: number; primary: string; secondary: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  const points = useMemo(() => {
    const data = new Float32Array(600)
    for (let i = 0; i < 200; i++) {
      data[i * 3] = (seededUnit(i, 1) - 0.5) * 1.9
      data[i * 3 + 1] = (seededUnit(i, 2) - 0.5) * 1.4
      data[i * 3 + 2] = (seededUnit(i, 3) - 0.5) * 1.6
    }
    return data
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1 * speed
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.2
  })

  return (
    <group>
      <Points ref={pointsRef} positions={points} stride={3} frustumCulled>
        <PointMaterial transparent color={primary} size={0.024} sizeAttenuation depthWrite={false} />
      </Points>
      <mesh position={[0, -0.05, 0]}>
        <torusKnotGeometry args={[0.36, 0.08, 120, 16]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function SceneVariant({ type, active, primary, secondary }: SceneProps) {
  const speed = active ? 1.8 : 1

  if (type === 'docker') return <DockerScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'git') return <GitScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'aws') return <AwsScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'kubernetes') return <KubernetesScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'bash') return <BashScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'curl') return <CurlScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'homebrew') return <HomebrewScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'node') return <NodeScene speed={speed} primary={primary} secondary={secondary} />
  if (type === 'python') return <PythonScene speed={speed} primary={primary} secondary={secondary} />
  return <CloudCliScene speed={speed} primary={primary} secondary={secondary} />
}

export function RyuhaScene({ type, active = false, primary, secondary }: SceneProps) {
  return (
    <div className="h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 44 }} dpr={[1, 1.5]} performance={{ min: 0.45 }}>
        <color attach="background" args={['#06070a']} />
        <ambientLight intensity={0.42} />
        <pointLight position={[1.8, 1.6, 2.2]} intensity={1.5} color={primary} />
        <pointLight position={[-1.6, -0.8, 1.8]} intensity={1.1} color={secondary} />
        <Float speed={active ? 1.6 : 1} rotationIntensity={active ? 0.5 : 0.25}>
          <SceneVariant type={type} active={active} primary={primary} secondary={secondary} />
        </Float>
      </Canvas>
    </div>
  )
}
