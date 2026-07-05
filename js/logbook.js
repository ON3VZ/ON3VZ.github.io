/* ============================================================
   ON3VZ — Logbook JS
   ADIF parser · D3 world map · great-circle arcs · filters
   ============================================================ */

'use strict';


/* ── ISO numeric → amateur radio prefix ── */
const ISO_PREFIX = {
  4:'YA',8:'ZA',12:'7X',24:'D2',32:'LU',36:'VK',40:'OE',50:'S2',
  56:'ON',64:'A5',68:'CP',76:'PY',100:'LZ',116:'XU',120:'TJ',
  124:'VE',152:'CE',156:'BY',170:'HK',178:'TN',188:'TI',191:'9A',
  192:'CO',203:'OK',208:'OZ',218:'HC',818:'SU',222:'YS',231:'ET',
  246:'OH',250:'F',276:'DL',288:'9G',300:'SV',320:'TG',332:'HH',
  340:'HR',348:'HA',356:'VU',360:'YB',364:'EP',368:'YI',372:'EI',
  376:'4X',380:'I',388:'6Y',392:'JA',400:'JY',398:'UN',404:'5Z',
  408:'P5',410:'HL',414:'9K',418:'XW',422:'OD',434:'5A',484:'XE',
  504:'CN',508:'C9',524:'9N',528:'PA',554:'ZL',566:'5N',578:'LA',
  586:'AP',591:'HP',604:'OA',608:'DU',616:'SP',620:'CT',634:'A7',
  642:'YO',643:'UA',682:'HZ',686:'6W',703:'OM',705:'S5',706:'T5',
  710:'ZS',724:'EA',729:'ST',752:'SM',756:'HB',760:'YK',764:'HS',
  792:'TA',800:'5X',804:'UR',784:'A6',826:'G',840:'W',858:'CX',
  860:'UK',862:'YV',704:'3W',887:'7O',894:'9J',716:'Z2',
  51:'EK',31:'4J',112:'EU',44:'C6',48:'A9',84:'V3',204:'TY',
  72:'A2',854:'XT',108:'9U',132:'D4',140:'TL',148:'TT',174:'D6',
  266:'TR',270:'C5',324:'3X',624:'J5',454:'7Q',466:'TZ',478:'5T',
  516:'V5',562:'5U',646:'9X',678:'S9',729:'ST',834:'5H',768:'5V',
  788:'3V',716:'Z2'
};

/* ── ISO numeric → country name (subset, for hover tooltip) ── */
const ISO_NAMES = {
  4:'Afghanistan',8:'Albania',12:'Algeria',24:'Angola',32:'Argentina',
  36:'Australia',40:'Austria',50:'Bangladesh',56:'Belgium',64:'Bhutan',
  68:'Bolivia',76:'Brazil',100:'Bulgaria',116:'Cambodia',120:'Cameroon',
  124:'Canada',152:'Chile',156:'China',170:'Colombia',178:'Congo',
  188:'Costa Rica',191:'Croatia',192:'Cuba',203:'Czech Republic',
  208:'Denmark',218:'Ecuador',818:'Egypt',222:'El Salvador',231:'Ethiopia',
  246:'Finland',250:'France',276:'Germany',288:'Ghana',300:'Greece',
  320:'Guatemala',332:'Haiti',340:'Honduras',348:'Hungary',356:'India',
  360:'Indonesia',364:'Iran',368:'Iraq',372:'Ireland',376:'Israel',
  380:'Italy',388:'Jamaica',392:'Japan',400:'Jordan',398:'Kazakhstan',
  404:'Kenya',408:'North Korea',410:'South Korea',414:'Kuwait',418:'Laos',
  422:'Lebanon',434:'Libya',484:'Mexico',504:'Morocco',508:'Mozambique',
  524:'Nepal',528:'Netherlands',540:'New Caledonia',554:'New Zealand',
  566:'Nigeria',578:'Norway',586:'Pakistan',591:'Panama',604:'Peru',
  608:'Philippines',616:'Poland',620:'Portugal',630:'Puerto Rico',
  634:'Qatar',642:'Romania',643:'Russia',682:'Saudi Arabia',
  686:'Senegal',694:'Sierra Leone',703:'Slovakia',705:'Slovenia',
  706:'Somalia',710:'South Africa',724:'Spain',729:'Sudan',752:'Sweden',
  756:'Switzerland',760:'Syria',764:'Thailand',792:'Turkey',800:'Uganda',
  804:'Ukraine',784:'UAE',826:'United Kingdom',840:'United States',
  858:'Uruguay',860:'Uzbekistan',862:'Venezuela',704:'Vietnam',887:'Yemen',
  894:'Zambia',716:'Zimbabwe',12:'Algeria',51:'Armenia',31:'Azerbaijan',
  112:'Belarus',44:'Bahamas',48:'Bahrain',84:'Belize',204:'Benin',
  72:'Botswana',854:'Burkina Faso',108:'Burundi',132:'Cape Verde',
  140:'Central African Republic',148:'Chad',174:'Comoros',266:'Gabon',
  270:'Gambia',324:'Guinea',624:'Guinea-Bissau',454:'Malawi',466:'Mali',
  478:'Mauritania',508:'Mozambique',516:'Namibia',562:'Niger',646:'Rwanda',
  678:'São Tomé',686:'Senegal',694:'Sierra Leone',706:'Somalia',
  729:'Sudan',834:'Tanzania',768:'Togo',788:'Tunisia',800:'Uganda',
  894:'Zambia',716:'Zimbabwe'
};


