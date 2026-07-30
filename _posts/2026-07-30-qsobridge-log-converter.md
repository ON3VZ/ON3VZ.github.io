---
layout: post
title: "QSObridge: Any Log In, the Right Format Out"
tags: ['Tools', 'Logging', 'Contest']
---

<style>
.qsb-hero{background:linear-gradient(135deg,rgba(240,165,0,0.08) 0%,rgba(0,212,255,0.05) 100%);border:1px solid rgba(240,165,0,0.25);border-radius:12px;padding:1.8rem 2rem;margin:0 0 2.5rem;text-align:center;}
.qsb-hero__kicker{font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.6rem;}
.qsb-hero__name{font-family:var(--f-display);font-size:2.2rem;font-weight:900;color:var(--c-amber);text-shadow:0 0 30px rgba(240,165,0,0.35);letter-spacing:0.08rem;margin-bottom:0.4rem;}
.qsb-hero__sub{color:var(--c-text-2);font-size:0.95rem;margin-bottom:1.4rem;}
.qsb-hero__btn{display:inline-block;background:var(--c-amber);color:#080d18;font-family:var(--f-display);font-size:0.85rem;font-weight:700;letter-spacing:0.1rem;padding:0.8rem 2.2rem;border-radius:6px;text-decoration:none;box-shadow:0 0 24px rgba(240,165,0,0.35);}
.qsb-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0 2rem;}
.qsb-cell{background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1.2rem 1.4rem;}
.qsb-cell__tag{font-family:var(--f-mono);font-size:0.62rem;letter-spacing:0.12rem;margin-bottom:0.5rem;}
.qsb-cell__title{font-weight:600;margin-bottom:0.4rem;}
.qsb-cell__body{font-size:0.82rem;color:var(--c-text-2);}
.qsb-fig{background:var(--c-surface);border:1px solid var(--c-border);border-radius:12px;padding:1.4rem;margin:2rem 0;}
.qsb-fig__cap{font-family:var(--f-mono);font-size:0.62rem;letter-spacing:0.1rem;color:var(--c-text-3);text-transform:uppercase;text-align:center;margin-top:0.9rem;}
.qsb-pills{display:flex;flex-wrap:wrap;gap:0.4rem;margin:1rem 0 0.5rem;}
.qsb-pill{font-family:var(--f-mono);font-size:0.68rem;letter-spacing:0.04rem;padding:0.28rem 0.7rem;border-radius:999px;border:1px solid var(--c-border);color:var(--c-text-2);background:var(--c-surface);}
@media(max-width:640px){.qsb-grid{grid-template-columns:1fr;}}
</style>

<div class="qsb-hero">
  <div class="qsb-hero__kicker">Client-side · 6 import formats · 18 profiles · Offline</div>
  <div class="qsb-hero__name">QSObridge</div>
  <div class="qsb-hero__sub">Read any common log format, edit it in a live grid, validate it against a contest or activation profile, and export a clean file. All in your browser, nothing uploaded anywhere.</div>
  <a href="https://on3vz.github.io/QSOBridge/" target="_blank" rel="noopener" class="qsb-hero__btn">LAUNCH QSOBRIDGE →</a>
</div>

Every logger speaks its own dialect.

N1MM hands you a Cabrillo file. Your handheld logging app spits out ADIF with a slightly different field set. The VHF contest robot wants EDI. POTA wants ADIF with park references in exactly the right place. SOTA wants a CSV, split per summit. And the moment you try to send the same session to two different places, something is missing, mislabelled, or in the wrong column.

I kept running into this while getting my station and my logging habits sorted out, and with my first field day coming up in September it was only going to get worse. So I built a tool that sits in the middle of all of it. One log in, the right format out. I called it **QSObridge**.

---

## The Idea in One Picture

The whole thing is a bridge. Messy input on one side, a clean validated log in the middle, and whatever format you actually need on the other side.

