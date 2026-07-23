/* ============================================================
   ON3VZ - QSO Dashboard  (subpage of /logbook/)
   Added 2026-07-12. Self-contained, reads the SAME ADIF files as
   the logbook via assets/data/manifest.json. No dependency on
   logbook.js (same pattern as dxcc-matrix.js). Delete this file +
   qso-dashboard.{html,css} + the logbook.html link to revert.

   Privacy note: individual QSO times are intentionally never shown
   anywhere on this page (matches the logbook table, where the time
   column was removed). TIME_ON is only used to bucket QSOs into
   per-hour aggregates for the band fingerprint grid.
   ============================================================ */

'use strict';

/* ── CONFIG ── */
const QD = {
  adifDir: '/assets/data/',
  homeLatLng: [51.178, 4.347],                 // Hoboken, Antwerpen (JO21EE)
  earthCircumferenceKm: 40075,                  // equatorial circumference
  bandOrder: ['160m','80m','60m','40m','30m','20m','17m','15m','12m','10m','6m','2m','70cm'],
  /* VISUAL OVERHAUL 2026-07-24 (revert: git revert <sha>)
     Band palette ordered by wavelength, long waves warm and short waves
     cool. 160m, 60m and 'other' were missing before and silently fell
     back to a flat green, which is why the band charts were hard to
     read. Every band that can appear now has its own colour. */
  bandColours: {
    '160m': '#e03131', '80m': '#ff6b6b', '60m': '#ff922b', '40m': '#ffa94d',
    '30m': '#ffe066', '20m': '#69db7c', '17m': '#63e6be', '15m': '#4dabf7',
    '12m': '#b197fc', '10m': '#da77f2', '6m': '#ff8787', '2m': '#00d4ff',
    '70cm': '#f783ac', 'other': '#8fa6bd',
  },
  /* One distinct colour per continent, shared by every continent view
     instead of the single amber that made all bars look identical. */
  contColours: {
    EU: '#00ff88', NA: '#4dabf7', SA: '#da77f2',
    AS: '#f0a500', AF: '#ff6b6b', OC: '#00d4ff', AN: '#b0c4d8',
  },
  modeColours: {
    SSB: '#00ff88', FT8: '#00d4ff', CW: '#f0a500', FM: '#da77f2',
    RTTY: '#ff922b', PSK31: '#4dabf7', FT4: '#63e6be', UNKNOWN: '#8fa6bd',
  },
  /* Six-step heat ramp, deep navy through teal and green to hot lime.
     Shared by the activity calendar and the band fingerprint so both
     grids are read on the same visual scale. */
  heatRamp: ['#141f38', '#0f4f68', '#0d8a8a', '#14b877', '#63e06a', '#c8ff66'],
  contNames: {
    EU: 'Europe', NA: 'N. America', SA: 'S. America',
    AS: 'Asia', AF: 'Africa', OC: 'Oceania', AN: 'Antarctica',
  },
  contOrder: ['EU','NA','SA','AS','AF','OC','AN'],
  qsoMilestones: [1, 100, 250, 500, 1000, 2000, 5000, 10000],
  calendarMaxDays: 182,                          // ~26 weeks of daily squares
  colors: { green: '#00ff88', cyan: '#00d4ff', amber: '#f0a500', red: '#ff4466',
            text3: '#7a96b0', grid: 'rgba(0,255,136,0.07)' },
};

/* ── STATE ── */
let qdQsos = [];
/* SLICERS + CHART REGISTRY (added 2026-07-24, revert: git revert <sha>).
   An empty Set means "no restriction on this dimension". */
const qdFilter = { period: 'all', bands: new Set(), modes: new Set() };
const qdCharts = {};
let qdFullStats = null;
let qdSlicersBuilt = false;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  loadChartJs(() => loadAdif());
});

/* ── LOAD Chart.js from cdnjs (same dynamic pattern as D3 in logbook.js) ── */
function loadChartJs(done) {
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
  s.onload = done;
  s.onerror = () => setError('Chart library unavailable');
  document.head.appendChild(s);
}

/* ── LOAD ADIF (same manifest the logbook uses) ── */
function loadAdif() {
  const ts = '?t=' + Date.now();
  fetch(QD.adifDir + 'manifest.json' + ts)
    .then(r => (r.ok ? r.json() : null))
    .then(manifest => {
      const files = manifest ? manifest.files : ['logbook.adi'];
      return Promise.all(files.map(f =>
        fetch(QD.adifDir + f + ts).then(r => (r.ok ? r.text() : '')).catch(() => '')
      ));
    })
    .then(texts => {
      qdQsos = dedup(parseAdif(texts.join('\n')));
      if (!qdQsos.length) throw new Error('No QSOs found');
      qdQsos.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      renderAll();
    })
    .catch(err => setError('No logbook data · ' + err.message));
}

/* ── ADIF PARSER (focused on the fields this page needs) ── */
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
    if (!f.CALL) continue;
    const lat = parseAdifCoord(f.LAT);
    const lng = parseAdifCoord(f.LON);
    out.push({
      call: (f.CALL || '').toUpperCase(),
      date: f.QSO_DATE || '',
      time: f.TIME_ON || '',
      band: normaliseBand(f.BAND || f.FREQ || ''),
      mode: normaliseMode(f.MODE || ''),
      dxcc: (f.COUNTRY || '').trim(),
      cont: (f.CONT || '').trim().toUpperCase(),
      dist: resolveDistance(f.DISTANCE || f.DIST, lat, lng),
    });
  }
  return out.filter(q => q.date);
}

/* Parse ADIF lat/lng strings like "N053 06.252" or "W001 22.500"
   (QRZ format - same parser as logbook.js parseAdifCoord) */
