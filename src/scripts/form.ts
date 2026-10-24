/**
 * Enquiry form: accessible validation, loading / success / error states.
 *
 * Submission goes to PUBLIC_FORM_ENDPOINT (JSON POST) when configured.
 * Without an endpoint the form never pretends to submit — after validation it
 * explains that online submission isn't connected yet and offers a pre-filled email.
 */
import { track, getAttribution } from './analytics';

type FieldName = 'name' | 'email' | 'company' | 'interest' | 'message';

const MESSAGES: Record<FieldName, (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => string> = {
  name: (el) => (el.value.trim().length < 2 ? 'Please enter your name.' : ''),
  email: (el) => {
    const v = el.value.trim();
    if (!v) return 'Please enter your work email.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address, e.g. name@company.com.';
  },
  company: (el) => (el.value.trim().length < 2 ? 'Please enter your company name.' : ''),
  interest: (el) => (el.value ? '' : 'Please choose what you need help with.'),
  message: (el) => (el.value.length > 1500 ? 'Please keep the description under 1,500 characters.' : ''),
};

export function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-enquiry-form]');
  if (!form) return;
  const email = form.dataset.email || '';
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const wrap = form.closest<HTMLElement>('[data-form-wrap]')!;
  let started = false;

  const field = (n: FieldName) => form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  const validate = (n: FieldName) => {
    const el = field(n);
    const msg = MESSAGES[n](el);
    const err = document.getElementById(`${el.id}-error`);
    el.setAttribute('aria-invalid', String(Boolean(msg)));
    el.closest('.field')?.classList.toggle('has-error', Boolean(msg));
    if (err) err.textContent = msg;
    return !msg;
  };

  form.addEventListener('focusin', () => {
    if (!started) {
      started = true;
      track('form_start', { form: 'enquiry' });
    }
  });

  (Object.keys(MESSAGES) as FieldName[]).forEach((n) => {
    const el = field(n);
    el.addEventListener('blur', () => el.value && validate(n));
    el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && validate(n));
    el.addEventListener('change', () => el.getAttribute('aria-invalid') === 'true' && validate(n));
  });

  const counter = form.querySelector<HTMLElement>('[data-count]');
  field('message').addEventListener('input', (e) => {
    if (counter) counter.textContent = `${(e.target as HTMLTextAreaElement).value.length} / 1500`;
  });

  const setStatus = (kind: '' | 'error' | 'info', html: string) => {
    status.className = `form-status ${kind ? `form-status--${kind}` : ''}`;
    status.innerHTML = html;
  };

  const data = () => ({
    name: field('name').value.trim(),
    email: field('email').value.trim(),
    company: field('company').value.trim(),
    interest: field('interest').value,
    message: field('message').value.trim(),
    offer: (form.elements.namedItem('offer') as HTMLInputElement)?.value || '',
  });

  const mailtoHref = () => {
    const d = data();
    const body = [
      `Name: ${d.name}`,
      `Work email: ${d.email}`,
      `Company: ${d.company}`,
      `Need help with: ${d.interest}`,
      d.offer ? `Interested in: ${d.offer}` : '',
      '',
      d.message || '',
    ]
      .filter((l, i, a) => l !== '' || (i > 0 && a[i - 1] !== ''))
      .join('\n');
    return `mailto:${email}?subject=${encodeURIComponent(`Enquiry from ${d.company || d.name} — ${d.interest}`)}&body=${encodeURIComponent(body)}`;
  };

  const showSuccess = () => {
    const panel = wrap.querySelector<HTMLElement>('[data-form-success]');
    if (!panel) return;
    form.hidden = true;
    panel.hidden = false;
    panel.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');

    // Honeypot: silently ignore bots
    if ((form.elements.namedItem('website') as HTMLInputElement)?.value) return;

    const invalid = (Object.keys(MESSAGES) as FieldName[]).filter((n) => !validate(n));
    if (invalid.length) {
      track('form_validation_error', { fields: invalid.join(',') });
      setStatus('error', `Please check ${invalid.length === 1 ? 'the highlighted field' : `the ${invalid.length} highlighted fields`}.`);
      field(invalid[0]).focus();
      return;
    }

    const endpoint = form.dataset.endpoint || '';
    if (!endpoint) {
      // No backend connected: be explicit, offer a working alternative.
      setStatus(
        'info',
        `<strong>Online submission isn’t connected yet.</strong> Your details are ready to send by email instead —
         <a href="${mailtoHref()}" data-mail-fallback>open a pre-filled email to ${email}</a>.`,
      );
      status.querySelector('[data-mail-fallback]')?.addEventListener('click', () => track('form_email_fallback', { interest: data().interest }));
      status.focus();
      return;
    }

    submit.disabled = true;
    submit.classList.add('is-loading');
    form.setAttribute('aria-busy', 'true');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data(), source: 'aavoraa.com homepage', page: location.href, ...getAttribution() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track('form_submit_success', { interest: data().interest });
      showSuccess();
    } catch (err) {
      track('form_submit_error', { reason: String((err as Error).message || err).slice(0, 80) });
      setStatus(
        'error',
        `<strong>Something went wrong and your enquiry wasn’t sent.</strong> Please try again, or
         <a href="${mailtoHref()}">email us directly</a>.`,
      );
      status.focus();
    } finally {
      submit.disabled = false;
      submit.classList.remove('is-loading');
      form.removeAttribute('aria-busy');
    }
  });
}
