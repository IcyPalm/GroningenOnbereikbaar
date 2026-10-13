# Verbeterplan — Groningen ONbereikbaar

## Gedaan (13 oktober 2026)
- 16 nieuwsberichten, waarvan 8 nieuw (okt/sep, incl. 4 Mijl en Wunderline) en de 4 stub-berichten van maart nu echte pagina's; overzicht, homepage, sitemap en RSS (`/feed.xml`) bijgewerkt.
- 15 foto's uit Groningen (Wikimedia Commons) bij nieuws en homepagekaarten; `/bronvermelding/` met maker en licentie.
- Contrast: contactpagina, footer en uitgeschakelde knoppen gerepareerd (controle op alle pagina's).
- Mobiel (375px): overflow op home en contact opgelost; thumbnails in nieuwsoverzicht hadden te grote hoogte.
- Homepagekaarten, excuusbrief (kopiëren/printen), toolkit en formulieren werken zichtbaar; geen `href="#"` meer behalve uitgeschakelde knoppen.
- 404.html, favicon, Open Graph/canonical (www), robots.txt, sitemap.xml.
- Hero-afbeeldingen naar WebP; nginx: gzip, caching, security headers (CSP voor umami), relatieve redirects. Getest in Docker en live.

- Omgezet naar Hugo (`site/`): header, footer en nieuwsbriefblok zijn partials; nieuws is Markdown; overzicht, homepage, feed, sitemap en bronvermelding worden gegenereerd. HTML vergeleken met de oude pagina's.
- README herschreven (structuur, Hugo, nieuwsbericht toevoegen; `groningen.nl` is `groningenbereikbaar.nl`).

## Nog open (keuze of onderhoud)
- "Wat staat er nu?"-rubriek: vraagt handmatig onderhoud.
- Echte social-accounts (nu alleen Mastodon).
- Inline `style=""` opruimen.
- Nieuwsberichten verouderen: bij nieuwe echte afsluitingen op groningenbereikbaar.nl/nieuws nieuwe berichten schrijven (zie bronnen daar).

---
Oorspronkelijk plan hieronder.

Stand van zaken: 13 oktober 2026. Alle 28 pagina's bestaan en de linkchecker (20 maart) vond geen kapotte links. De site staat inhoudelijk, maar de nieuwsberichten zijn van maart en dus verouderd.

## 1. Nieuws (prioriteit)

Bronnen: [groningenbereikbaar.nl/nieuws](https://www.groningenbereikbaar.nl/nieuws). Feiten zijn echt, de toon is deadpan-overdreven. Eén pagina per bericht, naar het voorbeeld van `public/zuiderdiep-fietserssluis/index.html`.

| Datum | Voorstel titel (parodie) | Echte aanleiding |
|---|---|---|
| 13 okt | Spoorwerk sluit Peizerweg én Prinsesseweg: 'Fietsers kunnen via Kerklaan. Of thuisblijven.' | Peizerweg dicht 15 t/m 19 okt, Prinsesseweg/Zonnelaan 16 t/m 18 okt |
| 13 okt | Drie dagen geen treinen naar Zuidhorn, Eemshaven en Delfzijl: 'Gelukkig is er de bus' | ProRail vervangt spoor, Arriva-bussen, 16–18 okt, geen fietsen mee |
| 8 okt | Ring Zuid 's nachts dicht: ook het 'omrijden over de Europaweg' is nu een evenement | Nachtafsluiting Euvelgunnerbrug 12/13 en 13/14 okt |
| 8 okt | Zonnelaan een week dicht, bus 1, 2 en 171 'kiezen hun eigen weg' | Asfaltwerk 12–16 okt |
| 25 sep | Noodbrug Vissersbrug krijgt onderhoud; er is geen noodbrug voor de noodbrug | Noodbrug weg tot ca. 23 okt |
| 24 sep | Spoorwegovergang Friesestraatweg dicht, 'vanaf half oktober weken, datum volgt' | Afsluiting 25–28 sep, daarna weken dicht zonder datum |
| 2 okt | Wunderline rijdt weer naar Leer: het enige traject dat wél opschiet | Eerste rit 1 okt, dienstregeling vanaf 5 okt |
| 2 okt | 4 Mijl: 'Check voor vertrek' (ook uw route naar huis) | Evenement 4 Mijl |

Aanbeveling: de eerste 5 schrijven. De 4 Mijl en Wunderline zijn nice-to-have. De berichten van 8 en 13 okt zijn het meest actueel en vervallen binnenkort, dus doe die eerst.

Bijkomende nieuwswerk:
- Lees de details van de 4 Mijl-berichten nog na; die heb ik niet opgehaald.
- De 8 maart-berichten op `/nieuws/` met `href="#"` (Paterswoldseweg, kajak-column, jaarverslag, Osloweg) krijgen een eigen pagina óf de link wordt weggehaald. Nu klikken bezoekers op "Lees meer" zonder resultaat.
- Datums van de oude maartberichten bewaren; ze blijven staan als archief. Eventueel herhaling als grap ("Hereweg: nog steeds").
- Homepage toont de 4 nieuwste berichten (`public/index.html:312-355`): bijwerken na publicatie.
- Overweeg een rubriek "Wat staat er nu?" met de echte data van deze week.

## 2. Kapotte of lege plekken

- Homepage: 4 "Probeer gratis"-kaarten linken naar `#` (`public/index.html:194-230`). Linken naar bestaande pagina's (thuiswerken, alternatieve-routes, omrijd-tips, toolkit-wanhoop) of een eigen pagina.
- `/excuusbrief/`: knoppen Word en PDF doen niets (`#`). Echt bestand toevoegen (docx en pdf in `public/`) of de knop vervangen door een kopieerknop/printversie.
- `/toolkit-wanhoop/`: 4 "Downloaden"-knoppen zonder bestand. Zelfde keuze.
- `/thuiswerkbeleid/`: PDF-knop uitgeschakeld "komt eraan" — grap of afmaken.
- Footer, alle pagina's: 4 social-links naar `#`. Echte accounts (bijv. Mastodon, dat staat al in de credit) of verwijderen. Een kapotte link kan ook de grap zijn, maar dan expliciet.
- Formulieren `/klachten/`, `/nieuwsbrief/`, `/advies-op-maat/`: `action="#"`, doen niets zichtbaars. Kleine JS-reactie in `main.js` (zoals bij nieuwsbrief) toevoegen. Let op: `alert()` is storend; liever een melding op de pagina.
- `nginx.conf` verwijst naar `/404.html` maar die bestaat niet. Een eigen 404 is een gratis grap ("Deze pagina is niet bereikbaar").

## 3. Techniek en onderhoud

- Header, footer en nieuwsbriefblok staan 29 keer gekopieerd. Elke wijziging (zoals een nieuw menu-item) is 29 bewerkingen. Keuze: (a) laten zoals het is, (b) kleine build met een script (`build.sh`/Node) dat `templates/` plus `content/` samenvoegt, (c) nginx SSI (`ssi on;`) voor header/footer. Aanbeveling: (c) is het goedkoopst en past bij "geen build step", of (a) als je weinig pagina's toevoegt.
- Afbeeldingen: `hero-left.png` en `hero-right.png` zijn samen 5,6 MB. Omzetten naar WebP/AVIF, ~200 KB.
- nginx: gzip aan, `Cache-Control` voor `/css`, `/js`, `/img`, aanvullende headers (`Referrer-Policy`, `Content-Security-Policy` rekening houdend met het umami-script). `add_header` in `location /healthz` en `error_page` testen.
- Inline `style=""` op diverse pagina's (bijv. toolkit-wanhoop) naar `style.css`.
- Linkchecker-uitvoer (`linkchecker-out.html`) staat ongecommit in de root: toevoegen aan `.gitignore` of verwijderen. Houd de root schoon.

## 4. SEO en delen

- Geen enkele pagina heeft Open Graph/Twitter-tags. Bij delen van een nieuwsbericht staat er geen preview. Toevoegen: `og:title`, `og:description`, `og:image`, `canonical`.
- Geen favicon (`rel="icon"`), geen `robots.txt`, geen `sitemap.xml` (de sitemap-pagina is alleen voor mensen).
- Een OG-afbeelding maken (logo + "Groningen ONbereikbaar").
- Per nieuwsbericht `<title>` en `meta description` uniek maken, `<article>` met `datePublished` (JSON-LD `NewsArticle`).

## 5. Toegankelijkheid en mobiel

- Contrast van de rode/donkere blokken en de `.news-category`-labels controleren.
- Dropdown-menu is alleen muis/tik-gedreven (`main.js`); toetsenbord (Tab, Escape) en `aria-expanded` op sublevels toevoegen.
- Mobiele weergave doorlopen op 375px breed (hero, kaartenslider, tabellen op `/wat-is-er-dicht/`).
- De zoekknop en taalkeuze in de header doen niets. Echte zoekfunctie is zinloos; wel een grap ("Geen resultaten, wel een omleiding") of verwijderen.

## 6. Contentideeën (leuk, niet nodig)

- "Wat is er nu dicht?" automatisch bijwerken: handmatige lijst met datums, verlopen items verbergen.
- Teller "Dagen sinds de laatste wegafsluiting: 0".
- Pagina `/vertragingsgenerator/` waar je een straat invult en een ontkennende planning krijgt.
- Een RSS-feed voor het nieuws.

## Voorgestelde volgorde

1. 5 nieuwsberichten + overzicht + homepage (1 sessie)
2. Lege `#`-links en 404-pagina (klein)
3. OG-tags, favicon, robots, sitemap.xml
4. Afbeeldingen comprimeren, nginx gzip/cache
5. Beslissen over templating (SSI of niets)
