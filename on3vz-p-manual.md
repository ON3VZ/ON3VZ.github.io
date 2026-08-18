---
layout: default
title: "ON3VZ/P Portable Manual"
permalink: /on3vz-p-manual/
extra_css: ["/css/post.css"]
date: 2026-08-18
---
<article class="post container--narrow">
  <header class="post-header">
    <div class="section-label">Reference</div>
    <h1 class="section-title" style="font-size:2rem;">ON3VZ/P Portable Manual</h1>
    <p class="post-meta">Technical reference · companion to <a href="/2026/08/18/building-on3vz-p/">Building ON3VZ/P</a></p>
  </header>
  <div class="post-body prose" markdown="1">

This is the full technical reference behind the ON3VZ/P build. Where the
blog post tells the story, this document is the one to come back to when
setting something up again, or explaining it to someone else.

## 1. The core principle: one master log, three kinds of files

It helps to keep three things distinct from the start:

<div class="onm-table-wrap" markdown="1">

| | Role | Where it lives |
|---|---|---|
| **Field log** | Temporary, per activation | Tablet / phone in the field |
| **Master log** | One complete, permanent log | Log4OM at home |
| **Publication logs** | Derived copies for specific purposes | QRZ, LoTW, Club Log, WWFF Logsearch |

</div>

The field log is disposable — it gets absorbed into the master log the
moment you're home. The WWFF submission is an *export*, not a separate
logbook. There is exactly one database that matters long-term: the one in
Log4OM.

<figure class="onm-fig">
  <svg viewBox="0 0 980 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:#0d1428;border:1px solid rgba(0,255,136,0.10);border-radius:12px;">
    <text x="24" y="28" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="12" letter-spacing="1.5">ON3VZ/P LOGGING CHAIN / FULL</text>

    <defs>
      <marker id="onmArC" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#00d4ff"/></marker>
      <marker id="onmArG" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#00ff88"/></marker>
      <marker id="onmArA" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#f0a500"/></marker>
    </defs>

    <!-- left sources -->
    <rect x="20" y="60" width="260" height="90" rx="8" fill="#111d35" stroke="rgba(0,212,255,0.5)"/>
    <text x="150" y="98" text-anchor="middle" fill="#00d4ff" font-family="Orbitron, monospace" font-size="14">WSJT-X</text>
    <text x="150" y="119" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">FT8, laptop, UDP forwarding</text>

    <rect x="20" y="200" width="260" height="90" rx="8" fill="#111d35" stroke="rgba(0,212,255,0.5)"/>
    <text x="150" y="238" text-anchor="middle" fill="#00d4ff" font-family="Orbitron, monospace" font-size="14">PoLo</text>
    <text x="150" y="259" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">SSB / CW, tablet, ADIF export</text>

    <!-- arrows to log4om -->
    <line x1="280" y1="105" x2="350" y2="150" stroke="#00d4ff" stroke-width="2" marker-end="url(#onmArC)"/>
    <text x="288" y="135" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">UDP, live</text>
    <line x1="280" y1="245" x2="350" y2="205" stroke="#00d4ff" stroke-width="2" marker-end="url(#onmArC)"/>
    <text x="288" y="228" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">ADIF import, manual</text>

    <!-- log4om -->
    <rect x="350" y="110" width="280" height="170" rx="10" fill="#111d35" stroke="rgba(0,255,136,0.65)" stroke-width="1.5"/>
    <text x="490" y="150" text-anchor="middle" fill="#00ff88" font-family="Orbitron, monospace" font-size="16">Log4OM</text>
    <text x="490" y="175" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="11">master log</text>
    <text x="490" y="197" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="11">two configurations:</text>
    <text x="490" y="217" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">shack (ON3VZ) / portable (ON3VZ/P)</text>
    <text x="490" y="255" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">upload routed by active config,</text>
    <text x="490" y="270" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">not by the imported grid — see §10</text>

    <!-- right targets, stacked -->
    <rect x="700" y="42" width="260" height="76" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="830" y="70" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="13">QRZ.com</text>
    <text x="830" y="90" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">ON3VZ/P logbook, own API key</text>

    <rect x="700" y="132" width="260" height="76" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="830" y="160" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="13">LoTW</text>
    <text x="830" y="180" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">own certificate, shared account</text>

    <rect x="700" y="222" width="260" height="76" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="830" y="250" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="13">Club Log</text>
    <text x="830" y="270" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">linked to ON3VZ, shared account</text>

    <rect x="700" y="312" width="260" height="76" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="830" y="340" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="13">QRZCQ</text>
    <text x="830" y="360" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">alias callsign</text>

    <rect x="700" y="402" width="260" height="76" rx="8" fill="#111d35" stroke="rgba(240,165,0,0.55)" stroke-dasharray="4 3"/>
    <text x="830" y="428" text-anchor="middle" fill="#f0a500" font-family="Orbitron, monospace" font-size="13">WWFF Logsearch</text>
    <text x="830" y="448" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">manual export, email to ONFF coordinator</text>
    <text x="830" y="464" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">onfflogapproval@gmail.com</text>

    <!-- fan lines -->
    <line x1="630" y1="195" x2="700" y2="80" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onmArG)"/>
    <line x1="630" y1="195" x2="700" y2="170" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onmArG)"/>
    <line x1="630" y1="195" x2="700" y2="260" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onmArG)"/>
    <line x1="630" y1="195" x2="700" y2="350" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onmArG)"/>
    <line x1="630" y1="195" x2="700" y2="440" stroke="#f0a500" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#onmArA)"/>

    <!-- legend -->
    <line x1="360" y1="30" x2="392" y2="30" stroke="#00ff88" stroke-width="2"/>
    <text x="399" y="34" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="10">automatic upload</text>
    <line x1="560" y1="30" x2="592" y2="30" stroke="#f0a500" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="599" y="34" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="10">manual step</text>
  </svg>
  <figcaption>The complete chain, both sources through the master log to all five destinations.</figcaption>
