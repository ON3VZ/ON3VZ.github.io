---
layout: post
title: "New Radio, First Antenna, and the Puzzle of HF Bands"
tags: [HF, Propagation, IC-7300, Beginners, Band Reference]
---

The box arrived. Inside: an **Icom IC-7300 MkII**. A few days later, the antenna went up — a vertical in the garden, first contact with the outside world. And then the real question appeared: *now what?*

Calling CQ is easy enough. But *when* do you call? On *which* band? And once you find a signal, how do you set up the radio to actually hear it properly? Every experienced amateur seems to know the answer instinctively. For a newly licensed **Class C operator** in Belgium, it is a puzzle with at least a dozen moving pieces.

This post is my working answer to that puzzle. Not a textbook, not a definitive guide — just what I have figured out so far, from station JO21EE in Hoboken, running 25 W into a vertical. It will probably need revisions. That is fine. This is where I am right now.

---

## The First Thing You Learn: Bands Are Not Always Open

HF radio is not like Wi-Fi. You cannot just pick a frequency and expect it to work. The ionosphere — the electrically charged layer of the atmosphere that makes long-distance HF communication possible — changes constantly. It responds to the time of day, the season, and most dramatically, to solar activity.

The fundamental driver is the **Solar Flux Index (SFI)**. Think of it as the Sun's daily radio output at 10.7 cm wavelength. Higher SFI means a more active ionosphere, which means higher bands (15m, 10m) open up for intercontinental DX. Lower SFI means conditions collapse and you are mostly limited to 80m and 40m for regional contacts.

We are currently in **Solar Cycle 25**, near its peak (2024–2026). That means 15m and 10m are genuinely usable right now — an opportunity that will narrow as the cycle declines over the next few years.

The other variable is the **D-layer**: a lower ionospheric layer that absorbs signals during daylight, particularly hard on 80m. During the day, 80m is mostly useful for nearby NVIS (Near Vertical Incidence Skywave) contacts within a few hundred kilometres. At night, the D-layer fades and 80m opens up across Europe and beyond.

---

## The Timeline: Which Band, When?

This is the core of the puzzle. The chart below is based on average conditions from Belgium (JO21EE), expressed in UTC. Seasonal variation exists — winter nights are longer, summer brings sporadic-E openings on 10m — but this is a solid starting framework.

<div class="img-full">
  <img src="/assets/images/band-timeline.svg" alt="Band propagation timeline — all times UTC, Belgium JO21EE" loading="lazy">
</div>

A few things jump out immediately:

**80m is a night band.** During the day the D-layer absorbs most of the energy and you are limited to close-range NVIS. From roughly 18:00 UTC onwards, the band opens up properly — European DX first, and on good nights W/K and even ZL are possible on greyline.

**40m is the workhorse.** It offers something at almost any hour: European stations during daylight, then DX (North America, South America, Japan, Australia) overnight. It is also the busiest band in the region, which means competition and interference from European broadcasters.

**30m is the quiet DX band.** It is a WARC band, meaning no contest traffic. It runs CW and digital modes only — no SSB permitted. Once I understood that, a lot of confusion about not finding voice contacts on 10.100 MHz cleared up immediately.

**20m is the premier DX band.** When conditions are up and the band is open, 20m is where you find North America, the Caribbean, Africa, Japan, and Australia — all in one place, often simultaneously. It typically opens from around 07:00 UTC and holds until late evening.

**15m and 10m depend on the Sun.** These bands can be spectacular — worldwide contacts from 25 W with ease — but only when the SFI is high enough to support F2 propagation. At SFI values above 120, 15m and 10m are often open across multiple continents during daytime. Below 80, they are largely silent. Check a DX cluster or propagation beacon before calling CQ on these bands; the open/closed state can change quickly.

---

## Band-by-Band Reference

The table below summarises the key parameters for each band in my Class C licence allocation. All times UTC.

| Band | Frequencies | Modes | Day (UTC) | Night (UTC) | Typical Reach |
|------|------------|-------|-----------|-------------|---------------|
| **80m** | 3.5–3.8 MHz | LSB, CW, FT8 | 05–08 / 16–22 · NVIS (&lt;500 km) | 18–05 · EU + DX | Belgium to UK/DE/FR (day); all Europe + greyline DX (night) |
| **40m** | 7.0–7.2 MHz | LSB, CW, FT8 | 06–18 · 300–800 km | 18–06 · DX | Benelux + neighbours (day); NA, ZA, JA, VK (night) |
| **30m** | 10.100–10.150 MHz | CW, Digital only | 08–17 · variable | 17–08 · consistent | Europe + NA (day); worldwide JA/VK/ZL/PY (night) |
| **20m** | 14.0–14.35 MHz | USB, CW, FT8 | 07–19 · 1000–12000+ km | 19–07 · EU-DX | NA, Caribbean, ZA, JA, VK, AF — daily at normal conditions |
| **15m** | 21.0–21.45 MHz | USB, CW, FT8 | 09–17 · SFI&gt;110 | Closed | NA, ZA, JA, VK, PY — requires decent solar flux |
| **10m** | 28.0–29.7 MHz | USB, CW, FT8, FM | 10–15 · SFI&gt;120 or Es | Closed | Worldwide unlimited — or completely dead |

