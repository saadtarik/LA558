console.clear();
var OSM_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});
var map = L.map('map').setView([42.06, -91.20], 6);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); //[44.39, -84.11]

var baseMaps = {
	"ESRI StreetMap": Esri_WorldStreetMap,
	"OpenStreetMap (B&W)": OSM_bw,
};
map.doubleClickZoom.enable();
//myURL = 'http://public-iowadot.opendata.arcgis.com/datasets/64963f5081604065baae82329312832a_8.geojson';
//IA_DOT_County_Traffic_Crash_Statistics_SICL.geojson
//myURL = "https://saadtarik.github.io/LA558/Data/IA_DOT_County_Traffic_Crash_POINT.geojson";
myURL = "https://saadtarik.github.io/LA558/Data/IA_County_CrashData_20112013.geojson";
// control that shows state info on hover
var info = L.control();
info.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};
info.update = function(props) {
	this._div.innerHTML = '<h3>Total Crashes</h3>' + (props ? '<b>' + feature.properties.NAME + '</b><br />' + feature.properties.ALLCRASH13 + ' people / mi<sup>2</sup>' : 'Hover over a county');
};
//info.addTo(map);
var geojsonMarkerOptions = {
	color: "#000",
	weight: 0,
	opacity: 0,
	fillOpacity: 0.5
};

function getColorCrashes(d) {
	return d <= '100' ? 'blue' : d <= '300' ? 'green' : d <= '700' ? 'lightgreen' : d <= '1500' ? 'yellow' : d <= '2500' ? 'orange' : 'red'
		//  "#FFFFFF"; //white
}

function getColorPropDmg(d) {
	return d <= '200000' ? 'blue' : d <= '800000' ? 'green' : d <= '1300000' ? 'lightgreen' : d <= '2000000' ? 'yellow' : d <= '3000000' ? 'orange' : 'red'
		//  "#FFFFFF"; //white
}

