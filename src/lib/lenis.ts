import Lenis, { type ScrollToOptions } from 'lenis';

let lenis: Lenis | null = null;

export function initLenis() {
  if (lenis) return;

  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    respectReducedMotion: true,
    anchors: { offset: -80 },
  });
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

export function scrollTo(
  target: string | number | HTMLElement,
  options: ScrollToOptions = {}
) {
  if (lenis) {
    lenis.scrollTo(target, options);
    return;
  }

  const offset = options.offset ?? 0;
  const element =
    typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target instanceof HTMLElement
      ? target
      : null;

  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'smooth' });
  }
}
