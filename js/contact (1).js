/* ============================================================
   ON3KRB — QSL Card Generator  |  contact.js
   ============================================================ */

(function () {
  'use strict';

  /* ─── DOM refs ─── */
  const canvas  = document.getElementById('qslCanvas');
  const ctx     = canvas.getContext('2d');

  /* Card dimensions: standard QSL 148×105 mm → 2×: 1480×1050 px */
  canvas.width  = 1480;
  canvas.height = 1050;

  /* ─── Colour palette (mirroring CSS vars) ─── */
  const C = {
    bg:       '#04080f',
    surface:  '#080d18',
    surface2: '#0d1428',
    primary:  '#00ff88',
    cyan:     '#00d4ff',
    amber:    '#f0a500',
    red:      '#ff4466',
    text:     '#e2eaf5',
    text2:    '#7a8faa',
    text3:    '#3a4f66',
    dim:      'rgba(0,255,136,0.07)',
    dimb:     'rgba(0,255,136,0.14)',
  };

  /* ─── Draw helpers ─── */
  function glow(color, blur) {
    ctx.shadowColor = color;
    ctx.shadowBlur  = blur;
  }
  function noGlow() {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur  = 0;
  }

  /* ─── Draw the QSL card ─── */
  function drawCard(data) {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    /* ── 1. Background ── */
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);

    /* Subtle radial glow top-left */
    const grd1 = ctx.createRadialGradient(200, 200, 0, 200, 200, 700);
    grd1.addColorStop(0, 'rgba(0,255,136,0.06)');
    grd1.addColorStop(1, 'transparent');
    ctx.fillStyle = grd1;
    ctx.fillRect(0, 0, W, H);

    /* Cyan glow bottom-right */
    const grd2 = ctx.createRadialGradient(W - 100, H + 100, 0, W - 100, H + 100, 600);
    grd2.addColorStop(0, 'rgba(0,212,255,0.05)');
    grd2.addColorStop(1, 'transparent');
    ctx.fillStyle = grd2;
    ctx.fillRect(0, 0, W, H);

    /* ── 2. Grid pattern ── */
    ctx.strokeStyle = 'rgba(0,255,136,0.04)';
    ctx.lineWidth = 1;
    const gs = 48 * 2; // scaled grid
    for (let x = 0; x < W; x += gs) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += gs) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    /* ── 3. Decorative antenna SVG-style (left side) ── */
    drawAntenna(60, 120, 320);

    /* ── 4. Radio waves (right side) ── */
    drawWaves(W - 80, 180, 6);

    /* ── 5. Top accent bar ── */
    const barGrd = ctx.createLinearGradient(0, 0, W, 0);
    barGrd.addColorStop(0, C.primary);
    barGrd.addColorStop(0.5, C.cyan);
    barGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = barGrd;
    ctx.fillRect(0, 0, W, 4);

    /* ── 6. Bottom accent bar ── */
    const barGrd2 = ctx.createLinearGradient(0, 0, W, 0);
    barGrd2.addColorStop(0, 'transparent');
    barGrd2.addColorStop(0.5, C.cyan);
    barGrd2.addColorStop(1, C.primary);
    ctx.fillStyle = barGrd2;
    ctx.fillRect(0, H - 4, W, 4);

    /* ── 7. Left vertical accent bar ── */
    const sideGrd = ctx.createLinearGradient(0, 0, 0, H);
    sideGrd.addColorStop(0, C.primary);
    sideGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = sideGrd;
    ctx.fillRect(0, 0, 4, H);

    /* ── 8. "QSL CARD" label top-right ── */
    ctx.font = '700 40px "Orbitron", monospace';
    ctx.textAlign = 'right';
    glow(C.amber, 14);
    ctx.fillStyle = C.amber;
    ctx.fillText('QSL CARD', W - 60, 80);
    noGlow();

    /* ── 9. ON3KRB callsign — huge ── */
    ctx.textAlign = 'left';
    glow(C.primary, 40);
    ctx.font = '900 220px "Orbitron", monospace';
    ctx.fillStyle = C.primary;
    ctx.fillText('ON3KRB', 60, 380);
    noGlow();

    /* Reflection/ghost */
    ctx.save();
    ctx.globalAlpha = 0.07;
    ctx.scale(1, -1);
    ctx.font = '900 220px "Orbitron", monospace';
    ctx.fillStyle = C.primary;
    ctx.fillText('ON3KRB', 60, -(380) - 30);
    ctx.restore();

    /* ── 10. Name & QTH ── */
    ctx.font = '300 40px "DM Sans", sans-serif';
    ctx.fillStyle = C.text2;
    ctx.textAlign = 'left';
    ctx.fillText('Kristof  //  Hoboken, Antwerpen  //  Belgium', 62, 430);

    /* ── 11. Grid locator & continent ── */
    ctx.font = '500 34px "Share Tech Mono", monospace';
    ctx.fillStyle = C.cyan;
    glow(C.cyan, 10);
    ctx.fillText('JO21GF  ·  EU  ·  ITU 14  ·  CQ 14', 62, 480);
    noGlow();

    /* ── 12. Horizontal divider ── */
    const divGrd = ctx.createLinearGradient(0, 0, W, 0);
    divGrd.addColorStop(0, C.primary);
    divGrd.addColorStop(0.6, 'rgba(0,255,136,0.15)');
    divGrd.addColorStop(1, 'transparent');
    ctx.strokeStyle = divGrd;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 520); ctx.lineTo(W - 60, 520);
    ctx.stroke();

    /* ── 13. QSO DATA BLOCK ── */
    const colX = [62, 320, 540, 740, 960, 1180];
    const headers = ['TO STATION', 'DATE', 'UTC', 'BAND', 'MODE', 'RST'];
    const vals    = [
      (data.call    || '?').toUpperCase(),
      (data.date    || new Date().toISOString().slice(0, 10)).replace(/-/g, '-'),
      (data.utc     || '--:--'),
      (data.band    || '?'),
      (data.mode    || '?').toUpperCase(),
      (data.rst     || '599'),
    ];

    /* Header row */
    ctx.font = '500 24px "Share Tech Mono", monospace';
    ctx.fillStyle = C.text3;
    ctx.textAlign = 'left';
    headers.forEach((h, i) => {
      ctx.fillText(h, colX[i], 580);
    });

    /* Values */
    vals.forEach((v, i) => {
      const isCall = i === 0;
      const color  = isCall ? C.primary : (i === 3 ? C.cyan : (i === 4 ? C.amber : C.text));
      ctx.font = isCall ? '700 56px "Orbitron", monospace' : '500 48px "Share Tech Mono", monospace';
      ctx.fillStyle = color;
      if (isCall) glow(color, 18);
      ctx.fillText(v, colX[i], 650);
      if (isCall) noGlow();
    });

    /* ── 14. Operator name ── */
    if (data.opName) {
      ctx.font = '300 32px "DM Sans", sans-serif';
      ctx.fillStyle = C.text2;
      ctx.textAlign = 'left';
      ctx.fillText('OP: ' + data.opName.toUpperCase(), colX[0], 720);
    }

    /* ── 15. "CONFIRMING OUR QSO" label ── */
    ctx.font = '400 30px "Share Tech Mono", monospace';
    ctx.fillStyle = C.text3;
    ctx.textAlign = 'left';
    ctx.fillText('CONFIRMING OUR QSO  ·  PSE QSL VIA BUREAU', 62, 780);

    /* ── 16. Bottom morse decoration ── */
    const morse73 = '-- ---  ...  -.. .  --- -. ...';
    ctx.font = '300 22px "Share Tech Mono", monospace';
    ctx.fillStyle = 'rgba(0,255,136,0.18)';
    ctx.textAlign = 'center';
    ctx.fillText(morse73, W / 2, H - 40);

    /* ── 17. Stamp-style circle ── */
    drawStamp(W - 160, H - 200, 150);
  }

  /* ─── Antenna drawing ─── */
  function drawAntenna(x, y, h) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,136,0.12)';
    ctx.lineWidth = 2;
    /* Mast */
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke();
    /* Elements */
    const elements = [0, 0.2, 0.45, 0.7, 0.88];
    const widths   = [240, 200, 160, 120, 80];
    elements.forEach((pct, i) => {
      const ey = y + h * pct;
      const ew = widths[i];
      ctx.beginPath();
      ctx.moveTo(x - ew / 2, ey); ctx.lineTo(x + ew / 2, ey); ctx.stroke();
      /* Guy wires on last element */
      if (i === 0) {
        ctx.globalAlpha = 0.06;
        ctx.beginPath(); ctx.moveTo(x, ey); ctx.lineTo(x - ew / 2 - 30, y + h + 20); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, ey); ctx.lineTo(x + ew / 2 + 30, y + h + 20); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
    ctx.restore();
  }

  /* ─── Concentric radio waves ─── */
  function drawWaves(cx, cy, count) {
    ctx.save();
    for (let i = 1; i <= count; i++) {
      const r = i * 70;
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI * 0.6, Math.PI * 0.6);
      ctx.strokeStyle = `rgba(0,212,255,${0.18 - i * 0.025})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ─── Circular stamp ─── */
  function drawStamp(cx, cy, r) {
    ctx.save();
    /* Outer ring */
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,255,136,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Inner ring */
    ctx.beginPath();
    ctx.arc(cx, cy, r - 20, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,255,136,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    /* Callsign text on arc */
    ctx.font = '700 22px "Orbitron", monospace';
    ctx.fillStyle = 'rgba(0,255,136,0.4)';
    ctx.textAlign = 'center';

    const letters = 'ON3KRB';
    const arcAngle = Math.PI * 0.9;
    const startAngle = -Math.PI / 2 - arcAngle / 2;
    letters.split('').forEach((ch, i) => {
      const angle = startAngle + (arcAngle / (letters.length - 1)) * i;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(0, -(r - 12));
      ctx.rotate(Math.PI / 2);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });

    /* Centre dot */
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,136,0.25)';
    ctx.fill();

    ctx.restore();
  }

  /* ─── Read form data ─── */
  function getFormData() {
    return {
      call:   document.getElementById('inp-call').value.trim(),
      opName: document.getElementById('inp-name').value.trim(),
      date:   document.getElementById('inp-date').value,
      utc:    document.getElementById('inp-utc').value,
      band:   document.getElementById('inp-band').value,
      mode:   document.getElementById('inp-mode').value,
      rst:    document.getElementById('inp-rst').value.trim() || '599',
    };
  }

  /* ─── Initial draw ─── */
  drawCard({
    call: 'YOURCALL',
    opName: '',
    date: new Date().toISOString().slice(0, 10),
    utc: '00:00',
    band: '20M',
    mode: 'SSB',
    rst: '599',
  });

  /* ─── Live update ─── */
  const inputs = document.querySelectorAll('.qsl-form-panel input, .qsl-form-panel select');
  inputs.forEach(el => el.addEventListener('input', () => drawCard(getFormData())));

  /* ─── Download ─── */
  document.getElementById('btnDownload').addEventListener('click', () => {
    const d = getFormData();
    const filename = `QSL_ON3KRB_${(d.call || 'QSO').toUpperCase()}_${(d.date || 'date').replace(/-/g,'')}.png`;
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();

    /* Toast */
    const toast = document.getElementById('dlToast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  });

  /* ─── Reset ─── */
  document.getElementById('btnReset').addEventListener('click', () => {
    inputs.forEach(el => {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else if (el.type === 'date') el.value = new Date().toISOString().slice(0, 10);
      else el.value = '';
    });
    drawCard(getFormData());
  });

})();
