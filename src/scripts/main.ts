/**
 * AAVORAA — client behaviour (progressive enhancement; the page is fully usable without it).
 *  - Analytics hooks (dataLayer / GA4)
 *  - Scroll reveals, nav theme switching, active link, mobile menu
 *  - Hero scroll response, approach progress line
 *  - FAQ accordion, enquiry form
 */
import { initAnalytics, track } from './analytics';
import { initForm } from './form';
import { initHeroWave } from './hero-wave';
import { initMotion } from './motion';
import { initCinematic } from './cinematic';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));

  // Generic "in view" flag for section-level animations (diagrams, lines)
  const sio = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in-view'), sio.unobserve(e.target))),
    { threshold: 0.25 },
  );
  document.querySelectorAll('[data-inview]').forEach((el) => sio.observe(el));
}

/* ---------- Navigation ---------- */
function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  // page sections only — <html> also carries data-theme (the light/dark toggle) and must be excluded
  const sections = Array.from(document.querySelectorAll<HTMLElement>('body [data-theme]'));
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  const linkTargets = links
    .map((a) => ({ a, el: document.getElementById(a.hash.slice(1)) }))
    .filter((x): x is { a: HTMLAnchorElement; el: HTMLElement } => Boolean(x.el));

  let ticking = false;
  const update = () => {
    ticking = false;
    const probe = 40; // vertical centre of the floating pill
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
    const lightTheme = document.documentElement.dataset.theme === 'light';
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) {
        // sections marked .flip turn light in the light theme
        const t = s.dataset.theme === 'dark' && !(lightTheme && s.classList.contains('flip')) ? 'dark' : 'light';
        if (nav.dataset.navTheme !== t) nav.dataset.navTheme = t;
        break;
      }
    }
    // Active link: last target whose top passed 40% of the viewport
    const line = window.innerHeight * 0.4;
    let active: HTMLAnchorElement | null = null;
    for (const { a, el } of linkTargets) {
      const r = el.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) active = a;
    }
    links.forEach((a) => a.classList.toggle('is-active', a === active));
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // theme switches must restyle the nav immediately (not on the next frame)
  document.addEventListener('aav:themechange', update);
  update();

  // Mobile menu
  const toggle = nav.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = nav.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !panel) return;
  const label = toggle.querySelector('.sr-only');
  const setOpen = (open: boolean, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (label) label.textContent = open ? 'Close menu' : 'Open menu';
    if (open) panel.querySelector<HTMLElement>('a')?.focus();
    else if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  panel.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !nav.contains(e.target as Node)) setOpen(false);
  });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (m) => m.matches && setOpen(false));
}

/* ---------- Light / dark theme toggle (choice remembered per browser) ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!btn) return;
  const label = btn.querySelector('[data-theme-label]');
  const sync = () => {
    const light = root.dataset.theme === 'light';
    btn.setAttribute('aria-pressed', String(light));
    if (label) label.textContent = light ? 'Switch to dark theme' : 'Switch to light theme';
    btn.title = light ? 'Dark theme' : 'Light theme';
  };
  sync();
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    if (!reduceMotion) {
      root.classList.add('theme-switching');
      window.setTimeout(() => root.classList.remove('theme-switching'), 600);
    }
    if (next === 'light') root.dataset.theme = 'light';
    else delete root.dataset.theme;
    try { localStorage.setItem('aav-theme', next); } catch { /* storage unavailable */ }
    sync();
    track('theme_toggle', { theme: next });
    document.dispatchEvent(new CustomEvent('aav:themechange', { detail: { theme: next } }));
  });
}

