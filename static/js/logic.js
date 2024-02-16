// Define global variables
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  function radiusSize(magnitude) {
    return magnitude * 5;
  }

  function colorDepth(depth) {
    if (depth > 90) return '#ff0000';
    else if (depth > 70) return '#ff8c00';
    else if (depth > 50) return '#ffd700';
    else if (depth > 30) return '#9acd32';
    else return '#00ff00';
  }

  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: radiusSize(feature.properties.mag),
        fillColor: colorDepth(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let baseMaps = {
    "Street Map": street,
  };

  let overlayMaps = {
    Earthquakes: earthquakes
  };

  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a legend to display information about our map
  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        depths = [-10, 10, 30, 50, 70, 90],
        labels = [];

    // loop through our depth intervals and generate a label with a colored square for each interval
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
          '<i style="background:' + colorDepth(depths[i] + 1) + '"></i> ' +
          depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
}

// Color function to be used by the legend
function colorDepth(depth) {
  if (depth > 90) return '#ff0000';
  else if (depth > 70) return '#ff8c00';
  else if (depth > 50) return '#ffd700';
  else if (depth > 30) return '#9acd32';
  else return '#00ff00';
}
