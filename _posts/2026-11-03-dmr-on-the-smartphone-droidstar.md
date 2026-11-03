---
layout: post
title: "DMR on My Smartphone: DroidStar on BrandMeister (Part 3)"
tags: ['DMR', 'BrandMeister', 'DroidStar', 'Android', 'Hotspot', 'Talkgroups', 'Beginners']
excerpt: "The third way onto BrandMeister: no radio, no hotspot, just an Android phone and the DroidStar app. Which app to install, every setting explained, the echo test that only works as a private call, why the app shows up as a second device on BrandMeister, and what happened when I tried my Bluetooth speaker mic."
---
<!-- DROIDSTAR-PART3 2026-11-03: new post. Revert by deleting this file and the folder assets/images/droidstar/ -->
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

<p class="dm-kicker">ON3VZ · DMR for beginners · Part 3: DMR on the phone</p>
<p class="dm-lead">My DM-1801 Pro and my hotspot work. In the infographic of Part 1 there was a third way onto the network: an app. No radio, no hotspot, only the phone, the same DMR ID and a few minutes of settings. This is how I set it up, including the two mistakes I made on the way.</p>
<p class="dm-byline">ON3VZ Kristof Cornelis · November 2026</p>

This post builds on [Part 1]({% post_url 2026-10-29-dm1801pro-part-1-setup %}) (DMR ID, BrandMeister account, hotspot) and [Part 2]({% post_url 2026-10-29-dm1801pro-part-2-daily-use %}) (using the radio). You do not need a DMR radio to follow it, but you do need a DMR ID and a BrandMeister account with a Hotspot Security password. The same coloured boxes as before:

<div class="dm-legend"><span class="l-what">Situation</span><span class="l-why">Why</span><span class="l-mean">What it means</span><span class="l-steps">Step plan</span><span class="l-warn">Watch out</span></div>

Where something is marked **(to be tested)** I have not yet confirmed it on the air; I will update the post.

<div class="dm-toc" markdown="1">
**Contents**

