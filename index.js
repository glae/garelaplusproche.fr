var map;
var lastProposedCities = [];
initSearchByCityInput();

function initSearchByCityInput() {
    const input = document.getElementById("station-search-container-by-city-input");
    input.placeholder = "Lieu";
    input.addEventListener("input", function (e) {
        function onAPIResultComplete(proposals) {
            const cities = document.getElementById('filtered-cities');
            cities.innerHTML = "";
            lastProposedCities = proposals;
            proposals.forEach(
                function (city) {
                    var option = document.createElement('option');
                    option.value = city.label;
                    cities.appendChild(option);
                });
        }
        document.getElementById("error-city").innerHTML = '';
        createProposals(input.value, onAPIResultComplete);
    });
}

function hideSearchFields() {
    document.getElementById("search-btn-container").className += 'active-button';
    document.getElementById("train-station").className += 'loader';
    document.getElementById("stations").className += "station-element";
    document.getElementById("station-search-container-by-city").className += 'active-button';
}

function searchByGeolocation() {
    hideSearchFields();
    var warning = document.createElement("p");
    warning.innerText = 'Si rien ne se passe, c\'est peut-être que vous n\'avez pas accepté la géolocalisation.';
    setTimeout(function () {
        document.getElementById("trainLoader-buttonSearch-container").appendChild(warning);
    }, 6000);
    var geoSuccess = function (p) {
        const userLat = p.coords.latitude;
        const userLong = p.coords.longitude;
        search(userLat, userLong);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
}

function searchByCity() {
    const cityInput = document.getElementById("station-search-container-by-city-input").value;
    const selectedCity = lastProposedCities.filter(u => u.label == cityInput.trim())[0];
    if (selectedCity == null) {
        searchByGeolocation();
    } else {
        hideSearchFields();
        search(selectedCity.lat, selectedCity.lon, selectedCity.label);
    }
}

function search(userLat, userLong, positionLabel = 'Votre position') {
    var mapContainerElement = document.getElementById('mapcontainer');
    mapContainerElement.innerHTML = "<div id='mapid'></div>";
    mapContainerElement.className += "map-container-element";
    map = L.map('mapid').setView([userLat, userLong], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    const foundStations = findNearestStations(stations, userLat, userLong);
    var trainIcon = new L.Icon({
        iconUrl: './img/tchou.png',
        iconSize: [40, 40]
    });
    var homeIcon = new L.Icon({
        iconUrl: './img/yourPosition.png',
        iconSize: [40, 51]
    });
    foundStations.forEach(function (e) {
        L.marker([latitude(e), longitude(e)], {
            icon: trainIcon
        }).addTo(map).bindPopup("<p style='font-size:150%'>" +
            "<a target='_blank' style='color: #D35400; text-decoration: none;' href='https://www.openstreetmap.org/?mlat=" + latitude(e) + "&mlon=" + longitude(e) + "'>" + stationName(e) + "</a>" +
            "<br><a href='https://www.trainline.fr/search/" + encodeURI(stationName(e).replace(/'/g, "%27")) + "/' target='_blank' style='color: #D35400; font-weight: 700; text-decoration: none;'>Partir avec trainline</a>" +
            "<br>" +
            "</p>"
        );
    });
    L.marker([userLat, userLong], {
        icon: homeIcon
    }).addTo(map).bindPopup('<p style="font-size:150%">' + positionLabel + '</p>');
    var showedStations;
    var others = ""
    if (foundStations.length >= 24) {
        showedStations = foundStations.slice(0, 23);
        others = "<li><b>et d'autres encore...<b></li>"
    } else {
        showedStations = foundStations;
    }
    document.getElementById('stations').innerHTML = '' +
        '<h2>Voici les gares trouvées :</h2><ul>' +
        showedStations.map(gare => '<li>' + stationName(gare) + '</li>').join('') +
        others + '</ul>';
    var mobileHeaderTitle = document.getElementById("header");
    mobileHeaderTitle.className += "mobile";
}
