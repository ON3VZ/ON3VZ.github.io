---
layout: post
title: "Starting from Zero: Building a Capable HF Station on 25 Watts"
tags: [HF, Antennas, Station Build, Class C, Equipment]
---

Getting a Class C amateur radio licence feels like finally having the key to a door you have been staring at for months. You pass the exam, you receive your callsign, and then reality sets in: **now what?**

The licence permits you to transmit on the HF bands 80, 40, 30, 20, 15, and 10 metres, plus 2 metres and 70 cm on VHF — but the power limit is a modest **25 watts**. No linear amplifier to fall back on, no beam antenna pointing at the horizon. Just you, your wits, and whatever signal you can put into the air.

My situation added a few more constraints on top of that. I live in a semi-detached house in an urban area. The garden is small. Neighbours are close. A solar inverter runs most of the day. And a partner who — let us say — had a firm opinion about how many antenna structures were acceptable on the roof.

This is the story of how I went from knowing almost nothing to building a station I am genuinely proud of: one that covers all my Class C bands, performs as well as the laws of physics allow at 25 watts, and does it without compromise antennas that try to do everything and end up doing nothing particularly well.

---

## 1. The Transceiver: Choosing a Solid Foundation

Before antennas, I needed a radio. After considerable research, I settled on the **Icom IC-7300 MkII**.

| Feature | Why it matters for Class C |
|---|---|
| **Built-in ATU** | Handles mismatched loads at reduced power without stressing the network |
| **Real-time spectrum scope** | Shows band conditions at a glance — invaluable for a beginner |
| **Dedicated Rx antenna input** | Allows a separate, quieter receive antenna without switching hardware |
| **Clean receiver** | In an urban noise environment, receiver performance matters more than raw power |
| **25 W output** | Exactly at the Class C limit — no artificial power reduction needed |

One feature that matters especially at 25 watts: at reduced power, the internal ATU handles mismatched loads that would stress a similar tuner at full legal power. On bands like 30 and 40 metres where even a good vertical may present a higher SWR, the internal tuner deals with it cleanly.

---

## 2. The Antenna Problem: Why One Is Never Enough

The first lesson every HF operator learns — sometimes painfully — is that **no single antenna does everything well**. This is not a marketing claim. It is physics.

| Antenna type | Strength | Weakness |
|---|---|---|
| **Vertical** (good radials) | Low radiation angle → excellent DX | Suppresses NVIS → poor for regional |
| **Horizontal wire** (modest height) | High radiation angle → excellent NVIS | Lacks low-angle punch for DX |
| **"All-in-one" compromise** | Convenient | Does neither well |

> **NVIS** = Near Vertical Incidence Skywave. The propagation mode that lets you work stations within a few hundred kilometres, especially on 40 and 80 metres during evenings and early mornings.

I spent a long time looking at ladderline-fed doublets, end-fed off-centre wires, EFHW designs, and various compromise verticals. Each had a catch. The conclusion was uncomfortable but clear: **I needed two antennas.** Different polarisations, different radiation angles, different primary bands of use.

---

## 3. Antenna One: A Rugged Multiband Vertical

The first antenna is a **6-metre aluminium vertical** with a 4:1 UNUN at the base — no traps, no coils, no trimming required. Marine-grade aluminium with stainless steel hardware, rated well beyond anything Class C demands.

### How It Works

A critical point that took me a while to fully understand: it is **not the earth** that makes a vertical work — it is the **radial field**.

| Component | Function |
|---|---|
| **Ground rod** | Safety and static drainage only |
| **Radials** | RF current return path — completes the antenna circuit |
| **4:1 UNUN** | Transforms the feedpoint impedance for coaxial feed |

The baseline configuration uses **32 radials of 5 metres each**, laid on or just beneath the surface. This covers 20 to 10 metres with excellent SWR — no tuner required. On 30 and 40 metres, a tuner is needed and the pattern leans toward NVIS rather than DX.

### Unlocking 40 Metre DX: The Raised Radial Trick

Here is something I did not expect to find. With **six raised radials of 6 metres each**, elevated approximately 50 cm above the ground, the antenna develops a genuine 40 metre resonance dip — typically under 2:1 SWR — while retaining full 20 to 10 metre coverage. A second set at 8 metres brings 30 metres into range as well.

> **Why does this work?** The 6-metre radiator is electrically short at 7 MHz (roughly 0.15λ). The raised radials at ~0.23λ on 40 metres act as resonant counterpoises that reshape current distribution and pull the feedpoint resonance toward the target band. No traps. No coils. Just wire geometry working with physics.

### Band Coverage — Vertical Antenna

