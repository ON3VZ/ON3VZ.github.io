/* BAFARA Award OR80AF tracker, added 2026-10-08.
   Reads assets/bafara80/stations.json and result.json only.
   Remove together with the OR80AF post. */
'use strict';

const B80 = {
  base: '/assets/bafara80/',
  bands: ['80m', '40m', '30m', '20m', '15m', '10m'],   // fixed columns, Class C HF set
  modes: ['CW', 'PHONE', 'DIGI'],
  modeLabel: { CW: 'CW', PHONE: 'Phone', DIGI: 'Digi' },
  na: { '30m|PHONE': true },                           // no phone on 30 m
  catOrder: { HQ: 0, AIRBASE: 1, MEMBER: 2 },
  catLabel: { HQ: 'HQ', AIRBASE: 'Air base', MEMBER: 'Member' },
  grpLabel: { HQ: 'HQ station', AIRBASE: 'Air base stations', MEMBER: 'Member stations' },
  endDate: '2026-10-31',
};

const st = { ref: null, res: null, bands: [], worked: new Map(), band: 'all', view: 'all', q: '', ended: false, wired: false, alertsWired: false };

document.addEventListener('DOMContentLoaded', load);
window.B80_load = load;   // lets the page re-read the data

function load() {
  const ts = '?t=' + Date.now();
  return Promise.all([
    fetch(B80.base + 'stations.json' + ts).then(r => r.json()),
    fetch(B80.base + 'result.json' + ts).then(r => (r.ok ? r.json() : { worked: [], score: {}, frozen: false })),
  ]).then(([ref, res]) => {
    st.ref = ref; st.res = res; st.worked = new Map();
    const today = new Date().toISOString().slice(0, 10);
    st.ended = !!res.frozen || today > B80.endDate;
    st.bands = B80.bands.slice();
    (res.worked || []).forEach(w => {
      st.worked.set(w.call + '|' + w.band + '|' + w.mode, w.date);
      if (!st.bands.includes(w.band)) st.bands.push(w.band);   // never hide a real contact
    });
    if (!st.wired) { wire(); st.wired = true; }
    renderAll();
  }).catch(() => {
    document.getElementById('b80Table').innerHTML = '<tbody><tr><td>The data could not be loaded.</td></tr></tbody>';
  });
}

function pts(cat, mode) { return st.ref.points[cat][mode]; }
function isNa(band, mode) { return !!B80.na[band + '|' + mode]; }
function isDone(call, band, mode) { return st.worked.has(call + '|' + band + '|' + mode); }

function sortedStations() {
  return st.ref.stations.slice().sort((a, b) =>
    (B80.catOrder[a.cat] - B80.catOrder[b.cat]) || a.call.localeCompare(b.call));
}

function neededCombos(bands) {
  const out = [];
  sortedStations().forEach(s => bands.forEach(b => B80.modes.forEach(m => {
    if (!isNa(b, m) && !isDone(s.call, b, m)) out.push({ call: s.call, cat: s.cat, band: b, mode: m, pts: pts(s.cat, m) });
  })));
  return out;
}

