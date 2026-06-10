---
layout: post
title: "HF Band Scout — When Can I Reach Where, and How Should I Set Up My Radio?"
tags: ['HF', 'Propagation', 'Tools', 'Projects']
---

<div style="background:linear-gradient(135deg,rgba(0,255,136,0.07) 0%,rgba(0,212,255,0.05) 100%);border:1px solid rgba(0,255,136,0.2);border-radius:12px;padding:1.8rem 2rem;margin:0 0 2.5rem;text-align:center;">
  <div style="font-family:var(--f-mono);font-size:0.65rem;letter-spacing:0.18rem;color:var(--c-text-3);text-transform:uppercase;margin-bottom:0.6rem;">Interactive · Free · PWA · No account needed</div>
  <div style="font-family:var(--f-display);font-size:2.2rem;font-weight:900;color:var(--c-primary);text-shadow:0 0 30px rgba(0,255,136,0.4);letter-spacing:0.1rem;margin-bottom:0.4rem;">HF Band Scout</div>
  <div style="color:var(--c-text-2);font-size:0.95rem;margin-bottom:1.4rem;">An interactive world map that shows where you can currently make contact — and on which band — based on your station, licence, and live space weather.</div>
  <a href="https://on3vz.github.io/BandScout" target="_blank" rel="noopener"
     style="display:inline-block;background:var(--c-primary);color:#080d18;font-family:var(--f-display);font-size:0.85rem;font-weight:700;letter-spacing:0.12rem;padding:0.8rem 2.2rem;border-radius:6px;text-decoration:none;box-shadow:0 0 24px rgba(0,255,136,0.4);">
    OPEN BAND SCOUT →
  </a>
</div>

Every HF operator hits the same wall early on.

You switch on the rig, tune across the band, hear a handful of stations, and then wonder: can they actually hear me? Am I on the right band for where I want to go? And when the contact finally happens, was my radio set up correctly for those conditions?

Experienced operators solve this almost by instinct. They know that 20m is the workhorse for daytime DX toward North America, that 40m opens up toward Eastern Europe after sunset, that a geomagnetic storm means polar paths are probably useless. They have spent years building that feel — thousands of contacts, countless hours of listening.

As a beginner, that instinct is simply not there yet. And as a Belgian Class C licensee limited to 25 watts, there is even less margin for guesswork.

That is the problem **HF Band Scout** is built to solve.

---

## 1. What Is HF Band Scout?

HF Band Scout is a **Progressive Web App**: a website that runs entirely in your browser, requires no installation, and can be added to your phone or tablet home screen like a native app. No server, no account, no cloud storage. Everything runs locally on your device.

The app displays a world map where every country and DXCC entity is coloured according to your estimated probability of making contact right now, on the selected band, from your QTH, with your power and mode.

**Green** = good. **Orange** = marginal. **Red** = poor. **Grey** = the band is closed for that path.

Switch bands with the tabs at the top. Use the time slider to see how conditions will evolve over the next 24 hours. Click on any country to open a detail panel with a per-band score, the reasoning behind it, and, for the IC-7300, concrete recommendations for every radio setting.

---

## 2. The Ionosphere in Plain Language

To understand what the app does, a brief step back into the physics — no maths, promised.

The Earth is surrounded by a layer of charged particles high in the atmosphere: the **ionosphere**, sitting between 60 and 400 km altitude. This layer reflects radio waves back toward the Earth's surface, allowing HF signals to travel far beyond line of sight.

The ionosphere is not a fixed mirror. It changes constantly, driven by the sun.

### Solar Flux Index (SFI)

Ultraviolet radiation from the sun ionises the upper atmosphere. More solar activity means more ionisation, which means the higher bands, 15m and 10m especially, work better. The Solar Flux Index, measured daily at 10.7 cm wavelength, is the standard proxy for solar activity. As of June 2026, the SFI sits around 142 — a good value, well above solar minimum.

