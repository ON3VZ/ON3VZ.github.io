---
layout: post
title: "DOT & DASH — Teaching My Kids Morse Code With a Browser Game"
tags: ['CW', 'Education', 'Projects']
---

My kids have shown some interest in Morse code ever since they saw me practising on LCWO. There's something genuinely fascinating about it to a child — a secret language, a spy code, a way to send messages that nobody around you understands. That curiosity is a rare and precious thing, and I didn't want to waste it by handing them a dry chart of dots and dashes.

So I built them a game.

**[DOT & DASH](https://on3vz.github.io/DOT_DASH/)** is a browser-based Morse learning game aimed at children between 7 and 15 years old. No installation, no accounts, no server. It runs directly in the browser and works on any device — including a tablet on the couch.

---

## The Method: Koch at 20 WPM

The game is built entirely around the **Koch method** — the scientifically validated approach to learning Morse code that has been around since 1936. The two core principles are deceptively simple:

**1. Always at full speed.** Every character plays at 20 WPM, even on day one. At that speed, counting dots and dashes becomes impossible — the brain has no choice but to learn Morse as a sound pattern, the way you recognise a word without spelling it out letter by letter. This is the single biggest mistake beginners make: learning at slow speed and then hitting a ceiling they can never break through.

**2. One letter at a time.** The game starts with just two letters (K and M). Only when those are fully automatic does a third letter unlock. One new character per step, never more.

To give beginners enough thinking time without teaching the wrong rhythm, the game uses **Farnsworth timing**: characters always sound at 20 WPM, but the gaps between them start out long and gradually shrink as the player progresses through the 130 levels.

---

## Learning Through Sound, Not Charts

The moment a new letter appears, the game doesn't just show you a chart. It plays the letter three times in full, synchronised with a visual — the syllables of a mnemonic memory word pulse in time with the Morse:

| Letter | Morse | Memory word | Rhythm |
|--------|-------|-------------|--------|
| K | — · — | **KOF**·fi·**E** | Long-short-long |
| M | — — | **MA**·**MA** | Long-long |
| U | · · — | u·boot·**UIT** | Short-short-long |

The child sees and hears the rhythm simultaneously. The instruction *"Say it out loud!"* is intentional — actively speaking the memory word anchors it through multiple channels at once: auditory, motor, and visual.

---

## 130 Levels, Five Game Modes

The game has 130 levels structured around the full alphabet, digits, and Q-codes. Each Koch step introduces a new level type:

- **🎓 Learn** — the new letter plays 3 times with full sound sync before any questions appear
- **👂 Listen & Choose** — Morse plays, then 4 letter buttons appear; pick the right one
- **👂👂 Sequence** — two letters play back-to-back; identify both in order (trains working memory)
- **⚡ Stream** — 5 letters in real time, 2.2 seconds per letter, no pausing — the closest thing to real CW copying
- **🔐 Secret Briefing** — full Dutch words decoded letter by letter, the ultimate challenge

The rank system keeps children motivated: starting as a *Rookie Agent* and working up through Field Operative, Special Agent, Secret Operative, Elite Spy, all the way to *Master Cryptologist* once digits and Q-codes are complete.

---

## The Audio Engine

One detail I'm particularly happy with: the audio uses the **Web Audio API with proper edge shaping**. Every dot and dash transition has a 5ms exponential ramp — no hard keyclicks, no buzzer-like harshness. The tone sits at D5 (587 Hz), chosen for warmth rather than the sharper 700 Hz of radio receivers. It sounds more like a xylophone than a telegraph, which matters enormously for long practice sessions with children.

Correct answers play a rising major chord. Wrong answers get a soft descending "wah-wah" — friendly, never punishing, never a harsh buzzer. There's always a path forward.

---

## Profiles and Progress

Up to three agent profiles per device, each with its own progress, streak counter, and per-letter reaction time records. Everything is saved in localStorage — no account needed, no server, fully offline-capable. The game tracks the fastest reaction time for each letter, giving children something concrete to improve and compare.

---

## Try It

The game is live and free:

👉 **[on3vz.github.io/DOT_DASH/](https://on3vz.github.io/DOT_DASH/)**

No installation. Open the link, create an agent profile, and start with K and M. The first two letters take about five minutes to feel natural — and at that point, most children want to know what the third one sounds like.

That's the moment the Koch method hooks you. It works on adults too.

73 DE ON3VZ
