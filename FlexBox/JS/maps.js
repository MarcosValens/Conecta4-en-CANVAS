var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('mapa'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    if (navigator.geolocation) {
        var arrayMarker1 = JSON.parse(localStorage.getItem('jugadores'));
        var arrayMarker = [];
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Jugadores del mundo'
            });

            var ls = JSON.parse(localStorage.getItem('jugadores')) || [];
            ls.push(pos)

            localStorage.setItem('jugadores',JSON.stringify(ls));


            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


}