import { buildGETUrl } from './utils';
import geolocation from './geolocation';

const endpoint = 'https://api.meetup.com/2/open_events';

function findMeetups (region, page = 20, done) {

  let params = {
    lat: region.latitude,
    lon: region.longitude,
    format: 'json',
    topic: 'javascript',
    page: page,
    radius: geolocation.getRadiusFromRegion(region),
    'photo-host': 'secure',
    sign: true,
    key: '53983a4475365b5b1366476f3b4368',
  };

  let url = buildGETUrl(endpoint, params);

  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    let filtered = responseJson.results.filter(m => !!m.venue);

    return done(null, filtered);
  })
  .catch(done);
}

export default {
  findMeetups,
};