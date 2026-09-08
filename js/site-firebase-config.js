/* =============================================================================
   FIREBASE CONFIG (public site) — this MUST match the same project as
   erp/js/firebase-config.js, since the website reads the notices, banners,
   and event photos your admin manages from inside the ERP's "Website
   Content" page. If you ever change Firebase projects, update both files
   with the same values.

   This is safe to be public: it only allows reading content that's meant
   to be public anyway (see erp/SETUP.md's Firestore rules — cms_notices,
   cms_banners, and cms_events are all public-read, admin-write only).
   ============================================================================= */
const PUBLIC_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBM3C9QWgIxYTDSKGkkV2yKVPymu-15RdA",
  authDomain: "pacificwisdomagrotech-b8d36.firebaseapp.com",
  projectId: "pacificwisdomagrotech-b8d36",
  storageBucket: "pacificwisdomagrotech-b8d36.firebasestorage.app",
  messagingSenderId: "706520531855",
  appId: "1:706520531855:web:a50634e36e258cf48b41fa"
};
