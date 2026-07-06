// THE BLACK LEDGER · TRUE COUNT — THE PULLBACK (SPEC v7.1 §2; the spine).
// One continuous scroll-scrubbed camera move: one bill → a stack of 100 → a tray
// of 10,000 → a pallet → the full admitted mass (K2). Each assembly ACCUMULATES
// on scrub at true count — the instance count in frame is always real, and the
// scale-line reads exactly what is drawn. K3–K5 beats arrive in P3.
//
// Loaded only on Tier A/B by dynamic import ([PF]-01). The caller owns the DOM
// track and copy beats; this module owns the world and the honest numbers.

import * as THREE from 'three/webgpu';
import type { MassData } from './scene';

const GROUND = 0x141210;
const BONE = 0xe8e0ce;

export interface PullbackHandle {
  backend: 'webgpu' | 'webgl2';
  /** drive the journey: t in [0,1] across the whole track */
  setProgress: (t: number) => void;
  /** what is actually drawn right now */
  inFrame: () => { bills: number; usd: number };
  fps: () => number;
  dispose: () => void;
}

interface Beat {
  /** total instances of this assembly's unit */
  count: number;
  /** bills per instance */
  unitBills: number;
  mesh: THREE.InstancedMesh;
  /** camera distance for the beat at rest (landscape); portrait multiplies (authored) */
  dist: number;
  /** vertical look target */
  lookY: number;
}

