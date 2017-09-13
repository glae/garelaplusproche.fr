const {stations, findNearestStations} = require('./main.js');
import test from 'ava';


test('we should have 3002 stations', t => {

  t.is(stations.length, 3002);

});

test('Anetz should have nearest stations', t => {

  var sta = findNearestStations(stations, 47.383333, -1.100000);
	t.is(Object.keys(sta[0])[0], "Oudon");
  t.is(Object.keys(sta[1])[0], "Varades - Saint-Florent-le-Vieil");

});

test('Saint-Aubin-de-Luigné should have nearest stations', t => {

  var sta = findNearestStations(stations, 47.340512, -0.675747);
  t.is(sta.length, 6);

});


test.todo('Sort nearestStations from near to far');