A note on **FT8 dial frequencies** (all USB): 3.573 / 7.074 / 10.136 / 14.074 / 21.074 / 28.074 MHz. These are the standard entry points for digital contacts on each band.

---

## The IARU Region 1 Band Plan: Where to Operate

Knowing a band is "open" is only half the answer. You also need to know *where* on the band to go for SSB voice contacts. The IARU Region 1 band plan defines this for Europe.

| Band | CW segment | Digital / FT8 | SSB segment | QRP calling | Notes |
|------|-----------|---------------|-------------|-------------|-------|
| **80m** | 3500–3570 kHz | — | 3600–3800 kHz | 3700 kHz | LSB |
| **40m** | 7000–7040 kHz | 7047 WSPR / 7074 FT8 | 7060–7200 kHz | 7090 kHz | LSB; broadcasters above 7200 |
| **30m** | 10100–10130 kHz | 10130–10150 kHz (FT8: 10.136) | **No SSB** | — | WARC band — no contests |
| **20m** | 14000–14070 kHz | 14070–14100 kHz (FT8: 14.074) | 14100–14350 kHz | 14285 kHz | USB |
| **15m** | 21000–21150 kHz | 21074 FT8 | 21150–21450 kHz | 21285 kHz | USB |
| **10m** | 28000–28120 kHz | 28120–28300 kHz (FT8: 28.074) | 28300–29300 kHz | 28360 kHz | USB; FM above 29.000 MHz |

For SSB, the rule of thumb is simple: **LSB below 10 MHz, USB above 10 MHz**. On 30m, do not look for voice contacts — they will not be there, and they are not permitted.

The **DX window** on 20m is around 14.195 kHz ±5 kHz. DXpeditions typically operate in or near this segment. Listen around it before transmitting.

---

## Setting Up the IC-7300 MkII per Band

This is where the radio itself becomes part of the puzzle. The IC-7300 MkII has a lot of knobs and menus, and not all defaults are optimal for every band. The chart below captures what I have settled on as sensible starting points.

<div class="img-full">
  <img src="/assets/images/ic7300-settings-bands.svg" alt="IC-7300 MkII recommended settings per band" loading="lazy">
</div>

A few principles behind these choices:

**PreAmp:** PRE1 is sufficient for most HF work. PRE2 is for genuinely weak signals on higher bands with good conditions. On 80m and 40m at night, the band noise itself often dominates and the preamp adds nothing useful — turn it off.

**Noise Blanker (NB):** Useful on 80m and 40m where switching noise, PV inverters, and broadband interference are common. My own solar inverter causes noticeable QRM on 80m and 40m — the NB at 50%, medium width, helps significantly. On 20m and above, the bands are cleaner and NB can usually stay off.

**Noise Reduction (NR):** Use sparingly. Higher NR levels do suppress noise, but they introduce processing artefacts and make voices sound unnatural. For DX work, a clean (if noisy) signal is often better than a processed one. I keep NR at level 3–6 maximum and prefer to use the filter first.

**Filter width:** Narrow down when the band is busy. On 40m during peak hours, 1.8 kHz SSB can make a significant difference. For casual operation, 2.4 kHz is comfortable. CW gets 500 Hz or tighter.

**AGC:** SLOW works well for SSB and CW where signal levels are relatively stable. Switch to FAST for DX pile-ups where signals fluctuate rapidly, and on 10m where sporadic-E can produce wild swings in signal strength.

---

## Greyline: The Bonus Window

Worth mentioning separately: the **greyline** is the transition zone between day and night on Earth's surface. As it sweeps across Belgium at sunrise (around 04:30–05:00 UTC average) and sunset (around 19:30–20:00 UTC average), the ionosphere is in a briefly asymmetric state that enhances long-distance propagation on 40m and 80m in particular.

During greyline, paths to North America, Japan, and the Pacific that would otherwise be unavailable can open for 15–30 minutes. It is worth monitoring 40m and 80m around those times. The DX cluster will often show it happening before you notice it yourself.

---

## The Licence Boundary: Class C

One thing to keep visible in every table and every operating decision: as a **Class C operator in Belgium**, I am limited to **25 W on HF** and **50 W on VHF/UHF**. This is per the BIPT decision of 24 May 2019.

25 W is genuinely capable — FT8 contacts on 20m with the US are routine at that level. But it does mean I need to be more thoughtful about antenna placement and band selection than a 100 W or 400 W station. Efficiency matters more. Timing matters more. Understanding propagation is not just theoretical — it directly determines whether a contact is possible.

---

## What Comes Next

This is a living document. A few things I am still figuring out:

- **IC-7300 MkII memory channels:** Can the per-band settings above be encoded as presets? The memory system on the IC-7300 allows saving frequency + mode, but not the full parameter set. The CI-V interface and software like WSJT-X can partially automate this. More on that in a future post.
- **Antenna performance per band:** The vertical I am running behaves differently on each band. Understanding where the takeoff angle is acceptable and where it is not will shape which contacts are realistic.
- **Seasonal variation:** This reference is based on annual averages. Summer sporadic-E on 10m and 6m is a different beast entirely.

For now: radio on, antenna up, propagation checked, band chosen, settings dialled in. Time to make some contacts.

**73 de ON3VZ**

---

*Band plan source: IARU Region 1, valid for Belgium/Europe/Africa. Licence reference: BIPT decision 24/05/2019. Propagation data based on average conditions at JO21EE. All times UTC.*