</figure>

## 2. Choosing the call: ON3VZ/P

ONFF requires a station to sign **/p or /m** to count toward the annual
activator ranking. In the log, the station call is what was actually
used on air (ON3VZ/P); the operator call is the same person without the
suffix (ON3VZ). A suffix like /QRP is not a recognised designator and
does not qualify for that ranking — QRP status is instead carried in the
`TX_PWR` field, in spot comments, and in profile text, never in the call
itself.

Consequence for every platform below: ON3VZ and ON3VZ/P are treated as
two distinct identities that need to be linked back together. The
relationship is different on every platform:

<div class="onm-rel-grid">
  <div class="onm-rel-card">
    <svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
      <rect x="10" y="20" width="80" height="46" rx="6" fill="#111d35" stroke="#00ff88" stroke-width="1.5"/>
      <text x="50" y="47" text-anchor="middle" fill="#eaf3ec" font-family="Share Tech Mono, monospace" font-size="12">ON3VZ</text>
      <rect x="130" y="20" width="80" height="46" rx="6" fill="#111d35" stroke="#00ff88" stroke-width="1.5"/>
      <text x="170" y="47" text-anchor="middle" fill="#eaf3ec" font-family="Share Tech Mono, monospace" font-size="12">ON3VZ/P</text>
      <text x="110" y="100" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">no link — separate</text>
      <text x="110" y="114" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">logbook each</text>
    </svg>
    <div class="onm-rel-label">QRZ.com</div>
  </div>
  <div class="onm-rel-card">
    <svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
      <rect x="10" y="14" width="80" height="40" rx="6" fill="#111d35" stroke="#00d4ff" stroke-width="1.5"/>
      <text x="50" y="38" text-anchor="middle" fill="#eaf3ec" font-family="Share Tech Mono, monospace" font-size="12">ON3VZ</text>
      <rect x="130" y="14" width="80" height="40" rx="6" fill="#111d35" stroke="#00d4ff" stroke-width="1.5"/>
      <text x="170" y="38" text-anchor="middle" fill="#eaf3ec" font-family="Share Tech Mono, monospace" font-size="12">ON3VZ/P</text>
      <line x1="50" y1="54" x2="110" y2="80" stroke="#00d4ff" stroke-width="1.5"/>
      <line x1="170" y1="54" x2="110" y2="80" stroke="#00d4ff" stroke-width="1.5"/>
      <rect x="65" y="80" width="90" height="34" rx="6" fill="#111d35" stroke="#00d4ff" stroke-width="1.5"/>
      <text x="110" y="101" text-anchor="middle" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="10">1 LoTW account</text>
    </svg>
    <div class="onm-rel-label">LoTW (via TQSL)</div>
  </div>
  <div class="onm-rel-card">
    <svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
      <rect x="15" y="10" width="190" height="100" rx="8" fill="none" stroke="#f0a500" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="110" y="26" text-anchor="middle" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="9">1 Club Log account</text>
      <rect x="30" y="40" width="70" height="40" rx="6" fill="#111d35" stroke="#00ff88" stroke-width="1.5"/>
      <text x="65" y="64" text-anchor="middle" fill="#eaf3ec" font-family="Share Tech Mono, monospace" font-size="11">ON3VZ</text>
      <rect x="120" y="40" width="70" height="40" rx="6" fill="#111d35" stroke="#00ff88" stroke-width="1.5"/>
      <text x="155" y="64" text-anchor="middle" fill="#eaf3ec" font-family="Share Tech Mono, monospace" font-size="11">ON3VZ/P</text>
      <line x1="100" y1="60" x2="120" y2="60" stroke="#00ff88" stroke-width="1.5"/>
      <text x="110" y="98" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">separate logs, linked</text>
    </svg>
    <div class="onm-rel-label">Club Log</div>
  </div>
