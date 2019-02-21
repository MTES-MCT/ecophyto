$(document).ready(function() {
  function toDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  }

  $('.overlay').visibility({
	type: 'fixed',
	offset: 80
  });

  function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${day}/${month}/${year}`;
  }
  //var arr = $.map(mydata, function(o) {
  //  return toDate(o['DATEMAJ']);
  //});
  //var datemax = new Date(Math.max.apply(this, arr));
  //$('#mydata_maxdatemaj').text(formattedDate(datemax));
  
  var filteringData = {
    'APPEL': [],
    'ETAT': []
  }
  filteringDataKeys = Object.keys(filteringData);
  $.each(mydata, function(key, data) {
    $.each(filteringDataKeys, function(item, key) {
      filteringData[key].push(data[key]);
      //filteringData[key].sort();
    })
  })
  $.each(filteringData, function(key, data) {
    filteringData[key] = filteringData[key].filter(function(itm, i, a) {
      return i == a.indexOf(itm);
    });
    filteringData[key].sort();
  })
  template = $('#template').html();
  Mustache.parse(template); // optional, speeds up future uses
  var rendered = Mustache.render(template, filteringData);
  $('#target').html(rendered);
  initSliders();
  
  var FJS = FilterJS.auto(mydata)
  
  FJS.addCallback('afterFilter', function(result) {
    $('#mydata_count').text(result.length);
  });
  FJS.addCriteria({ field: 'APPEL', ele: '#appel_criteria input:checkbox' });
  FJS.addCriteria({ field: 'ETAT',  ele: '#etat_criteria input:checkbox' });

  FJS.filter();
  //console.log(filteringData);
  window.FJS = FJS;
});

function initSliders() {
  $('#etat_criteria :checkbox').prop('checked', true);
  $('#etat_all').on('click', function(){
    $('#etat_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
  $('#appel_criteria :checkbox').prop('checked', true);
  $('#appel_all').on('click', function(){
    $('#appel_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}

function linkify(inputText) {
  //URLs starting with http://, https://, or ftp://
  var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank"><i class="external icon"></i></a>');
  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank"><i class="external icon"></i></a>');
  //Change email addresses to mailto:: links.
  var replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
  replacedText = replacedText.replace(new RegExp('\r?\n', 'g'), '<br />');
  return replacedText;
}

function toEuro(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' ,  minimumFractionDigits: 0 }).format(value);
}
  
function qualcolor(val) {
  switch (true) {
    case (val < 40):
      return "grey";
      break;
    case (val < 60):
      return "yellow";
      break;
    case (val < 80):
      return "olive";
      break;
    default:
      return "green";
      break;
  }
}
