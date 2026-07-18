// @ts-nocheck
/**
 * Mission Control — animation & interaction engine.
 *
 * This is a faithful transplant of the design's original logic class (authored
 * against the claude.ai/design `DCLogic` runtime). The imperative animation code
 * (canvas starfield, scroll-driven fly-through camera, astronaut state machine,
 * boost physics, planetary descent) is preserved verbatim so behaviour matches
 * the source exactly; only the runtime seams are adapted:
 *
 *   - `DCLogic`        -> local `EngineBase` (same `setState`/`props` contract)
 *   - `React.createRef` -> local `createRef` shim (identical `{current}` shape)
 *   - report links     -> Next.js route paths (/reports/<slug>)
 *
 * `@ts-nocheck` is intentional: this is transplanted imperative DOM/canvas code,
 * not new application logic. Typing ~1600 lines of it would add risk without
 * value; the wrapper (MissionControl.tsx) and everything else stays strict.
 */

export type Ref<T> = { current: T | null };
export function createRef<T>(): Ref<T> {
  return { current: null };
}

/**
 * Minimal base that mirrors the DCLogic contract the engine relies on:
 * a mutable `state`, `props`, and a `setState(update, cb)` that merges (object
 * or functional updater; a `null`/`undefined` result is a no-op, matching
 * React) and asks the React wrapper to re-render.
 */
export class EngineBase {
  state: any = {};
  props: any = {};
  private _schedule: () => void;

  constructor(props: any, schedule: () => void) {
    this.props = props || {};
    this._schedule = schedule || (() => {});
  }

  setState(update: any, cb?: () => void) {
    const patch = typeof update === "function" ? update(this.state) : update;
    if (patch == null) {
      if (cb) cb();
      return;
    }
    this.state = { ...this.state, ...patch };
    this._schedule();
    if (cb) cb();
  }

  forceUpdate() {
    this._schedule();
  }

  componentDidMount() {}
  componentWillUnmount() {}
  renderVals(): any {
    return {};
  }
}

export class MissionControlEngine extends EngineBase {
  state = {
    bootPhase: 'lines', bootShown: 0,
    typed: 0,
    room: -1,
    seen: {},
    now: Date.now(), mountedAt: Date.now(), scrollPct: 0,
    screens: [0, 0, 0, 0],
    sel: [], phase: 'idle', outfit: [], noteIx: 0, note: '',
    prefs: ['feeding', 'waist', 'wash'],
    cards: MissionControlEngine.initialCards(),
    briefDone: [],
    tasks: MissionControlEngine.initialTasks(),
    tenant: 0,
    parts: [false, false, false, false],
    launching: false,
    warpOn: (() => { try { return sessionStorage.getItem('mc_return') !== null; } catch (e) { return false; } })(),
    warpBg: ''
  };

  canvasRef = createRef();
  canvasFxRef = createRef();
  astroRef = createRef();

  bootLines = [
    { text: 'FLIGHT OPS CONSOLE — v2.0', color: '#EDEFF7' },
    { text: 'operator ......... tobias norman · sydney', color: 'rgba(237,239,247,0.65)' },
    { text: 'mission .......... customer success → ai product', color: 'rgba(237,239,247,0.65)' },
    { text: 'scanning system .......... 4 planets found', color: 'rgba(237,239,247,0.65)' },
    { text: '  01 hatched ............. PRE-LAUNCH', color: '#FF9EB8' },
    { text: '  02 job command center .. OPERATIONAL', color: '#93A2FF' },
    { text: '  03 life hub ............ OPERATIONAL', color: '#FF9E6E' },
    { text: '  04 property platform ... DELIVERED', color: '#6EC8FF' },
    { text: 'comms ............ open to roles', color: '#4ADE80' },
    { text: 'ship damaged — 4 parts scattered across the system', color: '#FFC24B' }
  ];

  static initialCards() {
    return [
      { id: 1, title: 'AI Success Strategist', company: 'Meridian AI', s: 2, nudge: false },
      { id: 2, title: 'Forward-Deployed PM', company: 'Northcell', s: 2, nudge: true },
      { id: 3, title: 'Product Manager, AI', company: 'Argent Labs', s: 1, nudge: false },
      { id: 4, title: 'Founding PM', company: 'Helio Systems', s: 1, nudge: true },
      { id: 5, title: 'AI Product Lead', company: 'Fathomworks', s: 0, nudge: false },
      { id: 6, title: 'CS Platform PM', company: 'Quartz Collective', s: 0, nudge: false },
      { id: 7, title: 'Senior PM, Applied AI', company: 'Arcline', s: 3, nudge: false }
    ];
  }

  static initialTasks() {
    return [
      { id: 1, label: 'School run + daycare drop', time: '7:40a', done: true },
      { id: 2, label: 'hatched — send founding-cohort invites', time: '9:30a', done: false },
      { id: 3, label: 'Paediatrician follow-up call', time: '11:00a', done: false },
      { id: 4, label: 'Interview prep — product sense', time: '2:00p', done: false },
      { id: 5, label: 'Slow-cooker dinner on by 4', time: '4:00p', done: false },
      { id: 6, label: 'Evening reset — kitchen + bags', time: '8:00p', done: false }
    ];
  }

  wardrobeData = [
    { id: 'linen', name: 'Linen shirt', cat: 'top', color: '#EFE6D8' },
    { id: 'sage', name: 'Sage knit', cat: 'top', color: '#A9BCA4' },
    { id: 'midi', name: 'Rose midi', cat: 'dress', color: '#D9A1AE' },
    { id: 'denim', name: 'Straight denim', cat: 'bottom', color: '#8496AD' },
    { id: 'tee', name: 'White tee', cat: 'top', color: '#F5F1EC' },
    { id: 'skirt', name: 'Pleated skirt', cat: 'bottom', color: '#C9B8A8' },
    { id: 'trench', name: 'Trench', cat: 'layer', color: '#C8B190' },
    { id: 'sneak', name: 'White sneakers', cat: 'shoes', color: '#E9E6E0' }
  ];

  // one note per canned pool, in pool order — each describes exactly that look
  notes = [
    'Soft knit over relaxed denim for a school-run morning — sneakers keep it easy, and everything machine-washes.',
    'Comfort-first but put-together: the rose midi softened by a trench, sneakers to keep it grounded. Feeding-friendly neckline.',
    'White tee, pleated skirt, the sage over your shoulders — five-minute dressing for a big day. You already own all of it.'
  ];
  selNote = 'Styled around your picks — nothing new to buy, and it all machine-washes.';

  prefDefs = [
    { id: 'feeding', label: 'feeding-friendly necklines' },
    { id: 'waist', label: 'soft waistbands' },
    { id: 'wash', label: 'machine-washable only' },
    { id: 'dry', label: 'no dry-clean' },
    { id: 'flats', label: 'flats & sneakers first' }
  ];

  termVals = [
    'open to roles',
    'interviewing · recruiting my app\u2019s founding cohort',
    'typescript · next.js · supabase · claude code · vercel'
  ];

  stageNames = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER'];

  tenantData = [
    { name: 'Harbourline', slug: 'harbourline', tag: 'Coastal residential', letter: 'H', color: '#2563EB', hex: '#2563EB', dark: '#1E3A8A', soft: '#DBEAFE' },
    { name: 'Ashford & Co', slug: 'ashford-co', tag: 'Boutique agency', letter: 'A', color: '#0D9488', hex: '#0D9488', dark: '#134E4A', soft: '#CCFBF1' },
    { name: 'Solace Living', slug: 'solace-living', tag: 'Build-to-rent operator', letter: 'S', color: '#7C3AED', hex: '#7C3AED', dark: '#4C1D95', soft: '#EDE9FE' }
  ];

  navColors = ['#FF9EB8', '#93A2FF', '#FF9E6E', '#6EC8FF'];
  brandRGBA = ['255,158,184', '147,162,255', '255,158,110', '110,200,255'];
  tabLabels = [
    ['WARDROBE + STYLIST', 'HER PROFILE'],
    ['PIPELINE', 'MORNING BRIEF'],
    ['TODAY', 'WEEK RHYTHM'],
    ['BRAND STUDIO', 'TENANT CONFIG']
  ];

  componentDidMount() {
    // generation guard — the runtime can remount/hot-reload; stale loops, timers and observers must self-terminate
    window.__mcGen = (window.__mcGen || 0) + 1;
    this.gen = window.__mcGen;
    this.rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // returning from a mission report: tint the warp overlay with THAT planet's cloud deck
    // (the report pages store the slug in mc_return; setupFly consumes it later)
    try {
      const retSlug = sessionStorage.getItem('mc_return');
      const retIx = this.reportSlugs.indexOf(retSlug);
      if (retIx >= 0) this.state.warpBg = this.reportClouds[retIx];
    } catch (e) {}
    try {
      const p = JSON.parse(sessionStorage.getItem('mc_parts') || 'null');
      if (Array.isArray(p) && p.length === 4) this.setState({ parts: p });
    } catch (e) {}
    let seenBoot = false;
    try { seenBoot = sessionStorage.getItem('mc_boot_seen') === '1'; } catch (e) {}
    const bootOn = this.props.bootSequence ?? true;
    if (this.rm || seenBoot || !bootOn) {
      this.finishBoot();
    } else {
      this.bootTimer = setInterval(() => {
        if (this.gen !== window.__mcGen) { clearInterval(this.bootTimer); return; }
        this.setState(s => {
          const n = s.bootShown + 1;
          if (n >= this.bootLines.length) {
            clearInterval(this.bootTimer);
            this._bootFlashT = setTimeout(() => {
              this.setState({ bootPhase: 'flash' });
              this._bootFadeT = setTimeout(() => {
                this.setState({ bootPhase: 'fade' });
                this._bootDoneT = setTimeout(() => this.finishBoot(), 620);
              }, 950);
            }, 420);
          }
          return { bootShown: n };
        });
      }, 105);
    }

    this.clock = setInterval(() => {
      if (this.gen !== window.__mcGen) { clearInterval(this.clock); return; }
      this.setState({ now: Date.now() });
    }, 1000);

    this.onScroll = () => {
      this.lastUserScroll = performance.now();
      if (this.scrollRaf) return;
      this.scrollRaf = requestAnimationFrame(() => {
        this.scrollRaf = null;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
        if (pct !== this.state.scrollPct) this.setState({ scrollPct: pct });
      });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });

