var app = {
  // getData: function(){
  //   $.ajax({
  //     url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=200&callback=?&q=' + encodeURIComponent('http://www.allflicks.fi/rss/rss.xml'),
  //     dataType: 'json',
  //     success: function (data) {
  //       if (data.responseData.feed && data.responseData.feed.entries) {
  //         data = data.responseData.feed.entries;
  //       }
  //     app.searchData(data);
  //     }
  //   });
  // },
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

    $('.search_btn').click(function (){
      console.log('click')
        if($('.titles').val() === ''){
          $('.result_container').html('<p>Kirjoita ensin nimi</p>');
        }else{
          app.selectedName = $('.titles').val();
          app.printInfo(data);
          return app.selectedName;
          
        }
      });
  },
  printInfo: function(data){
      var resultContainer = $('.result_container').empty();
      var pickedMovie = app.selectedName;
      
      console.log(pickedMovie)
      $.each(data, function (key, value) {
        if(pickedMovie === key){
          console.log(value)
          console.log(value.year);
          console.log(value.categories);
          console.log(value.grade);
          $('<div>' + '<p>Arvosana</p>' + value.grade + '</div><div><p>Vuosi</p>' + value.year + '</div><div><p>Genre</p>' + value.categories + '</div><div><p>Saatavilla</p>' + value.date + '</div><img src="' + value.img_src + '" alt="Movie pic"/><div>').appendTo(resultContainer);
        }
      });
      // data.map(function(movie){
      //   if(myName === movie.title){
      //     console.log(movie)
      //     $(movie.content).appendTo(resultContainer)
      //   }
      // })
  },
  init: function() {
    app.getData();
  }
}
$(document).ready(function () {
  app.init();
});