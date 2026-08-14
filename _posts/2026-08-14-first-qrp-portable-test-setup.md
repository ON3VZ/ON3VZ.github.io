---
layout: post
title: "First QRP Portable Test Setup: 5 Watts, a QMX and a Band Hopper IV in a Field"
tags: ['Portable', 'QRP', 'QMX', 'Antennas', 'Power', 'Beginners']
---

<style>
.qrp-hero{background:linear-gradient(135deg,rgba(0,255,136,0.07) 0%,rgba(0,212,255,0.05) 100%);border:1px solid var(--c-border-hard);border-radius:12px;padding:1.6rem 1.8rem;margin:0 0 2.5rem;}
.qrp-hero__kicker{font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.6rem;}
.qrp-hero__title{font-family:var(--f-display);font-size:1.35rem;font-weight:700;color:var(--c-primary);text-shadow:var(--glow-sm);margin-bottom:0.8rem;}
.qrp-specs{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.9rem;margin-top:1.2rem;}
.qrp-spec{background:var(--c-surface);border:1px solid var(--c-border);border-radius:8px;padding:0.8rem 0.9rem;}
.qrp-spec__k{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.14rem;text-transform:uppercase;color:var(--c-text-3);}
.qrp-spec__v{font-family:var(--f-display);font-size:1.05rem;color:var(--c-cyan);margin-top:0.25rem;}
.qrp-note{border-left:3px solid var(--c-amber);background:rgba(240,165,0,0.06);padding:1rem 1.2rem;border-radius:0 8px 8px 0;margin:1.8rem 0;}
.qrp-note strong{color:var(--c-amber);}
.qrp-warn{border-left:3px solid var(--c-red);background:rgba(255,68,102,0.06);padding:1rem 1.2rem;border-radius:0 8px 8px 0;margin:1.8rem 0;}
.qrp-warn strong{color:var(--c-red);}
.qrp-fig{margin:2rem 0;}
.qrp-fig figcaption{font-family:var(--f-mono);font-size:0.68rem;letter-spacing:0.08rem;color:var(--c-text-3);margin-top:0.6rem;text-align:center;}
.qrp-video{width:100%;max-width:100%;border-radius:12px;border:1px solid var(--c-border);display:block;}
.qrp-table-wrap{overflow-x:auto;}
.qrp-check{list-style:none;padding-left:0;}
.qrp-check li{position:relative;padding-left:1.8rem;margin-bottom:0.7rem;}
.qrp-check li::before{content:'\25A0';position:absolute;left:0;top:0;color:var(--c-primary);font-size:0.7rem;}
</style>

<div class="qrp-hero">
  <div class="qrp-hero__kicker">ON3VZ // Portable trial // JO21EE</div>
  <div class="qrp-hero__title">A complete HF station that fits in a backpack</div>
  <p style="color:var(--c-text-2);margin:0;">This was the first proper dry run of my portable setup: a QRP Labs QMX running 5 watts, a SOTAbeams Band Hopper IV linked dipole on a 7 metre mast, and an external LiTime battery feeding the radio through a buck converter that keeps everything safely under 12 volts. No contacts logged yet, this was purely about building it, powering it, and seeing whether the whole chain behaves.</p>
  <div class="qrp-specs">
    <div class="qrp-spec"><div class="qrp-spec__k">Transceiver</div><div class="qrp-spec__v">QMX</div></div>
    <div class="qrp-spec"><div class="qrp-spec__k">Output</div><div class="qrp-spec__v">5 W</div></div>
    <div class="qrp-spec"><div class="qrp-spec__k">Supply</div><div class="qrp-spec__v">11.50 V</div></div>
    <div class="qrp-spec"><div class="qrp-spec__k">Antenna</div><div class="qrp-spec__v">80/40/30/20</div></div>
  </div>
</div>

## Why QRP, and why now

My home station is an IC-7300 MkII into a vertical, and as a Belgian Class C operator I am allowed 25 watts on HF. That is already modest by most standards. So the obvious question is: why deliberately drop to 5 watts?

