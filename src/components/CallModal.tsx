import React from "react";
import { Phone, MessageCircle, X, MapPin, Clock, ShieldCheck } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative border border-slate-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-1">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0F766E] flex items-center justify-center mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Contact Kabadiwala Bhopal</h3>
          <p className="text-xs text-slate-500">
            Guaranteed 15–30 Minute Pickup Executive Call Back in Bhopal
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="tel:8871600497"
            className="btn-call w-full py-3.5 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 shadow-md"
          >
            <Phone className="w-5 h-5" /> Call: 88716 00497
          </a>

          <a
            href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20want%20to%20book%20a%20doorstep%20scrap%20pickup."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full py-3.5 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp: 88716 00497
          </a>
        </div>

        <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Sharda Nagar, Nariyalkheda, Bhopal 462100
          </p>
          <p className="flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> Operating 7 Days: 08:00 AM - 08:00 PM
          </p>
        </div>

      </div>
    </div>
  );
};