function parseAdifCoord(s) {
  if (!s) return null;
  const m = String(s).trim().match(/^([NSEW])\s*(\d+)\s+(\d+(?:\.\d+)?)$/i);
  if (!m) { const v = parseFloat(s); return isNaN(v) ? null : v; }
  const deg = parseInt(m[2], 10) + parseFloat(m[3]) / 60;
  return (m[1].toUpperCase() === 'S' || m[1].toUpperCase() === 'W') ? -deg : deg;
}

/* Distance: prefer the ADIF DISTANCE field; otherwise compute the
   great-circle distance from the home QTH with the haversine formula.
   An exact 0,0 coordinate pair is QRZ's "unknown location" sentinel
   (see hasRealCoords in logbook.js) and is treated as no fix. */
function resolveDistance(distField, lat, lng) {
  const d = parseInt(distField, 10);
  if (Number.isFinite(d) && d > 0) return d;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat === 0 && lng === 0) return null;
  return Math.round(haversineKm(QD.homeLatLng[0], QD.homeLatLng[1], lat, lng));
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371, toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function normaliseBand(val) {
  if (!val) return 'other';
  const v = val.toLowerCase().trim();
  if (v.includes('m') || v.includes('cm')) return v;
  const mhz = parseFloat(v);
  if (isNaN(mhz)) return 'other';
  if (mhz >= 1.8  && mhz <= 2.0)   return '160m';
  if (mhz >= 3.5  && mhz <= 4.0)   return '80m';
  if (mhz >= 5.3  && mhz <= 5.4)   return '60m';
  if (mhz >= 7.0  && mhz <= 7.3)   return '40m';
  if (mhz >= 10.1 && mhz <= 10.15) return '30m';
  if (mhz >= 14.0 && mhz <= 14.35) return '20m';
  if (mhz >= 18.0 && mhz <= 18.17) return '17m';
  if (mhz >= 21.0 && mhz <= 21.45) return '15m';
  if (mhz >= 24.8 && mhz <= 24.99) return '12m';
  if (mhz >= 28.0 && mhz <= 29.7)  return '10m';
  if (mhz >= 50   && mhz <= 54)    return '6m';
  if (mhz >= 144  && mhz <= 148)   return '2m';
  if (mhz >= 430  && mhz <= 440)   return '70cm';
  return 'other';
}

/* USB/LSB are sideband variants of SSB - fold them together so the
   mode picture is honest instead of artificially split. */
function normaliseMode(m) {
  const v = (m || '').toUpperCase().trim();
  if (v === 'USB' || v === 'LSB') return 'SSB';
  return v || 'UNKNOWN';
}

/* ── DEDUP (same key as logbook.js: call + date + ~time + band + mode) ── */
function dedup(qsos) {
  const map = new Map();
  qsos.forEach(q => {
    const t = q.time ? q.time.slice(0, 4) : '0000';
    const key = `${q.call}|${q.date}|${t}|${q.band}|${q.mode}`;
    const filled = Object.values(q).filter(v => v !== null && v !== '').length;
    const prev = map.get(key);
    if (!prev || filled > prev._filled) { q._filled = filled; map.set(key, q); }
  });
  return [...map.values()];
}

/* ── DATE HELPERS (all UTC, dates as YYYYMMDD strings) ── */
function toDateObj(yyyymmdd) {
  return new Date(Date.UTC(+yyyymmdd.slice(0, 4), +yyyymmdd.slice(4, 6) - 1, +yyyymmdd.slice(6, 8)));
}
function dateKey(d) {
  return d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, '0') + String(d.getUTCDate()).padStart(2, '0');
}
function fmtDate(yyyymmdd) {
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
}
function addDays(d, n) { const c = new Date(d); c.setUTCDate(c.getUTCDate() + n); return c; }

/* ── HEAT SCALE ──
   The grids used to scale linearly against the single highest value, so
   one busy day or one busy hour pushed everything else down into the
   lowest step and the whole grid looked flat. Breaks are now quantiles
   of the non-zero values, so every colour step actually carries data. */
function heatBreaks(values, steps) {
  const nz = values.filter(v => v > 0).sort((a, b) => a - b);
  if (!nz.length) return [];
  const uniq = [...new Set(nz)];
  if (uniq.length <= steps) return uniq;
  const out = [];
  for (let i = 1; i <= steps; i++) {
    const idx = Math.min(nz.length - 1, Math.ceil(i / steps * nz.length) - 1);
    out.push(nz[idx]);
  }
  return [...new Set(out)];
}
function heatLevel(n, breaks) {
  if (!n) return 0;
  for (let i = 0; i < breaks.length; i++) if (n <= breaks[i]) return i + 1;
  return breaks.length;
}
/* Legend that spells out the value range behind every colour step,
   so the reader never has to guess what a shade means. */
function renderHeatScale(elId, breaks, unit) {
  const el = document.getElementById(elId);
  if (!el) return;
  if (!breaks.length) { el.innerHTML = ''; return; }
  let prev = 0;
  let html = `<span class="qd-scale-cap">${unit}</span>` +
             `<span class="qd-scale-item"><span class="qd-scale-step" data-lvl="0"></span><span class="qd-scale-num">0</span></span>`;
  breaks.forEach((b, i) => {
    const from = prev + 1;
    html += `<span class="qd-scale-item"><span class="qd-scale-step" data-lvl="${i + 1}"></span>` +
            `<span class="qd-scale-num">${from === b ? b : from + '-' + b}</span></span>`;
    prev = b;
  });
  el.innerHTML = html;
}

/* ── SLICERS ──
   Page level filters in the spirit of a BI report: pick a period, one or
   more bands, one or more modes, and every visual on the page recomputes
   from the filtered set. An empty selection means everything. */
const QD_PERIODS = [['30', 'Last 30 days'], ['90', 'Last 90 days'],
                    ['365', 'Last 12 months'], ['all', 'All time']];

