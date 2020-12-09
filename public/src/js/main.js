mapboxgl.accessToken = 'pk.eyJ1Ijoid2l0eXZpcyIsImEiOiJjajl4MGo0OWowczk4MnFtZHVob3I0MTdnIn0.KHhjbfQIuxBcoOsukPTldQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [0, 0],
    maxBounds: [[-180, -85], [180, 85]],
    zoom: 1
});

var url = '/findiss';

map.on('load', function () {

    window.setInterval(function () {
        fetch(url).then(function (response) {
            return response.json();
        })
            .then(function (json) {
                var data = json,
                    issLastSeen = data.features[0].geometry.coordinates,
                    resultingDOM = "",
                    resultingText = "";

                document.getElementById('detailsEntity').setAttribute("text", "value: " + resultingText);

                map.getSource('iss').setData(data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, 2000);

    map.addSource('iss', { type: 'geojson', data: url });
    map.addLayer({
        "id": "iss",
        "type": "symbol",
        "source": "iss",
        "layout": {
            "icon-image": "rocket-15"
        }
    });

    map.addControl(new mapboxgl.FullscreenControl());

});