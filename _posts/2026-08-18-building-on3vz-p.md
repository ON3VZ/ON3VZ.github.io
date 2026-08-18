---
layout: post
title: "Building ON3VZ/P: a QRP Portable Station for Flora & Fauna"
tags: ['Portable', 'QRP', 'WWFF', 'ONFF', 'POTA', 'Log4OM', 'WSJT-X', 'QMX', 'Beginners']
---

<style>
.onp-hero{background:linear-gradient(135deg,rgba(0,255,136,0.07) 0%,rgba(0,212,255,0.05) 100%);border:1px solid var(--c-border-hard);border-radius:12px;padding:1.6rem 1.8rem;margin:0 0 2rem;}
.onp-hero__kicker{font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.6rem;}
.onp-hero__title{font-family:var(--f-display);font-size:1.35rem;font-weight:700;color:var(--c-primary);text-shadow:var(--glow-sm);margin-bottom:0.8rem;}
.onp-specs{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.9rem;margin-top:1.2rem;}
.onp-spec{background:var(--c-surface);border:1px solid var(--c-border);border-radius:8px;padding:0.8rem 0.9rem;}
.onp-spec__k{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.14rem;text-transform:uppercase;color:var(--c-text-3);}
.onp-spec__v{font-family:var(--f-display);font-size:1.05rem;color:var(--c-cyan);margin-top:0.25rem;}
.onp-continuity{font-family:var(--f-mono);font-size:0.78rem;color:var(--c-text-3);border-left:2px solid var(--c-border-hard);padding-left:0.9rem;margin:0 0 2.4rem;}
.onp-continuity a{color:var(--c-cyan);}
.onp-note{border-left:3px solid var(--c-amber);background:rgba(240,165,0,0.06);padding:1rem 1.2rem;border-radius:0 8px 8px 0;margin:1.8rem 0;}
.onp-note strong{color:var(--c-amber);}
.onp-fig{margin:2rem 0;}
.onp-fig figcaption{font-family:var(--f-mono);font-size:0.68rem;letter-spacing:0.08rem;color:var(--c-text-3);margin-top:0.6rem;text-align:center;}
.onp-inline-img{display:flex;gap:1.4rem;flex-wrap:wrap;align-items:flex-start;margin:1.8rem 0;}
.onp-inline-img figure{flex:1 1 280px;margin:0;}
.onp-inline-img img{width:100%;height:auto;border-radius:12px;border:1px solid var(--c-border);display:block;}
.onp-inline-img figcaption{font-family:var(--f-mono);font-size:0.68rem;color:var(--c-text-3);margin-top:0.5rem;}
/* Flora & fauna accent — reserved for the QRZ.com card embed only */
.onp-qrz-wrap{margin:2rem 0;}
.onp-qrz-label{font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.8rem;}
</style>

<div class="onp-hero">
  <div class="onp-hero__kicker">ON3VZ // Building ON3VZ/P // WWFF · ONFF · POTA</div>
  <div class="onp-hero__title">Taking the callsign into the woods</div>
  <p style="color:var(--c-text-2);margin:0;">The station itself was built and shaken down already. This post is about everything <em>around</em> it: choosing a second identity for portable operating, wiring it correctly through QRZ.com, LoTW, Club Log and QRZCQ, and setting up the logging chain so a field QSO lands in the right place without a second thought.</p>
  <div class="onp-specs">
    <div class="onp-spec"><div class="onp-spec__k">Callsign</div><div class="onp-spec__v">ON3VZ/P</div></div>
    <div class="onp-spec"><div class="onp-spec__k">Power</div><div class="onp-spec__v">5 W</div></div>
    <div class="onp-spec"><div class="onp-spec__k">Programs</div><div class="onp-spec__v">WWFF · POTA</div></div>
    <div class="onp-spec"><div class="onp-spec__k">Radio</div><div class="onp-spec__v">QMX</div></div>
  </div>
</div>

<p class="onp-continuity">Continuing from <a href="/2026/08/14/first-qrp-portable-test-setup/">the first QRP portable test setup</a>, where the station itself got built and powered up for the first time. This post is about everything that happens before the first CQ: the callsign, the accounts, and the logging chain behind it.</p>

For the last while, most of my radio energy has gone into the shack: sorting
out the antenna, chasing down noise, getting the logging chain between
Log4OM, QRZ.com, Club Log and LoTW to run cleanly. That part is done now,
and it left me with an itch I hadn't expected — I wanted to take a station
*outside*.

