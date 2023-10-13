#!/bin/bash

some_useful_commands_to_minimize_stations_file(){

#only finds station name and GPS coordinates
#from https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs/
jq ".[] | .fields.intitule_gare, .fields.wgs_84" < referentiel-gares-voyageurs.json |\
sed -e 's/\]/\]\},\{/g' -e 's/\[/:\[/g' > stations.json

# clean the rest by hand (header, wrong train stations, footer)

# to validate
jq < stations.json

# to compress
jq -c < stations.json

}
