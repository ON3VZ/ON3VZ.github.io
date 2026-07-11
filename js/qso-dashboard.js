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
  bandColours: {
    '80m': '#ff6b6b', '40m': '#ffa94d', '30m': '#ffe066', '20m': '#69db7c',
    '17m': '#63e6be', '15m': '#4dabf7', '12m': '#b197fc', '10m': '#da77f2',
    '6m': '#ff8787', '2m': '#00d4ff', '70cm': '#f783ac',
  },
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

/* ── RENDER ALL ── */
function renderAll() {
  const stats = computeStats(qdQsos);
  document.getElementById('qdUpdated').textContent =
    `${qdQsos.length.toLocaleString('en-GB')} QSOs · ${fmtDate(qdQsos[0].date)} to ${fmtDate(qdQsos[qdQsos.length - 1].date)}`;
  renderKpis(stats);
  renderCalendar(stats);
  renderTrendChart(stats);
  renderDxccChart(stats);
  renderFingerprint(stats);
  renderBandDistChart(stats);
  renderDistSpreadChart(stats);
  renderContChart(stats);
  renderModeChart(stats);
  renderMilestones(stats);
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

  const max = Math.max(1, ...s.perDay.values());
  const lvl = n => n === 0 ? 0 : Math.min(4, Math.ceil(n / max * 4));

  let html = '';
  for (let d = new Date(start); ; d = addDays(d, 1)) {
    const k = dateKey(d);
    const future = d > today;
    const n = s.perDay.get(k) || 0;
    html += `<div class="qd-cal-cell${future ? ' qd-cal-future' : ''}" data-lvl="${lvl(n)}" data-tip="${fmtDate(k)} · ${n} QSO${n === 1 ? '' : 's'}"></div>`;
    if (dateKey(d) === dateKey(today)) {
      /* pad the final column to a full 7-row week */
      let pad = (7 - ((Math.round((d - start) / 86400000) + 1) % 7)) % 7;
      while (pad--) html += '<div class="qd-cal-cell qd-cal-future"></div>';
      break;
    }
  }
  el.innerHTML = html;
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
  new Chart(document.getElementById('qdTrendChart'), {
    type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: QD.colors.green, borderRadius: 3, maxBarThickness: 22 }] },
    options: baseOpts({
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
  new Chart(document.getElementById('qdDxccChart'), {
    type: 'line',
    data: { labels, datasets: [{ data, borderColor: QD.colors.cyan,
      backgroundColor: 'rgba(0,212,255,0.08)', fill: true, stepped: true,
      pointRadius: 0, borderWidth: 2 }] },
    options: baseOpts({
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

  const max = Math.max(1, ...bands.flatMap(b => [...s.fingerprint.get(b)]));
  const lvl = n => n === 0 ? 0 : Math.min(4, Math.ceil(n / max * 4));

  el.style.gridTemplateColumns = `3.2rem repeat(24, 1fr)`;
  let html = '';
  bands.forEach(b => {
    html += `<div class="qd-fp-band">${b}</div>`;
    const arr = s.fingerprint.get(b);
    for (let h = 0; h < 24; h++) {
      html += `<div class="qd-fp-cell" data-lvl="${lvl(arr[h])}" data-tip="${b} &middot; ${String(h).padStart(2, '0')}:00-${String(h).padStart(2, '0')}:59 UTC &middot; ${arr[h]} QSO${arr[h] === 1 ? '' : 's'}"></div>`;
    }
  });
  html += '<div></div>';
  for (let h = 0; h < 24; h++) {
    html += `<div class="qd-fp-hour">${h % 3 === 0 ? String(h).padStart(2, '0') : ''}</div>`;
  }
  el.innerHTML = html;
  attachTips(el);
}

/* ── DISTANCE PER BAND ── */
function renderBandDistChart(s) {
  const rows = [...s.perBand.entries()]
    .filter(([, v]) => v.distKm > 0)
    .sort((a, b) => b[1].distKm - a[1].distKm);
  chartDefaults();
  new Chart(document.getElementById('qdBandDistChart'), {
    type: 'bar',
    data: {
      labels: rows.map(r => r[0]),
      datasets: [{ data: rows.map(r => r[1].distKm),
        backgroundColor: rows.map(r => QD.bandColours[r[0]] || QD.colors.green),
        borderRadius: 3, maxBarThickness: 20 }],
    },
    options: baseOpts({
      indexAxis: 'y',
      plugins: { tooltip: { callbacks: { label: c => ' ' + Math.round(c.parsed.x).toLocaleString('en-GB') + ' km' } } },
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
  new Chart(document.getElementById('qdDistChart'), {
    type: 'bar',
    data: {
      labels: ['<100 km', '100-1k', '1k-5k', '5k+'],
      datasets: [{ data: s.distBuckets, backgroundColor: QD.colors.cyan, borderRadius: 3, maxBarThickness: 34 }],
    },
    options: baseOpts({
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: QD.colors.grid }, beginAtZero: true, ticks: { precision: 0 } },
      },
    }),
  });
}

/* ── CONTINENT BREAKDOWN ── */
function renderContChart(s) {
  const rows = QD.contOrder.filter(c => s.perCont.has(c));
  chartDefaults();
  new Chart(document.getElementById('qdContChart'), {
    type: 'bar',
    data: {
      labels: rows.map(c => QD.contNames[c] || c),
      datasets: [{ data: rows.map(c => s.perCont.get(c)), backgroundColor: QD.colors.amber, borderRadius: 3, maxBarThickness: 20 }],
    },
    options: baseOpts({
      indexAxis: 'y',
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
  const palette = [QD.colors.green, QD.colors.cyan, QD.colors.amber, '#da77f2', '#ffa94d', '#4dabf7'];
  chartDefaults();
  new Chart(document.getElementById('qdModeChart'), {
    type: 'doughnut',
    data: {
      labels: rows.map(r => r[0]),
      datasets: [{ data: rows.map(r => r[1]),
        backgroundColor: rows.map((_, i) => palette[i % palette.length]),
        borderColor: '#0d1428', borderWidth: 3 }],
    },
    options: baseOpts({
      cutout: '62%',
      plugins: {
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
function chartDefaults() {
  Chart.defaults.color = QD.colors.text3;
  Chart.defaults.font.family = "'Share Tech Mono', monospace";
  Chart.defaults.font.size = 10;
  Chart.defaults.borderColor = QD.colors.grid;
}
function baseOpts(extra) {
  const o = Object.assign({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
  }, extra);
  o.plugins = Object.assign({ legend: { display: false } }, (extra && extra.plugins) || {});
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
