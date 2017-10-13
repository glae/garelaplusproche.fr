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
  t.is(foundStations.length, 15);

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

test('______________________________________________ when I type "Pe"', t => {

  t.deepEqual(labelsFromInput(  'Pe'),
                              [ 'Saint-Pé-de-Bigorre (65)',
                                'Saint-Pée-sur-Nivelle (64)',
                                'Saint-Pé-de-Léren (64)',
                                'Saint-Pé-d\'Ardet (31)',
                                'Notre-Dame-du-Pé (72)' ]);

});


test('______________________________________________ when I type "R"', t => {

  t.deepEqual(labelsFromInput(  'R'),
                              [ 'Rue (80)',
                            'Vatteville-la-Rue (76)',
                            'La Rue-Saint-Pierre (76)',
                            'Les Rues-des-Vignes (59)',
                            'Saulon-la-Rue (21)' ]);

});


test('______________________________________________ when I type "Saint-au"', t => {

  t.deepEqual(labelsFromInput(  'Saint-au'),
                                [ 'Saint-Augustin (62)',
                              'Saint-Aubin (02)',
                              'Saint-Aubert (59)',
                              'Saint-Aubin (62)' ]);

});


test('______________________________________________ when I type "Tours"', t => {

  t.deepEqual(labelsFromInput(  'Tours'),
                                [ 'Tours (37)', 'Tours-en-Savoie (73)', 'Tours-sur-Marne (51)' ]);

});


test('______________________________________________ when I type "Vair"', t => {

  t.deepEqual(labelsFromInput(  'Vair'),
                              [ 'Vaires-sur-Marne (77)',
                            'Vairé (85)',
                            'Vaire (25)',
                            'Vair-sur-Loire (44)',
                            'Vaire-sous-Corbie (80)' ]);

});


test('______________________________________________ when I type "Mons"', t => {

  t.deepEqual(labelsFromInput(  'Mons'),
                              [ 'Mons (83)', 'Mons (30)', 'Mons (16)', 'Mons (31)', 'Mons (34)' ]);

});



function labelsFromInput(word){
  return proposalsFrom(userInput(word)).map(n=>n.label);

}

function userInput(word){
  return JSON.parse(fs.readFileSync('tests/adresse.data.gouv.fr_api_samples/' + word + '.json').toString());
}
