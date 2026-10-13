# Groningen ONbereikbaar

Een liefdevolle parodie op [groningenbereikbaar.nl](https://www.groningenbereikbaar.nl), de officiële informatiesite over wegwerkzaamheden en omleidingen in en rond Groningen. De site kopieert de communicatiestijl, maar dan eerlijker.

## Over dit project

Groningen ONbereikbaar is een satirische website die de onbereikbaarheid van Groningen op een humoristische manier in kaart brengt. U vindt hier omleidingen die nergens naartoe leiden, nieuwsberichten over vertragingen die u allang verwacht had, en een excuusbrief die u kunt kopiëren voor uw werkgever.

Het nieuws is gebaseerd op echte berichten van groningenbereikbaar.nl, met een overdreven toon. De foto's komen van Wikimedia Commons; zie [`/bronvermelding/`](https://www.groningenonbereikbaar.nl/bronvermelding/).

De site wordt gebouwd met [Hugo](https://gohugo.io) en geserveerd door nginx in Docker.

## Projectstructuur

```
/
├── README.md
├── TODO.md
├── Dockerfile              # Hugo-build, daarna nginx
├── nginx.conf              # gzip, caching, security headers, 404
└── site/                   # Hugo-project
    ├── hugo.toml
    ├── content/
    │   ├── _index.md       # Homepage (tekst in layouts/index.html)
    │   ├── nieuws/         # Nieuwsberichten (Markdown, één bestand per bericht)
    │   └── *.html          # Overige pagina's: front matter + HTML
    ├── layouts/
    │   ├── _default/       # Basislayout, losse pagina's, sitemap en bronvermelding
    │   ├── nieuws/         # Nieuwsoverzicht en nieuwsbericht
    │   ├── partials/       # Header, footer, nieuwsbriefblok, <head>
    │   ├── index.html      # Homepage
    │   ├── index.rss.xml   # RSS-feed (/feed.xml)
    │   └── 404.html
    ├── data/photos.yaml    # Foto's met maker en licentie
    └── static/             # css, js, img, robots.txt
```

Elke pagina krijgt een schone URL: `/nieuws/` in plaats van `/nieuws.html`. Berichten staan onder `/<naam>/`, niet onder `/nieuws/`. Sitemap (`/sitemap.xml`) en feed (`/feed.xml`) worden gegenereerd.

## Lokaal draaien

Met [Hugo](https://gohugo.io/installation/) (extended, v0.167 of nieuwer):

```bash
hugo server --source site
```

De site draait dan op [http://localhost:1313](http://localhost:1313) en ververst bij elke wijziging.

Of met Docker, zoals op de server:

```bash
docker build -t groningenonbereikbaar .
docker run -p 8080:80 groningenonbereikbaar
```

De site is dan bereikbaar op [http://localhost:8080](http://localhost:8080). Anders dan Groningen zelf.

## Een nieuwsbericht toevoegen

Maak `site/content/nieuws/<slug>.md`:

```markdown
---
title: "Titel van het bericht"
date: 2026-10-13T12:00:00  # Tijd bepaalt de volgorde van berichten op dezelfde dag
category: "Wegafsluiting"
intro: "Eerste alinea onder de kop."
teaser: "Korte tekst voor het overzicht."
description: "Tekst voor zoekmachines en deelkaarten."
photo: a7                  # Sleutel uit data/photos.yaml
photo_alt: "Beschrijving van de foto"
photo_caption: "Grappig bijschrift"
slug: titel-van-het-bericht
---

Tekst in Markdown. Gebruik `## Kopjes`, lijsten en `> citaten`.
```

Overzicht, homepage, feed en sitemap passen zich vanzelf aan. Bij een nieuwe foto: voeg die toe aan `site/static/img/foto/` en `site/data/photos.yaml` (maker, licentie, bronpagina). De bronvermelding wordt daaruit gemaakt.

Voor een gewone pagina: een `.html`-bestand in `site/content/` met front matter (`title`, `subtitle`, `description`) en de inhoud van `<main>` eronder.

## Deployen op Coolify

1. Verbind uw Git-repository aan Coolify
2. Kies **Dockerfile** als build pack
3. Coolify herkent de `Dockerfile` automatisch, bouwt de site met Hugo en serveert die met nginx
4. Stel uw domein in — klaar

Een push naar `main` zet de nieuwe versie na een paar minuten live.

## Disclaimer

Dit is een parodiewebsite. Alle informatie is fictief. Toevallige overeenkomsten met de werkelijkheid zijn pijnlijk maar niet opzettelijk. Wij zijn niet verantwoordelijk voor vertragingen die u oploopt tijdens het lezen van deze website.

---

## English summary

**Groningen ONbereikbaar** ("Groningen Unreachable") is a satirical website parodying [groningenbereikbaar.nl](https://www.groningenbereikbaar.nl), the official site about road works and detours in Groningen, the Netherlands. News items are based on real announcements, rewritten in a deadpan, exaggerated tone; photos are from Wikimedia Commons (see `/bronvermelding/`).

Built with Hugo (`site/`), served by nginx in Docker via a multi-stage `Dockerfile`, and deployable on Coolify. Run it locally with `hugo server --source site`.