const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

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
  },
  /* MAP DOT CLUSTERING (added 2026-07-05): delete this key to revert to
     one dot per station. Distance is measured in projected SVG units at
     the base (unzoomed) map scale, not in lat/lng degrees, so it isn't
     skewed by projection distortion near the poles. Two stations closer
     together than this on screen get merged into one dot with a count
     badge; increase for fewer/bigger clusters, decrease for more/smaller. */
  clusterThresholdPx: 14
};

/* ── DXCC → continent + approximate lat/lng lookup (compact table) ──
   We embed a minimal table; QRZ XML provides DXCC entity + continent in the
   QSO record, so we only need lat/lng for map pins.
   For entities not in this table we fall back to continent centroid.        */
const DXCC_LL = {
  /* Europe */
  'Belgium':          [50.5, 4.5],    'Netherlands':     [52.1, 5.3],
  'Germany':          [51.2, 10.4],   'France':          [46.2, 2.2],
  'United Kingdom':   [54.0, -2.0],   'England':         [53.0, -1.5],
  'Scotland':         [56.5, -4.0],   'Wales':           [52.3, -3.7],
  'Ireland':          [53.0, -8.0],
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
let globalSearch = '';
const PAGE_SIZE = 25;
let currentPage = 1;
let activeYears  = new Set();
let activeMonths = new Set();
let activeBands  = new Set();
let activeCont   = new Set();
const ALL_YEARS_THRESHOLD = 2; // show month filter only when ≤ this many years selected
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
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
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
      allQsos = backfillEntities(deduplicateQsos(raw));
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
    if (!fields.CALL && !fields.STATION_CALLSIGN) continue;
    if (!fields.CALL && fields.STATION_CALLSIGN) fields.CALL = fields.STATION_CALLSIGN;
    qsos.push(normaliseQso(fields));
  }
  return qsos;
}