Two reasons. First, portable operating is where I want to spend my summer evenings, and 5 watts means a tiny radio, a small battery, and a pack that I can carry on a bike or on foot without thinking about it. Second, QRP is a brilliant teacher. With 5 watts there is nowhere to hide. Antenna height, feedline losses, common mode current, band choice and propagation all show up immediately in your results. If something in the chain is mediocre, you will know.

This post documents the build itself. The on-air results come later.

## The station schematic

Before the individual parts, here is the whole thing as one drawing. Three signal types run through this station and it helps to keep them separate in your head: DC power in amber, RF in green, and audio and data in cyan.

<figure class="qrp-fig">
  <svg viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:#0d1428;border:1px solid rgba(0,255,136,0.10);border-radius:12px;">
    <defs>
      <marker id="arA" markerWidth="10" markerHeight="10" refX="8" refY="3.2" orient="auto"><path d="M0,0 L8,3.2 L0,6.4 Z" fill="#f0a500"/></marker>
      <marker id="arG" markerWidth="10" markerHeight="10" refX="8" refY="3.2" orient="auto"><path d="M0,0 L8,3.2 L0,6.4 Z" fill="#00ff88"/></marker>
      <marker id="arC" markerWidth="10" markerHeight="10" refX="8" refY="3.2" orient="auto"><path d="M0,0 L8,3.2 L0,6.4 Z" fill="#00d4ff"/></marker>
    </defs>

    <text x="30" y="34" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="13" letter-spacing="2">ON3VZ PORTABLE STATION / BLOCK SCHEMATIC</text>

    <!-- battery -->
    <rect x="30" y="70" width="230" height="96" rx="8" fill="#111d35" stroke="rgba(240,165,0,0.5)"/>
    <text x="145" y="98" text-anchor="middle" fill="#f0a500" font-family="Orbitron, monospace" font-size="14">LiTime 12 V 20 Ah</text>
    <text x="145" y="119" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">LiFePO4</text>
    <rect x="62" y="128" width="166" height="26" rx="4" fill="none" stroke="rgba(240,165,0,0.4)" stroke-dasharray="4 3"/>
    <text x="145" y="146" text-anchor="middle" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="11">internal BMS  |  13.2 V full</text>

    <!-- battery to buck -->
    <line x1="262" y1="118" x2="326" y2="118" stroke="#f0a500" stroke-width="2.5" marker-end="url(#arA)"/>
    <text x="294" y="106" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">PP</text>

    <!-- buck -->
    <rect x="330" y="70" width="230" height="96" rx="8" fill="#111d35" stroke="rgba(240,165,0,0.5)"/>
    <text x="445" y="98" text-anchor="middle" fill="#f0a500" font-family="Orbitron, monospace" font-size="14">DC-DC buck</text>
    <text x="445" y="119" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">adjustable, V / A / W display</text>
    <text x="445" y="146" text-anchor="middle" fill="#00ff88" font-family="Share Tech Mono, monospace" font-size="13">OUT = 11.50 V</text>

    <!-- buck down to qmx -->
    <line x1="445" y1="168" x2="445" y2="264" stroke="#f0a500" stroke-width="2.5" marker-end="url(#arA)"/>
    <text x="458" y="205" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">PP</text>
    <text x="458" y="222" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">2.1 mm barrel</text>

    <!-- qmx -->
    <rect x="330" y="268" width="230" height="112" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.55)"/>
    <text x="445" y="298" text-anchor="middle" fill="#00ff88" font-family="Orbitron, monospace" font-size="16">QRP Labs QMX</text>
    <text x="445" y="322" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">80 / 60 / 40 / 30 / 20 m</text>
    <text x="445" y="342" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">CW / Digi / SSB, 5 W</text>
    <text x="445" y="366" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">supply range 6.0 to 12.0 V</text>

    <!-- laptop -->
    <rect x="30" y="272" width="250" height="96" rx="8" fill="#111d35" stroke="rgba(0,212,255,0.5)"/>
    <text x="155" y="300" text-anchor="middle" fill="#00d4ff" font-family="Orbitron, monospace" font-size="14">Laptop</text>
    <text x="155" y="321" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">WSJT-X for FT8</text>
    <text x="155" y="341" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">logging + CAT control</text>
    <text x="155" y="360" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">sound card is inside the QMX</text>
    <line x1="282" y1="320" x2="326" y2="320" stroke="#00d4ff" stroke-width="2.5" marker-end="url(#arC)"/>
    <text x="304" y="308" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">USB-C</text>

    <!-- mic -->
    <rect x="330" y="444" width="230" height="86" rx="8" fill="#111d35" stroke="rgba(0,212,255,0.5)"/>
    <text x="445" y="472" text-anchor="middle" fill="#00d4ff" font-family="Orbitron, monospace" font-size="14">G7UFO Turret mic</text>
    <text x="445" y="493" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">electret + PTT, 20 g</text>
    <text x="445" y="513" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">for SSB only</text>
    <line x1="445" y1="442" x2="445" y2="386" stroke="#00d4ff" stroke-width="2.5" marker-end="url(#arC)"/>
    <text x="458" y="418" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">3.5 mm</text>

    <!-- ferrite -->
    <rect x="630" y="284" width="240" height="86" rx="8" fill="#111d35" stroke="rgba(240,165,0,0.5)"/>
    <text x="750" y="312" text-anchor="middle" fill="#f0a500" font-family="Orbitron, monospace" font-size="14">Clip-on ferrites</text>
    <text x="750" y="333" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">coax wound through, 4 to 5 turns</text>
    <text x="750" y="353" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">common mode choke</text>
    <line x1="562" y1="327" x2="626" y2="327" stroke="#00ff88" stroke-width="2.5" marker-end="url(#arG)"/>
    <text x="594" y="315" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">BNC</text>

    <!-- feeder up to antenna centre -->
    <line x1="750" y1="282" x2="750" y2="192" stroke="#00ff88" stroke-width="2.5" marker-end="url(#arG)"/>
    <text x="763" y="230" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">RG174</text>
    <text x="763" y="247" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">10 m</text>

    <!-- antenna centre -->
    <rect x="630" y="96" width="240" height="96" rx="8" fill="#111d35" stroke="rgba(0,255,136,0.55)"/>
    <text x="750" y="124" text-anchor="middle" fill="#00ff88" font-family="Orbitron, monospace" font-size="14">Band Hopper IV</text>
    <text x="750" y="145" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">centre + ferrite 1:1 balun</text>
    <text x="750" y="165" text-anchor="middle" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">linked dipole 80/40/30/20</text>
    <text x="750" y="184" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">on Tactical 7000hds, approx 6 m</text>

    <!-- inverted V glyph -->
    <line x1="750" y1="94" x2="660" y2="52" stroke="#00ff88" stroke-width="2"/>
    <line x1="750" y1="94" x2="840" y2="52" stroke="#00ff88" stroke-width="2"/>
    <circle cx="750" cy="94" r="4" fill="#00ff88"/>
    <text x="750" y="44" text-anchor="middle" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">inverted V</text>

    <!-- legend -->
    <line x1="30" y1="576" x2="70" y2="576" stroke="#f0a500" stroke-width="2.5"/>
    <text x="78" y="581" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">DC power</text>
    <line x1="190" y1="576" x2="230" y2="576" stroke="#00ff88" stroke-width="2.5"/>
    <text x="238" y="581" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">RF</text>
    <line x1="300" y1="576" x2="340" y2="576" stroke="#00d4ff" stroke-width="2.5"/>
    <text x="348" y="581" fill="#b0c4d8" font-family="Share Tech Mono, monospace" font-size="12">audio and data</text>
    <text x="560" y="581" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="12">PP = Anderson Powerpole</text>
  </svg>
  <figcaption>The complete portable station. Battery and BMS, regulation, transceiver, control and audio, feedline choke and antenna.</figcaption>
