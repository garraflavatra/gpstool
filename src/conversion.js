export function latLngToDecimal({ lat, lng }) {
  const precision = 5;
  return `${lat.toFixed(precision)}; ${lng.toFixed(precision)}`;
}

// DMS = degrees, minutes, seconds
function decimalToDMS(coord) {
  const negative = coord < 0;
  coord = Math.abs(coord);

  const degrees = Math.trunc(coord);
  let minutes = (coord - degrees) * 60;
  const seconds = Math.trunc((minutes - Math.trunc(minutes)) * 60);
  minutes = Math.trunc(minutes);

  return { degrees, minutes, seconds, negative };
}

export function latLngToDMS({ lat, lng }) {
  lat = decimalToDMS(lat);
  lng = decimalToDMS(lng);
  const latRef = lat.negative ? 'S' : 'N';
  const lngRef = lng.negative ? 'W' : 'E';

  return `${lat.degrees}°${lat.minutes}'${lat.seconds}"${latRef} ` +
    `${lng.degrees}°${lng.minutes}'${lng.seconds}"${lngRef}`;
}

export function latLngToExif({ lat, lng }) {
  lat = decimalToDMS(lat);
  lng = decimalToDMS(lng);
  const latRef = lat.negative ? 'S' : 'N';
  const lngRef = lng.negative ? 'W' : 'E';

  return `${lat.degrees},${lat.minutes}.${lat.seconds}${latRef} ` +
    `${lng.degrees},${lng.minutes}.${lng.seconds}${lngRef}`;
}
