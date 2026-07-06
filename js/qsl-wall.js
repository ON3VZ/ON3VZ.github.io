/* ============================================================
   ON3VZ — QSL Wall
   Added 2026-07-06. Self-contained: remove this file (and its
   extra_js reference in qsl-wall.html) to revert.
   ============================================================ */
(function () {
  var cards = [];
  var groupsEl = document.getElementById('qwGroups');
  var emptyEl = document.getElementById('qwEmpty');
  var searchEl = document.getElementById('qwSearch');
  var sortEl = document.getElementById('qwSort');

  fetch('/assets/data/qsl-manifest.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      cards = data || [];
      updateStats(cards);
      render();
    })
    .catch(function (err) {
      console.error('Could not load QSL manifest', err);
      groupsEl.innerHTML = '<p class="qw-empty">Could not load QSL cards.</p>';
    });

  function updateStats(list) {
    var countries = new Set(list.map(function (c) { return c.country; }));
    var calls = new Set(list.map(function (c) { return c.fromCall; }));
    document.getElementById('qwStatCards').textContent = list.length;
    document.getElementById('qwStatCountries').textContent = countries.size;
    document.getElementById('qwStatCalls').textContent = calls.size;
  }

  function matchesSearch(card, q) {
    if (!q) return true;
    var haystack = [
      card.fromCall, card.fromName, card.qth, card.country,
      card.continent, card.band, card.mode
    ].join(' ').toLowerCase();
    return haystack.indexOf(q) !== -1;
  }

  function sortCards(list, mode) {
    var sorted = list.slice();
    if (mode === 'date-asc') {
      sorted.sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
    } else if (mode === 'country') {
      sorted.sort(function (a, b) { return a.country.localeCompare(b.country); });
    } else {
      sorted.sort(function (a, b) { return (b.date + b.time).localeCompare(a.date + a.time); });
    }
    return sorted;
  }

  function groupByCountry(list) {
    var map = {};
    var order = [];
    list.forEach(function (card) {
      if (!map[card.country]) {
        map[card.country] = [];
        order.push(card.country);
      }
      map[card.country].push(card);
    });
    return { map: map, order: order };
  }

  function cardEl(card) {
    var el = document.createElement('div');
    el.className = 'qw-card';
    el.innerHTML =
      '<span class="qw-card-eqsl">eQSL</span>' +
      '<img class="qw-card-img" src="' + card.image + '" alt="QSL from ' + card.fromCall + '" loading="lazy">' +
      '<div class="qw-card-body">' +
        '<div class="qw-card-call">' + card.fromCall + '</div>' +
        '<div class="qw-card-sub">' + (card.fromName ? card.fromName + ' &middot; ' : '') + (card.qth || '') + '</div>' +
        '<div class="qw-card-meta">' +
          '<span class="qw-tag">' + card.band + '</span>' +
          '<span class="qw-tag">' + card.mode + '</span>' +
          '<span class="qw-tag">' + card.date + '</span>' +
        '</div>' +
      '</div>';
    el.addEventListener('click', function () { openLightbox(card); });
    return el;
  }

  function render() {
    var q = (searchEl.value || '').trim().toLowerCase();
    var sortMode = sortEl.value;
    var filtered = cards.filter(function (c) { return matchesSearch(c, q); });
    var sorted = sortCards(filtered, sortMode);

    groupsEl.innerHTML = '';

    if (sorted.length === 0) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    if (sortMode === 'country') {
      var grouped = groupByCountry(sorted);
      grouped.order.slice().sort(function (a, b) { return a.localeCompare(b); }).forEach(function (country) {
        groupsEl.appendChild(buildGroup(country, grouped.map[country]));
      });
    } else {
      // still grouped by country (per Kristof's preference), but groups
      // appear in the order their newest/oldest card sorts, not alphabetically
      var groupedSeq = groupByCountry(sorted);
      groupedSeq.order.forEach(function (country) {
        groupsEl.appendChild(buildGroup(country, groupedSeq.map[country]));
      });
    }
  }

  function buildGroup(country, list) {
    var group = document.createElement('div');
    group.className = 'qw-group';

    var head = document.createElement('div');
    head.className = 'qw-group-head';
    head.innerHTML =
      '<span class="qw-group-title">' + country + '</span>' +
      '<span class="qw-group-count">' + list.length + (list.length === 1 ? ' card' : ' cards') + '</span>';
    group.appendChild(head);

    var grid = document.createElement('div');
    grid.className = 'qw-grid';
    list.forEach(function (card) { grid.appendChild(cardEl(card)); });
    group.appendChild(grid);

    return group;
  }

  function openLightbox(card) {
    var lb = document.getElementById('qwLightbox');
    var img = document.getElementById('qwLbImg');
    var meta = document.getElementById('qwLbMeta');
    img.src = card.image;
    img.alt = 'QSL from ' + card.fromCall;
    meta.innerHTML =
      '<strong>' + card.fromCall + '</strong>' + (card.fromName ? ' &mdash; ' + card.fromName : '') + '<br>' +
      (card.qth ? card.qth + ', ' : '') + card.country + '<br>' +
      card.date + ' ' + card.time + ' &middot; ' + card.band + ' ' + card.mode +
      (card.freq ? ' &middot; ' + card.freq + ' MHz' : '') +
      (card.rst ? ' &middot; RS(T) ' + card.rst : '');
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('qwLightbox').hidden = true;
    document.body.style.overflow = '';
  }

  document.getElementById('qwLbClose').addEventListener('click', closeLightbox);
  document.getElementById('qwLightbox').addEventListener('click', function (e) {
    if (e.target.id === 'qwLightbox') closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  searchEl.addEventListener('input', render);
  sortEl.addEventListener('change', render);
})();
