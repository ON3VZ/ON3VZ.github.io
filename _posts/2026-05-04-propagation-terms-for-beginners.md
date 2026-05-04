---
layout: post
title: "Decoding Propagation News — A Beginner's Guide to Radio Weather"
tags: [Propagation, HF, Beginners]
---

As a newly licensed Class C radio amateur, the theory exam covers a lot of ground — regulations, antennas, electronics, operating procedures. But one thing that quickly becomes clear once you start exploring the hobby is that there is a whole extra language out there. I'm talking about the weekly **propagation news**.

I came across the [VERON Propagation News — Week 19, 2026](https://veron.nl/nieuws/propagatienieuws-week-19-2026/) and was immediately overwhelmed. Solar flux above 140. MUF reaching 26 MHz. Kp 1–3. CME arrival windows. Sporadic-E season approaching. Greyline DX. Perigee. Bz component turning southward.

Every sentence contained at least one thing I didn't understand. The numbers were there, but the scale of those numbers meant nothing to me yet. **What is a "good" SFI value? What does Kp 5 mean in practice? Why does a southward Bz matter?**

So I did what any new ham should do: I went looking for the terminology. This post is the result. Everything below is based directly on the concepts that appeared in that Week 19 article, explained as plainly as I can manage for a fellow beginner.

---

## 1. What Is Propagation?

Propagation (from Latin *propagare*, to spread) simply describes how radio waves travel from one antenna to another. Depending on the frequency, the state of the atmosphere, and solar activity, radio waves can sometimes travel thousands of kilometres — or not at all. Radio amateurs follow "radio weather" just as carefully as regular weather, because conditions change constantly.

The main highway for long-distance HF (shortwave) communication is the **ionosphere** — a layer of the atmosphere ionised by solar radiation, sitting roughly 60 to 1000 km above the Earth's surface. Radio waves on HF frequencies bounce between the ionosphere and the ground, hopping across continents. The state of the ionosphere is driven almost entirely by what the Sun is doing.

---

## 2. The Sun & Space Weather

The Sun is the engine behind almost everything in HF propagation. Understanding a few key solar parameters makes the weekly propagation news immediately readable.

| Term / Abbreviation | What does it mean? | Example from Week 19 |
|---|---|---|
| **SFI** — Solar Flux Index | A daily measurement of how much radio energy the Sun emits at a wavelength of 10.7 cm. Higher = more active Sun = better HF conditions. Below 80 is low; above 150 is excellent. | *"SFI was above 140 and on 25 April even crossed the 150 mark."* |
| **Solar Cycle** (~11 years) | The Sun follows a regular ~11-year cycle from minimum (few sunspots, poor HF) to maximum (many sunspots, excellent HF) and back. We are currently in Solar Cycle 25, approaching its peak. | *"...a taste of the coming years in the declining Solar Cycle 25."* |
| **Sunspot** | A dark, magnetically intense region on the Sun's surface. More sunspots = higher solar flux = better conditions on HF. Active regions get numbers, e.g. AR4366. | *"There are currently three sunspot regions visible on the solar disc."* |
| **Solar Flare** | A sudden, powerful energy burst from the Sun. Classified by strength: A, B, C (weak), M (moderate) and X (very strong). An X-flare can disrupt the ionosphere within minutes. M1 = moderate, scale 1–9. | *"The risk of solar flares is between 10% for X-flares and 50% for M-flares."* |
| **CME** — Coronal Mass Ejection | A large cloud of charged particles hurled into space by the Sun. If a CME hits Earth (travel time 1–3 days), it can disturb the ionosphere and trigger geomagnetic storms. | *"A CME from 13 February could reach Earth on Sunday or Monday."* |
| **Coronal Hole** | An open area in the Sun's outer atmosphere where fast solar wind escapes. When pointed at Earth, it often brings increased geomagnetic activity. | *"HF propagation was limited by solar wind from a large coronal hole."* |
| **Solar Wind** | A constant stream of charged particles (protons and electrons) ejected by the Sun. Speed varies from ~400 to over 700 km/s. Fast solar wind from a coronal hole brings more disturbance. | *"...intense solar wind up to 700 km/s."* |

### Flare Classification at a Glance

| Class | Strength | Effect on HF |
|---|---|---|
| A | Very weak | Negligible |
| B | Weak | Negligible |
| C | Minor | Slight short-wave fadeout possible |
| M | Moderate (M1–M9) | Noticeable HF blackout on sunlit side |
| X | Intense (X1+) | Severe HF blackout; ionospheric disruption |

---

## 3. Geomagnetic Activity

Geomagnetic activity measures how much the Earth's magnetosphere is disturbed by solar wind and CMEs. This is crucial for HF radio communication.

| Term / Abbreviation | What does it mean? | Example from Week 19 |
|---|---|---|
| **Kp-index** (also: K-value) | The planetary K-index: a scale from 0 to 9 measuring global geomagnetic activity. Low values (0–2) = quiet, good for HF. High values (5+) = geomagnetic storm, poor HF but possible aurora. | *"Geomagnetic activity was predominantly quiet to unsettled (Kp 1–3)."* |
| **G-scale** | NOAA's geomagnetic storm scale, G1 (minor) to G5 (extreme). G1 = Kp5. G2 = Kp6. At G2 or higher, noticeable HF disruption and aurora at lower latitudes. | *"...geomagnetic conditions that reached G2 strength on Monday."* |
| **Geomagnetic / Earth's magnetic field** | The magnetic field surrounding Earth that protects us from solar wind. When solar wind compresses or disturbs it, the ionosphere — and thus radio propagation — is affected. | *"The Earth's magnetic field was mostly quiet this past week."* |
| **Bz component** | The north–south component of the solar wind's magnetic field. A southward Bz (negative) is bad: it connects to Earth's field and drives storms. A northward Bz (positive) is neutral or favourable. | *"The north–south Bz component was largely positive over the past two days."* |

### Kp-index Quick Reference

| Kp | Status | HF Impact | Aurora? |
|---|---|---|---|
| 0–1 | Quiet | Excellent | No |
| 2–3 | Unsettled | Good | No |
| 4 | Active | Moderate | Possibly at very high latitudes |
| 5 | G1 Storm | Degraded | High latitudes (Scandinavia, Canada) |
| 6 | G2 Storm | Significant | Northern Europe possible |
| 7–9 | G3–G5 | Severe–Extreme | Much of Europe / North America |

---

## 4. The Ionosphere & the MUF

The ionosphere is the layer of the atmosphere (roughly 60–1000 km altitude) ionised by solar radiation. HF radio waves are refracted (bent back) by the ionosphere, enabling long-distance communication. Without the ionosphere, HF signals would travel in a straight line and disappear into space.

| Term / Abbreviation | What does it mean? | Example from Week 19 |
|---|---|---|
| **MUF** — Maximum Usable Frequency | The highest frequency that can be reflected by the ionosphere between two points at a given moment. Above the MUF, the signal passes through and is lost to space. The MUF depends strongly on solar activity and time of day. | *"The daily maximum MUF reached values between 20 and 26 MHz."* |
| **MHz** — Megahertz | Unit of frequency. 1 MHz = 1,000,000 oscillations per second. Higher MHz = shorter wavelength. Amateur bands are named by their approximate wavelength in metres. | *"The MUF reached values between 20 and 26 MHz."* |
| **Skip distance** | The minimum distance at which a signal can be received via the ionosphere. The propagation news standard is 3000 km, giving a representative picture of DX potential on shortwave. | *"The MUF for a skip distance of 3000 km."* |
| **HF bands** — Shortwave | The frequency range 3–30 MHz. Amateurs use various sub-bands named by their wavelength in metres. | *"HF band conditions were predominantly usable to good."* |

### The HF Amateur Bands

| Band | Frequency | Typical Use | Propagation Note |
|---|---|---|---|
| 160 m | 1.8 MHz | Night-time regional | Benefits from quiet magnetic field |
| 80 m | 3.5 MHz | Regional DX at night | Favoured when Kp is low |
| 40 m | 7 MHz | Day and night | Reliable "workhorse" |
| 30 m | 10 MHz | WSPR, FT8, CW | Good for night DX |
| 20 m | 14 MHz | Long-distance DX by day | Most popular DX band |
| 17 m | 18 MHz | DX, low traffic | Good alternative to 20 m |
| 15 m | 21 MHz | Intercontinental DX | Active with good solar flux |
| 12 m | 24.9 MHz | DX at high SFI | Opened temporarily in Week 19 |
| 10 m | 28 MHz | World DX at solar maximum | Requires MUF > 28 MHz |

> **Week 19 example:** With the SFI above 140 and MUF reaching 20–26 MHz, the 15 m band opened reliably most days, and the 12 m band opened temporarily. The 10 m band (28 MHz) would need the MUF above 28 MHz to open — just barely out of reach that week.

---

## 5. Propagation Modes & Special Phenomena

Beyond simple ionospheric reflection, there are several other ways radio waves travel long distances — all mentioned in the weekly news.

| Term / Abbreviation | What does it mean? | Example from Article |
|---|---|---|
| **DX** | Short for "distance" — a long-distance contact, typically across an ocean or continent. DXers are amateurs who specialise in making such contacts. | *"...which will make the DXers happy."* |
| **Sporadic-E** (Es) | An irregular phenomenon where the E-layer of the ionosphere (~100 km altitude) becomes suddenly and strongly ionised. This enables VHF contacts (e.g. 50 MHz / 6 m) over 500–2000 km, normally impossible. Season: May–August. | *"We are approaching the high season for Sporadic-E, so keep your ears open on 10 and 6 metres."* |
| **Tropo / Troposcatter** | VHF and UHF signals can propagate via the troposphere (the lowest atmospheric layer) during temperature inversions (high pressure, stable weather). Greatly extends range on 2 m, 70 cm, and GHz bands. | *"...moderate to enhanced tropo towards France."* |
| **Rain scatter** | At microwave frequencies (GHz bands), signals are scattered by raindrops. This provides sporadic contacts on higher bands when no tropo is available. | *"...periods of precipitation offering opportunities for rain scatter on the GHz bands."* |
| **Meteor scatter** (MS) | Meteors entering the atmosphere leave brief ionisation trails that reflect VHF signals. During meteor showers (e.g. Perseids, Lyrids), more opportunities arise. Contacts last fractions of a second; software like MSK144 is optimised for this. | *"Meteor scatter can still benefit from the declining Lyrids..."* |
| **EME** — Earth-Moon-Earth (Moonbounce) | Signals are sent to the Moon and the reflected echo is received. Requires large antennas and sensitive receivers. Signal loss is enormous (~250 dB). Moon parameters (declination, perigee) determine window quality. | *"The Moon reaches maximum declination on Tuesday... the perigee is on Sunday."* |
| **Greyline / Grey line** | The twilight zone between day and night. Along this line, the D-layer (which absorbs signals during the day) and the F-layer (which reflects) are briefly active simultaneously — giving excellent DX conditions, especially on 30 m and 40 m. | *"...the chance of successful Greyline DX is high at this moment."* |
| **Aurora** | At Kp ≥ 5, the Northern Lights appear. Amateurs can also make VHF contacts via aurora reflection, but signals sound characteristically "fluttery" (rough, distorted). Antennas are pointed north. | *"Aurora chances at Kp above 5, preferably above 7."* |
| **NVIS** — Near Vertical Incidence Skywave | The signal is sent almost straight up and reflected back down, enabling short-range contacts (0–500 km) that would otherwise fall in the "dead zone." Used on 40 m and 80 m. | *"PhD Thesis defence on NVIS"* (related news item) |

---

## 6. VHF, UHF, and Higher Bands

The propagation news does not only cover shortwave. Higher frequency bands behave quite differently.

| Abbreviation | Frequency | Common Name | Typical Propagation |
|---|---|---|---|
| HF | 3–30 MHz | Shortwave | Ionospheric reflection |
| VHF | 30–300 MHz | Very High Frequency | Tropo, Sporadic-E, Aurora, Meteor scatter |
| UHF | 300–3000 MHz | Ultra High Frequency | Tropo, rain scatter |
| SHF / GHz | 3–30 GHz | Super High Frequency | Rain scatter, satellite |

### Specific VHF Parameters

| Term / Abbreviation | What does it mean? | Example from Article |
|---|---|---|
| **6 metres** (50 MHz) | The "magic band" — normally limited to local range, but during Sporadic-E it opens for intercontinental contacts. Very popular in summer. | *"...openings on 50 MHz to TZ1CE in Mali."* |
| **2 metres** (144 MHz) | The most widely used VHF band. Normal range ~150–200 km; with tropo or Sporadic-E much further. Also used for EME and aurora. | *"Get ready to point your VHF antennas northward."* |
| **Moon declination** | The angle of the Moon relative to the equator. When declination is high, the Moon is higher in the sky over Western Europe — favourable for EME. | *"The Moon's declination reaches a maximum on Tuesday 21 April."* |
| **Perigee** | The point in the Moon's orbit where it is closest to Earth (opposite: apogee = farthest point). At perigee, EME signal loss is smallest, making contacts easier. | *"The Moon's perigee is Sunday 19 April, so signal loss will be minimal."* |

---

## 7. Digital Modes

Modern amateurs increasingly use software to encode and decode signals. This makes contacts possible with signals too weak to hear by ear.

| Term / Abbreviation | What does it mean? | Example from Article |
|---|---|---|
| **FT8** | Extremely popular digital mode for weak-signal propagation. A complete exchange takes only 15 seconds. FT8 is ~15 dB more sensitive than CW and can complete contacts that are audibly impossible. | *"...FT8 contacts were open to Brazil, Kenya, and Chile."* |
| **MSK144** | Digital mode designed specifically for meteor scatter. Works with messages as short as 0.072 seconds to capture brief meteor ionisation trails. | Used implicitly in meteor scatter section |
| **WSPR** — Weak Signal Propagation Reporter | Stations automatically transmit a small beacon signal that is received and reported globally via the internet. Used to monitor propagation conditions passively. | Used for 30 m band monitoring |
| **CW / Morse** | Classic Morse code, switching the transmitter on and off. Very effective in poor conditions because the human ear is good at picking out tones from noise. Still widely used on 30 m and 40 m. | *"30 and 40 metres at night, CW."* |

---

## 8. Organisations Mentioned in the Article

| Term / Abbreviation | What does it mean? | Role |
|---|---|---|
| **VERON** | Vereniging voor Experimenteel Radio Onderzoek in Nederland — the Dutch national amateur radio society. Publishes weekly propagation news every Sunday. | Source of the Week 19 article |
| **NOAA** | National Oceanic and Atmospheric Administration — US government agency publishing space weather forecasts, Kp predictions, CME alerts, and the G-scale. | *"NOAA's forecast covers only 3 days."* |
| **RSGB** | Radio Society of Great Britain — British amateur radio society. Also publishes weekly propagation news, used as a source by VERON. | *"...the weekly RSGB Propagation News."* |
| **DARC** | Deutscher Amateur-Radio-Club — German amateur radio society. Its HF-Referat provides propagation data. | *"...HF-Referat DARC."* |
| **DX Info Centre** | Website with real-time tropospheric maps and DX info for Western Europe and surroundings (dxinfocentre.com). | *"The maps on dxinfocentre.com..."* |

---

## 9. Quick Reference — What Is "Good Radio Weather"?

Now that all the terms make sense, here is a summary of what amateurs consider good or bad conditions:

| Parameter | Good for HF | Bad for HF |
|---|---|---|
| Solar Flux (SFI) | **High (>120, ideally >150)** | Low (<80) |
| Kp-index | **Low (0–3)** | High (5+) |
| MUF (3000 km) | **High (>28 MHz = 10 m open)** | Low (<14 MHz = only lower bands) |
| Geomagnetic storm | **None (G0)** | Storm (G2+) |
| Bz component | **Positive (northward)** | Negative (southward) |
| Solar flares | **None or weak (A, B, C)** | Strong (M9, X) |

> **Week 19, 2026 verdict:** SFI above 140 ✅ / Kp 1–3 ✅ / MUF 20–26 MHz ⚠️ (not quite reaching 10 m) / G0–G1 ✅ — overall a good week, described by VERON as *"about the best you can expect at this stage of the solar cycle."*

---

## 10. Sources & Useful Links

### 📰 Weekly Propagation News

| Source | URL | Description |
|---|---|---|
| VERON Propagation News | [veron.nl/nieuws](https://veron.nl/nieuws/) | Weekly Dutch propagation news (also covers VHF/UHF). The Week 19 article that inspired this post: [Week 19, 2026](https://veron.nl/nieuws/propagatienieuws-week-19-2026/) |
| RSGB Propagation News | [rsgb.org/propagation](https://rsgb.org/main/operating/propagation/) | Weekly English propagation bulletin by the RSGB |
| HF-Referat DARC | [darc.de/der-club/referate/hf](https://www.darc.de/der-club/referate/hf/) | German propagation news and HF information |

### 🌞 Real-Time Space Weather

| Source | URL | Description |
|---|---|---|
| NOAA Space Weather Dashboard | [spaceweather.noaa.gov](https://www.spaceweather.gov) | Official Kp index, G-scale alerts, CME forecasts |
| Spaceweather.com | [spaceweather.com](https://spaceweather.com) | Daily solar news with aurora alerts and SFI |
| SolarHam | [solarham.net](https://www.solarham.net) | Real-time solar data, flare alerts, CME tracking |
| SpaceWeather Live | [spaceweatherlive.com](https://www.spaceweatherlive.com) | Live Kp, aurora alerts, solar wind data |

### 📡 Propagation Monitoring & Maps

| Source | URL | Description |
|---|---|---|
| DX Info Centre (Tropo) | [dxinfocentre.com/tropo_nwe.html](https://www.dxinfocentre.com/tropo_nwe.html) | Real-time tropospheric propagation maps for NW Europe |
| Poollicht.be | [poollicht.be](https://www.poollicht.be) | Belgian aurora and space weather site |
| DX Maps | [dxmaps.com](https://www.dxmaps.com) | Real-time DX spots mapped by band and propagation type |
| Make More Miles on VHF | [mmmonvhf.de](https://www.mmmonvhf.de) | VHF/UHF propagation monitoring and records |
| PSK Reporter | [pskreporter.info](https://pskreporter.info) | Live propagation map based on FT8/WSPR reception reports |

### 📚 Learning Resources

| Source | URL | Description |
|---|---|---|
| ARRL Propagation | [arrl.org/propagation](https://www.arrl.org/propagation) | In-depth propagation guides by the American Radio Relay League |
| VERON (membership) | [veron.nl](https://veron.nl) | Dutch amateur radio society — weekly news, events, licence info |

---

*73 de ON3VZ — still learning, one abbreviation at a time.*
