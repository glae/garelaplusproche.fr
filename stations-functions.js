/* 
Finds the nearest train stations from GPS coords. Recursively called to find 15 stations max. 

This is a compromise between:
 - a JS limitation between 'findNearestStations' recursive iterations (possible error: Maximum call stack size exceeded):
   0.001 radius seems to be fine (most precise coords : [48.81550666129636,1.876934489891097])
 - precision/circle/result exhaustiveness (min. 15 results requirement seem to compensate the radius precision issue)

 Variable 'stations' is defined in 'stations.js' file (TODO refactor as modules/etc)
*/
function findNearestStations(lat, long, searchRadius = 0.001) {
  const minLat = lat - searchRadius;
  const maxLat = lat + searchRadius;
  const minLong = long - searchRadius;
  const maxLong = long + searchRadius;

  const nearestStations = stations.filter(function (s) {
    const lat = latitude(s);
    const long = longitude(s);
    if (lat >= minLat && lat <= maxLat && long >= minLong && long <= maxLong) {
      return true;
    } else {
      return false;
    }
  });

  if (nearestStations.length < 15) {
    return findNearestStations(lat, long, searchRadius + 0.001);
  } else {
    return nearestStations;
  }
}

function stationName(e) {
  return Object.keys(e)[0];
}

function latitude(e) {
  return Object.keys(e).map(k => e[k])[0][0];
}

function longitude(e) {
  return Object.keys(e).map(k => e[k])[0][1];
}

function createProposals(input, onAPIResultComplete) {
  const cleanInput = input.trim();
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (response) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        onAPIResultComplete(proposalsFrom(JSON.parse(request.responseText)));
      }
    }
  };
  if (cleanInput.length != 0) {
    request.open('GET', 'https://api-adresse.data.gouv.fr/search/?q=' + cleanInput + '&type=municipality', true);
    request.send();
  }
}

function proposalsFrom(jsonAddresses) {
  let uniqueAddresses = [];
  if (jsonAddresses.features == null) return uniqueAddresses;
  const addresses = jsonAddresses.features.map(function (address) {
    return {
      label: (address.properties.name + ' (' + address.properties.postcode.substring(0, 2) + ')'),
      lat: address.geometry.coordinates[1],
      lon: address.geometry.coordinates[0]
    }
  });
  addresses.forEach(function (a) {
    if (!uniqueAddresses.filter(u => u.label == a.label).length > 0) {
      uniqueAddresses.push(a);
    }
  });
  return uniqueAddresses;
}

if (typeof module !== 'undefined') { //for unit tests
  module.exports.stations = stations;
  module.exports.findNearestStations = findNearestStations;
  module.exports.proposalsFrom = proposalsFrom;
}
