/**
 * AAJ KA BHAAV — daily rate sheet
 * ---------------------------------------------------------
 * Copper, Brass and Aluminium have `liveKey` set — those three
 * auto-update on every page load from a free exchange-price
 * API (see rates-live.service.ts), converted to ₹/kg with a
 * dealer margin applied. If the live fetch fails for any
 * reason, the values below are shown as a safe fallback.
 *
 * EVERYTHING ELSE — Iron/Steel, Stainless Steel, paper,
 * plastic, e-waste, others — has no public market feed, so it
 * stays fully manual. Edit `rate` and `trend` here every day
 * for those, and update RATES_UPDATED_ON at the bottom.
 *
 * trend: 'up' | 'down' | 'flat'  (compared to yesterday)
 * unit:  always priced per kg unless noted in the name
 * ---------------------------------------------------------
 */

export type Trend = 'up' | 'down' | 'flat';

/** Metals that have a live exchange-linked price feed — see rates-live.service.ts */
export type LiveMetalKey = 'copper' | 'aluminum' | 'brass';

export interface RateItem {
  nameEn: string;
  nameHi: string;
  rate: number;
  unit: string;
  trend: Trend;
  /** Set only for items that should auto-update from the live metals API. Leave undefined for manual items. */
  liveKey?: LiveMetalKey;
  /** true once this item's `rate` has actually been overwritten by a live fetch (set at runtime, not here). */
  isLive?: boolean;
}

export interface RateCategory {
  id: string;
  titleEn: string;
  titleHi: string;
  icon: string;
  items: RateItem[];
}

export const RATE_CATEGORIES: RateCategory[] = [
  {
    id: 'metal',
    titleEn: 'Metal Scrap',
    titleHi: 'धातु कबाड़',
    icon: 'metal',
    items: [
      { nameEn: 'Iron / Steel', nameHi: 'लोहा / स्टील', rate: 26, unit: 'kg', trend: 'up' },
      { nameEn: 'Heavy Iron (Girder/Angle)', nameHi: 'भारी लोहा', rate: 29, unit: 'kg', trend: 'flat' },
      { nameEn: 'Copper', nameHi: 'तांबा', rate: 620, unit: 'kg', trend: 'up', liveKey: 'copper' },
      { nameEn: 'Brass', nameHi: 'पीतल', rate: 380, unit: 'kg', trend: 'flat', liveKey: 'brass' },
      { nameEn: 'Aluminium', nameHi: 'एल्युमिनियम', rate: 148, unit: 'kg', trend: 'down', liveKey: 'aluminum' },
      { nameEn: 'Stainless Steel (Utensils)', nameHi: 'स्टील के बर्तन', rate: 42, unit: 'kg', trend: 'flat' },
    ],
  },
  {
    id: 'paper',
    titleEn: 'Paper & Cardboard',
    titleHi: 'कागज़ / गत्ता',
    icon: 'paper',
    items: [
      { nameEn: 'Newspaper', nameHi: 'अख़बार', rate: 13, unit: 'kg', trend: 'up' },
      { nameEn: 'Books / Copies', nameHi: 'किताबें / कॉपी', rate: 9, unit: 'kg', trend: 'flat' },
      { nameEn: 'Cardboard (Gatta)', nameHi: 'गत्ता', rate: 8, unit: 'kg', trend: 'flat' },
      { nameEn: 'Mixed Office Paper', nameHi: 'मिक्स पेपर', rate: 7, unit: 'kg', trend: 'down' },
    ],
  },
  {
    id: 'plastic',
    titleEn: 'Plastic',
    titleHi: 'प्लास्टिक',
    icon: 'plastic',
    items: [
      { nameEn: 'PET Bottles', nameHi: 'पानी की बोतल', rate: 12, unit: 'kg', trend: 'up' },
      { nameEn: 'Hard Plastic', nameHi: 'हार्ड प्लास्टिक', rate: 15, unit: 'kg', trend: 'flat' },
      { nameEn: 'Plastic Crates / Buckets', nameHi: 'प्लास्टिक टोकरी', rate: 10, unit: 'kg', trend: 'flat' },
      { nameEn: 'Carry Bags (LDPE)', nameHi: 'पॉलिथीन', rate: 6, unit: 'kg', trend: 'down' },
    ],
  },
  {
    id: 'ewaste',
    titleEn: 'E-Waste & Appliances',
    titleHi: 'ई-कचरा / उपकरण',
    icon: 'ewaste',
    items: [
      { nameEn: 'Old Washing Machine', nameHi: 'पुरानी वॉशिंग मशीन', rate: 550, unit: 'piece', trend: 'flat' },
      { nameEn: 'Old Refrigerator', nameHi: 'पुराना फ्रिज', rate: 700, unit: 'piece', trend: 'up' },
      { nameEn: 'Old Split / Window AC', nameHi: 'पुराना एसी', rate: 1400, unit: 'piece', trend: 'flat' },
      { nameEn: 'Desktop Computer / CPU', nameHi: 'कंप्यूटर / सीपीयू', rate: 220, unit: 'piece', trend: 'flat' },
      { nameEn: 'Mixed E-Waste (PCB, wires)', nameHi: 'मिक्स ई-वेस्ट', rate: 95, unit: 'kg', trend: 'up' },
    ],
  },
  {
    id: 'others',
    titleEn: 'Others',
    titleHi: 'अन्य सामान',
    icon: 'others',
    items: [
      { nameEn: 'Old Clothes', nameHi: 'पुराने कपड़े', rate: 5, unit: 'kg', trend: 'flat' },
      { nameEn: 'Glass Bottles', nameHi: 'कांच की बोतल', rate: 1, unit: 'piece', trend: 'flat' },
      { nameEn: 'Old Tyres', nameHi: 'पुराना टायर', rate: 8, unit: 'kg', trend: 'flat' },
    ],
  },
];

/** Update this every day so the "last updated" stamp stays accurate. */
export const RATES_UPDATED_ON = new Date();

/** Handful of headline items shown in the hero ticker strip. */
export const TICKER_ITEMS = ['Iron / Steel', 'Copper', 'Brass', 'Newspaper', 'Old Refrigerator', 'PET Bottles'];
