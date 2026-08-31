# Pacific Wisdom Agrotech — Public Website + ERP

This is now **two things living together**: a public marketing website (what
visitors see first) and your ERP app tucked inside it at `/erp/` (what you
and your managers use to log in). One repo, one GitHub Pages site.

## Big change: this replaces your current repo's root

Your ERP used to be the whole site. Now the marketing website is the
homepage, and the ERP moved one level deeper. **Upload everything in this
folder to your existing repo root, replacing what's there** — the `erp/`
folder here already contains your complete, current ERP app untouched, just
relocated.

```
/                          ← marketing homepage (NEW)
  index.html
  css/site.css
  js/site.js
  js/site-config.js        ← the ONE file to edit (see below)
  assets/logo.jpg
  assets/favicon.png
  assets/company-profile.pdf
  robots.txt
  sitemap.xml
  erp/                     ← your ERP app, unchanged, just moved here
    index.html
    css/styles.css
    js/... (all the same files as before)
```

After uploading, your site works like this:
- `https://pacificwisdomagrotech.github.io/pacificwisdomagrotech/` → marketing homepage
- `https://pacificwisdomagrotech.github.io/pacificwisdomagrotech/erp/` → ERP login (also reachable via the "Login" button in the site's header)

**Nothing about your Firebase setup changes** — the ERP's `erp/js/firebase-config.js` still holds your project keys exactly as before.

## The one file to edit for your business details

Open **`js/site-config.js`** and fill in:

- `whatsappNumber` — already set from your flyer (9977096266 with country code)
- `social.facebook` / `instagram` / `twitter` / `linkedin` / `youtube` — leave blank to hide that icon until you have a real link
- `googleReviewsUrl` — currently points to a generic Google search; replace with your actual Google Business Profile review link once you have one (search "Pacific Wisdom Agrotech" on Google Maps → your listing → "Get more reviews" gives you a shareable link)
- `gaId` — your Google Analytics 4 Measurement ID (starts with `G-`), leave blank to skip analytics entirely
- `metaPixelId` — your Meta/Facebook Pixel ID, leave blank to skip
- `upiId` — your UPI ID (e.g. `yourname@okhdfcbank`) for the "Pay via UPI" button; leave blank to hide that button until you have one

## What's already working, no setup needed

- ✅ **WhatsApp button** (floating, bottom-right) and the "Send via WhatsApp" inquiry form — pre-fills a message to your WhatsApp number
- ✅ **Company profile PDF** — generated from your flyer content, downloadable via the "Company Profile" button (also captures a name+phone lead first, and pings you on WhatsApp about it)
- ✅ **Multi-language** — EN/Hindi toggle in the header, translates the main content
- ✅ **Notice bar + banner slider** — scrolling ticker up top, rotating announcement banners below the header
- ✅ **Google Map** — embedded using your address, no API key needed
- ✅ **SEO basics** — title, meta description, Open Graph tags, `robots.txt`, `sitemap.xml`
- ✅ **Fast loading** — no frameworks, minimal dependencies, images sized reasonably

## What needs your input to fully switch on

- **Google Reviews** — link is a placeholder until you add your real Google Business Profile URL
- **Social media icons** — hidden until you add real profile links
- **Google Analytics / Meta Pixel** — inactive until you add your IDs
- **UPI payment button** — hidden until you add your UPI ID

## Updating the company profile PDF later

If your flyer content changes, let me know and I'll regenerate `assets/company-profile.pdf` — just re-upload that one file afterward.

## Adding more PDFs (price lists, brochures, etc.)

Drop any PDF into the `assets/` folder and add a new `resource-item` link in
`index.html`'s Resources section (copy the existing Company Profile one as a
template) — or ask me to add it for you next time.
