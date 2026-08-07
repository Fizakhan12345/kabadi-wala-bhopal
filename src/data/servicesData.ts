export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  category: "paper" | "metal" | "plastic" | "ewaste" | "appliance" | "commercial";
  heroTitle: string;
  shortDesc: string;
  fullDesc: string;
  acceptedItems: string[];
  marketInfo: string;
  pickupProcess: string[];
  benefits: string[];
  industriesServed: string[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  currentRateRange: string;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "newspaper-paper",
    title: "Newspaper & Paper Scrap Pickup",
    slug: "newspaper-paper-scrap",
    category: "paper",
    heroTitle: "Doorstep Newspaper & Old Books Scrap Buyer in Bhopal",
    shortDesc: "Get the best rate per kg for old newspapers (Raddi), office A4 papers, cardboard boxes, and school books in Bhopal with instant cash.",
    fullDesc: "Kabadiwala Bhopal provides fast doorstep collection of household newspaper raddi, old textbooks, notebooks, office paper files, and corrugated box packaging across all major localities in Bhopal.",
    acceptedItems: [
      "Daily Newspaper (Dainik Bhaskar, Patrika, etc.)",
      "Corrugated Boxes & Carton Packaging",
      "Office Record Files & White A4 Sheets",
      "Old Textbooks, School Notebooks & Magazines",
      "Shredded Confidential Office Documents"
    ],
    marketInfo: "Paper prices fluctuate based on paper mill recycling demand. Newspaper (Raddi) currently commands ₹18 - ₹22/kg in Bhopal.",
    pickupProcess: [
      "Book doorstep paper pickup online or call 88716 00497.",
      "Executive arrives with ISO digital weighing machine at your doorstep.",
      "Paper items weighed bundle-by-bundle in front of you.",
      "Instant spot payment via Cash or Google Pay/PhonePe/Paytm."
    ],
    benefits: [
      "100% accurate digital electronic weighing",
      "Free doorstep pickup above 15kg raddi",
      "Direct supply to paper recycling mills",
      "Instant UPI or Cash payment"
    ],
    industriesServed: [
      "Household Residents & Apartments",
      "Coaching Institutes & Schools in MP Nagar",
      "Corporate Offices & Publishing Houses",
      "Banks & Government Offices"
    ],
    faqs: [
      {
        question: "What is today's newspaper raddi rate in Bhopal?",
        answer: "Today's newspaper rate in Bhopal ranges from ₹18 to ₹22 per kg depending on total quantity and cleanliness."
      },
      {
        question: "Do you buy old textbooks and notebooks?",
        answer: "Yes, we purchase old school textbooks, college guides, and notebooks at ₹14 - ₹18/kg."
      }
    ],
    seoTitle: "Newspaper Scrap Rate in Bhopal | Raddi Kabadiwala Near Me",
    seoDescription: "Sell old newspapers, books, cartons & paper raddi in Bhopal at highest rates. Doorstep pickup in MP Nagar, Arera Colony, Kolar. Call 8871600497.",
    currentRateRange: "₹18 - ₹22 / kg"
  },
  {
    id: "iron-steel",
    title: "Iron & Steel Heavy Scrap",
    slug: "iron-steel-scrap",
    category: "metal",
    heroTitle: "Heavy Iron & Steel Scrap Dealer in Bhopal",
    shortDesc: "Sell heavy iron scrap, TMT bars, steel furniture, grills, pipes, and construction metal scrap in Bhopal with digital scale weighing.",
    fullDesc: "We collect all grades of heavy iron, cast iron, mild steel (MS), rebar, construction scrap, and old iron gates/fences directly from homes, workshops, and construction sites in Bhopal.",
    acceptedItems: [
      "Heavy Iron Beams, Angles & Pipes",
      "Construction TMT Steel & Wire Mesh",
      "Old Iron Gates, Window Grills & Railings",
      "Cast Iron Cookware & Industrial Metal",
      "Old Steel Almirahs & Cabinets"
    ],
    marketInfo: "Iron scrap prices depend on steel plant melting scrap index. Heavy iron commands ₹28 - ₹32/kg in Bhopal.",
    pickupProcess: [
      "Schedule pickup or request site inspection for heavy scrap.",
      "Vehicle arrives with loading staff & electronic weighing machine.",
      "Net weight verified on spot with full transparency.",
      "Instant payment before loading vehicle."
    ],
    benefits: [
      "Specialized loading team for heavy metal structures",
      "Bhopal industrial & workshop bulk clearing",
      "GST invoices & weight slips provided"
    ],
    industriesServed: [
      "Construction Sites & Contractors",
      "Govindpura & Mandideep Industrial Units",
      "Residential Renovations",
      "Auto Repair Workshops"
    ],
    faqs: [
      {
        question: "What is the rate of heavy iron scrap per kg in Bhopal?",
        answer: "Heavy iron scrap rate is ₹28 to ₹32 per kg, while light iron sheet scrap is ₹22 to ₹26 per kg."
      },
      {
        question: "Do you dismantle old iron structures and gates?",
        answer: "Yes, our team carries gas cutters and tools for dismantling old iron gates, sheds, and grills in Bhopal."
      }
    ],
    seoTitle: "Iron Scrap Rate in Bhopal | Heavy Steel Metal Kabadiwala",
    seoDescription: "Get highest iron scrap price in Bhopal. Doorstep pickup for iron gates, steel bars, pipes, and heavy scrap. Call 8871600497.",
    currentRateRange: "₹28 - ₹32 / kg"
  },
  {
    id: "copper-brass",
    title: "Copper, Brass & Heavy Metals",
    slug: "copper-brass-scrap",
    category: "metal",
    heroTitle: "Copper Wire & Brass Scrap Buyer in Bhopal",
    shortDesc: "Top market rates for copper motor wire, AC piping, brass utensils, bronze statues, and heavy electric cables in Bhopal.",
    fullDesc: "Copper and brass are high-value non-ferrous metals. Kabadiwala Bhopal ensures you get the exact market benchmark price with precision digital scale measurement for every gram.",
    acceptedItems: [
      "Heavy Copper Wire & Armored Cables",
      "Air Conditioner Copper Pipes & Coils",
      "Brass Utensils (Pital), Fitting Valves & Locks",
      "Bronze (Kansa) Statues & Utensils",
      "Radiator Copper Coils"
    ],
    marketInfo: "Copper is one of the highest paying scrap metals, commanding ₹520 - ₹620/kg depending on purity and insulation status.",
    pickupProcess: [
      "Call 88716 00497 or send photo on WhatsApp for instant quote.",
      "Executive carries high-precision digital hanging scale.",
      "Immediate weight verification and high-value spot cash/UPI payout."
    ],
    benefits: [
      "Precision gram-level digital scale",
      "Top spot rates based on live metal exchange index",
      "Safe & secure handling for high value metals"
    ],
    industriesServed: [
      "Electrical Contractors & Plumbers",
      "AC Repair Technicians",
      "Residential Households",
      "Temples & Heritage Collections"
    ],
    faqs: [
      {
        question: "What is today's copper scrap price in Bhopal?",
        answer: "Clean copper wire rates range from ₹550 to ₹620 per kg. Insulated wire rates depend on copper content percentage."
      },
      {
        question: "What is brass (Pital) scrap rate in Bhopal?",
        answer: "Brass scrap rate ranges from ₹380 to ₹430 per kg."
      }
    ],
    seoTitle: "Copper Scrap Price in Bhopal | Pital Brass Kabadiwala Near Me",
    seoDescription: "Sell copper wire, AC copper pipes, brass pital scrap in Bhopal at maximum rate. Precision digital weighing. Call 8871600497.",
    currentRateRange: "₹550 - ₹620 / kg"
  },
  {
    id: "e-waste-electronics",
    title: "E-Waste & Computer Scrap",
    slug: "ewaste-electronics-scrap",
    category: "ewaste",
    heroTitle: "Certified E-Waste & Computer Scrap Recycling in Bhopal",
    shortDesc: "Environmentally friendly e-waste disposal for old laptops, desktop computers, servers, UPS, printers, motherboards, and cellphones.",
    fullDesc: "Improper electronic waste disposal harms Bhopal's environment. Kabadiwala Bhopal collects obsolete IT assets and household electronics, ensuring 100% eco-friendly e-waste recycling.",
    acceptedItems: [
      "Old Laptops, Desktop CPUs & Monitors",
      "Server Racks, Routers & Network Switches",
      "UPS Units, Inverter Batteries & Stabilizers",
      "Printed Circuit Boards (PCBs) & Motherboards",
      "Old Mobile Phones, Tablets & Keyboards"
    ],
    marketInfo: "E-waste is priced per piece or per kg depending on component value. Full computer sets fetch ₹350 - ₹850/piece.",
    pickupProcess: [
      "Book doorstep e-waste collection.",
      "Inspection and component classification by executive.",
      "Issuance of recycling record / Form 2 certificate for corporates.",
      "Instant spot payment."
    ],
    benefits: [
      "Certified eco-friendly recycling pipeline",
      "Data destruction compliance for corporate hard drives",
      "Form 2 e-waste destruction certificates provided"
    ],
    industriesServed: [
      "MP Nagar IT & Software Companies",
      "Educational Institutes & Computer Labs",
      "Banks & Insurance Offices",
      "Individual Households"
    ],
    faqs: [
      {
        question: "Do you issue official e-waste destruction certificates?",
        answer: "Yes, we provide Form 2 e-waste disposal certificates and data destruction assurance for companies."
      },
      {
        question: "What is the scrap rate of old desktop computers?",
        answer: "A complete old desktop CPU and monitor set fetches ₹350 to ₹850 per piece based on motherboard and transformer weight."
      }
    ],
    seoTitle: "E Waste Scrap Buyer in Bhopal | Computer Laptop Recycling",
    seoDescription: "Certified e-waste recycling in Bhopal. Best scrap rate for old computers, laptops, servers, UPS, and motherboards. Call 8871600497.",
    currentRateRange: "₹350 - ₹850 / pc"
  },
  {
    id: "air-conditioner-appliances",
    title: "Air Conditioner & Home Appliances",
    slug: "ac-appliances-scrap",
    category: "appliance",
    heroTitle: "Old AC, Refrigerator & Washing Machine Scrap Buyer Bhopal",
    shortDesc: "Get instant cash for scrap 1.5 ton split/window ACs, old refrigerators, washing machines, microwaves, and water heaters.",
    fullDesc: "Upgrading your home appliances? Don't leave old air conditioners or fridges rusting in your balcony. We offer doorstep pickup and highest scrap evaluation for all home appliances in Bhopal.",
    acceptedItems: [
      "Split ACs & Window ACs (1 Ton, 1.5 Ton, 2 Ton)",
      "Commercial Tower ACs & Chillers",
      "Single Door & Double Door Refrigerators",
      "Fully Automatic & Semi Automatic Washing Machines",
      "Microwave Ovens, Geysers & Water Coolers"
    ],
    marketInfo: "1.5 Ton Split AC scrap fetches ₹3,800 - ₹5,200/piece depending on copper condenser coil condition.",
    pickupProcess: [
      "Provide AC or appliance details via call/WhatsApp.",
      "Our technicians carry tools to safely uninstall if needed.",
      "Immediate cash/UPI payment before loading."
    ],
    benefits: [
      "Doorstep uninstallation assistance",
      "Highest fixed piece-rate for complete appliances",
      "Same-day pickup across all Bhopal sectors"
    ],
    industriesServed: [
      "Households & Apartment Owners",
      "Hotels, Restaurants & Banquet Halls",
      "Offices & Commercial Outlets",
      "AC Repair Centers"
    ],
    faqs: [
      {
        question: "How much scrap value do I get for a 1.5 Ton Split AC in Bhopal?",
        answer: "A 1.5 Ton Split AC with copper coil yields ₹3,800 to ₹5,200 depending on compressor and indoor unit condition."
      },
      {
        question: "Do your workers dismantle and unmount the AC from the wall?",
        answer: "Yes, our executive team brings tools for safe unmounting and removal."
      }
    ],
    seoTitle: "Old AC Scrap Rate in Bhopal | Refrigerator Washing Machine Buyer",
    seoDescription: "Best scrap price for old ACs, fridges, washing machines in Bhopal. Instant doorstep pickup & uninstallation. Call 8871600497.",
    currentRateRange: "₹3,800 - ₹5,200 / AC"
  },
  {
    id: "battery-scrap",
    title: "Inverter & Vehicle Battery Scrap",
    slug: "battery-scrap",
    category: "ewaste",
    heroTitle: "Inverter & Lead Acid Battery Scrap Dealer in Bhopal",
    shortDesc: "Highest scrap rate per kg for old tubular inverter batteries, car batteries, bike batteries, and heavy UPS lead-acid batteries.",
    fullDesc: "Lead acid batteries contain hazardous lead and acid. Kabadiwala Bhopal ensures safe environmental recycling of all old batteries while paying you maximum scrap value per kg.",
    acceptedItems: [
      "Tubular Inverter Batteries (150Ah, 200Ah)",
      "Four Wheeler Car & Truck Batteries",
      "Two Wheeler Motorbike Batteries",
      "UPS & Solar Panel Lead Acid Batteries"
    ],
    marketInfo: "Lead acid battery scrap commands ₹78 - ₹92/kg based on dry/wet battery weight and lead content.",
    pickupProcess: [
      "Mention battery Ah capacity or send photo.",
      "Digital weight check or flat rate evaluation.",
      "Instant spot cash/UPI payout and safe leak-proof transport."
    ],
    benefits: [
      "Safe leak-proof transport",
      "Direct smelter recycling network",
      "Highest per-kg or per-piece battery rate"
    ],
    industriesServed: [
      "Households & Inverter Owners",
      "Telecom Towers & Data Centers",
      "Automobile Mechanics & Garages",
      "Solar Energy Installations"
    ],
    faqs: [
      {
        question: "How much scrap value do I get for a 150Ah old inverter battery?",
        answer: "A standard 150Ah tubular inverter battery typically fetches ₹2,200 to ₹3,100 depending on battery dry weight."
      }
    ],
    seoTitle: "Old Battery Scrap Rate in Bhopal | Inverter Car Battery Kabadiwala",
    seoDescription: "Sell old inverter batteries, car batteries, UPS batteries in Bhopal at maximum rate. Doorstep pickup. Call 8871600497.",
    currentRateRange: "₹78 - ₹92 / kg"
  }
];
