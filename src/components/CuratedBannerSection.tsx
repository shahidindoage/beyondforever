import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CuratedBannerSectionProps {
  onStartPlanning: () => void;
}

const SERVICE_POINTS = [
  'Consultation',
  'Research & Pricing',
  'Vendor Negotiation',
  'Itinerary Planning',
  'Booking Support',
  '24/7 Local Support',
];

export const CuratedBannerSection: React.FC<CuratedBannerSectionProps> = ({
  onStartPlanning,
}) => {
  // Repeat service points so both halves of the marquee are long and identical for seamless -50% translation
  const marqueeItems = [...SERVICE_POINTS, ...SERVICE_POINTS];

  return (
    <section id="experiences" className="relative pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#071523]">
      {/* Background Image Container with Mediterranean Bay image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/CandidHR/Turquoise%20Mediterranean%20Bay%20and%20Coastal%20Village.png"
          alt="Turquoise Mediterranean Bay and Coastal Village"
          className="w-full h-full object-cover object-center filter brightness-[0.82]"
          loading="lazy"
        />
        {/* Scrim overlays for crisp readability and Mediterranean depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061524]/95 via-[#061524]/75 to-[#061524]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061524] via-transparent to-black/35" />

        {/* Ambient warm gold glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c59b67]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Container (constrained to max-w-7xl) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        {/* Section Header styled like PackagesSection */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            {/* Gold Kicker */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-8 h-[1px] bg-[#c59b67]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                Curated Experiences
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] drop-shadow-sm">
              Your Dream Trip, <br />
              <span className="italic font-normal text-[#c59b67] sm:text-[#e8c697]">Our Expertise</span>
            </h2>

            {/* Short Description right below heading */}
            <p className="mt-5 text-sm sm:text-base font-sans text-stone-300 font-light leading-relaxed max-w-xl">
              Tell us your travel vision and destination wish list. We orchestrate every private transfer, rare reservation, and unforgettable insider moment.
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="md:text-right shrink-0">
            <button
              onClick={onStartPlanning}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#c59b67] hover:bg-[#d6aa75] active:scale-[0.98] text-[#081726] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-md transition-all shadow-lg shadow-black/25 group cursor-pointer"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Marquee Bar (spans 100% of section width) */}
      <div className="relative z-10 w-full border-t border-white/10 pt-5 sm:pt-6 pb-2">
        {/* Edge gradient masks for seamless full-width fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#061524] via-[#061524]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#061524] via-[#061524]/80 to-transparent z-10" />

        <div className="overflow-hidden py-1 w-full">
          <div className="animate-marquee flex items-center gap-3 sm:gap-4">
            {/* First half */}
            {marqueeItems.map((point, index) => (
              <div
                key={`a-${point}-${index}`}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/10 hover:border-[#c59b67]/50 text-stone-200 transition-all duration-300 shrink-0 select-none group"
              >

                {/* <span className="w-1.5 h-1.5 rounded-full bg-[#c59b67] group-hover:scale-125 transition-transform" /> */}
                <span className="text-[#c59b67]/60 text-xs font-serif italic">✦</span>
                <span className="text-xs sm:text-[13px] font-sans tracking-wider uppercase font-medium text-stone-200 group-hover:text-white">
                  {point}
                </span>
                <span className="text-[#c59b67]/60 text-xs font-serif italic">✦</span>
              </div>
            ))}
            {/* Second half (exact identical copy for flawless 100% loop with -50% transform) */}
            {marqueeItems.map((point, index) => (
              <div
                key={`b-${point}-${index}`}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md border border-white/10 hover:border-[#c59b67]/50 text-stone-200 transition-all duration-300 shrink-0 select-none group"
              >
             <span className="text-[#c59b67]/60 text-xs font-serif italic">✦</span>
                <span className="text-xs sm:text-[13px] font-sans tracking-wider uppercase font-medium text-stone-200 group-hover:text-white">
                  {point}
                </span>
                <span className="text-[#c59b67]/60 text-xs font-serif italic">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
