var google;

function init() {
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

    var mapOptions = {
        zoom: 7,
        center: myLatlng,
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    { "visibility": "simplified" },
                    { "hue": "#ff0000" }
                ]
            }
        ]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    const addresses = ['New York'];
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

    for (var x = 0; x < addresses.length; x++) {
        (function(address) {
            $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`, null, function (data) {
                if (data.status === "OK") {
                    var p = data.results[0].geometry.location;
                    var latlng = new google.maps.LatLng(p.lat, p.lng);
                    new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: 'images/loc.png'
                    });
                } else {
                    console.error('Geocoding failed: ' + data.status);
                }
            });
        })(addresses[x]);
    }
}

google.maps.event.addDomListener(window, 'load', init);
