/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PackagesSection, TravelPackage } from './components/PackagesSection';
import { CuratedBannerSection } from './components/CuratedBannerSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { PartnersSection } from './components/PartnersSection';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { PlannerModal } from './components/PlannerModal';
import { PackageModal } from './components/PackageModal';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { getLenis, initLenis, scrollTo } from './lib/lenis';

export default function App() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [prefilledDestination, setPrefilledDestination] = useState('');
  const [prefilledTravelType, setPrefilledTravelType] = useState('');

  useEffect(() => {
    initLenis();
  }, []);

  const anyModalOpen =
    plannerOpen || contactOpen || searchOpen || selectedPackage !== null;

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (anyModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [anyModalOpen]);

  const handleOpenPlanner = (dest = '', type = '') => {
    setPrefilledDestination(dest);
    setPrefilledTravelType(type);
    setPlannerOpen(true);
  };

  const handleSearchSubmit = (criteria: {
    destination: string;
    travelType: string;
    guests: string;
  }) => {
    setPrefilledDestination(criteria.destination);
    setPrefilledTravelType(criteria.travelType);
    setPlannerOpen(true);
  };

  const handlePackageSelect = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
  };

  const handleBookFromPackage = (pkg: TravelPackage) => {
    setSelectedPackage(null);
    handleOpenPlanner(pkg.title, 'Curated Itinerary');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-sans selection:bg-[#c59b67]/25 selection:text-[#081726]">
      {/* 1. Top Navigation Bar */}
      <Navbar
        onOpenPlanner={() => handleOpenPlanner()}
        onOpenContact={() => setContactOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Unforgettable Travel Moments by Voyare) */}
        <HeroSection
          onScrollToNext={() => {
            const target = document.getElementById('about') || document.getElementById('destinations');
            if (target) scrollTo(target, { offset: -80 });
          }}
        />

        {/* 3. About Section: Who We Are & Curated Photo Montage */}
        <AboutSection />

        {/* 4. Featured Packages: Popular Travel Packages */}
        <PackagesSection onSelectPackage={handlePackageSelect} />

        {/* 5. Curated Experiences & Services Banner: Your Dream Trip, Our Expertise */}
        <CuratedBannerSection onStartPlanning={() => handleOpenPlanner()} />

        {/* 6. Traveler Stories: What Our Travelers Say */}
        <TestimonialsSection />

        {/* 8. Travel Planning FAQs */}
        <div id="faqs">
          <FaqSection />
        </div>

        {/* 9. Our Partners: Trusted by Leading Travel Brands */}
        <PartnersSection />

        {/* 10. Key Metrics / Stats Strip */}
        <StatsSection />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenContact={() => setContactOpen(true)}
        onOpenPlanner={() => handleOpenPlanner()}
      />

      {/* Interactive Modals */}
      <PlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        initialDestination={prefilledDestination}
        initialTravelType={prefilledTravelType}
      />

      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookNow={handleBookFromPackage}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectPackage={handlePackageSelect}
      />
    </div>
  );
}