### Maximum Usable Frequency (MUF)

The MUF is the highest frequency that will be reflected back to Earth for a given propagation path at a given moment. Go above it and your signal punches straight through the ionosphere into space. The MUF depends on the SFI, the time of day, and the length of the path.

### D-layer absorption

A lower ionospheric layer, the D-layer at 60–90 km, absorbs lower frequencies during daylight hours. This is why 80m and 40m are quiet over long distances in the daytime and open up for DX after dark, once the D-layer fades.

### Kp-index

The Kp-index measures geomagnetic activity on a scale from 0 to 9. At Kp 0–2 conditions are quiet. At Kp 4 and above, geomagnetic disturbance begins to degrade HF propagation, particularly on polar paths. At Kp 7 or more, many paths can be completely closed.

### Greyline

At the moment of sunrise or sunset, the D-layer is absent on one side of the path while the reflective F-layer is still fully charged. This produces a brief window of exceptional propagation, the greyline. On 80m and 40m, greyline DX contacts are legendary.

---

## 3. Band Characteristics at a Glance

As a Class C operator you have access to six HF bands plus 2m and 70cm. Here is what each HF band typically offers:

| Band | Frequency | Character | Best conditions |
|------|-----------|-----------|-----------------|
| 80m | 3.5–3.8 MHz | Regional night, night-time DX | After dark, greyline |
| 40m | 7.0–7.2 MHz | European evening, DX after dark | Evening and night |
| 30m | 10.100–10.150 MHz | CW/digital, quiet band | Daytime usable |
| 20m | 14.0–14.35 MHz | Global workhorse, DX day and night | Daytime, any SFI |
| 15m | 21.0–21.45 MHz | Long DX at high solar activity | Daytime, high SFI |
| 10m | 28.0–29.7 MHz | Sporadic-E, solar maximum DX | Variable |

The app automatically filters on your licence class: bands you cannot use are greyed out.

> **30m note:** under IARU Region 1 rules, 10.100–10.150 MHz is allocated for CW and digital modes only. No SSB. The app reflects this in its mode recommendations.

---

## 4. Sporadic-E

Sporadic-E is one of the more surprising propagation modes, and June is prime season for it.

Patches of intense ionisation form unpredictably in the E-layer at around 100 km altitude. These patches can reflect signals at frequencies that would normally pass straight through, sometimes well beyond 50 MHz. On 10m this produces contacts at 600 to 2600 km that sound like the other station is around the corner. A Greek or Spanish station at full quieting when the band was apparently closed ten minutes ago.

Sporadic-E cannot be predicted with precision, but statistically it peaks between May and July in the northern hemisphere, with a secondary maximum in November–December. It is most common in the late morning and early evening.

Band Scout includes an Es bonus for 10m and 20m when the path distance, season, and time of day are compatible. The bonus is calibrated against measured WSPR data.

---

## 5. WSPR: Measuring Reality

