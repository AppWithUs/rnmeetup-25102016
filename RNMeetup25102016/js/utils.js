import querystring from 'querystring';

export function buildGETUrl (endpoint, params) {
  if (!params) {
    return endpoint;
  }

  let queryString = querystring.stringify(params);

  return endpoint + '?' + queryString;
}
