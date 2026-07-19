/* ============================================================
   ON3VZ — Worked Countries Map  (subpage of /logbook/)
   Added 2026-07-20.

   2026-07-20 (rev 2): colouring and outlining is now per DXCC ENTITY
   instead of per country. Each country outline from Natural Earth is
   exploded into its individual polygons, and every polygon is attributed
   to the DXCC entity that actually occupies it. Separate island entities
   (Canary Islands, Balearic Islands, Azores, Sardinia, Northern Ireland,
   French Guiana, ...) therefore get their own fill and outline instead of
   inheriting their parent country. Entities that share one landmass with
   their parent (England/Scotland/Wales on Great Britain, European and
   Asiatic Russia) cannot be split at this resolution and are shown as one
   shape listing every entity worked on it.

   TO REVERT: delete worked-countries.html, js/worked-countries.js,
   css/worked-countries.css and the "WORKED COUNTRIES LINK" <a> block in
   logbook.html. Nothing else is touched.
   ============================================================ */

'use strict';

/* ── CONFIG ── */
const WC = {
  adifDir: '/assets/data/',
  d3Url: 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js',
  topoUrl: 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js',
  worldUrl: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
  home: [51.178, 4.347],            // JO21EE, Hoboken (lat, lng)
  bandOrder: ['160m','80m','40m','30m','20m','17m','15m','12m','10m','6m','2m','70cm','other'],
  contNames: { EU:'Europe', NA:'North America', SA:'South America',
               AS:'Asia', AF:'Africa', OC:'Oceania', AN:'Antarctica', '':'Unknown' },
};

/* DXCC entities that are politically part of another country but are a
   separate landmass, so they can be given their own outline. A polygon whose
   centroid falls in the box below belongs to that entity and never inherits
   its parent country. Each box was checked against the Natural Earth 50m
   polygons; add a row here to split another entity out. */
const ENTITY_REGIONS = [
  { entity: 'Canary Islands',   country: 'Spain',                    w: -18.5, e: -13.0, s:  27.3, n:  29.6 },
  { entity: 'Balearic Islands', country: 'Spain',                    w:   1.0, e:   4.5, s:  38.5, n:  40.2 },
  { entity: 'Azores',           country: 'Portugal',                 w: -31.5, e: -24.5, s:  36.5, n:  40.0 },
  { entity: 'Madeira Islands',  country: 'Portugal',                 w: -17.5, e: -15.9, s:  32.3, n:  33.2 },
  { entity: 'Sardinia',         country: 'Italy',                    w:   8.0, e:  10.0, s:  38.7, n:  41.4 },
  { entity: 'African Italy',    country: 'Italy',                    w:  11.8, e:  12.8, s:  35.3, n:  37.0 },
  { entity: 'Northern Ireland', country: 'United Kingdom',           w:  -8.3, e:  -5.3, s:  54.0, n:  55.4 },
  { entity: 'French Guiana',    country: 'France',                   w: -55.0, e: -51.0, s:   1.8, n:   6.2 },
  { entity: 'Guadeloupe',       country: 'France',                   w: -61.9, e: -61.0, s:  15.8, n:  16.6 },
  { entity: 'Martinique',       country: 'France',                   w: -61.3, e: -60.7, s:  14.3, n:  15.0 },
  { entity: 'Reunion',          country: 'France',                   w:  55.1, e:  55.9, s: -21.5, n: -20.8 },
  { entity: 'Mayotte',          country: 'France',                   w:  44.9, e:  45.4, s: -13.1, n: -12.5 },
  { entity: 'Alaska',           country: 'United States of America', w:-180.0, e:-129.0, s:  51.0, n:  72.0 },
  { entity: 'Hawaii',           country: 'United States of America', w:-161.0, e:-154.0, s:  18.5, n:  22.5 },
  { entity: 'Svalbard',         country: 'Norway',                   w:  10.0, e:  36.0, s:  74.0, n:  81.5 },
  { entity: 'Jan Mayen',        country: 'Norway',                   w:  -9.5, e:  -7.5, s:  70.6, n:  71.4 },
  { entity: 'Kaliningrad',      country: 'Russia',                   w:  19.5, e:  23.0, s:  54.2, n:  55.4 },
];