function filteredQsos() {
  let cutoff = null;
  if (qdFilter.period !== 'all') cutoff = dateKey(addDays(new Date(), -(+qdFilter.period - 1)));
  return qdQsos.filter(q =>
    (!qdFilter.bands.size || qdFilter.bands.has(q.band)) &&
    (!qdFilter.modes.size || qdFilter.modes.has(q.mode)) &&
    (!cutoff || q.date >= cutoff));
}

function buildSlicers() {
  if (qdSlicersBuilt) return;
  const seg = document.getElementById('qdPeriod');
  const bandBox = document.getElementById('qdBandPills');
  const modeBox = document.getElementById('qdModePills');
  if (!seg || !bandBox || !modeBox) return;

  seg.innerHTML = QD_PERIODS.map(([v, lbl]) =>
    `<button type="button" class="qd-seg-btn" data-v="${v}">${lbl}</button>`).join('');

  const bandCounts = new Map();
  const modeCounts = new Map();
  qdQsos.forEach(q => {
    bandCounts.set(q.band, (bandCounts.get(q.band) || 0) + 1);
    modeCounts.set(q.mode, (modeCounts.get(q.mode) || 0) + 1);
  });
  const bands = QD.bandOrder.filter(b => bandCounts.has(b))
    .concat([...bandCounts.keys()].filter(b => !QD.bandOrder.includes(b)));
  bandBox.innerHTML = bands.map(b => {
    const c = QD.bandColours[b] || QD.bandColours.other;
    return `<button type="button" class="qd-pill" data-v="${b}" style="--pill:${c}">` +
           `<i></i>${b}<span>${bandCounts.get(b)}</span></button>`;
  }).join('');

  const modes = [...modeCounts.entries()].sort((a, b) => b[1] - a[1]).map(m => m[0]);
  modeBox.innerHTML = modes.map(m => {
    const c = QD.modeColours[m] || QD.bandColours.other;
    return `<button type="button" class="qd-pill" data-v="${m}" style="--pill:${c}">` +
           `<i></i>${m}<span>${modeCounts.get(m)}</span></button>`;
  }).join('');

  seg.addEventListener('click', e => {
    const b = e.target.closest('[data-v]');
    if (!b) return;
    qdFilter.period = b.dataset.v;
    renderView();
  });
  const toggler = set => e => {
    const b = e.target.closest('[data-v]');
    if (!b) return;
    const v = b.dataset.v;
    if (set.has(v)) set.delete(v); else set.add(v);
    renderView();
  };
  bandBox.addEventListener('click', toggler(qdFilter.bands));
  modeBox.addEventListener('click', toggler(qdFilter.modes));

  const reset = document.getElementById('qdReset');
  if (reset) reset.addEventListener('click', () => {
    qdFilter.period = 'all';
    qdFilter.bands.clear();
    qdFilter.modes.clear();
    renderView();
  });

  qdSlicersBuilt = true;
}

/* Reflect the current selection in the slicer controls. */
function paintSlicers(shown) {
  const mark = (boxId, set) => {
    const box = document.getElementById(boxId);
    if (!box) return;
    box.querySelectorAll('[data-v]').forEach(b => {
      b.classList.toggle('is-on', set.has(b.dataset.v));
    });
  };
  const seg = document.getElementById('qdPeriod');
  if (seg) seg.querySelectorAll('[data-v]').forEach(b => {
    b.classList.toggle('is-on', b.dataset.v === qdFilter.period);
  });
  mark('qdBandPills', qdFilter.bands);
  mark('qdModePills', qdFilter.modes);

  const st = document.getElementById('qdFilterState');
  if (st) {
    const active = (qdFilter.period !== 'all') + (qdFilter.bands.size ? 1 : 0) + (qdFilter.modes.size ? 1 : 0);
    st.innerHTML = active
      ? `<strong>${shown.toLocaleString('en-GB')}</strong> of ${qdQsos.length.toLocaleString('en-GB')} QSOs · ${active} filter${active === 1 ? '' : 's'} active`
      : `<strong>${qdQsos.length.toLocaleString('en-GB')}</strong> QSOs · no filters`;
  }
}

/* ── RENDER ALL ── */
function renderAll() {
  qdFullStats = computeStats(qdQsos);
  buildSlicers();
  renderView();
}

/* Everything below the slicers, rebuilt on every filter change. */
function renderView() {
  const qsos = filteredQsos();
  paintSlicers(qsos.length);
  const head = document.getElementById('qdUpdated');

  if (!qsos.length) {
    head.textContent = 'No QSOs match the current filters';
    document.getElementById('qdKpis').innerHTML =
      '<div class="qd-loading">Nothing to show. Clear a filter to bring the data back.</div>';
    Object.keys(qdCharts).forEach(k => { qdCharts[k].destroy(); delete qdCharts[k]; });
    ['qdCal', 'qdFingerprint', 'qdCalScale', 'qdFpScale', 'qdCalMonths', 'qdCalDays']
      .forEach(id => { const e = document.getElementById(id); if (e) e.innerHTML = ''; });
    return;
  }

  const stats = computeStats(qsos);
  head.textContent =
    `${qsos.length.toLocaleString('en-GB')} QSOs · ${fmtDate(qsos[0].date)} to ${fmtDate(qsos[qsos.length - 1].date)}`;
  renderKpis(stats);
  renderCalendar(stats);
  renderTrendChart(stats);
  renderDxccChart(stats);
  renderBandMixChart(stats);
  renderFingerprint(stats);
  renderBandDistChart(stats);
  renderDistSpreadChart(stats);
  renderContChart(stats);
  renderModeChart(stats);
  renderMilestones(qdFullStats);   // records always cover the whole log
}

