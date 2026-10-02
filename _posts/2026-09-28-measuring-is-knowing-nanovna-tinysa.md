---
layout: post
title: "Measuring is Knowing: the NanoVNA-H4 and tinySA for New Radio Amateurs"
tags: ['Measurement', 'NanoVNA', 'tinySA', 'Antennas', 'SWR', 'Smith Chart', 'Beginners']
excerpt: "A complete beginner's guide to the NanoVNA-H4 and the tinySA: safety, calibration, reading SWR, return loss and the Smith chart, a band-by-band SWR sweep plan, harmonics and chokes. With 55 annotated figures and downloadable PDFs in English and Dutch."
---
<!-- MEASURING-IS-KNOWING 2026-09-28: new post. Revert by deleting this file, assets/images/measuring-is-knowing/ and the four PDFs in assets/files/. -->
<style>
/* MEASURING-IS-KNOWING 2026-09-28: scoped styles for this post only. Remove this block together with the post to revert. */
.mk-hero{background:linear-gradient(135deg,rgba(0,255,136,0.07) 0%,rgba(0,212,255,0.05) 100%);border:1px solid var(--c-border-hard);border-radius:12px;padding:1.6rem 1.8rem;margin:0 0 2rem;}
.mk-hero__kicker{font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.6rem;}
.mk-hero__title{font-family:var(--f-display);font-size:1.35rem;font-weight:700;color:var(--c-primary);text-shadow:var(--glow-sm);margin-bottom:0.8rem;}
.mk-specs{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.9rem;margin-top:1.2rem;}
.mk-spec{background:var(--c-surface);border:1px solid var(--c-border);border-radius:8px;padding:0.8rem 0.9rem;}
.mk-spec__k{font-family:var(--f-mono);font-size:0.58rem;letter-spacing:0.14rem;text-transform:uppercase;color:var(--c-text-3);}
.mk-spec__v{font-family:var(--f-display);font-size:0.95rem;color:var(--c-cyan);margin-top:0.25rem;}
.mk-continuity{font-family:var(--f-mono);font-size:0.78rem;color:var(--c-text-3);border-left:2px solid var(--c-border-hard);padding-left:0.9rem;margin:0 0 2.4rem;}
.mk-continuity a{color:var(--c-cyan);}
.mk-toc{background:var(--c-surface);border:1px solid var(--c-border);border-radius:12px;padding:1.2rem 1.4rem;margin:2rem 0 2.6rem;}
.mk-toc__k{font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.2rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.7rem;}
.mk-toc ol{margin:0;padding-left:1.3rem;columns:2 260px;column-gap:2rem;}
.mk-toc li{margin:0.25rem 0;font-size:0.88rem;break-inside:avoid;}
.mk-toc a{color:var(--c-text);}
.mk-toc a:hover{color:var(--c-primary);}
.mk-toc .mk-toc__phase{font-family:var(--f-mono);font-size:0.62rem;color:var(--c-amber);letter-spacing:0.08rem;margin-left:0.35rem;}
.post-body{counter-reset:mkfig;}
.post-body h2{margin-top:3.2rem;padding-top:1rem;border-top:1px solid var(--c-border);}
.post-body h3{margin-top:2.2rem;color:var(--c-cyan);font-size:1.02rem;}
.post-body h4{margin-top:1.6rem;color:var(--c-text);font-family:var(--f-mono);letter-spacing:0.06rem;font-size:0.9rem;text-transform:uppercase;}
.post-body table{table-layout:auto;width:100%;margin:1.2rem 0 1.8rem;font-size:0.86rem;}
.post-body strong{color:var(--c-text);font-weight:600;}
@media (max-width:700px){.post-body table{display:block;overflow-x:auto;} .post-body table:has(th:nth-child(3)) td,.post-body table:has(th:nth-child(3)) th{min-width:7.5rem;}}
.post-body kbd{font-family:var(--f-mono);font-size:0.8em;background:var(--c-surface-2);border:1px solid var(--c-border-hard);border-radius:4px;padding:0.08rem 0.4rem;color:var(--c-primary);white-space:nowrap;}
.mk-fig{margin:1.8rem 0;counter-increment:mkfig;}
.mk-fig img{width:100%;height:auto;border-radius:10px;border:1px solid var(--c-border);display:block;background:#fff;}
.mk-fig figcaption{font-family:var(--f-mono);font-size:0.7rem;letter-spacing:0.05rem;color:var(--c-text-3);margin-top:0.6rem;text-align:center;}
.mk-fig figcaption::before{content:"Figure " counter(mkfig) " \00B7  ";color:var(--c-primary);}
.mk-fig--narrow{max-width:520px;margin-left:auto;margin-right:auto;}
.mk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin:1.8rem 0;}
.mk-grid .mk-fig{margin:0;}
.mk-callout{border-radius:0 10px 10px 0;padding:0.95rem 1.2rem;margin:1.6rem 0;font-size:0.92rem;}
.mk-callout p{margin:0.35rem 0;}
.mk-callout__k{font-family:var(--f-mono);font-size:0.62rem;letter-spacing:0.18rem;text-transform:uppercase;margin-bottom:0.35rem;}
.mk-safety{border-left:3px solid var(--c-red);background:rgba(255,68,102,0.07);}
.mk-safety .mk-callout__k{color:var(--c-red);}
.mk-caution{border-left:3px solid var(--c-amber);background:rgba(240,165,0,0.07);}
.mk-caution .mk-callout__k{color:var(--c-amber);}
.mk-tip{border-left:3px solid var(--c-cyan);background:rgba(0,212,255,0.06);}
.mk-tip .mk-callout__k{color:var(--c-cyan);}
.mk-callout ol{margin:0.3rem 0 0.2rem;padding-left:1.3rem;}
ol.mk-steps{list-style:none;counter-reset:mkstep;padding-left:0;margin:1.2rem 0 1.8rem;}
ol.mk-steps>li{counter-increment:mkstep;position:relative;padding:0.55rem 0.9rem 0.55rem 4.9rem;margin:0.45rem 0;background:var(--c-surface);border:1px solid var(--c-border);border-radius:8px;}
ol.mk-steps>li::before{content:"Step " counter(mkstep);position:absolute;left:0.8rem;top:0.62rem;font-family:var(--f-mono);font-size:0.68rem;letter-spacing:0.06rem;color:var(--c-primary);}
.mk-dl{background:linear-gradient(135deg,rgba(0,255,136,0.06),rgba(0,212,255,0.04));border:1px solid rgba(0,255,136,0.22);border-radius:14px;padding:1.8rem;margin:2.5rem 0;}
.mk-dl__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:0.8rem;}
.mk-dl a{display:block;background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem 1.1rem;text-decoration:none;}
.mk-dl a:hover{border-color:var(--c-border-hard);text-shadow:none;}
.mk-dl__k{font-family:var(--f-mono);font-size:0.56rem;letter-spacing:0.16rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.35rem;}
.mk-dl__t{font-family:var(--f-display);font-size:0.86rem;font-weight:700;color:var(--c-cyan);}
.mk-dl__d{font-size:0.78rem;color:var(--c-text-3);margin-top:0.3rem;}
@media (max-width:600px){ol.mk-steps>li{padding:2rem 0.8rem 0.6rem;} ol.mk-steps>li::before{top:0.55rem;}}
</style>

<div class="mk-hero">
  <div class="mk-hero__kicker">ON3VZ // Measuring is knowing // NanoVNA-H4 · tinySA</div>
  <div class="mk-hero__title">Stop guessing. Start measuring.</div>
  <p style="color:var(--c-text-2);margin:0;">Two small instruments, together cheaper than a decent SWR meter, will tell you more about your station than years of trial and error. This is a complete, step by step guide for the newly licensed amateur who has never touched a vector network analyser or a spectrum analyser: what these instruments do, how to connect and calibrate them, how to read every graph they show, and a fixed routine for sweeping every HF band.</p>
  <div class="mk-specs">
    <div class="mk-spec"><div class="mk-spec__k">NanoVNA-H4</div><div class="mk-spec__v">50 kHz to 1.5 GHz</div></div>
    <div class="mk-spec"><div class="mk-spec__k">tinySA</div><div class="mk-spec__v">0.1 to 960 MHz</div></div>
    <div class="mk-spec"><div class="mk-spec__k">Figures</div><div class="mk-spec__v">55 figures</div></div>
    <div class="mk-spec"><div class="mk-spec__k">Downloads</div><div class="mk-spec__v">4 PDFs · EN / NL</div></div>
  </div>
</div>

<p class="mk-continuity">Following on from <a href="/2026/06/01/decibels-for-radio-amateurs/">dB &amp; dBm for radio amateurs</a>, which grew out of a club workshop where half the room had a NanoVNA and nobody was quite sure what the numbers meant. If dB and dBm still feel slippery, read that one first: this guide uses both constantly.</p>

There is a Dutch saying that sums up this entire article: ***meten is weten***, measuring is knowing. In amateur radio it is painfully true. An antenna that "seems fine" can be resonant 150 kHz below the band. A coax run that "worked last year" can have water in a connector. A QRP transmitter can be putting a respectable part of its power into the second harmonic. None of that is visible. All of it is measurable.

The good news is that measuring has never been cheaper. A **NanoVNA-H4** and a **tinySA** together cost less than a decent SWR/power meter, and between them they answer almost every question a starting amateur has about antennas, feedlines, filters, chokes and transmitters. The bad news is that both instruments assume you already know what a Smith chart is, why calibration matters, and why you must never, ever put RF power into them.

