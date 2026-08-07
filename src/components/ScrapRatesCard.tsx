import React, { useState } from "react";
import { BHOPAL_SCRAP_RATES } from "../data/scrapRates";
import { ScrapItemRate } from "../types";
import { Search, Calculator, CheckCircle, MessageCircle, FileText, Box, Zap, Shield, Trash2, Laptop, Wind, Bike, ArrowRight } from "lucide-react";

interface ScrapRatesCardProps {
  onSelectScrapItemForBooking: (item: ScrapItemRate) => void;
}

export const ScrapRatesCard: React.FC<ScrapRatesCardProps> = ({ onSelectScrapItemForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Calculator state
  const [calcItem, setCalcItem] = useState<ScrapItemRate>(BHOPAL_SCRAP_RATES[0]);
  const [calcQuantity, setCalcQuantity] = useState<number>(25);

  const categories = ["All", "Paper", "Metals", "Plastics", "E-Waste", "Appliances", "Vehicles"];

  const filteredRates = BHOPAL_SCRAP_RATES.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const calculatedTotal = calcQuantity * calcItem.rate;

  return (
    <section id="rates" className="py-16 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-teal-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Today's Live Scrap Rates in Bhopal (Per KG / Per Unit)
          </h2>
          <p className="text-slate-600 text-base">
            No bargaining, no hidden deductions. We provide certified digital electronic weighing at your doorstep and pay exact cash on the spot.
          </p>
        </div>

        {/* Quick Rate Calculator Widget */}
        <div className="bg-linear-to-r from-[#0F766E] to-teal-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-teal-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4" /> Quick Value Estimator
              </div>
              <h3 className="text-2xl font-bold">Estimate Your Earnings Before Booking</h3>
              <p className="text-teal-100 text-sm">
                Select scrap item and approximate quantity to calculate instant estimated cash payout.
              </p>
            </div>

            <div className="lg:col-span-7 bg-white text-slate-900 rounded-xl p-4 sm:p-5 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                
                {/* Item Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Scrap Item:</label>
                  <select
                    value={calcItem.id}
                    onChange={(e) => {
                      const found = BHOPAL_SCRAP_RATES.find((r) => r.id === e.target.value);
                      if (found) setCalcItem(found);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-semibold focus:outline-hidden focus:border-[#0F766E]"
                  >
                    {BHOPAL_SCRAP_RATES.map((rate) => (
                      <option key={rate.id} value={rate.id}>
                        {rate.name} (₹{rate.rate}/{rate.unit})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Approx Qty ({calcItem.unit}):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-bold focus:outline-hidden focus:border-[#0F766E]"
                  />
                </div>

                {/* Result Display & CTA */}
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Cash</div>
                  <div className="text-2xl font-black text-[#0F766E]">₹{calculatedTotal}</div>
                  <a
                    href={`https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20have%20approx%20${calcQuantity}%20${calcItem.unit}%20of%20${calcItem.name}%20(Est%20₹${calculatedTotal}).%20Please%20schedule%20doorstep%20pickup.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-1 w-full text-[11px] py-1.5 rounded-md flex items-center justify-center gap-1 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Book This Item
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#0F766E] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search scrap item e.g. Newspaper, AC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#0F766E] focus:bg-white"
            />
          </div>

        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRates.length > 0 ? (
            filteredRates.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        High Demand
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Today's Rate</div>
                    <div className="text-xl font-black text-[#0F766E]">
                      ₹{item.rate} <span className="text-xs font-normal text-slate-600">/{item.unit}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/918871600497?text=Hi%20Kabadiwala%20Bhopal,%20I%20have%20${encodeURIComponent(item.name)}%20scrap%20at%20₹${item.rate}/${item.unit}.%20Please%20schedule%20pickup.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-xs px-3 py-2 rounded-lg flex items-center gap-1 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Sell Now
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              <p className="text-base font-semibold">No scrap items found matching "{searchQuery}".</p>
              <p className="text-xs mt-1">
                Call us directly at <strong className="text-[#0F766E]">88716 00497</strong> for custom scrap quotes!
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
