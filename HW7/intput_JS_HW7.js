//console.clear();

$(function() {

  var totalMaps = 6; //enter this manually

  //initially hide all maps
  for (i = 0; i < totalMaps; i++) {
    $("#map" + i).hide();
  }

  //show the base map
  $("#map0").show();

  //toggle basemap layers
  $('input:radio[name=basemap]').click(function() {
    base = $('input:radio[name=basemap]:checked').val();
    $("#map0, #map1, #map2").hide(); //combined selectors in one line
    $("#map" + base).show();
  });

  
  $(".mapLayer").change(function() {
    x = $(this).val();
    console.log("toggled map" + x);
    $("#map" + x).toggle();
  });

})
