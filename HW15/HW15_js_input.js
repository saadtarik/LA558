console.clear();

var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var map = L.map('map').setView([42.02, -93.61],9);L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); //[44.39, -84.11]

var baseMaps = {
  "ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};

map.doubleClickZoom.enable();
//myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
var bigStripe3 = new L.StripePattern({
	weight: 2,
	spaceWeight: 5,
	angle: 0,
	opacity: 1,
	spaceOpacity: 0.5,
});
bigStripe3.addTo(map);

var bigStripe2 = new L.StripePattern({
	weight: 2,
	spaceWeight: 5,
	angle: 45,
	opacity: 1,
	spaceOpacity: 0.5,
});
bigStripe2.addTo(map);

var bigStripe1 = new L.StripePattern({
	weight: 2,
	spaceWeight: 5,
	angle: 90,
	opacity: 1,
	spaceOpacity: 0.5,
});
bigStripe1.addTo(map);


var bigStripe0 = new L.StripePattern({
	opacity: 0.0,
});

bigStripe0.addTo(map);


function getPattern(d) {
	return d >= 6 ? bigStripe3:	
	d >= 4 ? bigStripe2:
	d >= 3 ? bigStripe1:
	bigStripe0;
}

function getColor(d) {
  return d >= 6 ? "darkred":
  d >= 5 ? "red":
  d >= 4 ? "orange":
  d >= 3 ? "yellow":
  "lightgreen";
}


function percentHatch(feature) {
	return{
		//fillColor: "Green",
		//fillPattern: bigStripe1,
		fillPattern: getPattern(feature.properties.value),
		weight: 1,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.50
	};
}


var zipCodes1 = L.geoJson(zips, {
	style: percentHatch,
    onEachFeature: function (feature, layer) {
    popUpText = "Zip Code: "+feature.properties.ZIP;
        return layer.bindPopup(popUpText, {
            closeButton: true
        });
    }
}).addTo(map);

var zipCodes2 = L.geoJson(zips, {
  onEachFeature: function(feature, layer) {
    layer.setStyle({
      weight: 2,
      color: "black",
      fillColor: getColor(feature.properties.value),
      fillOpacity: 0.3
    });
  }
}).addTo(map);

//font Awesome possible colors are as follows - no yellow?

//['red', 'blue', 'green', 'purple', 'orange', 'darkred', 'lightred', 'beige', 'darkblue', 'darkgreen', 'cadetblue', 'darkpurple', 'white', 'pink', 'lightblue', 'lightgreen', 'gray', 'black', 'lightgray']


var airportIcon = L.AwesomeMarkers.icon({
  prefix: 'fa', // font awesome
  markerColor: 'purple', 
  icon: 'fa-paper-plane-o',
  iconColor: 'white',
  spin: true
})

var lakeIcon = L.AwesomeMarkers.icon({
  prefix: 'ion', // ion icon
  markerColor: 'blue', 
  icon: 'ion-waterdrop',
  iconColor: 'grey'
})

var parkIcon = L.AwesomeMarkers.icon({
  prefix: 'fa', // font awesome
  markerColor: 'green', 
  icon: 'fa-tree',
  iconColor: 'yellow'
})

var promise = $.getJSON("https://saadtarik.github.io/Resources/Data/feautresStoryCounty.geojson");

promise.then(function(data) {

  //var allRecreation1 = L.geoJson(data);
	
  var airport = L.geoJson(data, {
    filter: function(feature, layer) {
      return feature.properties.Type == "Airport";
    },
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {
        icon: airportIcon
      }).on('mouseover', function() {
        this.bindPopup(feature.properties.Name).openPopup();
      });
    }
  });



  var park = L.geoJson(data, {
    filter: function(feature, layer) {
      return feature.properties.Type == "Park";
    },
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {
        icon: parkIcon
      }).on('mouseover', function() {
        this.bindPopup(feature.properties.Name).openPopup();
      });
    }
  });


  var lake = L.geoJson(data, {
    filter: function(feature, layer) {
      return feature.properties.Type == "Lake";
    },
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {
        icon: lakeIcon
      }).on('mouseover', function() {
        this.bindPopup(feature.properties.Name).openPopup();
      });
    }
  });




        var allFeatures = L.geoJson(data, {
            filter: function(feature, layer) {
                return feature.properties.Type != "zzzzzz";
            },
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                }).on('click', function() {
                    this.bindPopup(feature.properties.Name).openPopup();
                });
            }
        });



  map.fitBounds(allFeatures.getBounds(), {
    padding: [20,20]
  });
	
	
  //allFeatures.addTo(map);
  airport.addTo(map);
  park.addTo(map);
  lake.addTo(map);
//allRecreation1.addTo(map);

  $("#allFeatures").click(function() {
    //map.addLayer(allRecreation);
    map.addLayer(airport);
    map.addLayer(park);
    map.addLayer(lake);
    map.fitBounds(allFeatures.getBounds(), {
    padding: [10,10]
  });
  });
  $("#airport").click(function() {
    map.addLayer(airport);
    map.removeLayer(park);
    map.removeLayer(lake);
    map.fitBounds(airport.getBounds(), {
    padding: [10,10]
  });
  });

  $("#park").click(function() {
    map.removeLayer(airport);
    map.addLayer(park);
    map.removeLayer(lake);
    map.fitBounds(park.getBounds(), {
    padding: [10,10]
  });
  });

  $("#lake").click(function() {
    map.removeLayer(airport);
    map.removeLayer(park);
    map.addLayer(lake);
    map.fitBounds(lake.getBounds(), {
    padding: [10,10]
  });
  });
});





//L.geoJson(airports).addTo(map);

//function addPopups(feature, layer) {
//  layer.bindPopup("Name: " + feature.properties.FACILITY_N +
//    "<BR> City: " + feature.properties.CITY);
//}

//var geojsonMarkerOptions = {
//  radius: 5,
//  fillColor: "#ff7800",
//  color: "#000",
//  weight: 1,
//  opacity: 1,
//  fillOpacity: 0.8
//};


//var allAirports = L.geoJson(airports, {
// onEachFeature: addPopups,
//  filter: function(feature, layer) {
    //FACILITY_T == 'HELIPORT'
    //FACILITY_T == 'AIRPORT'
    //OWNER_TYPE == 'PU'
    //COUNTY":"LYON"
    //if (feature.properties.COUNTY == 'LYON') {	
//    if (feature.properties.FACILITY_T == 'AIRPORT') {
//      return true;
//    }
//  },
//  pointToLayer: function(feature, latlng) {
//    return L.circleMarker(latlng, geojsonMarkerOptions);
//  }
//}).addTo(map);