/* Natural Earth country names differ from the DXCC entity names QRZ writes in
   the ADIF. Coordinates are the primary match; this is the fallback for QSOs
   that carry no usable position. */
const NAME_ALIAS = {
  'united states':'United States of America', 'usa':'United States of America',
  'czech republic':'Czechia', 'slovak republic':'Slovakia',
  'russia':'Russia', 'european russia':'Russia', 'asiatic russia':'Russia',
  'england':'United Kingdom', 'scotland':'United Kingdom', 'wales':'United Kingdom',
  'northern ireland':'United Kingdom',
  'fed. rep. of germany':'Germany',
  'canary islands':'Spain', 'balearic islands':'Spain', 'ceuta & melilla':'Spain',
  'sardinia':'Italy', 'sicily':'Italy', 'african italy':'Italy',
  'corsica':'France', 'french guiana':'France',
  'azores':'Portugal', 'madeira islands':'Portugal',
  'crete':'Greece', 'dodecanese':'Greece', 'mount athos':'Greece',
  'european turkey':'Turkey', 'asiatic turkey':'Turkey',
  'bosnia-herzegovina':'Bosnia and Herz.', 'bosnia and herzegovina':'Bosnia and Herz.',
  'macedonia':'North Macedonia',
  'dominican republic':'Dominican Rep.',
  'republic of korea':'South Korea', 'south korea':'South Korea',
  'ivory coast':'C\u00f4te d\u2019Ivoire',
  'democratic republic of the congo':'Dem. Rep. Congo',
  'republic of the congo':'Congo',
  'central african republic':'Central African Rep.',
  'equatorial guinea':'Eq. Guinea', 'south sudan':'S. Sudan',
  'western sahara':'W. Sahara',
  'solomon islands':'Solomon Is.', 'falkland islands':'Falkland Is.',
  'faroe islands':'Faeroe Is.',
  'trinidad & tobago':'Trinidad and Tobago',
  'alaska':'United States of America', 'hawaii':'United States of America',
};

/* ── STATE ── */
let allQsos = [];
let units = [];                     // one entry per polygon of the world map
let unitsByCountry = new Map();     // country name -> [unit]
let entityAgg = new Map();          // entity -> aggregate for the current filter
let unitEntities = new Map();       // unit key -> Map(entity -> qso count)
let unmapped = [];
let hiddenBands = new Set();
let hiddenModes = new Set();
let allBands = [], allModes = [];
let heat = true, showGrat = true, showHome = true;
let sortMode = 'qso';
let searchTerm = '';
let svgEl = null, svgG = null, projection = null, geoPath = null, zoomer = null;
let maxCount = 1;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  wireControls();
  loadLibs();
});

/* ── LIBRARIES ── */
function loadLibs() {
  const s1 = document.createElement('script');
  s1.src = WC.d3Url;
  s1.onload = () => {
    const s2 = document.createElement('script');
    s2.src = WC.topoUrl;
    s2.onload = () => {
      setLoading('Loading world map\u2026');
      fetch(WC.worldUrl)
        .then(r => r.json())
        .then(world => { buildUnits(world); loadAdif(); })
        .catch(err => fail('World map could not be loaded \u00b7 ' + err.message));
    };
    s2.onerror = () => fail('TopoJSON could not be loaded');
    document.head.appendChild(s2);
  };
  s1.onerror = () => fail('D3 could not be loaded');
  document.head.appendChild(s1);
}

