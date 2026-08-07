import React, { useState } from "react";
import { BHOPAL_SERVICE_AREAS } from "../data/serviceAreas";
import { ServiceAreaInfo } from "../types";
import { MapPin, Clock, Users, ArrowRight, Phone, MessageCircle, CheckCircle2, Search } from "lucide-react";

interface ServiceAreasProps {
  onSelectAreaForPickup: (areaName: string) => void;
  onNavigateToArea?: (slug: string) => void;
}

export const ServiceAreas: React.FC<ServiceAreasProps> = ({ onSelectAreaForPickup, onNavigateToArea }) => {
  const [searchArea, setSearchArea] = useState("");

  const filteredAreas = BHOPAL_SERVICE_AREAS.filter((area) =>
    area.name.toLowerCase().includes(searchArea.toLowerCase()) ||
    area.popularLocations.some((loc) => loc.toLowerCase().includes(searchArea.toLowerCase()))
  );

  return (
    <section id="service-areas" className="py-16 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Local Bhopal Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Doorstep Kabadiwala Pickup Service Across Bhopal
          </h2>
          <p className="text-slate-600 text-base">
            We operate dedicated scrap pickup teams in every major residential & commercial sector of Bhopal with guaranteed fast arrival.
          </p>
        </div>

        {/* Search Bar for Bhopal Localities */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search your Bhopal locality e.g. MP Nagar, Arera Colony, Kolar..."
            value={searchArea}
            onChange={(e) => setSearchArea(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium shadow-xs focus:outline-hidden focus:border-[#0F766E]"
          />
        </div>

        {/* Area Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAreas.map((area: ServiceAreaInfo) => (
            <div
              key={area.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0F766E] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 bg-emerald-50 rounded-xl text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-teal-50 text-[#0F766E] border border-teal-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> ~{area.estimatedArrivalMinutes} Mins
                  </span>
                </div>

                {/* Area Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{area.description}</p>
                </div>

                {/* Popular Sector Badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Covered Colonies & Spots:</span>
                  <div className="flex flex-wrap gap-1">
                    {area.popularLocations.slice(0, 4).map((loc, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToArea && onNavigateToArea(area.slug)}
                  className="text-xs font-bold text-[#0F766E] hover:underline"
                >
                  View Area Page →
                </button>

                <button
                  onClick={() => onSelectAreaForPickup(area.name)}
                  className="btn-call text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
                >
                  Book Pickup <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* SEO Location Keywords Bar */}
        <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 text-xs leading-relaxed space-y-2 border border-slate-800">
          <p className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#22C55E]" /> Local Search Coverage in Bhopal:
          </p>
          <p className="text-slate-400">
            Kabadiwala MP Nagar Bhopal | Kabadiwala Arera Colony Bhopal | Kabadiwala Kolar Road Bhopal | Kabadiwala Habibganj Bhopal | Kabadiwala Shahpura Bhopal | Kabadiwala Bairagarh Bhopal | Kabadiwala Nariyalkheda Bhopal | Kabadiwala Sharda Nagar Bhopal | Kabadiwala Ayodhya Bypass Bhopal | Kabadiwala Indrapuri Bhopal | Kabadiwala Govindpura Bhopal | Kabadiwala New Market Bhopal.
          </p>
        </div>

      </div>
    </section>
  );
};
