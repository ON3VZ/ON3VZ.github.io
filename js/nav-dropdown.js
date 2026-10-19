/* WALL DROPDOWN 2026-10-20: see css/nav-dropdown.css for the revert note */
(function () {
  function norm(p) { return (p || '/').replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/'; }
  var here = norm(location.pathname);

  document.querySelectorAll('.nav-dd').forEach(function (dd) {
    var btn = dd.querySelector('.nav-dd-btn');
    var menu = dd.querySelector('.nav-dd-menu');
    if (!btn || !menu) return;

    // highlight Wall when one of its pages is open
    menu.querySelectorAll('a').forEach(function (a) {
      if (norm(a.pathname) === here) btn.classList.add('fx-active');
    });

    function open() { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
    function close(focusBtn) {
      if (menu.hidden) return;
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (focusBtn) btn.focus();
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.hidden) open(); else close(false);
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) close(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(dd.contains(document.activeElement)); });
    dd.addEventListener('focusout', function (e) { if (e.relatedTarget && !dd.contains(e.relatedTarget)) close(false); });
  });
})();
