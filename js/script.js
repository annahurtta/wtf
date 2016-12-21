var app = {
  getData: function(){
    $.ajax({
      url: 'data/plain_data.json',
      dataType: 'json',
      success: function (data) {
        app.searchData(data);
      }
    });
  },
  searchData: function(data) {
    //nimellä
    app.availableTags = [];
    $.each(data, function (key, value) {
      app.availableTags.push(key);
    });
  
    $("#titles").autocomplete({
      source: app.availableTags,
      minLength: 3
    });
    $('#search_btn').click(function (){
      if($('.titles').val() === ''){
        $('.result_container').html('<p>Kirjoita ensin nimi</p>');
      }else{
        app.selectedName = $('.titles').val();
        app.printNameInfo(data);
        return app.selectedName;
      }
    });
    
    //vuodella
    $('#search_btn3').click(function (){
      app.selectedYear = $('.selectpicker_year').val();
      app.printYearInfo(data);
    });
    
    //kategorialla (selectpicker ei toimi)
    $('#search_btn2').click(function (){
      app.selectedCategory = $('.selectpicker_category').val();
      app.printCategoryInfo(data);
      return app.selectedCategory;         
    });
  },
  //Nimen perusteella tulostus
  printNameInfo: function(data){
    var resultContainer = $('.result_container').empty();
    var pickedMovie = app.selectedName;
    console.log(pickedMovie)
    $.each(data, function (key, value) {
      if(pickedMovie === key){
        $('<div class="col-sm-6 col-sm-offset-3"><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '</div><img src="' + value.img_src + '" alt="Movie pic"/><div>').appendTo(resultContainer);
      }
    });
    if( $('.result_container').is(':empty') ) {
    //console.log("Ei löydy");
    $('<div><p>Kirjoittamaasi: ' + pickedMovie + ' ei löydy!</p></div>').appendTo(resultContainer);
      }
  },
  //Kategorian perusteella tulostus
  printCategoryInfo: function(data){
    var resultContainer = $('.result_container').empty();
    $.each(app.selectedCategory, function(i,el){
      app.pickedCategory = el;
      console.log(app.pickedCategory)
      $.each(data, function (key, value) {
        $.each(value.categories, function(i, el){
          if(app.pickedCategory === el){
            $('<div class="col-sm-6 col-sm-offset-3"><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '<img src="' + value.img_src + '" alt="Movie pic"/></div>').appendTo(resultContainer);
          }
        });  
      });
    })
  },
  //Tulostus vuoden perusteella
   printYearInfo: function(data){
    var resultContainer = $('.result_container').empty();
    $.each(app.selectedYear, function(i,el){
      app.year = el;
      $.each(data, function (key, value) {
      if(app.year === value.year){
          $('<div class="col-sm-6 col-sm-offset-3"><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '<img src="' + value.img_src + '" alt="Movie pic"/></div>').appendTo(resultContainer);
        }else{
          $('<div><p>Vuodella ei löydy tuloksia</p></div>');
        }
      });
    });
  },
  init: function() {
    app.getData();
  }
}
$(document).ready(function () {
  app.init();
});