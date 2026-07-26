/**
 * LIVE METAL PRICE CONFIG
 * ---------------------------------------------------------
 * We use api.metals.live — free, no API key needed for under
 * 30,000 requests/month (https://api.metals.live). It returns
 * international exchange-linked prices in USD PER POUND.
 *
 * That international price is NOT what a kabadi wala actually
 * pays — scrap is impure, sold in small lots, and dealers keep
 * a margin. So we convert:
 *
 *   USD/lb  →  USD/kg  →  ₹/kg  →  × your buying margin
 *
 * Tune the two constants below to match your real business:
 *
 * - USD_TO_INR: today's dollar-to-rupee rate. This moves slowly,
 *   so it's fine to update it every week or two rather than daily.
 * - KABADI_MARGIN: what % of the "pure metal" price you actually
 *   pay for scrap. Start with the defaults, then adjust based on
 *   what you see matches your real counter rate.
 * ---------------------------------------------------------
 */

export const USD_TO_INR = 86;

export const KG_PER_LB = 0.453592;

export const KABADI_MARGIN: Record<string, number> = {
  copper: 0.75, // scrap copper typically trades ~70-85% of refined LME price
  aluminum: 0.65, // mixed aluminium scrap is usually ~60-70% of ingot price
  brass: 0.6, // brass scrap (mixed grades) commonly ~55-65% of reference price
};

export const LIVE_METALS_API_URL = 'https://api.metals.live/v1/spot/commodities';
