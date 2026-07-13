---
layout: post
title: "First Steps into FT8: When 15 Watts Suddenly Reaches Argentina"
tags: [FT8, Digital Modes, HF, IC-7300, WSJT-X, DX, Beginners]
---

Today was the day I finally dipped my toes into the digital modes. FT8, to be precise. I had been putting it off for a while, partly because phone (SSB) is what drew me into this hobby, and partly because I was honestly a bit afraid of doing something wrong and damaging the radio. Spoiler: nothing broke, and by the end of the evening I was staring at my screen in disbelief.

## The setup: more of a journey than expected

On paper it sounds simple: IC-7300 MkII, one USB cable, WSJT-X, done. In practice, it turned into a proper little expedition.

It started innocently enough with **time synchronization**. FT8 works in strict 15-second time slots, and if your PC clock is off by more than a second, you decode nothing. So the first step wasn't even radio-related: installing Meinberg NTP and getting my Windows clock to within a few milliseconds of atomic time. Check.

Then the radio settings. The MkII conveniently hides `DATA MOD` on page 2/2 of the MOD Input menu, not where the classic IC-7300 tutorials say it should be. Set it to USB, leave `DATA OFF MOD` on MIC (so the microphone keeps working normally in SSB: voice and data are two completely separate audio paths), and the radio side is done.

The nicest discovery of the evening: the **MkII offers a second CI-V port over the same USB cable**. Set `USB (B) Function` to CI-V, and Windows suddenly shows two COM ports. Port A stays with Log4OM, port B goes to WSJT-X, both talking to the radio at the same time, no Omnirig, no port juggling. Elegant.

Then reality kicked in. WSJT-X greeted me with a *rig failure* timeout, and the troubleshooting began: restart the radio, check echo settings, cross-test ports, update Hamlib... In the end the culprit turned out to be the brand-new IC-7300**MK2** rig profile in Hamlib itself. Selecting the plain old "Icom IC-7300" profile instead, same CI-V protocol, same address, and everything instantly turned green. Sometimes the mature option beats the shiny new one.

Last stop before transmitting: the **ALC dance**. FT8 transmits a continuous carrier for 13 seconds at a time, so clean audio matters. Hit Tune, watch the ALC meter, and lower the WSJT-X power slider until the ALC sits at zero. Power is set on the radio, never by pushing the audio. Old SSB habits from my MIC GAIN adventures paid off here.

## Learning how a QSO actually works

The next surprise: FT8 has its own logic that takes a moment to click.

Everyone sits on the *same* dial frequency, 14.074 on 20m, and dozens of stations coexist side by side as 50 Hz slivers in the audio spectrum. You never touch the VFO; you pick your own spot in the waterfall (Shift+click, who knew), enable *Hold Tx Freq*, and the software does the rest. Split mode, which confused me at first when it suddenly appeared on the radio display, turns out to be a feature, not a bug: WSJT-X uses it to keep the transmit audio in the sweet spot for a cleaner signal.

And the QSO itself? You double-click a CQ, and then... you watch. Call, report, roger-report, RR73, 73: the whole exchange runs automatically in 15-second turns. Calling CQ yourself is equally hands-off: find an empty slot, hit Enable Tx, and wait for the software to negotiate on your behalf.

## And then I nearly fell off my chair

The first contact of the evening went into the log, and I had to look twice: **LU1DA, Argentina. 11,280 kilometers.** With 25 watts maximum, and for part of the evening I was running just 15. My signal report from Buenos Aires: -06 dB. Perfectly readable.

In SSB, I had managed Canada and Brazil before, but those were lucky shots, caught in the most optimal conditions imaginable. This was different. This just... worked. And it kept working:

| Call | DXCC | Distance |
|---|---|---|
| LU1DA | Argentina | 11,280 km |
| PT7PT | Brazil | 7,553 km |
| KB2QCJ | United States | 5,995 km |
| A61DD | United Arab Emirates | 5,229 km |
| RL9L/3 | Asiatic Russia | 3,964 km |
| RI0SP | Asiatic Russia | 3,263 km |
| TA1SMO | Turkey | 2,127 km |
| EA1CLT | Spain | 1,330 km |
| PI4APD | Netherlands (80m) | 259 km |

Every one of these contacts is now sitting in my [live logbook](/logbook/), plotted on the world map right next to the SSB QSOs that got me started. Same 25 W station, a very different reach.

Four continents in one evening, on a groundplane vertical, with less power than a light bulb. Am I pulling top-tier receive numbers? Certainly not: some of those exchanges happened at -16, -21 dB, signal levels where SSB would be dead silence. But that's exactly the point: FT8 digs conversations out of the noise floor that phone could never touch.

## So what do I make of it?

Honestly, I'm not entirely sure yet. A computer talking to another computer over radio waves. It sounds barely interactive... and maybe it isn't. There's no voice from the other side of the ocean, no accent, no chat about the weather in Buenos Aires. Jorge and I exchanged exactly two numbers and a polite 73, all negotiated by software.

And yet. There's something undeniably fascinating about watching your 15 watts crawl across the Atlantic and come back confirmed. It's a different kind of magic: propagation in its purest, most measurable form. A great way to see what your antenna and the ionosphere are really capable of, any evening, regardless of conditions.

So no, FT8 won't replace phone for me. A real voice QSO remains my absolute favorite. But as a complement? It's a fun change of pace, and, I'll admit it, already slightly addictive.

73,
**Kristof, ON3VZ**

*Hoboken (Antwerp), Grid JO21EE, 25 W into a vertical, UBA / WLD / ON6WL*
