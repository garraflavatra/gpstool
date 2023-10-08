<script>
  /* global L */
  import { onMount } from 'svelte';
  import { latLngToDMS, latLngToDecimal, latLngToExif } from './conversion.js';
  import { getAppleUrl, getDuckDuckGoUrl, getGoogleUrl } from './urls.js';

  let map;
  let mapDiv;
  let marker;
  let coords = L.latLng(51.507, -0.1275);

  function updateMap() {
    map.setView(coords);
    marker.setLatLng(coords);
  }

  onMount(() => {
    map = L.map(mapDiv).setView(coords, 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.polyline([ [ -90, 0 ], [ 90, 0 ] ]).addTo(map);
    L.polyline([ [ 0, -180 ], [ 0, 180 ] ]).addTo(map);

    marker = L.marker(coords).addTo(map);

    map.on('click', event => {
      coords = event.latlng;
      updateMap();
    });
  });
</script>

<main class="grid">
  <div class="info">
    <section class="card">
      <h2>Coordinates</h2>

      <dl>
        <dt>Decimal</dt>
        <dd>{latLngToDecimal(coords)}</dd>

        <dt>DMS</dt>
        <dd>{latLngToDMS(coords)}</dd>

        <dt>EXIF</dt>
        <dd>{latLngToExif(coords)}</dd>
      </dl>
    </section>

    <section class="card">
      <h2>Go to</h2>
      <div class="coordinate-input">
        <input
          class="input"
          type="number"
          step={0.25}
          bind:value={coords.lat}
          on:change={updateMap}
        />
        <input
          class="input"
          type="number"
          step={0.25}
          bind:value={coords.lng}
          on:change={updateMap}
        />
      </div>
    </section>

    <section class="card">
      <h2>Open in</h2>
      <ul>
        <li><a href={getAppleUrl(coords)} target="_blank">Apple Maps</a></li>
        <li><a href={getGoogleUrl(coords)} target="_blank">Google Maps</a></li>
        <li><a href={getDuckDuckGoUrl(coords)} target="_blank">DuckDuckGo</a></li>
      </ul>
    </section>

    <p>
      Star gpstool on
      <a href="https://github.com/garraflavatra/gpstool" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </p>
  </div>

  <div class="map" bind:this={mapDiv} />
</main>

<style>
  .grid {
    display: grid;
    grid-template: 1fr / 250px 1fr;
    height: 100%;
    gap: 12px;
  }
  @media (max-width: 750px) {
    .grid {
      grid-template: 1fr 2fr / 1fr;
    }
  }

  .info {
    overflow: scroll;
  }

  .coordinate-input {
    display: grid;
    gap: 8px;
    grid-template: 1fr / 1fr 1fr;
  }
</style>
