import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { DustField } from "./parts";
import { damp } from "@/lib/three-utils";

/** Slow cinematic orbit with light pointer parallax. */
function OrbitRig({ radius = 26 }: { radius?: number }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3(0, 7, 0));
  useFrame(({ clock }, dt) => {
    const a = clock.elapsedTime * 0.06;
    camera.position.x = damp(camera.position.x, Math.sin(a) * radius + pointer.x * 3, 1.4, dt);
    camera.position.z = damp(camera.position.z, Math.cos(a) * radius, 1.4, dt);
    camera.position.y = damp(camera.position.y, 11 - pointer.y * 2.5, 1.4, dt);
    camera.lookAt(look.current);
  });
  return null;
}

function Tower() {
  const glow = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glow.current) {
      const m = glow.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 + Math.sin(clock.elapsedTime * 0.8) * 0.12;
    }
  });

  return (
    <group>
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[22, 0.4, 22]} />
        <meshStandardMaterial color="#222a31" roughness={0.9} metalness={0.1} />
      </mesh>
      {[
        { y: 4.5, s: [8, 9, 8] },
        { y: 11.5, s: [6.2, 5, 6.2] },
        { y: 15.6, s: [3.4, 3.2, 3.4] },
      ].map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]} castShadow receiveShadow>
          <boxGeometry args={b.s as [number, number, number]} />
          <meshStandardMaterial color="#39434d" metalness={0.85} roughness={0.18} />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 1 + i * 1.1, 4.02]}>
          <planeGeometry args={[7.6, 0.6]} />
          <meshBasicMaterial color="#8fd0f2" transparent opacity={0.24} />
        </mesh>
      ))}
      <mesh ref={glow} position={[0, 17.6, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#ff8a2b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/** Floating blueprint sheets around the building. */
function Blueprints() {
  return (
    <>
      {[
        [-11, 9, 3],
        [10, 12, -4],
        [-8, 15, -7],
        [12, 5, 6],
      ].map((p, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.5} floatIntensity={1.3}>
          <group position={p as [number, number, number]} rotation={[0, i * 1.1, 0.06]}>
            <mesh>
              <planeGeometry args={[4.6, 3.2]} />
              <meshBasicMaterial color="#0f2432" transparent opacity={0.55} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[4.6, 3.2, 8, 6]} />
              <meshBasicMaterial color="#4aa8d8" wireframe transparent opacity={0.5} />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

export default function HeadquartersScene() {
  return (
    <SceneCanvas camera={{ position: [22, 11, 16], fov: 38 }} fog={["#101922", 30, 90]} background="#101922">
      <hemisphereLight args={["#ffd9b0", "#131a21", 0.7]} />
      <directionalLight position={[18, 16, 10]} intensity={2.6} color="#ffcf9a" castShadow />
      <directionalLight position={[-16, 8, -12]} intensity={0.8} color="#6fa8d6" />
      <OrbitRig />
      <gridHelper args={[90, 45, "#2b3d4b", "#1c2831"]} position={[0, 0.42, 0]} />
      <Tower />
      <Blueprints />
      <DustField />
      <ContactShadows position={[0, 0.45, 0]} opacity={0.55} scale={50} blur={3} far={14} />
    </SceneCanvas>
  );
}
