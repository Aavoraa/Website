/**
 * Cinematic scroll layer — GSAP ScrollTrigger + Lenis smooth scrolling.
 * Animates EXISTING elements only (no new markup): depth parallax, scroll-linked scale, horizontal drift,
 * layered text, clip reveals, staggered grid cascades and one pinned section.
 *
 * To avoid fighting the CSS reveal animations (which use `transform`), everything here drives CSS variables
 * that feed the independent `translate` / `scale` properties (see `.gx` in global.css).
 * Skipped entirely for prefers-reduced-motion. Heavier effects (pinning) are desktop-only.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
// dev-only: lets automated checks tick animations in a paused/hidden preview
if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__gsap = { gsap, ScrollTrigger };

const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];
const NAV_OFFSET = -96;
let lenis: Lenis | null = null;

/** Smooth-scroll to a position or element (used by back-to-top and in-page links). */
export function scrollToTarget(target: number | HTMLElement, offset = 0) {
  if (lenis) return lenis.scrollTo(target, { offset });
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

/* ---------- smooth, inertial scrolling (desktop pointers only — touch keeps native scrolling) ---------- */
function initSmoothScroll() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add('has-lenis');
  if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__lenis = lenis; // dev-only, for automated checks

  // in-page links glide to their target and clear the fixed navigation
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || e.defaultPrevented || a.target || a.origin !== location.origin || a.pathname !== location.pathname || a.hash.length < 2) return;
    const t = document.getElementById(decodeURIComponent(a.hash.slice(1)));
    if (!t) return;
    e.preventDefault();
    lenis!.scrollTo(t, { offset: NAV_OFFSET });
    history.pushState(null, '', a.hash);
    t.classList.add('is-target'); // replays the "jumped-to" glow that :target would give
    setTimeout(() => t.classList.remove('is-target'), 2200);
  });

  fitScreens();
  initSectionSnap();
}

/* ---------- desktop: every section is exactly one screen ----------
 * Each page section gets the viewport's height with its content centred. When the content is taller than the
 * screen (common on laptops), it is scaled down with `zoom` so the whole section still fits. Sections that would
 * need to shrink below MIN_ZOOM keep their natural height and scroll normally instead. */
