import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { DustField, TmtBar } from "./parts";
import { clamp01, damp, easeInOut, stage } from "@/lib/three-utils";

const FLOORS = 9;
const FLOOR_H = 1.4;
const W = 4.4;

type P = { progress: RefObject<number> };

function Structure({ progress }: P) {
  const foundation = useRef<THREE.Mesh>(null);
  const concrete = useRef<THREE.Mesh>(null);
  const rebar = useRef<THREE.Group>(null);
  const columns = useRef<THREE.Group>(null);
  const slabs = useRef<THREE.Group>(null);
  const roof = useRef<THREE.Mesh>(null);
  const facade = useRef<THREE.Group>(null);
  const interior = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const p = progress.current ?? 0;

    const s1 = easeInOut(stage(p, 0.02, 0.12));
    if (foundation.current) foundation.current.scale.setScalar(0.001 + s1);

    const s2 = easeInOut(stage(p, 0.1, 0.2));
    if (concrete.current) concrete.current.scale.y = 0.001 + s2;

    const s3 = easeInOut(stage(p, 0.18, 0.3));
    if (rebar.current) rebar.current.scale.y = 0.001 + s3;

    const s4 = easeInOut(stage(p, 0.28, 0.42));
    if (columns.current) columns.current.scale.y = 0.001 + s4;

    const s5 = stage(p, 0.38, 0.62);
    slabs.current?.children.forEach((child, i) => {
      const local = clamp01(s5 * FLOORS - i);
      child.scale.setScalar(0.001 + easeInOut(local));
      child.visible = local > 0.01;
    });

    const s6 = easeInOut(stage(p, 0.6, 0.7));
    if (roof.current) {
      roof.current.scale.setScalar(0.001 + s6);
      roof.current.visible = s6 > 0.01;
    }

    const s7 = stage(p, 0.68, 0.86);
    facade.current?.children.forEach((child, i) => {
      const local = clamp01(s7 * FLOORS - i);
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = damp(mat.opacity, local * 0.82, 6, dt);
      mesh.visible = local > 0.01;
      mesh.position.y = i * FLOOR_H + FLOOR_H / 2 + (1 - local) * 1.5;
    });

    const s8 = stage(p, 0.84, 0.96);
    interior.current?.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const local = clamp01(s8 * FLOORS - i * 0.8);
      mat.emissiveIntensity = damp(mat.emissiveIntensity, local * 2.4, 5, dt);
    });
  });

  return (
    <group>
      <mesh ref={foundation} position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[W + 3, 0.24, W + 3]} />
        <meshStandardMaterial color="#3a4149" roughness={0.95} />
      </mesh>
      <mesh ref={concrete} position={[0, 0.24, 0]} scale={[1, 0.001, 1]}>
        <boxGeometry args={[W + 1.6, 0.5, W + 1.6]} />
        <meshStandardMaterial color="#5c646d" roughness={0.9} />
      </mesh>

      <group ref={rebar} position={[0, 0.5, 0]} scale={[1, 0.001, 1]}>
        {Array.from({ length: 16 }).map((_, i) => (
          <TmtBar
            key={i}
            length={3}
            radius={0.055}
            ribs={14}
            position={[-1.8 + (i % 4) * 1.2, 1.5, -1.8 + Math.floor(i / 4) * 1.2]}
          />
        ))}
      </group>

      <group ref={columns} position={[0, 0.5, 0]} scale={[1, 0.001, 1]}>
        {[-1, 1].flatMap((x) =>
          [-1, 1].map((z) => (
            <mesh
              key={`${x}${z}`}
              position={[(x * W) / 2, (FLOORS * FLOOR_H) / 2, (z * W) / 2]}
              castShadow
            >
              <boxGeometry args={[0.38, FLOORS * FLOOR_H, 0.38]} />
              <meshStandardMaterial color="#78808a" metalness={0.6} roughness={0.55} />
            </mesh>
          )),
        )}
      </group>

      <group ref={slabs} position={[0, 0.5, 0]}>
        {Array.from({ length: FLOORS }).map((_, i) => (
          <mesh key={i} position={[0, i * FLOOR_H + FLOOR_H, 0]} castShadow receiveShadow>
            <boxGeometry args={[W + 0.6, 0.16, W + 0.6]} />
            <meshStandardMaterial color="#6b737c" roughness={0.85} metalness={0.2} />
          </mesh>
        ))}
      </group>

      <group ref={interior} position={[0, 0.5, 0]}>
        {Array.from({ length: FLOORS }).map((_, i) => (
          <mesh key={i} position={[0, i * FLOOR_H + FLOOR_H / 2 + 0.4, 0]}>
            <boxGeometry args={[W - 0.4, 0.5, W - 0.4]} />
            <meshStandardMaterial
              color="#1a2029"
              emissive="#ffb347"
              emissiveIntensity={0}
              roughness={0.6}
            />
          </mesh>
        ))}
      </group>

      <group ref={facade} position={[0, 0.5, 0]}>
        {Array.from({ length: FLOORS }).map((_, i) => (
          <mesh key={i} position={[0, i * FLOOR_H + FLOOR_H / 2, 0]}>
            <boxGeometry args={[W + 0.5, FLOOR_H - 0.08, W + 0.5]} />
            <meshPhysicalMaterial
              color="#16303f"
              metalness={0.95}
              roughness={0.06}
              transparent
              opacity={0}
            />
          </mesh>
        ))}
      </group>

      <mesh ref={roof} position={[0, FLOORS * FLOOR_H + 0.7, 0]} visible={false} castShadow>
        <boxGeometry args={[W + 0.9, 0.3, W + 0.9]} />
        <meshStandardMaterial color="#828a94" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