<div class="qsb-fig">
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <defs>
    <radialGradient id="qsbpost-glow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#f0a500" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="640" height="300" fill="url(#qsbpost-glow)"/>

  <!-- Column headers -->
  <text x="80" y="30" fill="rgba(0,212,255,0.85)" font-family="'Share Tech Mono',monospace" font-size="11" text-anchor="middle" letter-spacing="1">IMPORT</text>
  <text x="320" y="30" fill="rgba(240,165,0,0.9)" font-family="'Share Tech Mono',monospace" font-size="11" text-anchor="middle" letter-spacing="1">EDIT · VALIDATE</text>
  <text x="560" y="30" fill="rgba(0,255,136,0.85)" font-family="'Share Tech Mono',monospace" font-size="11" text-anchor="middle" letter-spacing="1">EXPORT</text>

  <!-- Input chips -->
  <g font-family="'Share Tech Mono',monospace" font-size="10" text-anchor="middle">
    <rect x="34" y="52" width="92" height="22" rx="4" fill="none" stroke="rgba(0,212,255,0.55)" stroke-width="1"/>
    <text x="80" y="67" fill="#00d4ff">ADIF</text>
    <rect x="34" y="86" width="92" height="22" rx="4" fill="none" stroke="rgba(0,212,255,0.55)" stroke-width="1"/>
    <text x="80" y="101" fill="#00d4ff">Cabrillo</text>
    <rect x="34" y="120" width="92" height="22" rx="4" fill="none" stroke="rgba(0,212,255,0.55)" stroke-width="1"/>
    <text x="80" y="135" fill="#00d4ff">EDI</text>
    <rect x="34" y="154" width="92" height="22" rx="4" fill="none" stroke="rgba(0,212,255,0.55)" stroke-width="1"/>
    <text x="80" y="169" fill="#00d4ff">SOTA-CSV</text>
    <rect x="34" y="188" width="92" height="22" rx="4" fill="none" stroke="rgba(0,212,255,0.55)" stroke-width="1"/>
    <text x="80" y="203" fill="#00d4ff">FLE</text>
    <rect x="34" y="222" width="92" height="22" rx="4" fill="none" stroke="rgba(0,212,255,0.55)" stroke-width="1"/>
    <text x="80" y="237" fill="#00d4ff">CSV / XLSX</text>
  </g>

  <!-- Converging lines to bridge -->
  <g stroke="rgba(0,212,255,0.3)" stroke-width="1.2" fill="none">
    <path d="M126 63 C 200 63, 210 140, 262 148"/>
    <path d="M126 97 C 200 97, 214 144, 262 150"/>
    <path d="M126 131 C 205 131, 220 148, 262 151"/>
    <path d="M126 165 C 205 165, 220 152, 262 152"/>
    <path d="M126 199 C 200 199, 214 156, 262 154"/>
    <path d="M126 233 C 200 233, 210 160, 262 156"/>
  </g>

  <!-- Bridge core -->
  <rect x="262" y="96" width="116" height="112" rx="10" fill="rgba(240,165,0,0.07)" stroke="#f0a500" stroke-width="1.4"/>
  <g stroke="#f0a500" stroke-width="1.6" fill="none">
    <path d="M290 176 v-8 a30 16 0 0 1 60 0 v8"/>
    <line x1="290" y1="176" x2="350" y2="176"/>
    <line x1="303" y1="168" x2="303" y2="176"/>
    <line x1="320" y1="164" x2="320" y2="176"/>
    <line x1="337" y1="168" x2="337" y2="176"/>
  </g>
  <text x="320" y="126" fill="#f0a500" font-family="'Share Tech Mono',monospace" font-size="10" text-anchor="middle" letter-spacing="1">QSObridge</text>
  <text x="320" y="198" fill="rgba(122,150,176,0.85)" font-family="'Share Tech Mono',monospace" font-size="7.5" text-anchor="middle">grid · checks · profiles</text>

  <!-- Diverging lines to outputs -->
  <g stroke="rgba(0,255,136,0.35)" stroke-width="1.2" fill="none">
    <path d="M378 130 C 440 120, 452 70, 514 66"/>
    <path d="M378 145 C 440 140, 452 104, 514 100"/>
    <path d="M378 155 C 440 155, 452 138, 514 134"/>
    <path d="M378 165 C 440 170, 452 172, 514 168"/>
    <path d="M378 178 C 440 190, 452 206, 514 202"/>
  </g>

  <!-- Output chips -->
  <g font-family="'Share Tech Mono',monospace" font-size="10" text-anchor="middle">
    <rect x="514" y="55" width="96" height="22" rx="4" fill="rgba(0,255,136,0.06)" stroke="rgba(0,255,136,0.5)" stroke-width="1"/>
    <text x="562" y="70" fill="#00ff88">ADIF / ADX</text>
    <rect x="514" y="89" width="96" height="22" rx="4" fill="rgba(0,255,136,0.06)" stroke="rgba(0,255,136,0.5)" stroke-width="1"/>
    <text x="562" y="104" fill="#00ff88">Cabrillo v3</text>
    <rect x="514" y="123" width="96" height="22" rx="4" fill="rgba(0,255,136,0.06)" stroke="rgba(0,255,136,0.5)" stroke-width="1"/>
    <text x="562" y="138" fill="#00ff88">EDI</text>
    <rect x="514" y="157" width="96" height="22" rx="4" fill="rgba(0,255,136,0.06)" stroke="rgba(0,255,136,0.5)" stroke-width="1"/>
    <text x="562" y="172" fill="#00ff88">SOTA-CSV</text>
    <rect x="514" y="191" width="96" height="22" rx="4" fill="rgba(0,255,136,0.06)" stroke="rgba(0,255,136,0.5)" stroke-width="1"/>
    <text x="562" y="206" fill="#00ff88">JSON</text>
  </g>

  <!-- Footer -->
  <line x1="34" y1="266" x2="606" y2="266" stroke="rgba(0,255,136,0.12)" stroke-width="0.8"/>
  <circle cx="42" cy="282" r="4" fill="rgba(0,255,136,0.3)" stroke="#00ff88" stroke-width="1.2"/>
  <text x="54" y="285" fill="rgba(0,255,136,0.7)" font-family="'Share Tech Mono',monospace" font-size="9">Everything runs in the browser. No backend, no telemetry, no upload.</text>