/* ── STATS ENGINE ── */
function computeStats(qsos) {
  const perDay = new Map();               // dateKey -> count
  const perBand = new Map();              // band -> { count, distKm }
  const perCont = new Map();              // cont -> count
  const perMode = new Map();              // mode -> count
  const fingerprint = new Map();          // band -> Uint32Array(24)
  const dxccFirst = new Map();            // entity -> first date
  const distBuckets = [0, 0, 0, 0];       // <100 / 100-1k / 1k-5k / 5k+
  let totalDist = 0, distCount = 0;
  let farthest = null;

  qsos.forEach(q => {
    perDay.set(q.date, (perDay.get(q.date) || 0) + 1);
    perMode.set(q.mode, (perMode.get(q.mode) || 0) + 1);
    if (q.cont) perCont.set(q.cont, (perCont.get(q.cont) || 0) + 1);

    const b = perBand.get(q.band) || { count: 0, distKm: 0 };
    b.count++;
    if (q.dist) b.distKm += q.dist;
    perBand.set(q.band, b);

    if (q.dxcc && !dxccFirst.has(q.dxcc)) dxccFirst.set(q.dxcc, q.date);

    if (q.dist) {
      totalDist += q.dist; distCount++;
      if (!farthest || q.dist > farthest.dist) farthest = q;
      if (q.dist < 100) distBuckets[0]++;
      else if (q.dist < 1000) distBuckets[1]++;
      else if (q.dist < 5000) distBuckets[2]++;
      else distBuckets[3]++;
    }

    const hour = parseInt((q.time || '').slice(0, 2), 10);
    if (Number.isFinite(hour) && hour >= 0 && hour < 24) {
      if (!fingerprint.has(q.band)) fingerprint.set(q.band, new Uint32Array(24));
      fingerprint.get(q.band)[hour]++;
    }
  });

  /* streaks (consecutive days with >= 1 QSO) */
  const days = [...perDay.keys()].sort();
  let bestStreak = 0, run = 0, prev = null;
  days.forEach(d => {
    if (prev && dateKey(addDays(toDateObj(prev), 1)) === d) run++;
    else run = 1;
    if (run > bestStreak) bestStreak = run;
    prev = d;
  });
  /* current streak: count back from today (or yesterday, so an
     in-progress day doesn't break the chain before the evening) */
  let currentStreak = 0;
  let cursor = new Date();
  if (!perDay.has(dateKey(cursor))) cursor = addDays(cursor, -1);
  while (perDay.has(dateKey(cursor))) { currentStreak++; cursor = addDays(cursor, -1); }

  /* trend: this week vs previous 7 days */
  const today = new Date();
  const countRange = (from, to) => {           // inclusive day offsets from today
    let n = 0;
    for (let i = from; i <= to; i++) n += perDay.get(dateKey(addDays(today, i))) || 0;
    return n;
  };
  const last7 = countRange(-6, 0);
  const prev7 = countRange(-13, -7);

  /* dxcc added in last 30 days */
  const cutoff30 = dateKey(addDays(today, -30));
  let dxccNew30 = 0;
  dxccFirst.forEach(d => { if (d >= cutoff30) dxccNew30++; });

  /* best day */
  let bestDay = null;
  perDay.forEach((n, d) => { if (!bestDay || n > bestDay.count) bestDay = { date: d, count: n }; });

  return { qsos, perDay, perBand, perCont, perMode, fingerprint, dxccFirst,
           distBuckets, totalDist, distCount, farthest, bestStreak, currentStreak,
           last7, prev7, dxccNew30, bestDay };
}

/* ── KPI STRIP ── */
function renderKpis(s) {
  const el = document.getElementById('qdKpis');
  const activeDays = s.perDay.size;
  const avgPerDay = activeDays ? (s.qsos.length / activeDays) : 0;
  const laps = s.totalDist / QD.earthCircumferenceKm;
  const busiest = [...s.perBand.entries()].sort((a, b) => b[1].count - a[1].count)[0];
  const busiestPct = busiest ? Math.round(busiest[1].count / s.qsos.length * 100) : 0;

  const wk = s.prev7 > 0
    ? Math.round((s.last7 - s.prev7) / s.prev7 * 100)
    : null;
  const wkHtml = wk === null
    ? `${s.last7} this week`
    : (wk >= 0 ? `<span class="up">&#8593; ${wk}%</span> vs prev. 7 days`
               : `<span class="down">&#8595; ${Math.abs(wk)}%</span> vs prev. 7 days`);

  const kpis = [
    { lbl: 'Total QSOs', val: s.qsos.length.toLocaleString('en-GB'), sub: wkHtml, cls: '' },
    { lbl: 'Distance worked', val: fmtKm(s.totalDist), sub: `${laps.toFixed(1)}&times; around the earth`, cls: 'qd-kpi--cyan' },
    { lbl: 'DXCC entities', val: String(s.dxccFirst.size), sub: s.dxccNew30 ? `<span class="up">+${s.dxccNew30}</span> in last 30 days` : 'none new in last 30 days', cls: 'qd-kpi--amber' },
    { lbl: 'Current streak', val: `${s.currentStreak} day${s.currentStreak === 1 ? '' : 's'}`, sub: `best: ${s.bestStreak} days`, cls: '' },
    { lbl: 'Farthest DX', val: s.farthest ? s.farthest.call : '-', sub: s.farthest ? `${s.farthest.dist.toLocaleString('en-GB')} km &middot; ${s.farthest.band}` : '', cls: 'qd-kpi--cyan' },
    { lbl: 'Busiest band', val: busiest ? busiest[0] : '-', sub: busiest ? `${busiestPct}% of all QSOs &middot; avg ${avgPerDay.toFixed(1)}/active day` : '', cls: 'qd-kpi--amber' },
  ];

  el.innerHTML = kpis.map(k =>
    `<div class="qd-kpi ${k.cls}">
       <div class="qd-kpi-lbl">${k.lbl}</div>
       <div class="qd-kpi-val">${k.val}</div>
       <div class="qd-kpi-sub">${k.sub}</div>
     </div>`).join('');
}