/* Parse ADIF lat/lng strings like "N053 06.252" or "W001 22.500" */
function parseAdifCoord(s) {
  if (!s) return null;
  const m = String(s).trim().match(/^([NSEW])\s*(\d+)\s+(\d+(?:\.\d+)?)$/i);
  if (!m) { const v = parseFloat(s); return isNaN(v) ? null : v; }
  const deg = parseInt(m[2], 10) + parseFloat(m[3]) / 60;
  return (m[1].toUpperCase() === 'S' || m[1].toUpperCase() === 'W') ? -deg : deg;
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
    lat:     parseAdifCoord(f.LAT),
    lng:     parseAdifCoord(f.LON),
    dist:    f.DISTANCE ? parseInt(f.DISTANCE) : (f.DIST ? parseInt(f.DIST) : null),
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

/* Resolve a map position for a QSO.
   FIXED 2026-06-24: QRZ sends an "unknown location" sentinel of exactly 0,0 on
   some special-event / portable calls (e.g. CT7/F2VX). The old test
   `qso.lat && qso.lng` also threw away any genuine coordinate that happens to be
   exactly 0 (equator or Greenwich meridian). We now accept any finite value,
   treat an exact 0,0 pair as "no fix", and fall back to the worked entity's
   centroid, then its continent, so a pin is never dropped on Null Island. */
function hasRealCoords(q) {
  return Number.isFinite(q.lat) && Number.isFinite(q.lng) && !(q.lat === 0 && q.lng === 0);
}

function getLatLng(qso) {
  if (hasRealCoords(qso)) return [qso.lat, qso.lng];
  if (DXCC_LL[qso.dxcc]) return DXCC_LL[qso.dxcc];
  return CONT_CENTROID[qso.cont] || [0, 0];
}

/* ── ENTITY BACKFILL (added 2026-06-24) ──────────────────────────────────────
   Mirrors the DXCC-matrix logic so the table, tooltips and map agree.
   QRZ sometimes exports a call with COUNTRY="NON-DXCC" or blank (e.g. CS2OGA,
   a Portuguese special call) or with an entity that contradicts its own grid-
   square (EG60BRILAT is tagged Balearic but gridsquare IN52pk is in Galicia,
   mainland Spain). We repair such records:
     - CALL_OVERRIDES  : authoritative per-call corrections (verified by grid).
     - learn from log  : prefix -> entity taken from records already complete.
     - PREFIX_OVERRIDES: prefixes that never appear complete in the log.
   Unknown prefixes are left exactly as QRZ sent them (never invented).
   Revert: remove this block + the backfillEntities() call in loadAdif. */
const PFX_SUFFIXES = new Set(['P', 'M', 'MM', 'AM', 'A', 'QRP']);
function callPrefix(call) {
  call = (call || '').toUpperCase();
  let parts = call.split('/').filter(Boolean);
  if (!parts.length) return '';
  if (parts.length > 1) {
    const core = parts.filter(p => !PFX_SUFFIXES.has(p) && !/^\d+$/.test(p));
    if (core.length) parts = core;
    parts.sort((a, b) => a.length - b.length);
  }
  const m = parts[0].match(/^(\d?[A-Z]+)/);
  return m ? m[1] : parts[0];
}

/* country name + continent (the only entity fields the logbook page uses) */
const CALL_OVERRIDES = {
  // Tagged "Balearic Islands" by QRZ, but gridsquare IN52pk = Galicia (mainland).
  EG60BRILAT: { dxcc: 'Spain', cont: 'EU' },
};
const PREFIX_OVERRIDES = {
  // Portugal mainland special-event prefixes (CT / CR / CQ / CS all = Portugal).
  CS: { dxcc: 'Portugal', cont: 'EU' },
  CR: { dxcc: 'Portugal', cont: 'EU' },
  CQ: { dxcc: 'Portugal', cont: 'EU' },
};

function isBlankEntity(v) {
  const s = (v || '').trim().toUpperCase();
  return !s || s === 'NON-DXCC' || s === 'NONE';
}

function backfillEntities(qsos) {
  const learned = {};
  qsos.forEach(q => {
    if (!isBlankEntity(q.dxcc)) {
      const p = callPrefix(q.call);
      if (p && !learned[p]) learned[p] = { dxcc: q.dxcc, cont: q.cont };
    }
  });
  qsos.forEach(q => {
    const forced = CALL_OVERRIDES[(q.call || '').toUpperCase()];
    if (forced) {                                   // authoritative correction
      q.dxcc = forced.dxcc;
      if (forced.cont) q.cont = forced.cont;
      return;
    }
    if (!isBlankEntity(q.dxcc) && q.cont) return;
    const src = learned[callPrefix(q.call)] || PREFIX_OVERRIDES[callPrefix(q.call)];
    if (!src) return;                               // unknown -> leave untouched
    if (isBlankEntity(q.dxcc) && src.dxcc) q.dxcc = src.dxcc;
    if (!q.cont && src.cont) q.cont = src.cont;
  });
  return qsos;
}

/* ── FILTERS ── */
function buildFilters() {
  const years = [...new Set(allQsos.map(q => q.year))].sort().reverse();
  const bands  = [...new Set(allQsos.map(q => q.band))]
    .sort((a,b) => (CFG.bandOrder.indexOf(a)+99) - (CFG.bandOrder.indexOf(b)+99));
  const conts  = [...new Set(allQsos.map(q => q.cont))].sort();

  activeYears  = new Set(years);
  activeMonths = new Set();
  activeBands  = new Set(bands);
  activeCont   = new Set(conts);

  buildPills('msYear', years, activeYears, v => {
    toggle(activeYears, v);
    rebuildMonthFilter();
    applyFilters();
  });
  buildPills('msBand', bands, activeBands, v => { toggle(activeBands, v); applyFilters(); });
  buildPills('msCont', conts,  activeCont,  v => { toggle(activeCont, v);  applyFilters(); });
  rebuildMonthFilter();
}

function rebuildMonthFilter() {
  const group = document.getElementById('monthGroup');
  const label = document.getElementById('monthLabel');
  const wrap  = document.getElementById('msMonth');

  // Only show when 1 or 2 years are selected
  const selYears = [...activeYears].sort();
  if (selYears.length === 0 || selYears.length > ALL_YEARS_THRESHOLD) {
    group.style.display = 'none';
    activeMonths.clear();
    return;
  }

  // Find months that have QSOs in the selected years
  const monthsInYears = new Set(
    allQsos
      .filter(q => activeYears.has(q.year) && q.date && q.date.length >= 6)
      .map(q => q.date.slice(0, 6)) // YYYYMM
  );

  if (!monthsInYears.size) { group.style.display = 'none'; return; }

  // Update label
  label.textContent = selYears.length === 1
    ? 'MONTH · ' + selYears[0]
    : 'MONTH · ' + selYears.join(' + ');

  // Rebuild pills
  wrap.innerHTML = '';
  const sorted = [...monthsInYears].sort();

  // Init activeMonths to all if empty
  if (!activeMonths.size) sorted.forEach(m => activeMonths.add(m));

  sorted.forEach(ym => {
    const monthIdx = parseInt(ym.slice(4, 6), 10) - 1;
    const label2 = MONTH_NAMES[monthIdx] || ym.slice(4, 6);
    const pill = document.createElement('button');
    pill.className = 'ms-pill ms-pill--month' + (activeMonths.has(ym) ? ' active' : '');
    pill.textContent = label2;
    pill.dataset.val = ym;
    pill.addEventListener('click', () => {
      toggle(activeMonths, ym);
      pill.classList.toggle('active', activeMonths.has(ym));
      applyFilters();
    });
    wrap.appendChild(pill);
  });

  group.style.display = '';
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
  activeMonths.clear();
  document.querySelectorAll('.ms-pill').forEach(p => p.classList.add('active'));
  rebuildMonthFilter();
  applyFilters();
}

function clearAll() {
  activeYears.clear(); activeBands.clear(); activeCont.clear(); activeMonths.clear();
  document.querySelectorAll('.ms-pill').forEach(p => p.classList.remove('active'));
  document.getElementById('monthGroup').style.display = 'none';
  applyFilters();
}

function applyFilters() {
  const filtered = allQsos.filter(q => {
    if (!activeYears.has(q.year)) return false;
    if (!activeBands.has(q.band)) return false;
    if (!activeCont.has(q.cont))  return false;
    // Month filter only active when visible
    if (activeMonths.size && document.getElementById('monthGroup').style.display !== 'none') {
      const ym = (q.date || '').slice(0, 6);
      if (!activeMonths.has(ym)) return false;
    }
    // Free-text station search (added 2026-07-05): matches call, DXCC,
    // band or mode. Does not affect the map/stats scope beyond the normal
    // filters — it's an extra narrowing step on top of them.
    if (globalSearch) {
      const hay = `${q.call || ''} ${q.dxcc || ''} ${q.band || ''} ${q.mode || ''}`.toLowerCase();
      if (!hay.includes(globalSearch)) return false;
    }
    return true;
  });
  updateStats(filtered);
  currentPage = 1;
  renderTable(filtered);
  if (geoReady) renderMap(filtered);
  else if (!geoReady && d3Loaded) { /* wait */ }

  const searchCount = document.getElementById('qsoSearchCount');
  if (searchCount) searchCount.textContent = globalSearch ? `${filtered.length} match${filtered.length === 1 ? '' : 'es'}` : '';
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

  // Station search bar (added 2026-07-05)
  const stationSearch = document.getElementById('qsoSearch');
  if (stationSearch) {
    stationSearch.addEventListener('input', () => {
      globalSearch = stationSearch.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ── TABLE ── */
function renderTable(qsos) {
  const tbody = document.getElementById('qsoTbody');
  const pgEl  = document.getElementById('qso-pagination');
  if (!qsos.length) {
    tbody.innerHTML = '<tr><td colspan="10" class="tbl-empty">No QSOs match the selected filters.</td></tr>';
    if (pgEl) pgEl.innerHTML = '';
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

  const totalPages = Math.ceil(qsos.length / PAGE_SIZE);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * PAGE_SIZE;
  const rows  = qsos.slice(start, start + PAGE_SIZE);

  tbody.innerHTML = rows.map(q => {
    const colour = CFG.bandColours[q.band] || '#adb5bd';
    const dateStr = q.date ? q.date.slice(0,4)+'-'+q.date.slice(4,6)+'-'+q.date.slice(6,8) : '';
    const timeStr = q.time ? q.time.slice(0,2)+':'+q.time.slice(2,4) : '';
    const distStr = q.dist ? `${q.dist.toLocaleString()} km` : '';
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
      <td class="qso-dist">${distStr}</td>
    </tr>`;
  }).join('');

  // Pagination bar
  if (pgEl) {
    const from = start + 1;
    const to   = Math.min(start + PAGE_SIZE, qsos.length);
    pgEl.innerHTML = `
      <button class="pg-btn" id="pgPrev" ${currentPage <= 1 ? 'disabled' : ''}>&#8592; Prev</button>
      <span class="pg-info">QSOs ${from}–${to} of ${qsos.length} &nbsp;|&nbsp; Page ${currentPage} / ${totalPages}</span>
      <button class="pg-btn" id="pgNext" ${currentPage >= totalPages ? 'disabled' : ''}>Next &#8594;</button>
    `;
    // Store sorted list reference for next/prev without re-sorting
    pgEl._qsos = qsos;
    document.getElementById('pgPrev').addEventListener('click', () => {
      currentPage--;
      renderTable(pgEl._qsos);
    });
    document.getElementById('pgNext').addEventListener('click', () => {
      currentPage++;
      renderTable(pgEl._qsos);
    });
  }
}

/* ── MAP ── */
function initMap() {
  // Use actual container pixel dimensions
  const container = document.getElementById('mapSection');
  const W = container.offsetWidth || 1200;
  const H = 740;

  svgEl = d3.select('#worldMap');
  svgEl
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'none')
    .style('width', W + 'px')
    .style('height', H + 'px');

  // Scale to fit world in width, shift down so Belgium sits at ~35% from top
  const scale = W / 6.3;
  projection = d3.geoNaturalEarth1()
    .scale(scale)
    .translate([W / 2, H * 0.56]);

  path = d3.geoPath().projection(projection);

  svgG = svgEl.append('g');

  // Draw countries
  const countries = topojson.feature(worldGeo, worldGeo.objects.countries);
  svgG.selectAll('.map-country')
    .data(countries.features)
    .enter().append('path')
    .attr('class', 'map-country')
    .attr('d', path)
    .on('mouseover', function(event, d) {
      d3.select(this).attr('fill', '#1a3a5c');
      const id = d.id ? parseInt(d.id) : null;
      const name = ISO_NAMES[id] || (d.properties && d.properties.name) || '';
      if (name) showCountryTip(event, name, id);
    })
    .on('mousemove', moveTooltip)
    .on('mouseout', function() {
      d3.select(this).attr('fill', null);
      hideTooltip();
    });

  // Graticule
  const graticule = d3.geoGraticule()();
  svgG.append('path')
    .datum(graticule)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(0,255,136,0.09)')
    .attr('stroke-width', 0.5)
    .attr('d', path);

  setupMapZoom(W, H); // === MAP ZOOM (added 2026-06-09): delete this line to revert ===
}

/* === MAP ZOOM (added 2026-06-09): delete this whole block to revert =========
   Additive zoom layer. Does NOT touch the projection / positioning above.
   - scaleExtent min = 1: cannot zoom out beyond the default (perfect) view.
   - translateExtent locks the map to its bounds, so at scale 1 it stays put.
   - Mouse-wheel zoom is disabled so the page keeps scrolling normally;
     drag-to-pan only does something once you have zoomed in with the + button.
============================================================================ */
let mapZoom = null;
function setupMapZoom(W, H) {
  if (!svgEl || !svgG || typeof d3.zoom !== 'function') return;

  mapZoom = d3.zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [W, H]])
    .filter(event => event.type !== 'wheel' && !event.ctrlKey && !event.button)
    .on('zoom', event => { svgG.attr('transform', event.transform); });

  svgEl.call(mapZoom);
  svgEl.on('dblclick.zoom', null); // no double-click zoom, buttons only

  const zoomBy = factor =>
    svgEl.transition().duration(250).call(mapZoom.scaleBy, factor);

  const btnIn    = document.getElementById('mapZoomIn');
  const btnOut   = document.getElementById('mapZoomOut');
  const btnReset = document.getElementById('mapZoomReset');

  if (btnIn)    btnIn.addEventListener('click',  () => zoomBy(1.6));
  if (btnOut)   btnOut.addEventListener('click', () => zoomBy(1 / 1.6));
  if (btnReset) btnReset.addEventListener('click',
    () => svgEl.transition().duration(300).call(mapZoom.transform, d3.zoomIdentity));

  /* --- INITIAL VIEW (added 2026-06-16): start ~2x zoomed, home QTH centred ---
     Delete just these two lines to go back to the full-world start view.
     The Reset button still returns to the whole-world view; +/- still work. */
  setHomeStartView(W, H);
}

/* === INITIAL HOME VIEW (added 2026-06-16): delete this whole block to revert =
   On load, snap the map to a ~2x zoom centred on the home QTH so the start
   screen matches the "already zoomed in twice" look. d3 clamps the transform
   to the existing translateExtent automatically, so it can never escape the
   map bounds. Does not touch the projection, the buttons, or anything else. */
function setHomeStartView(W, H) {
  if (!mapZoom || !svgEl || !projection) return;
  const [homeLat, homeLng] = CFG.homeLatLng;
  const home = projection([homeLng, homeLat]);
  if (!home) return;
  const k = 3.2; // initial zoom factor (one extra + step from 2x)
  const t = d3.zoomIdentity
    .translate(W / 2, H / 2)
    .scale(k)
    .translate(-home[0], -home[1]);
  svgEl.call(mapZoom.transform, t);
}
/* === END INITIAL HOME VIEW =============================================== */
/* === END MAP ZOOM ======================================================== */

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
      .attr('stroke-width', 1.6)
      .attr('fill', 'none')
      .attr('opacity', 0.6)
      .on('mouseover', function(event) { showTooltip(event, q); d3.select(this).attr('opacity', 1).attr('stroke-width', 2.2); })
      .on('mousemove', moveTooltip)
      .on('mouseout',  function()       { hideTooltip(); d3.select(this).attr('opacity', 0.45).attr('stroke-width', 1.2); });
  });

  // DX dots — clustered by on-screen proximity, per band (updated 2026-07-05).
  // Stations closer together than CFG.clusterThresholdPx collapse into one
  // dot with a count badge (shown only when count > 1). Clustering runs
  // separately per band so the dot colour always matches a single band,
  // same as the arcs — a location worked on several bands gets one small
  // dot per band instead of one mixed grey blob.
  const byBand = new Map();
  unique.forEach(q => {
    const [dxLat, dxLng] = getLatLng(q);
    if (!dxLat && !dxLng) return;
    const xy = projection([dxLng, dxLat]);
    if (!xy) return;
    if (!byBand.has(q.band)) byBand.set(q.band, []);
    byBand.get(q.band).push({ q, x: xy[0], y: xy[1] });
  });

  byBand.forEach((points, band) => {
    const clusters = clusterDotPoints(points, CFG.clusterThresholdPx);
    const colour = CFG.bandColours[band] || '#adb5bd';

    clusters.forEach(c => {
      const count = c.items.length;
      const r = count > 1 ? Math.min(6.5, 3.2 + Math.sqrt(count) * 0.9) : 3;

      const g = svgG.append('g').attr('class', 'dx-dot').attr('transform', `translate(${c.cx},${c.cy})`);
      g.append('circle')
        .attr('r', r)
        .attr('fill', colour)
        .attr('opacity', 0.8)
        .on('mouseover', function(event) { showClusterTip(event, c); d3.select(this).attr('r', r + 0.6); })
        .on('mousemove', moveTooltip)
        .on('mouseout',  function()       { hideTooltip(); d3.select(this).attr('r', r); });
      if (count > 1) {
        g.append('text')
          .attr('class', 'dx-dot-count')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.32em')
          .attr('font-size', Math.min(7, 5 + r * 0.18))
          .attr('font-family', 'var(--f-mono)')
          .attr('fill', '#0a0e14')
          .attr('pointer-events', 'none')
          .text(count);
      }
    });
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
function showCountryTip(event, name, id) {
  ensureTooltip();
  const prefix = id && ISO_PREFIX[parseInt(id)] ? ` <span style="color:var(--c-text-3);font-size:0.6rem">${ISO_PREFIX[parseInt(id)]}</span>` : '';
  tooltip.innerHTML = `<strong>${name}</strong>${prefix}`;
  tooltip.classList.add('visible');
  moveTooltip(event);
}

function showTooltip(event, q) {
  ensureTooltip();
  const dateStr = q.date ? q.date.slice(0,4)+'-'+q.date.slice(4,6)+'-'+q.date.slice(6,8) : '';
  const distStr = q.dist ? ` · ${q.dist.toLocaleString()} km` : '';
  tooltip.innerHTML = `<strong>${q.call}</strong>${q.dxcc ? q.dxcc + '<br>' : ''}${q.band.toUpperCase()} · ${q.mode}${distStr}${dateStr ? '<br>' + dateStr : ''}`;
  tooltip.classList.add('visible');
  moveTooltip(event);
}

/* MAP DOT CLUSTERING (added 2026-07-05) — delete both functions below and
   the CFG.clusterThresholdPx key to fully revert to one dot per station. */
function clusterDotPoints(points, thresholdPx) {
  const clusters = [];
  points.forEach(p => {
    let target = null;
    for (const c of clusters) {
      const dx = c.cx - p.x, dy = c.cy - p.y;
      if (Math.sqrt(dx * dx + dy * dy) <= thresholdPx) { target = c; break; }
    }
    if (target) {
      target.items.push(p.q);
      const n = target.items.length;
      target.cx = (target.cx * (n - 1) + p.x) / n;
      target.cy = (target.cy * (n - 1) + p.y) / n;
    } else {
      clusters.push({ cx: p.x, cy: p.y, items: [p.q] });
    }
  });
  return clusters;
}

function showClusterTip(event, cluster) {
  ensureTooltip();
  const items = cluster.items;
  if (items.length === 1) { showTooltip(event, items[0]); return; }
  const shown = items.slice(0, 6);
  const rows = shown.map(q => `${q.call} · ${q.band.toUpperCase()}`).join('<br>');
  const more = items.length > shown.length ? `<br><span style="color:var(--c-text-3)">+${items.length - shown.length} more</span>` : '';
  tooltip.innerHTML = `<strong>${items.length} stations</strong><br>${rows}${more}`;
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
