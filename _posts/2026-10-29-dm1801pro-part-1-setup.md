---
layout: post
title: "From Box to Codeplug: Setting Up a Baofeng DM-1801 Pro for FM and DMR in Belgium (Part 1)"
tags: ['DMR', 'FM', 'Baofeng', 'DM-1801 Pro', 'Codeplug', 'BrandMeister', 'Pi-Star', 'Hotspot', 'VHF', 'UHF', 'Beginners']
excerpt: "Everything I did to turn a brand new Baofeng DM-1801 Pro into a working FM and DMR radio for Belgium: the shopping list, my DMR ID, a BrandMeister account, the programming software, repeater research, a 200 channel codeplug in 31 zones, roaming, and a Pi-Star hotspot at home. Every field explained: what it is, why I chose it, and where you look it up."
---
<!-- DM1801PRO-PART1 2026-10-29: new post. Revert by deleting this file, assets/images/dm1801pro/ and assets/files/dm1801pro-codeplug-csv-2026-10.zip -->
<style>
/* DM1801PRO post styles, scoped to .dm-article; follows the fresh light/dark tokens */
.dm-article { --dm-accent: var(--c-cyan, #1E6BA8); --dm-warm: var(--c-amber, #B8791A); --dm-ok: var(--c-primary, #0E8A50); --dm-red: #B3412E; }
.dm-kicker { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--dm-warm) !important; margin: 0 0 .4rem !important; }
.dm-lead { font-size: 1.28rem; line-height: 1.5; color: var(--c-text) !important; font-weight: 300; margin: 0 0 .7rem !important; max-width: 760px; }
.dm-byline { font-family: var(--f-mono); font-size: .8rem; color: var(--c-text-3) !important; margin: 0 0 1.6rem !important; }
.dm-fig { margin: 1.6rem 0 2rem; }
.dm-fig img { display: block; width: 100%; height: auto; border: 1px solid var(--c-border); border-radius: 8px; }
.dm-fig.dm-narrow img { max-width: 560px; margin: 0 auto; }
.dm-fig.dm-phone img { max-width: 360px; margin: 0 auto; }
.dm-fig figcaption { font-size: .86rem; line-height: 1.5; color: var(--c-text-3); margin: .75rem auto 0; max-width: 680px; text-align: center; font-style: italic; }
.dm-box { margin: 1.4rem 0 1.6rem; padding: 1rem 1.4rem .25rem; border-radius: 12px; border: 1px solid var(--c-border); border-left: 4px solid var(--dm-accent); background: var(--c-surface-2); }
.dm-box-label { font-family: var(--f-mono); font-size: .76rem; letter-spacing: .12em; text-transform: uppercase; color: var(--dm-accent) !important; margin-bottom: .45rem !important; }
.dm-why { border-left-color: var(--dm-warm); }
.dm-why .dm-box-label { color: var(--dm-warm) !important; }
.dm-mean { border-left-color: #7A5BA8; }
.dm-mean .dm-box-label { color: #7A5BA8 !important; }
.dm-steps { border-left-color: var(--dm-ok); }
.dm-steps .dm-box-label { color: var(--dm-ok) !important; }
.dm-check { border-left-color: var(--dm-ok); border-style: dashed; border-left-style: solid; }
.dm-check .dm-box-label { color: var(--dm-ok) !important; }
.dm-warn { border-left-color: var(--dm-red); }
.dm-warn .dm-box-label { color: var(--dm-red) !important; }
.dm-toc { margin: 1.2rem 0 2rem; padding: 1rem 1.4rem; border: 1px solid var(--c-border); border-radius: 12px; }
.dm-toc ol { margin: .3rem 0 .2rem 1.2rem; }
.dm-article h2 { scroll-margin-top: 90px; padding-top: 1.4rem; border-top: 1px solid var(--c-border); }
.dm-article h3 { scroll-margin-top: 90px; }
.dm-article table { font-size: .88rem !important; }
.dm-article table thead th { background: #153B5C !important; color: #FFFFFF !important; border-bottom: 0 !important; }
.dm-article code { font-size: .88em; }
.dm-legend { display: flex; flex-wrap: wrap; gap: .5rem; margin: .8rem 0 1.6rem; font-family: var(--f-mono); font-size: .78rem; }
.dm-legend span { padding: .25rem .6rem; border-radius: 6px; border: 1px solid var(--c-border); border-left-width: 4px; }
.dm-legend .l-what { border-left-color: var(--dm-accent); } .dm-legend .l-why { border-left-color: var(--dm-warm); } .dm-legend .l-mean { border-left-color: #7A5BA8; } .dm-legend .l-steps { border-left-color: var(--dm-ok); } .dm-legend .l-warn { border-left-color: var(--dm-red); }
@media (max-width: 760px) { .dm-lead { font-size: 1.12rem; } .dm-box { padding: .9rem 1rem .2rem; } }
</style>

<div class="dm-article" markdown="1">

<p class="dm-kicker">ON3VZ · DMR for beginners · Part 1 of 2: the setup</p>
<p class="dm-lead">A brand new DMR handheld, zero DMR knowledge, and one goal: a radio that does every Belgian FM repeater and every Belgian BrandMeister repeater, plus a hotspot at home. This is the full build, with every field explained.</p>
<p class="dm-byline">ON3VZ Kristof Cornelis · October 2026</p>

<figure class="dm-fig dm-phone"><img src="/assets/images/dm1801pro/radio-on-desk.jpg" alt="The Baofeng DM-1801 Pro on my desk, showing ON0AND on the upper line and ON0AN 206 on the lower line" loading="lazy"><figcaption>The finished radio: FM repeater ON0AND on the upper line (A), DMR talkgroup 206 on the lower line (B)</figcaption></figure>

After Patrick ON4PN's talk on digital voice at WLD ([my report is here]({% post_url 2026-10-10-digital-voice-modes-on4pn-wld %})) I bought a cheap DMR handheld, a **Baofeng DM-1801 Pro**, purely to experiment. I promised to report back. This is that report, and it became two posts:

- **Part 1 (this post): the setup.** What you need, how you get a DMR ID, a BrandMeister account, how you connect the radio to the PC, how you research repeaters, how I designed the codeplug, every screen and field in the programming software, and finally the Pi-Star hotspot.
- **Part 2: using it.** Keys, screen, zones, A and B, dual watch, scanning, an FM QSO, a DMR call, talkgroups, QSY, roaming, EchoLink and the hotspot, always as a situation with a step plan.

I knew nothing about DMR when I started. That is exactly why I wrote everything down while doing it, including the mistakes. Only the right way ends up in the step plans; the mistakes are in the "lessons learned" boxes, because they will save you time.

Two limits up front. My ON3 (class C) licence is **only valid in Belgium**, so the codeplug only contains Belgian repeaters. And it only contains repeaters that do **FM or DMR**. A D-STAR-only or C4FM-only repeater is useless on this radio: you just hear digital noise.

### How to read this post

Every chapter uses the same coloured boxes, so you can always find what you need:

<div class="dm-legend"><span class="l-what">What we do</span><span class="l-why">Why</span><span class="l-mean">What it means</span><span class="l-steps">Step plan</span><span class="l-warn">Watch out / lesson learned</span></div>

If you only want to do it, follow the green step plans. If you want to understand it, read the orange and purple boxes too.

<div class="dm-toc" markdown="1">
**Contents**

1. [Shopping list: hardware, software and accounts](#dm-p1-1)
2. [Ten words you need first](#dm-p1-2)
3. [Your DMR ID at RadioID.net](#dm-p1-3)
4. [A BrandMeister account and Hotspot Security](#dm-p1-4)
5. [Connecting the radio to the PC](#dm-p1-5)
6. [Researching repeaters: where you find what](#dm-p1-6)
7. [Designing the codeplug: channels, zones, scan lists](#dm-p1-7)
8. [The CPS, screen by screen and field by field](#dm-p1-8)
9. [Writing to the radio and checking](#dm-p1-9)
10. [The Pi-Star hotspot](#dm-p1-10)
11. [A critical look: validating the result](#dm-p1-11)
12. [Downloads and sources](#dm-p1-12)
</div>

<h2 id="dm-p1-1">1. Shopping list: hardware, software and accounts</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
Before you start, gather everything. Below is exactly what I used, with the links where you get it.
</div>

### Hardware

| Item | What I used | Where | Remarks |
|---|---|---|---|
| DMR handheld | Baofeng DM-1801 Pro, dual band 2 m / 70 cm, FM and DMR Tier II, firmware 1801.NRFB.00.005, hardware version 6 | [Baofeng official store: DM-1801 Pro](https://www.baofengradio.com/products/dm-1801-pro) | Any shop is fine. Check the firmware version in the radio menu later |
| Programming cable | Baofeng USB programming cable with K-plug (two pin jack), CH340 chip | [Baofeng programming cable](https://www.baofengradio.com/products/baofeng-programming-cable) | Use the cable with the CH340 driver from the Baofeng package. More about this in chapter 5 |
| Windows PC | Any Windows 10 or 11 PC with a USB port | | The CPS only runs on Windows |
| DMR hotspot | Generic MMDVM_HS "Pi-Star" hotspot: Raspberry Pi Zero W, MMDVM_HS hat, small OLED display, Pi-Star pre-installed, paper setup sheet in the box | [The kit I bought (Amazon.nl)](https://www.amazon.nl/dp/B0GZNGM5FL) | Optional. Lets you use DMR at home without reaching a repeater |
| 5 V USB power supply | A decent phone charger, or a power bank / car USB on the road | | A weak PC USB port can make the Pi unstable |
| Wifi | Home wifi on **2.4 GHz**, plus your phone's hotspot for the road | | The Pi Zero W cannot use 5 GHz |

### Software and documents

| Item | Where | Remarks |
|---|---|---|
| CPS V1.60 (programming software) and cable driver | [Baofeng download area](https://www.baofengradio.com/pages/download), look for DM-1801 Pro | My file: `Baofeng_DM-1801_Pro_CPS_v1.60_20261008.zip`. It contains the CPS installer and the "Cable Driver" |
| User manual DM-1801 Pro (English) | [Baofeng manual PDF (version 2026-09-16)](https://baofeng.s3.amazonaws.com/Baofeng_DM-1801_Pro_User_Manual_EN_20260916.pdf) | Menus, keys, functions. I refer to its chapter numbers |
| Pi-Star (only if you ever need to reinstall the hotspot) | [Pi-Star downloads](https://www.pistar.uk/downloads/) | My hotspot came with Pi-Star 4.2.1 pre-installed. The paper sheet says: do not update or factory reset |
| A spreadsheet program | Excel, LibreOffice or even Notepad | To read and edit the CSV import files |

### Accounts and paperwork

| Item | Where | Remarks |
|---|---|---|
| Your BIPT operator certificate as a PDF | Your own papers | RadioID asks for it to check your callsign |
| RadioID.net account and DMR ID | [radioid.net](https://radioid.net) | Free. Chapter 3 |
| BrandMeister account | [brandmeister.network](https://brandmeister.network), help: [Register for an account](https://help.brandmeister.network/dashboard/register-for-an-account) | Free. Needed for the hotspot. Chapter 4 |

### Information sources (free, all used in this post)

| Source | What you find there |
|---|---|
| [RepeaterBook Belgium](https://www.repeaterbook.com/row_repeaters/index.php?state_id=BE) | Repeaters with frequencies, tones, bandwidth and a "Reviewed" date |
| [ON0.be Station Registry](https://on0.be/) | The Belgian registry of unmanned stations, with a CSV export |
| [BrandMeister](https://brandmeister.network) > DMR Devices | Live data of every DMR repeater: frequency, colour code, static talkgroups per timeslot, last heard |
| [HAM-DMR.be](https://www.ham-dmr.be/) and its [BM206 dashboard](http://dashboard.ham-dmr.be/dynamic/lastheard.php) | BrandMeister Belgium: talkgroup agreements and live traffic |
| [UBA bandplan](https://www.uba.be/nl/v-u-shf/bandplan) | Which part of 2 m and 70 cm is for what (IARU Region 1) |
| [UBA unmanned stations](https://www.uba.be/en/node/2057) | The official list (older, good for cross checks) |
| [SvxLink network Belgium portal](https://portal.be.svx.link/) and [CQ Belgie](https://www.cqbelgie.be) | Which FM repeaters are linked in the Flemish SvxLink network |
| Club websites and [QRZ.com](https://www.qrz.com) pages of the repeaters | The owner's own data |

<h2 id="dm-p1-2">2. Ten words you need first</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>

- **DMR**: Digital Mobile Radio. Your voice is digitised and sent in small packets. Instead of noise you hear either clear speech or nothing.
- **DMR ID**: your personal number on DMR (mine: 2060971). Belgian IDs start with 206, the country code. Your radio sends it with every transmission.
- **Talkgroup (TG)**: a "conversation group". Everyone on the same talkgroup hears each other, on every repeater and hotspot where that talkgroup is active. TG 206 is all of Belgium.
- **Timeslot (TS1 / TS2)**: a DMR repeater splits its frequency in two turns that alternate every 30 milliseconds. Two conversations at the same time on one repeater.
- **Colour code (CC)**: a number from 0 to 15 that a DMR repeater listens for, like a CTCSS tone on FM. Wrong colour code and the repeater ignores you. Flanders uses CC1, Wallonia CC2.
- **BrandMeister**: the worldwide network that links DMR repeaters and hotspots over the internet. Belgium has one server ("master"): BM_2061_Belgium.
- **Codeplug**: the complete set of settings in your radio (channels, talkgroups, zones...). You build it on the PC and write it to the radio.
- **CPS**: Customer Programming Software, the Windows program you build the codeplug with.
- **Zone**: a named group of channels, for example "QTH Antwerpen" or "Kust". You switch zones instead of scrolling through 200 channels.
- **CTCSS**: a low, inaudible tone you send with your FM signal to open a repeater (79.7 Hz and 131.8 Hz are common in Flanders, 74.4 Hz in Wallonia).
</div>

<h2 id="dm-p1-3">3. Your DMR ID at RadioID.net</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
We request a personal DMR ID, linked to our callsign, at RadioID.net.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
DMR works with numbers, not with callsigns. Without your own ID, the network does not let you in and nobody knows who is talking. RadioID.net is the free worldwide register of these numbers. Radios, repeaters and networks use the register to show the callsign and name that belong to a number. BrandMeister takes your data from RadioID, so this is step one.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Go to [radioid.net](https://radioid.net) and create an account (use the e-mail address you will also use for BrandMeister). Log in.
2. In the menu on the left choose **My RadioID**. "Get DMR ID" only shows the explanation; you actually request the ID through an **Identity**: **Identities > Create Identity**.
3. Question "Is this a club identity?": **No** for a personal ID.
4. "Start with your licence": upload your **BIPT operator certificate** (the PDF, all pages, complete and unedited, name and callsign readable) and click **Submit licence for reading**. If the automatic reading fails, choose "Read with AI" or "Enter details manually".
5. Check the identity page: callsign, name exactly as on the certificate, state (Antwerp), city, the licence expiry date as on the certificate, and at the bottom the uploaded file (upright, all pages).
6. Click **Submit for Approval**. Under Identities, tab "Personal", the status becomes **Pend Approval**. A human checks it.
7. Wait for the message "RadioID DMR ID assigned". Mine came within a few hours.
8. Your number is on **My RadioID > Dashboard**, tab "Radio IDs", under "DMR / P25 / TETRA".
</div>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/radioid-get-dmr-id.png" alt="RadioID.net page Apply for DMR ID with the four steps" loading="lazy"><figcaption>RadioID's own explanation: Create Identity, fill in the red fields, upload the licence document, submit for approval</figcaption></figure>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/radioid-pending.png" alt="RadioID identity ON3VZ with status Pend Approval" loading="lazy"><figcaption>Submitted: status "Pend Approval"</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/radioid-assigned.png" alt="RadioID message: your identity ON3VZ has been assigned a new DMR ID" loading="lazy"><figcaption>A few hours later: DMR ID assigned</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out</p>

- In Belgium you upload your **operator certificate** (bedieningscertificaat / certificat d'opérateur). Keep the expiry date in RadioID up to date yourself.
- Do not program anything with a "test" ID. The radio ships with ID 123; that must go.
</div>

<div class="dm-box dm-check" markdown="1">
<p class="dm-box-label">Check</p>
You have a 7 digit number starting with 206. Write it down: you need it in the CPS (chapter 8), in Pi-Star (chapter 10) and BrandMeister links it to your account automatically.
</div>

<h2 id="dm-p1-4">4. A BrandMeister account and Hotspot Security</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
We create a BrandMeister account, look at SelfCare, set our Talker Alias text and set a Hotspot Security password.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
For a repeater you only need a DMR ID. For a **hotspot** you also need a BrandMeister account: a hotspot logs in to BrandMeister with your DMR ID, and without a password anyone could log in a hotspot with your number and transmit in your name. The Hotspot Security password is the key between your hotspot and the network. In SelfCare you also manage your own settings, and on the BrandMeister site you find live repeater data and "Last Heard", which we use a lot later.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Go to [brandmeister.network](https://brandmeister.network) > **Register** and use the **same e-mail address** as at RadioID (help page: [Register for an account](https://help.brandmeister.network/dashboard/register-for-an-account)). BrandMeister pulls your callsign and ID from RadioID.
2. Log in. Top right: your callsign, language (choose NL or EN) and settings. Menu left: Dashboard, Last Heard (DMR), DMR Devices, Masters, SelfCare, Documentation.
3. Open **SelfCare** (menu left, or click your callsign top right). There is a tab with your ID and callsign, for me "2060971 (ON3VZ)".
4. Block **General settings**: leave Brand ETSI, set Language, leave APRS off, check that **Private Hotspot** is on. Fill in **APRS Text / Talker Alias**, for example your name. Click the blue **Save** of this block.
5. Block **Hotspot Security**: type a password of your own, **letters and digits only, maximum 20 characters**, not your BrandMeister login password. Click **Save Password** (the button inside this block). The field is empty again afterwards: that is normal.
6. Write the password down on paper, exactly, with capitals as typed.
7. Leave **Terminal Affiliations** empty.
</div>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/bm-selfcare.png" alt="BrandMeister SelfCare Settings with General settings, Hotspot Security and Terminal Affiliations" loading="lazy"><figcaption>BrandMeister SelfCare: three blocks, each with its own save button</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned</p>
Each block in SelfCare has its own save button. The blue "Save" of General settings does **not** save the Hotspot Security password: only "Save Password" does. And **type** the password, do not paste it: a pasted space at the end is invisible and makes your hotspot fail (that happened to me, see chapter 10).
</div>

<h2 id="dm-p1-5">5. Connecting the radio to the PC</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
We install the cable driver and the CPS, find the right COM port, read the factory codeplug out of the radio and save it as a backup.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
The CPS talks to the radio over a virtual serial port (COM port) created by the CH340 chip in the cable. Without the right driver Windows shows an error and nothing works. The manual itself says: always start by **reading** the radio and build your codeplug on top of that, never start from an empty file. And a backup of the factory state means you can always go back.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: driver and CPS</p>

1. Unzip the CPS package from the Baofeng download area.
2. **Driver first.** If Windows already has a CH340 driver: open **Device Manager** (right click the Start button), plug in the cable, open "Ports (COM & LPT)", right click the CH340 entry > **Uninstall device**, tick "delete the driver software", unplug the cable.
3. Run the "Cable Driver" from the Baofeng package and click **INSTALL**. Plug the cable back in.
4. In Device Manager, under "Ports (COM & LPT)", note the COM number (for me COM9). It can change when you use another USB port: always check here.
5. Install the CPS ("CPS DMR Radio Setup v1.60.exe"; it installs in `C:\DMR CPS\`). Start it and check **Help > About**: V1.60.
6. In the CPS open the COM settings: **COM Type** = COM, **COM** = the number from Device Manager, **Baudrate = 115200**. OK.
</div>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-about-v160.png" alt="CPS About window: CPS Version V1.60" loading="lazy"><figcaption>Help > About: the version this post is based on</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-com-window.png" alt="CPS COM window with COM Type COM, COM 9 and baudrate 115200" loading="lazy"><figcaption>The COM window: COM type, the port number from Device Manager, and 115200 baud</figcaption></figure>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: read and back up</p>

1. Battery charged. Plug the cable fully into the radio (the K-plug must click in completely, it is stiff), then switch the radio on.
2. Put the radio flat on the table and do not touch it during reading or writing.
3. In the CPS: **Program > Read**. The first time, tick "Digital Contact" so everything is read.
4. When reading is complete: **File > Save As**, for example `factory.data`. This is your backup.
5. Save it again under a new name, for example `ON3VZ-codeplug-v1.data`. From now on you only work in this copy.
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out</p>

- "Communication failed!" almost always means: wrong COM number, wrong driver, or the plug is not fully in.
- Never **write** to a radio if reading did not complete. First fix the connection.
- On my PC the channel screen of the CPS sometimes showed no channels after reading, while Export and Import worked fine. Do not panic, it is a display issue.
</div>

<h2 id="dm-p1-6">6. Researching repeaters: where you find what</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
For every repeater we want in the radio we collect: frequencies, shift, tones, bandwidth, and for DMR the colour code and the talkgroups per timeslot. We check every value in at least two sources.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
Repeater lists are often outdated. RepeaterBook Belgium itself only had a minority of its entries reviewed in the last year. A wrong tone means the repeater does not open, a wrong colour code means the DMR repeater ignores you, and a repeater that went off the air just clutters your zones. So: two sources, the owner wins, and when in doubt you listen.
</div>

### Where you look

| Source | What you find | How | Reliability |
|---|---|---|---|
| [RepeaterBook](https://www.repeaterbook.com/row_repeaters/index.php?state_id=BE) | Downlink, uplink, offset, uplink and downlink tone, **bandwidth** (narrow/wide), modes, EchoLink node, **Reviewed** date | Click on the callsign to open the detail page | Good when "Reviewed" is recent |
| [ON0.be](https://on0.be/) | Full Belgian list: location, antenna, CTCSS in and out, online, status notes; CSV export | Export the list as CSV and open it in a spreadsheet | Official and recent. But the emission class (for example 12K0F3E) is not always the bandwidth used in practice |
| [BrandMeister](https://brandmeister.network) > DMR Devices | For DMR: frequency, shift, colour code, status, **static talkgroups per timeslot**, last heard | Search the callsign or the repeater ID (for example 206204 for ON0AN) | Live: the best source for DMR |
| Club site or QRZ.com of the repeater | The owner's own data | Search the callsign | Highest, if the page is recent |
| [UBA list](https://www.uba.be/en/node/2057) | Older official list | PDF or XLS | Only as a cross check |
| SvxLink list ([CQ Belgie](https://www.cqbelgie.be), [live portal](https://portal.be.svx.link/)) | Which FM repeaters are linked | | Recent |

### What you note for an FM repeater

| Data | What it means | Example ON0AND |
|---|---|---|
| Callsign | Becomes the channel name | ON0AND |
| Output (downlink) | The repeater **transmits** here, you **receive** here | 438.98750 |
| Input (uplink) | The repeater **listens** here, you **transmit** here | 431.38750 |
| Shift (offset) | Input minus output. Belgium: 2 m = -0.6 MHz, 70 cm = -7.6 MHz, the few 430.xxx repeaters +1.6 MHz | -7.6 |
| Uplink tone (CTCSS encode) | The tone you send to open the repeater. Wrong or missing: the repeater stays shut | 131.8 |
| Downlink tone (CTCSS decode) | The tone the repeater itself sends. Only useful as a filter, see the lesson below | 131.8 |
| 1750 Hz tone burst | Some (mainly older, Walloon) repeaters open with a short 1750 Hz whistle instead of CTCSS | n/a |
| Bandwidth | Narrow (12.5 kHz) or wide (25 kHz) | narrow |
| Mode | FM, FM + C4FM (works in FM, you sometimes hear digital noise), D-STAR-only or C4FM-only (skip) | FM |
| Status and date | On the air? When was it last checked? | |
| Location / province | For the zones | Antwerpen |

### What you note for a DMR repeater

| Data | What it means | Where | Example ON0AN |
|---|---|---|---|
| Output / input | As for FM, shift -7.6 MHz on 70 cm | BrandMeister device page (TX = repeater output, RX = repeater input) | 439.3500 / 431.7500 |
| Colour code | 0 to 15, must match exactly | BrandMeister device page | 1 |
| Static talkgroups per timeslot | Talkgroups that are always on, and on which slot | BrandMeister device page > "Slot information" | TS1: 206, TS2: 2061 |
| Status / last heard | Is it alive? Is there traffic? | BrandMeister device page and Last Heard | |
| Region | Decides the regional talkgroup: 2061 Flanders, 2062 Wallonia, 2063 East Cantons | Location | Flanders |

<figure class="dm-fig dm-phone"><img src="/assets/images/dm1801pro/bm-device-on0an.jpg" alt="BrandMeister device page of ON0AN with number 206204, hardware MMDVM, master BM2061, TX 439.3500, RX 431.7500, shift -7.6 MHz, CC 1" loading="lazy"><figcaption>The BrandMeister device page of ON0AN: everything a DMR channel needs, and further down the static talkgroups per slot</figcaption></figure>

### The Belgian BrandMeister talkgroups

| TG | Name | Use |
|---|---|---|
| 206 | Belgium | National calling group |
| 2061 / 2062 / 2063 | Flanders / Wallonia / East Cantons | Regional calling groups |
| 2064 to 2069 | QSY | Conversation groups on demand, on TS2. You move here after making contact on 206 |
| 9 | Local | Only on that one repeater or hotspot, does not go to the network |
| 206112 | Emergency | Only for real emergencies |
| 206997 | Parrot Belgium | Private call: you hear yourself back. Test |
| 9990 | Parrot BrandMeister | Private call, same idea, worldwide BrandMeister |
| 91 / 92 | World / Europe | Only sensible on a hotspot |
| 99 | DMR simplex | Radio to radio, no network |

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: check the static talkgroups per repeater</p>
The general Belgian scheme says "206 and the regional group on TS1". When I checked every repeater on BrandMeister, that turned out to be only partly true. On ON0AN, ON0SNW, ON0TLS and ON0VTI talkgroup 2061 is static on **TS2**, on ON0LUS 2062 is on TS2, and several Walloon repeaters have no static 206 at all (there 206 only comes in after someone calls it). So I put each regional channel on the slot where that talkgroup really lives. **Always look at the device page of the repeater itself.**
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: sources disagree, so decide with a rule</p>
I found repeaters that moved, repeaters that went off the air, tones that changed and a repeater that switched network. My rule: DMR follows BrandMeister live. FM follows RepeaterBook plus the owner. When two sources disagree, the most recent one or the owner wins. When I still had doubts, the repeater went on a checklist to verify by ear (chapter 11).
</div>

<h2 id="dm-p1-7">7. Designing the codeplug: channels, zones, scan lists</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
Before typing anything, we decide how the codeplug is organised: which channels, in which order, with which names, in which zones and scan lists. The result: **200 channels, 18 talkgroups, 5 RX group lists, 8 scan lists, 31 zones and 7 roaming zones**.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
A radio with 200 channels in one long list is unusable. The radio works with **zones**: you pick the zone for where you are, and inside that zone you only see the channels that make sense there. The fewer channels in a zone, the faster you turn to the right one, and what you cannot reach anyway is not in the way.
</div>

### The channels, and their order

1. **WLD (144.675 MHz simplex)** on channel 1. My club frequency is always first.
2. **Simplex**: 145.500 (2 m FM calling), 433.500 (70 cm FM calling), DMR simplex 433.450.
3. **Hotspot**: 15 channels on 438.100 MHz, low power, one channel per talkgroup (HS 206, HS 2061 ... HS Parrot BM). You change talkgroup by turning the channel knob.
4. **FM repeaters**, grouped per province.
5. **DMR repeaters**, per province, each with **three channels**.
6. **PMR446**, receive only, at the end.

**Names** (maximum 16 characters, must be unique): the callsign. When one callsign has two bands I add " V" (2 m) or " U" (70 cm). When a repeater does FM and DMR on the same frequency, the analogue channel gets " FM" (for example "ON0AN FM").

### Three channels per DMR repeater

| Channel | Timeslot | Talkgroup | You use it for |
|---|---|---|---|
| ON0SNW 206 | TS1 | 206 Belgium | Calling all of Belgium, and hearing national calls |
| ON0SNW 2061 | the slot where 2061 is static (TS2 on ON0SNW) | 2061 Flanders (2062 Wallonia, 2063 East Cantons) | Regional calling |
| ON0SNW QSY | TS2 | 2064 QSY | The conversation after a call (see Part 2) |

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why three</p>
Talkgroups 206 and the regional groups are for **calling**. If you hold a 20 minute chat on 206, you block that timeslot on every Belgian repeater where 206 is static. The Belgian agreement is: call on 206, then move together to a QSY group (2064 to 2069) on TS2. With three channels per repeater you pick national, regional or QSY with the channel knob, without digging in menus.
</div>

### The zones

| Zone | What is in it | When you use it |
|---|---|---|
| QTH Antwerpen | WLD, the FM repeaters I reach from Hoboken (ON0AND, ON0ANR, ON0BEL, ON0DP, ON0WAL, ON0LIR...), DMR ON0AN, ON0KB, ON0SNW, simplex calling | At home |
| Simplex | WLD, 145.500, 433.500, DMR 433.450 | Direct contact, no repeater |
| Hotspot | The 15 hotspot channels | DMR at home via the hotspot |
| Sinaai Waasland, Leuven, Hasselt, Kust, Marche Famenne, Malmedy | The repeaters within handheld range of places I visit often | When you have arrived there |
| Ant-Breda, Ant-Hasselt, Ant-Leuven, Ant-Gent, Ant-Kust, Ant-Malmedy, Ant-Namen, Ant-Marche | The repeaters along that route from Antwerp, in driving order (Belgian part only) | In the car |
| SvxLink VL | The FM repeaters of the Flemish SvxLink network | One call is heard on all linked repeaters |
| Onderweg BE 206 | The 206 channel of all 26 Belgian BrandMeister repeaters | Anywhere in Belgium: national DMR |
| Prov Antwerpen ... Prov Luxembourg, Brussel (11) | All repeaters of that province | Reference, or a trip elsewhere |
| Alleen ontvangen | PMR446 channels 1 to 16, transmit blocked | Listening only |

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">How I picked the repeaters for a zone</p>
For a local zone: the repeaters within handheld range (rule of thumb with 5 W: 20 to 30 km, high sites 50 km or more; RepeaterBook detail pages and ON0.be give the site height). For a route: the repeaters along the road, in the order you pass them. Limits of the radio: 250 zones, 64 channels per zone, 32 scan lists.
</div>

### Scan lists and RX group lists

**Scan lists** contain only the **FM** channels of the local zones and simplex (Scan QTH, Scan Sinaai, Scan Leuven, ScanHasselt, Scan Kust, Scan Marche, ScanMalmedy, ScanSimplex). Scanning DMR over many repeaters and two timeslots is slow and misses calls; scanning a short FM list works well.

**RX group lists** decide which talkgroups you **hear** on a DMR channel (more in chapter 8):

| RX group | Contains | Used on |
|---|---|---|
| RX VL | 206, 2061, 206112 | 206 and 2061 channels of Flemish repeaters |
| RX WAL | 206, 2062, 206112 | Walloon repeaters |
| RX OK | 206, 2063, 206112 | ON0DV Eupen (East Cantons) |
| RX QSY | 2064 to 2069, 9, 206112, 2061, 2062 | All QSY channels (TS2). 2061 and 2062 are in it because on some repeaters they are static on TS2 |
| RX Hotspot | 206, 2061 to 2069, 9, 91, 92, 206112 | All hotspot channels |

<h2 id="dm-p1-8">8. The CPS, screen by screen and field by field</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
We go through every screen of the CPS in the right order and fill it in. For the long lists (talkgroups, channels, zones...) I used **CSV import**: you prepare the list in a spreadsheet and read it in at once. Everything can also be done by hand; that is why every column is explained.
</div>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What an import does</p>
The CPS can read a list from a CSV file (comma separated text that opens in Excel or Notepad). An import **replaces the whole list** on that screen by the content of the file. Tip: first click **Export** on an empty or factory screen. That gives you a file with exactly the column names your CPS version expects.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why the order matters</p>
The lists refer to each other **by name**. A channel refers to a talkgroup name, an RX group and a DMR ID name; a zone refers to channel names. A list must exist before another list refers to it. The order is: DMR ID, Talk Groups, RX Group List, Channel, Scan, Zone, Roaming Channel, Roaming Zone. The general settings (Option Feature, Key Function) can be done any time.
</div>

### 8.1 Digital > DMR ID

| Column | Meaning | My value |
|---|---|---|
| No. | Number in the list | 1 |
| ID | Your DMR ID from RadioID | 2060971 |
| Name | The name of this ID entry. Every channel refers to this name (column "DMR ID" in Channel) | ON3VZ |

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Open **Digital > DMR ID**.
2. Row 1: replace the factory ID 123 by your own DMR ID.
3. Give the entry the **name of your callsign** (double click the Name cell).
4. Delete the other factory rows (Radio 2 to 5) with **Delete**.
</div>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/cps-dmr-id.png" alt="CPS Digital DMR ID with one row: ID 2060971, name ON3VZ" loading="lazy"><figcaption>One ID, named after my callsign</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: this name is your Talker Alias</p>
I first left the name on "Radio 1". On the hotspot log I then saw that my radio sent **Talker Alias "Radio 1"**: with "Send TX Name = Yes" (Option Feature > Digital) the radio sends the name of this entry, and that is what other stations see on their screen. There is no separate "Radio Name" field in CPS V1.60. After renaming the entry to ON3VZ, all 200 channels followed automatically (checked with an export), and the log showed Talker Alias "ON3VZ". So: name it after your callsign from the start.
</div>

### 8.2 Public > Option Feature

The window "Optional Features" has tabs. Only the fields I changed or that matter are listed; leave the rest as it is.

| Tab | Field | My value | Why |
|---|---|---|---|
| Power on/off | Power On Display Line 2 | ON3VZ | Your callsign on the start screen |
| Power on/off | Allow Reset | on | So you can reset the radio from the menu if needed |
| GPS | GPS Switch / Time Zone | off / UTC +1:00 | The DM-1801 Pro has no GPS; time zone for the call log |
| Digital | Call Hold Time | **5.0 s** | How long after someone talks you can answer on **their** talkgroup by just pressing PTT. 1 s (factory) is too short to react |
| Digital | Send TX Name | Yes | Sends your Talker Alias (the DMR ID name) |
| Digital | Radio Disable Decode, Remote Monitor Decode | off | Professional functions: nobody can disable or listen in on your radio |
| Work Mode | Work mode / Main channel | Double Wait, main A | You listen on A and B at the same time |
| Work Mode | Dual Watch Hang Time | 500 ms | After a signal on the other line, the radio stays there briefly |
| Other | TOT | 180 s | Time out timer: the radio stops transmitting after 3 minutes |
| Other | Weather Alarm | off | North American weather service, not needed |
| Other | Tail Noise Reduction | None | |
| Other | TBST | 1750 Hz | The tone burst for repeaters that open with 1750 Hz |
| Other | Power Save | 1:4 | Saves battery in standby |

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-option-power-on.png" alt="Optional Features tab Power on/off with Power On Display Line 2 ON3VZ and Allow Reset" loading="lazy"><figcaption>Option Feature, tab Power on/off: my callsign on the start screen</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-option-digital.png" alt="Optional Features tab Digital with Call Hold Time 5.0 and Send TX Name Yes" loading="lazy"><figcaption>Option Feature, tab Digital: Call Hold Time 5.0 s and Send TX Name Yes</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-option-other.png" alt="Optional Features tab Other with TOT 180, Power Save 1:4 and TBST 1750Hz" loading="lazy"><figcaption>Tab Other: time out 180 s, TBST 1750 Hz</figcaption></figure>

### 8.3 Public > Key Function

| Key | My function | What it does | When you use it |
|---|---|---|---|
| SK1 short | Display Mode (Wait Mode) | Cycles Single Mode, Double Wait, Single Wait | Listen on two channels, or temporarily silence B |
| SK1 long | Switch Main Channel | Makes A or B the channel you transmit on | To answer on the other line (the [A/B] key does the same) |
| SK2 short | Monitor | Opens the squelch: you also hear weak signals and signals without the right tone | Check the channel is free; check whether a repeater sends a tone |
| SK2 long | TBST Send | Sends the 1750 Hz tone burst | Opening ON0HT, ON0HTT, ON0CLR, ON0PHI, ON0RBO |
| TK short (top key) | Scan | Scan on and off | Starting the scan of the local zone |
| TK long | Zone Up | Next zone | Changing zone without the menu |
| Long Press Time | 2 s | When a press counts as "long" | 3 s (factory) is too long while you hold PTT |

The P1 and P2 rows in this window do nothing: the DM-1801 Pro has no P1 and P2 keys. Factory, SK2 long was "Power Select"; I do not need that because the power is set per channel (repeaters high, hotspot low).

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-key-setting.png" alt="Key Setting window: SK1 short Display Mode, SK1 long Switch Main Channel, SK2 short Monitor, SK2 long TBST Send, TK short Scan, TK long Zone Up" loading="lazy"><figcaption>My key setting. Choose your own: who never visits Wallonia can keep SK2 long for something else</figcaption></figure>

### 8.4 Digital > Talk Groups

| Column | Meaning | Example |
|---|---|---|
| Name | What you see on the screen. Channels and RX groups refer to this name | 206 Belgie |
| TG/DMR ID | The talkgroup number (group call) or the ID of a person or service (private call) | 206 |
| Call Type | **Group Call** = to everyone on the talkgroup. **Private Call** = to one ID (the Parrots). **All Call** = to everyone in the system: never use on the network | Group Call |

My 18 entries: 206, 2061, 2062, 2063, 2064 to 2069, 9, 91, 92, 99, 206112, 206997 Parrot (private), 9990 Parrot BM (private), and the factory All Call (kept, never used).

<figure class="dm-fig"><img src="/assets/images/dm1801pro/cps-talkgroups.png" alt="CPS Talk Groups list after import: 18 entries" loading="lazy"><figcaption>Talk Groups after the import. The CPS sorts the list itself</figcaption></figure>

### 8.5 Digital > RX Group List

| Column | Meaning |
|---|---|
| RX Group Name | Name of the list; channels refer to it |
| Contacts / Contact Members | The talkgroups you **hear** on a channel with this list |

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
On a DMR channel your radio only plays a call when three things match: the frequency and colour code, the timeslot of the channel, **and** the talkgroup is in the RX group list of that channel (or equals its TX Contact). Without an RX group list you only hear the one talkgroup you transmit on.
</div>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-rx-group-edit.png" alt="RX Group List editor for RX QSY with available contacts on the left and members on the right" loading="lazy"><figcaption>Editing an RX group by hand: pick talkgroups on the left, add them with the arrow</figcaption></figure>

### 8.6 Public > Channel: every field

This is the big one. Double click a channel to open **Channel Information**; the import file has the same columns.

| CPS field | Meaning | FM repeater | DMR repeater | Where the value comes from |
|---|---|---|---|---|
| Channel Name | Name on the screen, max 16 characters, unique | ON0AND | ON0AN 206 | Your naming rule |
| Channel Type | Analog, Digital, or mixed (A+D, D+A) | Analog | Digital | Mode of the repeater. I use separate channels, clearer for beginners |
| RX Frequency | Where you listen = repeater output | 438.98750 | 439.35000 | Chapter 6 |
| TX Frequency | Where you transmit = repeater input | 431.38750 | 431.75000 | Output plus shift |
| Power | High 100 %, Middle 60 %, Low 30 % | High | High | Low for the hotspot, which stands next to you |
| Band Width | Narrow 12.5 kHz or Wide 25 kHz (analogue only) | per repeater | 12.5 kHz | RepeaterBook bandwidth, owner |
| Scan List | Which scan list starts when you scan on this channel | list of the local zone | None | Your design |
| TX Admit | When the radio lets you transmit | Allow TX | Always | See the critical look in chapter 11 |
| Squelch Level | Squelch threshold 0 to 9 | 3 | 3 | Factory |
| CTC/DCS Encode | The tone you send to open the repeater | uplink tone, for example 131.8 | None | Chapter 6 |
| CTC/DCS Decode | Your speaker only opens with this tone | **None** | None | See the lesson below |
| RX Squelch Mode | When the squelch opens | Carrier/CTC | Carrier/CTC | Factory |
| TX Contact | Who you call when you press PTT | None | 206 Belgie | Talkgroups |
| RX Group List | Which talkgroups you hear | None | RX VL / RX WAL / RX QSY | Chapter 7 |
| Color Code | Colour code of the repeater | (not used) | 1 or 2 | BrandMeister |
| Time Slot | Slot 1 or Slot 2 | (not used) | per channel | BrandMeister static talkgroups |
| DMR ID | Which of your IDs this channel sends | ON3VZ | ON3VZ | 8.1 |
| Encryption | Encryption | off | off | **Forbidden** for radio amateurs |
| Forbid TX | Blocks transmitting | 0 | 0 | 1 only for PMR446 |
| Auto Scan | Starts scanning when you select the channel | 0 | 0 | Off: otherwise the radio jumps away from the channel you just chose |
| Emergency, Lone Work, Man Down | Professional alarm functions | off | off | For amateur emergencies there is TG 206112 |
| APRS fields | Position reporting | off | off | No GPS |
| Scramble | Analogue voice scrambler | None | None | Not allowed for radio amateurs |
| Signaling Type, PTT ID | Selective calling codes sent with every PTT | None / OFF | | DTMF for EchoLink you just key in by hand |
| VOX | Transmit by speaking | off | | You would key up a repeater by accident |
| Direct Dual Mode, Private Confirm, Short Data Confirm | DMR simplex on both slots, delivery confirmations | | off | Not needed on BrandMeister |

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-channel-info-wld.png" alt="Channel Information 1: WLD, 144.675 MHz, Analog, High, 25 kHz, scan list Scan QTH" loading="lazy"><figcaption>Channel Information of channel 1, WLD. With Previous and Next you walk through all channels</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-channel-info-dmr.png" alt="Channel Information of ON0AN 2061: Digital, TX contact 2061 Vlaanderen, RX group RX VL, colour code 1, slot 2" loading="lazy"><figcaption>A DMR channel: ON0AN 2061 on Slot 2, because that is where 2061 is static on ON0AN (screenshot taken before I renamed the DMR ID entry)</figcaption></figure>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/cps-channel-list.png" alt="CPS channel list after import with the columns name, type, frequencies, power, width, tones, colour code, contact, RX group and slot" loading="lazy"><figcaption>Part of the 200 channel list after the import</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: encode yes, decode None</p>
I first filled in the decode tone wherever a source mentioned an output tone. Tempting, because you hear less noise. But if that output tone is wrong, or the repeater changed it, you hear **nothing**, and you do not notice. My home repeater ON0ANR is the example: one source says 131.8 Hz, the club's own news says 67 Hz. So now all 106 FM channels have **Decode None** and only the **Encode** tone. That is exactly how most people run a Yaesu (mode "TONE"). Decode only goes back on per repeater after you have confirmed the output tone yourself with Scan CTCSS (Part 2).
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: Next on the last channel creates empty channels</p>
While correcting channels one by one with **Next**, I clicked past the last channel. The CPS silently created ten new channels "Channel 1" to "Channel 10" on 400.000 MHz, outside the amateur band. Always check the end of the list (and an export) before you write to the radio.
</div>

### 8.7 Public > Scan

| Field | Meaning | My value |
|---|---|---|
| Scan Name | Name, **max 11 characters** | Scan QTH, ScanHasselt... |
| Channel Members | The channels in this list | FM channels of the zone |
| CTC Scan Mode | Stop only on a signal with the right tone, or on any signal | Detection CTC |
| Scan TX Mode | Where you transmit if you press PTT during the scan | Current Channel (the channel where the scan stopped) |
| Hang Time | How long the scan waits after a signal ends | 3.0 s |
| Talkback | Answer on the channel where the scan stopped | on |
| Priority Channel 1/2 | A channel checked more often | None |

<figure class="dm-fig dm-narrow"><img src="/assets/images/dm1801pro/cps-scan-information.png" alt="Scan Information window with available channels, members and settings" loading="lazy"><figcaption>The Scan Information window (double click a scan list): members, CTC scan mode, TX mode, hang time, talkback</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: two CPS quirks with scan lists</p>

1. The **scan import loses names and settings**: the channels came in, the names became blank squares. I typed the names and settings in the Scan Information window by hand (Previous / Next).
2. The **channel import ignores the Scan List column**, even with exact names. So the link from each channel to its scan list must be made by hand: Channel Information > Scan List, then Next. For me 60 channels. After that, **never import channels again**: it wipes these links.
</div>

### 8.8 Public > Zone

| Column | Meaning |
|---|---|
| Zone Name | The name you see when you pick a zone |
| Channel Members | The channels in that zone, in this order |
| Right side: Current Zone A / Channel A, Current Zone B / Channel B | What the radio shows after start up on line A and line B |

My start up: **A = zone QTH Antwerpen, channel ON0AND** (FM) and **B = zone QTH Antwerpen, channel ON0SNW 206** (DMR).

<figure class="dm-fig"><img src="/assets/images/dm1801pro/cps-zones.png" alt="CPS Zone list with 31 zones and the current zone and channel for A and B on the right" loading="lazy"><figcaption>31 zones. On the right: the start channels for A and B (this screenshot still shows ON0AN 206 on B, see chapter 11)</figcaption></figure>

### 8.9 Public > Roaming Channel and Roaming Zone

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What roaming means</p>
With roaming the radio looks through a list of DMR repeaters, finds the one with the strongest signal and switches to it. On the road you keep TG 206 without turning the knob yourself. "One Time Roam" searches once on request; "Auto Roaming" searches again when the repeater is lost. A **roaming zone** is a group of roaming channels, for example per route.
</div>

| Screen | Column | Meaning | My value |
|---|---|---|---|
| Roaming Channel | Channel Name, RX, TX | Repeater name, output, input | 25 BrandMeister repeaters |
| Roaming Channel | Color Code | Colour code of the repeater | 1 or 2 |
| Roaming Channel | Time Slot | In the import file 0 = Slot 1 | Slot 1 (TG 206) |
| Roaming Zone | Zone Name, Channel Members | Group of roaming channels, **max 16** | 7 zones |
| Roaming Zone (right) | Auto Roaming, Roaming Timer [min], Roaming Zone | Automatic search, wait time, active zone | off, 2 min, Roam VL-W |

My roaming zones: **Roam VL-W** (13 repeaters: Antwerp to the west, Waasland, Ghent, the coast), **Roam VL-O** (9: Antwerp to the east, Kempen, Limburg, Eupen), **Roam WAL** (6, Wallonia), **Roam Kust** (9), **Roam Hass** (6), **Roam Malm** (6), **Roam Namen** (4).

<figure class="dm-fig"><img src="/assets/images/dm1801pro/cps-roaming-channel.png" alt="CPS Roaming Channel list with 25 repeaters, frequencies, colour code and slot" loading="lazy"><figcaption>Roaming Channel: 25 BrandMeister repeaters</figcaption></figure>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/cps-roaming-zone.png" alt="CPS Roaming Zone list with seven zones and on the right auto roaming, roaming timer 2 and roaming zone Roam VL-W" loading="lazy"><figcaption>Roaming Zone: seven zones, timer 2 minutes, active zone Roam VL-W</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned</p>
A roaming zone holds **at most 16 channels**: my first "Roam VL" with 19 repeaters was silently cut to 16. I split it in a west and an east zone. And after the import the Roaming Timer showed **255**: set it by hand. I left ON0LEE out of the roaming list because BrandMeister showed no static talkgroups and an old "last seen".
</div>

<h2 id="dm-p1-9">9. Writing to the radio and checking</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. **File > Save** under a new version name (v1, v2, v3...). Never overwrite your factory backup.
2. **Export** each list (Channel, Zone, Scan...) and compare it with what you meant. I checked every export with a small script; by eye works too for a handful of channels.
3. Radio switched on, cable fully in, radio flat on the table.
4. **Program > Write**. Do not touch the radio until the CPS says it is done.
5. Switch the radio off and on. The start screen shows your callsign (Line 2), and lines A and B show your start channels.
6. Check a few channels on the radio itself: name, frequency, and on a DMR channel the talkgroup.
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out</p>
Every change you make on the radio itself (another channel on B, a new channel) is overwritten by the next Write from the CPS. Make permanent changes in the CPS. And if you add channels on the radio, first do **Program > Read** before you change anything in the CPS.
</div>

<h2 id="dm-p1-10">10. The Pi-Star hotspot</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
We connect the Pi-Star hotspot to our wifi and to BrandMeister, with our callsign, DMR ID and a frequency of our own, and test it with the Parrot.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
A hotspot is a mini repeater in your room. Your radio talks to it on 438.100 MHz with a few milliwatts, and the hotspot passes everything over the internet to BrandMeister. From an apartment in the city you often do not reach a DMR repeater; with a hotspot you still have all talkgroups. And it is the perfect test bench: if it works on the hotspot, your DMR ID, colour code and timeslot settings are right, independent of repeater coverage.
</div>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">Which frequency, and why 438.100</p>
The UBA follows the IARU Region 1 bandplan. On 70 cm, **438.025 to 438.175 MHz** is for "digital communication channels" (simplex, just below the repeater outputs that start at 438.200). The factory value 433.550 lies in the FM / DV simplex segment, and 433.450 / 433.500 are calling frequencies: not for a hotspot. I chose **438.100 MHz**. Listen first whether it is free where you live. Use the hotspot only in Belgium if you hold an ON3 licence.
</div>

### 10.1 First start and connecting

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Connect the hotspot to a good 5 V USB supply. Wait 1 to 2 minutes until the display shows it has started.
2. The hotspot does not know your wifi yet, so it starts its **own** wifi network: **pi-star** (password "raspberry" if asked). Connect your PC or phone to it. Your device has no internet for a while: normal. On a phone, choose "stay connected" when it warns about no internet.
3. Open a browser at **http://192.168.50.1** (or http://pi-star.local). You see the Pi-Star **Dashboard**.
4. Click **Configuration**. There is no login page: the **browser** asks for a user name and password as soon as you save something (Apply Changes, Admin, Set Password). User **pi-star**, password **raspberry**.
</div>

### 10.2 The Configuration page, block by block

Change one block, click **Apply Changes under that block**, wait for the page to reload, then the next block.

| Block | Field | Value | What it means |
|---|---|---|---|
| Control Software | Controller Software | MMDVMHost | The software that handles DMR on this modem |
| Control Software | Controller Mode | Simplex Node | One frequency for transmit and receive (a "duplex" hotspot has two) |
| MMDVMHost | DMR Mode | on (all other modes off) | Only DMR |
| MMDVMHost | MMDVM Display Type | OLED Type 3, port /dev/ttyAMA0, layout G4KLX | The small display of my kit |
| General | Hostname | pi-star | Name in your network |
| General | Node Callsign | your callsign | Identification |
| General | CCS7/DMR ID | your DMR ID | From RadioID |
| General | Radio Frequency | 438.100000 MHz | Turns green when the value is accepted |
| General | Latitude / Longitude | rough position (I use the town centre) | Reported to the network; no need for your exact address |
| General | Town / Country / URL | Hoboken / Belgium / your QRZ page | Information for others |
| General | Radio/Modem Type | STM32-DVM / MMDVM_HS - Raspberry Pi Hat (GPIO) | The modem board on the Pi |
| General | Node Type | Private | Only for yourself |
| General | System Time Zone | Europe/Brussels | Correct times in the logs |
| DMR Configuration | DMR Master | **BM_2061_Belgium** | The Belgian BrandMeister server. Factory it said BM_3102_United_States |
| DMR Configuration | Hotspot Security | your SelfCare Hotspot Security password | Proves the hotspot is yours (chapter 4) |
| DMR Configuration | DMR ESSID | None | Only needed if you run several hotspots on one ID |
| DMR Configuration | DMR Colour Code | 1 | Must match the colour code of your hotspot channels in the radio |

<figure class="dm-fig"><img src="/assets/images/dm1801pro/pistar-general.png" alt="Pi-Star General Configuration with callsign, DMR ID, 438.100000 MHz, Hoboken, Belgium, modem type and Europe/Brussels" loading="lazy"><figcaption>General Configuration after my changes</figcaption></figure>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/pistar-dmr.png" alt="Pi-Star DMR Configuration with DMR Master BM_2061_Belgium, hotspot security as dots, ESSID None and colour code 1" loading="lazy"><figcaption>DMR Configuration: master BM_2061_Belgium and the Hotspot Security password</figcaption></figure>

### 10.3 Home wifi, as the very last step

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Scroll to **Wireless Configuration** and click **Configure WiFi**.
2. Set **WiFi Regulatory Domain (Country Code)** to **BE** (factory GB).
3. My kit came with a preset network "m100": click **Delete** next to it.
4. Click **Scan for Networks (10 secs)** and click **Select** next to your home network (2.4 GHz). Several lines with the same name are just several access points of the same network: pick the strongest; the hotspot only stores name and password.
5. Type or paste the wifi password in **PSK**. Avoid " \ $, accents and spaces at the start or end; ! and _ are fine.
6. Click **Save (and connect)**.
7. **Reboot**: menu **Power > Reboot**. Pi-Star only drops its own "pi-star" network when it finds a known wifi **at start up**. Until then the panel keeps saying "Interface is down".
8. Wait 2 to 3 minutes, put your PC back on your home wifi and open **http://pi-star.local** (or look up the IP of "pi-star" in your router).
9. On the road: add your **phone's hotspot** as a second network the same way (Configure WiFi > Scan > Select, or Add Network; on the phone choose 2.4 GHz or "maximise compatibility"). Switch the phone hotspot off at home, or the Pi may pick it and use your mobile data.
</div>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/pistar-wifi.png" alt="Pi-Star Wireless Information: interface is up, signal level -48 dBm, link quality 89 percent, WiFi country BE" loading="lazy"><figcaption>After the reboot: "Interface is up" and WiFi Country BE (addresses blurred)</figcaption></figure>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: replace the default passwords</p>

1. At the bottom of Configuration, block **Remote Access Password**: type a new password twice and click **Set Password**. The browser first asks the **old** login (pi-star / raspberry), then you log in with the new one. It also becomes the password of the "pi-star" SSH account.
2. Block **Auto AP SSID pi-star**: set a **PSK** of at least 8 characters, so the emergency network "pi-star" is no longer open.
3. Note both passwords, separately from your BrandMeister Hotspot Security password. You now have three different passwords: know which is which.
</div>

### 10.4 Checking: the Live Log, not the colours

<figure class="dm-fig"><img src="/assets/images/dm1801pro/pistar-dashboard-echo.png" alt="Pi-Star dashboard for ON3VZ with DMR Net green, 438.100 MHz, TS2 enabled, master BM 2061 Belgium and a Parrot echo in the gateway activity" loading="lazy"><figcaption>The dashboard after the first successful Parrot test: my transmission to 9990 (source RF) and the echo back (source Net)</figcaption></figure>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned: my hotspot looked fine, but was not logged in</p>
The dashboard showed "DMR Net" switching between green and yellow. My radio came in perfectly (Local RF Activity, BER 0.3 %), but I got no echo from the Parrot and I was not in BrandMeister's Last Heard. The answer was in **Admin > Live Logs**: every 10 seconds "DMR, Login to the master has failed, retrying network". The master answered, so internet and master were fine, but it refused the password. Fix: a new Hotspot Security password in SelfCare, **typed** (letters and digits), "Save Password", wait 2 minutes, in Pi-Star clear the field completely (Ctrl+A, Delete), type the same password, Apply Changes. Doubt? **Expert > MMDVMHost > [DMR Network] Password=** shows the stored value in plain text (do not screenshot it). The rule I keep: **the Live Log is the real check, the colour on the dashboard is not.**
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: the Parrot test</p>

1. Put the radio **2 to 3 metres** from the hotspot (closer overloads it: mine first showed S9+46 dB).
2. Choose zone **Hotspot**, channel **HS Parrot BM** (TG 9990, 438.100, TS2, CC1, low power). Check the channel name on the screen before you press PTT: my first "Parrot test" went to TG 206.
3. Press PTT, wait for the talk permit beep, say "ON3VZ test", release.
4. After 1 to 3 seconds you hear yourself back.
5. In Admin > Live Logs you see "received RF voice header from [your ID] to 9990", then "received network voice header from 9990", and your Talker Alias.
</div>

<figure class="dm-fig"><img src="/assets/images/dm1801pro/pistar-live-log.png" alt="Pi-Star live log: RF voice header from 2060971 to 9990, Talker Alias ON3VZ, network voice header from 9990 to 2060971" loading="lazy"><figcaption>The proof: out to 9990, Talker Alias "ON3VZ", and the echo coming back from the network</figcaption></figure>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">Why you hear nothing on TG 206 via the hotspot</p>
A BrandMeister hotspot only passes a talkgroup when it is subscribed. **Dynamic**: you key up on HS 206 yourself, and 206 stays on your hotspot for about 15 minutes after your last transmission. **Static**: on brandmeister.network > your devices > your hotspot (your DMR ID) > static talkgroups, add 206 (and maybe 2061); then it is always on. Do not add too many: a simplex hotspot passes one conversation at a time. And 206 is a calling group: it can be quiet for hours. Check whether there is traffic with the [BrandMeister Hoseline](https://help.brandmeister.network/last-heard-dash/hoseline/) (listen to TG 206 in your browser) or the [BM206 dashboard](http://dashboard.ham-dmr.be/dynamic/lastheard.php).
</div>

<h2 id="dm-p1-11">11. A critical look: validating the result</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
Before trusting the codeplug, I checked it once more against external sources and tried to be critical. This is what came out, as of 29 October 2026.
</div>

**What checks out:** 200 channels, unique names, nothing transmits outside 2 m and 70 cm, all shifts are standard (-0.6, -7.6, +1.6), encryption off everywhere, transmit blocked on PMR446, the 26 DMR repeaters match BrandMeister (frequency, input, colour code, slot of the regional group), 31 zones without missing channels, no duplicate frequencies inside a scan list, the DMR ID name is ON3VZ on every channel.

**What I changed after the review:** decode None on all FM channels (chapter 8.6), and B now starts on **ON0SNW 206** instead of ON0AN 206: ON0AN, my closest DMR repeater, had no BrandMeister traffic for three months (there are reports that Antwerp repeaters moved to another network).

**What is still open, honestly:**

| Point | Why it matters | What I will do |
|---|---|---|
| Seven FM channels that ON0.be lists as digital (for example ON0KVG, ON0BAF on 145.5875, ON0UHF on 145.6375) | You may only hear digital noise | Listen; delete if confirmed |
| Bandwidth: 45 channels on 25 kHz, while ON0.be gives narrow almost everywhere | Wide into a narrow repeater sounds distorted; narrow into a wide repeater only sounds quieter | Ask a contact how I sound; prefer narrow on UHF unless the owner says wide |
| TX Admit is "Always" on the DMR channels | You can key up through a running conversation | Check which options my CPS offers (Channel Free / Color Code) |
| Tone conflicts (ON0ANR 131.8 or 67 Hz, ON0HVL 79.7 or 88.5) | Wrong encode: the repeater does not open | Scan CTCSS on the air |
| Static talkgroups checked on 26 October | They change | Check live again before trusting a repeater |
| OpenDMR Belgium | Some Antwerp repeaters reportedly moved there, but its website no longer resolves | Ask the repeater owners; not in the codeplug until there is a reliable source |

All tests on the air (repeaters, roaming, scanning) come at the end, when I am in range. I will update this post with the results.

<h2 id="dm-p1-12">12. Downloads and sources</h2>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Use at your own risk</p>
These are the CSV exports of my own codeplug (29 October 2026), as a starting point and for comparison. Repeater data changes: check every repeater you use. Put your own DMR ID in Digital > DMR ID and name the entry as in the "DMR ID" column, or change that column. Only transmit where your licence allows it.
</div>

- [ON3VZ DM-1801 Pro codeplug, CSV files (zip)](/assets/files/dm1801pro-codeplug-csv-2026-10.zip): channel, talkgroups, rx_group, scan, zone, roaming_channel, roaming_zone, plus a README with the import order and the known CPS quirks.

**Sources and further reading**

- [Baofeng DM-1801 Pro](https://www.baofengradio.com/products/dm-1801-pro), [Baofeng download area (CPS, driver)](https://www.baofengradio.com/pages/download), [user manual PDF](https://baofeng.s3.amazonaws.com/Baofeng_DM-1801_Pro_User_Manual_EN_20260916.pdf)
- [RadioID.net](https://radioid.net)
- [BrandMeister](https://brandmeister.network), help pages: [Register for an account](https://help.brandmeister.network/dashboard/register-for-an-account), [Hotspot Security](https://help.brandmeister.network/dashboard/hotspot-security/), [Connecting hotspots](https://help.brandmeister.network/hotspots/connecting-hotspots/), [Hotspot connection issues](https://help.brandmeister.network/hotspots/common-connection-issues/), [Hoseline](https://help.brandmeister.network/last-heard-dash/hoseline/)
- [BrandMeister wiki: Belgium](https://wiki.brandmeister.network/index.php/Belgium), [HAM-DMR.be](https://www.ham-dmr.be/)
- [Pi-Star](https://www.pistar.uk) and [Pi-Star downloads](https://www.pistar.uk/downloads/)
- [RepeaterBook Belgium](https://www.repeaterbook.com/row_repeaters/index.php?state_id=BE), [ON0.be Station Registry](https://on0.be/), [UBA unmanned stations](https://www.uba.be/en/node/2057), [UBA bandplan](https://www.uba.be/nl/v-u-shf/bandplan)
- [SvxLink network Belgium](https://portal.be.svx.link/), [CQ Belgie](https://www.cqbelgie.be)
- My earlier post: [Ones, Zeros and a Human Voice: Patrick ON4PN on Digital Voice at WLD]({% post_url 2026-10-10-digital-voice-modes-on4pn-wld %})

**Next: [Part 2, using the DM-1801 Pro day to day]({% post_url 2026-10-29-dm1801pro-part-2-daily-use %})**: keys, zones, A and B, scanning, FM and DMR QSOs, QSY, roaming, EchoLink and the hotspot, each with a step plan.

73, Kristof ON3VZ

</div>
