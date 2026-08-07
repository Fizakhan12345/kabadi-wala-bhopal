import React from "react";
import { Building2, Laptop, Factory, ShieldCheck, FileCheck, Phone, MessageCircle, ArrowRight } from "lucide-react";

export const CommercialScrap: React.FC = () => {
  const commercialServices = [
    {
      title: "Corporate & Office Dismantling",
      desc: "Complete office clearing, workstation dismantling, IT hardware, air conditioners, aluminum partitions & old furniture disposal in MP Nagar & Bhopal commercial hubs.",
      icon: Building2,
    },
    {
      title: "E-Waste Recycling & Destruction Certificate",
      desc: "Environmentally certified disposal of old computers, laptops, servers, UPS batteries, motherboards, and printers with official Form 2 recycling certificates.",
      icon: Laptop,
    },
    {
      title: "Factory, Industrial & Heavy Metal Scrap",
      desc: "Heavy industrial steel scrap, copper cabling, brass fittings, machinery scrap, and demolition waste collection across Govindpura, Mandideep & Bhopal.",
      icon: Factory,
    },
    {
      title: "Housing Societies & Apartment Bulk Drives",
      desc: "Organized weekend bulk scrap drives for residential societies in Arera Colony, Kolar Road, Shahpura & Ayodhya Bypass with special bulk pricing.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="commercial" className="py-16 bg-slate-900 text-white border-t border-slate-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-[#0F766E] text-emerald-300 border border-teal-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            B2B & Enterprise Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Commercial & Bulk Scrap Solutions in Bhopal
          </h2>
          <p className="text-slate-300 text-base">
            Dedicated team, GST invoices, formal quotations, e-waste destruction certificates, and heavy machinery scrap handling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commercialServices.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-emerald-400 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-emerald-400 border border-teal-500/30 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{srv.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bulk Quotation Banner */}
        <div className="bg-linear-to-r from-[#0F766E] to-emerald-700 text-white rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="bg-amber-300 text-slate-900 text-[11px] font-black px-2.5 py-0.5 rounded-xs uppercase">
              INSTANT B2B QUOTATION
            </span>
            <h3 className="text-2xl font-black">Need Bulk Scrap Clearing or Official Quotation?</h3>
            <p className="text-teal-100 text-sm max-w-xl">
              Connect with our Commercial Head for site visits, GST invoicing, and custom tonnage contracts in Bhopal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:8871600497"
              className="btn-call bg-white text-[#0F766E] hover:bg-slate-100 font-bold px-5 py-3 rounded-xl text-sm shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> 88716 00497
            </a>

            <a
              href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20need%20a%20commercial/bulk%20scrap%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Bulk Deal</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