</svg>
<div class="qsb-fig__cap">Import → edit and validate → export, all on your own machine</div>
</div>

---

## Read Almost Anything

You drop a file in, paste from the clipboard, or pick several files and merge them. QSObridge reads **ADIF** (.adi and .adx), **Cabrillo**, **EDI / REG1TEST**, **SOTA-CSV**, **FLE**, and generic **CSV, TSV and XLSX** tables with a column mapping step for the odd ones.

It is deliberately forgiving. Encoding is detected automatically, broken records are skipped with a warning instead of crashing the whole import, and every field your logger exported is kept, even the ones a stricter tool would silently throw away. Two ADIF files with different field sets? No problem, everything is preserved.

## Edit in a Real Grid

Once the log is in, you get a fast virtualised grid with **dynamic columns**, so you immediately see every field that was actually present in the file. From there it behaves like the spreadsheet you wish your logger had:

<div class="qsb-grid">
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-primary);">SPLIT &amp; MERGE</div>
    <div class="qsb-cell__title">Fix combined exchanges</div>
    <div class="qsb-cell__body">Split a single exchange like <span style="font-family:var(--f-mono);color:var(--c-amber);">599 14</span> into RST and CQ-zone, by separator or regex, or merge serial and zone back into one field.</div>
  </div>
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-primary);">CLEAN UP</div>
    <div class="qsb-cell__title">Bulk edit and find/replace</div>
    <div class="qsb-cell__body">Inline editing, row selection, filter, sort, show or hide columns, bulk edits, search and replace, and full undo/redo.</div>
  </div>
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-cyan);">CATCH DUPES</div>
    <div class="qsb-cell__title">Duplicate detection</div>
    <div class="qsb-cell__body">Spot duplicate contacts, add or remove rows, and jump straight to the next problem with jump-to-error.</div>
  </div>
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-cyan);">STAY SAFE</div>
    <div class="qsb-cell__title">Autosave and recovery</div>
    <div class="qsb-cell__body">Autosave with crash recovery keeps your work if the tab dies, and you can store a station profile so you are not retyping your details.</div>
  </div>
