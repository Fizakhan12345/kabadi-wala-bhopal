import React from "react";
import { Phone, Mail, MapPin, Recycle, ExternalLink, Facebook, Instagram, Linkedin, Star } from "lucide-react";
import { BHOPAL_SERVICE_AREAS } from "../data/serviceAreas";

interface FooterProps {
  onNavigateToArea?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToArea }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold">
                <Recycle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Kabadiwala<span className="text-[#22C55E]">Bhopal</span>
                </span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Doorstep Scrap Pickup Service</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Kabadiwala Bhopal is Bhopal's premier AI-enabled doorstep scrap collection and recycling platform. We collect newspapers, metals, plastic, appliances, and e-waste with certified digital weighing machines.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/kabadiwalabhopal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0F766E] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/kabadiwala_bhopal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0F766E] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/kabadiwalabhopal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0F766E] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://share.google/FR59yHwCmnz98OtTP"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Business Profile"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Contact Details Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Details</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span>Sharda Nagar, Rajeev Nagar, Nariyalkheda, Bhopal, Madhya Pradesh 462100</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F97316] shrink-0" />
                <a href="tel:8871600497" className="font-bold text-white hover:underline">
                  +91 88716 00497
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:kabadiwalabhopal26@gmail.com" className="hover:underline">
                  kabadiwalabhopal26@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* All 33 Bhopal Localities SEO Grid */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">All 33 Bhopal Localities Covered</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-slate-400 max-h-56 overflow-y-auto pr-2">
              {BHOPAL_SERVICE_AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => onNavigateToArea && onNavigateToArea(area.slug)}
                  className="text-left hover:text-emerald-400 transition-colors truncate"
                  title={`Kabadiwala ${area.name} Bhopal`}
                >
                  Kabadiwala {area.name}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="https://g.page/r/CU8DHpC824HGEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold"
              >
                Rate Us on Google Reviews <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} Kabadiwala Bhopal. All Rights Reserved.</p>
          <p className="text-[11px] text-slate-600">
            Doorstep Scrap Pickup Service | Scrap Dealer Bhopal | Kabadi Near Me Bhopal | Scrap Recycling Bhopal
          </p>
        </div>

      </div>
    </footer>
  );
};
