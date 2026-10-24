/**
 * Conversion tracking hooks.
 * Events are pushed to window.dataLayer (works with GTM) and sent via gtag when GA4 is configured.
 *
 * Event catalogue
 *  cta_primary_click        "Book a Discovery Call" buttons      { location }
 *  booking_start            discovery-call booking link opened   { location }   (only when PUBLIC_BOOKING_URL is set)
 *  cta_secondary_click      secondary CTAs                       { location, label }
 *  service_card_click       capability card / pillar CTA          { label }
 *  case_study_click         case-study interactions              { label }
 *  warexx_click             WAREXX links                         { location }
 *  contact_click            email / phone links                  { method }
 *  faq_open                 FAQ question expanded                { question }
 *  form_start               first interaction with enquiry form  { form }
 *  form_validation_error    client-side validation failed        { fields }
 *  form_submit_success      enquiry accepted by the endpoint     { interest }
 *  form_submit_error        endpoint/network failure             { reason }
 *  form_email_fallback      user chose the pre-filled email      { interest }
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];

export function track(event: string, params: Params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  // gtag() is defined in Base.astro; it only reaches Google when a GA4 ID is configured.
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  if (import.meta.env.DEV) console.debug('[track]', event, params);
}

/** First-touch campaign attribution, kept for the session and attached to enquiries. */
export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem('aav_attribution') || '{}');
  } catch {
    return {};
  }
}

function captureAttribution() {
  try {
    if (sessionStorage.getItem('aav_attribution')) return;
    const qs = new URLSearchParams(location.search);
    const data: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = qs.get(k);
      if (v) data[k] = v.slice(0, 120);
    });
    data.landing_page = location.pathname;
    if (document.referrer) data.referrer = document.referrer.slice(0, 200);
    sessionStorage.setItem('aav_attribution', JSON.stringify(data));
  } catch {
    /* storage unavailable — attribution simply omitted */
  }
}

export function initAnalytics() {
  captureAttribution();
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track], a[href^="mailto:"], a[href^="tel:"]');
    if (!el) return;
    const href = el.getAttribute('href') || '';
    if (!el.dataset.track) {
      track('contact_click', { method: href.startsWith('tel:') ? 'phone' : 'email' });
      return;
    }
    const location = el.dataset.trackLocation;
    const label = el.dataset.trackLabel || el.textContent?.trim().slice(0, 80);
    track(`${el.dataset.track}_click`, { location, label });
    if (el.dataset.track === 'cta_primary' && /^https?:/.test(href)) track('booking_start', { location });
  });
}
