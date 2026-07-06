// THE BLACK LEDGER · TRUE COUNT — the mass rendering core (SPEC v7.1 §1; v7-CONSOLIDATED
// renderer baseline + [PF]). One persistent renderer, WebGPU first with automatic WebGL2
// fallback, choice logged as a single mono console line. Bills render bone-on-ground
// monochrome — this is a ledger, not a casino (§1.2). Counts arrive from count.ts and are
// never invented here.
//
// P1 authors keyframes K1 and K2 (§1.3). Loaded ONLY by dynamic import — Tier C never
// fetches this module ([PF]-01).

import * as THREE from 'three/webgpu';

const GROUND = 0x141210;
const BONE = 0xe8e0ce;

export interface MassData {
  admitted: {
    bills: number;
    pallets: number;
    volumeM3: number;
  };
  billMM: { L: number; W: number; T: number };
}

export interface MassHandle {
  backend: 'webgpu' | 'webgl2';
  setKeyframe: (k: 'k1' | 'k2') => void;
  fps: () => number;
  dispose: () => void;
}

/** procedural worn-edge relief for the near-LOD bill — noise concentrated at the edges */
function wornEdgeBump(): THREE.CanvasTexture {
  const s = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, s, s);
  const img = ctx.getImageData(0, 0, s, s);
  let seed = 1011; // the pallet count is the seed — even the noise is counted
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const ex = Math.min(x, s - 1 - x) / s;
      const ey = Math.min(y, s - 1 - y) / s;
      const edge = Math.max(0, 1 - Math.min(ex, ey) * 14); // 0 inside → 1 at the rim
      const n = (rnd() - 0.5) * 90 * edge + (rnd() - 0.5) * 8;
      const i = (y * s + x) * 4;
      const v = Math.max(0, Math.min(255, 128 + n));
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return new THREE.CanvasTexture(cv);
}

export async function mountMass(
  canvas: HTMLCanvasElement,
  data: MassData,
  opts: { forceWebGL?: boolean } = {}
): Promise<MassHandle> {
  // the ladder's Tier B entry ([PF]-01): WebGL2 by automatic fallback, or forced for testing
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, forceWebGL: !!opts.forceWebGL });
  await renderer.init();
  const backend: 'webgpu' | 'webgl2' = (renderer.backend as { isWebGPUBackend?: boolean })
    .isWebGPUBackend
    ? 'webgpu'
    : 'webgl2';
  // the single mono console line (v7-CONSOLIDATED renderer baseline / [PF]-02)
  console.log(
    `%cRENDERER: ${backend.toUpperCase()} · TIER ${backend === 'webgpu' ? 'A' : 'B'} · BILLS IN LAW: ${data.admitted.bills.toLocaleString('en-US')}`,
    'font-family:monospace'
  );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(GROUND);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.001, 500);

  const boneMat = new THREE.MeshStandardMaterial({
    color: BONE,
    roughness: 0.86,
    metalness: 0.0,
    bumpMap: wornEdgeBump(),
    bumpScale: 0.35,
  });

  // ---- near LOD: one modeled bill (metres) ----
  const b = data.billMM;
  const billGeo = new THREE.BoxGeometry(b.L / 1000, b.T / 1000, b.W / 1000);
  const bill = new THREE.Mesh(billGeo, boneMat);
  bill.visible = false;
  scene.add(bill);

  // ---- far LOD: the admitted mass as volumetric brick aggregates (§1.1) ----
  // One pallet-brick = $100,000,000 of bills: footprint 1.0 × 1.2 m (standard pallet),
  // height = the bills' true computed volume ÷ footprint. Nothing about the size is styled.
  const palletVolume = data.admitted.volumeM3 / data.admitted.pallets;
  const PAL_W = 1.0,
    PAL_D = 1.2;
  const palH = palletVolume / (PAL_W * PAL_D); // ≈ 0.94 m of money
  const palletGeo = new THREE.BoxGeometry(PAL_W, palH, PAL_D);
  const palletMat = new THREE.MeshStandardMaterial({ color: BONE, roughness: 0.9, metalness: 0 });
  const COLS = 26,
    ROWS = 13; // 26 × 13 × 3 lattice = 1,014 slots; exactly 1,011 filled — the last row runs out
  const LAYERS = Math.ceil(data.admitted.pallets / (COLS * ROWS));
  const mass = new THREE.InstancedMesh(palletGeo, palletMat, data.admitted.pallets);
  const GAP = 0.06;
  const m = new THREE.Matrix4();
  let i = 0;
  outer: for (let layer = 0; layer < LAYERS; layer++) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (i >= data.admitted.pallets) break outer;
        m.setPosition(
          (col - (COLS - 1) / 2) * (PAL_W + GAP),
          layer * (palH + GAP),
          (row - (ROWS - 1) / 2) * (PAL_D + GAP)
        );
        mass.setMatrixAt(i++, m);
      }
    }
  }
  if (i !== data.admitted.pallets)
    throw new Error(`[true-count] drew ${i} pallets, law says ${data.admitted.pallets}`);
  mass.visible = false;
  scene.add(mass);

  // ---- light: authored per keyframe (§0.2) ----
  const key = new THREE.DirectionalLight(0xfff4e0, 3.2);
  const rim = new THREE.DirectionalLight(0xe8e0ce, 0.35);
  const amb = new THREE.AmbientLight(0xe8e0ce, 0.06);
  scene.add(key, rim, amb);

  // ---- the authored keyframes (§1.3, recorded in the Ledger as "authored") ----
  function k1() {
    // K1 — one bill, flat, alone, lit hard from one side, on black.
    bill.visible = true;
    mass.visible = false;
    bill.rotation.set(0, -0.28, 0);
    camera.position.set(0.13, 0.26, 0.46); // far enough that the bill is an object, not a field
    camera.lookAt(0, 0, 0);
    key.position.set(-0.9, 0.25, 0.15); // hard from the left, low
    key.intensity = 4.2;
    rim.position.set(0.6, 0.8, -0.7);
    rim.intensity = 0.12;
    amb.intensity = 0.025;
  }
  function k2() {
    // K2 — the admitted mass at full scale, hanging in the void, lit like evidence.
    bill.visible = false;
    mass.visible = true;
    const H = LAYERS * (palH + GAP);
    mass.position.y = -H / 2;
    camera.position.set(-24, 7.5, 30);
    camera.lookAt(0, 0, 0);
    key.position.set(-18, 30, 8); // one hard examination light from above-left
    key.intensity = 3.4;
    rim.position.set(24, -6, -20);
    rim.intensity = 0.3;
    amb.intensity = 0.05;
  }

  function setKeyframe(k: 'k1' | 'k2') {
    if (k === 'k1') k1();
    else k2();
  }

  function resize() {
    const w = canvas.clientWidth,
      h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let frames = 0;
  let fpsWindowStart = performance.now();
  let fpsValue = 0;
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    frames++;
    const now = performance.now();
    if (now - fpsWindowStart >= 1000) {
      fpsValue = (frames * 1000) / (now - fpsWindowStart);
      frames = 0;
      fpsWindowStart = now;
    }
  });

  return {
    backend,
    setKeyframe,
    fps: () => fpsValue,
    dispose: () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    },
  };
}
