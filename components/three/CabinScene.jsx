'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

const WALLS = {
  steel: { color: '#B9C0BD', metalness: 0.92, roughness: 0.28 },
  walnut: { color: '#6B4A33', metalness: 0.08, roughness: 0.58 },
  mirror: { color: '#8C7B63', metalness: 1, roughness: 0.1 },
  stone: { color: '#2E5B4E', metalness: 0.3, roughness: 0.34 },
};

const FLOORS = {
  graphite: { color: '#3B3F3D', metalness: 0.4, roughness: 0.42 },
  terrazzo: { color: '#CFCABE', metalness: 0.05, roughness: 0.6 },
  oak: { color: '#8A6647', metalness: 0.05, roughness: 0.62 },
};

const CEILINGS = {
  backlit: { color: '#E9E4D6', metalness: 0.12, roughness: 0.65 },
  slats: { color: '#7A5637', metalness: 0.08, roughness: 0.6 },
  spot: { color: '#E8E2D4', metalness: 0.1, roughness: 0.6 },
};

const LIGHTS = {
  warm: '#FFE3BE',
  neutral: '#F4F0E6',
  teal: '#4BC2AC',
};

const RAILS = {
  brass: '#B9A06A',
  steel: '#B6BCB9',
  black: '#23282A',
};

const DOORS = {
  steel: '#B9C0BD',
  bronze: '#9C8A70',
  graphite: '#3E4446',
};

const CABIN = { width: 2, depth: 2.6, height: 2.45 };

