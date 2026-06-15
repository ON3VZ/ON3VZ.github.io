/* ============================================================
   ON3VZ — DXCC x Band Matrix  (subpage of /logbook/)
   Added 2026-06-15. Self-contained, reads the SAME ADIF files as
   the logbook via assets/data/manifest.json. No dependency on
   logbook.js. Delete this file + dxcc-matrix.{html,css} to revert.
   ============================================================ */

'use strict';

/* ── CONFIG ── */
const DM = {
  adifDir: '/assets/data/',
  /* Class C allowed bands, longest wavelength -> shortest. These are the
     fixed matrix columns. Any band found in the log that is NOT in this set
     is appended (flagged "x") so no real QSO is ever hidden. */
  allowedBands: ['80m', '40m', '30m', '20m', '15m', '10m', '2m', '70cm'],
  bandNote: { '30m': 'CW/DIG' },        // 30m is CW/digital only for Class C
  bandColours: {
    '80m': '#ff6b6b', '40m': '#ffa94d', '30m': '#ffe066', '20m': '#69db7c',
    '15m': '#4dabf7', '10m': '#da77f2', '6m': '#ff8787', '2m': '#00d4ff', '70cm': '#f783ac',
  },
  contNames: {
    EU: 'Europe', NA: 'North America', SA: 'South America',
    AS: 'Asia', AF: 'Africa', OC: 'Oceania', AN: 'Antarctica', '': 'Unknown',
  },
  contOrder: ['EU', 'NA', 'SA', 'AS', 'AF', 'OC', 'AN', ''],
};

/* ── STATE ── */
let model = null;                 // { continents:[{code,countries:[...] }], extraBands:[] }
let extraBands = [];
const hiddenConts = new Set();    // continents toggled off
const hiddenBands = new Set();    // bands toggled off
const collapsed = new Set();      // collapsed continent codes
let hideEmptyCountries = true;
let hideEmptyBands = false;
let heatmap = true;
let sortMode = 'qso';
let searchTerm = '';

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  wireControls();
  loadAdif();
});

/* ── LOAD ADIF (same manifest the logbook uses) ── */
function loadAdif() {
  const ts = '?t=' + Date.now();
  fetch(DM.adifDir + 'manifest.json' + ts)
    .then(r => (r.ok ? r.json() : null))
    .then(manifest => {
      const files = manifest ? manifest.files : ['logbook.adi'];
      return Promise.all(files.map(f =>
        fetch(DM.adifDir + f + ts).then(r => (r.ok ? r.text() : '')).catch(() => '')
      ));
    })
    .then(texts => {
      const qsos = dedup(parseAdif(texts.join('\n')));
      if (!qsos.length) throw new Error('No QSOs found');
      model = buildModel(qsos);
      buildChips();
      render();
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      document.getElementById('dmBody').innerHTML =
        `<tr><td class="dm-empty" colspan="20">No logbook data available · ${err.message}</td></tr>`;
    });
}

/* ── ADIF PARSER (focused: keeps numeric DXCC) ── */
function parseAdif(raw) {
  const eoh = raw.toUpperCase().indexOf('<EOH>');
  const body = eoh >= 0 ? raw.slice(eoh + 5) : raw;
  const out = [];
  for (const rec of body.split(/<EOR>/i)) {
    const f = {};
    const re = /<(\w+):(\d+)(?::\w+)?>/gi;
    let m;
    while ((m = re.exec(rec)) !== null) {
      const name = m[1].toUpperCase();
      const len = parseInt(m[2], 10);
      f[name] = rec.slice(m.index + m[0].length, m.index + m[0].length + len).trim();
    }
    if (!f.CALL && !f.STATION_CALLSIGN) continue;
    out.push({
      call: f.CALL || f.STATION_CALLSIGN || '',
      date: f.QSO_DATE || '',
      time: f.TIME_ON || '',
      band: normBand(f.BAND || f.FREQ || ''),
      mode: f.MODE || '',
      country: f.COUNTRY || '',
      cont: (f.CONT || '').toUpperCase(),
      dxcc: f.DXCC || '',
    });
  }
  return out;
}

function dedup(qsos) {
  const map = new Map();
  qsos.forEach(q => {
    const t = (q.time || '0000').slice(0, 3);
    const key = [q.call, q.date, t, q.band, q.mode].join('|').toLowerCase();
    if (!map.has(key)) map.set(key, q);
    else {
      const ex = map.get(key);
      const score = o => Object.values(o).filter(Boolean).length;
      if (score(q) > score(ex)) map.set(key, q);
    }
  });
  return [...map.values()];
}

