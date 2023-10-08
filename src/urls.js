import { latLngToDMS } from './conversion.js';

export function getAppleUrl({ lat, lng }) {
  return `https://maps.apple.com/?address=${lat},${lng}`;
}

export function getGoogleUrl(latlng) {
  return `https://www.google.com/maps/place/${encodeURIComponent(
    latLngToDMS(latlng)
  )}`;
}

export function getDuckDuckGoUrl(latlng) {
  return `https://duckduckgo.com/?q=${encodeURIComponent(
    latLngToDMS(latlng)
  )}&iaxm=maps`;
}
