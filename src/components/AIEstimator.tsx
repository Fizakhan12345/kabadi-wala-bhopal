import React, { useState } from "react";
import { Sparkles, Camera, Upload, CheckCircle2, AlertCircle, Loader2, MessageCircle, RefreshCw, Calculator, ArrowRight } from "lucide-react";
import { BHOPAL_SCRAP_RATES } from "../data/scrapRates";

interface AIEstimatorProps {
  onOpenBookingWithEstimate?: (estimateData: any) => void;
}

export const AIEstimator: React.FC<AIEstimatorProps> = ({ onOpenBookingWithEstimate }) => {
  const [activeTab, setActiveTab] = useState<"photo" | "selector">("photo");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manual selector state
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({
    p1: 20, // Newspaper
    p2: 15, // Cardboard
    m4: 10, // Iron
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage("Image size is too large (max 8MB). Please choose a smaller photo.");
        return;
      }
      setErrorMessage(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        analyzePhotoWithAI(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhotoWithAI = async (base64Data: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/estimate-scrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Data, area: "Bhopal" }),
      });
      const data = await res.json();
      if (data.success && data.estimate) {
        setEstimateResult(data.estimate);
      } else {
        setErrorMessage("Could not analyze image. Try selecting scrap items manually.");
      }
    } catch (err) {
      console.error("AI estimation error:", err);
      setErrorMessage("Network error during AI scan. Please use the manual selector below.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate manual selector totals
  const manualDetectedItems = Object.entries(selectedItems)
    .filter(([_, qty]: [string, number]) => qty > 0)
    .map(([itemId, qty]: [string, number]) => {
      const rateObj = BHOPAL_SCRAP_RATES.find((r) => r.id === itemId);
      if (!rateObj) return null;
      return {
        name: rateObj.name,
        category: rateObj.category,
        estimatedWeightKg: qty,
        ratePerKgOrUnit: rateObj.rate,
        estimatedTotalInr: qty * rateObj.rate,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const manualTotalInr = manualDetectedItems.reduce((acc, item: any) => acc + item.estimatedTotalInr, 0);
  const manualTotalWeight = manualDetectedItems.reduce((acc, item: any) => acc + item.estimatedWeightKg, 0);

  const activeEstimate = activeTab === "photo" && estimateResult ? estimateResult : {
    detectedItems: manualDetectedItems,
    overallEstimatedWeightKg: manualTotalWeight,
    overallEstimatedValueInr: manualTotalInr,
    confidence: "High",
    ecoImpact: {
      co2SavedKg: Math.round(manualTotalWeight * 1.5),
      treesSaved: Math.round((manualTotalWeight / 20) * 10) / 10,
    },
    recommendation: "Instant free doorstep pickup available across Bhopal!",
  };

  const formattedWaMessage = encodeURIComponent(
    `Hi Kabadiwala Bhopal, I checked the AI Scrap Estimator on your website:\n\n` +
    `📦 *Estimated Weight:* ~${activeEstimate.overallEstimatedWeightKg} kg\n` +
    `💰 *Estimated Value:* ~₹${activeEstimate.overallEstimatedValueInr}\n\n` +
    `Please schedule my doorstep scrap pickup.`
  );

  return (
    <section id="ai-estimator" className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-current" />
            AI Powered Feature
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI Instant Scrap Value Estimator & Photo Scanner
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Snap a photo of your scrap pile or select your items below. Our AI estimates the weight and total cash value based on live Bhopal market rates!
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex gap-2 border border-slate-200">
            <button
              onClick={() => setActiveTab("photo")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                activeTab === "photo"
                  ? "bg-[#0F766E] text-white shadow-sm"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Camera className="w-4 h-4" /> AI Photo Scanner
            </button>

            <button
              onClick={() => setActiveTab("selector")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                activeTab === "selector"
                  ? "bg-[#0F766E] text-white shadow-sm"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Calculator className="w-4 h-4" /> Item Weight Selector
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {activeTab === "photo" ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Photo Upload Dropzone */}
              <div className="md:col-span-5 space-y-4 text-center">
                <div className="border-2 border-dashed border-teal-300 hover:border-[#0F766E] bg-white rounded-2xl p-6 transition-colors relative cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />

                  {selectedImage ? (
                    <div className="space-y-3">
                      <img
                        src={selectedImage}
                        alt="Scrap Preview"
                        className="w-full h-48 object-cover rounded-xl shadow-xs"
                      />
                      <p className="text-xs font-semibold text-teal-700 flex items-center justify-center gap-1">
                        <RefreshCw className="w-3.5 h-3.5" /> Tap to change photo
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 py-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#0F766E] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Upload Scrap Photo</p>
                        <p className="text-xs text-slate-500">Take a photo of papers, metal, or appliances</p>
                      </div>
                      <span className="inline-block bg-[#0F766E] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs">
                        Select Photo
                      </span>
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <div className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* AI Scan Results Column */}
              <div className="md:col-span-7 space-y-4">
                {loading ? (
                  <div className="py-12 text-center space-y-3 bg-white p-6 rounded-2xl border border-slate-200">
                    <Loader2 className="w-8 h-8 text-[#0F766E] animate-spin mx-auto" />
                    <p className="font-bold text-slate-800">AI is scanning scrap items & estimating weight...</p>
                    <p className="text-xs text-slate-500">Applying live Bhopal market rates</p>
                  </div>
                ) : estimateResult ? (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5 shadow-xs">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">AI ESTIMATE RESULT</span>
                        <h4 className="text-xl font-black text-slate-900">Estimated Cash Value</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-[#0F766E]">
                          ₹{estimateResult.overallEstimatedValueInr}
                        </div>
                        <div className="text-xs font-semibold text-slate-500">
                          Est. Weight: ~{estimateResult.overallEstimatedWeightKg} kg
                        </div>
                      </div>
                    </div>

                    {/* Detected Items Breakdown */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-700 uppercase">Detected Items:</p>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {estimateResult.detectedItems?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg">
                            <span className="font-bold text-slate-800">
                              {item.name} ({item.category})
                            </span>
                            <span className="font-bold text-[#0F766E]">
                              ~{item.estimatedWeightKg} kg = ₹{item.estimatedTotalInr}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Eco Impact */}
                    {estimateResult.ecoImpact && (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-semibold">
                        <span>🌱 CO2 Saved: ~{estimateResult.ecoImpact.co2SavedKg} kg</span>
                        <span>🌳 Trees Saved: ~{estimateResult.ecoImpact.treesSaved}</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <a
                      href={`https://wa.me/918871600497?text=${formattedWaMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full py-3 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Book Pickup for this AI Estimate</span>
                    </a>

                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                    <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                    <h4 className="font-bold text-slate-900 text-lg">Snap & Scan Your Scrap Pile</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Upload a photo of newspapers, old electronics, metal grills, or cardboard boxes to receive an automated AI valuation!
                    </p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Manual Item Weight Selector */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-72 overflow-y-auto p-1">
                {BHOPAL_SCRAP_RATES.slice(0, 9).map((rate) => {
                  const currentQty = selectedItems[rate.id] || 0;
                  return (
                    <div key={rate.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{rate.name}</div>
                        <div className="text-xs font-semibold text-[#0F766E]">₹{rate.rate} /{rate.unit}</div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedItems({ ...selectedItems, [rate.id]: Math.max(0, currentQty - 5) })}
                          className="w-7 h-7 rounded-md bg-slate-100 font-bold text-slate-700 hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">{currentQty}</span>
                        <button
                          onClick={() => setSelectedItems({ ...selectedItems, [rate.id]: currentQty + 5 })}
                          className="w-7 h-7 rounded-md bg-slate-100 font-bold text-slate-700 hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Calculated Total Cash</div>
                  <div className="text-3xl font-black text-[#0F766E]">
                    ₹{manualTotalInr} <span className="text-xs font-normal text-slate-500">(~{manualTotalWeight} kg total)</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918871600497?text=${formattedWaMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book Pickup (₹{manualTotalInr})</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
