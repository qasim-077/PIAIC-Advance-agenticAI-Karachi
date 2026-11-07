/* Shared behaviour: nav, theme, session clock, copy buttons, TOC scroll-spy, instructor notes. */
(function () {
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  window.piaicStore = store;

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const savedTheme = store.get('piaic-theme', null);
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  /* ---------- nav ---------- */
  const header = document.getElementById('nav');
  if (header) {
    const page = header.dataset.page;
    const link = (href, label, key) =>
      `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;
    header.className = 'topnav';
    header.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html"><span class="brand-mark">AI</span>
        <span class="brand-text">PIAIC Agentic AI<small>Karachi · Chapter 1</small></span></a>
      <nav class="navlinks" aria-label="Main">
        ${link('index.html', 'Session', 'home')}
        ${link('theory.html', 'Theory', 'theory')}
        ${link('lab.html', 'Lab 1', 'lab')}
      </nav>
      <div class="timer" id="clock" title="Session clock — shared across pages">
        <span class="t-label">⏱</span><output>0:00:00</output>
        <button type="button" data-act="toggle" aria-label="Start or pause the session clock">▶</button>
        <button type="button" data-act="reset" aria-label="Reset the session clock">↺</button>
      </div>
      <button class="iconbtn" id="themeBtn" type="button" aria-label="Toggle dark mode">◐</button>
    </div>`;

    document.getElementById('themeBtn').addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('piaic-theme', next);
    });

    /* ---------- session clock (3 h total, persisted across pages) ---------- */
    const clock = document.getElementById('clock');
    const out = clock.querySelector('output');
    const toggleBtn = clock.querySelector('[data-act="toggle"]');
    const TOTAL = 3 * 3600;
    let st = store.get('piaic-clock', { running: false, startedAt: 0, banked: 0 });
    const elapsed = () => st.banked + (st.running ? (Date.now() - st.startedAt) / 1000 : 0);
    const fmt = s => { s = Math.max(0, Math.floor(s)); return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
    function paint() {
      const e = elapsed();
      out.textContent = fmt(e);
      clock.classList.toggle('running', st.running);
      clock.classList.toggle('over', e > TOTAL);
      toggleBtn.textContent = st.running ? '❚❚' : '▶';
      document.dispatchEvent(new CustomEvent('piaic:clock', { detail: { elapsed: e, running: st.running } }));
    }
    clock.addEventListener('click', ev => {
      const act = ev.target.dataset.act;
      if (act === 'toggle') {
        if (st.running) { st.banked = elapsed(); st.running = false; }
        else { st.running = true; st.startedAt = Date.now(); }
      } else if (act === 'reset') {
        if (!confirm('Reset the 3-hour session clock to 0:00:00?')) return;
        st = { running: false, startedAt: 0, banked: 0 };
      } else return;
      store.set('piaic-clock', st); paint();
    });
    window.addEventListener('storage', e => { if (e.key === 'piaic-clock') { st = store.get('piaic-clock', st); paint(); } });
    paint(); setInterval(paint, 1000);
    window.piaicClock = { elapsed };
  }

  /* ---------- copy buttons on .code blocks ---------- */
  document.querySelectorAll('.code[data-copy]').forEach(block => {
    const b = document.createElement('button');
    b.className = 'copy'; b.type = 'button'; b.textContent = 'Copy';
    b.addEventListener('click', async () => {
      const text = block.dataset.copyText || [...block.childNodes].filter(n => n !== b).map(n => n.textContent).join('').trim();
      try { await navigator.clipboard.writeText(text); b.textContent = 'Copied ✓'; }
      catch (e) { b.textContent = 'Select & copy'; }
      setTimeout(() => (b.textContent = 'Copy'), 1600);
    });
    block.appendChild(b);
  });

  /* ---------- TOC scroll-spy ---------- */
  const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')];
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove('active'));
          const a = map.get(en.target.id); if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- instructor notes toggle ---------- */
  const teachToggle = document.getElementById('teachToggle');
  if (teachToggle) {
    const apply = on => { document.body.classList.toggle('hide-teach', !on); teachToggle.setAttribute('aria-pressed', String(on)); };
    apply(store.get('piaic-teach', true));
    teachToggle.addEventListener('click', () => { const on = teachToggle.getAttribute('aria-pressed') !== 'true'; store.set('piaic-teach', on); apply(on); });
  }
})();
