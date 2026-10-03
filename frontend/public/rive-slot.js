(function () {
  const RUNTIME = 'https://unpkg.com/@rive-app/canvas';
  let loading;
  function loadRuntime() {
    if (window.rive) return Promise.resolve(window.rive);
    if (!loading) loading = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = RUNTIME; s.onload = () => res(window.rive); s.onerror = rej;
      document.head.appendChild(s);
    });
    return loading;
  }
  const reduce = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PROPS = { src: 'src', fit: 'fit', trigger: 'trigger', vmNumber: 'vm-number', bool: 'bool', vmnumber: 'vmnumber', artboard: 'artboard' };

  class RiveSlot extends HTMLElement {
    static get observedAttributes() { return Object.values(PROPS); }
    constructor() { super(); this._p = {}; }
    connectedCallback() {
      if (!this._canvas) {
        if (!this.style.display) this.style.display = 'block';
        if (!this.style.position) this.style.position = 'relative';
        if (!this.style.width) this.style.width = '100%';
        if (!this.style.height) this.style.height = '100%';
        const css = 'position:absolute;inset:0;width:100%;height:100%;display:block';
        this._knockout = this.hasAttribute('knockout');
        this._canvas = document.createElement('canvas');
        this._canvas.style.cssText = css + (this._knockout ? ';opacity:0' : '');
        this.appendChild(this._canvas);
        if (this._knockout) {
          this._out = document.createElement('canvas');
          this._out.style.cssText = css + ';pointer-events:none';
          this.appendChild(this._out);
          this._outCtx = this._out.getContext('2d', { willReadFrequently: true });
        }
      }
      this._ro = new ResizeObserver(() => this._fit());
      this._ro.observe(this);
      this._iv = setInterval(() => this._fit(), 400);
      this._io = new IntersectionObserver(([e]) => { this._visible = e.isIntersecting; if (this._visible) this._load(); else this._unload(); }, { rootMargin: '300px' });
      this._io.observe(this);
    }
    disconnectedCallback() {
      clearInterval(this._iv); this._ro.disconnect(); this._io.disconnect(); this._unload();
    }
    _unload() {
      cancelAnimationFrame(this._raf); this._raf = 0;
      if (this._r) this._r.cleanup(); this._r = null; this._loadedSrc = null; this._ready = false;
    }
    _fit() {
      if (!this._r || !this._canvas) return;
      const w = this.offsetWidth; if (!w) return;
      const zoom = this.getBoundingClientRect().width / w || 1;
      const max = this._knockout ? 2.5 : 4;
      const ratio = Math.min(max, Math.max(2, (window.devicePixelRatio || 1) * Math.max(1, zoom) * 1.25));
      const key = w + 'x' + this.offsetHeight + '@' + ratio.toFixed(2);
      if (key === this._fitKey) return;
      this._fitKey = key;
      this._r.resizeDrawingSurfaceToCanvas(ratio);
    }
    _key() {
      const src = this._canvas, out = this._out, W = src.width, H = src.height;
      if (!this._ready || !W || !H) return;
      if (out.width !== W || out.height !== H) { out.width = W; out.height = H; this._q = new Int32Array(W * H); this._seen = new Uint8Array(W * H); }
      const ctx = this._outCtx;
      ctx.clearRect(0, 0, W, H); ctx.drawImage(src, 0, 0);
      const img = ctx.getImageData(0, 0, W, H), d = img.data;
      if (d[3] < 250) { return; }
      const kr = d[0], kg = d[1], kb = d[2], TOL = 7, SOFT = 22;
      const seen = this._seen, q = this._q; seen.fill(0);
      let head = 0, tail = 0;
      const push = (i) => { if (!seen[i]) { seen[i] = 1; q[tail++] = i; } };
      for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
      for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
      while (head < tail) {
        const i = q[head++], o = i * 4;
        const dist = Math.max(Math.abs(d[o] - kr), Math.abs(d[o + 1] - kg), Math.abs(d[o + 2] - kb));
        if (dist > SOFT) continue;
        d[o + 3] = dist <= TOL ? 0 : Math.round(d[o + 3] * (dist - TOL) / (SOFT - TOL));
        if (dist > TOL) continue;
        const x = i % W;
        if (x > 0) push(i - 1); if (x < W - 1) push(i + 1);
        if (i >= W) push(i - W); if (i < W * (H - 1)) push(i + W);
      }
      ctx.putImageData(img, 0, 0);
    }
    attributeChangedCallback(name, _o, v) {
      const key0 = Object.keys(PROPS).find(k => PROPS[k] === name);
      this._set(key0 === 'vmnumber' ? 'vmNumber' : key0, v);
    }
    _set(key, v) {
      if (key === 'vmnumber') key = 'vmNumber';
      if (this._p[key] === v) return;
      this._p[key] = v;
      if (key === 'src' || key === 'fit' || key === 'artboard') this._load();
      else this._apply(key);
    }
    async _load() {
      const src = this._p.src; if (!src || !this._canvas || !this._visible) return;
      const lk = src + '|' + this._p.fit + '|' + (this._p.artboard || '');
      if (this._loadedSrc === lk) return;
      this._loadedSrc = lk;
      const R = await loadRuntime();
      if (!this._visible || this._loadedSrc !== lk) return;
      if (this._r) { this._r.cleanup(); this._r = null; }
      this._ready = false;
      const r = new R.Rive({
        src, canvas: this._canvas, autoplay: !reduce(), autoBind: this.hasAttribute('autobind') || !!this._p.vmNumber,
        ...(this._p.artboard ? { artboard: this._p.artboard } : {}),
        layout: new R.Layout({ fit: this._p.fit === 'cover' ? R.Fit.Cover : R.Fit.Contain, alignment: R.Alignment.Center }),
        onLoad: () => {
          this._fitKey = null; this._fit();
          this.contents = r.contents;
          const abs = (r.contents && r.contents.artboards) || [];
          const ab = abs.find(a => a.name === this._p.artboard) || abs[0];
          const sm = ab && ab.stateMachines && ab.stateMachines[0];
          if (sm) { this._sm = sm.name; r.play(sm.name); }
          this._ready = true; this._lastTrigger = this._p.trigger;
          if (this._knockout && !this._raf) { const loop = () => { this._key(); this._raf = requestAnimationFrame(loop); }; this._raf = requestAnimationFrame(loop); }
          this._apply('vmNumber'); this._apply('bool');
          if (this.hasAttribute('fireonload') && this._p.trigger) setTimeout(() => this._r === r && this.fire(String(this._p.trigger).split('|')[0]), 300);
          const seq = this.getAttribute('fireseq');
          if (seq) seq.split(';').forEach(part => { const [nm, cnt, ms] = part.split('|'); for (let k = 1; k <= (+cnt || 1); k++) setTimeout(() => this._r === r && this.fire(nm), k * (+ms || 600)); });
          const ht = this.getAttribute('hidetext');
          if (ht) this._hidden = ht.split(';').map(n => { try { r.setTextRunValue(n.trim(), ' '); return n + ':ok'; } catch (e) { return n + ':miss'; } });
          this.dispatchEvent(new CustomEvent('rive-ready', { detail: r.contents, bubbles: true }));
        },
        onLoadError: (e) => console.warn('rive-slot: failed to load ' + src + ' — ' + (e && (e.data || e.message || e.type) || e))
      });
      this._r = r;
    }
    inputs() { return this._r && this._sm ? this._r.stateMachineInputs(this._sm) || [] : []; }
    _input(name) { const n = (name || '').trim().toLowerCase(); const all = this.inputs(); return all.find(i => i.name.toLowerCase() === n) || all.find(i => i.name.toLowerCase().startsWith(n)); }
    fire(name) { const i = this._input(name); if (i && i.fire) i.fire(); return !!i; }
    _apply(key) {
      if (!this._ready) return;
      const v = this._p[key]; if (v == null || v === '') return;
      if (key === 'trigger') {
        if (v === this._lastTrigger) return;
        this._lastTrigger = v; this.fire(String(v).split('|')[0]);
      } else if (key === 'vmNumber') {
        String(v).split(';').forEach(pair => {
          const [k, val] = pair.split('=');
          try { const p = this._r.viewModelInstance && this._r.viewModelInstance.number(k.trim()); if (p) p.value = Number(val); } catch (e) {}
        });
      } else if (key === 'bool') {
        String(v).split(';').forEach(pair => {
          const [k, val] = pair.split('='); const i = this._input(k); if (i) i.value = val.trim() === 'true';
        });
      }
    }
  }
  Object.keys(PROPS).forEach(k => Object.defineProperty(RiveSlot.prototype, k, {
    get() { return this._p[k]; }, set(v) { this._set(k, v == null ? v : String(v)); }, configurable: true
  }));
  if (!customElements.get('rive-slot')) customElements.define('rive-slot', RiveSlot);
})();
