/* ============================================================
   ON3VZ Awards & Certificates
   Added 2026-10-20. Reads assets/data/certificates-manifest.json.
   Programmes with a "source" (BAFARA OR80AF) are read from their
   own data file, so the BAFARA workflow stays the single source.
   ============================================================ */
(function () {
  var groupsEl = document.getElementById('ctGroups');
  if (!groupsEl) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // diplomas.json: { "Solo": { image, alt, date }, ... }
  function fromBafara(program, data) {
    return Object.keys(data || {}).map(function (grade) {
      var d = data[grade] || {};
      var m = /(\d+ points, \d+ contacts, \d+ stations)/.exec(d.alt || '');
      return {
        id: 'bafara-' + grade.toLowerCase(),
        program: program.id,
        title: 'Hunter ' + grade,
        detail: m ? m[1] : '',
        date: d.date || '',
        image: d.image,
        imageLarge: d.image,
        alt: d.alt || ('BAFARA Award OR80AF, Hunter ' + grade + ' certificate for ON3VZ')
      };
    });
  }

  function loadJson(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + ' ' + r.status);
      return r.json();
    });
  }

  loadJson('/assets/data/certificates-manifest.json')
    .then(function (manifest) {
      var programs = manifest.programs || [];
      var certs = (manifest.certificates || []).slice();
      var extra = programs.filter(function (p) { return p.source; }).map(function (p) {
        return loadJson(p.source)
          .then(function (data) { return fromBafara(p, data); })
          .catch(function () { return []; });
      });
      return Promise.all(extra).then(function (lists) {
        lists.forEach(function (l) { certs = certs.concat(l); });
        render(programs, certs);
      });
    })
    .catch(function () {
      groupsEl.innerHTML = '<p class="ct-empty">The certificates could not be loaded. Reload the page to try again.</p>';
    });

  function render(programs, certs) {
    var shown = 0;
    var usedPrograms = 0;
    groupsEl.innerHTML = '';

    programs.forEach(function (p) {
      var list = certs.filter(function (c) { return c.program === p.id && c.image; });
      if (!list.length) return;
      list.sort(function (a, b) { return (a.date || '').localeCompare(b.date || ''); });
      usedPrograms++;
      shown += list.length;

      var group = document.createElement('section');
      group.className = 'ct-group';
      group.setAttribute('aria-label', p.name);
      group.innerHTML =
        '<div class="ct-group-head">' +
          '<h2 class="ct-group-title">' + esc(p.name) + '</h2>' +
          '<span class="ct-group-about">' + esc(p.about || '') + '</span>' +
          (p.link ? '<a class="ct-group-link" href="' + esc(p.link) + '">' + esc(p.linkText || 'More') + '</a>' : '') +
        '</div>';

      var grid = document.createElement('div');
      grid.className = 'ct-grid';
      list.forEach(function (c) { grid.appendChild(certEl(p, c)); });
      group.appendChild(grid);
      groupsEl.appendChild(group);
    });

    document.getElementById('ctStatCerts').textContent = shown;
    document.getElementById('ctStatPrograms').textContent = usedPrograms;

    if (!shown) {
      groupsEl.innerHTML = '<p class="ct-empty">No certificates yet.</p>';
    }
  }

  function certEl(p, c) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ct-cert';
    btn.setAttribute('aria-label', 'Show full size: ' + c.title + ', ' + p.name);
    var tags = '';
    if (c.number) tags += '<span class="ct-tag ct-tag--number">' + esc(c.number) + '</span>';
    if (c.date) tags += '<span class="ct-tag">' + esc(c.date) + '</span>';
    btn.innerHTML =
      '<span class="ct-frame"><img src="' + esc(c.image) + '" alt="' + esc(c.alt) + '" loading="lazy"></span>' +
      '<span class="ct-plate">' +
        '<span class="ct-plate-title">' + esc(c.title) + '</span>' +
        (c.detail ? '<span class="ct-plate-detail">' + esc(c.detail) + '</span>' : '') +
        (tags ? '<span class="ct-plate-meta">' + tags + '</span>' : '') +
      '</span>';
    btn.addEventListener('click', function () { openLightbox(p, c, btn); });
    return btn;
  }

  var lb = document.getElementById('ctLightbox');
  // move out of .page-wrap so it can sit above the fixed site header
  if (lb && lb.parentNode !== document.body) document.body.appendChild(lb);
  var lbImg = document.getElementById('ctLbImg');
  var lbMeta = document.getElementById('ctLbMeta');
  var lbClose = document.getElementById('ctLbClose');
  var lastFocus = null;

  function openLightbox(p, c, origin) {
    lastFocus = origin;
    lbImg.src = c.imageLarge || c.image;
    lbImg.alt = c.alt || c.title;
    var parts = [];
    if (c.number) parts.push('Award nr ' + esc(c.number));
    if (c.date) parts.push(esc(c.date));
    if (c.manager) parts.push('Award manager ' + esc(c.manager));
    lbMeta.innerHTML =
      '<strong>' + esc(c.title) + '</strong><br>' + esc(p.name) +
      (c.detail ? '<br>' + esc(c.detail) : '') +
      (parts.length ? '<br>' + parts.join(', ') : '');
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
})();
