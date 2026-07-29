import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { steelMaterialProps } from "@/lib/three-utils";

/** Reusable steel beam. */
export function Beam({
  position,
  size,
  rotation,
}: {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...steelMaterialProps} />
    </mesh>
  );
}

/** Ribbed TMT bar: a cylinder with a twisted rib torus stack. */
export function TmtBar({
  length = 4,
  radius = 0.09,
  ribs = 22,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  length?: number;
  radius?: number;
  ribs?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const ribData = useMemo(
    () =>
      Array.from({ length: ribs }, (_, i) => ({
        y: -length / 2 + (length / (ribs - 1)) * i,
        rot: i * 0.35,
      })),
    [ribs, length],
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial color="#9aa1a8" metalness={1} roughness={0.42} />
      </mesh>
      {ribData.map((r, i) => (
        <mesh key={i} position={[0, r.y, 0]} rotation={[Math.PI / 2, 0, r.rot]}>
          <torusGeometry args={[radius * 1.06, radius * 0.22, 6, 18]} />
          <meshStandardMaterial color="#a8afb6" metalness={1} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** GPU-cheap floating dust / particulate field. */
export function DustField({
  count = 320,
  radius = 18,
  height = 26,
  color = "#ffd9a8",
  size = 0.06,
}: {
  count?: number;
  radius?: number;
  height?: number;
  color?: string;
  size?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.random() * height;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count, radius, height]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += dt * 0.32;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.4 + i) * dt * 0.08;
      if (arr[i * 3 + 1] > height) arr[i * 3 + 1] = 0;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/** Welding sparks bursting from a fixed point. */
export function Sparks({ origin = [0, 6, 0] as [number, number, number], count = 60 }) {
  const ref = useRef<THREE.Points>(null);
  const state = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        v: new THREE.Vector3(),
        life: Math.random(),
      })),
    [count],
  );
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    state.forEach((s, i) => {
      s.life -= dt * 0.9;
      if (s.life <= 0) {
        s.life = 0.6 + Math.random() * 0.6;
        s.v.set((Math.random() - 0.5) * 3, Math.random() * 2.4, (Math.random() - 0.5) * 3);
        arr[i * 3] = origin[0];
        arr[i * 3 + 1] = origin[1];
        arr[i * 3 + 2] = origin[2];
      }
      s.v.y -= dt * 4.5;
      arr[i * 3] += s.v.x * dt;
      arr[i * 3 + 1] += s.v.y * dt;
      arr[i * 3 + 2] += s.v.z * dt;
    });
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.11} color="#ffb347" transparent opacity={0.95} depthWrite={false} />
    </points>
  );
}

/** Slow drifting cloud slabs for atmospheric depth. */
export function Clouds({ count = 7 }) {
  const group = useRef<THREE.Group>(null);
  const clouds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        pos: [
          -30 + Math.random() * 60,
          16 + Math.random() * 16,
          -30 - Math.random() * 25,
        ] as [number, number, number],
        scale: 8 + Math.random() * 14,
        speed: 0.25 + Math.random() * 0.35,
        key: i,
      })),
    [count],
  );

  useFrame((_, dt) => {
    group.current?.children.forEach((c, i) => {
      c.position.x += clouds[i].speed * dt;
      if (c.position.x > 40) c.position.x = -40;
    });
  });

  return (
    <group ref={group}>
      {clouds.map((c) => (
        <mesh key={c.key} position={c.pos} scale={[c.scale, c.scale * 0.35, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#d9e3ec" transparent opacity={0.09} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Distant flock of birds — tiny animated chevrons. */
export function Birds({ count = 9 }) {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ o: i * 0.7, y: 18 + (i % 4) * 1.8 })),
    [count],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current?.children.forEach((c, i) => {
      const s = seeds[i];
      c.position.set(-28 + ((t * 1.6 + s.o * 6) % 56), s.y + Math.sin(t + s.o) * 0.7, -22);
      c.rotation.z = Math.sin(t * 5 + s.o) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.5, 0.03, 0.03]} />
          <meshBasicMaterial color="#2c343d" />
        </mesh>
      ))}
    </group>
  );
}