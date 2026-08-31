/* -------------------------- 6. PAGES -------------------------- */

/** Base class every page screen extends. render() returns the HTML string
 *  for #pages; mount() runs after it's inserted (for chart.js etc). Also
 *  provides a shared search box: any page can drop searchInput(placeholder)
 *  into its header and filterList(array) before mapping rows, and typing
 *  just works — no per-page filter logic to write. */
class Page {
  constructor(app){ this.app = app; this.q = ''; this.pageKey = null; /* set by ERPApplication */ }
  render(){ return ''; }
  mount(){ Icons.refresh(); }
  get store(){ return this.app.store; }
  get user(){ return this.app.currentUser; }
  get db(){ return this.app.fb.db; }
  emptyState(icon, text){
    return `<div class="empty">${Icons.svg(icon,38)}<p>${text}</p></div>`;
  }
  /** Case-insensitive substring match across every field of each item —
   *  crude but effective, and needs zero per-page field mapping. */
  filterList(list){
    if(!this.q) return list;
    return list.filter(item => JSON.stringify(item).toLowerCase().includes(this.q));
  }
  searchInput(placeholder){
    return `<div class="search-box">${Icons.svg('search',15)}<input type="text" placeholder="${placeholder}" value="${this.q}" oninput="App.pages.${this.pageKey}.setQuery(this.value)"></div>`;
  }
  setQuery(v){
    this.q = (v||'').toLowerCase();
    this.app.router.render();
    // Re-focus + restore cursor position after the re-render replaces the input.
    requestAnimationFrame(() => {
      const el = document.querySelector('.search-box input');
      if(el){ el.focus(); el.selectionStart = el.selectionEnd = el.value.length; }
    });
  }
}
