var app = {
  getData: function(){
    $.ajax({
      url: 'data/plain_data.json',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        app.searchData(data);
      }
    });
  },
  searchData: function(data) {
    app.availableTags = [];
    $.each(data, function (key, value) {
      app.availableTags.push(key);
    });
  
    $("#titles").autocomplete({
      source: app.availableTags,
      minLength: 3
    });

    //nimellä
    $('#search_btn').click(function (){
      console.log('moi')
        if($('.titles').val() === ''){
          $('.result_container').html('<p>Kirjoita ensin nimi</p>');
        }else{
          app.selectedName = $('.titles').val();
          app.printInfo(data);
          return app.selectedName;
          
        }
      });
    
  //vuodella
  $('#search_btn3').click(function (){
        if($('.year').val() === ''){
          $('.result_container').html('<p>Kirjoita ensin vuosi</p>');
        }else{
          app.selectedName = $('.year').val();
          app.printInfo3(data);
          return app.selectedName;          
        }
      });
  
  
    
    //kategorialla (selectpicker ei toimi)
    $('#search_btn2').click(function (){
     
          app.selectedName = $('.selectpicker').val();
          //console.log(app.selectedName)
          app.printCategoryInfo(data);
          return app.selectedCategory;         
        
      });
  },
  printCategoryInfo: function(data){
    var resultContainer = $('.result_container').empty();
    $.each(app.selectedName, function(i,el){
      app.pickedCategory = el;
      console.log(app.pickedCategory)
      $.each(data, function (key, value) {
        $.each(value.categories, function(i, el){
          if(app.pickedCategory === el){
            $('<div><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '<img src="' + value.img_src + '" alt="Movie pic"/></div>').appendTo(resultContainer);
          }
        });  
      });
    })
    
  },
  //haku nimellä
  printInfo: function(data){
      var resultContainer = $('.result_container').empty();
      var pickedMovie = app.selectedName;
      console.log(pickedMovie)
      $.each(data, function (key, value) {
        if(pickedMovie === key){
          $('<div><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '</div><img src="' + value.img_src + '" alt="Movie pic"/><div>').appendTo(resultContainer);
        }
      });
  },
  
  //haku vuodella
  printInfo3: function(data){
      var resultContainer = $('.result_container').empty();
      var pickedCategory = app.selectedName;
      //console.log(pickedCategory)
      $.each(data, function (key, value) {
        if(pickedCategory === value.year){     
          $('<div><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '<img src="' + value.img_src + '" alt="Movie pic"/></div>').appendTo(resultContainer);
        }
      });
  },
  init: function() {
    app.getData();
  }
}
$(document).ready(function () {
  app.init();
});