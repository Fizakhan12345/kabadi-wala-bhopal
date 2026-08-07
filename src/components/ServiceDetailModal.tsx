import React from "react";
import { SERVICES_DATA, ServiceDetail } from "../data/servicesData";
import { Recycle, CheckCircle2, Phone, MessageCircle, X, ShieldCheck, ArrowRight, HelpCircle, Building2, Tag } from "lucide-react";

interface ServiceDetailModalProps {
  serviceId: string | null;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  serviceId,
  onClose,
  onBookService,
}) => {
  if (!serviceId) return null;

  const service: ServiceDetail | undefined = SERVICES_DATA.find(
    (s) => s.id === serviceId || s.slug === serviceId
  ) || SERVICES_DATA[0];

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

        {/* Service Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" /> Bhopal Category Rate: {service.currentRateRange}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {service.heroTitle}
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            {service.fullDesc}
          </p>
        </div>

        {/* Items Accepted List */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> Accepted Scrap Materials:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {service.acceptedItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-800 font-semibold bg-white p-2 rounded-lg border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Pickup Process */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Doorstep Pickup Process:</h3>
          <div className="space-y-2 text-xs">
            {service.pickupProcess.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="font-bold text-[#0F766E] bg-emerald-200 px-2 py-0.5 rounded-md text-[10px]">{idx + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service FAQs */}
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#0F766E]" /> Frequently Asked Questions:
          </h3>
          <div className="space-y-2 text-xs">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Q: {faq.question}</p>
                <p className="text-slate-600">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onBookService(service.title);
              onClose();
            }}
            className="btn-cta-orange w-full sm:w-auto flex-1 py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <span>Book {service.title} Pickup</span>
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
