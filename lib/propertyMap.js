const UAE_LOCATION_COORDS = [
  { match: /arabian\s*ranches/i, lat: 25.0526, lng: 55.2661 },
  { match: /business\s*bay/i, lat: 25.1852, lng: 55.2634 },
  { match: /downtown/i, lat: 25.1972, lng: 55.2744 },
  { match: /dubai\s*marina/i, lat: 25.0805, lng: 55.139 },
  { match: /palm\s*jumeirah/i, lat: 25.1124, lng: 55.139 },
  { match: /jumeirah\s*village|jvc/i, lat: 25.0602, lng: 55.209 },
  { match: /jlt|jumeirah\s*lake/i, lat: 25.0693, lng: 55.1417 },
  { match: /dubai\s*hills/i, lat: 25.1085, lng: 55.2456 },
  { match: /ajman/i, lat: 25.4052, lng: 55.5136 },
  { match: /abu\s*dhabi/i, lat: 24.4539, lng: 54.3773 },
  { match: /sharjah/i, lat: 25.3463, lng: 55.4209 },
  { match: /dubai/i, lat: 25.2048, lng: 55.2708 },
];

export function coordsFromLocation(location = "") {
  const text = String(location || "").trim();
  if (!text) return null;
  const hit = UAE_LOCATION_COORDS.find((item) => item.match.test(text));
  return hit ? { lat: hit.lat, lng: hit.lng } : null;
}

export function resolveMapCoords({ lat, lng, location, label } = {}) {
  const parsedLat = Number(lat);
  const parsedLng = Number(lng);
  if (Number.isFinite(parsedLat) && Number.isFinite(parsedLng)) {
    return { lat: parsedLat, lng: parsedLng };
  }
  return coordsFromLocation(label || location);
}

export function buildMapEmbedSrc({ lat, lng, label, location, zoom = 14 } = {}) {
  const coords = resolveMapCoords({ lat, lng, location, label });
  if (coords) {
    return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=${zoom}&output=embed`;
  }

  const query = encodeURIComponent(
    String(label || location || "Dubai, United Arab Emirates").trim(),
  );
  return `https://maps.google.com/maps?q=${query}&z=${zoom}&output=embed`;
}
