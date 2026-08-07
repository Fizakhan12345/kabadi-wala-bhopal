import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 p-2.5 backdrop-blur-md shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Now Button */}
        <a
          href="tel:8871600497"
          className="btn-call py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20want%20to%20book%20a%20doorstep%20scrap%20pickup."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* Book Pickup Button */}
        <button
          onClick={onOpenBooking}
          className="btn-cta-orange py-2.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Pickup</span>
        </button>

      </div>
    </div>
  );
};
