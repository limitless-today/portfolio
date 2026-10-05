import * as THREE from "three";

function roundedLens(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2, y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

/** Accessories are authored in the model's bind pose and attached to its head bone. */
export default function applyAvatarAppearance(character: THREE.Object3D) {
  if (character.getObjectByName("ExecutiveAvatarAccessories")) return;
  const head = character.getObjectByName("spine006") || character.getObjectByName("spine.006");
  if (!head) return;
  character.traverse((object) => {
    if (/^CAP[._]?00[12]$/i.test(object.name)) object.visible = false;
    if (!(object instanceof THREE.Mesh)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    const styled = materials.map((source) => {
      if (!(source instanceof THREE.MeshStandardMaterial)) return source;
      const isHair = /hair|eyebrow/i.test(object.name);
      const isShirt = /BODY.?SHIRT/i.test(object.name) && /008/.test(source.name);
      if (!isHair && !isShirt) return source;
      const material = source.clone();
      material.color.set(isHair ? "#24262d" : "#263d50");
      material.map = null;
      material.roughness = isHair ? 0.86 : 0.8;
      return material;
    });
    object.material = Array.isArray(object.material) ? styled : styled[0];
  });

  const accessories = new THREE.Group();
  accessories.name = "ExecutiveAvatarAccessories";
  const frames = new THREE.MeshStandardMaterial({ color: "#151c25", metalness: 0.45, roughness: 0.28 });
  const glass = new THREE.MeshPhysicalMaterial({ color: "#edfaff", transparent: true, opacity: 0.1, roughness: 0.08, metalness: 0, depthWrite: false, side: THREE.DoubleSide });
  function tube(points: THREE.Vector3[], radius = 0.029, material: THREE.Material = frames) {
    const curve = new THREE.CatmullRomCurve3(points);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, radius, 8, false), material);
    accessories.add(mesh);
    return mesh;
  }
  for (const side of [-1, 1]) {
    const outline = roundedLens(0.79, 0.49, 0.08);
    const points = outline.getPoints(12).map((point) => new THREE.Vector3(point.x + side * 0.455, point.y + 13.27, 1.105));
    tube(points);
    const lens = new THREE.Mesh(new THREE.ShapeGeometry(outline), glass);
    lens.position.set(side * 0.455, 13.27, 1.105);
    lens.name = `PrescriptionLens${side < 0 ? "Right" : "Left"}`;
    accessories.add(lens);
    tube([new THREE.Vector3(side * 0.85, 13.36, 1.105), new THREE.Vector3(side * 1.03, 13.35, 0.7), new THREE.Vector3(side * 1.13, 13.3, 0.2), new THREE.Vector3(side * 1.12, 13.12, 0.04)], 0.02);
  }
  tube([new THREE.Vector3(-0.065, 13.32, 1.105), new THREE.Vector3(0, 13.39, 1.18), new THREE.Vector3(0.065, 13.32, 1.105)], 0.023);

  const hair = new THREE.MeshStandardMaterial({ color: "#24262d", roughness: 0.9 });
  const crown = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2), hair);
  crown.name = "ShortSweptHair";
  crown.position.set(0, 13.79, -0.14);
  crown.scale.set(1.015, 0.52, 0.98);
  accessories.add(crown);
  const strandMaterial = new THREE.MeshStandardMaterial({ color: "#5d6069", roughness: 0.95 });
  for (let i = 0; i < 13; i++) {
    const x = -0.84 + i * 0.135;
    const arch = Math.sqrt(Math.max(0, 1 - x * x));
    tube([
      new THREE.Vector3(x, 13.81, 0.78 * arch - 0.14),
      new THREE.Vector3(x - 0.06, 13.79 + 0.43 * arch, 0.3),
      new THREE.Vector3(x - 0.1, 13.79 + 0.49 * arch, -0.14),
      new THREE.Vector3(x - 0.08, 13.79 + 0.3 * arch, -0.75 * arch),
    ], 0.009, strandMaterial);
  }
  character.add(accessories);
  character.updateMatrixWorld(true);
  head.attach(accessories);
}
