import React, { useState } from "react";
import { FREQUENTLY_ASKED_QUESTIONS } from "../data/testimonialsAndFaq";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>("f1");

  return (
    <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-slate-600 text-base">
            Everything you need to know about doorstep scrap collection, rates, and weighing in Bhopal.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FREQUENTLY_ASKED_QUESTIONS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-[#0F766E] focus:outline-hidden"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#0F766E] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0F766E]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900">Have More Questions About Scrap Rates or Pickup in Bhopal?</h3>
          <p className="text-xs text-slate-500">
            Our team is available 7 days a week from 08:00 AM to 08:00 PM.
          </p>
          <div className="flex justify-center items-center gap-3 pt-1">
            <a
              href="tel:8871600497"
              className="btn-call text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" /> Call 88716 00497
            </a>

            <a
              href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20have%20a%20question%20about%20scrap%20pickup."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
