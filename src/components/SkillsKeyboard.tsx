// Geometry and key-motion adaptation of Txemalon/3d-portfolio (MIT).
// Copyright (c) 2026 Jose Maria Albero Belamendia.
// See public/licenses/txema-keyboard-MIT.txt for the original license.
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createExtrudedBox } from "./keyboardGeometry";
import "./styles/SkillsKeyboard.css";

const keys = [
  { key: "Q", label: "AWS", detail: "Cloud architecture, Lambda, SageMaker and Aurora", color: "#ffca80" },
  { key: "W", label: "AZURE", detail: "Azure OpenAI, Kubernetes Service and enterprise cloud", color: "#8cdcff" },
  { key: "E", label: "GCP", detail: "Vertex AI, BigQuery and Google Kubernetes Engine", color: "#a3e9bc" },
  { key: "R", label: "OCI", detail: "Oracle Cloud Infrastructure and multi-cloud architecture", color: "#ffacac" },
  { key: "T", label: "K8S", detail: "Kubernetes, containers and cloud-native platforms", color: "#a5bfff" },
  { key: "A", label: "AI / ML", detail: "Enterprise AI assistants and machine learning platforms", color: "#c8adff" },
  { key: "S", label: "RAG", detail: "Retrieval-augmented generation and LlamaIndex", color: "#c8adff" },
  { key: "D", label: "PYTHON", detail: "Python engineering, automation and data science", color: "#ffe694" },
  { key: "F", label: "DATA", detail: "BigQuery, Snowflake, Kafka and enterprise data lakes", color: "#8cdcff" },
  { key: "G", label: "IaC", detail: "Terraform and infrastructure automation", color: "#c8adff" },
  { key: "Z", label: "API", detail: "Apigee, REST, GraphQL and API management", color: "#9ef1dd" },
  { key: "X", label: "BOOMI", detail: "Enterprise integration and reusable workflows", color: "#8cdcff" },
  { key: "C", label: "CI/CD", detail: "Jenkins, GitLab CI/CD and ArgoCD", color: "#ffacac" },
  { key: "V", label: "TOGAF", detail: "Enterprise architecture and technology strategy", color: "#9ef1dd" },
  { key: "B", label: "SECURE", detail: "Cybersecurity, governance and zero-trust principles", color: "#a3e9bc" },
];

function Keycap({ index, geometry, pressed, reduced, onSelect, onLeave }: {
  index: number; geometry: THREE.BufferGeometry; pressed: boolean; reduced: boolean;
  onSelect: () => void; onLeave: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const item = keys[index];
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#324e61";
    ctx.font = "500 36px sans-serif";
    ctx.fillText(item.key, 128, 48);
    ctx.fillStyle = "#082f49";
    ctx.font = `bold ${item.label.length > 5 ? 35 : 44}px sans-serif`;
    ctx.fillText(item.label, 128, 149);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [item]);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(({ clock }, delta) => {
    if (!group.current || !material.current) return;
    const wave = reduced ? 0 : Math.max(0, Math.sin(clock.elapsedTime * 1.7 - index * 0.48)) * 0.025;
    const target = pressed ? -0.12 : wave;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, target, 18, delta);
    material.current.emissiveIntensity = THREE.MathUtils.damp(material.current.emissiveIntensity, pressed ? 0.55 : 0.04, 12, delta);
  });
  return <group position={[(index % 5 - 2) * 0.46, 0.275, (Math.floor(index / 5) - 1) * 0.46]}>
    <group ref={group}>
      <mesh geometry={geometry}
        onPointerOver={(event) => { event.stopPropagation(); onSelect(); }}
        onPointerOut={onLeave}
        onPointerDown={(event) => { event.stopPropagation(); onSelect(); }}
        onPointerUp={onLeave} onPointerCancel={onLeave}>
        <meshPhysicalMaterial ref={material} color={item.color} emissive="#0071e3" emissiveIntensity={0.04} roughness={0.28} metalness={0.05} clearcoat={0.7} />
      </mesh>
      <mesh position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
        <planeGeometry args={[0.32, 0.32]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  </group>;
}

