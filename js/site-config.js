/* =============================================================================
   SITE CONFIG — edit these values for your business. This is the only file
   you need to touch to connect analytics, social links, WhatsApp, and
   payments for the public website (separate from the ERP app's own config
   at erp/js/firebase-config.js).
   ============================================================================= */
const SITE_CONFIG = {
  companyName: "Pacific Wisdom Agrotech Pvt. Ltd.",
  tagline: "Growing Possibilities, Powered by Technology",

  whatsappNumber: "919977096266", // country code + number, no spaces/symbols
  phone1: "9977096266",
  phone2: "8962799063",
  landline: "0731-4992312",
  email: "pwagrtech@gmail.com",
  address: "G-6, Abhiman Twins, 96 Dhanwantri Nagar, Rajendra Nagar, Indore (M.P.) 452012",

  // Leave blank ("") to hide a social icon in the footer until you have the real link.
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },

  // Replace with your actual Google Business Profile review link once you have one.
  // Until then this searches Google for the business name/address as a reasonable fallback.
  googleReviewsUrl: "https://www.google.com/search?q=Pacific+Wisdom+Agrotech+Indore+reviews",

  // Google Analytics 4 Measurement ID (starts with "G-") — leave blank to disable.
  gaId: "",
  // Meta (Facebook) Pixel ID — leave blank to disable.
  metaPixelId: "",

  // Your UPI ID for the "Pay Now" button (e.g. "yourname@okhdfcbank") — leave
  // blank to hide the button until you have one.
  upiId: "",

  // Link to the ERP login — relative path, works as-is once erp/ sits next to this file.
  erpLoginUrl: "./erp/index.html",
};
