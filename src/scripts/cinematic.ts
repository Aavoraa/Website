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

/** Grid items rise into place in a column-by-column wave as the grid scrolls in. */
function cascade(grid: HTMLElement, step = 55, base = 50) {
  const kids = [...grid.children] as HTMLElement[];
  if (kids.length < 2) return;
  const colOf = (k: HTMLElement) => {
    const lefts = [...new Set(kids.map((c) => Math.round(c.offsetLeft)))].sort((a, b) => a - b);
    return Math.max(0, lefts.indexOf(Math.round(k.offsetLeft)));
  };
  kids.forEach((k) => {
    mark(k);
    gsap.fromTo(
      k,
      { '--py': () => `${base + colOf(k) * step}px` },
      { '--py': '0px', ease: 'none', scrollTrigger: { trigger: grid, start: 'top 98%', end: 'top 30%', scrub: 0.9, invalidateOnRefresh: true } },
    );
  });
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

  // grids cascade in column by column
  $$('.about__stats, .ind__grid, .projects, .inds, .bring, .reasons, .mods, .entries, .posts, .wgrid, .rel, .ch, .others, .results, .stats, .fits, .tst__grid, .ins__grid').forEach((g) => cascade(g));
  $$('.caps__grid').filter((g) => !g.closest('[data-caps]')).forEach((g) => cascade(g)); // not the homepage ribbon grid, which has its own scroll choreography

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
  layer('.hero__eyebrow', -110);
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
    const line = wx.querySelector<HTMLElement>('.flowline');
    if (line) drift(line, 120, -40, wx);
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
  $$('.svc__word').forEach((w, i) => drift(w, i % 2 ? -60 : 60, i % 2 ? 40 : -40, w.closest('.svc') || w));
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
