import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { scrollTo } from '../lib/lenis';

interface HeroSectionProps {
  onScrollToNext?: () => void;
}

const FRAME_COUNT = 150;

const getFramePath = (index: number) =>
  `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToNext,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = framesRef.current;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    function drawFrame(index: number) {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (index === lastDrawnFrameRef.current) return;

      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      if (!width || !height) return;

      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;

      ctx!.clearRect(0, 0, width, height);
      ctx!.drawImage(
        img,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );

      lastDrawnFrameRef.current = index;
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      if (!width || !height) return;

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      lastDrawnFrameRef.current = -1;
      drawFrame(Math.round(currentFrameRef.current));
    }

    function animate() {
      rafRef.current = null;

      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) < 0.05) {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(Math.round(currentFrameRef.current));
        return;
      }

      currentFrameRef.current += diff * 0.18;
      drawFrame(Math.round(currentFrameRef.current));
      rafRef.current = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function updateTargetFromScroll() {
      const rect = section!.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const progress =
        scrollableDistance > 0 ? clamp(-rect.top / scrollableDistance) : 0;

      targetFrameRef.current = progress * (FRAME_COUNT - 1);
      startAnimation();
    }

    function handleResize() {
      resizeCanvas();
      updateTargetFromScroll();
    }

    if (images.length !== FRAME_COUNT) {
      images.length = FRAME_COUNT;
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = getFramePath(i);
        img.onload = () => {
          if (i === 0 || i === Math.round(currentFrameRef.current)) {
            drawFrame(i);
          }
        };
        images[i] = img;
      }
    }

    resizeCanvas();
    updateTargetFromScroll();

    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', updateTargetFromScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      images.forEach((img) => {
        img.onload = null;
      });
      framesRef.current = [];
    };
  }, []);

  const handleScrollDown = () => {
    if (onScrollToNext) {
      onScrollToNext();
      return;
    }
    const nextSection = document.getElementById('about') || document.getElementById('destinations');
    if (nextSection) {
      scrollTo(nextSection, { offset: -80 });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-[300vh] bg-[#05131f]"
    >
      <div className="sticky top-0 h-screen h-[100dvh] min-h-[640px] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 lg:pb-12 px-5 sm:px-8 lg:px-14 overflow-hidden select-none">
        {/* Scroll-driven background frame sequence */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#05131f]">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full block pointer-events-none"
          />

          {/* Soft, Pure Hardware-Accelerated Scrim Overlays */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent pointer-events-none" />
        </div>

        {/* Top Spacer for balance with fixed header */}
        <div aria-hidden="true" className="w-full shrink-0 h-4 sm:h-8" />

        {/* Main Content Area matching the design */}
        <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            {/* Left Column: Bold White Headline */}
            <div className="lg:col-span-7">
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] text-white tracking-tight leading-[1.06] drop-shadow-lg">
                Unforgettable<br />
                Travel Moments<br />
                by Beyond
              </h1>
            </div>

            {/* Right Column: Clean Editorial Paragraph */}
            <div className="lg:col-span-5 flex flex-col justify-end pb-1.5 sm:pb-3 lg:pl-4">
              <p className="text-white/95 text-sm sm:text-base lg:text-[17px] xl:text-lg font-light leading-relaxed font-sans max-w-md drop-shadow-md">
                We take you beyond the ordinary, to places where cultures come alive, landscapes leave you breathless, and every moment becomes a story to tell.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row with Circular Scroll Down Button on Right */}
        <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-end shrink-0">
          <button
            onClick={handleScrollDown}
            aria-label="Scroll down to explore"
            className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-white cursor-pointer group animate-scroll-box"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/35 backdrop-blur-md border border-white/40 shadow-xl transition-colors duration-300 pointer-events-none"
            />
            <ArrowDown className="relative z-10 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