    this.seenObs = new IntersectionObserver((entries) => {
      if (this.gen !== window.__mcGen) { this.seenObs.disconnect(); return; }
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-screen-label');
          if (id && !this.state.seen[id]) {
            this.setState(s => ({ seen: { ...s.seen, [id]: true } }));
          }
          // no fly camera on mobile / reduced-motion — a payload section scrolling into
          // view is the moment its ship part is recovered (collectPart is idempotent)
          const roomAttr = e.target.getAttribute('data-room');
          if (roomAttr !== null && roomAttr !== '') this.collectPart(parseInt(roomAttr, 10));
          this.seenObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.14 });
    this.roomObs = new IntersectionObserver((entries) => {
      if (this.gen !== window.__mcGen) { this.roomObs.disconnect(); return; }
      entries.forEach(e => {
        const idx = parseInt(e.target.getAttribute('data-room'), 10);
        if (e.isIntersecting) {
          if (this.state.room !== idx) this.setState({ room: idx });
          this.collectPart(idx);
        } else if (this.state.room === idx) {
          this.setState({ room: -1 });
        }
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    document.querySelectorAll('[data-screen-label]').forEach(el => this.seenObs.observe(el));
    document.querySelectorAll('[data-room]').forEach(el => this.roomObs.observe(el));
    this.perchEls = Array.from(document.querySelectorAll('[data-astro-perch]'));

    // fly-through camera: measure + engage, re-measure when fonts land or the window resizes
    this.setupFly();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (this.gen === window.__mcGen) this.setupFly(); });
    this._flyReT = setTimeout(() => { if (this.gen === window.__mcGen) this.setupFly(); }, 1800);
    this.onResize = () => {
      if (this.gen !== window.__mcGen) { window.removeEventListener('resize', this.onResize); return; }
      clearTimeout(this._rsT);
      this._rsT = setTimeout(() => { if (this.gen === window.__mcGen) this.setupFly(); }, 260);
    };
    window.addEventListener('resize', this.onResize);
    this.flyNav = (e) => {
      if (this.gen !== window.__mcGen) { document.removeEventListener('click', this.flyNav, true); return; }
      if (!this.flyOn || !this.flyMap) return;
      const aEl = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!aEl) return;
      const id = aEl.getAttribute('href').slice(1);
      const tgt = id ? document.getElementById(id) : null;
      if (!tgt) return;
      const mi = this.flyMap.findIndex(mm => mm.el === tgt || mm.el.contains(tgt));
      if (mi < 0) return;
      e.preventDefault();
      this.boost = 0;
      this.startFlight(this.flyMap[mi].readStart, mi);
    };
    document.addEventListener('click', this.flyNav, true);
    this.onWheel = (e) => {
      if (this.gen !== window.__mcGen) { window.removeEventListener('wheel', this.onWheel); return; }
      if (!this.flyOn || !this.flyMap) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // let horizontal scrolls (demo boards) through
      e.preventDefault();
      this.lastUserScroll = performance.now();
      this.flyInput(Math.max(-160, Math.min(160, e.deltaY)));
    };
    window.addEventListener('wheel', this.onWheel, { passive: false });
    this.onTouchStart = (e) => { this._ty = e.touches && e.touches[0] ? e.touches[0].clientY : null; };
    this.onTouchMove = (e) => {
      if (this.gen !== window.__mcGen) { window.removeEventListener('touchmove', this.onTouchMove); return; }
      if (!this.flyOn || this._ty === null || this._ty === undefined || !e.touches || !e.touches[0]) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      this.lastUserScroll = performance.now();
      this.flyInput(this._ty - y);
      this._ty = y;
    };
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    this.onKeys = (e) => {
      if (this.gen !== window.__mcGen) { window.removeEventListener('keydown', this.onKeys); return; }
      if (!this.flyOn) return;
      const jump = { ArrowDown: 90, PageDown: 380, ' ': 380, ArrowUp: -90, PageUp: -380 }[e.key];
      if (jump === undefined) return;
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
      e.preventDefault();
      this.lastUserScroll = performance.now();
      this.flyInput(jump);
    };
    window.addEventListener('keydown', this.onKeys);
    // prefetch ALL report pages during idle so every dive lands on a warm cache — no loading stall
    this._prefetchT = setTimeout(() => {
      if (this.gen !== window.__mcGen) return;
      ['/reports/hatched', '/reports/job-command-center', '/reports/life-hub', '/reports/property-platform'].forEach(u => { try { fetch(u).catch(() => {}); } catch (e) {} });
    }, 4000);
    // click empty space → the astronaut flies there (with his usual orbits/slaloms/bumps on the way)
    this.onFreeClick = (e) => {
      if (this.gen !== window.__mcGen) { document.removeEventListener('click', this.onFreeClick); return; }
      if (this.rm || window.innerWidth < 880 || !this.astro || e.defaultPrevented) return;
      // only truly empty space: skip links, buttons, form fields, and anything with a pointer cursor (demo tiles etc.)
      let n = e.target;
      while (n && n.nodeType === 1 && n !== document.body) {
        const tag = n.tagName;
        if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'LABEL') return;
        try { if ((getComputedStyle(n).cursor || '').includes('pointer')) return; } catch (er) {}
        n = n.parentElement;
      }
      const el2 = (this._astroEl && document.contains(this._astroEl)) ? this._astroEl : this.astroRef.current;
      if (!el2) return;
      // drop an invisible landing beacon at the click point (clamped into his comfortable band)
      if (!this._clickMark || !document.contains(this._clickMark)) {
        this._clickMark = document.createElement('div');
        this._clickMark.setAttribute('data-astro-beacon', '');
        this._clickMark.style.cssText = 'position:fixed;width:46px;height:6px;pointer-events:none;z-index:5;';
        document.body.appendChild(this._clickMark);
      }
      this._clickMark.style.left = (e.clientX - 23) + 'px';
      this._clickMark.style.top = Math.max(80, Math.min(window.innerHeight * 0.76, e.clientY)) + 'px';
      // pink landing-beacon pulse — shows where he's headed
      if (!this.rm) {
        const bp = document.createElement('div');
        bp.style.cssText = 'position:fixed;left:' + (e.clientX - 17) + 'px;top:' + (Math.max(80, Math.min(window.innerHeight * 0.76, e.clientY)) - 14) + 'px;width:34px;height:34px;border:2px solid rgba(255,110,199,0.9);border-radius:50%;pointer-events:none;z-index:400;animation:mc-click-target 1.1s ease-out forwards;';
        document.body.appendChild(bp);
        setTimeout(() => { try { bp.remove(); } catch (er) {} }, 1160);
      }
      const a = this.astro;
      a.perch = this._clickMark;
      a.plan = null;
      if (a.mode !== 'fly') {
        a.mode = 'fly'; a.modeAt = performance.now();
        a.vx = (Math.random() - 0.5) * 3; a.vy = -(0.9 + Math.random() * 1.2);
        a.wobblePh = Math.random() * Math.PI * 2; a.wobbleAmp = 0.4 + Math.random() * 1.2;
        a.flightDist = 0; a.depthDir = undefined;
        el2.setAttribute('data-flying', '1'); el2.setAttribute('data-idle', '0'); el2.setAttribute('data-landing', '0'); el2.setAttribute('data-perched', '0');
      }
      this.makePlan(a);
    };
    document.addEventListener('click', this.onFreeClick);
    // every click gets a small cyan pulse — interaction is always acknowledged
    this.onRipple = (e) => {
      if (this.gen !== window.__mcGen) { document.removeEventListener('click', this.onRipple, true); return; }
      if (this.rm) return;
      const rp = document.createElement('div');
      rp.style.cssText = 'position:fixed;left:' + (e.clientX - 15) + 'px;top:' + (e.clientY - 15) + 'px;width:30px;height:30px;border:2px solid rgba(52,224,255,0.9);border-radius:50%;pointer-events:none;z-index:400;animation:mc-click-ring 0.5s ease-out forwards;';
      document.body.appendChild(rp);
      setTimeout(() => { try { rp.remove(); } catch (er) {} }, 540);
    };
    document.addEventListener('click', this.onRipple, true);

