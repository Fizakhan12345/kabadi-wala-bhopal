import React from "react";
import { CUSTOMER_TESTIMONIALS } from "../data/testimonialsAndFaq";
import { Star, ShieldCheck, CheckCircle2, Trees, Droplets, CloudOff, ExternalLink, MapPin } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            4.9★ Google Business Profile Rating
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Trusted by 12,000+ Households & Businesses in Bhopal
          </h2>
          <p className="text-slate-600 text-base">
            Read real feedback from residents in MP Nagar, Arera Colony, Kolar Road, and Shahpura.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-teal-500 transition-colors shadow-xs"
            >
              <div className="space-y-2">
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">"{t.comment}"</p>

              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <span className="text-[10px] bg-emerald-100 text-[#0F766E] font-extrabold px-1.5 py-0.5 rounded-xs flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" /> {t.locality}
                </div>
                <div className="text-[10px] text-slate-400">Items Sold: {t.scrapTypesSold}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Leave Us a Review on Google Maps</span>
            </h3>
            <p className="text-xs text-slate-400">
              Help us build a cleaner, greener Bhopal by sharing your scrap pickup experience!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://g.page/r/CU8DHpC824HGEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
            >
              Write Google Review <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://share.google/FR59yHwCmnz98OtTP"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              View Google Profile
            </a>
          </div>
        </div>

        {/* Environmental Impact Counter */}
        <div className="bg-linear-to-r from-[#0F766E] to-teal-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-extrabold text-emerald-300 uppercase tracking-widest">ECO RECYCLING IMPACT</span>
            <h3 className="text-2xl font-black">Together We've Saved in Bhopal:</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
              <Trees className="w-8 h-8 text-emerald-300 mx-auto" />
              <div className="text-3xl font-black text-white">12,450+</div>
              <div className="text-xs text-emerald-200 font-medium">Trees Preserved</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
              <CloudOff className="w-8 h-8 text-teal-300 mx-auto" />
              <div className="text-3xl font-black text-white">1,120 Tons</div>
              <div className="text-xs text-teal-200 font-medium">CO2 Emissions Avoided</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-1">
              <Droplets className="w-8 h-8 text-blue-300 mx-auto" />
              <div className="text-3xl font-black text-white">4.2 Million L</div>
              <div className="text-xs text-blue-200 font-medium">Water Saved</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