function normBand(val) {
  if (!val) return 'other';
  const v = val.toLowerCase().trim();
  if (v.includes('m') || v.includes('cm')) return v;
  const mhz = parseFloat(v);
  if (isNaN(mhz)) return 'other';
  if (mhz >= 1.8 && mhz <= 2.0) return '160m';
  if (mhz >= 3.5 && mhz <= 4.0) return '80m';
  if (mhz >= 7.0 && mhz <= 7.3) return '40m';
  if (mhz >= 10.1 && mhz <= 10.15) return '30m';
  if (mhz >= 14.0 && mhz <= 14.35) return '20m';
  if (mhz >= 18.0 && mhz <= 18.17) return '17m';
  if (mhz >= 21.0 && mhz <= 21.45) return '15m';
  if (mhz >= 24.8 && mhz <= 24.99) return '12m';
  if (mhz >= 28.0 && mhz <= 29.7) return '10m';
  if (mhz >= 50 && mhz <= 54) return '6m';
  if (mhz >= 144 && mhz <= 148) return '2m';
  if (mhz >= 430 && mhz <= 440) return '70cm';
  return 'other';
}

/* Derive a clean callsign prefix block from a real callsign.
   Purely data-driven: e.g. LZ100LZ -> LZ, RT25KR -> RT, 9A1AA -> 9A,
   PA3ABC -> PA. Handles portable indicators (F/ON3VZ, ON3VZ/P). */
function callPrefix(call) {
  call = (call || '').toUpperCase();
  const parts = call.split('/').filter(Boolean);
  if (!parts.length) return '';
  const withDigit = parts.filter(p => /\d/.test(p));
  const main = (withDigit.length ? withDigit : parts).sort((a, b) => b.length - a.length)[0];
  const m = main.match(/^(\d?[A-Z]+)/);
  return m ? m[1] : main;
}

/* ── BUILD MATRIX MODEL ── */
function buildModel(qsos) {
  const byCountry = new Map();
  const seenBands = new Set();

  qsos.forEach(q => {
    seenBands.add(q.band);
    const name = q.country || 'Non-DXCC';
    if (!byCountry.has(name)) {
      byCountry.set(name, {
        name, cont: q.cont, dxccCounter: {}, pfxCounter: {}, bands: {}, total: 0,
      });
    }
    const c = byCountry.get(name);
    if (q.cont) c.cont = q.cont;                       // prefer a real continent
    if (q.dxcc) c.dxccCounter[q.dxcc] = (c.dxccCounter[q.dxcc] || 0) + 1;
    const pfx = callPrefix(q.call);
    if (pfx) c.pfxCounter[pfx] = (c.pfxCounter[pfx] || 0) + 1;
    c.bands[q.band] = (c.bands[q.band] || 0) + 1;
    c.total += 1;
  });

  // bands present in the log but outside the Class C allowed set -> appended
  extraBands = [...seenBands].filter(b => b && b !== 'other' && !DM.allowedBands.includes(b))
    .sort((a, b) => bandRank(a) - bandRank(b));

  // finalise per-country derived fields
  const countries = [...byCountry.values()].map(c => ({
    name: c.name,
    cont: c.cont || '',
    code: topKey(c.dxccCounter) || '—',
    prefixes: topKeys(c.pfxCounter, 3).join(' '),
    bands: c.bands,
    total: c.total,
  }));

  // group by continent in configured order
  const continents = DM.contOrder
    .map(code => ({
      code,
      countries: countries.filter(c => c.cont === code),
    }))
    .filter(g => g.countries.length);

  // any unexpected continent codes not in contOrder
  const known = new Set(DM.contOrder);
  const others = countries.filter(c => !known.has(c.cont));
  if (others.length) continents.push({ code: '', countries: others });

  return { continents };
}

function bandRank(b) {
  const order = ['160m', '80m', '60m', '40m', '30m', '20m', '17m', '15m', '12m', '10m', '6m', '4m', '2m', '70cm'];
  const i = order.indexOf(b);
  return i < 0 ? 999 : i;
}
function topKey(counter) {
  return Object.entries(counter).sort((a, b) => b[1] - a[1]).map(e => e[0])[0];
}
function topKeys(counter, n) {
  return Object.entries(counter).sort((a, b) => b[1] - a[1]).slice(0, n).map(e => e[0]);
}

