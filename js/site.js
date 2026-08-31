/* =============================================================================
   PACIFIC WISDOM AGROTECH — marketing site behaviour. Plain JS, no build
   step, no framework — keeps the page light and fast-loading.
   ============================================================================= */

/* ---------- Mobile nav ---------- */
function toggleMobileNav(){
  document.getElementById('mobileNav').classList.toggle('open');
}

/* ---------- Language toggle (EN / HI) ---------- */
function setLang(lang){
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('pw_site_lang', lang);
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
}
(function initLang(){
  const saved = localStorage.getItem('pw_site_lang') || 'en';
  document.addEventListener('DOMContentLoaded', () => setLang(saved));
})();

/* ---------- Banner slider ---------- */
let bannerIndex = 0;
function rotateBanner(){
  const slides = document.querySelectorAll('.banner-slide');
  if(!slides.length) return;
  slides[bannerIndex].classList.remove('active');
  bannerIndex = (bannerIndex + 1) % slides.length;
  slides[bannerIndex].classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelectorAll('.banner-slide').length){
    setInterval(rotateBanner, 5000);
  }
});

/* ---------- Animated stat counters (runs once, when scrolled into view) ---------- */
function animateCounters(){
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur + (el.dataset.suffix || '');
        if(cur < target) requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => obs.observe(c));
}
document.addEventListener('DOMContentLoaded', animateCounters);

/* ---------- WhatsApp helpers ---------- */
function waLink(text){
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
function openWhatsApp(text){ window.open(waLink(text), '_blank'); }

/* ---------- Quick inquiry form -> WhatsApp (no backend needed) ---------- */
function submitInquiry(ev){
  ev.preventDefault();
  const name = document.getElementById('inqName').value.trim();
  const phone = document.getElementById('inqPhone').value.trim();
  const message = document.getElementById('inqMessage').value.trim();
  if(!name || !phone){ alert('Please enter your name and phone number.'); return false; }
  const text = `Namaste,\nMy name is ${name} (${phone}).\n${message || 'I would like to know more about your products/services.'}`;
  openWhatsApp(text);
  return false;
}

/* ---------- Lead magnet modal (company profile download) ---------- */
function openLeadMagnet(){
  document.getElementById('leadModalBg').style.display = 'flex';
}
function closeLeadMagnet(){
  document.getElementById('leadModalBg').style.display = 'none';
}
function submitLeadMagnet(ev){
  ev.preventDefault();
  const name = document.getElementById('leadName').value.trim();
  const phone = document.getElementById('leadPhone').value.trim();
  if(!name || !phone){ alert('Please enter your name and phone number.'); return false; }
  // Let them know on WhatsApp too, so the team can follow up with a real lead.
  openWhatsApp(`Namaste,\nI just downloaded the company profile.\nName: ${name}\nPhone: ${phone}`);
  const a = document.createElement('a');
  a.href = './assets/company-profile.pdf';
  a.download = 'Pacific-Wisdom-Agrotech-Company-Profile.pdf';
  document.body.appendChild(a); a.click(); a.remove();
  closeLeadMagnet();
  return false;
}

/* ---------- Analytics (Google Analytics 4 + Meta Pixel) ----------
   Both are entirely optional — nothing loads unless you fill in an ID in
   site-config.js, so the page stays fast and clean by default. */
(function loadAnalytics(){
  if(SITE_CONFIG.gaId){
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', SITE_CONFIG.gaId);
  }
  if(SITE_CONFIG.metaPixelId){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', SITE_CONFIG.metaPixelId);
    fbq('track', 'PageView');
  }
})();

/* ---------- Populate config-driven content once DOM is ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const key = el.dataset.cfg;
    if(SITE_CONFIG[key]) el.textContent = SITE_CONFIG[key];
  });
  document.querySelectorAll('[data-cfg-href]').forEach(el => {
    const key = el.dataset.cfgHref;
    if(SITE_CONFIG[key]) el.href = SITE_CONFIG[key];
  });
  // Hide social icons / UPI button / reviews link that have no real URL yet.
  document.querySelectorAll('[data-social]').forEach(el => {
    const url = SITE_CONFIG.social[el.dataset.social];
    if(url){ el.href = url; } else { el.style.display = 'none'; }
  });
  if(!SITE_CONFIG.upiId){
    const upiBtn = document.getElementById('upiPayBtn');
    if(upiBtn) upiBtn.style.display = 'none';
  } else {
    const upiBtn = document.getElementById('upiPayBtn');
    if(upiBtn) upiBtn.href = `upi://pay?pa=${SITE_CONFIG.upiId}&pn=${encodeURIComponent(SITE_CONFIG.companyName)}&cu=INR`;
  }
});
