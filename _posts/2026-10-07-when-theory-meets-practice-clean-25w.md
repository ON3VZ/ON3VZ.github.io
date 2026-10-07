---
layout: post
title: "When Theory Meets Practice: How a Layered Setup Keeps My 25 W Clean"
tags: ['Station', 'Antennas', 'EMC', 'Common Mode', 'Chokes', 'Grounding', 'IronWave', 'EFHW', 'IC-7300', 'Beginners']
excerpt: "Why stations keep telling me I sound clean and loud, from a city garden on 25 W. An integrated, multidisciplinary look at antennas, return paths, chokes, ferrites, mains and DC filtering, audio and matching, with the theory, formulas and my own calculations behind every choice."
---
<!-- CLEAN-SIGNAL 2026-10-07: new post. Revert by deleting this file and assets/images/clean-signal/. -->
<style>
/* CLEAN-SIGNAL article styles, scoped to .cs-article; follows the fresh light/dark tokens */
.cs-article { --cs-accent: var(--c-cyan, #1E6BA8); --cs-warm: var(--c-amber, #B8791A); --cs-ok: var(--c-primary, #0E8A50); }
.cs-article .cs-only-dark { display: none; }
html[data-mode="dark"] .cs-article .cs-only-dark { display: block; }
html[data-mode="dark"] .cs-article .cs-only-light { display: none; }
.cs-hero { margin: 0 0 1.6rem; }
.cs-kicker { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--cs-warm) !important; margin: 0 0 .4rem !important; }
.cs-lead { font-size: 1.32rem; line-height: 1.5; color: var(--c-text) !important; font-weight: 300; margin: 0 0 .7rem !important; max-width: 760px; }
.cs-byline { font-family: var(--f-mono); font-size: .8rem; color: var(--c-text-3) !important; margin: 0 0 1.2rem !important; }
.cs-fig { margin: 1.8rem 0 2rem; }
.cs-fig img { display: block; width: 100%; height: auto; border-radius: 14px !important; border: 1px solid var(--c-border) !important; box-shadow: var(--fx-shadow, 0 4px 16px rgba(0,0,0,.12)); }
.cs-fig figcaption { font-size: .86rem; line-height: 1.5; color: var(--c-text-3); margin: .75rem auto 0; max-width: 680px; text-align: center; font-style: italic; }
.cs-hero-img img { aspect-ratio: 16 / 7; object-fit: cover; }
.cs-diagram img { border: 0 !important; box-shadow: none; }
.cs-photo img { max-height: 620px; width: auto; max-width: 100%; margin: 0 auto; }
.cs-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; align-items: start; margin: 1.8rem 0; }
.cs-pair .cs-fig { margin: 0; }
.cs-pair .cs-photo img { max-height: 520px; width: 100%; object-fit: cover; }
.cs-glance { display: grid; grid-template-columns: repeat(4, 1fr); gap: .8rem; margin: 0 0 1.4rem; }
.cs-stat { background: var(--c-surface-2); border: 1px solid var(--c-border); border-radius: 12px; padding: 1rem 1.1rem; }
.cs-stat b { display: block; font-family: var(--f-display); font-size: 2rem; line-height: 1.1; color: var(--c-text); letter-spacing: .01em; }
.cs-stat span { display: block; font-size: .82rem; line-height: 1.35; color: var(--c-text-3); margin-top: .25rem; }
.cs-keypoints { background: var(--c-surface-2); border: 1px solid var(--c-border); border-top: 3px solid var(--cs-ok); border-radius: 12px; padding: 1.2rem 1.5rem .4rem; margin: 0 0 1.6rem; }
.cs-keypoints p:first-child { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--cs-ok) !important; margin-bottom: .5rem !important; }
.cs-keypoints ul { margin-bottom: .8rem !important; }
.cs-toc { border: 1px solid var(--c-border); border-radius: 12px; padding: 1.1rem 1.4rem; margin: 0 0 2.2rem; }
.cs-toc-label { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-text-3) !important; margin: 0 0 .6rem !important; }
.cs-toc ol { list-style: none; padding: 0 !important; margin: 0 !important; columns: 2; column-gap: 2rem; }
.cs-toc li { break-inside: avoid; margin: 0 0 .35rem !important; font-size: .95rem; }
.cs-toc a { text-decoration: none !important; color: var(--c-text) !important; display: flex; gap: .6rem; align-items: baseline; }
.cs-toc a:hover { color: var(--cs-accent) !important; }
.cs-toc a span { font-family: var(--f-mono); font-size: .78rem; color: var(--cs-accent); min-width: 1.4rem; }
.cs-article h2 { scroll-margin-top: 90px; padding-top: 1.4rem; border-top: 1px solid var(--c-border); }
.cs-num { display: inline-flex; align-items: center; justify-content: center; min-width: 2.1rem; height: 2.1rem; margin-right: .7rem; border-radius: 10px; background: var(--cs-accent); color: #fff; font-family: var(--f-mono); font-size: 1rem; font-weight: 600; vertical-align: .2rem; }
.cs-domains { display: grid; grid-template-columns: repeat(2, 1fr); gap: .7rem; margin: 1rem 0 1.6rem; }
.cs-domain { border: 1px solid var(--c-border); border-radius: 12px; padding: .8rem 1rem; background: var(--c-surface); }
.cs-domain span { font-family: var(--f-mono); font-size: .75rem; color: var(--cs-accent); }
.cs-domain strong { display: block; font-size: 1rem; margin: .1rem 0 .2rem; }
.cs-domain p { font-size: .9rem; line-height: 1.45; color: var(--c-text-2) !important; margin: 0 !important; }
.cs-why { position: relative; margin: 2rem 0 2.2rem; padding: 1.2rem 1.5rem .3rem 1.5rem; border-radius: 12px; border: 1px solid var(--c-border); border-left: 4px solid var(--cs-warm); background: var(--c-surface-2); }
.cs-why .cs-why-label { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: var(--cs-warm) !important; margin-bottom: .5rem !important; }
.cs-deep { margin: 1.4rem 0; border: 1px solid var(--c-border); border-radius: 12px; background: var(--c-surface); overflow: hidden; }
.cs-deep > summary { cursor: pointer; list-style: none; padding: .95rem 3rem .95rem 1.2rem; position: relative; background: var(--c-surface-2); line-height: 1.45; }
.cs-deep > summary::-webkit-details-marker { display: none; }
.cs-deep > summary::after { content: "+"; position: absolute; right: 1.2rem; top: 50%; transform: translateY(-50%); font-family: var(--f-mono); font-size: 1.3rem; color: var(--cs-accent); }
.cs-deep[open] > summary::after { content: "−"; }
.cs-deep[open] > summary { border-bottom: 1px solid var(--c-border); }
.cs-deep > summary strong { font-weight: 600; }
.cs-chip { display: inline-block; font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--cs-accent); border: 1px solid var(--cs-accent); border-radius: 999px; padding: .05rem .55rem; margin-right: .5rem; vertical-align: .12rem; }
.cs-deep > :not(summary) { margin-left: 1.3rem; margin-right: 1.3rem; }
.cs-deep > p:nth-child(2) { margin-top: 1.1rem; }
.cs-deep table { font-size: .88rem !important; }
.cs-formula { text-align: center; margin: 1rem 0 1.2rem !important; }
.cs-formula code { display: inline-block; font-size: 1rem; padding: .45rem .9rem; border-radius: 8px; background: var(--c-surface-2); border: 1px solid var(--c-border); color: var(--c-text) !important; }
.cs-article #sources ~ ul { columns: 2; column-gap: 2rem; font-size: .92rem; }
.cs-article #sources ~ ul li { break-inside: avoid; }
@media (max-width: 760px) {
  .cs-glance { grid-template-columns: repeat(2, 1fr); }
  .cs-domains, .cs-pair { grid-template-columns: 1fr; }
  .cs-toc ol, .cs-article #sources ~ ul { columns: 1; }
  .cs-lead { font-size: 1.15rem; }
  .cs-num { min-width: 1.8rem; height: 1.8rem; font-size: .9rem; }
}
.cs-article table thead th { background: #153B5C !important; color: #FFFFFF !important; border-bottom: 0 !important; }
.cs-article .cs-deep table thead th { background: #1E6BA8 !important; }
.cs-dl { display: flex; flex-wrap: wrap; gap: .7rem; align-items: center; border: 1px solid var(--c-border); border-radius: 12px; padding: 1rem 1.3rem; margin: 0 0 1.6rem; background: var(--c-surface-2); }
.cs-dl p { margin: 0 !important; font-size: .95rem; flex: 1 1 260px; color: var(--c-text-2) !important; }
.cs-dl a { display: inline-flex; align-items: center; gap: .4rem; text-decoration: none !important; font-family: var(--f-mono); font-size: .85rem; padding: .5rem .9rem; border-radius: 8px; border: 1px solid var(--cs-accent); color: var(--cs-accent) !important; }
.cs-dl-soon { font-family: var(--f-mono); font-size: .85rem; padding: .5rem .9rem; border-radius: 8px; border: 1px dashed var(--c-border-hard); color: var(--c-text-3); }
.cs-dl a:hover { background: var(--cs-accent); color: #fff !important; }
</style>
<div class="cs-article" markdown="1">
<div class="cs-hero">
<p class="cs-kicker">ON3VZ · Technical article</p>
<p class="cs-lead">Why stations keep telling me I sound clean and loud, from a city garden on 25 W.</p>
<p class="cs-byline">Kristof Cornelis, ON3VZ · Belgian radio amateur, Class C licence · about 40 minutes reading, with fold-out deep dives</p>
<figure class="cs-fig cs-hero-img"><img src="/assets/images/clean-signal/cover-hero.jpg" alt="The radial plate at the base of the IronWave 6 with its 32 radials" loading="eager"></figure>

</div>

<div class="cs-glance">
<div class="cs-stat"><b>25 W</b><span>maximum HF power, Class C</span></div>
<div class="cs-stat"><b>77</b><span>DXCC entities in four months</span></div>
<div class="cs-stat"><b>52</b><span>contacts beyond 5,000 km</span></div>
<div class="cs-stat"><b>−10 dB</b><span>median FT8 report received</span></div>
</div>

<div class="cs-keypoints" markdown="1">
**In short**

- There is no single trick: the result comes from a combination of measures across many domains.
- Every cable that enters or leaves the shack is a path for RF and noise, in both directions.
- Chokes, a defined return path and filtered power keep RF out of the audio, which keeps the signal clean.
- A good match is not the same as efficiency; on 80 m the antenna itself is the weak link.
- Theory, formulas and my own calculations sit in fold-out deep dives, so you can read at your own depth.
</div>

<div class="cs-dl">
<p><strong>Read it offline.</strong> Download this article as a PDF, with all figures and deep dives included.</p>
<a href="{{ '/assets/files/ON3VZ-when-theory-meets-practice-EN.pdf' | relative_url }}" download>PDF · English</a>
<span class="cs-dl-soon">PDF · Nederlands, soon</span>
<span class="cs-dl-soon">PDF · Français, soon</span>
</div>

<nav class="cs-toc" aria-label="Contents"><p class="cs-toc-label">In this article</p><ol><li><a href="#ch-1"><span>1</span>The situation</a></li><li><a href="#ch-2"><span>2</span>Two compliments, two chains</a></li><li><a href="#ch-3"><span>3</span>Not one trick: think in layers</a></li><li><a href="#ch-4"><span>4</span>The two antennas</a></li><li><a href="#ch-5"><span>5</span>The invisible part: coax has two paths</a></li><li><a href="#ch-6"><span>6</span>Chokes: where and why</a></li><li><a href="#ch-7"><span>7</span>Ground, bonding and the busbar</a></li><li><a href="#ch-8"><span>8</span>Mains and the shack circuit</a></li><li><a href="#ch-9"><span>9</span>DC power, device cables and the network</a></li><li><a href="#ch-10"><span>10</span>The audio chain</a></li><li><a href="#ch-11"><span>11</span>Match is not efficiency</a></li><li><a href="#ch-12"><span>12</span>Reading the reports</a></li><li><a href="#ch-13"><span>13</span>How it all comes together</a></li><li><a href="#ch-14"><span>14</span>If I started again</a></li><li><a href="#ch-15"><span>15</span>What comes next, and thank you</a></li></ol></nav>

## Introduction {#introduction}

Stations keep telling me, without being asked, that I sound unusually clean and loud. "It sounds like you are standing next to me." "What antenna are you using?" "You come in very clean and strong." Recently a station in Oman picked me out of a pileup and told me I was coming through clearly over everyone else.

I hold a Belgian Class C licence, which means 25 W on HF. My station sits in an ordinary city garden, surrounded by houses, industry, rooftops and all the electronics that come with them. So the compliments made me curious. Why would a small station in a noisy urban location get this kind of feedback?

This article is my attempt to answer that question honestly and thoroughly. I describe what I built, why I built it that way, and the physics behind each choice, including the formulas. I also want to be clear about what I can and cannot say: I have not measured any of this in a laboratory way. What follows is a careful description of a setup, the observations I made, and the mechanisms that may explain them.

One thing I want to say up front: nothing in this station happened by accident. I built the whole setup deliberately, step by step, following as many established best practices as I could find and with expert advice along the way. My knowledge comes from a lot of reading and gathering information: the technical articles and guidance of RF.Guru (thank you for all that information), the UBA HAREC course material, experiences other amateurs share online, and paying close attention to every piece of feedback I get on the air. The short version of what follows: there is no single trick. What I have is a combination of measures that work together. If you are just starting out, I hope this gives you both inspiration and a realistic picture of what matters. If you are an experienced amateur or an engineer, I hope you find the theory sound and the claims correct.

## Read this as one system {#one-system}

Before you go further, one thing matters more than anything else in this article: my station is the result of an integrated, multidisciplinary approach. I am convinced that no single component, setting or trick explains on its own how it sounds. The result comes from many domains working together, and the article should be read that way. These are the domains it covers:

<div class="cs-domains"><div class="cs-domain"><span>01</span><strong>Antenna design and placement</strong><p>the choice of antennas and where they stand.</p></div><div class="cs-domain"><span>02</span><strong>Return paths and grounding</strong><p>radials, a counterpoise, bonding and what &quot;ground&quot; really means.</p></div><div class="cs-domain"><span>03</span><strong>Transmission lines</strong><p>the coax, its losses and how it transforms impedance.</p></div><div class="cs-domain"><span>04</span><strong>Common-mode control</strong><p>chokes and ferrites along every cable that matters.</p></div><div class="cs-domain"><span>05</span><strong>Electrical installation</strong><p>a separate, filtered circuit for the shack, a filter on the solar inverter and ferrites on its DC strings.</p></div><div class="cs-domain"><span>06</span><strong>DC power</strong><p>a quality power supply followed by a DC filter.</p></div><div class="cs-domain"><span>07</span><strong>Station wiring</strong><p>a busbar, star-wired sockets, ferrites on device cables and a shielded network cable.</p></div><div class="cs-domain"><span>08</span><strong>Audio and transmitter settings</strong><p>microphones, equalizer and a calm ALC.</p></div><div class="cs-domain"><span>09</span><strong>Matching and losses</strong><p>what SWR does and does not tell you, and where power can be lost.</p></div><div class="cs-domain"><span>10</span><strong>Propagation and noise</strong><p>how to read reports, and why signal-to-noise ratio is what counts.</p></div></div>

Each chapter looks at one or more of these domains in depth. Chapter 13 brings them back together in one overview. Keep in mind while reading that each layer on its own is modest; it is the combination that I believe makes the difference.

## <span class="cs-num">1</span>The situation {#ch-1}

My home station is built around an Icom IC-7300 MkII. On HF I run at most 25 W. The antennas stand in and above a city garden, with neighbours close by on all sides.

What I notice on the air:

- I regularly get spontaneous compliments on clear, clean and loud audio, during the QSO and without asking for a report.
- I get picked out of pileups because I come through louder than the other callers.
- The compliments came both with the standard hand microphone of the radio and with my Heil headset.
- On FT8, the vertical antenna tends to reach further. On SSB, the wire antenna often sounds cleaner.
- On 80 m it is a different story. There I often hear that I am much weaker, especially in the upper part of the band.

That last point turns out to be just as interesting as the compliments (read on).

## <span class="cs-num">2</span>Two compliments, two chains {#ch-2}

The feedback I get comes in two flavours. Some stations say I sound clean, "like standing next to me". Others say I am loud: I come in strong, or I get picked out of a pileup. These are two different properties, produced by two different chains, and it helps to keep them apart.

**Clean** is about the quality of the signal itself: no distortion, no hum, no buzz, no splatter into neighbouring channels, natural speech. It is decided before the signal leaves the station, along the chain microphone, audio settings, drive and ALC, linearity of the power amplifier, supply voltage under load, and RF kept out of the audio wiring.

**Loud** is about how much of my signal arrives at the other station compared to the noise there. It is decided after the radio, along the chain transmitter power, feedline loss, match, antenna efficiency, radiation pattern and take-off angle, propagation, and the noise at the receiving end.

A third chain matters for every conversation, even though nobody compliments it: how well I hear the other station. That is decided by the noise that reaches my own receiver.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig9-two-chains-light.svg" alt="Two compliments, two chains: what makes a signal clean, what makes it loud, and what decides how well I hear" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig9-two-chains-dark.svg" alt="Two compliments, two chains: what makes a signal clean, what makes it loud, and what decides how well I hear" loading="lazy"><figcaption>Two compliments, two chains: what makes a signal clean, what makes it loud, and what decides how well I hear</figcaption></figure>

| Measure | Clean | Loud | Hearing others |
|---|---|---|---|
| Microphone, equalizer, calm ALC | ✓ | | |
| Power supply and DC filter | ✓ stable voltage | | ✓ less switching noise |
| Chokes and ferrites | ✓ no RF in the audio | ✓ coax does not distort the pattern | ✓ less noise along the shield |
| Busbar, star wiring, filtered circuit | ✓ no loops, no hum | | ✓ less mains noise |
| Antennas, position, return paths | | ✓ | ✓ |
| Low-loss coax, good match | | ✓ | small effect |
| Timing and propagation | | ✓ | ✓ |
| AetherSDR (receive only) | | | ✓ |

Chokes and ferrites appear in all three columns. That is no coincidence: they control the same unwanted current path, in both directions. Keep these three chains in mind; every chapter that follows feeds one or more of them.

## <span class="cs-num">3</span>Not one trick: think in layers {#ch-3}

I used to think of interference as something that "gets into" the radio. The more I read, the more I learned to think in terms of current paths: every conductor that enters or leaves the shack is a possible path for RF current, in both directions.

My shack has six ways in and out, and I tried to treat each of them:

- **The coax** to the antennas
- **The ground cable** from the outdoor antenna cabinet
- **The mains supply**
- **The DC supply** to the radio
- **The cables between devices** (HDMI, USB, audio)
- **The network cable**

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig1-six-doors-light.svg" alt="The shack as a room with six doors, each with its own filter or choke. Labels: coax, ground cable, mains, DC, device cables, network" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig1-six-doors-dark.svg" alt="The shack as a room with six doors, each with its own filter or choke. Labels: coax, ground cable, mains, DC, device cables, network" loading="lazy"><figcaption>The shack as a room with six doors, each with its own filter or choke. Labels: coax, ground cable, mains, DC, device cables, network</figcaption></figure>

The goal works both ways. On receive, I want to keep local noise from travelling into the shack along these paths. On transmit, I want my own RF to stay in the antenna instead of coming back into the shack, where it could end up in the microphone or audio and travel out again along other cables. The principle that makes this two-way approach possible is reciprocity: a path that couples energy out also couples energy in.

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

Every way in and out of the shack is also a path for RF and noise. By treating all six, transmit energy cannot sneak back into the shack along a forgotten conductor, reach the microphone or the audio, and distort the transmitted signal. In the other direction, local noise cannot walk in through an open door. The consistent approach matters more here than any single measure: one open path can undo the work of the others.

</aside>

## <span class="cs-num">4</span>The two antennas {#ch-4}

### The IronWave 6 vertical

The RF.Guru IronWave 6 is a vertical with a radiator of about 6 m and a 4:1 transformer at the base. It stands free in the middle of the garden. I chose it on the advice of RF.Guru, as a DX antenna for a city garden with limited space, and one that is not too conspicuous for the neighbours and family.

Underneath it lie 32 radials, buried about 1 cm in clay soil. That soil is normally moist, but during the very hot and dry summer it was bone dry, and the antenna seemed to struggle.

<figure class="cs-fig cs-photo"><img src="/assets/images/clean-signal/cs-ironwave-garden.jpg" alt="The IronWave 6 standing free in the middle of the garden, with its ballast base and the radials now buried in the lawn" loading="lazy"><figcaption>The IronWave 6 standing free in the middle of the garden, with its ballast base and the radials now buried in the lawn</figcaption></figure>

I use the IronWave on 20, 15 and 10 m, and on 30 m with extra tuning.

### The HyEndFed wire

The HyEndFed 5 Band Black Clamp MK3 is a 23 m end-fed wire for 80, 40, 20, 15 and 10 m. The manufacturer rates it at 200 W PEP on SSB and 35 W on digital modes, so 25 W is well within its limits. It was originally part of my portable kit. Because I missed 40 and 80 m at home, I installed it as a temporary solution, until the definitive low-band setup that I am planning together with RF.Guru is in place. After that, it goes back into the portable kit case where it belongs. :-)

Its feedpoint sits about 9 m above the ground: the flat roof is about 8.5 m high, and a small tripod mast of roughly 1 m carries the feedpoint. From there the wire slopes down over the garden to a pole of about 2 m. At the feedpoint there is a separate counterpoise: a horizontal wire of roughly 4.2 to 4.4 m, about 1 m above the roof, deliberately routed away from the coax.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig2-antennas-side-view-light.svg" alt="Side view of the house, the flat roof with the HyEndFed feedpoint and counterpoise, the sloping wire to a 2 m pole, and the IronWave with radials in the middle of the garden" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig2-antennas-side-view-dark.svg" alt="Side view of the house, the flat roof with the HyEndFed feedpoint and counterpoise, the sloping wire to a 2 m pole, and the IronWave with radials in the middle of the garden" loading="lazy"><figcaption>Side view of the house, the flat roof with the HyEndFed feedpoint and counterpoise, the sloping wire to a 2 m pole, and the IronWave with radials in the middle of the garden</figcaption></figure>

| Band | IronWave 6 | HyEndFed |
|---|---|---|
| 80 m | no | yes, with a loading coil |
| 40 m | not used | yes |
| 30 m | yes, with extra tuning | no |
| 20 m | yes | yes |
| 15 m | yes | yes |
| 10 m | yes | yes |

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Wavelength, and how big these antennas really are</strong></summary>

Everything in antenna theory starts with wavelength:

`λ = c / f`, or in practice `λ (m) ≈ 300 / f (MHz)`
{: .cs-formula}
where `c` is the speed of light (about 3 × 10⁸ m/s) and `f` the frequency. What matters for an antenna is not its physical length, but its length in wavelengths, its electrical length.

| Frequency | λ | λ/2 | λ/4 | 0.05 λ | IronWave 6 m in λ |
|---|---|---|---|---|---|
| 3.6 MHz | 83.3 m | 41.6 m | 20.8 m | 4.2 m | n/a |
| 7.1 MHz | 42.2 m | 21.1 m | 10.6 m | 2.1 m | 0.14 λ |
| 10.12 MHz | 29.6 m | 14.8 m | 7.4 m | 1.5 m | 0.20 λ |
| 14.2 MHz | 21.1 m | 10.6 m | 5.3 m | 1.1 m | 0.28 λ |
| 21.2 MHz | 14.1 m | 7.1 m | 3.5 m | 0.7 m | 0.43 λ |
| 28.5 MHz | 10.5 m | 5.3 m | 2.6 m | 0.5 m | 0.57 λ |

Two things stand out. First, the 6 m IronWave is electrically short on 40 and 30 m (about 0.14 to 0.20 λ). That is why those bands need a tuner or extra radials, and why I do not use it on 40 m. Second, the 0.05 λ value for 80 m, about 4.2 m, is exactly where I placed the second choke on the HyEndFed line, which I explain in chapter 6.

A real wire is slightly shorter than the free-space half wave for resonance, because of its thickness, insulation and the effect of its ends. That is why practical values differ a little from the table.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>An antenna is really about current</strong></summary>

An antenna radiates because RF current flows in it. The far field in any direction is the sum of the contributions of all small current elements, each with its own amplitude, direction and phase. Two strong currents close together and in opposite directions largely cancel at a distance. This is why a properly working coax line does not radiate: the two currents inside it are equal and opposite.

On a half-wave wire, the current is maximum in the middle and close to zero at the open ends, while the voltage does the opposite. At any point the ratio of voltage to current is the local impedance, so the end of a half-wave wire has a high impedance, typically in the order of a few thousand ohms. An end-fed half-wave (EFHW) is fed at that high-impedance point and needs a transformer, often around 49:1, to bring it towards 50 Ω. An ideal transformer with turns ratio `n` transforms impedance by `n²`, so a 7:1 turns ratio gives 49:1.

A wire that is about half a wavelength on 40 m is roughly two half waves on 20 m, three on 15 m and four on 10 m:

`L ≈ n × λ/2`
{: .cs-formula}
At each of those frequencies the end of the wire is again a high-impedance point, so the same transformer works on several bands. On the higher bands the wire carries several current maxima with phase reversals between them, so the radiation pattern develops more lobes and nulls. On my antenna, the coil for 80 m sits about 20 m along the wire, roughly where a 40 m half wave ends, and is followed by about 3 m of wire.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Radiation resistance, loss resistance and efficiency</strong></summary>

At the feedpoint, an antenna presents an impedance:

`Z = R + jX`
{: .cs-formula}
The reactive part `X` represents energy that is stored in the near field and returned each cycle. The real part `R` represents power that leaves the feedpoint for good. That real part has two very different components:

`R = R_rad + R_loss`
{: .cs-formula}
`R_rad`, the radiation resistance, accounts for power that leaves as radiation. `R_loss` accounts for power turned into heat in conductors, coils, transformers, connections and the soil. For the same feed current `I`:

`P_rad = I² × R_rad` and `P_loss = I² × R_loss`
{: .cs-formula}
so the radiation efficiency is:

`η = R_rad / (R_rad + R_loss)`
{: .cs-formula}
An illustrative example (not my antenna): a short antenna with `R_rad = 20 Ω`, a coil with `2.5 Ω` of loss and `5 Ω` of ground and conductor loss gives `η = 20 / 27.5 = 0.73`, so 73 %, or about 1.4 dB below a lossless antenna. The same antenna with `R_rad = 5 Ω` and the same losses gives `η = 5 / 12.5 = 0.40`, a loss of about 4 dB.

The important lesson: an SWR meter cannot distinguish `R_rad` from `R_loss`; chapter 11 comes back to this.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>What the loading coil does on 80 m</strong></summary>

A 23 m wire is far too short to be a half wave on 80 m (41.6 m). On its own it would present a capacitive reactance there. The HyEndFed adds a coil to supply inductive reactance, so that the net reactance at the feedpoint becomes zero on 80 m and the antenna is resonant. The reactance of a coil is:

`X_L = 2π f L`
{: .cs-formula}
A real coil also has loss resistance, described by its quality factor:

`Q = X_L / R_coil`, so `R_coil = X_L / Q`
{: .cs-formula}
Illustrative example: a coil that needs to supply 500 Ω of reactance at 3.6 MHz has an inductance of `L = 500 / (2π × 3.6 × 10⁶) ≈ 22 µH`. With a good `Q` of 200, its loss resistance is `500 / 200 = 2.5 Ω`. That loss is in series with a radiation resistance that is much smaller on a short antenna than on a full-size one, so even a good coil can cost a noticeable part of the power.

Three more consequences follow. The coil itself does not radiate in any useful way; it stores energy and adds loss. The current distribution along the wire changes, which can lower the radiation resistance. And an electrically small antenna has a high Q, so its usable bandwidth is narrow. The manufacturer states about 100 kHz of bandwidth on 80 m without a tuner, which fits that picture. This is consistent with what I hear on 80 m.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Every antenna needs a return path</strong></summary>

Current that leaves one terminal of a transformer must come back. A dipole provides its own return through the second leg. A vertical uses radials or a ground system. An end-fed wire uses a counterpoise, or, if you do not provide one, whatever else is available: the outside of the coax, the mast, station wiring, the building, and capacitance to the surroundings.

If the coax becomes part of the antenna by accident, its length, route and connections change the antenna. Moving the cable can then change the tuning, the pattern, the noise you hear and the RF in the shack.

The practical rule that follows: decide which conductor forms the return path, and make sure current stops where that path should end. On my HyEndFed, the counterpoise is the deliberate return path, routed away from the coax, with a choke just below the feedpoint.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Radials, soil and the dry summer</strong></summary>

A ground-mounted vertical loses part of its power as heat in the soil, because the return current flows through lossy earth near the base. The return current density is highest close to the base, which is why radials matter most there. In the efficiency formula, this shows up as a ground-loss resistance in series with the radiation resistance.

Rudy Severns, N6LF, measured real vertical antennas with different radial systems. His results show that radial count, radial length, soil and antenna must be considered together. A sparse set of radials on the ground can show a lossy resonance; shortening them sometimes helped. As the number of radials increased, their length became much less critical: with 32 radials, the difference between two lengths in one of his tests was only about 0.12 dB. In his tests, most of the improvement came with the first sixteen radials, for those antennas and that soil.

Soil is characterised by its conductivity and its relative permittivity, and both depend strongly on moisture and temperature, as described in ITU-R Recommendation P.527. Wet clay and bone-dry clay are electrically quite different. That may explain why the IronWave seemed to struggle in the dry summer, but I cannot say how much it mattered.

What I can say: 32 radials is a sensible choice for a ground-mounted vertical, and it reduces the dependence on radial length. It does not prove that my antenna is efficient.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

For **loud**: a free-standing vertical with 32 radials loses less power in the soil, so more of the 25 W leaves as radiation, at the low angles that matter for DX. For **clean**: both antennas have a deliberately chosen return path (radials and a counterpoise) and stand clear of the house. The antenna current therefore stays in the antenna instead of running over the coax, the house wiring or the radio's case, and less RF comes back into the shack where it could disturb the audio. On 80 m you see the opposite: there the end-fed antenna itself is the weak link.

</aside>

## <span class="cs-num">5</span>The invisible part: coax has two paths {#ch-5}

This was the most important thing I learned, and also the hardest to see.

A coaxial cable can carry two very different currents at the same time:

- **The wanted signal.** It flows on the centre conductor and back on the inside of the shield. These two currents are equal and opposite, so their fields stay inside the cable.
- **An unwanted current on the outside of the shield.** It uses the outside of the cable as if it were a separate wire, and returns through the mast, the station, the building or the soil.

I picture it as a tube inside a tube. The inner tube carries the signal. The outer tube should carry nothing. When current flows on the outer tube, the coax becomes part of the antenna.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig3-coax-two-paths-light.svg" alt="Coax as an inner tube and an outer tube. Left: without a choke, current also flows along the outside to the shack. Right: with a choke, the outer current is blocked and the signal stays inside" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig3-coax-two-paths-dark.svg" alt="Coax as an inner tube and an outer tube. Left: without a choke, current also flows along the outside to the shack. Right: with a choke, the outer current is blocked and the signal stays inside" loading="lazy"><figcaption>Coax as an inner tube and an outer tube. Left: without a choke, current also flows along the outside to the shack. Right: with a choke, the outer current is blocked and the signal stays inside</figcaption></figure>

That outside current is usually called common-mode current. On transmit, it can make the coax radiate, bring RF into the shack and distort the antenna pattern. On receive, the same path can pick up local noise from the house and the neighbourhood and carry it to the radio.

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>What a coaxial line is, in numbers</strong></summary>

A coax line is defined by its inductance `L'` and capacitance `C'` per metre. For a low-loss line:

`Z₀ = √(L' / C')` and `v = 1 / √(L' C')`
{: .cs-formula}
The characteristic impedance `Z₀` is the ratio of voltage to current of a single travelling wave. It is not a resistor inside the cable. For a coax with inner conductor diameter `d`, inner diameter of the shield `D` and dielectric constant `εr`:

`Z₀ = (60 / √εr) × ln(D / d)`
{: .cs-formula}
The velocity factor is `VF = v / c = 1 / √εr`. My cable, Extraflex Bury 7, has a velocity factor of 83 % according to its datasheet, which corresponds to `εr ≈ 1 / 0.83² ≈ 1.45`, consistent with a foamed dielectric. Its capacitance is 75 pF/m and its centre conductor consists of 19 strands with an overall diameter of 1.9 mm.

The wavelength inside the cable is shorter than in free space: `λ_coax = VF × λ`. This matters for anything that depends on electrical length inside the line, but, as explained below, not for the outside of the shield.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Common mode, the formal definition</strong></summary>

ITU-T Recommendation K.10 defines the common-mode current of a group of conductors as the sum of the (phasor) currents in those conductors. Applied to a coax:

`I_CM = I_centre + I_shield,inner + I_shield,outer`
{: .cs-formula}
In the wanted transmission-line mode, `I_centre = −I_shield,inner`, so those two terms cancel and:

`I_CM ≈ I_shield,outer`
{: .cs-formula}
Whatever does not cancel must return by another path: the mast, the station, the building, the earth, or simply capacitance to the surroundings.

Two facts are worth stressing. A mismatch on its own does not create common-mode current; a reflected wave stays inside the coax. Common mode needs an asymmetry or an undefined return path to be launched. And a low SWR does not prove that there is no outside current: both can exist at the same time.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Skin effect, and why one shield can carry two currents</strong></summary>

At radio frequencies, current crowds towards the surface of a conductor. The skin depth is:

`δ = √(2ρ / (ω μ))`, with `ω = 2πf`
{: .cs-formula}
For copper this gives approximately `δ ≈ 65 µm / √f(MHz)`: about 34 µm at 3.6 MHz, 17 µm at 14 MHz and 12 µm at 28 MHz. The shield of a coax is many skin depths thick, so the wanted return current flows on the inside surface and an outside current can flow on the outside surface, largely independently.

Skin effect explains where currents can flow. It does not cause the outside current. Something must launch it: an asymmetric antenna, an undefined return path, a field from a nearby source. A real braided shield is also not perfect: its coupling between inside and outside is described by its transfer impedance, which is why screening quality still matters.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Why the velocity factor does not apply to the outside</strong></summary>

The 83 % velocity factor of my cable describes the wanted wave inside the dielectric. A current on the outside of the shield sees a completely different environment: the jacket, the air, nearby walls, the soil, a mast. Its propagation speed and impedance depend on that environment, not on the datasheet. That is why calculating a "quarter wave on the outside of the coax" with the cable's velocity factor gives no reliable choke position.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

This chapter is the foundation for almost every measure that follows. As long as current flows on the outside of the coax, the cable becomes part of the antenna: it radiates in an unwanted pattern, carries RF right up to the radio and the microphone, and picks up noise from the house and the neighbourhood on receive. RF that reaches the audio can be rectified and show up as hum, distortion or feedback. Once you understand this mechanism, it is clear why a clean signal starts with stopping that outside current.

</aside>

## <span class="cs-num">6</span>Chokes: where and why {#ch-6}

A common-mode choke places a high impedance in the path of the outside current, while the wanted signal inside the coax passes through almost unaffected. It does not cure a mismatch and does not create a return path. It does one job: it makes it hard for current to flow along the outside of the cable at that point.

### My HyEndFed line, from antenna to radio

1. An RF.Guru choke just below the feedpoint, connected with a short pigtail
2. About 4.2 m of coax to a second common-mode choke
3. About 6 m of coax to the antenna cabinet, with a choke just before the cabinet
4. Snap-on ferrites where the cable enters the shack
5. About 5 m to the antenna switch
6. A pigtail choke from RF.Guru on the output of the switch, then a 1 m patch cable to the radio

### My IronWave line

1. At the base: the 4:1 transformer, a short piece of PTFE coax, ferrites and a choke
2. About 8 m of coax to the next choke
3. About 15 m further to the antenna cabinet, with a choke before the cabinet
4. Snap-on ferrites where the cable enters the shack
5. About 5 m from the cabinet to the antenna switch
6. The same pigtail choke on the switch output, then the patch cable to the radio

At the base of the IronWave, the RF.Guru 4:1 unun (labelled for the IronWave 6, 20 to 6 m with 40 m as an extra) sits on the mast, the 32 radials are bolted to a stainless radial plate, and the first choke follows directly on the ballast base: an RF.Guru quad-core 1:1 line isolator for 40 to 10 m.

<figure class="cs-fig cs-photo"><img src="/assets/images/clean-signal/cs-ironwave-base.jpg" alt="The base of the IronWave: the 4:1 unun on the mast, the radial plate with the 32 radials, and the quad-core line isolator directly behind it on the ballast base" loading="lazy"><figcaption>The base of the IronWave: the 4:1 unun on the mast, the radial plate with the 32 radials, and the quad-core line isolator directly behind it on the ballast base</figcaption></figure>

Both lines meet at the antenna switch, so the pigtail choke on the switch output serves whichever antenna is selected. All coax is Extraflex Bury 7, a 7.3 mm, 50 Ω cable.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig4-signal-chain-light.svg" alt="The signal chain for both antennas, with every choke and ferrite marked, plus the antenna cabinet and the antenna switch" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig4-signal-chain-dark.svg" alt="The signal chain for both antennas, with every choke and ferrite marked, plus the antenna cabinet and the antenna switch" loading="lazy"><figcaption>The signal chain for both antennas, with every choke and ferrite marked, plus the antenna cabinet and the antenna switch</figcaption></figure>

<figure class="cs-fig cs-photo"><img src="/assets/images/clean-signal/cs-antenna-cabinet.jpg" alt="The outdoor antenna cabinet where both feedlines enter, with the bonded panel inside and a choke on the feedline next to the cabinet" loading="lazy"><figcaption>The outdoor antenna cabinet where both feedlines enter, with the bonded panel inside and a choke on the feedline next to the cabinet</figcaption></figure>

The pigtail choke on the switch output is an RF.Guru 1:1 line isolator for 1.5 to 30 MHz. Its label states a common-mode impedance above 2 kΩ across that range and an insertion loss below 0.3 dB.

<figure class="cs-fig cs-photo"><img src="/assets/images/clean-signal/cs-line-isolator-switch.jpg" alt="The RF.Guru line isolator on the output of the antenna switch, the last choke before the radio" loading="lazy"><figcaption>The RF.Guru line isolator on the output of the antenna switch, the last choke before the radio</figcaption></figure>

### Why so many?

Not because more is always better. Every place where the outside current could cross a boundary deserves attention:

- **At the antenna,** where the antenna and its return path should end and the feedline should begin.
- **At the building entry,** where outdoor cables meet the indoor environment.
- **At the equipment,** where RF on the cable could find its way into the radio, the switch and the connected cables.

The choke at 4.2 m on the HyEndFed line is a deliberate choice. 4.2 m is about 0.05 λ at 3.6 MHz, and I understood it to be a sensible and practical length for 80 m. The idea comes from experiments by Werner Schnorrenberg, DC4KU, on a HyEndFed-type antenna. In his installation, as summarised by RF.Guru, the current on the feedline dropped from about 40 mA to about 5 mA or less beyond the choke (measured at 7.1 MHz with 10 W), and the receive noise at 3.7 MHz dropped from about −75 dBm to about −93 dBm, roughly 18 dB, while the current in the wire itself stayed about the same.

In my case there is also a separate counterpoise and a choke right at the feedpoint, so the choke at 4.2 m mainly acts as a second line of defence.

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>How much a choke reduces the current</strong></summary>

Model the outside path as a source driving a current through the impedance of that path, `Z_P`. Inserting a choke with impedance `Z_C` in series changes the current from `V / Z_P` to `V / (Z_P + Z_C)`. The reduction is:

`reduction (dB) = 20 log₁₀ ∣ 1 + Z_C / Z_P ∣`
{: .cs-formula}
Both impedances are complex. A few illustrative cases:

- `Z_P = 300 Ω` (resistive) and `Z_C = 3000 Ω` (resistive): `∣1 + 10∣ = 11`, a reduction of about 20.8 dB.
- `Z_P = 3000 Ω` and `Z_C = 3000 Ω`: `∣1 + 1∣ = 2`, only 6 dB. A good choke in a high-impedance part of the path does little.
- `Z_P = −j2900 Ω` (capacitive) and `Z_C = +j3000 Ω` (purely inductive): `Z_P + Z_C = +j100 Ω`, so the current becomes 29 times larger. The choke resonates with the path and makes things worse.

That last case is one reason why chokes with a substantial resistive part across the band are often preferred for this job, and why "more turns" is not automatically better.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Voltage and heat in a choke</strong></summary>

A choke that blocks current develops a voltage across itself and dissipates power in its resistive part:

`V_CM = I_CM × ∣Z_C∣` and `P = I_CM² × R_C`
{: .cs-formula}
Illustrative example: if 50 mA of outside current flows through a choke with 2000 Ω of resistance, the choke dissipates `0.05² × 2000 = 5 W` and has about 100 V across it. That is why choke ratings depend on the current that actually flows on the outside, not on the transmitter power, and why a warm choke tells you that something is flowing but not whether it is working well. A cool choke does not prove that the current is low.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Why chokes along a cable do not simply add up</strong></summary>

Two chokes right next to each other carry the same current, so their impedances add. Chokes separated by a few metres of cable do not. The cable between them is itself part of the outside circuit: it has its own length, capacitance to the surroundings and standing-wave pattern. Adding a choke can move a current maximum to another position, raise the voltage across another choke or create a resonance.

The honest answer to "how many chokes do I need" is therefore: as many as there are unwanted current paths, verified by measuring the current along the cable on each band. Without measurements I cannot say which of my chokes does most of the work, or whether each one is necessary. I can say that each one sits at a boundary where it has a logical role.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Transformer and choke are two different jobs</strong></summary>

The word "balun" hides three functions: transforming the impedance, connecting a balanced and an unbalanced port, and blocking common-mode current. They are not the same. My HyEndFed uses a transformer to bring the high impedance of the wire end towards 50 Ω, and separate chokes to block the outside current. The IronWave uses a 4:1 unbalanced-to-unbalanced transformer (unun) at its base, again with separate chokes. Keeping these jobs apart makes it clearer what each part does, and allows each to be specified and checked on its own.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

This is the measure most directly linked to "clean". Chokes at the three boundaries (antenna, building, equipment) keep transmit energy off the outside of the shield. No RF reaches the microphone, the radio's case or the audio leads, so no rectified RF ends up as hum or distortion in the transmitted signal. At the same time the coax does not radiate, so the antenna pattern stays as intended and the signal leaves concentrated. On receive, the same chokes block noise arriving along the shield; the DC4KU example shows this can be in the order of 18 dB.

</aside>

## <span class="cs-num">7</span>Ground, bonding and the busbar {#ch-7}

The word "ground" is used for at least four different things:

1. **Protective earth:** the safety connection of the house electrical installation.
2. **Lightning bonding and earthing:** a coordinated system to limit dangerous voltage differences during a strike.
3. **RF return or counterpoise:** a conductor that carries antenna current and is part of the antenna.
4. **Static drain:** a slow path that lets charge leak away.

In my station these are clearly separate. The counterpoise of the HyEndFed is an RF return path (number 3). The outdoor antenna cabinet has a bonded metal panel, connected to the protective bonding of the house. Inside the shack, all equipment is connected to one busbar.

The ground cable from the antenna cabinet into the shack runs through heavy snap-on ferrites with several turns, and the line from the busbar to the earthing terminals is treated the same way. A long cable is not invisible to RF: it can act as an antenna or a noise path itself. The ferrites only affect RF current on that cable. The protective connection stays fully intact, and the ferrites have no safety function at all.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig5-four-grounds-light.svg" alt="The four meanings of &quot;ground&quot; side by side, and where each one appears in my station" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig5-four-grounds-dark.svg" alt="The four meanings of &quot;ground&quot; side by side, and where each one appears in my station" loading="lazy"><figcaption>The four meanings of &quot;ground&quot; side by side, and where each one appears in my station</figcaption></figure>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>A long wire at RF, and what a ferrite adds</strong></summary>

A conductor of a few metres is a significant fraction of a wavelength on the higher HF bands (a quarter wave is 2.6 m at 28.5 MHz). At those lengths its RF impedance has little to do with its DC resistance, and it can carry or radiate RF current like any other wire.

A ferrite around a single conductor adds a series impedance roughly proportional to the number of turns squared at low frequencies, because the inductance scales with `N²`. Winding capacitance limits that effect at higher frequencies and lowers the self-resonant frequency, so more turns are not automatically better across all bands. A ferrite on a protective earth conductor does not affect the 50 Hz fault current in any meaningful way, but it never replaces or interrupts the safety function of that conductor.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>What a busbar does and does not do</strong></summary>

A busbar is a central connection point. It avoids equipment being chained together in loops, keeps the station organised, and makes it easy to see how everything is bonded. It does not absorb RF, and current will not automatically choose the busbar over a USB, audio or coax cable. Its value lies in combination with filtering at every entry point.

A busbar remains part of the safety bonding of the house. It is not a separate "RF earth", and it should never be set up in a way that removes protection. Lightning protection is a separate, coordinated design (IEC 62305), and no choke, ferrite or busbar makes it safe to work on antennas during a thunderstorm.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

One busbar and a clear separation of the meanings of "ground" prevent ground loops. Ground loops are a classic source of 50 Hz hum in transmit audio and of RF currents circulating between devices. The ferrites on the ground cable stop that long conductor from becoming an antenna that brings RF onto the equipment cases. The result: every device has one quiet reference point, which helps keep the audio free of hum and buzz.

</aside>

## <span class="cs-num">8</span>Mains and the shack circuit {#ch-8}

Solar panels with an inverter are a well-known source of interference on HF. On the advice of RF.Guru, I had two identical Schaffner FN2410H-60-34 mains filters installed:

- one on the AC side of the solar inverter, and
- one just before the sub-board for the shack.

The shack has its own sub-board. All equipment in the shack is powered from that one filtered circuit, and the sockets are wired in a star from that sub-board. The aim is twofold:

- to keep noise from the mains out of the shack, and
- to limit how much RF from the station can travel onto the house wiring.

On the DC side of the solar installation, the strings from the panels to the inverter have snap-on ferrites. If that ever turns out not to be enough, they can be extended with dedicated Schaffner DC filters, but only if needed. I prefer to add measures when there is a reason, not by default.

<figure class="cs-fig cs-photo-wide"><img src="/assets/images/clean-signal/cs-schaffner-shack.jpg" alt="One of the two Schaffner FN2410H-60-34 filters, in its own enclosure next to the shack sub-board" loading="lazy"><figcaption>One of the two Schaffner FN2410H-60-34 filters, in its own enclosure next to the shack sub-board</figcaption></figure>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Conducted noise, and what a mains filter does</strong></summary>

Interference reaches a receiver in two ways: radiated, through the air, or conducted, along cables. A mains filter deals with conducted interference. On the mains wiring, noise travels in two modes:

- **Differential mode:** between line and neutral, in opposite directions.
- **Common mode:** on line and neutral together, returning through the protective earth or the surroundings.

A typical EMI filter has capacitors between line and neutral (X capacitors) against differential-mode noise, a current-compensated choke against common-mode noise, and capacitors from line and neutral to protective earth (Y capacitors) that shunt common-mode noise to earth. The schematic in the Schaffner datasheet shows this classic structure.

The performance of such filters is specified with standardised test methods (CISPR 17). The datasheet shows typical attenuation curves for four test configurations: symmetrical and asymmetrical in a 50 Ω system, and two configurations with very unequal source and load impedances (0.1 Ω and 100 Ω). Those curves are for those test conditions; in a real installation the impedances of the mains and the load are different, so the real attenuation differs too.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Leakage current, and why this needs an electrician</strong></summary>

The Y capacitors connect the mains to protective earth, so a small current flows to earth continuously:

`I_leak = 2π f C_Y V`
{: .cs-formula}
The datasheet of my filter gives a maximum leakage current of 2.6 mA at 250 V and 50 Hz, and notes that it can reach twice that level if the neutral is interrupted. Working backwards, that corresponds to an equivalent capacitance of about `2.6 mA / (2π × 50 Hz × 250 V) ≈ 33 nF`, an estimate derived from the datasheet values.

Leakage currents add up and matter for residual current protection. That, together with the voltage ratings and the requirements of the electrical code, is why filters like this belong in the hands of a qualified electrician. A filter never replaces good earthing or protection.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

The filtered circuit and the two Schaffner filters work in both directions. Transmit energy that would otherwise travel out over the mains wiring and back through other devices is held back, so it does not end up in the radio or the audio via the supply. And the inverter noise is reduced at its source, which mainly helps me hear weak stations. A quiet electrical environment around the shack is a silent but important foundation for everything else.

</aside>

## <span class="cs-num">9</span>DC power, device cables and the network {#ch-9}

### The DC supply

I chose a Mean Well 26 A, 13.8 V industrial power supply, followed by an RF.Guru DC noise filter (30 A, Powerpole). A switching power supply remains a potential noise source on HF, however good it is. The DC filter is a second line of defence, with several LC stages, spike protection and a soft start. It does not remove every possible noise source, and it does not replace grounding.

### The cables between devices

Every cable between devices is a conductor that RF can use, so HDMI and other device cables in the shack have ferrites. The network cable enters the shack as a shielded cable. A shield only helps if it is properly connected, otherwise it can carry current itself.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig6-inside-the-shack-light.svg" alt="Inside the shack: one filtered circuit, star-wired sockets, one busbar, ferrites on device cables, shielded network cable" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig6-inside-the-shack-dark.svg" alt="Inside the shack: one filtered circuit, star-wired sockets, one busbar, ferrites on device cables, shielded network cable" loading="lazy"><figcaption>Inside the shack: one filtered circuit, star-wired sockets, one busbar, ferrites on device cables, shielded network cable</figcaption></figure>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Why switching supplies make HF noise</strong></summary>

A switching power supply chops its input at a high frequency, typically tens to hundreds of kilohertz, with very fast voltage and current edges. A periodic signal with sharp edges contains harmonics of the switching frequency far up into the HF range, and the faster the edges, the further the spectrum extends. That energy can leave the supply as conducted noise on the DC and mains leads, in both differential and common mode, or be radiated by the wiring.

The datasheet of my supply specifies the output ripple and noise as at most 150 mV peak to peak, measured with a 20 MHz bandwidth. That is a useful figure for the DC quality, but it does not tell you how much interference appears in a narrow receiver bandwidth on a given HF frequency. That is why a dedicated DC filter after the supply makes sense: a series inductor and shunt capacitors form a low-pass filter that attenuates high-frequency components while letting the DC through.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Every cable is a potential antenna</strong></summary>

Any conductor of a significant length compared to the wavelength can pick up or radiate RF. Cables between devices form loops and long conductors, and the currents on their outer surfaces are common-mode currents just like on coax. A ferrite around such a cable adds impedance to that common-mode path, while the wanted signals inside the cable, which flow in pairs, are hardly affected.

A shielded network cable keeps the wanted data inside, but its shield is itself a conductor. If it is not properly terminated, it can carry common-mode current and act as an antenna. A shield only does its job as part of a well-defined connection.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

A generously rated supply keeps the 13.8 V stable on voice peaks. If the voltage sags, the power amplifier becomes less linear, with distortion and splatter as a result, so this contributes directly to "clean". The DC filter keeps switching noise from the supply out of the radio. The ferrites on USB, HDMI and audio cables prevent RF from disturbing the computer, the CAT link or the digital audio through those cables, which also benefits FT8 and other digital modes.

</aside>

## <span class="cs-num">10</span>The audio chain {#ch-10}

For transmit I use either the stock hand microphone of the IC-7300 MkII or a Heil Pro Set Elite iC headset with a Heil foot switch. I set up the transmit equalizer starting from settings I found online and adjusted them by ear and by feedback. While talking, I keep an eye on the ALC meter and make sure it does not swing hard.

These are my SSB transmit settings:

| Setting | Value |
|---|---|
| RF power | 25 % (25 W) |
| Mic gain | 40 % |
| Speech compressor | off |
| Transmit bandwidth | wide (100 to 2900 Hz) |
| TX bass | +1 |
| TX treble | +2 |

In words: a slight lift in both bass and treble, with more emphasis on the treble, a full-width transmit passband, no compression, and a moderate microphone gain that keeps the ALC calm.

<figure class="cs-fig cs-photo-wide"><img src="/assets/images/clean-signal/cs-tx-eq.jpg" alt="The SSB transmit equalizer: TX bass +1, TX treble +2, and the wide and mid transmit bandwidth definitions" loading="lazy"><figcaption>The SSB transmit equalizer: TX bass +1, TX treble +2, and the wide and mid transmit bandwidth definitions</figcaption></figure>

<figure class="cs-fig cs-photo-wide"><img src="/assets/images/clean-signal/cs-function-screen.jpg" alt="The function screen: speech compressor off and transmit bandwidth set to wide" loading="lazy"><figcaption>The function screen: speech compressor off and transmit bandwidth set to wide</figcaption></figure>

<figure class="cs-fig cs-photo"><img src="/assets/images/clean-signal/cs-heil-proset.jpg" alt="The Heil Pro Set Elite iC headset" loading="lazy"><figcaption>The Heil Pro Set Elite iC headset</figcaption></figure>

On receive I use the radio itself or AetherSDR. AetherSDR is used for receive only. It has no influence on how I sound to others: the audio other stations hear comes straight from the radio.

I received the same kind of compliments with both microphones. If the microphone made the big difference, I would expect to hear that difference. The things that stayed the same are the radio, the antennas, the coax with its chokes, the filtered power and the tidy shack. That does not prove that the audio settings do not matter. It does suggest that they are not the main explanation.

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>SSB, ALC and why overdrive sounds bad</strong></summary>

An SSB signal is a frequency-shifted copy of the speech spectrum, typically occupying about 2.4 to 3 kHz. Its quality depends on how linear the transmitter is. ALC (automatic level control) reduces the drive when the output stage approaches its limit. If you drive the radio too hard, the ALC has to work hard, peaks get flattened, and the non-linearity creates intermodulation products: new frequencies that were not in the speech. They make the audio sound harsh and widen the signal into the neighbouring channels (splatter).

Keeping the drive moderate and the ALC calm keeps the transmitter in its linear range. Reducing the low frequencies helps too: they carry a lot of energy but contribute little to intelligibility, so less bass leaves more of the available power for the frequencies that carry speech. This is good practice, not a guarantee of a good signal.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Speech intelligibility, and why less bass helps</strong></summary>

Most of the energy in speech sits in the vowels, largely below about 1 kHz. Most of the intelligibility sits in the consonants, roughly between 1 and 4 kHz. An SSB transmitter has a limited peak power, and every watt spent on low frequencies is a watt not spent on the frequencies that make words understandable. Reducing the bass shifts the available peak power towards intelligibility, which at the other end sounds both clearer and, for the same 25 W, effectively louder.

A typical SSB transmit passband runs from about 100 to 300 Hz at the bottom up to about 2.7 to 3 kHz at the top. A wider setting sounds more natural on a quiet band; a narrower one concentrates the energy and holds up better in a pileup.

Moderate speech compression raises the average power relative to the peaks, so the transmitter spends more of its time near full output. Too much compression raises the background noise in the audio and adds distortion. These are general principles, not measurements of my audio. My own settings follow the same idea in a mild form: the treble gets more lift than the bass, the passband is wide, and the compressor stays off.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>How RF in the shack can spoil audio</strong></summary>

If common-mode current reaches the shack on transmit, it can couple into the microphone lead, the audio cables or the radio's own circuits. Semiconductor junctions can rectify that RF, producing audio-frequency distortion, hum or feedback in the transmitted signal. This is one plausible mechanism by which a well-choked feedline and a tidy shack could contribute to clean transmit audio. In my case I have no measurement that shows whether RF in the shack was ever an issue.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

This chapter has the most direct link to compliments like "it sounds like you are standing next to me". A moderate mic gain and a calm ALC keep the transmitter linear, without flattened peaks or intermodulation. The compressor is off, so there is no pumping sound or inflated background noise. The equalizer emphasises the treble, where intelligibility lives, and the wide passband lets the voice sound natural. That both microphones earned the same compliments does show that these settings work together with the clean environment, not on their own.

</aside>

## <span class="cs-num">11</span>Match is not efficiency {#ch-11}

On most bands I hardly need to tune. That is pleasant, but I learned not to read too much into it. Three different questions often get mixed up:

1. **Is the antenna resonant?** Is the reactance at the feedpoint zero?
2. **Is it matched?** How close is the impedance to 50 Ω? That is what SWR shows.
3. **Is it efficient?** How much of the power leaves as radiation, and how much becomes heat?

A dummy load answers the second question perfectly and the third very badly: it shows 1:1 SWR and radiates almost nothing.

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig7-reference-planes-light.svg" alt="The station chain with its reference planes (antenna, transformer, end of the coax, radio), and the three questions next to it" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig7-reference-planes-dark.svg" alt="The station chain with its reference planes (antenna, transformer, end of the coax, radio), and the three questions next to it" loading="lazy"><figcaption>The station chain with its reference planes (antenna, transformer, end of the coax, radio), and the three questions next to it</figcaption></figure>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Reflection, SWR, return loss and mismatch loss</strong></summary>

When a line with characteristic impedance `Z₀` is terminated in a load `Z_L`, part of the wave reflects. The reflection coefficient is:

`Γ = (Z_L − Z₀) / (Z_L + Z₀)`
{: .cs-formula}
From its magnitude follow the familiar quantities:

`SWR = (1 + ∣Γ∣) / (1 − ∣Γ∣)` and conversely `∣Γ∣ = (SWR − 1) / (SWR + 1)`
{: .cs-formula}
`return loss (dB) = −20 log₁₀ ∣Γ∣`
{: .cs-formula}
`mismatch loss (dB) = −10 log₁₀ (1 − ∣Γ∣²)`
{: .cs-formula}
| SWR | \|Γ\| | Reflected power | Return loss | Mismatch loss |
|---|---|---|---|---|
| 1.5:1 | 0.20 | 4 % | 14.0 dB | 0.18 dB |
| 2:1 | 0.33 | 11 % | 9.5 dB | 0.51 dB |
| 3:1 | 0.50 | 25 % | 6.0 dB | 1.25 dB |

Two warnings. SWR only keeps the magnitude of the mismatch, not its phase: a 25 Ω load and a 100 Ω load both give 2:1 on a 50 Ω line. And the "mismatch loss" is not heat. It describes how much less power a matched source would deliver into that load. With a tuner that matches the radio, the reflected power is re-reflected towards the antenna; what is really lost is the extra heat in the line, which is calculated below.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Where you measure matters</strong></summary>

Every impedance or SWR value belongs to a reference plane. A line transforms the load impedance along its length:

`Z_in = Z₀ × (Z_L + j Z₀ tan βl) / (Z₀ + j Z_L tan βl)`, with `β = 2π / λ_coax`
{: .cs-formula}
A worked example from my own station: the HyEndFed line is about 16 m of Extraflex Bury 7. At 3.7 MHz the free-space wavelength is 81 m, and inside the cable (velocity factor 0.83) it is about 67 m. The line is therefore about 0.24 λ long, close to a quarter wave. A quarter-wave line turns an impedance into its inverse: `Z_in ≈ Z₀² / Z_L`. A load of 150 Ω at the antenna would look like about 17 Ω at the radio. The magnitude of the mismatch stays almost the same (only reduced by the line loss), but the impedance the radio sees is completely different from the one at the antenna.

Resonance and lowest SWR do not have to occur at the same frequency either. A resonant antenna with `75 + j0 Ω` shows 1.5:1, while a slightly non-resonant antenna can be closer to 50 Ω. For a multiband antenna, resonance on every band is neither necessary nor usually possible.

</details>

### What my sweep shows

I measured the HyEndFed with my NanoVNA from 1 to 30 MHz. The measurement point is important: I measured just before the antenna switch, the easiest access point near the radio, so after about 15 m of coax, three chokes and the snap-on ferrites. The NanoVNA was calibrated directly at its own port, and a short pigtail connected it to the coax, so that pigtail sits outside the calibration and adds a small error. This is therefore the SWR as the station sees it, not the SWR at the antenna.

<figure class="cs-fig cs-photo-wide"><img src="/assets/images/clean-signal/cs-hyendfed-sweep.png" alt="SWR sweep of the HyEndFed from 1 to 30 MHz, measured just before the antenna switch; grey bands are the amateur bands" loading="lazy"><figcaption>SWR sweep of the HyEndFed from 1 to 30 MHz, measured just before the antenna switch; grey bands are the amateur bands</figcaption></figure>

| Band | Lowest SWR, read from the plot | Remark |
|---|---|---|
| 160 m | about 2.2 near 1.8 to 1.9 MHz | indicative only: not available to me with my Class C licence |
| 80 m | about 1.55 near 3.6 MHz | a very narrow dip; above about 3.7 MHz the SWR rises quickly past 5 |
| 40 m | about 1.5 near 7.1 MHz | |
| 20 m | about 1.6 near 14.1 to 14.2 MHz | |
| 15 m | about 1.5 just below 21.0 MHz | the dip sits slightly low; the SWR rises towards the top of the band |
| 12 m | about 4 | indicative only: not available to me with my Class C licence, and not a design band of this antenna |
| 10 m | about 1.1 near 28.4 MHz | |

Three things stand out. First, the sweep confirms what I hear on 80 m: the usable window is narrow, and above about 3.7 MHz the antenna falls outside it, exactly where I need the tuner and sound weaker. Second, all design bands except 80 m show a usable match without a tuner, which fits my experience. Third, the sweep is coarse: about 100 points over 29 MHz, or roughly one point every 290 kHz. A narrow dip like the one on 80 m may be deeper than the plot shows. A sweep per band, with the NanoVNA calibrated for that range, would give more precise values.

One difference deserves honesty: my radio shows about 3:1 around 3.735 MHz, while the coarse sweep already shows values above 5 just above 3.7 MHz. The two measurements differ in method, measurement point and frequency resolution, and with one point per 290 kHz the sweep cannot follow the steep edge of the dip accurately. The band-by-band sweeps should settle this.

Keep the reference plane in mind: these values include the transformation and loss of about 15 m of coax. As explained above, the SWR at the antenna itself will be slightly worse than what the shack sees.

### What this means on 80 m

On 80 m the HyEndFed needs the most help, especially above 3.735 MHz, where the radio shows about 3:1. At the radio, a quarter of the forward power is reflected at that point. The radio's tuner makes that load workable for the transmitter. It does not move the antenna's resonance and does not remove any loss.

How much does the coax add? The datasheet of Extraflex Bury 7 gives 1.3 dB per 100 m at 3.5 MHz. For about 16 m that is a matched loss of roughly 0.2 dB, and with the measured 3:1 the extra mismatch loss in the line is only about 0.15 dB more (see the box below). In other words: the coax is not where my 80 m signal disappears. That points to the antenna itself, a short wire made resonant by a coil, as the more likely limiting factor on that band. That is a calculation for the cable and an inference for the antenna, not a measurement of the antenna.

This is also the most useful comparison in this article. The radio, microphone, audio settings, filters and chokes are the same on every band. Only the band and the antenna situation change. On 80 m I sound weaker. That suggests that a clean shack helps, but cannot replace an efficient antenna for the band.

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Worked example, coax loss on 80 m with a 3:1 SWR</strong></summary>

Data: about 16.2 m of Extraflex Bury 7, matched loss 1.3 dB per 100 m at 3.5 MHz (datasheet, at 20 °C). At 3.7 MHz I use about 1.33 dB per 100 m, so the matched loss is:

`A ≈ 0.162 × 1.33 ≈ 0.22 dB`, which gives a one-way power ratio `a = 10^(A/10) ≈ 1.051`
{: .cs-formula}
The reflected wave travels the line twice, so the reflection coefficient at the radio is reduced by the factor `a`. From the measured SWR at the radio (3:1, so `∣Γ_in∣ = 0.50`) the reflection at the antenna end is:

`∣Γ_L∣ = ∣Γ_in∣ × a ≈ 0.50 × 1.051 ≈ 0.53`, which corresponds to an SWR of about 3.2:1 at the antenna end of the cable.

The total line loss with mismatch follows from the standard expression (as used in the ARRL Antenna Book):

`total loss (dB) = 10 log₁₀ [ (a² − ∣Γ_L∣²) / (a × (1 − ∣Γ_L∣²)) ]`
{: .cs-formula}
`= 10 log₁₀ [ (1.105 − 0.276) / (1.051 × 0.724) ] ≈ 10 log₁₀ (1.089) ≈ 0.37 dB`
{: .cs-formula}
So about 0.37 dB in total, of which about 0.15 dB is due to the mismatch. That is about 8 % of the power, roughly 2 W of 25 W. Two notes: the SWR at the antenna end is slightly worse than what the radio shows, because the cable hides a little of it; and connector and patch-cable losses come on top. The conclusion stands: on 80 m, the cable is a small factor.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Worked example, what reaches the antenna on the higher bands</strong></summary>

Using the same datasheet (2.2 dB per 100 m at 14 MHz, 2.6 at 21 MHz, 3.0 at 28 MHz) and my cable lengths, with a near-perfect match:

| Line | Band | Matched loss | Power at antenna from 25 W |
|---|---|---|---|
| IronWave, about 28 m | 20 m | 0.62 dB | about 21.7 W |
| IronWave, about 28 m | 10 m | 0.84 dB | about 20.6 W |
| HyEndFed, about 16 m | 20 m | 0.36 dB | about 23.0 W |
| HyEndFed, about 16 m | 10 m | 0.49 dB | about 22.4 W |

The general rule: a loss of `L` dB leaves a fraction `10^(−L/10)` of the power. 1 dB means about 20 % lost, roughly 5 W at 25 W. These figures show the cable losses only. They say nothing about the efficiency of the antennas themselves, and connector and switch losses come on top.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>A link budget, or how 25 W can compete with 100 W</strong></summary>

A link budget is simply a sum, in decibels, of everything that adds or removes signal between my transmitter and the other station's receiver. Because decibels add and subtract, you can follow the signal step by step, like a bank statement.

`P_rx = P_tx − L_line + G_tx − L_path + G_rx − L_rx` (all in dB or dBm)

and what decides readability at the other end:

`SNR = P_rx − N`
{: .cs-formula}
- `P_tx` is my transmitter power: `25 W = 10 log₁₀(25 000 mW) ≈ 44 dBm`. 100 W is about 50 dBm, so the difference is 6 dB, which is one S-unit on a standard S-meter.
- `L_line` is my feedline loss: from 0.2 to about 0.8 dB, depending on band and antenna (calculated above).
- `G_tx` is the gain of my antenna in the direction and at the angle of the path, including all its losses. An antenna that loses 3 dB in a coil, the soil or a radiating coax costs as much as halving the transmitter power.
- `L_path` is the path loss. On HF it is large and changes from minute to minute, but it is essentially the same in both directions.
- `G_rx`, `L_rx` and `N` belong to the receiving station: its antenna, its cable and the noise in its environment.

The only terms I control are `P_tx` (fixed at 25 W), `L_line`, `G_tx` and, for my own reception, my local noise. A station running 100 W into a lossy antenna with a radiating coax can easily lose more than the 6 dB I am missing. That is the whole logic behind putting effort into the antenna, the feedline and the return path rather than into power.

My FT8 reports give a hint. On the bands where I use the IronWave, the median report I received was −10 dB, and the median report I sent was −4 dB: a gap of about 6 dB. If the other stations typically run 100 W, that is roughly what the power difference alone predicts. It is a hint, not proof: I do not know their power, antennas or local noise.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Why every watt counts, and where heat hides</strong></summary>

Power lost as heat in any resistive part follows `P = I² × R`, using the RMS current. Doubling the current quadruples the heat. Loss hides in conductors and coils (skin effect raises their RF resistance), contacts and connectors, the dielectric of the cable, ferrites and transformers, and the soil around a vertical.

At 25 W there is little to spare. One decibel of avoidable loss costs about a fifth of the power. That is why a clean, well-matched feed system matters more at low power.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

This chapter contributes to "loud". Because the antennas are well matched without a tuner on most bands and the coax has little loss, about 21 to 23 W of the 25 W still reaches the antenna on the higher bands. At low power every half decibel counts. The same chapter explains why 80 m sounds weaker: there the window is narrow and the shortened antenna itself is the limiting factor, not the cable.

</aside>

## <span class="cs-num">12</span>Reading the reports {#ch-12}

How much can I conclude from all those nice reports? Less than I would like.

- A report says something about one path at one moment. The Oman contact tells me that the path was there and that my signal was good at that moment.
- The pileup observation is stronger, because the same receiver hears all stations, but it is still not a controlled test.
- The difference between FT8 on the IronWave and SSB on the HyEndFed is an open question. Different modes, moments, noise conditions and radiation patterns all play a role.

### What my logbook shows

To put the compliments in context, I went through my own logbook: 633 contacts between 27 May and 4 October 2026, of which 628 on HF. All HF contacts were made with at most 25 W.

| Logbook | Value |
|---|---|
| HF contacts | 628 (347 on SSB, 280 on FT8 and FT4) |
| DXCC entities | 77 |
| Continents | Europe 555, Asia 29, North America 27, South America 12, Africa 7, Oceania 2 |
| Median distance | about 1,130 km |
| Contacts beyond 5,000 km | 52 |
| Contacts beyond 10,000 km | 6, the longest about 11,900 km (Indonesia, FT8) |

On SSB outside contests, 112 of the 143 reports I received on 20 m were 59, and 43 of 51 on 40 m. On 10 m the reports were more mixed. That looks good, but I want to be careful: a 59 is often given as a formality, and contest reports are always 59, so I left contests out. These numbers show that the station works well, not why.

FT8 gives a more objective number than a 59. Every FT8 report is a signal-to-noise ratio measured by the software, referred to a 2.5 kHz bandwidth, and FT8 can still decode signals down to roughly −20 dB. My log does not record the antenna for every contact, but I use the IronWave for FT8 on 30, 20, 15 and 10 m. On those bands I have 218 FT8 and FT4 contacts. The median report I received was −10 dB, with half of all reports between −14 and −5 dB, over a median distance of about 1,560 km. For the 42 contacts beyond 5,000 km with a report, the median was still −11.5 dB, about 8 to 9 dB above the decoding limit. On 25 W, that is a comfortable margin.

Two contacts with Oman illustrate the point about timing. On 24 September, on 20 m FT8 with the IronWave, both stations reported −16 dB over about 5,460 km. On 4 October, on 20 m SSB, the reports were 59 both ways over about 5,500 km. Same path, same station, different day and conditions.

Two limits of my log are worth stating. It contains no solar flux or K index per contact, so I cannot link reports to conditions after the fact. And because the HyEndFed is mainly used on 40 and 80 m and the IronWave on 30 to 10 m, with only occasional SSB on the HyEndFed on the higher bands, the log cannot compare the two antennas on the same band in a meaningful way. My impression that SSB sometimes sounds cleaner on the HyEndFed remains just that: an impression.

### Choosing the right moment

A good station only gets you so far. The right band at the right moment matters at least as much. My contact with Borneo on 15 m SSB, over about 11,450 km on 25 W with the HyEndFed, was planned rather than lucky: a few days after the equinox, with the frequency just below the predicted MUF and the path running along the grey line. I described that contact and the reasoning behind it in [25 watts to Borneo](/2026/09/28/25-watts-to-borneo-15m-dx/).

That is also why I now note the solar flux and K index with remarkable contacts. A clean station and good timing work together; neither replaces the other.


<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Noise, and why signal-to-noise ratio is what counts</strong></summary>

What makes a signal readable is not its strength but its ratio to the noise in the same bandwidth:

`SNR (dB) = P_signal (dBm) − P_noise (dBm)`
{: .cs-formula}
The thermal noise floor of a perfect receiver is `kTB`: about −174 dBm per hertz at room temperature, or about −140 dBm in a 2.4 kHz SSB bandwidth. On HF, the external noise is far above that. ITU-R Recommendation P.372 describes man-made noise levels for different environments (city, residential, rural, quiet rural) next to atmospheric and galactic noise, with city environments being the noisiest. In a city, the local noise usually decides what you can hear, not the receiver.

That is why lowering the noise that reaches the receiver can matter more than a better receiver, and why the DC4KU example (about 18 dB less noise on 3.7 MHz with a defined return path and a choke) is so interesting. It also explains a trap: a lower noise floor is only an improvement if the wanted signal does not drop by the same amount. Antennas should be compared by SNR, not by S-meter readings.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Propagation basics, and why 80 m behaves differently</strong></summary>

HF skywave works because the ionosphere gradually bends radio waves back to earth. The highest frequency that a path supports is the maximum usable frequency (MUF). For a single hop it is roughly related to the critical frequency of the F2 layer by the secant law:

`MUF ≈ foF2 / cos(φ)`
{: .cs-formula}
where `φ` is the angle of incidence on the layer. Longer hops, with more oblique incidence, support higher frequencies. At the low end, the lowest usable frequency is set by absorption in the D layer, which is present in daylight and becomes stronger at lower frequencies, roughly inversely with the square of the frequency. That is one reason why 80 m behaves so differently from 20 m during the day.

Space-weather indices give context. The solar flux (F10.7, measured at 2800 MHz) reflects solar activity. The K and Kp indices describe geomagnetic disturbance on a quasi-logarithmic scale from 0 to 9. A solar flare causes immediate extra absorption on the sunlit side. None of these numbers tells you that a specific path is open; real signals do.

</details>

<details class="cs-deep" markdown="1">
<summary><span class="cs-chip">Deep dive</span> <strong>Polarisation on HF is not what the antenna label says</strong></summary>

For two linearly polarised antennas on a direct path, the coupled power depends on the angle between them:

`coupling factor = cos²(Δψ)`
{: .cs-formula}
At 45° that is half the power (3 dB), at 90° in theory nothing. That matters for direct VHF and UHF paths. On HF skywave, the ionosphere is a magnetised plasma that splits and rotates the wave, and multipath mixes several arrivals. The polarisation that arrives can change over time and differ from the transmitted one. That is why I do not use polarisation to explain the difference between my FT8 and SSB experiences. What remains are take-off angle, pattern, noise and timing, and comparing them properly requires measuring SNR on both antennas under the same conditions.

</details>

<aside class="cs-why" markdown="1">
<p class="cs-why-label">Why this contributes to a clean signal</p>

A good station only produces a remarkable signal when the path cooperates. Choosing band and moment, as with the Borneo contact, multiplies the effect of all the measures in the previous chapters. The FT8 reports show that on 25 W a margin of roughly 8 to 10 dB above the decoding limit usually remains: room that exists because little is lost along the way.

</aside>

## <span class="cs-num">13</span>How it all comes together {#ch-13}

Here is the whole station in one view. Every row is a layer I treated on purpose. None of them is remarkable on its own. Together they form one consistent approach, from the antennas to the inside of the shack.

| Layer | What I did | On transmit it may | On receive it may |
|---|---|---|---|
| Antenna choice and position | Two free-standing antennas, away from structures | Radiate where intended, with less coupling into the house | Pick up less local noise |
| Defined return paths | 32 radials, a counterpoise routed away from the coax | Keep antenna current where it belongs | Keep the coax out of the antenna |
| Chokes along the coax | At the feedpoint, along the line, before the cabinet, after the switch | Keep RF off the shield and out of the shack | Block noise travelling on the shield |
| Ferrites on the ground cable | Heavy snap-on ferrites with several turns | Limit RF on a long conductor | Close a noise path into the shack |
| Low-loss coax | Extraflex Bury 7, with calculated losses | Bring more of the 25 W to the antenna | Lose less of weak signals |
| Separate filtered circuit | Own sub-board with star-wired sockets | Limit RF onto the house wiring | Reduce noise arriving from the mains |
| Solar installation | Schaffner filter on the inverter AC side, ferrites on the DC strings | Reduce RF reaching the house network | Reduce inverter noise at its source |
| Shack mains filter | Second Schaffner filter at the shack sub-board | Keep station RF off the house wiring | Reduce mains-borne noise entering the shack |
| One busbar | All equipment bonded at one point | Avoid loops that carry RF | Avoid loops that collect noise |
| Power supply and DC filter | Mean Well supply plus RF.Guru DC filter | Stable, clean DC under load | Less switching noise |
| Device and network cables | Ferrites, a shielded network cable | Keep RF out of USB and audio leads | Less noise from computers and network |
| Audio chain | Calm ALC, treble emphasised over bass, no compression, wide passband | Clean, linear SSB | Not applicable |
| Tuning | Low SWR on most bands | Less loss in the line | Not applicable |

<figure class="cs-fig cs-diagram"><img class="cs-only-light" src="/assets/images/clean-signal/fig8-layers-light.svg" alt="The whole station as layers, from antenna to radio, with each layer from the table marked" loading="lazy"><img class="cs-only-dark" src="/assets/images/clean-signal/fig8-layers-dark.svg" alt="The whole station as layers, from antenna to radio, with each layer from the table marked" loading="lazy"><figcaption>The whole station as layers, from antenna to radio, with each layer from the table marked</figcaption></figure>

The 80 m observation fits this picture. The shack layers are the same on every band, but on 80 m the antenna layer is weaker, and so is my signal. A chain is only as strong as its weakest layer.

### What each layer protects against

The table says what each layer may do. It becomes more concrete when you ask the opposite question: what would I expect to see or hear if that layer were missing? The symptoms below are what each measure is designed to prevent, and what amateurs commonly report when it is absent. I did not create these failures on purpose to check them.

- **Antenna choice and position.** An antenna close to the house, gutters or wiring couples into those conductors. I would expect more RF on the house wiring, more noise picked up from the house, and a pattern and SWR that depend on nearby metal.
- **Defined return paths.** Without a counterpoise, the outside of the HyEndFed coax becomes the return path. Typical symptoms: an SWR that changes when you touch or move the coax, RF on the microphone or the radio's case, and more noise on receive. DC4KU measured exactly this case: about 40 mA on the feedline at 10 W without a defined return path, and about 18 dB more receive noise on 3.7 MHz than with one. Without radials, the return current of the vertical would flow through the clay itself, adding a ground-loss resistance in series with a radiation resistance of a few tens of ohms, and making the antenna follow the weather even more than it did this summer.
- **Chokes along the coax.** Without them, common-mode current can flow on the shield into the shack. On transmit: a microphone or metal parts that feel "hot" with RF, reports of distortion, hum or a buzz that changes with band or power, an SWR that changes with the cable route, and a coax that radiates with its own pattern. On receive: noise from the house and the neighbourhood carried in on the shield, seen as a noise floor that drops when the coax is disconnected at the shack entry.
- **Ferrites on the ground cable.** Without them, a few metres of ground cable can act as a radiator and a pickup wire, especially on bands where its length approaches a quarter wave (about 5.3 m on 20 m, 2.6 m on 10 m). Symptoms: RF voltage on equipment cases, and noise from the house earthing system entering the shack.
- **Low-loss coax.** On my 28 m IronWave line the cable costs about 0.6 to 0.8 dB from 20 to 10 m. A thinner, lossier cable can lose several times more on 28 MHz, and that loss comes straight off both my transmitted signal and the weak signals I want to hear.
- **Filtering at the solar inverter.** Inverters switch at high frequencies, and their AC wiring and DC strings can act as antennas. Without filtering, the typical result is a broadband noise carpet over the HF bands, during the daylight hours when the panels produce.
- **Shack mains filter and separate circuit.** Without them, noise travelling along the house mains reaches every device in the shack, and station RF travels out along the same wires into the house, where it can disturb household electronics.
- **One busbar and star wiring.** Without them, devices connected in chains form loops. Symptoms: 50 Hz hum on the transmitted audio and in the receiver, and RF currents circulating between devices through their cable screens.
- **Power supply and DC filter.** A supply that sags on voice peaks makes SSB distorted and "pumping". A noisy switching supply shows up as a comb of birdies or a raised noise floor, often on specific bands.
- **Device and network cables.** Without ferrites, computer, USB and HDMI cables act as antennas: birdies from the computer on receive, and on transmit RF on USB that can cause CAT or audio dropouts, frozen software or distorted digital-mode audio. A poorly connected network cable can carry noise from the network into the shack.
- **Audio chain.** Too much drive or a busy ALC causes splatter and distortion. Too much bass gives a boomy, less readable sound and wastes peak power. Heavy compression raises background noise and can make the audio sound harsh, which is one reason I leave it off.
- **Matching.** A high SWR adds loss in the line, and many transceivers reduce their output to protect the power amplifier when the SWR rises.

Which of these symptoms would actually appear without a given layer, in my station, I cannot say without testing it. The list shows what each layer is there for, and why leaving one out can undo the work of the others.

I believe it is this combination, applied consistently on every front, that makes the difference, not any single part of it.

## <span class="cs-num">14</span>If I started again {#ch-14}

This is my own order, based on my experience. It is not the best order for everyone.

- **Start with the antenna and the feedline.** A sensible antenna for your space, with a defined return path, matters more than expensive equipment.
- **Decide where the antenna ends.** Put a choke where the return path should stop, so the coax does not become part of the antenna.
- **Look at every cable that enters the shack.** Coax, ground cable, mains, DC, device cables and network. Each one is a possible path.
- **Keep your audio calm.** Moderate drive, a quiet ALC, no extreme settings.
- **Calculate before you guess.** Look up your cable's datasheet, calculate its loss on each band, and know what your SWR reading does and does not mean.
- **Change one thing at a time,** and note what you changed and what you heard.
- **Keep a log of remarkable reports,** including band, antenna, time and propagation.
- **Ask for advice, and try to understand the why.** Most of my choices followed expert advice. Understanding the reasons is what turned it into knowledge.

**Safety first, always:** keep protective earthing and bonding intact, leave mains work to a qualified electrician, keep people away from antennas while transmitting, never connect an antenna analyser to a transmitter, and do not transmit or work on antennas during a thunderstorm.

## <span class="cs-num">15</span>What comes next, and thank you {#ch-15}

The HyEndFed is a temporary solution for 40 and 80 m. Together with RF.Guru, I plan a dedicated setup for those bands, and later for 160 m. When that is in place, I hope to write a follow-up, ideally with measurements this time.

RF.Guru is my go-to supplier for antennas, filtering and cabling, and I received a great deal of inspiration, knowledge and advice from them. A big thank you to Joeri, ON6URE, and the RF.Guru team. Many of the ideas in this article come from their technical articles, which I warmly recommend to anyone who wants to go deeper.

If you take one thing from this article, let it be this: a clean signal is not the result of one component, but of an integrated approach on every front, from the antenna to the last cable in the shack.

## Sources and further reading {#sources}

All explanations in this article are written in my own words. These are the sources I learned from.

**Related articles on this site**

- [25 watts to Borneo: my 15 m SSB contact with Indonesia](/2026/09/28/25-watts-to-borneo-15m-dx/)
- [Building my HF station](/2026/05/01/hf-station-build/)
- [Ferrite mix 43 and the 49:1 unun](/2026/07/14/ferrite-mix-43-and-the-49-1-unun/)
- [Measuring is knowing: NanoVNA and tinySA](/2026/09/28/measuring-is-knowing-nanovna-tinysa/)
- [Decibels for radio amateurs](/2026/06/01/decibels-for-radio-amateurs/)
- [Propagation terms for beginners](/2026/05/04/propagation-terms-for-beginners/)

**RF.Guru technical articles (Joeri Van Dooren, ON6URE)**

- [First HF station: antenna, bonding, chokes and SWR](https://shop.rf.guru/pages/on3vz-first-hf-station-antenna-bonding-chokes-swr)
- [Currents on the coaxial cable](https://shop.rf.guru/pages/currents-on-the-coaxial-cable-a-multi-lane-highway-of-rf-behavior)
- [What common mode really means](https://shop.rf.guru/pages/what-common-mode-really-means-and-why-hams-get-it-wrong)
- [RF in the shack: skin effect and common mode](https://shop.rf.guru/pages/rf-in-the-shack-skin-effect-common-mode)
- [How many common-mode chokes?](https://shop.rf.guru/pages/how-many-common-mode-chokes-measure-placement)
- [How much choking do you really need for RX and TX?](https://shop.rf.guru/pages/how-much-choking-do-you-really-need-for-rx-and-tx)
- [Coax before the choke: define the EFHW return path](https://shop.rf.guru/pages/efhw-coax-before-choke-return-path-boundary)
- [End-fed SWR measurement: return path and reference plane](https://shop.rf.guru/pages/end-fed-swr-measurement-return-path-reference-plane)
- [Your EFHW is not noisy, your feedline is](https://shop.rf.guru/pages/your-efhw-isn-t-noisy-your-feedline-is)
- [Baluns in a nutshell](https://shop.rf.guru/pages/baluns-in-a-nutshell)
- [Where the current flows, the signal grows](https://shop.rf.guru/pages/where-the-current-flows-the-signal-grows)
- [DC-grounded vs DC-open antennas](https://shop.rf.guru/pages/dc-grounded-vs-open-antennas-what-every-ham-should-know)
- [Why I²R matters](https://shop.rf.guru/pages/why-i-r-matters-the-hidden-efficiency-factor-in-your-ham-setup)
- [Impedance and matching](https://shop.rf.guru/pages/impedance-and-matching)
- [Matching networks and efficiency](https://shop.rf.guru/pages/matching-networks-and-efficiency)
- [Why resonance is not always the SWR sweet spot](https://shop.rf.guru/pages/why-resonance-isn-t-always-the-swr-sweet-spot)
- [Inductive loads and loading coils](https://shop.rf.guru/pages/the-inductive-load-why-it-s-the-convenient-radiator-in-rf-systems)
- [Short radials: what Rudy Severns, N6LF, measured](https://shop.rf.guru/pages/short-radials-rudy-severns-n6lf-measured-ground-systems)
- [Understanding polarisation](https://shop.rf.guru/pages/understanding-polarisation-why-it-matters-for-your-antennas)
- [Radio weather: Kp, solar flux and more](https://shop.rf.guru/pages/radio-weather-k-index-solar-flux-and-more)
- [IronWave 6 technical overview](https://shop.rf.guru/pages/ironwave-6-technical-overview)

**Manufacturers and datasheets**

- [HyEnd Company: HyEndFed 5 Band Black Clamp MK3](https://www.hyendcompany.nl/antenna/multiband_8040201510m/product/detail/3/HyEndFed_5_Bandes_Pince_Noire_MK3)
- [Messi & Paoloni: Extraflex Bury 7 datasheet (PDF)](https://rigexpert.com/wp-content/uploads/2023/05/extraflex-bury-7-eng-min.pdf)
- [Schaffner FN2410 and FN2412 datasheet](https://www.schaffner.com/product/FN2410_and_FN2412/Schaffner_datasheet_FN2410_and_FN2412.pdf)
- [Mean Well 26 A, 13.8 V power supply (RF.Guru)](https://shop.rf.guru/products/mean-well-26-a-360-w-industrial-ac-dc-power-supply-13-8-v)
- [RF.Guru DC Protect / Noise Filter 30 A](https://shop.rf.guru/products/dc-protect-soft-start-noise-filter-30a-13-8v-pp45)

**Primary references**

- [Werner Schnorrenberg, DC4KU: end-fed antenna with counterpoise and choke (PDF, German)](https://www.hyendcompany.nl/images/image/file/HyEndFed_Antenne_mit_Mantelwellensperre.pdf)
- [Rudy Severns, N6LF: Ground system performance for HF verticals, part 2 (QEX)](https://antennasbyn6lf.com/ARRL_articles/QEX%20Jan-Feb%202009%20Ground%20systems%20part-2.pdf)
- [ARRL: Common-mode chokes (QST, Lamano)](https://www.arrl.org/files/file/QST/This%20Month%20in%20QST/2024/03%20Mar%2024/03%20march%202024%20Lamano%20free%20article.pdf)
- [ITU-T K.10: common- and differential-mode definitions](https://www.itu.int/rec/T-REC-K.10-199610-I)
- [ITU-R P.527: electrical characteristics of the surface of the earth](https://www.itu.int/rec/R-REC-P.527-6-202109-I/en)
- [ITU-R P.372: radio noise](https://www.itu.int/dms_pubrec/itu-r/rec/p/R-REC-P.372-17-202408-I%21%21PDF-E.pdf)
- [Tom Rauch, W8JI: common-mode current](https://new.w8ji.com/common-mode-current/)
- [NOAA Space Weather Prediction Center: space weather scales](https://www.swpc.noaa.gov/node/1085)
- [ARRL Antenna Book](https://www.arrl.org/arrl-antenna-book)

</div>
