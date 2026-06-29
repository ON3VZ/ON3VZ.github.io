# FreeCAD voor Radioamateurs — WLD ON6WL

Statische leeromgeving (HTML/CSS/JS) die radioamateurs leert werken met **FreeCAD 1.1.1** om zelf behuizingen en onderdelen te tekenen en printklaar te maken. Gebouwd in de huisstijl van het WLD dB/dBm-leerplatform.

## Structuur
- `index.html` — home: hero, voortgang, 4-niveau leerpad, hoofdstukrooster
- `login.html` — callsign-login + taalkeuze (NL/FR/EN)
- `bronnen.html` — bronnen, licenties en "Doel & gebruik"
- `chapters/` — hoofdstukpagina's (h01 … h23)
- `assets/css/freecad.css` — huisstijl (WLD-stijl hergebruikt + toevoegingen)
- `assets/js/app.js` — i18n, voortgang (localStorage), interactiviteit
- `assets/js/sidebar.js` — navigatie-opbouw
- `assets/img/` — screenshots per hoofdstuk

## Leertraject (4 niveaus, 23 hoofdstukken)
- **Niveau 1 — Basis** (h01–h06): bakje rond een PCB → STL
- **Niveau 2 — Medior** (h07–h12): bak + deksel met passing en gaten
- **Niveau 3 — Gevorderd** (h13–h18): frontpaneel / antennebeugel, DfAM
- **Niveau 4 — Expert** (h19–h23): parametrische ARDF-behuizing met varianten

## Status
- Scaffold + **hoofdstuk 1 volledig uitgewerkt** (NL). Overige hoofdstukken: "In voorbereiding".
- Interface trilinguaal (NL/FR/EN); hoofdstukteksten eerst in NL, FR/EN volgen.
- Screenshots: eigen 1.1.1-captures (light + Gesture) + publiceerbare bronnen (Lachiver CC BY-SA 4.0, FreeCAD-manual CC BY 4.0). Zie `bronnen.html`.

## Lokaal bekijken
Open `index.html` in een browser (start via `login.html` voor de callsign). Voor een schone test:
`python3 -m http.server` in deze map, daarna http://localhost:8000

## Publiceren op GitHub Pages
Push naar een GitHub-repo; de workflow in `.github/workflows/deploy.yml` publiceert automatisch. Zet in de repo-instellingen *Pages → Source* op **GitHub Actions**.

## Licentie
Aanbevolen: **CC BY-SA 4.0** met bronvermelding (zie `bronnen.html`). Gratis, niet-commercieel, voor clubgebruik.
