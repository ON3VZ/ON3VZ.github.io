/* ============================================================
   ON3VZ eQSL download (contact page, added 2026-10-06)
   ------------------------------------------------------------
   1. Visitor enters a callsign.
   2. All QSOs with that call are listed from the same ADIF files
      as the logbook (assets/data/manifest.json). No UTC time is
      shown in the list (site rule: no public time column).
   3. To download, the visitor enters the UTC time of the QSO.
      A match within +/- 15 minutes unlocks the JPG eQSL.
   Card drawing: js/eqsl-card.js
   Revert: restore the QSL generator section in contact.html and
   the /js/contact.js reference in its front matter.
   ============================================================ */
(function () {
  'use strict';

  var DATA_DIR = '/assets/data/';
  var BG_SRC = '/assets/images/eqsl-bg.jpg';
  var TOLERANCE_MIN = 15;

  var qsos = null, bgImg = null, fontsReady = null;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  /* ── fonts + background ── */
  function ready() {
    if (!fontsReady) {
      var faces = ['400 40px "Abril Fatface"', '700 40px "Courier Prime"', '400 40px "Courier Prime"', 'italic 700 20px "Courier Prime"', '400 20px "Special Elite"'];
      var fonts = document.fonts ? Promise.all(faces.map(function (f) { return document.fonts.load(f); })) : Promise.resolve();
      var img = new Promise(function (res, rej) {
        bgImg = new Image();
        bgImg.onload = function () { res(); };
        bgImg.onerror = rej;
        bgImg.src = BG_SRC;
      });
      fontsReady = Promise.all([fonts, img]);
    }
    return fontsReady;
  }

  /* ── ADIF loading (same files as the logbook) ── */
  function loadQsos() {
    if (qsos) return Promise.resolve(qsos);
    var ts = '?t=' + Date.now();
    return fetch(DATA_DIR + 'manifest.json' + ts)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (m) {
        var files = m && m.files ? m.files : ['archive.adi'];
        return Promise.all(files.map(function (f) {
          return fetch(DATA_DIR + f + ts).then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; });
        }));
      })
      .then(function (texts) {
        var map = new Map();
        parseAdif(texts.join('\n')).forEach(function (q) {
          var key = [q.call, q.date, q.time.slice(0, 4), q.band, q.mode].join('|');
          if (!map.has(key)) map.set(key, q);
        });
        qsos = Array.from(map.values()).sort(function (a, b) { return (b.date + b.time).localeCompare(a.date + a.time); });
        return qsos;
      });
  }

  function parseAdif(raw) {
    var out = [];
    var i = raw.toUpperCase().indexOf('<EOH>');
    var body = i >= 0 ? raw.slice(i + 5) : raw;
    body.split(/<EOR>/i).forEach(function (rec) {
      var f = {}, re = /<(\w+):(\d+)(?::\w+)?>/gi, m;
      while ((m = re.exec(rec)) !== null) {
        f[m[1].toUpperCase()] = rec.slice(m.index + m[0].length, m.index + m[0].length + parseInt(m[2], 10)).trim();
      }
      if (!f.CALL) return;
      var mode = (f.MODE || '').toUpperCase();
      if (mode === 'USB' || mode === 'LSB') mode = 'SSB';
      if (mode === 'MFSK' && f.SUBMODE) mode = f.SUBMODE.toUpperCase();
      out.push({
        call: f.CALL.toUpperCase(),
        date: f.QSO_DATE || '',
        time: (f.TIME_ON || '').padEnd(4, '0'),
        band: (f.BAND || '').toLowerCase(),
        mode: mode,
        freq: f.FREQ || '',
        rst: f.RST_SENT || ''
      });
    });
    return out;
  }

  /* ── callsign matching: ON4XYZ also finds ON4XYZ/P, OT4XYZ/M etc. by core call ── */
  function core(call) {
    var parts = call.toUpperCase().split('/');
    var withDigit = parts.filter(function (p) { return /\d/.test(p) && /[A-Z]/.test(p); })
      .sort(function (x, y) { return y.length - x.length; });
    return withDigit[0] || parts[0];
  }

  function isoDate(d) { return d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8); }
  function niceDate(d) { return d.slice(6, 8) + '/' + d.slice(4, 6) + '/' + d.slice(0, 4); }
  function minutes(hhmm) { return parseInt(hhmm.slice(0, 2), 10) * 60 + parseInt(hhmm.slice(2, 4), 10); }
  function parseUserTime(s) {
    var m = String(s).trim().match(/^(\d{1,2})\s*[:.h]?\s*(\d{2})$/);
    if (!m) return null;
    var h = parseInt(m[1], 10), mi = parseInt(m[2], 10);
    if (h > 23 || mi > 59) return null;
    return h * 60 + mi;
  }

  /* ── search ── */
  function search(e) {
    if (e) e.preventDefault();
    var input = $('eqCall').value.trim().toUpperCase().replace(/\s+/g, '');
    var out = $('eqResults');
    if (!/^[A-Z0-9/]{3,15}$/.test(input)) {
      out.innerHTML = '<p class="eq-msg">Please enter a valid callsign, for example ON4XYZ.</p>';
      return;
    }
    out.innerHTML = '<p class="eq-msg">Searching the log…</p>';
    loadQsos().then(function (all) {
      var c = core(input);
      var hits = all.filter(function (q) { return q.call === input || core(q.call) === c; });
      render(input, hits);
    }).catch(function () {
      out.innerHTML = '<p class="eq-msg">The log could not be loaded. Please try again later.</p>';
    });
  }

  function render(call, hits) {
    var out = $('eqResults');
    if (!hits.length) {
      out.innerHTML = '<div class="eq-empty"><strong>No QSO with ' + esc(call) + ' in the log yet.</strong>' +
        '<span>Logs are usually uploaded within a few days. Please check back later, or contact me if you think a QSO is missing.</span></div>';
      return;
    }
    var html = '<div class="eq-head"><span class="eq-count">' + hits.length + (hits.length === 1 ? ' QSO' : ' QSOs') + ' with ' + esc(call) + '</span>' +
      '<span class="eq-hint">To download an eQSL, enter the UTC time of the QSO from your own log.</span></div>';
    hits.forEach(function (q, i) {
      html += '<div class="eq-row" data-i="' + i + '">' +
        '<div class="eq-cell"><span class="eq-k">Date</span><span class="eq-v">' + niceDate(q.date) + '</span></div>' +
        '<div class="eq-cell"><span class="eq-k">Band</span><span class="eq-v">' + esc(q.band.toUpperCase()) + '</span></div>' +
        '<div class="eq-cell"><span class="eq-k">Mode</span><span class="eq-v">' + esc(q.mode) + '</span></div>' +
        '<div class="eq-cell eq-cell--call"><span class="eq-k">Station</span><span class="eq-v">' + esc(q.call) + '</span></div>' +
        '<div class="eq-cell eq-cell--act"><button type="button" class="eq-btn" data-act="open">eQSL</button></div>' +
        '<form class="eq-unlock" hidden>' +
          '<label>UTC time of our QSO <input type="text" inputmode="numeric" placeholder="HH:MM" maxlength="5" autocomplete="off"></label>' +
          '<button type="submit" class="eq-btn eq-btn--go">Download JPG</button>' +
          '<span class="eq-note" aria-live="polite"></span>' +
        '</form>' +
      '</div>';
    });
    out.innerHTML = html;
    out.querySelectorAll('.eq-row').forEach(function (row) {
      var q = hits[+row.dataset.i];
      var form = row.querySelector('.eq-unlock');
      row.querySelector('[data-act="open"]').addEventListener('click', function () {
        form.hidden = !form.hidden;
        if (!form.hidden) form.querySelector('input').focus();
      });
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var note = form.querySelector('.eq-note');
        var t = parseUserTime(form.querySelector('input').value);
        if (t === null) { note.textContent = 'Please enter the time as HH:MM (UTC).'; note.className = 'eq-note eq-note--err'; return; }
        var diff = Math.abs(t - minutes(q.time)); diff = Math.min(diff, 1440 - diff);
        if (diff > TOLERANCE_MIN) {
          note.textContent = 'That time does not match the QSO in my log. Check your log (UTC) and try again.';
          note.className = 'eq-note eq-note--err';
          return;
        }
        note.textContent = 'Preparing your eQSL…'; note.className = 'eq-note';
        download(q).then(function () { note.textContent = 'Downloaded. 73!'; note.className = 'eq-note eq-note--ok'; })
          .catch(function () { note.textContent = 'Something went wrong. Please try again.'; note.className = 'eq-note eq-note--err'; });
      });
    });
  }

  /* ── draw + download ── */
  function download(q) {
    return ready().then(function () {
      var c = document.createElement('canvas');
      ON3VZ_EQSL.draw(c, bgImg, { call: q.call, date: isoDate(q.date), utc: q.time.slice(0, 4), freq: q.freq, band: q.band, mode: q.mode, rst: q.rst });
      return new Promise(function (res, rej) {
        c.toBlob(function (blob) {
          if (!blob) return rej();
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'eQSL-ON3VZ-' + q.call.replace(/\//g, '-') + '-' + q.date + '-' + q.band + '.jpg';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
          res();
        }, 'image/jpeg', 0.92);
      });
    });
  }

  /* ── empty preview card ── */
  function preview() {
    var cv = $('eqPreview');
    if (!cv) return;
    ready().then(function () { ON3VZ_EQSL.draw(cv, bgImg, null); cv.classList.add('is-ready'); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var f = $('eqForm');
    if (f) f.addEventListener('submit', search);
    preview();
  });
})();
