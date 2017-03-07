// Basemaps

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
  center: [54.129419, -2.287585],
  zoom: 5,
  layers: [Esri_NatGeoWorldMap, Esri_WorldStreetMap]
});

var polylines = L.polyline([
  [52.195169, 0.132828],
  [51.731094, -1.260656],
  [52.966828, -1.101651],
  [52.627829, 1.298177]
], {color: 'red'}).addTo(map);


var baseMaps = {
  "ESRI NatGeo": Esri_NatGeoWorldMap,
	"ESRI StreetMap": Esri_WorldStreetMap,
  "OpenStreetMap (B&W)": OSM_bw,
};


var clubs = new L.LayerGroup();

	L.marker([53.462922, -2.291303]).bindPopup('Manchester United').addTo(clubs),
  L.marker([53.430765,-2.961087]).bindPopup('Liverpool').addTo(clubs),
  L.marker([51.554675,-0.108438]).bindPopup('Arsenal').addTo(clubs),
  L.marker([51.481483,-0.190871]).bindPopup('Chelsea').addTo(clubs),
  L.marker([51.422145,-0.982745]).bindPopup('Reading').addTo(clubs), 
  L.marker([54.975359, -1.621560]).bindPopup('Newcastle United').addTo(clubs), 
	L.marker([53.483022, -2.200376]).bindPopup('Manchester City').addTo(clubs);

var overlays = {
  "EPL Clubs": clubs
}

L.control.layers(baseMaps, overlays).addTo(map);