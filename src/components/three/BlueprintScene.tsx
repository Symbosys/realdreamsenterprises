import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { damp } from "@/lib/three-utils";

/** Floating engineering drawings, wireframe solids and blueprint particles. */
function Sheets() {
  const items = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        p: [
          Math.cos((i / 9) * Math.PI * 2) * (6 + (i % 3) * 2.4),
          -2 + (i % 4) * 2.2,
          Math.sin((i / 9) * Math.PI * 2) * (5 + (i % 2) * 2),
        ] as [number, number, number],
        r: i * 0.7,
      })),
    [],
  );
  return (
    <>
      {items.map((s, i) => (
        <Float key={i} speed={1 + (i % 3) * 0.25} rotationIntensity={0.6} floatIntensity={1.5}>
          <group position={s.p} rotation={[0.1, s.r, 0.05]}>
            <mesh>
              <planeGeometry args={[3.4, 2.4]} />
              <meshBasicMaterial color="#0d2331" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[3.4, 2.4, 7, 5]} />
              <meshBasicMaterial color="#4aa8d8" wireframe transparent opacity={0.55} />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

function WireSolids() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.12;
  });
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[2.6, 1]} />
        <meshBasicMaterial color="#ff8a2b" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[4.4, 0.02, 8, 90]} />
        <meshBasicMaterial color="#4aa8d8" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[1.4, 0.6, 0.3]}>
        <torusGeometry args={[5.6, 0.015, 8, 90]} />
        <meshBasicMaterial color="#4aa8d8" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function Motes({ count = 260 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 34;
      a[i * 3 + 1] = (Math.random() - 0.5) * 20;
      a[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return a;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7fd0f2" transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

function DriftRig() {
  const { camera, pointer } = useThree();
  useFrame(({ clock }, dt) => {
    camera.position.x = damp(camera.position.x, Math.sin(clock.elapsedTime * 0.09) * 3 + pointer.x * 3, 1.3, dt);
    camera.position.y = damp(camera.position.y, 1 - pointer.y * 2, 1.3, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BlueprintScene() {
  return (
    <SceneCanvas camera={{ position: [0, 1, 15], fov: 42 }} fog={["#0b1218", 12, 42]} background="#0b1218">
      <hemisphereLight args={["#8fd0f2", "#101820", 0.7]} />
      <DriftRig />
      <gridHelper args={[70, 35, "#20404f", "#16262f"]} position={[0, -8, 0]} />
      <WireSolids />
      <Sheets />
      <Motes />
    </SceneCanvas>
  );
}
