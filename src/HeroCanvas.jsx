import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function ParticleField({ count = 700 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 22;
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x = state.pointer.y * 0.15;
    ref.current.rotation.z = state.pointer.x * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#22d3ee" transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function FloatingTorus() {
  const ref = useRef();
  const isWide = typeof window !== 'undefined' && window.innerWidth > 768;

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
    ref.current.position.x = (isWide ? 2.6 : 0) + state.pointer.x * 0.6;
    ref.current.position.y = state.pointer.y * 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.25;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group ref={ref} position={[isWide ? 2.6 : 0, 0, -2.5]}>
      <mesh>
        <torusKnotGeometry args={[1.25, 0.33, 220, 36]} />
        <meshStandardMaterial color="#05050f" emissive="#22d3ee" emissiveIntensity={0.18} wireframe transparent opacity={0.85} />
      </mesh>
      <mesh scale={0.92}>
        <torusKnotGeometry args={[1.25, 0.33, 220, 36]} />
        <meshStandardMaterial color="#0b0b1e" emissive="#8b5cf6" emissiveIntensity={0.1} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.1;
    ref.current.rotation.x = Math.PI / 2.4 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });
  return (
    <group ref={ref} position={[typeof window !== 'undefined' && window.innerWidth > 768 ? 2.6 : 0, 0, -2.5]}>
      <mesh>
        <torusGeometry args={[2.2, 0.012, 8, 128]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.7, 0.01, 8, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={1} color="#8b5cf6" />
      <ParticleField />
      <FloatingTorus />
      <OrbitRings />
    </>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function HeroCanvas() {
  const [webgl] = useState(() => supportsWebGL());
  if (!webgl) return null;
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 55 }}
      className="!absolute !inset-0"
    >
      <HeroScene />
    </Canvas>
  );
}
