---
layout: post
title: "Using a Baofeng DM-1801 Pro Day to Day: FM, DMR, Zones, Scanning and the Hotspot (Part 2)"
tags: ['DMR', 'FM', 'Baofeng', 'DM-1801 Pro', 'BrandMeister', 'Talkgroups', 'Roaming', 'EchoLink', 'Hotspot', 'Beginners']
excerpt: "The radio is programmed, now what? A practical guide for someone who knows nothing about DMR: the keys and the screen, A and B, dual watch, zones, scanning, an FM QSO, a DMR call, who hears what, QSY, roaming, DTMF for EchoLink and using the hotspot. Always a situation, then a step plan with the exact keys and menus."
---
<!-- DM1801PRO-PART2 2026-10-29: new post. Revert by deleting this file (images are shared with part 1 in assets/images/dm1801pro/) -->
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

<p class="dm-kicker">ON3VZ · DMR for beginners · Part 2 of 2: using it</p>
<p class="dm-lead">In Part 1 I built the codeplug. This part is the user guide I wished I had: what each key does, what the screen tells you, and for every everyday situation a step plan with the exact keys and menus.</p>
<p class="dm-byline">ON3VZ Kristof Cornelis · October 2026</p>

This guide follows my own codeplug from [Part 1]({% post_url 2026-10-29-dm1801pro-part-1-setup %}): zones per place and per route, three channels per DMR repeater (206, regional, QSY), hotspot channels on 438.100 MHz, and my key setting. If you programmed your radio differently, the principles are the same, only the names differ. Chapter numbers like "manual 6.2.4" refer to the [Baofeng DM-1801 Pro user manual](https://baofeng.s3.amazonaws.com/Baofeng_DM-1801_Pro_User_Manual_EN_20260916.pdf).

The same coloured boxes as in Part 1:

<div class="dm-legend"><span class="l-what">Situation</span><span class="l-why">Why</span><span class="l-mean">What it means</span><span class="l-steps">Step plan</span><span class="l-warn">Watch out</span></div>

Where something is marked **(to be tested)** I have not yet confirmed it on the air; I will update the post.

<div class="dm-toc" markdown="1">
**Contents**

1. [The keys and what I put on them](#dm-p2-1)
2. [The screen and the LED](#dm-p2-2)
3. [A and B: two channels, one main channel](#dm-p2-3)
4. [Changing channel and zone](#dm-p2-4)
5. [Which zone in which situation](#dm-p2-5)
6. [An FM repeater QSO](#dm-p2-6)
7. [Scanning](#dm-p2-7)
8. [DMR in plain words: who hears what](#dm-p2-8)
9. [A DMR call: calling, answering, closing](#dm-p2-9)
10. [QSY on DMR](#dm-p2-10)
11. [Other ways to pick a talkgroup, private calls and the Parrot](#dm-p2-11)
12. [Roaming on the road](#dm-p2-12)
13. [Using the hotspot](#dm-p2-13)
14. [DTMF: EchoLink and SvxLink](#dm-p2-14)
15. [Useful extras, each with a step plan](#dm-p2-15)
16. [Good habits on Belgian DMR](#dm-p2-16)
17. [When it does not work](#dm-p2-17)
</div>

<h2 id="dm-p2-1">1. The keys and what I put on them</h2>

| Key | Short press | Long press |
|---|---|---|
| **PTT** (big side key) | Transmit while held | |
| **SK1** (side key above or below PTT) | Display Mode: cycles Single Mode, Double Wait, Single Wait | Switch Main Channel (A or B) |
| **SK2** (second side key) | Monitor: open the squelch | TBST Send: 1750 Hz tone burst |
| **TK** (orange top key) | Scan on / off | Zone Up: next zone |
| **Channel knob** (top) | Next / previous channel in the zone | |
| **Volume knob** (top) | On / off and volume | |
| **[MENU]** | Open the menu, confirm | |
| **[BACK]** | Back one level, exit the menu, delete a character | Switch between channel mode (MR) and frequency mode (VFO) |
| **[▲] / [▼]** | Channel up / down; move in menus | |
| **[A/B]** | Make the other line the main channel | |
| **[VFO/MR]** | Switch between channel mode and frequency mode | |
| **[#]** | Digital channel: manual dial (and in there toggle group / private call). Analogue channel: DTMF dial window | |
| **[*]** | | Lock the keypad (unlock: [MENU] then [*]) |
| **0 to 9** | Type numbers; DTMF digits while transmitting | |

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why these choices</p>
**SK1** handles the two lines, because I listen on FM and DMR at the same time. **SK2 short = Monitor** is the key you use most: to check a channel is free and to find out whether a repeater sends a tone. **SK2 long = 1750 Hz** for the handful of repeaters that need it. **TK short = Scan** and **TK long = Zone Up**, because those are the two things you do most often on the road. The setup is in Part 1, chapter 8.3. Pick what suits you: someone who never goes to Wallonia does not need the tone burst.
</div>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">Moving through the menu</p>
[MENU] opens the menu and confirms, [▲]/[▼] move, [BACK] goes one level back, and **PTT leaves the menu at once**. You can also jump with numbers: [MENU], then the number of the menu item (manual "Menu Quick Use").
</div>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">Short and long</p>
A long press is 2 seconds (I set "Long Press Time" to 2 in the CPS). Hold the key until you hear or see the reaction.
</div>

<h2 id="dm-p2-2">2. The screen and the LED</h2>

The screen shows two lines, **A (top) and B (bottom)**, each with a channel name. In my codeplug after start up: **A = ON0AND** (FM, Antwerp) and **B = ON0SNW 206** (DMR, talkgroup 206 via Sint-Niklaas).

| What you see | Meaning |
|---|---|
| The small marker in front of a line | That line is the **main channel**: PTT transmits there |
| Icon "analogue" / "digital" / mixed in front of a channel | FM channel, DMR channel, or a mixed channel (manual 3.3) |
| **DW** | Double Wait (dual watch) is on: you hear both lines |
| **H / M / L** | Transmit power High / Middle / Low |
| **CT** / **DCS** | A CTCSS / DCS tone is set on this FM channel |
| **N** | Narrow FM (12.5 kHz) |
| **+ / -** | Shift direction (repeater channel) |
| **VFO** | You are in frequency mode, not channel mode. [VFO/MR] brings you back |
| Signal bars, battery | Received signal strength, battery level |
| Monitor icon | Monitor (SK2 short) is open |
| Scan icon | The radio is scanning |
| Arrows with a call | Digital: incoming call / outgoing call. The screen shows the ID, name or talkgroup |

| LED on top | Meaning |
|---|---|
| Red | Transmitting |
| Green | Receiving |
| Orange, slowly blinking | Scanning |

On an incoming DMR call the screen shows who is speaking (callsign or ID, name if known) and on which talkgroup. That information comes from the other station's Talker Alias and the network.

<h2 id="dm-p2-3">3. A and B: two channels, one main channel</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
The radio can **listen** on A and B at the same time (Double Wait), but it always **transmits** on one: the main channel. There are three display modes, cycled with **SK1 short**:

| Mode | What you see | What you hear | When |
|---|---|---|---|
| Double Wait | A and B, DW icon | Both lines | At home: follow the FM repeater and TG 206 at the same time |
| Single Wait | A and B, no DW icon | Only the main channel | You want to see B but not hear it (a busy talkgroup, briefly) |
| Single Mode | Only the main channel, large | Only the main channel | One channel, a calm screen |
</div>

<div class="dm-box" markdown="1">
<p class="dm-box-label">Situation</p>
You are on Double Wait, A (ON0AND) is the main channel, and someone calls on B (ON0SNW 206).
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: answer on B</p>

1. You hear the call on B. If you press PTT now, you transmit on **A**. Do not.
2. Press **[A/B]** (or SK1 long). The marker jumps to B: B is now the main channel.
3. Press PTT and answer. Within the Call Hold Time (5 s) after the other station stops, PTT answers on **their** talkgroup.
4. After the QSO: **[A/B]** again to make A the main channel.
5. Habit: **look at the marker before every PTT.**
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out (to be tested)</p>
After a signal on B the radio stays on B for the Dual Watch Hang Time (500 ms). Whether PTT within that half second already transmits on B, I still have to confirm. Do not count on it: use [A/B].
</div>

<div class="dm-box" markdown="1">
<p class="dm-box-label">Situation: listen on A and B, recognise the line, then hear only that one</p>
You want to monitor two signals (for example the FM repeater on A and TG 206 on B). When something comes in, you first want to know **on which line**, then hear only that line, and if it is B, answer there.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why it is confusing</p>
In Double Wait the radio jumps to the line that receives, but only while the signal lasts. After the Dual Watch Hang Time (500 ms) it falls back to the main channel. If the other station has already stopped when you press [A/B], you end up on the wrong line. So: look and press **while the signal is still active**.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: listen on two, recognise, narrow down, answer</p>

1. Press **SK1 short** until the **DW** icon shows and both A and B are visible. Now you hear both lines. (Menu alternative: [MENU] > Settings > Radio Settings > Display Func > Dual Watch.)
2. Wait for a signal. Recognise the line by: the **green LED**, the **signal bars** on that line only, and for DMR the **callsign or ID and talkgroup** on that line. The main channel marker may also jump to it.
3. Is it on **A**? Nothing to switch: PTT already answers on A.
4. Is it on **B** and you want to answer? Press **[A/B]** (or SK1 long) while the signal is still active. B is now the main channel and PTT transmits on B.
5. To hear **only this line** from now on: press **SK1 short** until the DW icon disappears (Single Wait: both shown, only the main channel heard). Press again for Single Mode (only the main channel shown).
6. When finished: **SK1 short** back to Double Wait, and **[A/B]** to make A the main channel again.
7. Habit: **look at the marker before every PTT.**
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Tip and watch out (to be tested)</p>
If the radio falls back too fast for you, raise **Dual Watch Hang Time** in the CPS under Option Feature > Work Mode (try 2 to 3 seconds, if the list allows it) and write it back. The order in which SK1 cycles through the three modes, and whether PTT inside the hang time already transmits on B, I still have to confirm on the radio.
</div>

<h2 id="dm-p2-4">4. Changing channel and zone</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: change channel</p>

1. Make the line you want to change the main channel ([A/B]).
2. Turn the **channel knob**, or press **[▲] / [▼]**. You move through the channels of the current zone of that line.
3. Do you see "VFO" on the screen? Press **[VFO/MR]** to return to channel mode.
4. Or key in the channel number (to be tested: I expect the number is the position inside the zone).
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: change zone</p>

Quick: **TK long** (Zone Up) until you see the zone name. Via the menu (manual, "Select a zone"):

1. Make the right line the main channel first ([A/B]). The zone changes for the main channel.
2. **[MENU] > Zone**, [MENU].
3. **[▲] / [▼]** to the zone, [MENU].
4. Choose **Apply** with [▲] / [▼] and confirm with [MENU].
5. The radio jumps to the first channel of that zone.
</div>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">A and B in different zones</p>
A and B can each be in their own zone: for example A in "Ant-Kust" (FM along the motorway) and B in "Onderweg BE 206" (DMR, national). Set the zone for A, press [A/B], set the zone for B.
</div>

<h2 id="dm-p2-5">5. Which zone in which situation</h2>

| Situation | A (FM) | B (DMR) |
|---|---|---|
| At home in Hoboken | QTH Antwerpen: WLD, ON0AND, ON0BEL... | QTH Antwerpen: ON0SNW 206 (or HS 206 via the hotspot) |
| Club evening WLD / Waasland | Sinaai Waasland (WLD first) | Sinaai Waasland: ON0SNW 206 |
| In the car to the coast, Ghent, Leuven, Hasselt, Namur, Marche, Malmedy, Breda | Ant-Kust, Ant-Gent, Ant-Leuven, Ant-Hasselt, Ant-Namen, Ant-Marche, Ant-Malmedy, Ant-Breda | Onderweg BE 206, or roaming (chapter 12) |
| Arrived | Leuven, Hasselt, Kust, Marche Famenne, Malmedy | Same zone: the 206 channel of the local repeater |
| You want many repeaters at once | SvxLink VL: one call is heard on all linked repeaters | |
| Elsewhere in Belgium | Prov ... (all repeaters of that province) | Prov ... |
| DMR at home | | Hotspot (HS 206, HS 2061, HS Parrot BM...) |
| Direct, no repeater | Simplex: WLD, 145.500, 433.500 | Simplex: DMR S 433.450 |
| Just listening to PMR446 | Alleen ontvangen (transmit blocked) | |

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: before a trip</p>

1. Before you leave: A = the zone of your route (for example Ant-Kust), B = Onderweg BE 206.
2. Double Wait on (SK1 short until you see DW).
3. On A, turn to the repeater you hear best; the channels are in driving order. Or scan (chapter 7).
4. On B, turn to the 206 channel of the DMR repeater nearest to you, or use roaming.
5. Arrived: TK long to the local zone.
6. **Do not operate while driving.** Set it up before you leave, or let a passenger do it.
</div>

<h2 id="dm-p2-6">6. An FM repeater QSO</h2>

<div class="dm-box" markdown="1">
<p class="dm-box-label">Situation</p>
You want to call on ON0AND, answer someone, and close the contact.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: calling</p>

1. Choose the channel (A = ON0AND) and check that A is the main channel.
2. **Listen** for at least half a minute. Not sure it is free? **SK2 short** (Monitor).
3. Press PTT, wait half a second for the repeater to open, speak calmly with the radio 2.5 to 5 cm from your mouth: "ON3VZ listening on ON0AND".
4. Release PTT. You hear the repeater drop (a short tail or beep).
5. No answer: try again in a few minutes.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: answering</p>

1. You hear "ON1ABC listening on ON0AND". If it is on B: press [A/B] first.
2. PTT: "ON1ABC, this is ON3VZ, Kristof, QTH Hoboken. Back to you, ON1ABC from ON3VZ." Release.
3. During the QSO: let the repeater drop after every turn before you answer, so someone else can break in. Keep turns short: the radio stops transmitting by itself after 180 s (time out timer). Give your callsign at least at the start, at the end and every 10 minutes.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: closing</p>

1. "Thanks for the QSO, 73, ON1ABC from ON3VZ."
2. Leave the repeater free. You stay listening on the channel.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: a repeater with 1750 Hz (ON0HT, ON0HTT, ON0CLR, ON0PHI, ON0RBO)</p>

1. Choose the channel.
2. Hold PTT, press **SK2 long** (TBST Send) briefly: the radio sends the 1750 Hz whistle.
3. Keep PTT pressed and speak. The repeater stays open while it hears you.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: checking a repeater (does it open, which tone, narrow or wide?)</p>

1. Choose the channel and listen. Hear nothing? **SK2 short** (Monitor). If you only hear it with Monitor, the decode tone on that channel does not match (in my codeplug decode is None everywhere, so you should hear it).
2. **Output tone**, while the repeater is active (someone talks, or you key it briefly): **[MENU] > Scan > Scan CTCSS**. The radio shows the tone it finds. Nothing? **[MENU] > Scan > Scan DCS**.
3. **Store it** if you want (manual 2.7): [MENU] > Scan > Scan Memory > RX CTCSS/DCS > [MENU]. Also note it, so you can put it in the CPS.
4. **Does it open?** Short PTT: "ON3VZ test". A kerchunk or beacon back means the input tone is right. Nothing: wrong tone, 1750 Hz needed, or out of range.
5. **Narrow or wide?** Loud and distorted on your channel: the repeater is wide while your channel is narrow, or the other way round when it sounds thin and quiet. Best: ask a station how you sound. Too quiet means the repeater is wide; distorted means it is narrow.
</div>

<h2 id="dm-p2-7">7. Scanning</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
Every FM channel of a local zone is linked to the scan list of that zone (Scan QTH, Scan Sinaai, Scan Leuven, ScanHasselt, Scan Kust, Scan Marche, ScanMalmedy, ScanSimplex). When you start scanning, the radio scans **the list of the channel you are on**. It stops on a signal, waits 3 seconds after the signal ends, and continues.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Go to an FM channel of the zone you want to scan, for example ON0AND (list Scan QTH).
2. **TK short**: scan on. The LED blinks orange slowly. Or [MENU] > Scan > Scan Switch > On.
3. The radio stops on a channel with a signal. Press **PTT within the stop** to answer on that channel (Talkback, Scan TX Mode "Current Channel").
4. Another list: [MENU] > Scan > Scan List > choose > Apply.
5. A channel that keeps stopping the scan (noise, a beacon): assign "Nuisance Temporary Delete" to a key if you want; it comes back after a restart.
6. Stop: **TK short** again, or change channel.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why only FM</p>
Scanning DMR over many repeaters and two timeslots is slow and misses calls. For DMR on the road, roaming (chapter 12) is the better tool.
</div>

<h2 id="dm-p2-8">8. DMR in plain words: who hears what</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">The basics</p>

- Your voice becomes bits (AMBE+2 codec) and goes out in packets. Weak signal: the voice becomes "robotic" or drops; there is no noise like on FM.
- A DMR repeater carries **two conversations at once**, one per timeslot (TS1 and TS2). Your radio transmits and listens only in the timeslot of the channel.
- The **colour code** must match, or the repeater ignores you. Flanders CC1, Wallonia CC2, my hotspot CC1.
- A **talkgroup** is the conversation group. Through BrandMeister, everyone on that talkgroup hears each other, on every repeater and hotspot where it is active.
</div>

### Side 1: what does the repeater send out?

- **Static talkgroups** are always on that repeater. For example on ON0SNW: 206 on TS1, 2061 on TS2. Everything anyone says on 206 anywhere in Belgium comes out of ON0SNW on TS1.
- **Dynamic talkgroups** only come on when someone calls them on that repeater (PTT on that talkgroup). They stay active a while and drop after a few minutes without traffic. Example: you key 2064 on ON0SNW TS2; from then on 2064 comes out of ON0SNW for everybody listening there.
- **TG 9** stays local on that one repeater.
- One conversation per timeslot. If TS1 is busy with 206, nobody else can transmit on TS1; TS2 is still free.

### Side 2: what does your radio let through?

Your radio plays a call when **all three** match:

1. frequency and colour code, **and**
2. the timeslot of your channel, **and**
3. the talkgroup is in the **RX group list** of your channel (or equals its TX Contact).

| You are on | You hear | Why |
|---|---|---|
| ON0SNW 206 (TS1, RX VL) | Every call on 206 in Belgium | 206 is static on TS1 and in RX VL |
| ON0SNW 2061 (TS2, RX VL) | Flemish calls on 2061 | 2061 is static on TS2 of ON0SNW |
| ON0SNW QSY (TS2, RX QSY) | Any QSY group (2064 to 2069) that is active on ON0SNW, and 2061 | Those groups are in RX QSY |
| ON0SNW 206, while two people talk on 2064 via Bruges | Nothing | 2064 is not active on ON0SNW, and it is on TS2 anyway |

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Answering versus calling</p>
Answering **within 5 seconds** (Call Hold Time) after someone stops goes back on **their** talkgroup. Starting a new call later goes on the **TX Contact of your channel**. So if you hear 2061 on the 206 channel and you answer late, you call on 206.
</div>

<h2 id="dm-p2-9">9. A DMR call: calling, answering, closing</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: calling on 206</p>

1. B = **ON0SNW 206** (TS1, TG 206). Make B the main channel ([A/B]).
2. Listen first. If you see a callsign or ID coming in, the talkgroup is busy: wait.
3. Press PTT and **wait for the short beep** (talk permit tone). Speaking before the beep loses your first words.
4. "ON3VZ listening on 206." Release.
5. No beep, or an error tone: the repeater did not hear you (too far, wrong colour code, slot busy). See chapter 17.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: answering</p>

1. **Group call** (someone calls on a talkgroup): while the screen still shows the caller, you have 5 seconds to press PTT and answer on the same talkgroup.
2. **Private call** (someone calls you directly): the radio rings and shows the caller. PTT answers that person (manual 9.3).
3. **Missed it?** [MENU] > Call Log > Missed > the caller > PTT.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: closing</p>

1. "73, ON1ABC from ON3VZ."
2. If you were on a QSY group: turn back to **ON0SNW 206**, so you can be called again. Nothing to "log off": a dynamic group drops by itself after a few quiet minutes.
</div>

<h2 id="dm-p2-10">10. QSY on DMR</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
QSY is the old Q code for "change frequency". On DMR it means: move **together to another talkgroup** to continue the conversation. The Belgian QSY groups are **2064 to 2069**, used on **TS2**.
</div>

<div class="dm-box dm-why" markdown="1">
<p class="dm-box-label">Why</p>
206 and the regional groups are static on many repeaters across Belgium. A 20 minute chat on 206 blocks that timeslot on all of them, and nobody else in Belgium can call. A QSY group is dynamic: it only comes out of the repeaters where it is called, so your chat only occupies your repeater and your partner's, and only TS2.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: QSY after a call on 206</p>

1. You called on ON0SNW 206 and ON1ABC answered.
2. Agree briefly: "ON1ABC, shall we QSY to 2064?" He confirms.
3. Turn the channel knob to **ON0SNW QSY** (in every zone it sits right after ON0SNW 2061).
4. Check the screen: TG 2064, slot 2.
5. PTT, wait for the beep: "ON1ABC from ON3VZ on 2064." This first call activates 2064 on ON0SNW.
6. Release and wait. ON1ABC does the same on his repeater. From then on you hear each other on 2064.
7. Nothing after 30 seconds: call again, or go back to ON0SNW 206 and agree again.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: 2064 is busy, use 2065 to 2069</p>

1. On ON0SNW QSY you already hear another conversation on 2064. Agree on 2065.
2. Stay on the channel **ON0SNW QSY** (right repeater, TS2).
3. **[MENU] > Talk Group > Contact List**, [▲]/[▼] to "2065 QSY", [MENU], PTT.
4. Or manual dial: **[#]** short, check that it says Group Call (press [#] again to toggle), type 2065, PTT.
5. (To be tested) Whether the radio stays on 2065 for the next PTT or falls back to 2064. If it falls back, answer within the 5 seconds hold time, or dial again.
</div>

<h2 id="dm-p2-11">11. Other ways to pick a talkgroup, private calls and the Parrot</h2>

| Method | How | When |
|---|---|---|
| Via the channel (easiest) | Turn the knob: ON0SNW 206, ON0SNW 2061, ON0SNW QSY; HS 206, HS 2061... | Always the first choice |
| Contact list | [MENU] > Talk Group > Contact List > talkgroup > PTT (manual 9.2) | 2065 to 2069, 9 |
| Manual dial | [#] short on a digital channel, [#] toggles group / private, type the number, PTT | A talkgroup that is not in your list |
| Call back | [MENU] > Call Log > a call > PTT | Answering later |

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Mind the timeslot</p>
Use QSY groups on a **QSY channel (TS2)**. A QSY group on TS1 blocks the national and regional groups for everybody on that repeater.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: test with the Parrot</p>

1. Via the hotspot: channel **HS Parrot BM** (9990) or **HS Parrot BE** (206997). Via a repeater: on a TS1 channel, [MENU] > Talk Group > Contact List > 206997 Parrot (private call).
2. PTT, say a few words, release.
3. You hear yourself back after a few seconds. That proves your DMR ID, colour code and timeslot are right, and that the network hears you.
4. Check on [brandmeister.network](https://brandmeister.network) > Last Heard: your callsign must appear.
5. Never test with short "kerchunks" on 206, 2061 or 2062: that disturbs other modes on multimode repeaters. That is what the Parrot is for.
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Emergency</p>
TG **206112** is in all my RX groups, so you hear an emergency call. Only use it yourself for a real emergency.
</div>

<h2 id="dm-p2-12">12. Roaming on the road</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
Roaming searches a list of DMR repeaters (a roaming zone) for the strongest one and switches to it. My roaming zones: Roam VL-W (Antwerp to the west and the coast), Roam VL-O (Antwerp to the east), Roam WAL, Roam Kust, Roam Hass, Roam Malm, Roam Namen. Important (manual): once locked on a repeater, the radio only goes back to your previous channel when **you** change channel or frequency.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan</p>

1. Put B on a DMR channel, for example ON0SNW 206, and make B the main channel.
2. **[MENU] > Roaming > Roaming Zone** > choose the zone for your route > select.
3. Search once: **[MENU] > Roaming > One Time Roam**. The radio shows "Searching" and then the repeater it found.
4. Automatic: **[MENU] > Roaming > Auto Roaming > On**. The wait time (Roaming Timer) is 2 minutes in my codeplug.
5. Off: [MENU] > Roaming > Auto Roaming > Off, or just choose another channel.
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out (to be tested)</p>
My first test at home gave "Searching" and then "Failed". The likely reason: a BrandMeister MMDVM repeater does not transmit while it is idle, so there is nothing to measure. Roaming works best while there is traffic. Also still to test: which talkgroup and slot the radio uses after roaming (I programmed the roaming channels on Slot 1, TG 206).
</div>

<h2 id="dm-p2-13">13. Using the hotspot</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: everyday use at home</p>

1. Plug in the hotspot, wait 2 to 3 minutes. It connects to your home wifi by itself.
2. Radio: zone **Hotspot**, channel **HS 206** (or HS 2061 ...). All HS channels are 438.100 MHz, TS2, CC1, low power.
3. Keep the radio **2 to 3 metres** from the hotspot.
4. To hear a talkgroup: either key up on it briefly (it stays on your hotspot for about 15 minutes, dynamic), or make it static on BrandMeister (Part 1, chapter 10).
5. Same habit as on a repeater: call on HS 206, chat on HS 2064 and up.
6. Check: http://pi-star.local > Dashboard and **Admin > Live Logs**.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: on the road (phone hotspot)</p>

1. Switch on the hotspot on your phone (2.4 GHz). Power the Pi from a power bank or car USB.
2. Wait 2 to 3 minutes: the Pi finds the phone network (added in Part 1).
3. Pi-Star address: look in your phone under hotspot > connected devices for "pi-star" and its IP; pi-star.local does not always work through a phone.
4. Only in Belgium with an ON3 licence.
5. If no known network is found, the Pi starts its own network "pi-star" (now with your PSK): connect to it and add the new wifi.
</div>

<h2 id="dm-p2-14">14. DTMF: EchoLink and SvxLink</h2>

<div class="dm-box dm-mean" markdown="1">
<p class="dm-box-label">What it means</p>
**DTMF** are the tones of a telephone keypad. A repeater with **EchoLink** recognises them as commands, for example to connect to another node over the internet. **SvxLink** in Flanders is different: the repeaters are already linked, you just talk on one and you are heard on all of them (zone "SvxLink VL"). DTMF only works on an **FM** channel.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Step plan: an EchoLink connection via a repeater</p>

1. Choose an FM repeater with EchoLink, for example ON0RCL (438.850, Leuven).
2. Listen whether the repeater is free.
3. Say your callsign, keep PTT pressed and key in the node number on the keypad, calmly and evenly. Release after the last digit. (Alternative from the manual: on an analogue channel press [#] for the DTMF window, type the digits, PTT to send. To be tested which method this firmware prefers.)
4. The repeater announces the connection. Talk as on a normal repeater, but wait longer between turns (internet delay).
5. Afterwards **always disconnect**, so the repeater is free again. On ON0RCL: DTMF 73, # or ## (from the repeater's QRZ page).
</div>

<div class="dm-box dm-warn" markdown="1">
<p class="dm-box-label">Watch out</p>
Codes differ per repeater: check the repeater's website or QRZ page, or ask the sysop. In the CPS (Analog > DTMF) you can set the tone duration and a "side tone", so you hear what you send.
</div>

<h2 id="dm-p2-15">15. Useful extras, each with a step plan</h2>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Record a DMR QSO (manual chapter 7)</p>

Recording works in **DMR mode only**; every call is stored as a separate record with DMR ID and time.

1. [MENU] > Record > Record Sel > Rx Record, Tx Record or Rx/Tx Record > [MENU].
2. Record on / off: [MENU] > Record > Record Switch (or assign "Record Switch" to a key).
3. Play back: [MENU] > Record > Record List > [▲]/[▼] > [MENU] > Play.
4. Details of a record (who, when, how long): Record List > the record > Detail.
5. Delete all: [MENU] > Record > Record Delete > [MENU].
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Try an unknown frequency (VFO)</p>

1. [VFO/MR]: the screen shows VFO.
2. Type the frequency, for example 4 3 3 5 0 0 for 433.500.
3. Listen or transmit. Tone and shift are not set automatically: for a repeater, better make a channel.
4. [VFO/MR] back to your channels.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Make a channel on the radio, without a PC</p>

1. Channel mode (no VFO on the screen).
2. [MENU] > Settings > Channel Set > New Channel.
3. Analog or Digital, name, [MENU]; RX frequency (repeater output), [MENU]; TX frequency (input), [MENU]: "Add success".
4. Settings: [MENU] > Settings > Channel Set: tone and bandwidth for FM; colour code, time slot, TX contact and RX group list for DMR.
5. Put it in a zone: [MENU] > Zone > the zone > Add Channel > the new channel > [MENU].
6. At home: **Program > Read** in the CPS before you change anything there, and save.
</div>

<div class="dm-box dm-steps" markdown="1">
<p class="dm-box-label">Send a text message (SMS) on DMR (to be tested)</p>

1. On a DMR channel: [MENU] > SMS > New Msg.
2. Type the text (max 128 characters; [#] switches letters and digits, [0] is a space).
3. [MENU] > choose the receiver (contact or DMR ID) > send. Received messages: [MENU] > SMS > InBox.
</div>

| Extra | How |
|---|---|
| Call log | [MENU] > Call Log > Missed / Answered / Sent > PTT calls back |
| Keypad lock | [*] long; unlock [MENU] then [*] |
| Power temporarily | [MENU] > Settings > Channel Set > TX Power |
| Talk Around (direct next to a repeater) | Assign "Talk Around" to a key; on a repeater channel it transmits on the output frequency |
| Identify a nearby transmitter | Assign "Freq Search" to a key (CPS, or on the radio [MENU] > Settings > Radio Settings > Key Function); on an analogue channel it shows "Seek...", then frequency and tone; [MENU] stores it |
| FM broadcast radio | Assign "FM Radio" to a key |

<h2 id="dm-p2-16">16. Good habits on Belgian DMR</h2>

- **Listen first.** Activity on the screen or in your speaker: wait.
- After PTT, **wait for the talk permit beep** before you speak.
- Leave **1 to 2 seconds** between turns, so others can break in.
- **206, 2061 and 2062 are for calling.** Contact made: QSY together to 2064 to 2069 on TS2.
- **No short PTT tests** on 206, 2061, 2062. Use the Parrot.
- **Always give your callsign.**
- On FM: let the repeater drop between turns, keep turns short, callsign every 10 minutes.

<h2 id="dm-p2-17">17. When it does not work</h2>

| What you notice | Likely cause | What to do |
|---|---|---|
| No beep after PTT on DMR | The repeater does not hear you, wrong colour code, or the slot is busy | Another repeater, another place (higher, outside), check CC |
| Robot voice, dropouts | Weak signal | Move, stand higher, another repeater |
| You hear nobody on 206 | 206 is often quiet: it is only for calling | Check the [BM206 dashboard](http://dashboard.ham-dmr.be/dynamic/lastheard.php) or the [Hoseline](https://help.brandmeister.network/last-heard-dash/hoseline/); test with the Parrot |
| You hear others, they do not hear you | Too far, or low power | Check H on the screen, go outside |
| FM repeater does not open | Wrong input tone, 1750 Hz needed, or out of range | Check the tone (chapter 6), SK2 long for 1750 Hz |
| FM repeater only audible with Monitor | Decode tone does not match | Set decode to None (CPS or Channel Set) |
| You transmitted on the wrong line | A was main channel, call came in on B | [A/B] first, look at the marker |
| "VFO" on the screen, channel names gone | You are in frequency mode | [VFO/MR] |
| Nothing on the hotspot | Not logged in to BrandMeister, or talkgroup not subscribed | Admin > Live Logs; key up on the talkgroup or make it static |
| Parrot test via a repeater gives no echo, and you are not in Last Heard | The repeater does not hear you from indoors | Try outside or via the hotspot |

### What I still have to test on the air

Answering on B within the hang time, keying a channel number, zone choice per line, the scan start list, the DTMF method, the QSY contact behaviour, SMS via BrandMeister, roaming during traffic, and the FM repeater checklist (tones and bandwidth). I will update both posts when I have the answers.

That is it: from an unopened box to a radio I can actually use, with every step written down. Questions or corrections are very welcome via the [contact page](/contact/).

73, Kristof ON3VZ

</div>