Two things pulled me in that direction at the same time. With my family,
we go every summer to our holiday house in Roy, near Marche-en-Famenne,
in the Belgian Ardennes — an obvious place to operate from on quiet
afternoons. And somewhere on
Facebook I kept running into activation reports from the WWFF (Worldwide
Flora & Fauna) programme: people setting up in forests and nature reserves,
working dozens of contacts, and posting neat little QSO maps afterwards.
I had no idea how any of it worked. This post is the story of figuring
that out, from a complete standing start.

## The station: small on purpose

I didn't want a scaled-down version of the shack. I wanted something built
for the constraint of a backpack:

- **QRP Labs QMX**, 5 W, covering 60/40/30/20/17/15 m — CW, digital and SSB
  in one small radio with a single USB-C connection for both CAT and audio.
- **SOTAbeams Band Hopper IV** linked dipole, run as an inverted V on a
  10 m mast. I already owned the IV (20/30/40/80 m); the 80 m section
  stays coiled on its winder since the QMX doesn't cover that band and an
  80 m dipole needs more clear span than most forest clearings offer.
  Effectively I run it as a III: 40/30/20 m, full size, no ATU, no loading
  coils — every milliwatt of those 5 watts goes into the air, not into a
  matching network.
- A **G7UFO Turret** mini microphone for SSB.
- Logging on the same laptop that runs my shack station, plus an iPad and
  phone for sessions where the laptop stays home.

5 watts is not a limit imposed by my licence — it's the radio. That single
fact shaped almost every decision downstream: which mode to start with,
how the antenna gets built, and how I present myself on the air.

<div class="onp-inline-img">
  <figure>
    <img src="/assets/images/qrp-portable-qmx-closeup.jpg" alt="QRP Labs QMX transceiver in the field with RG174 feedline and clip-on ferrites">
    <figcaption>The QMX itself — same radio, same feedline, now carrying a second callsign.</figcaption>
  </figure>
  <figure>
    <svg viewBox="0 0 480 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:#0d1428;border:1px solid rgba(0,255,136,0.10);border-radius:12px;">
      <text x="20" y="26" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11" letter-spacing="1.5">BAND HOPPER IV → III</text>
      <circle cx="240" cy="55" r="6" fill="#00ff88"/>
      <text x="240" y="38" text-anchor="middle" fill="#00ff88" font-family="Share Tech Mono, monospace" font-size="11">centre + balun</text>
      <!-- left leg: active, straight to L3 -->
      <line x1="240" y1="55" x2="100" y2="205" stroke="#00ff88" stroke-width="2.5"/>
      <circle cx="100" cy="205" r="6" fill="#0d1428" stroke="#00ff88" stroke-width="2.5"/>
      <text x="70" y="200" text-anchor="end" fill="#00ff88" font-family="Share Tech Mono, monospace" font-size="11">L3 closed</text>
      <text x="70" y="216" text-anchor="end" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">40/30/20 m active</text>
      <!-- left coil hanging, muted -->
      <path d="M100,205 q-18,10 0,20 q18,10 0,20 q-18,10 0,20 q18,10 0,20" fill="none" stroke="#5a6b7a" stroke-width="2" stroke-dasharray="1 4"/>
      <text x="65" y="300" text-anchor="end" fill="#5a6b7a" font-family="Share Tech Mono, monospace" font-size="10">80 m coiled,</text>
      <text x="65" y="313" text-anchor="end" fill="#5a6b7a" font-family="Share Tech Mono, monospace" font-size="10">link open, unused</text>
      <!-- right leg mirror -->
      <line x1="240" y1="55" x2="380" y2="205" stroke="#00ff88" stroke-width="2.5"/>
      <circle cx="380" cy="205" r="6" fill="#0d1428" stroke="#00ff88" stroke-width="2.5"/>
      <text x="410" y="200" fill="#00ff88" font-family="Share Tech Mono, monospace" font-size="11">L3 closed</text>
      <path d="M380,205 q18,10 0,20 q-18,10 0,20 q18,10 0,20 q-18,10 0,20" fill="none" stroke="#5a6b7a" stroke-width="2" stroke-dasharray="1 4"/>
      <!-- mast -->
      <line x1="240" y1="61" x2="240" y2="340" stroke="#7a96b0" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="250" y="340" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">10 m mast</text>
      <!-- legend -->
      <line x1="30" y1="368" x2="65" y2="368" stroke="#00ff88" stroke-width="2.5"/>
      <text x="72" y="373" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="11">in use</text>
      <path d="M150,368 q-10,6 0,12 q10,6 0,12" fill="none" stroke="#5a6b7a" stroke-width="2" stroke-dasharray="1 4"/>
      <text x="175" y="378" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="11">coiled, unused</text>
    </svg>
    <figcaption>Run as a III, not a IV: the 80 m section stays coiled and hanging rather than run out.</figcaption>
  </figure>