function lattice(
  mesh: THREE.InstancedMesh,
  count: number,
  cols: number,
  rows: number,
  unit: { w: number; h: number; d: number },
  gapScale: number
): void {
  const gw = unit.w * gapScale,
    gh = unit.h * gapScale,
    gd = unit.d * gapScale;
  const m = new THREE.Matrix4();
  const layerSize = cols * rows;
  for (let i = 0; i < count; i++) {
    const layer = Math.floor(i / layerSize);
    const row = Math.floor((i % layerSize) / cols);
    const col = i % cols;
    m.setPosition(
      (col - (cols - 1) / 2) * (unit.w + gw),
      layer * (unit.h + gh),
      (row - (rows - 1) / 2) * (unit.d + gd)
    );
    mesh.setMatrixAt(i, m);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

export async function mountPullback(
  canvas: HTMLCanvasElement,
  data: MassData,
  opts: { forceWebGL?: boolean; portrait: boolean } = { portrait: false }
): Promise<PullbackHandle> {
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, forceWebGL: !!opts.forceWebGL });
  await renderer.init();
  const backend: 'webgpu' | 'webgl2' = (renderer.backend as { isWebGPUBackend?: boolean })
    .isWebGPUBackend
    ? 'webgpu'
    : 'webgl2';
  console.log(
    `%cRENDERER: ${backend.toUpperCase()} · TIER ${backend === 'webgpu' ? 'A' : 'B'} · BILLS IN LAW: ${data.admitted.bills.toLocaleString('en-US')}`,
    'font-family:monospace'
  );

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(GROUND);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.0005, 900);
  const mat = new THREE.MeshStandardMaterial({ color: BONE, roughness: 0.88, metalness: 0 });

  const U = data.units;
  const geo = (u: { w: number; h: number; d: number }) => new THREE.BoxGeometry(u.w, u.h, u.d);

  // the five assemblies (each true-sized, each accumulates instance by instance)
  const mkMesh = (u: { w: number; h: number; d: number }, count: number) => {
    const mesh = new THREE.InstancedMesh(geo(u), mat, count);
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
  };

  const beats: Beat[] = [
    // B0 · K1 — one bill, flat, alone
    { count: 1, unitBills: 1, mesh: mkMesh(U.bill, 1), dist: 0.5, lookY: 0 },
    // B1 · the per-second beat — 32 bills, one second of the admitted budget (M1 copy)
    { count: data.billsPerSecond, unitBills: 1, mesh: mkMesh(U.bill, data.billsPerSecond), dist: 0.55, lookY: 0.001 },
    // B2 · the strapped stack — 100 bills ($10,000)
    { count: data.stackBills, unitBills: 1, mesh: mkMesh(U.bill, data.stackBills), dist: 0.6, lookY: 0.004 },
    // B3 · the tray — 100 stacks ($1,000,000)
    { count: 100, unitBills: data.stackBills, mesh: mkMesh(U.stack, 100), dist: 3.4, lookY: 0 },
    // B4 · the pallet — 100 trays ($100,000,000)
    { count: 100, unitBills: data.blockBills, mesh: mkMesh(U.tray, 100), dist: 4.6, lookY: 0.55 },
    // B5 · K2 — the admitted mass, 1,011 pallets ($101,100,000,000)
    { count: data.admitted.pallets, unitBills: data.palletBills, mesh: mkMesh(U.pallet, data.admitted.pallets), dist: 62, lookY: 1.6 },
  ];

  // assembly lattices (fill order = growth order; every arrangement zero-air + gap for the eye)
  lattice(beats[0].mesh, 1, 1, 1, U.bill, 0);
  lattice(beats[1].mesh, beats[1].count, 1, 1, U.bill, 0.06); // 32 bills pile up
  lattice(beats[2].mesh, beats[2].count, 1, 1, U.bill, 0.02); // the stack piles 100
  lattice(beats[3].mesh, 100, 10, 10, U.stack, 0.045); // 10×10 stacks = the tray
  lattice(beats[4].mesh, 100, 1, 1, U.tray, 0.03); // 100 trays pile = the pallet
  lattice(beats[5].mesh, beats[5].count, 26, 13, U.pallet, 0.05); // the mass; last row runs out

  // light: one hard examination key, faint rim (K-frame family)
  const key = new THREE.DirectionalLight(0xfff4e0, 3.6);
  key.position.set(-0.8, 1.2, 0.5);
  const rim = new THREE.DirectionalLight(0xe8e0ce, 0.25);
  rim.position.set(0.7, -0.4, -0.8);
  const amb = new THREE.AmbientLight(0xe8e0ce, 0.05);
  scene.add(key, rim, amb);

  // authored portrait crops (owner device report: the mass must not crop at the frame edge)
  const distMul = opts.portrait ? 1.55 : 1.0;

  let inFrameBills = 1;
  const SEG = 1 / beats.length;

  function setProgress(t: number) {
    const clamped = Math.min(0.999999, Math.max(0, t));
    const idx = Math.floor(clamped / SEG);
    const local = (clamped - idx * SEG) / SEG; // 0..1 within the beat
    const beat = beats[idx];

    // assemble: first 35% of a beat grows the count from 1 → all (the arrival is arithmetic)
    const grow = Math.min(1, local / 0.35);
    const drawn = Math.max(1, Math.round(beat.count * grow));
    beats.forEach((b, i) => {
      b.mesh.visible = i === idx;
      if (i === idx) b.mesh.count = drawn;
      else b.mesh.count = b.count;
    });
    inFrameBills = drawn * beat.unitBills;

    // continuous camera: pull back within the beat toward the next beat's distance
    const next = beats[Math.min(idx + 1, beats.length - 1)];
    const d = (beat.dist + (next.dist - beat.dist) * Math.pow(local, 2.2)) * distMul;
    const y = beat.lookY + (next.lookY - beat.lookY) * local;
    camera.position.set(-d * 0.55, y + d * 0.28, d * 0.79);
    camera.lookAt(0, y, 0);
    key.position.set(-d, d * 1.4, d * 0.4);
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
  let winStart = performance.now();
  let fpsValue = 60;
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    frames++;
    const now = performance.now();
    if (now - winStart >= 1000) {
      fpsValue = (frames * 1000) / (now - winStart);
      frames = 0;
      winStart = now;
    }
  });

  setProgress(0);

  return {
    backend,
    setProgress,
    inFrame: () => ({ bills: inFrameBills, usd: inFrameBills * 100 }),
    fps: () => fpsValue,
    dispose: () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    },
  };
}
