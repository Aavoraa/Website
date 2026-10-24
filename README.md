# AAVORAA Website

Homepage and supporting pages for **AAVORAA**, built with [Astro](https://astro.build) as a static, SEO-friendly site.
The page ships as plain HTML and CSS, plus about 9 KB of JavaScript for reveals, navigation, the accordion and the form.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the production build
```

`dist/` can be deployed to any static host.

**Publishing on GoDaddy:** run `npm run package` to build and create `AAVORAA-website-godaddy.zip`, then
follow **[DEPLOY-GODADDY.md](DEPLOY-GODADDY.md)**. The package includes `.htaccess` (404 page, caching,
optional HTTPS redirect) and `contact.php`, which emails enquiry-form submissions to info@aavoraa.com.

## Integrations (optional, set in `.env`)

Production builds read `.env.production` (already set to use `/contact.php` for the form); local development reads `.env` (copy `.env.example`). Every value is optional, and the site stays honest without them.

| Variable | What it does | When empty |
|---|---|---|
| `PUBLIC_FORM_ENDPOINT` | Enquiry form POSTs JSON (name, email, company, interest, message, offer, UTM attribution) | After validation, the form says online submission isn't connected and offers a pre-filled email to info@aavoraa.com |
| `PUBLIC_BOOKING_URL` | "Book a Discovery Call" opens your booking tool (Calendly, Cal.com, …) | The button scrolls to the enquiry form |
| `PUBLIC_GA4_ID` | Loads Google Analytics 4 | Events still go to `window.dataLayer` (GTM-ready) |
| `PUBLIC_GSC_VERIFICATION` | Google Search Console meta tag | — |

Rebuild after changing `.env`.

### Tracked events
`cta_primary_click`, `booking_start`, `cta_secondary_click`, `service_card_click`, `case_study_click`,
`warexx_click`, `contact_click`, `faq_open`, `form_start`, `form_validation_error`, `form_submit_success`,
`form_submit_error`, `form_email_fallback`. See `src/scripts/analytics.ts`.

## Where things live

- `src/data/site.ts` — **all copy and content** (pillars, industries, case studies, FAQ, contact details).
- `src/components/` — one component per section; `Pillar.astro` and `CaseCard.astro` are reusable.
- `src/styles/global.css` — design tokens (exact brand palette), type scale, buttons and the reveal system.
- `public/brand/` — logo variants derived from the supplied files; `public/images/` — hero art and OG image.

## Before launch — please confirm

1. **Client permission** to name the clients in the case studies. Their facts come from the AAVORAA portfolio deck.
2. **Contact details** (+91 93427 21163, info@aavoraa.com), also taken from the portfolio deck.
3. **Privacy Policy and Terms**: `/privacy/` and `/terms/` are interim summaries and need legal review.
4. **Logo tagline "Beyond Possibilities"**: the footer and social image use the official lockup artwork. In the nav and final CTA the tagline is set as live text (gold, Montserrat), because the artwork's own tagline would be unreadably small at those sizes. `scripts/make_logo_tagline.py` can rebuild the lockup with a different tagline if it ever changes.
5. **Project imagery and WAREXX screenshots**: none were supplied, so case cards show abstract line art and WAREXX is shown as a module diagram. Add approved images through the `image` field in `src/data/site.ts`.
6. **Social profiles**: none were added, because none were verified.