function KeyboardScene({ selected, held, reduced, onSelect, onLeave }: {
  selected: number | null; held: Set<string>; reduced: boolean;
  onSelect: (index: number) => void; onLeave: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => createExtrudedBox(0.4, 0.4, 0.28, 0.05, 0.012, 0.78), []);
  const base = useMemo(() => createExtrudedBox(2.6, 1.65, 0.26, 0.12, 0.02), []);
  useEffect(() => () => { geometry.dispose(); base.dispose(); }, [geometry, base]);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const yaw = reduced ? -0.15 : -0.15 + Math.sin(t * 0.5) * 0.18 + pointer.x * 0.06;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, yaw, 5, delta);
    group.current.rotation.z = reduced ? 0 : Math.sin(t * 0.4) * 0.035;
    group.current.position.y = reduced ? 0 : Math.sin(t * 0.8) * 0.055;
  });
  return <group ref={group} rotation={[0.12, -0.15, 0]}>
    <mesh geometry={base}><meshPhysicalMaterial color="#bfc5ce" metalness={0.4} roughness={0.35} clearcoat={0.6} /></mesh>
    <mesh position={[0, -0.115, 0]}><boxGeometry args={[2.48, 0.025, 1.53]} /><meshStandardMaterial color="#b9c8dd" emissive="#80aaff" emissiveIntensity={1.5} /></mesh>
    {keys.map((item, index) => <Keycap key={item.key} index={index} geometry={geometry} reduced={reduced}
      pressed={selected === index || held.has(item.key)} onSelect={() => onSelect(index)} onLeave={onLeave} />)}
  </group>;
}

export default function SkillsKeyboard() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [lastSelected, setLastSelected] = useState(0);
  const [held, setHeld] = useState<Set<string>>(new Set());
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => { observer.disconnect(); query.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!visible) { setHeld(new Set()); setSelected(null); return; }
    const clear = () => { setHeld(new Set()); setSelected(null); };
    const down = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
      const index = keys.findIndex((item) => item.key === event.key.toUpperCase());
      if (index < 0) return;
      setLastSelected(index);
      setHeld((previous) => new Set(previous).add(keys[index].key));
    };
    const up = (event: KeyboardEvent) => setHeld((previous) => {
      const next = new Set(previous); next.delete(event.key.toUpperCase()); return next;
    });
    window.addEventListener("keydown", down); window.addEventListener("keyup", up); window.addEventListener("blur", clear);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); window.removeEventListener("blur", clear); };
  }, [visible]);
  const select = (index: number) => { setSelected(index); setLastSelected(index); };
  return <div className="skills-keyboard" ref={container}>
    <div className="keyboard-heading"><span className="keyboard-eyebrow">HANDS-ON EXPERTISE</span><h3>Built on the right keys.</h3><p>Hover, tap, or type the letters to explore my cloud & AI toolkit.</p></div>
    <div className="keyboard-stage" aria-label="Interactive 3D skills keyboard" data-cursor="disable">
      <Canvas dpr={[1, 1.5]} frameloop={visible ? "always" : "never"} camera={{ position: [0, 3.4, 4.2], fov: 38 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 6, 4]} intensity={3} />
        <pointLight position={[-3, 2, -2]} color="#dceaff" intensity={12} />
        <KeyboardScene selected={selected} held={held} reduced={reduced} onSelect={select} onLeave={() => setSelected(null)} />
      </Canvas>
    </div>
    <div className="keyboard-readout" aria-live="polite"><strong>{keys[lastSelected].label}</strong><span>{keys[lastSelected].detail}</span></div>
    <div className="keyboard-controls" aria-label="Explore keyboard skills">
      {keys.map((item, index) => <button type="button" key={item.key} data-cursor="disable"
        className={selected === index || held.has(item.key) ? "key-active" : ""}
        onPointerEnter={() => select(index)} onPointerLeave={() => setSelected(null)}
        onFocus={() => select(index)} onBlur={() => setSelected(null)} onClick={() => select(index)}>
        <kbd>{item.key}</kbd> {item.label}
      </button>)}
    </div>
    <p className="keyboard-credit">Keyboard adapted from <a href="https://github.com/Txemalon/3d-portfolio" target="_blank" rel="noreferrer">Txema Albero</a> · <a href={`${import.meta.env.BASE_URL}licenses/txema-keyboard-MIT.txt`} target="_blank" rel="noreferrer">MIT license</a></p>
  </div>;
}
