---
layout: post
title: "Eight Weeks On The Air: What 247 QSOs Taught a Class C Beginner"
tags: [Logbook, Analysis, Propagation, Grey Line, SSB, FT8, Beginners, IC-7300, DXCC]
---

<!--
  ON3VZ station evaluation post, 19 July 2026.
  Self-contained: all styling is scoped under .eval26 and lives in this file only.
  REVERT INSTRUCTION: delete this file (_posts/2026-07-19-eight-weeks-on-the-air.md).
  Nothing outside this file was modified.
  All figures below are computed from the QRZ Logbook ADIF export of 19 Jul 2026 (247 records).
-->

<style>
.eval26{--e-gap:1rem;margin:2rem 0}
.eval26 .kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:var(--e-gap)}
.eval26 .k{background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1rem .9rem;position:relative;overflow:hidden}
.eval26 .k::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--c-primary);box-shadow:var(--glow-sm)}
.eval26 .k .n{font-family:var(--f-display);font-size:1.75rem;line-height:1;color:var(--c-primary);text-shadow:var(--glow-sm)}
.eval26 .k .n.cy{color:var(--c-cyan);text-shadow:var(--glow-cyan)}
.eval26 .k .n.am{color:var(--c-amber);text-shadow:none}
.eval26 .k .l{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--c-text-3);margin-top:.45rem}
.eval26 .k .s{font-family:var(--f-mono);font-size:.72rem;color:var(--c-text-2);margin-top:.2rem}
.eval26 .panel{background:var(--c-surface);border:1px solid var(--c-border);border-radius:10px;padding:1.1rem;margin-top:var(--e-gap)}
.eval26 .panel h4{font-family:var(--f-display);font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;color:var(--c-text-2);margin:0 0 .9rem}
.eval26 .panel svg{width:100%;height:auto;display:block}
.eval26 .bars{display:flex;flex-direction:column;gap:.55rem}
.eval26 .bar{display:grid;grid-template-columns:52px 1fr 74px;align-items:center;gap:.6rem;font-family:var(--f-mono);font-size:.8rem;color:var(--c-text-2)}
.eval26 .track{height:14px;background:rgba(255,255,255,.04);border-radius:7px;overflow:hidden}
.eval26 .fill{height:100%;border-radius:7px}
.eval26 .val{text-align:right;color:var(--c-text-3);font-size:.75rem}
.eval26 table{width:100%;border-collapse:collapse;font-family:var(--f-mono);font-size:.8rem}
.eval26 table th{text-align:left;color:var(--c-text-3);font-weight:400;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;border-bottom:1px solid var(--c-border);padding:.4rem .5rem}
.eval26 table td{padding:.42rem .5rem;border-bottom:1px solid rgba(255,255,255,.04);color:var(--c-text-2)}
.eval26 table td.dx{color:var(--c-primary)}
.eval26 .two{display:grid;grid-template-columns:1fr 1fr;gap:var(--e-gap);margin-top:var(--e-gap)}
.eval26 .two>.panel{margin-top:0}
@media(max-width:720px){.eval26 .two{grid-template-columns:1fr}}
.eval26 .note{font-family:var(--f-mono);font-size:.74rem;color:var(--c-text-3);margin-top:.7rem;line-height:1.5}
</style>

Fifty-four days ago I keyed the microphone for the first time and said my own callsign out loud on a live HF band. My voice cracked. I had rehearsed the phonetics, Oscar November Three Victor Zulu, roughly two hundred times in my head, and I still got it wrong on the first pass.

Today I exported the logbook, ran the numbers, and sat looking at the screen for a while. Two hundred and forty-seven contacts. Fifty-two DXCC entities. And something I did not expect to see in a beginner's log: a total path length that has just passed the distance to the Moon.

This post is the evaluation I owe myself. What worked, what did not, what the bands actually taught me, and where the plan goes next. All figures come from the QRZ Logbook ADIF export of 19 July 2026, station JO21EE in Hoboken, IC-7300 MkII into a groundplane multiband vertical, 25 W on every HF contact in this log and on every contact beyond 3,000 km.

<div class="eval26" markdown="0">

<div class="kpi">
  <div class="k"><div class="n">247</div><div class="l">QSOs logged</div><div class="s">195 unique callsigns</div></div>
  <div class="k"><div class="n cy">52</div><div class="l">DXCC entities</div><div class="s">5 continents</div></div>
  <div class="k"><div class="n">390,218</div><div class="l">km worked</div><div class="s">Moon distance: 384,400</div></div>
  <div class="k"><div class="n am">11,280</div><div class="l">km best DX</div><div class="s">LU1DA, Argentina</div></div>
  <div class="k"><div class="n">451</div><div class="l">km per watt</div><div class="s">LU1DA at 25 W, logged</div></div>
  <div class="k"><div class="n cy">44</div><div class="l">active days</div><div class="s">of 54, avg 5.6 QSOs</div></div>
  <div class="k"><div class="n">7</div><div class="l">bands used</div><div class="s">80m to 2m</div></div>
  <div class="k"><div class="n am">71</div><div class="l">LoTW confirmed</div><div class="s">29% of the log</div></div>
</div>

