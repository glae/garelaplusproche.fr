# Gare la plus proche

Find the nearest train station from the french train network (SNCF).

Available on: http://www.garelaplusproche.fr

## Datasource

There is one input: 
- train stations: https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs/ (minimized in [source](https://github.com/glae/lagarelaplusproche.fr/blob/c442d5b520141b34f14778d230ad2c2d90f8e702/main.js#L1) with some [jq commands](https://github.com/glae/lagarelaplusproche.fr/blob/master/some_useful_commands_to_minimize_stations_file.sh))

Two outputs: 
- map : http://leafletjs.com/ (and [OSM](openstreetmap.org))
- to buy tickets : http://trainline.fr 


## Motivations (in english)

I was in vacation in the french coutryside on 10/09/2017. I had to drive a friend to the nearest train station, I fought on the web several minutes to get the right information. 

I wish it could have been easier. 

That's why I created this simple website.


## Motivations (in french)

Nous sommes le 10 septembre 2017. 
Je dois déposer quelqu'un à la gare la plus proche de Saint Aubin de Luigné. 
Je cherche `gare la plus proche` sur le web. 

Je trouve peu d'informations : 
- des questions sur les forums SNCF
- le site http://www.sncf.com/fr/carte-points-de-vente qui ne référence pas toutes les gares de France (seulement les principales)
- Je finis tant bien que mal par trouver une gare proche (Chalonnes) via Google Maps.

Après davantage de recherche, je trouve enfin l'ensemble des gares sur :
- http://www.sncf.com/fr/geolocalisation (traffic temps réel)
- https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs/
- https://fr.wikipedia.org/wiki/Liste_de_gares_en_France

J'aurais aimé trouver la gare la plus proche de ma position en deux clics. 

Voilà la raison de ce simple site. 