</div>

## Why /P, and not /QRP

My first instinct was to operate as ON3VZ/QRP — it felt descriptive. It
turns out that's the wrong call for this. ONFF's activator ranking
requires a station to sign /p or /m; /QRP isn't a recognised suffix and
wouldn't count toward that ranking, on top of which every additional
variant call multiplies the administration — a separate QRZ logbook, a
separate LoTW certificate, a separate entry in Club Log.

So I operate as **ON3VZ/P**, and I make the QRP status visible another
way: `TX_PWR = 5` in every logged QSO (which is also what triggers WWFF's
QRP exception to the 44-QSO minimum), a `5W QRP` note in my spot comments,
and it's stated plainly on my QRZ.com page.

## Getting the accounts right

A portable call isn't just a label — on most of these platforms it's a
second identity that needs its own setup, and getting the relationship
between the two calls wrong is the easiest way to end up with QSOs stuck
in the wrong place.

**QRZ.com** treats any call with an added prefix or suffix as a distinct
call with its own logbook — but it's all the same account throughout, no
second login. I added ON3VZ/P as a secondary callsign to get it its own
bio page, then created a separate logbook tied to that callsign with a
non-overlapping validity date, and generated a dedicated API key — with
"Force Station Callsign" set to ON3VZ/P as a safety net against anything
ever slipping through with the wrong call.

**LoTW** works differently: one certificate per call, but they can share a
single LoTW account. In TQSL, requesting a new certificate for ON3VZ/P
means answering "what is this for?" — the correct answer is **None of
these apply** (not "replaces my existing callsign", which would retire
ON3VZ). Because the request is signed with my existing ON3VZ certificate,
it skips the manual paperwork entirely and typically clears in a few days.

**Club Log** flips the QRZ logic: one account, multiple calls added under
it, optionally linked together for combined DXCC credit — never a second
account.

**QRZCQ.com** got the same treatment as QRZ: an alias callsign, its own
profile text, `5W QRP` in the short comment field so it travels with
lookups.

I built the ON3VZ/P QRZ.com bio page as its own thing rather than a copy
of my home page — dark green, flora-and-fauna palette, the field station
photo as the header image, the 5 W QRP badge as the one warm accent on
the page. It's meant to look, at a glance, like a different kind of
station than the shack.

<div class="onp-qrz-wrap">
  <div class="onp-qrz-label">// the ON3VZ/P QRZ.com page, as it stands today</div>
  <div style="background:#0a1410; border-radius:12px; border:1px solid #2c5340; color:#cfe0d2; font-family:Arial,Helvetica,sans-serif; margin-left:auto; margin-right:auto; max-width:640px; overflow:hidden">
    <div style="background:#060d0a; line-height:0">
      <img alt="ON3VZ/P portable station in the field" src="https://cdn-bio.qrz.com/p/on3vz_p/ON3VZ_Portable_landscape_jpg.jpeg" style="display:block; height:auto; margin:0; max-width:100%; width:100%" />
    </div>
    <div style="background:#132a1e; border-bottom:3px solid #a3d16a; box-sizing:border-box; padding:20px 24px 22px 24px; width:100%">
      <div style="background:#0a1410; border:1px solid #f0b45f; border-radius:6px; display:inline-block; margin-bottom:12px; margin-top:-36px; padding:7px 16px">
        <span style="color:#f0b45f; font-family:'Courier New',Courier,monospace; font-size:17px; letter-spacing:3px">5 W &middot; QRP</span>
      </div>
      <div style="color:#a3d16a; font-family:'Courier New',Courier,monospace; font-size:30px; letter-spacing:4px; line-height:1; margin:0 0 6px 0">ON3VZ/P</div>
      <div style="color:#a8c4b0; font-size:11px; letter-spacing:2px; text-transform:uppercase">Flora &amp; Fauna &middot; WWFF / ONFF &middot; POTA &middot; Belgium</div>
    </div>
    <div style="padding:20px 24px">
      <p style="color:#d3e3d6; font-size:14px; line-height:1.7; margin:0 0 20px 0">This is the portable log of <strong style="color:#f2f8f3">ON3VZ</strong> &mdash; Kristof, Hoboken, Antwerp. Everything under this callsign is worked outdoors in protected nature, at <strong style="color:#f0b45f">5&nbsp;watts</strong> into a wire hung in a tree. If I was weak, that&rsquo;s why. Thank you for digging me out.</p>
      <span style="font-size:12px">
        <span style="background-color:#24462f; color:#b8dd8a; padding:5px 10px">WWFF / ONFF</span>&nbsp;
        <span style="background-color:#24462f; color:#b8dd8a; padding:5px 10px">POTA</span>&nbsp;
        <span style="background-color:#1b3325; color:#c3d9c8; padding:5px 10px">FT8</span>&nbsp;
        <span style="background-color:#1b3325; color:#c3d9c8; padding:5px 10px">SSB</span>&nbsp;
        <span style="background-color:#1b3325; color:#c3d9c8; padding:5px 10px">CW (learning)</span>
      </span>
      <div style="margin-top:20px; text-align:center;">
        <a href="https://www.qrz.com/db/ON3VZ%2FP" target="_blank" rel="noopener" style="background:#24462f; border:1px solid #a3d16a; border-radius:6px; color:#b8dd8a; display:inline-block; font-family:'Courier New',monospace; font-size:13px; padding:9px 16px; text-decoration:none">View the full page on QRZ.com &rarr;</a>
      </div>
    </div>
    <div style="background:#060d0a; border-top:1px solid #2c5340; padding:12px 24px; text-align:center">
      <span style="color:#a8c4b0; font-family:'Courier New',monospace; font-size:12px">73 and 44 de ON3VZ/P &middot; 5W QRP &middot; Hoboken &middot; Antwerp &middot; Belgium</span>
    </div>
  </div>
