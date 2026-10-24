/**
 * Site-wide motion & interaction layer (progressive enhancement; everything is readable without it).
 *  - scroll progress bar + back-to-top with progress ring
 *  - section headings rise word by word
 *  - photos wipe in (their scroll parallax lives in cinematic.ts)
 *  - cursor spotlight on cards, magnetic buttons
 *  - numbers in metrics count up
 *  - staggered lists, step lines that draw, timelines that fill
 *  - scroll-spy for on-page navigation (article contents, solution chips)
 * All of it is skipped when the visitor prefers reduced motion.
 */

import { scrollToTarget } from './cinematic';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** One rAF-throttled scroll/resize loop shared by every scroll effect. */
const scrollers: (() => void)[] = [];
let queued = false;
const runScrollers = () => {
  queued = false;
  scrollers.forEach((fn) => fn());
};
const queue = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(runScrollers);
  }
};
// dev-only hook so automated checks can run the scroll effects in a paused/hidden preview
if (import.meta.env.DEV) (window as unknown as { __motionTick: () => void }).__motionTick = runScrollers;
window.addEventListener('scroll', queue, { passive: true });
window.addEventListener('resize', queue, { passive: true });

const onView = (els: Element[], cb: (el: HTMLElement) => void, opts: IntersectionObserverInit = { threshold: 0.2 }) => {
  if (!('IntersectionObserver' in window)) return els.forEach((e) => cb(e as HTMLElement));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        cb(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    });
  }, opts);
  els.forEach((e) => io.observe(e));
};

/* ---------- Scroll progress bar + back to top ---------- */
function initProgressChrome() {
  const bar = document.createElement('div');
  bar.className = 'scroll-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const top = document.createElement('button');
  top.type = 'button';
  top.className = 'to-top';
  top.setAttribute('aria-label', 'Back to top');
  top.innerHTML =
    '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="to-top__track" cx="24" cy="24" r="21"/><circle class="to-top__ring" cx="24" cy="24" r="21"/></svg>' +
    '<svg class="to-top__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  top.addEventListener('click', () => (reduce ? window.scrollTo({ top: 0 }) : scrollToTarget(0)));
  document.body.appendChild(top);

  scrollers.push(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    document.documentElement.style.setProperty('--scroll', p.toFixed(4));
    top.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.8);
  });
}

/* ---------- Headings rise word by word ---------- */
function splitHeading(h: HTMLElement) {
  if (h.dataset.split) return;
  h.dataset.split = '1';
  let i = 0;
  const wrap = (content: Node, block = false) => {
    const w = document.createElement('span');
    w.className = 'w' + (block ? ' w--block' : '');
    const inner = document.createElement('span');
    inner.className = 'w__i';
    inner.style.setProperty('--wi', String(i++));
    inner.appendChild(content);
    w.appendChild(inner);
    return w;
  };
  const frag = document.createDocumentFragment();
  [...h.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      (node.textContent || '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(' '));
        else frag.appendChild(wrap(document.createTextNode(part)));
      });
    } else if (node instanceof HTMLElement) {
      // gradient accents and other inline elements move as one unit (keeps background-clip text intact)
      const block = getComputedStyle(node).display === 'block';
      frag.appendChild(wrap(node, block));
    }
  });
  h.textContent = '';
  h.appendChild(frag);
  h.classList.add('split');
}

function initHeadings() {
  const heads = [...document.querySelectorAll<HTMLElement>('main section header h2, main section h2.ph2, .pillar h2, .wx h2, .phead h1, .pcta h2, [data-split]')].filter(
    (h) => !h.closest('[data-hero], .pcard, .case, .proj, .sol') && h.textContent!.trim().split(/\s+/).length <= 16,
  );
  heads.forEach(splitHeading);
  onView(heads, (h) => h.classList.add('split-in'), { threshold: 0.3, rootMargin: '0px 0px -5% 0px' });
}

