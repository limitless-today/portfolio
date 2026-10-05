import * as THREE from "three";
import { createExtrudedBox } from "../../keyboardGeometry";

/** A silver Apple-style laptop on a table, in character space. */
export default function createLaptopEffects(character: THREE.Object3D) {
  const group = new THREE.Group();
  group.name = "CloudLaptop";
  group.position.set(0, 9.4, 3.4);
  character.add(group);
  // Keep the original objects available to the existing scroll timelines.
  for (const name of ["Plane004", "Keyboard", "screenlight"]) {
    const original = character.getObjectByName(name);
    if (original) original.visible = false;
  }
  const deskMaterial = new THREE.MeshStandardMaterial({ color: "#5c4032", roughness: 0.65, metalness: 0.08 });
  const table = new THREE.Mesh(createExtrudedBox(5.8, 3.6, 0.2, 0.12, 0.025), deskMaterial);
  table.name = "ExecutiveDeskTop";
  table.position.set(0, -0.165, -0.65);
  group.add(table);
  const legMaterial = new THREE.MeshStandardMaterial({ color: "#273340", metalness: 0.65, roughness: 0.35 });
  for (const x of [-2.5, 2.5]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.8, 2.8), legMaterial);
    leg.position.set(x, -2.16, -0.65);
    group.add(leg);
  }
  const silver = new THREE.MeshStandardMaterial({ color: "#b7c3ce", metalness: 0.75, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({ color: "#111a23", metalness: 0.25, roughness: 0.5 });
  const base = new THREE.Mesh(createExtrudedBox(3.35, 2.1, 0.09, 0.1, 0.018), silver);
  base.position.z = -0.7;
  group.add(base);
  const lid = new THREE.Group();
  lid.position.set(0, 0.06, 0.22);
  lid.rotation.x = -0.1;
  group.add(lid);
  const shell = new THREE.Mesh(createExtrudedBox(3.35, 2.05, 0.09, 0.1, 0.018), silver);
  shell.rotation.x = Math.PI / 2;
  shell.position.y = 1.02;
  lid.add(shell);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.12, 1.8), new THREE.MeshBasicMaterial({ color: "#0a3743" }));
  screen.position.set(0, 1.02, -0.052);
  screen.rotation.y = Math.PI;
  lid.add(screen);
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.018, 0.88), dark);
  keyboard.position.set(0, 0.055, -0.53); group.add(keyboard);
  for (let row = 0; row < 4; row++) for (let col = 0; col < 12; col++) {
    const key = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.022, 0.16), new THREE.MeshStandardMaterial({ color: "#39434e", roughness: 0.7 }));
    key.position.set((col - 5.5) * 0.225, 0.078, -0.84 + row * 0.2); group.add(key);
  }
  const trackpad = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.012, 0.46), silver);
  trackpad.position.set(0, 0.059, -1.27); group.add(trackpad);

  const logoCanvas = document.createElement("canvas"); logoCanvas.width = logoCanvas.height = 256;
  const context = logoCanvas.getContext("2d")!;
  context.fillStyle = "#eef8ff";
  context.beginPath();
  context.moveTo(128, 80); context.bezierCurveTo(94, 53, 51, 80, 60, 132);
  context.bezierCurveTo(64, 170, 91, 211, 111, 200); context.bezierCurveTo(123, 193, 137, 193, 151, 200);
  context.bezierCurveTo(171, 210, 193, 177, 200, 151); context.bezierCurveTo(165, 143, 164, 108, 197, 95);
  context.bezierCurveTo(178, 67, 150, 64, 128, 80); context.fill();
  context.beginPath(); context.moveTo(127, 67); context.bezierCurveTo(126, 42, 145, 26, 164, 25); context.bezierCurveTo(166, 48, 149, 66, 127, 67); context.fill();
  const logoTexture = new THREE.CanvasTexture(logoCanvas); logoTexture.colorSpace = THREE.SRGBColorSpace;
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.64, 0.64), new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true, depthWrite: false }));
  logo.position.set(0, 1.08, 0.057); lid.add(logo);

  const dispose = () => {
    group.removeFromParent();
    group.traverse((object) => {
      if (object instanceof THREE.Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach((material) => material.dispose()); }
    });
    logoTexture.dispose();
  };
  return { dispose };
}
