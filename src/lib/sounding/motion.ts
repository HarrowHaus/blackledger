// THE BLACK LEDGER · EDITION II — motion core (SPEC v4 §1).
// One wiring for the whole site: GSAP + ScrollTrigger + SplitText + DrawSVG,
// Lenis momentum scroll synced to ScrollTrigger. Under prefers-reduced-motion
// Lenis is disabled entirely (v4.1 §2) and callers must render final states.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };

export const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** Start the depth engine. Call once per page. Returns null lenis when motion is reduced. */
export function initDepth(): { lenis: Lenis | null } {
  if (reducedMotion()) {
    return { lenis: null };
  }
  if (lenis) return { lenis };

  lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return { lenis };
}

export function getLenis(): Lenis | null {
  return lenis;
}