</div>

## One master log, two configurations

The temptation with a second call is to think you need a second logbook.
You don't, and you don't want one. Log4OM holds a single database — my
entire operating history in one place — and I run **two configurations**
against it: the shack configuration (ON3VZ, IC-7300, home grid) and a
portable one (ON3VZ/P, QMX, whichever grid I'm operating from that day).

Switching configuration switches everything that matters: station call,
operator call, gridsquare, default TX power (5 W), the QRZ API key it
uploads to, and which LoTW/TQSL Station Location it signs with. WWFF's
`MY_SIG` / `MY_SIG_INFO` fields stay empty for ordinary portable operating
and only get filled in — `WWFF` / `ONFF-xxxx` — for an actual activation.

The one habit this setup demands, without exception: **check the title
bar before you touch the key.** Forgetting to switch configuration is the
single easiest way to send a portable QSO into the wrong logbook, under
the wrong call, signed by the wrong certificate.

<figure class="onp-fig">
  <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:#0d1428;border:1px solid rgba(0,255,136,0.10);border-radius:12px;">
    <text x="20" y="24" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11" letter-spacing="1.5">ON3VZ/P LOGGING CHAIN / SIMPLIFIED</text>

    <!-- sources -->
    <rect x="20" y="40" width="270" height="70" rx="8" fill="#111d35" stroke="rgba(0,212,255,0.5)"/>
    <text x="155" y="66" text-anchor="middle" fill="#00d4ff" font-family="Orbitron, monospace" font-size="13">WSJT-X</text>
    <text x="155" y="86" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">FT8, laptop</text>

    <rect x="350" y="40" width="270" height="70" rx="8" fill="#111d35" stroke="rgba(0,212,255,0.5)"/>
    <text x="485" y="66" text-anchor="middle" fill="#00d4ff" font-family="Orbitron, monospace" font-size="13">PoLo</text>
    <text x="485" y="86" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">SSB / CW, tablet</text>

    <!-- arrows into log4om -->
    <line x1="180" y1="110" x2="270" y2="160" stroke="#00d4ff" stroke-width="2" marker-end="url(#onpArC)"/>
    <text x="185" y="140" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">UDP</text>
    <line x1="460" y1="110" x2="370" y2="160" stroke="#00d4ff" stroke-width="2" marker-end="url(#onpArC)"/>
    <text x="415" y="140" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">ADIF import</text>

    <!-- log4om -->
    <rect x="140" y="162" width="360" height="100" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.6)" stroke-width="1.5"/>
    <text x="320" y="196" text-anchor="middle" fill="#00ff88" font-family="Orbitron, monospace" font-size="15">Log4OM — master log</text>
    <text x="320" y="218" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="11">one database, two configurations</text>
    <text x="320" y="238" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="10">shack (ON3VZ) &middot; portable (ON3VZ/P)</text>

    <!-- fan to 5 targets -->
    <defs>
      <marker id="onpArC" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#00d4ff"/></marker>
      <marker id="onpArG" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#00ff88"/></marker>
      <marker id="onpArA" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#f0a500"/></marker>
    </defs>
    <line x1="320" y1="262" x2="68" y2="340" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onpArG)"/>
    <line x1="320" y1="262" x2="194" y2="340" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onpArG)"/>
    <line x1="320" y1="262" x2="320" y2="340" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onpArG)"/>
    <line x1="320" y1="262" x2="446" y2="340" stroke="#00ff88" stroke-width="1.6" marker-end="url(#onpArG)"/>
    <line x1="320" y1="262" x2="572" y2="340" stroke="#f0a500" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#onpArA)"/>

    <rect x="12" y="342" width="112" height="86" rx="7" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="68" y="370" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="11">QRZ.com</text>
    <text x="68" y="388" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">ON3VZ/P</text>
    <text x="68" y="401" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">logbook</text>

    <rect x="138" y="342" width="112" height="86" rx="7" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="194" y="370" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="11">LoTW</text>
    <text x="194" y="388" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">own cert,</text>
    <text x="194" y="401" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">shared account</text>

    <rect x="264" y="342" width="112" height="86" rx="7" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="320" y="370" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="11">Club Log</text>
    <text x="320" y="388" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">linked to</text>
    <text x="320" y="401" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">ON3VZ</text>

    <rect x="390" y="342" width="112" height="86" rx="7" fill="#111d35" stroke="rgba(0,255,136,0.45)"/>
    <text x="446" y="370" text-anchor="middle" fill="#eaf3ec" font-family="Orbitron, monospace" font-size="11">QRZCQ</text>
    <text x="446" y="388" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">alias</text>
    <text x="446" y="401" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">callsign</text>

    <rect x="516" y="342" width="112" height="86" rx="7" fill="#111d35" stroke="rgba(240,165,0,0.5)" stroke-dasharray="4 3"/>
    <text x="572" y="366" text-anchor="middle" fill="#f0a500" font-family="Orbitron, monospace" font-size="10.5">WWFF</text>
    <text x="572" y="380" text-anchor="middle" fill="#f0a500" font-family="Orbitron, monospace" font-size="10.5">Logsearch</text>
    <text x="572" y="398" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">manual export</text>
    <text x="572" y="411" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="9">+ email</text>

    <!-- legend -->
    <line x1="20" y1="452" x2="52" y2="452" stroke="#00ff88" stroke-width="2"/>
    <text x="59" y="457" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="10">automatic upload</text>
    <line x1="200" y1="452" x2="232" y2="452" stroke="#f0a500" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="239" y="457" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="10">manual, via ONFF coordinator</text>
  </svg>
  <figcaption>Two sources, one master log, five destinations. Only the WWFF path is a manual step.</figcaption>