/* ---------- Hero: background responds gently to scroll ---------- */
function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || reduceMotion) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const h = hero.offsetHeight || 1;
    const p = Math.min(Math.max(window.scrollY / h, 0), 1);
    hero.style.setProperty('--hero-p', p.toFixed(3));
  };
  window.addEventListener('scroll', () => {
    if (!ticking && window.scrollY < window.innerHeight * 1.5) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
}

/* ---------- Capabilities: the gold ribbon draws across and lights each card in turn ---------- */
function initCapsTransition() {
  const caps = document.querySelector<HTMLElement>('[data-caps]');
  const grid = caps?.querySelector<HTMLElement>('[data-caps-grid]');
  const cards = Array.from(caps?.querySelectorAll<HTMLElement>('[data-caps-card]') || []);
  if (!caps || !grid) return;
  if (reduceMotion) {
    cards.forEach((c) => c.classList.add('is-lit')); // CSS default --cards-q is 1 (ribbon fully drawn)
    return;
  }
  const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const gt = grid.getBoundingClientRect().top;
    // ribbon draws while the cards travel from 90% to 30% of the viewport height
    const q = clamp01((vh * 0.9 - gt) / (vh * 0.6));
    caps.style.setProperty('--cards-q', q.toFixed(3));
    const singleColumn = window.innerWidth <= 560;
    cards.forEach((c, i) => {
      const lit = singleColumn
        ? c.getBoundingClientRect().top < vh * 0.8
        : q >= (i + 0.55) / cards.length; // the ribbon reaches each card's centre in turn
      c.classList.toggle('is-lit', lit);
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* ---------- Progress lines (approach + process) fill as they scroll through ---------- */
function initProgress() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));
  if (!els.length) return;
  if (reduceMotion) {
    els.forEach((el) => {
      el.style.setProperty('--progress', '1');
      el.querySelectorAll('[data-step]').forEach((s) => s.classList.add('is-lit'));
    });
    return;
  }
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of els) {
      if (el.dataset.driven) continue; // pinned by cinematic.ts, which drives it from the pin's progress
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      el.style.setProperty('--progress', p.toFixed(3));
      const steps = el.querySelectorAll<HTMLElement>('[data-step]');
      steps.forEach((s, i) => s.classList.toggle('is-lit', p >= (i + 0.35) / steps.length));
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

/* ---------- About: numbers count up when they scroll into view ---------- */
function initCountUp() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (!els.length || reduceMotion || !('IntersectionObserver' in window)) return; // final values are in the HTML
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count) || 0;
    const t0 = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  els.forEach((el) => {
    el.textContent = '0';
    io.observe(el);
  });
}

/* ---------- Why AAVORAA: before/after compare slider ---------- */
function initCompare() {
  document.querySelectorAll<HTMLElement>('[data-compare]').forEach((box) => {
    const handle = box.querySelector<HTMLElement>('[data-compare-handle]');
    if (!handle) return;
    let pos = 50;
    let touched = false;
    const set = (p: number) => {
      pos = Math.min(Math.max(p, 0), 100);
      box.style.setProperty('--pos', `${pos}%`);
      handle.setAttribute('aria-valuenow', String(Math.round(pos)));
      handle.setAttribute('aria-valuetext', pos < 34 ? 'Mostly after, with AAVORAA' : pos > 66 ? 'Mostly before, disconnected' : 'Half before, half after');
    };
    const fromEvent = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };

    // drag anywhere on the panel
    box.addEventListener('pointerdown', (e) => {
      touched = true;
      box.classList.add('is-dragging');
      box.setPointerCapture(e.pointerId);
      fromEvent(e);
      track('compare_slider', { action: 'drag' });
    });
    box.addEventListener('pointermove', (e) => { if (box.classList.contains('is-dragging')) fromEvent(e); });
    const end = () => box.classList.remove('is-dragging');
    box.addEventListener('pointerup', end);
    box.addEventListener('pointercancel', end);

    // keyboard
    handle.addEventListener('keydown', (e) => {
      const stepBy = e.shiftKey ? 10 : 4;
      const keys: Record<string, number> = { ArrowLeft: -stepBy, ArrowDown: -stepBy, ArrowRight: stepBy, ArrowUp: stepBy };
      if (e.key in keys) { e.preventDefault(); touched = true; set(pos + keys[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); touched = true; set(0); }
      else if (e.key === 'End') { e.preventDefault(); touched = true; set(100); }
    });

    // one gentle demo sweep the first time it scrolls into view
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const frames = [[0, 50], [700, 22], [1700, 78], [2500, 50]];
      const t0 = performance.now();
      const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      const tick = (now: number) => {
        if (touched) return;
        const t = now - t0;
        for (let i = 1; i < frames.length; i++) {
          const [ta, pa] = frames[i - 1];
          const [tb, pb] = frames[i];
          if (t <= tb) { set(pa + (pb - pa) * ease((t - ta) / (tb - ta))); requestAnimationFrame(tick); return; }
        }
        set(50);
      };
      window.setTimeout(() => requestAnimationFrame(tick), 500);
    }, { threshold: 0.5 });
    io.observe(box);
  });
}

/* ---------- FAQ accordion ---------- */
function initAccordion() {
  // Hover (mouse / trackpad) opens an answer and moving away closes it; a click pins it open
  // (click again to close). Touch and keyboard use click / Enter as before.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls') || '');
    const item = btn.closest<HTMLElement>('.faq__item');
    if (!panel) return;
    panel.setAttribute('aria-hidden', 'true');
    let pinned = false;
    let tracked = false;
    let timer = 0;
    const setOpen = (open: boolean) => {
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', String(!open));
      if (open && !tracked) {
        tracked = true;
        track('faq_open', { question: btn.textContent?.trim().slice(0, 100) });
      }
    };
    btn.addEventListener('click', () => {
      pinned = !pinned || btn.getAttribute('aria-expanded') !== 'true';
      setOpen(pinned);
    });
    if (canHover && item) {
      item.addEventListener('pointerenter', () => {
        clearTimeout(timer);
        timer = window.setTimeout(() => setOpen(true), 90); // small delay so sweeping past doesn't flicker
      });
      item.addEventListener('pointerleave', () => {
        clearTimeout(timer);
        if (!pinned) timer = window.setTimeout(() => setOpen(false), 120);
      });
    }
  });
}

