---
layout: post
title: "From a Paper Grid to a Live Scoreboard: Building the N1MM Field Day Tracker"
tags: ['Projects', 'Field Day', 'N1MM', 'Software', 'WLD']
---

<!-- HERO PANEL. Manual removal block: delete everything between the
     FDT:HERO:START and FDT:HERO:END markers below to remove this component. -->
<!-- FDT:HERO:START -->
<div style="background:linear-gradient(135deg,rgba(0,255,136,0.08) 0%,rgba(0,212,255,0.05) 55%,rgba(240,165,0,0.05) 100%);border:1px solid rgba(0,255,136,0.22);border-radius:14px;padding:2rem 2rem 1.8rem;margin:0 0 2.5rem;text-align:center;box-shadow:0 0 40px rgba(0,255,136,0.06) inset;">
  <div style="font-family:var(--f-mono);font-size:0.62rem;letter-spacing:0.2rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.7rem;">Open source · Windows &amp; Linux · Offline · No account</div>
  <div style="font-family:var(--f-display);font-size:clamp(1.5rem,4.5vw,2.2rem);font-weight:900;color:var(--c-primary);text-shadow:0 0 30px rgba(0,255,136,0.4);letter-spacing:0.06rem;line-height:1.15;margin-bottom:0.6rem;">N1MM Field Day Tracker</div>
  <div style="color:var(--c-text-2);font-size:0.95rem;max-width:520px;margin:0 auto 1.5rem;">Live matrix of which participating stations you have worked, on which bands, fed straight from N1MM Logger+. No spreadsheet. No shouting across the tent.</div>
  <div style="display:flex;gap:0.7rem;flex-wrap:wrap;justify-content:center;">
    <a href="https://github.com/ON3VZ/n1mm-fieldday-tracker/releases/latest" target="_blank" rel="noopener"
       style="display:inline-block;background:var(--c-primary);color:#080d18;font-family:var(--f-display);font-size:0.8rem;font-weight:700;letter-spacing:0.1rem;padding:0.75rem 1.8rem;border-radius:6px;text-decoration:none;box-shadow:0 0 24px rgba(0,255,136,0.35);">
      DOWNLOAD v1.1.0 →
    </a>
    <a href="https://github.com/ON3VZ/n1mm-fieldday-tracker" target="_blank" rel="noopener"
       style="display:inline-block;background:transparent;color:var(--c-primary);border:1px solid var(--c-border-hard);font-family:var(--f-display);font-size:0.8rem;font-weight:700;letter-spacing:0.1rem;padding:0.75rem 1.8rem;border-radius:6px;text-decoration:none;">
      SOURCE CODE
    </a>
  </div>
</div>
<!-- FDT:HERO:END -->

## Why a newcomer started writing code before his first field day

