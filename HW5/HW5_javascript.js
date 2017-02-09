  function dispday(){
    var wkday = document.getElementsByName("day");
    var outday;
    for(var i = 0; i < wkday.length; i++){
      //console.log("Array Length: " + wkday.length + ", Day: " + wkday[i].value);
      if(wkday[i].checked){
        outday = wkday[i].value;
        //console.log(wkday[i].value);
        alert("You selected: " + outday)
      } 
    }
  }


function checkboxes(){
  var itemlist = document.getElementsByName("lang");
  var checkitems = [];
  var j = 0;
  for (var i = 0; i < itemlist.length; i++) {
    if (itemlist[i].checked){
      //console.log(itemlist[i].value)
      checkitems[j] = itemlist[i].value;
      j = j+1;
    }
  }
  //console.log(checkitems.length);
  //console.log(checkitems);
  alert("Selected languages: " + checkitems);
}

function textbox(){
  var text1 = document.getElementById("txt1").value;
  var text2 = document.getElementById("txt2").value;
  console.log(text1);
  alert("Your Text: " + text1 + " " + text2)
}