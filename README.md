<<<<<<< HEAD
# Kabadi Wala Bhopal — Website

A responsive Angular website for a Bhopal scrap-dealer (kabadi) business, built to
show daily-updated scrap rates ("Aaj Ka Bhaav") for metals, paper, plastic, e-waste
and appliances.

## Run it locally

```bash
npm install
npm start
```

Then open **http://localhost:4200**.

## Build the static site (for hosting)

```bash
npm run build
```

The finished static files land in `dist/kabadi-wala-bhopal/browser`. Upload that
folder as-is to any static host (Netlify, Vercel, GitHub Pages, or your own
hosting/cPanel).

## Live rates: what's automatic and what isn't

**Copper, Brass and Aluminium auto-update** every time the site loads, from
[api.metals.live](https://api.metals.live) — a free, no-API-key exchange-price
feed (under 30,000 requests/month). Their international price is converted to
₹/kg and then multiplied by a "kabadi margin" (scrap sells below the pure-metal
exchange price), configured in `src/app/data/api-metals.config.ts`:

```ts
export const USD_TO_INR = 86;              // update every week or two
export const KABADI_MARGIN = {
  copper: 0.75,     // tune these to match your real counter rate
  aluminum: 0.65,
  brass: 0.60,
};
```

If the live fetch fails for any reason (offline, ad-blocker, quota), the site
silently falls back to the manual values in `rates.data.ts` — nothing breaks.

**Everything else — Iron/Steel, Stainless Steel, paper, plastic, e-waste and
others — has no public market feed**, so those stay fully manual, same as
before. This isn't a shortcut: no service publishes a real "local kabadi rate"
for newspaper or plastic, so even large scrap-marketplace apps set those by
hand.

## Updating today's rates (do this every day)

Everything price-related lives in **one file**:

```
src/app/data/rates.data.ts
```

Open it and for any item change:

- `rate` — the new ₹ price
- `trend` — `'up'`, `'down'`, or `'flat'` compared to yesterday

At the bottom of the file, `RATES_UPDATED_ON` sets the date shown on the
"Updated Today" stamp — it defaults to today automatically, so you usually
don't need to touch it unless you want to backdate it.

Save the file, rebuild (`npm run build`), and re-upload the `dist` folder —
the whole site (hero ticker + rate board) updates from this one place.

## Editing shop details (phone, WhatsApp, address, service areas)

Edit `src/app/data/site.data.ts`. Update the phone number, WhatsApp link,
address, hours and the list of Bhopal localities you serve.

## Project structure

```
src/app/
  data/
    rates.data.ts     ← daily scrap rates (edit every day)
    site.data.ts       ← shop phone/address/areas (edit occasionally)
  components/
    header/            ← sticky nav + call button
    hero/               ← headline + scrolling rate ticker
    rate-board/          ← main "Aaj Ka Bhaav" rate cards, tabbed by category
    services/           ← how pickup works
    why-us/              ← trust points + service-area chips
    contact/             ← call/WhatsApp CTA + address card
    footer/
```

## Notes

- Sample rates included are indicative starting values based on typical Indian
  scrap-market ranges — replace them with your actual daily buying rates
  before publishing.
- Update the phone number and WhatsApp link in `site.data.ts` before going live
  — the sample number is a placeholder.
=======
# kabadi-wala-bhopal
>>>>>>> 5c7864961f23fee161a23fef6d2cb47286363ee7