| Band | Frequency | SWR (baseline) | Tuner needed? | Primary mode | Notes |
|------|-----------|----------------|---------------|--------------|-------|
| **10m** | 28–29.7 MHz | < 2:1 | No | DX | Excellent low-angle radiation |
| **12m** | 24.9 MHz | < 2:1 | No | DX | Strong performance |
| **15m** | 21 MHz | ~1.3:1 | No | DX | Outstanding |
| **17m** | 18 MHz | ~1.6:1 | No | DX | Very good |
| **20m** | 14 MHz | ~1.7:1 | No | DX | Core DX band |
| **30m** | 10 MHz | ~3:1 | Yes | DX / regional | With raised radials: resonant dip possible |
| **40m** | 7 MHz | > 3:1 | Yes | NVIS (baseline) | With 6m raised radials: DX dip < 2:1 |

---

## 4. Antenna Two: A Stealth Horizontal Wire for NVIS

The second antenna fills the gap the vertical leaves open: 40 and 80 metre NVIS, regional contacts, and evening low-band work. It is also the antenna that made the installation possible without triggering a neighbourhood dispute.

### The Design Concept

The antenna is a **terminated folded wire approximately 14 metres long**, running horizontally just above the rooftop at roughly one metre above the surface. It is constructed from twin-wire and terminated off-centre with a non-inductive resistor.

| Design choice | Effect |
|---|---|
| **Off-centre termination** | Places the resistor at a low-current, high-voltage node → less resistive heating, better efficiency |
| **Non-inductive resistor** | Maintains broadband performance without frequency-selective losses |
| **Tuning stub at far end** | Allows fine frequency adjustment without cutting or repositioning wire |
| **IC-7300 MkII internal ATU** | Handles residual mismatch across the wide frequency range |

### Why This Works at Rooftop Height

Conventional wisdom says a wire antenna needs height to perform. **On NVIS bands, that wisdom is reversed.** For 80 and 40 metre regional propagation, a horizontal wire at 5 to 6 metres above ground is near optimal. One metre above a rooftop that is itself 8 to 9 metres high puts the effective radiation height at around 9 to 10 metres — a useful NVIS antenna by any measure.

### Stealth Factor

The wire is black and fades to weathered grey over time. Mounted on short grey PVC supports set in concrete ballast bases, it sits barely above the roofline and is **virtually invisible from the street**. This was a genuine design goal, not an afterthought — and it works.

### Band Coverage — Horizontal Wire Antenna

| Band | Frequency | Primary use | Radiation angle | Notes |
|------|-----------|-------------|-----------------|-------|
| **80m** | 3.5–3.8 MHz | NVIS / regional | High (NVIS) | Evening and night propagation — excellent |
| **40m** | 7.0–7.2 MHz | NVIS / regional | High (NVIS) | Daytime and evening regional contacts |
| **30m** | 10.1 MHz | Mixed | Medium | Useful transition band |
| **20m** | 14 MHz | Regional / medium DX | Medium-high | Complementary to vertical |
| **15m–10m** | 21–29 MHz | General | Variable | Usable — vertical preferred for DX |
| **160m** | 1.8–2.0 MHz | Regional | High | Compromised by length; usable locally |

---

## 5. Two Antennas, One Complementary System

The table below shows how the two antennas work together across the full Class C band allocation.

| Band | Vertical | Horizontal Wire | Recommended for |
|------|----------|-----------------|-----------------|
| **10m** | ✅ Primary, DX | Secondary | DX → vertical |
| **12m** | ✅ Primary, DX | Secondary | DX → vertical |
| **15m** | ✅ Primary, DX | Secondary | DX → vertical |
| **17m** | ✅ Primary, DX | Secondary | DX → vertical |
| **20m** | ✅ Primary, DX | ✅ Regional | DX → vertical / regional → wire |
| **30m** | ✅ With raised radials | ✅ Mixed | Both useful |
| **40m** | ✅ DX (raised radials) | ✅ NVIS / regional | DX → vertical / regional → wire |
| **80m** | ❌ Not covered | ✅ Primary, NVIS | Wire only |
| **160m** | ❌ Not covered | ⚠️ Limited | Wire (regional only) |

Switching between antennas uses a manual switch with a dedicated **ground position** — a third position that connects all inputs directly to earth. A passive safety measure that drains static charge when the station is unattended, without relying on active protection devices.

---

## 6. The Invisible Enemy: Noise and How to Fight It

At 25 watts in an urban environment, the **received signal-to-noise ratio matters as much as transmit power**. A noisy receiver makes weak signals disappear. A modern home is full of noise sources: switch-mode power supplies, LED lighting, network equipment — and in my case, a solar inverter.