/* ── WIRING ── */
function wire() {
  const bandBox = document.getElementById('b80BandChips');
  bandBox.innerHTML = chip('all', 'All', true) + st.bands.map(b => chip(b, b, false)).join('');
  bandBox.addEventListener('click', e => {
    const c = e.target.closest('.b80-chip'); if (!c) return;
    st.band = c.dataset.v; setPressed(bandBox, st.band); renderMatrix();
  });
  const viewBox = document.getElementById('b80ViewChips');
  viewBox.innerHTML = chip('all', 'All', true) + chip('needed', 'To do', false) + chip('worked', 'Worked', false);
  viewBox.addEventListener('click', e => {
    const c = e.target.closest('.b80-chip'); if (!c) return;
    st.view = c.dataset.v; setPressed(viewBox, st.view); renderMatrix();
  });
  document.getElementById('b80Search').addEventListener('input', e => {
    st.q = e.target.value.trim().toUpperCase(); renderMatrix();
  });
}
function chip(v, label, on) {
  return '<button type="button" class="b80-chip" data-v="' + v + '" aria-pressed="' + on + '">' + label + '</button>';
}
function setPressed(box, v) {
  box.querySelectorAll('.b80-chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.v === v ? 'true' : 'false'));
}

/* ── RENDER ── */
function renderAll() {
  renderSummary(); renderRunway(); renderMatrix(); renderTargets(); renderAlerts(); renderLog();
}

function totals() {
  let points = 0;
  const catOf = {}; st.ref.stations.forEach(s => { catOf[s.call] = s.cat; });
  const calls = new Set();
  st.res.worked.forEach(w => { points += pts(catOf[w.call], w.mode); calls.add(w.call); });
  return { points, combos: st.res.worked.length, stations: calls.size };
}
function gradeFor(p) {
  let g = null; st.ref.grades.forEach(x => { if (p >= x.points) g = x; }); return g;
}

function renderSummary() {
  const t = totals(), g = gradeFor(t.points);
  const next = st.ref.grades.find(x => x.points > t.points);
  const total = st.ref.stations.length * (B80.bands.length * B80.modes.length - Object.keys(B80.na).length);
  set('b80Points', t.points);
  set('b80Grade', g ? 'Grade reached: ' + g.name : 'No grade yet');
  set('b80Combos', t.combos + ' of ' + total);
  set('b80Stations', t.stations);
  const nl = document.getElementById('b80Next');
  const ended = document.getElementById('b80Ended');
  ended.hidden = !st.ended;
  document.getElementById('b80DaysBox').hidden = st.ended;
  document.getElementById('b80TargetsBlock').hidden = st.ended;
  document.getElementById('b80AlertBlock').hidden = st.ended;
  if (st.ended) nl.textContent = g ? 'Final grade: ' + g.name : 'Final score';
  else if (next) nl.textContent = (next.points - t.points) + ' points to ' + next.name;
  else nl.textContent = 'Top grade reached';
  if (!st.ended) {
    const end = Date.UTC(2026, 9, 31, 23, 59, 59), now = Date.now();
    set('b80Days', Math.max(0, Math.ceil((end - now) / 86400000)));
  }
}

/* progress along the four grades: a runway with the jet at the current score */
function renderRunway() {
  const t = totals(), top = st.ref.grades[st.ref.grades.length - 1].points;
  const pct = Math.min(100, t.points / top * 100);
  let h = '<div class="b80-run-inner">';
  st.ref.grades.forEach(g => {
    const left = g.points / top * 100, done = t.points >= g.points;
    h += '<div class="b80-mark' + (done ? ' b80-mark--done' : '') + '" style="left:' + left + '%">' +
      '<svg class="b80-wings" aria-hidden="true"><use href="#b80-wings"/></svg>' +
      '<span class="b80-mark-stars" aria-hidden="true">' + (g.stars ? '&#9733;'.repeat(g.stars) : '&nbsp;') + '</span>' +
      '<span class="b80-mark-name">' + g.name + '</span>' +
      '<span class="b80-mark-pts">' + g.points + (done ? ' &#10003;' : '') + '</span></div>';
  });
  h += '<div class="b80-run-track"><div class="b80-run-fill" style="width:' + pct + '%"></div></div>' +
       '<svg class="b80-run-jet" style="left:' + pct + '%" aria-hidden="true"><use href="#b80-jet"/></svg></div>';
  document.getElementById('b80Run').innerHTML = h;
}

function renderMatrix() {
  const bands = st.band === 'all' ? st.bands : [st.band];
  let rows = sortedStations();
  if (st.q) rows = rows.filter(s => s.call.indexOf(st.q) !== -1);
  rows = rows.filter(s => {
    if (st.view === 'all') return true;
    let any = false;
    bands.forEach(b => B80.modes.forEach(m => {
      if (isNa(b, m)) return;
      const d = isDone(s.call, b, m);
      if (st.view === 'worked' ? d : !d) any = true;
    }));
    return any;
  });

  const span = 1 + bands.length * 3;
  let h = '<thead><tr><th class="b80-stcell" rowspan="2">Station</th>';
  bands.forEach(b => { h += '<th class="b80-bandhead" colspan="3">' + b + '</th>'; });
  h += '</tr><tr>';
  bands.forEach(() => B80.modes.forEach((m, i) => { h += '<th class="b80-modehead' + (i === 0 ? ' b80-bandstart' : '') + '">' + B80.modeLabel[m] + '</th>'; }));
  h += '</tr></thead><tbody>';

  if (!rows.length) h += '<tr><td colspan="' + span + '">No stations match.</td></tr>';
  let lastCat = null;
  rows.forEach(s => {
    if (s.cat !== lastCat) {
      h += '<tr class="b80-grp b80-grp--' + s.cat.toLowerCase() + '"><td colspan="' + span + '"><span class="b80-grp-lbl">' + B80.grpLabel[s.cat] + '</span></td></tr>';
      lastCat = s.cat;
    }
    const p = B80.modes.map(m => pts(s.cat, m)).join(' / ');
    h += '<tr><td class="b80-stcell"><span class="b80-call">' + s.call + '</span><span class="b80-tag">' + p + ' points</span></td>';
    bands.forEach(b => B80.modes.forEach((m, i) => {
      const edge = i === 0 ? ' b80-bandstart' : '';
      if (isNa(b, m)) { h += '<td class="b80-cell b80-cell--na' + edge + '" title="Not available on ' + b + '">n/a</td>'; return; }
      const d = st.worked.get(s.call + '|' + b + '|' + m), pt = pts(s.cat, m);
      if (d) {
        h += '<td class="b80-cell b80-cell--done' + edge + '" title="' + s.call + ', ' + b + ', ' + B80.modeLabel[m] + ', worked ' + d + '">' +
          '<svg class="b80-jet" aria-hidden="true"><use href="#b80-jet"/></svg><span class="b80-chk" aria-hidden="true">&#10003;</span><span class="b80-sr">worked</span></td>';
      } else {
        h += '<td class="b80-cell b80-cell--todo' + edge + '" title="' + s.call + ', ' + b + ', ' + B80.modeLabel[m] + ', ' + pt + ' points">' +
          '<svg class="b80-jet" aria-hidden="true"><use href="#b80-jet"/></svg><span class="b80-pts">' + pt + '</span><span class="b80-sr">to do</span></td>';
      }
    }));
    h += '</tr>';
  });
  document.getElementById('b80Table').innerHTML = h + '</tbody>';
}

function renderTargets() {
  const need = neededCombos(B80.bands).sort((a, b) =>
    (b.pts - a.pts) || (B80.catOrder[a.cat] - B80.catOrder[b.cat]) ||
    (B80.bands.indexOf(a.band) - B80.bands.indexOf(b.band)) || a.call.localeCompare(b.call)).slice(0, 12);
  document.getElementById('b80Targets').innerHTML = need.length
    ? need.map(n => '<div class="b80-target"><span class="b80-target-pts">' + n.pts + '</span>' +
        '<span class="b80-target-txt"><b>' + n.call + '</b><span>' + n.band + ' ' + B80.modeLabel[n.mode] + '</span></span></div>').join('')
    : '<span class="b80-done-msg">Every combination is worked.</span>';
}

function renderAlerts() {
  const box = document.getElementById('b80Alerts');
  box.innerHTML = B80.bands.map(b => {
    const inner = B80.modes.filter(m => !isNa(b, m)).map(m => {
      const list = sortedStations().filter(s => !isDone(s.call, b, m)).map(s => s.call);
      const id = 'b80a-' + b + '-' + m;
      return '<div class="b80-alert-mode"><label for="' + id + '"><span>' + b + ' ' + B80.modeLabel[m] + ', ' + list.length + ' needed</span>' +
        (list.length ? '<button type="button" class="b80-copy" data-t="' + id + '">Copy</button>' : '') + '</label>' +
        (list.length ? '<textarea id="' + id + '" readonly>' + list.join(',') + '</textarea>' : '<div class="b80-done-msg">All stations worked.</div>') + '</div>';
    }).join('');
    return '<details class="b80-alert-band"><summary>' + b + '</summary><div class="b80-alert-body">' + inner + '</div></details>';
  }).join('');
  if (st.alertsWired) return;
  st.alertsWired = true;
  box.addEventListener('click', e => {
    const btn = e.target.closest('.b80-copy'); if (!btn) return;
    const ta = document.getElementById(btn.dataset.t);
    const done = () => { btn.textContent = 'Copied'; setTimeout(() => { btn.textContent = 'Copy'; }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, () => { ta.select(); });
    else { ta.select(); try { document.execCommand('copy'); done(); } catch (err) { /* manual copy */ } }
  });
}

function renderLog() {
  const catOf = {}; st.ref.stations.forEach(s => { catOf[s.call] = s.cat; });
  const rows = st.res.worked.slice().sort((a, b) => b.date.localeCompare(a.date) || a.call.localeCompare(b.call));
  let total = 0;
  let h = '<thead><tr><th>Date</th><th>Station</th><th>Band</th><th>Mode</th><th class="num">Points</th></tr></thead><tbody>';
  if (!rows.length) h += '<tr><td colspan="5">No scoring contacts yet.</td></tr>';
  rows.forEach(w => {
    const p = pts(catOf[w.call], w.mode); total += p;
    h += '<tr><td>' + w.date + '</td><td class="b80-call">' + w.call + '</td><td>' + w.band + '</td><td>' + B80.modeLabel[w.mode] + '</td><td class="num">' + p + '</td></tr>';
  });
  h += '</tbody><tfoot><tr><td colspan="4">Total</td><td class="num">' + total + '</td></tr></tfoot>';
  document.getElementById('b80Log').innerHTML = h;
}

function set(id, v) { document.getElementById(id).textContent = v; }
