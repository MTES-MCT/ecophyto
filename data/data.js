//var myurljson = "https://mtes-mct.github.io/dataroom/data/data.json" ;
var myurljson = "data/bdphyto.json" ;

var mydata = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': myurljson,
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();