<div class="panel">
  <h4>Growth curve: QSOs and new entities, 27 May to 19 July 2026</h4>
  <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cumulative QSOs and DXCC entities from 27 May to 19 July 2026">
<defs><linearGradient id="gq" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00ff88" stop-opacity="0.28"/><stop offset="100%" stop-color="#00ff88" stop-opacity="0"/></linearGradient></defs>
<line x1="52" y1="256.0" x2="708" y2="256.0" stroke="rgba(0,255,136,0.10)" stroke-width="1"/><text x="44" y="260.0" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">0</text><line x1="52" y1="209.6" x2="708" y2="209.6" stroke="rgba(0,255,136,0.10)" stroke-width="1"/><text x="44" y="213.6" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">50</text><line x1="52" y1="163.2" x2="708" y2="163.2" stroke="rgba(0,255,136,0.10)" stroke-width="1"/><text x="44" y="167.2" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">100</text><line x1="52" y1="116.8" x2="708" y2="116.8" stroke="rgba(0,255,136,0.10)" stroke-width="1"/><text x="44" y="120.8" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">150</text><line x1="52" y1="70.4" x2="708" y2="70.4" stroke="rgba(0,255,136,0.10)" stroke-width="1"/><text x="44" y="74.4" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">200</text><line x1="52" y1="24.0" x2="708" y2="24.0" stroke="rgba(0,255,136,0.10)" stroke-width="1"/><text x="44" y="28.0" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">250</text>
<text x="716" y="260.0" fill="#00d4ff" font-size="11" font-family="Share Tech Mono, monospace">0</text><text x="716" y="182.7" fill="#00d4ff" font-size="11" font-family="Share Tech Mono, monospace">20</text><text x="716" y="105.3" fill="#00d4ff" font-size="11" font-family="Share Tech Mono, monospace">40</text><text x="716" y="28.0" fill="#00d4ff" font-size="11" font-family="Share Tech Mono, monospace">60</text>
<line x1="621.4" y1="24" x2="621.4" y2="256" stroke="#f0a500" stroke-width="1" stroke-dasharray="4 4" opacity="0.8"/>
<text x="615.4" y="38" fill="#f0a500" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="end">FT8 starts 12 Jul</text>
<polygon points="52,256 52.0,253.2 64.4,253.2 76.8,253.2 89.1,253.2 101.5,252.3 113.9,251.4 126.3,249.5 138.6,245.8 151.0,245.8 163.4,243.0 175.8,241.2 188.2,235.6 200.5,234.7 212.9,230.0 225.3,228.2 237.7,227.2 250.0,224.4 262.4,220.7 274.8,218.0 287.2,216.1 299.5,214.2 311.9,210.5 324.3,209.6 336.7,209.6 349.1,209.6 361.4,205.0 373.8,205.0 386.2,202.2 398.6,199.4 410.9,195.7 423.3,192.0 435.7,192.0 448.1,186.4 460.5,172.5 472.8,165.1 485.2,154.8 497.6,144.6 510.0,140.0 522.3,137.2 534.7,126.1 547.1,123.3 559.5,123.3 571.8,122.4 584.2,121.4 596.6,121.4 609.0,106.6 621.4,98.2 633.7,85.2 646.1,71.3 658.5,50.0 670.9,35.1 683.2,33.3 695.6,31.4 708.0,26.8 708,256" fill="url(#gq)"/>
<polyline points="52.0,253.2 64.4,253.2 76.8,253.2 89.1,253.2 101.5,252.3 113.9,251.4 126.3,249.5 138.6,245.8 151.0,245.8 163.4,243.0 175.8,241.2 188.2,235.6 200.5,234.7 212.9,230.0 225.3,228.2 237.7,227.2 250.0,224.4 262.4,220.7 274.8,218.0 287.2,216.1 299.5,214.2 311.9,210.5 324.3,209.6 336.7,209.6 349.1,209.6 361.4,205.0 373.8,205.0 386.2,202.2 398.6,199.4 410.9,195.7 423.3,192.0 435.7,192.0 448.1,186.4 460.5,172.5 472.8,165.1 485.2,154.8 497.6,144.6 510.0,140.0 522.3,137.2 534.7,126.1 547.1,123.3 559.5,123.3 571.8,122.4 584.2,121.4 596.6,121.4 609.0,106.6 621.4,98.2 633.7,85.2 646.1,71.3 658.5,50.0 670.9,35.1 683.2,33.3 695.6,31.4 708.0,26.8" fill="none" stroke="#00ff88" stroke-width="2.5" stroke-linejoin="round"/>
<polyline points="52.0,244.4 64.4,244.4 76.8,244.4 89.1,244.4 101.5,240.5 113.9,236.7 126.3,232.8 138.6,225.1 151.0,225.1 163.4,217.3 175.8,217.3 188.2,217.3 200.5,217.3 212.9,213.5 225.3,209.6 237.7,205.7 250.0,201.9 262.4,194.1 274.8,194.1 287.2,194.1 299.5,190.3 311.9,186.4 324.3,182.5 336.7,182.5 349.1,182.5 361.4,178.7 373.8,178.7 386.2,174.8 398.6,174.8 410.9,170.9 423.3,163.2 435.7,163.2 448.1,159.3 460.5,147.7 472.8,143.9 485.2,132.3 497.6,132.3 510.0,132.3 522.3,132.3 534.7,128.4 547.1,128.4 559.5,128.4 571.8,124.5 584.2,124.5 596.6,124.5 609.0,120.7 621.4,101.3 633.7,82.0 646.1,74.3 658.5,54.9 670.9,54.9 683.2,54.9 695.6,54.9 708.0,54.9" fill="none" stroke="#00d4ff" stroke-width="2" stroke-dasharray="6 4" stroke-linejoin="round"/>
<line x1="52" y1="256" x2="708" y2="256" stroke="rgba(0,255,136,0.28)" stroke-width="1"/>
<text x="52.0" y="274" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="middle">27 May</text><text x="212.9" y="274" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="middle">9 Jun</text><text x="373.8" y="274" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="middle">22 Jun</text><text x="534.7" y="274" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="middle">5 Jul</text><text x="708.0" y="274" fill="#7a96b0" font-size="11" font-family="Share Tech Mono, monospace" text-anchor="middle">19 Jul</text>
<g font-family="Share Tech Mono, monospace" font-size="12"><rect x="60" y="28" width="10" height="3" fill="#00ff88"/><text x="76" y="34" fill="#b0c4d8">QSOs (left)</text><rect x="172" y="28" width="10" height="3" fill="#00d4ff"/><text x="188" y="34" fill="#b0c4d8">DXCC entities (right)</text></g>
</svg>
  <div class="note">The slope changes twice. First in late June, when I stopped waiting for the perfect moment and simply started calling. Then again on 12 July, when FT8 came online.</div>