**WSPR** (Weak Signal Propagation Reporter) is a digital mode where transmitters automatically send small beacon signals, typically at 200 milliwatts to a few watts, received and reported globally at [wspr.live](https://wspr.live). The result is a continuously updated database of *measured* propagation links.

Band Scout uses this in two ways.

The **WSPR overlay** loads real spots from the past two hours around your grid. Green lines show where your neighbours are being heard. Purple lines show where signals are reaching you. These are not model predictions, they are actual contacts happening right now on the active band.

The **empirical MUF badge** at the bottom of the map shows "WSPR-MUF ≥ X MHz", the highest band with at least three real spots over paths of 1500 km or more around your grid in the last two hours. This is a measured lower bound on the current MUF, something no model can give you. It lets you check the theoretical predictions against real-world evidence.

---

## 6. How Scores Are Calculated

For each country on the map, Band Scout produces a score from 0 to 99% representing the estimated reliability of a contact. The calculation works in eleven steps:

**Path geometry.** Distance from your QTH to the target country centroid along the great circle route, plus intermediate waypoints for paths over 2000 km.

**Sun elevation along the path.** The app calculates solar elevation at waypoints along the path. The weakest point determines propagation, not the endpoints.

**MUF gate.** Using the live SFI from NOAA and the lowest solar elevation along the path, the app estimates the MUF. If the band frequency is above the MUF, the band is closed. The transition is gradual, not a hard cutoff.

**Baseline reliability from SFI.** Higher solar activity raises the baseline. At SFI 70 (near solar minimum) the baseline is around 47%. At SFI 150 it approaches 100%.

**Kp degradation per band.** Each band has its own sensitivity to geomagnetic disturbance. Low bands are more vulnerable. At Kp 4 scores drop noticeably; at Kp 7 most paths are severely degraded.

**D-layer absorption.** Higher sun elevation on the path means more 80m and 40m absorption during daylight.

**F2 gradient and multi-hop.** Paths beyond 3500 km require multiple ionospheric reflections. Each hop costs signal. The app handles this continuously, without hard steps.

**Greyline bonus.** If both your station and the target are simultaneously in the greyline window, the lower bands receive a bonus.

**Sporadic-E.** If band, distance, season, and time align for Es, an additional probability is added on top of the F2 calculation.

**Power correction.** The baseline is computed for a 100 W reference transmitter. Your actual power and mode are then applied. At 25 W SSB the correction factor is 0.80, roughly a 20% score reduction versus 100 W. At 25 W FT8 the reduction is only about 14%, because FT8 operates at a much lower SNR threshold.

The "100W REF" column in the detail panel shows what 100 W would give you, a useful indicator of whether more power would actually help on this path.

---

## 7. Map Colours

| Colour | Score | Meaning |
|--------|-------|---------|
| Bright green | 76–99% | Excellent, contact very likely |
| Green | 51–75% | Good, normal working conditions |
| Orange | 31–50% | Marginal, patience or a better antenna helps |
| Red | 16–30% | Poor, low probability with 25 W SSB |
| Dark red | 1–15% | Nearly closed, try FT8 or wait |
| Grey | 0% | Closed, band does not support this path |

For large countries, the app calculates scores at the nearest, middle, and farthest points and colours the country at the most conservative of the three. The detail panel shows the spread.

---

## 8. The Detail Panel

Clicking on any country opens a panel on the right with:

**Distance and azimuth** from your QTH. For directional antennas this tells you exactly where to point. The "Long" button switches to the long path, sometimes better under specific conditions.

**Score by band.** A table showing, for each band you are licensed for, the current score at your power and mode, the 100 W reference, and the number of hops. One glance tells you the best band for that destination right now.

**Reasoning.** A plain-language explanation: "MUF 21 MHz ✓ · SFI 142 · D-layer active (TX day) → 55%".

**Radio settings for the IC-7300.** Based on the active band, current conditions, and your mode, the app gives concrete recommendations for:

- **PREAMP:** off, P1 (+10 dB), or P2 (high gain for bands of 21 MHz and above)
- **ATT:** 20 dB when the noise floor is high or strong adjacent signals are present, as often happens on 40m in the evenings next to broadcast stations
- **RF gain:** separate from AF volume, reduce to limit overloading in crowded conditions
- **Noise Blanker (NB):** effective only against pulse-type noise from ignition, electric fences, or solar panels. Not useful against atmospheric noise or QRM from other stations
- **Noise Reduction (NR):** improves SSB readability in noise. Never use on FT8 or digital modes, it distorts the signal shape and breaks decodes
- **IF filter:** narrow (250 Hz for CW, 1.8 kHz for SSB) when QRM is present; wider (2.4–3.0 kHz) on a quiet band
- **AGC speed:** slow for stable audio on weak signals; fast to follow QSB fading, useful during Sporadic-E or aurora
- **IP+:** improves receiver linearity near strong adjacent signals. Worth enabling during contests or on a busy 40m evening

---

## 9. Data Sources

Band Scout pulls live data from three public APIs.

**NOAA Space Weather Prediction Center** (services.swpc.noaa.gov):

- Solar Flux Index, updated daily
- Kp-index, real-time geomagnetic activity
- 3-day Kp forecast for the timeline and upcoming-opening predictions
- Active space weather alerts

**wspr.live:** the global WSPR database, queried for real-time spot overlays and the empirical MUF badge.

**SunCalc.js:** a local library, no external request, for solar elevation at path waypoints, greyline timing, and the Sporadic-E day factor.

The status of all three sources is visible in the settings panel.

---

## 10. The Timeline

The slider at the bottom of the map lets you step forward in 30-minute increments, up to 24 hours ahead. The map reloads from a pre-computed cache, so the update is instant.

The play button (▶) runs the map through a full 24-hour cycle automatically. In about a minute you can watch 20m open toward the west in the morning, 40m start loading toward evening, and the greyline sweep across the map. The "Now" button snaps back to the current time and refreshes the NOAA data.

---

## 11. The Openings Tab

This tab lists band/region combinations that will cross your configured threshold score within the next 1, 2, or 3 hours. The answer to "when does 15m open to Japan?" or "when can I work North America on 20m?" sorted by time to opening.

---

## 12. Limitations

The app is explicit about what it cannot know. The disclaimer at the bottom of the map, "Theoretical model, verify against practice", is there for a reason.

The MUF model is a simplified empirical approximation. Professional tools like VOACAP use more complex models fed by data from hundreds of ionosondes worldwide. Band Scout trades precision for speed: everything runs in the browser, no server required.

There is no terrain model. Mountains and valleys affect signals in ways the app ignores.

Sporadic-E predictions are probability estimates, not forecasts. The app can say "conditions favour Es on this path today" but not "there is an Es opening right now". Real Es openings are sudden and unpredictable.

Large countries use centroid-based scoring with a spread view in the detail panel, but conditions inside a country as wide as Russia vary enormously.

Radio settings are starting points. The recommendations for the IC-7300 are based on band and condition characteristics, but your antenna, your local noise environment, and your ears are what ultimately matter. Adjust for what you hear.

---

## 13. Setting Up the App

On first launch the app asks for a few basic details, saved locally after that.

**Grid square:** your location in Maidenhead format, for example JO21EE for Hoboken. This is the centre of all calculations. Look it up via qrz.com or any online Maidenhead converter.

**Licence class:** C (Belgian/CEPT novice, 25 W), B (intermediate, 100 W), or A (full, up to 1500 W). This filters available bands and caps the power for score calculations.

**Default mode:** SSB, CW, FT8, FT4, or other. This affects both propagation scores and radio recommendations.

**Radio model:** select your transceiver. Full IC-7300 support is included, with band- and condition-specific settings for every control.

**Local noise level:** low (rural or quiet QTH) or high (urban or high-QRM location). This switches the radio recommendations to the appropriate profile.

---

## In Closing

HF Band Scout does not guarantee contacts. No propagation model can. The ionosphere is a living system, driven by the sun, shaped by the Earth's magnetic field, and ultimately learned by spending time on the air.

But as a beginner, it provides something I lacked: a first, reasoned estimate. Not "just try it and see", but "these are the current conditions, this is the probability of contact, and here is how to set your radio for this band right now". The WSPR overlay lets you check the model against reality, and more often than expected it holds up.

The map colours the world in probabilities. The operating is still yours to do.

**73 de ON3VZ**

---

*HF Band Scout is open source. Feedback, suggestions, and contributions are welcome via [github.com/ON3VZ/BandScout](https://github.com/ON3VZ/BandScout).*

*The app is free at [on3vz.github.io/BandScout](https://on3vz.github.io/BandScout) and can be installed as a PWA on Android and iOS.*
