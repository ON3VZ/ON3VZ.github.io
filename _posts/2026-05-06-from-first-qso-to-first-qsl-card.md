---
layout: post
title: "From First QSO to First QSL Card: The Complete Logging and QSL Guide for the Belgian Radio Amateur"
tags: [Logging, QSL, FT8, POTA, Awards, Beginners, HF, Software]
---

*By ON3VZ / Kristof — Hoboken (Antwerp) — Grid: JO21EE*
*Member of UBA and radio amateur club WLD (ON6WL)*

---

> *I wrote this article for myself, but I'm sharing it with everyone who has had the same experience: a brand-new radio licence in hand, a pile of hardware on order, and the feeling that you don't know where to begin. I'm Kristof, callsign ON3VZ, Class C radio amateur from Hoboken near Antwerp. This is everything I wish I had known before my first QSO.*

---

## Table of Contents

1. [Who this article is for](#intro)
2. [The basics: QSO, logbook, UTC and ADIF](#basics)
3. [The ecosystem: four tools, four roles](#ecosystem)
4. [Log4OM 2: your digital shack assistant](#log4om)
5. [Online confirmation systems: LoTW, Clublog, eQSL and QRZ.com](#online)
6. [POTA and field activations: outdoor radio with HAMRS](#pota)
7. [FT8 and the digital revolution: WSJT-X](#ft8)
8. [Contests and field days: N1MM+ and ON6WL](#contests)
9. [The QSL card: your calling card in the ether](#qslcard)
10. [Sending and receiving QSL cards: bureau, direct and digital](#qslsending)
11. [Awards: the long-term engine of the hobby](#awards)
12. [The complete startup checklist](#checklist)
13. [Cost overview](#costs)
14. [Glossary and references](#glossary)

---

## 1. Who This Article Is For {#intro}

When you have just passed your radio amateur exam and received your callsign, you are faced with a wall of choices. Which software do I install? What is LoTW and why does everyone ask about it? How does the QSL bureau work? What is FT8?

This article answers all those questions — completely, in the right order, with an emphasis on the Belgian context. Not a superficial overview — a reference guide that takes you from zero to fully operational.

**For whom:**
- New Belgian radio amateurs (Class A, B or C)
- Operators who want to streamline their workflow
- Club members planning their first field day or POTA activation

**My setup as reference:**
- **HF home station**: Icom IC-7300 MkII
- **VHF/UHF home station**: Icom IC-2730E + WiMo WY-209 9-element Yagi on Spiderbeam 12.5 m mast with Yaesu G-450CDC rotor + Diamond X-50N omnidirectional
- **Mobile**: Yaesu FTM-510DE in Mazda CX-60
- **HF antennas**: RF.Guru EFOC29 + MIDI doublet
- **Logging software**: Log4OM 2 (home), HAMRS (field), N1MM+ (contests), WSJT-X (FT8)
- **Club**: WLD / ON6WL, Hoboken

---

## 2. The Basics: QSO, Logbook, UTC and ADIF {#basics}

### What Is a QSO?

A **QSO** is radio amateur terminology for a two-way radio conversation. The word comes from the Q-code — a system of three-letter abbreviations developed for telegraphy in the early 20th century. Today, radio amateurs use the term as a synonym for "making a radio contact", regardless of the mode.

Three Q-codes that beginners constantly mix up:

| Term | What it means | In practice |
|---|---|---|
| **QSO** | The contact itself | "I made 15 QSOs yesterday on 40m" |
| **QSL** | Confirmation of that contact | A card or digital confirmation |
| **QRZ** | "Who is calling me?" | Also the name of the most well-known ham radio website |

> ⚠️ **Heads up:** QRZ.com is a website, not a radio term to confirm a QSO. If you say "QRZ?" on the radio, you are asking who is calling you — nothing more.

### Typical Flow of an SSB QSO

**SSB** (*Single Side Band*) is the most commonly used voice mode on HF (shortwave, 3–30 MHz):

1. **Station A calls CQ** — *"CQ CQ CQ, this is ON3VZ, Oscar November Three Victor Zulu, calling CQ and standing by."*
   — **CQ** = "I am calling anyone", a general call.
2. **Station B replies** — *"ON3VZ, this is PA3XYZ, Papa Alpha Three X-ray Yankee Zulu."*
3. **Exchange** — Minimum: **RST report** (Readability, Strength, Tone — e.g. 59 = perfectly readable and strong), name, location.
4. **Closing** — *"73, this is ON3VZ, clear."* — 73 is the radio greeting for "best regards".

> 💡 **Pro tip:** The NATO phonetic alphabet is not optional — it is a requirement. "Oscar November Three Victor Zulu" must come automatically before you go on the air. Practise it out loud until it flows without thinking.

### What Is a Logbook and Why Does It Exist?

A **logbook** is an ordered record of all your QSOs. For each contact you note who, when, on which frequency, in which mode, and what the signal report was.

The logbook serves five purposes:
- **Proof** — your log is the reference in case of disputes
- **Awards** — every diploma is based on confirmed QSOs
- **Statistics** — how many countries? which bands perform best?
- **QSL management** — which confirmations have been sent, received, matched?
- **Antenna analysis** — is my new antenna performing better than the previous one?

### Is Logging Legally Mandatory in Belgium?

**No.** The BIPT (*Belgian Institute for Postal Services and Telecommunications*) imposes no logbook obligation, not even for Class C.

The UBA (*Union of Belgian Radio Amateurs*) considers logging "good amateur practice". In practice, you **must** log if you:
- Participate in a contest (log submission required, no log = disqualification)
- Do a POTA activation (ADIF upload on pota.app required, minimum 10 QSOs)
- Want to apply for DXCC or other awards
- Want to resolve a dispute about a QSO

> 🇧🇪 **Belgian-specific:** As Class C in Belgium you have access to all amateur bands and modes. There are no special logging requirements specific to Class C versus Class A or B.

### Minimum Fields You Always Log

| Field | Example | Why |
|---|---|---|
| **Date** | 2026-05-12 | ISO format: year-month-day |
| **Time UTC** | 14:32 | Always UTC — never local time |
| **Band or frequency** | 40m / 7.150 MHz | Band is minimum, frequency is better |
| **Mode** | SSB / CW / FT8 | How you communicated |
| **Counterpart callsign** | PA3XYZ | Exact, without typos |
| **RST sent** | 59 | Report you gave |
| **RST received** | 57 | Report you received |

### Why ALWAYS UTC?

**UTC** (*Coordinated Universal Time*) is the global time standard. Belgium is 1 hour ahead in winter (CET) and 2 hours ahead in summer (CEST).

| Period | Belgian time | UTC |
|---|---|---|
| Winter (CET) | 13:00 | 12:00 |
| Summer (CEST) | 14:00 | 12:00 |

> ⚠️ **Critical mistake:** You make a QSO at 14:00 Belgian summer time and log 14:00 — but it must be 12:00 UTC. If the counterpart logs 12:00 UTC and you log 14:00 local, your log will **never** match in LoTW. Confirmation lost.

The entire radio amateur world uses UTC. Set your PC clock to automatic time synchronisation. A clock that is 2 minutes slow already causes problems with FT8.

### What Is ADIF?

**ADIF** (*Amateur Data Interchange Format*) is the universal file format for radio amateur logbooks. All logging software in the world can read and write ADIF. It is the common language.

An ADIF record for one QSO:

```
<CALL:6>PA3XYZ
<QSO_DATE:8>20260512
<TIME_ON:4>1432
<BAND:3>40m
<MODE:3>SSB
<RST_SENT:2>59
<RST_RCVD:2>57
<NAME:4>Pete
<QTH:9>Rotterdam
<DXCC:3>263
<EOR>
```

`<EOR>` = *End Of Record*. You never write this manually — your logging software does it. But you recognise it when checking an upload by hand.

> 💡 **Pro tip:** Make periodic ADIF backups of your complete log and save to the cloud. An ADIF file is your life's work as a radio amateur — treat it that way.

---

## 3. The Ecosystem: Four Tools, Four Roles {#ecosystem}

You do not need one piece of software — you need four, each for a specific situation.

```
IC-7300 MkII ──USB──▶ OmniRig ──▶ Log4OM 2   (daily logbook, hub)
                               ──▶ WSJT-X     (FT8 and digital modes)
                               ──▶ N1MM+      (contests and field days)

HAMRS (tablet/phone)  ──ADIF──▶ POTA.app   (field activations)
HAMRS                 ──ADIF──▶ Log4OM     (import after activation)
N1MM+                 ──ADIF──▶ Log4OM     (import after contest)
WSJT-X                ──UDP──▶  Log4OM     (automatic, real-time)

Log4OM 2  ──▶ LoTW      (awards, DXCC)
          ──▶ Clublog   (DX statistics, OQRS)
          ──▶ eQSL.cc   (digital QSL cards)
          ──▶ QRZ.com   (profile, logbook)
```

| Software | Use | Context |
|---|---|---|
| **Log4OM 2** | Daily logbook, central hub | Home |
| **HAMRS** | POTA/SOTA field activations | Field (tablet/phone) |
| **N1MM+** | Contests, field days, multi-op | Home + field day |
| **WSJT-X** | FT8, FT4, WSPR, digital modes | Home |

**OmniRig** is the fifth link: a free intermediary that shares the CAT connection to your radio so Log4OM, WSJT-X and N1MM+ never conflict over the COM port.

---

## 4. Log4OM 2: Your Digital Shack Assistant {#log4om}

### What Is Log4OM 2?

**Log4OM 2** is free, Windows-based logging software from the Italian team of Daniele Pistollato (IW3HMH). The most popular logging software in Europe, with excellent integration with LoTW, Clublog, QRZ.com and eQSL. A paid Log4OM Club version for cloud sync also exists — for the average home shack the free version is more than sufficient.

### Installation Procedure — the Correct Order

> ⚠️ **Heads up:** Follow this order strictly. Installing Log4OM before OmniRig requires extra steps afterwards.

**Step 1: IC-7300 MkII USB driver**

Download from [https://www.icomjapan.com/support/](https://www.icomjapan.com/support/) → search IC-7300. Connect the radio after installation and note the COM port number in Windows Device Manager (e.g. COM5). Always use the same USB port on your PC — put a sticker on the correct port.

**Step 2: OmniRig**

Download from [https://www.dxatlas.com/OmniRig/](https://www.dxatlas.com/OmniRig/) and install as administrator. Configure Rig 1:

```
Rig Type:    Icom IC-7300
Port:        COM5  (your port number)
Baud Rate:   115200
Data Bits:   8 / Parity: None / Stop Bits: 1
RTS:         High / DTR: High
Poll Int:    500 ms
```

> ⚠️ **IC-7300 MkII specific:** The MkII operates at 115200 baud — unlike the original IC-7300 (9600 or 19200). Also configure on the radio: MENU → SET → Connectors → CI-V Baud Rate: 115200, CI-V Transceive: ON.

If the radio's frequency is visible in the OmniRig window: ✅ connection OK.

**Step 3: Log4OM 2**

Download from [https://www.log4om.com](https://www.log4om.com). Install and start. Configuration wizard on first launch:

```
Callsign:       ON3VZ
Name:           Kristof
QTH:            Hoboken
DXCC:           Belgium / ON
Grid Locator:   JO21EE
ITU Zone:       14
CQ Zone:        14
```

> 🇧🇪 **Belgian-specific:** Belgium falls in ITU Zone 14 and CQ Zone 14. Verify your grid locator at [https://www.levinecentral.com/ham/grid_square.php](https://www.levinecentral.com/ham/grid_square.php). Always use 6 characters (JO21EE), not 4 (JO21).

### Setting Up the CAT Link

**Settings → CAT/Rig Control → OmniRig Rig 1** → click Test. Turn the tuning knob — the frequency in Log4OM should follow. All frequency and mode changes via the radio are now tracked automatically.

### QRZ.com API Integration

The QRZ.com lookup automatically fills in name, QTH and DXCC for each callsign entered. Requires a paid QRZ.com subscription (approx. $25/year).

Generate the key on QRZ.com → My Logbook → Settings → API Key.

**Settings → Online Services → QRZ.com:**
```
Enable QRZ.com lookup:  ✅ On
Username:               ON3VZ
API Key:                [your XML API key]
```

> ⚠️ **Confusion to avoid:** QRZ.com has two separate API keys — one for XML Lookup (callsign info) and one for the Logbook (QSO upload). Both require a paid subscription but are different keys. Generate and enter them separately.

### Connecting Online Services in Log4OM

All connections: **Settings → Online Services**.

#### LoTW

```
LoTW Username:    ON3VZ
LoTW Password:    [your password]
TQSL Path:        C:\Program Files (x86)\TQSL\tqsl.exe
Auto Upload:      OFF (recommended for beginners)
```

**Auto Upload on or off?** Set this **off** for beginners. A spelling mistake in a callsign will immediately appear in LoTW. For the first few months, work with weekly manual batch uploads.

Manual upload: select QSOs → right-click → Upload to LoTW.
Retrieve confirmations: Menu → Online → Download LoTW QSLs.

#### Clublog

```
Email:            [email address at Clublog]
Password:         [your password]
Callsign:         ON3VZ
Real-time upload: Optionally on (corrections easier than with LoTW)
```

#### eQSL.cc

```
Username:         ON3VZ
Password:         [your password]
Auto Send eQSL:   On
```

#### QRZ.com Logbook

```
API Key:          [your QRZ logbook API key]
Send QSL:         On
```

#### Upload Strategy Summary

| Service | Recommended setting | Reason |
|---|---|---|
| **LoTW** | Manual, weekly | Errors difficult to correct |
| **Clublog** | Real-time or daily | Easy to correct |
| **eQSL** | Automatic | Low-threshold system |
| **QRZ.com** | Automatic or daily | No objection |

### Logging Your First QSO

1. Type callsign in the Entry Window → Tab
2. QRZ.com lookup fills in name, QTH and DXCC automatically
3. Date and UTC time are filled in automatically — verify them
4. Band and mode are taken from the radio via CAT
5. Fill in RST sent and received
6. Press F12 → QSO appears in the log list

### Log4OM Settings You Must Not Forget

**Duplicate check:** Settings → Log Settings → Duplicate Check: On, Same band ✅, Same mode ✅, Time window: 0

**DXCC tracking:** Settings → Awards → DXCC: On

**UDP server for WSJT-X:** Settings → Log4OM Settings → UDP Server: On, Port: 2237

**ADIF backup:** Menu → File → Export → ADIF → save weekly to Google Drive/OneDrive

### Troubleshooting CAT Connection Issues

1. Check USB data cable (not a charging cable)
2. Check COM port number in Device Manager
3. Baud rate: 115200 in OmniRig AND on the radio
4. Is the radio on?
5. Does another program have the COM port in use?
6. Restart OmniRig after every change
7. Restart PC as a last resort

---

## 5. Online Confirmation Systems: LoTW, Clublog, eQSL and QRZ.com {#online}

### Why Multiple Systems?

There is no universal system. Each platform arose from a different need. You need all four.

| Property | LoTW | Clublog | QRZ.com Logbook | eQSL |
|---|---|---|---|---|
| **Operator** | ARRL (USA) | Commercial (UK) | QRZ Media (USA) | Volunteers (USA) |
| **Free?** | Free | Free | Paid subscription | Free (basic) |
| **Primary goal** | Award confirmations | DX statistics & OQRS | Profile + logbook | Quick digital QSL |
| **Counts for DXCC?** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Verification required?** | ✅ Yes (certificate) | ❌ No | ❌ No | ❌ No |

### LoTW — The Gold Standard for Awards

**LoTW** (*Logbook of the World*) is the ARRL's digital confirmation system (2003). The world standard for official QSO confirmations.

**How it works:** You upload QSO X. The counterpart uploads the same QSO. LoTW compares them — if callsign, band, mode, date and time match within ±30 minutes: match = confirmed QSO, valid as DXCC evidence.

Every account is linked to a **cryptographic certificate** verified via the national licensing authority — in Belgium via the UBA. A LoTW QSO cannot be forged.

#### LoTW Registration as a Belgian — Step by Step

> ⚠️ **Critical: Start on Day 1.** Wait time for the certificate is 1–3 weeks. Every day of delay = QSOs that may not match.

**Step 1: Create an account at [https://lotw.arrl.org](https://lotw.arrl.org)**
→ Click "Request a User Certificate" → callsign ON3VZ, name, email, QTH Belgium.

**Step 2: Download and install TQSL**
TQSL (*Trusted QSL*) is the free software for digital signing. Download from [https://www.arrl.org/tqsl-download](https://www.arrl.org/tqsl-download).

**Step 3: Create a certificate request in TQSL**
Open TQSL → Station Locations → Add:
```
Callsign:     ON3VZ
DXCC Entity:  Belgium
Grid:         JO21EE
ITU Zone:     14
CQ Zone:      14
```
→ Save the generated `.tq5` file.

**Step 4: Verification via the UBA**

> 🇧🇪 **Belgian-specific:** The UBA has an official agreement with the ARRL for verification of Belgian callsigns. Send an email to the UBA's LoTW coordinator (see [https://www.uba.be](https://www.uba.be)) with the `.tq5` file and a copy of your BIPT licence. Wait time: 1–3 weeks. Always use the UBA route — faster and local support.

**Step 5: Install the certificate**
You receive a `.tq8` file by email. Double-click it — TQSL imports automatically. Valid for 3 years.

> ⚠️ **Heads up:** Keep a backup of your TQSL certificate on an external drive. TQSL → Station Locations → Export. In the event of a PC crash you otherwise have to repeat the entire verification process.

**Uploading QSOs:** Via Log4OM (recommended): select QSOs → right-click → Upload to LoTW.

**Viewing confirmations:** [https://lotw.arrl.org](https://lotw.arrl.org) → Your QSOs → green "Y" = confirmed. In Log4OM: Menu → Online → Download LoTW QSLs.

### Clublog — DX Statistics and OQRS

**Clublog** ([https://clublog.org](https://clublog.org)) is a British platform that does what LoTW doesn't: DX statistics, graphs and the **OQRS** (*Online QSL Request System*).

OQRS is crucial for DX hunters. After a QSO with a DXpedition:
1. Go to the DXpedition's page on Clublog → click OQRS
2. Enter your callsign — Clublog checks if you are in their log
3. Request a paper or bureau QSL (paid via PayPal)

Many major DXpeditions work exclusively with OQRS. No Clublog = you miss the easiest way to get DX QSL cards.

**Registration:** [https://clublog.org](https://clublog.org) → Register → callsign ON3VZ, email, password.

**Checking a DXpedition log:** After making a DX contact, go to Clublog and search for the DXpedition. Is your callsign present? Then the QSO is logged on their side. Not present? You probably did not make a valid contact.

**"Most Wanted" list:** Statistics → Most Wanted shows the rarest DXCC entities and which ones you haven't worked yet. Your personal DX wish list.

### eQSL.cc — Quick Digital Confirmations

**eQSL.cc** ([https://www.eqsl.cc](https://www.eqsl.cc)) — the oldest digital QSL system (1999). Free, no certificate required.

Register as ON3VZ → request **AG (Authenticated Gold)** status by uploading a scan of your BIPT licence (My Account → Get Authenticated). AG status is required for the awards that accept eQSL.

eQSL does **not** count for DXCC but does count for some UBA awards and ARRL VUCC. Upload your own QSL card image via My Account → My eQSL Card.

### QRZ.com Logbook

You already have your QRZ.com profile. The logbook is a separate, paid system (requires QRZ Logbook subscription). Does not count for official awards but does offer digital QSL exchange.

### Start-Up Priorities

```
WEEK 1 (start immediately — in parallel):
1. Activate QRZ.com subscription → generate API keys → enter in Log4OM
2. Create eQSL account → request AG authentication (scan BIPT licence)
3. Create Clublog account → link to Log4OM
4. LoTW account + TQSL + request certificate via UBA (1-3 weeks wait!)

AFTER RECEIVING LOTW CERTIFICATE:
5. Install certificate → link to Log4OM → batch upload of all QSOs
```

### Correcting Errors

**Scenario:** You logged "PA3XYZ" but it was "PA3XZY".

1. Double-click the QSO in Log4OM → correct → Save QSO
2. If already uploaded to LoTW: right-click → Upload to LoTW again
3. LoTW automatically replaces when same date/time/band/mode
4. LoTW automatically re-matches at each new upload — you do not need to contact the counterpart

---

## 6. POTA and Field Activations: Outdoor Radio with HAMRS {#pota}

### What Is POTA?

**POTA** (*Parks on the Air*) is a worldwide programme for radio operations from recognised nature and park areas. Managed via [https://pota.app](https://pota.app).

You (the **activator**) go with your radio to a recognised park, make a minimum of **10 QSOs** from that park, and upload your log. Others at home (the **hunters**) chase you.

| Property | POTA | SOTA | WWFF |
|---|---|---|---|
| **Location** | Recognised parks | Mountain summits | Flora & fauna areas |
| **Minimum QSOs** | 10 | 4 | 44 for award |
| **Car allowed?** | ✅ Yes | ❌ No (on foot) | ✅ Yes |
| **Belgian refs?** | Yes (ON-prefix) | Limited | Yes (OT-prefix) |

POTA is the most accessible for a Belgian beginner. You don't need a mountain, your car can be next to you, and there are more than 150 Belgian POTA references (ON-XXXX).

### Finding Belgian POTA References

Go to [https://pota.app](https://pota.app) → Parks → filter on Belgium. Belgian parks: prefix ON (e.g. ON-0045 = Kalmthoutse Heide).

In the Antwerp region there are several suitable locations: Kalmthoutse Heide, Turnhouts Vennengebied, De Liereman (Oud-Turnhout) and other officially recognised forest areas.

> ⚠️ **Heads up:** Not every Belgian nature area is recognised as a POTA reference. If it is not on pota.app, it does not count. ALWAYS check before you leave.

### Creating a POTA.app Account

1. Go to [https://pota.app](https://pota.app) → Sign Up
2. Callsign ON3VZ, email, password, name Kristof
3. Profile: Country Belgium, Grid JO21EE

### Installing and Configuring HAMRS

**HAMRS** (*Ham Amateur Radio Logging Software*) — free lightweight logging app optimised for POTA/SOTA. Available for iOS, Android, Windows and macOS.

Download: iOS/Android → "HAMRS" in App Store/Play. Windows/Mac: [https://hamrs.app](https://hamrs.app)

Basic configuration:
```
Callsign:     ON3VZ
Grid:         JO21EE
Name:         Kristof
```

### Starting a POTA Activation

1. Open HAMRS → New Log → template **POTA**
2. My Callsign: ON3VZ / Park Reference: ON-XXXX / My Grid: JO21EE
3. Click Start Logging

Logging a QSO:
```
Callsign:  PA3XYZ
Band:      40m     (dropdown — stays set)
Mode:      SSB
RST Sent:  59
RST Rcvd:  57
```
→ Log QSO → next station.

> ⚠️ **Heads up:** Before each activation, check that your tablet/phone clock is synchronised and set to UTC. Incorrect time zone = invalid ADIF times = rejected upload.

After the activation: Export Log → ADIF → save as `ON3VZ_ON-XXXX_20260512.adi`.

### Fast Log Entry (FLE) as an Alternative

**FLE** ([https://df3cb.com/fle/](https://df3cb.com/fle/)) — Windows tool where you enter QSOs via abbreviated text:

```
date 2026-05-12
40m ssb
1432 pa3xyz 59 57
1438 dl2abc 59 59
```

FLE converts this to ADIF. Ideal with a physical keyboard in the car or when logging a field operation afterwards from a paper note.

### Uploading to POTA.app

1. Log in at [https://pota.app](https://pota.app) → My Logs → Upload
2. Choose your ADIF file
3. POTA.app validates: park reference number recognised? Enough QSOs? Fields correct?
4. Confirm → processing time: minutes to an hour

**Fewer than 10 QSOs?** Upload anyway — "failed activation" but the hunters get their points. Not uploading is considered poor form.

**After the activation:** also import the ADIF into Log4OM (Menu → File → Import → ADIF) and upload to LoTW — POTA QSOs also count for DXCC.

### Spotting Yourself

Without a spot, hunters don't know you are active. Spot yourself via pota.app → Self Spot:
```
Callsign:   ON3VZ
Park:       ON-0045
Frequency:  7.234
Mode:       SSB
Comments:   CQ POTA from Kalmthout
```

Re-spot when changing frequency or band, or after 30–45 minutes of silence.

> ⚠️ **Critical:** For POTA always use your base callsign `ON3VZ` — no `/P`. POTA.app matches callsigns exactly. `ON3VZ/P` does not match your account `ON3VZ`.

### Mobile Activation with the Yaesu FTM-510DE

The FTM-510DE is your mobile radio in the Mazda CX-60. Advantage: quick to set up, permanently mounted, 50W VHF/UHF. Limitation: no HF — most POTA hunters expect 40m or 20m. For serious HF activations: bring a compact HF radio alongside the FTM-510DE.

### Hunter Side from the Shack

See an activator on the spots? Tune in, wait for a pause, call your callsign. Log the QSO in Log4OM. Upload ADIF periodically on pota.app → Hunter Logs → Upload. POTA.app matches automatically.

### POTA Awards (Automatically Awarded via pota.app)

| Award | Threshold |
|---|---|
| Activator Award | 1 park activated |
| Activator Bronze | 25 parks |
| Activator Silver | 100 parks |
| Hunter Award | 1 unique park worked |
| Hunter Silver | 100 unique parks |
| P2P Award | Park-to-park QSOs |

---

## 7. FT8 and the Digital Revolution: WSJT-X {#ft8}

### What Is FT8?

**FT8** (*Franke-Taylor design, 8-FSK modulation*) — a digital radio mode by Joe Taylor (K1JT) and Steve Franke (K9AN), first released in 2017. It has thoroughly changed the radio amateur world.

**How it works:** Your PC encodes a standardised message of 13 characters into a digital signal of exactly 15 seconds. The receiving PC decodes it — even well below the noise floor.

```
Second   0      15      30      45
Even:    ├─tx──┤        ├─tx──┤
Odd:             ├─tx──┤        ├─tx──┤
```

A complete FT8 QSO:
```
CQ ON3VZ JO21          ← you call CQ with grid
PA3XYZ ON3VZ -07       ← PA3XYZ replies (-07 dB S/N)
ON3VZ PA3XYZ R-12      ← you confirm (-12 dB)
PA3XYZ ON3VZ RR73      ← confirmation OK, 73
```

SSB becomes unintelligible around -10 dB. FT8 still works at -25 dB — a difference of 15 dB. Enormous.

### Why Is It So Popular?

1. Works with weak signals that are inaudible on SSB
2. No language barrier — standardised message structure
3. A modest antenna is sufficient for worldwide DX
4. Fully automated — WSJT-X handles the sequence
5. With 100W and a wire you can make QSOs with Japan and Australia

### The Criticism

"There is no conversation." "The PC does the work." "Beginners never learn to really operate." The criticism is not unfounded. Use FT8 for DXCC hunting and poor propagation. Use SSB and CW for real communication. Both have their place.

### Other WSJT-X Modes

| Mode | Use |
|---|---|
| **FT4** | Faster version (7.5s cycles) — for contests |
| **WSPR** | Beacon mode — testing how far your signal reaches, no QSOs |
| **MSK144** | Meteor scatter — VHF DX via meteor trails |
| **JT65** | Older mode, still active for EME (moon bounce) |

### Installing WSJT-X

Download from [https://wsjt.sourceforge.io/wsjtx.html](https://wsjt.sourceforge.io/wsjtx.html) → Windows installer. Install after OmniRig and Log4OM.

### Configuring WSJT-X for the IC-7300 MkII

**File → Settings (F2):**

**Tab General:**
```
My Call:     ON3VZ
My Grid:     JO21EE
```

**Tab Radio:**
```
Rig:              OmniRig Rig 1
PTT Method:       CAT
Mode:             USB/Data
Split Operation:  Rig
```

**Tab Audio — the critical part:**

The IC-7300 MkII has built-in USB audio. Windows shows the radio as "USB Audio CODEC".

```
Input:   USB Audio CODEC  (IC-7300 MkII)
Output:  USB Audio CODEC  (IC-7300 MkII)
```

Configure on the radio: MENU → SET → Connectors → USB AF/IF Output Level: 50%, USB MOD Level: 50%.

Use **USB-D** mode on the radio for FT8 (hold the MODE button or navigate via the menu).

**Tab Reporting:**
```
UDP Server:              127.0.0.1
UDP Server Port:         2237
Enable PSK Reporter:     ✅ On
```

### Globally Accepted FT8 Frequencies

| Band | FT8 frequency |
|---|---|
| 80m | 3.573 MHz |
| 40m | 7.074 MHz |
| 20m | 14.074 MHz |
| 15m | 21.074 MHz |
| 10m | 28.074 MHz |
| 2m | 144.174 MHz |

> ⚠️ **Heads up:** NEVER tune the radio manually when WSJT-X is active — WSJT-X controls the frequency via CAT. Manual tuning disrupts synchronisation.

### Linking WSJT-X and Log4OM via UDP

**In WSJT-X** (File → Settings → Reporting):
```
UDP Server:           127.0.0.1
UDP Server Port:      2237
Accept UDP requests:  ✅ On
```

**In Log4OM** (Settings → Log4OM Settings → UDP Server):
```
Enable UDP Server:    ✅ On
UDP Port:             2237
Accept from WSJT-X:  ✅ On
```

**Start order: OmniRig → Log4OM → WSJT-X.** If you start WSJT-X before Log4OM, QSOs are not forwarded.

Test: make an FT8 QSO → does it appear automatically in Log4OM? Yes = ✅

### The Waterfall and Your First FT8 QSO

The **waterfall** is the visual display of the spectrum in WSJT-X. Horizontal: frequency offset. Vertical: time. Each vertical stripe = an FT8 station. Yellow/white = strong, blue/black = weak.

In the Decoded Messages list you see the decoded messages. See an interesting `CQ`-calling station? Double-click. WSJT-X handles the complete sequence automatically.

Automatic sequence:
```
Cycle 1 (even):   You transmit: CQ ON3VZ JO21
Cycle 2 (odd):    PA3XYZ replies: ON3VZ PA3XYZ -07
Cycle 3 (even):   You transmit: PA3XYZ ON3VZ R-12
Cycle 4 (odd):    PA3XYZ: ON3VZ PA3XYZ RR73
→ QSO COMPLETE — automatically logged + forwarded to Log4OM
```

### Fox/Hound Mode at DXpeditions

At popular DXpeditions, operators use a special **Fox/Hound** mode. If you don't know that a station is in Fox mode, you will never get through no matter how you call. Read DXpedition announcements at [https://dx-world.net](https://dx-world.net).

### PSK Reporter — Who Can Hear You?

With PSK Reporter enabled, WSJT-X automatically reports which stations it has heard.

Go to [https://pskreporter.info/pskmap.html](https://pskreporter.info/pskmap.html) → search ON3VZ → "Stations receiving ON3VZ" → world map with all stations that have received your signal. Ideal for antenna evaluation and propagation check.

### FT8 QSL and LoTW

FT8 QSOs arrive via UDP in Log4OM and are uploaded from there to LoTW. Use **Log4OM as a hub** for all uploads — not WSJT-X directly (causes duplicate uploads).

### DX Possibilities with the IC-7300 MkII

With 25W and a good antenna:

| Band | Reachable via FT8 | Best time (UTC) |
|---|---|---|
| 40m | Europe, North Africa, Middle East | 18:00–22:00 |
| 20m | Worldwide (Americas, Asia, Oceania) | 08:00–18:00 |
| 15m | Worldwide with good propagation | 10:00–16:00 |
| 10m | Worldwide with excellent propagation | 10:00–16:00 |

We are currently in (2026) at or around the **maximum of Solar Cycle 25** — 10m and 15m are the best in years. This is the perfect time to start. Check [https://www.hamqsl.com](https://www.hamqsl.com) for daily propagation forecasts (Solar Flux Index > 150 = excellent conditions).

> ⚠️ **Heads up:** FT8 is a continuous duty cycle mode — the radio transmits for 15 seconds at a stretch. Start at reduced power and increase gradually.

### JTAlert — The Indispensable Companion

**JTAlert** ([https://hamapps.com](https://hamapps.com)) runs alongside WSJT-X and shows for each decoded FT8 station whether it is a new DXCC entity, already worked, or already confirmed in LoTW. Audio alert for new entities. Install it as soon as WSJT-X and Log4OM work correctly.

---

## 8. Contests and Field Days: N1MM+ and ON6WL {#contests}

### What Is a Radio Contest?

A **radio contest** is an organised event where you make as many QSOs as possible in a limited time frame (4 to 48 hours). Each QSO is brief and standardised — you exchange a fixed **exchange** and move on immediately.

**Exchange by contest type:**
- CQ WW DX Contest: RST + CQ Zone (e.g. 59 14)
- UBA HF Contest: RST + province (e.g. 59 ANT for Antwerp)
- VHF contest: RST + grid locator (e.g. 59 JO21EE)

**Final score = points × multipliers.** Points per QSO, multipliers for unique countries/zones/provinces. DX stations give more points AND count as a multiplier.

> 💡 **Pro tip:** As a beginner, start with a Belgian national contest or a short contest (4 hours). The UBA HF Contest or Belgian QSO Party are ideal — more local, more familiar, less pressure.

### What Is N1MM Logger+?

**N1MM Logger+** is the most widely used contest software in the world. Free, Windows-only, actively maintained. Official documentation: [https://n1mmwp.hamdocs.com/](https://n1mmwp.hamdocs.com/)

| Function | Log4OM | N1MM+ |
|---|---|---|
| Daily logbook | ✅ | ❌ (not intended) |
| Contest mode | Limited | ✅ Full |
| Cabrillo export | ❌ | ✅ Required format |
| Multi-operator network | ❌ | ✅ |
| Real-time scoreboard | Limited | ✅ |

**Workflow:** Do contest in N1MM+ → export ADIF after the contest → import into Log4OM as main log. Never run both simultaneously on the same radio — CAT conflicts.

### Installing and Configuring N1MM+

Download from [https://n1mmwp.hamdocs.com/](https://n1mmwp.hamdocs.com/) → Full Install. Install as administrator.

Configuration wizard:
```
Callsign:        ON3VZ
CQ Zone:         14
ITU Zone:        14
Grid:            JO21EE
ARRL Section:    DX  (for non-US stations)
```

**CAT link:** Config → Configure Ports → Tab Hardware → Rig 1: OmniRig Rig 1. Use OmniRig as intermediary — then CAT works for Log4OM, N1MM+ and WSJT-X via the same connection without conflicts.

### The N1MM+ Interface

```
┌─────────────────────────────────┐
│      Entry Window (input)       │  ← Callsign + exchange
├─────────────────────────────────┤
│         Log Window              │  ← All QSOs chronologically
├──────────────────┬──────────────┤
│   Score Window   │  Band Map    │  ← Points/mults + DX spots
└──────────────────┴──────────────┘
```

Workflow per QSO:
1. Type callsign → Tab
2. Automatic duplicate check: **green = new** ✅, **red = dupe** ❌
3. Make QSO on the radio
4. Fill in exchange (e.g. `59 ANT`)
5. Press **Enter** → logged → next station

| Shortcut | Function |
|---|---|
| **Enter** | Log QSO |
| **Escape** | Clear Entry Window |
| **F1** | Call CQ |
| **F2** | Send exchange |
| **Tab** | Switch between fields |

### Belgian Contests in N1MM+

**UBA HF Contest** (annual, typically January):
- Bands: 80m and 40m, modes SSB and CW
- Your exchange as ON3VZ: `59 ANT` (ANT = Antwerp)
- In N1MM+: File → New Log → search "UBA HF"
- Rules: [https://www.uba.be/nl/activiteiten/contests](https://www.uba.be/nl/activiteiten/contests)

**UBA VHF/UHF Contest** (March, June, September, December):
- Exchange: RST + grid locator (`59 JO21EE`)
- N1MM+ automatically calculates distance and points per grid square
- Relevant for your Yagi + rotor setup

**After the contest:**
1. File → Generate Cabrillo → save as `.cbr` (submit to organiser)
2. File → Export → ADIF → import into Log4OM
3. Submit Cabrillo to organiser within 7 days
4. Upload QSOs to LoTW from Log4OM

> ⚠️ **Heads up:** Not submitting a log = disqualification, even if you won. Always submit — even a small log as a "check log" is better than nothing.

### Multi-Operator Field Day with ON6WL

At an ON6WL field day the club operates as **ON6WL** — not as ON3VZ. Legally permitted: you operate under the club licence.

**Multi-op network:** Multiple PCs run N1MM+, connected via LAN, with the same log in real-time:
```
PC1 (Run Station)  ──LAN──┐
PC2 (Mult Station) ──LAN──┼──▶ Shared N1MM+ log
```

**Run station vs. mult station:**
- **Run station**: calls CQ on a fixed frequency, works volume (points)
- **Mult station**: hunts for new multipliers (countries, zones), jumps between bands

As a beginner you will probably be a **run station operator**. Preparation:
- Know the exchange for that specific contest by heart
- NATO phonetic alphabet fluent — copying callsigns must be automatic
- Bring your own headphones
- Practise N1MM+ at home with fictitious QSOs

> 🇧🇪 **Belgian-specific:** Ask ON6WL about the field day procedure: which callsign, which bands, who is responsible for log submission, how the CAT setup is arranged.

### Callsign During Field Operations in Belgium

| Situation | Recommended callsign |
|---|---|
| Home, fixed shack | `ON3VZ` |
| POTA activation in Belgium | `ON3VZ` (NO /P — pota.app matches exactly) |
| Contest field day as ON6WL | `ON6WL` |
| Solo field day other Belgian location | `ON3VZ` or `ON3VZ/P` |
| Operation outside Belgium (Netherlands) | `PA/ON3VZ` |
| Mobile in car | `ON3VZ` or `ON3VZ/M` |

---

## 9. The QSL Card: Your Calling Card in the Ether {#qslcard}

### What Is a QSL Card and Why Does It Still Exist?

A **QSL card** is the physical confirmation of a radio contact — in use since the 1920s. In the digital age it serves to:
1. **Awards** — DXCC accepts paper QSL as an alternative to LoTW
2. **Collecting** — a rare DX card on the wall
3. **DXpeditions** — major expeditions always send paper QSLs
4. **Prestige** — a professionally designed ON3VZ card is a statement

> 💡 **Pro tip:** A well-designed QSL card is a sign of a serious operator. No card or a sloppy one sends the wrong signal.

### Standard Format

**148 × 105 mm = A6** (A4 folded in quarters). This is the international standard. All QSL bureau systems are set up for this. Thickness: minimum 300 g/m² card stock.

### What Goes on It?

**Front:**
- **Callsign** — large, clear, dominant
- Name and QTH (Kristof — Hoboken, Belgium)
- Grid locator (JO21EE)
- DXCC country / prefix (Belgium / ON)
- Club memberships (UBA Member / WLD / ON6WL)
- CQ Zone and ITU Zone (14 / 14)
- Visual design (photo, illustration)

**Back (QSO fill-in fields):**

| Field | Example |
|---|---|
| To radio: | PA3XYZ |
| Date | 12 May 2026 |
| UTC | 14:32 |
| MHz / Band | 7.074 / 40m |
| Mode | FT8 |
| RST Sent | -12 |
| RST Rcvd | -07 |
| QSL via: | Bureau / Direct |
| 73 de | ON3VZ |

> ⚠️ **Heads up:** Write "UTC" explicitly next to the time field. Never local time on a QSL card.

### Designing with Canva

**Canva** ([https://www.canva.com](https://www.canva.com)) — free online design tool. Create an account → Create a design → Custom size: **148 mm × 105 mm** → export as **PDF (Print)** with crop marks and bleed.

**Technical requirements:**
- Resolution: minimum **300 DPI**
- Colour profile: **CMYK** (not RGB)
- Bleed: **3 mm all around** — extend background 3 mm beyond the finished size

**Design ideas for ON3VZ:**
- Antwerp cathedral or harbour cranes
- Kalmthoutse Heide (POTA-relevant)
- Your own shack (IC-7300 MkII, antennas)
- FT8 waterfall as a digital background
- Maidenhead grid overlay on a European map

**Royalty-free images:** Unsplash, Pexels, Pixabay. Or: take your own photo of the shack or Hoboken.

### Print Suppliers

Specialised QSL printers know the requirements:
- **dl-qsl.net** (Germany) — popular in Europe, competitive pricing
- **eqslprint.com** — online design tool included
- **qslshop.com** — wide assortment

> 🇧🇪 **Belgian-specific:** Ask at ON6WL which printer the members use. Clubs often have a preferred supplier.

**Indicative prices (2026):**

| Quantity | Price |
|---|---|
| 100 copies | €15–25 |
| 250 copies | €25–40 |
| 500 copies | €40–60 |

**Recommendation: 250 copies for your first order.**

> ⚠️ **Heads up:** Beginners almost always make a mistake on their first card. Order 100–250 copies. After 6 months you know what needs changing — then you reprint. Check every field **three times**: callsign, grid, zones, name, QTH.

**Request a proof:** always, before the full run. Costs €5–10, shows whether colours and readability are correct.

### Putting Your QSL Card Online

After receiving cards:
- Upload front image on QRZ.com: My Account → Edit → QSL Card Image
- Upload on eQSL.cc: My Account → My eQSL Card

---

## 10. Sending and Receiving QSL Cards: Bureau, Direct and Digital {#qslsending}

### Overview of Channels

| Channel | Speed | Cost | Counts for DXCC? |
|---|---|---|---|
| **LoTW** | Hours–days | Free | ✅ Yes |
| **eQSL** | Minutes | Free | ❌ No (most) |
| **QRZ digital** | Minutes | Paid sub | ❌ No |
| **Bureau** | Months | €0.05–0.15/card | ✅ As paper QSL |
| **Direct** | Weeks | €1–3/card | ✅ As paper QSL |

### Direct QSL (by Envelope)

**When to send direct:**
- DX stations in rare entities (when Clublog OQRS is not available)
- Special QSOs (first DX country, special occasion)
- Stations who state "Direct only" on QRZ.com

Find address: QRZ.com → callsign → QSL via section. If the profile says "QSL via [another callsign]" — that is the **QSL manager**. Send to that person, not the operator themselves.

**Postage:** check current rates at [https://www.bpost.be](https://www.bpost.be). A QSL + envelope typically weighs 8–12 g.

**SAE (Self Addressed Envelope):** an envelope with your own address on it, included so the recipient can easily return a card. Enclose one if you want a paper QSL back.

**IRC (International Reply Coupon):** barely useful in 2026. Use Clublog OQRS or include 1–2 dollars in the envelope as an informal postage contribution.

**Response times:** Europe 2–6 weeks, North America 4–12 weeks, Asia/Oceania 2–6 months, DXpeditions sometimes 1–3 years.

### The UBA Bureau System — Fully Explained

The **QSL bureau** is a system where you bundle cards and have them forwarded via the UBA. In the reverse direction: incoming international QSLs arrive at your address via the bureau.

```
You (ON3VZ)
  ↓ bundle QSLs by country prefix
UBA Bureau (Brussels)
  ↓ sends bundles to foreign bureaus
Foreign bureau
  ↓ sorts and distributes
PA3XYZ (Rotterdam)
```

**Cost:** As a UBA member €0.05–0.15 per card — much cheaper than individual postage.

#### Sorting by Country Prefix — The Most Critical Step

For each QSL card, look at which callsign is addressed. The first 1–3 letters are the country prefix:

| Prefix | Country |
|---|---|
| PA, PD, PE, PH | Netherlands |
| DL | Germany |
| G, M | England |
| F | France |
| I | Italy |
| EA | Spain |
| OH | Finland |
| SM | Sweden |
| SP | Poland |
| W, K, N | USA |
| JA | Japan |
| VK | Australia |

Make stacks per prefix, bind together, write prefix on a slip of paper. Bundle minimum 10 cards per prefix.

> ⚠️ **Heads up:** The UBA bureau delays or refuses cards that are not sorted correctly. Do it right.

#### Handing in at ON6WL

Hand your sorted cards to the QSL bureau coordinator of ON6WL. ON6WL bundles and forwards to the UBA bureau. Ask the club who that is and when cards are collected.

**Timing:** The bureau sends several times per year. Expect 2–6 months between sending and receipt.

#### Collecting Incoming Bureau QSLs

The UBA bureau does **not** notify you automatically. Incoming cards for ON3VZ go via bureau to ON6WL. Collect them at least twice a year — cards that sit for years can get lost.

### QSL Etiquette

**"TNX QSL"** = you always send a QSL back when you receive one. Basic etiquette.

**"100% QSL"** on QRZ.com = every QSL received is answered. Aim for this.

**"No QSL needed, LoTW only"** = respect this — don't send a card.

### Tracking QSL Status in Log4OM

| Field | Values |
|---|---|
| **QSL Sent** | N (No), Y (Yes), Q (Queued), I (Invalid) |
| **QSL Received** | N, Y, R (Requested) |
| **LoTW Sent / Received** | N, Y |
| **eQSL Sent / Received** | N, Y |

Batch update: select multiple QSOs → right-click → Set QSL Sent = Y. Handy after each bureau batch.

### Workflow Summary

**After each QSO (automatic):**
```
QSO made in Log4OM
  ↓ automatically
  ├─ Upload to eQSL (automatic)
  ├─ Upload to QRZ.com (automatic)
  └─ Upload to LoTW (weekly manual recommended)
```

**Monthly bureau workflow:**
```
1. Filter Log4OM: QSOs without paper QSL
2. Select relevant QSOs
3. Fill in cards (pen or stamp)
4. Mark QSL Sent = Y in Log4OM
5. Sort by country prefix
6. Hand in at ON6WL
```

**Direct QSL workflow:**
```
1. Special QSO or DX not using bureau
2. Look up address on QRZ.com
3. Fill in card + envelope + SAE if needed
4. Weigh for postage (bpost rates)
5. Send → QSL Sent = Y + Direct in Log4OM
```

---

## 11. Awards: The Long-Term Engine of the Hobby {#awards}

### Why Awards?

Awards give structure to your radio activity. They answer the question *why do I go on the air today?* They turn random QSOs into a targeted, motivated collection.

### DXCC — DX Century Club

The most prestigious HF award. Managed by the ARRL. Requires confirmed QSOs with **100 different DXCC entities**.

**Entities ≠ countries.** There are 340 active entities. Examples:
- USA = W (48 states), KH6 (Hawaii), KL7 (Alaska) = 3 entities
- Netherlands = PA (Netherlands), PJ2 (Curaçao), PJ4 (Bonaire) = separate entities
- Vatican = HV = one of the rarest entities in the world

Full list: [https://www.arrl.org/country-lists-prefixes](https://www.arrl.org/country-lists-prefixes)

**DXCC categories:**

| Award | What |
|---|---|
| **DXCC Mixed** | All modes together — easiest, start here |
| **DXCC Phone** | SSB only |
| **DXCC Digital** | Digital modes only (FT8 counts here) |
| **DXCC per band** | 40m, 20m, 15m, etc. separate awards |

**Valid evidence:** LoTW ✅ or paper QSL ✅. eQSL ❌, Clublog ❌, QRZ.com ❌.

**Realistic expectation with the IC-7300 MkII:**

| Period | Realistic DXCC score |
|---|---|
| After 1 month active | 25–50 entities (FT8 on 20m) |
| After 6 months | 75–120 entities |
| After 1 year | 100–150 entities |

**Submitting a DXCC application:** [https://lotw.arrl.org](https://lotw.arrl.org) → Award Account → Apply for DXCC Credit → pay processing costs ($15–25).

### UBA Awards

The UBA has its own award programme. See [https://www.uba.be/nl/activiteiten/awards](https://www.uba.be/nl/activiteiten/awards) for the complete list.

Important awards:
- **ON Award**: QSOs with Belgian ON stations
- **UBA HF Award**: HF contacts with Belgian stations, band requirements
- **UBA VHF/UHF Awards**: for VHF/UHF achievements
- **BAVA** (Belgian Award for VHF Activities)

Application: export relevant QSOs as ADIF from Log4OM → submit by email or online form.

### WAZ — Worked All Zones

**WAZ** (*Worked All Zones*) from CQ Magazine: work all **40 CQ zones**. An achievable intermediate award on the way to DXCC. QSL requirements: LoTW or paper QSL.

### WAS — Worked All States

**WAS** (*Worked All States*) from the ARRL: work all **50 American states**. Achievable on HF from Belgium. Challenge: sparsely populated states (North Dakota, Wyoming) are rarer. QSL requirements: LoTW or paper QSL.

### VHF Awards: VUCC

**VUCC** (*VHF/UHF Century Club*) from the ARRL: work **100 different grid squares** on VHF or UHF. With the WiMo WY-209 9-element Yagi + G-450CDC rotor you are excellently equipped. VUCC also accepts eQSL (AG).

### POTA Awards (Automatic via pota.app)

| Award | Threshold |
|---|---|
| Activator Award | 1 park activated |
| Activator Bronze | 25 parks |
| Hunter Silver | 100 unique parks worked |
| P2P Award | Park-to-park QSOs |

### Award Priority Order for Beginners

**1. DXCC Mixed (first target: 100 entities)**
FT8 on 20m is the fastest route. Required: LoTW active.

**2. POTA Activator Award (first activation)**
Directly achievable once hardware is available.

**3. UBA ON Award Bronze**
Belgian and achievable — targeted activity on ON stations.

### Realistic Goals Per Year

**Year 1:** LoTW active (week 3) / DXCC 50–100 entities / POTA 1–3 activations / first ON6WL field day as observing operator

**Year 2:** DXCC 100 application / POTA Bronze / first VHF contest / first UBA award

**Year 3:** DXCC 150+ / WAZ 40 possible / VUCC 100 on 2m / ON6WL as fully operational team member

### What You Must Do Correctly NOW for Awards

```
DAY 1:
✅ Start LoTW application via UBA
✅ Configure Log4OM: ON3VZ / JO21EE / DXCC Belgium
✅ Enable DXCC tracking in Log4OM

WEEK 1:
✅ Request eQSL AG authentication
✅ Register on Clublog
✅ Create pota.app account
✅ Callsign consistently: ON3VZ (no /P for normal home operations)
```

> 💡 **Pro tip:** We are at the maximum of Solar Cycle 25 (2025–2026). 10m and 15m are the best they have been in years. In the coming years propagation will decline. The first years of ON3VZ fall in a golden period — make the most of it.

---

## 12. The Complete Startup Checklist {#checklist}

### Phase 0 — Before the Radio Arrives (Start Now)

```
[ ] Create LoTW account + install TQSL
    → Request certificate via UBA — WAIT TIME 1-3 WEEKS
[ ] Upgrade QRZ.com subscription (approx. $25/year)
    → Generate XML API key
    → Generate Logbook API key (separate key!)
[ ] Create Clublog account at clublog.org
[ ] Create eQSL.cc account
    → Request AG authentication (scan BIPT licence)
[ ] Create POTA.app account
```

### Phase 1 — Installing Hardware

```
IC-7300 MkII:
[ ] Download and install USB driver
[ ] Connect radio, note COM port number (e.g. COM5)
[ ] MENU → SET → CI-V Baud Rate: 115200
[ ] MENU → SET → CI-V Transceive: ON
[ ] MENU → SET → USB AF/IF Output Level: 50%
[ ] MENU → SET → USB MOD Level: 50%
[ ] MENU → SET → Date/Time → set to UTC
[ ] Measure SWR on all bands (target: < 2:1)
[ ] Check shack earthing

VHF/UHF:
[ ] Yagi on mast, rotor cable connected
[ ] G-450CDC rotor test (sweep left-right, calibrate 0° = North)
[ ] Measure SWR on 2m and 70cm

FTM-510DE (mobile):
[ ] Mount in car, 12V connection with appropriate fuse
[ ] Antenna connected, check for RF interference
```

### Phase 2 — Installing Software (In Order!)

```
STEP 1: IC-7300 MkII USB driver
[ ] Download icomjapan.com/support → IC-7300
[ ] Install as administrator
[ ] Connect radio → note COM port number in Device Manager

STEP 2: OmniRig
[ ] Download dxatlas.com/OmniRig → install as administrator
[ ] Rig 1: Icom IC-7300 / COM5 / 115200 baud / 8-N-1
[ ] Radio on → frequency visible in OmniRig? ✅

STEP 3: Log4OM 2
[ ] Download log4om.com → install
[ ] Wizard: ON3VZ, Kristof, Hoboken, Belgium, JO21EE, ITU 14, CQ 14
[ ] Settings → CAT → OmniRig Rig 1 → Test → frequency follows? ✅
[ ] Settings → Online Services → QRZ.com XML API key → Test lookup? ✅
[ ] Settings → Online Services → QRZ.com Logbook API key
[ ] Settings → Online Services → Clublog (email + password)
[ ] Settings → Online Services → eQSL (username + password + Auto Send: On)
[ ] Settings → Online Services → LoTW (after receiving certificate):
    username + password + TQSL Path: C:\Program Files (x86)\TQSL\tqsl.exe
[ ] Settings → Log Settings → Duplicate Check: On (band ✅, mode ✅, time: 0)
[ ] Settings → Awards → DXCC: On
[ ] Settings → Log4OM Settings → UDP Server: On, port 2237
[ ] Enter and delete a test QSO

STEP 4: WSJT-X
[ ] Download wsjt.sourceforge.io → install
[ ] F2 → Tab General: ON3VZ / JO21EE
[ ] Tab Radio: OmniRig Rig 1 / PTT: CAT / Mode: USB/Data
[ ] Tab Audio: Input = USB Audio CODEC / Output = USB Audio CODEC
[ ] Tab Reporting: UDP 127.0.0.1:2237 / PSK Reporter: On
[ ] Tune to 14.074 MHz → waterfall active with signals? ✅
[ ] UDP test → QSO visible in Log4OM? ✅

STEP 5: JTAlert
[ ] Download hamapps.com → install
[ ] Link to WSJT-X and Log4OM
[ ] Configure DXCC alerts

STEP 6: HAMRS (tablet/phone)
[ ] Download App Store or Google Play
[ ] Callsign ON3VZ / Grid JO21EE / Name Kristof

STEP 7: N1MM+ (ready for contests)
[ ] Download n1mmwp.hamdocs.com → Full Install
[ ] Callsign ON3VZ / CQ Zone 14 / CAT: OmniRig Rig 1
[ ] Save for the first contest — don't actively use yet
```

### Phase 3 — Full System Test

```
Start order: OmniRig → Log4OM → WSJT-X

[ ] CAT: frequency follows in Log4OM ✅ and WSJT-X ✅
[ ] Audio: green level indicator in WSJT-X ✅
[ ] Tune test: ALC normal, SWR normal ✅
[ ] QRZ.com lookup: type PA3XYZ → info appears ✅
[ ] UDP: FT8 QSO → visible in Log4OM ✅
[ ] PC clock: synchronised UTC ✅
```

### Phase 4 — QSL Card

```
[ ] Design in Canva (148×105mm, 300 DPI, CMYK, 3mm bleed)
[ ] All fields checked three times for errors
[ ] Order placed (250 copies recommended)
[ ] Proof approved
[ ] Card image uploaded on QRZ.com and eQSL.cc
```

### Repeating Checklist — Before Every QSO

**Before each session:**
```
[ ] Start order: OmniRig → Log4OM → WSJT-X (if FT8)
[ ] CAT active: frequency in sync ✅
[ ] PC clock UTC correct ✅
[ ] Antenna correct for chosen band ✅
[ ] Built-in tuner tuned ✅
```

**During each SSB QSO:**
```
[ ] Frequency free? ("Is this frequency in use?")
[ ] Write callsign phonetically — not from memory
[ ] Uncertain? → ask again ("Please confirm your call")
[ ] Note RST sent and received
[ ] Close: "73, this is ON3VZ, clear"
```

**Immediately after each QSO:**
```
[ ] Enter QSO in Log4OM (or automatic via FT8 UDP)
[ ] Callsign correct? / Date? / UTC correct? / Band/Mode right?
[ ] No duplicate warning (green = new) ✅
[ ] Saved (F12) ✅
```

**Weekly:**
```
[ ] Upload to LoTW (batch — Menu → Online → Upload to LoTW)
[ ] Download LoTW confirmations
[ ] Check eQSL inbox
[ ] ADIF backup to cloud
```

**Monthly:**
```
[ ] Sort and hand in bureau QSLs at ON6WL
[ ] Collect incoming bureau QSLs at ON6WL
[ ] Update QSL status in Log4OM
[ ] Check PSK Reporter (pskreporter.info → ON3VZ)
[ ] Upload POTA logs if applicable
```

**Annually:**
```
[ ] Export full ADIF archive → extra backup
[ ] LoTW certificate: still valid? (3 years — renew in time)
[ ] Apply for DXCC if 100+ confirmed entities
[ ] Update all software (Log4OM, WSJT-X, N1MM+)
[ ] QSL card: sufficient stock remaining?
```

### Your First QSO — How Do You Find Someone?

| Band | Best for | Best time (UTC) |
|---|---|---|
| **40m SSB** | First QSO — European contacts | 18:00–22:00 |
| **20m SSB** | DX — always active | 08:00–18:00 |
| **20m FT8** | Easiest DX for beginners | Any time |

**Answering is easier than calling CQ.** Hear a station calling CQ?
```
You hear: "CQ CQ CQ, this is PA3XYZ ... standing by."
You:       "PA3XYZ, this is ON3VZ, Oscar November Three Victor Zulu. Over."
```

**Always check whether the frequency is free:** "Is this frequency in use?" → wait 5–10 seconds → then call CQ.

**ON6WL club frequency:** Ask at ON6WL for the regular club frequency and the weekly club net. This is the ideal place for your very first QSO.

**Language:** Dutch on the 40m evening with Belgian/Dutch stations is normal. English for international QSOs. Radio English is simple: "Good evening, your signal is 59 in Hoboken, Belgium. My name is Kristof. Over." — that is enough.

### Absolute Top 5 for Your First QSO

```
1. START THE LOTW APPLICATION ON DAY 1
   Wait time 1-3 weeks. Every day of delay = missed opportunities.

2. PC CLOCK ON AUTOMATIC UTC SYNCHRONISATION
   Windows Settings → Time → Set automatically: On
   Does Log4OM show UTC time? Then you are good.

3. LOG4OM FULLY CONFIGURED BEFORE YOUR FIRST QSO
   Callsign ON3VZ / Grid JO21EE / DXCC Belgium
   CAT active / QRZ.com lookup active / UDP for WSJT-X active

4. LEARN YOUR CALLSIGN PHONETICALLY BY HEART
   Oscar November Three Victor Zulu.
   No hesitation. No thinking. Automatic.

5. LISTEN FIRST — TALK LATER
   Open 40m (7.050-7.200 MHz), volume up,
   listen for 30 minutes without transmitting.
   Learn the rhythm before you join in.
```

---

## 13. Cost Overview {#costs}

### What Is Completely Free

Log4OM 2, WSJT-X, N1MM+, HAMRS, JTAlert, OmniRig, LoTW, TQSL, Clublog, eQSL.cc (basic), POTA.app.

### One-Time Costs

| Item | Cost (indicative 2026) |
|---|---|
| QRZ.com Logbook subscription (1 year) | $25–30 |
| Printing QSL cards (250 copies) | €25–40 |
| QSL card proof | €5–10 |
| DXCC application at ARRL | $15–25 |

### Recurring Costs

| Item | Cost | Frequency |
|---|---|---|
| QRZ.com subscription | $25–30 | Annual |
| UBA bureau submission | €0.05–0.15/card | Per batch |
| Direct QSL postage (Europe) | €1–1.50/each | Per card |
| Direct QSL postage (worldwide) | €1.50–2.50/each | Per card |

### Estimated First Year

```
QRZ.com subscription:   ±€25
QSL cards (250):        ±€35
Direct QSL postage:     ±€15
UBA bureau:             ±€5
DXCC application:       ±€20 (if 100 entities reached)
──────────────────────────────
Estimated total:        ±€100 excl. UBA membership
```

---

## 14. Glossary and References {#glossary}

| Term | Definition |
|---|---|
| **ADIF** | Amateur Data Interchange Format — universal logbook format |
| **AG (eQSL)** | Authenticated Gold — verified eQSL account |
| **ARRL** | American Radio Relay League — US radio amateur federation |
| **BIPT** | Belgian Institute for Postal Services and Telecommunications |
| **Bureau** | QSL forwarding system via national radio amateur federations |
| **Cabrillo** | Standard log submission format for contests |
| **CAT** | Computer-Aided Transceiver — PC controls your radio |
| **CI-V** | Icom's CAT protocol |
| **Clublog** | Platform for DX statistics and OQRS |
| **CQ** | General call: "I am calling anyone" |
| **CW** | Continuous Wave — Morse code |
| **DXCC** | DX Century Club — award for 100+ DXCC entities |
| **DXCC entity** | Geographic unit for DX awards (≠ country) |
| **DXpedition** | Expedition to a rare location for radio activations |
| **eQSL** | Electronic QSL card via eqsl.cc |
| **FT4** | Faster version of FT8 (7.5s cycles), for contests |
| **FT8** | Digital mode: 15-second cycles, extremely sensitive |
| **Grid locator** | Maidenhead code for geographic position (ON3VZ = JO21EE) |
| **HAMRS** | Ham Amateur Radio Logging Software — field logging app |
| **HF** | High Frequency — shortwave, 3–30 MHz |
| **IRC** | International Reply Coupon — postage coupon |
| **JTAlert** | Free add-on to WSJT-X for DXCC alerts in the waterfall |
| **LoTW** | Logbook of the World — ARRL's digital confirmation system |
| **LSB** | Lower Side Band — SSB variant for 40m and lower |
| **Multi-op** | Multi-operator contest: multiple operators, one callsign |
| **N1MM+** | Most widely used free contest software in the world |
| **OmniRig** | Free intermediary between radio and multiple log programs |
| **OQRS** | Online QSL Request System (Clublog) |
| **P2P** | Park to Park — QSO between two active POTA activators |
| **POTA** | Parks on the Air — activations from recognised park areas |
| **PSK Reporter** | Global reception reporting system for digital modes |
| **PTT** | Push-to-Talk — switch from receive to transmit |
| **QRZ.com** | Website with profiles of radio amateurs worldwide |
| **QSL** | Confirmation of a QSO (card or digital) |
| **QSO** | Two-way radio contact |
| **RST** | Readability-Strength-Tone: signal assessment (e.g. 59) |
| **Run station** | Contest operator calling CQ on a fixed frequency |
| **SAE** | Self Addressed Envelope — for QSL return mailing |
| **Sked** | Scheduled contact at a predetermined time and frequency |
| **SOTA** | Summits on the Air — activations from mountain peaks |
| **Spot** | Alert on DX cluster or pota.app that a station is active |
| **SSB** | Single Side Band — most common voice mode on HF |
| **SWR** | Standing Wave Ratio — antenna matching ratio |
| **TQSL** | Trusted QSL — software for LoTW upload |
| **UBA** | Unie der Belgische Amateurs (Union of Belgian Radio Amateurs) |
| **UDP** | User Datagram Protocol — network link WSJT-X → Log4OM |
| **USB** | Upper Side Band — SSB variant for 20m and higher |
| **USB-D** | USB Data mode on IC-7300 MkII for digital modes |
| **UTC** | Coordinated Universal Time — the global time standard |
| **VHF** | Very High Frequency — 30–300 MHz (incl. 2m) |
| **VUCC** | VHF/UHF Century Club — award for 100 grid squares |
| **WAS** | Worked All States — all 50 US states |
| **Waterfall** | Visual display of radio spectrum in WSJT-X |
| **WAZ** | Worked All Zones — all 40 CQ zones |
| **WSPR** | Weak Signal Propagation Reporter — beacon mode |
| **WSJT-X** | Software for FT8 and other digital modes |
| **73** | Radio greeting: "best regards" |

### References and Useful Links

| Resource | URL |
|---|---|
| Log4OM 2 | [https://www.log4om.com](https://www.log4om.com) |
| WSJT-X | [https://wsjt.sourceforge.io/wsjtx.html](https://wsjt.sourceforge.io/wsjtx.html) |
| N1MM Logger+ | [https://n1mmwp.hamdocs.com/](https://n1mmwp.hamdocs.com/) |
| HAMRS | [https://hamrs.app](https://hamrs.app) |
| JTAlert | [https://hamapps.com](https://hamapps.com) |
| OmniRig | [https://www.dxatlas.com/OmniRig/](https://www.dxatlas.com/OmniRig/) |
| LoTW | [https://lotw.arrl.org](https://lotw.arrl.org) |
| TQSL download | [https://www.arrl.org/tqsl-download](https://www.arrl.org/tqsl-download) |
| Clublog | [https://clublog.org](https://clublog.org) |
| eQSL.cc | [https://www.eqsl.cc](https://www.eqsl.cc) |
| POTA.app | [https://pota.app](https://pota.app) |
| QRZ.com | [https://www.qrz.com](https://www.qrz.com) |
| UBA | [https://www.uba.be](https://www.uba.be) |
| UBA awards | [https://www.uba.be/nl/activiteiten/awards](https://www.uba.be/nl/activiteiten/awards) |
| UBA contests | [https://www.uba.be/nl/activiteiten/contests](https://www.uba.be/nl/activiteiten/contests) |
| UBA QSL bureau | [https://www.uba.be/nl/leden/qsl-bureau](https://www.uba.be/nl/leden/qsl-bureau) |
| BIPT | [https://www.bipt.be](https://www.bipt.be) |
| Fast Log Entry (FLE) | [https://df3cb.com/fle/](https://df3cb.com/fle/) |
| PSK Reporter | [https://pskreporter.info](https://pskreporter.info) |
| DX World | [https://dx-world.net](https://dx-world.net) |
| Propagation info | [https://www.hamqsl.com](https://www.hamqsl.com) |
| Grid locator calculator | [https://www.levinecentral.com/ham/grid_square.php](https://www.levinecentral.com/ham/grid_square.php) |
| DXCC entities list | [https://www.arrl.org/country-lists-prefixes](https://www.arrl.org/country-lists-prefixes) |
| QSL manager lookup | [https://www.qslinfo.eu](https://www.qslinfo.eu) |
| Icom drivers | [https://www.icomjapan.com/support/](https://www.icomjapan.com/support/) |
| bpost postage rates | [https://www.bpost.be](https://www.bpost.be) |
| Spaceweather.com | [https://www.spaceweather.com](https://www.spaceweather.com) |

---

## Closing Words

I wrote this article while my radio was still on its way. Everything here is what I wished I had known before my first QSO — including the things you normally only learn by making a mistake.

The radio amateur world is large but the core is simple: you make contact with someone on the other side of the world, you confirm it, and you gradually build a logbook that becomes your life's work.

Start with LoTW. Set your clock correctly. Log in UTC. Learn your NATO phonetic alphabet. Listen before you talk. Everything else follows naturally.

73, Kristof — ON3VZ
*Hoboken (Antwerp) — Grid JO21EE — UBA / WLD / ON6WL*

---

*Version 1.0 — May 2026*