function fmtKm(km) {
  if (km >= 1e6) return (km / 1e6).toFixed(2) + 'M km';
  if (km >= 1e4) return Math.round(km / 1e3).toLocaleString('en-GB') + 'k km';
  return km.toLocaleString('en-GB') + ' km';
}

/* ── ACTIVITY CALENDAR (GitHub-style, grows with the log) ── */
function renderCalendar(s) {
  const el = document.getElementById('qdCal');
  const today = new Date();
  const firstLog = toDateObj(s.qsos[0].date);
  const spanDays = Math.min(
    QD.calendarMaxDays,
    Math.max(28, Math.round((today - firstLog) / 86400000) + 7)   // at least 4 weeks
  );

  /* start on a Monday so the 7 rows are stable weekdays */
  let start = addDays(today, -(spanDays - 1));
  while (start.getUTCDay() !== 1) start = addDays(start, -1);

  const breaks = heatBreaks([...s.perDay.values()], 5);
  const lvl = n => heatLevel(n, breaks);
  const todayKey = dateKey(today);

  /* Weekday labels for the seven rows. Only alternate rows are labelled,
     the same convention the GitHub contribution graph uses. */
  const daysEl = document.getElementById('qdCalDays');
  if (daysEl) {
    daysEl.innerHTML = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun']
      .map(l => `<span>${l}</span>`).join('');
  }

  /* Month header, one cell per week column, labelled at the first week
     that falls in a new month. */
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthsEl = document.getElementById('qdCalMonths');
  if (monthsEl) {
    let mHtml = '', weeks = 0, lastMonth = -1;
    for (let d = new Date(start); d <= today; d = addDays(d, 7)) {
      const m = d.getUTCMonth();
      mHtml += `<span>${m !== lastMonth ? MONTHS[m] : ''}</span>`;
      lastMonth = m;
      weeks++;
    }
    monthsEl.style.gridTemplateColumns = `repeat(${weeks}, var(--cal-cell))`;
    monthsEl.innerHTML = mHtml;
  }

  let html = '';
  for (let d = new Date(start); ; d = addDays(d, 1)) {
    const k = dateKey(d);
    const future = d > today;
    const n = s.perDay.get(k) || 0;
    html += `<div class="qd-cal-cell${future ? ' qd-cal-future' : ''}${k === todayKey ? ' qd-cal-today' : ''}" data-lvl="${lvl(n)}" data-tip="${fmtDate(k)} · ${n} QSO${n === 1 ? '' : 's'}"></div>`;
    if (dateKey(d) === dateKey(today)) {
      /* pad the final column to a full 7-row week */
      let pad = (7 - ((Math.round((d - start) / 86400000) + 1) % 7)) % 7;
      while (pad--) html += '<div class="qd-cal-cell qd-cal-future"></div>';
      break;
    }
  }
  el.innerHTML = html;
  renderHeatScale('qdCalScale', breaks, 'QSOs per day');
  attachTips(el);
}

/* ── TREND CHART (adaptive: daily < 60 days span, weekly < 18 months, else monthly) ── */
function renderTrendChart(s) {
  const first = toDateObj(s.qsos[0].date);
  const last = toDateObj(s.qsos[s.qsos.length - 1].date);
  const spanDays = Math.round((last - first) / 86400000) + 1;

  let labels = [], data = [], granularity;
  if (spanDays <= 60) {
    granularity = 'daily';
    for (let d = new Date(first); d <= last; d = addDays(d, 1)) {
      const k = dateKey(d);
      labels.push(k.slice(6, 8) + '/' + k.slice(4, 6));
      data.push(s.perDay.get(k) || 0);
    }
  } else if (spanDays <= 548) {
    granularity = 'weekly';
    const weeks = new Map();
    s.perDay.forEach((n, k) => {
      const d = toDateObj(k);
      const monday = addDays(d, -((d.getUTCDay() + 6) % 7));
      const wk = dateKey(monday);
      weeks.set(wk, (weeks.get(wk) || 0) + n);
    });
    let m = addDays(first, -((first.getUTCDay() + 6) % 7));
    for (; m <= last; m = addDays(m, 7)) {
      const k = dateKey(m);
      labels.push(k.slice(6, 8) + '/' + k.slice(4, 6));
      data.push(weeks.get(k) || 0);
    }
  } else {
    granularity = 'monthly';
    const months = new Map();
    s.perDay.forEach((n, k) => {
      const mk = k.slice(0, 6);
      months.set(mk, (months.get(mk) || 0) + n);
    });
    const keys = [...months.keys()].sort();
    const MN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    keys.forEach(k => { labels.push(MN[+k.slice(4, 6) - 1] + ' ' + k.slice(2, 4)); data.push(months.get(k)); });
  }

  document.getElementById('qdTrendTitle').textContent = `QSO trend · ${granularity}`;
  chartDefaults();
  /* Raw counts are spiky and hard to read on their own, so a 7 point
     trailing average is drawn over them to show the actual direction. */
  const roll = data.map((_, i) => {
    const w = data.slice(Math.max(0, i - 6), i + 1);
    return +(w.reduce((a, b) => a + b, 0) / w.length).toFixed(2);
  });
  mkChart('qdTrendChart', {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: `QSOs per ${granularity.replace('ly', '')}`, data,
          backgroundColor: ctx => vGradient(ctx, 'rgba(0,255,136,0.95)', 'rgba(0,255,136,0.20)'),
          borderRadius: 3, maxBarThickness: 22, order: 2 },
        { label: '7 point average', data: roll, type: 'line',
          borderColor: QD.colors.amber, borderWidth: 2, tension: 0.35,
          pointRadius: 0, fill: false, order: 1 },
      ],
    },
    options: baseOpts({
      plugins: { legend: { display: true, position: 'top', align: 'end',
        labels: { boxWidth: 10, boxHeight: 10, padding: 12, usePointStyle: true, pointStyle: 'rectRounded' } } },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 14, maxRotation: 0 } },
        y: { grid: { color: QD.colors.grid }, beginAtZero: true, ticks: { precision: 0 } },
      },
    }),
  });
}

