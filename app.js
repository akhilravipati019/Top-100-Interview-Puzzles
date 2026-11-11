(function () {
  const puzzles = window.PUZZLES.slice().sort((a, b) => a.id - b.id);
  const byId = new Map(puzzles.map(p => [p.id, p]));
  const $ = s => document.querySelector(s);

  /* saved progress (ignored if storage is blocked) */
  let solved;
  try { solved = new Set(JSON.parse(localStorage.getItem('pz-solved') || '[]')); } catch (e) { solved = new Set(); }
  const save = () => { try { localStorage.setItem('pz-solved', JSON.stringify([...solved])); } catch (e) {} };

  /* ---------- contents ---------- */
  const f = { q: '', cat: 'All', diff: 'all', hide: false };
  const tmp = document.createElement('div');
  const plain = h => { tmp.innerHTML = h; return tmp.textContent; };
  const text = new Map(puzzles.map(p => [p.id, `${p.id} ${p.t} ${p.c} ${plain(p.q)}`.toLowerCase()]));

  [...new Set(puzzles.map(p => p.c))].sort().forEach(c => $('#catSel').add(new Option(c, c)));

  const visible = () => puzzles.filter(p =>
    (f.cat === 'All' || p.c === f.cat) &&
    (f.diff === 'all' || p.d === f.diff) &&
    (!f.hide || !solved.has(p.id)) &&
    (!f.q || text.get(p.id).includes(f.q)));

  function renderToc() {
    const list = visible();
    $('#toc').innerHTML = list.map(p =>
      `<li class="${solved.has(p.id) ? 'done' : ''}"><span class="n">${p.id}</span><a href="#/p/${p.id}">${p.t}</a><span class="meta">${p.c} · ${p.d}</span></li>`
    ).join('');
    $('#empty').hidden = list.length > 0;
    $('#progress').textContent = solved.size ? `You've solved ${solved.size} of ${puzzles.length}.` : '';
  }

  $('#search').addEventListener('input', e => { f.q = e.target.value.trim().toLowerCase(); renderToc(); });
  $('#catSel').addEventListener('change', e => { f.cat = e.target.value; renderToc(); });
  $('#diffSel').addEventListener('change', e => { f.diff = e.target.value; renderToc(); });
  $('#hideSolved').addEventListener('change', e => { f.hide = e.target.checked; renderToc(); });

  /* ---------- single puzzle ---------- */
  let current = null;

  function renderPuzzle(id) {
    const p = byId.get(id);
    if (!p) { location.hash = '#/'; return; }
    current = id;
    const list = visible().some(x => x.id === id) ? visible() : puzzles;
    const i = list.findIndex(x => x.id === id), prev = list[i - 1], next = list[i + 1];

    $('#pos').textContent = `${i + 1} of ${list.length}`;
    $('#pz').innerHTML = `
      <p class="meta-line">#${p.id} · ${p.c} · ${p.d}</p>
      <h1>${p.t}</h1>
      <p class="problem">${p.q}</p>
      ${p.setup ? `<div class="setup">${p.setup}</div>` : ''}
      <div class="buttons">
        <button data-show="hint" aria-expanded="false">Show hint</button>
        <button data-show="answer" aria-expanded="false">Show answer</button>
        <button data-show="sol" aria-expanded="false">Show solution</button>
      </div>
      <div class="box hint" data-part="hint" hidden><b>Hint.</b> ${p.hint}</div>
      <div class="box answer" data-part="answer" hidden><b>Answer.</b> ${p.ans}</div>
      <section class="sol" data-part="sol" hidden>
        <h2>Solution</h2>
        ${p.fig ? `<div class="fig">${p.fig}</div>` : ''}
        <ol class="steps">${p.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        <div class="box answer"><b>Answer.</b> ${p.ans}</div>
        <p class="idea">${p.idea}</p>
      </section>
      <label class="solved"><input type="checkbox" id="solvedCb" ${solved.has(id) ? 'checked' : ''}> I solved this one</label>`;

    $('#pn').innerHTML =
      (prev ? `<a class="prev" href="#/p/${prev.id}">← ${prev.id}. ${prev.t}</a>` : '') +
      (next ? `<a class="next" href="#/p/${next.id}">${next.id}. ${next.t} →</a>` : '');
    document.title = `${p.id}. ${p.t}`;
  }

  const labels = { hint: 'hint', answer: 'answer', sol: 'solution' };
  function toggle(name) {
    const btn = $(`#pz [data-show="${name}"]`);
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open);
    btn.textContent = (open ? 'Hide ' : 'Show ') + labels[name];
    $(`#pz [data-part="${name}"]`).hidden = !open;
  }

  $('#pz').addEventListener('click', e => {
    const b = e.target.closest('[data-show]');
    if (b) toggle(b.dataset.show);
  });
  $('#pz').addEventListener('change', e => {
    if (e.target.id !== 'solvedCb') return;
    e.target.checked ? solved.add(current) : solved.delete(current);
    save();
  });

  /* ---------- routing ---------- */
  let homeScroll = 0;
  function route() {
    const m = location.hash.match(/^#\/p\/(\d+)/);
    if (m) {
      if (!$('#home').hidden) homeScroll = scrollY;
      $('#home').hidden = true; $('#view').hidden = false;
      renderPuzzle(+m[1]);
      scrollTo(0, 0);
    } else {
      current = null;
      $('#view').hidden = true; $('#home').hidden = false;
      document.title = '100 Interview Puzzles';
      renderToc();
      requestAnimationFrame(() => scrollTo(0, homeScroll));
    }
  }
  addEventListener('hashchange', route);

  /* arrow keys move between puzzles, Esc goes back */
  document.addEventListener('keydown', e => {
    if (current == null || /INPUT|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowLeft') { const a = $('#pn .prev'); if (a) a.click(); }
    if (e.key === 'ArrowRight') { const a = $('#pn .next'); if (a) a.click(); }
    if (e.key === 'Escape') location.hash = '#/';
  });

  route();
})();