    this.initStars();
    this.syncSlideInert();
  }

  componentWillUnmount() {
    // full teardown of everything mount/setupFly created — the generation guard stays
    // as belt-and-braces, but nothing should be left running on the window/document
    [this.bootTimer, this.typeTimer, this.clock].forEach(t => t && clearInterval(t));
    [this._bootFlashT, this._bootFadeT, this._bootDoneT, this._flyReT, this._rsT,
     this._prefetchT, this._warpT, this._retT, this._diveEndT, this._goWarpT, this._goNavT,
     this._styleT].forEach(t => t && clearTimeout(t));
    if (this._partPending) { Object.keys(this._partPending).forEach(k => clearTimeout(this._partPending[k])); this._partPending = null; }
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.scrollRaf) { cancelAnimationFrame(this.scrollRaf); this.scrollRaf = null; }
    if (this.seenObs) this.seenObs.disconnect();
    if (this.roomObs) this.roomObs.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('keydown', this.onKeys);
    document.removeEventListener('click', this.flyNav, true);
    document.removeEventListener('click', this.onFreeClick);
    document.removeEventListener('click', this.onRipple, true);
    if (this._clickMark) { try { this._clickMark.remove(); } catch (e) {} this._clickMark = null; }
    if (this.cleanupStars) this.cleanupStars();
  }

  finishBoot() {
    try { sessionStorage.setItem('mc_boot_seen', '1'); } catch (e) {}
    this.setState({ bootPhase: 'gone', bootShown: this.bootLines.length });
    const total = this.termVals.join('').length;
    if (this.rm) {
      this.setState({ typed: total });
    } else {
      this.typeTimer = setInterval(() => {
        if (this.gen !== window.__mcGen) { clearInterval(this.typeTimer); return; }
        this.setState(s => {
          if (s.typed >= total) { clearInterval(this.typeTimer); return null; }
          return { typed: Math.min(total, s.typed + 2) };
        });
      }, 30);
    }
  }

  initStars() {
    const c = this.canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const c2 = this.canvasFxRef ? this.canvasFxRef.current : null;
    // purely decorative starfield layers — keep them out of the accessibility tree
    c.setAttribute('aria-hidden', 'true');
    if (c2) c2.setAttribute('aria-hidden', 'true');
    const ctx2 = c2 ? c2.getContext('2d') : ctx;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const colors = ['#FF6EC7', '#9B7CFF', '#34E0FF'];
    let W = 0, H = 0, stars = [], streak = null, lastStreak = 0;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (c2) { c2.width = W * dpr; c2.height = H * dpr; ctx2.setTransform(dpr, 0, 0, dpr, 0, 0); }
      const count = W < 880 ? 46 : 120;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        z: 0.25 + Math.random() * 0.75,
        r: 0.4 + Math.random() * 1.1,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 1.2,
        col: Math.random() < 0.12 ? colors[Math.floor(Math.random() * 3)] : null
      }));
    };
    resize();
    window.addEventListener('resize', resize);
    let mx = 0.5, my = 0.5, cmx = 0.5, cmy = 0.5;
    const onMouse = (e) => { mx = e.clientX / W; my = e.clientY / H; };
    window.addEventListener('mousemove', onMouse, { passive: true });
    let hidden = false;
    const onVis = () => { hidden = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        ctx.globalAlpha = 0.5 * s.z;
        ctx.fillStyle = s.col || '#C9D2F0';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    if (this.rm) { drawStatic(); if (this.astroRef.current) this.astroRef.current.style.display = 'none'; this.cleanupStars = () => { window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouse); document.removeEventListener('visibilitychange', onVis); }; return; }

    const gen = this.gen;
    const loop = (t) => {
      if (gen !== window.__mcGen) return; // a newer mount took over — stop this loop entirely
      this.raf = requestAnimationFrame(loop);
      if (hidden) return;
      cmx += (mx - cmx) * 0.04; cmy += (my - cmy) * 0.04;
      ctx.clearRect(0, 0, W, H);
      if (ctx2 !== ctx) ctx2.clearRect(0, 0, W, H);
      // hyperdrive: while the boost flight is running, stars stretch into radial streaks and race outward
      let warp = 0;
      if (this.flight) {
        const ft = Math.min(1, (t - this.flight.t0) / this.flight.dur);
        warp = Math.sin(Math.PI * ft);
      }
      const wcx = W / 2, wcy = H * 0.42;
      stars.forEach(s => {
        const ox = (cmx - 0.5) * 30 * s.z, oy = (cmy - 0.5) * 22 * s.z;
        const a = (0.28 + 0.42 * (0.5 + 0.5 * Math.sin(t * 0.0011 * s.sp + s.ph))) * s.z;
        const px = s.x + ox, py = s.y + oy;
        if (warp > 0.02) {
          const rdx = px - wcx, rdy = py - wcy;
          const L2 = Math.hypot(rdx, rdy) || 1;
          const len = warp * (0.12 + s.z) * L2 * 0.22 + warp * 6;
          ctx.globalAlpha = Math.min(1, a + warp * 0.55);
          ctx.strokeStyle = s.col || (warp > 0.5 ? '#BFE9FF' : '#C9D2F0');
          ctx.lineWidth = s.r * (1 + warp * 0.7);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + (rdx / L2) * len, py + (rdy / L2) * len);
          ctx.stroke();
          // stars genuinely race past the camera, respawning near the jump point
          s.x += (rdx / L2) * warp * (2 + 11 * s.z);
          s.y += (rdy / L2) * warp * (2 + 11 * s.z) * 0.7;
          if (s.x < -40 || s.x > W + 40 || s.y < -40 || s.y > H + 40) {
            s.x = wcx + (Math.random() - 0.5) * W * 0.35;
            s.y = wcy + (Math.random() - 0.5) * H * 0.35;
          }
        } else {
          ctx.globalAlpha = a;
          ctx.fillStyle = s.col || '#C9D2F0';
          ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI * 2); ctx.fill();
        }
      });
      if (warp > 0.05) {
        // jump-point glow
        ctx.globalAlpha = warp * 0.3;
        const wg = ctx.createRadialGradient(wcx, wcy, 0, wcx, wcy, Math.min(W, H) * 0.4);
        wg.addColorStop(0, 'rgba(191,233,255,0.9)');
        wg.addColorStop(0.4, 'rgba(155,124,255,0.35)');
        wg.addColorStop(1, 'rgba(155,124,255,0)');
        ctx.fillStyle = wg;
        ctx.beginPath(); ctx.arc(wcx, wcy, Math.min(W, H) * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      // asteroids & force fields draw on the NEAR-FIELD canvas — above the planets, below the pages
      { const ctx = ctx2;
      ctx.globalAlpha = 1;
      if (!this.asteroids) this.asteroids = [];
      if (t - (this.lastAst || 0) > 9000 + Math.random() * 8000 && this.asteroids.length < 2) {
        this.lastAst = t;
        const fromLeft = Math.random() < 0.5;
        const ar = 9 + Math.random() * 9;
        this.asteroids.push({
          x: fromLeft ? -50 : W + 50, y: H * (0.12 + Math.random() * 0.55),
          vx: (fromLeft ? 1 : -1) * (2.2 + Math.random() * 2), vy: (Math.random() - 0.4) * 0.9,
          r: ar, rot: 0, vr: (Math.random() - 0.5) * 0.06,
          verts: Array.from({ length: 8 }, () => ar * (0.72 + Math.random() * 0.5))
        });
      }
      this.asteroids = this.asteroids.filter(as => as.x > -90 && as.x < W + 90 && as.y > -90 && as.y < H + 90);
      this.asteroids.forEach(as => {
        as.x += as.vx; as.y += as.vy; as.rot += as.vr;
        ctx.save(); ctx.translate(as.x, as.y); ctx.rotate(as.rot);
        ctx.fillStyle = '#5E6378'; ctx.strokeStyle = '#8B90A8'; ctx.lineWidth = 1;
        ctx.beginPath();
        as.verts.forEach((vr2, i) => {
          const an = (i / as.verts.length) * Math.PI * 2;
          const px = Math.cos(an) * vr2, py = Math.sin(an) * vr2;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(5,7,13,0.35)';
        ctx.beginPath(); ctx.arc(as.r * 0.25, -as.r * 0.15, as.r * 0.28, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      // solid widgets — asteroids bounce off them and raise a force field
      if (!this.solidEls || this.solidEls.length === 0 || !document.contains(this.solidEls[0])) this.solidEls = Array.from(document.querySelectorAll('[data-solid]'));
      if (!this.dents) this.dents = [];
      // hidden camera pages still have layout rects — only VISIBLE widgets are solid
      const sOK = (elm) => {
        if (!this.flyOn || !elm.closest) return true;
        const fs = elm.closest('[data-fly-sec]');
        if (!fs) return true;
        return fs.style.visibility !== 'hidden' && parseFloat(fs.style.opacity || '1') > 0.5;
      };
      this.asteroids.forEach(as => {
        if (as.cool && t < as.cool) return;
        for (const s of this.solidEls) {
          if (!sOK(s)) continue;
          const r2 = s.getBoundingClientRect();
          if (!r2.width || r2.bottom < -20 || r2.top > H + 20) continue;
          const cx2 = Math.max(r2.left, Math.min(as.x, r2.right));
          const cy2 = Math.max(r2.top, Math.min(as.y, r2.bottom));
          const ddx = as.x - cx2, ddy = as.y - cy2;
          if (Math.hypot(ddx, ddy) < as.r) {
            if (Math.abs(ddx) > Math.abs(ddy)) { as.vx = -as.vx * 0.75; as.x = cx2 + (ddx >= 0 ? 1 : -1) * (as.r + 1); }
            else { as.vy = (Math.abs(as.vy) < 0.3 ? -1.1 : -as.vy * 0.75); as.y = cy2 + (ddy >= 0 ? 1 : -1) * (as.r + 1); as.vx *= 0.9; }
            as.vr = -as.vr * 1.5;
            as.cool = t + 400;
            if (this.dents.length < 6) this.dents.push({ el: s, ox: cx2 - r2.left, oy: cy2 - r2.top, t0: t, r: as.r });
            break;
          }
        }
      });
      // force field: a hex shield pops up at the impact point, then fades
      this.dents = this.dents.filter(d => t - d.t0 < 1000);
      this.dents.forEach(d => {
        if (!sOK(d.el)) return;
        const r2 = d.el.getBoundingClientRect();
        if (!r2.width) return;
        const age = t - d.t0;
        const env = age < 130 ? age / 130 : Math.max(0, 1 - (age - 130) / 870);
        const grow = 1 + 0.22 * Math.min(1, age / 320);
        const dx3 = r2.left + d.ox, dy3 = r2.top + d.oy;
        const hs = Math.max(9, d.r * 0.6) * grow;
        // energy flash at contact
        if (age < 240) {
          ctx.globalAlpha = (1 - age / 240) * 0.8;
          const g2 = ctx.createRadialGradient(dx3, dy3, 0, dx3, dy3, hs * 2.2);
          g2.addColorStop(0, 'rgba(214,236,255,0.95)'); g2.addColorStop(0.4, 'rgba(52,224,255,0.55)'); g2.addColorStop(1, 'rgba(52,224,255,0)');
          ctx.fillStyle = g2;
          ctx.beginPath(); ctx.arc(dx3, dy3, hs * 2.2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.lineJoin = 'round';
        const hex = (cx3, cy3, rr, aMul) => {
          ctx.globalAlpha = Math.max(0, env * aMul);
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const an = Math.PI / 6 + k * Math.PI / 3;
            const X = cx3 + Math.cos(an) * rr, Y = cy3 + Math.sin(an) * rr;
            if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(52,224,255,0.1)'; ctx.fill();
          ctx.strokeStyle = '#34E0FF'; ctx.lineWidth = 1.3; ctx.stroke();
        };
        hex(dx3, dy3, hs, 0.95);
        for (let k = 0; k < 6; k++) {
          const an = k * Math.PI / 3;
          hex(dx3 + Math.cos(an) * hs * 1.74, dy3 + Math.sin(an) * hs * 1.74, hs, 0.45 * (1 - age / 1000));
        }
        // the field wraps the WIDGET — its rounded outline lights up, not a bubble
        const pad2 = 5 + 3 * Math.min(1, age / 320);
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(r2.left - pad2, r2.top - pad2, r2.width + pad2 * 2, r2.height + pad2 * 2, 18);
        else ctx.rect(r2.left - pad2, r2.top - pad2, r2.width + pad2 * 2, r2.height + pad2 * 2);
        ctx.globalAlpha = env * 0.9;
        ctx.strokeStyle = '#34E0FF'; ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.globalAlpha = env * 0.3;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(110,200,255,0.8)';
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      } // end near-field canvas
      if (!streak && t - lastStreak > 6500 + Math.random() * 3500) {
        streak = { x: Math.random() * W * 0.7 + W * 0.15, y: Math.random() * H * 0.3, vx: 4.5 + Math.random() * 3, vy: 1.6 + Math.random() * 1.2, life: 1 };
        lastStreak = t;
      }
      if (streak) {
        streak.x += streak.vx; streak.y += streak.vy; streak.life -= 0.016;
        if (streak.life <= 0) { streak = null; }
        else {
          const g = ctx.createLinearGradient(streak.x - streak.vx * 12, streak.y - streak.vy * 12, streak.x, streak.y);
          g.addColorStop(0, 'rgba(52,224,255,0)');
          g.addColorStop(1, 'rgba(52,224,255,' + (0.55 * streak.life).toFixed(3) + ')');
          ctx.strokeStyle = g; ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.moveTo(streak.x - streak.vx * 12, streak.y - streak.vy * 12); ctx.lineTo(streak.x, streak.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      this.updateFly();
      this.updateAstro();
      this.updatePlanets();
    };
    this.raf = requestAnimationFrame(loop);
    this.cleanupStars = () => { window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouse); document.removeEventListener('visibilitychange', onVis); };
  }

  setupFly() {
    const secs = Array.from(document.querySelectorAll('[data-fly-sec]'));
    const spacer = document.querySelector('[data-fly-spacer]');
    if (!secs.length) return;
    const reset = (s) => {
      s.style.position = ''; s.style.top = ''; s.style.left = ''; s.style.right = '';
      s.style.transform = ''; s.style.opacity = ''; s.style.visibility = '';
      s.style.zIndex = ''; s.style.filter = ''; s.style.pointerEvents = ''; s.style.willChange = '';
    };
    const hd = document.querySelector('[data-screen-label="HUD bar"]');
    if (this.rm || window.innerWidth < 880) {
      secs.forEach(reset);
      if (spacer) spacer.style.height = '0px';
      if (hd) { hd.style.position = ''; hd.style.left = ''; hd.style.right = ''; hd.style.zIndex = ''; }
      this.flyOn = false; this.flyMap = null;
      // resizing back under 880px after fly mode ran: fly mode disconnected the seen/room
      // observers, which would leave sections unrevealed and ship parts uncollectible —
      // reconnect them here. observe() is a no-op for already-observed targets, so the
      // initial (never-flew) pass through this branch can't double-observe.
      if (this.seenObs) document.querySelectorAll('[data-screen-label]').forEach(el => this.seenObs.observe(el));
      if (this.roomObs) document.querySelectorAll('[data-room]').forEach(el => this.roomObs.observe(el));
      // no fly camera here, but a report return must still consume its marker and lift the
      // warp overlay — otherwise it covers the page forever on mobile / reduced-motion
      let mret = null;
      try { mret = sessionStorage.getItem('mc_return'); if (mret !== null) sessionStorage.removeItem('mc_return'); } catch (e) {}
      if (this.state.warpOn) {
        this._warpT = setTimeout(() => { if (this.gen === window.__mcGen) this.setState({ warpOn: false }); }, this.rm ? 60 : 480);
      }
      return;
    }
    // measure natural heights in normal flow, then convert to fixed camera layers
    secs.forEach(reset);
    if (spacer) spacer.style.height = '0px';
    const vh = window.innerHeight;
    this._hdH = null; // re-measure header on each setup
    // wide camera gaps: travel cost is fixed by the boost meter, so distance is free — it buys back the deep-space spread
    const A = this.flyA = vh * 1.1, D = this.flyD = vh * 0.9, OVER = vh * 0.3;
    let cursor = 0;
    this.flyMap = secs.map((s, i) => {
      const h = s.offsetHeight;
      const hdH2 = (document.querySelector('[data-screen-label="HUD bar"]') || { offsetHeight: 52 }).offsetHeight || 52;
      const band = vh - hdH2 - 14;
      const fit = Math.max(0.7, Math.min(1, band / (h || 1)));
      // pages hold still — but when the legibility floor leaves a page taller than the band, it gets an internal pan range so nothing is unreachable
      const pan = Math.max(0, h * fit - band);
      const start = cursor;
      const readStart = i === 0 ? 0 : start + A;
      const readEnd = readStart + pan;
      const end = i === secs.length - 1 ? readEnd : readEnd + D;
      cursor = end - OVER;
      return { el: s, h, fit, label: s.getAttribute('data-screen-label') || '', room: s.getAttribute('data-room'), pan, start, readStart, readEnd, end };
    });
    if (spacer) spacer.style.height = '0px'; // no native scroll — the boost/flight camera drives everything
    window.scrollTo(0, 0);
    // deep-link: arriving with #pay-0N (e.g. back from a mission report) lands the camera on that planet, not the hero
    if (!this._hashDone) {
      this._hashDone = true;
      const hid = (window.location.hash || '').slice(1);
      if (hid) {
        const tEl = document.getElementById(hid);
        const mi = tEl ? this.flyMap.findIndex(mm => mm.el === tEl || mm.el.contains(tEl)) : -1;
        if (mi >= 0) { this.camSec = mi; this.cam = this.flyMap[mi].readStart; }
      }
      // returning from a mission report: reverse the descent — clouds part, the planet falls away behind us
      let ret = null;
      try { ret = sessionStorage.getItem('mc_return'); if (ret !== null) sessionStorage.removeItem('mc_return'); } catch (e) {}
      if (ret !== null && !this.rm) {
        // mc_return carries the report slug; fall back to a numeric index for robustness
        const six = this.reportSlugs.indexOf(ret);
        const rix = six >= 0 ? six : Math.max(0, Math.min(3, parseInt(ret, 10) || 0));
        // land the camera back on the planet we dove from — the reverse descent plays around it
        const pmEl = document.getElementById('pay-0' + (rix + 1));
        const pmi = pmEl ? this.flyMap.findIndex(mm => mm.el === pmEl || mm.el.contains(pmEl)) : -1;
        if (pmi >= 0) { this.camSec = pmi; this.cam = this.flyMap[pmi].readStart; }
        this._retT = setTimeout(() => {
          if (this.gen !== window.__mcGen) return;
          this.setState({ warpOn: false });
          this.dive = { t0: performance.now(), ix: rix, dur: 2200, reverse: true };
          this._diveEndT = setTimeout(() => { if (this.gen === window.__mcGen) this.dive = null; }, 2260);
        }, 480);
      } else if (this.state.warpOn) {
        this.setState({ warpOn: false });
      }
    }
    const cs = Math.min(this.camSec || 0, this.flyMap.length - 1);
    this.camSec = cs;
    this.cam = Math.max(this.flyMap[cs].readStart, Math.min(this.flyMap[cs].readEnd, this.cam || 0));
    secs.forEach(s => {
      s.style.position = 'fixed'; s.style.top = '0'; s.style.left = '0'; s.style.right = '0';
      s.style.transformOrigin = '50% 42%'; s.style.willChange = 'transform, opacity';
    });
    if (hd) { hd.style.position = 'fixed'; hd.style.left = '0'; hd.style.right = '0'; hd.style.top = '0'; hd.style.zIndex = '300'; }
    if (this.seenObs) this.seenObs.disconnect();
    if (this.roomObs) this.roomObs.disconnect();
    this.flyOn = true;
    this.updateFly();
  }

  updateFly() {
    if (!this.flyOn || !this.flyMap) return;
    const fnow = performance.now();
    // advance an in-progress flight animation (smooth ease between planets)
    if (this.flight) {
      const f = this.flight;
      const t = Math.min(1, (fnow - f.t0) / f.dur);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      this.cam = f.from + (f.to - f.from) * e;
      if (t >= 1) { this.cam = f.to; this.camSec = f.toSec; this.flight = null; }
    }
    // boost bleeds off if the user stops pushing — normalized by frame time so it drains at the same rate on any refresh rate
    const fdt = Math.min(3, (fnow - (this._flyT || fnow)) / 16.7) || 1;
    this._flyT = fnow;
    if ((this.boost || 0) > 0 && fnow - (this.boostAt || 0) > 1900) this.boost = Math.max(0, this.boost - 0.0015 * fdt);
    const sc = this.cam || 0, vh = window.innerHeight;
    const A = this.flyA, D = this.flyD;
    let newSeen = null, activeRoom = -1;
    this.flyMap.forEach((m, i) => {
      const s = m.el;
      if (sc < m.start - vh * 0.2 || sc > m.end + vh * 0.2) {
        if (s.style.visibility !== 'hidden') { s.style.visibility = 'hidden'; s.style.pointerEvents = 'none'; }
        return;
      }
      s.style.visibility = 'visible';
      let phScale = 1, phTy = 0, panOff = 0, op = 1, blur = 0, interactive = true;
      if (sc < m.readStart) {
        // approaching out of the distance
        const p = Math.max(0, Math.min(1, 1 - (m.readStart - sc) / A));
        const e = p * p * (3 - 2 * p);
        phScale = 0.36 + 0.64 * e;
        op = Math.max(0, (p - 0.06) / 0.94) * (0.35 + 0.65 * e);
        phTy = (1 - e) * -vh * 0.04;
        interactive = p > 0.75;
        if (p > 0.05 && m.label && !this.state.seen[m.label]) { (newSeen = newSeen || {})[m.label] = true; }
      } else if (sc <= m.readEnd) {
        // hovering: the page holds still; floored-fit pages pan just enough to reveal their lower content
        panOff = -Math.min(m.pan, sc - m.readStart);
        // deep-link arrivals land here without ever "approaching" — make sure the page's content is revealed
        if (m.label && !this.state.seen[m.label]) { (newSeen = newSeen || {})[m.label] = true; }
        if (m.room !== null && m.room !== '' && m.room !== undefined) {
          activeRoom = parseInt(m.room, 10);
          this.collectPart(activeRoom);
        }
      } else {
        // flying past the camera
        const q = Math.min(1, (sc - m.readEnd) / D);
        phScale = 1 + q * q * 2.2;
        op = Math.max(0, 1 - q * 1.3);
        blur = q * 6;
        interactive = q < 0.15;
        panOff = -m.pan;
      }
      // tall pages scale to fit the band below the fixed header; every page is centered in that band — no internal panning
      const hdH = this._hdH || (this._hdH = (document.querySelector('[data-screen-label="HUD bar"]') || { offsetHeight: 52 }).offsetHeight || 52);
      const s2 = phScale * m.fit;
      let ty = (vh + hdH) / 2 - 0.42 * m.h - 0.08 * m.h * s2 + phTy;
      // never let the page's visual top slip under the header
      const visTop = 0.42 * m.h * (1 - s2) + ty;
      if (visTop < hdH + 8) ty += (hdH + 8) - visTop;
      ty += panOff; // pan applies AFTER the header clamp so it can actually move the page
      // during a planetary dive the current page slides off to the side — we're flying past it toward the planet
      if (this.dive && i === (this.camSec || 0)) {
        const dvA = Math.min(1, (performance.now() - this.dive.t0) / (this.dive.dur || 2600));
        // the page flies out FIRST (front 38% of the dive) — the planet only takes the foreground after it's gone
        const dvEff = this.dive.reverse ? 1 - dvA : dvA;
        const push = Math.pow(Math.min(1, dvEff / 0.38), 2);
        s.style.transform = 'translate3d(' + (push * window.innerWidth * 0.85).toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) scale(' + (s2 * (1 + push * 0.3)).toFixed(4) + ')';
        s.style.opacity = Math.max(0, 1 - push * 1.4).toFixed(3);
        s.style.pointerEvents = 'none';
        s.style.zIndex = String(200 - i);
        return;
      }
      s.style.transform = 'translate3d(0,' + ty.toFixed(1) + 'px,0) scale(' + s2.toFixed(4) + ')';
      s.style.opacity = op.toFixed(3);
      s.style.filter = blur > 0.4 ? 'blur(' + blur.toFixed(1) + 'px)' : '';
      s.style.pointerEvents = interactive ? 'auto' : 'none';
      s.style.zIndex = String(200 - i);
    });
    if (newSeen) this.setState(st => ({ seen: { ...st.seen, ...newSeen } }));
    if (activeRoom !== this.state.room) this.setState({ room: activeRoom });
    // boost meter UI
    if (!this._boostEl || !document.contains(this._boostEl)) this._boostEl = document.querySelector('[data-mc-boost]');
    if (this._boostEl) {
      const b = this.flight ? 1 : (this.boost || 0);
      this._boostEl.style.opacity = '1';
      const fill = this._boostEl.querySelector('[data-mc-boost-fill]');
      const surge = Math.max(0, 1 - (fnow - (this.boostFlash || 0)) / 320);
      const retro = this.boostDir < 0 && (this.boost || 0) > 0.02;
      if (fill) {
        fill.style.height = (b * 100).toFixed(1) + '%';
        fill.style.filter = 'brightness(' + (1 + b * 0.5 + surge * 0.9).toFixed(2) + ')';
        // hotter as it charges: the leading edge shifts pink → red as pressure builds
        const hot = b < 0.4 ? '#FF6EC7' : (b < 0.8 ? '#FF5A78' : '#FF3B30');
        fill.style.background = retro
          ? 'linear-gradient(0deg, #34E0FF, #FFC24B, ' + (b > 0.7 ? '#FF3B30' : '#FF9E3D') + ')'
          : 'linear-gradient(180deg, ' + hot + ', #9B7CFF, #34E0FF)';
        // retro boost charges downward from the top of the tube — visually unmistakable
        fill.style.bottom = retro ? 'auto' : '0';
        fill.style.top = retro ? '0' : 'auto';
      }
      const bar = this._boostEl.querySelector('[data-mc-boost-bar]');
      if (bar) {
        const glowCol = b > 0.75 ? '255,80,60' : '155,124,255';
        bar.style.boxShadow = '0 0 ' + Math.round(14 + 46 * b + surge * 26) + 'px ' + Math.round(-6 + 8 * b) + 'px rgba(' + glowCol + ',' + Math.min(1, 0.4 + 0.6 * b + surge * 0.3).toFixed(2) + ')';
        // the whole tube trembles as pressure builds
        const bj = b * 2.2 + surge * 1.4;
        bar.style.transform = bj > 0.05 ? 'translate(' + (Math.sin(fnow * 0.055) * bj).toFixed(1) + 'px,' + (Math.cos(fnow * 0.047) * bj).toFixed(1) + 'px)' : '';
      }
      const rk = this._boostEl.querySelector('[data-mc-boost-rocket]');
      if (rk) {
        // the ship strains harder as the boosters charge
        const jit = b * 2.8 + surge * 1.6;
        rk.style.transform = 'translate(' + (Math.sin(fnow * 0.05) * jit).toFixed(1) + 'px,' + (Math.cos(fnow * 0.063) * jit).toFixed(1) + 'px) rotate(' + (Math.sin(fnow * 0.031) * b * 7).toFixed(1) + 'deg) scale(' + (1 + b * 0.18).toFixed(3) + ')';
      }
      const pctEl = this._boostEl.querySelector('[data-mc-boost-pct]');
      if (pctEl) {
        const ptxt = this.flight ? 'GO' : Math.round(b * 100) + '%';
        if (pctEl.textContent !== ptxt) pctEl.textContent = ptxt;
        pctEl.style.color = b > 0.85 ? '#4ADE80' : '#EDEFF7';
      }
      const lbl = this._boostEl.querySelector('[data-mc-boost-label]');
      if (lbl) {
        const txt = this.flight ? 'BOOSTERS FIRING' : (retro ? '▲ RETRO BOOST — BACK ONE PLANET' : 'SCROLL TO CHARGE BOOSTERS');
        if (lbl.textContent !== txt) lbl.textContent = txt;
        lbl.style.color = retro ? '#FFC24B' : 'rgba(237,239,247,0.85)';
      }
    }
    const total = this.flyMap[this.flyMap.length - 1].end || 1;
    const pct = Math.min(100, Math.max(0, Math.round((sc / total) * 100)));
    if (pct !== this.state.scrollPct) this.setState({ scrollPct: pct });
  }

  flyInput(dy) {
    if (this.flight || !this.flyOn || !this.flyMap) return;
    const m = this.flyMap[this.camSec || 0];
    if (!m) return;
    if (dy > 0 && (this.cam || 0) >= m.readEnd - 0.5) {
      if ((this.camSec || 0) >= this.flyMap.length - 1) return;
      this.chargeBoost(1, dy);
    } else if (dy < 0 && (this.cam || 0) <= m.readStart + 0.5) {
      if ((this.camSec || 0) === 0) return;
      this.chargeBoost(-1, -dy);
    } else {
      this.boost = 0;
      this.cam = Math.max(m.readStart, Math.min(m.readEnd, (this.cam || 0) + dy));
    }
  }

  chargeBoost(dir, amt) {
    if (this.boostDir !== dir) { this.boostDir = dir; this.boost = 0; this._pushAcc = 0; }
    // even, satisfying surges: at most ONE 20% step per input, accumulator resets — a mouse takes exactly 5 notches
    this._pushAcc = (this._pushAcc || 0) + amt;
    if (this._pushAcc >= 90) {
      this._pushAcc = 0;
      this.boost = Math.min(1, (this.boost || 0) + 0.2);
      this.boostFlash = performance.now();
    }
    this.boostAt = performance.now();
    if ((this.boost || 0) >= 0.999) {
      const i = this.camSec || 0;
      const tgt = this.flyMap[i + dir];
      this.boost = 0; this._pushAcc = 0;
      if (tgt) this.startFlight(dir > 0 ? tgt.readStart : tgt.readEnd, i + dir);
    }
  }

  startFlight(toCam, toSec) {
    const dist = Math.abs(toCam - (this.cam || 0));
    this.flight = { from: this.cam || 0, to: toCam, toSec, t0: performance.now(), dur: Math.min(2800, 1000 + dist * 0.35) };
  }

  // snap assist: stop scrolling mid-transit and the camera glides the rest of the way to the next planet
  updateSnap() {
    if (!this.flyOn || !this.flyMap) return;
    const now = performance.now();
    const sc = window.scrollY;
    if (this.snapping) {
      if (Math.abs(sc - this.snapTarget) < 6 || now > this.snapUntil) { this.snapping = false; this.lastSnapEnd = now; }
      return;
    }
    if (now - (this.lastUserScroll || 0) < 340 || now - (this.lastSnapEnd || 0) < 600) return;
    for (let i = 0; i < this.flyMap.length - 1; i++) {
      const m = this.flyMap[i], next = this.flyMap[i + 1];
      if (sc > m.readEnd + 30 && sc < next.readStart - 30) {
        const prog = (sc - m.readEnd) / (next.readStart - m.readEnd);
        // forward-biased: even a small push commits you to the next planet
        const target = prog > 0.2 ? next.readStart + 2 : Math.max(0, m.readEnd - 2);
        this.snapping = true; this.snapTarget = target; this.snapUntil = now + 1600;
        window.scrollTo({ top: target, behavior: 'smooth' });
        return;
      }
    }
  }

  updatePlanets() {
    if (!this.planetEls || this.planetGen !== this.gen) {
      this.planetEls = Array.from(document.querySelectorAll('[data-deep-planet]'));
      this.planetSecs = Array.from(document.querySelectorAll('[data-room]'));
      this.planetGen = this.gen;
    }
    if (!this.planetEls.length || !this.planetSecs.length) return;
    const vh = window.innerHeight, vw = window.innerWidth;
    const sc = this.flyOn ? (this.cam || 0) : window.scrollY;
    // POV dive: the planet only rides ABOVE the page content once the page has flown out of the way — no clipping pop
    let diveDv = 0;
    if (this.dive) {
      const dvRawC = Math.min(1, (performance.now() - this.dive.t0) / (this.dive.dur || 2600));
      diveDv = this.dive.reverse ? 1 - dvRawC : dvRawC;
    }
    const cont2 = this.planetEls[0] ? this.planetEls[0].parentElement : null;
    if (cont2) { const zi = (this.dive && diveDv > 0.34) ? '120' : '1'; if (cont2.style.zIndex !== zi) cont2.style.zIndex = zi; }
    // cloud layers stream past the cockpit as we descend
    const clc = this._diveCloudBox || (this._diveCloudBox = document.querySelector('[data-dive-clouds]'));
    if (clc) {
      if (this.dive) {
        const dvAll = diveDv;
        clc.style.opacity = dvAll < 0.4 ? '0' : '1';
        if (!this._diveClouds) this._diveClouds = Array.from(clc.querySelectorAll('[data-dive-cloud]'));
        this._diveClouds.forEach(cd => {
          const pr = (cd.getAttribute('data-dive-cloud') || '0,0,0').split(',');
          // clouds belong to the planet: they only appear once we're CLOSE (late in the dive), rising off its face
          const st = 0.45 + parseFloat(pr[2]) * 0.6;
          const p = Math.max(0, Math.min(1, (dvAll - st) / Math.max(0.001, 1 - st)));
          const e = p * p;
          cd.style.opacity = p <= 0 ? '0' : (p < 0.18 ? (p * 5).toFixed(2) : (p > 0.9 ? Math.max(0, 1 - (p - 0.9) * 8).toFixed(2) : '0.9'));
          cd.style.transform = 'translate(' + (parseFloat(pr[0]) * vw * 2.6 * e).toFixed(1) + 'px,' + (parseFloat(pr[1]) * vh * 2.8 * e).toFixed(1) + 'px) scale(' + (0.12 + e * 6).toFixed(3) + ')';
        });
      } else if (clc.style.opacity !== '0') {
        clc.style.opacity = '0';
      }
    }
    this.planetEls.forEach(el => {
      const i = parseInt(el.getAttribute('data-deep-planet'), 10);
      const sec = this.planetSecs[i];
      if (!sec) { el.style.opacity = '0'; return; }
      if (this.dive && i === this.dive.ix) {
        // the planet holds its parked spot while the page flies out, then begins its approach
        const dv = Math.max(0, Math.min(1, (diveDv - 0.3) / 0.7));
        const e = dv * dv * (3 - 2 * dv); // one smooth ease drives position, scale and light together — no darting
        const sideD = i % 2 === 0 ? -1 : 1;
        el.style.opacity = '1';
        el.style.filter = 'brightness(' + (0.5 + 0.5 * e).toFixed(2) + ')';
        // starts EXACTLY where the parked planet sits (side offset, arrival brightness) so the takeover is seamless
        el.style.transform = 'translate3d(' + (sideD * vw * 0.30 * (1 - e)).toFixed(1) + 'px,' + (-vh * 0.05 * (1 - e) + vh * 0.10 * e).toFixed(1) + 'px,0) scale(' + (1 + e * e * 11).toFixed(3) + ')';
        return;
      }
      const m = (this.flyOn && this.flyMap) ? this.flyMap.find(mm => mm.el === sec) : null;
      const r = m ? null : sec.getBoundingClientRect();
      const d = m ? (m.readStart - sc) * 0.6 : (r.top - vh * 0.45); // px of "flight" left until we arrive at this planet
      const side = i % 2 === 0 ? -1 : 1;
      let scale, x, y, op;
      if (d >= 0) {
        // approaching: deep in the distance, growing as we fly toward it
        const z = d * 1.5;
        scale = 900 / (900 + z);
        const t = Math.min(1, z / 2600);
        x = side * vw * (0.30 - 0.10 * t) + side * i * 14 * t;
        y = -vh * (0.05 + 0.16 * t);
        // planets stay SOLID — distance reads as darkness (brightness), not translucency; opacity only for the far fade-in
        op = z > 3400 ? Math.max(0, 1 - (z - 3400) / 1600) : 1;
        // dim on final approach too, so the arrived planet never blows out the text sitting in front of it
        const nearDim = 0.5 + 0.5 * Math.min(1, d / (vh * 0.45));
        el.style.filter = 'brightness(' + ((1 - 0.45 * t) * nearDim).toFixed(3) + ')';
      } else {
        // arrived / flying over: it swells and passes beneath us
        const passLen = m ? ((m.end - m.readStart) * 0.6 + vh * 0.3) : ((r && r.height) || vh);
        const p = Math.min(1, -d / passLen);
        scale = 1 + p * 2.4;
        x = side * vw * 0.30 * (1 + p * 0.4);
        y = -vh * 0.21 + p * vh * 1.35;
        // stays solid while flying over — it slides off-screen; only the last moment fades. Kept dim so text stays readable.
        op = p > 0.75 ? Math.max(0, 1 - (p - 0.75) / 0.25) : 1;
        el.style.filter = 'brightness(0.5)';
      }
      el.style.opacity = op.toFixed(3);
      // depth sorting: nearer planets always paint on top of farther ones
      el.style.zIndex = String(10 + Math.round(scale * 500));
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + scale.toFixed(4) + ')';
    });
  }

  // report slugs in planet order — mc_return carries one of these (the report pages store the slug, not an index)
  reportSlugs = ['hatched', 'job-command-center', 'life-hub', 'property-platform'];

  // per-planet cloud decks — the same dive machinery serves EVERY mission report; wire goReportFor(ix, url) as each report page is built
  reportClouds = [
    'radial-gradient(120% 60% at 20% 30%, rgba(255,255,255,0.96), transparent 60%), radial-gradient(120% 70% at 78% 50%, rgba(253,232,238,0.96), transparent 65%), radial-gradient(150% 90% at 50% 85%, rgba(217,161,174,0.95), transparent 75%), linear-gradient(180deg, #FDF3F5, #E8C3CC)',
    'radial-gradient(120% 60% at 20% 30%, rgba(255,255,255,0.95), transparent 60%), radial-gradient(120% 70% at 78% 50%, rgba(224,229,255,0.95), transparent 65%), radial-gradient(150% 90% at 50% 85%, rgba(147,162,255,0.9), transparent 75%), linear-gradient(180deg, #EEF0FE, #B9C2F2)',
    'radial-gradient(120% 60% at 20% 30%, rgba(255,255,255,0.95), transparent 60%), radial-gradient(120% 70% at 78% 50%, rgba(255,235,220,0.95), transparent 65%), radial-gradient(150% 90% at 50% 85%, rgba(232,149,109,0.9), transparent 75%), linear-gradient(180deg, #FDF0E4, #EBB690)',
    'radial-gradient(120% 60% at 20% 30%, rgba(255,255,255,0.95), transparent 60%), radial-gradient(120% 70% at 78% 50%, rgba(224,240,255,0.95), transparent 65%), radial-gradient(150% 90% at 50% 85%, rgba(110,200,255,0.85), transparent 75%), linear-gradient(180deg, #E9F3FC, #A8CBE8)'
  ];

  goReportFor(ix, url, e) {
    if (e && e.preventDefault) e.preventDefault();
    if (this.state.warpOn || this.dive) return;
    if (this.rm) { window.location.href = url; return; }
    // POV descent, Destiny-style: the page flies out first, then the planet approaches, then we punch through the deck
    this.dive = { t0: performance.now(), ix, dur: 2600 };
    try { fetch(url).catch(() => {}); } catch (e2) {} // warm the cache so arrival is instant
    this._goWarpT = setTimeout(() => {
      if (this.gen !== window.__mcGen) return;
      this.setState({ warpOn: true, warpBg: this.reportClouds[ix] });
    }, 2050);
    this._goNavT = setTimeout(() => { window.location.href = url; }, 2750);
  }

  goReport1 = (e) => { this.goReportFor(0, '/reports/hatched', e); };
  goReport2 = (e) => { this.goReportFor(1, '/reports/job-command-center', e); };
  goReport3 = (e) => { this.goReportFor(2, '/reports/life-hub', e); };
  goReport4 = (e) => { this.goReportFor(3, '/reports/property-platform', e); };

  makePlan(a) {
    a.wpIx = 0;
    a.planStart = { x: a.x, y: a.y };
    const destEl = a.perch && a.perch.closest ? (a.perch.closest('[data-solid]') || a.perch) : null;
    const roll = Math.random();
    if (roll < 0.38 || !destEl) { a.plan = null; return; }
    if (roll < 0.64) {
      // victory lap(s): orbit the destination widget, slipping behind it on the far side
      const ring = [
        { fx: 1.16, fy: 0.5, behind: false },
        { fx: 0.5, fy: -0.32, behind: true },
        { fx: -0.16, fy: 0.5, behind: true },
        { fx: 0.5, fy: 1.22, behind: false }
      ];
      const loops = Math.random() < 0.3 ? 2 : 1;
      let wps = [];
      for (let l = 0; l < loops; l++) wps = wps.concat(ring);
      a.plan = { type: 'orbit', el: destEl, wps };
    } else if (roll < 0.87) {
      // slalom: weave behind then back in front of the scenery on the way over
      const s = (Math.random() < 0.5 ? 1 : -1) * (70 + Math.random() * 70);
      a.plan = { type: 'weave', wps: [{ t: 0.35, off: s, behind: true }, { t: 0.7, off: -s, behind: false }] };
    } else {
      // clumsy arrival: bumps into the widget's edge, raises its shield, lands sheepishly
      a.plan = { type: 'bonk', el: destEl, wps: [{ fx: Math.random() < 0.5 ? -0.05 : 1.05, fy: 0.2 + Math.random() * 0.5, behind: false }] };
    }
  }

  updateAstro() {
    // refs can be dropped on re-render — fall back to a cached DOM query and re-attach
    let el = this.astroRef.current;
    if (!el || !document.contains(el)) {
      if (this._astroEl && document.contains(this._astroEl)) el = this._astroEl;
      else el = this._astroEl = document.querySelector('[data-mc-astro]');
    }
    this._astroEl = el;
    if (!this.perchEls || this.perchEls.length === 0 || !document.contains(this.perchEls[0])) {
      this.perchEls = Array.from(document.querySelectorAll('[data-astro-perch]'));
    }
    if (!el || this.perchEls.length === 0) return;
    if (window.innerWidth < 880) return;
    // if we recovered a detached ref mid-flight/perch, re-sync the visual attrs to the state machine
    if (this.astro && el.getAttribute('data-resync') !== String(this.gen)) {
      el.setAttribute('data-resync', String(this.gen));
      const m = this.astro.mode;
      el.setAttribute('data-flying', m === 'fly' ? '1' : '0');
      el.setAttribute('data-landing', m === 'land' ? '1' : '0');
      el.setAttribute('data-perched', (m === 'perch' || m === 'trick' || m === 'land') ? '1' : '0');
      el.setAttribute('data-idle', (m === 'perch') ? '1' : (m === 'emerge' ? '5' : '0'));
      if (m === 'trick') this.astro.mode = 'perch';
    }
    const now = performance.now();
    const dt = Math.min(3, (now - (this.astroT || now)) / 16.7) || 1;
    this.astroT = now;
    const vh = window.innerHeight;
    const sy = 0; // fly-through mode: astro is position:fixed and all element rects are viewport-space, updated in the same rAF — no lag
    const secVis = (p) => {
      if (!this.flyOn || !p || !p.closest) return true;
      const fs = p.closest('[data-fly-sec]');
      if (!fs) return true;
      return fs.style.visibility !== 'hidden' && parseFloat(fs.style.opacity || '1') > 0.5;
    };
    const anchorOf = (p) => {
      const r = p.getBoundingClientRect();
      if (!r.width || !r.height) return null;
      return { x: r.width > 620 ? r.right - 74 : r.left + r.width / 2 - 23, y: r.top + sy - 50 };
    };
    const set = (attr, v) => { if (el.getAttribute(attr) !== v) el.setAttribute(attr, v); };

    if (this.state.bootPhase !== 'gone') return;
    if (!this.astro) {
      // disembark from the crew rocket if it's in view
      const rocket = document.querySelector('[data-astro-rocket]');
      if (rocket && sy < vh * 0.6) {
        const rr = rocket.getBoundingClientRect();
        // only disembark on-camera; otherwise start from the nearest perch
        if (rr.width && rr.top > 0 && rr.top < vh - 60) {
          this.astro = { x: rr.left + rr.width / 2 - 23, y: rr.top + sy - 46, vx: 0, vy: 0, mode: 'emerge', modeAt: now, lastTrick: now, perch: null };
          set('data-idle', '5'); set('data-perched', '0');
          el.style.transform = 'translate3d(' + this.astro.x.toFixed(1) + 'px,' + this.astro.y.toFixed(1) + 'px,0)';
          return;
        }
      }
      let bestEl = null, bestD = Infinity, bestA = null;
      this.perchEls.forEach(p => {
        const c = anchorOf(p); if (!c) return;
        const d = Math.abs(c.y - sy - vh * 0.38);
        if (d < bestD) { bestD = d; bestEl = p; bestA = c; }
      });
      if (!bestEl) return;
      this.astro = { x: bestA.x, y: bestA.y, vx: 0, vy: 0, mode: 'perch', modeAt: now, lastTrick: now, perch: bestEl };
      set('data-perched', '1'); set('data-idle', '1');
    }
    const a = this.astro;

    const pickPerch = (excl, anyBand) => {
      let bestEl = null, bestD = Infinity;
      this.perchEls.forEach(p => {
        if (p === excl) return;
        if (!secVis(p)) return;
        const c = anchorOf(p); if (!c) return;
        const cy = c.y - sy;
        if (!anyBand && (cy < 70 || cy > vh * 0.7)) return;
        const d = Math.abs(cy - vh * 0.4);
        if (d < bestD) { bestD = d; bestEl = p; }
      });
      return bestEl;
    };

    if (a.mode === 'emerge') {
      const rocket = document.querySelector('[data-astro-rocket]');
      if (rocket) { const rr = rocket.getBoundingClientRect(); a.x = rr.left + rr.width / 2 - 23; a.y = rr.top + sy - 46; }
      el.style.transform = 'translate3d(' + a.x.toFixed(1) + 'px,' + a.y.toFixed(1) + 'px,0)';
      if (now - a.modeAt > 1500) {
        const next = pickPerch(null, false) || pickPerch(null, true);
        if (next) {
          a.perch = next; a.mode = 'fly'; a.modeAt = now;
          a.vx = (Math.random() - 0.5) * 2; a.vy = -1.3;
          a.wobblePh = Math.random() * Math.PI * 2; a.wobbleAmp = 0.6;
          this.makePlan(a);
          set('data-flying', '1'); set('data-idle', '0');
        }
      }
      return;
    }

    // asteroid awareness — dodge near misses; occasionally take a comic bonk, then fly back
    if (this.asteroids && this.asteroids.length && a.mode !== 'land' && now - (this.lastAstReact || 0) > 4000) {
      const px2 = a.x + 23, py2 = a.y - sy + 26;
      for (const as of this.asteroids) {
        const dx2 = as.x - px2, dy2 = as.y - py2;
        if (Math.hypot(dx2, dy2) < 120 && (dx2 * as.vx + dy2 * as.vy) < 0) {
          this.lastAstReact = now;
          if (Math.random() < 0.25) {
            // bonk — knocked tumbling with the rock, then sheepishly returns
            a.vx = as.vx * 1.6; a.vy = as.vy * 1.6 + 1.2;
            a.dizzyUntil = now + 1000;
          } else {
            // quick dodge perpendicular to the asteroid's path
            const sgn = (as.vx * (py2 - as.y) - as.vy * (px2 - as.x)) > 0 ? 1 : -1;
            const nl = Math.hypot(as.vy, as.vx) || 1;
            a.vx += (-as.vy * sgn / nl) * 3.4; a.vy += (as.vx * sgn / nl) * 3.4;
          }
          a.mode = 'fly'; a.modeAt = now;
          set('data-flying', '1'); set('data-idle', '0'); set('data-landing', '0'); set('data-perched', '0');
          break;
        }
      }
    }

    if (a.mode === 'fly') {
      let anch = a.perch ? anchorOf(a.perch) : null;
      // mid-flight retarget: if the destination scrolled far out of view, chase a better one instead
      if (!anch || !secVis(a.perch) || anch.y - sy < -vh * 0.2 || anch.y - sy > vh * 1.1) {
        const next = pickPerch(null, false) || pickPerch(a.perch, true);
        if (next) { a.perch = next; anch = anchorOf(next); a.plan = null; }
      }
      if (!anch) { a.mode = 'perch'; a.modeAt = now; return; }
      // if he's ended up way off-screen, pull him back to the edge of view so he re-enters quickly
      if (a.y - sy < -vh * 1.2) { a.y = sy - vh * 0.4; a.vy = 0; }
      if (a.y - sy > vh * 2.2) { a.y = sy + vh * 1.4; a.vy = 0; }
      // gentler damped spring + speed cap — a glide, not a zip
      // creative flight plans: victory-lap orbits, slaloms behind scenery, the occasional clumsy bump
      let tx = anch.x, ty2 = anch.y, wpBehind = null;
      if (a.plan && a.plan.wps && a.plan.wps[a.wpIx]) {
        const wp = a.plan.wps[a.wpIx];
        if (a.plan.type === 'weave') {
          const ddx4 = anch.x - a.planStart.x, ddy4 = anch.y - a.planStart.y;
          const L = Math.hypot(ddx4, ddy4) || 1;
          tx = a.planStart.x + ddx4 * wp.t + (-ddy4 / L) * wp.off;
          ty2 = a.planStart.y + ddy4 * wp.t + (ddx4 / L) * wp.off;
        } else {
          const rr = a.plan.el.getBoundingClientRect();
          if (!rr.width) { a.plan = null; }
          else { tx = rr.left + rr.width * wp.fx - 23; ty2 = rr.top + rr.height * wp.fy - 26; }
        }
        if (a.plan) {
          wpBehind = wp.behind;
          if (Math.hypot(tx - a.x, ty2 - a.y) < 34) {
            if (a.plan.type === 'bonk') {
              // thunk — dizzy spin, and the widget raises its shield in protest
              a.dizzyUntil = now + 900;
              a.vx *= -0.45; a.vy *= -0.45;
              const rr2 = a.plan.el.getBoundingClientRect();
              if (this.dents && this.dents.length < 6 && rr2.width) {
                this.dents.push({ el: a.plan.el, ox: Math.max(0, Math.min(rr2.width, a.x + 23 - rr2.left)), oy: Math.max(0, Math.min(rr2.height, a.y + 26 - rr2.top)), t0: now, r: 13 });
              }
            }
            a.wpIx++;
            if (!a.plan.wps[a.wpIx]) a.plan = null;
          }
        }
      }
      const steerDist = Math.hypot(tx - a.x, ty2 - a.y);
      // stiffer braking only on true final approach
      const k = 0.0038, damp = Math.pow(!a.plan && steerDist < 90 ? 0.86 : 0.935, dt);
      a.vx = (a.vx + (tx - a.x) * k * dt) * damp;
      a.vy = (a.vy + (ty2 - a.y) * k * dt) * damp;
      // wobble fades out near the current steer target so it can't sustain an unwanted orbit
      a.vx += Math.sin(now * 0.003 + a.wobblePh) * 0.035 * (a.wobbleAmp || 1) * Math.min(1, steerDist / 250) * dt;
      const spd0 = Math.hypot(a.vx, a.vy), maxV = 4.2;
      if (spd0 > maxV) { a.vx *= maxV / spd0; a.vy *= maxV / spd0; }
      a.x += a.vx * dt; a.y += a.vy * dt;
      const dist = Math.hypot(anch.x - a.x, anch.y - a.y);
      const speed = Math.hypot(a.vx, a.vy);
      // point head-first along the flight path (jetpack thrusting behind), easing upright on final approach
      let targetAng = 0;
      if (speed > 0.25) {
        targetAng = Math.atan2(a.vy, a.vx) * 180 / Math.PI + 90;
        while (targetAng > 180) targetAng -= 360;
        while (targetAng < -180) targetAng += 360;
        targetAng *= Math.min(1, dist / 180);
      }
      if (a.ang === undefined) a.ang = 0;
      let dAng = targetAng - a.ang;
      while (dAng > 180) dAng -= 360;
      while (dAng < -180) dAng += 360;
      a.ang += dAng * Math.min(1, 0.07 * dt);
      while (a.ang > 180) a.ang -= 360;
      while (a.ang < -180) a.ang += 360;
      if (a.dizzyUntil && now < a.dizzyUntil) { a.ang += 24 * dt; while (a.ang > 180) a.ang -= 360; }
      // depth travel: mid-flight he dips away into the distance (or swoops toward the camera), returning to true size to land
      a.flightDist = Math.max(a.flightDist || 1, dist);
      if (a.depthDir === undefined) a.depthDir = Math.random() < 0.62 ? -1 : 1;
      const prog = Math.max(0, Math.min(1, 1 - dist / a.flightDist));
      const mid = Math.sin(Math.PI * prog);
      // depth goal: waypoints dictate it during a maneuver (behind = small, in front = big); otherwise the usual mid-flight dip
      let zGoal;
      if (wpBehind !== null && wpBehind !== undefined) zGoal = wpBehind ? 0.58 : 1.08;
      else zGoal = 1 + (a.depthDir < 0 ? -0.48 : 0.65) * mid;
      a.zCur = (a.zCur === undefined ? 1 : a.zCur) + (zGoal - a.zCur) * Math.min(1, 0.08 * dt);
      const depthSc = a.zCur;
      // occlusion sells the depth: small = BEHIND widgets & planets; big = passing OVER them
      const behind = depthSc < 0.86;
      if (this._astroBehind !== behind) { this._astroBehind = behind; el.style.zIndex = behind ? '1' : '40'; }
      el.style.transform = 'translate3d(' + a.x.toFixed(1) + 'px,' + a.y.toFixed(1) + 'px,0) rotate(' + a.ang.toFixed(1) + 'deg) scale(' + depthSc.toFixed(3) + ')';
      if (dist < 14 && speed < 1.1 && !a.plan) {
        a.mode = 'land'; a.modeAt = now;
        a.x = anch.x; a.y = anch.y; a.vx = 0; a.vy = 0; a.ang = 0;
        a.flightDist = 0; a.depthDir = undefined; a.zCur = 1; a.wpIx = 0;
        this._astroBehind = false; el.style.zIndex = '40';
        set('data-flying', '0'); set('data-landing', '1'); set('data-perched', '1');
      }
      return;
    }

    // perch / land / trick — he is STANDING on the element: ride with it 1:1 as the page scrolls
    const anch = a.perch ? anchorOf(a.perch) : null;
    if (anch) { a.x = anch.x; a.y = anch.y; }
    el.style.transform = 'translate3d(' + a.x.toFixed(1) + 'px,' + a.y.toFixed(1) + 'px,0)';

    // only take off when his perch has left the comfortable band AND there's a good next spot
    const out = !anch || !secVis(a.perch) || anch.y - sy < 40 || anch.y - sy > vh * 0.82;
    if (out) {
      // prefer a perch in the comfortable band; if the page has a gap there, take the nearest one anywhere
      const veryFar = !anch || anch.y - sy < -vh * 0.5 || anch.y - sy > vh * 1.5;
      const bestEl = pickPerch(a.perch, false) || (veryFar ? pickPerch(a.perch, true) : null);
      if (bestEl) {
        a.perch = bestEl; a.mode = 'fly'; a.modeAt = now;
        // varied launch: gentle sideways hop + upward push-off
        a.vx = (Math.random() - 0.5) * 3;
        a.vy = -(0.9 + Math.random() * 1.4);
        a.wobblePh = Math.random() * Math.PI * 2;
        a.wobbleAmp = 0.4 + Math.random() * 1.2;
        this.makePlan(a);
        set('data-flying', '1'); set('data-idle', '0'); set('data-landing', '0'); set('data-perched', '0');
        return;
      }
    }

    if (a.mode === 'land' && now - a.modeAt > 520) {
      a.mode = 'perch'; a.modeAt = now;
      set('data-landing', '0'); set('data-idle', '1');
    } else if (a.mode === 'perch') {
      // a click-beacon perch is temporary — after a rest he heads back to the site's real furniture
      if (this._clickMark && a.perch === this._clickMark && now - a.modeAt > 5200) {
        this._clickMark.style.top = '-300px'; // slides out of the comfort band, so the normal departure logic takes over
      }
      const stillFor = now - Math.max(this.lastUserScroll || 0, a.modeAt);
      if (stillFor > 4500 && now - a.lastTrick > 8000) {
        a.mode = 'trick'; a.modeAt = now; a.lastTrick = now;
        const tricks = [['2', 1900], ['3', 3400], ['4', 4800]];
        const pick = tricks[Math.floor(Math.random() * tricks.length)];
        a.trickDur = pick[1];
        set('data-idle', pick[0]);
      }
    } else if (a.mode === 'trick' && now - a.modeAt > (a.trickDur || 1900)) {
      a.mode = 'perch'; a.modeAt = now;
      set('data-idle', '1');
    }
  }

  swatch(c) {
    return 'repeating-linear-gradient(135deg, ' + c + ', ' + c + ' 10px, rgba(255,255,255,0.18) 10px, rgba(255,255,255,0.18) 12px)';
  }

  toggle(id) {
    this.setState(s => ({ sel: s.sel.includes(id) ? s.sel.filter(x => x !== id) : s.sel.concat(id) }));
  }

  styleMe = () => {
    if (this.state.phase === 'thinking') return;
    this.setState({ phase: 'thinking', outfit: [] });
    this._styleT = setTimeout(() => {
      const selPieces = this.wardrobeData.filter(w => this.state.sel.includes(w.id));
      let picks, note;
      if (selPieces.length >= 1) {
        // build the look around whatever she picked — even a single piece
        picks = selPieces.slice(0, 3);
        if (picks.length < 3 && !picks.some(p => p.cat === 'shoes')) picks.push(this.wardrobeData.find(w => w.id === 'sneak'));
        for (const id of ['sage', 'denim', 'trench', 'tee']) {
          if (picks.length >= 3) break;
          const w = this.wardrobeData.find(x => x.id === id);
          // never a second bottom half (a dress counts) — but doubled tops are just layering
          if (picks.some(p => p.id === id) || (w.cat === 'bottom' && picks.some(p => p.cat === 'bottom' || p.cat === 'dress'))) continue;
          picks.push(w);
        }
        note = this.selNote;
      } else {
        const pools = [['sage', 'denim', 'sneak'], ['midi', 'trench', 'sneak'], ['tee', 'skirt', 'sage']];
        const poolIx = this.state.noteIx % pools.length;
        picks = pools[poolIx].map(id => this.wardrobeData.find(w => w.id === id));
        note = this.notes[poolIx]; // the caption travels WITH its pool — it always describes this look
      }
      this.setState(s => ({
        phase: 'result',
        outfit: picks.map(p => ({ name: p.name, swatch: this.swatch(p.color) })),
        note,
        noteIx: s.noteIx + 1
      }));
    }, this.rm ? 200 : 1400);
  };

  advanceCard(id) {
    this.setState(s => ({ cards: s.cards.map(c => c.id === id ? { ...c, s: (c.s + 1) % 4, nudge: false } : c) }));
  }

  collectPart(idx) {
    if (idx < 0 || idx > 3 || this.state.parts[idx]) return;
    this._partPending = this._partPending || {};
    if (this._partPending[idx]) return;
    const gen = this.gen;
    this._partPending[idx] = setTimeout(() => {
      if (gen !== window.__mcGen || this.state.parts[idx]) return;
      this.setState(s => {
        const parts = s.parts.slice();
        parts[idx] = true;
        try { sessionStorage.setItem('mc_parts', JSON.stringify(parts)); } catch (e) {}
        return { parts };
      });
    }, 900);
  }

  launchShip = () => {
    if (this.state.parts.every(Boolean) && !this.state.launching) {
      this.setState({ launching: true });
    }
  };

  setScreen(payload, ix) {
    this.setState(s => {
      const screens = s.screens.slice();
      screens[payload] = ix;
      return { screens };
    });
    this.syncSlideInert(); // setState merges synchronously — screens is already current here
  }

  // hidden demo slides sit inside an overflow:hidden track; without inert their buttons stay
  // tabbable, and focusing one makes the browser scroll the clipped box — shearing the demo
  // permanently. React never manages these nodes' inert, so direct DOM writes (the engine's
  // usual pattern) are safe. Called once after mount and again on every tab switch — no thrash.
  syncSlideInert() {
    document.querySelectorAll('[data-screenon]').forEach((box, i) => {
      if (!box._mcShear) {
        // belt-and-braces: if anything DOES scroll the clipped box (focus, find-in-page), snap it back
        box._mcShear = true;
        box.addEventListener('scroll', () => { box.scrollLeft = 0; box.scrollTop = 0; });
      }
      // the demo's payload index comes from the section it lives in — same state that drives pNTrack
      const sec = box.closest ? box.closest('[data-room]') : null;
      const pIx = sec ? parseInt(sec.getAttribute('data-room'), 10) : i;
      const active = (this.state.screens && this.state.screens[pIx]) || 0;
      const track = box.firstElementChild;
      if (!track) return;
      Array.from(track.children).forEach((slide, six) => {
        const off = six !== active;
        if (slide.inert !== off) slide.inert = off;
      });
    });
  }

  tabsFor(payloadIx) {
    const brand = this.navColors[payloadIx];
    const rgba = this.brandRGBA[payloadIx];
    return this.tabLabels[payloadIx].map((label, ix) => {
      const active = this.state.screens[payloadIx] === ix;
      return {
        label,
        color: active ? brand : 'rgba(237,239,247,0.5)',
        border: active ? 'rgba(' + rgba + ',0.55)' : 'rgba(237,239,247,0.16)',
        bg: active ? 'rgba(' + rgba + ',0.12)' : 'transparent',
        go: () => this.setScreen(payloadIx, ix)
      };
    });
  }

  termSlice(lineIx) {
    let before = 0;
    for (let i = 0; i < lineIx; i++) before += this.termVals[i].length;
    const n = Math.max(0, Math.min(this.termVals[lineIx].length, this.state.typed - before));
    return this.termVals[lineIx].slice(0, n);
  }

  fmtSession() {
    const s = Math.floor((this.state.now - this.state.mountedAt) / 1000);
    const m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  renderVals() {
    const { bootPhase, bootShown, sel, phase, outfit, noteIx, prefs, cards, briefDone, tasks, tenant, room, typed, seen, scrollPct, screens } = this.state;
    const glowStrength = this.props.glowStrength ?? 1;
    const total = this.termVals.join('').length;
    const len1 = this.termVals[0].length, len2 = len1 + this.termVals[1].length;

    const stages = this.stageNames.map((name, ix) => {
      const inStage = cards.filter(c => c.s === ix);
      return {
        name, count: inStage.length,
        cards: inStage.map(c => ({
          title: c.title, company: c.company, nudge: c.nudge, isOffer: ix === 3,
          border: c.nudge ? '#F5D9A8' : '#E4E5F0',
          advance: () => this.advanceCard(c.id)
        }))
      };
    });
    const maxCount = Math.max(1, ...stages.map(s => s.count));
    const funnelColors = ['#A5B4FC', '#818CF8', '#6366F1', '#4F46E5'];

    const briefRaw = [];
    cards.forEach(c => {
      if (c.nudge) briefRaw.push({ id: 'n' + c.id, text: 'Send follow-up — ' + c.company + ' (' + c.title + ')', tag: 'FOLLOW-UP' });
    });
    cards.forEach(c => {
      if (c.s === 2) briefRaw.push({ id: 'i' + c.id, text: 'Prep interview — ' + c.company, tag: 'INTERVIEW' });
    });
    cards.forEach(c => {
      if (c.s === 3) briefRaw.push({ id: 'o' + c.id, text: 'Review offer — ' + c.company, tag: 'OFFER' });
    });
    cards.slice(0, 1).forEach(c => {
      if (c.s === 0) briefRaw.push({ id: 'a' + c.id, text: 'Tailor application — ' + c.company, tag: 'APPLY' });
    });
    const briefItems = briefRaw.slice(0, 5).map(b => {
      const done = briefDone.includes(b.id);
      return {
        ...b,
        tick: done ? '✓' : '',
        boxBorder: done ? '#4F46E5' : '#C7CBE0',
        boxBg: done ? '#4F46E5' : '#FFFFFF',
        color: done ? '#8A8DA8' : '#23214A',
        deco: done ? 'line-through' : 'none',
        toggle: () => this.setState(s => ({
          briefDone: s.briefDone.includes(b.id) ? s.briefDone.filter(x => x !== b.id) : s.briefDone.concat(b.id)
        }))
      };
    });

    const doneCount = tasks.filter(t => t.done).length;
    const left = tasks.length - doneCount;
    const pct = Math.round((doneCount / tasks.length) * 100);

    const weekCounts = [6, 5, 6, 4, doneCount, null, null];
    const weekLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const weekDays = weekLabels.map((label, ix) => {
      const cnt = weekCounts[ix];
      const isToday = ix === 4;
      const future = cnt === null;
      return {
        label,
        labelColor: isToday ? '#C25A28' : (future ? '#C4B8A6' : '#8C8378'),
        bg: isToday ? '#FDF0E4' : 'rgba(255,255,255,0.55)',
        border: isToday ? '#E4C4AE' : 'rgba(201,184,157,0.4)',
        count: future ? '—' : cnt + '/6',
        countColor: isToday ? '#C25A28' : (future ? '#C4B8A6' : '#A89C8C'),
        dots: Array.from({ length: 6 }, (_, d) => ({
          fill: !future && d < cnt ? (isToday ? '#D9622B' : '#E0A181') : 'transparent',
          ring: future ? '#E5DAC6' : (!future && d < cnt ? (isToday ? '#D9622B' : '#E0A181') : '#D8C9AE')
        }))
      };
    });
    const pastDone = 6 + 5 + 6 + 4 + doneCount;
    const weekPct = Math.round((pastDone / 30) * 100);

    const t = this.tenantData[tenant];

    let sydTime = '';
    try { sydTime = new Date(this.state.now).toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney', hour12: false }); } catch (e) { sydTime = new Date(this.state.now).toLocaleTimeString(); }

    return {
      bootVisible: bootPhase !== 'gone',
      bootOpacity: bootPhase === 'fade' ? 0 : 1,
      bootLinesOpacity: bootPhase === 'flash' || bootPhase === 'fade' ? 0.18 : 1,
      bootLinesShown: this.bootLines.slice(0, bootShown),
      bootTyping: bootPhase === 'lines' && bootShown < this.bootLines.length,
      bootFlash: bootPhase === 'flash' || bootPhase === 'fade',
      skipBoot: () => { if (this.bootTimer) clearInterval(this.bootTimer); this.finishBoot(); },

      heroSeen: bootPhase === 'gone' ? '1' : '0',
      manifestSeen: seen['Payload manifest'] ? '1' : '0',
      p1Seen: seen['Payload 01 — hatched'] ? '1' : '0',
      p2Seen: seen['Payload 02 — Job Command Center'] ? '1' : '0',
      p3Seen: seen['Payload 03 — Life Hub'] ? '1' : '0',
      p4Seen: seen['Payload 04 — Property platform'] ? '1' : '0',
      planSeen: seen['Flight plan — How I build with AI'] ? '1' : '0',
      logSeen: seen['Transfer log — CS to product'] ? '1' : '0',
      commsSeen: seen['Comms — contact'] ? '1' : '0',
      archSeen: seen['Flight systems — architecture'] ? '1' : '0',

      auroraOpacity: glowStrength,
      glowRose: room === 0 ? glowStrength : 0,
      glowIris: room === 1 ? glowStrength : 0,
      glowEmber: room === 2 ? glowStrength : 0,
      glowSky: room === 3 ? glowStrength : 0,

      canvasRef: this.canvasRef,
      canvasFxRef: this.canvasFxRef,
      astroRef: this.astroRef,

      partsCount: this.state.parts.filter(Boolean).length,
      partDots: this.state.parts.map((p, ix) => ({
        bg: p ? this.navColors[ix] : 'rgba(237,239,247,0.12)',
        glow: p ? '0 0 8px ' + this.navColors[ix] : 'none'
      })),
      part1Text: this.state.parts[0] ? '▣ STABILISER FIN — RECOVERED ✓' : '▣ SHIP PART HERE: STABILISER FIN',
      part2Text: this.state.parts[1] ? '▣ NAV COMPUTER — RECOVERED ✓' : '▣ SHIP PART HERE: NAV COMPUTER',
      part3Text: this.state.parts[2] ? '▣ FUEL CELL — RECOVERED ✓' : '▣ SHIP PART HERE: FUEL CELL',
      part4Text: this.state.parts[3] ? '▣ HEAT SHIELD — RECOVERED ✓' : '▣ SHIP PART HERE: HEAT SHIELD',
      part1Color: this.state.parts[0] ? '#4ADE80' : '#FF9EB8',
      part2Color: this.state.parts[1] ? '#4ADE80' : '#93A2FF',
      part3Color: this.state.parts[2] ? '#4ADE80' : '#FF9E6E',
      part4Color: this.state.parts[3] ? '#4ADE80' : '#6EC8FF',
      planets: [0, 1, 2, 3].map(ix => ({
        href: '#pay-0' + (ix + 1),
        label: ['01 HATCHED', '02 JOB CMD', '03 LIFE HUB', '04 PROPERTY'][ix],
        bg: [
          'radial-gradient(circle at 32% 30%, #FFD3DE, #D9A1AE 55%, #8A5560)',
          'radial-gradient(circle at 32% 30%, #C7CFFF, #6366F1 60%, #312E81)',
          'radial-gradient(circle at 32% 30%, #FFE4C9, #E8956D 55%, #9A4515)',
          'radial-gradient(circle at 32% 30%, #D6ECFF, #6EC8FF 55%, #1E4E7A)'
        ][ix],
        glow: '0 0 26px -6px ' + this.navColors[ix],
        ringB: ix === 3,
        part: ['FIN', 'NAV', 'FUEL', 'SHIELD'][ix] + (this.state.parts[ix] ? ' ✓' : ' — ON SURFACE'),
        partColor: this.state.parts[ix] ? '#4ADE80' : 'rgba(237,239,247,0.45)'
      })),
      shipSlots: this.state.parts.map((p, ix) => ({
        text: ['FIN', 'NAV', 'FUEL', 'SHIELD'][ix] + (p ? ' ✓' : ' —'),
        color: p ? this.navColors[ix] : 'rgba(237,239,247,0.35)',
        borderStyle: p ? 'solid' : 'dashed',
        borderColor: p ? this.navColors[ix] : 'rgba(237,239,247,0.2)'
      })),
      shipStatus: this.state.launching
        ? 'LAUNCHED — SEE YOU IN THE INBOX'
        : (this.state.parts.every(Boolean)
          ? 'ALL PARTS RECOVERED — SHIP REPAIRED · READY TO LAUNCH'
          : 'SHIP REPAIR ' + this.state.parts.filter(Boolean).length + '/4 — A PART WAITS ON EACH PLANET'),
      shipStatusColor: this.state.parts.every(Boolean) ? '#4ADE80' : 'rgba(237,239,247,0.55)',
      crewFixed: this.state.parts.every(Boolean),
      crewDamaged: !this.state.parts.every(Boolean),
      shipTransform: this.state.launching ? 'translateY(-560px)' : 'none',
      shipOpacity: this.state.launching ? 0 : 1,
      finFill: this.state.parts.every(Boolean) ? '#FF6EC7' : 'none',
      finDash: this.state.parts.every(Boolean) ? '0' : '3 3',
      flameOp: this.state.launching ? 1 : 0,
      shipLight: this.state.parts.every(Boolean) ? '#4ADE80' : '#FF6E6E',
      ctaLabel: this.state.parts.every(Boolean) ? 'Launch — email me' : 'Email me',
      launchShip: this.launchShip,
      warpOn: this.state.warpOn,
      warpOp: this.state.warpOn ? 1 : 0,
      warpBg: this.state.warpBg || 'radial-gradient(circle at 50% 42%, #FDF8F6 0%, #D9A1AE 65%, #8A5560 100%)',
      goReport1: this.goReport1,
      goReport2: this.goReport2,
      goReport3: this.goReport3,
      goReport4: this.goReport4,
      sydTime, sessionTime: this.fmtSession(), scrollPct,

      navItems: [
        { label: '01 HATCHED', href: '#pay-01' },
        { label: '02 JOB CMD', href: '#pay-02' },
        { label: '03 LIFE HUB', href: '#pay-03' },
        { label: '04 PROPERTY', href: '#pay-04' }
      ].map((n, ix) => ({
        ...n,
        color: room === ix ? this.navColors[ix] : 'rgba(237,239,247,0.55)',
        dot: room === ix ? this.navColors[ix] : 'rgba(237,239,247,0.2)'
      })).concat([{
        label: 'THE SHIP ' + this.state.parts.filter(Boolean).length + '/4',
        href: '#comms',
        color: this.state.parts.every(Boolean) ? '#4ADE80' : 'rgba(237,239,247,0.55)',
        dot: this.state.parts.every(Boolean) ? '#4ADE80' : 'rgba(237,239,247,0.2)'
      }]),

      manifest: [
        { num: '01', name: 'hatched', desc: 'AI styling for postpartum mums', status: 'PRE-LAUNCH', chip: '#FF9EB8', chipGlow: 'rgba(255,158,184,0.6)', pill: '#FF9EB8', pillBorder: 'rgba(255,158,184,0.45)', href: '#pay-01' },
        { num: '02', name: 'Job Command Center', desc: 'Job-search ops, run like revenue ops', status: 'IN DAILY USE', chip: '#93A2FF', chipGlow: 'rgba(147,162,255,0.6)', pill: '#93A2FF', pillBorder: 'rgba(147,162,255,0.45)', href: '#pay-02' },
        { num: '03', name: 'Life Hub', desc: 'The family OS — 175k lines, 40 routes', status: 'IN DAILY USE', chip: '#FF9E6E', chipGlow: 'rgba(255,158,110,0.6)', pill: '#FF9E6E', pillBorder: 'rgba(255,158,110,0.45)', href: '#pay-03' },
        { num: '04', name: 'Property platform', desc: 'Client build → white-label SaaS', status: 'CLIENT DELIVERY', chip: '#6EC8FF', chipGlow: 'rgba(110,200,255,0.6)', pill: '#6EC8FF', pillBorder: 'rgba(110,200,255,0.45)', href: '#pay-04' }
      ],

      term1: this.termSlice(0), term2: this.termSlice(1), term3: this.termSlice(2),
      caret1: typed < len1, caret2: typed >= len1 && typed < len2, caret3: typed >= len2,

      p1Tabs: this.tabsFor(0), p2Tabs: this.tabsFor(1), p3Tabs: this.tabsFor(2), p4Tabs: this.tabsFor(3),
      p1Track: 'translateX(-' + (screens[0] * 100) + '%)',
      p2Track: 'translateX(-' + (screens[1] * 100) + '%)',
      p3Track: 'translateX(-' + (screens[2] * 100) + '%)',
      p4Track: 'translateX(-' + (screens[3] * 100) + '%)',
      p1Pos: (screens[0] + 1) + '/2', p2Pos: (screens[1] + 1) + '/2',
      p3Pos: (screens[2] + 1) + '/2', p4Pos: (screens[3] + 1) + '/2',

      wardrobe: this.wardrobeData.map(w => ({
        name: w.name, cat: w.cat, swatch: this.swatch(w.color),
        selected: sel.includes(w.id),
        shadow: sel.includes(w.id) ? '0 0 0 2px #8B7CF6, 0 8px 20px -8px rgba(139,124,246,0.5)' : '0 6px 16px -8px rgba(90,50,60,0.28)',
        toggle: () => this.toggle(w.id)
      })),
      isThinking: phase === 'thinking',
      notThinking: phase !== 'thinking',
      hasOutfit: phase === 'result' && outfit.length > 0,
      outfit,
      outfitNote: this.state.note || this.notes[(noteIx - 1 + this.notes.length) % this.notes.length],
      selectionHint: sel.length > 0 ? sel.length + ' piece' + (sel.length > 1 ? 's' : '') + ' selected' : 'or let it pick from everything',
      styleMe: this.styleMe,

      prefChips: this.prefDefs.map(p => {
        const on = prefs.includes(p.id);
        return {
          label: p.label,
          color: on ? '#FFFFFF' : '#8A7378',
          bg: on ? '#8B7CF6' : '#FFFFFF',
          border: on ? '#8B7CF6' : '#E4CBD2',
          toggle: () => this.setState(s => ({
            prefs: s.prefs.includes(p.id) ? s.prefs.filter(x => x !== p.id) : s.prefs.concat(p.id)
          }))
        };
      }),

      jccStages: stages,
      jccFunnel: stages.map((s, ix) => ({
        name: s.name, count: s.count,
        width: Math.round((s.count / maxCount) * 100) + '%',
        color: funnelColors[ix]
      })),
      briefItems,
      jccReset: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ cards: MissionControlEngine.initialCards(), briefDone: [] }); },

      hubLeft: left,
      hubHeadline: left === 0 ? 'all clear today' : (left === 1 ? 'task left today' : 'tasks left today'),
      hubSub: left === 0 ? 'Rhythm complete — enjoy the evening' : 'Across the whole household',
      hubNumColor: left === 0 ? '#3E8E5A' : '#D9622B',
      hubPct: pct + '%',
      hubPctLabel: pct + '% · today\u2019s rhythm',
      hubTasks: tasks.map(task => ({
        label: task.label, time: task.time,
        ring: task.done ? '#D9622B' : '#C9B89D',
        fill: task.done ? '#D9622B' : 'transparent',
        tick: task.done ? '✓' : '',
        color: task.done ? '#A89C8C' : '#2A2622',
        deco: task.done ? 'line-through' : 'none',
        toggle: () => this.setState(s => ({ tasks: s.tasks.map(x => x.id === task.id ? { ...x, done: !x.done } : x) }))
      })),
      hubReset: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ tasks: MissionControlEngine.initialTasks() }); },
      weekDays, weekPct,

      tenants: this.tenantData.map((tn, ix) => ({
        name: tn.name, letter: tn.letter, mark: tn.color,
        textColor: ix === tenant ? tn.dark : '#5B6B7E',
        bg: ix === tenant ? tn.soft : 'rgba(255,255,255,0.55)',
        borderColor: ix === tenant ? tn.color : 'rgba(122,135,152,0.3)',
        select: () => this.setState({ tenant: ix })
      })),
      activeTenant: t,
      propStats: [
        { value: '128', label: 'LISTINGS' },
        { value: '42', label: 'ENQUIRIES' },
        { value: '17', label: 'INSPECTIONS' },
        { value: '9', label: 'APPLICATIONS' }
      ].map(s => ({ ...s, color: t.color })),
      propBars: [42, 65, 50, 78, 58, 88, 70].map((h, ix) => ({
        h: h + '%', color: t.color, op: 0.45 + (ix / 7) * 0.55
      }))
    };
  }
}
