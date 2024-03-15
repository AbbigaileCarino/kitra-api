// Haversine formula function
function haversineDistance(lat1, lon1, lat2, lon2, isKm = true) {
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  const R = isKm ? 6371 : 3959; // Radius of the Earth in km or miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

module.exports = haversineDistance;
