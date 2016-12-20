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
	
	//kategorialla
	$('#search_btn2').click(function (){
        if($('.categories').val() === ''){
          $('.result_container').html('<p>Kirjoita ensin kategoria</p>');
        }else{
          app.selectedName = $('.categories').val();
          app.printInfo2(data);
          return app.selectedName;          
        }
      });
	  
	  
	  //kategorialla (selectpicker ei toimi)
	  $('#search_btn2').click(function (){
      console.log('hei')
        if($('.selectpicker').val() === ''){
          $('.result_container').html('<p>Kirjoita ensin kategoria</p>');
        }else{
          app.selectedName = $('.selectpicker').val();
          app.printInfo2(data);
          return app.selectedName;         
        }
      });
  },
  
  //haku nimellä
  printInfo: function(data){
      var resultContainer = $('.result_container').empty();
      var pickedMovie = app.selectedName;
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
      $.each(data, function (key, value) {
        if(pickedCategory === value.year){
          $('<div><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '<img src="' + value.img_src + '" alt="Movie pic"/></div>').appendTo(resultContainer);
        }
      });
	},
  
  //haku kategorialla (nyt toimii siten että käyttäjä kirjoittaa haettavan kategorian)
  printInfo2: function(data){
      var resultContainer = $('.result_container').empty();
      var pickedCategory = app.selectedName;
      
      console.log(pickedCategory) //selectpickeristä stringi ei täsmää datan kategorioihin
      $.each(data, function (key, value) {
        $.each(value.categories, function(i, el){
          if(pickedCategory === el){
            $('<div><p>Arvosana: ' + value.grade + '</br>Vuosi: ' + value.year + '</br>Genre: ' + value.categories + '</br>Saatavilla: ' + value.date + '<img src="' + value.img_src + '" alt="Movie pic"/></div>').appendTo(resultContainer);
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