/* ---------- Photos: wipe in, then a gentle parallax drift ---------- */
function initPhotos() {
  const photos = [...document.querySelectorAll<HTMLElement>('.tone')];
  photos.forEach((p) => p.classList.add('wipe'));
  onView(photos, (p) => {
    p.classList.add('wipe-in');
    // drop the clip once revealed so shadows and rounded corners render normally again
    p.addEventListener('transitionend', function done(e) {
      if (e.target === p && e.propertyName === 'clip-path') {
        p.classList.add('wipe-done');
        p.removeEventListener('transitionend', done);
      }
    });
  }, { threshold: 0.15 });

}

/* ---------- Cards: a soft gold spotlight follows the cursor ---------- */
function initSpotlight() {
  const cards = document.querySelectorAll<HTMLElement>('.pcard, .case, .proj, .cap-card, .stat, .entry, .ind__tile, .tool');
  cards.forEach((card) => {
    if (card.querySelector(':scope > .spot')) return;
    const glow = document.createElement('span');
    glow.className = 'spot';
    glow.setAttribute('aria-hidden', 'true');
    card.classList.add('has-spot');
    card.appendChild(glow);
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--sx', `${e.clientX - r.left}px`);
      card.style.setProperty('--sy', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Buttons lean toward the cursor ---------- */
function initMagnetic() {
  document.querySelectorAll<HTMLElement>('.btn:not([data-magnetic])').forEach((el) => {
    el.classList.add('magnet');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
      el.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    });
  });
}

/* ---------- Metric numbers count up ("250+", "60%", "52% → 84%", "~16K") ---------- */
function initMetricCount() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count-text], .case__metric strong, .result strong, .cs__metric strong, .proof__out strong, .head-stats strong, .sol__proof strong')];
  els.forEach((el) => {
    const text = el.textContent || '';
    if (!/\d/.test(text) || el.children.length) return;
    el.dataset.final = text;
  });
  onView(els.filter((e) => e.dataset.final), (el) => {
    const final = el.dataset.final!;
    const nums = [...final.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
    const t0 = performance.now();
    const dur = 1400;
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      let k = 0;
      el.textContent = final.replace(/\d+(?:\.\d+)?/g, () => String(Math.round(nums[k++] * e)));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = final;
    };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
}

/* ---------- Lists stagger in; step lines draw; timelines fill ---------- */
function initSequences() {
  document.querySelectorAll<HTMLElement>('.ticks, [data-stagger]').forEach((list) => {
    [...list.children].forEach((li, i) => (li as HTMLElement).style.setProperty('--i', String(i)));
    list.classList.add('stagger');
  });
  const seqs = [...document.querySelectorAll<HTMLElement>('.stagger, .steps, [data-draw]')];
  onView(seqs, (el) => el.classList.add('seq-in'), { threshold: 0.25 });

  // vertical timelines (case studies) fill as you read
  const lines = [...document.querySelectorAll<HTMLElement>('[data-fill]')];
  scrollers.push(() => {
    const vh = window.innerHeight;
    for (const el of lines) {
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.6 - r.top) / r.height, 0), 1);
      el.style.setProperty('--fill', p.toFixed(3));
      el.querySelectorAll<HTMLElement>(':scope > li').forEach((li) => {
        li.classList.toggle('is-lit', li.getBoundingClientRect().top < vh * 0.6);
      });
    }
  });
}

/* ---------- Scroll-spy for on-page navigation ---------- */
function initSpy() {
  document.querySelectorAll<HTMLElement>('[data-spy]').forEach((nav) => {
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;
    scrollers.push(() => {
      const line = window.innerHeight * 0.35;
      let active = -1;
      targets.forEach((t, i) => {
        if (t.getBoundingClientRect().top <= line) active = i;
      });
      links.forEach((a, i) => a.classList.toggle('is-spy', i === active));
    });
  });
}

export function initMotion() {
  initProgressChrome(); // the progress bar and back-to-top are useful even with reduced motion
  initSpy();
  if (reduce) {
    document.documentElement.classList.add('reduce-motion');
    queue();
    return;
  }
  initHeadings();
  initPhotos();
  initSequences();
  initMetricCount();
  if (finePointer) {
    initSpotlight();
    initMagnetic();
  }
  queue();
}