function Handrail({ color, position, rotation, length }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.021, 0.021, length, 18]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.22} />
      </mesh>
      {[-length / 2 + 0.18, length / 2 - 0.18].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.09, 10]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Doors({ finish }) {
  const door = DOORS[finish] || DOORS.steel;
  return (
    <group position={[0, 0, -CABIN.depth / 2 + 0.012]}>
      {/* side panels flanking the opening */}
      <mesh position={[-0.75, 1.16, 0]}>
        <planeGeometry args={[0.5, 2.32]} />
        <meshStandardMaterial {...WALLS.steel} />
      </mesh>
      <mesh position={[0.75, 1.16, 0]}>
        <planeGeometry args={[0.5, 2.32]} />
        <meshStandardMaterial {...WALLS.steel} />
      </mesh>
      {/* header */}
      <mesh position={[0, 2.37, 0]}>
        <planeGeometry args={[2, 0.16]} />
        <meshStandardMaterial color="#1A1F1D" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* sliding panels */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.255, 1.16, 0.006]}>
          <mesh>
            <boxGeometry args={[0.5, 2.3, 0.035]} />
            <meshStandardMaterial color={door} metalness={0.62} roughness={0.36} />
          </mesh>
          <mesh position={[-side * 0.225, 0, 0.022]}>
            <boxGeometry args={[0.012, 2.3, 0.004]} />
            <meshStandardMaterial color="#5F6A65" metalness={0.9} roughness={0.35} />
          </mesh>
        </group>
      ))}
      {/* threshold */}
      <mesh position={[0, 0.012, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.02, 0.1]} />
        <meshStandardMaterial color="#8C938F" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function ControlPanel() {
  return (
    <group position={[CABIN.width / 2 - 0.012, 1.18, -0.82]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry args={[0.2, 0.62, 0.018]} />
        <meshStandardMaterial color="#1D2421" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.18, 0.012]}>
        <planeGeometry args={[0.14, 0.12]} />
        <meshStandardMaterial color="#4BC2AC" emissive="#4BC2AC" emissiveIntensity={1.4} />
      </mesh>
      {[0.015, -0.045, -0.105].map((y, index) => (
        <mesh key={y} position={[index % 2 === 0 ? -0.035 : 0.035, y, 0.012]}>
          <circleGeometry args={[0.018, 20]} />
          <meshStandardMaterial
            color={index === 0 ? '#F4F6F2' : '#8E9994'}
            emissive={index === 0 ? '#F4F6F2' : '#000000'}
            emissiveIntensity={index === 0 ? 0.8 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function Cabin({ finish, controls, autoRotate }) {
  const room = useMemo(() => new THREE.Group(), []);
  const wall = WALLS[finish.wall] || WALLS.steel;
  const floor = FLOORS[finish.floor] || FLOORS.graphite;
  const ceiling = CEILINGS[finish.ceiling] || CEILINGS.backlit;
  const lightColor = LIGHTS[finish.light] || LIGHTS.warm;
  const railColor = RAILS[finish.rail] || RAILS.brass;

  useFrame((state, delta) => {
    if (!controls) return;
    const c = controls.current;
    if (autoRotate && !c.dragging && Math.abs(c.targetYaw - c.yaw) < 0.002) {
      c.targetYaw += delta * 0.075;
    }
    c.yaw = THREE.MathUtils.damp(c.yaw, c.targetYaw, 5.2, delta);
    c.pitch = THREE.MathUtils.damp(c.pitch, c.targetPitch, 5.2, delta);
    room.rotation.y = c.yaw;
    state.camera.position.y = 1.52 + c.pitch * 0.28;
    state.camera.lookAt(0, 1.34 + c.pitch * 0.55, -CABIN.depth / 2);
    state.camera.rotation.z = c.pitch * 0.02;
  });

  return (
    <primitive object={room}>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[CABIN.width, CABIN.depth]} />
        <meshStandardMaterial {...floor} />
      </mesh>
      <mesh position={[0, 0.003, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.28, 0.92]} />
        <meshStandardMaterial color="#1F2A26" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* ceiling */}
      <mesh position={[0, CABIN.height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CABIN.width, CABIN.depth]} />
        <meshStandardMaterial {...ceiling} />
      </mesh>
      <mesh position={[0, CABIN.height - 0.014, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.36, 1.7]} />
        <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.92, CABIN.height - 0.03, 0]}>
          <boxGeometry args={[0.05, 0.012, 2.1]} />
          <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={3} toneMapped={false} />
        </mesh>
      ))}

      {/* walls */}
      <mesh position={[0, CABIN.height / 2, CABIN.depth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CABIN.width, CABIN.height]} />
        <meshStandardMaterial {...wall} />
      </mesh>
      <mesh position={[-CABIN.width / 2, CABIN.height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[CABIN.depth, CABIN.height]} />
        <meshStandardMaterial {...wall} />
      </mesh>
      <mesh position={[CABIN.width / 2, CABIN.height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[CABIN.depth, CABIN.height]} />
        <meshStandardMaterial {...wall} />
      </mesh>

      {/* wall reveals */}
      <mesh position={[0, 1.72, CABIN.depth / 2 - 0.012]}>
        <planeGeometry args={[1.5, 0.01]} />
        <meshStandardMaterial color="#4BC2AC" emissive="#4BC2AC" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={`reveal-${side}`}
          position={[side * (CABIN.width / 2 - 0.012), 1.72, 0]}
          rotation={[0, -side * (Math.PI / 2), 0]}
        >
          <planeGeometry args={[CABIN.depth - 0.16, 0.01]} />
          <meshStandardMaterial color="#4BC2AC" emissive="#4BC2AC" emissiveIntensity={0.85} toneMapped={false} />
        </mesh>
      ))}

      {/* panel seams */}
      {[-0.85, -0.28, 0.28, 0.85].map((z) =>
        [-1, 1].map((side) => (
          <mesh
            key={`seam-${side}-${z}`}
            position={[side * (CABIN.width / 2 - 0.008), CABIN.height / 2 - 0.02, z]}
            rotation={[0, -side * (Math.PI / 2), 0]}
          >
            <planeGeometry args={[0.007, CABIN.height - 0.12]} />
            <meshStandardMaterial color="#241812" roughness={0.72} metalness={0.15} />
          </mesh>
        ))
      )}

      <Handrail color={railColor} position={[0, 1.0, CABIN.depth / 2 - 0.08]} rotation={[0, 0, 0]} length={1.5} />
      <Handrail color={railColor} position={[-CABIN.width / 2 + 0.08, 1.0, 0]} rotation={[0, Math.PI / 2, 0]} length={1.7} />
      <Handrail color={railColor} position={[CABIN.width / 2 - 0.08, 1.0, 0]} rotation={[0, Math.PI / 2, 0]} length={1.7} />

      <Doors finish={finish.door} />
      <ControlPanel />

      <pointLight position={[0, CABIN.height - 0.12, 0]} color={lightColor} intensity={5.4} distance={5.5} decay={2} />
      <pointLight position={[0, 0.35, 0.9]} color="#4BC2AC" intensity={1.1} distance={3.4} />
      <pointLight position={[0, 0.4, -1]} color={lightColor} intensity={0.7} distance={3} />
    </primitive>
  );
}

export default function CabinScene({
  finish = { wall: 'steel', floor: 'graphite', ceiling: 'backlit', light: 'warm', rail: 'brass', door: 'steel' },
  controls,
  autoRotate = true,
  lowPower = false,
}) {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.6]}
      camera={{ position: [0, 1.52, 0.12], fov: 74, near: 0.05, far: 20 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      shadows={false}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#07110E']} />
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#EAF6F1', '#101C18', 0.28]} />
      <Suspense fallback={null}>
        <Cabin finish={finish} controls={controls} autoRotate={autoRotate} />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={2.2} color="#F1FFF9" position={[0, 3.4, 0]} scale={[5, 2.6, 1]} rotation={[Math.PI / 2, 0, 0]} />
          <Lightformer form="rect" intensity={1.1} color="#4BC2AC" position={[-3, 1.6, 0]} scale={[1.6, 3, 1]} rotation={[0, Math.PI / 2, 0]} />
          <Lightformer form="rect" intensity={0.9} color="#FFD9A0" position={[3, 1.6, -1]} scale={[1.6, 3, 1]} rotation={[0, -Math.PI / 2, 0]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