</figure>

The full breakdown of each platform's setup — and the horizontal version of
this diagram with every field explained — is in the
[technical manual](/on3vz-p-manual/), linked again at the bottom of this
post.

## WSJT-X, and a myth about /P in FT8

I'd assumed a compound call like ON3VZ/P would drop out of FT8's grid
field entirely — that turned out to be wrong. ON3VZ/P is a *type-2*
compound callsign, and WSJT-X's "Full call in Tx3" message generation
handles it as such: my CQ actually reads `CQ ON3VZ/P JO20`, grid and all.

What FT8 genuinely can't do is carry `5W QRP` inside the exchange — a
message is 77 bits, already spent on callsigns and a grid. That
information travels a different way: through the spot, not the signal.

The portable WSJT-X configuration mirrors Log4OM: My Call ON3VZ/P, grid
set per location, the QMX selected as rig, UDP forwarding into Log4OM so
a field QSO lands straight in the master log without a manual import
step. A separate configuration also means the Reporting tab needed a
second look — automatic logging in WSJT-X only fires with "Contesting
only" switched off, which is worth checking on the home configuration too.

## PoLo for the SSB sessions

For the sessions where the laptop stays home, I use **PoLo — Ham2K
Portable Logger** on an iPad and phone: operator/station call set the
same way as everywhere else, 5 W as the default power, offline data files
refreshed at home over wifi (there's no signal in most of these forests
to fetch them later), and the built-in "Hams of Note" file for
recognising other activators and volunteers on sight.

