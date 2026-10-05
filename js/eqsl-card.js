/* ============================================================
   ON3VZ eQSL card renderer (added 2026-10-06)
   Draws the retro postcard eQSL on a canvas (contact page).
   Background: /assets/images/eqsl-bg.jpg (1564 x 1006, 140 x 90 mm).
   drawEqsl(canvas, bgImage, qso | null)
   qso = { call, date: 'YYYY-MM-DD', utc: 'HHMM', freq: MHz, band, mode, rst }
   Pass null to draw the empty preview card.
   Fonts expected: 'Abril Fatface', 'Courier Prime', 'Special Elite'.
   ============================================================ */
(function (root) {
  var W = 1564, H = 1006;
  var STATION = {
    call: 'ON3VZ',
    line1: 'KRISTOF  ·  HOBOKEN, BELGIUM',
    line2: 'JO21EE  ·  EU  ·  ITU 27  ·  CQ 14',
    rig: 'IC-7300 MK II  ·  25 W',
    thanks: 'Tnx for the QSO, 73 de ON3VZ'
  };
  var INK = '#2B2118', BRICK = '#8E3420', NAVY = '#1F3A57';
  var PAPER = 'rgba(245,235,212,0.93)', PAPER_LINE = 'rgba(43,33,24,0.55)';

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }
  function paper(ctx, x, y, w, h, fill) {
    ctx.save();
    ctx.shadowColor = fill ? 'rgba(30,20,10,0.18)' : 'rgba(30,20,10,0.35)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
    rr(ctx, x, y, w, h, 6); ctx.fillStyle = fill || PAPER; ctx.fill();
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAPER_LINE; ctx.lineWidth = 2;
    rr(ctx, x + 8, y + 8, w - 16, h - 16, 4); ctx.stroke();
    ctx.lineWidth = 1; rr(ctx, x + 14, y + 14, w - 28, h - 28, 3); ctx.stroke();
    ctx.restore();
  }
  function spaced(ctx, text, x, y, spacing, align) {
    // letter-spaced text (canvas letterSpacing is not everywhere yet)
    var widths = [], total = 0;
    for (var i = 0; i < text.length; i++) { var w = ctx.measureText(text[i]).width; widths.push(w); total += w + (i ? spacing : 0); }
    var cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
    var a = ctx.textAlign; ctx.textAlign = 'left';
    for (var j = 0; j < text.length; j++) { ctx.fillText(text[j], cx, y); cx += widths[j] + spacing; }
    ctx.textAlign = a;
  }
  function fmtDate(d) { if (!d) return ''; var p = d.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function fmtFreq(f) { var n = parseFloat(f); return isNaN(n) ? '' : n.toFixed(3); }
  function fmtUtc(t) { if (!t) return ''; t = String(t).padStart(4, '0'); return t.slice(0, 2) + ':' + t.slice(2, 4); }

  function stamp(ctx, cx, cy, qso) {
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(-0.16);
    ctx.globalAlpha = 0.78;
    ctx.strokeStyle = BRICK; ctx.fillStyle = BRICK;
    ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 92, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 80, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI * 2); ctx.stroke();
    // text around the ring
    ctx.font = '700 17px "Courier Prime", monospace'; ctx.textBaseline = 'middle';
    var txt = ' HOBOKEN · BELGIUM · HOBOKEN · BELGIUM ·';
    var step = (Math.PI * 2) / txt.length;
    for (var i = 0; i < txt.length; i++) {
      ctx.save(); ctx.rotate(i * step); ctx.translate(0, -65); ctx.textAlign = 'center'; ctx.fillText(txt[i], 0, 0); ctx.restore();
    }
    ctx.textAlign = 'center';
    ctx.font = '400 30px "Abril Fatface", serif'; ctx.fillText('eQSL', 0, -6);
    ctx.font = '700 15px "Courier Prime", monospace';
    ctx.fillText(qso ? fmtDate(qso.date) : 'JO21EE', 0, 22);
    ctx.restore();
  }

  function drawEqsl(canvas, bg, qso) {
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(bg, 0, 0, W, H);
    ctx.textBaseline = 'alphabetic';

    /* ── title label, top centre ── */
    var tx = 470, ty = 34, tw = 600, th = 252;
    paper(ctx, tx, ty, tw, th);
    ctx.fillStyle = NAVY; ctx.textAlign = 'center';
    ctx.font = '400 128px "Abril Fatface", serif';
    spaced(ctx, STATION.call, tx + tw / 2, ty + 150, 6, 'center');
    ctx.fillStyle = BRICK; ctx.fillRect(tx + 70, ty + 168, tw - 140, 2);
    ctx.fillStyle = INK; ctx.font = '700 22px "Courier Prime", monospace';
    spaced(ctx, STATION.line1, tx + tw / 2, ty + 198, 2, 'center');
    ctx.font = '400 19px "Courier Prime", monospace';
    spaced(ctx, STATION.line2, tx + tw / 2, ty + 222, 2, 'center');

    /* ── postmark stamp, over the map ── */
    stamp(ctx, 1290, 175, qso);

    /* ── QSO panel, bottom ── */
    var px = 60, py = 782, pw = 1444, ph = 198;
    paper(ctx, px, py, pw, ph, 'rgba(245,235,212,0.62)');
    ctx.save(); ctx.shadowColor = 'rgba(250,242,222,1)'; ctx.shadowBlur = 8; // halo keeps text readable on the see-through panel
    ctx.fillStyle = BRICK; ctx.textAlign = 'left';
    ctx.font = '700 22px "Special Elite", "Courier Prime", monospace';
    spaced(ctx, 'CONFIRMING OUR 2-WAY QSO', px + 34, py + 50, 2, 'left');
    ctx.fillStyle = INK; ctx.textAlign = 'right';
    ctx.font = '700 20px "Courier Prime", monospace';
    spaced(ctx, STATION.rig, px + pw - 34, py + 50, 1, 'right');
    ctx.restore();

    var cols = [
      { k: 'TO RADIO', v: qso && qso.call, w: 270 },
      { k: 'DATE', v: qso && fmtDate(qso.date), w: 240 },
      { k: 'UTC', v: qso && fmtUtc(qso.utc), w: 140 },
      { k: 'FREQ  MHZ', v: qso && fmtFreq(qso.freq), w: 200 },
      { k: 'BAND', v: qso && (qso.band || '').toUpperCase(), w: 130 },
      { k: 'MODE', v: qso && (qso.mode || '').toUpperCase(), w: 150 },
      { k: 'RST', v: qso && qso.rst, w: 110 }
    ];
    var gap = 10, cx = px + 34, cy = py + 62, ch = 88;
    var totalW = cols.reduce(function (s, c) { return s + c.w; }, 0) + gap * (cols.length - 1);
    var scale = (pw - 68) / totalW;
    cols.forEach(function (c) {
      var w = c.w * scale;
      ctx.save();
      ctx.fillStyle = 'rgba(255,250,238,0.80)'; ctx.fillRect(cx, cy, w, ch);
      ctx.strokeStyle = 'rgba(43,33,24,0.6)'; ctx.lineWidth = 1.5; ctx.strokeRect(cx + 0.5, cy + 0.5, w - 1, ch - 1);
      ctx.fillStyle = 'rgba(43,33,24,0.7)'; ctx.textAlign = 'left';
      ctx.font = '700 14px "Courier Prime", monospace';
      spaced(ctx, c.k, cx + 12, cy + 24, 2, 'left');
      if (c.v) {
        ctx.fillStyle = c.k === 'TO RADIO' ? NAVY : INK;
        var size = 40;
        ctx.font = '700 ' + size + 'px "Courier Prime", monospace';
        while (ctx.measureText(c.v).width > w - 24 && size > 20) { size -= 2; ctx.font = '700 ' + size + 'px "Courier Prime", monospace'; }
        ctx.fillText(c.v, cx + 12, cy + 72);
      }
      ctx.restore();
      cx += w + gap * scale;
    });

    ctx.save(); ctx.shadowColor = 'rgba(250,242,222,1)'; ctx.shadowBlur = 8;
    ctx.fillStyle = INK; ctx.textAlign = 'left';
    ctx.font = 'italic 700 19px "Courier Prime", monospace';
    ctx.fillText(STATION.thanks, px + 34, py + ph - 22);
    ctx.textAlign = 'right'; ctx.font = '700 17px "Courier Prime", monospace';
    spaced(ctx, 'HOBOKEN · BELGIUM · JO21EE', px + pw - 34, py + ph - 22, 2, 'right');
    return canvas;
  }

  root.ON3VZ_EQSL = { draw: drawEqsl, width: W, height: H };
})(window);