/* ── CONTROL CHIPS ── */
function buildChips() {
  // continents present
  const contWrap = document.getElementById('dmContChips');
  contWrap.innerHTML = '';
  model.continents.forEach(g => {
    const chip = mkChip(DM.contNames[g.code] || g.code || 'Unknown', !hiddenConts.has(g.code));
    chip.addEventListener('click', () => {
      toggleSet(hiddenConts, g.code, chip);
      render();
    });
    contWrap.appendChild(chip);
  });

  // bands = allowed + extra
  const bandWrap = document.getElementById('dmBandChips');
  bandWrap.innerHTML = '';
  visibleBandUniverse().forEach(b => {
    const chip = mkChip(b.toUpperCase() + (extraBands.includes(b) ? ' ✦' : ''), !hiddenBands.has(b));
    chip.classList.add('dm-chip--band');
    const col = DM.bandColours[b];
    if (col) chip.style.setProperty('--chip-col', col);
    chip.addEventListener('click', () => {
      toggleSet(hiddenBands, b, chip);
      render();
    });
    bandWrap.appendChild(chip);
  });
}

function mkChip(label, active) {
  const c = document.createElement('button');
  c.type = 'button';
  c.className = 'dm-chip' + (active ? ' active' : '');
  c.textContent = label;
  return c;
}
function toggleSet(set, key, chip) {
  if (set.has(key)) { set.delete(key); chip.classList.add('active'); }
  else { set.add(key); chip.classList.remove('active'); }
}

/* all bands that can appear as columns (allowed set + extras), in order */
function visibleBandUniverse() {
  return [...DM.allowedBands, ...extraBands];
}

/* ── RENDER ── */
function render() {
  if (!model) return;

  // 1. columns
  let bands = visibleBandUniverse().filter(b => !hiddenBands.has(b));
  if (hideEmptyBands) {
    bands = bands.filter(b => countriesVisible().some(c => (c.bands[b] || 0) > 0));
  }

  // 2. visible countries (search + continent + emptiness)
  const heatMax = Math.max(1, ...countriesVisible().flatMap(c => bands.map(b => c.bands[b] || 0)));

  // 3. header
  const thead = document.getElementById('dmHead');
  thead.innerHTML = headerRow(bands);

  // 4. body
  const body = document.getElementById('dmBody');
  const rows = [];
  let gTotal = 0;
  const colTotals = {};
  bands.forEach(b => (colTotals[b] = 0));

  model.continents.forEach(g => {
    if (hiddenConts.has(g.code)) return;
    let list = g.countries.filter(passSearch);
    list = list.map(c => ({ c, vis: bands.reduce((s, b) => s + (c.bands[b] || 0), 0) }));
    if (hideEmptyCountries) list = list.filter(o => o.vis > 0);
    if (!list.length) return;

    list.sort((a, b) => sortMode === 'alpha'
      ? a.c.name.localeCompare(b.c.name)
      : (b.vis - a.vis) || a.c.name.localeCompare(b.c.name));

    const contTotal = list.reduce((s, o) => s + o.vis, 0);
    const isCol = collapsed.has(g.code);
    rows.push(contHeaderRow(g, list.length, contTotal, bands.length + 4, isCol));

    if (!isCol) {
      list.forEach(({ c, vis }) => {
        gTotal += vis;
        rows.push(countryRow(c, bands, heatMax, colTotals, vis));
      });
      rows.push(subtotalRow(g, list, bands, colTotals_local(list, bands), contTotal));
    } else {
      list.forEach(({ c }) => bands.forEach(b => (colTotals[b] += c.bands[b] || 0)));
      list.forEach(({ vis }) => (gTotal += vis));
    }
  });

  if (!rows.length) {
    body.innerHTML = `<tr><td class="dm-empty" colspan="${bands.length + 4}">No entities match the current filters.</td></tr>`;
  } else {
    rows.push(grandRow(bands, colTotals, gTotal));
    body.innerHTML = rows.join('');
    wireContRows();
  }

  updateStats(bands);
}

function colTotals_local(list, bands) {
  const t = {};
  bands.forEach(b => (t[b] = list.reduce((s, o) => s + (o.c.bands[b] || 0), 0)));
  return t;
}

function countriesVisible() {
  // countries passing continent + search filters (ignoring emptiness, for maxima)
  const out = [];
  model.continents.forEach(g => {
    if (hiddenConts.has(g.code)) return;
    g.countries.filter(passSearch).forEach(c => out.push(c));
  });
  return out;
}

function passSearch(c) {
  if (!searchTerm) return true;
  return (c.name + ' ' + c.prefixes + ' ' + c.code).toLowerCase().includes(searchTerm);
}

function headerRow(bands) {
  const bandTh = bands.map(b => {
    const col = DM.bandColours[b] || 'var(--c-text-2)';
    const note = DM.bandNote[b] ? `<span class="dm-band-note">${DM.bandNote[b]}</span>` : '';
    const star = extraBands.includes(b) ? ' ✦' : '';
    return `<th class="dm-band-th" style="--th-col:${col}">${b.toUpperCase()}${star}${note}</th>`;
  }).join('');
  return `<tr>
    <th class="dm-col-country">Country</th>
    <th class="dm-col-pfx">Prefix</th>
    <th class="dm-col-code">DXCC</th>
    ${bandTh}
    <th class="dm-c-total">Total</th>
  </tr>`;
}

