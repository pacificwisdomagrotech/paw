/* =============================================================================
   SITE CONTENT — edit THIS file for day-to-day updates. No HTML or code
   knowledge needed: just add, remove, or change entries below in the same
   pattern as the examples. Re-upload only this one file when you're done.

   IMPORTANT: if you edit this file in a text editor app, make sure it saves
   as UTF-8 (not "Windows-1252" or "ANSI") — otherwise Hindi text turns into
   garbled characters like "à¤¸à¤‚". Safest option: ask Claude to make edits
   for you, or use GitHub's own web editor, which always saves as UTF-8.
   ============================================================================= */

/* ---------- 1. NOTICE BAR (the small scrolling strip at the very top) ----------
   Add or remove lines freely. Each notice needs an English and Hindi version. */
const SITE_NOTICES = [
  { en: "📢 Now serving farmers and institutions across Madhya Pradesh", hi: "📢 अब मध्य प्रदेश भर के किसानों और संस्थानों की सेवा में" },
  { en: "🌱 Quality seeds & agri-inputs, delivered reliably", hi: "🌱 गुणवत्तापूर्ण बीज और कृषि-इनपुट, भरोसेमंद डिलीवरी के साथ" },
  { en: "🤝 Open to strategic partnerships with FPOs, cooperatives & institutions", hi: "🤝 FPO, सहकारी संस्थाओं और संगठनों के साथ साझेदारी हेतु उपलब्ध" },
  // Example of how to add a new one — just copy this line, edit the text, remove the "//":
  // { en: "🎉 New branch opening in Bhopal next month!", hi: "🎉 अगले महीने भोपाल में नई शाखा खुल रही है!" },
];

/* ---------- 2. BANNER SLIDER (the rotating strip just below the header) ----------
   Same pattern as notices — add, remove, or edit lines. */
const SITE_BANNERS = [
  { en: "🌾 \"Empowering Agriculture Through Innovation, Sustainability & Strategic Partnerships\"", hi: "🌾 \"नवाचार, स्थिरता और रणनीतिक साझेदारी के माध्यम से कृषि को सशक्त बनाना\"" },
  { en: "📦 Reliable distribution network reaching every corner of agricultural India", hi: "📦 पूरे कृषि भारत तक पहुँचने वाला विश्वसनीय वितरण नेटवर्क" },
  { en: "🤝 Let's build a greener, more prosperous agriculture together", hi: "🤝 आइए मिलकर एक हरित और समृद्ध कृषि का निर्माण करें" },
];

/* ---------- 3. EVENTS & PHOTOS ----------
   To add a photo from an event:
     1. Put the image file into the assets/events/ folder (any name, e.g. "farmer-meet-2026.jpg")
     2. Add one line below pointing to it, with a caption and date
   The image shows on the site automatically — no other changes needed.

   The 7 photos below (1.jpg–7.jpg) are already in your assets/events/
   folder. I used generic captions since I don't know what each photo
   actually shows — edit the "caption" (and add "captionHi" for Hindi) on
   each line below to describe them properly; the "date" is a guess too. */
const SITE_EVENTS = [
  { image: "./assets/events/1.jpg", caption: "Event Photo 1", date: "2026" },
  { image: "./assets/events/2.jpg", caption: "Event Photo 2", date: "2026" },
  { image: "./assets/events/3.jpg", caption: "Event Photo 3", date: "2026" },
  { image: "./assets/events/4.jpg", caption: "Event Photo 4", date: "2026" },
  { image: "./assets/events/5.jpg", caption: "Event Photo 5", date: "2026" },
  { image: "./assets/events/6.jpg", caption: "Nagarjun Sagar Dam", date: "August 2026" },
  { image: "./assets/events/7.jpg", caption: "Event Photo 7", date: "2026" },
  // Example of how to add another — just copy this line, edit the text, remove the "//":
  // { image: "./assets/events/farmer-meet-2026.jpg", caption: "Farmer Training Workshop", captionHi: "किसान प्रशिक्षण कार्यशाला", date: "August 2026" },
];
