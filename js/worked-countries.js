/* ============================================================
   ON3VZ — Worked Countries Map  (subpage of /logbook/)
   Added 2026-07-20. Self-contained: reads the SAME ADIF files as
   the logbook via assets/data/manifest.json. No dependency on
   logbook.js.

   TO REVERT: delete worked-countries.html, js/worked-countries.js,
   css/worked-countries.css and the "WORKED COUNTRIES LINK" <a>
   block in logbook.html. Nothing else is touched.
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

/* Natural Earth (world-atlas) names differ from the DXCC entity names QRZ puts
   in the ADIF. Coordinates are the primary match; this table is the fallback
   for entities whose QSOs carry no usable position. */
const NAME_ALIAS = {
  'united states':'United States of America', 'usa':'United States of America',
  'alaska':'United States of America', 'hawaii':'United States of America',
  'czech republic':'Czechia', 'slovak republic':'Slovakia',
  'russia':'Russia', 'european russia':'Russia', 'asiatic russia':'Russia',
  'kaliningrad':'Russia',
  'england':'United Kingdom', 'scotland':'United Kingdom',
  'wales':'United Kingdom', 'northern ireland':'United Kingdom',
  'fed. rep. of germany':'Germany',
  'canary islands':'Spain', 'balearic islands':'Spain', 'ceuta & melilla':'Spain',
  'sardinia':'Italy', 'sicily':'Italy', 'african italy':'Italy',
  'corsica':'France',
  'azores':'Portugal', 'madeira islands':'Portugal',
  'crete':'Greece', 'dodecanese':'Greece', 'mount athos':'Greece',
  'european turkey':'Turkey', 'asiatic turkey':'Turkey',
  'bosnia-herzegovina':'Bosnia and Herz.', 'bosnia and herzegovina':'Bosnia and Herz.',
  'macedonia':'North Macedonia',
  'dominican republic':'Dominican Rep.',
  'republic of korea':'South Korea', 'south korea':'South Korea',
  'democratic people\u2019s rep. of korea':'North Korea',
  'ivory coast':'C\u00f4te d\u2019Ivoire',
  'democratic republic of the congo':'Dem. Rep. Congo',
  'republic of the congo':'Congo',
  'central african republic':'Central African Rep.',
  'equatorial guinea':'Eq. Guinea', 'south sudan':'S. Sudan',
  'western sahara':'W. Sahara',
  'solomon islands':'Solomon Is.', 'falkland islands':'Falkland Is.',
  'faroe islands':'Faeroe Is.',
  'trinidad & tobago':'Trinidad and Tobago',
  'united arab emirates':'United Arab Emirates',
};

/* ── STATE ── */
let allQsos = [];
let features = [];                  // GeoJSON country features + cached bounds
let byFeature = new Map();          // feature key -> aggregate for current filter
let unmapped = [];                  // entities with no polygon
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
        .then(world => {
          const fc = topojson.feature(world, world.objects.countries);
          features = fc.features.map((f, i) => {
            const b = d3.geoBounds(f);
            return { key: String(f.id || i), name: (f.properties && f.properties.name) || 'Unknown',
                     feature: f, w: b[0][0], s: b[0][1], e: b[1][0], n: b[1][1] };
          });
          loadAdif();
        })
        .catch(err => fail('World map could not be loaded \u00b7 ' + err.message));
    };
    s2.onerror = () => fail('TopoJSON could not be loaded');
    document.head.appendChild(s2);
  };
  s1.onerror = () => fail('D3 could not be loaded');
  document.head.appendChild(s1);
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
      allQsos = dedup(parseAdif(texts.join('\n')));
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
      entity: f.COUNTRY || '',
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

/* ── POINT -> COUNTRY ── */
const pointCache = new Map();

function featureAt(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const key = lat.toFixed(3) + ',' + lng.toFixed(3);
  if (pointCache.has(key)) return pointCache.get(key);
  let hit = null;
  for (const f of features) {
    const inLng = (f.w > f.e) ? (lng >= f.w || lng <= f.e) : (lng >= f.w && lng <= f.e);
    if (!inLng || lat < f.s || lat > f.n) continue;
    if (d3.geoContains(f.feature, [lng, lat])) { hit = f; break; }
  }
  pointCache.set(key, hit);
  return hit;
}