</div>

</div>

## Station, power, and where these numbers come from

Before any of the conclusions, the boring part, because a claim about distance is worthless without the power it was made with.

<div class="eval26" markdown="0">
<div class="panel">
  <h4>Station record</h4>
  <table>
    <tbody>
      <tr><td>Callsign</td><td class="dx">ON3VZ</td></tr>
      <tr><td>Licence</td><td>Belgium, Class C</td></tr>
      <tr><td>Locator</td><td>JO21EE, Hoboken, Antwerp</td></tr>
      <tr><td>Transceiver</td><td>Icom IC-7300 MkII, commercial equipment, unmodified</td></tr>
      <tr><td>Antenna</td><td>IronWave6 groundplane multiband vertical, garden mounted</td></tr>
      <tr><td>Amplifier</td><td>none</td></tr>
      <tr><td>Power used</td><td>25 W on HF, up to 50 W on 2m, within Class C limits</td></tr>
      <tr><td>Data source</td><td>QRZ Logbook ADIF export, 19 Jul 2026, 247 records</td></tr>
    </tbody>
  </table>
</div>

<div class="panel">
  <h4>Transmit power, as logged, per QSO</h4>
  <div class="bars">
    <div class="bar"><span>25 W</span><span class="track"><span class="fill" style="width:100%;background:var(--c-primary);box-shadow:var(--glow-sm)"></span></span><span class="val">244 · 98.8%</span></div>
    <div class="bar"><span>50 W</span><span class="track"><span class="fill" style="width:0.8%;background:var(--c-amber)"></span></span><span class="val">2 · 0.8%</span></div>
    <div class="bar"><span>20 W</span><span class="track"><span class="fill" style="width:0.4%;background:var(--c-cyan)"></span></span><span class="val">1 · 0.4%</span></div>
  </div>
  <table style="margin-top:1rem">
    <thead><tr><th>Segment</th><th>QSOs</th><th>Power as logged</th><th>Class C limit</th></tr></thead>
    <tbody>
      <tr><td>HF · 80m to 10m</td><td>243</td><td class="dx">25 W, one at 20 W</td><td>25 W</td></tr>
      <tr><td>VHF · 2m</td><td>4</td><td class="dx">2 at 50 W, 2 at 25 W</td><td>50 W</td></tr>
    </tbody>
  </table>
  <div class="note">Every one of the 247 records carries a <code>TX_PWR</code> field, so this is not an estimate. Not a single HF contact in this log was made above 25 W, and not a single VHF contact above 50 W. The one 20 W entry is my very first FT8 QSO, TA1SMO, made while I was still setting the drive level. <strong>All 19 contacts beyond 3,000 km, including both 11,000 km paths, are logged at 25 W.</strong></div>
</div>

<div class="panel">
  <h4>Independent confirmation</h4>
  <table>
    <thead><tr><th>Contact</th><th>km</th><th>Mode</th><th>LoTW</th></tr></thead>
    <tbody>
      <tr><td class="dx">LU1DA, Argentina</td><td>11,280</td><td>FT8</td><td>confirmed</td></tr>
      <tr><td class="dx">CX6TU, Uruguay</td><td>11,070</td><td>FT8</td><td>confirmed</td></tr>
      <tr><td class="dx">NV1U, United States</td><td>5,796</td><td>FT8</td><td>confirmed</td></tr>
      <tr><td class="dx">VE9CF, Canada</td><td>4,904</td><td>SSB</td><td>confirmed</td></tr>
      <tr><td class="dx">A71UN, Qatar</td><td>4,818</td><td>FT8</td><td>confirmed</td></tr>
      <tr><td class="dx">9K2ES, Kuwait</td><td>4,304</td><td>SSB</td><td>confirmed</td></tr>
    </tbody>
  </table>
  <div class="note">71 of 247 QSOs (29%) are confirmed on Logbook of The World, including both ends of the two longest paths in this log. LoTW is a two-sided match: the other station uploaded the same contact independently. My log is also uploaded to QRZ, Clublog, eQSL and HRDLog.</div>