/* ── EXPLODE COUNTRIES INTO POLYGONS ── */
function buildUnits(world) {
  const fc = topojson.feature(world, world.objects.countries);
  units = [];
  unitsByCountry = new Map();
  fc.features.forEach((f, fi) => {
    const g = f.geometry;
    if (!g) return;
    const country = (f.properties && f.properties.name) || 'Unknown';
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    polys.forEach((coords, pi) => {
      const feature = { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: coords } };
      const b = d3.geoBounds(feature);
      const cen = d3.geoCentroid(feature);
      const u = {
        key: `${f.id || fi}-${pi}`,
        country, feature,
        w: b[0][0], s: b[0][1], e: b[1][0], n: b[1][1],
        area: d3.geoArea(feature),
        forced: forcedEntity(country, cen),
      };
      units.push(u);
      if (!unitsByCountry.has(country)) unitsByCountry.set(country, []);
      unitsByCountry.get(country).push(u);
    });
  });
}

function forcedEntity(country, cen) {
  for (const r of ENTITY_REGIONS) {
    if (r.country !== country) continue;
    if (cen[0] >= r.w && cen[0] <= r.e && cen[1] >= r.s && cen[1] <= r.n) return r.entity;
  }
  return null;
}

/* ── LOAD ADIF (same manifest the logbook uses) ── */
function loadAdif() {
  setLoading('Loading logbook\u2026');
  const ts = '?t=' + Date.now();
  fetch(WC.adifDir + 'manifest.json' + ts)
    .then(r => (r.ok ? r.json() : null))
    .then(manifest => {
      const files = manifest ? manifest.files : ['logbook.adi'];
      return Promise.all(files.map(f =>
        fetch(WC.adifDir + f + ts).then(r => (r.ok ? r.text() : '')).catch(() => '')
      ));
    })
    .then(texts => {
      allQsos = backfillEntities(dedup(parseAdif(texts.join('\n'))));
      if (!allQsos.length) throw new Error('No QSOs found');
      allBands = uniqueSorted(allQsos.map(q => q.band), WC.bandOrder);
      allModes = uniqueSorted(allQsos.map(q => q.mode), []);
      buildChips();
      drawBaseMap();
      recompute();
      setLoading(false);
    })
    .catch(err => fail('No logbook data available \u00b7 ' + err.message));
}

/* ── ADIF PARSER ── */
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
    const lat = parseAdifCoord(f.LAT);
    const lng = parseAdifCoord(f.LON);
    const grid = gridToLatLng(f.GRIDSQUARE);
    const real = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
    out.push({
      call: f.CALL || f.STATION_CALLSIGN || '',
      date: f.QSO_DATE || '',
      time: f.TIME_ON || '',
      band: normBand(f.BAND || f.FREQ || ''),
      mode: normMode(f.MODE || ''),
      entity: f.COUNTRY || 'Unknown',
      cont: (f.CONT || '').toUpperCase(),
      lat: real ? lat : (grid ? grid[0] : null),
      lng: real ? lng : (grid ? grid[1] : null),
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
      const score = o => Object.values(o).filter(v => v !== null && v !== '').length;
      if (score(q) > score(ex)) map.set(key, q);
    }
  });
  return [...map.values()];
}

/* Parse ADIF coords like "N053 06.252" or "W001 22.500" */
function parseAdifCoord(s) {
  if (!s) return null;
  const m = String(s).trim().match(/^([NSEW])\s*(\d+)\s+(\d+(?:\.\d+)?)$/i);
  if (!m) { const v = parseFloat(s); return isNaN(v) ? null : v; }
  const deg = parseInt(m[2], 10) + parseFloat(m[3]) / 60;
  const h = m[1].toUpperCase();
  return (h === 'S' || h === 'W') ? -deg : deg;
}

/* Maidenhead locator -> [lat, lng] (centre of the square) */
function gridToLatLng(g) {
  if (!g || g.length < 4) return null;
  const s = g.trim().toUpperCase();
  if (!/^[A-R]{2}[0-9]{2}([A-X]{2})?/.test(s)) return null;
  let lng = (s.charCodeAt(0) - 65) * 20 - 180;
  let lat = (s.charCodeAt(1) - 65) * 10 - 90;
  lng += parseInt(s[2], 10) * 2;
  lat += parseInt(s[3], 10) * 1;
  if (s.length >= 6) {
    lng += (s.charCodeAt(4) - 65) * (2 / 24) + (1 / 24);
    lat += (s.charCodeAt(5) - 65) * (1 / 24) + (0.5 / 24);
  } else { lng += 1; lat += 0.5; }
  if (lat === 0 && lng === 0) return null;
  return [lat, lng];
}

