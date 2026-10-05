import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const labels = ["AWS", "AZURE", "GCP", "OCI", "AI / ML", "PYTHON", "K8S", "RAG", "TERRAFORM", "APIGEE"];
const positions = Array.from({ length: 30 }, (_, index) => ({
  position: [Math.sin(index * 2.4) * 5, Math.cos(index * 2.4) * 4, (index % 5) - 2] as [number, number, number],
  scale: [0.7, 0.85, 1][index % 3],
}));

function SkillBall({ index, active }: { index: number; active: boolean }) {
  const body = useRef<RapierRigidBody>(null);
  const impulse = useMemo(() => new THREE.Vector3(), []);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext("2d")!;
    context.fillStyle = ["#124e56", "#163e63", "#34285c"][index % 3];
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#cafff3";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `bold ${labels[index % labels.length].length > 6 ? 44 : 65}px sans-serif`;
    context.fillText(labels[index % labels.length], 256, 256);
    context.fillText(labels[index % labels.length], 768, 256);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [index]);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame((_, delta) => {
    if (!active || !body.current) return;
    impulse.copy(body.current.translation()).multiplyScalar(-Math.min(delta, 0.05) * 12);
    body.current.applyImpulse(impulse, true);
  });
  const { position, scale } = positions[index];
  return (
    <RigidBody ref={body} position={position} colliders={false} linearDamping={3} angularDamping={1} restitution={0.35}>
      <BallCollider args={[scale]} />
      <mesh scale={scale}>
        <sphereGeometry args={[1, 28, 28]} />
        <meshPhysicalMaterial map={texture} roughness={0.3} metalness={0.25} clearcoat={1} />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const body = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => {
    body.current?.setNextKinematicTranslation({ x: pointer.x * viewport.width / 2, y: pointer.y * viewport.height / 2, z: 0 });
  });
  return <RigidBody ref={body} type="kinematicPosition" colliders={false}><BallCollider args={[1.6]} /></RigidBody>;
}

export default function SkillAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "150px" });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} className="skill-animation" aria-label="Interactive 3D cloud and AI skill spheres">
      <p className="skill-animation-hint">Move your pointer to explore my skills</p>
      <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 24], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 10]} intensity={3} />
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]} paused={!active}>
            <Pointer />
            {positions.map((_, index) => <SkillBall key={index} index={index} active={active} />)}
          </Physics>
          <Environment files={`${import.meta.env.BASE_URL}models/char_enviorment.hdr`} environmentIntensity={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
