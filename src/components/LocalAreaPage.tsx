import React, { useEffect } from "react";
import { ServiceAreaInfo } from "../types";
import { BHOPAL_SERVICE_AREAS } from "../data/serviceAreas";
import { BHOPAL_SCRAP_RATES } from "../data/scrapRates";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Scale, 
  ShieldCheck, 
  Truck, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Recycle,
  DollarSign,
  Building2,
  FileText
} from "lucide-react";

interface LocalAreaPageProps {
  areaSlug: string;
  onOpenBooking: () => void;
  onNavigateToArea: (slug: string) => void;
  onBackToHome: () => void;
}

export const LocalAreaPage: React.FC<LocalAreaPageProps> = ({
  areaSlug,
  onOpenBooking,
  onNavigateToArea,
  onBackToHome,
}) => {
  // Find current area by slug or fallback to MP Nagar
  const area: ServiceAreaInfo = BHOPAL_SERVICE_AREAS.find(
    (a) => a.slug === areaSlug || a.id === areaSlug
  ) || BHOPAL_SERVICE_AREAS[0];

  // 3 to 5 nearby area links
  const nearbyAreas = BHOPAL_SERVICE_AREAS.filter((a) => a.id !== area.id).slice(0, 5);

  const pageUrl = `https://kabadiwalabhopal.com/${area.slug}/`;
  const metaTitle = area.metaTitle || `Kabadiwala ${area.name} Bhopal | Doorstep Scrap Pickup Service`;
  const metaDesc = area.metaDescription || `Trusted Kabadiwala in ${area.name} Bhopal offering doorstep scrap pickup, best scrap rates and quick recycling service. Call 88716 00497 now.`;

  // Dynamic SEO Metadata Injection & Schema Injection
  useEffect(() => {
    // Set Document Title
    document.title = metaTitle;

    // Update Meta Description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDesc);

    // Update Canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', pageUrl);

    // Dynamic JSON-LD Schemas (LocalBusiness, Service, FAQ, Breadcrumb, Organization)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Kabadiwala ${area.name} Bhopal`,
      "image": "https://kabadiwalabhopal.com/assets/kabadiwala-bhopal-logo.webp",
      "@id": `${pageUrl}#localbusiness`,
      "url": pageUrl,
      "telephone": "+918871600497",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sharda Nagar, Rajeev Nagar, Nariyalkheda",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": area.postalCode || "462100",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.2599333,
        "longitude": 77.412615
      },
      "areaServed": [
        { "@type": "City", "name": "Bhopal" },
        { "@type": "AdministrativeArea", "name": `${area.name} Bhopal` }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Doorstep Scrap Pickup & Recycling",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kabadiwala Bhopal"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": `${area.name}, Bhopal`
      },
      "description": `Free doorstep scrap collection in ${area.name} Bhopal for paper, plastic, metals, e-waste, and appliances with ISO digital weighing scales.`
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kabadiwalabhopal.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `Kabadiwala ${area.name} Bhopal`,
          "item": pageUrl
        }
      ]
    };

    const faqList = area.faqs || [
      { question: `Do you provide scrap pickup in ${area.name} Bhopal?`, answer: `Yes, we provide free doorstep scrap pickup across all streets in ${area.name} Bhopal.` },
      { question: `How can I contact Kabadiwala in ${area.name}?`, answer: `You can call or WhatsApp us directly at 88716 00497 to schedule a pickup.` }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };

    // Append script tags
    const scriptLB = document.createElement("script");
    scriptLB.type = "application/ld+json";
    scriptLB.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(scriptLB);

    const scriptService = document.createElement("script");
    scriptService.type = "application/ld+json";
    scriptService.text = JSON.stringify(serviceSchema);
    document.head.appendChild(scriptService);

    const scriptBC = document.createElement("script");
    scriptBC.type = "application/ld+json";
    scriptBC.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptBC);

    const scriptFAQ = document.createElement("script");
    scriptFAQ.type = "application/ld+json";
    scriptFAQ.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFAQ);

    return () => {
      document.head.removeChild(scriptLB);
      document.head.removeChild(scriptService);
      document.head.removeChild(scriptBC);
      document.head.removeChild(scriptFAQ);
    };
  }, [area, metaTitle, metaDesc, pageUrl]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <button onClick={onBackToHome} className="hover:text-[#0F766E] font-medium flex items-center gap-1">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Bhopal Locations</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-[#0F766E]">Kabadiwala {area.name} Bhopal</span>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#064E3B] via-[#0F766E] to-teal-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Doorstep Scrap Service in {area.name}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Kabadiwala in <span className="text-amber-400">{area.name}</span> Bhopal
            </h1>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              Trusted doorstep scrap pickup service in {area.name}, Bhopal. Sell your household paper, metals, plastic, e-waste & old appliances at guaranteed best market rates with instant spot cash or UPI payment.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-amber-400 font-extrabold text-base sm:text-lg">~{area.estimatedArrivalMinutes} Mins</div>
                <div className="text-emerald-100 text-[11px]">Arrival Time</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-amber-400 font-extrabold text-base sm:text-lg">ISO Digital</div>
                <div className="text-emerald-100 text-[11px]">100% Honest Scale</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="text-amber-400 font-extrabold text-base sm:text-lg">₹0 Free</div>
                <div className="text-emerald-100 text-[11px]">Doorstep Pickup</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                onClick={onOpenBooking}
                className="btn-cta-orange w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Book Pickup in {area.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:8871600497"
                className="btn-call w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" /> Call 88716 00497
              </a>

              <a
                href={`https://wa.me/918871600497?text=Hello%20Kabadiwala%20Bhopal,%20I%20want%20to%20book%20a%20doorstep%20scrap%20pickup%20in%20${encodeURIComponent(area.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-emerald-400/30"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Now
              </a>
            </div>

          </div>

          {/* Right Hero Feature Box */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-emerald-100">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#0F766E] px-2.5 py-1 rounded-full">
                Service Hub: {area.name}
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Doorstep Scrap Evaluation
              </h3>
              <p className="text-xs text-slate-600">
                {area.description}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Executive team active: <strong>{area.activeExecutives} Teams On Field</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Pincode served: <strong>{area.postalCode || "462100"}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Instant Spot Payment: <strong>Cash / UPI (GPay/PhonePe/Paytm)</strong></span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900">Covered Spots & Colonies:</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {area.popularLocations.map((loc, i) => (
                  <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                    📍 {loc}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-emerald-800 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Schedule Pickup in {area.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. LOCAL INTRODUCTION & RICH WORD CONTENT (1000-1500 WORDS STRUCTURE) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              About Doorstep Kabadi Scrap Pickup in {area.name}, Bhopal
            </h2>
            <div className="prose prose-slate text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                {area.localIntroText || `Kabadiwala Bhopal is the leading doorstep scrap collection service operating in ${area.name}, Bhopal. Whether you are a homeowner cleaning out your store room, an educational institute clearing old examination papers, a retail shop selling packaging boxes, or a business disposing of redundant electronic hardware, our service brings certified digital weighing and immediate spot cash payments directly to your doorstep.`}
              </p>
              <p>
                In the busy locality of <strong>{area.name}</strong> (Postal Code: {area.postalCode || "462100"}), traditional scrap buyers often present challenges such as inaccurate manual weighing scales, unpunctual visits, and restricted item acceptance. Kabadiwala Bhopal solves these problems by providing uniform-wearing trained executives, ISO-certified electronic digital battery scales, transparent live per-kg scrap rates, and zero pickup fees.
              </p>
              <p>
                We service all major landmarks and nearby sectors surrounding {area.name}, including {area.landmarks ? area.landmarks.join(", ") : "local commercial complexes and residential layouts"}. Our eco-friendly collection model ensures that 100% of collected materials — paper, cardboard, plastics, ferrous and non-ferrous metals, e-waste, and household appliances — are routed directly to authorized green recycling plants in compliance with Pollution Control Board guidelines.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SCRAP SERVICES SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              What We Buy in {area.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Scrap Categories Accepted in {area.name} Bhopal
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We purchase all types of recyclable scrap at the highest Bhopal market scrap rates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "Iron Scrap", rate: "₹26-32/kg", desc: "Grills, pipes, structural iron" },
              { name: "Steel Scrap", rate: "₹40-50/kg", desc: "Utensils, sheets, furniture" },
              { name: "Newspaper Scrap", rate: "₹18-22/kg", desc: "Raddi, magazines, books" },
              { name: "Plastic Scrap", rate: "₹12-18/kg", desc: "Containers, bottles, buckets" },
              { name: "Copper Scrap", rate: "₹420-550/kg", desc: "Wires, motor windings, pipes" },
              { name: "Aluminium Scrap", rate: "₹110-140/kg", desc: "Utensils, sections, wire" },
              { name: "Brass Scrap", rate: "₹320-380/kg", desc: "Pooja items, taps, valves" },
              { name: "Electronic Waste", rate: "₹25-150/kg", desc: "CPUs, PCBs, wiring, routers" },
              { name: "Office Scrap", rate: "₹15-80/kg", desc: "Confidential paper, furniture" },
              { name: "Industrial Scrap", rate: "Top Bulk Rates", desc: "Machinery, off-cuts, turnings" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#0F766E] transition-all space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F766E] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                <div className="text-xs font-extrabold text-[#0F766E]">{item.rate}</div>
                <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. LOCAL SERVICE BENEFITS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose Kabadiwala in {area.name} Bhopal?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Six reasons why thousands of households & businesses in {area.name} trust our doorstep recycling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-emerald-100 text-[#0F766E] w-fit rounded-xl">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Free Doorstep Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero pickup charges across all sectors of {area.name}. We come directly to your home or office.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-teal-100 text-teal-800 w-fit rounded-xl">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">ISO Certified Digital Scale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Battery-operated digital electronic scales tested and verified for 100% accurate weighing in front of you.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-amber-100 text-amber-800 w-fit rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Instant Spot Payment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive spot cash or instant online UPI payment (Google Pay, PhonePe, Paytm) before items are loaded.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-emerald-100 text-[#0F766E] w-fit rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">~{area.estimatedArrivalMinutes}-Minute Response</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our active executives on field ensure fast turnaround time in {area.name} and surrounding colonies.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-teal-100 text-teal-800 w-fit rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Uniformed & Verified Staff</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Background-checked, polite executives wearing official Kabadiwala Bhopal uniforms and ID cards.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-amber-100 text-amber-800 w-fit rounded-xl">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">100% Eco-Friendly Recycling</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All collected scrap is processed responsibly at authorized green recycling facilities.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How Doorstep Pickup Works in {area.name}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              4 simple steps to convert your household or commercial scrap into instant cash.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative">
              <span className="text-2xl font-black text-[#0F766E]/20">01</span>
              <h3 className="font-bold text-slate-900 text-sm">Contact Us</h3>
              <p className="text-xs text-slate-600">Call 88716 00497 or book online with your address in {area.name}.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative">
              <span className="text-2xl font-black text-[#0F766E]/20">02</span>
              <h3 className="font-bold text-slate-900 text-sm">Schedule Time</h3>
              <p className="text-xs text-slate-600">Choose your preferred date and time slot for doorstep visit.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative">
              <span className="text-2xl font-black text-[#0F766E]/20">03</span>
              <h3 className="font-bold text-slate-900 text-sm">Digital Weighing</h3>
              <p className="text-xs text-slate-600">Executive arrives with digital scale and weighs scrap transparently.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 relative">
              <span className="text-2xl font-black text-[#0F766E]/20">04</span>
              <h3 className="font-bold text-slate-900 text-sm">Instant Payment</h3>
              <p className="text-xs text-slate-600">Receive cash or instant UPI payment before loading vehicle.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. LOCAL AREA INFORMATION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Local Area Coverage & Nearby Hubs in {area.name} Bhopal
          </h2>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs sm:text-sm">
            <p className="text-slate-600 leading-relaxed">
              Our doorstep pickup fleet regularly serves all residential, commercial, educational, and industrial establishments in <strong>{area.name}</strong>.
            </p>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Key Landmarks & Covered Spots in {area.name}:</h3>
              <div className="flex flex-wrap gap-2">
                {(area.landmarks || area.popularLocations).map((lm, i) => (
                  <span key={i} className="bg-white border border-slate-300 text-slate-800 px-3 py-1 rounded-lg text-xs font-semibold">
                    📍 {lm}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-bold text-slate-900">Nearby Localities Covered by Our Executives:</h3>
              <div className="flex flex-wrap gap-2">
                {nearbyAreas.map((near) => (
                  <button
                    key={near.id}
                    onClick={() => onNavigateToArea(near.slug)}
                    className="text-xs font-bold text-[#0F766E] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Kabadiwala {near.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION (AEO OPTIMIZED) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Local FAQ for Kabadiwala in {area.name} Bhopal
            </h2>
          </div>

          <div className="space-y-3">
            {(area.faqs || [
              { question: `Do you provide scrap pickup in ${area.name} Bhopal?`, answer: `Yes, we provide doorstep pickup across all sectors of ${area.name} Bhopal.` },
              { question: `Which scrap items do you purchase in ${area.name}?`, answer: `We purchase newspapers, cardboard, iron, copper, brass, aluminum, plastic, e-waste, and appliances.` },
              { question: `How can I contact Kabadiwala Bhopal?`, answer: `Call or WhatsApp us on 88716 00497.` },
              { question: `Do you provide home scrap collection in ${area.name}?`, answer: `Yes, home scrap collection is completely free in ${area.name}.` },
              { question: `What is today's newspaper (raddi) rate in ${area.name}?`, answer: `Newspaper raddi ranges from ₹18 to ₹22 per kg with instant spot payment.` },
              { question: `Is doorstep scrap pickup free in ${area.name}?`, answer: `Yes, doorstep pickup is 100% free with zero travel or weighing fees.` }
            ]).map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. GEO OPTIMIZATION & BUSINESS INFO */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 text-xs sm:text-sm">
        <div className="max-w-4xl mx-auto bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200 space-y-3">
          <div className="font-black text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2 text-[#0F766E]">
            <Building2 className="w-4 h-4" /> Official Business Location & Service Area Metadata:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
            <div><strong>Business Name:</strong> Kabadiwala Bhopal</div>
            <div><strong>Primary Service Area:</strong> {area.name}, Bhopal, MP</div>
            <div><strong>Head Branch Address:</strong> Sharda Nagar, Rajeev Nagar, Nariyalkheda, Bhopal 462100</div>
            <div><strong>Direct Contact Phone:</strong> +91 88716 00497</div>
            <div><strong>WhatsApp Hotline:</strong> +91 88716 00497</div>
            <div><strong>Operating Hours:</strong> Monday - Sunday, 08:00 AM - 08:00 PM</div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA BAR */}
      <section className="py-12 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ready to Sell Your Scrap in {area.name}?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Book your free doorstep pickup now and get instant spot payment with digital scale accuracy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <button
            onClick={onOpenBooking}
            className="btn-cta-orange w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-xl"
          >
            <span>Book Doorstep Pickup</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="tel:8871600497"
            className="btn-call w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-xl"
          >
            <Phone className="w-5 h-5" /> Call 88716 00497
          </a>
        </div>
      </section>

    </div>
  );
};
