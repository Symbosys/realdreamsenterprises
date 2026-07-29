import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { Sparks } from "./parts";
import { clamp01, damp } from "@/lib/three-utils";

/** Scroll-driven steel manufacturing line: heat, roll, quench, test, dispatch. */
function Billet({ progress, stages }: { progress: RefObject<number>; stages: string[] }) {
  const mesh = useRef<THREE.Mesh>(null);
  const span = 34;

  useFrame((_, dt) => {
    const p = clamp01(progress.current ?? 0);
    const x = -span / 2 + p * span;
    if (!mesh.current) return;
    mesh.current.position.x = damp(mesh.current.position.x, x, 4, dt);
    const heat = Math.max(0, 1 - Math.abs(p - 0.28) * 3.4);
    const m = mesh.current.material as THREE.MeshStandardMaterial;
    m.emissiveIntensity = damp(m.emissiveIntensity, heat * 2.6, 3, dt);
    m.color.lerpColors(new THREE.Color("#8d949c"), new THREE.Color("#ff6a1f"), heat);
    const squash = p > 0.45 ? 0.55 : 1;
    mesh.current.scale.y = damp(mesh.current.scale.y, squash, 3, dt);
    mesh.current.scale.z = damp(mesh.current.scale.z, squash, 3, dt);
  });

  return (
    <>
      <mesh ref={mesh} position={[-17, 2.1, 0]} castShadow>
        <boxGeometry args={[3.2, 0.9, 0.9]} />
        <meshStandardMaterial color="#8d949c" emissive="#ff6a1f" emissiveIntensity={0} metalness={1} roughness={0.3} />
      </mesh>
      {stages.map((s, i) => (
        <Html key={s} position={[-17 + (i * 34) / (stages.length - 1), 4.4, 0]} center distanceFactor={26}>
          <span className="text-muted-foreground pointer-events-none text-[10px] font-semibold tracking-[0.3em] whitespace-nowrap uppercase">
            {s}
          </span>
        </Html>
      ))}
    </>
  );
}

function Line() {
  const rolls = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    rolls.current?.children.forEach((c) => (c.rotation.z -= dt * 3));
  });
  return (
    <group>
      <mesh position={[0, 1.4, 0]} receiveShadow>
        <boxGeometry args={[40, 0.4, 2.6]} />
        <meshStandardMaterial color="#2c353d" metalness={0.6} roughness={0.6} />
      </mesh>
      <group ref={rolls}>
        {Array.from({ length: 18 }, (_, i) => (
          <mesh key={i} position={[-17 + i * 2, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 2.4, 14]} />
            <meshStandardMaterial color="#6d757d" metalness={1} roughness={0.35} />
          </mesh>
        ))}
      </group>
      {/* furnace */}
      <mesh position={[-8, 3.2, 0]}>
        <boxGeometry args={[6, 4, 4]} />
        <meshStandardMaterial color="#3a2a22" metalness={0.4} roughness={0.8} />
      </mesh>
      <pointLight position={[-8, 2.4, 0]} intensity={160} distance={22} color="#ff7a2b" />
      {/* quench box */}
      <mesh position={[6, 2.8, 0]}>
        <boxGeometry args={[4, 2.6, 3.4]} />
        <meshStandardMaterial color="#22323d" metalness={0.7} roughness={0.4} transparent opacity={0.85} />
      </mesh>
      <Sparks origin={[0, 2.4, 0]} count={40} />
    </group>
  );
}

function FactoryRig({ progress }: { progress: RefObject<number> }) {
  const { camera, pointer } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    const p = clamp01(progress.current ?? 0);
    const x = -17 + p * 34;
    camera.position.x = damp(camera.position.x, x + 4 + pointer.x * 2, 1.6, dt);
    camera.position.y = damp(camera.position.y, 5.2 - pointer.y * 1.4, 1.6, dt);
    camera.position.z = damp(camera.position.z, 13, 1.6, dt);
    look.current.set(x, 2.4, 0);
    camera.lookAt(look.current);
  });
  return null;
}

export default function FactoryScene({
  progress,
  stages,
}: {
  progress: RefObject<number>;
  stages: string[];
}) {
  return (
    <SceneCanvas camera={{ position: [-13, 5, 13], fov: 42 }} fog={["#0c1116", 18, 70]} background="#0c1116">
      <hemisphereLight args={["#9fc7e6", "#141a20", 0.45]} />
      <directionalLight position={[8, 18, 10]} intensity={1.4} color="#ffd8a8" castShadow />
      <FactoryRig progress={progress} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 60]} />
        <meshStandardMaterial color="#161d23" roughness={0.9} />
      </mesh>
      <Line />
      <Billet progress={progress} stages={stages} />
    </SceneCanvas>
  );
}
