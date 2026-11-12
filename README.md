# ON3VZ.github.io

The personal amateur radio site of **ON3VZ**, a Belgian Class C radio amateur in Hoboken, Antwerp (locator JO21EE), member of UBA and radio club WLD (ON6WL).

**Live site: [on3vz.github.io](https://on3vz.github.io/)**

The site follows my path from a new callsign to HF, portable QRP and digital voice: the station, the log, the cards and what I learn on the way, written so other beginners can follow along.

## What is on the site

| Page | What you find there |
|---|---|
| [Home](https://on3vz.github.io/inner/) | Start page with the latest posts and QSO activity |
| [Blog](https://on3vz.github.io/blog/) | Step by step guides and stories from the air (see below) |
| [Shack](https://on3vz.github.io/shack/) | The home station: Icom IC-7300 MkII at 25 W on HF, antennas and filtering |
| [Mobile](https://on3vz.github.io/mobile/) | Radio in the car |
| [Portable](https://on3vz.github.io/portable/) | ON3VZ/P, the QRP portable station (QRP Labs QMX, SOTAbeams Band Hopper IV) for WWFF and ONFF activations |
| [Projects](https://on3vz.github.io/projects/) | Tools I built: QSObridge log converter, N1MM Field Day Tracker, UBA QSL Sorter, HF Band Scout and more |
| [Trackers](https://on3vz.github.io/trackers/) | Award trackers, such as the BAFARA OR80AF award |
| [Logbook](https://on3vz.github.io/logbook/) | The interactive log, with the [DXCC matrix](https://on3vz.github.io/dxcc-matrix/), the [QSO dashboard](https://on3vz.github.io/qso-dashboard/) and the [worked countries map](https://on3vz.github.io/worked-countries/) |
| Wall | [eQSL cards](https://on3vz.github.io/qsl-wall/) and [awards and certificates](https://on3vz.github.io/certificates/) |
| [Contact](https://on3vz.github.io/contact/) | How to reach me |

## Blog highlights

**DMR and digital voice, for beginners**

1. [Ones, zeros and a human voice](https://on3vz.github.io/2026/10/10/digital-voice-modes-on4pn-wld/): DMR, D-STAR, Fusion and FreeDV explained (talk by ON4PN at WLD)
2. [Part 1: from box to codeplug](https://on3vz.github.io/2026/10/29/dm1801pro-part-1-setup/): DMR ID, BrandMeister, a Baofeng DM-1801 Pro and a Pi-Star hotspot
3. [Part 2: daily use](https://on3vz.github.io/2026/10/29/dm1801pro-part-2-daily-use/): zones, calling, QSY, roaming, EchoLink by DTMF
4. [Part 3: DroidStar](https://on3vz.github.io/2026/11/03/dmr-on-the-smartphone-droidstar/): DMR on the smartphone
5. [Part 4: QSO One](https://on3vz.github.io/2026/11/12/qso-one-dmr-echolink-without-a-radio/): DMR, EchoLink and more without a radio
6. [Friends nets in Flanders](https://on3vz.github.io/2026/11/09/flemish-friends-nets-weekly-planner/): a weekly planner of FM, HF, SvxLink and DMR nets

**Getting started on HF**

- [Building a capable HF station on 25 watts](https://on3vz.github.io/2026/05/01/hf-station-build/)
- [From first QSO to first QSL card](https://on3vz.github.io/2026/05/06/from-first-qso-to-first-qsl-card/) and [QSL via the UBA bureau](https://on3vz.github.io/2026/06/09/qsl-cards-via-the-uba-bureau/)
- [First steps into FT8](https://on3vz.github.io/2026/07/12/first-steps-into-ft8/)
- [IC-7300 MkII settings for every situation](https://on3vz.github.io/2026/11/02/ic-7300-mk2-settings-for-every-situation/)
- [How a layered setup keeps my 25 W clean](https://on3vz.github.io/2026/10/07/when-theory-meets-practice-clean-25w/)

**Portable QRP**

- [Building ON3VZ/P](https://on3vz.github.io/2026/08/18/building-on3vz-p/), a QRP station for Flora and Fauna activations, with the [reference manual](on3vz-p-manual.md)

All posts are on the [blog page](https://on3vz.github.io/blog/).

## How the site is built

- **Jekyll on GitHub Pages**, with the site's own layout in `_layouts/` and styles in `css/`. The "fresh" look with a light and dark mode is the default.
- **Posts** live in `_posts/` as `YYYY-MM-DD-title.md`. Post specific styles sit in a `<style>` block at the top of the post. Images per post are in `assets/images/<post-name>/`.
- **Logbook data**: ADIF files in `assets/data/`, listed in `assets/data/manifest.json` and consolidated into `archive.adi`. The workflows in `.github/workflows/` keep the log in sync (`sync-logbook.yml`, `consolidate-adif.yml`). Page logic is in `js/` (`logbook.js`, `dxcc-matrix.js`, `qso-dashboard.js`, `worked-countries.js`).
- **eQSL wall**: card images in `assets/images/qsl/`, 877 px wide, named `{callsign-lowercase}-{YYYY-MM-DD}.jpg` (a slash in a portable callsign becomes a hyphen), listed in `assets/data/qsl-manifest.json`.
- **Scripts** in `scripts/`: the portable field checklist PDF (`build_field_checklist.py`) and the BAFARA tracker build.
- Every change is additive and dated in a comment, so it can be reverted easily.

## Contact

Questions, corrections or a sked? Use the [contact page](https://on3vz.github.io/contact/).

73 de ON3VZ