</div>
</div>

I want to be plain about something, because a beginner's log full of long distances invites a raised eyebrow, and it should.

**None of this is remarkable.** Twenty-five watts of FT8 on 20m into South America during the evening grey line is an ordinary evening for thousands of stations. FT8 works reliably down to around 24 dB below the noise floor, which is roughly 20 dB of margin that SSB simply does not have. The far ends of my longest paths are not casual operators with wire antennas: FY5KE is a well-known contest station in French Guiana, and several of my DX phone contacts are special-event or contest stations with tall towers, stacked beams and excellent receivers. A large part of what looks like my achievement is really their antenna farm doing the heavy lifting, and I would rather say that out loud than let anyone wonder.

What 25 W genuinely does not do is win a pile-up, punch through marginal conditions, or make an ocean path work on voice outside a favourable window. That limitation shows up clearly in the numbers further down, and it is the most useful thing this log has taught me.

## Phase one: learning to be heard

The first three weeks were pure phone. SSB, 20m, and a lot of listening.

My honest experience as a Class C operator at 25 W: you are not going to win a pile-up. What you can do is pick your moments. I learned to tune slowly, find a station with a manageable queue, wait for the gap, and give my callsign once, cleanly, with correct phonetics. Then wait. Calling twice on top of someone else gets you nowhere.

The log shows what that patience produced. In the first 36 active days I made 161 QSOs across 36 entities, average path 1,288 km. Almost all of Europe, worked from a garden vertical in a suburban back yard.

Two contacts from that period still make me grin. **VE9CF in Canada, 4,904 km, on 31 May at 23:13 UTC**, four days into my licence. And **PY6RT in Brazil, 8,196 km, on 29 June at 20:56 UTC**, my furthest voice contact to date and still the record on phone. Both were late-evening 20m contacts. That is not a coincidence, and I will come back to it.

## Phase two: the bands stopped being a mystery

Early on, band choice was guesswork. I would call CQ on whatever was quiet and wonder why nothing came back. Quiet usually means closed.

<div class="eval26" markdown="0">
<div class="two">
<div class="panel">
  <h4>Band distribution</h4>
  <div class="bars">
    <div class="bar"><span>20m</span><span class="track"><span class="fill" style="width:100%;background:var(--c-primary);box-shadow:var(--glow-sm)"></span></span><span class="val">173 · 70%</span></div>
    <div class="bar"><span>15m</span><span class="track"><span class="fill" style="width:19.1%;background:var(--c-cyan)"></span></span><span class="val">33 · 13%</span></div>
    <div class="bar"><span>10m</span><span class="track"><span class="fill" style="width:14.5%;background:var(--c-amber)"></span></span><span class="val">25 · 10%</span></div>
    <div class="bar"><span>30m</span><span class="track"><span class="fill" style="width:3.5%;background:#8f7dff"></span></span><span class="val">6 · 2%</span></div>
    <div class="bar"><span>40m</span><span class="track"><span class="fill" style="width:2.9%;background:#ff7a59"></span></span><span class="val">5 · 2%</span></div>
    <div class="bar"><span>2m</span><span class="track"><span class="fill" style="width:2.3%;background:#5ad1c0"></span></span><span class="val">4 · 2%</span></div>
    <div class="bar"><span>80m</span><span class="track"><span class="fill" style="width:0.6%;background:#ff4466"></span></span><span class="val">1 · 0.4%</span></div>
  </div>
  <div class="note">A vertical that favours low angles, plus a beginner who mostly operates in the evening, adds up to a 20m-dominated log. That is a finding, not a failure.</div>
</div>
<div class="panel">
  <h4>Distance distribution</h4>
  <div class="bars">
    <div class="bar"><span>&lt;500</span><span class="track"><span class="fill" style="width:14.9%;background:#5ad1c0"></span></span><span class="val">20</span></div>
    <div class="bar"><span>0.5-1k</span><span class="track"><span class="fill" style="width:40.3%;background:var(--c-cyan)"></span></span><span class="val">54</span></div>
    <div class="bar"><span>1-2k</span><span class="track"><span class="fill" style="width:100%;background:var(--c-primary);box-shadow:var(--glow-sm)"></span></span><span class="val">134</span></div>
    <div class="bar"><span>2-3k</span><span class="track"><span class="fill" style="width:11.9%;background:var(--c-amber)"></span></span><span class="val">16</span></div>
    <div class="bar"><span>3-5k</span><span class="track"><span class="fill" style="width:6.0%;background:#ff7a59"></span></span><span class="val">8</span></div>
    <div class="bar"><span>5-8k</span><span class="track"><span class="fill" style="width:5.2%;background:#ff4466"></span></span><span class="val">7</span></div>
    <div class="bar"><span>8k+</span><span class="track"><span class="fill" style="width:3.0%;background:#8f7dff"></span></span><span class="val">4</span></div>
  </div>
  <div class="note">Median path 1,228 km. The bulk of the log is European skip on 20m. The tail beyond 3,000 km is only 19 contacts, and those 19 are where most of the learning happened.</div>