function contHeaderRow(g, n, total, span, isCol) {
  const name = DM.contNames[g.code] || g.code || 'Unknown';
  return `<tr class="dm-cont-row${isCol ? ' collapsed' : ''}" data-cont="${g.code}">
    <td colspan="${span}">
      <span class="dm-cont-name"><span class="dm-chev">▾</span>${name}</span>
      <span class="dm-cont-meta">&nbsp;·&nbsp; ${n} ${n === 1 ? 'entity' : 'entities'} &nbsp;·&nbsp; ${total} QSO${total === 1 ? '' : 's'}</span>
    </td>
  </tr>`;
}

function countryRow(c, bands, heatMax, colTotals, vis) {
  const cells = bands.map(b => {
    const v = c.bands[b] || 0;
    colTotals[b] += v;
    if (!v) return `<td class="dm-c-count zero">·</td>`;
    const h = heatmap ? Math.round(20 + (v / heatMax) * 55) : 0;
    return `<td class="dm-c-count"${heatmap ? ` data-heat style="--h:${h}"` : ''}>${v}</td>`;
  }).join('');
  const badge = `<span class="dm-cont-badge">${c.cont || '??'}</span>`;
  return `<tr class="dm-row">
    <td class="dm-c-country">${badge}${c.name}</td>
    <td class="dm-c-pfx">${c.prefixes || '—'}</td>
    <td class="dm-c-code">${c.code}</td>
    ${cells}
    <td class="dm-c-total">${vis}</td>
  </tr>`;
}

function subtotalRow(g, list, bands, totals, contTotal) {
  const cells = bands.map(b => `<td>${totals[b] || '·'}</td>`).join('');
  return `<tr class="dm-sub-row">
    <td class="dm-c-country">${DM.contNames[g.code] || g.code} subtotal</td>
    <td></td><td></td>
    ${cells}
    <td class="dm-c-total">${contTotal}</td>
  </tr>`;
}

function grandRow(bands, colTotals, gTotal) {
  const cells = bands.map(b => `<td>${colTotals[b] || '·'}</td>`).join('');
  return `<tr class="dm-grand-row">
    <td class="dm-c-country">TOTAL</td>
    <td></td><td></td>
    ${cells}
    <td class="dm-c-total">${gTotal}</td>
  </tr>`;
}

function wireContRows() {
  document.querySelectorAll('.dm-cont-row').forEach(row => {
    row.addEventListener('click', () => {
      const code = row.dataset.cont;
      if (collapsed.has(code)) collapsed.delete(code);
      else collapsed.add(code);
      render();
    });
  });
}

/* ── STATS ── */
function updateStats(bands) {
  const vis = [];
  model.continents.forEach(g => {
    if (hiddenConts.has(g.code)) return;
    g.countries.filter(passSearch).forEach(c => {
      const t = bands.reduce((s, b) => s + (c.bands[b] || 0), 0);
      if (!hideEmptyCountries || t > 0) vis.push({ c, t });
    });
  });
  const qsos = vis.reduce((s, o) => s + o.t, 0);
  const conts = new Set(vis.map(o => o.c.cont)).size;
  const usedBands = bands.filter(b => vis.some(o => (o.c.bands[b] || 0) > 0)).length;
  setStat('dmStatQsos', qsos);
  setStat('dmStatEnt', vis.length);
  setStat('dmStatCont', conts);
  setStat('dmStatBand', usedBands);
}
function setStat(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }

/* ── CONTROLS WIRING ── */
function wireControls() {
  document.getElementById('tgEmptyCountries').addEventListener('change', e => { hideEmptyCountries = e.target.checked; render(); });
  document.getElementById('tgEmptyBands').addEventListener('change', e => { hideEmptyBands = e.target.checked; render(); });
  document.getElementById('tgHeat').addEventListener('change', e => { heatmap = e.target.checked; render(); });
  document.getElementById('dmSort').addEventListener('change', e => { sortMode = e.target.value; render(); });
  document.getElementById('dmSearch').addEventListener('input', e => { searchTerm = e.target.value.trim().toLowerCase(); render(); });
  document.getElementById('dmExpand').addEventListener('click', () => { collapsed.clear(); render(); });
  document.getElementById('dmCollapse').addEventListener('click', () => {
    if (model) model.continents.forEach(g => collapsed.add(g.code));
    render();
  });
}

function setLoading(on) {
  const el = document.getElementById('dmLoading');
  if (el) el.classList.toggle('hidden', !on);
}
