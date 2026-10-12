---
layout: post
title: "My First Split QSO: Working an Iceland Pile-Up on 40 m (TF/PD9DX)"
tags: ['DX', 'TF/PD9DX', 'Iceland', 'Split', 'Pile-up', 'SSB', '40m', 'IC-7300', 'Beginners']
excerpt: "I heard it described many times, but today I lived it: a DX station calling CQ on 7.150 and listening on 7.154. How split operation works, how I set up my IC-7300 MkII, why the display jumps to VFO B, and what I would tell any beginner before the first pile-up."
---
<!-- SPLIT-QSO 2026-10-12: new post. Revert by deleting this file and the folder assets/images/split-qso/ -->
<style>
/* SPLIT-QSO post styles, scoped to .sq-article; follows the fresh light/dark tokens */
.sq-article figure { margin: 1.8rem 0 2rem; }
.sq-article figure img { display: block; width: 100%; max-width: 760px; margin: 0 auto; border-radius: 10px; border: 1px solid var(--c-border); }
.sq-article figcaption { font-size: .86rem; line-height: 1.5; color: var(--c-text-3); margin: .75rem auto 0; max-width: 680px; text-align: center; font-style: italic; }
.sq-article .sq-note { border-left: 3px solid var(--c-cyan, #1E6BA8); padding: .6rem 1rem; margin: 1.4rem 0; background: var(--c-surface); border-radius: 0 8px 8px 0; }
.sq-article .sq-note p { margin: 0; }
</style>
<div class="sq-article" markdown="1">

On Monday 12 October 2026, for the first time in my ham radio life, I heard it happen live: a station calling "CQ CQ, listening on 7.154", and a little later "listening 4 up". I had heard about this before, but never experienced it myself. A huge pile-up, an Iceland station, and me on 25 watts.

I am a new Class C radio amateur, so I am writing this down as I experienced it, for other beginners who are about to meet their first pile-up.

## The call

The station was **TF/PD9DX**, Derk, operating from **Iceland** (DXCC entity 242). The prefix TF/ in front of his Dutch callsign PD9DX tells you which country he is operating from. He was on **7.150 MHz, LSB**, on the 40 m band.

His message had two parts:

- **"CQ CQ"**: he is calling anyone who wants to answer.
- **"Listening on 7.154"** and later **"listening 4 up"**: he transmits on 7.150, but he *listens* on a different frequency, 4 kHz higher. If you call him on 7.150, he will not hear you.

That is called **split operation**: transmitting on one frequency and receiving on another.

## Why does split exist?

When a rare station (a DX, short for "distance") calls CQ, hundreds of stations want to answer at the same moment. If they all called on his frequency:

1. He would hear only a wall of noise and could pick out nobody.
2. The callers would drown out his own signal, so people could no longer hear him say whom he is working.
3. Nobody can hear the other callers while they transmit, so everyone keeps calling over everyone.

So the DX does the smart thing. He keeps **his** transmit frequency clean (7.150) and tells everybody to call a few kHz away (7.154, or "4 up"). The callers spread themselves over a small slice of the band, and he can pick one callsign at a time out of the crowd. The result is a pile-up that is still workable.

## How I set up my IC-7300 MkII

The rule is simple: **you receive where the DX transmits, and you transmit where the DX listens.**

| | Frequency | VFO |
|---|---|---|
| I **receive** (where the DX talks) | 7.150 MHz | VFO A |
| I **transmit** (where the DX listens) | 7.154 MHz | VFO B |

This is how I did it, step by step:

1. **Tune VFO A to the DX.** Mode LSB (on 40 m we use the lower sideband), frequency 7.150. Now I hear him.
2. **Put the same frequency in VFO B** and then move VFO B to 7.154. On my radio that means switching to VFO B with the A/B key and turning the main dial. This is the frequency where I will be sending my callsign.
3. **Switch on SPLIT** with the SPLIT key. The orange **SPLIT** label lights up on the screen. From now on the radio receives on VFO A and transmits on VFO B.
4. **Check before you call.** Look at your transmit frequency on the screen. Is there a clear spot, or is someone already calling there? If it is busy, move VFO B up or down a little.
5. **Call.** Press PTT, give your callsign, release.

The two photos below show the settings only, they were not taken while transmitting.

<figure>
<img src="/assets/images/split-qso/split-rx-vfo-a.jpg" alt="IC-7300 MkII screen with VFO A on 7.150.00 as the large frequency, 7.154.00 shown small at the right, and the orange SPLIT label lit" loading="lazy">
<figcaption>Setting 1: VFO A (7.150.00) is the big frequency, the transmit frequency 7.154.00 sits small at the right, and the orange SPLIT label is on.</figcaption>
</figure>

<figure>
<img src="/assets/images/split-qso/split-tx-vfo-b.jpg" alt="IC-7300 MkII screen with VFO B on 7.154.00 as the large frequency, 7.150.00 shown small at the right, and the orange SPLIT label lit" loading="lazy">
<figcaption>The same split, seen from the other side: VFO B (7.154.00) is the big frequency, and 7.150.00 sits small at the right.</figcaption>
</figure>

### Why does my display jump to VFO B when I press PTT?

On my radio the large frequency switches to **VFO B (7.154)** when I key up. That is not a glitch. The radio shows you the frequency that is **actually going out on the air**, because that is the one you must be sure of. A wrong transmit frequency means calling on top of the DX, and that is the quickest way to become unpopular. When you release PTT, the display returns to VFO A and you hear the DX again.

So: receive display = where you listen, transmit display = where you speak. Check both before the first call.

## Reading the pile-up

Look at the waterfall in the photos. The band is very busy around the DX. That is what a mega pile-up looks like: many stations calling in a small slice of the band, each hoping to be the one the DX picks, while the DX himself sits on 7.150 and listens a few kHz higher.

The best advice I can give from this first time: **do not call at once. Listen first.** Hear how the DX works: he calls CQ, listens, picks a callsign, exchanges a short report and goes back to CQ. When he says "listening 4 up", you know where to look for a free spot to call.

## Beginner tips for your first pile-up

- **Listen before you transmit.** Learn how the DX operates: does he take callers one at a time, by call area, by number? Which frequency does he listen on right now?
- **Check that SPLIT is on.** If it is not, you will call on top of the DX and everybody will hear you. Verify both frequencies on the screen before you press PTT.
- **Pick a spot for your transmit frequency that is not already crowded.** Many radios have a function to listen on the transmit frequency, check your manual.
- **Call with your callsign only.** Short, clear, in standard phonetics. No "please", no long text, no name. Everyone is waiting.
- **Do not call when the DX is working somebody.** Wait until he has finished and asks for the next station. No tail-ending (calling right at the end of someone else's QSO).
- **Do not call if he is not hearing you.** If you called a few times without a reply, he may be listening to another part of the pile-up. Wait, adjust your frequency a little, try again.
- **Keep it short.** A report like 59 and a thank-you is enough. Others are waiting.
- **Switch SPLIT off afterwards.** It is easy to forget. Then you call CQ on the next frequency with your transmit frequency still a few kHz away, and you disturb somebody else. Make it a habit.
- **Be patient.** Even with 25 W it can work, but you need timing, patience and a clean signal.
- **Log it correctly.** In your logbook, put the frequency you **transmit on** (7.154) in the Freq field and the frequency you **receive on** (7.150) in the RX Freq field, and mark the QSO as split. Many programs have a "Log Split" option for exactly that. A correct log is also what makes the QSO count for awards and QSL confirmations.

<div class="sq-note" markdown="1">

**Stay in your band plan.** Both 7.150 and 7.154 are inside the 40 m phone segment, and I stay within the 25 W limit of my Class C licence. A split QSO changes nothing about the rules: you are responsible for where *you* transmit.

</div>

## The QSO

| | |
|---|---|
| Date | 12 October 2026 |
| Station | TF/PD9DX, Dervin (Derk) Beldman |
| Country | Iceland (DXCC 242) |
| Band / mode | 40 m, LSB |
| Split | RX 7.150 MHz, TX 7.154 MHz |
| Reports | 59 sent, 59 received |
| Locators | JO21 (me) and IP04 (Derk) |
| Distance | approx. 2,000 km, bearing approx. 326° (NW) |
| My station | IC-7300 MkII, 25 W |

Iceland on 40 m from a city garden in Hoboken is a good reminder that you do not need a big station for DX. You need to know how it works. Now I do, and next time it will be easier.

If you have a different way of working split, or tips for beginners, I would love to hear them. Thank you, Derk (PD9DX), and 73!

*73 de ON3VZ*

</div>