This guide assumes nothing. It started life as two Dutch manuals I wrote for myself while learning these instruments: a main manual and a practical band-by-band SWR sweep plan. Both are merged and translated here into one article. Every action comes with *how* to do it, not just *what* to do: not only "discharge the coax", but exactly which part touches which. Every screen is annotated with numbered red markers and a table that explains each number. Both original manuals are available as PDF downloads, in English and in Dutch, at the [end of this article](#downloads).

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Updated 2 October 2026</div>
  <p>After a hands-on calibration session the <a href="#calibration">calibration chapter</a> was reworked: where to calibrate, the female-female coupler, recognising the caps, how many memory slots your unit really has, changing bands with RECALL without mistakes, and a <a href="#result-check">checklist for every result</a>. The <a href="#band-plan">band sheets</a> now run from 160 m to 6 m. The PDFs below are updated too.</p>
</div>

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">How the figures work</div>
  <p>Most figures are reconstructed screens, redrawn so every detail is readable, with red numbered markers. The table under each figure explains every number. Menu names differ slightly between firmware versions; the <a href="#appendix-f">menu names appendix</a> helps you find the right button on your own unit.</p>
</div>

<div class="mk-toc">
  <div class="mk-toc__k">Contents</div>
  <ol start="0">
    <li><a href="#before-you-start">Before you start: safety first</a></li>
    <li><a href="#what-you-have">What these two instruments do</a></li>
    <li><a href="#kit">Kit list and connecting up</a></li>
    <li><a href="#operating">Operating the NanoVNA and calibrating it</a></li>
    <li><a href="#reading-graphs">Reading the graphs</a></li>
    <li><a href="#smith-chart">The Smith chart, demystified</a></li>
    <li><a href="#antennas">Measuring antennas</a><span class="mk-toc__phase">PHASE 1</span></li>
    <li><a href="#coax-filters">Coax and filters</a><span class="mk-toc__phase">PHASE 1</span></li>
    <li><a href="#pc">The NanoVNA on your PC</a>, including the <a href="#band-plan">band-by-band SWR sweep plan</a></li>
    <li><a href="#tinysa">The tinySA and your transmitter</a><span class="mk-toc__phase">PHASE 2</span></li>
    <li><a href="#chokes">Chokes and ferrites</a><span class="mk-toc__phase">PHASE 3</span></li>
    <li><a href="#appendices">Appendices: quick card, tables, glossary</a></li>
    <li><a href="#downloads">Download the PDFs</a></li>
  </ol>
</div>


## 0. Before you start {#before-you-start}

This guide teaches you to measure with two small instruments in three phases. You do not need any prior knowledge. For every action you will find not only what to do, but also exactly how to do it.

### 0.1 How to read a menu path

A menu path such as <kbd>CALIBRATE &gt; RESET</kbd> means:

<ol class="mk-steps">
<li><strong>Open the main menu.</strong> Tap anywhere on the screen with a stylus or the supplied plectrum, or press the jog switch on top of the unit straight down.</li>
<li><strong>A column of buttons appears on the right.</strong> Tap <kbd>CALIBRATE</kbd>, or push the jog switch sideways until <kbd>CALIBRATE</kbd> lights up green, then press it in.</li>
<li><strong>A new column appears.</strong> Tap <kbd>RESET</kbd>.</li>
<li><strong>To go back one level</strong>, tap <kbd>&larr; BACK</kbd>. To close the menu completely, tap the graph next to the menu, or push the jog switch to the left a few times.</li>
</ol>

### 0.2 The four safety rules

<div class="mk-callout mk-safety">
  <div class="mk-callout__k">Safety</div>
  <ol>
    <li><strong>Never transmit into the NanoVNA or the tinySA.</strong> Never connect a transceiver, amplifier or handheld directly. Even 1 watt permanently destroys the input.</li>
    <li><strong>With the tinySA, always attenuate a transmitter signal completely with external attenuators</strong> (chapter 9). Never count the tinySA's internal attenuator as protection.</li>
    <li><strong>Discharge every outdoor antenna before connecting it</strong>, exactly as described in 0.3.</li>
    <li><strong>Disconnect the transceiver from the antenna line before connecting the VNA</strong>, so that nobody can transmit by accident. Never measure when there is a thunderstorm anywhere nearby.</li>
  </ol>
</div>

### 0.3 Discharging the coax: this is how

An outdoor wire antenna (EFHW, dipole, longwire) builds up static charge from wind, dry air or a distant thunderstorm. That charge sits on the centre pin of your coax. Connect the NanoVNA and it discharges straight into the sensitive input. So you bleed that charge off to the shield yourself first.

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/01-discharge-coax.png" alt="Diagram of a PL-259 plug with a short wire bridging the centre pin and the metal nut" loading="lazy"><figcaption>Bridge the centre pin and the metal nut of the PL-259 for two seconds.</figcaption></figure>

#### What you need

- A piece of copper wire about 10 cm long with 1 cm stripped at both ends, **or** a screwdriver with a fully insulated handle.
- Better and permanent: a **PL-259 shorting plug** (a PL-259 in which the centre pin and the body are joined with a short wire), or a **50 ohm dummy load** with a PL connector.

#### Steps

<ol class="mk-steps">
<li>Make sure the transceiver is no longer connected to the coax (see 0.4).</li>
<li>Hold the antenna coax's PL-259 by the cable or the plastic, <strong>not</strong> by the pin in the middle.</li>
<li>Place one end of the wire (or the metal shaft of the screwdriver) against the metal nut of the PL-259.</li>
<li>Touch the centre pin with the other end and hold it there for 2 seconds.</li>
<li>If you hear or feel a small tick, or see a tiny spark, there was charge on the line. That is normal, and exactly why you do this.</li>
<li>Connect the NanoVNA within a minute (see 2.4). If you wait longer, or it is windy, discharge again.</li>
</ol>

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip</div>
  <p>A shorting plug makes this even easier: screw it onto the PL-259 for 2 seconds and take it off again. Keep it in the bag with your NanoVNA.</p>
</div>

### 0.4 Disconnecting the transceiver

<ol class="mk-steps">
<li>Switch the transceiver off.</li>
<li>Find the coax that runs from your antenna switch to the transceiver.</li>
<li>Turn the nut of the PL-259 on the antenna switch side anticlockwise until it spins freely, and pull the plug straight out.</li>
<li>Set the antenna switch to the antenna you want to measure. The NanoVNA will go on the free socket where the transceiver was.</li>
</ol>

### 0.5 The three phases

You do not need to buy or learn everything at once. The guide is built in three phases; phase 1 alone already answers most antenna questions.

| Phase | What you can do | Chapters |
|---|---|---|
| **Phase 1** (start here) | Measure antennas: SWR, resonance, impedance, coax, filters | 1 to 8 |
| **Phase 2** | Measure your own transmitter with the tinySA: harmonics, frequency, power, and hunting interference | 9 |
| **Phase 3** | Test chokes and ferrites (common-mode current) | 10 |

## 1. What these two instruments do {#what-you-have}

### 1.1 The NanoVNA-H4 in plain language

A VNA (vector network analyser) sends out a very weak test signal of its own and measures what happens to it: does it come back (**reflection**), or does it arrive at the other side (**transmission**)? From that it calculates SWR, impedance, loss and even the length of a cable. The H4 covers 50 kHz to 1.5 GHz and has a 4 inch screen.

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/02-nanovna-h4-layout.png" alt="Annotated drawing of the NanoVNA-H4 with its ports, switch and jog wheel" loading="lazy"><figcaption>The NanoVNA-H4 and its connections.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **CH0 or Port 1:** this is where the antenna goes. This port sends the test signal and measures what comes back (S11). |
| **2** | **CH1 or Port 2:** only for transmission measurements (filters, chokes). It receives whatever passes through the device under test (S21). |
| **3** | **USB-C:** charging and connection to the PC. |
| **4** | **On/off slide switch.** |
| **5** | **Jog switch:** push left or right to select or move the marker, press straight down to confirm or open the menu. |
| **6** | **LEDs:** the battery LED flashes while charging and stays on when the battery is full. |
| **7** | **Touchscreen.** It is pressure-sensitive (resistive): tap with a fingernail, a stylus or the supplied plectrum, not with a light fingertip. |

### 1.2 S11 and S21: the two kinds of measurement

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/03-s11-s21.png" alt="S11 reflection versus S21 transmission" loading="lazy"><figcaption>S11 measures what bounces back, S21 measures what gets through.</figcaption></figure>

Think of shouting at a wall. **S11** is the echo that comes back to you. **S21** is what someone on the other side of the wall can still hear.

- **S11** (reflection, always on CH0) is what you use for antennas. Little echo means the antenna accepts the signal well: low SWR.
- **S21** (transmission, from CH0 to CH1) is what you use for filters and chokes. You see how many dB are lost on the way.

### 1.3 The tinySA in plain language

The tinySA does the opposite: it transmits nothing, it listens. It is a **spectrum analyser**. It shows which frequencies are present in a signal and how strong each one is. That is how you see whether your transmitter is also radiating unwanted signals at twice or three times your frequency (harmonics), or where an interference source is.

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/04-tinysa-layout.png" alt="Annotated drawing of the tinySA with LOW and HIGH inputs" loading="lazy"><figcaption>The tinySA (basic model).</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **LOW input** (0.1 to 350 MHz): for HF, 6 m and 2 m. Maximum +10 dBm. |
| **2** | **HIGH input** (240 to 960 MHz): for 70 cm. Less accurate. Maximum +10 dBm. |
| **3** | **USB-C.** |
| **4** | **On/off.** |
| **5** | **Jog switch**, works the same as on the NanoVNA. |
| **6** | **Screen:** frequency horizontally, signal strength in dBm vertically. |

### 1.4 Which instrument for which question

| Your question | Instrument | Section |
|---|---|---|
| Is my antenna tuned correctly? | NanoVNA | 6.1 |
| Is my antenna too long or too short? | NanoVNA | 5, 6.3 |
| Do all bands of my multiband antenna work? | NanoVNA | 6.2 |
| How long is my coax, and is there a fault in it? | NanoVNA | 7.1 |
| How much does my low-pass filter attenuate? | NanoVNA | 7.2 |
| Is my QMX radiating unwanted harmonics? | tinySA | 9.4 |
| Where is that interference on 40 m coming from? | tinySA | 9.6 |
| Does my choke or ferrite work on 40 m? | NanoVNA | 10 |

### 1.5 Frequency coverage and your bands

| Band | NanoVNA-H4 | tinySA | Connector |
|---|---|---|---|
| 160 m to 10 m | excellent | LOW input, excellent | PL (SO-239 adapter) |
| 6 m | excellent | LOW input, excellent | PL or N |
| 2 m | very good | LOW input, good | N adapter |
| 70 cm | good | HIGH input, limited | N adapter |
| 23 cm | usable | not possible | N adapter |

## 2. Kit list and connecting up {#kit}

The links go straight to the product page. Prices are rough orders of magnitude, including VAT, as seen at the time of writing: shops change prices and stock all the time, so always check before ordering.

### 2.1 Phase 1: measuring antennas

| Item | What it is for | Approx. price | Shop |
|---|---|---|---|
| **NanoVNA-H4** | The instrument itself. In the box: 2 SMA cables, open/short/load calibration caps, an SMA female-female coupler and a USB-C cable | about €57 | [Eleshop](https://www.eleshop.nl/nanovna-h4.html) |
| **SMA female to SO-239 female adapter** | Goes on the end of the SMA cable; the PL-259 of your HF coax screws onto it | about €5 | [Eleshop](https://www.eleshop.nl/sma-vrouwelijke-naar-m-so239-female-adapter.html) |
| **N female to SMA male adapter** | For VHF/UHF coax that ends in an N plug | about €3 | [Eleshop](https://www.eleshop.nl/sma-male-naar-n-female-connector.html) |

Phase 1 total: roughly €65, plus shipping. Useful to have (you probably do already): a PL-259 shorting plug or a piece of wire for discharging (0.3).

### 2.2 Phase 2: measuring your transmitter with the tinySA

| Item | What it is for | Approx. price | Shop |
|---|---|---|---|
| **40 dB attenuator, 10 W, with heat sink** | First stage, directly after the transmitter. It absorbs the power | about €49 | [Eleshop](https://www.eleshop.nl/10w-sma-male-naar-sma-female-verzwakker-40db.html) |
| **10 dB attenuator, 2 W** | Second stage. Brings the signal far below the tinySA's limit | about €10 | [Eleshop](https://www.eleshop.nl/10-db-sma-attenuator.html) |
| **BNC male to SMA female adapter** | From the QMX's BNC output to the attenuator | about €5 | [Eleshop](https://www.eleshop.nl/sma-female-naar-bnc-male-connector.html) |
| **PL-PL patch cable, 90 cm (optional)** | Only for measuring the IC-7300 at 5 W, together with the SO-239 adapter | about €12 | [Deltron](https://www.deltron.nl/en/products/rg58-tussenkabel-pl-pl-90cm) |

### 2.3 Phase 3: chokes and ferrites

| Item | What it is for | Approx. price | Shop |
|---|---|---|---|
| **BNC male cable with crocodile clips, 2 pieces** | Red clip on the choke, black clips joined together | about €20 | [Eleshop](https://www.eleshop.nl/coaxkabel-met-klemmen.html) |
| **BNC female to SMA male adapter, 2 pieces** | Connects the clip leads to CH0 and CH1 | about €6 | [Eleshop](https://www.eleshop.nl/sma-male-naar-bnc-female-connector.html) |

### 2.4 Tightening connectors correctly

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/05-connection-chain.png" alt="Connection chain: NanoVNA CH0, SMA cable, SMA to SO-239 adapter, PL-259, coax to antenna" loading="lazy"><figcaption>SMA cable on CH0, SO-239 adapter on its end, the coax's PL-259 on the adapter.</figcaption></figure>

<ol class="mk-steps">
<li><strong>SMA cable on CH0:</strong> hold the cable straight in front of the port and turn only the small hexagonal nut clockwise, with your fingers. Do not twist the body of the cable along with it. Stop as soon as the nut will not go any further.</li>
<li><strong>SO-239 adapter on the other end of the SMA cable:</strong> same method. Hold the adapter still and tighten the cable's nut.</li>
<li><strong>The coax's PL-259 on the adapter:</strong> push the plug straight onto the adapter until the centre pin is fully in, then turn the knurled nut clockwise until it is hand-tight.</li>
<li><strong>Disconnecting</strong> is the same in reverse order, always anticlockwise.</li>
</ol>

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Caution</div>
  <p>Never use pliers on SMA connectors, and never screw a heavy coax or adapter directly onto the instrument's SMA port. The supplied SMA cable in between takes up the strain.</p>
</div>


## 3. Operating the NanoVNA and calibrating it {#operating}

### 3.1 First power-up

<ol class="mk-steps">
<li><strong>Charge the unit.</strong> Plug the USB-C cable into the NanoVNA and into a phone charger (5 V) or your PC. The battery LED flashes while charging and stays on once it is full (allow 1 to 2 hours).</li>
<li><strong>Switch it on</strong> with the slide switch on top.</li>
<li><strong>Check the firmware version:</strong> <kbd>CONFIG &gt; VERSION</kbd>. Write the version number down. Press the jog switch to go back.</li>
<li><strong>Calibrate the touchscreen:</strong> <kbd>CONFIG &gt; TOUCH CAL</kbd>. The screen asks you to tap the top left corner, then the bottom right. Tap precisely in the corner with the tip of the plectrum.</li>
<li><strong>Test it</strong> with <kbd>CONFIG &gt; TOUCH TEST</kbd>: draw a line with the plectrum. The line must appear exactly under the tip. If it does not, repeat TOUCH CAL. Press the jog switch to stop.</li>
<li><strong>Save</strong> with <kbd>CONFIG &gt; SAVE</kbd>. Without this step the touch calibration is lost when you switch off.</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/06-config-menu.png" alt="The CONFIG menu of the NanoVNA with numbered buttons" loading="lazy"><figcaption>The CONFIG menu.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | <kbd>TOUCH CAL</kbd>: calibrate the touchscreen. |
| **2** | <kbd>TOUCH TEST</kbd>: check that taps land where they should. |
| **3** | <kbd>SAVE</kbd>: store the instrument settings. |
| **4** | <kbd>VERSION</kbd>: show the firmware version. |
| **5** | <kbd>DFU</kbd>: firmware update mode (only for updates, see 8.8). |

### 3.2 Reading the screen

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/07-reading-the-screen.png" alt="An SWR sweep of a 40 m antenna with all screen elements numbered" loading="lazy"><figcaption>An SWR measurement of a 40 m antenna, every element numbered.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Trace header:** channel (CH0), format (SWR), scale (1.000 per division) and the value at the marker. Its colour matches the colour of the line. |
| **2** | **The value at the active marker:** SWR 1.12. |
| **3** | **Frequency of marker 1:** 7.098 MHz. |
| **4** | **The marker:** the small numbered triangle on the line. Move it by pushing the jog switch left or right, or by dragging the triangle with your stylus. |
| **5** | **Reference line** (the triangle on the left): this is where SWR 1.0 sits. The closer the curve comes to it, the better. |
| **6** | **Calibration status.** C1 means the calibration from memory slot 1 is active. If nothing is shown here, the unit is not calibrated and the measurement cannot be trusted. |
| **7** | **Start and stop frequency:** the screen shows everything between these two frequencies. |

### 3.3 The main menu

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/08-main-menu.png" alt="The NanoVNA main menu on the right of the screen" loading="lazy"><figcaption>The main menu on the right of the screen.</figcaption></figure>

| Menu | What it is for | Most important submenus |
|---|---|---|
| <kbd>DISPLAY</kbd> | What you see | TRACE, FORMAT, SCALE, CHANNEL, TRANSFORM |
| <kbd>MARKER</kbd> | Reading off points | SELECT MARKER, SEARCH |
| <kbd>STIMULUS</kbd> | Frequency range | START, STOP, CENTER, SPAN, SWEEP POINTS |
| <kbd>CALIBRATE</kbd> (or CAL) | Calibrating | CALIBRATE, SAVE, RESET |
| <kbd>RECALL</kbd> | Load a saved setup | RECALL 0 to 6 (the number varies per firmware, 3.8) |
| <kbd>CONFIG</kbd> | Instrument settings | TOUCH CAL, TOUCH TEST, SAVE, VERSION, DFU |

### 3.4 Setting the frequency range

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/09-stimulus-start.png" alt="Keypad for entering a start frequency of 6.9 MHz" loading="lazy"><figcaption>Entering a start frequency of 6.9 MHz.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | The <kbd>STIMULUS</kbd> menu, with <kbd>START</kbd> selected. |
| **2** | **Unit key:** G = GHz, M = MHz, k = kHz, x1 = Hz. Tapping a unit ends the entry immediately. |
| **3** | **The value you are typing.** Made a typo? The &larr; key deletes the last digit. |

<ol class="mk-steps">
<li>Tap <kbd>STIMULUS &gt; START</kbd>. A keypad appears.</li>
<li>Tap <kbd>6</kbd>, then the decimal point, then <kbd>9</kbd>, and finally <kbd>M</kbd>. Bottom left now reads START 6.900 000 MHz.</li>
<li>Tap <kbd>STIMULUS &gt; STOP</kbd>, then <kbd>7</kbd> <kbd>.</kbd> <kbd>3</kbd> <kbd>M</kbd>.</li>
<li>For more measuring points: <kbd>STIMULUS &gt; SWEEP POINTS &gt; 201</kbd>. More points give a finer curve but a slower sweep.</li>
</ol>

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip</div>
  <p>Do not make the range too wide. With 101 points across 1 to 30 MHz the unit only measures every 290 kHz, and a sharp dip can fall right between two points. Per band, about 400 kHz is enough (appendix B).</p>
</div>

### 3.5 Choosing traces, format and channel

A **trace** is one line on the screen. The NanoVNA can show four at once, each in its own colour, and each trace has its own format (how it is drawn) and channel (which port it reads).

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/10-trace-menu.png" alt="The TRACE menu, coloured buttons are switched on" loading="lazy"><figcaption>The TRACE menu. Coloured buttons are switched on.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Coloured button** = the trace is on. One tap makes it the active trace (the one you adjust next). |
| **2** | **Grey button** = the trace is off. Tap to switch it on. To switch an active trace off, tap it once more. |

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/11-format-menu.png" alt="The FORMAT menu with SWR highlighted" loading="lazy"><figcaption>The FORMAT menu, with SWR selected.</figcaption></figure>

<ol class="mk-steps">
<li><strong>Choose the trace you want to change:</strong> <kbd>DISPLAY &gt; TRACE &gt; TRACE 0</kbd>. At the top of the screen, a small triangle now appears in front of trace 0's line: that is the active trace.</li>
<li><strong>Tap <kbd>&larr; BACK</kbd> and choose the format:</strong> <kbd>FORMAT &gt; SWR</kbd> for antennas, <kbd>SMITH</kbd> for impedance, <kbd>LOGMAG</kbd> for filters and chokes.</li>
<li><strong>Choose the channel:</strong> <kbd>DISPLAY &gt; CHANNEL &gt; CH0 REFLECT</kbd> for antennas, <kbd>CH1 THROUGH</kbd> for filters and chokes. Some units call these Port 1 (S11) and Port 2 (S21); appendix F has the full list.</li>
<li><strong>Choose the scale:</strong> <kbd>DISPLAY &gt; SCALE &gt; SCALE/DIV</kbd>, type <kbd>1</kbd> and <kbd>x1</kbd> for SWR, or <kbd>10</kbd> and <kbd>x1</kbd> for LOGMAG.</li>
<li><strong>Choose the reference line:</strong> <kbd>DISPLAY &gt; SCALE &gt; REFERENCE POSITION</kbd>, type <kbd>1</kbd> and <kbd>x1</kbd> for SWR (second grid line from the bottom), or <kbd>7</kbd> and <kbd>x1</kbd> for LOGMAG (near the top).</li>
<li><strong>Repeat for trace 1</strong> if you want a second line, for example the Smith chart next to the SWR.</li>
</ol>

#### Why SCALE/DIV 1 and REFERENCE POSITION 1 for SWR?

- **SCALE/DIV = 1:** the screen has 8 horizontal divisions. With SCALE/DIV at 1, every division is 1 SWR unit. That gives a usable range from SWR 1.0 (perfect) up to about 8 (very poor), and SWR 1.5 is easy to read: half a division above the reference line.
- **REFERENCE POSITION = 1:** decides which horizontal grid line stands for SWR 1.0, the lowest possible value. At position 1 (the first line above the bottom edge) the reference line stays clearly visible with a little room below the curve. At position 0 everything would be squashed against the bottom edge.
- **Zooming in on a dip you have already found**, for example to see the difference between SWR 1.3 and 1.5: set SCALE/DIV to <kbd>0.5</kbd>. Everything above about SWR 4.5 then falls off the top of the screen.

### 3.6 Calibration: the single most important step {#calibration}

Calibration teaches the NanoVNA what a "perfect open", a "perfect short" and a "perfect 50 ohm load" look like **at the exact point where you screw on the caps**. That point is called the **reference plane**. From then on the NanoVNA subtracts everything between its port and that point (test cable, coupler) from every measurement. Without calibration, you are mostly measuring your own test cable.

#### Where to calibrate: where the antenna will be connected

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Golden rule</div>
  <p>Calibrate exactly at the point where you will connect the antenna (or the filter, or the choke) afterwards. Everything between the port and that point must be in place while you calibrate, and must stay in place while you measure. Add or remove a cable afterwards and that piece is no longer in the calibration.</p>
</div>

| How you work | Where the caps go | Is that OK? |
|---|---|---|
| Antenna coax via the SMA test cable (the usual way: the cable takes the strain off the port, 2.4) | On the coupler at the end of the test cable | **Yes.** This is the method in this guide |
| Caps directly on the NanoVNA port, and later the antenna adapter also directly on the port | On the port itself | **Yes.** Calibration and measurement use the same point. Mind the strain on the port: never let a heavy coax hang from it |
| Caps directly on the port, but measuring through the test cable afterwards | On the port itself | **No.** The test cable is not in the calibration. Its loss and delay end up in your reading: the Smith chart rotates and the SWR and impedance are off, more so on the higher bands. Calibrate again at the end of the cable |

#### What screws onto what: the coupler

SMA connectors come in two genders. **Male** has a **pin** in the middle, **female** has a **hole** (a small sleeve). Not sure? Look at the centre of each part: pin or hole. Two males never fit together, and neither do two females.

| Part | Gender | Comment |
|---|---|---|
| NanoVNA port CH0 (Port 1) | female | Hole in the middle |
| Supplied SMA test cable | male at both ends | Pin at both ends |
| Calibration caps (OPEN, SHORT, LOAD) | male | They fit on the port, but not on the cable |
| SMA coupler (in the box) | female at both ends | The link between cable and cap |

Because the test cable and the caps are both male, the caps do **not** fit directly onto the cable. The chain during calibration is therefore: **Port 1, test cable, SMA female-female coupler, cap.**

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/55-calibration-chain.png" alt="Calibration chain: Port 1, SMA test cable, female-female coupler, OSL cap; and during measurement the SO-239 adapter on the coupler" loading="lazy"><figcaption>Top: the chain during calibration. Bottom: the same chain while measuring.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Port 1 (CH0)** of the NanoVNA: the test cable stays screwed in here. |
| **2** | **The SMA test cable**, male at both ends. |
| **3** | **The female-female coupler.** It stays on the cable for the whole calibration; only the cap on top of it is swapped. |
| **4** | **The cap.** The red dashed line is the reference plane: everything to the left of it is calibrated out. |

After calibrating, what goes on the coupler depends on your SO-239 adapter:

- **Adapter with an SMA male side (pin):** screw it onto the coupler. The coupler stays where it is, exactly as during calibration.
- **Adapter with an SMA female side (hole)**, like the one in the kit list (2.1): it fits straight onto the cable end. Remove the coupler first. The coupler is only about a centimetre long; on HF leaving it out of the measurement makes no visible difference. On VHF and UHF, keep the chain identical: calibrate and measure through the same parts.

#### Recognising the three caps

Mixing up the caps is the most common calibration mistake. Not every set is marked, so learn to recognise them by what you see inside.

<figure class="mk-fig mk-fig--narrow"><img src="/assets/images/measuring-is-knowing/54-osl-caps.png" alt="The three calibration caps seen from the front: OPEN white, SHORT all metal, LOAD white with a small pin" loading="lazy"><figcaption>Look into the cap from the front.</figcaption></figure>

| No. | Cap | What you see inside | Letter (if marked) | How to remember it |
|---|---|---|---|---|
| **1** | **OPEN** | Only white plastic. No metal, no pin | O | "Open": nothing connected, you see nothing but white |
| **2** | **SHORT** | All metal. No opening, no white plastic | S | "Short": shorted, everything is one piece of metal |
| **3** | **LOAD** | A thin metal pin in the middle, with white plastic around it (often smaller or more silvery than a normal pin) | L or 50&#8239;&Omega; | "Load": looks like a real load, with a mini pin |

**No marking?** Shine a torch into the cap, or hold it against the light. Only white: OPEN. A small pin: LOAD. Only metal, no white and no pin: SHORT.

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">What a calibration belongs to</div>
  <p>A calibration belongs to a <strong>frequency range</strong> and a <strong>connection path</strong> (cable, coupler, adapter). It does not belong to an antenna. A 40 m calibration therefore works for every antenna you connect through the same PL adapter. But change START or STOP, or add or remove a cable, and you must calibrate again or load a matching saved calibration.</p>
</div>

#### Step A: set up and clear the old calibration

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/12-calibrate-menu.png" alt="The CALIBRATE menu with RESET highlighted" loading="lazy"><figcaption>The CALIBRATE menu.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | <kbd>CALIBRATE</kbd>: starts the procedure. |
| **2** | <kbd>RESET</kbd>: clears the current calibration. Always do this first. |

<ol class="mk-steps">
<li><strong>Prepare the hardware:</strong> the test cable in Port 1 (CH0), the female-female coupler on its free end, the three caps within reach.</li>
<li><strong>Range:</strong> <kbd>STIMULUS &gt; START</kbd>, type the frequency and end with <kbd>M</kbd> (MHz) or <kbd>k</kbd> (kHz). Then <kbd>STIMULUS &gt; STOP</kbd> the same way (3.4).</li>
<li><strong>Traces:</strong> <kbd>DISPLAY &gt; TRACE</kbd>. For a plain SWR sweep, leave only TRACE 0 on (coloured background = on, grey = off; tap to switch).</li>
<li><strong>Format:</strong> <kbd>DISPLAY &gt; FORMAT &gt; SWR</kbd>.</li>
<li><strong>Channel:</strong> <kbd>DISPLAY &gt; CHANNEL &gt; CH0 REFLECT</kbd> (on some units this is called Port 1, see appendix F).</li>
<li><strong>Scale:</strong> <kbd>DISPLAY &gt; SCALE &gt; SCALE/DIV</kbd>, tap <kbd>1</kbd> and <kbd>x1</kbd>. Then <kbd>REFERENCE POSITION</kbd>, tap <kbd>1</kbd> and <kbd>x1</kbd>. Why these values: see 3.5.</li>
<li><strong>Clear:</strong> tap <kbd>CALIBRATE &gt; RESET</kbd>. The letters on the left of the screen (C, D, R, S, T, X) disappear.</li>
</ol>

The calibration stores all of these settings along with it, so set them first and calibrate last.

#### Step B: short, open, load

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/13-calibration-steps.png" alt="Calibration menu: OPEN done in black, SHORT next in green" loading="lazy"><figcaption>OPEN is done (black), SHORT is the next step (green).</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Black button:** this step is done. |
| **2** | **Green button:** the next step. |
| **3** | <kbd>ISOLN</kbd> and <kbd>THRU</kbd>: only for S21 measurements (filters, chokes). For antennas you skip them. |
| **4** | <kbd>DONE</kbd>: finish. |

<ol class="mk-steps">
<li>Tap <kbd>CALIBRATE &gt; CALIBRATE</kbd>.</li>
<li>Screw the <strong>SHORT</strong> cap onto the coupler, finger-tight. Lay the cable down and do not touch it. Wait 2 seconds until the trace stops moving, then tap <kbd>SHORT</kbd>.</li>
<li>Unscrew the SHORT and screw on the <strong>OPEN</strong> cap. Wait 2 seconds, tap <kbd>OPEN</kbd>.</li>
<li>Unscrew the OPEN and screw on the <strong>LOAD</strong> cap. Wait 2 seconds, tap <kbd>LOAD</kbd>.</li>
<li>Only for filters and chokes: screw the LOAD onto the end of the second cable (the one on CH1) and tap <kbd>ISOLN</kbd>. Then join both cable ends with the coupler and tap <kbd>THRU</kbd>.</li>
<li>Tap <kbd>DONE</kbd>.</li>
</ol>

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">The order of the caps does not matter</div>
  <p>Short, open, load or open, short, load: both are correct, as long as you do all three before you tap <kbd>DONE</kbd>. The figure above happens to start with OPEN; the steps start with SHORT. What matters is that the cap you tap matches the cap that is screwed on.</p>
</div>

#### Step C: save and connect

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/14-save-slot.png" alt="Choosing a memory slot after DONE" loading="lazy"><figcaption>Choosing a memory slot after DONE.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | <kbd>SAVE 0</kbd> is loaded automatically at power-up. Use it for the measurement you make most often. |
| **2** | **The selected slot** (green). Tap to save. |

<ol class="mk-steps">
<li>Tap the slot from your memory plan (3.8), for example <kbd>SAVE 2</kbd> for 40 m.</li>
<li>The left edge of the screen now shows C with the number of that slot, for example C2.</li>
<li>Unscrew the LOAD cap. Discharge the antenna coax (0.3). Fit the SO-239 adapter (on the coupler or straight on the cable, see above) and screw the PL-259 of the antenna coax onto it.</li>
<li><strong>Read the result.</strong> The NanoVNA measures continuously and refreshes the curve by itself; there is no separate Sweep button as in the PC software.</li>
</ol>

#### Step D: verify

Temporarily set a trace to Smith (<kbd>DISPLAY &gt; FORMAT &gt; SMITH</kbd>) and screw the three caps on again, one at a time. Each time the dot must land in the right place:

<div class="mk-grid">
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/15-check-open.png" alt="Smith chart with the dot at the far right" loading="lazy"><figcaption>OPEN: all the way to the right.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/16-check-short.png" alt="Smith chart with the dot at the far left" loading="lazy"><figcaption>SHORT: all the way to the left.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/17-check-load.png" alt="Smith chart with the dot in the exact centre" loading="lazy"><figcaption>LOAD: exactly in the centre.</figcaption></figure>
</div>

| What you see | What it means | What you do |
|---|---|---|
| All three in the right place | The calibration is good | Measure |
| The dot is off, or it jumps around | Cap not tight, cable moved, or caps mixed up | Tighten the caps, keep the cable still, RESET and start again |
| The letters C, D, R, S are missing on the left | No calibration is active | Calibrate, or load a saved calibration via RECALL |

Faster, and without switching to Smith: the **LOAD test** in the checklist of 3.10.

### 3.7 Changing bands with RECALL {#recall}

**What RECALL does:** one tap brings back the **range** (START/STOP), the **display settings** (TRACE, FORMAT, SCALE, CHANNEL) **and the calibration**, exactly as they were when you saved them. At power-up the NanoVNA loads slot 0 by itself.

#### The routine for changing bands (on the unit)

<ol class="mk-steps">
<li>Tap <kbd>RECALL</kbd>, then the number of the band you want, for example <kbd>RECALL 2</kbd> for 40 m (memory plan, 3.8).</li>
<li>Check the first three points of the checklist in 3.10: format, range and calibration status.</li>
<li>All correct? Discharge the coax, connect the antenna and read. You do not need to re-enter a single setting.</li>
</ol>

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">How to avoid mistakes when changing bands</div>
  <p><strong>The mistake:</strong> changing a setting by hand <em>after</em> a RECALL (for example FORMAT or SCALE) and then switching to another band without saving. The saved slot does not change until you save again, but the screen has. A few band changes later you no longer know which settings belong to which calibration, and you see a dip on the wrong frequency, a flat line, or a jagged curve.</p>
  <p><strong>The rule:</strong> keep the screen and the slot identical. Changed anything by hand after a RECALL? Save again in the <em>same</em> slot (<kbd>CALIBRATE &gt; SAVE &gt; SAVE</kbd> plus the number) before you switch to another band.</p>
</div>

On the PC there is no one-click equivalent of RECALL: there you enter Start/Stop and load the calibration file as two separate actions (8.4 and 8.9).

### 3.8 Memory plan {#memory-plan}

#### How many slots does your unit have?

That depends on the firmware. My NanoVNA-H4 with DiSlord firmware has **7 slots: SAVE 0 to SAVE 6**. Other firmware versions have 5 or 6. Do not assume a number; count your own:

<ol class="mk-steps">
<li>Tap <kbd>RECALL</kbd>.</li>
<li>Look at the list of buttons: <kbd>RECALL 0</kbd>, <kbd>RECALL 1</kbd> and so on. If there is a <kbd>MORE</kbd> button, tap it to see the rest.</li>
<li>The highest number you find is your last slot. Write it down; you will need it for your own memory plan.</li>
</ol>

#### The plan I use (7 slots)

| Slot | Use | START | STOP | Sweep points |
|---|---|---|---|---|
| **SAVE 0** | Wide sweep, all HF bands (loaded at power-up) | 1 MHz | 30 MHz | **401** |
| **SAVE 1** | 80 m | 3.5 MHz | 3.8 MHz | 101 |
| **SAVE 2** | 40 m | 6.9 MHz | 7.3 MHz | 101 |
| **SAVE 3** | 30 m | 10.0 MHz | 10.2 MHz | 101 |
| **SAVE 4** | 20 m | 13.9 MHz | 14.5 MHz | 101 |
| **SAVE 5** | 15 m | 20.9 MHz | 21.5 MHz | 101 |
| **SAVE 6** | 10 m | 28.0 MHz | 29.7 MHz | 101 (201 if too coarse) |

All slots: SWR format, CH0 REFLECT, SCALE/DIV 1, REFERENCE POSITION 1, calibrated with the test cable and coupler (3.6). Each range is a little wider than the band itself, so you still see a dip that sits just outside it.

- **SAVE 0, sweep points:** set <kbd>STIMULUS &gt; SWEEP POINTS</kbd> to <kbd>401</kbd> <em>before</em> you calibrate. With the default 101 points over 1 to 30 MHz the unit only measures every 290 kHz, and a narrow dip can fall between two points.
- **SAVE 6, sweep points:** 10 m is 1.7 MHz wide, much wider than the other bands (0.2 to 0.6 MHz). If the curve looks coarse with 101 points, set 201 and calibrate again.
- **Fewer slots on your unit?** Drop the bands you do not use, or keep them as files on the PC.

**Bands that are not in the plan** (160 m, 60 m, 17 m, 12 m, 6 m, and 11 m to check a CB antenna) and the **filter and choke measurements** (7.2, 10) live as files in NanoVNA-Saver on the PC, where there is no limit (8.4 and 8.9). Need one on the unit, without a PC? Calibrate on the spot and measure without saving, or temporarily overwrite a slot and recalibrate that band afterwards.

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Check your licence</div>
  <p>The table lists ranges to <em>measure</em>. Which bands you may <em>transmit</em> on depends on your licence class. Check your own licence conditions before you build a plan around a band.</p>
</div>

### 3.9 Using the marker

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/18-marker-search.png" alt="The MARKER SEARCH menu finding the lowest point" loading="lazy"><figcaption><kbd>MARKER &gt; SEARCH</kbd> finds the lowest point for you.</figcaption></figure>

<ol class="mk-steps">
<li><strong>Manually:</strong> push the jog switch left or right. The marker moves point by point. Or drag the triangle with your stylus.</li>
<li><strong>Automatically find the lowest SWR:</strong> <kbd>MARKER &gt; SEARCH &gt; MINIMUM</kbd>. Switch <kbd>TRACKING</kbd> on and the marker follows the minimum while you work on the antenna.</li>
<li><strong>A second marker:</strong> <kbd>MARKER &gt; SELECT MARKER &gt; MARKER 2</kbd>. Handy for marking the start and end of a band.</li>
</ol>

### 3.10 Is my result right? The checklist after every sweep {#result-check}

Run through these five points after every measurement, on the unit and on the PC. It takes ten seconds and catches almost every mistake before you start cutting wire.

| No. | Check | Good | Not good: what to do |
|---|---|---|---|
| **1** | **Format.** What does the trace header say? | SWR (or the format you chose) | It says PHASE, LOGMAG or something else: <kbd>DISPLAY &gt; FORMAT &gt; SWR</kbd>, then save again in the same slot (3.7) |
| **2** | **Range.** What do START and STOP at the bottom say? | The band you think you are measuring | Wrong band: RECALL the right slot, or load the right <code>.cal</code> file on the PC |
| **3** | **Calibration status** (unit only). What is on the left edge? | C with a digit, for example C2 | Nothing there: no active calibration. RECALL a slot or calibrate (3.6) |
| **4** | **Shape of the curve** | A smooth V-shaped dip | See the table below |
| **5** | **LOAD test.** Screw the LOAD cap where the antenna normally goes | A flat line at SWR 1.0 (for example 1.002) | Clearly higher: the calibration itself is wrong. Calibrate again |

| What the curve looks like | Probable cause |
|---|---|
| A smooth V-shaped dip | Normal. A good measurement |
| A flat, high line across the whole band | An open connection, a cap still screwed on instead of the antenna, or a wrong or missing calibration |
| A jagged, jumpy line | Wrong format (for example PHASE instead of SWR), a loose connector, or interference from a strong local signal |


## 4. Reading the graphs {#reading-graphs}

The NanoVNA always measures the same thing, but it can present the result in different ways. Each format answers a different question. In this chapter you see **the same 40 m antenna in every format**, so you can compare them directly.

### 4.1 Which format for which question

| Format | Vertical axis | The question it answers | Good |
|---|---|---|---|
| **SWR** | SWR (1 = perfect) | How well does the antenna accept the power? | Below 1.5 in the band |
| **LOGMAG** (on CH0) | Return loss in dB | Same as SWR, but small differences are much easier to see | Deeper than &minus;14 dB |
| **R and X** (RESISTANCE, REACTANCE) | Ohm | Where does the antenna resonate, and what is its resistance there? | X = 0 in the band, R close to 50 |
| **SMITH** | A chart, no axis | *Why* is the SWR not good: too long, too short, wrong impedance? | Dot close to the centre |
| **PHASE** | Degrees | For advanced use, rarely needed for antennas | |
| **LOGMAG** (on CH1) | Transmission in dB | How much does a filter or choke attenuate? | Depends on the purpose |

### 4.2 SWR

This is the screen from 3.2. The horizontal axis runs from START to STOP. Vertically you see SWR; with scale 1, each division is 1 SWR unit, and the reference line (the triangle on the left) sits at SWR 1.0.

<ol class="mk-steps">
<li>Find the lowest point of the curve.</li>
<li>Put the marker on it (3.9) and read the frequency and SWR at the top.</li>
<li>Look at how wide the curve stays below SWR 2: that is the usable bandwidth without a tuner.</li>
</ol>

| SWR | Meaning | Action |
|---|---|---|
| 1.0 to 1.5 | Excellent | Nothing to do |
| 1.5 to 2.0 | Good; most transceivers deliver full power here | Fine-tune if you like |
| 2.0 to 3.0 | Mediocre; the internal tuner is needed | Retune the antenna |
| Above 3.0 | Poor | Check the antenna and the connections |

### 4.3 LOGMAG: return loss

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/19-logmag.png" alt="The same antenna shown in LOGMAG, with a deep dip" loading="lazy"><figcaption>The same antenna in LOGMAG. The dip is now a deep point pointing down.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Trace header:** LOGMAG, 5 dB per division, value at the marker &minus;24.9 dB. |
| **2** | **The deepest point** = the best match. |
| **3** | **Reference line at 0 dB:** at this level everything is reflected. |

LOGMAG on CH0 shows the same information as SWR, but in dB. The deeper, the better. The advantage: the difference between *good* and *very good* is far easier to see than on the SWR scale, where everything below 1.2 looks like a flat line.

| Return loss | Corresponds to SWR |
|---|---|
| &minus;6 dB | 3.0 |
| &minus;10 dB | 1.9 |
| &minus;14 dB | 1.5 |
| &minus;20 dB | 1.2 |
| &minus;30 dB | 1.07 |

### 4.4 R and X: resistance and reactance

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/20-r-and-x.png" alt="Resistance in green and reactance in pink for the 40 m antenna" loading="lazy"><figcaption>R (green) and X (pink) of the same antenna.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Resonance:** here X crosses the zero line. This is the true resonant frequency. |
| **2** | **X negative** (below the zero line): capacitive, the antenna is too short for this frequency. |
| **3** | **X positive** (above the zero line): inductive, the antenna is too long for this frequency. |
| **4** | **R, the resistance.** Read it where X is zero: that is your antenna's impedance at resonance. |

<ol class="mk-steps">
<li>Set trace 2 to <kbd>FORMAT &gt; MORE &gt; RESISTANCE</kbd> and trace 3 to <kbd>FORMAT &gt; MORE &gt; REACTANCE</kbd> (menu names can differ slightly per firmware), both on CH0, scale 20.</li>
<li>Put X's reference line in the middle (<kbd>REFERENCE POSITION</kbd> 4).</li>
<li>Find where X crosses the middle line and read R at that point.</li>
</ol>

| What you see | What it means | What you do |
|---|---|---|
| X = 0 in the band, R between 40 and 60 ohm | Resonant and well matched | Nothing |
| X = 0 in the band, R far from 50 (e.g. 12 or 200 ohm) | Resonant, but the wrong impedance | Different balun or unun ratio |
| X crosses zero above the band | Antenna too short | Lengthen it |
| X crosses zero below the band | Antenna too long | Shorten it |

### 4.5 Phase

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/21-phase.png" alt="Phase trace crossing zero at resonance" loading="lazy"><figcaption>The phase passes through zero at resonance.</figcaption></figure>

The phase shows whether current and voltage are in step. At resonance it is zero. For antennas it adds nothing beyond R and X or the Smith chart; you can safely ignore it until you start looking at filters or cables in detail.

### 4.6 Several traces at once

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/22-four-traces.png" alt="Four traces at once, each colour with its own header line" loading="lazy"><figcaption>Four traces at once. Each colour has its own header line at the top.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Yellow: SWR.** The small triangle in front means this is the active trace. |
| **2** | **Blue: LOGMAG** (return loss). |
| **3** | **Green: R**, resistance. |
| **4** | **Pink: X**, reactance. |

<ol class="mk-steps">
<li>Read each header line at the top in the same colour as its line.</li>
<li>All traces share the same marker frequency. So for one frequency you see SWR, return loss, R and X together.</li>
<li>Too busy? Switch off the traces you do not need via <kbd>DISPLAY &gt; TRACE</kbd> (3.5).</li>
</ol>

### 4.7 LOGMAG on CH1: transmission

For filters and chokes you measure transmission (S21). **0 dB at the top means everything gets through.** The lower the line, the more attenuation. &minus;10 dB is 10 times less power, &minus;20 dB is 100 times less, &minus;30 dB is 1000 times less. Examples in 7.2 and chapter 10.

## 5. The Smith chart, demystified {#smith-chart}

### 5.1 Why a Smith chart?

An SWR graph only tells you *how good* your antenna is. The Smith chart also tells you *why it is not*, and therefore what to do about it. Every point on the chart is an impedance: a combination of resistance (R) and reactance (X). The line you see is how your antenna's impedance changes from the start frequency to the stop frequency.

### 5.2 The chart, built up in four steps

<div class="mk-grid">
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/23-smith-step1.png" alt="Smith chart step 1: the horizontal centre line from short to open" loading="lazy"><figcaption>Step 1: the centre line.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/24-smith-step2.png" alt="Smith chart step 2: circles of constant resistance" loading="lazy"><figcaption>Step 2: circles of constant resistance.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/25-smith-step3.png" alt="Smith chart step 3: arcs of constant reactance" loading="lazy"><figcaption>Step 3: arcs of constant reactance.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/26-smith-step4.png" alt="Smith chart step 4: circles of constant SWR around the centre" loading="lazy"><figcaption>Step 4: circles of constant SWR.</figcaption></figure>
</div>

<ol class="mk-steps">
<li><strong>The horizontal centre line</strong> is pure resistance, with no coil or capacitor behaviour. Far left is 0 ohm (a short circuit), the centre is 50 ohm (perfect), far right is infinity (open).</li>
<li><strong>The circles that meet at the right</strong> are lines of constant resistance. Everything on the circle through the centre has exactly 50 ohm of resistance.</li>
<li><strong>The arcs above the centre line are inductive (+jX):</strong> the antenna behaves like a coil and is too long for that frequency. <strong>Below the centre line is capacitive (&minus;jX):</strong> too short.</li>
<li><strong>Imagine a circle around the centre point:</strong> everything on that circle has the same SWR. The smaller the circle around the centre, the lower the SWR.</li>
</ol>

### 5.3 Reading the marker values at the top

For a Smith trace the top line reads, for example: `CH0 SMITH 52.6Ω 205nH`. This is how you read it:

| Part | Meaning |
|---|---|
| **52.6Ω** | The resistance R at the marker frequency: 52.6 ohm. |
| **205nH** (nanohenry) | There is also some coil behaviour: inductive, so above the centre line; the antenna is slightly too long. |
| **47.8pF** or **47.8nF** (picofarad, nanofarad) | Capacitor behaviour: capacitive, below the centre line; the antenna is slightly too short. |

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip</div>
  <p>An <strong>H</strong> (henry) in the value means inductive, an <strong>F</strong> (farad) means capacitive. How many ohms the deviation amounts to also depends on the frequency: at 7 MHz, 205 nH is about 9 ohm of reactance. No further maths needed: mainly look at <em>where</em> the dot sits.</p>
</div>

### 5.4 Your own antenna on the Smith chart

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/27-smith-40m.png" alt="The 40 m antenna on the Smith chart with marker at 7.150 MHz" loading="lazy"><figcaption>The 40 m antenna on the Smith chart.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Trace header:** 52.6 ohm and 205 nH at the marker frequency. |
| **2** | **The centre point:** 50 ohm, the target. |
| **3** | **Left:** short circuit. |
| **4** | **Right:** open. |
| **5** | **Lower half:** capacitive. |
| **6** | **Upper half:** inductive. |
| **7** | **Marker 1** at 7.150 MHz. |

<ol class="mk-steps">
<li>Set a trace to Smith: <kbd>DISPLAY &gt; TRACE &gt; TRACE 1</kbd>, then <kbd>&larr; BACK &gt; FORMAT &gt; SMITH</kbd>. Channel CH0 REFLECT.</li>
<li>Put the marker on the frequency you want to operate on.</li>
<li>Look where the dot sits and use the table below.</li>
</ol>

| What you see | What it means | What you do |
|---|---|---|
| Dot close to the centre | Good match | Nothing |
| Dot above the centre line | Inductive: antenna too long for this frequency | Shorten the wire (the dip lies below your frequency) |
| Dot below the centre line | Capacitive: antenna too short | Lengthen the wire |
| Line crosses the centre line left of the centre | Resonant, but impedance too low (e.g. 25 ohm) | Different balun/unun ratio |
| Line crosses right of the centre | Resonant, but impedance too high (e.g. 100 ohm) | Different balun/unun ratio |
| Small loop around the centre | Well matched over a wide bandwidth | Nothing |
| Line hugging the outer edge | Nearly everything is reflected: open, short, or a very poor match | Check the connection and the antenna |

### 5.5 Exercise: tuning an antenna tuner with the Smith chart

With a manual antenna tuner you can watch live how the knobs move the dot across the chart. It is the ideal exercise for learning to read a Smith chart.

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/28-tuner-smith.png" alt="Tuner perfectly adjusted at 3.650 MHz on SWR and Smith traces" loading="lazy"><figcaption>Tuner perfectly adjusted at 3.650 MHz.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **SWR 1.02** at the marker. |
| **2** | **50.4 ohm** and a negligible reactance: practically perfect. |
| **3** | **The marker dot** sits in the centre of the Smith chart. |
| **4** | **The yellow SWR curve** touches the reference line exactly at the marker frequency. |

<ol class="mk-steps">
<li>Connect CH0 (via the SMA cable and SO-239 adapter) to the tuner's input, where the transceiver normally goes. The antenna stays on the tuner's output.</li>
<li>Set START and STOP around the frequency you want (e.g. 3.5 to 3.8 MHz), set trace 0 to SWR and trace 1 to SMITH, and calibrate at the end of the SMA cable.</li>
<li>Put the marker on the frequency you want (e.g. 3.650 MHz).</li>
<li>Slowly turn one knob of the tuner and watch the dot move across the chart. Then turn the other knob.</li>
<li>Stop when the marker dot is in the centre and the SWR at the marker is below 1.2. Write down the knob positions for that band.</li>
</ol>


## 6. Phase 1: measuring antennas {#antennas}

### 6.1 SWR and resonance of an HF antenna

**Goal:** see at which frequency your antenna works best, and how well. **Example:** an EFHW or end-fed antenna on 40 m.

#### What you need

- NanoVNA-H4, the supplied SMA cable, the SMA/SO-239 adapter, the calibration caps, and a wire or shorting plug for discharging.

#### Procedure

<ol class="mk-steps">
<li><strong>Load your setup:</strong> <kbd>RECALL &gt; RECALL 2</kbd> (40 m in the memory plan, 3.8). Nothing saved yet? Set 6.9 to 7.3 MHz (3.4), trace 0 to SWR, CH0 REFLECT (3.5), and calibrate with the test cable and coupler (3.6).</li>
<li><strong>Disconnect the transceiver</strong> from the antenna switch (0.4) and set the switch to the antenna you want to measure.</li>
<li><strong>Discharge the coax</strong> as described in 0.3: hold the centre pin of the PL-259 against the metal nut for 2 seconds, with a wire or an insulated screwdriver.</li>
<li><strong>Screw the SO-239 adapter</strong> onto the coupler at the end of the SMA cable (or straight onto the cable if your adapter has an SMA female side, 3.6), and the coax's PL-259 onto that (2.4).</li>
<li><strong>Check the result</strong> with points 1 to 4 of the checklist in 3.10: format, range, calibration status and the shape of the curve.</li>
<li>Tap <kbd>MARKER &gt; SEARCH &gt; MINIMUM</kbd>. The marker jumps to the lowest point.</li>
<li><strong>Read</strong> the frequency and SWR of marker 1 at the top and write them down.</li>
<li><strong>Usable bandwidth:</strong> choose <kbd>MARKER &gt; SELECT MARKER &gt; MARKER 2</kbd> and move it left with the jog switch until the top line shows SWR 2.0. Do the same with marker 3 to the right. The frequency difference between them is the bandwidth below SWR 2.</li>
<li><strong>Finished:</strong> disconnect the VNA and reconnect the transceiver, in reverse order.</li>
</ol>

#### How to read the result

<div class="mk-grid">
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/29-swr-too-short.png" alt="SWR dip above the band" loading="lazy"><figcaption>Dip too high: antenna too short.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/30-swr-too-long.png" alt="SWR dip below the band" loading="lazy"><figcaption>Dip too low: antenna too long.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/31-swr-fault.png" alt="Flat high SWR with no dip" loading="lazy"><figcaption>No dip, high everywhere: fault in the cable or a connection.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/32-swr-2m.png" alt="2 m antenna measured via N adapter, dip around 145 MHz" loading="lazy"><figcaption>2 m antenna via N adapter: dip around 145 MHz.</figcaption></figure>
</div>

| What you see | What it means | What you do |
|---|---|---|
| Dip above the band (e.g. 7.24 MHz) | Antenna electrically too short | Lengthen the wire. Rule of thumb: 1% longer moves the dip about 1% lower |
| Dip below the band (e.g. 6.96 MHz) | Antenna electrically too long | Shorten the wire in small steps, measuring again each time |
| Dip in the right place, SWR 1.0 to 1.5 | The antenna is good | Nothing; save a measurement as a reference (8.7) |
| Dip in the right place, lowest SWR above 2 | Resonant, but the wrong impedance | Look at the Smith chart (5.4), check the balun/unun |
| No dip, high and flat everywhere | Open circuit or short circuit | Check connectors and balun, measure the coax on its own (7.1) |
| Low SWR everywhere, no real dip | Loss in a long coax is hiding the antenna | Measure closer to the antenna (6.4) |
| Curve keeps jumping | Strong local transmitter or interference | Measure again later, use more points |

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip: shortening without cutting</div>
  <p>Fold the end of the wire back on itself and secure it with insulating tape. That way you can lengthen it again later. Only cut off the surplus once the tuning is final.</p>
</div>

### 6.2 A multiband antenna in one view

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/33-multiband-sweep.png" alt="SWR sweep from 1 to 30 MHz showing several dips" loading="lazy"><figcaption>1 to 30 MHz. Every dip is a band on which the antenna resonates.</figcaption></figure>

<ol class="mk-steps">
<li>Load <kbd>RECALL &gt; RECALL 0</kbd> (the wide sweep in the memory plan, 3.8), or set START <kbd>1 M</kbd>, STOP <kbd>30 M</kbd> and <kbd>SWEEP POINTS &gt; 401</kbd>, and calibrate.</li>
<li>Connect the antenna as in 6.1 (discharge first).</li>
<li>Put markers 1 to 4 on the dips of the bands you expect (<kbd>MARKER &gt; SELECT MARKER</kbd>, then move them with the jog switch).</li>
<li>Is there a dip in every band the antenna is supposed to cover? Then zoom in band by band using the START/STOP values in appendix B.</li>
</ol>

| What you see | What it means | What you do |
|---|---|---|
| An expected band without a dip | That band does not work | Zoom in and check the tuning element (coil, loop, link) |
| Dips outside the amateur bands | Normal for multiband antennas | Only count the dips inside the bands |

### 6.3 Too long or too short: Smith and R/X together

If you are not sure why the SWR is not good, use the Smith chart (5.4) or the R and X view (4.4). Both show whether you need to shorten, lengthen, or change the balun.

### 6.4 Measuring in the shack or at the antenna

In the shack you measure the **complete system** as your transceiver sees it: antenna, balun, coax, chokes and switch. That is the measurement that counts for your SWR. At the feed point you measure **the antenna without the coax**; you need that to trim the wire length exactly, because coax loss makes the SWR in the shack look better than it is, and the cable length distorts the impedance. The frequency of the dip stays roughly the same.

<ol class="mk-steps">
<li>Take the NanoVNA, the SMA cable, the adapter and the caps to the antenna.</li>
<li>Calibrate on the spot, at the point where the balun will be connected (3.6).</li>
<li>Disconnect the coax from the balun and connect the VNA directly to the balun.</li>
<li>Measure as in 6.1.</li>
</ol>

### 6.5 VHF and UHF antennas via N

<ol class="mk-steps">
<li>Set the range: <kbd>STIMULUS</kbd> <kbd>144 M</kbd> to <kbd>146 M</kbd> for 2 m, or <kbd>430 M</kbd> to <kbd>440 M</kbd> for 70 cm.</li>
<li>Screw the SMA female-female coupler onto the end of the SMA cable and calibrate there, exactly as in 3.6.</li>
<li>Remove the LOAD cap and screw the N female/SMA male adapter onto the coupler. The coupler stays on: on VHF and UHF the chain must be exactly as during calibration.</li>
<li>Push the N plug of the VHF coax straight onto the adapter and turn the nut clockwise until hand-tight.</li>
<li>Measure as in 6.1. If all your slots are taken (3.8), measure without saving, or keep this calibration as a file in NanoVNA-Saver. On 70 cm the adapter can slightly distort the SWR value; the position of the dip remains reliable.</li>
</ol>

## 7. Phase 1: coax and filters {#coax-filters}

### 7.1 Coax length and fault finding (TDR)

With TDR (Time Domain Reflectometry) the NanoVNA converts the measurement into a distance. An open or shorted end, a bad connector or a crushed cable shows up as a step at a certain distance.

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/34-tdr.png" alt="TDR trace of an open 18.4 m coax" loading="lazy"><figcaption>An open coax of 18.4 m.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Distance at the marker**, calculated with velocity factor 0.66. |
| **2** | **The step:** this is where the cable ends (open). With a short circuit the line goes down instead. |

<ol class="mk-steps">
<li><strong>Set up:</strong> START <kbd>50 k</kbd>, STOP <kbd>900 M</kbd>, <kbd>SWEEP POINTS &gt; 401</kbd>, and calibrate open/short/load at the end of the SMA cable.</li>
<li>Connect the coax via the SO-239 adapter. Leave the other end open (nothing connected).</li>
<li><strong>Format:</strong> <kbd>DISPLAY &gt; FORMAT &gt; MORE &gt; REAL</kbd>.</li>
<li><strong>TDR on:</strong> <kbd>DISPLAY &gt; TRANSFORM &gt; TRANSFORM ON</kbd>, then <kbd>LOW PASS STEP</kbd>.</li>
<li><strong>Velocity factor:</strong> <kbd>DISPLAY &gt; TRANSFORM &gt; VELOCITY FACTOR</kbd>. RG58 and RG213: 66 (or 0.66, depending on firmware). Foam cable such as H155, Aircell 7 or Ecoflex: roughly 80 to 86. If it is not printed on the cable, find the type on the jacket and look it up in the datasheet.</li>
<li>Put the marker on the step and read the distance at the top.</li>
</ol>

| What you see | What it means | What you do |
|---|---|---|
| Step up at the expected length | Cable fine, end open | Nothing |
| Step down | Short circuit at that distance | Inspect the connector or cable there |
| Step much shorter than the cable | Break or damage at that distance | Inspect the cable at that point |
| Small bump halfway | Poor in-line connector or a kink | Replace the connector there |

### 7.2 Measuring a filter (S21)

**Goal:** check how much a low-pass filter passes in the band, and how much it attenuates the harmonics. **Example:** a separate 40 m low-pass filter such as a QRP Labs LPF kit.

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/35-s21-setup.png" alt="S21 setup: CH0 source, filter in between, CH1 receiver" loading="lazy"><figcaption>CH0 sends, the filter sits in between, CH1 receives.</figcaption></figure>

<ol class="mk-steps">
<li><strong>Set up:</strong> START <kbd>1 M</kbd>, STOP <kbd>60 M</kbd>, trace 0 to <kbd>LOGMAG</kbd> and <kbd>CH1 THROUGH</kbd>, scale 10, reference 7.</li>
<li>Screw the second SMA cable onto CH1.</li>
<li><strong>Full calibration:</strong> OPEN, SHORT, LOAD on the coupler at the end of cable 1; LOAD on the coupler at the end of cable 2 and tap <kbd>ISOLN</kbd>; join both cable ends with the coupler and tap <kbd>THRU</kbd>; then <kbd>DONE</kbd>. All seven slots in use (3.8)? Measure without saving, or overwrite a slot temporarily and recalibrate that band later.</li>
<li><strong>Check:</strong> with the cables still joined, the line must sit at 0 dB.</li>
<li>Remove the coupler and put the filter between the two cables (if the filter has other connectors, use suitable adapters).</li>
<li>Marker 1 on 14.1 MHz (2nd harmonic), marker 2 on 7.05 MHz (operating frequency).</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/36-lowpass-filter.png" alt="S21 of a 40 m low-pass filter from 1 to 60 MHz" loading="lazy"><figcaption>A 40 m low-pass filter.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Value at the active marker:** &minus;53.9 dB at 14.1 MHz. |
| **2** | **At 7.05 MHz:** almost 0 dB, the signal passes without loss. |
| **3** | **At 14.1 MHz:** more than 50 dB of attenuation on the 2nd harmonic. |

| What you see | What it means | What you do |
|---|---|---|
| Less than 0.5 dB loss at the operating frequency | Good filter | Nothing |
| More than 1 dB loss at the operating frequency | Filter tuned too low, or a bad component | Check the coils and capacitors |
| Less than 40 dB attenuation on the 2nd harmonic | Filter insufficient | Different filter or an extra section |


## 8. The NanoVNA on your PC {#pc}

On the PC you see everything larger, you can look at several graphs at once, use far more measuring points, and save your measurements. The NanoVNA remains the measuring instrument; the PC is just the big screen and the control panel. The free program used here is **NanoVNA-Saver** (Windows, macOS and Linux; the steps below are for Windows).

### 8.1 Connecting and recognising the NanoVNA

<ol class="mk-steps">
<li>Use the USB-C cable from the box. Some phone cables can only charge and carry no data.</li>
<li>Plug the cable into the NanoVNA and into a USB port on your PC. Switch the NanoVNA on.</li>
<li>Open Device Manager: right-click the Windows Start button and choose <strong>Device Manager</strong>.</li>
<li>Click the arrow in front of <strong>Ports (COM &amp; LPT)</strong>. There is a line <strong>STMicroelectronics Virtual COM Port</strong> with a COM number.</li>
<li><strong>Check:</strong> unplug the USB cable and the line disappears; plug it back in and the line reappears. Then you have the right port. Remember the COM number.</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/37-device-manager-com.png" alt="Windows Device Manager showing the STMicroelectronics Virtual COM Port" loading="lazy"><figcaption>Device Manager after connecting.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **The NanoVNA.** You will choose this COM number (here COM4) in the software. |
| **2** | **Look under this heading**, not under any other. |

| What you see | What it means | What you do |
|---|---|---|
| No new line appears | The cable carries no data, or the driver is missing | Use the cable from the box, try another USB port (preferably USB 2.0), otherwise install the STM32 driver (appendix E) |
| Yellow exclamation mark | Driver not installed correctly | Right-click the line &gt; Update driver, or reinstall the driver |

### 8.2 Downloading NanoVNA-Saver and connecting

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/48-saver-download.png" alt="The NanoVNA-Saver releases page on GitHub" loading="lazy"><figcaption>The download page on GitHub (illustration; your version number will be newer).</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **The newest version** (marked Latest) is at the top. Always use this one unless you have a reason to take an older one. |
| **2** | **Under Assets:** the file ending in <code>.exe</code> is the Windows version you need. |

<ol class="mk-steps">
<li>Go to <a href="https://github.com/NanoVNA-Saver/nanovna-saver/releases">github.com/NanoVNA-Saver/nanovna-saver/releases</a>. At the top (newest) release, open <strong>Assets</strong> and click the Windows <code>.exe</code> file. Wait until the download has completely finished.</li>
<li>Double-click the file in your Downloads folder. No installation is needed: NanoVNA-Saver runs straight from the downloaded file. If Windows shows a blue warning, click <strong>More info</strong> and then <strong>Run anyway</strong>.</li>
<li>Bottom left, under <strong>Serial port control</strong>: choose your COM port from the list and click <strong>Connect to device</strong>. The button changes to <strong>Disconnect</strong>.</li>
<li>Top left, under <strong>Sweep control</strong>: enter Start and Stop (e.g. <code>6.9M</code> and <code>7.3M</code>) and click <strong>Sweep</strong>. After a few seconds the graphs appear on the right: the connection works.</li>
</ol>

<figure class="mk-fig mk-fig--narrow"><img src="/assets/images/measuring-is-knowing/49-smartscreen.png" alt="Windows SmartScreen warning with More info and Run anyway" loading="lazy"><figcaption>The Windows security warning (SmartScreen) on first start.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | Click **More info**. The warning expands and shows an extra button. |
| **2** | Click **Run anyway**. This starts the program. |

NanoVNA-Saver is free, open-source software without a digital signature from a large publisher. That is why Windows shows this warning the first time. It is normal for this kind of program and not an error.

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip</div>
  <p>Move the <code>.exe</code> file to a fixed folder, for example <code>Documents\NanoVNA</code>, so you can always find it, and put a shortcut on your desktop. If there is no warning at all, or your antivirus blocks the file completely (this happens on some company computers), ask your IT department for an exception or use a private computer.</p>
</div>

| What you see | What it means | What you do |
|---|---|---|
| **Connect to device** stays grey or gives an error | Wrong COM port chosen, or the unit is off | Check that the NanoVNA is on and choose the right port again |
| No graph after **Sweep** | The software is not really talking to the unit. Even with nothing connected to the port you would still get a line, so no line at all means no data | Check that the button reads <strong>Disconnect</strong> (connected), then click Sweep again |

### 8.3 The window, panel by panel

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/38-nanovna-saver-window.png" alt="NanoVNA-Saver main window with numbered panels" loading="lazy"><figcaption>NanoVNA-Saver with four graphs.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Sweep control:** Start, Stop, Center, Span and Segments. Each segment is an extra sweep of 101 points: 10 segments gives 1010 points, a much finer curve. |
| **2** | **Markers:** up to 4 markers. Type a frequency, or click in a graph to place a marker. |
| **3** | **TDR:** opens the window for determining cable length and faults (8.6). |
| **4** | **Reference sweep:** keeps the current measurement as a fixed reference line, to compare before and after (8.5). |
| **5** | **Serial port control, Files and Calibration:** connect, save and calibrate in the software. |
| **6** | **Marker info:** per marker the frequency, impedance (R + jX), VSWR, return loss, and the equivalent coil or capacitor. |
| **7** | **S11 VSWR:** the same as SWR on the instrument. |
| **8** | **S11 Smith Chart:** the same as on the instrument, but larger. |
| **9** | **S11 Return Loss:** LOGMAG on CH0 (4.3). |
| **10** | **S11 R+jX:** resistance and reactance (4.4). |

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip</div>
  <p>You choose which graphs you see via <strong>Display setup</strong> (bottom left). Right-click in a graph to change its scale or type.</p>
</div>

### 8.4 Calibrating in the software

You can use the calibration stored in the instrument itself (then do nothing here), or calibrate in NanoVNA-Saver. The latter has the advantage that the calibration applies to all segments, so a wide multi-segment sweep stays accurate, and that you can keep as many calibrations as you like, as files.

#### On the unit or on the PC?

| Aspect | On the unit (standalone) | In NanoVNA-Saver (PC) |
|---|---|---|
| Number of saved setups | Limited: 7 on my unit (SAVE 0 to 6), fewer on some firmware (3.8) | Unlimited, as files |
| Everything back in one go | Yes, with RECALL: range, display and calibration together (3.7) | No: enter Start/Stop and load the <code>.cal</code> file separately |
| Measuring | Continuous, the curve refreshes by itself | Only after you click <strong>Sweep</strong>, after every change |
| Calibrating | <kbd>CALIBRATE</kbd> menu on the unit (3.6) | <strong>Calibration assistant</strong> only (see the caution below) |
| Best for | Quick checks, out in the field, no laptop | At home: more accurate reading, combining graphs, extra bands that do not fit on the unit |

<ol class="mk-steps">
<li>Click <strong>Calibration</strong>, bottom left. If there is a <strong>Reset</strong> button, click it first to clear an old calibration.</li>
<li>Click <strong>Calibration assistant</strong>. The program asks you to connect short, open and load one at a time (the order may differ). Each time, screw the right cap onto the coupler at the end of the SMA cable (3.6), wait 2 seconds until the reading is stable, and click OK.</li>
<li>Asked for <strong>Through</strong>? For an antenna (Port 1 only) click <strong>Cancel</strong>. Only for filters and chokes do you complete it, with both cable ends joined by the coupler.</li>
<li>Click <strong>Apply</strong>, then <strong>Save</strong> to keep it for next time (use a name with band and connection, e.g. <code>40m_PL.cal</code>).</li>
</ol>

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Use the assistant, not the loose buttons</div>
  <p>The Calibration window also has separate <strong>Open</strong>, <strong>Short</strong>, <strong>Load</strong> and <strong>Through</strong> buttons. Do not use them. The program itself warns that they do not run a sweep and do not interact with the NanoVNA's own calibration. Always use the <strong>Calibration assistant</strong>: it runs the sweep for each cap and guides you through the whole sequence.</p>
</div>

#### One calibration per band, or one wide calibration?

| Approach | Advantage | Disadvantage | Recommended for |
|---|---|---|---|
| **One calibration per band** | Most accurate within that band | You have to calibrate again for each band | Fine tuning, reading the Smith chart |
| **One wide calibration, 1 to 30 MHz** | Quick: do it once for all HF bands | Slightly less accurate at the edges of the range | Quickly checking all bands (8.10) |

#### The Calibration assistant, step by step

This example shows the calibration for 40 m (6.9 to 7.3 MHz). For any other band you repeat the same steps with the range from the band sheet in 8.9.

<ol class="mk-steps">
<li>Enter Start and Stop for the band you want to calibrate (for 40 m: <code>6.9M</code> and <code>7.3M</code>). Always end with the letter <code>M</code>.</li>
<li><strong>Segments:</strong> leave at 1 for every band up to 0.6 MHz wide. Set 2 for 6 m (2 MHz wide). Each segment is 101 measuring points.</li>
<li>Click <strong>Calibration</strong>, bottom left. Click <strong>Reset</strong> (if present) to clear an old calibration.</li>
<li>Click <strong>Calibration assistant</strong>.</li>
</ol>

<div class="mk-grid">
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/50-cal-assistant-open.png" alt="Calibration assistant step 1 of 3, OPEN" loading="lazy"><figcaption>Step 1 of the assistant: OPEN (simplified illustration).</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/51-cal-assistant-done.png" alt="Calibration assistant finished, Apply button" loading="lazy"><figcaption>The assistant has finished.</figcaption></figure>
</div>

| No. | What you see here |
|---|---|
| **1** | **Where you are now** in the sequence. |
| **2** | Only click the next button once the reading on screen is stable (about 2 seconds). When all three steps are done, click **Apply**. |

<ol class="mk-steps">
<li>Screw the cap the assistant asks for (here <strong>OPEN</strong>) onto the <strong>coupler</strong> at the end of your SMA cable: the test cable and the caps are both male and do not fit together directly (3.6). Wait 2 seconds until the reading is stable and click OK.</li>
<li>Swap to the next cap it asks for (<strong>SHORT</strong>), wait and click OK. The coupler stays on; only the cap changes.</li>
<li>Swap to <strong>LOAD</strong>, wait and click OK.</li>
<li>Asked for <strong>Through</strong>? Click <strong>Cancel</strong> for an antenna measurement (Port 1 only).</li>
<li>Click <strong>Apply</strong>. The calibration is now active for this frequency range.</li>
</ol>

The assistant may ask for the caps in the order short, open, load or open, short, load. Both are fine, as long as the cap on the coupler is the one it asks for. Never use the separate Open, Short, Load and Through buttons (see 8.4).

#### Saving the calibration as a file

<figure class="mk-fig mk-fig--narrow"><img src="/assets/images/measuring-is-knowing/52-save-calibration.png" alt="Save dialog with file name 40m_PL.cal" loading="lazy"><figcaption>Use a clear file name.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **File name with band and connection**, for example <code>40m_PL.cal</code>. You will recognise it straight away later. |
| **2** | **Save** confirms and closes the window. |

<ol class="mk-steps">
<li>Under Calibration, click <strong>Save</strong>.</li>
<li>Type a clear name following the pattern <code>&lt;band&gt;_&lt;connection&gt;.cal</code>, for example <code>40m_PL.cal</code>.</li>
<li>Choose a fixed folder, for example <code>Documents\NanoVNA\calibrations</code> (create it before you start), and click Save.</li>
<li>Repeat the assistant and the save for every band in 8.9, each time with that band's start and stop frequency.</li>
</ol>

#### One wide calibration for all HF bands

<ol class="mk-steps">
<li>Enter Start <code>1M</code> and Stop <code>30M</code>.</li>
<li>Increase <strong>Segments</strong> to at least 8. That gives 808 measuring points instead of 101: sharp enough for all bands at once.</li>
<li>Run the Calibration assistant as above with this wide range.</li>
<li>Save it as <code>HF_1-30MHz_PL.cal</code>.</li>
</ol>

#### Loading a saved calibration

<ol class="mk-steps">
<li>Under Calibration, click <strong>Load</strong>.</li>
<li>Browse to <code>Documents\NanoVNA\calibrations</code> and double-click the <code>.cal</code> file you need.</li>
<li>Check that Start and Stop now show the values of that calibration.</li>
</ol>

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Caution</div>
  <p>A calibration is only valid for the frequency range in which it was made. Load a 40 m calibration and measure on 20 m, and the measurement cannot be trusted. Every band sheet in 8.9 tells you which file to load.</p>
  <p>A software calibration also corrects whatever the instrument sends to the PC. Keep the instrument's own calibration state the same as when you made the <code>.cal</code> file: the simplest habit is to make software calibrations with the instrument's calibration cleared (<kbd>CALIBRATE &gt; RESET</kbd>) and always measure that way. After a firmware update (8.8) the instrument's calibration is wiped; files made this way remain valid.</p>
</div>

### 8.5 Comparing before and after

<ol class="mk-steps">
<li>Measure your antenna and click <strong>Set current as reference</strong>. The measurement stays on screen as a fixed line.</li>
<li>Change the antenna (wire longer or shorter).</li>
<li>Click <strong>Sweep</strong>. The new line appears next to the reference, and you see the effect immediately.</li>
<li>Click <strong>Reset reference</strong> to clear the reference.</li>
</ol>

### 8.6 Cable length in the software (TDR)

<ol class="mk-steps">
<li>Set a wide range, e.g. Start <code>50k</code>, Stop <code>900M</code>, with several segments.</li>
<li>Connect the coax with its far end open and click <strong>Sweep</strong>.</li>
<li>Click <strong>Time Domain Reflectometry</strong>, then choose the cable type or enter the velocity factor.</li>
<li>The window shows the estimated cable length and a graph with the step, as in 7.1.</li>
</ol>

### 8.7 Saving for your log or blog

- **Files &gt; Save 1-Port file (S1P):** saves the complete antenna measurement. Via Files you can load it again later to compare.
- **Files &gt; Save 2-Port file (S2P):** for filters and chokes.
- **Screenshot:** press <kbd>Windows</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> and drag a frame around the window. Paste it into your blog or document.
- **Screenshot of the instrument itself:** use NanoVNA-App by OneOfEleven, which has a button to save the NanoVNA screen as an image.

#### A file naming convention that sorts itself

Use the same pattern for every saved measurement, so your files end up in a logical order automatically:

<p style="text-align:center;"><code>YYYY-MM-DD_antenna_band.s1p</code> &nbsp; for example &nbsp; <code>2026-09-26_EFHW_40m.s1p</code></p>

<ol class="mk-steps">
<li>After a successful sweep, click <strong>Files</strong> and then <strong>Save 1-Port file (S1P)</strong>.</li>
<li>Browse to (or create) the folder <code>Documents\NanoVNA\measurements</code>.</li>
<li>Type the file name following the pattern above and click Save.</li>
<li>For a screenshot to go with it: <kbd>Windows</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>, drag a frame around the window, paste it into Paint (<kbd>Ctrl</kbd> + <kbd>V</kbd>) and save it under the same name, but as <code>.png</code>.</li>
<li>Repeat for every band you have measured.</li>
</ol>

To look at an old measurement again: click **Files**, then **Load as sweep** (it appears in the graphs as if you had just measured it) or **Load reference** (it appears as a fixed comparison line next to a new sweep).

### 8.8 Updating the firmware (only if needed)

The firmware on your H4 works fine; you do not need to update to get started. Only do it if you are missing a function or run into a bug. After an update you must redo all calibrations, including TOUCH CAL.

<ol class="mk-steps">
<li>Check your current version: <kbd>CONFIG &gt; VERSION</kbd>.</li>
<li>Download the latest DFU firmware for the NanoVNA-H4 (DiSlord) via the nanovna-users group (appendix E). Choose a file that ends in <code>.dfu</code> and has <strong>H4</strong> in its name, not just H.</li>
<li>Download NanoVNA-App by OneOfEleven, and install the DfuSe software from STMicroelectronics (it contains the DFU driver you need).</li>
<li>Put the NanoVNA into DFU mode: <kbd>CONFIG &gt; DFU &gt; RESET AND ENTER DFU</kbd>. The screen goes black or shows a DFU message. That is normal.</li>
<li>Connect it to the PC. Device Manager now shows <strong>STM Device in DFU Mode</strong> under Universal Serial Bus controllers.</li>
<li>Open NanoVNA-App, click the <strong>Upload VNA firmware</strong> button, choose your <code>.dfu</code> file and wait for the message that the unit must restart.</li>
<li>Switch the NanoVNA off and on again. Redo TOUCH CAL (3.1) and all calibrations.</li>
</ol>

<div class="mk-grid">
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/39-dfu-mode.png" alt="NanoVNA screen in DFU mode" loading="lazy"><figcaption>The NanoVNA in DFU mode.</figcaption></figure>
<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/40-device-manager-dfu.png" alt="Device Manager showing STM Device in DFU Mode" loading="lazy"><figcaption>In DFU mode the unit appears under USB controllers.</figcaption></figure>
</div>

| No. | What you see here |
|---|---|
| **1** | **STM Device in DFU Mode:** the unit is ready for the update. |
| **2** | **Look under this heading**, no longer under Ports. |

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Caution</div>
  <p>Always choose firmware for your model (H4). The wrong firmware will not damage the unit, but it will not work either: repeat the update with the correct file. If you can no longer get into DFU mode, switch the unit off, hold the jog switch pressed in, and switch it on again.</p>
</div>

### 8.9 Step by step: an SWR sweep per band {#band-plan}

This is the practical routine: the same fixed method for every band, followed by a short sheet per band with the right settings. It assumes you have made a calibration file per band (8.4), or one wide HF calibration.

<div class="mk-callout mk-safety">
  <div class="mk-callout__k">Safety</div>
  <p>Discharge the antenna before you connect it, and disconnect the transceiver from the antenna line. See 0.3 and 0.4 for exactly how.</p>
</div>

#### The fixed routine (for every band)

<ol class="mk-steps">
<li>Disconnect the transceiver from the antenna switch.</li>
<li>Discharge the coax: hold the centre pin of the PL-259 against the metal nut for 2 seconds.</li>
<li>Set the antenna switch to the antenna you want to measure.</li>
<li>In NanoVNA-Saver, enter Start and Stop from the band sheet below.</li>
<li>Under Calibration, click <strong>Load</strong> and choose that band's <code>.cal</code> file (or the wide HF file).</li>
<li>Check that Start and Stop still show the band's values after loading. If they do not match the file, the calibration does not fit the range.</li>
<li>Connect the antenna coax to the NanoVNA (via the SMA cable, the coupler if your adapter needs it, and the SO-239 adapter, exactly as when you calibrated).</li>
<li>Click <strong>Sweep</strong>. The software only measures when you click; after every change, click Sweep again.</li>
<li>Run the checklist in 3.10 (format, range, shape of the curve).</li>
<li>Click the lowest point of the curve in the VSWR graph to put a marker on it, or read the value in the marker table on the left.</li>
<li>Write down the frequency and the SWR at the lowest point.</li>
<li>Compare with the "expected dip" column in the band sheet and with the "what if I see this" table below.</li>
<li>Save the result (8.7) before you move on to the next band.</li>
</ol>

#### Band sheets

Set the range with Start and Stop, **or** with Center and Span, never both one after the other: entering one pair recalculates the other. Center is the middle frequency, Span the total width. All values in MHz, ending with the letter <code>M</code>.

| Band | Start / Stop | Center / Span | Segments | Calibration file | Expected dip |
|---|---|---|---|---|---|
| **160 m** | <code>1.8M</code> / <code>2.0M</code> | <code>1.9M</code> / <code>0.2M</code> | 1 | <code>160m_PL.cal</code> | inside 1.81 to 2.0 MHz |
| **80 m** | <code>3.5M</code> / <code>3.8M</code> | <code>3.65M</code> / <code>0.3M</code> | 1 | <code>80m_PL.cal</code> | around 3.65 MHz (depends on the antenna length) |
| **60 m** | <code>5.3M</code> / <code>5.4M</code> | <code>5.35M</code> / <code>0.1M</code> | 1 | <code>60m_PL.cal</code> | around 5.36 MHz (check your national allocation) |
| **40 m** | <code>6.9M</code> / <code>7.3M</code> | <code>7.1M</code> / <code>0.4M</code> | 1 | <code>40m_PL.cal</code> | around 7.1 MHz |
| **30 m** | <code>10.0M</code> / <code>10.2M</code> | <code>10.1M</code> / <code>0.2M</code> | 1 | <code>30m_PL.cal</code> | around 10.12 MHz |
| **20 m** | <code>13.9M</code> / <code>14.5M</code> | <code>14.2M</code> / <code>0.6M</code> | 1 | <code>20m_PL.cal</code> | around 14.15 MHz |
| **17 m** | <code>18.0M</code> / <code>18.2M</code> | <code>18.1M</code> / <code>0.2M</code> | 1 | <code>17m_PL.cal</code> | around 18.12 MHz |
| **15 m** | <code>20.9M</code> / <code>21.5M</code> | <code>21.2M</code> / <code>0.6M</code> | 1 | <code>15m_PL.cal</code> | around 21.2 MHz |
| **12 m** | <code>24.8M</code> / <code>25.0M</code> | <code>24.9M</code> / <code>0.2M</code> | 1 | <code>12m_PL.cal</code> | around 24.94 MHz |
| **11 m** (CB, not an amateur band) | <code>26.9M</code> / <code>27.4M</code> | <code>27.15M</code> / <code>0.5M</code> | 1 | <code>11m_PL.cal</code> | only to check a CB antenna |
| **10 m** | <code>28.0M</code> / <code>29.7M</code> | <code>28.85M</code> / <code>1.7M</code> | 1 or 2 | <code>10m_PL.cal</code> | depends strongly on the antenna; multiband antennas are often tuned broader here |
| **6 m** | <code>50.0M</code> / <code>52.0M</code> | <code>51.0M</code> / <code>2.0M</code> | 2 | <code>6m_PL.cal</code> | around 50.5 MHz |

On my own unit the wide sweep and 80, 40, 30, 20, 15 and 10 m also live in its memory slots (3.8); the PC files are there for everything else. Which of these bands you may transmit on depends on your licence class.

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">30 m is narrow</div>
  <p>The 30 m band is only 50 kHz wide (10.100 to 10.150 MHz); the sheet sweeps 200 kHz around it. With 101 points that is a point every 2 kHz, sharp enough with one segment. Calibrate extra carefully here: on a narrow band every small error shows.</p>
</div>

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">10 m and 6 m are wide</div>
  <p>10 m is 1.7 MHz wide and 6 m 2 MHz. Use 2 segments for a sharper curve, or measure 10 m in two steps, <code>28.0M</code> to <code>28.7M</code> and <code>28.7M</code> to <code>29.7M</code>, if your antenna is narrowband there.</p>
</div>

#### What if I see this? (applies to every band)

| What you see | What it means | What you do |
|---|---|---|
| **Dip above the band** | Antenna electrically too short for this band | Lengthen the wire, measure again |
| **Dip below the band** | Antenna electrically too long | Shorten the wire in small steps, measure again |
| **Dip in the band, SWR 1.0 to 1.5** | Good | Nothing; save the result (8.7) |
| **Dip in the band, SWR above 2** | Resonant, but the wrong impedance | Check the balun or matching (Smith chart, 5.4) |
| **No dip, high and flat everywhere** | Open circuit, short circuit, or the wrong calibration loaded | Check which <code>.cal</code> file is loaded, check the coax |
| **A jagged, jumpy line** | Wrong format (PHASE instead of VSWR), a loose connector, or interference | Check the graph type, tighten the connectors, measure again |
| **The curve looks different from the last measurement of the same band** | Calibration for a different range loaded, or the antenna has physically changed | Load the right <code>.cal</code> file and measure again |

### 8.10 All bands in one sweep {#all-bands}

Handy for seeing at a glance whether all bands of a multiband antenna (a fan dipole, a trap dipole, an EFHW or a multiband vertical) are still where they should be, without switching band by band.

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Not for linked dipoles</div>
  <p>A linked dipole such as the SOTAbeams Band Hopper only resonates on the band its links are set for. You will not see all its bands in one sweep: set the links for a band, sweep that band, and repeat.</p>
</div>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/53-all-bands-sweep.png" alt="VSWR sweep from 1 to 30 MHz with a dip in every band" loading="lazy"><figcaption>1 to 30 MHz in one sweep, with band markers.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **The 40 m dip**, with a marker on it. |
| **2** | **Title bar:** confirms the range (1 to 30 MHz) and the number of segments (8, good for 808 measuring points). |

<ol class="mk-steps">
<li>Disconnect the transceiver and discharge the coax (8.9).</li>
<li>Enter Start <code>1M</code> and Stop <code>30M</code>.</li>
<li>Increase Segments to 8.</li>
<li>Load the wide calibration: Calibration &gt; Load &gt; <code>HF_1-30MHz_PL.cal</code> (8.4).</li>
<li>Connect the antenna and click <strong>Sweep</strong>.</li>
<li>Click each dip you expect (80, 40, 30, 20, 15, 10 m) to put a marker on it.</li>
<li>Check each band: is the dip inside the band limits from the band sheets in 8.9?</li>
<li>A band without a clear dip? Zoom in by setting Start and Stop to just that band, load that band's <code>.cal</code>, and measure again as in 8.9.</li>
</ol>

<div class="mk-callout mk-tip">
  <div class="mk-callout__k">Tip</div>
  <p>Click <strong>Set current as reference</strong> to keep this wide measurement as a comparison line. Measure again later and you see immediately whether anything in your antenna system has changed.</p>
</div>


## 9. Phase 2: the tinySA and your transmitter {#tinysa}

### 9.1 First power-up

<ol class="mk-steps">
<li>Charge the tinySA via USB-C (phone charger or PC) and switch it on.</li>
<li><strong>Calibrate the screen:</strong> <kbd>CONFIG &gt; TOUCH CAL</kbd>, tap the corners it asks for, then <kbd>CONFIG &gt; SAVE CONFIG</kbd>.</li>
<li><strong>Self test:</strong> connect the LOW and HIGH ports with one of the short SMA cables from the box (tighten the nuts with your fingers) and tap <kbd>CONFIG &gt; SELF TEST</kbd>. The test takes about ten seconds; every line must show PASS.</li>
<li><strong>Level calibration</strong> with the same cable: <kbd>CONFIG &gt; LEVEL CAL &gt; CALIBRATE</kbd>. Then remove the cable.</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/41-tinysa-menu.png" alt="The tinySA main menu" loading="lazy"><figcaption>The tinySA main menu.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | <kbd>FREQUENCY</kbd>: start, stop, center, span. |
| **2** | <kbd>MARKER</kbd>: markers and peak search. |
| **3** | <kbd>CONFIG</kbd>: self test, calibration, touch cal. |
| **4** | <kbd>MODE</kbd>: LOW INPUT (HF up to 2 m) or HIGH INPUT (70 cm). |

### 9.2 Why you always use external attenuation

The tinySA's input can take at most **+10 dBm, which is 10 milliwatts**. Your QMX delivers a few watts: hundreds of times more. That is why you **always** put two external attenuators between the transmitter and the tinySA. The internal attenuator is not protection: one wrong setting, or a PRESET that sets it to 0 dB, and the input is gone.

| Transmit power | In dBm | After 40 dB | After 40 + 10 dB | Safe? |
|---|---|---|---|---|
| 1 W | +30 dBm | &minus;10 dBm | &minus;20 dBm | Yes |
| 5 W (QMX, IC-7300 at 5 W) | +37 dBm | &minus;3 dBm | &minus;13 dBm | Yes |
| 10 W | +40 dBm | 0 dBm | &minus;10 dBm | Yes, but the 40 dB attenuator is at its maximum: only very briefly |
| 100 W | +50 dBm | +10 dBm | 0 dBm | **NO:** the 40 dB attenuator (rated 10 W) burns out |

If the dBm column still feels like magic, the [dB &amp; dBm course](/2026/06/01/decibels-for-radio-amateurs/) covers exactly this kind of chain calculation.

#### Turning your transmitter's power down

- **IC-7300:** press the <kbd>MULTI</kbd> knob briefly, select **RF POWER** with the knob, and turn it to about 5%. While transmitting, check on the Po meter that you are at around 5 W.
- **QMX:** the output depends on the supply voltage and the version. For the calculation, always assume a maximum of 5 W.

<div class="mk-callout mk-safety">
  <div class="mk-callout__k">Safety</div>
  <p>Check the power <strong>before</strong> you connect the attenuators, with the transmitter on a dummy load or on your normal antenna. Never more than 10 W, not even briefly.</p>
</div>

### 9.3 Connecting

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/42-attenuator-chain.png" alt="Attenuator chain from QMX through 40 dB and 10 dB attenuators to the tinySA" loading="lazy"><figcaption>The attenuator chain. The 10 W attenuator always comes first.</figcaption></figure>

<ol class="mk-steps">
<li>Transmitter <strong>off</strong>.</li>
<li><strong>QMX:</strong> fit the BNC male/SMA female adapter to the BNC antenna socket (push and turn a quarter turn clockwise). <strong>IC-7300:</strong> PL-PL patch cable into the antenna socket, with the SMA/SO-239 adapter on its other end.</li>
<li>Screw the <strong>40 dB 10 W attenuator</strong> with its SMA male side onto that adapter. So the side with the heat sink fins is on the transmitter side.</li>
<li>Screw the <strong>10 dB 2 W attenuator</strong> with its SMA male side onto the output of the 40 dB one.</li>
<li>Connect the output of the 10 dB attenuator to the tinySA's <strong>LOW</strong> input with one of the supplied SMA cables.</li>
<li>Check the order one more time: <strong>transmitter, 40 dB, 10 dB, tinySA</strong>.</li>
</ol>

### 9.4 Measuring harmonics

#### Setting up

<ol class="mk-steps">
<li><strong>Input:</strong> <kbd>MODE &gt; LOW INPUT</kbd>.</li>
<li><strong>Range:</strong> <kbd>FREQUENCY &gt; START</kbd> <kbd>0 M</kbd>, <kbd>FREQUENCY &gt; STOP</kbd> <kbd>30 M</kbd>. For 40 m you then see the fundamental plus the 2nd, 3rd and 4th harmonics.</li>
<li><strong>Account for the external attenuation:</strong> <kbd>LEVEL &gt; EXT GAIN</kbd>, tap the minus sign, <kbd>5</kbd>, <kbd>0</kbd> and <kbd>x1</kbd>. The tinySA now shows the true level at the transmitter output.</li>
<li><strong>Top of the screen:</strong> <kbd>LEVEL &gt; REF LEVEL</kbd>, tap <kbd>40</kbd> and <kbd>x1</kbd> (+40 dBm, just above 5 W).</li>
<li>Look at the status column on the left: it must read <strong>Ext G -50dB</strong>.</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/43-ext-gain.png" alt="Entering EXT GAIN of minus 50 dB on the tinySA" loading="lazy"><figcaption>Setting EXT GAIN to &minus;50 dB.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | The <kbd>LEVEL</kbd> menu, with <kbd>EXT GAIN</kbd> selected. |
| **2** | **Minus sign and x1** to confirm. |
| **3** | **The value entered:** &minus;50 (40 + 10 dB of external attenuation). |

#### Measuring

<ol class="mk-steps">
<li>Set the transmitter to 7.074 MHz, in CW or TUNE (a clean carrier).</li>
<li>Press the CW key or TUNE, count calmly to 5 and release. Then let it rest for at least 20 seconds so the attenuator can cool down.</li>
<li>While transmitting: <kbd>MARKER &gt; SEARCH &gt; MAX PEAK</kbd> puts marker 1 on the fundamental.</li>
<li>Put marker 2 on 14.148 MHz and marker 3 on 21.222 MHz (twice and three times your frequency). Or use <kbd>MEASURE &gt; HARMONIC</kbd> if your firmware has it.</li>
<li>Subtract marker 2's level from marker 1's: that is the suppression of the 2nd harmonic in dB, expressed as dBc (dB relative to the carrier).</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/44-harmonics.png" alt="tinySA spectrum of a QMX on 7.074 MHz with 2nd and 3rd harmonics" loading="lazy"><figcaption>A QMX on 7.074 MHz with its 2nd and 3rd harmonics.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Marker 1:** fundamental at 7.074 MHz, +36.9 dBm. With EXT GAIN &minus;50 this is the true level: about 4.9 W. |
| **2** | **Markers 2 and 3:** &minus;12.6 dBm and &minus;20.4 dBm, so 49.5 and 57.3 dB below the fundamental (dBc). |
| **3** | **Status column:** span, RBW, attenuation, EXT GAIN, reference, scale. Always check for <strong>Ext G -50dB</strong> here. |
| **4** | **The fundamental:** always the highest peak. |

#### Real or fake? The check

A spectrum analyser that receives too much signal generates harmonics of its own. So check your result like this:

<ol class="mk-steps">
<li>Write down how many dB the 2nd harmonic is below the fundamental (e.g. 49.5 dB).</li>
<li>Transmitter off. Unscrew the 10 dB attenuator and connect the 40 dB attenuator directly to the tinySA (5 W then becomes &minus;3 dBm, still safe). Set EXT GAIN to &minus;40.</li>
<li>Measure again and compare.</li>
</ol>

| What you see | What it means | What you do |
|---|---|---|
| The difference between fundamental and harmonic stays the same | The harmonic really comes from your transmitter | The result is reliable |
| The difference changes clearly | The tinySA is generating part of it | Always measure with both attenuators and use that value |

#### Judging the result

| What you see | What it means | What you do |
|---|---|---|
| 2nd and 3rd harmonic more than 50 dB below the fundamental | A very clean signal | Nothing |
| Between 40 and 50 dB | Acceptable for QRP; check the current BIPT requirements | Consider an extra low-pass filter |
| Less than 40 dB | Too much unwanted emission | Do not transmit on that band; check the filter (7.2) |

For a worked example of what a full spectrum analysis of a real transmitter looks like, see [my Yaesu FT-65 under the microscope](/2026/05/15/spectrum-analysis-yaesu-ft65/).

### 9.5 Checking frequency and power

- **Frequency:** marker 1 with MAX PEAK. For a precise reading, narrow the range, e.g. 7.0 to 7.15 MHz.
- **Power:** with EXT GAIN &minus;50 you read the level directly in dBm: +37 dBm is 5 W, +33 dBm is 2 W, +30 dBm is 1 W. Accuracy is about 1 to 2 dB.

### 9.6 Hunting interference sources

Here you transmit nothing: the tinySA is completely safe and works as a sensitive receiver. You do not need attenuators for this.

<ol class="mk-steps">
<li>Set <kbd>LEVEL &gt; EXT GAIN</kbd> back to 0.</li>
<li>Screw the supplied telescopic antenna (or a 1 m piece of wire) onto the LOW input.</li>
<li>Set the range to the band with the interference: <kbd>FREQUENCY &gt; START</kbd> <kbd>6.9 M</kbd> and <kbd>STOP</kbd> <kbd>7.3 M</kbd>.</li>
<li>Walk through the house with the tinySA. Where the peaks are highest, the source is close.</li>
<li>Switch suspect devices off one at a time and watch whether the peaks disappear.</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/45-interference.png" alt="tinySA showing a regular pattern of interference peaks on 40 m" loading="lazy"><figcaption>Interference with a regular pattern of peaks.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Peaks at equal spacing:** typical of switch-mode power supplies, chargers and inverters. |

| What you see | What it means | What you do |
|---|---|---|
| Peaks at a fixed spacing | Switch-mode power supply or inverter | Switch devices off one at a time |
| A broad rise in the noise floor | Broadband interference (PLC, LED lighting) | The same, plus ferrites on the power leads (chapter 10) |

## 10. Phase 3: chokes and ferrites {#chokes}

### 10.1 What are you measuring?

A choke lets the normal signal *inside* the coax pass, but blocks current flowing over the *outside* of the shield: the **common-mode current**. That current carries RF into the house. The higher the choke's impedance for that current, the better.

<div class="mk-callout mk-caution">
  <div class="mk-callout__k">Caution</div>
  <p>The ordinary S21 measurement from 7.2 (through the connectors, through the coax) shows almost 0 dB with a good choke and tells you nothing about choking. The test signal has to run over the <em>outside</em> of the shield. That is what the clip leads are for.</p>
</div>

### 10.2 Connecting

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/46-choke-clips.png" alt="Clip lead setup: red clips on the connector bodies on both sides of the choke, black clips joined" loading="lazy"><figcaption>Red clips on the metal body of the connectors on both sides, black clips joined together.</figcaption></figure>

<ol class="mk-steps">
<li>Screw a BNC female/SMA male adapter onto CH0 and onto CH1 (turn only the small nut, with your fingers).</li>
<li>Push the BNC plug of each clip lead onto an adapter and turn a quarter turn clockwise until it clicks.</li>
<li>Clip the red clip from CH0 onto the metal outside (the nut) of the connector on one side of the choke. <strong>Never on the centre pin.</strong></li>
<li>Clip the red clip from CH1 onto the metal outside of the connector on the other side.</li>
<li>Clip the two black clips to each other, and keep them away from the choke.</li>
</ol>

### 10.3 Calibrating and measuring

<ol class="mk-steps">
<li><strong>Set up:</strong> START <kbd>1 M</kbd>, STOP <kbd>30 M</kbd>, <kbd>LOGMAG</kbd>, <kbd>CH1 THROUGH</kbd>, scale 10, reference 7.</li>
<li><strong>Calibration without the choke:</strong> clip red to red and black to black. Tap <kbd>CALIBRATE &gt; RESET</kbd>, then <kbd>CALIBRATE &gt; CALIBRATE &gt; THRU</kbd>, then <kbd>DONE</kbd> (save it only if you have a free slot, 3.8). The line must now sit at 0 dB.</li>
<li>Clip the choke in between, as in 10.2.</li>
<li>Put marker 1 on 7.1 MHz (or the band with the interference) and read the attenuation at the top.</li>
</ol>

<figure class="mk-fig"><img src="/assets/images/measuring-is-knowing/47-choke-result.png" alt="S21 of a good choke around 40 m, about minus 32 dB" loading="lazy"><figcaption>A good choke around 40 m.</figcaption></figure>

| No. | What you see here |
|---|---|
| **1** | **Attenuation at the marker:** about &minus;32 dB at 7.1 MHz. |
| **2** | **The marker** on the band with the interference. |

### 10.4 Converting to ohms

The choke's impedance is roughly **Z &asymp; 100 &times; (10<sup>attenuation/20</sup> &minus; 1)** ohm. No maths? Use this table.

| Attenuation | Impedance | Verdict |
|---|---|---|
| 10 dB | about 220 ohm | Weak |
| 20 dB | about 900 ohm | Minimum |
| 26 dB | about 1900 ohm | Good |
| 30 dB | about 3100 ohm | Very good |
| 40 dB | about 9900 ohm | Excellent |

| What you see | What it means | What you do |
|---|---|---|
| Less than 20 dB on the band with interference | The choke is too weak on that band | More turns, or a different ferrite material (e.g. mix 31 for HF) |
| High attenuation on a different band | The choke is not tuned to your band | A different choke, or a different number of turns |
| More than 26 dB on the band with interference | A good choke | Nothing |

If you want to go deeper into ferrite materials, my post on [ferrite mix 43 and the 49:1 unun](/2026/07/14/ferrite-mix-43-and-the-49-1-unun/) compares mixes with bench measurements.

### 10.5 Measuring clip-on ferrites on a cable

<ol class="mk-steps">
<li>Take a piece of wire about 50 cm long, or the cable the ferrite is meant for.</li>
<li>Snap the ferrite shut around the wire.</li>
<li>Red clips on the two ends of the wire, black clips joined together.</li>
<li>Measure with 1 ferrite, then 2, then 3 side by side, and note the attenuation at 7.1 MHz each time.</li>
<li>This shows you how much each extra ferrite really adds.</li>
</ol>


## Appendices {#appendices}

### A. Quick card: measuring an antenna {#appendix-a}

<ol class="mk-steps">
<li><kbd>RECALL</kbd> plus the slot of your band, for example <kbd>RECALL 2</kbd> for 40 m (or set up and calibrate, 3.6).</li>
<li>Check format, range and the C on the left edge (3.10).</li>
<li>Disconnect the transceiver (0.4).</li>
<li>Discharge the coax: centre pin against the nut for 2 seconds (0.3).</li>
<li>Connect the coax via the SO-239 adapter.</li>
<li><kbd>MARKER &gt; SEARCH &gt; MINIMUM</kbd>.</li>
<li>Read the frequency and SWR, compare with the table in 6.1.</li>
<li>Disconnect the VNA, reconnect the transceiver.</li>
</ol>

### B. Start and stop per band {#appendix-b}

| Band | START | STOP |
|---|---|---|
| 160 m | 1.8 M | 2.0 M |
| 80 m | 3.5 M | 3.8 M |
| 60 m | 5.3 M | 5.4 M |
| 40 m | 6.9 M | 7.3 M |
| 30 m | 10.0 M | 10.2 M |
| 20 m | 13.9 M | 14.5 M |
| 17 m | 18.0 M | 18.2 M |
| 15 m | 20.9 M | 21.5 M |
| 12 m | 24.8 M | 25.0 M |
| 11 m (CB, check only) | 26.9 M | 27.4 M |
| 10 m | 28.0 M | 29.7 M |
| 6 m | 50.0 M | 52.0 M |
| 2 m | 144 M | 146 M |
| 70 cm | 430 M | 440 M |

### C. Conversion tables {#appendix-c}

| SWR | Return loss | Reflected power |
|---|---|---|
| 1.0 | infinite | 0% |
| 1.2 | &minus;20.8 dB | 0.8% |
| 1.5 | &minus;14.0 dB | 4% |
| 2.0 | &minus;9.5 dB | 11% |
| 3.0 | &minus;6.0 dB | 25% |

| Power | dBm |
|---|---|
| 1 mW | 0 dBm |
| 10 mW | +10 dBm (tinySA limit) |
| 1 W | +30 dBm |
| 5 W | +37 dBm |
| 10 W | +40 dBm |
| 100 W | +50 dBm |

### D. Glossary {#appendix-d}

| Term | Meaning |
|---|---|
| **VNA** | Vector network analyser: measures reflection and transmission |
| **SWR** | Standing wave ratio: how well the antenna accepts the power |
| **S11** | Reflection at port 1 (CH0) |
| **S21** | Transmission from port 1 to port 2 |
| **Return loss** | S11 in dB: the deeper, the better |
| **R and X** | Resistance and reactance, together the impedance |
| **Inductive / capacitive** | Coil or capacitor behaviour; for antennas: too long or too short |
| **OSL** | Open, short, load: the three calibration caps |
| **THRU** | A direct connection, used for S21 calibration |
| **Smith chart** | A chart showing resistance and reactance together |
| **TDR** | Conversion to distance: cable length and faults |
| **DFU** | Mode for loading new firmware |
| **dBm** | Power relative to 1 milliwatt |
| **dBc** | Level relative to the carrier (the fundamental) |
| **EXT GAIN** | tinySA correction for external attenuation |
| **Common mode** | Current flowing over the outside of the coax shield |

### E. Links and sources {#appendix-e}

- [tinySA wiki (official)](https://www.tinysa.org/wiki/)
- [NanoVNA-Saver releases](https://github.com/NanoVNA-Saver/nanovna-saver/releases)
- [nanovna-users group (firmware, manuals)](https://groups.io/g/nanovna-users)
- [NanoVNA-App (OneOfEleven)](https://github.com/OneOfEleven/NanoVNA-H/tree/master/Release)
- [STM32 Virtual COM Port driver](https://www.st.com/en/development-tools/stsw-stm32102.html)
- [DfuSe (DFU driver and software)](https://www.st.com/en/development-tools/stsw-stm32080.html)
- [W2AEW's videos on the NanoVNA](https://www.youtube.com/w2aew), an excellent visual companion to this guide

Background reading: *Absolute Beginner's Guide to NanoVNA* by Martin Svaco 9A2JK, and the *NanoVNA User Guide* by Hugen. Both are well worth reading once the basics in this guide feel comfortable.

### F. Menu names per firmware {#appendix-f}

Depending on the firmware on your unit, a menu may have a slightly different name. This table helps you find the right button.

| In this guide | Older firmware (edy555, Hugen) | Note |
|---|---|---|
| <kbd>CALIBRATE</kbd> | <kbd>CAL</kbd> | Same menu |
| <kbd>CALIBRATE &gt; CALIBRATE</kbd> | <kbd>CAL &gt; CALIBRATE</kbd> | Open, short, load, isoln, thru, done |
| <kbd>RECALL</kbd> | <kbd>RECALL</kbd> or <kbd>RECALL/SAVE</kbd> | Same function. The number of slots differs: 5, 6 or 7 (SAVE 0 to 6). Count yours (3.8) |
| <kbd>CALIBRATE &gt; SAVE</kbd> | <kbd>SAVE</kbd> in the main menu | Saves range, display and calibration in a slot |
| <kbd>STIMULUS &gt; SWEEP POINTS</kbd> | not present | Older firmware always measures 101 points |
| <kbd>MARKER &gt; SEARCH</kbd> | not present | Move the marker manually |
| <kbd>DISPLAY &gt; TRANSFORM</kbd> | sometimes not present | Use TDR in NanoVNA-Saver instead (8.6) |
| <kbd>FORMAT &gt; MORE &gt; RESISTANCE / REACTANCE</kbd> | <kbd>FORMAT &gt; MORE</kbd> | Names may be abbreviated (R, X) |

#### CH0 and CH1, Port 1 and Port 2, S11 and S21

The two ports go by different names depending on the unit, the firmware and the software. They are the same two ports.

| Name on one unit | Name on another unit or in software | What it is | What you use it for |
|---|---|---|---|
| <kbd>CH0</kbd> (<kbd>CH0 REFLECT</kbd>) | Port 1, with S11 next to it | The reflection port | Measuring antennas; the source port for filters and chokes |
| <kbd>CH1</kbd> (<kbd>CH1 THROUGH</kbd>) | Port 2, with S21 next to it | The through port | Only filters and chokes; not needed for an ordinary antenna measurement |

## Download the PDFs {#downloads}

<div class="mk-dl">
  <div style="font-family:var(--f-mono);font-size:0.6rem;letter-spacing:0.2rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.5rem;">Reference &amp; downloads</div>
  <div style="font-family:var(--f-display);font-size:1.15rem;font-weight:700;color:var(--c-text);margin-bottom:0.8rem;">Take it to the bench.</div>
  <p style="font-size:0.9rem;color:var(--c-text-2);margin:0 0 1.4rem;">This article merges two manuals. Both are available as printable PDFs, in English and in the original Dutch, with every figure and table.</p>
  <div class="mk-dl__grid">
    <a href="/assets/files/measuring-nanovna-tinysa-en.pdf">
      <div class="mk-dl__k">PDF &middot; English</div>
      <div class="mk-dl__t">Measuring with the NanoVNA-H4 and tinySA &rarr;</div>
      <div class="mk-dl__d">The main manual, chapters 0 to 10 and appendices</div>
    </a>
    <a href="/assets/files/swr-sweep-per-band-en.pdf">
      <div class="mk-dl__k">PDF &middot; English</div>
      <div class="mk-dl__t">SWR sweep per band &rarr;</div>
      <div class="mk-dl__d">NanoVNA-Saver, calibration files and band sheets</div>
    </a>
    <a href="/assets/files/meten-nanovna-tinysa-nl.pdf">
      <div class="mk-dl__k">PDF &middot; Nederlands</div>
      <div class="mk-dl__t">Meten met de NanoVNA-H4 en tinySA &rarr;</div>
      <div class="mk-dl__d">De hoofdhandleiding, hoofdstuk 0 tot 10 en bijlagen</div>
    </a>
    <a href="/assets/files/swr-sweep-per-band-nl.pdf">
      <div class="mk-dl__k">PDF &middot; Nederlands</div>
      <div class="mk-dl__t">SWR-sweep per band &rarr;</div>
      <div class="mk-dl__d">NanoVNA-Saver, kalibratiebestanden en bandfiches</div>
    </a>
  </div>
</div>

## Closing thoughts

None of this is difficult once you have done it twice. The first calibration takes ten minutes and a lot of squinting at the manual; the tenth takes thirty seconds. What changes is how you look at your station. An antenna stops being something that "seems to work" and becomes a curve you can read: where it resonates, how wide it is, whether the coax is hiding something, and whether the choke you wound is actually doing its job.

My advice for a first evening: charge the NanoVNA, do the touch calibration, calibrate for 40 m, and measure the antenna you already have. Save the result as your reference. Everything else in this guide builds on that one measurement.

Questions, corrections or your own measurements are always welcome via the [contact page](/contact/).

73 de ON3VZ
