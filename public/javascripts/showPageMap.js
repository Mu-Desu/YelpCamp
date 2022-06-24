mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({ //? put the map
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker() //? put a marker
    .setLngLat(campground.geometry.coordinates)
    .setPopup(//? this sets a popup with name on the pointer
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)