</div>

## 3. QRZ.com

1. Add ON3VZ/P as a secondary callsign under the main account (Account →
   add callsign). It inherits the XML subscription automatically.
2. Create a new, separate **logbook** for ON3VZ/P (Logbook → new
   logbook). QRZ treats any prefix or suffix as a distinct call, so this
   is not optional.
3. Set a non-overlapping **Valid-From / Valid-To** date range for the new
   logbook, and set DXCC, grid, etc.
4. Copy the logbook's own **API key** into a password manager — never
   into a plain text file on a laptop that travels.
5. In Log4OM's External Services → QRZ.COM tab, set **Force Station
   Callsign** to `ON3VZ/P`. QRZ silently discards QSOs whose station call
   doesn't match the registered call for that logbook; this field is the
   safety net against anything slipping through with the wrong call.
6. Write the bio page as its own page, not a copy of the home page —
   distinct visual identity, `5W QRP` stated up front, equipment list for
   the field station.

## 4. LoTW (via TQSL)

1. In TQSL: **Callsign Certificate → Request New Callsign Certificate**.
2. Callsign `ON3VZ/P`, DXCC Belgium, QSO begin date = today or first
   planned activation, end date left blank.
3. On the "What is this Callsign Certificate for?" screen, select
   **None of these apply**. (Not "replaces my existing callsign" — that
   would retire the original call. Not "former callsign" either.)
4. When asked whether to add this to an existing LoTW account, select the
   existing **ON3VZ** account rather than creating a new one — this keeps
   DXCC/WAS progress unified under one login.
5. Sign the request with the existing ON3VZ certificate. This routes it
   through automatic processing (no manual ID/licence upload needed);
   typically approved within days, arriving as a `.tq6` attachment.
6. Load the `.tq6` file on the **same computer** that generated the
   request (the private key lives there). Delete the file from
   Downloads afterwards.
7. Create a **Station Location** per operating location, named by place
   and grid rather than by call (e.g. "Roy vakantiehuis JO20qe",
   "ONFF-0599 Alouette JO20xx") — DXCC Belgium, CQ 14, ITU 27, correct
   gridsquare.
8. Back up certificates and station locations (File → Backup) to
   somewhere off the laptop.

## 5. Club Log

Unlike QRZ, Club Log keeps **one account, multiple calls**:

1. Settings → Callsigns → add `ON3VZ/P`.
2. Settings → Linking → link ON3VZ/P to ON3VZ for combined DXCC credit in
   league tables (only possible within the same DXCC entity).
3. Logs stay separate per call automatically — never manually move QSOs
   between them.
4. No separate API key: Log4OM uses the same Club Log email/password for
   every call; the callsign in the active configuration determines which
   log receives the upload.

## 6. QRZCQ.com

