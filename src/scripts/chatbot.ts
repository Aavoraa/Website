/**
 * Aavo — the on-site assistant (see components/ChatBot.astro).
 * A small rule-based bot: guided menus + keyword matching for typed questions + a step-by-step enquiry.
 * The conversation is kept in sessionStorage so it survives moving between pages.
 */
import { track, getAttribution } from './analytics';

type Child = { name: string; summary: string; href: string };
type Sub = Child & { children: Child[] };
type Pillar = { key: string; label: string; short: string; href: string; subs: Sub[] };
type Data = {
  endpoint: string;
  booking: { href: string; external: boolean };
  contact: { email: string; phone: string; phoneHref: string; whatsapp: string };
  interests: string[];
  faqs: { q: string; a: string }[];
  pillars: Pillar[];
};
type Chip = { label: string; go?: string; href?: string; external?: boolean };
type Msg = { from: 'bot' | 'user'; html: string };
type Lead = { name?: string; email?: string; company?: string; interest?: string; message?: string };
type State = { open: boolean; opened: boolean; log: Msg[]; chips: Chip[]; step: string; lead: Lead };

const KEY = 'aav-chat-v1';
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2);

export function initChatBot() {
  const root = document.querySelector<HTMLElement>('[data-chatbot]');
  if (!root) return;
  const data: Data = JSON.parse(root.querySelector('[data-cb-data]')!.textContent || '{}');
  const panel = root.querySelector<HTMLElement>('[data-cb-panel]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-cb-toggle]')!;
  const logEl = root.querySelector<HTMLElement>('[data-cb-log]')!;
  const chipsEl = root.querySelector<HTMLElement>('[data-cb-chips]')!;
  const form = root.querySelector<HTMLFormElement>('[data-cb-form]')!;
  const input = root.querySelector<HTMLInputElement>('[data-cb-input]')!;

  const fresh = (): State => ({ open: false, opened: false, log: [], chips: [], step: 'idle', lead: {} });
  let st: State = fresh();
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) st = { ...fresh(), ...JSON.parse(saved) };
  } catch { /* storage unavailable — start fresh */ }
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(st)); } catch { /* ignore */ } };

  /* ---------- rendering ---------- */
  const scrollDown = () => requestAnimationFrame(() => (logEl.scrollTop = logEl.scrollHeight));
  const paintMsg = (m: Msg): HTMLElement => {
    if (m.html.startsWith('<div class="cb-cards"')) { // link cards sit outside a bubble
      logEl.insertAdjacentHTML('beforeend', m.html);
      return logEl.lastElementChild as HTMLElement;
    }
    const el = document.createElement('div');
    el.className = `cb-msg cb-msg--${m.from}`;
    el.innerHTML = m.html;
    logEl.appendChild(el);
    return el;
  };
  const paintChips = () => {
    chipsEl.innerHTML = '';
    st.chips.forEach((c) => {
      if (c.href) {
        const a = document.createElement('a');
        a.href = c.href;
        a.textContent = c.label;
        if (c.external) { a.target = '_blank'; a.rel = 'noopener'; }
        a.addEventListener('click', () => track('chatbot_link', { label: c.label }));
        chipsEl.appendChild(a);
      } else {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = c.label;
        b.addEventListener('click', () => { say(c.label); go(c.go!); });
        chipsEl.appendChild(b);
      }
    });
  };
  const repaint = () => { logEl.innerHTML = ''; st.log.forEach(paintMsg); paintChips(); scrollDown(); };

  const say = (text: string) => { const m: Msg = { from: 'user', html: esc(text) }; st.log.push(m); paintMsg(m); st.chips = []; paintChips(); scrollDown(); save(); };
  let queue = Promise.resolve();
  /** bot replies appear one after another with a short typing indicator */
  const bot = (html: string | string[], chips: Chip[] = []) => {
    const parts = Array.isArray(html) ? html : [html];
    queue = queue.then(async () => {
      let first: HTMLElement | null = null;
      for (const h of parts) {
        const t = document.createElement('div');
        t.className = 'cb-typing';
        t.innerHTML = '<i></i><i></i><i></i>';
        logEl.appendChild(t);
        scrollDown();
        await new Promise((r) => setTimeout(r, Math.min(900, 280 + h.length * 4)));
        t.remove();
        const m: Msg = { from: 'bot', html: h };
        st.log.push(m);
        const el = paintMsg(m);
        first ??= el;
        scrollDown();
      }
      st.chips = chips;
      paintChips();
      // a long reply (e.g. a list of services) is shown from its first line rather than its end
      if (first) requestAnimationFrame(() => {
        if (logEl.scrollHeight - first!.offsetTop > logEl.clientHeight) logEl.scrollTop = first!.offsetTop - 12;
      });
      save();
    });
    return queue;
  };
  const cards = (items: { name: string; summary?: string; href: string }[]) =>
    `<div class="cb-cards">${items.map((i) => `<a class="cb-card" href="${i.href}"><b>${esc(i.name)}</b>${i.summary ? `<small>${esc(i.summary)}</small>` : ''}<span aria-hidden="true">&#8599;</span></a>`).join('')}</div>`;

  /* ---------- chips used in many places ---------- */
  const MENU: Chip = { label: 'Main menu', go: 'menu' };
  const human: Chip[] = [
    { label: 'WhatsApp us', href: data.contact.whatsapp, external: true },
    { label: 'Call us', href: data.contact.phoneHref },
    { label: 'Email us', href: `mailto:${data.contact.email}?subject=${encodeURIComponent('Enquiry from the AAVORAA website')}` },
  ];

  /* ---------- conversation flows ---------- */
  const go = (where: string) => {
    track('chatbot_step', { step: where.split(':')[0] });
    const [k, arg] = where.split(':');
    switch (k) {
      case 'menu':
        st.step = 'idle';
        return bot('What would you like to do?', [
          { label: 'Explore services', go: 'services' },
          { label: 'Start a project', go: 'lead' },
          { label: 'Book a free consultation', go: 'consult' },
          { label: 'Common questions', go: 'faqs' },
          { label: 'Talk to a person', go: 'human' },
        ]);
      case 'services':
        return bot('We work across four connected capabilities. Which one are you interested in?', [
          ...data.pillars.map((p) => ({ label: p.label, go: `pillar:${p.key}` })),
          { label: 'Not sure yet', go: 'notsure' },
          MENU,
        ]);
      case 'pillar': {
        const p = data.pillars.find((x) => x.key === arg)!;
        const list = p.subs.flatMap((s) => [s, ...s.children.map((c) => ({ ...c, name: `${s.name} › ${c.name}` }))]);
        return bot([`<strong>${esc(p.label)}</strong> — ${esc(p.short)}. Here’s everything it covers:`, cards(list)], [
          { label: `Start a ${p.label} project`, go: `leadfor:${p.key}` },
          { label: `Open ${p.label} page`, href: p.href },
          { label: 'Other services', go: 'services' },
          MENU,
        ]);
      }
      case 'notsure':
        return bot(
          'No problem — most clients start with one conversation. Tell us a little about your business and we’ll suggest the first step that will move it most.',
          [{ label: 'Share my requirement', go: 'lead' }, { label: 'Book a free consultation', go: 'consult' }, MENU],
        );
      case 'consult': {
        const chips: Chip[] = [
          { label: 'Book a discovery call', href: data.booking.href, external: data.booking.external },
          ...human.slice(0, 1),
          { label: 'Send my details here', go: 'lead' },
          MENU,
        ];
        return bot('A free strategic consultation is the best way to start — 30 minutes on your goals, no obligation. How would you like to book?', chips);
      }
      case 'faqs':
        return bot('Here are the questions we hear most. Pick one:', [...data.faqs.slice(0, 8).map((f, i) => ({ label: f.q, go: `faq:${i}` })), MENU]);
      case 'faq': {
        const f = data.faqs[+arg];
        return bot(esc(f.a), [{ label: 'Another question', go: 'faqs' }, { label: 'Start a project', go: 'lead' }, MENU]);
      }
      case 'human':
        return bot(`Happy to connect you with the team.\nPhone: <a href="${data.contact.phoneHref}">${esc(data.contact.phone)}</a>\nEmail: <a href="mailto:${data.contact.email}">${esc(data.contact.email)}</a>`, [...human, MENU]);
      case 'leadfor': {
        const p = data.pillars.find((x) => x.key === arg);
        const interest = data.interests.find((i) => p && i.toLowerCase().includes(p.label.split(' ')[0].toLowerCase().slice(0, 5))) || '';
        st.lead = { interest };
        return startLead();
      }
      case 'lead':
        st.lead = {};
        return startLead();
      case 'interest':
        st.lead.interest = data.interests[+arg];
        return askMessage();
      case 'skipmsg':
        st.lead.message = '';
        return confirmLead();
      case 'send':
        return sendLead();
      case 'edit':
        return startLead();
      default:
        return go('menu');
    }
  };

  /* ---------- enquiry (lead) flow ---------- */
  const startLead = () => {
    st.step = 'name';
    return bot(['Great — I’ll take a few details and pass them straight to the team. It takes under a minute.', 'First, what’s your <strong>name</strong>?'], [{ label: 'Cancel', go: 'menu' }]);
  };
  const askMessage = () => {
    st.step = 'message';
    return bot('Anything you’d like to add — your goal, timeline or challenge? Type it below, or skip.', [{ label: 'Skip', go: 'skipmsg' }]);
  };
  const confirmLead = () => {
    st.step = 'confirm';
    const l = st.lead;
    return bot(
      `Here’s what I’ll send:\n<strong>Name:</strong> ${esc(l.name || '')}\n<strong>Email:</strong> ${esc(l.email || '')}\n<strong>Company:</strong> ${esc(l.company || '')}\n<strong>Needs help with:</strong> ${esc(l.interest || '')}${l.message ? `\n<strong>Message:</strong> ${esc(l.message)}` : ''}`,
      [{ label: 'Send to AAVORAA', go: 'send' }, { label: 'Start over', go: 'edit' }, { label: 'Cancel', go: 'menu' }],
    );
  };
  const mailtoLead = () => {
    const l = st.lead;
    const body = `Name: ${l.name}\nWork email: ${l.email}\nCompany: ${l.company}\nNeed help with: ${l.interest}\n\n${l.message || ''}`;
    return `mailto:${data.contact.email}?subject=${encodeURIComponent(`Enquiry from ${l.company || l.name} — ${l.interest}`)}&body=${encodeURIComponent(body)}`;
  };
  const sendLead = async () => {
    const l = st.lead;
    st.step = 'idle';
    const fallback: Chip[] = [
      { label: 'Send by email instead', href: mailtoLead() },
      { label: 'Send on WhatsApp', href: `${data.contact.whatsapp.split('?')[0]}?text=${encodeURIComponent(`Hi AAVORAA, I'm ${l.name} from ${l.company}. I need help with: ${l.interest}. ${l.message || ''}`)}`, external: true },
      MENU,
    ];
    if (!data.endpoint) {
      return bot('Online sending isn’t connected on this version of the site yet — but your details are ready to go. Choose how you’d like to send them:', fallback);
    }
    await bot('Sending…');
    try {
      const res = await fetch(data.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...l, message: l.message || '', offer: 'Chatbot enquiry', source: 'aavoraa.com chatbot', page: location.href, ...getAttribution() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track('form_submit_success', { form: 'chatbot', interest: l.interest || '' });
      st.lead = {};
      return bot(`Thank you, ${esc(l.name || '')}! Your enquiry has reached the AAVORAA team — we’ll reply to <strong>${esc(l.email || '')}</strong> shortly.`, [{ label: 'Explore services', go: 'services' }, ...human.slice(0, 1), MENU]);
    } catch (err) {
      track('form_submit_error', { form: 'chatbot', reason: String((err as Error).message).slice(0, 80) });
      return bot('Sorry — something went wrong and your enquiry wasn’t sent. You can send the same details another way:', fallback);
    }
  };

  /* ---------- typed input ---------- */
  const handleLeadInput = (text: string) => {
    const l = st.lead;
    if (st.step === 'name') {
      if (text.length < 2) return bot('Could you tell me your full name?');
      l.name = text; st.step = 'email';
      return bot(`Thanks, ${esc(text.split(' ')[0])}! What’s your <strong>work email</strong>?`, [{ label: 'Cancel', go: 'menu' }]);
    }
    if (st.step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) return bot('That doesn’t look like a valid email — could you check it? (e.g. name@company.com)');
      l.email = text; st.step = 'company';
      return bot('And your <strong>company name</strong>?', [{ label: 'Cancel', go: 'menu' }]);
    }
    if (st.step === 'company') {
      if (text.length < 2) return bot('Please share your company or business name.');
      l.company = text;
      if (l.interest) return askMessage();
      st.step = 'interest';
      return bot('What do you need help with?', data.interests.map((label, i) => ({ label, go: `interest:${i}` })));
    }
    if (st.step === 'interest') {
      const i = data.interests.findIndex((x) => x.toLowerCase().includes(text.toLowerCase()));
      if (i < 0) return bot('Please pick one of the options below.', data.interests.map((label, j) => ({ label, go: `interest:${j}` })));
      l.interest = data.interests[i];
      return askMessage();
    }
    if (st.step === 'message') {
      l.message = text.slice(0, 1500);
      return confirmLead();
    }
    return null;
  };

  // keyword reply for free-text questions
  const answer = (text: string) => {
    const t = text.toLowerCase();
    // whole words / phrases only, so 'posts' doesn't match 'pos' or 'facebook' match 'book'
    const padded = ` ${t.replace(/[^a-z0-9]+/g, ' ')} `;
    const has = (...k: string[]) => k.some((w) => padded.includes(` ${w} `));
    if (has('hello', 'hi', 'hey', 'vanakkam', 'good morning', 'good evening')) return go('menu');
    if (has('price', 'prices', 'pricing', 'cost', 'costs', 'budget', 'quote', 'quotation', 'charges', 'fee', 'fees', 'rate', 'rates')) return go(`faq:${data.faqs.findIndex((f) => /pric/i.test(f.q))}`);
    if (has('how long', 'timeline', 'duration', 'time take', 'weeks')) return go(`faq:${data.faqs.findIndex((f) => /how long/i.test(f.q))}`);
    if (has('whatsapp', 'call you', 'call me', 'phone', 'contact', 'talk to', 'human', 'person', 'email address', 'your email', 'number')) return go('human');
    if (has('consult', 'meeting', 'appointment', 'book', 'demo', 'discovery')) return go('consult');
    if (has('start', 'project', 'hire', 'enquiry', 'enquire', 'interested', 'need help', 'requirement')) return go('lead');
    if (has('warexx', 'warehouse', 'inventory', 'pos')) {
      return bot('WAREXX is our warehouse, inventory and POS platform — live at ESSA Garments, with 33 reports you can query in English or Tamil.', [
        { label: 'See WAREXX', href: '/warexx/' }, { label: 'Ask about WAREXX', go: 'lead' }, MENU,
      ]);
    }
    if (has('location', 'where', 'office', 'coimbatore', 'address')) return go(`faq:${data.faqs.findIndex((f) => /outside/i.test(f.q))}`);

    // service match: count meaningful words shared with each service / sub-service name (filler words ignored)
    const STOP = new Set(['need', 'want', 'looking', 'for', 'the', 'and', 'with', 'your', 'our', 'you', 'can', 'help', 'service', 'services', 'business', 'company', 'about', 'tell', 'does', 'have', 'offer', 'provide', 'any', 'get', 'how', 'what', 'who']);
    const q = words(text).filter((w) => !STOP.has(w));
    const hit = (x: string, y: string) => x === y || (x.length > 3 && y.length > 3 && (y.startsWith(x.slice(0, 5)) || x.startsWith(y.slice(0, 5))));
    let best: { score: number; item?: { name: string; summary: string; href: string } } = { score: 0 };
    data.pillars.forEach((p) =>
      [{ name: p.label, summary: p.short, href: p.href }, ...p.subs, ...p.subs.flatMap((s) => s.children)].forEach((item) => {
        const w = words(item.name);
        // short specific terms (seo, crm, pos, app…) count double — they identify a service better than long generic words
        const matched = q.filter((x) => w.some((y) => hit(x, y))).reduce((n, x) => n + (x.length <= 4 ? 2 : 1), 0);
        const score = matched + (matched ? matched / w.length / 2 : 0); // more shared words wins; ties go to the more specific name
        if (score > best.score) best = { score, item };
      }),
    );
    if (best.item && best.score >= 1) {
      return bot([`Yes — we offer <strong>${esc(best.item.name)}</strong>. ${esc(best.item.summary)}`, cards([best.item])], [
        { label: 'Start this project', go: 'lead' }, { label: 'All services', go: 'services' }, MENU,
      ]);
    }
    // FAQ match
    let bf = { score: 0, i: -1 };
    data.faqs.forEach((f, i) => {
      const w = words(f.q);
      const score = q.filter((x) => w.includes(x)).length;
      if (score > bf.score) bf = { score, i };
    });
    if (bf.score >= 2) return go(`faq:${bf.i}`);

    return bot('I’m not sure I caught that — I’m a simple assistant. Here’s what I can help with, or you can reach the team directly:', [
      { label: 'Explore services', go: 'services' }, { label: 'Start a project', go: 'lead' }, { label: 'Talk to a person', go: 'human' }, MENU,
    ]);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    say(text);
    if (handleLeadInput(text) === null) answer(text);
  });

  /* ---------- open / close ---------- */
  const setOpen = (open: boolean, focus = true) => {
    st.open = open;
    root.classList.toggle('is-open', open);
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close chat' : 'Open chat with AAVORAA');
    if (open) {
      if (!st.opened) root.classList.add('was-opened');
      st.opened = true;
      if (!st.log.length) {
        bot(['Hi, I’m <strong>Aavo</strong>, AAVORAA’s assistant.', 'I can show you our services, answer common questions or pass your requirement to the team. What would you like to do?'], [
          { label: 'Explore services', go: 'services' },
          { label: 'Start a project', go: 'lead' },
          { label: 'Book a free consultation', go: 'consult' },
          { label: 'Common questions', go: 'faqs' },
          { label: 'Talk to a person', go: 'human' },
        ]);
        track('chatbot_open', {});
      } else repaint();
      if (focus) setTimeout(() => input.focus({ preventScroll: true }), 60);
    } else if (focus) toggle.focus();
    save();
  };
  toggle.addEventListener('click', () => setOpen(!st.open));
  root.querySelector('[data-cb-close]')!.addEventListener('click', () => setOpen(false));
  root.querySelector('[data-cb-reset]')!.addEventListener('click', () => {
    st = { ...fresh(), open: true, opened: true };
    logEl.innerHTML = '';
    queue = Promise.resolve();
    setOpen(true);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.open) setOpen(false); });
  if (st.opened) root.classList.add('was-opened');
  if (st.open) setOpen(true, false);

  // other buttons on the page can open the assistant: <button data-open-chat>
  document.addEventListener('click', (e) => {
    if ((e.target as Element)?.closest?.('[data-open-chat]')) { e.preventDefault(); setOpen(true); }
  });
}
