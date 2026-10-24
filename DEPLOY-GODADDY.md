# Publishing the AAVORAA website on GoDaddy

The upload package is **`AAVORAA-website-godaddy.zip`** (in this folder). It contains the finished
website: plain HTML, CSS, JavaScript, images, plus three server files:

| File | Purpose |
|---|---|
| `.htaccess` | Apache settings: custom 404 page, compression, caching, security headers, optional HTTPS redirect |
| `contact.php` | Sends enquiry-form submissions to **info@aavoraa.com** |
| `web.config` | Only used if your GoDaddy plan is **Windows (Plesk)** hosting; ignored otherwise |

You need a GoDaddy **Web Hosting (cPanel)** plan with the domain **aavoraa.com** connected to it.
GoDaddy's "Website Builder" product cannot host a custom website like this one.

---

## 1. Upload the website

1. Log in to GoDaddy → **My Products** → next to *Web Hosting* click **Manage** → **cPanel Admin**.
2. Open **File Manager** and go into the **`public_html`** folder.
3. Click **Settings** (top right) → tick **Show Hidden Files (dotfiles)** → Save.
   (Otherwise you won't see the `.htaccess` file.)
4. If `public_html` already contains files (for example a GoDaddy placeholder `index.php` or
   `default.html`), select them and **Delete** them. Download a backup first if they matter.
5. Click **Upload** and choose `AAVORAA-website-godaddy.zip`. Wait for 100%, then go back to `public_html`.
6. Right-click the zip → **Extract** → extract into `/public_html` → **Extract Files**.
7. Check that `index.html`, `.htaccess`, `contact.php`, `_astro/`, `images/` etc. are **directly inside
   `public_html`**, not inside an extra sub-folder. Then delete the zip from the server.

Open **https://aavoraa.com** — the site should load. (DNS changes on a new domain can take a few hours.)

## 2. Turn on HTTPS (SSL)

1. In cPanel open **SSL/TLS Status** (or GoDaddy → *SSL Certificates*) and make sure **aavoraa.com** and
   **www.aavoraa.com** have an active certificate. GoDaddy cPanel plans include a free one; it can take
   up to an hour to issue.
2. When `https://aavoraa.com` opens with a padlock, edit **`.htaccess`** in File Manager and remove the
   `#` from the start of these five lines:
   ```
   # RewriteEngine On
   # RewriteCond %{HTTPS} off [OR]
   # RewriteCond %{HTTP_HOST} ^www\. [NC]
   # RewriteCond %{HTTP_HOST} ^(?:www\.)?(.+)$ [NC]
   # RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
   ```
   Save. Now `http://` and `www.` addresses redirect to `https://aavoraa.com`.
   Only do this after SSL works; enabled too early it makes the site unreachable.

## 3. Make the enquiry form deliver email

The form sends enquiries to **info@aavoraa.com** through `contact.php`.

1. Submit a test enquiry on the live site. You should see **"Thank you — your enquiry has been received."**
2. Check the info@aavoraa.com inbox **and its spam folder**.
3. **If your email is hosted somewhere else** (Microsoft 365 / GoDaddy Professional Email / Google
   Workspace): in cPanel open **Email Routing**, select aavoraa.com and choose
   **Remote Mail Exchanger**. Without this, the server tries to deliver the message to itself and it never
   reaches your real inbox.
4. If the form shows "Something went wrong…", PHP mail is disabled on the plan. The form then offers
   visitors a pre-filled email instead, so no enquiry is lost. Contact GoDaddy support to enable it, or
   point the form at another service (see "Changing settings" below).

To send enquiries to a different address, edit `RECIPIENT` at the top of `contact.php`.

## 4. Final checks

- [ ] Home page, **/work/**, **/warexx/**, **/insights/**, **/privacy/**, **/terms/** all open
- [ ] A made-up address (e.g. aavoraa.com/test) shows the AAVORAA 404 page
- [ ] Light/dark toggle, mobile menu and the hero animation work on a phone
- [ ] Test enquiry arrives in the inbox
- [ ] Padlock (HTTPS) shows in the browser, and `www.aavoraa.com` redirects to `aavoraa.com`

## 5. After launch (recommended)

- **Google Search Console**: add the property for `https://aavoraa.com` and submit
  `https://aavoraa.com/sitemap.xml`. Verifying with the HTML-tag method needs a rebuild (see below).
- **Google Analytics 4**: add the measurement ID (see below). Event tracking is already built in.
- Complete the open items in `README.md` → "Before launch — please confirm" (client permissions,
  legal pages, etc.).

---

## Updating the website later

1. Make your changes (content lives in `src/data/site.ts`).
2. In this folder run:
   ```bash
   npm run package
   ```
   This rebuilds the site and recreates `AAVORAA-website-godaddy.zip`.
3. Upload and extract it into `public_html` again (choose to overwrite existing files).

## Changing settings (booking link, analytics, form service)

Edit **`.env.production`** in this folder, then run `npm run package` and re-upload:

| Setting | What it does |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | Where the enquiry form posts. Default `/contact.php`. Can be a CRM/Formspree/HubSpot webhook URL instead. |
| `PUBLIC_BOOKING_URL` | e.g. a Calendly link. "Book a Discovery Call" buttons then open it; otherwise they scroll to the form. |
| `PUBLIC_GA4_ID` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). |
| `PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag verification code. |

## If the domain is not aavoraa.com

The site's canonical links, sitemap and social previews point to `https://aavoraa.com`. To use another
domain, change `site` in `astro.config.mjs`, `url` in `src/data/site.ts`, and the addresses in
`public/robots.txt` and `public/sitemap.xml`, then run `npm run package`.

## Windows (Plesk) hosting

If your GoDaddy plan is Windows hosting, upload the same files into `httpdocs` instead of `public_html`
using Plesk's File Manager. `web.config` handles the 404 page and file types there; `.htaccess` is
ignored. Make sure PHP is enabled for the domain so `contact.php` works.