/* ── DXCC CUMULATIVE GROWTH ── */
function renderDxccChart(s) {
  const events = [...s.dxccFirst.values()].sort();
  const labels = [], data = [];
  let n = 0, lastKey = '';
  events.forEach(d => {
    n++;
    if (d === lastKey) { data[data.length - 1] = n; return; }
    labels.push(fmtDate(d).slice(5));           // MM-DD
    data.push(n);
    lastKey = d;
  });
  chartDefaults();
  mkChart('qdDxccChart', {
    type: 'line',
    data: { labels, datasets: [{ data, borderColor: QD.colors.cyan,
      backgroundColor: ctx => vGradient(ctx, 'rgba(0,212,255,0.42)', 'rgba(0,212,255,0.00)'),
      fill: true, stepped: true, pointRadius: 0, borderWidth: 2.2 }] },
    options: baseOpts({
      plugins: { tooltip: { callbacks: { label: c => ' ' + c.parsed.y + ' DXCC entities' } } },
      scales: {
        x: { grid: { display: false }, ticks: { maxTicksLimit: 10, maxRotation: 0 } },
        y: { grid: { color: QD.colors.grid }, beginAtZero: true, ticks: { precision: 0 } },
      },
    }),
  });
}

/* ── BAND x HOUR FINGERPRINT ── */
function renderFingerprint(s) {
  const el = document.getElementById('qdFingerprint');
  const bands = QD.bandOrder.filter(b => s.fingerprint.has(b))
    .concat([...s.fingerprint.keys()].filter(b => !QD.bandOrder.includes(b)));
  if (!bands.length) { el.innerHTML = '<div class="qd-loading">No hour data in log</div>'; return; }

  const all = bands.flatMap(b => [...s.fingerprint.get(b)]);
  const breaks = heatBreaks(all, 5);
  const max = Math.max(1, ...all);

  el.style.gridTemplateColumns = `4.2rem repeat(24, 1fr) 2.4rem`;
  let html = '';
  bands.forEach(b => {
    const colour = QD.bandColours[b] || QD.bandColours.other;
    const arr = s.fingerprint.get(b);
    let rowTotal = 0;
    for (let h = 0; h < 24; h++) rowTotal += arr[h];
    html += `<div class="qd-fp-band"><i style="background:${colour}"></i>${b}</div>`;
    for (let h = 0; h < 24; h++) {
      const n = arr[h];
      const peak = n === max && n > 0 ? ' qd-fp-peak' : '';
      html += `<div class="qd-fp-cell${peak}" data-lvl="${heatLevel(n, breaks)}" data-tip="${b} &middot; ${String(h).padStart(2, '0')}:00-${String(h).padStart(2, '0')}:59 UTC &middot; ${n} QSO${n === 1 ? '' : 's'}"></div>`;
    }
    html += `<div class="qd-fp-total" data-tip="${b} &middot; ${rowTotal} QSOs with a logged hour">${rowTotal}</div>`;
  });
  html += '<div></div>';
  for (let h = 0; h < 24; h++) {
    html += `<div class="qd-fp-hour">${h % 3 === 0 ? String(h).padStart(2, '0') : ''}</div>`;
  }
  html += '<div class="qd-fp-hour qd-fp-hour--tot">tot</div>';
  el.innerHTML = html;
  renderHeatScale('qdFpScale', breaks, 'QSOs per hour block');
  attachTips(el);
}

/* ── QSOs PER BAND (new 2026-07-24) ──
   The dashboard previously only showed distance per band, never the plain
   QSO count per band, which is the number an operator actually wants. */
function renderBandMixChart(s) {
  if (!document.getElementById('qdBandMixChart')) return;
  const rows = QD.bandOrder.filter(b => s.perBand.has(b))
    .concat([...s.perBand.keys()].filter(b => !QD.bandOrder.includes(b)))
    .map(b => [b, s.perBand.get(b).count]);
  const total = rows.reduce((a, r) => a + r[1], 0) || 1;
  chartDefaults();
  mkChart('qdBandMixChart', {
    type: 'bar',
    data: {
      labels: rows.map(r => r[0]),
      datasets: [{ data: rows.map(r => r[1]),
        backgroundColor: rows.map(r => QD.bandColours[r[0]] || QD.bandColours.other),
        borderRadius: 4, maxBarThickness: 26 }],
    },
    options: baseOpts({
      indexAxis: 'y',
      layout: { padding: { right: 56 } },
      plugins: {
        tooltip: { callbacks: { label: c => ` ${c.parsed.x} QSOs · ${Math.round(c.parsed.x / total * 100)}%` } },
        qdValueLabels: { enabled: true, fmt: v => `${v}  (${Math.round(v / total * 100)}%)` },
      },
      scales: {
        x: { grid: { color: QD.colors.grid }, beginAtZero: true, ticks: { precision: 0 } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    }),
  });
}

/* ── DISTANCE PER BAND ── */
function renderBandDistChart(s) {
  const rows = [...s.perBand.entries()]
    .filter(([, v]) => v.distKm > 0)
    .sort((a, b) => b[1].distKm - a[1].distKm);
  chartDefaults();
  mkChart('qdBandDistChart', {
    type: 'bar',
    data: {
      labels: rows.map(r => r[0]),
      datasets: [{ data: rows.map(r => r[1].distKm),
        backgroundColor: rows.map(r => QD.bandColours[r[0]] || QD.colors.green),
        borderRadius: 3, maxBarThickness: 20 }],
    },
    options: baseOpts({
      indexAxis: 'y',
      layout: { padding: { right: 52 } },
      plugins: {
        tooltip: { callbacks: { label: c => ' ' + Math.round(c.parsed.x).toLocaleString('en-GB') + ' km' } },
        qdValueLabels: { enabled: true, fmt: fmtKm },
      },
      scales: {
        x: { grid: { color: QD.colors.grid }, ticks: { callback: v => v >= 1e6 ? (v / 1e6) + 'M' : (v / 1e3) + 'k' } },
        y: { grid: { display: false } },
      },
    }),
  });
}

/* ── DISTANCE SPREAD ── */
function renderDistSpreadChart(s) {
  chartDefaults();
  mkChart('qdDistChart', {
    type: 'bar',
    data: {
      labels: ['<100 km', '100-1k', '1k-5k', '5k+'],
      /* Near to far now reads as its own colour ramp instead of four
         identical cyan bars. */
      datasets: [{ data: s.distBuckets,
        backgroundColor: ['#63e6be', '#00d4ff', '#b197fc', '#f0a500'],
        borderRadius: 4, maxBarThickness: 42 }],
    },
    options: baseOpts({
      layout: { padding: { top: 18 } },
      plugins: {
        tooltip: { callbacks: { label: c => ` ${c.parsed.y} QSOs · ${Math.round(c.parsed.y / (s.distCount || 1) * 100)}% of located QSOs` } },
        qdValueLabels: { enabled: true },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: QD.colors.grid }, beginAtZero: true, ticks: { precision: 0 } },
      },
    }),
  });
}

