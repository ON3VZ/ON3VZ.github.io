/* ============================================================
   ON3VZ — Logbook JS
   ADIF parser · D3 world map · great-circle arcs · filters
   ============================================================ */

'use strict';

/* ── CONFIG ── */
const CFG = {
  homeLatLng: [51.178, 4.347],          // Hoboken, Antwerpen
  proxyUrl: 'https://on3vz-qrz-proxy.kristof-cornelis.workers.dev/qrz',
  adifDir: '/assets/data/',            // directory scanned for all *.adi files
  bandOrder: ['160m','80m','40m','30m','20m','17m','15m','12m','10m','6m','2m','70cm'],
  bandColours: {
    '80m':  '#ff6b6b',
    '40m':  '#ffa94d',
    '30m':  '#ffe066',
    '20m':  '#69db7c',
    '15m':  '#4dabf7',
    '10m':  '#da77f2',
    '2m':   '#00d4ff',
    '70cm': '#f783ac',
  },
  contNames: {
    NA: 'North America', SA: 'South America', EU: 'Europe',
    AF: 'Africa', AS: 'Asia', OC: 'Oceania', AN: 'Antarctica'
  }
};

/* ── DXCC → continent + approximate lat/lng lookup (compact table) ──
   We embed a minimal table; QRZ XML provides DXCC entity + continent in the
   QSO record, so we only need lat/lng for map pins.
   For entities not in this table we fall back to continent centroid.        */
const DXCC_LL = {
  /* Europe */
  'Belgium':          [50.5, 4.5],    'Netherlands':     [52.1, 5.3],
  'Germany':          [51.2, 10.4],   'France':          [46.2, 2.2],
  'United Kingdom':   [54.0, -2.0],   'Ireland':         [53.0, -8.0],
  'Spain':            [40.2, -3.7],   'Portugal':        [39.5, -8.0],
  'Italy':            [42.8, 12.8],   'Switzerland':     [46.8, 8.2],
  'Austria':          [47.5, 13.9],   'Poland':          [52.1, 19.4],
  'Czech Republic':   [49.8, 15.5],   'Sweden':          [60.1, 18.6],
  'Norway':           [60.5, 8.5],    'Finland':         [61.9, 25.7],
  'Denmark':          [56.3, 9.5],    'Luxembourg':      [49.8, 6.1],
  'Hungary':          [47.2, 19.5],   'Romania':         [45.9, 24.9],
  'Bulgaria':         [42.7, 25.5],   'Greece':          [39.1, 21.8],
  'Croatia':          [45.1, 15.2],   'Serbia':          [44.0, 21.0],
  'Slovenia':         [46.1, 14.8],   'Slovakia':        [48.7, 19.7],
  'Ukraine':          [48.4, 31.2],   'Russia':          [60.0, 60.0],
  'Kaliningrad':      [54.7, 20.5],   'Belarus':         [53.7, 28.0],
  'Lithuania':        [55.9, 23.9],   'Latvia':          [56.9, 24.6],
  'Estonia':          [58.6, 25.0],   'Malta':           [35.9, 14.4],
  'San Marino':       [43.9, 12.5],   'Andorra':         [42.5, 1.5],
  'Liechtenstein':    [47.1, 9.5],    'Monaco':          [43.7, 7.4],
  'Iceland':          [65.0, -18.0],  'Faroe Islands':   [62.0, -7.0],
  /* North America */
  'United States':    [38.0, -97.0],  'Canada':          [56.0, -96.0],
  'Mexico':           [23.6, -102.0],
  /* South America */
  'Brazil':           [-14.2, -51.9], 'Argentina':       [-38.4, -63.6],
  'Chile':            [-35.7, -71.5], 'Peru':            [-9.2, -75.0],
  'Colombia':         [4.6, -74.3],   'Venezuela':       [6.4, -66.6],
  /* Asia */
  'Japan':            [36.2, 138.3],  'China':           [35.9, 104.2],
  'South Korea':      [35.9, 127.8],  'India':           [20.6, 78.9],
  'Indonesia':        [-0.8, 113.9],  'Taiwan':          [23.7, 120.9],
  'Thailand':         [15.9, 100.9],  'Vietnam':         [14.1, 108.3],
  'Malaysia':         [4.2, 108.0],   'Philippines':     [12.9, 121.8],
  'Israel':           [31.0, 34.9],   'Turkey':          [38.9, 35.2],
  'Saudi Arabia':     [23.9, 45.1],   'Iran':            [32.4, 53.7],
  /* Africa */
  'South Africa':     [-30.6, 22.9],  'Nigeria':         [9.1, 8.7],
  'Egypt':            [26.8, 30.8],   'Morocco':         [31.8, -7.1],
  'Kenya':            [-0.0, 37.9],   'Tanzania':        [-6.4, 34.9],
  /* Oceania */
  'Australia':        [-25.3, 133.8], 'New Zealand':     [-40.9, 174.9],
  'Hawaii':           [19.9, -155.6],
};

