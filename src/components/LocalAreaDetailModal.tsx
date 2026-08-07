import React from "react";
import { BHOPAL_SERVICE_AREAS } from "../data/serviceAreas";
import { ServiceAreaInfo } from "../types";
import { MapPin, Clock, CheckCircle2, Phone, MessageCircle, X, ShieldCheck, ArrowRight, HelpCircle, Navigation } from "lucide-react";

interface LocalAreaDetailModalProps {
  areaName: string | null;
  onClose: () => void;
  onBookPickup: (areaName: string) => void;
}

export const LocalAreaDetailModal: React.FC<LocalAreaDetailModalProps> = ({
  areaName,
  onClose,
  onBookPickup,
}) => {
  if (!areaName) return null;

  const area: ServiceAreaInfo | undefined = BHOPAL_SERVICE_AREAS.find(
    (a) => a.name.toLowerCase() === areaName.toLowerCase() || a.name.includes(areaName)
  ) || BHOPAL_SERVICE_AREAS[0];

  const otherNearbyAreas = BHOPAL_SERVICE_AREAS.filter((a) => a.id !== area.id).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Local Area Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" /> Bhopal Local Service Hub
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Doorstep Kabadiwala Scrap Pickup in {area.name}
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            {area.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="bg-teal-50 text-[#0F766E] border border-teal-200 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" /> Executive Arrival: ~{area.estimatedArrivalMinutes} Mins
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> {area.activeExecutives} Teams On Field
            </span>
          </div>
        </div>

        {/* Covered Colonies & Local Landmarks */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-[#0F766E]" /> Covered Colonies & Major Spots in {area.name}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {area.popularLocations.map((loc, idx) => (
              <span
                key={idx}
                className="bg-white border border-slate-300 text-slate-800 text-xs font-semibold px-3 py-1 rounded-lg shadow-2xs"
              >
                📍 {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Doorstep Process in Area */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">How Doorstep Pickup Works in {area.name}:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 space-y-1">
              <div className="font-extrabold text-[#0F766E]">1. Book or Call</div>
              <p className="text-slate-600">Provide address in {area.name} & preferred pickup time.</p>
            </div>
            <div className="bg-teal-50/60 p-3.5 rounded-xl border border-teal-200 space-y-1">
              <div className="font-extrabold text-teal-800">2. Executive Arrival</div>
              <p className="text-slate-600">Executive arrives with digital scale (~{area.estimatedArrivalMinutes} mins).</p>
            </div>
            <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 space-y-1">
              <div className="font-extrabold text-amber-900">3. Spot Payment</div>
              <p className="text-slate-600">Get paid cash or UPI before loading vehicle.</p>
            </div>
          </div>
        </div>

        {/* Local Area FAQs */}
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#0F766E]" /> Local FAQ for {area.name}:
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <p className="font-bold text-slate-900">Q: Is doorstep pickup available in all blocks/sectors of {area.name}?</p>
            <p className="text-slate-600">Yes, our pickup team covers every residential apartment, colony, and commercial office in {area.name} 7 days a week.</p>
          </div>
        </div>

        {/* Nearby Service Hubs */}
        <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Nearby Bhopal Service Hubs:</span>
          <div className="flex flex-wrap gap-2">
            {otherNearbyAreas.map((nearA) => (
              <button
                key={nearA.id}
                onClick={() => onBookPickup(nearA.name)}
                className="text-[11px] font-semibold text-[#0F766E] hover:underline bg-emerald-50 px-2.5 py-1 rounded-md"
              >
                Kabadiwala {nearA.name}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onBookPickup(area.name);
              onClose();
            }}
            className="btn-cta-orange w-full sm:w-auto flex-1 py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <span>Book Pickup in {area.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="tel:8871600497"
            className="btn-call w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <Phone className="w-4 h-4" /> Call 88716 00497
          </a>
        </div>

      </div>
    </div>
  );
};