</div>
</div>
</div>

Here is the practical model I now carry in my head, built from my own log rather than from a book:

**20m is home.** Seventy percent of my contacts. It opens around mid-morning and stays useful until well after midnight local time. If I have one hour to operate and no plan, I go to 20m.

**15m and 10m are the daylight bonus.** Together they gave 58 QSOs, almost entirely between 08:00 and 21:00 UTC. When the flux is up these bands are extraordinarily efficient: 25 W sounds like far more than 25 W. When they are closed, they are silent in a way that is unmistakable once you have heard it. Learning to tell "closed" from "no one is calling" was a genuine skill acquisition.

**40m and 80m are still homework.** Six contacts total. My vertical is a compromise on the low bands, and the local noise floor in the evening is not kind. I know what needs to happen here and it is an antenna problem, not an operator problem.

**30m is the quiet one.** Six QSOs, all digital, and every single one felt calm. Under IARU Region 1 rules 30m is CW and digital only, no SSB and no contests, and you can hear that in the band's character. It rewards patience.

**2m FM is the club band.** Four local contacts, including my first ever contact with a club station. Different hobby, same licence, and worth keeping alive.

## The grey line: my single biggest operating discovery

The number that surprised me most in this analysis: **42 percent of my entire log was made while the sun sat between 12 degrees below and 6 degrees above the horizon**, at my end of the path, at the other end, or both. That is the grey line, the moving band of twilight that sweeps around the Earth twice a day.

<div class="eval26" markdown="0">
<div class="panel">
  <h4>QSOs per hour UTC, with grey-line windows highlighted</h4>
  <svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QSOs per hour UTC, all bands and 20m">