const CONT_CENTROID = {
  NA: [54, -105], SA: [-15, -60], EU: [54, 15],
  AF: [5, 20],   AS: [40, 80],  OC: [-22, 140], AN: [-80, 0]
};

/* ── STATE ── */
let allQsos   = [];
let sortCol = 'date';
let sortDir = 'desc';
let tableSearch = {};
let activeYears = new Set();
let activeBands = new Set();
let activeCont  = new Set();
let d3Loaded = false;
let geoReady = false;
let worldGeo = null;
let projection, path, svgEl, svgG;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupTableControls();
  loadD3ThenGeo();
  loadAdif();
  document.getElementById('btnRefresh').addEventListener('click', refreshFromQRZ);
  document.getElementById('btnSelectAll').addEventListener('click', selectAll);
  document.getElementById('btnClearAll').addEventListener('click', clearAll);
});

/* ── TABS ── */
function setupTabs() {
  document.querySelectorAll('.lb-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.lb-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
}

/* ── LOAD D3 + TOPOJSON + WORLD GEO ── */
function loadD3ThenGeo() {
  const d3Script = document.createElement('script');
  d3Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
  d3Script.onload = () => {
    const topoScript = document.createElement('script');
    topoScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
    topoScript.onload = () => {
      d3Loaded = true;
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(r => r.json())
        .then(data => {
          worldGeo = data;
          geoReady = true;
          initMap();
          if (allQsos.length) renderMap();
        })
        .catch(() => setLoading('Map data unavailable'));
    };
    document.head.appendChild(topoScript);
  };
  document.head.appendChild(d3Script);
}

/* ── LOAD ALL ADIF FILES via manifest ── */
function loadAdif() {
  setLoading('Loading logbook data…');
  const ts = '?t=' + Date.now();
  // Fetch the manifest that lists all ADI files in the data directory
  fetch(CFG.adifDir + 'manifest.json' + ts)
    .then(r => r.ok ? r.json() : Promise.resolve(null))
    .then(manifest => {
      // If no manifest, fall back to single logbook.adi
      const files = manifest ? manifest.files : ['logbook.adi'];
      return Promise.all(
        files.map(f =>
          fetch(CFG.adifDir + f + ts)
            .then(r => r.ok ? r.text() : '')
            .catch(() => '')
        )
      );
    })
    .then(texts => {
      const combined = texts.join('\n');
      const raw = parseAdif(combined);
      allQsos = deduplicateQsos(raw);
      if (!allQsos.length) throw new Error('No QSOs found in ADI files');
      buildFilters();
      applyFilters();
    })
    .catch(err => {
      setLoading('No logbook data · ' + err.message);
      document.getElementById('qsoTbody').innerHTML =
        '<tr><td colspan="9" class="tbl-empty">No logbook data available.</td></tr>';
    });
}

/* ── DEDUPLICATE QSOs ──
   Key: call + date + time (±1 min) + band + mode
   Keeps the QSO with the most filled-in fields.           */
function deduplicateQsos(qsos) {
  const map = new Map();
  qsos.forEach(q => {
    // Round time to nearest 5 minutes to catch slight differences
    const t = q.time ? q.time.slice(0,4) : '0000';
    const key = [q.call, q.date, t.slice(0,3), q.band, q.mode]
      .join('|').toLowerCase();
    if (!map.has(key)) {
      map.set(key, q);
    } else {
      // Keep the one with more non-empty fields
      const existing = map.get(key);
      const existScore = Object.values(existing).filter(Boolean).length;
      const newScore   = Object.values(q).filter(Boolean).length;
      if (newScore > existScore) map.set(key, q);
    }
  });
  return [...map.values()];
}

/* ── REFRESH FROM QRZ (via Cloudflare Worker) ── */
function refreshFromQRZ() {
  const btn = document.getElementById('btnRefresh');
  btn.classList.add('spinning');
  setTimeout(() => btn.classList.remove('spinning'), 1000);
  loadAdif();
}

/* ── ADIF PARSER ── */
function parseAdif(raw) {
  const qsos = [];
  // Find start of records (after <EOH> or from the beginning)
  const eohIdx = raw.toUpperCase().indexOf('<EOH>');
  const body = eohIdx >= 0 ? raw.slice(eohIdx + 5) : raw;

  const recordRe = /<(\w+):(\d+)(?::\w+)?>([\s\S]*?)(?=<\w+:\d|<EOR>|$)/gi;
  let recordBuf = {};
  let match;

  // Split into records by <EOR>
  const records = body.split(/<EOR>/i);
  for (const rec of records) {
    const fields = {};
    const fieldRe = /<(\w+):(\d+)(?::\w+)?>/gi;
    let fm;
    while ((fm = fieldRe.exec(rec)) !== null) {
      const name = fm[1].toUpperCase();
      const len  = parseInt(fm[2]);
      const val  = rec.slice(fm.index + fm[0].length, fm.index + fm[0].length + len).trim();
      fields[name] = val;
    }
    if (!fields.CALL) continue;
    qsos.push(normaliseQso(fields));
  }
  return qsos;
}

function normaliseQso(f) {
  const band = normaliseBand(f.BAND || f.FREQ || '');
  return {
    call:    f.CALL       || '',
    date:    f.QSO_DATE   || '',
    time:    f.TIME_ON    || '',
    band:    band,
    mode:    f.MODE       || '',
    rstS:    f.RST_SENT   || '',
    rstR:    f.RST_RCVD   || '',
    dxcc:    f.COUNTRY    || f.DXCC || '',
    cont:    f.CONT       || guessContinent(f.COUNTRY || ''),
    lat:     parseFloat(f.LAT)  || null,
    lng:     parseFloat(f.LON)  || null,
    year:    (f.QSO_DATE || '').slice(0, 4),
  };
}

function normaliseBand(val) {
  if (!val) return 'other';
  const v = val.toLowerCase().trim();
  if (v.includes('m') || v.includes('cm')) return v;
  // Frequency in MHz
  const mhz = parseFloat(v);
  if (isNaN(mhz)) return 'other';
  if (mhz >= 1.8  && mhz <= 2.0)   return '160m';
  if (mhz >= 3.5  && mhz <= 4.0)   return '80m';
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

function guessContinent(country) {
  // Fallback mapping for common DXCC names when CONT field is missing
  const map = {
    'Belgium':'EU','Netherlands':'EU','Germany':'EU','France':'EU',
    'United Kingdom':'EU','Spain':'EU','Italy':'EU','Poland':'EU',
    'Russia':'EU','Ukraine':'EU','Czech Republic':'EU','Austria':'EU',
    'Switzerland':'EU','Sweden':'EU','Norway':'EU','Finland':'EU',
    'Denmark':'EU','Portugal':'EU','Hungary':'EU','Romania':'EU',
    'United States':'NA','Canada':'NA','Mexico':'NA',
    'Brazil':'SA','Argentina':'SA','Chile':'SA',
    'Japan':'AS','China':'AS','South Korea':'AS','India':'AS',
    'Indonesia':'AS','Taiwan':'AS','Israel':'AS','Turkey':'AS',
    'Australia':'OC','New Zealand':'OC',
    'South Africa':'AF','Nigeria':'AF','Egypt':'AF','Morocco':'AF',
  };
  return map[country] || 'EU';
}

function getLatLng(qso) {
  if (qso.lat && qso.lng) return [qso.lat, qso.lng];
  if (DXCC_LL[qso.dxcc]) return DXCC_LL[qso.dxcc];
  return CONT_CENTROID[qso.cont] || [0, 0];
}

/* ── FILTERS ── */
function buildFilters() {
  const years = [...new Set(allQsos.map(q => q.year))].sort().reverse();
  const bands  = [...new Set(allQsos.map(q => q.band))]
    .sort((a,b) => (CFG.bandOrder.indexOf(a)+99) - (CFG.bandOrder.indexOf(b)+99));
  const conts  = [...new Set(allQsos.map(q => q.cont))].sort();

  activeYears = new Set(years);
  activeBands = new Set(bands);
  activeCont  = new Set(conts);

  buildPills('msYear', years, activeYears, v => { toggle(activeYears, v); applyFilters(); });
  buildPills('msBand', bands, activeBands, v => { toggle(activeBands, v); applyFilters(); });
  buildPills('msCont', conts,  activeCont,  v => { toggle(activeCont, v);  applyFilters(); });
}

function buildPills(containerId, values, activeSet, onToggle) {
  const wrap = document.getElementById(containerId);
  wrap.innerHTML = '';
  values.forEach(v => {
    const pill = document.createElement('button');
    pill.className = 'ms-pill active';
    pill.textContent = v.toUpperCase();
    pill.dataset.val = v;
    // Apply band colour if this is the band filter
    const bandColour = CFG.bandColours[v];
    if (bandColour) {
      pill.style.setProperty('--pill-colour', bandColour);
      pill.classList.add('ms-pill--band');
    }
    pill.addEventListener('click', () => {
      onToggle(v);
      pill.classList.toggle('active', activeSet.has(v));
    });
    wrap.appendChild(pill);
  });
}

function toggle(set, val) {
  set.has(val) ? set.delete(val) : set.add(val);
}

function selectAll() {
  allQsos.forEach(q => { activeYears.add(q.year); activeBands.add(q.band); activeCont.add(q.cont); });
  document.querySelectorAll('.ms-pill').forEach(p => p.classList.add('active'));
  applyFilters();
}

function clearAll() {
  activeYears.clear(); activeBands.clear(); activeCont.clear();
  document.querySelectorAll('.ms-pill').forEach(p => p.classList.remove('active'));
  applyFilters();
}

function applyFilters() {
  const filtered = allQsos.filter(q =>
    activeYears.has(q.year) && activeBands.has(q.band) && activeCont.has(q.cont)
  );
  updateStats(filtered);
  renderTable(filtered);
  if (geoReady) renderMap(filtered);
  else if (!geoReady && d3Loaded) { /* wait */ }
}

/* ── STATS ── */
function updateStats(qsos) {
  document.getElementById('statTotal').textContent = qsos.length;
  document.getElementById('statDXCC').textContent  = new Set(qsos.map(q => q.dxcc).filter(Boolean)).size;
  document.getElementById('statBands').textContent = new Set(qsos.map(q => q.band)).size;
  document.getElementById('statCont').textContent  = new Set(qsos.map(q => q.cont)).size;
}

/* ── TABLE SORT & SEARCH SETUP ── */
function setupTableControls() {
  // Sort on header click
  document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (sortCol === col) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortCol = col;
        sortDir = 'asc';
      }
      // Update header classes
      document.querySelectorAll('.sortable').forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
        h.querySelector('.sort-icon').textContent = '';
      });
      th.classList.add('sort-' + sortDir);
      th.querySelector('.sort-icon').textContent = sortDir === 'asc' ? '↑' : '↓';
      applyFilters();
    });
  });

  // Search inputs
  document.querySelectorAll('.tbl-search').forEach(inp => {
    inp.addEventListener('input', () => {
      tableSearch[inp.dataset.col] = inp.value.trim().toLowerCase();
      applyFilters();
    });
  });
}

