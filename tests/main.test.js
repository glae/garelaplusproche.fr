const {stations, findNearestStations, proposalsFrom} = require('../main.js');
const fs = require('fs');
import test from 'ava';


test('we should have 3002 stations', t => {

  t.is(stations.length, 3002);

});


test('Anetz should have nearest stations', t => {

  const foundStations = findNearestStations(stations, 47.383333, -1.100000);
	t.is(Object.keys(foundStations[0])[0], "Mauves-sur-Loire");
  t.is(Object.keys(foundStations[1])[0], "Oudon");

});


test('Saint-Aubin-de-Luigné should have nearest stations', t => {

  const foundStations = findNearestStations(stations, 47.340512, -0.675747);
  t.is(foundStations.length, 10);

});


test('As I user, I should get no autocomplete address when I type "Unkown"', t => {

  const proposals = proposalsFrom(userInput('Unknown'));
  t.is(proposals.length, 0);

});


test('As I user, I should get autocomplete addresses when I type "Le Man"', t => {

  t.deepEqual(labelsFromInput(  'Le Man'),
                                ['Le Mans (72)', 'Le Manoir (27)', 'Le Manoir (14)', 'Boulazac Isle Manoire (24)']);

});

test('______________________________________________ when I type "Par"', t => {

  t.deepEqual(labelsFromInput(  'Par'),
                                [ 'Paris (75)',
                                  'Parthenay (79)',
                                  'Parignargues (30)',
                                  'Parpeville (02)',
                                  'Parey-Saint-Césaire (54)' ]);

});

test.todo('______________________________________________ when I type "Pe"');
test.todo('______________________________________________ when I type "R"');
test.todo('______________________________________________ when I type "Saint-au"');
test.todo('______________________________________________ when I type "Tours"');
test.todo('______________________________________________ when I type "vair"');
test.todo('______________________________________________ when I type "Mons"');




function labelsFromInput(word){
  return proposalsFrom(userInput(word)).map(n=>n.label);
}

function userInput(word){
  return JSON.parse(fs.readFileSync('tests/adresse.data.gouv.fr_api_samples/' + word + '.json').toString());
}
