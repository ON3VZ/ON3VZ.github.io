---
layout: post
title: "Ones, Zeros and a Human Voice: Patrick ON4PN on Digital Voice at WLD"
tags: ['WLD', 'Digital Voice', 'DMR', 'D-STAR', 'System Fusion', 'FreeDV', 'VHF', 'HF', 'Beginners']
excerpt: "A club evening at WLD where Patrick ON4PN took us from ones and zeros to D-STAR, Fusion, DMR and FreeDV, and then left us with something to think about: more possibilities, fewer QSOs. With a start for beginners, a jargon list and a full Dutch version."
---
<!-- DIGITAL-VOICE 2026-10-10: new post (English + Dutch with language switch). Revert by deleting this file and the folder assets/images/digital-voice/ -->
<style>
/* DIGITAL-VOICE post styles, scoped to .dv-article; follows the fresh light/dark tokens */
.dv-article { --dv-accent: var(--c-cyan, #1E6BA8); --dv-warm: var(--c-amber, #B8791A); --dv-ok: var(--c-primary, #0E8A50); }
.dv-article .dv-only-dark { display: none; }
html[data-mode="dark"] .dv-article .dv-only-dark { display: block; }
html[data-mode="dark"] .dv-article .dv-only-light { display: none; }
.dv-kicker { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--dv-warm) !important; margin: 0 0 .4rem !important; }
.dv-lead { font-size: 1.28rem; line-height: 1.5; color: var(--c-text) !important; font-weight: 300; margin: 0 0 .7rem !important; max-width: 760px; }
.dv-byline { font-family: var(--f-mono); font-size: .8rem; color: var(--c-text-3) !important; margin: 0 0 1.2rem !important; }
.dv-lang { display: flex; gap: .5rem; flex-wrap: wrap; margin: 0 0 1.8rem; }
.dv-lang a { display: inline-flex; align-items: center; gap: .4rem; text-decoration: none !important; font-family: var(--f-mono); font-size: .85rem; padding: .45rem .9rem; border-radius: 8px; border: 1px solid var(--dv-accent); color: var(--dv-accent) !important; cursor: pointer; }
.dv-lang a:hover, .dv-lang a.is-active { background: var(--dv-accent); color: #fff !important; }
.dv-fig { margin: 1.8rem 0 2rem; }
.dv-fig img { display: block; width: 100%; height: auto; }
.dv-fig figcaption { font-size: .86rem; line-height: 1.5; color: var(--c-text-3); margin: .75rem auto 0; max-width: 680px; text-align: center; font-style: italic; }
.dv-box { margin: 1.8rem 0 2rem; padding: 1.1rem 1.5rem .3rem; border-radius: 12px; border: 1px solid var(--c-border); border-left: 4px solid var(--dv-warm); background: var(--c-surface-2); }
.dv-box-label { font-family: var(--f-mono); font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; color: var(--dv-warm) !important; margin-bottom: .5rem !important; }
.dv-q { border-left-color: var(--dv-accent); }
.dv-q .dv-box-label { color: var(--dv-accent) !important; }
.dv-article h2 { scroll-margin-top: 90px; padding-top: 1.4rem; border-top: 1px solid var(--c-border); }
.dv-article table { font-size: .9rem !important; }
.dv-article table thead th { background: #153B5C !important; color: #FFFFFF !important; border-bottom: 0 !important; }
.dv-article code { font-size: .88em; }
.dv-js .dv-lang-hidden { display: none; }
.dv-divider { font-family: var(--f-mono); font-size: .85rem; letter-spacing: .14em; text-transform: uppercase; color: var(--dv-warm) !important; text-align: center; margin: 3rem 0 0 !important; padding-top: 1.5rem; border-top: 3px double var(--c-border); }
@media (max-width: 760px) { .dv-lead { font-size: 1.12rem; } }
</style>

<div class="dv-article" markdown="1">

<div id="dv-en" markdown="1">

<p class="dv-kicker">ON3VZ · WLD club evening · 9 October 2026</p>
<p class="dv-lead">A Friday evening at WLD, a speaker who started out in that very building, and a talk that began with ones and zeros and ended with a question nobody could quite answer: is this still a real QSO?</p>
<p class="dv-byline">Kristof Cornelis, ON3VZ · report of a talk by Patrick, ON4PN</p>
<div class="dv-lang"><a class="is-active" href="#dv-en" data-lang="en">English</a><a href="#dv-nl" data-lang="nl">🇧🇪 Lees in het Nederlands</a></div>

On Friday 9 October our section [WLD](https://on6wl.be) had a guest who did not really need an introduction: **Patrick, [ON4PN](https://www.qrz.com/db/ON4PN)**. Patrick is a well-known face in the Belgian amateur radio world and has given this talk on digital voice modes more than once. But this evening had a nice twist. Some 25 years ago Patrick took his very first steps in the hobby right here, following the **ON3 course at WLD, in the same building** where he was now standing in front of us. From student in the back row to speaker at the front: if that is not a full circle, I do not know what is.

The subject: **digital voice**, or DV. On HF that means FreeDV, on VHF and UHF it means D-STAR, System Fusion, DMR and a handful of other names you see on repeater lists and in radio shop catalogues. What are they, how do they work, and what can a radio amateur actually do with them?

I took notes, very short ones. This report follows the order of the talk, so those who were there will recognise it. Along the way I filled things out with background I looked up afterwards, so that someone who has never touched DV can follow too. At the end you find a practical start for beginners and a list of the jargon. Any mistakes in the extra material are mine, not Patrick's.

## 1. Background: a protocol is just an agreement

Patrick started at the very beginning. The word that came back all evening was **protocol**. That sounds technical, but it is nothing more than an agreement: *this is how we do it*. Every digital mode has its own agreement about:

- **how voice and data are arranged** in the digital stream. If everyone understands the same protocol, the stream can be exchanged;
- **how the ones and zeros are sent out**. Inside a radio a bit is a square wave: on or off;
- **the order**: every mode has its own unique code, with the ones and zeros sorted in a fixed way, starting with a **header** and followed by the **data**.

Everything is sent in **packets with a clear beginning and end**. In between there is **synchronisation** that the radios understand, so they know exactly where each piece starts. And it is not only your voice that travels: **voice and data go along together**, so your callsign, a text message or your position can ride along with your words.

That is the whole story of digital voice in one sentence, and also the source of most of its problems, as we will see: if both radios know the agreement, they understand each other. If they do not, you hear nothing.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv1-voice-to-antenna-light.svg" alt="The chain from microphone through codec, error protection and packets to the modulator, and the receiving radio doing the same in reverse" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv1-voice-to-antenna-dark.svg" alt="The chain from microphone through codec, error protection and packets to the modulator, and the receiving radio doing the same in reverse" loading="lazy"><figcaption>Every digital voice mode follows the same five steps; only the details of each step differ</figcaption></figure>

## 2. Modulation: how the square wave goes on the air

Besides the protocols there are the **modulation types**: the way the bits are turned into a radio signal. Here Patrick made a point I had never thought about clearly: **the protocol and the modulation are two different things**. The protocol says *which* bits to send and in what order. The modulation is *how* those bits become a radio wave.

Radio does not like hard square edges (they splatter all over the band), so the bits are smoothed and turned into small, controlled shifts of the carrier. The most common trick on VHF and UHF is **four-level FSK (4FSK)**: the carrier hops between four slightly different frequencies, and each of those four positions stands for a pair of bits. Four tones, two bits per tone.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv3-4fsk-light.svg" alt="Four-level FSK: the carrier steps between four frequency levels, each standing for a pair of bits" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv3-4fsk-dark.svg" alt="Four-level FSK: the carrier steps between four frequency levels, each standing for a pair of bits" loading="lazy"><figcaption>Four positions of the carrier, each worth two bits. DMR, System Fusion, dPMR, NXDN and M17 all use a form of this</figcaption></figure>

Certain protocols use certain modulations, and certain ways to share the channel. **DMR** uses 4FSK and shares the channel in **time** (TDMA, more on that below). **dPMR** also uses 4FSK, but shares in **frequency** (FDMA): each conversation gets its own narrow channel. Yaesu's **System Fusion** uses **C4FM**, which is 4FSK with an extra smoothing filter. (A common mix-up: DMR does *not* use C4FM.) **D-STAR** is the odd one out with **GMSK**, a smooth two-level shift, so one bit per step.

## 3. DMR: two conversations on one frequency

Then Patrick zoomed in on DMR. It comes in **phases, or tiers**: Tier I is a simple licence-free version for 446 MHz, Tier II is the conventional system that radio amateurs use, Tier III adds trunking for large professional networks. So even within one protocol there are different types.

The core of DMR Tier II: it sends **packets one after the other in units of time**. Slot 1, slot 2, slot 1, slot 2... each slot lasting 30 milliseconds. Your radio only transmits in its own slot, and it can **listen to only one of the two slots**. Thirty milliseconds is far too short for your ear to notice, so both conversations sound continuous. The result: **on one frequency you can hold two conversations at the same time.** And because a handheld only transmits half of the time, its battery lasts longer.

**D-STAR works differently** and uses the bandwidth in another way: a constant stream on one channel, no slots. dPMR and NXDN take the third road: two narrow channels side by side.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv4-slots-light.svg" alt="Left: FDMA with two narrow 6.25 kHz channels side by side, each in use all the time. Right: DMR TDMA with one 12.5 kHz channel and alternating 30 ms slots for two conversations" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv4-slots-dark.svg" alt="Left: FDMA with two narrow 6.25 kHz channels side by side, each in use all the time. Right: DMR TDMA with one 12.5 kHz channel and alternating 30 ms slots for two conversations" loading="lazy"><figcaption>Two ways to share a channel: split it in frequency (side by side), or split it in time (one after the other)</figcaption></figure>

## 4. What is inside a transmission

Next: what actually travels in such a packet stream? Roughly the same in every mode:

- a **header** at the start, with:
    - a **synchronisation** pattern ("wake up, something is coming"),
    - **control flags** (what kind of traffic follows),
    - the **ID data**: your callsign or DMR ID,
    - a **checksum** to check that the header arrived correctly;
- then the **data**: a voice frame, a bit of digital data, a voice frame, digital data, and so on until the last voice frame, followed again by a **checksum**.

The synchronisation is repeated along the way, so a radio that tunes in halfway through an over can still lock on.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv2-packet-light.svg" alt="A digital voice transmission as a train of blocks: a header with sync, flags, callsign and checksum, then voice and data blocks taking turns, then an end marker" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv2-packet-dark.svg" alt="A digital voice transmission as a train of blocks: a header with sync, flags, callsign and checksum, then voice and data blocks taking turns, then an end marker" loading="lazy"><figcaption>One over, seen as bits: a header, then voice and data taking turns, then an end marker</figcaption></figure>

## 5. From voice to bits: the AMBE codec

Before anything can be sent, your analogue voice has to become binary. That is the job of the **codec** (coder and decoder); the part that analyses your speech and rebuilds it at the other end is called the **vocoder**. The most widely used is **AMBE**. It is a **closed system**: you buy the chip or the licence, you do not get to see inside. The goal is **maximum intelligibility with minimum data**, because a radio channel can carry only a few thousand bits per second.

It is not high-tech wizardry with a difficult word attached, said Patrick, although the difficult word exists: **psychoacoustic compression**. The idea is very human. Your ears and your brain work together, and your brain constantly chooses which sounds to focus on. Your brain adapts to the circumstances: in a noisy café you still follow the person in front of you. The codec does the same. It keeps what your brain needs to understand speech and drops what it would ignore anyway. With such algorithms the amount of data can be cut drastically while the voice remains perfectly understandable.

The open alternative is **Codec 2**, written by David Rowe, VK5DGR, precisely because many hams did not like a closed box at the heart of their hobby. It is used by FreeDV on HF and by the open M17 mode.

## 6. Error correction: repair without asking again

Radio is never perfect. A passing truck, a weak signal, a bit of interference, and some bits arrive wrong. The share of bits that arrive damaged is called the **bit error rate (BER)**, the real "signal report" of a digital signal. Patrick explained how DV deals with it, and this is where it gets clever.

**Forward error correction (FEC).** The transmitter "looks ahead": along with your voice it sends extra bits, calculated from the voice bits, so that part of the information is in effect **said twice**, together with a checksum. If noise damages a bit on the way, the receiver notices that the extra bits no longer match, works out which bit was wrong and repairs it, **without ever asking the other station to send again**. That is what "forward" means. On a voice channel there is no time to ask anyway.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv5-error-correction-light.svg" alt="Top: data plus spare bits, one bit flipped by noise and repaired by the receiver. Bottom: a lost voice frame replaced by repeating the previous good frame" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv5-error-correction-dark.svg" alt="Top: data plus spare bits, one bit flipped by noise and repaired by the receiver. Bottom: a lost voice frame replaced by repeating the previous good frame" loading="lazy"><figcaption>Two safety nets: repair what is damaged, and paper over what is lost</figcaption></figure>

**Spreading the bits (interleaving).** Interference rarely comes as one single bit; usually it is a short burst that wipes out several bits in a row. So the bits are **spread out** before sending: a piece of word A, a piece of B, a piece of C, then A again. A burst then damages a little of every word instead of all of one word, and each damaged piece is small enough for the error correction to fill in.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv10-interleaving-light.svg" alt="Interleaving: the bits of each word are spread out before sending, so a burst of interference damages a little of every word instead of all of one word" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv10-interleaving-dark.svg" alt="Interleaving: the bits of each word are spread out before sending, so a burst of interference damages a little of every word instead of all of one word" loading="lazy"><figcaption>Spread out, a burst of noise becomes a few small holes that error correction can repair</figcaption></figure>

**Hiding a lost packet.** And when a packet goes **completely missing**, too damaged to repair? Then the receiver replaces it with **the last correctly received packet**. One repeated packet of 20 milliseconds you do not even hear. Several in a row and you get the famous **robot voice**, the metallic stutter anyone who has used DMR or D-STAR on the edge of a repeater will recognise. After that: silence.

## 7. Analogue versus digital: the cliff

Then the comparison everyone was waiting for. With **analogue**, quality drops faster and more gradually as the signal gets weaker: first a bit of hiss, then more noise, and at the end you are digging words out of the static. **Digital stays good for longer**, without crackle or interference, because the error correction keeps the sound clean almost all the way down. And then, when it can no longer keep up, it falls off a cliff. One moment fine, the next moment nothing.

But Patrick was honest: with a **good signal, analogue sounds better**. With analogue you can reach something close to hi-fi. With digital, the codec has already done everything to the sound to fit it into so few bits. It is very understandable, but it is not hi-fi.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv6-digital-cliff-light.svg" alt="Audio quality against signal strength: analogue FM rises gradually and ends highest; digital voice is flat and clean over most of the range and drops sharply at the weak end" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv6-digital-cliff-dark.svg" alt="Audio quality against signal strength: analogue FM rises gradually and ends highest; digital voice is flat and clean over most of the range and drops sharply at the weak end" loading="lazy"><figcaption>Digital wins on weak and medium signals, analogue wins on the very strong ones, and only analogue degrades gracefully</figcaption></figure>

## 8. What can you do with it?

Quite a lot, it turns out:

- **Contacts**, radio to radio, no infrastructure at all.
- **Repeaters**, just like FM, but with your callsign or ID on the other station's display.
- **Hotspots and network repeaters**, which link your signal over the internet.
- **Talkgroups, rooms and reflectors** within a group: talkgroups on DMR (on networks such as BrandMeister, TGIF and DMR+), rooms on Fusion, reflectors on D-STAR. The idea is the same: a virtual meeting place where everyone who joins hears everyone else.
- **Callsign to callsign** (or ID to ID), a direct call, but still on an open connection that others can hear.
- A **dynamic group**, a talkgroup that you switch on when you need it. While listening I wondered whether that might be a good idea for **WLD**, and I made a note of it: a meeting point of our own for members, wherever they happen to be.
- **Short text messages** (SMS), position data, and **Fusion can even send photos** with the right camera microphone.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv7-network-light.svg" alt="Your radio reaches a repeater or a hotspot by radio; these connect over the internet to a reflector, room or talkgroup, which passes the signal on to other repeaters, hotspots and radios anywhere" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv7-network-dark.svg" alt="Your radio reaches a repeater or a hotspot by radio; these connect over the internet to a reflector, room or talkgroup, which passes the signal on to other repeaters, hotspots and radios anywhere" loading="lazy"><figcaption>Only the first and last few metres, or kilometres, are radio; the rest of the trip goes over the internet</figcaption></figure>

## 9. On the air: everyone in their own bubble

Then the downside, which Patrick did not hide. **Radios with different protocols are not compatible.** A D-STAR handheld hears a DMR signal as noise, and the other way round. And with DMR, some radios do not even work well **with each other**: brands make their own bubble. For a newcomer in front of a shelf of radios that is confusing. Which one do you buy? The honest answer: the mode your local repeaters and your club friends use.

## 10. Fusion and D-STAR versus DMR

**Fusion and D-STAR are callsign based**: your callsign is your identity. **DMR is organised around IDs**: you get a number, which is linked to your callsign. That is no coincidence. **DMR was not made for radio amateurs**, but for professional users such as police, fire brigades, transport companies and factories. Hams adopted it later.

| Mode | From | Channel sharing | Modulation | Codec | Organised around |
|---|---|---|---|---|---|
| D-STAR | JARL (Japan), early 2000s | one stream | GMSK | AMBE | callsign |
| System Fusion (YSF) | Yaesu, 2013 | one stream | C4FM | AMBE+2 | callsign |
| DMR | ETSI (Europe), professional | 2 time slots (TDMA) | 4FSK | AMBE+2 | numeric ID |
| dPMR / NXDN | professional | narrow channels (FDMA) | 4FSK | AMBE+2 | numeric ID |
| P25 | APCO (US public safety) | one stream | C4FM | IMBE / AMBE+2 | numeric ID |
| M17 | open source hams, 2019 onwards | one stream | 4FSK | Codec 2 | callsign |
| FreeDV (HF) | open source hams | many carriers | OFDM | Codec 2 / RADE | callsign |

And that professional background shows in the **programming**. It is not simple, and with DMR often far too complicated. In practice **codeplugs are passed on from one ham to the next without any knowledge of what is inside**. That led to Patrick's most practical advice of the evening: **do not just load a complete codeplug. Try to understand what is behind it.**

A **codeplug** is the complete configuration of a DMR radio, made with the **CPS** (Customer Programming Software) of the manufacturer. A borrowed codeplug works, until something changes: a repeater moves to another talkgroup, or you want to add your hotspot. Then you are looking at hundreds of entries you never made yourself. Yet a codeplug has only a few layers:

- **Contacts**: the talkgroups (and people) you want to call, for example TG 206 (Belgium), TG 91 (worldwide) and TG 9990 (Parrot, an echo test on BrandMeister).
- **RX group lists**: the talkgroups your radio lets through to the loudspeaker. The rest stays silent.
- **Channels**: the heart of it. A channel combines a receive and transmit frequency, a **color code** (a number from 0 to 15 that tells your radio which repeater it is talking to, a bit like a CTCSS tone in FM), a **timeslot**, the **contact** you transmit to and the **RX group list** you listen to.
- **Zones**: folders that group channels, such as "Home", "Hotspot" and "On the road".

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv9-codeplug-light.svg" alt="Anatomy of a DMR codeplug: a zone holds channels; a channel combines receive and transmit frequency, color code, timeslot, a contact to talk to and an RX group list to listen to" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv9-codeplug-dark.svg" alt="Anatomy of a DMR codeplug: a zone holds channels; a channel combines receive and transmit frequency, color code, timeslot, a contact to talk to and an RX group list to listen to" loading="lazy"><figcaption>Build it in this order: contacts and RX group lists first, then channels that use them, then zones that group the channels</figcaption></figure>

Start small: three contacts, one RX group list, two channels, one zone. Write it to the radio, test, and only then add more. A codeplug you built yourself, however tiny, teaches you more than a huge one you downloaded.

## 11. Networks: top down or bottom up

Patrick summed up the difference between the two big families in one sentence I wrote down: **DMR was developed top down, D-STAR bottom up.**

DMR came from the professional world (fire brigade, police) as a finished system. Hams adapted it to their use, but **there is only so much you can change about it**. D-STAR grew **from the base upwards**, made by and for radio amateurs, with **reflectors** where repeaters link together and **callsign routing**: call a specific station by its callsign, and the network finds the repeater where that station was last heard.

## 12. Hotspots

A **hotspot** is a tiny box at home, often a Raspberry Pi with a small radio board (an MMDVM), that connects your handheld to the internet over a few metres with only milliwatts. No digital repeater within reach, or living in a flat or a city like me? A hotspot opens the door to the networks anyway. On it you choose which talkgroup, room or reflector you want to be on.

## 13. History, and why DV is interesting

Patrick then went back to the roots. Why is digital voice interesting at all?

- **It is reliable.** As we saw: clean audio down to weak signals.
- **It is all ones and zeros**, so it is easy to process and to intervene in: add your callsign, check for errors, repair, route over the internet.
- **APCO.** Professional users went digital first. In the United States the public safety world started work on its **APCO P25** standard back in 1989.
- **JARL and D-STAR.** For radio amateurs the big step came from Japan, where the national society JARL designed **D-STAR** around the turn of the century: the first digital voice system made by hams, for hams.
- **Repeaters generate users.** A new mode only lives when there is something to talk to. Put a digital repeater on a hill and suddenly people buy radios for it. That simple rule explains a lot about which modes became popular where. Ham DV started with D-STAR for exactly that reason.

## 14. FreeDV: digital voice on HF

Everything so far was mainly VHF and UHF. On HF the story is different, and in my view the most exciting part. HF signals fade, bounce off the ionosphere and arrive via several paths at once, conditions that would chew up a VHF digital signal.

**FreeDV** is the open source answer: a free program on a computer connected to an ordinary SSB transceiver. Instead of a single carrier hopping between tones, FreeDV sends **many small carriers side by side** (a technique called OFDM, also used in Wi-Fi and digital radio). Each carrier only has to carry a few bits slowly, which makes the whole signal much tougher against fading and echoes.

The newest FreeDV mode, **RADE** (Radio Autoencoder, released in 2025), goes a step further and uses machine learning, a small neural network trained to send speech through a noisy HF channel. According to its developers it fits in about **1.5 kHz**, roughly half of an SSB signal, and it remains usable at signal-to-noise ratios as low as **minus 2 dB**, where SSB is mostly noise. And the first manufacturers are building it in: since this summer there is a downloadable FreeDV module for some FlexRadio models.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv8-freedv-light.svg" alt="HF spectrum: an SSB voice signal about 2.7 kHz wide next to a FreeDV signal of about 1.5 kHz made of many small carriers side by side" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv8-freedv-dark.svg" alt="HF spectrum: an SSB voice signal about 2.7 kHz wide next to a FreeDV signal of about 1.5 kHz made of many small carriers side by side" loading="lazy"><figcaption>SSB spreads your voice over almost 3 kHz; FreeDV packs it into a neat block of small carriers about half as wide</figcaption></figure>

## 15. Something to think about

The best part came at the end, when Patrick put the technology away and looked back.

D-STAR arrived with high expectations, and for many it turned into a **disappointment**. Then came **DMR**. Then **Fusion**. And after that still more. Each new mode promised to be the one, and **none of them was ever compatible with the others**. In Patrick's words, the **fighting and the egos won**: every camp built its own system, its own network and its own fans. And then the paradox he left us with: **more possibilities led to fewer QSOs.** Where once everyone sat on the same FM repeater, the same people are now spread over modes, networks, talkgroups and reflectors, and each of those places is often quiet.

He did not answer the questions himself. That was the point. Two of them stuck with me.

<div class="dv-box dv-q" markdown="1">
<p class="dv-box-label">Question 1</p>

**Did the bidding war between individual camps make digital voice fragment, and maybe even fail?**
</div>

One side of the argument: imagine if all radio amateurs had agreed on one digital standard twenty years ago. Every repeater would speak it, every radio would understand it, and a newcomer would not have to study a comparison table before buying a handheld. Analogue FM won precisely because everyone could talk to everyone. And the quiet talkgroups seem to prove the point.

The other side: amateur radio has always been about experimenting. Without competition there would be no Fusion making room for FM users, no open M17 as an answer to closed codecs, and no FreeDV pushing HF voice forward. Fragmentation is the price of freedom. And "failed" is a big word for modes that thousands of hams use every day.

<div class="dv-box dv-q" markdown="1">
<p class="dv-box-label">Question 2</p>

**Is this a real QSO?**

You press the button on your handheld, a hotspot on your desk sends your voice into the internet, and a station in Australia answers. You both enjoyed the chat. But did any radio wave actually travel between you?
</div>

One view: the magic of amateur radio is that the signal crosses the distance by itself, over the ionosphere, past the horizon, with your antenna and your skill. If the internet does the long-distance part, it is a nice conversation, but not a radio contact in the classic sense. Most awards and contests agree, and do not count contacts made through internet linking.

The other view: a contact is two people talking by radio, and both of them *did* use a radio. Repeaters have relayed our signals for decades without anyone questioning those contacts. The internet is just a very long repeater. And for someone in a flat without room for an antenna, a hotspot can be the door into the hobby.

I have not made up my mind. As a newcomer whose first real thrill was hearing a station from the other side of the world come through on 25 W with nothing in between but the sky, I feel the pull of the first view. But every day I also see other radio amateurs who keep in touch through a talkgroup, and I find it hard to say that does not count. Perhaps the honest answer is that both are amateur radio, and that they are simply two different joys.

## Thank you, Patrick

A big thank you to Patrick, ON4PN, for a clear and entertaining evening, and for not letting us go home without something to chew on. Twenty-five years after his ON3 course in the same building, he is still teaching WLD something new. That alone says a lot about this hobby. Patrick also mentioned that he might come back for an extra workshop, to set up digital radios together. That sounds like the perfect next step after this evening.

If you were there and noted something I missed, or if you see something that is not quite right, let me know.

73 de ON3VZ

<p class="dv-divider">Extra: getting started yourself</p>

## Getting started with DMR, step by step

For the beginners among us, here is the route in concrete steps.

1. **Get a DMR ID.** Go to [RadioID.net](https://radioid.net), create an account and request a DMR ID. You upload a scan or photo of your licence (the BIPT licence document with your callsign). Approval usually takes a day or two. Your ID is a seven-digit number linked to your callsign, so your call and name appear on other people's displays.
2. **Install the programming software (CPS).** Download the CPS for your exact radio model from the manufacturer or the seller, usually a Windows program. Use the programming cable that belongs to the radio: cheap copy cables are the number one cause of "the radio does not connect".
3. **Make a backup first.** Connect the radio, choose *Read from radio* in the CPS, and save that file somewhere safe *before* you change anything. If you mess up, you write the backup back and you are where you started.
4. **Find your local repeaters.** Look them up on the [UBA](https://www.uba.be) repeater lists, the club website or [RepeaterBook](https://www.repeaterbook.com), and note for each one: output frequency, offset, color code, and which talkgroups are on which timeslot.
5. **Build your codeplug.** First your own DMR ID and callsign in the general radio settings. Then contacts (TG 206, TG 9990, TG 91), then an RX group list, then one channel per repeater and talkgroup, then a zone. Write it to the radio (*Write to radio*).
6. **Test on the Parrot.** Select your channel with TG 9990 (on a BrandMeister repeater or hotspot), press the button, say your callsign and "test", and let go. A few seconds later the Parrot plays your own transmission back. Do you sound good? Then your radio, codeplug and network path all work.
7. **Listen first, then call.** Listen for a while to learn how people operate on that talkgroup. Then give your callsign and make a short call. Leave a pause of a second or two after the other station lets go, so others can join in.

And the classic mistakes, so you can skip them: **kerchunking** (pressing the button without saying anything, just to hear the repeater), very long overs on a busy worldwide talkgroup, forgetting to give your callsign, and changing the codeplug without a backup.

## Getting started with D-STAR

D-STAR works a little differently, because it was built around callsigns:

1. **A D-STAR radio.** A plain FM handheld or a DMR radio will not do. Icom has the widest range; Kenwood's TH-D74 and TH-D75 also do D-STAR.
2. **Register your callsign** on the D-STAR network. There is no number like a DMR ID; your callsign is your identity. Registration is done once, usually through a repeater gateway (ask the repeater keeper or the club how it works locally). Without it, the gateways will not pass your traffic onto the internet.
3. **Understand the four fields.** Every D-STAR transmission carries four callsigns:
    - **MYCALL**: you, your own callsign.
    - **URCALL**: who you are calling. `CQCQCQ` for a general call, a callsign for a direct call, or a short command (for example to link to a reflector).
    - **RPT1**: the repeater you transmit into, with the module letter (B is 70 cm, C is 2 m).
    - **RPT2**: that repeater's gateway, the same callsign with the letter G, which sends your signal onto the internet.
    - **DR mode**: modern Icom radios fill in these fields for you when you pick a repeater from a list. Handy, but worth understanding what happens.
4. **Link to a reflector.** A reflector is a shared meeting room on the internet. You link to it by sending a short command in the URCALL field; a voice announcement confirms the link.
5. **Listen, then call.** Just like DMR: listen first, give your callsign, keep pauses. No answer? Try a busier reflector or a club net.

## My own first steps: a Baofeng DM-1801 Pro

The talk did what a good talk should do: it made me want to try. I have since bought a cheap DMR handheld, a **Baofeng DM-1801 Pro** (dual band VHF and UHF, Tier II, two timeslots). Not to become a DMR expert overnight, but purely to **experiment**. My plan follows Patrick's advice: request my DMR ID, read and save the factory codeplug, and then build my own small codeplug, one contact and one channel at a time, until I understand every field in it.

If that works, the next step is probably a small **hotspot** at home, so I am not dependent on reaching a repeater from the city. And who knows, maybe a WLD talkgroup will be one of the first entries in it. I will report back here.

## Digital voice jargon in plain English

A reference list of the words that fly around as soon as digital voice comes up.

| Term | What it means |
|---|---|
| **4FSK** | Modulation where the carrier jumps between four frequencies, two bits per jump. Used by DMR, dPMR, NXDN and M17. |
| **AMBE / AMBE+2** | The closed vocoder family used by D-STAR, Fusion, DMR, NXDN and P25. |
| **BER** | Bit error rate: the share of bits that arrive damaged. The real quality meter of a digital signal. |
| **C4FM** | A smoothed form of 4FSK, used by Yaesu System Fusion and P25. Not by DMR. |
| **Callsign routing** | D-STAR feature: call a station by callsign and the network finds the repeater where it was last heard. |
| **Codec** | Coder and decoder: the software that compresses your voice into a small data stream and back. |
| **Codec 2** | The open source codec by David Rowe, VK5DGR, used by FreeDV and M17. |
| **Codeplug** | The complete configuration file of a DMR radio: channels, contacts, zones, buttons. |
| **Color code (CC)** | A number from 0 to 15 that tells a DMR radio which repeater it belongs to, comparable to a CTCSS tone. |
| **CPS** | Customer Programming Software, the program you use to build and write a codeplug. |
| **Digital cliff** | The sudden drop from clean audio to nothing when a digital signal gets too weak. |
| **DMR ID** | Your seven-digit number on DMR, linked to your callsign, requested at RadioID.net. |
| **FDMA** | Sharing spectrum by giving each conversation its own narrow channel (dPMR, NXDN). |
| **FEC** | Forward error correction: extra bits that let the receiver repair errors on its own. |
| **Gateway** | The link between a repeater and an internet network. In D-STAR the G in RPT2. |
| **GMSK** | The smooth two-level modulation used by D-STAR. |
| **Hotspot** | A small device at home that links your handheld to a digital network over the internet, using only milliwatts. |
| **Interleaving** | Spreading the bits of a word over the transmission, so a burst of interference damages a little of many words instead of all of one. |
| **MMDVM** | Multi-Mode Digital Voice Modem: the radio board inside most hotspots and many amateur repeaters. |
| **NAC / RAN** | The P25 and NXDN equivalents of the DMR color code. |
| **OFDM** | Many small carriers side by side, each carrying a few bits. Used by FreeDV on HF. |
| **Parrot** | An echo service (TG 9990 on BrandMeister) that plays your transmission back so you can hear yourself. |
| **Reflector** | A shared meeting point on an internet server where repeaters and hotspots join the same conversation (D-STAR, YSF, M17). |
| **Room** | The Fusion (WIRES-X) name for a reflector. |
| **RX group list** | The list of talkgroups a DMR channel lets through to your loudspeaker. |
| **Talkgroup (TG)** | A DMR virtual meeting room, identified by a number, such as TG 206 for Belgium. |
| **TDMA** | Sharing one channel by taking turns in very short time slots (DMR). |
| **Timeslot (TS1, TS2)** | One of the two alternating 30 ms slots of DMR, each carrying its own conversation. |
| **Vocoder** | The part of the codec that analyses speech and rebuilds it at the other end. |
| **Zone** | A folder of channels in a DMR codeplug. |

## Further reading

- [WLD, the club](https://on6wl.be)
- [EvoHam: What is digital voice in ham radio?](https://evoham.com/digital-voice-in-ham-radio/)
- [EvoHam: Ham radio digital voice terminology](https://evoham.com/ham-radio-digital-voice-terminology/)
- [EvoHam: DMR for beginners](https://evoham.com/dmr-for-beginners/)
- [EvoHam: D-STAR for beginners](https://evoham.com/dstar-for-beginners/)
- [RadioID.net: request your DMR ID](https://radioid.net)
- [BrandMeister DMR network](https://brandmeister.network)
- [FreeDV project](https://freedv.org)
- [FreeDV: RADE, the Radio Autoencoder](https://freedv.org/radio-autoencoder/)
- [ARDC: FreeDV RADE, a new approach to digital voice over HF](https://www.ardc.net/?p=11880)
- [ARRL: Will RADE be the next SSB?](https://www.arrl.org/news/will-rade-be-the-next-ssb)
- [M17 Project](https://m17project.org)

</div>

<div id="dv-nl" markdown="1">

<p class="dv-kicker">ON3VZ · Clubavond WLD · 9 oktober 2026</p>
<p class="dv-lead">Een vrijdagavond bij WLD, een spreker die in datzelfde gebouw begon, en een voordracht die startte bij enen en nullen en eindigde met een vraag waar niemand echt een antwoord op had: is dit nog een echte QSO?</p>
<p class="dv-byline">Kristof Cornelis, ON3VZ · verslag van een voordracht door Patrick, ON4PN</p>
<div class="dv-lang"><a href="#dv-en" data-lang="en">🇬🇧 Read in English</a><a class="is-active" href="#dv-nl" data-lang="nl">Nederlands</a></div>

Op vrijdag 9 oktober had onze sectie [WLD](https://on6wl.be) een gast die eigenlijk geen introductie nodig had: **Patrick, [ON4PN](https://www.qrz.com/db/ON4PN)**. Patrick is een bekend gezicht in de Belgische radioamateurwereld en heeft deze voordracht over digitale spraakmodes al meermaals gegeven. Maar deze avond had een mooie twist. Zo'n 25 jaar geleden zette Patrick hier zijn allereerste stappen in de hobby: hij volgde de **ON3-cursus bij WLD, in hetzelfde gebouw** waar hij nu voor ons stond. Van cursist op de achterste rij naar spreker vooraan: als dat geen cirkel is die rond is, dan weet ik het niet.

Het onderwerp: **digitale spraak**, of DV (digital voice). Op HF gaat het dan over FreeDV, op VHF en UHF over D-STAR, System Fusion, DMR en nog een handvol namen die je op repeaterlijsten en in catalogi van radiowinkels ziet staan. Wat zijn het, hoe werken ze, en wat kan een radioamateur er eigenlijk mee?

Ik nam notities, zeer beknopte. Dit verslag volgt de volgorde van de voordracht, zodat wie erbij was alles herkent. Onderweg vulde ik aan met achtergrond die ik achteraf opzocht, zodat ook wie nog nooit met DV bezig was kan volgen. Achteraan vind je een praktische start voor beginners en een lijst met het jargon. Eventuele fouten in het aanvullende materiaal zijn de mijne, niet die van Patrick.

## 1. Achtergrond: een protocol is gewoon een afspraak

Patrick begon bij het begin. Het woord dat de hele avond terugkwam, was **protocol**. Dat klinkt technisch, maar het is niets meer dan een afspraak: *zo moet het gebeuren*. Elke digitale mode heeft zijn eigen afspraak over:

- **hoe spraak en data geordend worden** in de digitale stroom. Als iedereen hetzelfde protocol begrijpt, kan die stroom uitgewisseld worden;
- **hoe de enen en nullen uitgezonden worden**. In een toestel is een bit een blokgolf: aan of uit;
- **de volgorde**: elke mode heeft een eigen, unieke code, met de enen en nullen op een vaste manier gesorteerd, te beginnen met een **header** en gevolgd door de **data**.

Alles wordt verstuurd in **pakketjes met een duidelijk begin en einde**. Daartussen zit **synchronisatie** die de toestellen begrijpen, zodat ze precies weten waar elk stukje begint. En het is niet alleen je stem die reist: **spraak en data gaan samen mee**, zodat je roepnaam, een sms of je positie met je woorden kan meeliften.

Dat is het hele verhaal van digitale spraak in één zin, en ook de bron van de meeste problemen, zoals we verder zullen zien: kennen beide toestellen de afspraak, dan begrijpen ze elkaar. Kennen ze die niet, dan hoor je niets.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv1-voice-to-antenna-nl-light.svg" alt="De keten van microfoon via codec, foutbescherming en pakketten naar de modulator, en het ontvangende toestel dat hetzelfde omgekeerd doet" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv1-voice-to-antenna-nl-dark.svg" alt="De keten van microfoon via codec, foutbescherming en pakketten naar de modulator, en het ontvangende toestel dat hetzelfde omgekeerd doet" loading="lazy"><figcaption>Elke digitale spraakmode volgt dezelfde vijf stappen; alleen de details per stap verschillen</figcaption></figure>

## 2. Modulatie: hoe de blokgolf de lucht in gaat

Naast de protocollen zijn er ook nog de **modulatiesoorten**: de manier waarop we van de bits een radiosignaal maken. Hier maakte Patrick een punt waar ik nooit helder over had nagedacht: **het protocol en de modulatie zijn twee verschillende dingen**. Het protocol zegt *welke* bits je verstuurt en in welke volgorde. De modulatie is *hoe* die bits een radiogolf worden.

Radio houdt niet van harde blokranden (die spatten over de hele band), dus worden de bits afgerond en omgezet in kleine, gecontroleerde verschuivingen van de draaggolf. De meest gebruikte truc op VHF en UHF is **vierniveau-FSK (4FSK)**: de draaggolf springt tussen vier licht verschillende frequenties, en elk van die vier posities staat voor een paar bits. Vier tonen, twee bits per toon.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv3-4fsk-nl-light.svg" alt="4FSK: de draaggolf stapt tussen vier frequentieniveaus, elk goed voor een paar bits" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv3-4fsk-nl-dark.svg" alt="4FSK: de draaggolf stapt tussen vier frequentieniveaus, elk goed voor een paar bits" loading="lazy"><figcaption>Vier posities van de draaggolf, elk goed voor twee bits. DMR, System Fusion, dPMR, NXDN en M17 gebruiken hier allemaal een vorm van</figcaption></figure>

Bepaalde protocollen gebruiken bepaalde modulaties, en bepaalde manieren om het kanaal te delen. **DMR** gebruikt 4FSK en deelt het kanaal in de **tijd** (TDMA, daarover verder meer). **dPMR** gebruikt ook 4FSK, maar deelt in **frequentie** (FDMA): elk gesprek krijgt een eigen smal kanaal. Yaesu's **System Fusion** gebruikt **C4FM**, dat is 4FSK met een extra afvlakfilter. (Een veelgemaakte verwarring: DMR gebruikt *geen* C4FM.) **D-STAR** is de vreemde eend in de bijt met **GMSK**, een zachte verschuiving tussen twee niveaus, dus één bit per stap.

## 3. DMR: twee gesprekken op één frequentie

Dan zoomde Patrick in op DMR. Het bestaat in **fases, of tiers**: Tier I is een eenvoudige licentievrije versie voor 446 MHz, Tier II is het conventionele systeem dat radioamateurs gebruiken, Tier III voegt trunking toe voor grote professionele netwerken. Binnen één protocol zijn er dus nog verschillende types.

De kern van DMR Tier II: het zendt **pakketjes na elkaar uit in tijdseenheden**. Slot 1, slot 2, slot 1, slot 2... elk slot duurt 30 milliseconden. Je toestel zendt alleen in zijn eigen slot, en het kan **naar maar één van de twee sloten luisteren**. Dertig milliseconden is veel te kort voor je oor, dus beide gesprekken klinken doorlopend. Het resultaat: **op één frequentie kan je twee gesprekken tegelijk voeren.** En omdat een handheld maar de helft van de tijd zendt, gaat de batterij langer mee.

**D-STAR werkt anders** en gebruikt de bandbreedte op een andere manier: een constante stroom op één kanaal, zonder sloten. dPMR en NXDN kiezen de derde weg: twee smalle kanalen naast elkaar.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv4-slots-nl-light.svg" alt="Links FDMA met twee smalle kanalen naast elkaar; rechts DMR TDMA met één kanaal en afwisselende sloten van 30 ms" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv4-slots-nl-dark.svg" alt="Links FDMA met twee smalle kanalen naast elkaar; rechts DMR TDMA met één kanaal en afwisselende sloten van 30 ms" loading="lazy"><figcaption>Twee manieren om een kanaal te delen: opsplitsen in frequentie (naast elkaar), of opsplitsen in tijd (na elkaar)</figcaption></figure>

## 4. Wat zit er in een uitzending?

Vervolgens: wat reist er nu eigenlijk in zo'n stroom pakketjes? Bij elke mode ongeveer hetzelfde:

- een **header** aan het begin, met:
    - een **synchronisatie**patroon ("wakker worden, er komt iets aan"),
    - **controlevlaggen** (wat voor verkeer er volgt),
    - de **ID-gegevens**: je roepnaam of DMR ID,
    - een **checksum** om te controleren of de header correct aangekomen is;
- dan de **data**: een spraakframe, een stukje digitale data, een spraakframe, digitale data, enzovoort tot het laatste spraakframe, opnieuw gevolgd door een **checksum**.

De synchronisatie wordt onderweg herhaald, zodat een toestel dat halverwege een beurt inschakelt toch kan inhaken.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv2-packet-nl-light.svg" alt="Een digitale spraakuitzending als een trein van blokjes: header met sync, vlaggen, roepnaam en checksum, dan spraak en data om beurten, dan een eindmarkering" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv2-packet-nl-dark.svg" alt="Een digitale spraakuitzending als een trein van blokjes: header met sync, vlaggen, roepnaam en checksum, dan spraak en data om beurten, dan een eindmarkering" loading="lazy"><figcaption>Eén beurt, bekeken als bits: een header, dan spraak en data om beurten, dan een eindmarkering</figcaption></figure>

## 5. Van stem naar bits: de AMBE-codec

Voor er iets verstuurd kan worden, moet je analoge stem binair worden. Dat is de taak van de **codec** (coder en decoder); het deel dat je spraak analyseert en aan de andere kant weer opbouwt, heet de **vocoder**. De meest gebruikte is **AMBE**. Het is een **gesloten systeem**: je koopt de chip of de licentie, maar je mag niet binnenkijken. Het doel is **maximale verstaanbaarheid met minimaal dataverbruik**, want een radiokanaal kan maar een paar duizend bits per seconde dragen.

Het is geen hoogtechnologisch toverwerk met een moeilijk woord eraan, zei Patrick, al bestaat dat moeilijke woord wel: **psycho-akoestische compressie**. Het idee is heel menselijk. Je oren en je hersenen werken samen, en je hersenen kiezen voortdurend op welke tonen ze focussen. Je hersenen passen zich aan de omstandigheden aan: in een druk café volg je nog altijd de persoon tegenover je. De codec doet hetzelfde. Hij houdt bij wat je hersenen nodig hebben om spraak te verstaan en laat weg wat ze toch zouden negeren. Met zulke algoritmes kan de hoeveelheid data drastisch omlaag, terwijl de stem perfect verstaanbaar blijft.

Het open alternatief is **Codec 2**, geschreven door David Rowe, VK5DGR, precies omdat veel radioamateurs geen gesloten doos in het hart van hun hobby wilden. Het wordt gebruikt door FreeDV op HF en door de open mode M17.

## 6. Foutcorrectie: herstellen zonder opnieuw te vragen

Radio is nooit perfect. Een passerende vrachtwagen, een zwak signaal, wat storing, en sommige bits komen verkeerd aan. Het aandeel bits dat beschadigd aankomt, heet de **bit error rate (BER)**, het echte "rapport" van een digitaal signaal. Patrick legde uit hoe DV daarmee omgaat, en hier wordt het slim.

**Voorwaartse foutcorrectie (FEC, forward error correction).** De zender "kijkt vooruit": samen met je stem stuurt hij extra bits mee, berekend uit de spraakbits, zodat een deel van de informatie in feite **twee keer gezegd** wordt, samen met een checksum. Beschadigt ruis onderweg een bit, dan merkt de ontvanger dat de extra bits niet meer kloppen, rekent hij uit welke bit fout was en herstelt hij die, **zonder het andere station ooit te vragen om opnieuw te zenden**. Dat is wat "voorwaarts" betekent. Op een spraakkanaal is er trouwens geen tijd om te vragen.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv5-error-correction-nl-light.svg" alt="Boven: data plus reservebits, één bit omgedraaid door ruis en hersteld door de ontvanger. Onder: een verloren spraakblokje vervangen door het vorige goede blokje" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv5-error-correction-nl-dark.svg" alt="Boven: data plus reservebits, één bit omgedraaid door ruis en hersteld door de ontvanger. Onder: een verloren spraakblokje vervangen door het vorige goede blokje" loading="lazy"><figcaption>Twee vangnetten: herstellen wat beschadigd is, en verdoezelen wat verloren is</figcaption></figure>

**Bits spreiden (interleaving).** Storing komt zelden als één enkele bit; meestal is het een korte piek die meerdere bits na elkaar uitwist. Daarom worden de bits voor het zenden **gespreid**: een stukje van woord A, een stukje van B, een stukje van C, dan weer A. Een stoorpiek raakt dan van elk woord een beetje in plaats van één woord helemaal, en elk beschadigd stukje is klein genoeg om door de foutcorrectie aangevuld te worden.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv10-interleaving-nl-light.svg" alt="Interleaving: de bits van elk woord worden gespreid, zodat een stoorpiek elk woord een beetje raakt in plaats van één woord helemaal" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv10-interleaving-nl-dark.svg" alt="Interleaving: de bits van elk woord worden gespreid, zodat een stoorpiek elk woord een beetje raakt in plaats van één woord helemaal" loading="lazy"><figcaption>Gespreid wordt een stoorpiek een paar kleine gaatjes die de foutcorrectie kan herstellen</figcaption></figure>

**Een verloren pakketje verbergen.** En als een pakketje **volledig ontbreekt**, te zwaar beschadigd om te herstellen? Dan vervangt de ontvanger het door **het laatst correct ontvangen pakketje**. Eén herhaald pakketje van 20 milliseconden hoor je niet eens. Meerdere na elkaar, en je krijgt de beruchte **robotstem**, het metalige gestotter dat iedereen herkent die DMR of D-STAR aan de rand van een repeater gebruikt heeft. Daarna: stilte.

## 7. Analoog tegenover digitaal: het klif

Dan de vergelijking waar iedereen op wachtte. Bij **analoog** neemt de kwaliteit sneller en geleidelijk af naarmate het signaal zwakker wordt: eerst wat ruis, dan meer, en op het einde vis je de woorden uit het gekraak. **Digitaal blijft langer goed**, zonder gekraak of storingen, omdat de foutcorrectie het geluid bijna tot het einde zuiver houdt. En dan, wanneer ze het niet meer bijhoudt, valt het van een klif. Het ene moment prima, het volgende niets meer.

Maar Patrick was eerlijk: bij een **goed signaal klinkt analoog beter**. Met analoog haal je bijna hifi. Bij digitaal heeft de codec al van alles met het geluid gedaan om het in zo weinig bits te krijgen. Het is goed verstaanbaar, maar het is geen hifi.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv6-digital-cliff-nl-light.svg" alt="Geluidskwaliteit tegenover signaalsterkte: analoog stijgt geleidelijk en eindigt het hoogst; digitaal is vlak en zuiver over het grootste deel en valt scherp weg aan de zwakke kant" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv6-digital-cliff-nl-dark.svg" alt="Geluidskwaliteit tegenover signaalsterkte: analoog stijgt geleidelijk en eindigt het hoogst; digitaal is vlak en zuiver over het grootste deel en valt scherp weg aan de zwakke kant" loading="lazy"><figcaption>Digitaal wint bij zwakke en middelmatige signalen, analoog bij zeer sterke, en alleen analoog gaat geleidelijk achteruit</figcaption></figure>

## 8. Wat kan je ermee doen?

Heel wat, blijkt:

- **Verbindingen**, toestel naar toestel, zonder enige infrastructuur.
- **Repeaters**, net als bij FM, maar met je roepnaam of ID op het scherm van het andere station.
- **Hotspots en netwerkrepeaters**, die je signaal via het internet doorgeven.
- **Talkgroups, rooms en reflectors** binnen een groep: talkgroups bij DMR (op netwerken zoals BrandMeister, TGIF en DMR+), rooms bij Fusion, reflectors bij D-STAR. Het idee is hetzelfde: een virtuele ontmoetingsplaats waar iedereen die aansluit iedereen hoort.
- **Roepnaam naar roepnaam** (of ID naar ID), een rechtstreekse oproep, maar wel op een open verbinding die anderen kunnen horen.
- Een **dynamische groep**, een talkgroup die je activeert wanneer je hem nodig hebt. Tijdens het luisteren vroeg ik me af of dat misschien een goed idee is voor **WLD**, en ik noteerde het: een eigen ontmoetingsplek voor de leden, waar ze ook zijn.
- **Sms'en versturen**, positiegegevens, en **Fusion kan zelfs foto's verzenden** met de juiste cameramicrofoon.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv7-network-nl-light.svg" alt="Je toestel bereikt per radio een repeater of hotspot; die verbinden via het internet met een reflector, room of talkgroup, die het signaal doorgeeft aan andere repeaters, hotspots en toestellen" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv7-network-nl-dark.svg" alt="Je toestel bereikt per radio een repeater of hotspot; die verbinden via het internet met een reflector, room of talkgroup, die het signaal doorgeeft aan andere repeaters, hotspots en toestellen" loading="lazy"><figcaption>Alleen de eerste en laatste paar meter, of kilometer, zijn radio; de rest van de reis gaat over het internet</figcaption></figure>

## 9. In de ether: iedereen in zijn eigen bubbel

En dan de keerzijde, die Patrick niet verstopte. **Toestellen met andere protocollen zijn niet compatibel.** Een D-STAR-handheld hoort een DMR-signaal als ruis, en omgekeerd. En bij DMR werken sommige toestellen zelfs **onderling** niet goed samen: merken maken hun eigen bubbel. Voor een beginner voor een rek vol toestellen is dat verwarrend. Welk koop je? Het eerlijke antwoord: de mode die je lokale repeaters en je clubvrienden gebruiken.

## 10. Fusion en D-STAR tegenover DMR

**Fusion en D-STAR zijn gebaseerd op roepnamen**: je roepnaam is je identiteit. **DMR is georganiseerd rond ID's**: je krijgt een nummer, dat aan je roepnaam gekoppeld wordt. Dat is geen toeval. **DMR werd niet gemaakt voor radioamateurs**, maar voor professionele gebruikers zoals politie, brandweer, transportbedrijven en fabrieken. Radioamateurs namen het later over.

| Mode | Afkomstig van | Kanaal delen | Modulatie | Codec | Georganiseerd rond |
|---|---|---|---|---|---|
| D-STAR | JARL (Japan), begin jaren 2000 | één stroom | GMSK | AMBE | roepnaam |
| System Fusion (YSF) | Yaesu, 2013 | één stroom | C4FM | AMBE+2 | roepnaam |
| DMR | ETSI (Europa), professioneel | 2 tijdsloten (TDMA) | 4FSK | AMBE+2 | nummer (ID) |
| dPMR / NXDN | professioneel | smalle kanalen (FDMA) | 4FSK | AMBE+2 | nummer (ID) |
| P25 | APCO (VS, hulpdiensten) | één stroom | C4FM | IMBE / AMBE+2 | nummer (ID) |
| M17 | open source radioamateurs, vanaf 2019 | één stroom | 4FSK | Codec 2 | roepnaam |
| FreeDV (HF) | open source radioamateurs | veel draaggolven | OFDM | Codec 2 / RADE | roepnaam |

En die professionele achtergrond merk je aan de **programmering**. Die is niet eenvoudig, en bij DMR vaak veel te ingewikkeld. In de praktijk worden **codeplugs van de ene radioamateur aan de andere doorgegeven zonder enige kennis van wat erin zit**. Dat leidde tot Patricks meest praktische advies van de avond: **laad niet zomaar een complete codeplug in. Probeer te begrijpen wat erachter zit.**

Een **codeplug** is de volledige configuratie van een DMR-toestel, gemaakt met de **CPS** (Customer Programming Software) van de fabrikant. Een geleende codeplug werkt, tot er iets verandert: een repeater schakelt naar een andere talkgroup, of je wil je hotspot toevoegen. Dan kijk je naar honderden regels die je nooit zelf maakte. Nochtans heeft een codeplug maar een paar lagen:

- **Contacten**: de talkgroups (en personen) die je wil oproepen, bijvoorbeeld TG 206 (België), TG 91 (wereldwijd) en TG 9990 (Parrot, een echotest op BrandMeister).
- **RX-groepslijsten**: de talkgroups die je toestel doorlaat naar de luidspreker. De rest blijft stil.
- **Kanalen**: het hart van alles. Een kanaal combineert een ontvangst- en zendfrequentie, een **color code** (een getal van 0 tot 15 dat je toestel vertelt met welke repeater het praat, een beetje zoals een CTCSS-toon bij FM), een **tijdslot**, het **contact** waarnaar je zendt en de **RX-groepslijst** waarnaar je luistert.
- **Zones**: mappen die kanalen groeperen, zoals "Thuis", "Hotspot" en "Onderweg".

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv9-codeplug-nl-light.svg" alt="Anatomie van een DMR-codeplug: een zone bevat kanalen; een kanaal combineert frequenties, color code, tijdslot, een contact en een RX-groepslijst" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv9-codeplug-nl-dark.svg" alt="Anatomie van een DMR-codeplug: een zone bevat kanalen; een kanaal combineert frequenties, color code, tijdslot, een contact en een RX-groepslijst" loading="lazy"><figcaption>Bouw hem in deze volgorde: eerst contacten en RX-groepslijsten, dan kanalen die ze gebruiken, dan zones die de kanalen groeperen</figcaption></figure>

Begin klein: drie contacten, één RX-groepslijst, twee kanalen, één zone. Naar het toestel schrijven, testen, en pas dan uitbreiden. Een codeplug die je zelf bouwde, ook al is hij piepklein, leert je meer dan een enorme die je downloadde.

## 11. Netwerken: top-down of bottom-up

Patrick vatte het verschil tussen de twee grote families samen in één zin die ik opschreef: **DMR werd top-down ontwikkeld, D-STAR bottom-up.**

DMR kwam uit de professionele wereld (brandweer, politie) als een afgewerkt systeem. Radioamateurs pasten het aan hun gebruik aan, maar **je kan er maar weinig aan veranderen**. D-STAR groeide **van de basis naar boven**, gemaakt door en voor radioamateurs, met **reflectors** waar repeaters aan elkaar gekoppeld worden en **callsign routing**: roep een station op met zijn roepnaam, en het netwerk vindt de repeater waar dat station het laatst gehoord werd.

## 12. Hotspots

Een **hotspot** is een klein kastje thuis, vaak een Raspberry Pi met een klein radiobordje (een MMDVM), dat je handheld over een paar meter, met enkele milliwatts, met het internet verbindt. Geen digitale repeater binnen bereik, of je woont in een appartement of in de stad zoals ik? Een hotspot opent toch de deur naar de netwerken. Daarop kies je op welke talkgroup, room of reflector je wil zitten.

## 13. Geschiedenis, en waarom DV interessant is

Patrick ging dan terug naar de wortels. Waarom is digitale spraak eigenlijk interessant?

- **Het is betrouwbaar.** Zoals we zagen: zuivere audio tot bij zwakke signalen.
- **Het zijn allemaal enen en nullen**, dus makkelijk te bewerken en om in te grijpen: je roepnaam toevoegen, fouten controleren, herstellen, over het internet routeren.
- **APCO.** Professionele gebruikers gingen eerst digitaal. In de Verenigde Staten begonnen de hulpdiensten al in 1989 aan hun **APCO P25**-standaard.
- **JARL en D-STAR.** Voor radioamateurs kwam de grote stap uit Japan, waar de nationale vereniging JARL rond de eeuwwisseling **D-STAR** ontwierp: het eerste digitale spraaksysteem door radioamateurs, voor radioamateurs.
- **Repeaters maken gebruikers.** Een nieuwe mode leeft pas als er iets is om mee te praten. Zet een digitale repeater op een heuvel en plots kopen mensen er toestellen voor. Die eenvoudige regel verklaart veel over welke modes waar populair werden. Ham-DV begon om precies die reden met D-STAR.

## 14. FreeDV: digitale spraak op HF

Alles tot nu toe ging vooral over VHF en UHF. Op HF is het verhaal anders, en voor mij het boeiendste deel. HF-signalen faden, kaatsen tegen de ionosfeer en komen via meerdere wegen tegelijk aan, omstandigheden die een digitaal VHF-signaal aan flarden zouden scheuren.

**FreeDV** is het open source antwoord: een gratis programma op een computer die aan een gewone SSB-transceiver hangt. In plaats van één draaggolf die tussen tonen springt, stuurt FreeDV **veel kleine draaggolven naast elkaar** (een techniek die OFDM heet en ook in wifi en digitale radio zit). Elke draaggolf hoeft maar een paar bits traag te dragen, waardoor het hele signaal veel beter bestand is tegen fading en echo's.

De nieuwste FreeDV-mode, **RADE** (Radio Autoencoder, uitgebracht in 2025), gaat nog een stap verder en gebruikt machine learning: een klein neuraal netwerk dat getraind is om spraak door een ruizig HF-kanaal te sturen. Volgens de ontwikkelaars past het in ongeveer **1,5 kHz**, zowat de helft van een SSB-signaal, en blijft het bruikbaar tot een signaal-ruisverhouding van **min 2 dB**, waar SSB vooral ruis is. En de eerste fabrikanten bouwen het in: sinds deze zomer is er een downloadbare FreeDV-module voor sommige FlexRadio-modellen.

<figure class="dv-fig"><img class="dv-only-light" src="/assets/images/digital-voice/dv8-freedv-nl-light.svg" alt="HF-spectrum: een SSB-spraaksignaal van ongeveer 2,7 kHz naast een FreeDV-signaal van ongeveer 1,5 kHz uit veel kleine draaggolven" loading="lazy"><img class="dv-only-dark" src="/assets/images/digital-voice/dv8-freedv-nl-dark.svg" alt="HF-spectrum: een SSB-spraaksignaal van ongeveer 2,7 kHz naast een FreeDV-signaal van ongeveer 1,5 kHz uit veel kleine draaggolven" loading="lazy"><figcaption>SSB spreidt je stem over bijna 3 kHz; FreeDV verpakt ze in een net blokje kleine draaggolven, ongeveer half zo breed</figcaption></figure>

## 15. Iets om over na te denken

Het beste deel kwam op het einde, toen Patrick de techniek opzijlegde en terugblikte.

D-STAR kwam met hoge verwachtingen, en werd voor velen een **teleurstelling**. Daarna kwam **DMR**. Dan **Fusion**. En daarna nog meer. Elke nieuwe mode beloofde dé mode te worden, en **geen enkele werd ooit compatibel met de andere**. In Patricks woorden: **de strijd en de ego's wonnen**. Elk kamp bouwde zijn eigen systeem, zijn eigen netwerk en zijn eigen fans. En dan de paradox die hij ons meegaf: **meer mogelijkheden leidden tot minder QSO's.** Waar vroeger iedereen op dezelfde FM-repeater zat, zitten dezelfde mensen nu verspreid over modes, netwerken, talkgroups en reflectors, en op elk van die plekken is het vaak stil.

Hij beantwoordde de vragen zelf niet. Dat was net de bedoeling. Twee ervan bleven bij mij hangen.

<div class="dv-box dv-q" markdown="1">
<p class="dv-box-label">Vraag 1</p>

**Heeft het opbod van individuele kampen digitale spraak doen versnipperen, en misschien zelfs doen mislukken?**
</div>

De ene kant van het verhaal: stel dat alle radioamateurs twintig jaar geleden één digitale standaard hadden afgesproken. Elke repeater zou hem spreken, elk toestel zou hem begrijpen, en een beginner zou geen vergelijkingstabel moeten bestuderen voor hij een handheld koopt. Analoge FM won precies omdat iedereen met iedereen kon praten. En de stille talkgroups lijken dat te bewijzen.

De andere kant: radioamateurisme draait al altijd om experimenteren. Zonder concurrentie was er geen Fusion die plaats maakte voor FM-gebruikers, geen open M17 als antwoord op gesloten codecs, en geen FreeDV die spraak op HF vooruit duwt. Versnippering is de prijs van vrijheid. En "mislukt" is een groot woord voor modes die duizenden radioamateurs elke dag gebruiken.

<div class="dv-box dv-q" markdown="1">
<p class="dv-box-label">Vraag 2</p>

**Is dit een echte QSO?**

Je drukt op de knop van je handheld, een hotspot op je bureau stuurt je stem het internet op, en een station in Australië antwoordt. Jullie genoten allebei van het gesprek. Maar is er eigenlijk een radiogolf tussen jullie gereisd?
</div>

De ene visie: de magie van radioamateurisme is dat het signaal de afstand zelf overbrugt, via de ionosfeer, voorbij de horizon, met je antenne en je vaardigheid. Als het internet het lange stuk doet, is het een fijn gesprek, maar geen radioverbinding in de klassieke zin. De meeste diploma's en contests zijn het daarmee eens en tellen verbindingen via internetkoppelingen niet mee.

De andere visie: een verbinding is twee mensen die via radio praten, en allebei *gebruikten* ze een radio. Repeaters geven onze signalen al tientallen jaren door zonder dat iemand die verbindingen in vraag stelt. Het internet is gewoon een heel lange repeater. En voor iemand in een appartement zonder plaats voor een antenne kan een hotspot de deur naar de hobby zijn.

Ik ben er nog niet uit. Als beginner wiens eerste echte kick het was om een station van de andere kant van de wereld binnen te horen komen op 25 W, met niets ertussen dan de lucht, voel ik de aantrekkingskracht van de eerste visie. Maar ik zie ook dagelijks andere radioamateurs die via een talkgroup contact met elkaar houden, en ik vind het moeilijk om te zeggen dat dat niet telt. Misschien is het eerlijke antwoord dat het allebei radioamateurisme is, en dat het gewoon twee verschillende soorten plezier zijn.

## Bedankt, Patrick

Een dikke merci aan Patrick, ON4PN, voor een heldere en boeiende avond, en omdat hij ons niet naar huis liet gaan zonder iets om op te kauwen. Vijfentwintig jaar na zijn ON3-cursus in hetzelfde gebouw leert hij WLD nog altijd iets nieuws. Dat alleen al zegt veel over deze hobby. Patrick gaf ook aan dat hij eventueel terug wil komen voor een extra workshop, om samen digitale toestellen in te stellen. Dat lijkt me een perfecte volgende stap na deze avond.

Was je erbij en noteerde je iets wat ik gemist heb, of zie je iets wat niet helemaal klopt? Laat het me weten.

73 de ON3VZ

<p class="dv-divider">Extra: zelf aan de slag</p>

## Aan de slag met DMR, stap voor stap

Voor de beginners onder ons: dit is de weg in concrete stappen.

1. **Vraag een DMR ID aan.** Ga naar [RadioID.net](https://radioid.net), maak een account aan en vraag een DMR ID aan. Je laadt een scan of foto op van je vergunning (het BIPT-document met je roepnaam). De goedkeuring duurt meestal een dag of twee. Je ID is een getal van zeven cijfers dat aan je roepnaam gekoppeld is, zodat je roepnaam en naam op het scherm van anderen verschijnen.
2. **Installeer de programmeersoftware (CPS).** Download de CPS voor jouw exacte toesteltype bij de fabrikant of de verkoper, meestal een Windows-programma. Gebruik de programmeerkabel die bij het toestel hoort: goedkope namaakkabels zijn oorzaak nummer één van "het toestel maakt geen verbinding".
3. **Maak eerst een back-up.** Sluit het toestel aan, kies in de CPS *Read from radio* (uitlezen) en bewaar dat bestand op een veilige plek *voor* je iets verandert. Loopt het mis, dan schrijf je de back-up terug en sta je weer waar je begon.
4. **Zoek je lokale repeaters op.** Kijk in de repeaterlijsten van de [UBA](https://www.uba.be), op de clubwebsite of op [RepeaterBook](https://www.repeaterbook.com), en noteer per repeater: uitgangsfrequentie, shift, color code, en welke talkgroups op welk tijdslot zitten.
5. **Bouw je codeplug.** Eerst je eigen DMR ID en roepnaam in de algemene instellingen van het toestel. Dan contacten (TG 206, TG 9990, TG 91), dan een RX-groepslijst, dan één kanaal per repeater en talkgroup, dan een zone. Schrijf alles naar het toestel (*Write to radio*).
6. **Test op de Parrot.** Kies je kanaal met TG 9990 (op een BrandMeister-repeater of -hotspot), druk de zendknop in, zeg je roepnaam en "test", en laat los. Een paar seconden later speelt de Parrot je eigen uitzending terug. Klink je goed? Dan werken je toestel, je codeplug en de weg door het netwerk.
7. **Eerst luisteren, dan roepen.** Luister een tijdje om te horen hoe mensen op die talkgroup werken. Geef dan je roepnaam en doe een korte oproep. Laat een pauze van een seconde of twee nadat het andere station loslaat, zodat anderen kunnen inpikken.

En de klassieke fouten, zodat je ze kan overslaan: **kerchunken** (de zendknop indrukken zonder iets te zeggen, gewoon om de repeater te horen), heel lange beurten op een drukke wereldwijde talkgroup, vergeten je roepnaam te geven, en de codeplug wijzigen zonder back-up.

## Aan de slag met D-STAR

D-STAR werkt een beetje anders, omdat het rond roepnamen gebouwd is:

1. **Een D-STAR-toestel.** Een gewone FM-handheld of een DMR-toestel volstaat niet. Icom heeft het breedste gamma; de Kenwood TH-D74 en TH-D75 kunnen ook D-STAR.
2. **Registreer je roepnaam** op het D-STAR-netwerk. Er is geen nummer zoals een DMR ID; je roepnaam is je identiteit. Je registreert één keer, meestal via een repeatergateway (vraag aan de repeaterbeheerder of de club hoe het lokaal werkt). Zonder registratie laten de gateways je verkeer niet door naar het internet.
3. **Begrijp de vier velden.** Elke D-STAR-uitzending draagt vier roepnamen mee:
    - **MYCALL**: jij, je eigen roepnaam.
    - **URCALL**: wie je oproept. `CQCQCQ` voor een algemene oproep, een roepnaam voor een rechtstreekse oproep, of een kort commando (bijvoorbeeld om naar een reflector te linken).
    - **RPT1**: de repeater waarin je zendt, met de moduleletter (B is 70 cm, C is 2 m).
    - **RPT2**: de gateway van die repeater, dezelfde roepnaam met de letter G, die je signaal het internet opstuurt.
    - **DR-modus**: moderne Icom-toestellen vullen deze velden zelf in als je een repeater uit een lijst kiest. Handig, maar het loont om te begrijpen wat er gebeurt.
4. **Link naar een reflector.** Een reflector is een gedeelde ontmoetingsruimte op het internet. Je linkt ernaartoe door een kort commando in het URCALL-veld te zenden; een gesproken bericht bevestigt de link.
5. **Luisteren, dan roepen.** Net als bij DMR: eerst luisteren, je roepnaam geven, pauzes laten. Geen antwoord? Probeer een drukkere reflector of een clubronde.

## Mijn eigen eerste stappen: een Baofeng DM-1801 Pro

De voordracht deed wat een goede voordracht moet doen: ze gaf me zin om het te proberen. Ik kocht intussen een goedkoop DMR-toestelletje, een **Baofeng DM-1801 Pro** (dualband VHF en UHF, Tier II, twee tijdsloten). Niet om meteen DMR-expert te worden, maar puur om te **experimenteren**. Mijn plan volgt Patricks advies: mijn DMR ID aanvragen, de fabriekscodeplug uitlezen en bewaren, en dan mijn eigen kleine codeplug bouwen, contact per contact en kanaal per kanaal, tot ik elk veld erin begrijp.

Lukt dat, dan wordt de volgende stap waarschijnlijk een klein **hotspotje** thuis, zodat ik niet afhankelijk ben van het bereiken van een repeater vanuit de stad. En wie weet wordt een WLD-talkgroup dan een van de eerste regels erin. Ik breng hier verslag uit.

## Jargon van digitale spraak in gewone taal

Een naslaglijst van de woorden die rondvliegen zodra het over digitale spraak gaat.

| Term | Betekenis |
|---|---|
| **4FSK** | Modulatie waarbij de draaggolf tussen vier frequenties springt, twee bits per sprong. Gebruikt door DMR, dPMR, NXDN en M17. |
| **AMBE / AMBE+2** | De gesloten vocoderfamilie, gebruikt door D-STAR, Fusion, DMR, NXDN en P25. |
| **BER** | Bit error rate: het aandeel bits dat beschadigd aankomt. De echte kwaliteitsmeter van een digitaal signaal. |
| **C4FM** | Een afgevlakte vorm van 4FSK, gebruikt door Yaesu System Fusion en P25. Niet door DMR. |
| **Callsign routing** | D-STAR-functie: roep een station op met zijn roepnaam, en het netwerk vindt de repeater waar het laatst gehoord werd. |
| **Codec** | Coder en decoder: de software die je stem comprimeert tot een kleine datastroom en terug. |
| **Codec 2** | De open source codec van David Rowe, VK5DGR, gebruikt door FreeDV en M17. |
| **Codeplug** | Het volledige configuratiebestand van een DMR-toestel: kanalen, contacten, zones, knoppen. |
| **Color code (CC)** | Een getal van 0 tot 15 dat een DMR-toestel vertelt bij welke repeater het hoort, vergelijkbaar met een CTCSS-toon. |
| **CPS** | Customer Programming Software, het programma waarmee je een codeplug bouwt en naar het toestel schrijft. |
| **Digitaal klif** | De plotse val van zuivere audio naar niets wanneer een digitaal signaal te zwak wordt. |
| **DMR ID** | Je nummer van zeven cijfers op DMR, gekoppeld aan je roepnaam, aan te vragen bij RadioID.net. |
| **FDMA** | Spectrum delen door elk gesprek een eigen smal kanaal te geven (dPMR, NXDN). |
| **FEC** | Voorwaartse foutcorrectie: extra bits waarmee de ontvanger fouten zelf kan herstellen. |
| **Gateway** | De verbinding tussen een repeater en een internetnetwerk. Bij D-STAR de G in RPT2. |
| **GMSK** | De zachte modulatie met twee niveaus die D-STAR gebruikt. |
| **Hotspot** | Een klein toestel thuis dat je handheld via het internet met een digitaal netwerk verbindt, met slechts enkele milliwatts. |
| **Interleaving** | De bits van een woord spreiden over de uitzending, zodat een stoorpiek van veel woorden een beetje raakt in plaats van één woord helemaal. |
| **MMDVM** | Multi-Mode Digital Voice Modem: het radiobordje in de meeste hotspots en veel amateurrepeaters. |
| **NAC / RAN** | De tegenhangers van de DMR color code bij P25 en NXDN. |
| **OFDM** | Veel kleine draaggolven naast elkaar, die elk een paar bits dragen. Gebruikt door FreeDV op HF. |
| **Parrot** | Een echodienst (TG 9990 op BrandMeister) die je uitzending terugspeelt zodat je jezelf kan horen. |
| **Reflector** | Een gedeelde ontmoetingsplaats op een internetserver waar repeaters en hotspots aan hetzelfde gesprek deelnemen (D-STAR, YSF, M17). |
| **Room** | De Fusion-naam (WIRES-X) voor een reflector. |
| **RX-groepslijst** | De lijst van talkgroups die een DMR-kanaal doorlaat naar je luidspreker. |
| **Talkgroup (TG)** | Een virtuele ontmoetingsruimte op DMR, aangeduid met een nummer, zoals TG 206 voor België. |
| **TDMA** | Eén kanaal delen door om beurten te zenden in heel korte tijdsloten (DMR). |
| **Tijdslot (TS1, TS2)** | Een van de twee afwisselende sloten van 30 ms bij DMR, elk met een eigen gesprek. |
| **Vocoder** | Het deel van de codec dat spraak analyseert en aan de andere kant weer opbouwt. |
| **Zone** | Een map met kanalen in een DMR-codeplug. |

## Verder lezen

- [WLD, de club](https://on6wl.be)
- [EvoHam: What is digital voice in ham radio?](https://evoham.com/digital-voice-in-ham-radio/)
- [EvoHam: Ham radio digital voice terminology](https://evoham.com/ham-radio-digital-voice-terminology/)
- [EvoHam: DMR for beginners](https://evoham.com/dmr-for-beginners/)
- [EvoHam: D-STAR for beginners](https://evoham.com/dstar-for-beginners/)
- [RadioID.net: je DMR ID aanvragen](https://radioid.net)
- [BrandMeister DMR-netwerk](https://brandmeister.network)
- [FreeDV-project](https://freedv.org)
- [FreeDV: RADE, de Radio Autoencoder](https://freedv.org/radio-autoencoder/)
- [ARDC: FreeDV RADE, a new approach to digital voice over HF](https://www.ardc.net/?p=11880)
- [ARRL: Will RADE be the next SSB?](https://www.arrl.org/news/will-rade-be-the-next-ssb)
- [M17 Project](https://m17project.org)

</div>

</div>

<script>
/* DIGITAL-VOICE 2026-10-10: language switch (EN default, NL via button or #dv-nl). Without JS both versions show, Dutch at the end. */
(function () {
  var art = document.querySelector('.dv-article');
  if (!art) return;
  var en = document.getElementById('dv-en'), nl = document.getElementById('dv-nl');
  if (!en || !nl) return;
  art.classList.add('dv-js');
  function show(lang, scroll) {
    var isNl = lang === 'nl';
    en.classList.toggle('dv-lang-hidden', isNl);
    nl.classList.toggle('dv-lang-hidden', !isNl);
    document.documentElement.setAttribute('lang', isNl ? 'nl' : 'en');
    if (scroll) { var top = art.getBoundingClientRect().top + window.pageYOffset - 90; window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' }); }
  }
  art.querySelectorAll('.dv-lang a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = a.getAttribute('data-lang');
      show(lang, true);
      try { history.replaceState(null, '', lang === 'nl' ? '#dv-nl' : location.pathname); } catch (err) {}
    });
  });
  art.querySelectorAll('a[href="#dv-en"]:not([data-lang])').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); show('en', true); });
  });
  show(location.hash === '#dv-nl' ? 'nl' : 'en', false);
})();
</script>