function SiteLife({ progress }: P) {
  const truck = useRef<THREE.Group>(null);
  const crane = useRef<THREE.Group>(null);
  const workers = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = progress.current ?? 0;
    if (truck.current) {
      truck.current.position.x = -14 + ((t * 2.4) % 28);
      truck.current.visible = p < 0.8;
    }
    if (crane.current) {
      crane.current.rotation.y = t * 0.14;
      crane.current.visible = p < 0.9;
    }
    workers.current?.children.forEach((c, i) => {
      c.position.x = Math.sin(t * 0.5 + i * 2) * 3.6;
      c.position.z = Math.cos(t * 0.4 + i * 1.4) * 3.6;
    });
  });

  return (
    <group>
      <group ref={truck} position={[0, 0.4, 7]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 0.8, 1.2]} />
          <meshStandardMaterial color="#ff8a2b" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[-1.2, 0.4, 0]} castShadow>
          <boxGeometry args={[0.9, 0.7, 1.1]} />
          <meshStandardMaterial color="#3b434c" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      <group position={[-9, 0, -4]}>
        <mesh position={[0, 8, 0]} castShadow>
          <boxGeometry args={[0.35, 16, 0.35]} />
          <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.35} />
        </mesh>
        <group ref={crane} position={[0, 16, 0]}>
          <mesh position={[4.5, 0, 0]} castShadow>
            <boxGeometry args={[11, 0.28, 0.28]} />
            <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.35} />
          </mesh>
          <mesh position={[8, -2.6, 0]}>
            <boxGeometry args={[1.1, 0.3, 0.5]} />
            <meshStandardMaterial color="#9aa1a8" metalness={1} roughness={0.4} />
          </mesh>
        </group>
      </group>

      <group ref={workers}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0.45, 0]}>
            <capsuleGeometry args={[0.14, 0.5, 3, 8]} />
            <meshStandardMaterial color="#11161c" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function TimelineRig({ progress }: P) {
  const { camera } = useThree();
  const target = new THREE.Vector3();

  useFrame((_, dt) => {
    const p = progress.current ?? 0;
    const angle = -0.6 + p * Math.PI * 1.35;
    const radius = 22 - p * 6;
    const height = 3 + p * 12;
    camera.position.x = damp(camera.position.x, Math.sin(angle) * radius, 1.6, dt);
    camera.position.y = damp(camera.position.y, height, 1.6, dt);
    camera.position.z = damp(camera.position.z, Math.cos(angle) * radius, 1.6, dt);
    target.set(0, 2 + p * 6, 0);
    camera.lookAt(target);
  });
  return null;
}

export default function TimelineScene({ progress }: P) {
  return (
    <SceneCanvas
      camera={{ position: [12, 4, 20], fov: 42 }}
      fog={["#0f151a", 32, 90]}
      background="#0f151a"
    >
      <hemisphereLight args={["#b9d6ee", "#20262d", 0.6]} />
      <directionalLight
        castShadow
        position={[14, 22, 8]}
        intensity={2.8}
        color="#ffd8a8"
        shadow-mapSize={[1024, 1024]}
      />
      <Structure progress={progress} />
      <SiteLife progress={progress} />
      <DustField count={200} radius={12} height={16} size={0.05} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[60, 40]} />
        <meshStandardMaterial color="#1a2027" roughness={0.98} />
      </mesh>
      <ContactShadows position={[0, 0.03, 0]} opacity={0.6} scale={40} blur={2.4} far={16} />
    </SceneCanvas>
  );
}