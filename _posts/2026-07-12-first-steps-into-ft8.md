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

It also took patience. With my 15 to 25 watts I was rarely the strongest signal in anyone's waterfall, and getting through often meant calling the same station over and over before I was finally picked out and answered. Low power on FT8 works, but it is a numbers game: you hold your slot, you keep calling, and you wait for your turn to come up.

Four continents in one evening, on a groundplane vertical, with less power than a light bulb. Am I pulling top-tier receive numbers? Certainly not: some of those exchanges happened at -16, -21 dB, signal levels where SSB would be dead silence. But that's exactly the point: FT8 digs conversations out of the noise floor that phone could never touch.

## Four continents at night, barely Europe by morning

That evening haul turned out to be a lesson in its own right: FT8 is one of the clearest ways to actually watch propagation instead of just reading about it. The proof came the next morning. Same rig, same antenna, same 25 watts, and in the late morning I could barely scrape together a handful of European stations. The four continents had simply vanished.

The reason lives in the ionosphere, the charged layers high overhead that bend HF signals back to Earth and let them skip across the world. The sun builds those layers up through the day and lets them fade at night, so conditions change from one hour to the next and every band has its own best time. A long DX path only works when the ionosphere is cooperating along the whole route between me and the far station, and since that route runs partly through daylight and partly through darkness and drifts along with the sun, the window for any given path is narrow. The hours around sunset are a classic sweet spot, which is about when my four continents rolled in. By late morning that alignment was gone, and the same power that reached Argentina around sunset could barely clear my own continent.

That sunset window has a name worth knowing: the grayline, the moving ribbon of twilight where day meets night around the planet. Along it the absorbing D layer has already faded while the reflecting F layer is still charged, so for a while there is a low-loss corridor that signals can ride for enormous distances. It works best when both ends of the path sit near their own dawn or dusk, and that is exactly what happened with my longest contacts. When it was sunset here, Argentina and Brazil were sliding toward their own sunset too, so the whole path lay close to the grayline, and that is very likely how 25 watts on 20 metres crossed the Atlantic to Buenos Aires. Once you know the grayline is there, the trick is to aim your operating at your own sunrise and sunset and let it do the heavy lifting.

Not every line in the log needed that twilight trick, though. The contacts out to the east, Turkey at a couple of thousand kilometres, then western Siberia, and the Gulf a bit past five thousand, are everyday 20 metre DX: one or two hops off the F layer while the band was still open in that direction, no grayline required. Distances like that are routine on 20 metres when the band is up, and FT8 just made them easy to catch at 25 watts.

Every FT8 line comes with a timestamp and a distance, so you can watch this rhythm build up in the log all by yourself.

## So what do I make of it?

Honestly, I'm not entirely sure yet. A computer talking to another computer over radio waves. It sounds barely interactive... and maybe it isn't. There's no voice from the other side of the ocean, no accent, no chat about the weather in Buenos Aires. Jorge and I exchanged exactly two numbers and a polite 73, all negotiated by software.

And yet. There's something undeniably fascinating about watching your 15 watts crawl across the Atlantic and come back confirmed. It's a different kind of magic: propagation in its purest, most measurable form. A great way to see what your antenna and the ionosphere are really capable of, any evening, regardless of conditions.

So no, FT8 won't replace phone for me. A real voice QSO remains my absolute favorite. But as a complement? It's a fun change of pace, and, I'll admit it, already slightly addictive.

73,
**Kristof, ON3VZ**

*Hoboken (Antwerp), Grid JO21EE, 25 W into a vertical, UBA / WLD / ON6WL*