const FIT_SEL = 'main > header, main > section, main > [data-fit-group]';
const MIN_ZOOM = 0.62;
function fitScreens() {
  const root = document.documentElement;
  const ok = () => window.innerWidth >= 1000 && window.innerHeight >= 560;
  const flowKids = (el: HTMLElement) =>
    ([...el.children] as HTMLElement[]).filter((c) => !['absolute', 'fixed'].includes(getComputedStyle(c).position) && c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE');

  const fit = () => {
    const secs = $$(FIT_SEL).filter((el) => !el.classList.contains('pin-spacer') && !el.querySelector('.pin-spacer') && !el.hasAttribute('data-no-fit'));
    secs.forEach((el) => { el.style.minHeight = ''; flowKids(el).forEach((k) => (k.style.zoom = '')); });
    root.classList.toggle('fit-screens', ok());
    if (!ok()) return;
    const vh = window.innerHeight;
    secs.forEach((el) => {
      el.style.minHeight = `${vh}px`;
      const cs = getComputedStyle(el);
      const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      for (let pass = 0; pass < 3 && el.offsetHeight > vh + 1; pass++) {
        const kids = flowKids(el);
        const cur = parseFloat(kids[0]?.style.zoom || '1');
        const need = ((vh - pad) / (el.offsetHeight - pad)) * cur * 0.995; // a hair under, so rounding never spills a pixel
        if (need < MIN_ZOOM) { kids.forEach((k) => (k.style.zoom = '')); break; }
        kids.forEach((k) => (k.style.zoom = need.toFixed(4)));
      }
    });
    ScrollTrigger.refresh();
  };

  fit();
  window.addEventListener('load', fit, { once: true });
  document.fonts?.ready.then(fit);
  let t = 0;
  window.addEventListener('resize', () => { clearTimeout(t); t = window.setTimeout(fit, 200); });
}

/* ---------- every page: one wheel step = one screen, up or down ----------
 * Each section that fits on screen is one stop (its top). A section taller than the screen gets extra stops one
 * screen apart, each placed at the top of the first card/row that would otherwise be cut off at the bottom edge,
 * so nothing is sliced in half; its last stop shows its end. Scrolling up walks the same stops backwards.
 * Keyboard, scrollbar and touch are untouched. */
const STEP_ITEMS = 'li, article, [data-reveal], .pcard, .card, tr, figure';
function initSectionSnap() {
  if (!lenis) return;
  const EDGE = 6;
  const NAV_CLEAR = 104; // inner stops leave room under the fixed navigation
  let busy = false;
  let coolUntil = 0;

  const innerStops = (el: HTMLElement, top: number, bottom: number, vh: number, y0: number) => {
    const out: number[] = [];
    const pinned = el.classList.contains('pin-spacer');
    const items = pinned
      ? []
      : ([...el.querySelectorAll<HTMLElement>(STEP_ITEMS)]
          .map((n) => { const r = n.getBoundingClientRect(); return { t: r.top + y0, b: r.bottom + y0, h: r.height, w: r.width }; })
          .filter((r) => r.h > 24 && r.w > 80 && r.h < vh * 0.85)
          .sort((p, q) => p.t - q.t));
    let pos = top;
    const last = bottom - vh;
    while (pos < last - EDGE) {
      const edge = pos + vh;
      // first item that starts on this screen (below the nav) but is cut at the bottom edge
      const cut = items.find((r) => r.t > pos + Math.max(NAV_CLEAR + 8, vh * 0.4) && r.t < edge && r.b > edge);
      let next = cut ? cut.t - NAV_CLEAR : pos + vh;
      if (next < pos + vh * 0.3) next = pos + vh - NAV_CLEAR; // keep each step a real screen's worth
      next = Math.min(Math.round(next), last);
      out.push(next);
      pos = next;
    }
    return out;
  };

  const stops = () => {
    const vh = window.innerHeight;
    const y0 = window.scrollY;
    const maxY = document.documentElement.scrollHeight - vh;
    // page sections in order: page header, sections, grouped screens, articles, section-styled navs, pinned sections, footer
    const els = [...document.querySelectorAll<HTMLElement>('main > header, main > section, main > [data-fit-group], main > article, main > nav.section, main > .pin-spacer, body > .footer')].filter(
      (el) => el.offsetHeight > vh * 0.45 || el.classList.contains('footer'),
    );
    const list: number[] = [];
    els.forEach((el) => {
      const top = Math.round(el.getBoundingClientRect().top + y0);
      const bottom = top + el.offsetHeight;
      list.push(Math.min(top, maxY));
      if (el.offsetHeight > vh + EDGE && !el.classList.contains('footer')) list.push(...innerStops(el, top, bottom, vh, y0));
    });
    return [...new Set(list)].sort((p, q) => p - q);
  };

  const go = (target: number) => {
    busy = true;
    lenis!.scrollTo(target, {
      duration: 1.1,
      lock: true,
      onComplete: () => {
        busy = false;
        coolUntil = performance.now() + 450; // swallow the tail of trackpad momentum
      },
    });
  };

  window.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // pinch-zoom / sideways
      if ((e.target as Element | null)?.closest?.('textarea, select, [data-no-snap]')) return;
      const swallow = () => {
        e.preventDefault();
        e.stopImmediatePropagation(); // keep Lenis from also scrolling
      };
      if (busy || performance.now() < coolUntil) return swallow();
      if (Math.abs(e.deltaY) < 4) return;

      const list = stops();
      if (!list.length) return;
      const y = window.scrollY;
      const minStep = window.innerHeight * 0.25; // ignore stops that only nudge the page (reveal animations shift items a little)
      const target = e.deltaY > 0 ? list.find((s) => s > y + minStep) : [...list].reverse().find((s) => s < y - minStep) ?? (y > EDGE && list[0] < y ? list[0] : undefined);
      if (target === undefined) return;
      swallow();
      go(target);
    },
    { passive: false, capture: true },
  );
}

/* ---------- helpers ---------- */
const mark = (el: HTMLElement) => el.classList.add('gx');

/** Depth parallax: positive speed lags behind the scroll (feels further away), negative rushes ahead (closer). */
function parallax(el: HTMLElement, speed: number, trigger: Element = el.parentElement || el) {
  mark(el);
  const dist = () => ((window.innerHeight + el.offsetHeight) / 2) * speed;
  gsap.fromTo(
    el,
    { '--py': () => `${-dist()}px` },
    { '--py': () => `${dist()}px`, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.7, invalidateOnRefresh: true } },
  );
}

