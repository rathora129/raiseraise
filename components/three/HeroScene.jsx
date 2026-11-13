'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function DoorPanels({ progress }) {
  const left = useRef();
  const right = useRef();

  useFrame((_, delta) => {
    if (!left.current || !right.current) return;
    const t = progress.current;
    const k = 1 - Math.pow(0.001, delta);
    left.current.position.x = THREE.MathUtils.lerp(left.current.position.x, -0.66 - t * 1.18, k);
    right.current.position.x = THREE.MathUtils.lerp(right.current.position.x, 0.66 + t * 1.18, k);
  });

  return (
    <group>
      <group ref={left} position={[-0.66, 1.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.3, 2.76, 0.08]} />
          <meshStandardMaterial color="#9aa29e" metalness={1} roughness={0.32} />
        </mesh>
        <mesh position={[0.32, 0, 0.045]}>
          <boxGeometry args={[0.012, 2.76, 0.002]} />
          <meshStandardMaterial color="#6f7a75" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
      <group ref={right} position={[0.66, 1.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.3, 2.76, 0.08]} />
          <meshStandardMaterial color="#a3aaa6" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[-0.32, 0, 0.045]}>
          <boxGeometry args={[0.012, 2.76, 0.002]} />
          <meshStandardMaterial color="#6f7a75" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
      <mesh position={[0, 1.38, -0.055]}>
        <planeGeometry args={[2.55, 2.7]} />
        <meshBasicMaterial color="#22d6b0" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function Cabin({ progress }) {
  const light = useRef();
  useFrame(() => {
    if (light.current) {
      light.current.intensity = 1.5 + progress.current * 6;
    }
  });

  return (
    <group position={[0, 0, -0.62]}>
      {/* floor */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial color="#2b2520" roughness={0.45} metalness={0.25} />
      </mesh>
      {/* ceiling */}
      <mesh position={[0, 2.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial color="#171b18" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.7, 0.75]} />
        <meshStandardMaterial color="#ffe9c4" emissive="#ffd9a0" emissiveIntensity={2.2} />
      </mesh>
      {/* back wall */}
      <mesh position={[0, 1.38, -0.72]}>
        <planeGeometry args={[2.56, 2.7]} />
        <meshStandardMaterial color="#6b5847" metalness={0.55} roughness={0.34} />
      </mesh>
      {/* side walls */}
      <mesh position={[-1.28, 1.38, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.45, 2.7]} />
        <meshStandardMaterial color="#8f9692" metalness={1} roughness={0.34} />
      </mesh>
      <mesh position={[1.28, 1.38, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.45, 2.7]} />
        <meshStandardMaterial color="#8f9692" metalness={1} roughness={0.34} />
      </mesh>
      {/* handrail */}
      <mesh position={[0, 1.02, -0.66]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 2.3, 16]} />
        <meshStandardMaterial color="#b9a06a" metalness={1} roughness={0.24} />
      </mesh>
      <pointLight ref={light} position={[0, 2.35, 0]} color="#ffd7a1" intensity={4} distance={4} />
    </group>
  );
}

function Lobby({ lowPower }) {
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 2.4]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        {lowPower ? (
          <meshStandardMaterial color="#07110e" metalness={0.5} roughness={0.42} />
        ) : (
          <MeshReflectorMaterial
            resolution={512}
            blur={[320, 90]}
            mixBlur={1.1}
            mixStrength={7}
            roughness={0.62}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.5}
            color="#07110e"
            metalness={0.55}
            mirror={0.42}
          />
        )}
      </mesh>

      {/* portal frame */}
      <mesh position={[-1.5, 1.46, 0]} castShadow>
        <boxGeometry args={[0.32, 3.1, 0.4]} />
        <meshStandardMaterial color="#0f2b25" roughness={0.7} />
      </mesh>
      <mesh position={[1.5, 1.46, 0]} castShadow>
        <boxGeometry args={[0.32, 3.1, 0.4]} />
        <meshStandardMaterial color="#0f2b25" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.9, 0]} castShadow>
        <boxGeometry args={[3.3, 0.32, 0.42]} />
        <meshStandardMaterial color="#0d2620" roughness={0.7} />
      </mesh>

      {/* side architecture */}
      <mesh position={[-3.5, 2.2, 1.2]}>
        <boxGeometry args={[0.4, 4.4, 5.2]} />
        <meshStandardMaterial color="#0a2019" roughness={0.82} />
      </mesh>
      <mesh position={[3.5, 2.2, 1.2]}>
        <boxGeometry args={[0.4, 4.4, 5.2]} />
        <meshStandardMaterial color="#0a2019" roughness={0.82} />
      </mesh>

      {/* emerald light reveals */}
      {[-2.3, 2.3].map((x) => (
        <mesh key={x} position={[x, 1.9, 1.2]}>
          <boxGeometry args={[0.045, 3.4, 0.02]} />
          <meshStandardMaterial color="#4BC2AC" emissive="#4BC2AC" emissiveIntensity={3.4} />
        </mesh>
      ))}

      {/* top fascia */}
      <mesh position={[0, 3.5, 0.5]}>
        <boxGeometry args={[5.6, 0.9, 1.4]} />
        <meshStandardMaterial color="#08201a" roughness={0.75} metalness={0.3} />
      </mesh>
    </group>
  );
}

function Rig({ progress }) {
  useFrame((state) => {
    const p = state.pointer;
    const targetX = p.x * 0.28;
    const targetY = 1.42 + p.y * 0.1;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 1.32, 0);

    if (progress) {
      progress.current = Math.min(1, progress.current + 0.006);
    }
  });
  return null;
}

export default function HeroScene({ lowPower = false }) {
  const progress = useRef(0);

  return (
    <Canvas
      shadows={!lowPower}
      dpr={lowPower ? 1 : [1, 1.65]}
      camera={{ position: [0, 1.42, 5.7], fov: 40, near: 0.1, far: 40 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#041310']} />
      <fog attach="fog" args={['#041310', 7, 17]} />
      <ambientLight intensity={0.28} />
      <spotLight
        position={[3.2, 5.4, 3.4]}
        angle={0.5}
        penumbra={0.9}
        intensity={22}
        color="#d9f4ea"
        castShadow={!lowPower}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-2.4, 1.6, 2.2]} intensity={3} color="#4BC2AC" distance={6} />
      <pointLight position={[2.6, 2.4, 1.4]} intensity={2} color="#ffcf9a" distance={6} />

      <Suspense fallback={null}>
        <Lobby lowPower={lowPower} />
        <Cabin progress={progress} />
        <DoorPanels progress={progress} />
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={2.4} color="#e8fff8" position={[0, 5, 2]} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={1.6} color="#4BC2AC" position={[-4, 2, 2]} scale={[2, 4, 1]} rotation={[0, Math.PI / 2, 0]} />
          <Lightformer form="rect" intensity={1.2} color="#ffd9a0" position={[4, 1.8, -1]} scale={[2, 4, 1]} rotation={[0, -Math.PI / 2, 0]} />
        </Environment>
      </Suspense>
      <Rig progress={progress} />
    </Canvas>
  );
}