function styleCrashes13(feature) {
	return {
		fillColor: getColorCrashes(feature.properties.ALLCRASH13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

function styleCrashes12(feature) {
	return {
		fillColor: getColorCrashes(feature.properties.ALLCRASH12),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

function styleCrashes11(feature) {
	return {
		fillColor: getColorCrashes(feature.properties.ALLCRASH11),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

function stylePropDmg13(feature) {
	return {
		fillColor: getColorPropDmg(feature.properties.TPROPDMG13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

function stylePropDmg12(feature) {
	return {
		fillColor: getColorPropDmg(feature.properties.TPROPDMG12),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

function stylePropDmg11(feature) {
	return {
		fillColor: getColorPropDmg(feature.properties.TPROPDMG11),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

var allCrash13 = new L.GeoJSON.AJAX(myURL, {
	style: styleCrashes13,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.ALLCRASH13 + "<br>";
		text3 = "Fatality: " + feature.properties.TFATALITY1 + "<br>";
		text = text1 + text2 + text3;
		layer.bindTooltip(text);
	}
})
var allCrash12 = new L.GeoJSON.AJAX(myURL, {
	style: styleCrashes12,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.ALLCRASH12 + "<br>";
		text3 = "Fatality: " + feature.properties.TFATALIT_1 + "<br>";
		text = text1 + text2 + text3;
		layer.bindTooltip(text);
	}
})
var allCrash11 = new L.GeoJSON.AJAX(myURL, {
	style: styleCrashes11,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.ALLCRASH11 + "<br>";
		text3 = "Fatality: " + feature.properties.TFATALITY1 + "<br>";
		text = text1 + text2 + text3;
		layer.bindTooltip(text);
	}
})
var legendCrash = L.control({
	position: 'bottomright'
});
legendCrash.onAdd = function(map) {
	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 100, 300, 700, 1500, 2500],
		labels = [],
		from, to;
	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];
		labels.push('<i style="background:' + getColorCrashes(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
	}
	div.innerHTML = labels.join('<br>');
	return div;
};

var allPropDmg13 = new L.GeoJSON.AJAX(myURL, {
	style: stylePropDmg13,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Damage (USD): " + feature.properties.TPROPDMG13 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})
var allPropDmg12 = new L.GeoJSON.AJAX(myURL, {
	style: stylePropDmg12,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Damage (USD): " + feature.properties.TPROPDMG12 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})
var allPropDmg11 = new L.GeoJSON.AJAX(myURL, {
	style: stylePropDmg11,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Damage (USD): " + feature.properties.TPROPDMG11 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})
var legendPropDmg = L.control({
	position: 'bottomright'
});
legendPropDmg.onAdd = function(map) {
	var div = L.DomUtil.create('div', 'info legend'),
		grades2 = [0, 200000, 800000, 1300000, 2000000, 3000000],
		labels2 = [],
		from, to;
	for (var i = 0; i < grades2.length; i++) {
		from = grades2[i];
		to = grades2[i + 1];
		labels2.push('<i style="background:' + getColorPropDmg(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
	}
	div.innerHTML = labels2.join('<br>');
	return div;
};

$("#y13cr").click(function() {
	map.addLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
	map.removeLayer(allPropDmg13);  
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
  map.addControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.removeControl(legendCrashType);
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});
$("#y12cr").click(function() {
	map.addLayer(allCrash12);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash11);
	map.removeLayer(allPropDmg13);  
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
  map.addControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.removeControl(legendCrashType);
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});
$("#y11cr").click(function() {
	map.addLayer(allCrash11);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash13);
	map.removeLayer(allPropDmg13);  
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
  map.addControl(legendCrash);
  map.removeControl(legendPropDmg); 
  map.removeControl(legendCrashType);
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});
$("#clrcr").click(function() {
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
	map.removeLayer(allPropDmg13);  
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg); 
  map.removeControl(legendCrashType);
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});

$("#y13pd").click(function() {
	map.addLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.addControl(legendPropDmg);  
  map.removeControl(legendCrash);
  map.removeControl(legendCrashType); 
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});
$("#y12pd").click(function() {
	map.addLayer(allPropDmg12);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);  
  map.addControl(legendPropDmg);  
  map.removeControl(legendCrash);
  map.removeControl(legendCrashType);
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});
$("#y11pd").click(function() {
	map.addLayer(allPropDmg11);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.addControl(legendPropDmg);  
  map.removeControl(legendCrash);
  map.removeControl(legendCrashType);
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);   
});
$("#clrpd").click(function() {
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.removeControl(legendCrashType);   
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);  
});

// map2
function getColorCrashType(d) {
	return d <= '4' ? 'blue' : d <= '9' ? 'green' : d <= '13' ? 'lightgreen' : d <= '18' ? 'yellow' : d <= '24' ? 'orange' : 'red'
		//  "#FFFFFF"; //white
}

function styleALCDRUGCR(feature) {
	return {
		fillColor: getColorCrashType(feature.properties.ALCDRUGCR1),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}
function styleNBUSCR(feature) {
	return {
		fillColor: getColorCrashType(feature.properties.NBUSCR13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}
function styleSBUSCR(feature) {
	return {
		fillColor: getColorCrashType(feature.properties.SBUSCR13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}
function stylePEDCR(feature) {
	return {
		fillColor: getColorCrashType(feature.properties.PEDCR13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}
function styleTRKCR(feature) {
	return {
		fillColor: getColorCrashType(feature.properties.TRKCR13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}
function styleMOTOCR(feature) {
	return {
		fillColor: getColorCrashType(feature.properties.MOTOCR13),
		weight: 2,
		opacity: 1,
		color: 'black',
		fillOpacity: 0.6
	};
}

var allALCDRUGCR13 = new L.GeoJSON.AJAX(myURL, {
	style: styleALCDRUGCR,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.ALCDRUGCR1 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})

var allNBUSCR13 = new L.GeoJSON.AJAX(myURL, {
	style: styleNBUSCR,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.NBUSCR13 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})

var allSBUSCR13 = new L.GeoJSON.AJAX(myURL, {
	style: styleSBUSCR,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.SBUSCR13 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})

var allPEDCR13 = new L.GeoJSON.AJAX(myURL, {
	style: stylePEDCR,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.PEDCR13 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})

var allTRKCR13 = new L.GeoJSON.AJAX(myURL, {
	style: styleTRKCR,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.TRKCR13 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})

var allMOTOCR13 = new L.GeoJSON.AJAX(myURL, {
	style: styleMOTOCR,
	onEachFeature: function(feature, layer) {
		text1 = "<strong> " + feature.properties.NAME + "</strong><br>";
		text2 = "Total Crashes: " + feature.properties.MOTOCR13 + "<br>";
		text = text1 + text2;
		layer.bindTooltip(text);
	}
})

var legendCrashType = L.control({
	position: 'bottomright'
});

legendCrashType.onAdd = function(map2) {
	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 4, 9, 13, 18, 24],
		labels = [],
		from, to;
	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];
		labels.push('<i style="background:' + getColorCrashType(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
	}
	div.innerHTML = labels.join('<br>');
	return div;
};

$("#alcdrug").click(function() {
	map.addLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);    
});
$("#nbus").click(function() {
	map.removeLayer(allALCDRUGCR13);
	map.addLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);   
});
$("#sbus").click(function() {
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.addLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);   
});
$("#ped").click(function() {
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.addLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);   
});
$("#trk").click(function() {
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.addLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);   
});
$("#moto").click(function() {
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.addLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);   
});

$("#clrcrtype").click(function() {
	map.removeLayer(allALCDRUGCR13);
	map.removeLayer(allNBUSCR13);
	map.removeLayer(allSBUSCR13);
	map.removeLayer(allPEDCR13);
	map.removeLayer(allTRKCR13);
	map.removeLayer(allMOTOCR13);
	map.removeLayer(allPropDmg13);
	map.removeLayer(allPropDmg12);
	map.removeLayer(allPropDmg11);
	map.removeLayer(allCrash13);
	map.removeLayer(allCrash12);
	map.removeLayer(allCrash11);
  map.removeControl(legendCrash);
  map.removeControl(legendPropDmg);
  map.addControl(legendCrashType);   
});

L.control.layers(baseMaps).addTo(map);