PoLo has no live link to Log4OM the way WSJT-X does — it exports ADIF,
and that file gets imported by hand afterwards. Multi-device sync between
phone and iPad exists (Ham2K Log Filer / "LoFi") but only for QSO data,
not settings, and it's young enough that I don't fully trust it yet for a
first activation; a manual ADIF export remains the dependable path.

## Spotting: the part that actually gets you worked

At 5 watts, nobody stumbles across you tuning across the band. Being
found *is* the strategy, and that happens through spotting, not through
signal strength.

WWFF runs its own service, **Spotline** (spots.wwff.co), released in
2025 — log in with your callsign, post frequency, mode, and a comment
carrying the reference and `5W QRP`. Registering the activation on the
WWFF agenda beforehand means Spotline can auto-populate spots during the
scheduled window, and once I'm operating CW, the Reverse Beacon Network
will spot me automatically without me touching a keyboard. There's also
a **smartWWFF** app for phone and tablet, and PoLo can spot directly to
Spotline and POTA. One rule worth knowing: a spot counts as a duplicate
at the same frequency (±1 kHz), same call and reference, within 10
minutes of the last one — re-clicking out of nerves does nothing.

## The gotcha that would have bitten me later

Here's the one mistake I'm glad I caught before it happened rather than
after: Log4OM's LoTW/TQSL link points at **one fixed Station Location**
per configuration — for me, "Roy vakantiehuis JO20qe". It doesn't read
the grid out of each QSO and pick the right location automatically.

<div class="onp-note">
<strong>That's harmless while every activation happens from Roy.</strong> It stops being harmless the day I drive out to an actual ONFF reference, log a session there, and upload without first switching that Station Location field — Log4OM would sign those QSOs with Roy's grid, and LoTW would carry the wrong location for every one of them. So that switch is now a fixed step in my post-activation routine, done before any upload, every time the location has changed.
</div>

## What's next

The KMZ file with all official ONFF reference boundaries is going onto
my phone and iPad, so I can confirm I'm actually inside a reference
before I ever key up. First real target: **ONFF-0599, Carrière de
l'Alouette**. And CW is the next mode to bring into the mix — between the
Reverse Beacon Network's automatic spotting and roughly two S-points of
QRP advantage over SSB, it's the natural next step for a 5-watt station.

Everything from this build is linked below: the full technical manual,
in English, and a printable field checklist in both English and Dutch.

<!-- ON3VZ/P downloads panel. Reversible: delete everything between
     ONP:DOWNLOADS:START and ONP:DOWNLOADS:END to remove this component. -->
<!-- ONP:DOWNLOADS:START -->
<div style="background:linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.04));border:1px solid rgba(0,255,136,0.22);border-radius:14px;padding:1.8rem;margin:2.5rem 0;">
  <div style="font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.2rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.5rem;">📎 Reference &amp; downloads</div>
  <div style="font-family:var(--f-display);font-size:1.15rem;font-weight:700;color:var(--c-text);margin-bottom:0.8rem;">The full manual, and a checklist for the field.</div>
  <p style="font-size:0.9rem;color:var(--c-text-2);margin:0 0 1.4rem;">The manual is the complete step-by-step reference behind this build — QRZ, LoTW, Club Log, QRZCQ, Log4OM, WSJT-X and PoLo, spelled out platform by platform. The checklist is the condensed, printable version to fold into the antenna bag.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:0.8rem;">
    <a href="/on3vz-p-manual/" style="display:block;background:var(--c-surface);border:1px solid var(--c-border-hard);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">Reference page</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-primary);">Technical manual →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Every platform, step by step</div>
    </a>
    <a href="/assets/files/on3vz-p-field-checklist-en.pdf" style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">PDF · English</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-cyan);">Field checklist (EN) →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Printable, WWFF / ONFF</div>
    </a>
    <a href="/assets/files/on3vz-p-veldchecklist-nl.pdf" style="display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;">
      <div style="font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;">PDF · Nederlands</div>
      <div style="font-family:var(--f-display);font-size:0.9rem;font-weight:700;color:var(--c-cyan);">Veldchecklist (NL) →</div>
      <div style="font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;">Printbaar, WWFF / ONFF</div>
    </a>
  </div>
</div>
<!-- ONP:DOWNLOADS:END -->

There is something appealing about the fact that a licence, a 5-watt
radio and a wire in a tree can get you into a hobby with this many moving
parts, and that all of them turned out to be figure-out-able. More once
the log has an activation in it.

*73 and 44 de ON3VZ/P*