/* ── AGGREGATION FOR CURRENT FILTER ── */
function recompute() {
  const qsos = allQsos.filter(q => !hiddenBands.has(q.band) && !hiddenModes.has(q.mode));
  byFeature = new Map();
  const entityHits = new Map();   // entity -> feature key (learned from coords)
  const entitySeen = new Map();   // entity -> { count, cont }

  /* Pass 1: place every QSO that carries a usable position. */
  const pending = [];
  qsos.forEach(q => {
    const ent = q.entity || 'Unknown';
    const rec = entitySeen.get(ent) || { count: 0, cont: q.cont };
    rec.count++; entitySeen.set(ent, rec);

    const f = featureAt(q.lat, q.lng);
    if (f) { entityHits.set(ent, f); addHit(f, q, ent); }
    else { pending.push(q); }
  });

  /* Pass 2: a QSO with no position (or one that lands just offshore) inherits
     the country its own entity was already resolved to. If the entity never
     resolved by coordinate, fall back to a name match against the Natural
     Earth country names. Anything still unresolved is listed as unmapped so
     no worked entity ever disappears silently. */
  const noEntity = new Set();
  pending.forEach(q => {
    const ent = q.entity || 'Unknown';
    let f = entityHits.get(ent);
    if (!f) {
      f = matchByName(ent);
      if (f) entityHits.set(ent, f);
    }
    if (f) addHit(f, q, ent);
    else noEntity.add(ent);
  });

  unmapped = [];
  noEntity.forEach(ent => {
    const rec = entitySeen.get(ent);
    if (rec) unmapped.push({ entity: ent, count: rec.count, cont: rec.cont });
  });

  maxCount = 1;
  byFeature.forEach(v => { if (v.count > maxCount) maxCount = v.count; });

  paintMap();
  renderStats(qsos, entitySeen);
  renderList();
  renderUnmapped();
  renderLegend();
}

function addHit(f, q, ent) {
  let a = byFeature.get(f.key);
  if (!a) {
    a = { key: f.key, name: f.name, count: 0, entities: new Map(),
          bands: new Set(), modes: new Set(), first: q.date, last: q.date, cont: q.cont };
    byFeature.set(f.key, a);
  }
  a.count++;
  a.entities.set(ent, (a.entities.get(ent) || 0) + 1);
  if (q.band) a.bands.add(q.band);
  if (q.mode) a.modes.add(q.mode);
  if (q.date && q.date < a.first) a.first = q.date;
  if (q.date && q.date > a.last)  a.last  = q.date;
  if (!a.cont && q.cont) a.cont = q.cont;
}

