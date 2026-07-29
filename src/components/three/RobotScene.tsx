import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { DustField } from "./parts";

/** Friendly construction robot searching a half-built tower — the 404 scene. */
function Robot() {
  const g = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (g.current) {
      g.current.position.x = Math.sin(t * 0.5) * 3.2;
      g.current.position.y = Math.abs(Math.sin(t * 2.4)) * 0.12;
      g.current.rotation.y = Math.cos(t * 0.5) * 0.5;
    }
    if (head.current) head.current.rotation.y = Math.sin(t * 1.6) * 0.7;
  });
  return (
    <group ref={g} position={[0, 0, 3]}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.9, 1.1, 0.7]} />
        <meshStandardMaterial color="#ff8a2b" metalness={0.5} roughness={0.35} />
      </mesh>
      <group ref={head} position={[0, 1.75, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.55, 0.6]} />
          <meshStandardMaterial color="#c8ced4" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.05, 0.32]}>
          <planeGeometry args={[0.42, 0.16]} />
          <meshBasicMaterial color="#8fd0f2" />
        </mesh>
      </group>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 1, 0]} castShadow>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color="#7d848b" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]} castShadow>
          <boxGeometry args={[0.24, 0.5, 0.26]} />
          <meshStandardMaterial color="#4d545b" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function HalfBuiltTower() {
  const crane = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (crane.current) crane.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.6;
  });
  return (
    <group position={[0, 0, -3]}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, 0.6 + i * 1.6, 0]} castShadow>
          <boxGeometry args={[4 - i * 0.3, 0.14, 4 - i * 0.3]} />
          <meshStandardMaterial color="#5c646c" metalness={0.9} roughness={0.35} />
        </mesh>
      ))}
      {[
        [-1.8, -1.8],
        [1.8, -1.8],
        [-1.8, 1.8],
        [1.8, 1.8],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 4.2, z]} castShadow>
          <boxGeometry args={[0.16, 8.4, 0.16]} />
          <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[4.2, 8.6, 4.2]} />
        <meshBasicMaterial color="#4aa8d8" wireframe transparent opacity={0.28} />
      </mesh>
      <group ref={crane} position={[3.6, 9, 0]}>
        <mesh>
          <boxGeometry args={[9, 0.18, 0.18]} />
          <meshStandardMaterial color="#c96a1e" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[3.4, -1.4, 0]}>
          <boxGeometry args={[0.06, 2.8, 0.06]} />
          <meshStandardMaterial color="#8d949c" />
        </mesh>
      </group>
      <Float speed={1.4} floatIntensity={1.6}>
        <mesh position={[-4.4, 5.4, 1.6]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color="#ff8a2b" />
        </mesh>
      </Float>
    </group>
  );
}

export default function RobotScene() {
  return (
    <SceneCanvas camera={{ position: [7, 5, 12], fov: 40 }} fog={["#0d1319", 16, 55]} background="#0d1319">
      <hemisphereLight args={["#9fc7e6", "#12181e", 0.6]} />
      <directionalLight position={[8, 14, 8]} intensity={2} color="#ffd8a8" castShadow />
      <gridHelper args={[60, 30, "#2b3d4b", "#1a242c"]} />
      <HalfBuiltTower />
      <Robot />
      <DustField radius={12} height={14} />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={30} blur={2.6} far={10} />
    </SceneCanvas>
  );
}