function normBand(val) {
  if (!val) return 'other';
  const v = String(val).toLowerCase().trim();
  if (v.includes('cm') || v.endsWith('m')) return v;
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

function normMode(m) {
  const v = String(m || '').toUpperCase().trim();
  if (!v) return 'OTHER';
  if (v === 'USB' || v === 'LSB' || v === 'SSB') return 'SSB';
  return v;
}

function uniqueSorted(vals, order) {
  const set = [...new Set(vals.filter(Boolean))];
  if (order && order.length) {
    return set.sort((a, b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }
  return set.sort((a, b) => a.localeCompare(b));
}


/* ── ENTITY BACKFILL ──────────────────────────────────────────────────────
   Mirrors the logic in js/logbook.js and js/dxcc-matrix.js so this map, the
   logbook table and the DXCC matrix always agree on which entity a call
   belongs to. QRZ sometimes exports COUNTRY="NON-DXCC" or blank, or tags a
   call with an entity that contradicts its own gridsquare. Unknown prefixes
   are left exactly as QRZ sent them and are never invented. */
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
const CALL_OVERRIDES = {
  // Tagged "Balearic Islands" by QRZ, but gridsquare IN52pk = Galicia (mainland).
  EG60BRILAT: { entity: 'Spain', cont: 'EU' },
};
const PREFIX_OVERRIDES = {
  // Portugal mainland special-event prefixes (CT / CR / CQ / CS all = Portugal).
  CS: { entity: 'Portugal', cont: 'EU' },
  CR: { entity: 'Portugal', cont: 'EU' },
  CQ: { entity: 'Portugal', cont: 'EU' },
};
function isBlankEntity(v) {
  const s = (v || '').trim().toUpperCase();
  return !s || s === 'NON-DXCC' || s === 'NONE' || s === 'UNKNOWN';
}
function backfillEntities(qsos) {
  const learned = {};
  qsos.forEach(q => {
    if (!isBlankEntity(q.entity)) {
      const p = callPrefix(q.call);
      if (p && !learned[p]) learned[p] = { entity: q.entity, cont: q.cont };
    }
  });
  qsos.forEach(q => {
    const forced = CALL_OVERRIDES[(q.call || '').toUpperCase()];
    if (forced) {
      q.entity = forced.entity;
      if (forced.cont) q.cont = forced.cont;
      return;
    }
    if (!isBlankEntity(q.entity) && q.cont) return;
    const src = learned[callPrefix(q.call)] || PREFIX_OVERRIDES[callPrefix(q.call)];
    if (!src) return;
    if (isBlankEntity(q.entity) && src.entity) q.entity = src.entity;
    if (!q.cont && src.cont) q.cont = src.cont;
  });
  return qsos;
}

/* ── POINT -> POLYGON ── */
const pointCache = new Map();

function unitAt(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const key = lat.toFixed(3) + ',' + lng.toFixed(3);
  if (pointCache.has(key)) return pointCache.get(key);
  let hit = null;
  for (const u of units) {
    const inLng = (u.w > u.e) ? (lng >= u.w || lng <= u.e) : (lng >= u.w && lng <= u.e);
    if (!inLng || lat < u.s || lat > u.n) continue;
    if (d3.geoContains(u.feature, [lng, lat])) { hit = u; break; }
  }
  pointCache.set(key, hit);
  return hit;
}

function largestUnit(list) {
  return list && list.length ? list.reduce((a, b) => (b.area > a.area ? b : a)) : null;
}

/* ── AGGREGATION FOR THE CURRENT FILTER ── */
function recompute() {
  const qsos = allQsos.filter(q => !hiddenBands.has(q.band) && !hiddenModes.has(q.mode));
  entityAgg = new Map();
  unitEntities = new Map();
  const entityUnits = new Map();     // entity -> Set(unit)
  const pending = [];

  /* Pass 1: place every QSO that carries a usable position. */
  qsos.forEach(q => {
    const u = unitAt(q.lat, q.lng);
    if (u) { tally(q, u, entityUnits); }
    else { pending.push(q); }
  });

  /* Pass 2: a QSO with no position, or one landing just offshore, goes to a
     polygon its own entity already occupies. Failing that, to the largest
     polygon of the country its entity name maps to. */
  const orphan = new Map();
  pending.forEach(q => {
    let u = largestUnit([...(entityUnits.get(q.entity) || [])]);
    if (!u) {
      /* Prefer a polygon that ENTITY_REGIONS reserves for this very entity,
         so an offshore Balearic or Canary coordinate lands on its own island
         group instead of on the Spanish mainland. */
      u = largestUnit(units.filter(x => x.forced === q.entity));
    }
    if (!u) {
      const country = NAME_ALIAS[q.entity.toLowerCase()] || q.entity;
      const list = (unitsByCountry.get(country) || []).filter(x => !x.forced);
      u = largestUnit(list);
    }
    if (u) tally(q, u, entityUnits);
    else orphan.set(q.entity, (orphan.get(q.entity) || 0) + 1);
  });

  /* Inheritance: a polygon nobody was worked on inherits its country's main
     entity, unless it is reserved for a separate DXCC entity by
     ENTITY_REGIONS. That keeps Sicily part of Italy while leaving the Canary
     Islands dark until they are actually worked. */
  unitsByCountry.forEach((list, country) => {
    const direct = list.filter(u => unitEntities.has(u.key) && !u.forced);
    if (!direct.length) return;
    const votes = new Map();
    direct.forEach(u => unitEntities.get(u.key).forEach((c, e) => votes.set(e, (votes.get(e) || 0) + c)));
    const main = [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
    list.forEach(u => {
      if (unitEntities.has(u.key) || u.forced) return;
      unitEntities.set(u.key, new Map([[main, 0]]));   // lit, but adds no count
    });
  });

  unmapped = [];
  orphan.forEach((count, entity) => unmapped.push({ entity, count }));

  maxCount = 1;
  entityAgg.forEach(a => { if (a.count > maxCount) maxCount = a.count; });

  paintMap();
  renderStats(qsos);
  renderList();
  renderUnmapped();
  renderLegend();
}

function tally(q, u, entityUnits) {
  const ent = q.entity;
  let a = entityAgg.get(ent);
  if (!a) {
    a = { entity: ent, country: u.country, count: 0, bands: new Set(), modes: new Set(),
          first: q.date, last: q.date, cont: q.cont, units: new Set() };
    entityAgg.set(ent, a);
  }
  a.count++;
  if (q.band) a.bands.add(q.band);
  if (q.mode) a.modes.add(q.mode);
  if (q.date && q.date < a.first) a.first = q.date;
  if (q.date && q.date > a.last)  a.last  = q.date;
  if (!a.cont && q.cont) a.cont = q.cont;
  a.units.add(u);

  if (!unitEntities.has(u.key)) unitEntities.set(u.key, new Map());
  const m = unitEntities.get(u.key);
  m.set(ent, (m.get(ent) || 0) + 1);

  if (!entityUnits.has(ent)) entityUnits.set(ent, new Set());
  entityUnits.get(ent).add(u);
}

/* ── MAP ── */
function drawBaseMap() {
  svgEl = d3.select('#wcMap');
  const box = document.querySelector('.wc-map-inner').getBoundingClientRect();
  const W = box.width || 960;
  const H = box.height || 540;
  svgEl.attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
  svgEl.selectAll('*').remove();

  svgG = svgEl.append('g').attr('class', 'wc-map-g');

  projection = d3.geoNaturalEarth1().scale(W / 6.1).translate([W / 2, H * 0.53]);
  geoPath = d3.geoPath().projection(projection);

  svgG.append('path').attr('class', 'wc-sphere').attr('d', geoPath({ type: 'Sphere' }));
  svgG.append('path').attr('class', 'wc-graticule').attr('d', geoPath(d3.geoGraticule()()));

  svgG.append('g').attr('class', 'wc-countries')
    .selectAll('path')
    .data(units)
    .join('path')
      .attr('class', 'wc-country')
      .attr('data-key', d => d.key)
      .attr('d', d => geoPath(d.feature))
      .on('mousemove', function (event, d) { showTip(event, d); })
      .on('mouseleave', hideTip)
      .on('click', function (event, d) { zoomTo(d); });

  svgG.append('g').attr('class', 'wc-home-layer');

  zoomer = d3.zoom()
    .scaleExtent([1, 12])
    .translateExtent([[0, 0], [W, H]])
    .on('zoom', ev => { svgG.attr('transform', ev.transform); hideTip(); });
  svgEl.call(zoomer);

  document.getElementById('wcZoomIn').onclick =
    () => svgEl.transition().duration(220).call(zoomer.scaleBy, 1.6);
  document.getElementById('wcZoomOut').onclick =
    () => svgEl.transition().duration(220).call(zoomer.scaleBy, 1 / 1.6);
  document.getElementById('wcZoomReset').onclick =
    () => svgEl.transition().duration(320).call(zoomer.transform, d3.zoomIdentity);

  drawHome();
}

function drawHome() {
  if (!svgG) return;
  const layer = svgG.select('.wc-home-layer');
  layer.selectAll('*').remove();
  if (!showHome) return;
  const xy = projection([WC.home[1], WC.home[0]]);
  if (!xy) return;
  const g = layer.append('g').attr('transform', `translate(${xy[0]},${xy[1]})`);
  g.append('circle').attr('class', 'wc-home-ring').attr('r', 7);
  g.append('circle').attr('class', 'wc-home-dot').attr('r', 2.6);
  g.append('text').attr('class', 'wc-home-lbl').attr('x', 10).attr('y', 3.5).text('ON3VZ');
}

/* Soft fill for a worked entity. Muted green base so the map reads calmly,
   rising towards the Dark Signal neon for the most-worked entities. */
function workedFill(count) {
  if (!heat) return '#2fd98a';
  const t = Math.sqrt(Math.max(count, 1)) / Math.sqrt(maxCount);
  return d3.interpolateRgb('#1a4738', '#3ce89b')(0.22 + 0.78 * t);
}

/* Total QSOs represented by a polygon: the sum over every entity on it. */
function unitCount(key) {
  const m = unitEntities.get(key);
  if (!m) return 0;
  let n = 0;
  m.forEach((_, e) => { const a = entityAgg.get(e); if (a) n += a.count; });
  return n;
}

function unitEntityNames(key) {
  const m = unitEntities.get(key);
  return m ? [...m.keys()] : [];
}

function paintMap() {
  if (!svgG) return;
  svgG.select('.wc-graticule').style('display', showGrat ? null : 'none');
  const term = searchTerm.trim().toLowerCase();
  /* The fill must be an inline STYLE: a stylesheet rule always beats an SVG
     presentation attribute, so an attribute fill would stay invisible. */
  svgG.selectAll('.wc-country')
    .style('fill', d => (unitEntities.has(d.key) ? workedFill(unitCount(d.key)) : null))
    .classed('is-worked', d => unitEntities.has(d.key))
    .classed('is-found', d => {
      if (!term) return false;
      if (d.country.toLowerCase().includes(term)) return true;
      return unitEntityNames(d.key).some(e => e.toLowerCase().includes(term));
    });
  drawHome();
}

function zoomTo(d) {
  if (!svgEl || !zoomer) return;
  const [[x0, y0], [x1, y1]] = geoPath.bounds(d.feature);
  const box = svgEl.node().viewBox.baseVal;
  const k = Math.min(11, 0.7 / Math.max((x1 - x0) / box.width, (y1 - y0) / box.height));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  svgEl.transition().duration(600).call(
    zoomer.transform,
    d3.zoomIdentity.translate(box.width / 2, box.height / 2).scale(Math.max(1, k)).translate(-cx, -cy)
  );
}

/* ── TOOLTIP ── */
function showTip(event, d) {
  const tip = document.getElementById('wcTip');
  const ents = unitEntityNames(d.key)
    .map(e => entityAgg.get(e))
    .filter(Boolean)
    .sort((a, b) => b.count - a.count);

  let html;
  if (ents.length) {
    html = `<div class="wc-tip-name">${ents.map(a => esc(a.entity)).join(' \u00b7 ')}</div>`;
    if (!ents.some(a => a.entity.toLowerCase() === d.country.toLowerCase())) {
      html += `<div class="wc-tip-parent">${esc(d.country)}</div>`;
    }
    const bands = new Set(), modes = new Set();
    let total = 0, first = null;
    ents.forEach(a => {
      total += a.count;
      a.bands.forEach(b => bands.add(b));
      a.modes.forEach(m => modes.add(m));
      if (!first || (a.first && a.first < first)) first = a.first;
    });
    html += `<div class="wc-tip-row"><span>QSOs</span><b>${total}</b></div>`;
    html += `<div class="wc-tip-row"><span>Bands</span><b>${uniqueSorted([...bands], WC.bandOrder).join(' \u00b7 ') || '\u2014'}</b></div>`;
    html += `<div class="wc-tip-row"><span>Modes</span><b>${[...modes].sort().join(' \u00b7 ') || '\u2014'}</b></div>`;
    html += `<div class="wc-tip-row"><span>First</span><b>${fmtDate(first)}</b></div>`;
    if (ents.length > 1) {
      html += `<div class="wc-tip-ents">${ents.map(a => `${esc(a.entity)} <i>${a.count}</i>`).join('<br>')}</div>`;
    }
  } else {
    html = `<div class="wc-tip-name">${esc(d.country)}</div><div class="wc-tip-none">Not worked yet</div>`;
  }
  tip.innerHTML = html;
  tip.classList.add('is-on');
  const wrap = document.querySelector('.wc-map-inner').getBoundingClientRect();
  let x = event.clientX - wrap.left + 16;
  let y = event.clientY - wrap.top + 14;
  if (x + tip.offsetWidth > wrap.width - 8) x = event.clientX - wrap.left - tip.offsetWidth - 16;
  if (y + tip.offsetHeight > wrap.height - 8) y = event.clientY - wrap.top - tip.offsetHeight - 14;
  tip.style.left = Math.max(4, x) + 'px';
  tip.style.top = Math.max(4, y) + 'px';
}

function hideTip() {
  const t = document.getElementById('wcTip');
  if (t) t.classList.remove('is-on');
}

/* ── STATS / LIST / LEGEND ── */
function renderStats(qsos) {
  const conts = new Set(qsos.map(q => q.cont).filter(Boolean));
  const countries = new Set();
  units.forEach(u => { if (unitEntities.has(u.key)) countries.add(u.country); });
  set('wcStatEntities', entityAgg.size);
  set('wcStatCountries', countries.size);
  set('wcStatQsos', qsos.length);
  set('wcStatCont', conts.size);
  set('wcStatBands', new Set(qsos.map(q => q.band).filter(Boolean)).size);
}

function renderList() {
  const grid = document.getElementById('wcCountryGrid');
  const term = searchTerm.trim().toLowerCase();
  const rows = [...entityAgg.values()].sort(sortMode === 'alpha'
    ? (a, b) => a.entity.localeCompare(b.entity)
    : (a, b) => b.count - a.count || a.entity.localeCompare(b.entity));
  if (!rows.length) {
    grid.innerHTML = '<div class="wc-empty">No entities match the current filter.</div>';
    return;
  }
  grid.innerHTML = rows.map(a => {
    const hit = term && a.entity.toLowerCase().includes(term);
    const sub = a.country && a.country.toLowerCase() !== a.entity.toLowerCase()
      ? `${WC.contNames[a.cont] || ''} \u00b7 ${esc(a.country)}`
      : (WC.contNames[a.cont] || '');
    return `<button type="button" class="wc-country-card${hit ? ' is-found' : ''}" data-entity="${esc(a.entity)}">
      <span class="wc-cc-name">${esc(a.entity)}</span>
      <span class="wc-cc-meta">${sub}</span>
      <span class="wc-cc-count">${a.count}</span>
    </button>`;
  }).join('');
  grid.querySelectorAll('.wc-country-card').forEach(btn => {
    btn.onclick = () => {
      const a = entityAgg.get(btn.dataset.entity);
      const u = a ? largestUnit([...a.units]) : null;
      if (!u) return;
      document.querySelector('.wc-map-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => zoomTo(u), 300);
    };
  });
}

function renderUnmapped() {
  const box = document.getElementById('wcUnmapped');
  const list = document.getElementById('wcUnmappedList');
  if (!unmapped.length) { box.hidden = true; return; }
  box.hidden = false;
  list.innerHTML = unmapped
    .sort((a, b) => b.count - a.count)
    .map(u => `<span class="wc-unmapped-chip">${esc(u.entity)} <i>${u.count}</i></span>`)
    .join('');
}

function renderLegend() {
  const scale = document.getElementById('wcLegendScale');
  scale.innerHTML = '';
  if (!heat) {
    scale.innerHTML = `<span class="wc-legend-flat" style="background:${workedFill(maxCount)}"></span>`;
    document.getElementById('wcLegendMin').textContent = 'Worked';
    document.getElementById('wcLegendMax').textContent = '';
    return;
  }
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const sp = document.createElement('span');
    sp.style.background = workedFill(1 + t * (maxCount - 1));
    scale.appendChild(sp);
  }
  document.getElementById('wcLegendMin').textContent = '1';
  document.getElementById('wcLegendMax').textContent = String(maxCount);
}

/* ── CONTROLS ── */
function buildChips() {
  const bandBox = document.getElementById('wcBandChips');
  bandBox.innerHTML = allBands.map(b =>
    `<button type="button" class="wc-chip is-on" data-band="${esc(b)}">${esc(b)}</button>`).join('');
  bandBox.querySelectorAll('.wc-chip').forEach(btn => {
    btn.onclick = () => {
      const b = btn.dataset.band;
      if (hiddenBands.has(b)) { hiddenBands.delete(b); btn.classList.add('is-on'); }
      else { hiddenBands.add(b); btn.classList.remove('is-on'); }
      recompute();
    };
  });

  const modeBox = document.getElementById('wcModeChips');
  modeBox.innerHTML = allModes.map(m =>
    `<button type="button" class="wc-chip is-on" data-mode="${esc(m)}">${esc(m)}</button>`).join('');
  modeBox.querySelectorAll('.wc-chip').forEach(btn => {
    btn.onclick = () => {
      const m = btn.dataset.mode;
      if (hiddenModes.has(m)) { hiddenModes.delete(m); btn.classList.add('is-on'); }
      else { hiddenModes.add(m); btn.classList.remove('is-on'); }
      recompute();
    };
  });
}

function wireControls() {
  document.getElementById('wcHeat').onchange = e => { heat = e.target.checked; paintMap(); renderLegend(); };
  document.getElementById('wcGrat').onchange = e => { showGrat = e.target.checked; paintMap(); };
  document.getElementById('wcHome').onchange = e => { showHome = e.target.checked; drawHome(); };
  document.getElementById('wcSort').onchange = e => { sortMode = e.target.value; renderList(); };
  document.getElementById('wcSearch').oninput = e => {
    searchTerm = e.target.value || '';
    paintMap(); renderList();
  };
}

/* ── UTIL ── */
function set(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function esc(s) { return String(s).replace(/[&<>"']/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function fmtDate(d) {
  if (!d || d.length < 8) return '\u2014';
  return `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
}
function setLoading(text) {
  const el = document.getElementById('wcLoading');
  if (!el) return;
  if (text === false) { el.classList.add('is-done'); return; }
  el.classList.remove('is-done');
  set('wcLoadingText', text);
}
function fail(msg) {
  setLoading(false);
  const grid = document.getElementById('wcCountryGrid');
  if (grid) grid.innerHTML = `<div class="wc-empty">${esc(msg)}</div>`;
}
