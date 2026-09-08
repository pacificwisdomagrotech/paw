class WebsitePage extends Page {
  render(){
    return `
    <div class="page-head"><p>Everything here updates your public website live — no code, no re-uploading files.</p></div>

    <div class="card" style="margin-bottom:20px">
      <div class="section-title">${Icons.svg('megaphone',18)} Notice Bar <span class="muted" style="font-weight:400;font-size:12.5px">(scrolling strip at the top of the site)</span></div>
      ${this._listRows('cmsNotices', this.store.cmsNotices)}
      <button class="btn btn-secondary btn-small" style="margin-top:10px" onclick="App.pages.website.openItemModal('cms_notices')">${Icons.svg('plus',15)} Add Notice</button>
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="section-title">${Icons.svg('flag',18)} Banner Slider <span class="muted" style="font-weight:400;font-size:12.5px">(rotating strip below the header)</span></div>
      ${this._listRows('cmsBanners', this.store.cmsBanners)}
      <button class="btn btn-secondary btn-small" style="margin-top:10px" onclick="App.pages.website.openItemModal('cms_banners')">${Icons.svg('plus',15)} Add Banner</button>
    </div>

    <div class="card">
      <div class="section-title">${Icons.svg('image',18)} Events &amp; Gallery Photos</div>
      ${this._eventRows()}
      <button class="btn btn-secondary btn-small" style="margin-top:10px" onclick="App.pages.website.openEventModal()">${Icons.svg('plus',15)} Add Photo</button>
    </div>`;
  }

  _listRows(storeKey, items){
    if(!items.length) return `<p class="muted" style="font-size:13px">Nothing yet — add one below.</p>`;
    return `<div style="display:grid;gap:8px">${items.map(item => `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px">
        <div style="font-size:13px;flex:1">
          <div>${item.en}</div>
          <div class="muted" style="margin-top:2px">${item.hi}</div>
        </div>
        <button class="btn btn-danger btn-small" onclick="App.pages.website.removeItem('${this._collectionFor(storeKey)}','${item.id}')">${Icons.svg('trash-2',13)}</button>
      </div>`).join('')}</div>`;
  }

  _eventRows(){
    const items = this.store.cmsEvents;
    if(!items.length) return `<p class="muted" style="font-size:13px">No photos yet — add one below.</p>`;
    return `<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px">${items.map(e => `
      <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden">
        <img src="${e.imageUrl}" style="width:100%;height:110px;object-fit:cover;display:block">
        <div style="padding:9px 10px">
          <div style="font-size:12.5px;font-weight:700">${e.caption}</div>
          <div class="muted" style="font-size:11.5px">${e.date||''}</div>
          <button class="btn btn-danger btn-small" style="width:100%;margin-top:7px" onclick="App.pages.website.removeEvent('${e.id}','${e.storagePath||''}')">${Icons.svg('trash-2',13)} Remove</button>
        </div>
      </div>`).join('')}</div>`;
  }

  _collectionFor(storeKey){ return storeKey === 'cmsNotices' ? 'cms_notices' : 'cms_banners'; }

  openItemModal(collection){
    const label = collection === 'cms_notices' ? 'Notice' : 'Banner';
    Modal.open(`<h3>Add ${label}</h3>
      <div class="field"><label>English</label><textarea id="cmsEn" rows="2" placeholder="e.g. 🎉 New branch opening in Bhopal next month!"></textarea></div>
      <div class="field"><label>Hindi</label><textarea id="cmsHi" rows="2" placeholder="e.g. 🎉 अगले महीने भोपाल में नई शाखा खुल रही है!"></textarea></div>
      <div class="row"><button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" onclick="App.pages.website.saveItem('${collection}')">Save</button></div>`);
  }
  async saveItem(collection){
    const en = document.getElementById('cmsEn').value.trim();
    const hi = document.getElementById('cmsHi').value.trim();
    if(!en || !hi) return;
    const list = collection === 'cms_notices' ? this.store.cmsNotices : this.store.cmsBanners;
    const nextOrder = list.length ? Math.max(...list.map(i=>i.order||0)) + 1 : 1;
    await this.db.collection(collection).add({ en, hi, order: nextOrder, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    await this.app.activity.log('website', `${this.user.name} added a ${collection === 'cms_notices' ? 'notice' : 'banner'}`);
    Modal.close();
  }
  async removeItem(collection, id){
    if(!confirm('Remove this?')) return;
    await this.db.collection(collection).doc(id).delete();
  }

  openEventModal(){
    Modal.open(`<h3>Add Event Photo</h3>
      <div class="field"><label>Photo</label><input id="evFile" type="file" accept="image/*"></div>
      <div class="field"><label>Caption (English)</label><input id="evCaption" placeholder="e.g. Farmer Training Workshop"></div>
      <div class="field"><label>Caption (Hindi) — optional</label><input id="evCaptionHi" placeholder="e.g. किसान प्रशिक्षण कार्यशाला"></div>
      <div class="field"><label>Date — optional</label><input id="evDate" placeholder="e.g. August 2026"></div>
      <div class="row"><button class="btn btn-ghost" onclick="Modal.close()">Cancel</button><button class="btn btn-primary" id="evSaveBtn" onclick="App.pages.website.saveEvent()">Upload &amp; Save</button></div>
      <div class="err" id="evErr"></div>`);
  }
  async saveEvent(){
    const fileInput = document.getElementById('evFile');
    const caption = document.getElementById('evCaption').value.trim();
    const captionHi = document.getElementById('evCaptionHi').value.trim();
    const date = document.getElementById('evDate').value.trim();
    const errEl = document.getElementById('evErr');
    const file = fileInput.files[0];
    if(!file || !caption){ errEl.textContent = 'Choose a photo and enter a caption.'; errEl.style.display='block'; return; }
    const btn = document.getElementById('evSaveBtn');
    btn.textContent = 'Uploading…'; btn.disabled = true;
    try{
      const path = `events/${Date.now()}_${file.name}`;
      const ref = this.app.fb.storage.ref(path);
      await ref.put(file);
      const imageUrl = await ref.getDownloadURL();
      const list = this.store.cmsEvents;
      const nextOrder = list.length ? Math.max(...list.map(i=>i.order||0)) + 1 : 1;
      await this.db.collection('cms_events').add({
        imageUrl, storagePath: path, caption, captionHi: captionHi || caption, date,
        order: nextOrder, createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      await this.app.activity.log('website', `${this.user.name} added an event photo: ${caption}`);
      Modal.close();
    }catch(e){
      errEl.textContent = 'Upload failed: ' + e.message;
      errEl.style.display = 'block';
      btn.textContent = 'Upload & Save'; btn.disabled = false;
    }
  }
  async removeEvent(id, storagePath){
    if(!confirm('Remove this photo?')) return;
    await this.db.collection('cms_events').doc(id).delete();
    if(storagePath){
      try{ await this.app.fb.storage.ref(storagePath).delete(); }catch(e){ /* file may already be gone, non-fatal */ }
    }
  }
}
