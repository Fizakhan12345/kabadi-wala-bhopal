import React, { useState } from "react";
import { Phone, MessageCircle, Calendar, ShieldCheck, Scale, Banknote, Sparkles, MapPin, ArrowRight, Star, Clock } from "lucide-react";
import { BHOPAL_SERVICE_AREAS } from "../data/serviceAreas";

interface HeroProps {
  onOpenBooking: () => void;
  onSelectArea: (areaName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSelectArea }) => {
  const [selectedLocality, setSelectedLocality] = useState(BHOPAL_SERVICE_AREAS[0].name);

  const activeAreaInfo = BHOPAL_SERVICE_AREAS.find((a) => a.name === selectedLocality) || BHOPAL_SERVICE_AREAS[0];

  return (
    <section className="relative bg-linear-to-b from-teal-900 via-[#0F766E] to-slate-900 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#22C55E_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Local Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.9★ Top Rated Doorstep Scrap Pickup Service in Bhopal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Best <span className="text-emerald-400">Kabadiwala Service</span> in Bhopal — Instant Cash at Your Doorstep
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Sell newspapers, cardboard, copper, iron, old appliances, and e-waste at the highest live market rates.
              We weigh with <strong className="text-white font-semibold underline decoration-emerald-400 decoration-2">100% accurate digital scales</strong> and pay instantly via Cash or UPI.
            </p>

            {/* Primary High-Conversion CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
              
              {/* Primary CTA: Call Now */}
              <a
                href="tel:8871600497"
                className="btn-call bg-[#F97316] hover:bg-orange-600 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 fill-current animate-bounce" />
                <span>Call Now: 88716 00497</span>
              </a>

              {/* Secondary CTA: WhatsApp Pickup */}
              <a
                href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20want%20to%20book%20a%20doorstep%20scrap%20pickup."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Pickup</span>
              </a>

              {/* Third CTA: Online Form */}
              <button
                onClick={onOpenBooking}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-600 text-slate-100 font-semibold text-base px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>Book Online</span>
              </button>
            </div>

            {/* Quick Locality Arrival Check Bar */}
            <div className="pt-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 text-left max-w-2xl mx-auto lg:mx-0 backdrop-blur-xs">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Check Pickup Arrival Time in Your Bhopal Neighborhood:
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <select
                  value={selectedLocality}
                  onChange={(e) => {
                    setSelectedLocality(e.target.value);
                    onSelectArea(e.target.value);
                  }}
                  className="bg-slate-900 border border-slate-600 text-white font-medium text-sm rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-emerald-400 grow"
                >
                  {BHOPAL_SERVICE_AREAS.map((area) => (
                    <option key={area.id} value={area.name}>
                      📍 {area.name} (Bhopal)
                    </option>
                  ))}
                </select>

                <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Est. Pickup: {activeAreaInfo.estimatedArrivalMinutes} Mins</span>
                </div>
              </div>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Digital Scale</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Cash / UPI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Eco Recycling</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Quote / Today's Live Rates Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="inline-block bg-emerald-100 text-[#0F766E] text-[11px] font-extrabold px-2 py-0.5 rounded-xs uppercase tracking-wider mb-1">
                    LIVE SCRAP RATES
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Today's Rates in Bhopal</h3>
                </div>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              {/* Sample Rates Preview List */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-slate-800">Newspaper (Aakhbar)</span>
                  </div>
                  <span className="font-black text-[#0F766E]">₹16 / kg</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-slate-800">Cardboard (Gatta)</span>
                  </div>
                  <span className="font-black text-[#0F766E]">₹12 / kg</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-semibold text-slate-800">Copper (Tamba)</span>
                  </div>
                  <span className="font-black text-[#0F766E]">₹460 / kg</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                    <span className="font-semibold text-slate-800">Iron / Steel (Loha)</span>
                  </div>
                  <span className="font-black text-[#0F766E]">₹32 / kg</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="font-semibold text-slate-800">Split AC (1.5 Ton)</span>
                  </div>
                  <span className="font-black text-[#0F766E]">₹2,200 / unit</span>
                </div>
              </div>

              {/* Direct Link to Full Rate List & Estimator */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href="#rates"
                  className="text-center font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  View All Rates <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenBooking}
                  className="btn-cta-orange text-center font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs flex items-center justify-center gap-1"
                >
                  Book Instant Pickup
                </button>
              </div>

              {/* Office Address & Phone Info */}
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>📍 Sharda Nagar, Nariyalkheda, Bhopal</span>
                <span className="font-semibold text-[#0F766E]">📱 88716 00497</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
