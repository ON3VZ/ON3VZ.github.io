---
layout: post
title: "Two Antennas, Two Jobs: What My IronWave Vertical and HyEndFed Sloper Can Do"
tags: ['Antennas', 'IronWave', 'HyEndFed', 'NanoVNA', 'SWR', 'NVIS', 'DX', 'Measurements', 'Beginners']
excerpt: "A vertical for DX and a sloping end-fed wire for the low bands: what a 1 to 30 MHz NanoVNA sweep of both antennas shows, which band each one is good for, and where NVIS ends and DX begins."
---
<!-- ANTENNA-SWEEPS 2026-10-29: new post. Revert by deleting this file and the folder assets/images/antenna-sweeps/ -->
<style>
/* ANTENNA-SWEEPS post styles, scoped to .aw-article; follows the fresh light/dark tokens */
.aw-article figure { margin: 1.8rem 0 2rem; }
.aw-article figure img { display: block; width: 100%; max-width: 900px; margin: 0 auto; border-radius: 10px; border: 1px solid var(--c-border); background: #fff; }
.aw-article figcaption { font-size: .86rem; line-height: 1.5; color: var(--c-text-3); margin: .75rem auto 0; max-width: 760px; text-align: center; font-style: italic; }
.aw-article .aw-note { border-left: 3px solid var(--c-cyan, #1E6BA8); padding: .6rem 1rem; margin: 1.4rem 0; background: var(--c-surface); border-radius: 0 8px 8px 0; }
.aw-article .aw-note p { margin: 0; }
.aw-article table thead th { color: var(--c-text) !important; }
.aw-article .aw-svg { width: 100%; height: auto; max-width: 820px; display: block; margin: 0 auto; }
.aw-article .aw-svg text { fill: var(--c-text-2, #556); font-size: 14px; font-family: inherit; }
.aw-article .aw-svg .aw-strong { fill: var(--c-text, #223); font-weight: 600; }
.aw-article .aw-svg .aw-ground { stroke: var(--c-text-3, #889); stroke-width: 2; }
.aw-article .aw-svg .aw-iono { stroke: var(--c-text-3, #889); stroke-width: 2; stroke-dasharray: 7 5; fill: none; }
.aw-article .aw-svg .aw-dx { stroke: var(--c-primary, #0E8A50); stroke-width: 2.5; fill: none; }
.aw-article .aw-svg .aw-nvis { stroke: var(--c-cyan, #1E6BA8); stroke-width: 2.5; fill: none; }
.aw-article .aw-svg .aw-ant { stroke: var(--c-text, #223); stroke-width: 3; fill: none; stroke-linecap: round; }
</style>
<div class="aw-article" markdown="1">

I have two HF antennas in my garden, and they are very different animals. One is a vertical that I use for DX. The other is a long wire that slopes from the roof down to a pole, and I use it for the low bands. Today I put a NanoVNA on both and swept the whole range from 1 to 30 MHz, so I could see them side by side.

This article shows what the sweeps look like, what they tell me, and, just as important, what they do **not** tell me. At the end you get a simple guide: which antenna for which band, and when to think NVIS versus DX.

I am a Class C amateur with 25 W, so efficiency matters to me more than it does to somebody with a linear amplifier.

## The two antennas

**RF.Guru IronWave 6**: a vertical for the higher bands. It stands free in the middle of the garden with 32 radials, buried about 1 cm deep in clay soil. I use it on 30 to 10 m.

**HyEnd Company 5 Band HyEndFed (MK3)**: an end-fed wire of about 23 m for 80, 40, 20, 15 and 10 m. The feedpoint sits about 9 m above ground, and the wire slopes down over the gardens to a pole about 2 m high. It has a separate counterpoise wire. On 80 m it is made resonant with a coil. I use it as a temporary solution for 40 and 80 m, until a dedicated low-band antenna arrives.

## How I measured

- A NanoVNA, read out with NanoVNA Saver. Sweep from 1 to 30 MHz with 101 points. That is one point every 290 kHz.
- I measured from the shack end of the feedline, so the coax is part of the measurement. Coax losses make the SWR look a bit better than it is at the antenna itself.
- The grey stripes in the graphs are the amateur bands. The vertical scale differs per graph (the IronWave goes up to 25, the HyEndFed to 12, and the earlier HyEndFed sweep is cut off at 5). Look at the numbers on the left before you compare the shapes.
- The numbers in the tables are **read from the graphs**, so treat them as approximate. With a step of 290 kHz, a narrow dip can be a bit deeper or sharper than the graph shows.
- SWR only tells you how well the antenna matches the cable. It does **not** tell you how well the antenna radiates.

## The sweeps

<figure>
<img src="/assets/images/antenna-sweeps/ironwave-6-vswr-sweep.png" alt="NanoVNA S11 VSWR sweep from 1 to 30 MHz of the IronWave 6 vertical: very high at the lowest frequencies, around 2 on 20 to 12 m, between about 2 and 4 on 10 m" loading="lazy">
<figcaption>IronWave 6, 1 to 30 MHz. A smooth curve that falls as the frequency rises: high on the low bands, around 2 or lower from 20 m upward. Note the scale goes up to 25.</figcaption>
</figure>

<figure>
<img src="/assets/images/antenna-sweeps/hyendfed-vswr-sweep-latest.png" alt="NanoVNA S11 VSWR sweep from 1 to 30 MHz of the HyEndFed: narrow dips on 80, 40, 20, 15 and 10 m, high peaks in between" loading="lazy">
<figcaption>HyEndFed, 29 October 2026, 1 to 30 MHz. Typical end-fed behaviour: narrow dips on its five bands and high peaks in between.</figcaption>
</figure>

<figure>
<img src="/assets/images/antenna-sweeps/hyendfed-vswr-sweep-earlier.png" alt="Earlier NanoVNA S11 VSWR sweep of the HyEndFed, a few weeks before, with the vertical scale cut off at 5" loading="lazy">
<figcaption>The same HyEndFed a few weeks earlier. This graph is cut off at SWR 5, so everything above that is simply not visible.</figcaption>
</figure>

### The numbers, band by band

| Band | IronWave 6 | HyEndFed (29 Oct) | HyEndFed (weeks earlier) |
|---|---|---|---|
| 80 m | about 9 to 10 | dip of about 1.3 near 3.6 MHz, about 4 to 5 at 3.8 MHz | dip of about 1.6, about 4 at 3.8 MHz |
| 40 m | about 6.6 | about 1.3 to 1.6 | about 1.5 to 2.3 |
| 30 m | about 6 | about 11 | above 5 (cut off) |
| 20 m | about 2.0 to 2.2 | about 1.4 to 2.2 | about 1.6 to 3.5 |
| 17 m | about 1.8 | about 7 | above 5 (cut off) |
| 15 m | about 2.0 to 2.2 | about 1.4 to 1.9 | about 1.6 to 2.8 |
| 12 m | about 2.8 | about 2.0 to 2.8 | about 4 or higher |
| 10 m | about 2.3 to 3.6 | about 1.2 to 1.8 | about 1.2 to 2.5 |

### What I read from this

- **The IronWave is a high-band antenna.** From 20 m upward the SWR is about 2 or lower on 20, 17 and 15 m, and up to about 3.6 on the top part of 10 m. That is well within what a radio's internal tuner can handle. On 30 m it is about 6, on 40 m about 6.6 and on 80 m about 9 to 10. An external tuner will make that match, but a short vertical on those bands loses most of the power as heat and in the ground system. The match is possible, the radiation is the problem.
- **The HyEndFed is a five-band antenna with gaps.** The dips are where it works: 80, 40, 20, 15 and 10 m. In between (30 m and 17 m) the SWR is high, and I do not use it there.
- **40 m is the HyEndFed's best low band**, with a SWR of about 1.3 to 1.6 right across the band.
- **80 m is narrow.** The dip is nicely low at about 3.6 MHz, but it climbs to about 4 to 5 by 3.8 MHz. The coil makes the antenna resonant, but it does not make it radiate well.
- **Today's HyEndFed sweep is a bit better than the one from a few weeks ago.** A difference like that can come from weather, damp or dry ground, a slightly different cable position or a different calibration. I would not read much into it.

<div class="aw-note" markdown="1">

**What SWR cannot tell you.** A low SWR does not mean a good antenna. A dummy load has a perfect SWR and does not radiate at all. And a high SWR on a short vertical does not always mean the antenna is useless, but it often means a lot of the power never leaves the garden. SWR is one clue, not the answer.

</div>

## NVIS versus DX in one picture

**NVIS** stands for Near Vertical Incidence Skywave. You send your signal steeply upwards, the ionosphere sends it back down, and it lands relatively close to you, roughly within a few hundred kilometres. That is what you need for regional contacts on 80 and 40 m. **DX** is the opposite: a low take-off angle that skims towards the horizon, hits the ionosphere far away and lands thousands of kilometres from you.

<figure>
<svg class="aw-svg" viewBox="0 0 820 320" role="img" aria-label="Diagram: a vertical antenna sends low-angle waves that reach the ionosphere far away and land far from the station (DX). A sloping wire sends higher-angle waves that return close to the station (NVIS).">
<path class="aw-iono" d="M20 70 Q 410 20 800 70"/>
<text x="610" y="40">ionosphere</text>
<line class="aw-ground" x1="20" y1="270" x2="800" y2="270"/>
<line class="aw-ant" x1="95" y1="270" x2="95" y2="215"/>
<path class="aw-ant" d="M170 232 L215 270"/>
<circle cx="170" cy="232" r="3" fill="currentColor"/>
<text class="aw-strong" x="55" y="295">IronWave (vertical)</text>
<text class="aw-strong" x="150" y="313">HyEndFed (sloper)</text>
<path class="aw-dx" d="M97 262 L430 55 L735 262"/>
<text class="aw-strong" x="460" y="150">DX: low angle, thousands of km</text>
<text x="460" y="170">20 to 10 m, the IronWave's job</text>
<path class="aw-nvis" d="M185 238 L240 62 L330 262"/>
<text class="aw-strong" x="255" y="215">NVIS: high angle,</text>
<text class="aw-strong" x="255" y="233">up to a few hundred km</text>
<text x="255" y="251">80 and 40 m, the sloper's job</text>
</svg>
<figcaption>A simplified drawing of the idea, not to scale. A vertical radiates mostly at low angles and has little straight up. A sloping wire radiates at higher angles as well, especially when it is low compared to the wavelength.</figcaption>
</figure>

Why this fits my two antennas:

- A **vertical** tends to have a low take-off angle, which is what you want for DX, and it has very little going straight up. That makes it a poor NVIS antenna.
- On **80 m**, my sloping wire is only 2 to 9 m above ground, which is a small part of a wavelength. A low wire radiates a lot of its energy at high angles. That is not good for DX but it is exactly what NVIS wants. Combined with the coil losses, I expect regional contacts only, not far DX.
- On **40 m**, the HyEndFed behaves like a normal end-fed half-wave. By day the high-angle radiation is useful for Europe and neighbouring countries. In the evening and at night, the band opens further.

These statements follow from antenna theory and from the match I measured. I have **not** measured the radiation patterns. The best check is an on-air comparison with reports from the same stations.

## Which antenna for which band

| Band | Use | What to expect |
|---|---|---|
| 80 m | HyEndFed | Regional and NVIS, mainly evenings and nights. Weak compared with a real 80 m antenna. |
| 40 m | HyEndFed | By day NVIS and Europe. Evenings can reach further. The best low-band result of this antenna. |
| 30 m | IronWave with external tuner | DX in theory. Expect losses, the SWR is about 6. |
| 20 m | IronWave | The DX workhorse for FT8 and SSB. |
| 17 and 15 m | IronWave | DX when the band is open. |
| 12 and 10 m | IronWave | DX when the band is open. |

The HyEndFed also matches well on 20, 15 and 10 m, but I keep it for 40 and 80 m. It is a good second opinion on those bands, and SSB audio on it often sounds cleaner to me.

## Beginner takeaways

- **Measure before you believe.** A NanoVNA costs very little compared with a radio, and one sweep tells you more than a month of "it feels good".
- **Do not stop at one reading.** I saw differences between two sweeps of the same antenna a few weeks apart. That is normal. Repeat and compare.
- **Sweep the whole range, not just one band.** The dips and peaks in between show you where an antenna works and where it does not.
- **A match is not performance.** A tuner can match nearly anything, but it cannot make a short antenna efficient.
- **Match the antenna to the job.** A vertical for DX, a sloping or horizontal wire for NVIS and regional contacts.
- **Check on the air.** If you have two antennas, do a fair comparison: same band, same hour, same power, same station reports. Two S-points of difference or more means a real difference.

My plan is to replace the HyEndFed on 40 and 80 m with a dedicated low-band solution, and let it go back to my portable kit. When that happens I will repeat these sweeps, so I can show you before and after.

If you measure your own antennas, I would love to see your results. 73!

*73 de ON3VZ*

</div>