1. [Why an app?](#ds-1)
2. [What you need](#ds-2)
3. [Which app: DroidStar](#ds-3)
4. [Installing it](#ds-4)
5. [The five tabs](#ds-5)
6. [Settings: what goes where](#ds-6)
7. [Main: mode, host and talkgroup](#ds-7)
8. [Connecting and checking](#ds-8)
9. [The echo test: a private call](#ds-9)
10. [The app is a second device on BrandMeister](#ds-10)
11. [The first call on 2061](#ds-11)
12. [Bluetooth and my Abbree speaker mic](#ds-12)
13. [Other networks](#ds-13)
14. [When it does not work](#ds-14)
15. [Sources](#ds-15)
</div>

<h2 id="ds-1">1. Why an app?</h2>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
A repeater or hotspot is not always in reach: on the road, abroad, at work, or simply when the radio is at home. With an app the phone connects over wifi or mobile data straight to a BrandMeister master, exactly like my hotspot does, and the phone itself is the microphone and the speaker. It is also the cheapest way to try DMR before buying anything.
</div>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
Your voice does not leave the phone by radio, but it does come out by radio elsewhere. A call on talkgroup 206 or 2061 is heard on every repeater and hotspot that carries that talkgroup. So the same habits apply as with a radio: listen first, keep calling groups short, give your callsign. DroidStar itself states that a valid amateur licence is required, and BrandMeister only lets you in with your own DMR ID and Hotspot Security password.
</div>

<h2 id="ds-2">2. What you need</h2>

| What | Where | Note |
|---|---|---|
| A DMR ID | [RadioID.net](https://radioid.net) | Mine is 2060971. See [Part 1, chapter 3]({% post_url 2026-10-29-dm1801pro-part-1-setup %}#dm-p1-3) |
| A BrandMeister account | [brandmeister.network](https://brandmeister.network) | Same e-mail address as RadioID |
| A Hotspot Security password | BrandMeister > SelfCare | Letters and digits only, see [Part 1, chapter 4]({% post_url 2026-10-29-dm1801pro-part-1-setup %}#dm-p1-4). The app logs in with it, just like a hotspot |
| An Android phone | | The Play Store listing asks for Android 9 or later. Mine is a OnePlus |
| Internet | Wifi or mobile data | |

On an iPhone there is no App Store version. The developer explains on the project page how to install it by sideloading. I have not tried that.

<h2 id="ds-3">3. Which app: DroidStar</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">Situation</p>
DroidStar is an open source client by Doug McLain AD8DP. It connects to DMR servers such as BrandMeister, and also to M17, Fusion, D-STAR, P25, NXDN and AllStar. It has a built-in software vocoder, so no extra USB stick is needed.
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out: older guides</p>
A Belgian guide I found (ON3BSQ, version 2024c) says that the developer no longer makes builds and points to an alternative APK on GitHub, installed by hand. The project page itself indeed says there are **no builds on GitHub**, only source code. But in November 2026 the **Play Store** has DroidStar by Doug McLain, last updated on 30 October 2026, and the About screen inside the app names him as the author. So I simply used the Play Store version. The project page also says the software comes **as-is, without support**.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-play-store.jpg" alt="Google Play Store page of DroidStar by Doug McLain, 100K+ downloads, last updated 30 October 2026" loading="lazy"><figcaption>DroidStar in the Play Store, developer Doug McLain</figcaption></figure>

<h2 id="ds-4">4. Installing it</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Open the **Play Store**, search for **DroidStar** and check that the developer is **Doug McLain**. Tap **Install**, then **Open**.
2. When Android asks for the microphone, choose **Allow while using the app**. Without it you can listen, but not transmit.
3. Tap the **Log** tab once. On the first start the app downloads its host lists and the DMR ID database. You see lines like "Updated DMRHosts.txt" and "Updated DMRIDs.dat". Nothing to do there.
4. Android **Settings > Apps > DroidStar > Permissions**. Check that **Microphone** is allowed (marker 1) and switch off **Manage app if unused** (marker 2, on my phone "App beheren indien ongebruikt"). Otherwise Android may take the microphone permission away again after a few weeks without use.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-log-first-start.jpg" alt="DroidStar Log tab on first start: Updated P25Hosts.txt, NXDNHosts.txt, DMRHosts.txt, YSFHosts.txt, M17Hosts-full.csv, DMRIDs.dat" loading="lazy"><figcaption>Step 3: the Log tab on the first start. The app fetched its server lists by itself</figcaption></figure>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-permissions.jpg" alt="Android app permissions of DroidStar: Microphone allowed (marker 1) and the switch Manage app if unused (marker 2)" loading="lazy"><figcaption>Step 4: microphone allowed (1), and switch off "Manage app if unused" (2)</figcaption></figure>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-about.jpg" alt="DroidStar About tab: Git build 81f2c69, platform android, Qt 6.12.0, arm64, copyright 2019-2026 Doug McLain AD8DP, GPL version 2" loading="lazy"><figcaption>The About tab: the version I used and the author</figcaption></figure>

<h2 id="ds-5">5. The five tabs</h2>

| Tab | What you do there |
|---|---|
| **Main** | Choose the mode, the server and the talkgroup, connect, and the big **TX** button |
| **Settings** | Your callsign, DMR ID, password and audio devices. Filled in once |
| **Log** | What the app does: connecting, received and transmitted calls. Your first stop when something fails |
| **Hosts** | Only for your own servers. Leave it empty |
| **About** | Version and author |

<h2 id="ds-6">6. Settings: what goes where</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">What we do</p>
The Settings tab is one long page. For BrandMeister you fill in eight things; everything else stays as it is. The numbers below match the red markers in the screenshots. Tap a field, type, and tap Enter on the keyboard. There is no save button: the values are kept.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: the Settings tab</p>

1. **Callsign:** your callsign, for me ON3VZ.
2. **DMRID:** your 7 digit DMR ID, for me 2060971.
3. **ESSID:** tap the drop-down (it says "None") and choose **01**. Why: see the box below.
4. **BM Pass:** your Hotspot Security password from BrandMeister SelfCare. **Type** it, exactly, and check that there is no space at the end. The field shows dots.
5. **Latitude** and **Longitude:** leave both on **0**. These values are sent to BrandMeister; with 0 your exact position stays private.
6. **Location:** your Maidenhead locator, for me JO21EE. Coarse enough.
7. **TX Timeout:** 300 (already filled in). A transmission stops after 5 minutes at most.
8. Scroll down: **Enable TX toggle mode** on (it was already ticked for me). Then you tap TX once to talk and once to stop, instead of keeping your finger on the screen.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-settings.jpg" alt="DroidStar Settings tab with red markers: 1 Callsign ON3VZ, 2 DMRID 2060971, 3 ESSID 01, 4 BM Pass blurred, 5 Latitude and Longitude 0, 6 Location JO21EE, 7 TX Timeout 300" loading="lazy"><figcaption>Markers 1 to 7 on the Settings tab. The password field is blurred</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/droidstar/droidstar-settings-toggle.jpg" alt="Lower part of the Settings tab with marker 8 on Enable TX toggle mode, ticked" loading="lazy"><figcaption>Marker 8, further down: Enable TX toggle mode</figcaption></figure>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why ESSID 01</p>
My hotspot already logs in to BrandMeister with my DMR ID 2060971. If the app used the same number, the two would push each other off the network. With ESSID 01 the app logs in as **206097101**: my ID plus two digits. Every extra device gets its own number (01, 02, 03 and so on). On the air you remain 2060971 and ON3VZ.
</div>

**What you leave alone**, so you do not have to wonder:

| Field | Leave on | Why |
|---|---|---|
| Vocoder, Modem | Software vocoder, None | Only change with an AMBE USB stick or an MMDVM board on the phone |
| Playback, Capture | OS Default | Phone speaker and microphone. Bluetooth: see [chapter 12](#ds-12) |
| TGIF Pass, ADN Pass, ASL Pass | empty | Other networks, see [chapter 13](#ds-13) |
| Description, DMR+ Opts | empty | |
| URL | optional | I put my website there |
| SoftwareID, PackageID | as they are | Only a label in BrandMeister, see [chapter 10](#ds-10) |
| MYCALL, URCALL, RPTR1, RPTR2, USRTXT | as they are | D-STAR only. The app fills some of them itself |
| Everything from RX Freq downwards | as it is | Settings for an MMDVM modem |

<h2 id="ds-7">7. Main: mode, host and talkgroup</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: the Main tab</p>

1. **Mode:** tap the first drop-down ("Mode...") and choose **DMR**. Two more drop-downs appear: slot **S2** and colour code **CC1**. Leave them; a hotspot also works on timeslot 2.
2. **Host:** tap "Host..." and choose **BM_2061_Belgium**, the Belgian BrandMeister master. The list only appears after step 1.
3. **Private:** leave it **unticked** for now. It is only for the echo test ([chapter 9](#ds-9)).
4. **TGID:** the talkgroup you transmit to. Type **9990** for the first test.
5. **AGC:** tick it (automatic level control on the receive audio). SWTX and SWRX: leave them, the app ticks them itself when it connects.
6. **Mic:** the slider for your microphone level. My echo test worked at 50. The Belgian guide suggests 90; adjust after the echo test.
7. **Connect:** do not tap it yet, that is the next chapter.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-main-setup.jpg" alt="DroidStar Main tab with red markers: 1 DMR, 2 BM_2061_Belgium, 3 Private, 4 TGID 9990, 5 AGC, 6 Mic slider, 7 Connect" loading="lazy"><figcaption>Markers 1 to 7 on the Main tab, ready to connect</figcaption></figure>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
"No AMBE hardware connected" and "No MMDVM connected" at the bottom of the Main tab are normal. They only say that no extra hardware is plugged in; the software vocoder does the work.
</div>

<h2 id="ds-8">8. Connecting and checking</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. On the Main tab, tap **Connect**. The button changes to **Disconnect** (marker 1).
2. At the bottom, "Not Connected to network" becomes **Connected ping cnt** with a counter that keeps going up (marker 2). That counter is the regular contact with the server.
3. Android shows a notification: "Connected to DMR BM_2061_Belgium".
4. Tap the **Log** tab: you see "Connected to DMR BM_2061_Belgium" and "Software vocoder loaded".
5. Extra check on BrandMeister, see [chapter 10](#ds-10): under Device Logs, "Repeater 206097101 ... verified". Your password was accepted.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-main-connected.jpg" alt="DroidStar Main tab connected: marker 1 on the Disconnect button, marker 2 on Connected ping cnt 7" loading="lazy"><figcaption>Connected: the button says Disconnect (1) and the ping counter runs (2)</figcaption></figure>

<figure class="dm-fig dm-narrow"><img src="/assets/images/droidstar/droidstar-connected-notification.jpg" alt="Android notification: DroidStar connected to DMR BM_2061_Belgium 2061.master.brandmeister.network port 62031" loading="lazy"><figcaption>Step 3: the Android notification confirms the connection</figcaption></figure>

<h2 id="ds-9">9. The echo test: a private call</h2>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Lesson learned</p>
My first echo test gave nothing back. I had put 9990 in the TGID field as a normal talkgroup. On BrandMeister the Parrot only answers a **private call** to 9990; a group call is ignored. In DroidStar that is the **Private** checkbox next to the host. Worse: without it, my log showed a call from another station to 9990. With a group call you hear other people's Parrot tests, but never your own echo.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: the echo test</p>

1. Main tab, connected. Tick **Private** (marker 1).
2. Check that TGID is **9990** (marker 2).
3. Tap the blue **TX** button once (marker 4). It turns red and counts the seconds.
4. Say "ON3VZ test, one two three" and tap TX again to stop.
5. After a few seconds you hear yourself back through the phone speaker.
6. Look at **GWID** (marker 3): 206097101, my ID plus ESSID 01. That is the number BrandMeister knows the app by.
7. Untick **Private** again before you go to a normal talkgroup. With Private on, a call to 2061 is a private call to number 2061, not a call on the talkgroup.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-parrot-tx.jpg" alt="DroidStar transmitting to the Parrot: marker 1 Private ticked, 2 TGID 9990, 3 GWID 206097101, 4 red TX button counting" loading="lazy"><figcaption>Transmitting to the Parrot: Private on (1), 9990 (2), GWID (3), TX running (4)</figcaption></figure>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">How to read the log</p>
"DMR RX started id: srcid: 9990 dstid: 2060971" means: the Parrot (9990) is sending something to me (2060971). That is the echo, about five seconds in my case. The callsign line on the Main tab shows "ON3VZ Kristof": that is my Talker Alias from SelfCare.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-log-echo.jpg" alt="DroidStar log: connected to BM_2061_Belgium, software vocoder loaded, and the echo from 9990 to 2060971 at 07:28" loading="lazy"><figcaption>The log: connection, then the echo coming back from 9990. The grey lines are another station's call, made unreadable</figcaption></figure>

<h2 id="ds-10">10. The app is a second device on BrandMeister</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">Situation</p>
After the first connection, BrandMeister lists the app under **My Devices** as a new device: **206097101**, next to my hotspot 2060971. I did not have to create anything.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: check the device and give it statics</p>

1. On [brandmeister.network](https://brandmeister.network), left menu, at the bottom under SYSOPDASHBOARD: **My Devices**.
2. Under **Device Logs**: "Repeater 206097101 ... verified" (marker 1). The app logged in with your password.
3. Under **DMR Devices**: the new row **206097101** (marker 2), below your hotspot.
4. On that row, click the blue **Bewerken** (Edit) (marker 3). Not Weergeven (View).
5. Scroll down to **Statische gespreksgroep** (Static talkgroup). Type **206** in the white field (marker 1 in the second picture) and click the arrow **→** (marker 2). Do the same with **2061**.
6. Both appear in the box on the right (marker 3). Refresh the page (F5): if they are still there, they are saved. There is no save button for this block.
7. Leave the rest alone, especially the yellow buttons and the red **Delete device**.
</div>

<figure class="dm-fig"><img src="/assets/images/droidstar/bm-my-devices-droidstar.png" alt="BrandMeister My Devices with markers: 1 device log 206097101 verified, 2 the new device row 206097101, 3 the Bewerken button" loading="lazy"><figcaption>Steps 2 to 4: verified (1), the new device (2), Bewerken (3)</figcaption></figure>

<figure class="dm-fig"><img src="/assets/images/droidstar/bm-static-droidstar.png" alt="BrandMeister device 206097101, block Statische gespreksgroep with markers: 1 input field, 2 arrow button, 3 list with Belgium North (2061) and Belgium (206)" loading="lazy"><figcaption>Steps 5 and 6: type the number (1), arrow (2), and the result (3)</figcaption></figure>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
**Hardware, software and frequency are not real.** For 206097101 BrandMeister shows a hotspot board, a software version and 438.8000 MHz. A phone has none of these. They are the **PackageID**, **SoftwareID** and **RX Freq** fields from the Settings tab, which DroidStar sends when it logs in (I checked this in the DroidStar source code).

**Static talkgroups are per device.** The new device started empty: the statics 206 and 2061 on my hotspot did not apply to the app. Without statics you only hear a talkgroup after you key up on it yourself; it then stays on for about 15 minutes.
</div>

<h2 id="ds-11">11. The first call on 2061 (to be tested)</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Settings: Playback and Capture on **OS Default**.
2. Main: **Private unticked** (marker 1) and TGID **2061** (marker 2). Tap **Connect**.
3. Listen for a minute. With the statics you hear traffic on 206 and 2061 straight away. Check activity with the Last Heard filter from [Part 1]({% post_url 2026-10-29-dm1801pro-part-1-setup %}).
4. Tap **TX** once (marker 3), say "CQ Belgium, ON3VZ listening on 2061", tap again.
5. Wait at least 5 seconds. Contact made: keep it short and move together to a QSY talkgroup (2064 to 2069), as in [Part 2, chapter 16]({% post_url 2026-10-29-dm1801pro-part-2-daily-use %}#dm-p2-16).
6. In BrandMeister Last Heard you see your call with 206097101 as the device.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/droidstar-main-2061.jpg" alt="DroidStar Main tab ready for 2061: marker 1 Private unticked, 2 TGID 2061, 3 TX button" loading="lazy"><figcaption>Ready for a normal call: Private off (1), 2061 (2), TX (3)</figcaption></figure>

<h2 id="ds-12">12. Bluetooth and my Abbree speaker mic</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">Situation</p>
I have an ABBREE wireless speaker microphone with a 2-pin K-plug Bluetooth adapter, made for handhelds like the DM-1801 Pro. The seller says it also pairs with phones. My idea: phone in the pocket, Abbree on the jacket, PTT on the mic.
</div>

In DroidStar, **Playback** and **Capture** each offer three choices: **OS Default**, **Bluetooth** and **Built in microphone**.

<figure class="dm-fig dm-narrow"><img src="/assets/images/droidstar/droidstar-audio-choice.jpg" alt="DroidStar Settings, Playback drop-down with OS Default, Bluetooth and Built in microphone" loading="lazy"><figcaption>The audio choices in DroidStar</figcaption></figure>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: what I did</p>

1. Switch the K-plug adapter **off** (its own power button) and take it out of the radio. Otherwise the mic connects to the adapter instead of the phone.
2. Pair the Abbree with the phone: Android **Settings > Bluetooth > Pair new device**, choose "abbree".
3. Tap the gear next to "abbree" and check that **Media audio** (marker 1) and **Phone calls** (marker 2) are both on. The second one carries the microphone.
4. In DroidStar, Settings: **Playback** on **Bluetooth**, then Disconnect and Connect on the Main tab.
</div>

<figure class="dm-fig dm-phone"><img src="/assets/images/droidstar/abbree-bluetooth-phone.jpg" alt="Android Bluetooth settings for the paired abbree: marker 1 Media audio on, marker 2 Phone calls on; MAC address blurred" loading="lazy"><figcaption>Step 3: media audio (1) and phone calls (2) on. The MAC address is blurred</figcaption></figure>

| What I tried | Result |
|---|---|
| Pair the Abbree with the phone, media audio and phone calls on | Works |
| DroidStar on OS Default, Abbree connected | The echo came out of the phone, not the Abbree |
| Playback on **Bluetooth** | Sound comes out of the Abbree |
| **PTT** on the Abbree | Does **not** key the TX button in DroidStar |
| Capture on Bluetooth (the Abbree as microphone) | Not fully tested |

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
The Abbree works as an ordinary Bluetooth speaker for the app, but its PTT button is meant for the adapter in a radio. The Abbree manual itself warns that the PTT may not control phone apps. Without PTT the whole point (phone in the pocket) is gone, so I stopped here. The Abbree stays on the DM-1801 Pro, and on the phone I use the phone itself.
</div>

<h2 id="ds-13">13. Other networks</h2>

The Settings tab also has a **TGIF Pass**. TGIF is a separate DMR network with its own registration on the TGIF dashboard and its own 16 character Hotspot Security Key. In DroidStar you choose the host TGIF_Network; there is a Belgian talkgroup 20621 (Belgium Westhoek), according to the ON3BSQ guide "TGIF voor beginners" (2026). I have not tried it yet. Remember that every network has its own numbering: talkgroup numbers do not carry over from BrandMeister.

<h2 id="ds-14">14. When it does not work</h2>

| What you notice | Likely cause | What to do |
|---|---|---|
| Stays on "Not Connected" | Wrong BM Pass, or a space typed after it | Type the password again. Check Device Logs in My Devices on BrandMeister |
| Connected, but no echo | 9990 sent as a group call | Tick **Private** |
| You hear other people's Parrot tests | Same: Private not ticked | Tick **Private** |
| Echo is silent | Phone media volume at zero | Press volume up while DroidStar is open |
| Sound from the phone although a Bluetooth device is connected | Playback on OS Default | Playback on **Bluetooth** |
| Nothing on 2061 | No static for 206097101, or simply quiet | Statics in My Devices (chapter 10), or key up on 2061 |
| Your call went to the wrong place | Private still ticked after the echo test | Untick **Private** |
| The hotspot drops when the app connects | Same number for both | ESSID **01** in the app |

<h2 id="ds-15">15. Sources</h2>

- DroidStar project page and README by Doug McLain AD8DP: [github.com/nostar/DroidStar](https://github.com/nostar/DroidStar)
- ON3BSQ, "Hoe DroidStar installeren op uw PC of Smartphone" (version 2024c) and the newer version 2026a on the [UBA KSD site](https://ksd.uba.be/rc_images/hoe_droidstar_installeren_op_uw_android_smartphone__versie_2026a_.pdf)
- ON3BSQ, "TGIF voor Beginners" (13 February 2026)
- BrandMeister wiki on the Parrot as a private call to 9990: [wiki.brandmeister.network](https://wiki.brandmeister.network/index.php/WorldWide)
- My own [Part 1]({% post_url 2026-10-29-dm1801pro-part-1-setup %}) and [Part 2]({% post_url 2026-10-29-dm1801pro-part-2-daily-use %})

Phone, password and DMR ID: that is all it takes to be on BrandMeister from anywhere with internet. Questions or corrections are very welcome via the [contact page](/contact/).

73, Kristof ON3VZ

</div>
