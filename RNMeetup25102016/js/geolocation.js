
const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
const circumference = (40075 / 360) * 1000;

function getLocation (success, error) {
  navigator
  .geolocation
  .getCurrentPosition(
    (position) => {
      return success(regionFrom(position.coords));
    },
    console.log,
    {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000
    }
  );
}

function regionFrom (coords) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  const accuracy = coords.accuracy;

  const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
  const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

  const minLatDelta = 0.3;
  const minLonDelta = 0.3;

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: Math.max(0, latDelta, minLatDelta),
    longitudeDelta: Math.max(0, lonDelta, minLonDelta)
  };
}

function getRadiusFromRegion (region) {

  const radiusLat = -1 * region.latitudeDelta * Math.cos(region.latitude) * circumference;
  const radiusLon = -1 * region.longitudeDelta * Math.cos(region.longitude) * circumference;

  return Math.max(radiusLat, radiusLon) / 1609;
}

function getRegionForCoordinates (points) {
  // points should be an array of { latitude : X, longitude : Y }
  let minX, maxX, minY, maxY;

  if (!points || points.length === 0) {
    throw "No points found";
  }

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX + 0.01,
    longitudeDelta: deltaY + 0.01
  };
}

export default {
  getLocation,
  getRegionForCoordinates,
  getRadiusFromRegion,
  regionFrom,
};

