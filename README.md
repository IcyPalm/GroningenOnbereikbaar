# Groningen ONbereikbaar

Een liefdevolle parodie op de gemeente Groningen en haar eeuwige bouwplannen, wegafsluitingen en verkeerschaos. Geïnspireerd op de officiële communicatiestijl van de gemeente — maar dan eerlijker.

## Over dit project

Groningen ONbereikbaar is een satirische website die de onbereikbaarheid van Groningen op een humoristische manier in kaart brengt. U vindt hier omleidingen die nergens naartoe leiden, nieuwsberichten over vertragingen die u allang verwacht had, en een excuusbrief die u gratis kunt downloaden voor uw werkgever.

De website is gebouwd als een statische HTML/CSS-site en lijkt qua opzet sterk op de echte [groningen.nl](https://groningen.nl) — maar dan zonder de valse hoop.

## Projectstructuur

```
/
├── README.md
├── Dockerfile
├── nginx.conf
└── public/
    ├── index.html          # Homepage
    ├── css/                # Stijlen
    ├── js/                 # Scripts
    ├── img/                # Afbeeldingen en logo
    ├── slim-omrijden/      # Slim omrijden (sectie)
    ├── omleidingen/
    ├── omrijd-tips/
    ├── alternatieve-routes/
    ├── thuiswerken/
    ├── onbereikbaarheid/   # ONbereikbaarheid (sectie)
    ├── wat-is-er-dicht/
    ├── stremmingskaart/
    ├── projecten/
    ├── verkeerscams/
    ├── werkgevers/         # Werkgevers (sectie)
    ├── thuiswerkbeleid/
    ├── advies-op-maat/
    ├── toolkit-wanhoop/
    ├── nieuws/             # Nieuws
    ├── zuiderdiep-fietserssluis/
    ├── hereweg-vertraging/
    ├── damsterdiep-emmaviaduct/
    ├── wekker-twee-uur/
    ├── over-ons/           # Over ons
    ├── onze-excuses/
    ├── contact/
    ├── vacatures/
    ├── excuusbrief/        # Footer-pagina's
    ├── sitemap/
    ├── privacyverklaring/
    ├── nieuwsbrief/
    └── klachten/
```

Elke pagina heeft een eigen map met een `index.html`, zodat URL's er schoon uitzien: `/nieuws` in plaats van `/nieuws.html`.

## Lokaal draaien

Met Docker:

```bash
docker build -t groningenonbereikbaar .
docker run -p 8080:80 groningenonbereikbaar
```

De site is dan bereikbaar op [http://localhost:8080](http://localhost:8080). Anders dan Groningen zelf.

## Deployen op Coolify

1. Verbind uw Git-repository aan Coolify
2. Kies **Dockerfile** als build pack
3. Coolify herkent de `Dockerfile` automatisch en bouwt de image
4. Stel uw domein in — klaar

## Disclaimer

Dit is een parodiewebsite. Alle informatie is fictief. Toevallige overeenkomsten met de werkelijkheid zijn pijnlijk maar niet opzettelijk. Wij zijn niet verantwoordelijk voor vertragingen die u oploopt tijdens het lezen van deze website.

---

## English summary

**Groningen ONbereikbaar** ("Groningen Unreachable") is a satirical website parodying the city of Groningen's official communication style around its endless road closures, construction projects and traffic chaos. Built as a static HTML/CSS site, it mimics the look and feel of the real municipality website — but with considerably more honesty.

Served via nginx in Docker, deployable on Coolify. Clean URLs are handled by giving each page its own directory with an `index.html`.
