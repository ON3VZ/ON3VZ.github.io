---
layout: post
title: "Part 5/5 · Yaesu FTM-510DE ASP, One Year Later: GM, Mobile Installation, Microphone Keys and the Hidden Extras"
tags: ['Yaesu', 'FTM-510DE', 'Mobile', 'GM', 'Group Monitor', 'ASP', 'Super DX', 'Installation', 'Beginners']
excerpt: "The last part of the series: Group Monitor and its radar screen, how the radio is installed in my car, the microphone keys for driving blind, Super DX and ASP noise reduction, recording, navigation back to your starting point, cloning, and a pocket cheat sheet for the car."
topics: ['VHF/UHF & Digital Voice']
series: 'FTM-510DE'
series_part: 5
series_total: 5
---
<!-- FTM510D-PART5 2026-11-23: new post. Revert by deleting this file -->
<style>
/* FTM510D post styles, scoped to .fx-article; follows the fresh light/dark tokens */
.fx-article figure { margin: 1.8rem 0 2rem; }
.fx-article figure img { display: block; width: 100%; max-width: 860px; height: auto; margin: 0 auto; border-radius: 10px; border: 1px solid var(--c-border); }
.fx-article figcaption { font-size: .86rem; line-height: 1.5; color: var(--c-text-3); margin: .75rem auto 0; max-width: 720px; text-align: center; font-style: italic; }
.fx-article .fx-note { border-left: 3px solid var(--c-cyan, #1E6BA8); padding: .6rem 1rem; margin: 1.4rem 0; background: var(--c-surface); border-radius: 0 8px 8px 0; }
.fx-article .fx-note p { margin: 0; }
.fx-article .fx-how { border: 1px solid var(--c-border); background: var(--c-surface); border-radius: 10px; padding: .8rem 1.1rem; margin: 1.2rem 0 1.6rem; }
.fx-article .fx-how p.fx-how-label { font-family: var(--f-mono); font-size: .76rem; letter-spacing: .12em; text-transform: uppercase; color: var(--c-amber, #B8791A) !important; margin: 0 0 .4rem; }
.fx-article .fx-how ol, .fx-article .fx-how ul { margin-bottom: 0; }
.fx-article table thead th { color: var(--c-text) !important; }
.fx-article .fx-table { overflow-x: auto; }
</style>
<div class="fx-article" markdown="1">

This is the last part of the series. [Part 1](/2026/11/23/ftm-510de-part-1-backup-firmware-every-setting/) covered backup, firmware and every setting, [Part 2](/2026/11/23/ftm-510de-part-2-repeaters-channels-zones/) the repeaters and zones, [Part 3](/2026/11/23/ftm-510de-part-3-c4fm-digital-wires-x/) C4FM and WIRES-X, and [Part 4](/2026/11/23/ftm-510de-part-4-aprs-from-zero/) APRS. What is left are the functions that are easy to miss, and the radio in the car itself.

## GM: Group Monitor

**GM** shows which C4FM stations are within reach on your frequency, with their distance and direction. Think of it as a small radar for your group, for example a convoy of cars to a field day, or friends at an event.

How it works: every radio with GM switched on sends a short digital packet with its callsign and GPS position. Your radio collects them and shows up to 24 stations: **white** means within range, **grey** means out of range.

<div class="fx-how" markdown="1">
<p class="fx-how-label">How to: use GM in a group</p>

1. Everyone tunes to the **same simplex frequency**. Agree on one beforehand; GM switches the radio to the upper band and to C4FM DN automatically.
2. Optional but useful: everyone sets the **same DG-ID** other than 00 (hold the GM key, see Part 3). Then you only see your own group.
3. Press the **GM** key. The list of stations appears with distance.
4. Press the **SUB DIAL** knob for the **APL** screen: up to four members on a compass around you, with an arrow for their direction of travel. Turn the main knob to zoom.
5. Turn FUNC to a member and press FUNC to see his direction, distance and heading. His position can be saved as a navigation point.
6. Talk with PTT: in GM you always talk in C4FM DN.
7. Press GM again to stop.
</div>

You can also send short messages and pictures to group members (an SD card is needed). Menu **61 RANGE RINGER** beeps when a member comes within range; I keep it OFF.

## The radio in the car

My installation is simple and leaves the car untouched. More photos are on my [Mobile page](/mobile/).

- **The radio** is mounted once and stays in the car: always ready when I get in.
- **Antenna:** a Comet CA-2X4SR dual-band antenna on a Komunica BM-1 magnet mount in the middle of the roof, with 5 m of RG-58. The compact Comet SBB-2 is the backup.
- **Power:** a separate LiFePO4 battery, not connected to the car battery or the ignition. That is why APO (auto power off) is set to 3 hours in Part 1: the radio does not switch off with the engine.

**Best practice, whatever your car:**

- Put the control head where you can read it with a quick glance, and the microphone where your hand finds it without looking.

- Keep the power cable short and thick, with a fuse in both the plus and the minus lead, as close to the battery as possible.
- Route coax and power cable apart where you can.
- A magnet mount in the middle of the roof uses the roof as a ground plane. Put a thin cloth under it if you worry about the paint, and take it off before a car wash.
- Check the SWR once after installation with an analyser or SWR meter. A dual-band antenna that is fine on 2 m is usually fine on 70 cm too, but check both.
- Your attention belongs to the road. Set up before you leave; while driving, only use the PTT and the P keys.

## The microphone keys: driving blind

The SSM-85D microphone has four programmable keys (menu 29 MIC PROGRAM KEY) and a full keypad.

<div class="fx-table" markdown="1">

| Key | My setting | What it does for me |
|---|---|---|
| P1 | 2nd PTT | A second push to talk button |
| P2 | HOME CH | One press to ON0AND (upper band) or the WLD club frequency (lower band) |
| P3 | SCAN | Start or stop the scan in the current zone |
| P4 | T-CALL | 1750 Hz tone for the repeaters that need it (hold PTT, press P4) |
| Keypad | DTMF | EchoLink and WIRES-X codes while holding PTT |
| "*" (hold) | | Leave a WIRES-X room |

</div>

Other choices for the P keys are, among others: GM, REC (recording), TX POWER, SQL OFF (open the squelch to hear a weak signal), D_X, the APRS station list or message list. Pick the four you would want with your eyes on the road.

## Super DX and ASP: hearing weak signals

The **S-DX** key on top of the control head controls two things:

- **Super DX** raises the sensitivity of the receiver for weak signals. The key lights up white when it is on.
- **ASP** (Audio Signal Processing) digitally removes noise from the received audio. The FTM-510DE **ASP** version comes with the SPU-1 unit for this already installed; on the normal version it is an option.

<div class="fx-how" markdown="1">
<p class="fx-how-label">How to: use S-DX and ASP</p>

1. **Short presses** on S-DX step through: Super DX and ASP on, Super DX on with ASP off, and both off. "ASP" in the top bar of the screen means ASP is working.
2. **Hold** S-DX for **Auto ASP**: ASP only switches on when the signal on the main band is weak, and stays out of the way on strong signals. A short press switches Auto ASP off again.
3. ASP works on FM only, not on digital signals. While ASP is active, the sound comes from the front speaker only.
</div>

My choice: S-DX set to ASP, and Auto ASP when I drive in areas with weak repeaters such as the Ardennes.

**The audio itself.** The FTM-510DE has a speaker in the control head and one in the main unit. With the AESS function (Part 1, menu 18) both play together with a small delay, which sounds fuller in a car. If the main unit is under a seat, the front speaker does most of the work; adjust REAR OUT to taste.

## Recording what you hear

**Menu 40 RECORDING** and **41 REC/STOP** record the received audio to the microSD card, optionally with your own microphone. Useful to record a net, a contest exchange or a callsign you did not catch. Assign REC to a P key if you use it often. (With the optional FVS-2 unit you also get a separate voice memory and spoken frequency announcements.)

## Navigation: the way back

The built-in GPS can do more than APRS.

- **Real-time navigation:** in C4FM DN the radio shows the direction and distance of the other station, if he sends his position.
- **Backtrack:** save up to three points (start point and L1, L2) and the radio shows distance and direction back to them. Handy at a field day or on a hike with the car parked somewhere.

<div class="fx-how" markdown="1">
<p class="fx-how-label">How to: save your starting point and find it back</p>

1. Menu 7 DISPLAY MODE on BACKTRACK (that is my setting), then open the navigation screen with **DISP**.
2. Press the **SUB DIAL** knob, choose **MEM**, choose a mark (start, L1 or L2) and press SUB DIAL. The current position is saved.
3. Later: open the navigation screen, press SUB DIAL, choose the mark and press SUB DIAL. Keep the green point at the top of the compass and you walk or drive back to it.
4. **BACK** ends the navigation.
</div>

Menu 7 also offers an altitude graph, a clock with lap and countdown timer, and a GPS information screen.

## The other extras

- **Pager and bell** (menus 48 to 50): selective calling with tone codes; the radio rings when your code is received. Fun if a group agrees on it.
- **Bluetooth** (menu 111): only with the optional **BU-5** module, for a headset such as the SSM-BT20.
- **VOX** (menu 11): hands-free transmit. Not for a car.
- **DATA jack** (menus 69 to 72): packet radio at 1200 or 9600 bps, or GPS output to another device.
- **Cloning** (menus 119 and 120): copy everything to a second FTM-510 with a cable.
- **CONFIG SET / RECALL** (menus 124 and 125): save your current settings inside the radio and recall them later. A quick undo before you experiment.
- **Pictures:** JPG files on the SD card can be converted (menu 110) and sent in C4FM or through GM.

## Pocket cheat sheet for the car

<div class="fx-table" markdown="1">

| I want to | Do this |
|---|---|
| Go home (ON0AND / WLD) | P2 |
| Scan the zone | P3 |
| Open a 1750 Hz repeater | Hold PTT, P4 |
| Switch zone | Hold FUNC > 107 > READ FROM SD > MEMORY > zone > OK |
| Show favourites | BAND in memory mode until M-GRP |
| FM, DN or AMS | Short press D X |
| WIRES-X on / off | Hold D X |
| Leave a WIRES-X room | Hold "*" on the microphone |
| DG-ID back to 00 | Hold GM, hold FUNC |
| APRS on / off | Short press FUNC, APRS tile (lower band on channel 010) |
| Station list / messages | Hold SUB DIAL, S.LIST / M.LIST |
| EchoLink connect | Short press FUNC, DTMF, memory, PTT. Disconnect with "#" |
| Weak signal | S-DX (hold for Auto ASP) |
| Who is around (C4FM) | GM |
| Back to the parked car | DISP, navigation, SUB DIAL, saved mark |
| Full backup | Hold FUNC > 107 > WRITE TO SD > ALL |

</div>

## A year later

A year ago this radio was a box with repeater channels. Now it has a clean, checked channel list with ten zones, it talks C4FM and WIRES-X, it puts my car on the map when I want, and every setting has a reason. The most valuable lesson was not a function but a method: make a backup, change one thing at a time on the PC, keep what already works, and write down where every value comes from.

If you have an FTM-510 yourself and do things differently, I would like to hear it.

73 de ON3VZ

</div>