/* ── CONTINENT BREAKDOWN ── */
function renderContChart(s) {
  const rows = QD.contOrder.filter(c => s.perCont.has(c));
  chartDefaults();
  mkChart('qdContChart', {
    type: 'bar',
    data: {
      labels: rows.map(c => QD.contNames[c] || c),
      datasets: [{ data: rows.map(c => s.perCont.get(c)),
        backgroundColor: rows.map(c => QD.contColours[c] || QD.colors.amber),
        borderRadius: 4, maxBarThickness: 22 }],
    },
    options: baseOpts({
      indexAxis: 'y',
      layout: { padding: { right: 56 } },
      plugins: {
        tooltip: { callbacks: { label: c => ` ${c.parsed.x} QSOs · ${Math.round(c.parsed.x / s.qsos.length * 100)}%` } },
        qdValueLabels: { enabled: true, fmt: v => `${v}  (${Math.round(v / s.qsos.length * 100)}%)` },
      },
      scales: {
        x: { grid: { color: QD.colors.grid }, beginAtZero: true, ticks: { precision: 0 } },
        y: { grid: { display: false } },
      },
    }),
  });
}

/* ── MODE SPLIT ── */
function renderModeChart(s) {
  const rows = [...s.perMode.entries()].sort((a, b) => b[1] - a[1]);
  const fallback = ['#00ff88', '#00d4ff', '#f0a500', '#da77f2', '#ffa94d', '#4dabf7'];
  chartDefaults();
  mkChart('qdModeChart', {
    type: 'doughnut',
    data: {
      labels: rows.map(r => r[0]),
      datasets: [{ data: rows.map(r => r[1]),
        backgroundColor: rows.map((r, i) => QD.modeColours[r[0]] || fallback[i % fallback.length]),
        borderColor: '#0d1428', borderWidth: 3, hoverOffset: 6 }],
    },
    options: baseOpts({
      cutout: '66%',
      plugins: {
        qdDoughnutCentre: { enabled: true, value: s.qsos.length.toLocaleString('en-GB'), label: 'QSOs' },
        tooltip: { callbacks: { label: c => ` ${c.parsed} QSOs · ${Math.round(c.parsed / s.qsos.length * 100)}%` } },
        legend: { display: true, position: 'right',
          labels: { boxWidth: 10, padding: 10,
            generateLabels: chart => chart.data.labels.map((l, i) => ({
              text: `${l} ${Math.round(chart.data.datasets[0].data[i] / s.qsos.length * 100)}%`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
              strokeStyle: 'transparent',
              index: i,
            })) } },
      },
    }),
  });
}

/* ── MILESTONES (generated strictly from the log, nothing invented) ── */
function renderMilestones(s) {
  const miles = [];
  const q = s.qsos;   // already sorted chronologically

  /* Nth QSO milestones */
  QD.qsoMilestones.forEach(n => {
    if (q.length >= n) {
      const rec = q[n - 1];
      miles.push({ date: rec.date,
        html: n === 1
          ? `First QSO ever · <span class="hl">${rec.call}</span> on ${rec.band} ${rec.mode}`
          : `${n.toLocaleString('en-GB')}th QSO · <span class="hl">${rec.call}</span> on ${rec.band}` });
    }
  });

  /* first QSO per band / per mode */
  const seenBand = new Set(), seenMode = new Set();
  q.forEach(rec => {
    if (rec.band !== 'other' && !seenBand.has(rec.band)) {
      seenBand.add(rec.band);
      miles.push({ date: rec.date, html: `First QSO on ${rec.band} · <span class="hl">${rec.call}</span>` });
    }
    if (rec.mode !== 'UNKNOWN' && !seenMode.has(rec.mode)) {
      seenMode.add(rec.mode);
      miles.push({ date: rec.date, html: `First ${rec.mode} QSO · <span class="hl">${rec.call}</span>` });
    }
  });

  /* distance record progression */
  let rec = 0;
  q.forEach(x => {
    if (x.dist && x.dist > rec) {
      rec = x.dist;
      if (rec >= 1000) miles.push({ date: x.date,
        html: `New distance record · <span class="hl">${x.call}</span>, ${rec.toLocaleString('en-GB')} km on ${x.band}` });
    }
  });

  /* best day */
  if (s.bestDay && s.bestDay.count >= 5) {
    miles.push({ date: s.bestDay.date, html: `Busiest day so far · ${s.bestDay.count} QSOs in one day` });
  }

  miles.sort((a, b) => b.date.localeCompare(a.date));
  document.getElementById('qdMiles').innerHTML = miles.slice(0, 25).map(m =>
    `<div class="qd-mile"><span class="qd-mile-date">${fmtDate(m.date)}</span><span class="qd-mile-text">${m.html}</span></div>`
  ).join('') || '<div class="qd-loading">No milestones yet</div>';
}

