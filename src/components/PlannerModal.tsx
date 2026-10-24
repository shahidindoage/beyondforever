import React, { useState } from 'react';
import { X, Check, Compass, Calendar, Users, Sparkles, Send } from 'lucide-react';

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialTravelType?: string;
}

export const PlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
  initialDestination = '',
  initialTravelType = '',
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [destination, setDestination] = useState(initialDestination);
  const [travelType, setTravelType] = useState(initialTravelType);
  const [travelers, setTravelers] = useState('2 Travelers');
  const [season, setSeason] = useState('Spring / Summer 2025');
  const [budget, setBudget] = useState('$5,000 - $10,000 / person');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#081726] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-0.5">
              BESPOKE JOURNEY CURATION
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
              Plan Your Extraordinary Journey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div data-lenis-prevent className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#c59b67]/15 text-[#c59b67] flex items-center justify-center mx-auto mb-2">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="font-serif text-2xl text-stone-900 font-normal">
                Your Bespoke Journey Request Has Been Received
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-stone-900">{fullName || 'Traveler'}</span>. Our senior travel curator will review your preferences and prepare a tailored itinerary proposal within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#081726] hover:bg-[#0c2238] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <p className="text-xs text-stone-500 font-light">
                    Step 1 of 2: Tell us your desired destinations and preferred style of travel.
                  </p>

                  {/* Destination */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-900 mb-2">
                      Where would you like to travel?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Central Asia: The Five Stans',
                        'The Silk Road Adventure',
                        'Dublin & Edinburgh',
                        'Maldives Escape',
                      ].map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => setDestination(dest)}
                          className={`px-3 py-2 text-xs rounded-lg border text-left transition-all ${
                            destination === dest
                              ? 'border-[#c59b67] bg-[#c59b67]/10 text-stone-900 font-medium'
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Type */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-900 mb-2">
                      Travel Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Luxury Honeymoon',
                        'Relaxation & Spa',
                        'Cultural Immersion',
                        'Private Yacht & Island',
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setTravelType(type)}
                          className={`px-3 py-2 text-xs rounded-lg border text-center transition-all ${
                            travelType === type
                              ? 'border-[#c59b67] bg-[#c59b67]/10 text-stone-900 font-medium'
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Party size & Season */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-900 mb-1.5">
                        Number of Travelers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#c59b67]"
                      >
                        <option>Solo Traveler</option>
                        <option>2 Travelers (Couple)</option>
                        <option>Small Group (3-5 Travelers)</option>
                        <option>Family / Large Group (6+ Travelers)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-900 mb-1.5">
                        Estimated Travel Period
                      </label>
                      <select
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#c59b67]"
                      >
                        <option>Spring (April - May 2025)</option>
                        <option>Summer (June - August 2025)</option>
                        <option>Autumn (September - November 2025)</option>
                        <option>Winter / Festive Season 2025</option>
                        <option>Flexible / To Be Decided</option>
                      </select>
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-[#081726] hover:bg-[#0c2238] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-all"
                    >
                      Continue to Details →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-stone-500 font-light">
                    Step 2 of 2: Contact coordinates for your private travel concierge.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-900 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-900 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. eleanor@example.com"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-900 mb-1">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-900 mb-1">
                        Special Requests or Dream Bucket-List Items
                      </label>
                      <textarea
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Private helicopter transfers, dietary preferences, milestone celebration details..."
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#c59b67]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-stone-500 hover:text-stone-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#c59b67] hover:bg-[#b68b55] text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Bespoke Proposal</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
