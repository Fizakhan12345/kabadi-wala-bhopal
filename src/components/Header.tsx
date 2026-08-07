import React, { useState } from "react";
import { Phone, MessageCircle, MapPin, Calendar, Clock, Menu, X, Recycle, Award, CheckCircle2, Shield } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenCallModal, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Announcement Bar */}
      <div className="bg-[#0F766E] text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#22C55E] text-slate-900 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> LIVE IN BHOPAL
            </span>
            <span>Free Doorstep Pickup & Certified Digital Scale Across Bhopal</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200 text-xs">
            <a href="tel:8871600497" className="hover:text-white flex items-center gap-1 font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#F97316]" /> 88716 00497
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#22C55E]" /> Sharda Nagar, Nariyalkheda, Bhopal
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-all shadow-xs">
            <Recycle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Kabadiwala<span className="text-[#0F766E]">Bhopal</span>
              </span>
            </div>
            <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase -mt-0.5">
              Doorstep Scrap Pickup Service
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <a href="#rates" className="hover:text-[#0F766E] transition-colors">
            Scrap Rates
          </a>
          <a href="#ai-estimator" className="hover:text-[#0F766E] transition-colors flex items-center gap-1">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-xs">AI</span>
            Scrap Estimator
          </a>
          <a href="#booking" className="hover:text-[#0F766E] transition-colors">
            Book Pickup
          </a>
          <a href="#service-areas" className="hover:text-[#0F766E] transition-colors">
            Service Areas
          </a>
          <a href="#commercial" className="hover:text-[#0F766E] transition-colors">
            Commercial
          </a>
          <a href="#faq" className="hover:text-[#0F766E] transition-colors">
            FAQs
          </a>
        </nav>

        {/* Desktop Header CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
            title="Admin Lead Management Panel"
          >
            <Shield className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Admin</span>
          </button>

          <a
            href="tel:8871600497"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-50 border border-teal-200 text-[#0F766E] hover:bg-teal-100 font-bold text-sm transition-colors"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>88716 00497</span>
          </a>

          <a
            href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20want%20to%20book%20a%20doorstep%20scrap%20pickup."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="btn-cta-orange px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Pickup</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3">
          <a
            href="#rates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Live Scrap Rates in Bhopal
          </a>
          <a
            href="#ai-estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            AI Scrap Estimator & Scanner
          </a>
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Book Doorstep Pickup
          </a>
          <a
            href="#service-areas"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Bhopal Localities & Areas
          </a>
          <a
            href="#commercial"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Commercial & Bulk Scrap
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F766E]"
          >
            Frequently Asked Questions
          </a>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <a
              href="tel:8871600497"
              className="btn-call text-center py-2.5 rounded-lg text-sm flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20want%20to%20book%20a%20doorstep%20scrap%20pickup."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-center py-2.5 rounded-lg text-sm flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