</figure>

Worth pointing out: there is no external sound card and no separate CAT interface. The QMX contains a 24-bit USB sound card and a virtual COM port, so a single USB-C cable carries audio in both directions plus rig control. For FT8 that is the whole interface.

## The radio: QRP Labs QMX

The [QMX](https://qrp-labs.com/qmx.html) is a five band (80, 60, 40, 30 and 20 m) multimode transceiver from QRP Labs. It is an embedded SDR in a box about the size of a pack of cards, weighing 220 grams including the enclosure, and it does CW, digital modes and SSB.

<figure class="qrp-fig">
  <img src="/assets/images/qrp-portable-qmx-closeup.jpg" alt="QRP Labs QMX transceiver in the field, tuned to 14.200 MHz, with coax and clip-on ferrites">
  <figcaption>QMX on 14.200 MHz, with the RG174 feedline and the extra clip-on ferrites just visible on the right</figcaption>
</figure>

A few things that make it a natural fit for portable work:

- Very low receive current, around 80 mA. My bench meter showed 0.09 A at 11.50 V, so roughly one watt of total consumption while listening.
- Built in SWR bridge, so I can check the antenna without carrying an extra meter.
- USB-C for CAT control and audio, which will matter once I start logging and running digital modes from a laptop or tablet.
- Solid state transmit and receive switching, so break-in CW is clean and silent.

For SSB I added a **G7UFO Turret Mini Microphone**, a compact assembled mic built around the same electret element that QRP Labs recommends for the QMX SSB firmware. It weighs about 20 grams and disappears into a pocket of the bag. For a radio this small, a full sized hand microphone would look faintly ridiculous.

## The part I care most about: staying under 12 volts

This is the detail I want any other new QMX owner to read carefully, because it is the easiest way to destroy the radio.

The QMX specification is a supply range of 6.0 to 12.0 volts. Not "around 12". The final amplifier transistors are the limit, and pushing more voltage into them mostly buys you heat and risk. A nominal 12 volt LiFePO4 pack is exactly the trap here: mine sits comfortably above 13 volts when it is freshly charged, which is well outside the safe window.

So the battery never touches the radio directly. In between sits an adjustable DC-DC buck converter with a display, set to **11.50 volts**. That number is not arbitrary: it matches the default value of the QMX firmware's own "Max PA voltage" protection setting, which was added specifically to protect the finals from exactly this mistake.

<div class="qrp-note">
<strong>Rule of thumb:</strong> if your battery is a 12 V LiFePO4, treat it as a 13 V battery and regulate it down. The buck converter costs about 25 euros. The transceiver does not.
</div>

The BMS inside the LiTime pack is worth a word too, because it is easy to assume it does more than it does. The BMS protects the *battery*: it cuts off on over-discharge, over-charge, over-current and temperature. It does nothing at all to protect your radio from the pack's normal working voltage. Regulation down to 11.50 V is a separate job, and that is the converter's job.

## Powerpole everywhere

Every DC connection in this station is an Anderson Powerpole. Battery to converter, converter to radio, and the spare tails for accessories. It is a small standardisation decision that pays off constantly:

- Nothing can be connected the wrong way round.
- Any part of the chain can be swapped in the field without tools.
- The club and the wider hobby use the same standard, so borrowing or lending a power lead just works.

Building a portable station is the perfect moment to make that choice, before you have accumulated a drawer full of incompatible barrel plugs.

## The antenna: SOTAbeams Band Hopper IV

The [Band Hopper IV](https://www.sotabeams.co.uk/band-hopper-iv-four-band-20m-30m-40m-80m-portable-dipole-antenna-system/) is a linked dipole covering 20, 30, 40 and 80 metres. It is not a loaded compromise antenna: on each band you get a genuine full size half wave dipole, and there is no lossy matching network, so the power goes into the wire instead of into a coil.

The whole thing is about 48 metres end to end on 80 m, comes pre-tuned, includes a ferrite core current balun in the centrepiece, and ships with a 10 metre RG174 feeder terminated in BNC, three wire winders, a back guy and pegs. The package weighs well under half a kilogram. It is rated for 125 watts, which for a 5 watt radio is a comfortable margin of about 14 dB.

<figure class="qrp-fig">
  <img src="/assets/images/qrp-portable-mast-bandhopper.jpg" alt="Tactical 7000hds mast erected in a field, supporting the Band Hopper IV linked dipole">
  <figcaption>Band Hopper IV up on the Tactical 7000hds, strapped to a fence post with the back guy taking the strain</figcaption>
</figure>

### How the links actually work

A linked dipole is a dipole cut for the highest band, with extra wire sections added on for each lower band. Between the sections sit small insulators with crocodile clips: the links. Close a link and the next section is electrically joined on, making the antenna longer and moving it down in frequency. Open it and everything beyond that point is disconnected and simply hangs, or gets wound back on its wire winder.

<figure class="qrp-fig">
  <svg viewBox="0 0 900 430" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:#0d1428;border:1px solid rgba(0,255,136,0.10);border-radius:12px;">
    <text x="30" y="32" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="13" letter-spacing="2">BAND HOPPER IV / LINK POSITIONS (INVERTED V)</text>

    <!-- ground -->
    <line x1="20" y1="372" x2="880" y2="372" stroke="#7a96b0" stroke-width="1.5"/>
    <g stroke="#7a96b0" stroke-width="1" opacity="0.5">
      <line x1="40" y1="372" x2="26" y2="386"/><line x1="100" y1="372" x2="86" y2="386"/>
      <line x1="160" y1="372" x2="146" y2="386"/><line x1="220" y1="372" x2="206" y2="386"/>
      <line x1="280" y1="372" x2="266" y2="386"/><line x1="340" y1="372" x2="326" y2="386"/>
      <line x1="400" y1="372" x2="386" y2="386"/><line x1="460" y1="372" x2="446" y2="386"/>
      <line x1="520" y1="372" x2="506" y2="386"/><line x1="580" y1="372" x2="566" y2="386"/>
      <line x1="640" y1="372" x2="626" y2="386"/><line x1="700" y1="372" x2="686" y2="386"/>
      <line x1="760" y1="372" x2="746" y2="386"/><line x1="820" y1="372" x2="806" y2="386"/>
    </g>

    <!-- mast -->
    <line x1="450" y1="372" x2="450" y2="86" stroke="#b0c4d8" stroke-width="4"/>
    <text x="466" y="300" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="12">Tactical 7000hds</text>
    <text x="466" y="318" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="12">7 m mast</text>

    <!-- centre -->
    <circle cx="450" cy="86" r="7" fill="#00ff88"/>
    <text x="450" y="66" text-anchor="middle" fill="#00ff88" font-family="Orbitron, monospace" font-size="13">centre + balun</text>

    <!-- legs -->
    <line x1="450" y1="86" x2="70" y2="330" stroke="#00ff88" stroke-width="2.5"/>
    <line x1="450" y1="86" x2="830" y2="330" stroke="#00ff88" stroke-width="2.5"/>

    <!-- feeder -->
    <line x1="450" y1="93" x2="380" y2="372" stroke="#00d4ff" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="300" y="352" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="12">RG174 to radio</text>

    <!-- link markers left leg: t=0.25,0.45,0.66,0.87 -->
    <circle cx="355" cy="147" r="6" fill="#0d1428" stroke="#f0a500" stroke-width="2.5"/>
    <text x="349" y="136" text-anchor="end" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="12">L1</text>
    <circle cx="279" cy="196" r="6" fill="#0d1428" stroke="#f0a500" stroke-width="2.5"/>
    <text x="273" y="185" text-anchor="end" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="12">L2</text>
    <circle cx="199" cy="247" r="6" fill="#0d1428" stroke="#f0a500" stroke-width="2.5"/>
    <text x="193" y="236" text-anchor="end" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="12">L3</text>
    <circle cx="119" cy="299" r="6" fill="#0d1428" stroke="#00d4ff" stroke-width="2.5"/>
    <text x="113" y="288" text-anchor="end" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="12">L4</text>

    <!-- link markers right leg -->
    <circle cx="545" cy="147" r="6" fill="#0d1428" stroke="#f0a500" stroke-width="2.5"/>
    <text x="551" y="136" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="12">L1</text>
    <circle cx="621" cy="196" r="6" fill="#0d1428" stroke="#f0a500" stroke-width="2.5"/>
    <text x="627" y="185" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="12">L2</text>
    <circle cx="701" cy="247" r="6" fill="#0d1428" stroke="#f0a500" stroke-width="2.5"/>
    <text x="707" y="236" fill="#f0a500" font-family="Share Tech Mono, monospace" font-size="12">L3</text>
    <circle cx="781" cy="299" r="6" fill="#0d1428" stroke="#00d4ff" stroke-width="2.5"/>
    <text x="787" y="288" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="12">L4</text>

    <!-- section labels along right leg -->
    <text x="500" y="130" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">20 m</text>
    <text x="580" y="180" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">+30 m</text>
    <text x="660" y="231" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">+40 m</text>
    <text x="740" y="282" fill="#7a96b0" font-family="Share Tech Mono, monospace" font-size="11">+80 m</text>
    <text x="800" y="345" fill="#00d4ff" font-family="Share Tech Mono, monospace" font-size="11">trim</text>

    <text x="450" y="412" text-anchor="middle" fill="#ff4466" font-family="Share Tech Mono, monospace" font-size="13">SYMMETRY RULE: the same links closed on BOTH legs, always</text>
  </svg>
  <figcaption>Link positions on both legs. L1 to L3 select the band, L4 is the 80 m trimming link.</figcaption>
</figure>

### Which links closed for which band

<div class="qrp-table-wrap" markdown="1">

| Band | L1 (nearest centre) | L2 | L3 | L4 (80 m trim) |
|------|--------------------|----|----|----------------|
| 20 m | open | open | open | no effect |
| 30 m | closed | open | open | no effect |
| 40 m | closed | closed | open | no effect |
| 80 m | closed | closed | closed | sets where in the band you are |

</div>

The logic is simple once you see it: to go one band lower, you close one more link, working outwards from the centre. The highest band uses the shortest wire, so all links open. The lowest band uses everything, so all links closed.

**And the extra 80 m link at the far end?** That one is not a band selector at all. The Band Hopper IV covers 3.5 to 3.7 MHz with a 1.5:1 SWR bandwidth using the SOTAbeams "Hopper Jump" arrangement, and that last link is the trimming mechanism: it moves the resonance within 80 m rather than to another band. So it decides whether you are best matched near the CW end or nearer the SSB end, and on 20, 30 and 40 m it does nothing whatsoever, because it sits beyond an open link and is electrically disconnected from the antenna.

<div class="qrp-note">
<strong>To verify on my own antenna:</strong> which position of the 80 m trim link puts me where. The SOTAbeams instruction sheet has a dedicated diagram for it (the section headed "Frequency trimming, 80 m versions only"), and the QMX has a built in SWR sweep. I intend to sweep both positions and write the answer on a card that lives in the antenna bag, rather than working it out again in the dark every time.
</div>

## Points to watch when setting up

These are the things I want to have internalised before I care about contacts. Most of them are the kind of mistake that costs you an hour in a field.

<ul class="qrp-check">
<li><strong>The same links closed on both legs.</strong> This is the number one error with linked dipoles. Two closed on the left and one closed on the right is not a 40 m antenna, it is an off centre fed wire with a bad SWR and a lot of current on the outside of your coax. Count them, out loud, on both sides.</li>
<li><strong>Walk one leg, then the other, then check again.</strong> Change bands on one side, walk to the other end, change it, then walk back past the first one to confirm. It takes two minutes and it removes all doubt.</li>
<li><strong>Check the clips are biting wire, not insulation.</strong> A crocodile clip that looks closed but is gripping the plastic gives you an intermittent antenna. Reviews of these antennas also mention the clips corroding over time, so a quick clean of the contact surfaces belongs in the maintenance routine.</li>
<li><strong>Keep the ends up and out of reach.</strong> The ends of a dipole are the high voltage points. It is only 5 watts, but the ends should still be above head height, clear of vegetation and out of the way of anyone walking past. Wet grass touching the ends will also pull your resonance around.</li>
<li><strong>Tension both legs equally.</strong> On this setup the two dipole legs are also two of the three guys for the mast. Uneven tension bends the mast and makes the pattern asymmetric.</li>
<li><strong>The centre slides to the right height.</strong> The centrepiece belongs at the junction between the top sections, not right at the tip. The thin top section will not hold the weight, and the antenna does not work properly if it is too high on a tapered pole.</li>
<li><strong>Sweep the SWR after every band change, before transmitting.</strong> The QMX has the tool built in. It takes ten seconds and it catches an open link, a bad clip or a leg that has fallen into a bush.</li>
<li><strong>Space check before you commit.</strong> 80 m is roughly 48 metres end to end. Choose the site with the lowest band you intend to use in mind, not the highest.</li>
</ul>

## Points to watch with the transceiver

<ul class="qrp-check">
<li><strong>Supply voltage, every single time.</strong> 6.0 to 12.0 V. Confirm the converter output on its own display before plugging into the radio, and check that the QMX "Max PA voltage" protection setting is where you expect it. Enable the battery voltage indicator on the LCD so the supply is visible while operating.</li>
<li><strong>Never transmit without an antenna or dummy load.</strong> The QMX has SWR protection, and it works, but designing your routine around a safety net is how safety nets get tested.</li>
<li><strong>Band configuration must match your hardware version.</strong> The QMX exists in several band variants. If the firmware band configuration does not match the filters actually fitted, output and receive sensitivity will be wrong on some bands. Mine is the 80 to 20 m version, which pairs neatly with the Band Hopper IV.</li>
<li><strong>Keep the firmware current.</strong> The PA voltage protection, the SWR tools and much of the SSB behaviour arrived in firmware updates. Update at home over USB, not in a field.</li>
<li><strong>Do not swap antennas or bands while keyed.</strong> Obvious, easy to do by accident when the radio is on the ground and you are holding a mic.</li>
<li><strong>Duty cycle and heat.</strong> Digital modes transmit at full power for the whole slot. A small aluminium box in direct sunlight running FT8 back to back gets warm. Keep it shaded and give it gaps.</li>
<li><strong>Watch the USB side.</strong> A laptop connected by USB shares a ground with the radio, and that connection can carry RF back into the audio chain. Short cable, ferrites on the coax, and if strange things happen on transmit, suspect common mode before you suspect the software.</li>
<li><strong>Set the microphone level deliberately.</strong> The QMX has mic gain, equalisation and compression settings for SSB. Too much gain on a 5 watt signal makes you harder to copy, not louder. Set it once, at home, and leave it.</li>
<li><strong>Use practice mode for testing.</strong> The QMX can go through the motions without radiating, which is exactly what you want while learning the menus.</li>
</ul>

## Extra ferrites on the feedline

The Band Hopper already has a proper ferrite core balun at the feedpoint, so this is belt and braces rather than a fix for a known problem. I added clip-on ferrite cores at the radio end of the RG174, with the thin coax wound through each core several times.

The reason is common mode current: RF flowing back along the outside of the coax braid instead of staying in the antenna. On a portable setup that shows up as extra received noise, RF finding its way into the radio or the laptop, and an antenna pattern that includes your feedline. The thin RG174 is a gift here, because it will take several turns through a small snap-on core where thicker coax would only manage one pass. More turns means much more choking impedance.

Is it strictly necessary? Probably not with the built in balun. Does it cost about 10 euros and 30 grams? Yes. On a station where every dB matters, that trade is easy.

## Labelling: the boring thing that saves the day

This deserves its own heading, because in a field, at dusk, with cold hands, memory is not a reliable band selector.

- **Label every link with its band.** A small piece of tape or a printed heatshrink sleeve on each insulator: L1, L2, L3 and the band it enables. Ideally colour code them so left and right match at a glance.
- **Label both ends of the coax** and the antenna bag itself, so the right feeder ends up with the right antenna.
- **Label the Powerpole leads**: battery side, converter input, converter output. Write "11.5 V MAX" on the converter output lead. That single label is the cheapest insurance policy in the whole station.
- **Put a card in the bag.** A laminated card with the band and link table, the trim link answer once I have measured it, and the start up order: check converter output, connect radio, check SWR, then transmit.

Everything on that list costs a few minutes at the kitchen table and prevents the kind of error that only reveals itself as a mysterious high SWR when you are already set up.

## First power up in the field

<figure class="qrp-fig">
  <video class="qrp-video" controls preload="metadata" poster="/assets/video/qrp-portable-first-setup-poster.jpg">
    <source src="/assets/video/qrp-portable-first-setup.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Listening on 7.140 MHz. Audio through a small Bluetooth speaker, which beats squinting at a tiny speaker in the wind.</figcaption>
</figure>

<figure class="qrp-fig">
  <img src="/assets/images/qrp-portable-station-overview.jpg" alt="Complete portable station: LiTime battery, buck converter showing 11.50 V, QMX transceiver and Bluetooth speaker">
  <figcaption>The whole station laid out. Battery, converter at 11.50 V, QMX, and a speaker for comfortable listening.</figcaption>
</figure>

Everything did what it was supposed to. The converter held 11.50 volts, the QMX drew about 90 mA on receive, the noise floor out in the field was dramatically lower than at home, and 40 metres was full of signals in the late afternoon. I tuned around on 20 m and 40 m for a while, listened to how the band sounded through the small speaker, and mostly grinned at the fact that this entire station fits in one bag.

## What it costs, roughly

<div class="qrp-warn">
<strong>Read these as orders of magnitude only.</strong> They are rounded, they are converted between currencies, and they exclude shipping, VAT and import charges, which on UK and non-EU suppliers are not trivial. If you are planning a build, check the current prices at the source yourself.
</div>

<div class="qrp-table-wrap" markdown="1">

| Item | Order of magnitude |
|------|--------------------|
| QRP Labs QMX, assembled, with enclosure | ~ 175 EUR |
| SOTAbeams Band Hopper IV | ~ 80 EUR |
| SOTAbeams Tactical 7000hds mast | ~ 75 EUR |
| LiTime 12 V 20 Ah LiFePO4 | ~ 60 EUR |
| G7UFO Turret Mini Microphone | ~ 30 EUR |
| Anderson Powerpole set and crimp tool | ~ 30 EUR |
| DC-DC buck converter | ~ 25 EUR |
| Bluetooth speaker (optional) | ~ 25 EUR |
| Clip-on ferrite cores | ~ 10 EUR |
| **Total** | **roughly 500 EUR** |

</div>

Two observations on that number. First, the QMX is noticeably cheaper as a kit than assembled, so a builder can shave a good chunk off and learn a lot in the process. Second, roughly a third of the total is antenna and mast, and that is money well spent. A better radio behind a poor antenna is a bad trade, especially at 5 watts.

## Weight and pack size

The numbers that actually decide whether a station gets used:

| Item | Weight |
|------|--------|
| QMX including enclosure | 220 g |
| Band Hopper IV complete | under 475 g |
| Microphone | 20 g |
| Battery, converter, cabling | the bulk of it |

The radio, antenna and microphone together come in at well under a kilogram. The battery dominates, and that is the obvious place to optimise later: a smaller LiFePO4 pack or a USB-PD power bank with a 12 volt trigger cable would cut the load significantly, since a 5 watt radio drawing under a fifth of an amp on receive does not need 20 Ah to fill an afternoon.

## What comes next

This was a build and shakedown, nothing more. No QSOs were logged, deliberately. The next steps are already lined up:

1. **First portable contacts.** Getting the callsign out on 40 m and 20 m and finding out what 5 watts into an inverted V actually achieves from JO21EE.
2. **Making the range visible.** Every contact goes into the logbook on this site, and the map with its great circle arcs will show exactly how far this station reaches. I am genuinely curious how the QRP arcs compare with the 25 watt home station arcs.
3. **A logging setup for portable.** I am currently configuring logging software specifically for the portable configuration, separate from the home station setup, with the right station data so nothing needs cleaning up afterwards. More on that in a later post.
4. **Measuring the 80 m trim link** and writing the result on the card in the antenna bag.

There is something appealing about the fact that this is roughly how amateur radio started: a wire between two supports, a small box, and a battery. Everything else is refinement.

More soon, once the log has some entries in it.

73 de ON3VZ