/* ── CHART HELPERS ── */

/* Every visual is rebuilt whenever a slicer changes, so the previous
   Chart.js instance on that canvas has to be destroyed first. */
function mkChart(id, cfg) {
  const el = document.getElementById(id);
  if (!el) return null;
  if (qdCharts[id]) { qdCharts[id].destroy(); delete qdCharts[id]; }
  qdCharts[id] = new Chart(el, cfg);
  return qdCharts[id];
}

/* Vertical gradient helper. Chart.js hands the scriptable colour callback
   a context without a chart area on the very first pass, so fall back to
   the solid top colour until the layout is known. */
function vGradient(ctx, top, bottom) {
  const area = ctx.chart.chartArea;
  if (!area) return top;
  const g = ctx.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  return g;
}

/* Draws the value straight onto each bar. Reading a chart should not
   require hovering every single bar. No external plugin needed. */
const qdValueLabels = {
  id: 'qdValueLabels',
  afterDatasetsDraw(chart, _args, opts) {
    if (!opts || !opts.enabled) return;
    const ctx = chart.ctx;
    const horizontal = chart.options.indexAxis === 'y';
    ctx.save();
    ctx.font = "10px 'Share Tech Mono', monospace";
    ctx.fillStyle = opts.color || '#b0c4d8';
    chart.data.datasets.forEach((ds, di) => {
      if (ds.type === 'line') return;
      const meta = chart.getDatasetMeta(di);
      if (meta.hidden) return;
      meta.data.forEach((el, i) => {
        const v = ds.data[i];
        if (!v) return;
        const txt = opts.fmt ? opts.fmt(v) : String(v);
        if (horizontal) {
          ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
          ctx.fillText(txt, el.x + 7, el.y);
        } else {
          ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
          ctx.fillText(txt, el.x, el.y - 5);
        }
      });
    });
    ctx.restore();
  },
};

/* Puts the grand total in the hole of the doughnut. */
const qdDoughnutCentre = {
  id: 'qdDoughnutCentre',
  afterDatasetsDraw(chart, _args, opts) {
    if (!opts || !opts.enabled) return;
    const area = chart.chartArea;
    if (!area) return;
    const meta = chart.getDatasetMeta(0);
    const arc = meta && meta.data && meta.data[0];
    const cx = arc ? arc.x : (area.left + area.right) / 2;
    const cy = arc ? arc.y : (area.top + area.bottom) / 2;
    const ctx = chart.ctx;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e6f1ff';
    ctx.font = "700 20px 'Orbitron', 'Share Tech Mono', monospace";
    ctx.fillText(opts.value, cx, cy - 6);
    ctx.fillStyle = '#7a96b0';
    ctx.font = "9px 'Share Tech Mono', monospace";
    ctx.fillText(opts.label, cx, cy + 12);
    ctx.restore();
  },
};

let qdPluginsRegistered = false;
function chartDefaults() {
  Chart.defaults.color = QD.colors.text3;
  Chart.defaults.font.family = "'Share Tech Mono', monospace";
  Chart.defaults.font.size = 10;
  Chart.defaults.borderColor = QD.colors.grid;
  if (!qdPluginsRegistered) {
    Chart.register(qdValueLabels, qdDoughnutCentre);
    qdPluginsRegistered = true;
  }
}
function baseOpts(extra) {
  const o = Object.assign({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 550 },
    interaction: { intersect: false, mode: 'nearest' },
  }, extra);
  o.plugins = Object.assign({
    legend: { display: false },
    qdValueLabels: { enabled: false },
    qdDoughnutCentre: { enabled: false },
    tooltip: {
      backgroundColor: 'rgba(8,13,24,0.96)',
      borderColor: 'rgba(0,255,136,0.28)',
      borderWidth: 1,
      titleColor: '#e6f1ff',
      bodyColor: '#b0c4d8',
      titleFont: { family: "'Share Tech Mono', monospace", size: 11 },
      bodyFont: { family: "'Share Tech Mono', monospace", size: 11 },
      padding: 10,
      cornerRadius: 6,
      displayColors: false,
    },
  }, (extra && extra.plugins) || {});
  return o;
}

/* ── SHARED DOM TOOLTIP for heatmap grids ── */
let qdTip = null;
function attachTips(container) {
  if (!qdTip) {
    qdTip = document.createElement('div');
    qdTip.className = 'qd-tip';
    document.body.appendChild(qdTip);
  }
  container.addEventListener('mousemove', e => {
    const t = e.target.closest('[data-tip]');
    if (!t) { qdTip.style.display = 'none'; return; }
    qdTip.innerHTML = t.dataset.tip;
    qdTip.style.display = 'block';
    qdTip.style.left = Math.min(e.clientX + 14, window.innerWidth - qdTip.offsetWidth - 10) + 'px';
    qdTip.style.top = (e.clientY + 14) + 'px';
  });
  container.addEventListener('mouseleave', () => { qdTip.style.display = 'none'; });
}

/* ── ERROR STATE ── */
function setError(msg) {
  document.getElementById('qdUpdated').textContent = msg;
  document.getElementById('qdKpis').innerHTML = `<div class="qd-loading">${msg}</div>`;
}
