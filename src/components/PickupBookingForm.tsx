import React, { useState, useEffect } from "react";
import { BHOPAL_SERVICE_AREAS } from "../data/serviceAreas";
import {
  FileText,
  Package,
  Wrench,
  Zap,
  Sparkles,
  Recycle,
  Snowflake,
  Monitor,
  BatteryCharging,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Home,
  Scale,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles as SparkleIcon,
} from "lucide-react";

interface PickupBookingFormProps {
  initialArea?: string;
  onSuccessBooking?: (bookingData: any) => void;
}

const SCRAP_ITEMS = [
  { id: "newspaper", name: "Newspaper & Books", icon: FileText, subtext: "Akhbar, Books & Raddi" },
  { id: "cardboard", name: "Cardboard", icon: Package, subtext: "Boxes & Packaging" },
  { id: "iron", name: "Iron Scrap", icon: Wrench, subtext: "Loha, Steel & Metal" },
  { id: "copper", name: "Copper & Wires", icon: Zap, subtext: "Tamba, Cables & Motors" },
  { id: "aluminium", name: "Aluminium", icon: Sparkles, subtext: "Utensils & Frames" },
  { id: "plastic", name: "Plastic", icon: Recycle, subtext: "Drums, Buckets & Bottles" },
  { id: "appliance", name: "AC / Refrigerator", icon: Snowflake, subtext: "AC, Refrigerator, Washer" },
  { id: "ewaste", name: "E-Waste", icon: Monitor, subtext: "Laptops, CPU & Electronics" },
  { id: "battery", name: "Battery", icon: BatteryCharging, subtext: "Inverter & Car Battery" },
];

const WEIGHT_OPTIONS = [
  "Under 20 kg (Small Household Lot)",
  "20 - 50 kg (Standard Household Scrap)",
  "50 - 100 kg (Medium Scrap Lot)",
  "100+ kg (Commercial / Bulk Scrap)",
];

const DATE_OPTIONS = ["Today", "Tomorrow", "Weekend"];

const TIME_OPTIONS = [
  "Morning (09:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 03:00 PM)",
  "Evening (03:00 PM - 07:00 PM)",
];