/** Horizontal drift while scrolling vertically. */
function drift(el: HTMLElement, from: number, to: number, trigger: Element = el.parentElement || el) {
  mark(el);
  gsap.fromTo(el, { '--px': `${from}px` }, { '--px': `${to}px`, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
}

/* ---------- applied to every page ---------- */
function globalEffects() {
  // section headings: eyebrow, title and intro travel at different speeds (layered text)
  $$('main section header').forEach((head) => {
    if (head.closest('[data-hero], .pcard, .case, .proj')) return;
    const eyebrow = head.querySelector<HTMLElement>(':scope > .eyebrow');
    const h2 = head.querySelector<HTMLElement>(':scope > h2');
    const lead = head.querySelector<HTMLElement>(':scope > .lead');
    if (eyebrow) parallax(eyebrow, -0.16, head);
    if (h2) parallax(h2, -0.07, head);
    if (lead) parallax(lead, 0.04, head);
  });

  // photos: drift inside their frame and settle from a zoomed-in scale as they pass
  $$('.tone').forEach((frame) => {
    const trigger = frame.parentElement || frame;
    gsap.fromTo(frame, { '--par': 1, '--pz': 1.3 }, { '--par': -1, '--pz': 1.08, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  });

  // anything the markup marks with data-parallax="<speed>"
  $$('[data-parallax]').forEach((el) => parallax(el, Number(el.dataset.parallax) || 0.1));

  // inner-page header: background lags, title eases up and fades
  const phead = document.querySelector<HTMLElement>('.phead');
  if (phead) {
    gsap.fromTo(phead, { '--hp': 0 }, { '--hp': 1, ease: 'none', scrollTrigger: { trigger: phead, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // (grid column cascade removed: cards in a row stay level — they still fade in via [data-reveal])

  // the closing CTA panel rises and settles to full size
  $$('.pcta__panel').forEach((p) => {
    mark(p);
    gsap.fromTo(p, { '--ps': 0.9, '--py': '80px' }, { '--ps': 1, '--py': '0px', ease: 'none', scrollTrigger: { trigger: p.parentElement!, start: 'top bottom', end: 'center 60%', scrub: 0.8 } });
  });

  // footer surfaces from underneath the last section
  const foot = document.querySelector<HTMLElement>('.footer > .container');
  if (foot) {
    mark(foot);
    gsap.fromTo(foot, { '--py': '-90px', opacity: 0.35 }, { '--py': '0px', opacity: 1, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });
  }
}

/* ---------- homepage art direction ---------- */
function homeEffects() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 };

  // hero: layers leave at different speeds and the content dissolves into the next section
  const content = hero.querySelector<HTMLElement>('.hero__content');
  if (content) {
    mark(content);
    gsap.to(content, { '--py': '-190px', opacity: 0, ease: 'none', scrollTrigger: st });
  }
  const layer = (sel: string, y: number) => {
    const el = hero.querySelector<HTMLElement>(sel);
    if (!el) return;
    mark(el);
    gsap.to(el, { '--py': `${y}px`, ease: 'none', scrollTrigger: st });
  };
  layer('.hero__copy', 40);
  layer('.hero__ctas', 80);
  layer('.hero__micro', 120);

  // clients & tools: the marquee rows slide sideways with the scroll, in opposite directions
  $$('.marquee__track').forEach((t, i) => drift(t, i % 2 ? -160 : 160, i % 2 ? 160 : -160, t.closest('section') || t));
  $$('.tools__track').forEach((t) => drift(t, 200, -200, t.closest('section') || t));

  // solution pillars: the visual floats, scales up into view and eases back; the outline word slides across
  $$('.pillar').forEach((sec, i) => {
    const visual = sec.querySelector<HTMLElement>('.pillar__visual');
    const frame = sec.querySelector<HTMLElement>('.pillar__frame');
    const label = sec.querySelector<HTMLElement>('.pillar__frame-label');
    const text = sec.querySelector<HTMLElement>('.pillar__text');
    if (visual) parallax(visual, 0.12, sec);
    if (text) parallax(text, -0.05, sec);
    if (frame) {
      mark(frame);
      gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
        .fromTo(frame, { '--ps': 0.84 }, { '--ps': 1, ease: 'power2.out', duration: 0.45 })
        .to(frame, { '--ps': 1, duration: 0.1 })
        .to(frame, { '--ps': 0.94, ease: 'power1.in', duration: 0.45 });
    }
    if (label) drift(label, i % 2 ? -26 : 26, i % 2 ? 26 : -26, sec);
  });

  // Why AAVORAA: the compare panel opens out of a clipped window
  const rc = document.querySelector<HTMLElement>('.rc');
  if (rc) {
    mark(rc);
    gsap.fromTo(
      rc,
      { clipPath: 'inset(9% 7% 9% 7% round 28px)', '--ps': 0.94 },
      { clipPath: 'inset(0% 0% 0% 0% round 28px)', '--ps': 1, ease: 'none', scrollTrigger: { trigger: rc.parentElement!, start: 'top 85%', end: 'top 20%', scrub: 0.8 } },
    );
  }

  // WAREXX: logo settles in, the operations line slides into place
  const wx = document.querySelector<HTMLElement>('.wx');
  if (wx) {
    $$('.wx__logo', wx).forEach((logo) => {
      mark(logo);
      gsap.fromTo(logo, { '--ps': 0.82 }, { '--ps': 1, ease: 'none', scrollTrigger: { trigger: wx, start: 'top bottom', end: 'top 30%', scrub: 0.8 } });
    });
    const win = wx.querySelector<HTMLElement>('.win');
    if (win) parallax(win, 0.08, wx); // the product window floats against its copy
  }

  // enquiry: the intro and the form travel at different depths
  const enq = document.querySelector<HTMLElement>('.enq');
  if (enq) {
    const intro = enq.querySelector<HTMLElement>('.enq__intro');
    const panel = enq.querySelector<HTMLElement>('.enq__panel');
    if (intro) parallax(intro, -0.06, enq);
    if (panel) parallax(panel, 0.08, enq);
  }
  const faqHead = document.querySelector<HTMLElement>('.faq__head');
  if (faqHead) parallax(faqHead, -0.06, faqHead.parentElement!);
}

/* ---------- inner-page art direction ---------- */
function innerEffects() {
  // services overview: the outline word slides across its photo
  $$('.svc__media').forEach((m) => parallax(m, 0.12, m.closest('.svc') || m));
  $$('.wxp__visual').forEach((m) => parallax(m, 0.12, m.closest('section') || m));
  $$('.story__side, .wx.pcard').forEach((m) => parallax(m, 0.09, m.closest('section') || m));
  $$('.pa__label').forEach((w, i) => drift(w, i % 2 ? -26 : 26, i % 2 ? 26 : -26, w.closest('.svc') || w)); // outline word slides across its illustration
  // service pages: the big outline numbers move ahead of their cards
  $$('.dive__n').forEach((n) => parallax(n, -0.2, n.closest('.dive') || n));
  // solutions: each problem card scales up to full size as it arrives
  $$('.sol').forEach((s) => {
    mark(s);
    gsap.fromTo(s, { '--ps': 0.93 }, { '--ps': 1, ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 45%', scrub: 0.8 } });
  });
}

/* ---------- pinned section: the AAVORAA approach holds while its steps light up ---------- */
function pinnedEffects() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (min-height: 700px)', () => {
    const section = document.querySelector<HTMLElement>('#approach');
    const flow = section?.querySelector<HTMLElement>('[data-progress]');
    if (!section || !flow) return;
    const steps = $$('[data-step]', flow);
    flow.dataset.driven = 'gsap'; // main.ts stops driving this line while it is pinned
    const fits = () => section.offsetHeight <= window.innerHeight;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: () => (fits() ? 'center center' : 'top top'),
      end: '+=110%',
      pin: true,
      scrub: true,
      anticipatePin: 1,
      refreshPriority: 1, // measure before everything below it
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        flow.style.setProperty('--progress', p.toFixed(3));
        steps.forEach((s, i) => s.classList.toggle('is-lit', p >= (i + 0.35) / steps.length));
      },
    });
    return () => {
      trigger.kill();
      delete flow.dataset.driven;
    };
  });
}

export function initCinematic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  initSmoothScroll();
  // the pin goes first: it adds scroll distance, and triggers further down must be measured after it
  pinnedEffects();
  const mm = gsap.matchMedia();
  mm.add('(min-width: 0px)', () => {
    globalEffects();
    homeEffects();
    innerEffects();
  });
  // fonts and images change heights after load — re-measure so triggers stay accurate
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