I joined the [WLD club](https://on6wl.be) recently. September will be my first field day with them, and like most new members I spent the first few meetings mostly listening. But one thing came up again and again in those conversations, always with the same half-amused sigh: *the list*.

Every field day, someone sits at a table with a printed or half-digital Excel sheet. Down the left: the participating stations. Across the top: 160 m, 80 m, 40 m. Every time an operator works one of the other participating clubs, someone has to be told, and someone has to put a mark in the right box. It works, it has worked for years, but it is slow, it is error prone, and at three in the morning when you actually need it most, it is exactly the thing nobody wants to maintain.

Meanwhile, right next to that sheet, a computer is already logging every single QSO perfectly.

That gap bothered me. So instead of showing up in September with nothing but enthusiasm and a thermos flask, I decided to contribute something a newcomer can actually contribute: software. This post describes what came out of it, **version 1 of the N1MM Field Day Tracker**.

---

## The core idea

The tracker is **not** a logger. That distinction matters, and it was the first design decision.

[N1MM Logger+](https://n1mmwp.hamdocs.com/) remains the official log. It is mature, it is trusted, it handles the contest rules, and nobody in their right mind should try to replace it during a live event. The tracker sits *beside* it and answers one very specific question that N1MM does not answer.

<!-- FDT:QUESTION:START -->
<div style="border-left:3px solid var(--c-primary);background:rgba(0,255,136,0.05);border-radius:0 10px 10px 0;padding:1.2rem 1.5rem;margin:1.8rem 0;">
  <div style="font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.5rem;">The one question</div>
  <div style="font-family:var(--f-display);font-size:1rem;font-weight:700;color:var(--c-text);line-height:1.5;">Which participating stations have we already worked, on which bands, and which combinations are still open?</div>
</div>
<!-- FDT:QUESTION:END -->

That is it. One question, answered live, on a big readable screen, without anybody having to update a spreadsheet by hand.

Here is roughly what that looks like on the display in the corner of the tent:

<!-- FDT:MATRIX:START -->
<div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:12px;padding:1.4rem;margin:1.8rem 0;overflow-x:auto;">
  <svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;min-width:420px;height:auto;display:block;">
    <defs>
      <filter id="fdtGlow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <text x="8" y="20" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10" letter-spacing="2">STATION</text>
    <text x="250" y="20" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="11" text-anchor="middle">160m</text>
    <text x="350" y="20" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="11" text-anchor="middle">80m</text>
    <text x="450" y="20" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="11" text-anchor="middle">40m</text>
    <line x1="8" y1="30" x2="552" y2="30" stroke="rgba(0,255,136,0.28)" stroke-width="1"/>

    <g font-family="Share Tech Mono, monospace" font-size="12" fill="#b0c4d8">
      <text x="8" y="55">ON4XYZ/P</text><text x="8" y="90">ON6ABC/P</text><text x="8" y="125">ON7DEF/P</text><text x="8" y="160">ON5GHI/P</text><text x="8" y="195">ON9JKL/P</text>
    </g>

    <!-- worked = filled green, manual = green with marker, open = hollow -->
    <g>
      <rect x="215" y="40" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88" filter="url(#fdtGlow)"/>
      <rect x="315" y="40" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>
      <rect x="415" y="40" width="70" height="22" rx="4" fill="none" stroke="rgba(122,150,176,0.35)" stroke-dasharray="3 3"/>

      <rect x="215" y="75" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>
      <rect x="315" y="75" width="70" height="22" rx="4" fill="none" stroke="rgba(122,150,176,0.35)" stroke-dasharray="3 3"/>
      <rect x="415" y="75" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>
      <text x="480" y="91" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="13">✎</text>

      <rect x="215" y="110" width="70" height="22" rx="4" fill="none" stroke="rgba(122,150,176,0.35)" stroke-dasharray="3 3"/>
      <rect x="315" y="110" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>
      <rect x="415" y="110" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>

      <rect x="215" y="145" width="70" height="22" rx="4" fill="rgba(122,150,176,0.10)" stroke="rgba(122,150,176,0.35)"/>
      <text x="250" y="161" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11" text-anchor="middle">n/a</text>
      <rect x="315" y="145" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>
      <rect x="415" y="145" width="70" height="22" rx="4" fill="none" stroke="rgba(122,150,176,0.35)" stroke-dasharray="3 3"/>

      <rect x="215" y="180" width="70" height="22" rx="4" fill="none" stroke="rgba(122,150,176,0.35)" stroke-dasharray="3 3"/>
      <rect x="315" y="180" width="70" height="22" rx="4" fill="none" stroke="rgba(122,150,176,0.35)" stroke-dasharray="3 3"/>
      <rect x="415" y="180" width="70" height="22" rx="4" fill="rgba(0,255,136,0.18)" stroke="#00ff88"/>
    </g>
  </svg>
  <div style="font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.12rem;color:var(--c-text-3);text-transform:uppercase;margin-top:0.9rem;display:flex;gap:1.2rem;flex-wrap:wrap;">
    <span><span style="color:#00ff88;">■</span> worked</span>
    <span><span style="color:#f0a500;">✎</span> manual override</span>
    <span><span style="color:#7a96b0;">▢</span> still open</span>
    <span><span style="color:#7a96b0;">n/a</span> excluded</span>
  </div>
</div>
<!-- FDT:MATRIX:END -->

---

## Automatic coupling with N1MM Logger+

This is the part that makes the whole thing worthwhile.

N1MM Logger+ can broadcast every logged contact over the network as a UDP message. You enable it under:

<!-- FDT:CONFIG:START -->
<div style="background:var(--c-surface-2);border:1px solid var(--c-border);border-radius:10px;padding:1.1rem 1.4rem;margin:1.4rem 0;font-family:var(--f-mono);font-size:0.82rem;color:var(--c-text-2);line-height:1.9;">
  <div style="color:var(--c-text-3);font-size:0.6rem;letter-spacing:0.18rem;text-transform:uppercase;margin-bottom:0.6rem;">N1MM Logger+ setup</div>
  <div><span style="color:var(--c-cyan);">Config</span> &rsaquo; Config Ports, Mode Control, Audio, Other… &rsaquo; <span style="color:var(--c-cyan);">Broadcast Data</span></div>
  <div>Tick <span style="color:var(--c-primary);">Contacts</span></div>
  <div>Destination: <span style="color:var(--c-amber);">127.0.0.1:12060</span> (same machine) or <span style="color:var(--c-amber);">192.168.1.50:12060</span> (separate tracker laptop)</div>
  <div>Contest: <span style="color:var(--c-primary);">FDREG1</span></div>
</div>
<!-- FDT:CONFIG:END -->

From that moment every QSO you log lands in the tracker within milliseconds. The matrix cell turns green. Nobody had to say anything, write anything, or remember anything.

<!-- FDT:FLOW:START -->
<div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:12px;padding:1.4rem;margin:1.8rem 0;overflow-x:auto;">
  <svg viewBox="0 0 620 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;min-width:460px;height:auto;display:block;">
    <defs>
      <marker id="fdtArrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill="#00ff88"/>
      </marker>
    </defs>
    <rect x="6" y="35" width="130" height="56" rx="8" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.4)"/>
    <text x="71" y="60" fill="#00d4ff" font-family="Orbitron, monospace" font-size="12" font-weight="700" text-anchor="middle">N1MM+</text>
    <text x="71" y="77" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9" text-anchor="middle">logging PCs</text>

    <line x1="140" y1="63" x2="228" y2="63" stroke="#00ff88" stroke-width="1.4" marker-end="url(#fdtArrow)"/>
    <text x="184" y="53" fill="#00ff88" font-family="Share Tech Mono, monospace" font-size="9" text-anchor="middle">UDP :12060</text>

    <rect x="234" y="26" width="150" height="74" rx="8" fill="rgba(0,255,136,0.07)" stroke="rgba(0,255,136,0.45)"/>
    <text x="309" y="52" fill="#00ff88" font-family="Orbitron, monospace" font-size="12" font-weight="700" text-anchor="middle">TRACKER</text>
    <text x="309" y="69" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9" text-anchor="middle">parse · match · store</text>
    <text x="309" y="84" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9" text-anchor="middle">plain JSON files</text>

    <line x1="388" y1="47" x2="470" y2="30" stroke="#00ff88" stroke-width="1.4" marker-end="url(#fdtArrow)"/>
    <line x1="388" y1="80" x2="470" y2="98" stroke="#00ff88" stroke-width="1.4" marker-end="url(#fdtArrow)"/>

    <rect x="476" y="8" width="138" height="44" rx="8" fill="rgba(240,165,0,0.06)" stroke="rgba(240,165,0,0.4)"/>
    <text x="545" y="27" fill="#f0a500" font-family="Orbitron, monospace" font-size="10" font-weight="700" text-anchor="middle">LOCAL VIEW</text>
    <text x="545" y="42" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9" text-anchor="middle">127.0.0.1</text>

    <rect x="476" y="78" width="138" height="44" rx="8" fill="rgba(240,165,0,0.06)" stroke="rgba(240,165,0,0.4)"/>
    <text x="545" y="97" fill="#f0a500" font-family="Orbitron, monospace" font-size="10" font-weight="700" text-anchor="middle">GITHUB PAGES</text>
    <text x="545" y="112" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9" text-anchor="middle">public snapshot</text>
  </svg>
</div>
<!-- FDT:FLOW:END -->

---

## Four things that bit me along the way

Real field days are messier than the documentation suggests, and the interesting engineering was almost entirely in the edge cases.

<!-- FDT:GOTCHAS:START -->
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin:1.6rem 0;">

  <div style="background:var(--c-surface);border:1px solid var(--c-border);border-left:3px solid var(--c-red);border-radius:10px;padding:1.1rem 1.2rem;">
    <div style="font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.45rem;">Trap 01</div>
    <div style="font-family:var(--f-display);font-size:0.88rem;font-weight:700;color:var(--c-text);margin-bottom:0.5rem;">The LookupInfo trap</div>
    <div style="font-size:0.85rem;color:var(--c-text-2);line-height:1.6;">This one cost me an evening. <code>LookupInfo</code> packets have a field structure identical to real contacts, arrive on the same recommended port, and are broadcast the moment an operator merely <em>looks up</em> a callsign, before anything is logged. A naive parser happily counts QSOs that never happened. The tracker filters strictly on the XML root tag and counts everything else as an ignored packet type in the sync log.</div>
  </div>

  <div style="background:var(--c-surface);border:1px solid var(--c-border);border-left:3px solid var(--c-amber);border-radius:10px;padding:1.1rem 1.2rem;">
    <div style="font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.45rem;">Trap 02</div>
    <div style="font-family:var(--f-display);font-size:0.88rem;font-weight:700;color:var(--c-text);margin-bottom:0.5rem;">Frequency, never the band label</div>
    <div style="font-size:0.85rem;color:var(--c-text-2);line-height:1.6;">N1MM's <code>&lt;band&gt;</code> text field is locale dependent: it may say <code>3.5</code> or <code>3,5</code> depending on the Windows regional settings of the logging PC. So the tracker never reads it. Band is always derived from <code>rxfreq</code> (which, delightfully, is expressed in units of 10 Hz) against an IARU Region 1 band plan.</div>
  </div>

  <div style="background:var(--c-surface);border:1px solid var(--c-border);border-left:3px solid var(--c-cyan);border-radius:10px;padding:1.1rem 1.2rem;">
    <div style="font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.45rem;">Trap 03</div>
    <div style="font-family:var(--f-display);font-size:0.88rem;font-weight:700;color:var(--c-text);margin-bottom:0.5rem;">Callsign suffixes</div>
    <div style="font-size:0.85rem;color:var(--c-text-2);line-height:1.6;">All 38 stations on our participant list carry <code>/P</code>, while N1MM may log them with or without. Normalisation is applied on both sides, so <code>ON4BAF</code>, <code>ON4BAF/P</code>, <code>on4baf/p</code> and <code>F/ON4BAF/P</code> all resolve to the same station. Strict matching is available for those who want it, but it is off by default.</div>
  </div>

  <div style="background:var(--c-surface);border:1px solid var(--c-border);border-left:3px solid var(--c-primary);border-radius:10px;padding:1.1rem 1.2rem;">
    <div style="font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.45rem;">Trap 04</div>
    <div style="font-family:var(--f-display);font-size:0.88rem;font-weight:700;color:var(--c-text);margin-bottom:0.5rem;">Multiple logging PCs</div>
    <div style="font-size:0.85rem;color:var(--c-text-2);line-height:1.6;">Either each PC broadcasts to the tracker directly, or, if you run N1MM in networked mode, one station enables <em>All Computers</em> and forwards the whole network's contacts. The tracker handles both without any configuration difference. Warning straight from the N1MM docs, worth repeating: enable <em>All Computers</em> on <strong>one</strong> station only, or you create a circular packet storm.</div>
  </div>

</div>
<!-- FDT:GOTCHAS:END -->

N1MM also broadcasts `contactreplace` and `contactdelete`, and the tracker follows both. Fix a busted callsign in the log and it un-marks the old cell and marks the new one. Delete a QSO and the cell opens back up.

---

## ADIF import: the safety net

Realtime is wonderful right up until it isn't. A laptop is off. The tracker was started an hour late. A station joins in the evening. Someone's network cable was, in the finest field day tradition, doubling as a tent guy-line.

So the tracker imports **ADIF files** as a catch-up mechanism. Feed it a log at any point and it will merge everything in, deduplicate against what it already has, and produce an honest import report: records read, new, duplicate, outside the field day window, unknown station, unparseable. No silent magic. You always see exactly what happened.

---

## Manual overrides: because paper still exists

Software that assumes the digital record is complete is software written by someone who has never been on a field. A QSO gets written on a scrap of paper. A station is worked on a rig that isn't hooked to a computer at all. Something is logged that shouldn't count.

Any cell in the matrix can therefore be set by hand:

| Status | Meaning |
|---|---|
| Not worked | Still open |
| Worked (N1MM) | Automatic, from the live feed |
| **Manually worked** | Set by an operator, with a reason |
| **Manually not worked** | Correcting a false positive |
| **Excluded** | This combination doesn't apply |

**Manual always wins over automatic.** That is a hard rule in the codebase, tested on every build. And manual cells are never distinguished by colour alone, there is a marker too, because colour blindness exists and so does bright sunlight on a tablet screen in an open field.

---

## Everyone follows along, live

Here is the part that got the club genuinely excited.

The view is built exactly **once**, as static HTML that reads a `snapshot.json` file. Locally, the app serves that view on `127.0.0.1`. And with one button, or automatically every few minutes, the identical snapshot is pushed to **GitHub Pages**.

Same code, same colours, same filters. The published page refreshes itself every 30 seconds. So members at home, family, other clubs, anyone with the link can watch the grid fill up in real time. No login, no app, just a URL.

Because that page is genuinely public, the tracker warns you about it in the interface and lets you strip remarks and operator notes out of the published snapshot before it goes live.

Beyond the main matrix there are views for *still to work* (the one you actually want at 03:00), per band, per station, and per source PC, which doubles as your feed diagnostics, plus a statistics view. Everything is filterable by callsign, status, band, category and section, with CSV and PDF export for the archive.

---

## Windows and Linux, yes really

N1MM Logger+ is Windows software. The tracker is not.

Because the coupling happens over UDP across the network, the logging PCs can sit in the operating tent running Windows while the tracker runs on whatever machine you happen to have, including a Linux laptop, or a small box in the corner serving the display. All data lives in plain JSON files with atomic writes and corruption recovery. No database to install, no server, no cloud service, no account. It runs entirely offline. Only the optional GitHub publishing needs internet.

The interface starts in English and switches to Dutch, French or Spanish.

---

<!-- LINK PANEL (boxed links). Manual removal block: delete everything between
     the FDT:LINKS:START and FDT:LINKS:END markers below to remove this component. -->
<!-- FDT:LINKS:START -->
<div style="background:linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.04));border:1px solid rgba(0,255,136,0.22);border-radius:14px;padding:1.8rem;margin:2.5rem 0;">

  <div style="font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.2rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.5rem;">📦 Open source · download &amp; build</div>
  <div style="font-family:var(--f-display);font-size:1.15rem;font-weight:700;color:var(--c-text);margin-bottom:0.8rem;">Free and open source. Use it, fork it, break it, improve it.</div>
  <p style="font-size:0.9rem;color:var(--c-text-2);margin:0 0 1.4rem;">Windows users get an installer, Linux users get an x86_64 tarball. Source, documentation and issue tracker all live in the repository. Contributions, bug reports and band plan corrections for other IARU regions are very welcome.</p>

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:0.8rem;">

    <a href="https://github.com/ON3VZ/n1mm-fieldday-tracker/releases/latest" target="_blank" rel="noopener"
       style="display:block;background:var(--c-surface);border:1px solid var(--c-border-hard);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">Latest release</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-primary);">Download v1.1.0 →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Windows installer · Linux tar.gz</div>
    </a>

    <a href="https://github.com/ON3VZ/n1mm-fieldday-tracker" target="_blank" rel="noopener"
       style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">Repository</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-cyan);">Source &amp; issues →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Python 3.11+ · docs · tests</div>
    </a>

    <a href="https://n1mmwp.hamdocs.com/" target="_blank" rel="noopener"
       style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">The official logger</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-amber);">N1MM Logger+ →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Docs &amp; download</div>
    </a>

    <a href="https://on6wl.be" target="_blank" rel="noopener"
       style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">The club</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-primary);">WLD · ON6WL →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Where this idea came from</div>
    </a>

  </div>
</div>
<!-- FDT:LINKS:END -->

---

## What version 1 is, and what it isn't

V1 deliberately does *not* do cloud sync, multi-user editing of the tracker itself, authentication, online score reporting, or automatic creation of unknown stations. The participant list decides who counts. A callsign that isn't on it is ignored, never silently added.

That restraint is the point. A field day tool has exactly one chance to work, in a tent, possibly in the rain, with tired operators and a generator. Fewer moving parts means fewer things that can fail at 02:00.

## See you in September

I still have a great deal to learn from the people in this club, about antennas, about propagation, about how a field day actually runs when the mast goes up. But a spreadsheet that nobody enjoys maintaining seemed like a solvable problem, and solving it was something I could do before my first event rather than after it.

If it works as intended, the most visible result will be that nobody thinks about the list at all. That would be the best possible outcome.

73 and see you on the bands.
