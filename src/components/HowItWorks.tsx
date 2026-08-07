import React from "react";
import { Phone, Scale, Banknote, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Schedule Pickup",
      description: "Call 88716 00497, send a message on WhatsApp, or book via our online form with your Bhopal location and scrap details.",
      icon: Phone,
      badge: "Easy 1-Min Booking",
    },
    {
      number: "02",
      title: "Doorstep Digital Weighing",
      description: "Our verified executive arrives at your doorstep on time equipped with an ISO certified digital electronic weighing scale.",
      icon: Scale,
      badge: "100% Accurate Scale",
    },
    {
      number: "03",
      title: "Instant Cash Payment",
      description: "Get paid instantly via Cash or UPI (PhonePe / Google Pay / Paytm) on the spot before we load the scrap into our eco vehicle.",
      icon: Banknote,
      badge: "Instant Spot Payment",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Kabadiwala Bhopal Works
          </h2>
          <p className="text-slate-600 text-base">
            Selling your household or office scrap in Bhopal is now completely effortless and transparent.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative hover:border-[#0F766E] transition-all hover:shadow-md group"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-5 text-4xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors">
                  {step.number}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="inline-block bg-emerald-100 text-[#0F766E] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {step.badge}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>

                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Guarantee Bar */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#0F766E] shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-base">Verified & Safe Pickup Personnel</h4>
              <p className="text-xs text-slate-600">Background verified staff with ID cards & official Kabadiwala Bhopal uniforms.</p>
            </div>
          </div>

          <a
            href="tel:8871600497"
            className="btn-cta-orange px-6 py-2.5 rounded-xl text-sm font-bold shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" /> Call 88716 00497
          </a>
        </div>

      </div>
    </section>
  );
};
