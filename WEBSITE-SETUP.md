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
/                          ← marketing homepage
  index.html
  css/site.css
  js/site.js
  js/site-config.js        ← business settings (WhatsApp, analytics, social)
  js/site-content.js        ← notices, banners, event photos — edit often
  assets/logo.jpg
  assets/favicon.png
  assets/company-profile.pdf
  assets/events/            ← put event photos here
  robots.txt
  sitemap.xml
  erp/                     ← your ERP app, unchanged, just moved here
```

After uploading:
- `.../pacificwisdomagrotech/` → marketing homepage
- `.../pacificwisdomagrotech/erp/` → ERP login (also reachable via the "Login" button in the header)

**Nothing about your Firebase setup changes** — `erp/js/firebase-config.js` still holds your project keys exactly as before.

## Day-to-day updates: notices, banners, and event photos

This is the part you'll touch most often, and it's deliberately simple —
**one file, plain text, no HTML**: `js/site-content.js`.

### Updating the notice bar (the small scrolling strip at the top)
Open `js/site-content.js`, find `SITE_NOTICES`, and add/edit/remove lines
like this:
```
{ en: "🎉 New branch opening in Bhopal next month!", hi: "🎉 अगले महीने भोपाल में नई शाखा खुल रही है!" },
```
Each line needs an English and Hindi version. Add a comma after each line
except don't worry too much — copy an existing line and just change the text.

### Updating the banner slider (rotating strip below the header)
Same idea, under `SITE_BANNERS` in the same file.

### Adding event photos
1. Put the photo file into the `assets/events/` folder (any filename, e.g. `farmer-meet-2026.jpg`)
2. In `js/site-content.js`, under `SITE_EVENTS`, add:
```
{ image: "./assets/events/farmer-meet-2026.jpg", caption: "Farmer Training Workshop", captionHi: "किसान प्रशिक्षण कार्यशाला", date: "August 2026" },
```
3. Upload both the photo and the updated `site-content.js` — that's it, the photo appears in the new "Events & Gallery" section automatically.

**After any of these edits, you only need to re-upload `js/site-content.js`** (plus any new photo files) — nothing else changes.

## The one file for business settings

`js/site-config.js` — WhatsApp number, social media links, Google Analytics
ID, Meta Pixel ID, UPI ID, Google Reviews link. Fill in what you have; leave
the rest blank until you have real values (each hides itself automatically
when blank).

## What's already working, no setup needed

- ✅ WhatsApp floating button + inquiry form
- ✅ Company profile PDF lead magnet
- ✅ Multi-language (EN/Hindi toggle)
- ✅ Notice bar, banner slider, and events gallery (all editable via `site-content.js`)
- ✅ Google Map (using your address, no API key)
- ✅ SEO basics — meta tags, Open Graph, robots.txt, sitemap.xml
- ✅ Fast loading — no frameworks, minimal dependencies

## What needs your input to fully switch on

- Google Reviews link, social media icons, Google Analytics, Meta Pixel, UPI — all in `js/site-config.js`, all optional until filled in

## First-time upload

Upload all files in this folder, preserving the exact structure shown
above — GitHub's "Add file" screen lets you type a full path (like
`erp/js/pages/orders.js`) into the filename box, creating folders
automatically.
