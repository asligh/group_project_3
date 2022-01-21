async function main() {

    // Creating the map object
    const myMap = L.map("map", {
      center: [30, 0],
      zoom: 2
    });
  
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 2,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Get the data 
    let home_url = "/billionaire";
    const home_response = await fetch(home_url);
    const data = await home_response.json();

    console.log(data[0])

  
    console.log(data[0].length)
    // Create a new marker cluster group.
    const markers = L.markerClusterGroup();

    // Loop through the data.
    for (let i = 0; i < data[0].length; i++) {

        // Set the data location property to a variable.
        let latitude = data[0][i].latitude;
        let longitude= data[0][i].longitude;

        // Check for the location property.
        if (latitude) {

        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([latitude, longitude])
            .bindPopup(data[0][i].display_name));
        }
    }

    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);

    // L.marker({lon: 0, lat: 0}).bindPopup('The center of the world').addTo(myMap);


}

main();