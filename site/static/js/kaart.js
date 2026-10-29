(function () {
  var BANKSTEL = [
    { naam: 'Oranjestraat', lat: 53.2223727, lon: 6.5516096 },
    { naam: 'Tuinbouwstraat', lat: 53.2280389, lon: 6.5575596 },
    { naam: 'Herman Colleniusstraat', lat: 53.2193066, lon: 6.5484152 },
    { naam: 'Petrus Campersingel', lat: 53.2201128, lon: 6.5790905 },
    { naam: 'Nieuwe Boteringestraat', lat: 53.2228669, lon: 6.5608278 },
    { naam: 'Nassaulaan', lat: 53.2217631, lon: 6.5517218 },
    { naam: 'Amstelstraat', lat: 53.2049071, lon: 6.5661396 },
    { naam: 'Pleiadenlaan', lat: 53.2274741, lon: 6.5363023 },
    { naam: 'Eikenlaan', lat: 53.2330484, lon: 6.5542607 },
    { naam: 'Diamantlaan', lat: 53.2209128, lon: 6.528799 },
    { naam: 'Siersteenlaan', lat: 53.2259152, lon: 6.5286648 },
    { naam: 'Helper Brink', lat: 53.1998067, lon: 6.5837686 },
    { naam: 'Goeman Borgesiuslaan', lat: 53.1947497, lon: 6.5824739 },
    { naam: 'Coendersweg', lat: 53.2005462, lon: 6.5825027 },
    { naam: 'Oliemuldersweg', lat: 53.2255411, lon: 6.5874551 },
    { naam: 'Goudlaan', lat: 53.2240427, lon: 6.5332009 },
    { naam: 'Kajuit', lat: 53.2383541, lon: 6.6232371 },
    { naam: 'Parkweg', lat: 53.2076495, lon: 6.5624879 },
    { naam: 'Hoendiepskade', lat: 53.2148922, lon: 6.5529831 },
    { naam: 'Bernoulliplein', lat: 53.2282739, lon: 6.5671136 },
    { naam: 'Bedumerweg', lat: 53.2305682, lon: 6.5619272 },
    { naam: 'Meeuwerderweg', lat: 53.2145774, lon: 6.5776261 },
    { naam: 'Floresstraat', lat: 53.2328072, lon: 6.56598 },
    { naam: 'Sumatralaan', lat: 53.2309594, lon: 6.5649005 },
    { naam: 'Wilgenlaan', lat: 53.2291591, lon: 6.548152 },
    { naam: 'Hora Siccamasingel', lat: 53.1989791, lon: 6.5728359 }
  ];

  function readBankstel() {
    var match = document.cookie.match(/(?:^|; )bankstel=([^;]*)/);
    if (!match) return null;
    var parts = decodeURIComponent(match[1]).split('|');
    if (parts.length !== 3) return null;
    var lat = Number(parts[1]);
    var lon = Number(parts[2]);
    if (!parts[0] || !isFinite(lat) || !isFinite(lon)) return null;
    if (lat < 53.17 || lat > 53.26 || lon < 6.48 || lon > 6.66) return null;
    return { naam: parts[0], lat: lat, lon: lon };
  }

  function writeBankstel(place) {
    var value = encodeURIComponent(place.naam + '|' + place.lat + '|' + place.lon);
    var secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = 'bankstel=' + value + '; Path=/; Max-Age=31536000; SameSite=Lax' + secure;
  }

  function bankstel() {
    var saved = readBankstel();
    if (saved) return saved;
    var place = BANKSTEL[Math.floor(Math.random() * BANKSTEL.length)];
    writeBankstel(place);
    return place;
  }

  var el = document.getElementById('stremmingskaart');
  if (!el || typeof L === 'undefined') return;

  var markers = [];
  try {
    markers = JSON.parse(el.dataset.markers || '[]');
  } catch (e) {
    return;
  }

  var plek = bankstel();
  markers.push({
    naam: plek.naam,
    detail: 'Uw bankstel',
    status: 'Vrij',
    heropening: '',
    url: '',
    lat: plek.lat,
    lon: plek.lon,
    kleur: 'vrij'
  });

  var map = L.map(el, { scrollWheelZoom: false });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  var group = [];
  markers.forEach(function (m) {
    var kleur = m.kleur === 'deels' || m.kleur === 'vrij' ? m.kleur : 'dicht';
    var icon = L.divIcon({
      className: 'map-pin map-pin--' + kleur,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });
    var marker = L.marker([m.lat, m.lon], { icon: icon, title: m.naam });
    var popup = document.createElement('div');
    popup.className = 'map-popup';
    var title = document.createElement('strong');
    title.textContent = m.naam;
    popup.appendChild(title);
    if (m.detail) {
      var detail = document.createElement('div');
      detail.textContent = m.detail;
      popup.appendChild(detail);
    }
    var status = document.createElement('div');
    status.textContent = m.heropening ? m.status + ' · ' + m.heropening : m.status;
    popup.appendChild(status);
    if (m.url) {
      var link = document.createElement('a');
      link.href = m.url;
      link.textContent = 'Meer over deze afsluiting';
      popup.appendChild(link);
    }
    marker.bindPopup(popup);
    marker.addTo(map);
    group.push(marker);
  });

  if (group.length) {
    map.fitBounds(L.featureGroup(group).getBounds().pad(0.12));
  } else {
    map.setView([53.219, 6.566], 12);
  }
})();