<rect x="131.0" y="26" width="87.0" height="182" fill="rgba(240,165,0,0.10)"/>
<rect x="595.0" y="26" width="87.0" height="182" fill="rgba(240,165,0,0.10)"/>
<text x="174.5" y="38" fill="#f0a500" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">sunrise grey line</text>
<text x="638.5" y="38" fill="#f0a500" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">sunset grey line</text>
<rect x="47.0" y="208.0" width="23.0" height="0.0" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="47.0" y="208.0" width="23.0" height="0.0" fill="#00ff88" rx="2"/><text x="58.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">00</text><rect x="76.0" y="208.0" width="23.0" height="0.0" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="76.0" y="208.0" width="23.0" height="0.0" fill="#00ff88" rx="2"/><text x="87.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">01</text><rect x="105.0" y="208.0" width="23.0" height="0.0" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="105.0" y="208.0" width="23.0" height="0.0" fill="#00ff88" rx="2"/><text x="116.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">02</text><rect x="134.0" y="208.0" width="23.0" height="0.0" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="134.0" y="208.0" width="23.0" height="0.0" fill="#00ff88" rx="2"/><text x="145.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">03</text><rect x="163.0" y="208.0" width="23.0" height="0.0" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="163.0" y="208.0" width="23.0" height="0.0" fill="#00ff88" rx="2"/><text x="174.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">04</text><rect x="192.0" y="187.8" width="23.0" height="20.2" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="192.0" y="192.8" width="23.0" height="15.2" fill="#00ff88" rx="2"/><text x="203.5" y="182.8" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">4</text><text x="203.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">05</text><rect x="221.0" y="101.8" width="23.0" height="106.2" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="221.0" y="127.1" width="23.0" height="80.9" fill="#00ff88" rx="2"/><text x="232.5" y="96.8" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">21</text><text x="232.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">06</text><rect x="250.0" y="192.8" width="23.0" height="15.2" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="250.0" y="192.8" width="23.0" height="15.2" fill="#00ff88" rx="2"/><text x="261.5" y="187.8" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">3</text><text x="261.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">07</text><rect x="279.0" y="177.7" width="23.0" height="30.3" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="279.0" y="187.8" width="23.0" height="20.2" fill="#00ff88" rx="2"/><text x="290.5" y="172.7" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">6</text><text x="290.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">08</text><rect x="308.0" y="167.6" width="23.0" height="40.4" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="308.0" y="182.7" width="23.0" height="25.3" fill="#00ff88" rx="2"/><text x="319.5" y="162.6" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">8</text><text x="319.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">09</text><rect x="337.0" y="157.4" width="23.0" height="50.6" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="337.0" y="177.7" width="23.0" height="30.3" fill="#00ff88" rx="2"/><text x="348.5" y="152.4" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">10</text><text x="348.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">10</text><rect x="366.0" y="192.8" width="23.0" height="15.2" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="366.0" y="197.9" width="23.0" height="10.1" fill="#00ff88" rx="2"/><text x="377.5" y="187.8" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">3</text><text x="377.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">11</text><rect x="395.0" y="167.6" width="23.0" height="40.4" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="395.0" y="197.9" width="23.0" height="10.1" fill="#00ff88" rx="2"/><text x="406.5" y="162.6" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">8</text><text x="406.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">12</text><rect x="424.0" y="127.1" width="23.0" height="80.9" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="424.0" y="147.3" width="23.0" height="60.7" fill="#00ff88" rx="2"/><text x="435.5" y="122.1" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">16</text><text x="435.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">13</text><rect x="453.0" y="157.4" width="23.0" height="50.6" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="453.0" y="202.9" width="23.0" height="5.1" fill="#00ff88" rx="2"/><text x="464.5" y="152.4" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">10</text><text x="464.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">14</text><rect x="482.0" y="172.6" width="23.0" height="35.4" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="482.0" y="192.8" width="23.0" height="15.2" fill="#00ff88" rx="2"/><text x="493.5" y="167.6" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">7</text><text x="493.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">15</text><rect x="511.0" y="142.3" width="23.0" height="65.7" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="511.0" y="172.6" width="23.0" height="35.4" fill="#00ff88" rx="2"/><text x="522.5" y="137.3" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">13</text><text x="522.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">16</text><rect x="540.0" y="187.8" width="23.0" height="20.2" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="540.0" y="208.0" width="23.0" height="0.0" fill="#00ff88" rx="2"/><text x="551.5" y="182.8" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">4</text><text x="551.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">17</text><rect x="569.0" y="152.4" width="23.0" height="55.6" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="569.0" y="157.4" width="23.0" height="50.6" fill="#00ff88" rx="2"/><text x="580.5" y="147.4" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">11</text><text x="580.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">18</text><rect x="598.0" y="56.3" width="23.0" height="151.7" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="598.0" y="106.9" width="23.0" height="101.1" fill="#00ff88" rx="2"/><text x="609.5" y="51.3" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">30</text><text x="609.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">19</text><rect x="627.0" y="51.3" width="23.0" height="156.7" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="627.0" y="86.7" width="23.0" height="121.3" fill="#00ff88" rx="2"/><text x="638.5" y="46.3" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">31</text><text x="638.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">20</text><rect x="656.0" y="31.1" width="23.0" height="176.9" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="656.0" y="61.4" width="23.0" height="146.6" fill="#00ff88" rx="2"/><text x="667.5" y="26.1" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">35</text><text x="667.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">21</text><rect x="685.0" y="91.7" width="23.0" height="116.3" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="685.0" y="96.8" width="23.0" height="111.2" fill="#00ff88" rx="2"/><text x="696.5" y="86.7" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">23</text><text x="696.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">22</text><rect x="714.0" y="187.8" width="23.0" height="20.2" fill="rgba(0,212,255,0.30)" rx="2"/><rect x="714.0" y="187.8" width="23.0" height="20.2" fill="#00ff88" rx="2"/><text x="725.5" y="182.8" fill="#b0c4d8" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">4</text><text x="725.5" y="224.0" fill="#7a96b0" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="middle">23</text>
<line x1="44" y1="208" x2="740" y2="208" stroke="rgba(0,255,136,0.28)"/>
<g font-family="Share Tech Mono, monospace" font-size="11"><rect x="44" y="234" width="10" height="8" fill="#00ff88"/><text x="60" y="241" fill="#b0c4d8">20m</text><rect x="114" y="234" width="10" height="8" fill="rgba(0,212,255,0.30)"/><text x="130" y="241" fill="#b0c4d8">all other bands</text><text x="740" y="241" fill="#7a96b0" text-anchor="end">hour UTC</text></g>
</svg>
  <div class="note">Two peaks, and both sit against a twilight window. The evening block from 19:00 to 22:00 UTC alone carries 96 contacts. The 06:00 UTC spike is 21 contacts, almost all on 20m, made before work.</div>
</div>
</div>

Why it works, in the version I understand: during twilight the D-layer, which absorbs HF energy during the day, has collapsed, while the F-layer that refracts your signal is still charged from the daylight. For a short window you get refraction without absorption. Signals that were unworkable an hour earlier suddenly arrive with a signal report.

The evidence in my own log is hard to argue with. Of my 19 contacts beyond 3,000 km, **eight fell inside a grey-line window and seven had both ends of the path in darkness**. My two best contacts of all, Argentina at 21:21 UTC and Uruguay at 22:08 UTC, were both made on a dark path with the sun a few degrees under the horizon at the far end.