/* ── TABLE ── */
function renderTable(qsos) {
  const tbody = document.getElementById('qsoTbody');
  if (!qsos.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="tbl-empty">No QSOs match the selected filters.</td></tr>';
    return;
  }
  // Sort
  qsos = qsos.slice().sort((a, b) => {
    let va = String(a[sortCol] || '');
    let vb = String(b[sortCol] || '');
    // Date+time: combine for proper sort
    if (sortCol === 'date') { va = a.date + a.time; vb = b.date + b.time; }
    const cmp = va.localeCompare(vb, undefined, { numeric: true });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const rows = qsos.slice(0, 500);
  tbody.innerHTML = rows.map(q => {
    const colour = CFG.bandColours[q.band] || '#adb5bd';
    const dateStr = q.date ? q.date.slice(0,4)+'-'+q.date.slice(4,6)+'-'+q.date.slice(6,8) : '';
    const timeStr = q.time ? q.time.slice(0,2)+':'+q.time.slice(2,4) : '';
    return `<tr>
      <td>${dateStr}</td>
      <td>${timeStr}</td>
      <td class="qso-call">${q.call}</td>
      <td><span class="qso-band" style="background:${colour}22;border:1px solid ${colour}66;color:${colour}">${q.band.toUpperCase()}</span></td>
      <td>${q.mode}</td>
      <td>${q.rstS}</td>
      <td>${q.rstR}</td>
      <td>${q.dxcc}</td>
      <td>${CFG.contNames[q.cont] || q.cont}</td>
    </tr>`;
  }).join('');
}

/* ── MAP ── */
function initMap() {
  // Use fixed logical dimensions for consistent rendering
  const W = 960;
  const H = 480;

  svgEl = d3.select('#worldMap');
  svgEl
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', '100%');

  projection = d3.geoNaturalEarth1()
    .scale(153)
    .translate([W / 2, H / 2 + 40]);

  path = d3.geoPath().projection(projection);

  svgG = svgEl.append('g');

  // Draw countries
  const countries = topojson.feature(worldGeo, worldGeo.objects.countries);
  svgG.selectAll('.map-country')
    .data(countries.features)
    .enter().append('path')
    .attr('class', 'map-country')
    .attr('d', path);

  // Graticule
  const graticule = d3.geoGraticule()();
  svgG.append('path')
    .datum(graticule)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(0,255,136,0.06)')
    .attr('stroke-width', 0.4)
    .attr('d', path);
}

function renderMap(qsos) {
  if (!geoReady || !svgG) return;
  qsos = qsos || allQsos;

  setLoading(null); // hide loading

  // Remove old arcs + markers
  svgG.selectAll('.qso-arc').remove();
  svgG.selectAll('.dx-dot').remove();
  svgG.selectAll('.home-marker').remove();

  const [homeLat, homeLng] = CFG.homeLatLng;
  const homeXY = projection([homeLng, homeLat]);

  // Draw arcs
  const arcGen = d3.geoPath().projection(projection);

  // Group by callsign to avoid duplicate arcs — keep one per call
  const unique = new Map();
  qsos.forEach(q => { if (!unique.has(q.call)) unique.set(q.call, q); });

  unique.forEach(q => {
    const [dxLat, dxLng] = getLatLng(q);
    if (!dxLat && !dxLng) return;
    const colour = CFG.bandColours[q.band] || '#adb5bd';
    const arc = { type: 'LineString', coordinates: [[homeLng, homeLat], [dxLng, dxLat]] };
    svgG.append('path')
      .datum(arc)
      .attr('class', 'qso-arc')
      .attr('d', path)
      .attr('stroke', colour)
      .attr('stroke-width', 1.2)
      .attr('fill', 'none')
      .attr('opacity', 0.45)
      .on('mouseover', function(event) { showTooltip(event, q); d3.select(this).attr('opacity', 1).attr('stroke-width', 2.2); })
      .on('mousemove', moveTooltip)
      .on('mouseout',  function()       { hideTooltip(); d3.select(this).attr('opacity', 0.45).attr('stroke-width', 1.2); });
  });

  // DX dots
  unique.forEach(q => {
    const [dxLat, dxLng] = getLatLng(q);
    if (!dxLat && !dxLng) return;
    const xy = projection([dxLng, dxLat]);
    if (!xy) return;
    const colour = CFG.bandColours[q.band] || '#adb5bd';
    svgG.append('circle')
      .attr('class', 'dx-dot')
      .attr('cx', xy[0]).attr('cy', xy[1])
      .attr('r', 2.5)
      .attr('fill', colour)
      .attr('opacity', 0.8)
      .on('mouseover', function(event) { showTooltip(event, q); d3.select(this).attr('r', 4); })
      .on('mousemove', moveTooltip)
      .on('mouseout',  function()       { hideTooltip(); d3.select(this).attr('r', 2.5); });
  });

  // Home marker
  if (homeXY) {
    const hg = svgG.append('g').attr('class', 'home-marker').attr('transform', `translate(${homeXY})`);
    hg.append('circle').attr('r', 5).attr('fill', 'var(--c-primary)').attr('opacity', 0.9)
      .attr('filter', 'drop-shadow(0 0 4px #00ff88)');
    hg.append('circle').attr('r', 10).attr('fill', 'none').attr('stroke', 'var(--c-primary)')
      .attr('stroke-width', 1).attr('opacity', 0.4);
  }

  // Legend
  buildLegend(qsos);
}

function buildLegend(qsos) {
  const usedBands = [...new Set(qsos.map(q => q.band))];
  const legend = document.getElementById('mapLegend');
  legend.innerHTML = usedBands.map(b => {
    const c = CFG.bandColours[b] || '#adb5bd';
    return `<div class="legend-item"><div class="legend-line" style="background:${c}"></div>${b.toUpperCase()}</div>`;
  }).join('') + '<div class="legend-item"><div class="legend-line" style="background:var(--c-primary);border-radius:50%;width:8px;height:8px;flex-shrink:0"></div>ON3VZ</div>';
}

/* ── TOOLTIP ── */
let tooltip;
function ensureTooltip() {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    document.body.appendChild(tooltip);
  }
}
function showTooltip(event, q) {
  ensureTooltip();
  const dateStr = q.date ? q.date.slice(0,4)+'-'+q.date.slice(4,6)+'-'+q.date.slice(6,8) : '';
  tooltip.innerHTML = `<strong>${q.call}</strong>${q.dxcc ? q.dxcc + '<br>' : ''}${q.band.toUpperCase()} · ${q.mode}${dateStr ? '<br>' + dateStr : ''}`;
  tooltip.classList.add('visible');
  moveTooltip(event);
}
function moveTooltip(event) {
  if (!tooltip) return;
  tooltip.style.left = (event.clientX + 14) + 'px';
  tooltip.style.top  = (event.clientY - 10) + 'px';
}
function hideTooltip() {
  if (tooltip) tooltip.classList.remove('visible');
}

/* ── LOADING STATE ── */
function setLoading(msg) {
  const el = document.getElementById('mapLoading');
  const txt = document.getElementById('mapLoadingText');
  if (msg === null) {
    el.classList.add('hidden');
  } else {
    el.classList.remove('hidden');
    txt.textContent = msg;
  }
}