/* ---------- Entry points pre-select the enquiry topic ---------- */
/** Our Work cards: three story buttons; hovering / focusing / tapping one raises its panel above the row */
function initProjects() {
  // one shared panel height (the longest story), and per card how far the photo must shrink
  // while open so the panel sits just under the tags instead of over the title
  const grid = document.querySelector<HTMLElement>('.projects');
  const sizePanels = () => {
    if (!grid) return;
    const cards = [...grid.querySelectorAll<HTMLElement>('[data-proj]')];
    let need = 0;
    cards.forEach((card) => {
      const pop = card.querySelector<HTMLElement>('.proj__pop');
      if (!pop) return;
      const cs = getComputedStyle(pop);
      const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const panes = [...pop.querySelectorAll<HTMLElement>('.proj__pane')];
      const shown = panes.map((p) => !p.hidden);
      panes.forEach((pane) => {
        panes.forEach((p) => (p.hidden = p !== pane)); // measure each story on its own
        need = Math.max(need, pane.offsetHeight + pad);
      });
      panes.forEach((p, i) => (p.hidden = !shown[i]));
    });
    if (!need) return;
    grid.style.setProperty('--pop-h', `${Math.ceil(need)}px`);
    cards.forEach((card) => {
      const art = card.querySelector<HTMLElement>('.proj__art');
      const tags = card.querySelector<HTMLElement>('.proj__tags');
      if (!art || !tags) return;
      const artRest = card.clientWidth * 0.625;
      const tagsBottomAtRest = tags.getBoundingClientRect().bottom - card.getBoundingClientRect().top + (artRest - art.offsetHeight);
      const roomAtRest = card.clientHeight - tagsBottomAtRest;
      card.style.setProperty('--shrink', `${Math.max(0, Math.ceil(need + 10 - roomAtRest))}px`);
    });
  };
  sizePanels();
  let t = 0;
  if (grid) new ResizeObserver(() => { clearTimeout(t); t = window.setTimeout(sizePanels, 120); }).observe(grid);
  document.fonts?.ready.then(sizePanels);

  document.querySelectorAll<HTMLElement>('[data-proj]').forEach((card) => {
    const more = card.querySelector<HTMLElement>('[data-proj-more]');
    const tabs = [...card.querySelectorAll<HTMLButtonElement>('[data-proj-tab]')];
    if (!more || !tabs.length) return;

    const select = (tab: HTMLButtonElement, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const pane = document.getElementById(t.getAttribute('aria-controls') || '');
        if (pane) pane.hidden = !on;
      });
      tab.parentElement?.style.setProperty('--sel', String(tabs.indexOf(tab))); // slide the indicator
      if (focus) tab.focus();
    };

    more.addEventListener('focusout', (e) => {
      if (!more.contains(e.relatedTarget as Node)) card.classList.remove('is-open');
    });
    tabs.forEach((t, i) => {
      t.addEventListener('pointerenter', (e) => { if ((e as PointerEvent).pointerType === 'mouse') select(t); });
      // tap / click: open on that tab, or close if it is already the open one (touch screens have no hover)
      t.addEventListener('click', () => {
        const same = t.getAttribute('aria-selected') === 'true' && card.classList.contains('is-open');
        select(t);
        card.classList.toggle('is-open', !same);
        if (same) t.blur();
      });
      t.addEventListener('keydown', (e) => {
        const k = (e as KeyboardEvent).key;
        const next = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : -1;
        if (next === -1) return;
        e.preventDefault();
        select(tabs[(next + tabs.length) % tabs.length], true);
      });
    });
  });
}

function initEntryPoints() {
  const select = document.querySelector<HTMLSelectElement>('#f-interest');
  // Cross-page links can pre-select the topic: /?interest=Branding#contact
  const preset = new URLSearchParams(location.search).get('interest');
  if (select && preset && Array.from(select.options).some((o) => o.value === preset)) select.value = preset;
  document.querySelectorAll<HTMLElement>('[data-entry]').forEach((el) => {
    el.addEventListener('click', () => {
      if (select && el.dataset.entry) {
        select.value = el.dataset.entry;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const offer = document.querySelector<HTMLInputElement>('#f-offer');
      if (offer) offer.value = el.dataset.offer || '';
      setTimeout(() => document.querySelector<HTMLInputElement>('#f-name')?.focus({ preventScroll: true }), 600);
    });
  });
}

initAnalytics();
initThemeToggle();
initReveal();
initNav();
initHero();
initHeroWave();
initCapsTransition();
initProgress();
initCountUp();
initCompare();
initAccordion();
initProjects();
initEntryPoints();
initForm();
initMotion();
initCinematic();