export const PickupBookingForm: React.FC<PickupBookingFormProps> = ({ initialArea, onSuccessBooking }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    area: initialArea || BHOPAL_SERVICE_AREAS[0].name,
    scrapTypes: ["Newspaper & Books", "Cardboard"],
    estimatedWeight: "20 - 50 kg (Standard Household Scrap)",
    preferredDate: "Today",
    preferredTime: "Morning (09:00 AM - 12:00 PM)",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync initial area if provided externally
  useEffect(() => {
    if (initialArea) {
      setFormData((prev) => ({ ...prev, area: initialArea }));
    }
  }, [initialArea]);

  const handleScrapToggle = (itemName: string) => {
    setErrorMsg(null);
    if (formData.scrapTypes.includes(itemName)) {
      setFormData({
        ...formData,
        scrapTypes: formData.scrapTypes.filter((item) => item !== itemName),
      });
    } else {
      setFormData({
        ...formData,
        scrapTypes: [...formData.scrapTypes, itemName],
      });
    }
  };

  const handleNextStep = (targetStep: number) => {
    setErrorMsg(null);
    if (currentStep === 1 && formData.scrapTypes.length === 0) {
      setErrorMsg("Please select at least one scrap item to continue.");
      return;
    }
    setCurrentStep(targetStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile phone number.");
      return;
    }
    if (formData.scrapTypes.length === 0) {
      setErrorMsg("Please select at least one scrap item.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success && data.booking) {
        setSubmittedBooking(data);
        if (onSuccessBooking) {
          onSuccessBooking(data);
        }
      } else {
        setErrorMsg(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      // Fallback local format if network fails
      const fallbackBooking = {
        booking: {
          id: `KB-${Math.floor(1000 + Math.random() * 9000)}`,
          ...formData,
        },
        whatsappUrl: `https://wa.me/918871600497?text=${encodeURIComponent(
          `*NEW SCRAP PICKUP REQUEST*\nName: ${formData.name}\nPhone: ${formData.phone}\nArea: ${formData.area}\nAddress: ${formData.address}\nScrap: ${formData.scrapTypes.join(", ")}\nWeight: ${formData.estimatedWeight}\nDay: ${formData.preferredDate} (${formData.preferredTime})`
        )}`,
      };
      setSubmittedBooking(fallbackBooking);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-16 bg-slate-900 text-[#1F2937] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accent Spheres */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            Fast 30-Second Booking
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Book Doorstep Scrap Pickup
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Quick, hassle-free & instant payment at your doorstep in Bhopal
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-[24px] p-5 sm:p-10 shadow-2xl shadow-slate-950/50 border border-slate-100">
          
          {submittedBooking ? (
            /* Success State Confirmation */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-[#0F766E] border border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0F766E] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  BOOKING CONFIRMED — {submittedBooking.booking.id}
                </span>
                <h3 className="text-2xl font-black text-[#1F2937]">Thank You, {submittedBooking.booking.name}!</h3>
                <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                  Your doorstep scrap pickup request for <strong className="text-slate-900">{submittedBooking.booking.area}</strong> has been received. Our executive will call you shortly on <strong className="text-slate-900">{submittedBooking.booking.phone}</strong>.
                </p>
              </div>

              {/* Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">Selected Scrap:</span>
                  <span className="font-bold text-slate-900">{submittedBooking.booking.scrapTypes.join(", ")}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">Scheduled:</span>
                  <span className="font-bold text-slate-900">{submittedBooking.booking.preferredDate} ({submittedBooking.booking.preferredTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Estimated Weight:</span>
                  <span className="font-bold text-slate-900">{submittedBooking.booking.estimatedWeight}</span>
                </div>
              </div>

              {/* Instant WhatsApp Redirection CTA */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
                <a
                  href={submittedBooking.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-center font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedBooking(null);
                    setCurrentStep(1);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#0F766E] transition-colors underline"
                >
                  Book Another Pickup
                </button>
              </div>

            </div>
          ) : (
            /* Multi-Step Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP PROGRESS INDICATOR */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#0F766E] text-white text-xs font-extrabold px-2.5 py-1 rounded-md">
                      Step {currentStep} of 4
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {currentStep === 1 && "Select Scrap Items"}
                      {currentStep === 2 && "Pickup Details"}
                      {currentStep === 3 && "Pickup Schedule"}
                      {currentStep === 4 && "Customer Contact Details"}
                    </span>
                  </div>

                  {/* Selected Items Badge Counter */}
                  {formData.scrapTypes.length > 0 && (
                    <span className="text-xs font-semibold text-[#0F766E] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full hidden sm:inline-block">
                      {formData.scrapTypes.length} {formData.scrapTypes.length === 1 ? "Item" : "Items"} Selected
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0F766E] h-full transition-all duration-300 ease-out"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>

                {/* Step Indicator Navigation Tabs */}
                <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center pt-1">
                  {[
                    { step: 1, label: "1. Items" },
                    { step: 2, label: "2. Details" },
                    { step: 3, label: "3. Schedule" },
                    { step: 4, label: "4. Contact" },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.step}
                      onClick={() => handleNextStep(s.step)}
                      className={`py-1.5 px-1 text-[11px] sm:text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        currentStep === s.step
                          ? "bg-[#0F766E] text-white"
                          : currentStep > s.step
                          ? "bg-emerald-50 text-[#0F766E] hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 1: SELECT SCRAP ITEMS */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      What type of scrap do you want to sell?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Tap any items you want us to pick up. Select multiple items if needed.
                    </p>
                  </div>

                  {/* Clean Selectable Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
                    {SCRAP_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const selected = formData.scrapTypes.includes(item.name);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => handleScrapToggle(item.name)}
                          className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-150 flex flex-col justify-between gap-3 cursor-pointer ${
                            selected
                              ? "bg-teal-50/80 border-2 border-[#0F766E] shadow-xs"
                              : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs"
                          }`}
                        >
                          {/* Top row: Icon & Selected Checkbox Badge */}
                          <div className="flex items-center justify-between w-full">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                                selected ? "bg-[#0F766E] text-white" : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                selected
                                  ? "bg-[#22C55E] text-white"
                                  : "border border-slate-300 bg-slate-50 text-transparent"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>

                          {/* Item Name & Subtext */}
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#1F2937] leading-snug">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5 truncate">
                              {item.subtext}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Items Summary Line */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-slate-600 font-medium truncate">
                      <strong className="text-slate-900 font-bold">Selected Items ({formData.scrapTypes.length}):</strong>{" "}
                      {formData.scrapTypes.length > 0 ? formData.scrapTypes.join(", ") : "None selected yet"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleNextStep(2)}
                      className="px-4 py-2 bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    >
                      <span>Continue to Pickup Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PICKUP DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      Pickup Weight & Bhopal Area
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Helps us assign the right vehicle and digital scale team.
                    </p>
                  </div>

                  {/* Two Column Layout on Desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Left: Estimated Weight Dropdown */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-[#0F766E]" />
                        Estimated Scrap Weight *
                      </label>
                      <select
                        value={formData.estimatedWeight}
                        onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-semibold text-[#1F2937] focus:outline-hidden focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                      >
                        {WEIGHT_OPTIONS.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Right: Select Bhopal Area */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#0F766E]" />
                        Select Area / Locality in Bhopal *
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-semibold text-[#1F2937] focus:outline-hidden focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                      >
                        {BHOPAL_SERVICE_AREAS.map((area) => (
                          <option key={area.id} value={area.name}>
                            📍 {area.name} (Bhopal)
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Items</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNextStep(3)}
                      className="px-5 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Continue to Schedule</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PICKUP SCHEDULE */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      When should we arrive?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose your preferred day and time window for free doorstep collection.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Pickup Day Segmented Buttons */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#0F766E]" />
                        Select Pickup Day *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {DATE_OPTIONS.map((day) => {
                          const isSelected = formData.preferredDate === day;
                          return (
                            <button
                              type="button"
                              key={day}
                              onClick={() => setFormData({ ...formData, preferredDate: day })}
                              className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-900/20"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Large Dropdown */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#0F766E]" />
                        Select Time Slot *
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-semibold text-[#1F2937] focus:outline-hidden focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                      >
                        {TIME_OPTIONS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNextStep(4)}
                      className="px-5 py-2.5 bg-[#0F766E] hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Continue to Contact</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CUSTOMER DETAILS */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      Where should our executive reach?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Enter your contact details to confirm the doorstep visit.
                    </p>
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#0F766E]" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-medium text-[#1F2937] placeholder-slate-400 focus:outline-hidden focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-[#0F766E]" />
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-medium text-[#1F2937] placeholder-slate-400 focus:outline-hidden focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                      />
                    </div>

                  </div>

                  {/* Complete Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-[#0F766E]" />
                      Complete House / Flat / Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House No 42, Block E, Near Sai Temple, MP Nagar"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-medium text-[#1F2937] placeholder-slate-400 focus:outline-hidden focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>

                  {/* Back button for Step 4 */}
                  <div className="flex items-center justify-start pt-1">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Schedule</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-semibold">{errorMsg}</span>
                </div>
              )}

              {/* TRUST ROW & FINAL CTA (Always visible on Step 4 or bottom) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                
                {/* Trust Elements Row */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-[#0F766E]">
                  <span className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    Free Doorstep Pickup
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    Best Scrap Rates
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    Quick Response
                  </span>
                </div>

                {/* Final Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[52px] rounded-[12px] bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D97706] text-white font-bold text-base shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Registering Scrap Pickup Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 text-white" />
                      <span>Confirm Scrap Pickup</span>
                    </>
                  )}
                </button>

              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