function matchByName(entity) {
  const raw = String(entity).toLowerCase().trim();
  const target = (NAME_ALIAS[raw] || entity).toLowerCase();
  return features.find(f => f.name.toLowerCase() === target) || null;
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

  projection = d3.geoNaturalEarth1()
    .scale(W / 6.1)
    .translate([W / 2, H * 0.53]);
  geoPath = d3.geoPath().projection(projection);

  svgG.append('path')
    .attr('class', 'wc-sphere')
    .attr('d', geoPath({ type: 'Sphere' }));

  svgG.append('path')
    .attr('class', 'wc-graticule')
    .attr('d', geoPath(d3.geoGraticule()()));

  svgG.append('g').attr('class', 'wc-countries')
    .selectAll('path')
    .data(features)
    .join('path')
      .attr('class', 'wc-country')
      .attr('data-key', d => d.key)
      .attr('d', d => geoPath(d.feature))
      .on('mousemove', function (event, d) { showTip(event, d); })
      .on('mouseleave', hideTip)
      .on('click', function (event, d) { zoomTo(d); });

  svgG.append('g').attr('class', 'wc-home-layer');

  zoomer = d3.zoom()
    .scaleExtent([1, 10])
    .translateExtent([[0, 0], [W, H]])
    .on('zoom', ev => {
      svgG.attr('transform', ev.transform);
      hideTip();
    });
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

function paintMap() {
  if (!svgG) return;
  svgG.select('.wc-graticule').style('display', showGrat ? null : 'none');
  const term = searchTerm.trim().toLowerCase();
  svgG.selectAll('.wc-country')
    .attr('fill', d => {
      const a = byFeature.get(d.key);
      if (!a) return null;                       // CSS handles "not worked"
      if (!heat) return '#00ff88';
      const t = Math.sqrt(a.count) / Math.sqrt(maxCount);
      return d3.interpolateRgb('#0d5c3a', '#00ff88')(0.18 + 0.82 * t);
    })
    .classed('is-worked', d => byFeature.has(d.key))
    .classed('is-found', d => !!term && d.name.toLowerCase().includes(term));
  drawHome();
}

function zoomTo(d) {
  if (!svgEl || !zoomer) return;
  const [[x0, y0], [x1, y1]] = geoPath.bounds(d.feature);
  const box = svgEl.node().viewBox.baseVal;
  const k = Math.min(9, 0.7 / Math.max((x1 - x0) / box.width, (y1 - y0) / box.height));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  svgEl.transition().duration(600).call(
    zoomer.transform,
    d3.zoomIdentity.translate(box.width / 2, box.height / 2).scale(Math.max(1, k)).translate(-cx, -cy)
  );
}

/* ── TOOLTIP ── */
function showTip(event, d) {
  const tip = document.getElementById('wcTip');
  const a = byFeature.get(d.key);
  let html = `<div class="wc-tip-name">${esc(d.name)}</div>`;
  if (a) {
    const ents = [...a.entities.entries()].sort((x, y) => y[1] - x[1]);
    html += `<div class="wc-tip-row"><span>QSOs</span><b>${a.count}</b></div>`;
    html += `<div class="wc-tip-row"><span>Bands</span><b>${uniqueSorted([...a.bands], WC.bandOrder).join(' \u00b7 ') || '\u2014'}</b></div>`;
    html += `<div class="wc-tip-row"><span>Modes</span><b>${[...a.modes].sort().join(' \u00b7 ') || '\u2014'}</b></div>`;
    html += `<div class="wc-tip-row"><span>First</span><b>${fmtDate(a.first)}</b></div>`;
    if (ents.length > 1 || (ents.length === 1 && ents[0][0].toLowerCase() !== d.name.toLowerCase())) {
      html += `<div class="wc-tip-ents">${ents.map(e => `${esc(e[0])} <i>${e[1]}</i>`).join('<br>')}</div>`;
    }
  } else {
    html += `<div class="wc-tip-none">Not worked yet</div>`;
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
  document.getElementById('wcTip').classList.remove('is-on');
}

/* ── STATS / LIST / LEGEND ── */
function renderStats(qsos, entitySeen) {
  const conts = new Set(qsos.map(q => q.cont).filter(Boolean));
  set('wcStatCountries', byFeature.size);
  set('wcStatEntities', entitySeen.size);
  set('wcStatQsos', qsos.length);
  set('wcStatCont', conts.size);
  const pct = features.length ? (byFeature.size / features.length) * 100 : 0;
  set('wcStatPct', pct.toFixed(0) + '%');
}

function renderList() {
  const grid = document.getElementById('wcCountryGrid');
  const term = searchTerm.trim().toLowerCase();
  let rows = [...byFeature.values()];
  rows.sort(sortMode === 'alpha'
    ? (a, b) => a.name.localeCompare(b.name)
    : (a, b) => b.count - a.count || a.name.localeCompare(b.name));
  if (!rows.length) {
    grid.innerHTML = '<div class="wc-empty">No countries match the current filter.</div>';
    return;
  }
  grid.innerHTML = rows.map(a => {
    const hit = term && a.name.toLowerCase().includes(term);
    return `<button type="button" class="wc-country-card${hit ? ' is-found' : ''}" data-key="${esc(a.key)}">
      <span class="wc-cc-name">${esc(a.name)}</span>
      <span class="wc-cc-meta">${WC.contNames[a.cont] || ''}</span>
      <span class="wc-cc-count">${a.count}</span>
    </button>`;
  }).join('');
  grid.querySelectorAll('.wc-country-card').forEach(btn => {
    btn.onclick = () => {
      const f = features.find(x => x.key === btn.dataset.key);
      if (!f) return;
      document.querySelector('.wc-map-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => zoomTo(f), 300);
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
    scale.innerHTML = '<span class="wc-legend-flat"></span>';
    document.getElementById('wcLegendMin').textContent = 'Worked';
    document.getElementById('wcLegendMax').textContent = '';
    return;
  }
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const sp = document.createElement('span');
    sp.style.background = d3.interpolateRgb('#0d5c3a', '#00ff88')(0.18 + 0.82 * t);
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
