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
		app.availableTags = [];
		$.each(data, function (key, value) {
				app.availableTags.push(key);
		});
	  
		$("#titles").autocomplete({
			source: app.availableTags,
			minLength: 3
		});
		
		//haku nimellä
		$('#search_btn').click(function (){
			 $('html, body').animate({
				scrollTop: $('.result_container').offset().top -100
    		}, 1500);
			if($('.titles').val() === ''){
				$('.result_container').html('<div class="row"><div class="col-sm-6 col-md-offset-3"><h3 style="color:#d9534f">Kirjoita ensin elokuvan tai sarjan nimi!</h3></div></div>');
			}else{
				app.selectedName = $('.titles').val();
				app.printNameInfo(data);
				return app.selectedName;
			}
		});
		
		//haku vuodella
		$('#search_btn2').click(function (){
			$('html, body').animate({
				scrollTop: $('.result_container').offset().top -100
    		}, 1500);
			app.selectedYear = $('.selectpicker_year').val();
			app.printYearInfo(data);
			return app.selectedYear;
		});
		
		//haku kategorialla
		$('#search_btn3').click(function (){
			$('html, body').animate({
				scrollTop: $('.result_container').offset().top -100
    		}, 1500);
			app.selectedCategory = $('.selectpicker_category').val();
			app.printCategoryInfo(data);
			return app.selectedCategory;         
		});
	},
	//Tulostus nimen perusteella
	printNameInfo: function(data){
		var resultContainer = $('.result_container').empty();
		var pickedMovie = app.selectedName;
		$.each(data, function (key, value) {
			if(pickedMovie === key){
				var results = $('<div class="col-sm-6 col-md-offset-3"><h3 style="color:white;">Tämä teos löytyy Netflixistä!</h3></div>').appendTo(resultContainer);
				$('<img src="' + value.img_src + '" alt="Movie pic"/><p>Arvosana: ' + value.grade + '</p><p>Vuosi: ' + value.year + '</p><p>Saatavilla: ' + value.date + '</p></div>').appendTo(results);
				var categories = $('<p>Genre: </p>').appendTo(results);
				$.each(value.categories, function(i,el){
					app.categories = el;
					$('<span>' + app.categories + '   </span>').appendTo(categories);
				});
			}
		});
		if( $('.result_container').is(':empty') ) {
			var results = $('<div class="row"><div class="col-sm-6 col-md-offset-3"><h3 style="color:#d9534f">Haku "' + pickedMovie + '" ei tuottanut tulosta!</h3></div></div>').appendTo(resultContainer);
		}
	},
	
	//Tulostus vuoden perusteella
	printYearInfo: function(data){
		var resultContainer = $('.result_container').empty();
		$.each(app.selectedYear, function(i,el){
			app.year = el;
			$.each(data, function (key, value) {
				if(app.year === value.year){
					var results = $('<div class="col-sm-6 col-md-offset-3"><h3 style="color:white;"></div>').appendTo(resultContainer);
					$('<img src="' + value.img_src + '" alt="Movie pic"/><p>Arvosana: ' + value.grade + '</p><p>Vuosi: ' + value.year + '</p><p>Saatavilla: ' + value.date + '</p></div>').appendTo(results);
					var categories = $('<p>Genre: </p>').appendTo(results);
						$.each(value.categories, function(i,el){
							app.categories = el;
							$('<span>' + app.categories + '   </span>').appendTo(categories);
						});
				}
			});
		});
		if( $('.result_container').is(':empty') ) {
			var results = $('<div class="row"><div class="col-sm-6 col-md-offset-3"><h3 style="color:#d9534f">Tuloksia ei löydy!</h3></div></div>').appendTo(resultContainer);
		}
	},
	
	//Tulostus kategorian perusteella
	printCategoryInfo: function(data){
		var resultContainer = $('.result_container').empty();
		$.each(app.selectedCategory, function(i,el){
			app.pickedCategory = el;
			console.log(app.pickedCategory)
			$.each(data, function (key, value) {
				$.each(value.categories, function(i, el){
					if(app.pickedCategory === el){
						var results = $('<div class="col-sm-6 col-md-offset-3"><h3 style="color:white;"></div>').appendTo(resultContainer);
						$('<img src="' + value.img_src + '" alt="Movie pic"/><p>Arvosana: ' + value.grade + '</p><p>Vuosi: ' + value.year + '</p><p>Saatavilla: ' + value.date + '</p></div>').appendTo(results);
						var categories = $('<p>Genre: </p>').appendTo(results);
						$.each(value.categories, function(i,el){
							app.categories = el;
							$('<span>' + app.categories + '   </span>').appendTo(categories);
						});
					}
				});  
			});
		});
		if( $('.result_container').is(':empty') ) {
			var results = $('<div class="row"><div class="col-sm-6 col-md-offset-3"><h3 style="color:#d9534f">Tuloksia ei löydy!</h3></div></div>').appendTo(resultContainer);
		}
	},
	
	init: function() {
		app.getData();
	}
}

$(document).ready(function () {
	app.init();
});