<div class="eval26" markdown="0">
<div class="panel">
  <h4>The long paths: every QSO beyond 4,000 km</h4>
  <table>
    <thead><tr><th>Call</th><th>Entity</th><th>km</th><th>Band</th><th>Mode</th><th>UTC</th></tr></thead>
    <tbody>
      <tr><td class="dx">LU1DA</td><td>Argentina</td><td>11,280</td><td>20m</td><td>FT8</td><td>12 Jul 21:21</td></tr>
      <tr><td class="dx">CX6TU</td><td>Uruguay</td><td>11,070</td><td>20m</td><td>FT8</td><td>13 Jul 22:08</td></tr>
      <tr><td class="dx">HS0ZOY</td><td>Thailand</td><td>9,361</td><td>20m</td><td>FT8</td><td>15 Jul 19:11</td></tr>
      <tr><td class="dx">PY6RT</td><td>Brazil</td><td>8,196</td><td>20m</td><td>SSB</td><td>29 Jun 20:56</td></tr>
      <tr><td class="dx">PT7PT</td><td>Brazil</td><td>7,553</td><td>20m</td><td>FT8</td><td>12 Jul 21:57</td></tr>
      <tr><td class="dx">W4DXM</td><td>United States</td><td>7,360</td><td>20m</td><td>FT8</td><td>14 Jul 22:19</td></tr>
      <tr><td class="dx">FY5KE</td><td>French Guiana</td><td>7,272</td><td>15m</td><td>SSB</td><td>14 Jul 19:03</td></tr>
      <tr><td class="dx">FY5KE</td><td>French Guiana</td><td>7,272</td><td>20m</td><td>SSB</td><td>16 Jul 22:01</td></tr>
      <tr><td class="dx">KB2QCJ</td><td>United States</td><td>5,995</td><td>20m</td><td>FT8</td><td>12 Jul 22:18</td></tr>
      <tr><td class="dx">NV1U</td><td>United States</td><td>5,796</td><td>20m</td><td>FT8</td><td>13 Jul 21:55</td></tr>
      <tr><td class="dx">A61DD</td><td>United Arab Emirates</td><td>5,229</td><td>20m</td><td>FT8</td><td>12 Jul 22:15</td></tr>
      <tr><td class="dx">VE9CF</td><td>Canada</td><td>4,904</td><td>20m</td><td>SSB</td><td>31 May 23:13</td></tr>
      <tr><td class="dx">A71UN</td><td>Qatar</td><td>4,818</td><td>20m</td><td>FT8</td><td>13 Jul 22:01</td></tr>
      <tr><td class="dx">A71AT</td><td>Qatar</td><td>4,818</td><td>20m</td><td>FT8</td><td>15 Jul 06:15</td></tr>
      <tr><td class="dx">9K2ES</td><td>Kuwait</td><td>4,304</td><td>20m</td><td>SSB</td><td>8 Jul 20:15</td></tr>
    </tbody>
  </table>
  <div class="note">Fourteen of these fifteen are on 20m. Fourteen of the fifteen are after 19:00 UTC. If there is one lesson in this whole table, it is that the evening grey line on 20m is where a 25 W station reaches across an ocean.</div>
</div>
</div>

## When is long-distance SSB actually worth it?

This is the question I could not have answered a month ago, and now I can, with numbers.

<div class="eval26" markdown="0">
<div class="kpi">
  <div class="k"><div class="n">170</div><div class="l">phone QSOs</div><div class="s">mean path 1,377 km</div></div>
  <div class="k"><div class="n cy">73</div><div class="l">FT8 QSOs</div><div class="s">mean path 2,212 km</div></div>
  <div class="k"><div class="n am">6</div><div class="l">phone QSOs &gt;3,000 km</div><div class="s">3.5% of phone</div></div>
  <div class="k"><div class="n am">13</div><div class="l">FT8 QSOs &gt;3,000 km</div><div class="s">18% of FT8</div></div>
</div>
</div>

FT8 reaches roughly 60 percent further on average, and is five times more likely to produce a contact beyond 3,000 km. That is not close.

So why bother with voice over long distances at all? Because my log contains **six phone contacts beyond 3,000 km** and every one of them is worth more to me than the FT8 records. FY5KE in French Guiana came back with 59 both ways at 7,272 km. 4L5O in Georgia gave me a genuine 59. PY6RT in Brazil, 58 sent and 55 received.

My working rule now:

**Long-distance SSB is worth it when three things line up.** The band has to be genuinely open, not marginal. The other station needs a real antenna and preferably a contest or DXpedition operator's ears, which is why a large fraction of my DX phone contacts are with special-event and contest stations. And you need to be inside a favourable window, which in practice means the two hours around sunset. Outside those conditions, a 25 W voice signal into an ocean-crossing path is mostly an exercise in optimism.

**FT8 is worth it when the path is the problem.** When conditions are marginal, when the entity is new, or when the path is simply too long for 25 W of voice, FT8 gets through where nothing else will. It is a tool for making the impossible merely difficult.

They are not competitors. They answer different questions.

## Phase three: the digital week

I ran my first FT8 QSO on 12 July at 20:33 UTC with TA1SMO in Turkey. The eight days that followed changed the shape of my log.

<div class="eval26" markdown="0">
<div class="two">
<div class="panel">
  <h4>Before 12 July · 36 active days</h4>
  <div class="bars">
    <div class="bar"><span>QSOs</span><span class="track"><span class="fill" style="width:100%;background:var(--c-cyan)"></span></span><span class="val">161</span></div>
    <div class="bar"><span>Entities</span><span class="track"><span class="fill" style="width:88%;background:var(--c-cyan)"></span></span><span class="val">36</span></div>
    <div class="bar"><span>Mean km</span><span class="track"><span class="fill" style="width:59%;background:var(--c-cyan)"></span></span><span class="val">1,288</span></div>
  </div>
