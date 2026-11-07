/* Theory page widgets. Each block is independent; all content comes from Chapter 1 of The AI Agent Factory. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function pressGroup(btns, active) { btns.forEach(b => b.setAttribute('aria-pressed', String(b === active))); }

  /* ================= Maria's week ================= */
  const SCENES = [
    {
      chat: [['me', 'Summarize these vendor invoices.'], ['sys', '15 invoice PDFs attached'], ['ai', 'A tidy paragraph comes back.']],
      side: `<p class="eyebrow">What happened</p>
        <p style="margin-top:6px">She copies the totals into a spreadsheet by hand, checks two against the PDFs, and spends another <b>40 minutes</b> copying the rest. She used the tool exactly as she learned to in 2023.</p>
        <p style="margin-top:10px">The same box could have read every invoice, built the spreadsheet, checked each total, and flagged the one invoice billed twice.</p>
        <p style="margin-top:14px"><span class="stamp">Duplicate paid · $4,850</span></p>`
    },
    {
      chat: [['me', 'A report of unpaid vendor bills by how overdue they are.'], ['ai', 'Builds a spreadsheet, and shows a short summary in the reply.'], ['sys', 'She reads the summary and closes the tab.']],
      side: `<p class="eyebrow">What happened</p>
        <p style="margin-top:6px">Her manager said "let the AI do it," and this time the AI did the work: a real spreadsheet.</p>
        <p style="margin-top:10px">But it was built in a <b>temporary workspace</b>, and never saved in a place she could open again.</p>
        <p style="margin-top:14px"><span class="stamp ok">Work done</span> &nbsp; <span class="stamp">Not kept</span></p>`
    },
    {
      chat: [['me', 'Last week\'s spreadsheet, updated.'], ['sys', 'The summary is still in the conversation.'], ['sys', 'The spreadsheet is not.']],
      side: `<p class="eyebrow">The three questions</p>
        <ul style="margin:8px 0 0;padding-left:18px">
          <li><b>Continuity</b>: real. The conversation remembered her, and the summary was right there.</li>
          <li><b>Where it ran</b>: she never asked.</li>
          <li><b>Where it was kept</b>: nowhere she could reach.</li>
        </ul>
        <p style="margin-top:14px" class="big-quote">Remembering is not keeping.</p>`
    }
  ];
  const sceneEl = $('#scene');
  function showScene(i) {
    const s = SCENES[i];
    sceneEl.innerHTML = `<div class="chatbox">${s.chat.map(([w, t], k) => `<div class="bubble ${w}" style="animation-delay:${reduce ? 0 : k * 0.35}s">${esc(t)}</div>`).join('')}</div><div class="card flat reveal">${s.side}</div>`;
  }
  $$('.days button').forEach(b => b.addEventListener('click', () => { pressGroup($$('.days button'), b); showScene(+b.dataset.day); }));
  showScene(0);

  /* ================= 1.1 Ladder ================= */
  const RUNGS = [
    { key: 'search', name: 'Search engine', verb: 'queried', hand: 'A query', back: 'A list of links', who: 'You read, judge and act', life: 'Look up pizza places near you.', work: 'An AP clerk searches a vendor\'s website.', away: 10, ctl: 10 },
    { key: 'chatbot', name: 'Chatbot', verb: 'prompted', hand: 'A message', back: 'A reply', who: 'You copy, check and finish the job', life: 'Text a friend: "Which one is good?"', work: 'The clerk asks a chatbot what an invoice due date is.', away: 35, ctl: 30 },
    { key: 'agent', name: 'Agent', verb: 'delegated tasks', hand: 'A task', back: 'A finished output', who: 'The agent works, you review', life: 'Ask your roommate to order and pick it up.', work: 'The clerk delegates one invoice register to an agent.', away: 70, ctl: 62 },
    { key: 'worker', name: 'AI Worker', verb: 'managed', hand: 'A role', back: 'Recurring results, with evidence', who: 'The worker works, you manage', life: 'Put one person in charge of Friday dinners, every week.', work: 'The clerk manages an AP Worker that builds the register every week.', away: 92, ctl: 92 }
  ];
  const rungsEl = $('#ladderRungs'), detailEl = $('#rungDetail');
  rungsEl.innerHTML = RUNGS.map((r, i) => `<button class="rung" type="button" data-i="${i}"><small>Rung ${i + 1} · ${r.verb}</small><b>${r.name}</b></button>`).join('');
  function showRung(i) {
    $$('.rung', rungsEl).forEach((b, k) => { b.classList.toggle('on', k === i); b.classList.toggle('passed', k < i); });
    const r = RUNGS[i];
    detailEl.innerHTML = `<div class="reveal"><p class="eyebrow">Rung ${i + 1} of 4</p><h3 style="font-size:26px;margin-top:4px">${r.name}s are ${r.verb}</h3></div>
      <dl class="kv reveal"><dt>You hand over</dt><dd>${r.hand}</dd><dt>You get back</dt><dd>${r.back}</dd><dt>Who does the work</dt><dd>${r.who}</dd><dt>Everyday</dt><dd>${esc(r.life)}</dd><dt>At work</dt><dd>${esc(r.work)}</dd></dl>
      <div class="meter"><span>Work moved away from you</span><div class="progress"><i style="width:${r.away}%"></i></div></div>
      <div class="meter ctl"><span>Control you need</span><div class="progress"><i style="width:${r.ctl}%"></i></div></div>`;
  }
  rungsEl.addEventListener('click', e => { const b = e.target.closest('.rung'); if (b) showRung(+b.dataset.i); });
  showRung(0);
  let climbing = null;
  $('#climb').addEventListener('click', () => {
    if (climbing) return;
    let i = 0; showRung(0);
    climbing = setInterval(() => { i++; if (i >= RUNGS.length) { clearInterval(climbing); climbing = null; return; } showRung(i); }, reduce ? 200 : 1600);
  });

  const TRAITS = ['Identity', 'Responsibilities', 'Procedures (skills)', 'Knowledge access', 'Tools', 'Bounded authority', 'Channels', 'Evaluation criteria', 'Continuity for recurring work'];
  const traitsEl = $('#traits');
  traitsEl.innerHTML = TRAITS.map(t => `<button type="button" class="trait">${t}</button>`).join('');
  traitsEl.addEventListener('click', e => { const t = e.target.closest('.trait'); if (t) t.classList.toggle('lit'); });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(en => {
      if (en[0].isIntersecting) { io.disconnect(); $$('.trait', traitsEl).forEach((t, k) => setTimeout(() => t.classList.add('lit'), reduce ? 0 : 250 * k)); }
    }, { threshold: .6 });
    io.observe(traitsEl);
  }

  /* ---- sort-the-jobs game (examples from 1.1 and the lab's own worked example; not Task 6's jobs) ---- */
  const JOBS = [
    ['Look up pizza places near you', 'search'],
    ['Find a vendor\'s phone number on its website', 'search'],
    ['Text a friend: "Which pizza place is good?"', 'chatbot'],
    ['Ask a chatbot what an invoice due date is', 'chatbot'],
    ['Ask your roommate to order the pizza and pick it up', 'agent'],
    ['Delegate one invoice register to an agent', 'agent'],
    ['Turn last month\'s receipts into one expense report', 'agent'],
    ['Put one person in charge of Friday dinners, every week', 'worker'],
    ['An AP Worker builds the invoice register every week, with an owner', 'worker']
  ];
  const pool = $('#sortPool'), bins = $('#sortBins'), score = $('#sortScore');
  let picked = null;
  function sortInit() {
    picked = null;
    pool.innerHTML = shuffle(JOBS).map(([t, k]) => `<button type="button" class="jobcard" data-k="${k}" aria-pressed="false">${esc(t)}</button>`).join('');
    bins.innerHTML = RUNGS.map(r => `<div class="bin" data-k="${r.key}" role="button" tabindex="0" aria-label="Place on ${r.name}"><h4>${r.name}</h4><small class="muted">${r.hand.toLowerCase()}</small></div>`).join('');
    sortScore();
  }
  function sortScore() {
    const placed = $$('.placed', bins), ok = $$('.placed.ok', bins).length;
    score.textContent = placed.length ? `${ok} / ${placed.length} right · ${JOBS.length - placed.length} left` : `${JOBS.length} jobs to sort`;
    if (placed.length === JOBS.length) score.textContent += ok === JOBS.length ? ' · perfect!' : ' · red ones belong elsewhere';
  }
  pool.addEventListener('click', e => {
    const c = e.target.closest('.jobcard'); if (!c) return;
    picked = c === picked ? null : c;
    $$('.jobcard', pool).forEach(x => x.setAttribute('aria-pressed', String(x === picked)));
    $$('.bin', bins).forEach(b => b.classList.toggle('ready', !!picked));
  });
  function drop(bin) {
    if (!picked) return;
    const ok = picked.dataset.k === bin.dataset.k;
    const right = RUNGS.find(r => r.key === picked.dataset.k).name;
    bin.insertAdjacentHTML('beforeend', `<div class="placed ${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'} ${esc(picked.textContent)}${ok ? '' : ` <i class="muted">→ ${right}</i>`}</div>`);
    picked.remove(); picked = null;
    $$('.bin', bins).forEach(b => b.classList.remove('ready'));
    sortScore();
  }
  bins.addEventListener('click', e => { const b = e.target.closest('.bin'); if (b) drop(b); });
  bins.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('bin')) { e.preventDefault(); drop(e.target); } });
  $('#sortReset').addEventListener('click', sortInit);
  sortInit();

  /* ================= 1.2 Router ================= */
  const PARTS = {
    outcome: 'Outcome:     One spreadsheet of all 15 invoices, every total checked\n             against its PDF, and any invoice billed twice flagged.',
    context: 'Context:     The attached PDFs are this month\'s vendor bills. None\n             is paid yet.',
    format: 'Format:      An .xlsx file I can open and keep, then three lines on\n             anything that needs my attention.',
    constraints: 'Constraints: Do not change the PDFs. If an amount is unclear, list\n             it and ask me.'
  };
  const on = { outcome: false, context: false, format: false, constraints: false };
  const reqBox = $('#reqBox'), verdict = $('#verdict'), svg = $('.route-svg');
  let lastRoute = null, stepTimers = [];
  function renderReq(changed) {
    const any = Object.values(on).some(Boolean);
    const lines = [];
    lines.push(any ? `<span class="muted" style="text-decoration:line-through">Summarize these vendor invoices.</span>` : 'Summarize these vendor invoices.');
    Object.keys(PARTS).forEach(k => { if (on[k]) lines.push(`<span class="${k === changed ? 'add' : ''}">${esc(PARTS[k])}</span>`); });
    reqBox.innerHTML = lines.join('\n');
    const n = Object.values(on).filter(Boolean).length;
    const route = on.outcome ? 'work' : 'ans';
    $('#pAns').classList.toggle('live', route === 'ans'); $('#pAns').classList.add('ans');
    $('#pWork').classList.toggle('live', route === 'work');
    $('#nAns').classList.toggle('on', route === 'ans');
    $('#nWork').classList.toggle('on', route === 'work');
    let msg;
    if (n === 0) msg = '<b>Answer.</b> A tidy paragraph comes back. Everything beyond it is her job: she copies the totals by hand, and the $4,850 duplicate gets paid.';
    else if (!on.outcome) msg = '<b>Still an answer.</b> Context, format and limits help, but with no outcome there is no finished result for the box to aim at.';
    else if (n < 4) msg = `<b>Work.</b> A clear outcome usually gets work. ${n === 1 ? 'Now add context, format and constraints, so the finished result is the one you need.' : 'Add the remaining parts to say exactly what done looks like.'}`;
    else msg = '<b>Work, finished and checked.</b> The box did not change. What she wrote did.';
    verdict.className = 'verdict ' + (route === 'work' ? 'work' : 'ans');
    verdict.innerHTML = msg;
    stepTimers.forEach(clearTimeout); stepTimers = [];
    $$('.ws').forEach(w => w.classList.remove('on'));
    if (route === 'work') $$('.ws').forEach((w, k) => stepTimers.push(setTimeout(() => w.classList.add('on'), reduce ? 0 : 900 + k * 450)));
    if (route !== lastRoute || changed) sendPacket(route);
    lastRoute = route;
  }
  function sendPacket(route) {
    const pk = $('#packet');
    pk.innerHTML = '';
    const am = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    am.setAttribute('dur', reduce ? '0.01s' : '1.1s'); am.setAttribute('fill', 'freeze'); am.setAttribute('begin', 'indefinite');
    const mp = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
    mp.setAttribute('href', route === 'work' ? '#pWork' : '#pAns');
    mp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', route === 'work' ? '#pWork' : '#pAns');
    am.appendChild(mp); pk.appendChild(am);
    pk.setAttribute('opacity', '1');
    pk.style.fill = route === 'work' ? 'var(--accent)' : 'var(--gold)';
    try { am.beginElement(); } catch (e) {}
  }
  $$('#briefChips .chip').forEach(c => c.addEventListener('click', () => {
    const k = c.dataset.part; on[k] = !on[k]; c.setAttribute('aria-pressed', String(on[k]));
    c.textContent = (on[k] ? '✓ ' : '+ ') + k[0].toUpperCase() + k.slice(1);
    renderReq(on[k] ? k : null);
  }));
  renderReq(null);

  const ERA = [
    ['The same text box', 'A conversation that gives you text', 'One conversation that routes between answering and working'],
    ['A message you type', 'A question', 'A brief that states an outcome, its context, a format and its constraints'],
    ['A reply', 'Text you copy somewhere else', 'A finished file, or a document, deck or design you edit in place'],
    ['A wait at the keyboard', 'You wait for the reply', 'A task that runs while you are away, or on a schedule'],
    ['A browser tab', 'A web page', 'A way into your own computer\'s folders, browser and apps, through a desktop app'],
    ['Scrolling back to see what happened', 'The chat history', 'A panel beside the conversation that shows the plan, the outputs and the tools used'],
    ['A small settings menu', 'Preferences', 'Permissions and connections that decide what the work can touch']
  ];
  function era(y) {
    $('#eraHead').textContent = y === '2026' ? 'What is now behind it (2026)' : 'What was behind it (2023, mostly)';
    $('#eraBody').innerHTML = ERA.map(r => `<tr><td>${r[0]}</td><td class="${y === '2026' ? 'now' : ''}">${esc(y === '2026' ? r[2] : r[1])}</td></tr>`).join('');
  }
  $$('[data-era]').forEach(b => b.addEventListener('click', () => { pressGroup($$('[data-era]'), b); era(b.dataset.era); }));
  era('2026');

  /* ================= 1.3 Loop ================= */
  const STEPS = [
    [0, 'Plan: read 15 PDFs → build register.xlsx → check every total'],
    [1, 'Build: python build_register.py → register.xlsx written'],
    [2, 'Check: re-open register.xlsx, compare each total with its PDF → 1 mismatch'],
    [3, 'Fix: correct that row, rebuild the file'],
    [1, 'Build: register.xlsx rewritten'],
    [2, 'Check: every total matches its PDF ✓'],
    [-1, 'Deliver: register.xlsx → you. Now you verify the outcome.']
  ];
  const ANG = [-90, 0, 90, 180];
  const bot = $('#bot'), log = $('#loopLog');
  let botAng = -90, loopBusy = false;
  function moveBot(to, ms) {
    return new Promise(res => {
      let from = botAng; while (to <= from) to += 360;
      const t0 = performance.now();
      (function f(t) {
        const p = Math.min(1, (t - t0) / ms), a = from + (to - from) * (1 - Math.pow(1 - p, 2));
        const r = a * Math.PI / 180; bot.setAttribute('cx', 160 + 100 * Math.cos(r)); bot.setAttribute('cy', 150 + 100 * Math.sin(r));
        if (p < 1) requestAnimationFrame(f); else { botAng = to % 360; res(); }
      })(t0);
    });
  }
  $('#loopPlay').addEventListener('click', async () => {
    if (loopBusy) return; loopBusy = true;
    for (const [s, msg] of STEPS) {
      if (s >= 0) { await moveBot(ANG[s], reduce ? 1 : 700); $$('.loop-svg .st').forEach(g => g.classList.toggle('on', +g.dataset.s === s)); }
      else $$('.loop-svg .st').forEach(g => g.classList.remove('on'));
      log.textContent = msg;
      await new Promise(r => setTimeout(r, reduce ? 300 : 1100));
    }
    loopBusy = false;
  });
  $('#boundaryBtn').addEventListener('click', e => {
    const b = e.currentTarget, v = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(v)); $('#outside').hidden = !v;
  });

  /* ================= 1.4 CEP toggles ================= */
  const cep = { c: 1, e: 1, p: 0 };
  const CEP_TXT = {
    c: [['No', 'It starts fresh. You brief it again.', 'Starts fresh'], ['Yes', 'It continues yesterday\'s work.', 'Picks up where it left off']],
    e: [['No', 'The work runs on your computer. Keep it awake.', 'Laptop must stay open'], ['Yes', 'The work runs on a cloud computer.', 'Laptop can close']],
    p: [['Maybe not', 'The workspace can be deleted, and the report with it.', 'Report may be lost'], ['Yes', 'It is saved in a shared folder you can open.', 'Report is kept']]
  };
  function renderCep() {
    ['c', 'e', 'p'].forEach(k => {
      const [a, d] = CEP_TXT[k][cep[k]], el = $('#ans' + k.toUpperCase());
      el.className = 'ans ' + (cep[k] ? 'good' : 'bad'); el.innerHTML = `<b>${a}</b>${d}`;
    });
    $('#cepSum').innerHTML = ['c', 'e', 'p'].map(k => `<span class="${cep[k] ? 'good' : 'bad'}">${CEP_TXT[k][cep[k]][2]}</span>`).join('');
    let line;
    if (cep.c && !cep.p) line = 'It remembers the report, and the report can still be gone. Remembering is not keeping.';
    else if (!cep.c && cep.p) line = 'It forgets the work, and the report is still safe. Keeping is not remembering.';
    else if (cep.c && cep.p) line = 'It remembers, and the report is kept: two separate wins, from two separate choices.';
    else line = 'It starts fresh, and the report may be gone. Brief it fully, and save to a known place.';
    $('#cepLine').textContent = line;
  }
  $$('#cepWidget .seg').forEach(seg => seg.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    pressGroup($$('button', seg), b); cep[seg.dataset.q] = +b.dataset.v; renderCep();
  }));
  renderCep();

  /* ---- three places game ---- */
  const PLACES = [
    { k: 'acct', name: 'Your account or workspace', sub: 'Durable. Some personal, some shared.' },
    { k: 'env', name: 'The execution environment', sub: 'Often temporary. Check each product.' },
    { k: 'pc', name: 'Your own computer', sub: 'As long as you keep them. Cloud work reaches them only through a desktop app.' }
  ];
  const ITEMS = [
    ['The conversation transcript', 'acct'], ['A spreadsheet the task delivered to you', 'acct'], ['A doc in the Artifacts section', 'acct'], ['A schedule you set up', 'acct'],
    ['A scratch file the task made midway', 'env'], ['A Python package the task installed', 'env'], ['Half-finished work in progress', 'env'],
    ['Your Documents folder', 'pc'], ['Your browser sessions', 'pc'], ['The apps on your laptop', 'pc']
  ];
  const pPool = $('#placePool'), pBins = $('#placeBins'), pScore = $('#placeScore');
  let pPicked = null;
  function placeInit() {
    pPicked = null;
    pPool.innerHTML = shuffle(ITEMS).map(([t, k]) => `<button type="button" class="jobcard" data-k="${k}" aria-pressed="false">${esc(t)}</button>`).join('');
    pBins.innerHTML = PLACES.map(p => `<div class="place" data-k="${p.k}" role="button" tabindex="0"><h4>${p.name}</h4><p>${p.sub}</p></div>`).join('');
    placeScore();
  }
  function placeScore() {
    const n = $$('.placed', pBins).length, ok = $$('.placed.ok', pBins).length;
    pScore.textContent = n ? `${ok} / ${n} right` + (n === ITEMS.length ? (ok === n ? ' · perfect!' : '') : '') : `${ITEMS.length} items`;
  }
  pPool.addEventListener('click', e => {
    const c = e.target.closest('.jobcard'); if (!c) return;
    pPicked = c === pPicked ? null : c;
    $$('.jobcard', pPool).forEach(x => x.setAttribute('aria-pressed', String(x === pPicked)));
    $$('.place', pBins).forEach(b => b.classList.toggle('ready', !!pPicked));
  });
  function pDrop(bin) {
    if (!pPicked) return;
    const ok = pPicked.dataset.k === bin.dataset.k, right = PLACES.find(p => p.k === pPicked.dataset.k).name;
    bin.insertAdjacentHTML('beforeend', `<div class="placed ${ok ? 'ok' : 'no'}" style="margin-top:6px">${ok ? '✓' : '✗'} ${esc(pPicked.textContent)}${ok ? '' : ` <i class="muted">→ ${right}</i>`}</div>`);
    pPicked.remove(); pPicked = null; $$('.place', pBins).forEach(b => b.classList.remove('ready')); placeScore();
  }
  pBins.addEventListener('click', e => { const b = e.target.closest('.place'); if (b) pDrop(b); });
  pBins.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('place')) { e.preventDefault(); pDrop(e.target); } });
  $('#placeReset').addEventListener('click', placeInit);
  placeInit();

  /* ---- desktop bridge ---- */
  $$('[data-desk]').forEach(b => b.addEventListener('click', () => {
    pressGroup($$('[data-desk]'), b);
    const open = b.dataset.desk === '1';
    $('#bridge').classList.toggle('closed', !open);
    $('#bridgeTxt').textContent = open ? 'The task can reach only the folders you connected, and only while Desktop is open.' : 'Desktop closed: the task keeps running, but cannot reach your folders.';
  }));

  /* ================= 1.5 Tabs ================= */
  $$('#vendorTabs [role="tab"]').forEach(t => t.addEventListener('click', () => {
    $$('#vendorTabs [role="tab"]').forEach(x => x.setAttribute('aria-selected', String(x === t)));
    $$('.tabpanel').forEach(p => (p.hidden = p.dataset.panel !== t.dataset.tab));
  }));

  /* ---- machine or record ---- */
  const MR = {
    task: {
      m: [{ s: 4, e: 40, label: 'Sandbox · run 1', cls: '', die: true }, { s: 58, e: 86, label: 'Sandbox · run 2', cls: '', die: true }],
      r: [{ s: 4, w: 13, label: 'Brief' }, { s: 22, w: 15, label: 'History' }, { s: 40, w: 15, label: 'Artifact' }, { s: 58, w: 14, label: 'Run log' }, { s: 86, w: 12, label: 'Artifact 2' }],
      text: 'For a delegated task, the machine is always disposable and the record is always durable. Each run is born in a fresh sandbox and destroyed. Between runs there is no machine at all, only the saved brief and run history.'
    },
    stand: {
      m: [{ s: 4, e: 96, label: 'Its own computer · lifespan not stated', cls: 'stand', die: false }],
      r: [{ s: 4, w: 26, label: 'Memory & context' }, { s: 40, w: 18, label: 'Morning brief' }, { s: 72, w: 18, label: 'Results' }],
      text: 'A standing worker stands it on its head: the machine itself is the standing thing. A dot has its own cloud computer; Duet its own virtual machine. Neither launch page says how long the files on it last.'
    },
    oss: {
      m: [{ s: 4, e: 96, label: 'Your hardware · lasts as long as you keep it', cls: 'own', die: false }],
      r: [{ s: 8, w: 30, label: 'Files in your folders' }, { s: 50, w: 30, label: 'Memory & passwords on disk' }],
      text: 'Open source moves the machine onto your own hardware. It lasts as long as you keep it, and so does everything on it, including the passwords you gave it. Your prompts still go to whoever runs the model.'
    }
  };
  let mrMode = 'task', mrRaf = null;
  const laneM = $('#laneM'), laneR = $('#laneR');
  function mrClear() { $$('.mach,.rec', laneM).concat($$('.mach,.rec', laneR)).forEach(e => e.remove()); }
  function mrDraw(t) {
    const d = MR[mrMode];
    $('#ph1').style.left = $('#ph2').style.left = t + '%';
    d.m.forEach((m, i) => {
      let el = laneM.querySelector(`[data-i="${i}"]`);
      if (t < m.s) return;
      if (!el) { el = document.createElement('div'); el.className = 'mach ' + m.cls; el.dataset.i = i; el.textContent = m.label; el.style.left = m.s + '%'; laneM.appendChild(el); }
      el.style.width = (Math.min(t, m.e) - m.s) + '%';
      if (m.die && t >= m.e) { el.classList.add('gone'); el.textContent = '✗ destroyed'; }
    });
    d.r.forEach((r, i) => {
      if (t < r.s || laneR.querySelector(`[data-i="${i}"]`)) return;
      const el = document.createElement('div'); el.className = 'rec'; el.dataset.i = i; el.textContent = r.label;
      el.style.left = r.s + '%'; el.style.width = r.w + '%'; laneR.appendChild(el);
    });
  }
  function mrPlay() {
    cancelAnimationFrame(mrRaf); mrClear(); $('#mrText').textContent = '';
    const dur = reduce ? 10 : 6500, t0 = performance.now();
    (function f(now) {
      const t = Math.min(100, (now - t0) / dur * 100); mrDraw(t);
      if (t < 100) mrRaf = requestAnimationFrame(f); else $('#mrText').textContent = MR[mrMode].text;
    })(t0);
  }
  $$('#mrMode button').forEach(b => b.addEventListener('click', () => { pressGroup($$('#mrMode button'), b); mrMode = b.dataset.m; mrPlay(); }));
  $('#mrPlay').addEventListener('click', mrPlay);
  mrClear(); mrDraw(100); $('#mrText').textContent = MR.task.text;

  /* ================= 1.6 Paradigm or product ================= */
  const PP = [
    ['Work is moving from message, to task, to role.', 'paradigm'],
    ['Dots are rolling out to Pro and Business Premium users in eligible markets.', 'product'],
    ['Every request is routed one of two ways: to answering, or to working.', 'paradigm'],
    ['Claude Duet has a waitlist for US subscribers.', 'product'],
    ['Anything you want to keep must be saved to a known place.', 'paradigm'],
    ['Handing off tasks in Claude starts with the Pro plan.', 'product'],
    ['The Claude desktop app for Linux is in beta.', 'product']
  ];
  const ppList = $('#ppList');
  ppList.innerHTML = PP.map(([t, k], i) => `<div class="pp-item" data-k="${k}" data-i="${i}"><span>${esc(t)}</span><span class="row" style="gap:6px"><button class="btn small" type="button" data-a="paradigm">Paradigm</button><button class="btn small" type="button" data-a="product">Product</button></span></div>`).join('');
  ppList.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const it = b.closest('.pp-item'); if (it.classList.contains('ok') || it.classList.contains('no')) return;
    const ok = b.dataset.a === it.dataset.k; it.classList.add(ok ? 'ok' : 'no');
    $$('button', it).forEach(x => (x.disabled = true));
    b.textContent = (ok ? '✓ ' : '✗ ') + b.textContent;
    const done = $$('.pp-item.ok,.pp-item.no', ppList).length, okN = $$('.pp-item.ok', ppList).length;
    $('#ppScore').textContent = `${okN} / ${done}`;
    if (done === PP.length) ppList.insertAdjacentHTML('beforeend', `<div class="callout warn reveal" style="margin-top:6px"><b>Two opposite errors.</b> Dismissing the paradigm because a product is unfinished ("It's only a preview, so it doesn't matter"). Building on a product claim that isn't true for you yet ("The launch post says it, so my client has it").</div>`);
  });

  const QS = ['1 · Which rung is it?', '2 · Where does it run, and where are results kept?', '3 · Who is it acting as?', '4 · What is its status?'];
  const ANA = {
    'Claude cloud task': ['Agent: a delegated task. It is briefed, runs, and ends.', 'An isolated, temporary sandbox on Anthropic\'s servers, destroyed when the session ends. Results are kept in your account: artifacts, and file cards in the chat.', 'You: it works with your login and the apps and folders you connect. Fine for personal work.', 'Pro, Max and Ultra; beta on Team; Enterprise owners turn it on (as of Nov 2026).'],
    'OpenAI dot': ['Close to a Standing AI Worker: always on, keeps context between conversations, takes initiative.', 'Its own cloud computer and browser; it can use your laptop with permission. How long its files last is not stated.', 'It acts across your apps through plugins, under Custom Rules you set. Activity View shows its work.', 'Rolling out to Pro and Business Premium in eligible markets; Enterprise beta.'],
    'Claude Duet': ['Close to a Standing AI Worker: one ongoing thread, a morning brief, checks your accounts every few hours.', 'Its own virtual machine with its own browser, so your laptop and phone can be off. How long its files last is not stated.', 'It starts with your account\'s memory, skills and connected apps, and waits for approval before it sends, pays, signs or deletes.', 'Research preview, with a waitlist for US Pro, Max and Ultra subscribers.'],
    'OpenClaw': ['A standing assistant for ongoing work. A proactive check wakes it every 30 minutes by default.', 'On hardware you control; its tools run directly on your computer unless you set up a sandbox. Your prompts still go to the model\'s company.', 'Whatever accounts and passwords you give it. So give it its own accounts, the smallest permissions, and a separate machine.', 'Free and open source (MIT), run by the OpenClaw Foundation. Not on Anthropic\'s exams.']
  };
  const anaPick = $('#anaPick'), anaGrid = $('#anaGrid');
  anaPick.innerHTML = Object.keys(ANA).map((k, i) => `<button class="chip" type="button" aria-pressed="${i === 0}">${k}</button>`).join('');
  function showAna(k) {
    anaGrid.innerHTML = QS.map((q, i) => `<div class="ana"><h4>${q}</h4><button class="btn small reveal-btn" type="button" data-i="${i}">Reveal</button><p class="a" hidden>${esc(ANA[k][i])}</p></div>`).join('');
  }
  anaPick.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; pressGroup($$('.chip', anaPick), b); showAna(b.textContent); });
  anaGrid.addEventListener('click', e => { const b = e.target.closest('.reveal-btn'); if (!b) return; b.nextElementSibling.hidden = false; b.remove(); });
  showAna(Object.keys(ANA)[0]);

  /* ================= Quiz ================= */
  const QUIZ = [
    ['On the ladder of interaction, what do you hand over to an AI Worker?', ['A single task with a clear finish', 'A message that asks for a reply', 'A role with recurring responsibilities', 'A query that returns ranked links'], 2, 'Query → message → task → role. A role brings recurring results, and you manage it.'],
    ['Which line completes the ladder? "Search engines are queried. Chatbots are prompted. …"', ['Agents are managed. AI Workers are delegated tasks.', 'Agents are queried. AI Workers are prompted daily.', 'Agents are delegated tasks. AI Workers are managed.', 'Agents are prompted. AI Workers are given roles.'], 2, 'Agents are delegated tasks. AI Workers are managed.'],
    ['In 2026, what decides whether the text box answers you or starts working?', ['The length of your paid subscription', 'Mostly what you write: the brief you give it', 'The model you picked from the model menu', 'A mode switch you must click before typing'], 1, 'Often the system decides, mostly from what you write. A clear outcome usually gets work.'],
    ['When a request becomes work, what does the work need?', ['Only a longer reply in the same conversation', 'A new account on a separate vendor\'s platform', 'An execution environment with files, tools and limits', 'A second person to approve every step'], 2, 'An execution environment: a file system, tools, a shell, and limits on what it can reach.'],
    ['The environment\'s isolation limits…', ['Everything the agent can read or do', 'Where the agent\'s code runs and what that code can reach', 'Only which model the agent uses', 'What you can upload'], 1, 'It is a boundary only for code. It does not limit what the agent does through the apps and folders you connect.'],
    ['Which of these is durable account state?', ['A scratch file the task made midway', 'A Python package the task installed', 'Half-finished work left in the environment', 'A spreadsheet the task delivered to you'], 3, 'Delivered outputs live in your account. The other three live in the (often temporary) environment.'],
    ['Maria\'s summary survived, but her spreadsheet did not. Why?', ['The AI forgot her between sessions', 'The summary was part of the conversation; the spreadsheet was built in a temporary workspace and never saved where she could reach it', 'She was on a free plan', 'Spreadsheets cannot be made by AI'], 1, 'Continuity was real. Persistence was the problem. Remembering is not keeping.'],
    ['A cloud task needs a file in a folder on your laptop. What must be true?', ['Nothing: cloud tasks see your whole disk', 'The desktop app is open on that computer, with that folder connected', 'You must upload your whole Documents folder', 'The laptop must be in sleep mode'], 1, 'Cloud work reaches your computer only through a desktop app that is open, and only the folders you connected.'],
    ['Which OpenAI product is an always-on agent with its own cloud computer?', ['A dot, reachable in ChatGPT, Slack and Teams', 'Scheduled tasks in the ChatGPT app', 'A ChatGPT task, given as a clear outcome', 'ChatGPT chat, for a question or a draft'], 0, 'A dot keeps working between conversations, with its own cloud computer and browser.'],
    ['In "which surface for which job", what is a schedule?', ['A fourth rung on the ladder', 'A standing worker', 'Not a third choice: the same task, started by a clock instead of you', 'A kind of chat'], 2, 'A schedule repeats a task. The work runs the same way; a clock starts it.'],
    ['Which question belongs to the paradigm, not to the dated product boxes?', ['Which plans get the rollout first?', 'Can I use this today on my current plan?', 'Is this feature available in my market?', 'Is this a real shift in how work is done?'], 3, 'The paradigm asks whether work is really changing. Plans, markets and rollouts are product questions.'],
    ['Complete the ownership rule: "The platforms are rented. …"', ['The models are free.', 'The knowledge and the controls are yours.', 'The sandboxes are permanent.', 'The prompts are private.'], 1, 'Whatever lives only on a vendor\'s machine is rented too. What you own is what you keep in records you control.']
  ];
  let qi = 0; const qAns = new Array(QUIZ.length).fill(null);
  function renderQ() {
    const [q, opts, right, why] = QUIZ[qi], a = qAns[qi];
    $('#qCount').textContent = `Question ${qi + 1} / ${QUIZ.length}`;
    const done = qAns.filter(x => x !== null).length, ok = qAns.filter((x, i) => x === QUIZ[i][2]).length;
    $('#qScore').textContent = `${ok} correct · ${done} answered`;
    $('#qBar').style.width = (done / QUIZ.length * 100) + '%';
    $('#qBody').innerHTML = `<p class="quiz-q">${esc(q)}</p><div class="quiz-opts">${opts.map((o, i) => {
      let cls = ''; if (a !== null) { if (i === right) cls = 'right'; else if (i === a) cls = 'wrong'; }
      return `<button type="button" class="${cls}" data-i="${i}" ${a !== null ? 'disabled' : ''}><b>${'ABCD'[i]}</b><span>${esc(o)}</span></button>`;
    }).join('')}</div>${a !== null ? `<p class="quiz-why reveal">${a === right ? '✓ ' : '✗ '}${esc(why)}</p>` : ''}`;
    $('#qPrev').disabled = qi === 0;
    $('#qNext').textContent = qi === QUIZ.length - 1 ? 'Restart ↺' : 'Next →';
  }
  $('#qBody').addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (!b || qAns[qi] !== null) return; qAns[qi] = +b.dataset.i; renderQ(); });
  $('#qPrev').addEventListener('click', () => { if (qi > 0) { qi--; renderQ(); } });
  $('#qNext').addEventListener('click', () => { if (qi === QUIZ.length - 1) { qAns.fill(null); qi = 0; } else qi++; renderQ(); });
  renderQ();
})();
