// Adapted from Txema Albero’s FrozenKeyboard.tsx (MIT).
// Copyright (c) 2026 Jose Maria Albero Belamendia.
// Full license: public/licenses/txema-keyboard-MIT.txt
import * as THREE from "three";

function makeRoundedRectShape(
  width: number,
  depth: number,
  cornerRadius: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const w = width / 2;
  const d = depth / 2;
  const r = Math.min(cornerRadius, w, d);
  shape.moveTo(-w + r, -d);
  shape.lineTo(w - r, -d);
  shape.quadraticCurveTo(w, -d, w, -d + r);
  shape.lineTo(w, d - r);
  shape.quadraticCurveTo(w, d, w - r, d);
  shape.lineTo(-w + r, d);
  shape.quadraticCurveTo(-w, d, -w, d - r);
  shape.lineTo(-w, -d + r);
  shape.quadraticCurveTo(-w, -d, -w + r, -d);
  return shape;
}

export function createExtrudedBox(
  width: number,
  depth: number,
  height: number,
  cornerRadius: number,
  bevelSize: number,
  topScale = 1
): THREE.BufferGeometry {
  const shape = makeRoundedRectShape(width, depth, cornerRadius);
  const extrudeDepth = Math.max(0.001, height - 2 * bevelSize);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: extrudeDepth,
    bevelEnabled: bevelSize > 0,
    bevelThickness: bevelSize,
    bevelSize: bevelSize,
    bevelSegments: 2,
    steps: 1,
    curveSegments: 12,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -height / 2 + bevelSize, 0);

  if (topScale !== 1) {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = (y + height / 2) / height;
      const factor = THREE.MathUtils.lerp(1, topScale, t);
      pos.setX(i, pos.getX(i) * factor);
      pos.setZ(i, pos.getZ(i) * factor);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  }
  return geometry;
}

