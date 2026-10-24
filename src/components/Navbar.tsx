import React, { useState, useEffect } from 'react';
import { getLenis, scrollTo } from '../lib/lenis';
import {
  Search,
  Menu,
  X,
  Phone,
  ArrowRight,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Compass,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenPlanner: () => void;
  onOpenContact: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPlanner,
  onOpenContact,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [fullScreenMenuOpen, setFullScreenMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');

      if (!hero) {
        setIsScrolled(window.scrollY > 40);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const heroProgress =
        scrollableDistance > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollableDistance))
          : 1;

      setIsScrolled(heroProgress >= 1);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Lock body scroll when full screen menu is active
  useEffect(() => {
    const lenis = getLenis();

    if (fullScreenMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [fullScreenMenuOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullScreenMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    setFullScreenMenuOpen(false);
    scrollTo(href, { offset: -80 });
  };

  const navItems = [
    {
      num: '01',
      label: 'Home',
      subtitle: 'The Art of Extraordinary Journeys',
      href: '#home',
    },
    {
      num: '02',
      label: 'Destinations',
      subtitle: 'Handpicked Escapes & Popular Packages',
      href: '#destinations',
    },
    {
      num: '03',
      label: 'Experiences',
      subtitle: 'Bespoke Villas, Private Yachts & Expeditions',
      href: '#experiences',
    },
    {
      num: '04',
      label: 'About Beyond',
      subtitle: 'Who We Are & The Curation Philosophy',
      href: '#about',
    },
    {
      num: '05',
      label: 'Traveler Stories',
      subtitle: 'Real Journeys & Lasting Memories',
      href: '#journal',
    },
    {
      num: '06',
      label: 'Planning FAQs',
      subtitle: 'Everything You Need to Know',
      href: '#faqs',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#081726]/95 backdrop-blur-md shadow-lg py-3 sm:py-3.5 border-b border-white/10'
            : 'bg-gradient-to-b from-black/70 via-black/35 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Zone: Phone Number */}
            <div className="flex-1 flex items-center justify-start">
              <a
                href="tel:+18004922396"
                className="inline-flex items-center gap-2 text-stone-200 hover:text-[#c59b67] transition-colors py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c59b67] rounded-sm"
                title="Call our 24/7 Luxury Concierge Desk"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#c59b67] group-hover:border-[#c59b67] group-hover:bg-[#c59b67]/10 transition-all shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                
                  <span className="text-xs sm:text-[13px] font-medium tracking-wider font-sans whitespace-nowrap">
                    <span className="hidden sm:inline">+91 (989) 234-4001</span>
                    {/* <span className="sm:hidden text-xs">Call Us</span> */}
                  </span>
                </div>
              </a>
            </div>

            {/* Center Zone: Logo Lockup */}
            <div className="shrink-0 flex items-center justify-center px-2">
               <a
                href="#"
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] rounded-sm"
                aria-label="Beyond Forever Earth Home"
              >
                {/* Monogram Box Icon */}
                <div>
              <img
                src="https://beyondforever.earth/assets/front/img/footer-logo.png"
                alt="Beyond Forever Earth"
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-8 h-8 sm:w-14 sm:h-14'
                }`}
              />
            </div>
                <div className="flex flex-col text-left">
                  <span className={`font-serif font-semibold tracking-[0.22em] text-white uppercase group-hover:text-[#c59b67] transition-all duration-300 ${
                    isScrolled ? 'text-xs sm:text-lg' : 'text-sm sm:text-2xl'
                  }`}>
                    Beyond
                  </span>
                  <span className={`tracking-[0.28em] text-stone-300 uppercase -mt-0.5 font-light transition-all duration-300 ${
                    isScrolled ? 'text-[8px] sm:text-[11px]' : 'text-[9px] sm:text-[15px]'
                  }`}>
                    Forever Earth
                  </span>
                </div>
              </a>
            </div>

            {/* Right Zone: Search Button & Hamburger Button */}
            <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3.5">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search destinations"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 flex items-center justify-center text-white/90 hover:text-white hover:border-[#c59b67] hover:bg-white/10 active:scale-95 transition-all cursor-pointer focus-visible:outline-none"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setFullScreenMenuOpen(true)}
                aria-label="Open full screen navigation menu"
                className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-full border border-white/30 hover:border-[#c59b67] hover:bg-white/10 active:scale-95 flex items-center gap-2 text-white transition-all cursor-pointer group focus-visible:outline-none"
              >
                <span className="hidden md:inline text-[11px] font-semibold tracking-widest uppercase text-stone-200 group-hover:text-[#c59b67] transition-colors font-sans">
                  Menu
                </span>
                <Menu className="w-4 h-4 text-white group-hover:text-[#c59b67] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Navigation Menu */}
      {fullScreenMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-[100] bg-[#05101a] text-white overflow-y-auto animate-in fade-in duration-300 flex flex-col justify-between"
        >
          {/* Subtle warm amber radial glow overlay in background */}
          <div
            className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#c59b67]/10 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#0c2238]/60 rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Full Screen Menu Top Header Bar */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/10">
            {/* Left: Phone inside full screen */}
            <a
              href="tel:+919892344001"
              className="inline-flex items-center gap-2 text-stone-300 hover:text-[#c59b67] transition-colors text-xs font-medium tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 text-[#c59b67]" />
              <span className="hidden sm:inline">+91 (989) 234-4001</span>
              {/* <span className="sm:hidden text-xs">Direct Line</span> */}
            </a>

            {/* Center: Monogram inside full screen */}
             <a
                href="#"
                className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] rounded-sm"
                aria-label="Beyond Forever Earth Home"
              >
                {/* Monogram Box Icon */}
                <div>
              <img
                src="https://beyondforever.earth/assets/front/img/footer-logo.png"
                alt="Beyond Forever Earth"
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'w-6 h-6 sm:w-9 sm:h-9' : 'w-8 h-8 sm:w-14 sm:h-14'
                }`}
              />
            </div>
                <div className="flex flex-col text-left">
                  <span className={`font-serif font-semibold tracking-[0.22em] text-white uppercase group-hover:text-[#c59b67] transition-all duration-300 ${
                    isScrolled ? 'text-xs sm:text-lg' : 'text-sm sm:text-2xl'
                  }`}>
                    Beyond
                  </span>
                  <span className={`tracking-[0.28em] text-stone-300 uppercase -mt-0.5 font-light transition-all duration-300 ${
                    isScrolled ? 'text-[8px] sm:text-[11px]' : 'text-[9px] sm:text-[15px]'
                  }`}>
                    Forever Earth
                  </span>
                </div>
              </a>
            {/* Right: Close Button */}
            <button
              onClick={() => setFullScreenMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 hover:border-[#c59b67] hover:bg-white/10 text-white transition-all cursor-pointer group"
            >
              <span className="text-[11px] font-semibold tracking-widest uppercase text-stone-300 group-hover:text-[#c59b67]">
                Close
              </span>
              <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* Full Screen Menu Main Body */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Primary Editorial Navigation Links */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                  <span className="w-5 h-[1px] bg-[#c59b67]" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                    CURATED NAVIGATION
                  </span>
                </div>

                <nav className="flex flex-col space-y-2 sm:space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.num}
                      onClick={() => handleNavClick(item.href)}
                      className="group flex items-baseline gap-4 sm:gap-6 text-left py-1.5 transition-all cursor-pointer focus-visible:outline-none"
                    >
                      <span className="font-mono text-xs sm:text-sm text-[#c59b67] tracking-wider tabular-nums font-light opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        {item.num}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-200 font-normal tracking-tight group-hover:text-white group-hover:translate-x-2 transition-all">
                          {item.label}
                        </span>
                        <span className="text-[11px] sm:text-xs text-stone-400 font-sans font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">
                          — {item.subtitle}
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Right Column: Concierge Desk Card & Direct Actions */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="bg-[#081726]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-1">
                      PRIVATE ADVISORY
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                      Bespoke Travel Concierge
                    </h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed mt-2">
                      Connect directly with our senior destination curators to design a private, tailor-made itinerary.
                    </p>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-3 text-xs text-stone-300 pt-2 border-t border-white/10">
                    <a
                      href="tel:+919892344001"
                      className="flex items-center gap-3 hover:text-[#c59b67] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span>+91 (989) 234-4001</span>
                    </a>

                    <a
                      href="mailto:concierge@beyondforever.earth"
                      className="flex items-center gap-3 hover:text-[#c59b67] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span>info@beyondforever.earth</span>
                    </a>

                    <div className="flex items-center gap-3 text-stone-400">
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#c59b67]">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span>Worli Shivaji Nagar, Worli, Mumbai, Maharashtra 400025</span>
                    </div>
                  </div>

                  {/* Actions inside menu */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setFullScreenMenuOpen(false);
                        onOpenPlanner();
                      }}
                      className="flex-1 py-3 px-4 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Plan Your Journey</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setFullScreenMenuOpen(false);
                        onOpenContact();
                      }}
                      className="py-3 px-4 border border-white/25 hover:border-white hover:bg-white/10 text-white text-xs font-medium tracking-wider uppercase rounded-xl transition-all cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>

                {/* Social Channels Strip */}
                <div className="flex items-center justify-between px-2 text-xs text-stone-400">
                  <span className="text-[11px] tracking-wider uppercase text-stone-400">
                    Follow the Journal
                  </span>
                  <div className="flex items-center space-x-3">
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      aria-label="YouTube"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b67] hover:bg-white/5 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Screen Menu Bottom Bar */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
            <span>© 2026 Beyond Forever Earth. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>Bespoke Luxury Travel Planners</span>
              <span>·</span>
              <button
                onClick={() => {
                  setFullScreenMenuOpen(false);
                  onOpenPlanner();
                }}
                className="text-[#c59b67] hover:underline"
              >
                Start Your Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