### Solar Inverter Filtering

The solar system required filtering on **both** the AC and DC sides. Filtering only one side leaves a direct noise injection path on the other.

| Filter position | Purpose |
|---|---|
| AC filter on inverter output (meter cabinet) | Stops inverter switching noise reaching the mains |
| DC filters per string — at inverter | First DC-side barrier |
| DC filters at roof cable entry — both strings | Second DC-side barrier |

### Power Supply Chain

The full chain from wall to transceiver:

```
Mains → Dedicated shack circuit → Station power supply → DC soft-start/filter → IC-7300 MkII
```

The DC soft-start/filter module does three things: protects the transceiver from inrush spikes at power-on, filters switching noise from the supply, and buffers the sensitive radio front-end from the power supply's own noise floor.

### Common-Mode Chokes: Three Is the Minimum

A single choke at the feedpoint is better than nothing — but it is not enough. Common-mode current is **re-induced along the feedline**, not just generated at the antenna. A choke at one point suppresses it there; new common-mode current appears further down the run.

| Choke position | Rejection | Purpose |
|---|---|---|
| **At the antenna feedpoint** (11–15 m from base) | 45 dB | Stops coax shield from becoming part of the radiating system |
| **At shack entry / antenna cabinet** | Broadband | Prevents outside RF and noise riding the shield into the shack |
| **At the transceiver** | 160–10 m wideband | Last line of defence; protects USB, CAT, and audio interfaces from RF feedback |

> Each choke handles a different problem. **None of them is optional.**

### The Antenna Cabinet: One Entry Point

All coax lines enter the shack through a dedicated **IP66-rated outdoor cabinet** mounted on the rear wall. The cabinet's stainless steel mounting plate is bonded to the house protective earth — making it the single point where all incoming conductors come to house potential. One controlled, bonded entry point. Not multiple independent grounds scattered around the building.

---

## 7. Grounding: What It Is and What It Is Not

Probably the most misunderstood topic in amateur radio. I spent weeks reading conflicting advice before the picture cleared up.

There are **three completely separate functions** that the word "grounding" gets applied to, and confusing them causes real problems:

| Function | What it does | What provides it |
|---|---|---|
| **Safety / AREI compliance** | Protects against fault currents; ensures breakers trip correctly | House earth (PE) — mandatory, non-negotiable |
| **RF return path** | Completes the antenna circuit at radio frequencies | Radial field — not a ground rod |
| **Static / DC drainage** | Safely drains charge accumulated by wind and weather | DC path to ground at feedpoint, bonded to radial plate |

> Building an "RF ground" by hammering in extra earth rods is a waste of time and copper. Getting the **radial field right**, placing **chokes correctly**, and bonding everything to a single house-potential reference — that is what actually works.

---

## 8. What to Expect from This Station

With 25 watts, a well-performing vertical with a proper radial system, and a complementary horizontal wire for NVIS:

| Scenario | Band | Expected reach |
|----------|------|----------------|
| European contacts (SSB / FT8) | 20m | Routine, most days |
| Transatlantic DX (FT8) | 15m / 10m | Possible during good conditions |
| DX contacts (FT8) | 17m / 20m | Regular when bands are open |
| Regional contacts | 40m | Daily, reliable via NVIS wire |
| Evening / night | 80m | 500–1500 km, solid NVIS |
| 160m regional | 160m | Local and regional, limited |

FT8 changes the equation significantly for low-power operation. At 25 watts with a well-matched antenna, FT8 can reach stations that SSB would not. But the goal has always been a station capable of **real voice contacts** too — and for that, every decibel of signal that reaches the antenna feedpoint without being lost to mismatch, noise, or common-mode radiation is a decibel that actually counts.

---

## The Honest Summary

Starting from scratch as a Class C operator taught me that the constraints — 25 watts, limited space, urban noise — are actually a **useful discipline**. They force you to think carefully about where signal is lost and how to minimise that loss before adding power or complexity.

The antenna system I ended up with is not the cheapest option. It is not the simplest option. But it is the right option for what I want to do:

- ✅ Work DX on the high bands with the vertical
- ✅ Work regional and evening contacts on 40 and 80 metres with the horizontal wire
- ✅ Do both with confidence that the signal reaching the air is as clean and strong as 25 watts can make it

> **There is no magic antenna. There is no magic ground rod. There is only thoughtful engineering, honest compromise, and the willingness to learn what actually matters — and what is just radio folklore.**

Now let's make some QSOs.

---

*Written by ON3VZ — Belgian Class C amateur radio operator, working toward HAREC Class A.*
