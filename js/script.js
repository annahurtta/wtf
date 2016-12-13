var app = {
  getData: function(){
    $.ajax({
      url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=200&callback=?&q=' + encodeURIComponent('http://www.allflicks.fi/rss/rss.xml'),
      dataType: 'json',
      success: function (data) {
        if (data.responseData.feed && data.responseData.feed.entries) {
          data = data.responseData.feed.entries;
        }
      app.searchData(data);
      }
    });
  },
  searchData: function(data) {
    app.availableTags = [];
    $.each(data, function (key, value) {
      app.availableTags.push(value.title);
    });
  
    $("#titles").autocomplete({
        source: app.availableTags
      });

    $('.search_btn').click(function (){
      console.log('clicked')
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
      var myName = app.selectedName;
      
      console.log(myName)
      data.map(function(movie){
        if(myName === movie.title){
          console.log(movie)
          $(movie.content).appendTo(resultContainer)
        }
      })
  },
  init: function() {
    app.getData();
  }
}
$(document).ready(function () {
  app.init();
});