//Base Layers
var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
  maxZoom: 16
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map('map', {
  center: [39.925097, -97.173305],
  zoom: 3.5,
  layers: [Esri_NatGeoWorldMap, Esri_WorldStreetMap, OSM_bw]
});

var baseMaps = {
  "ESRI NatGeo": Esri_NatGeoWorldMap,
  "ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};

//JSON
var GreatLakes = [{
  "name": "Lake Superior",
  "lat": "47.3030",
  "long": "-87.3958",
  "iconColor": "f26943",
  "popupText": "Lake Superior is the largest Great Lake containing 3 quadrillion gallons of water."
}, {
  "name": "Lake Michigan",
  "lat": "43.0894",
  "long": "-87.1310",
  "iconColor": "f2c043",
  "popupText": "Lake Michigan is the only Great Lake that is completely within the border of the United States."
}, {
  "name": "Lake Erie",
  "lat": "41.9960",
  "long": " -81.3407",
  "iconColor": "43f2bb",
  "popupText": "There is an alleged lake monster called Bessie that was reported to be sighted in Lake Erie."
}, {
  "name": "Lake Huron",
  "lat": "44.5369",
  "long": " -82.3896",
  "iconColor": "4395f2",
  "popupText": "Lake Huron is separated from Lake Michigan by the Strait of Mackinac, otherwise they would be considered to be one lake."
}, {
  "name": "Lake Ontario",
  "lat": "43.6449",
  "long": "-77.6130",
  "iconColor": "c943f2",
  "popupText": "A lake on Saturn's Titan is named (Ontario Lacus) after Lake Ontario."
}];

//Add JSON to map
var iconMarkerURL = "http://www.googlemapsmarkers.com/v1/";

for (var i = 0; i < GreatLakes.length; i++) {
  console.log(GreatLakes[i].name);
  var marker = L.marker([GreatLakes[i].lat, GreatLakes[i].long], {
    icon: L.icon({
      iconUrl: iconMarkerURL + GreatLakes[i].iconColor,
      iconSize: [10, 20],
      iconAnchor: [5, 20],
      popupAnchor: [0, -20]
    }),
    title: GreatLakes[i].name
  }).bindPopup("<b>" + GreatLakes[i].name + "</b>: " + GreatLakes[i].popupText).addTo(map);
}

//GeoJSON
var lakeIcon = L.icon({
  iconUrl: 'images/lake.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -18]
});

var parkIcon = L.icon({
  iconUrl: 'images/parks_icon.png',
  iconSize: [30, 27],
  iconAnchor: [15, 27],
  popupAnchor: [0, -14]
});

var markerYell = L.marker([-110.5389404296875, 44.63543682256858], {
  icon: parkIcon
}).bindPopup("Yellowstone National Park").addTo(map);

var markerYeso = L.marker([-119.51408386230469, 37.845037026243425], {
  icon: parkIcon
}).bindPopup("Yesomite National Park").addTo(map);

var markerShen = L.marker([-78.44444274902344, 38.47670698285465], {
  icon: parkIcon
}).bindPopup("Shenandoah National Park").addTo(map);

var markerRock = L.marker([-105.7159423828125, 40.35700974577561], {
  icon: parkIcon
}).bindPopup("Rocky Mountain National Park").addTo(map);

//function onEachFeature(feature, layer) {
//  layer.bindPopup(feature.properties.name);
//}

var myGeoJSON = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "marker-color": "#629b76",
      "marker-size": "large",
      "marker-symbol": "park",
      "name": "Yellowstone National Park"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-110.5389404296875, 44.63543682256858]
    }
  }, {
    "type": "Feature",
    "properties": {
      "marker-color": "#629b76",
      "marker-size": "large",
      "marker-symbol": "park",
      "name": "Yosemite National Park"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-119.51408386230469, 37.845037026243425]
    }
  }, {
    "type": "Feature",
    "properties": {
      "marker-color": "#629b76",
      "marker-size": "large",
      "marker-symbol": "park",
      "name": "Shenandoah National Park"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-78.44444274902344, 38.47670698285465]
    }
  }, {
    "type": "Feature",
    "properties": {
      "marker-color": "#629b76",
      "marker-size": "large",
      "marker-symbol": "park",
      "name": "Rocky Mountain National Map"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-105.7159423828125, 40.35700974577561]
    }
  }, {
    "type": "Feature",
    "properties": {
      "stroke": "#ff0000",
      "stroke-width": 3,
      "stroke-opacity": 1
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [-93.5650634765625, 42.01665183556825],
        [-93.5650634765625, 42.094146370922736],
        [-93.5540771484375, 42.13082130188811],
        [-93.570556640625, 42.16340342422401],
        [-93.5650634765625, 42.56521874494336],
        [-93.350830078125, 42.82360980730198],
        [-93.350830078125, 43.15710884095329],
        [-93.36181640625, 43.57243174740972],
        [-93.31787109374999, 43.64005063334696],
        [-93.3123779296875, 43.78299262890581],
        [-93.27941894531249, 43.862257524417934],
        [-93.251953125, 44.06390660801779],
        [-93.251953125, 44.209772586984485],
        [-93.3233642578125, 44.29240108529005],
        [-93.2904052734375, 44.42593442145313],
        [-93.2904052734375, 44.731125592643274],
        [-93.1475830078125, 44.89868701215517],
        [-93.240966796875, 44.98034238084973]
      ]
    }
  }]
}


// Define Style
var myStyle = {
  "color": "#aa6b70",
  "weight": 3,
};

//Add GeoJSON to map
L.geoJSON(myGeoJSON, {
  style: myStyle,
}).addTo(map);

//Layer groups
var popCities = new L.LayerGroup();

L.marker([40.687467, -73.949804]).bindPopup('New York').addTo(popCities),
  L.marker([33.978739, -118.229688]).bindPopup('Los Angeles').addTo(popCities),
  L.marker([41.855674, -87.668992]).bindPopup('Chicago').addTo(popCities);

var stateCap = new L.LayerGroup();

L.marker([41.605635, -93.602897]).bindPopup('<a href="https://www.dmgov.org/Pages/default.aspx"> Des Moines </a>').addTo(stateCap),
  L.marker([38.968103, -76.494300]).bindPopup('<a href="http://www.annapolis.gov/"> Annapolis </a>').addTo(stateCap);

//var DSM = L.marker([41.605635, -93.602897]).bindPopup('<a href="https://www.dmgov.org/Pages/default.aspx"> Des Moines </a>'),
//    Annapolis = L.marker([38.968103, -76.494300]).bindPopup('<a href="http://www.annapolis.gov/"> Annapolis </a>')

//var stateCap = L.LayerGroup([DSM, Annapolis]);

var landMarks = new L.LayerGroup();

L.marker([36.015930, -114.737136]).bindPopup('Hoover Dam').addTo(landMarks),
  L.marker([37.819042, -122.475395]).bindPopup('Golden Gate Bridge').addTo(landMarks);

var overlays = {
  "Most Populated Cities": popCities,
  "State Capitals": stateCap,
  "Landmarks": landMarks
}

L.control.layers(baseMaps, overlays).addTo(map);