</div>

## Validate Against What You Are Actually Submitting

This is the part that saves the field day, literally. You pick your target, a contest or an activation, and QSObridge instantly shows the **required fields as columns**, pushed to the front and flagged in amber, even if your log does not have them yet. Anything missing or invalid gets a red border, plus a plain "still needed" summary so you know exactly what to fix before you hit export.

<div class="qsb-fig">
<svg viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <rect width="640" height="190" rx="8" fill="rgba(10,16,28,0.35)"/>
  <!-- header -->
  <rect x="20" y="18" width="600" height="26" rx="4" fill="rgba(240,165,0,0.12)"/>
  <g font-family="'Share Tech Mono',monospace" font-size="10" fill="#f0a500">
    <text x="40" y="35">CALL</text>
    <text x="150" y="35">BAND</text>
    <text x="250" y="35">MODE</text>
    <text x="350" y="35">RST *</text>
    <text x="450" y="35">CQ-ZONE *</text>
  </g>
  <text x="600" y="35" fill="rgba(240,165,0,0.75)" font-family="'Share Tech Mono',monospace" font-size="8" text-anchor="end">* required</text>

  <!-- rows -->
  <g font-family="'Share Tech Mono',monospace" font-size="10" fill="rgba(176,196,216,0.9)">
    <text x="40" y="66">ON6WL</text><text x="150" y="66">20m</text><text x="250" y="66">SSB</text>
    <text x="350" y="66" fill="#00ff88">59</text><text x="450" y="66" fill="#00ff88">14</text>
    <text x="40" y="96">DL1ABC</text><text x="150" y="96">40m</text><text x="250" y="96">CW</text>
    <text x="350" y="96" fill="#00ff88">599</text><text x="450" y="96" fill="#00ff88">14</text>
    <text x="40" y="126">G3XYZ</text><text x="150" y="126">20m</text><text x="250" y="126">SSB</text>
    <text x="350" y="126" fill="#00ff88">59</text>
  </g>
  <!-- flagged missing cell -->
  <rect x="440" y="112" width="80" height="20" rx="3" fill="none" stroke="#ff5470" stroke-width="1.3"/>
  <text x="450" y="126" fill="#ff5470" font-family="'Share Tech Mono',monospace" font-size="9">missing</text>

  <!-- footer summary -->
  <line x1="20" y1="150" x2="620" y2="150" stroke="rgba(0,255,136,0.12)"/>
  <circle cx="30" cy="168" r="4" fill="none" stroke="#ff5470" stroke-width="1.3"/>
  <text x="44" y="171" fill="rgba(255,84,112,0.9)" font-family="'Share Tech Mono',monospace" font-size="9">Still needed: 1 x CQ-ZONE</text>
</svg>
<div class="qsb-fig__cap">Required fields appear up front in amber, gaps light up red, with a running summary</div>
</div>

There is band plan consistency checking, tooltips, and a health panel so you can see at a glance whether the log is ready to go.

## Eighteen Profiles Built In

You do not have to configure any of this from scratch. QSObridge ships with **18 ready profiles**, selectable in one click, and it can auto-detect the right one from the Cabrillo contest ID.

