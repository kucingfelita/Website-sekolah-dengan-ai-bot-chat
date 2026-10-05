import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.05,
    touchMultiplier: 1.5,
  });

  // Synchronize Lenis scroll event with GSAP ScrollTrigger
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Synchronize GSAP ticker with Lenis raf loop
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function scrollToTop(immediate: boolean = false): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function scrollToElement(
  target: string | HTMLElement, 
  options: { offset?: number; duration?: number; immediate?: boolean } = {}
): void {
  const { offset = -80, duration = 1.2, immediate = false } = options;

  let el: HTMLElement | null = null;
  if (typeof target === 'string') {
    const cleanSelector = target.startsWith('#') ? target : `#${target}`;
    el = document.querySelector<HTMLElement>(cleanSelector);
  } else {
    el = target;
  }

  if (lenisInstance && el) {
    lenisInstance.scrollTo(el, {
      offset,
      duration,
      immediate,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (el) {
    const yOffset = offset;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function lockScroll(): void {
  if (lenisInstance) {
    lenisInstance.stop();
  }
  document.body.classList.add('overflow-hidden');
}

export function unlockScroll(): void {
  if (lenisInstance) {
    lenisInstance.start();
  }
  document.body.classList.remove('overflow-hidden');
}

export function refreshScrollTriggers(): void {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export function destroySmoothScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
