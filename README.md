# Earthquake Visualization Project

## Overview

The United States Geological Survey (USGS) is a scientific agency of the U.S. government. The USGS is dedicated to providing reliable scientific information to describe and understand the Earth, minimize loss of life and property from natural disasters, manage water, biological, energy, and mineral resources, and enhance and protect our quality of life.

This project aims to visualize earthquake data provided by the USGS to educate the public and other government organizations about the impacts of earthquakes worldwide. By developing a set of tools for visualizing this data, we hope to highlight the importance of earthquake research and the need for funding.

## Data Source

The USGS provides earthquake data updated every 5 minutes in various formats, including GeoJSON, through their [GeoJSON Feed page](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). For this project, we have chosen to visualize "All Earthquakes from the Past 7 Days" dataset. This data includes detailed information about each earthquake's magnitude, location (longitude and latitude), and time.

## Visualization Details

- **Framework Used:** Leaflet.js
- **Data Visualization:** The visualization plots all earthquakes from the selected dataset on a map based on their longitude and latitude.
- **Marker Customization:** The size and color of the markers represent the earthquake's magnitude. Higher magnitudes are shown with larger and darker markers.
- **Interactive Features:** Popups are implemented to show additional information about the earthquake when a marker is clicked.
- **Legend:** A legend is included to provide context for the map data, explaining the correlation between the marker's size and color with the earthquake's magnitude.
