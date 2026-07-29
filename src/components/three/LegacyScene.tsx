import { useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { clamp01, damp, easeInOut } from "@/lib/three-utils";

type P = { progress: RefObject<number>; milestones: { year: string; label: string }[] };

/** A blueprint wireframe that materialises into a finished tower. */
function MorphTower({
  index,
  total,
  progress,
  milestone,
}: {
  index: number;
  total: number;
  progress: RefObject<number>;
  milestone: { year: string; label: string };
}) {
  const solid = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const marker = useRef<THREE.Mesh>(null);
  const h = 4 + (index % 3) * 2.2;
  const x = (index - (total - 1) / 2) * 6;

  useFrame(({ clock }, dt) => {
    const p = progress.current ?? 0;
    const local = easeInOut(clamp01(p * (total + 1.5) - index));
    if (solid.current) {
      solid.current.scale.y = Math.max(0.001, local);
      solid.current.position.y = (h * local) / 2;
      const m = solid.current.material as THREE.MeshStandardMaterial;
      m.opacity = damp(m.opacity, local, 5, dt);
    }
    if (wire.current) {
      const m = wire.current.material as THREE.MeshBasicMaterial;
      m.opacity = damp(m.opacity, 0.45 * (1 - local * 0.85), 5, dt);
      wire.current.rotation.y = clock.elapsedTime * 0.12;
    }
    if (marker.current) {
      const m = marker.current.material as THREE.MeshBasicMaterial;
      m.opacity = local;
      marker.current.position.y = h + 1 + Math.sin(clock.elapsedTime * 1.2 + index) * 0.16;
    }
  });

  return (
    <group position={[x, 0, 0]}>
      <mesh ref={wire} position={[0, h / 2, 0]}>
        <boxGeometry args={[2.4, h, 2.4, 3, Math.round(h), 3]} />
        <meshBasicMaterial color="#4aa8d8" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={solid} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, h, 2.2]} />
        <meshStandardMaterial
          color="#3f4a55"
          metalness={0.9}
          roughness={0.22}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh ref={marker} position={[0, h + 1, 0]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color="#ff8a2b" transparent opacity={0} />
      </mesh>
      <Html position={[0, h + 2, 0]} center distanceFactor={16}>
        <div className="pointer-events-none text-center">
          <div className="font-display text-ember-gradient text-2xl font-extrabold">
            {milestone.year}
          </div>
          <div className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
            {milestone.label}
          </div>
        </div>
      </Html>
    </group>
  );
}

function AssemblingBeams() {
  const group = useRef<THREE.Group>(null);
  const beams = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        angle: (i / 14) * Math.PI * 2,
        r: 9 + (i % 3) * 1.4,
        y: 1 + (i % 5) * 1.2,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current?.children.forEach((c, i) => {
      const b = beams[i];
      const pulse = (Math.sin(t * 0.4 + i) + 1) / 2;
      c.position.set(Math.cos(b.angle) * (b.r + pulse * 2), b.y, Math.sin(b.angle) * (b.r + pulse * 2));
      c.rotation.z = b.angle + t * 0.1;
    });
  });

  return (
    <group ref={group}>
      {beams.map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[2.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#8d949c" metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Grid() {
  return (
    <gridHelper args={[80, 40, "#2c3a46", "#1e2830"]} position={[0, 0.01, 0]} />
  );
}

function LegacyRig({ progress }: { progress: RefObject<number> }) {
  const { camera, pointer } = useThree();
  const target = new THREE.Vector3();
  useFrame((_, dt) => {
    const p = progress.current ?? 0;
    camera.position.x = damp(camera.position.x, -12 + p * 24 + pointer.x * 2, 1.5, dt);
    camera.position.y = damp(camera.position.y, 8 - pointer.y * 1.5, 1.5, dt);
    camera.position.z = damp(camera.position.z, 20 - p * 4, 1.5, dt);
    target.set(-12 + p * 24, 4, 0);
    camera.lookAt(target);
  });
  return null;
}

export default function LegacyScene({ progress, milestones }: P) {
  return (
    <SceneCanvas
      camera={{ position: [-12, 8, 20], fov: 40 }}
      fog={["#0d1319", 26, 70]}
      background="#0d1319"
    >
      <hemisphereLight args={["#9fc7e6", "#161c22", 0.6]} />
      <directionalLight position={[10, 20, 10]} intensity={2.2} color="#ffd8a8" castShadow />
      <LegacyRig progress={progress} />
      <Grid />
      <AssemblingBeams />
      {milestones.map((m, i) => (
        <MorphTower
          key={m.year}
          index={i}
          total={milestones.length}
          progress={progress}
          milestone={m}
        />
      ))}
    </SceneCanvas>
  );
}