1. Account → add ON3VZ/P as a secondary/alias callsign.
2. Switch to it via the callsign picker and confirm DXCC and profile
   details.
3. Put `5W QRP portable — WWFF/ONFF` in the short comment/description
   field (this is what shows up in lookups); the fuller station and
   equipment description goes in Biography/Equipment.

## 7. Log4OM: two configurations, one database

Log4OM v2's Configuration Manager lets you clone a full settings profile.

1. **Back up first** — copy the whole Log4OM data folder somewhere safe
   before touching anything.
2. Clone the existing configuration, name the copy `ON3VZ-P portable`.
3. **Station Information**: Station Callsign `ON3VZ/P`, Operator Callsign
   `ON3VZ`, Owner Callsign `ON3VZ`, gridsquare of the day, CQ 14, ITU 27,
   DXCC 209 (Belgium).
4. **Station configuration**: add the QMX + Band Hopper IV as a distinct
   rig/antenna pair (separate from the shack's IC-7300 + HyEndFed), with
   default TX power **5 W**.
5. **Confirmations** tab: set the default confirmation type per service —
   LOTW and QRZCOM should be `Sent = Requested` (this must match the
   upload flag configured under External Services, or new QSOs won't be
   picked up for automatic upload); QSL (paper) stays `No` unless you
   intend to send a card for every contact. `Rcvd` always stays `No` — it
   gets filled by the confirmation service itself, never set manually in
   advance. Click the save (floppy disk) icon for each type — this is a
   separate save from the top-level "Save config".
6. **External Services → QRZ.COM**: paste the ON3VZ/P logbook's API key,
   set Force Station Callsign to `ON3VZ/P`.
7. **External Services → LOTW**: point the Station ID dropdown at the
   correct TQSL Station Location for the current operating location.
   **This field does not update itself per QSO** — see §10 below for why
   that matters.
8. Leave `MY_SIG` / `MY_SIG_INFO` empty by default; fill them in
   (`WWFF` / `ONFF-xxxx`) only for an actual WWFF activation.
9. Enter one fictitious test QSO, inspect the resulting ADIF fields
   (`STATION_CALLSIGN`, `OPERATOR`, `MY_GRIDSQUARE`, `TX_PWR`,
   `MY_SIG`/`MY_SIG_INFO`), then delete it.

## 8. WSJT-X: portable configuration

1. **File → Settings → Configurations → Clone**, rename to `Portable`.
2. **General tab**: My Call `ON3VZ/P`, My Grid = grid of the day (6
   characters). Message generation for type-2 compound callsign holders
   should be set to include the full call in Tx3 — this is what makes
   `CQ ON3VZ/P` carry the grid, since ON3VZ/P is a type-2 compound call,
   not a fully "nonstandard" one.
3. **Radio tab**: select the QMX and its COM port. This will differ from
   the shack radio's COM port — check Device Manager when the QMX is
   plugged in, and don't assume it reuses the same port.
4. **Audio tab**: select the QMX's USB sound card for both input and
   output — one USB-C cable carries CAT and audio together.
5. **Reporting tab**: switch **off** "Contesting only" (this also needs
   checking on the home configuration — with it on, automatic logging
   only fires in contest mode); fill in **Op Call** = `ON3VZ` so the
   ADIF `OPERATOR` field is correct; confirm UDP forwarding to Log4OM is
   enabled on the same address/port the home configuration uses
   (typically `127.0.0.1:2237`), with "Accept UDP requests" on.
6. There is no message slot for `5W QRP` inside an FT8 exchange — the
   77-bit message is already full with call and grid. QRP status travels
   via the spot comment instead, or occasionally via a Tx5 free-text
   macro (`5W QRP TU`) sent in place of `73`.
7. Confirm the title bar reads `ON3VZ/P` and the grid before transmitting.

## 9. PoLo (Ham2K Portable Logger) — for SSB and CW sessions

1. Settings: Operator `ON3VZ`, Station Call `ON3VZ/P` — this is set
   **per activation/operation**, not as a single global field, since the
   station call can change between activations.
2. Default power = 5 W; optionally a fixed `5W QRP` note.
3. New Activation: choose type (WWFF/POTA/SOTA/none), enter the
   reference and gridsquare. For ordinary portable operating without a
   reference, leave the activation field blank.
4. **Data Files**: Settings → Data Settings → Data Files → refresh. These
   are the official WWFF/POTA/SOTA reference lists, maintained by those
   programmes — PoLo only downloads them; nothing here is user-authored.
   Do this at home over wifi, since most activation sites have no signal.
5. **Callsign Notes** (optional, unrelated to the above): a separate,
   user-editable text file of notes tied to specific callsigns, shown
   automatically when that call is logged again. PoLo ships with a
   built-in file ("Ham2K's Hams of Note"). A custom file can be hosted
   anywhere that serves a direct plain-text link — Dropbox, OneDrive,
   Google Drive/Docs, or a GitHub Gist's raw URL all qualify, added via
   Settings → Data Settings → Callsign Notes → **+ Add a new file**.
6. **Lookups**: enter QRZ XML credentials under account/lookup settings
   for full callsign lookups — without them PoLo falls back to HamDB,
   which only covers the US, Canada and Germany.
7. **Spotting**: log in to Spotline/POTA directly from PoLo using
   `ON3VZ/P` as the username; test this at home over wifi before relying
   on it in the field.
8. **Multi-device sync** (phone + iPad): Ham2K Log Filer ("LoFi")
   provides genuine two-way sync of QSO data (free tier: 7-day history,
   slower; paid tier ~€2.99/month: unlimited history, faster, more
   reliable across devices) — but it syncs **QSO data only, never
   settings**, and it's young enough that a manual ADIF export/import
   remains the dependable fallback. Each device still needs Operator
   call, Station call, power default, and QRZ lookup credentials
   configured independently.
9. Test with one fictitious QSO, export as ADIF, verify the same fields
   as in §7 step 9, delete the test QSO.
10. **Workflow**: PoLo has no live link to Log4OM. Export ADIF after the
    session and import it by hand — see §10.

## 10. After a PoLo import: the sequence that matters

Log4OM does not route a QSO to the correct logbook based on what's
written in an imported ADIF file — it uploads based on **which
configuration is active** at the moment of upload. The import itself is
not the risky step; the upload afterwards is.

1. Before importing, confirm Log4OM is on the **ON3VZ-P portable**
   configuration (check the title bar).
2. Import the ADIF file (File → Import ADIF).
3. Spot-check two or three imported records for `STATION_CALLSIGN =
   ON3VZ/P`.
4. The QRZ "Force Station Callsign" setting (§3.5) acts as a backstop
   even if something slipped through.
5. Upload to QRZ: select the imported QSOs, right-click, upload selection
   — don't rely on "automatic upload on new QSO", which is designed for
   live logging, not batch import.
6. **Before uploading to LoTW**, check the Station ID field in External
   Services → LOTW. It is a single fixed value per configuration, not
   read per-QSO from the grid field. If the last activation was at a
   different location than the one just imported, **switch it manually**
   to the correct Station Location before uploading — otherwise TQSL
   signs the new QSOs with the previous location's grid. This is the
   single easiest mistake to make in the whole workflow, and the reason
   it now sits as a fixed step in the field checklist rather than
   something to remember on the fly.
7. Upload to Club Log and QRZCQ the same way — select and upload, don't
   assume an automatic trigger fired on import.

## 11. Spotting

At 5 W, being found matters more than being loud. Self-spotting is not
optional — it's the core strategy.

- **Where**: [Spotline](https://spots.wwff.co) (WWFF's own spotting
  service, launched June 2025) — log in with your callsign as username.
  The **smartWWFF** app (phone/tablet) offers the same, plus spot
  browsing. PoLo can spot directly to Spotline and POTA. For non-WWFF
  portable operating, the ordinary DX cluster via Log4OM works, though
  self-spotting is more broadly accepted on nature-activation clusters
  than on general DX clusters.
- **What**: call, frequency, mode, and a comment carrying the reference
  and `5W QRP` — this is where QRP status becomes visible to hunters,
  since it can't fit inside an FT8 exchange.
- **How**: from a phone, not the laptop — Spotline and smartWWFF are
  built for that.
- **When**: register the activation on the WWFF **agenda** ahead of
  time (spots auto-populate during the scheduled window); post the first
  spot at the first QSO; re-spot after every band change. Once operating
  CW, the Reverse Beacon Network spots automatically when it hears the
  call during an active agenda window — no manual step needed.
- **Duplicate rule**: a spot counts as duplicate at the same frequency
  (±1 kHz), same call and reference, within 10 minutes of the previous
  one. Re-posting out of impatience does nothing.

## 12. WWFF submission

1. Confirm activation validity: **minimum 60 minutes** on air from the
   first logged QSO; **44 QSOs** normally required, with a QRP exception
   (confirm the exact reduced threshold directly with the ONFF
   coordinator, `onfflogapproval@gmail.com`) — QSOs below 44 can also be
   accumulated across multiple activations of the same reference.
2. Export an ADIF containing **only** the QSOs from this activation.
3. Filename exactly: `on3vz_p@ONFF-xxxx YYYYMMDD.adi` — this filename is
   used as the duplicate check, so don't deviate from it.
4. Attach at least two relevant photos (max 600 px) or one photo carrying
   GPS metadata — logs without proof are rejected.
5. Email to `onfflogapproval@gmail.com`, mentioning `5W QRP` explicitly
   if claiming the QRP exception.
6. If the reference also has a POTA number, upload to POTA separately.
7. Verify position against the **official ONFF KMZ** file (available via
   the BOS group on groups.io) before and during the activation — this
   is the file ONFF verifies activator position against, not a general
   map.

## 13. The five most common mistakes

<div class="onm-table-wrap" markdown="1">

| Mistake | Consequence |
|---|---|
| Forgetting to switch Log4OM/WSJT-X configuration | QSOs land in the wrong logbook, wrong call sent to LoTW |
| Leaving an old gridsquare in place | Wrong distances, wrong location in confirmations |
| Taking no activation photos | ONFF rejects the log |
| Wrong WWFF filename | Log isn't processed — filename is the duplicate check |
| Transmitting without checking SWR after a band change | Risk of PA damage — the QMX has no ATU |

</div>

## 14. Reference: what belongs where

<div class="onm-table-wrap" markdown="1">

| Fact | Lives in |
|---|---|
| Which logbook a QSO belongs to | Active Log4OM configuration at upload time |
| Station call, operator call, grid | Log4OM / WSJT-X / PoLo, set per configuration or activation |
| QRP status (5 W) | `TX_PWR` field, spot comments, profile text — never the callsign suffix |
| WWFF reference | `MY_SIG` / `MY_SIG_INFO`, filled only for an actual activation |
| LoTW signing location | Station ID dropdown in Log4OM's LOTW tab — fixed per configuration, must be switched manually per location |

</div>

<div style="background:linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.04));border:1px solid rgba(0,255,136,0.22);border-radius:14px;padding:1.6rem 1.8rem;margin:2.5rem 0;">
  <div style="font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.2rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.5rem;">📎 Downloads</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:0.8rem;margin-top:0.8rem;">
    <a href="/assets/files/on3vz-p-field-checklist-en.pdf" style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">PDF · English</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-cyan);">Field checklist (EN) →</div>
    </a>
    <a href="/assets/files/on3vz-p-veldchecklist-nl.pdf" style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">PDF · Nederlands</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-cyan);">Veldchecklist (NL) →</div>
    </a>
  </div>
</div>

  </div>
  <div style="margin-top:2rem;">
    <a class="btn btn-ghost" href="/2026/08/18/building-on3vz-p/">← Back to the blog post</a>
  </div>
</article>

<style>
.onm-table-wrap{overflow-x:auto;}
.onm-fig{margin:2rem 0;}
.onm-fig figcaption{font-family:var(--f-mono);font-size:0.68rem;letter-spacing:0.08rem;color:var(--c-text-3);margin-top:0.6rem;text-align:center;}
.onm-rel-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:1.6rem 0 2rem;}
.onm-rel-card{background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:0.8rem;}
.onm-rel-label{font-family:var(--f-mono);font-size:0.7rem;letter-spacing:0.06rem;color:var(--c-text-3);text-align:center;margin-top:0.4rem;text-transform:uppercase;}
</style>
