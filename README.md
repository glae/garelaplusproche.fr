# Gare la plus proche

Find the nearest train station from the train network in France (SNCF).

Available on: http://www.garelaplusproche.fr

Thanks to [laurencebeillaux](https://github.com/laurencebeillaux) who created all the website UI/UX.

## Run 

```
npm install 
npm start
```
Note : tested with Node 16.x. 

## Tests 

```
npm test
```

## Contributing 

Feel free to create an [issue](https://github.com/glae/garelaplusproche.fr/issues) for bug or enhancement.

## Data sources

There are two inputs: 

- train stations list: https://ressources.data.sncf.com/explore/dataset/referentiel-gares-voyageurs/ (minimized in [source code](https://github.com/glae/garelaplusproche.fr/blob/master/main.js#L1) with some [`jq` commands](https://github.com/glae/lagarelaplusproche.fr/blob/master/some_useful_commands_to_minimize_stations_file.sh))
- addresses/cities search API: https://adresse.data.gouv.fr/api

Two outputs: 

- map: http://leafletjs.com/ (and [OpenStreetMap](http://openstreetmap.org))
- to buy tickets: http://trainline.fr ("URL-friendly" alternative to https://www.sncf-connect.com/) 

## Motivations

I was in vacation in the french coutryside on 10/09/2017. I had to drive a friend to the nearest train station, I fought on the web several minutes to get the right information. 

I wish it could have been easier. That's why I created this simple website.

If you can read french you can get a longer explanation [here](README-motivations-fr.md).