<div class="qsb-pills">
  <span class="qsb-pill">POTA</span>
  <span class="qsb-pill">WWFF</span>
  <span class="qsb-pill">SOTA</span>
  <span class="qsb-pill">GMA</span>
  <span class="qsb-pill">IOTA award</span>
  <span class="qsb-pill">ARLHS lighthouses</span>
  <span class="qsb-pill">UBA DX</span>
  <span class="qsb-pill">RSGB IOTA</span>
  <span class="qsb-pill">CQ WW</span>
  <span class="qsb-pill">CQ WPX</span>
  <span class="qsb-pill">CQ WW RTTY</span>
  <span class="qsb-pill">IARU HF</span>
  <span class="qsb-pill">WAE</span>
  <span class="qsb-pill">WW Digi</span>
  <span class="qsb-pill">ARRL DX</span>
  <span class="qsb-pill">ARRL Field Day</span>
  <span class="qsb-pill">IARU R1 VHF</span>
  <span class="qsb-pill">LoTW flavor</span>
</div>

Profiles are just JSON, so they are easy to import and share. If you need something exotic that is not on the list, you can assemble your own output format instead.

## Export, With a Wizard

On the way out you can produce **ADIF** (with POTA, WWFF, SOTA and LoTW flavors), **Cabrillo v3**, **EDI**, **SOTA-CSV** (split per summit), **JSON**, or a custom format. You pick exactly which fields to include, see a live preview, and get a warning if the chosen format would drop data, with a sidecar file to keep the rest. An upload wizard points you at the right flavor for LoTW, eQSL, QRZ, Club Log, POTA, WWFF, SOTA or a contest robot.

## The v2 Additions

Version 1 was already the full converter. Version 2 added the smart stuff:

<div class="qsb-grid">
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-amber);">ENRICH</div>
    <div class="qsb-cell__title">DXCC from the callsign</div>
    <div class="qsb-cell__body">Fills in CQ and ITU zone, continent and DXCC from the call using cty.dat data, flags mismatches, and shows the source, license and version in an "About the data" panel.</div>
  </div>
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-amber);">CHECK</div>
    <div class="qsb-cell__title">Nine smart checks</div>
    <div class="qsb-cell__body">Zone, unknown prefix, callsign form, band against frequency, locator, chronology, date, duplicates with a different exchange, and repeated serials, each with a suggestion you can apply or ignore.</div>
  </div>
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-cyan);">VERIFY</div>
    <div class="qsb-cell__title">Reference existence</div>
    <div class="qsb-cell__body">Check park, summit and reference numbers against an imported POTA, SOTA or WWFF list, with an optional opt-in online lookup where only the reference leaves your machine.</div>
  </div>
  <div class="qsb-cell">
    <div class="qsb-cell__tag" style="color:var(--c-cyan);">ASSIST</div>
    <div class="qsb-cell__title">Optional AI helper</div>
    <div class="qsb-cell__body">Opt-in, bring your own key. Paste a rough or paper log and get structured, editable QSO suggestions marked as AI. The key stays local.</div>
  </div>
</div>

There is also ADX output and dBase DBF input, saved views that remember your filters, columns and sorting, and a proper pass over accessibility with ARIA grid roles and live status messages.

---

## Where It Draws the Line

One thing QSObridge deliberately does **not** do is award and statistics tracking. That job belongs with LoTW, Club Log, QRZ and the [D3 logbook map](/logbook.html) already on this site, not inside a converter. Keeping the tool focused on one thing, moving a log cleanly from one format to another, is what makes it worth reaching for.

The whole thing is client-side, offline installable as a PWA, MIT licensed, and tested with a healthy pile of automated checks so it does not quietly mangle your log. No account, no server, no data leaving your device.

<div class="qsb-hero" style="margin-top:2.5rem;">
  <div class="qsb-hero__kicker">Free · Open Source · Runs in your browser</div>
  <div class="qsb-hero__name">Try QSObridge</div>
  <div class="qsb-hero__sub">Drop in a log and see what comes out the other side.</div>
  <a href="https://on3vz.github.io/QSOBridge/" target="_blank" rel="noopener" class="qsb-hero__btn">OPEN THE APP →</a>
</div>

73 de ON3VZ