</div>
<div class="panel">
  <h4>From 12 July · 8 active days</h4>
  <div class="bars">
    <div class="bar"><span>QSOs</span><span class="track"><span class="fill" style="width:53%;background:var(--c-primary);box-shadow:var(--glow-sm)"></span></span><span class="val">86</span></div>
    <div class="bar"><span>Entities</span><span class="track"><span class="fill" style="width:100%;background:var(--c-primary);box-shadow:var(--glow-sm)"></span></span><span class="val">41</span></div>
    <div class="bar"><span>Mean km</span><span class="track"><span class="fill" style="width:100%;background:var(--c-primary);box-shadow:var(--glow-sm)"></span></span><span class="val">2,186</span></div>
  </div>
  <div class="note">Seventeen entities I had never worked before, in eight days. Mean distance up 70 percent.</div>
</div>
</div>
</div>

FT8 also unlocked two bands I had barely touched. My first and so far only 80m contact is FT8, PI4APD in the Netherlands on 12 July. My first 30m contacts are FT8, starting with F6DZU on 16 July at 06:17 UTC. On a band where SSB is not permitted, digital is simply how you get on the air.

The thing nobody warns you about: FT8 is quiet in the shack and loud in the head. There is no adrenaline in a 15-second automated exchange. What there is instead is a slow, precise education in propagation. You watch the waterfall, you see which paths are open at which minute, and you build a mental map of the ionosphere that phone operating alone would have taken me a year to develop.

## The modes, in the order they arrived

<div class="eval26" markdown="0">
<div class="panel">
  <h4>Mode timeline</h4>
  <table>
    <thead><tr><th>Date</th><th>Mode</th><th>First contact</th><th>Band</th><th>Total to date</th></tr></thead>
    <tbody>
      <tr><td>27 May 2026</td><td class="dx">SSB</td><td>LZ100LZ, Bulgaria</td><td>20m</td><td>170</td></tr>
      <tr><td>13 Jun 2026</td><td class="dx">FM</td><td>ON4AUB, Belgium</td><td>2m</td><td>4</td></tr>
      <tr><td>12 Jul 2026</td><td class="dx">FT8</td><td>TA1SMO, Turkey</td><td>20m</td><td>73</td></tr>
      <tr><td>in progress</td><td class="dx">CW</td><td>studying</td><td>-</td><td>0</td></tr>
    </tbody>
  </table>
  <div class="note">Band firsts, in order: 20m (27 May), 40m (1 Jun), 10m (3 Jun), 15m (7 Jun), 2m (13 Jun), 80m (12 Jul), 30m (16 Jul).</div>
</div>
</div>

CW is the obvious gap. I have been working on it, and the log has a zero in that column that I intend to change. Every operator I respect tells me the same thing: CW is where a low-power station becomes competitive. Given what 25 W already does on FT8, I believe them.

## What I would tell myself on day one

**Log everything immediately.** This entire analysis exists because 247 records were entered properly. Sloppy logging is stolen data from your future self.

**Your first hundred QSOs are a listening exercise.** I learned more from the contacts I did not make than the ones I did.

**Twilight is not a metaphor.** Put it in your calendar. The two hours around sunset are worth more than a whole afternoon.

**Twenty-five watts is not a handicap, it is a constraint.** Constraints make you a better operator, because you cannot brute-force anything. You have to be in the right place, at the right time, on the right band, with a clean signal. That is the whole hobby.

**Nobody minds that you are new.** Not once in 247 contacts has anyone been unkind about my Class C callsign or my hesitant phonetics. Not once.

## Thank you

None of this happened alone, and it is important to me to say so.

To everyone at radio club **WLD, ON6WL**: thank you for the advice, the patience, and the willingness to answer beginner questions properly rather than quickly. The evenings at the club taught me things no manual covers, and the encouragement after a bad session mattered more than the technical tips.

A special thank you to **Joeri Van Dooren, ON6URE** of [RF.Guru](https://shop.rf.guru/), for the complete support in setting up my station. From choosing the antenna to getting the feedline, matching and installation right, the guidance was engineer-led, honest, and free of the myths that fill the beginner internet. A very large share of the 390,218 km in this log is a direct consequence of an installation that was done properly the first time.

If you take one article from his knowledge base, make it this one: [Ground, Grounding and SWR](https://shop.rf.guru/pages/ground-grounding-and-swr). It explains why an "RF ground" is not a real thing, why ground rods will not fix your SWR, and why the current return path is what actually matters for a vertical. Understanding that changed how I think about my own antenna. More of his writing lives at [The Guru's Lab](https://shop.rf.guru/blogs/the-guru-s-lab).

And to every operator who came back to a weak signal from a small station in Hoboken: thank you. You were the ones who made this log possible.

## Next

Fifty-two entities in fifty-four days. The next fifty will be harder, and that is exactly the point.

The plan: get CW into the log, fix the low-band situation so 40m and 80m stop being a rounding error, chase the sunrise grey line as diligently as I have chased the sunset one, and keep working toward HAREC Class A.

Two hundred and forty-seven contacts ago I was a person who was nervous about saying his own callsign out loud. The bands do not care how nervous you are. They only care whether you call.

*73 de ON3VZ*
