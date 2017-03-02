
var map = L.map('map',
               {boxZoom: true}).setView([42.028365, -93.649307], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var marker1 = L.marker([42.013700, -93.635787]).addTo(map);

marker1.bindPopup($('<a href="#" class="speciallink">Cheer up!</a>').click(function() {
    alert("Go Cyclones!!");
	//Add code here to complete when the hyperlink is pressed.
})[0]);


var marker1 = L.marker([42.028523, -93.642414], {
  title: "Built: 1952"
}).addTo(map);

//

var marker1 = L.marker([42.025413, -93.646063], {
  win_url: "https://en.wikipedia.org/wiki/Campanile_(Iowa_State_University)"
}).addTo(map).on('click', onClick);

function onClick(x) {
  console.log(this.options.win_url);
  window.open(this.options.win_url);
}

$(document).ready(function(){
  $('#GC').click(function(){
    loc = new L.LatLng(36.190697, -112.195703);
    map.setView(loc,10);
    var marker2 = L.marker([36.058929, -112.109195]).addTo(map)
  })
})

