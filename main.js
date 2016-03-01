'use strict';

$(init);

function init() {
	$('#movieButton').click(findMovie);
};

// function searchMovies(title, year, type) {
// 	$.ajax({
// 		url: `http://www.omdbapi.com/?s=${title}&y=${year}&type=${type}`,
// 		success: function(data) {
// 			console.log(data);
// 			if($('.movie:not(#template)')) $('.movie:not(#template)').remove();
// 			if(data.Title === undefined) {
// 				$('#message').text('Movie not found!');
// 			} else {
// 				$('#message').text('');
// 				$('#movieTitle').append(showSearch(data))
// 			}
// 		},
// 		error: function(error) {
// 			console.log('error ', error);
// 		}
// 	});
// }

// function showSearch(data) {
// 	var $movie = $('#searchTemplate').clone();
// 	$movie.removeAttr('id');
// 	$movie.find('.Title').text(data.Title);
// 	$movie.find('.Year').text('(' + data.Year + ')');
// 	$movie.find('.Rated').text(data.Rated);
// }

function findMovie() {
	var $title = $('#movieInput').val();
	if($title){
		$('#movieInput').removeClass('required');
		var $year = $('#Year'), year = '';
		var $type = $('#Type'), type = '';
		if($type.val()) type = $type.val().toLowerCase();
		if($year.val()) year = $year.val().toLowerCase();
		$title.trim().toLowerCase().split(' ').join('+');
		getMovie($title, year, type);
	} else {
		$('#movieInput').addClass('required');
	}
}

function getMovie(title, year, type) {
	$.ajax({
		url: `http://www.omdbapi.com/?t=${title}&y=${year}&type=${type}`,
		success: function(data) {
			if($('.movie:not(#template)')) $('.movie:not(#template)').remove();
			if(data.Title === undefined) {
				$('#message').text('Movie not found!');
			} else {
				$('#message').text('');
				$('#movieTitle').append(createCard(data))
			}
		},
		error: function(error) {
			console.log('error ', error);
		}
	});
}

function createCard(data) {
	var $movie = $('#template').clone();
	$movie.removeAttr('id');
	$movie.find('.Title').text(data.Title);
	$movie.find('.Year').text('(' + data.Year + ')');
	$movie.find('.Rated').text(data.Rated);
	$movie.find('.Released').text('Released:  ' + data.Released);
	$movie.find('.Genre').text('Genre:  ' + data.Genre);
	$movie.find('.IMDb').attr('href', 'http://www.imdb.com/title/' + data.imdbID);
	$movie.find('.Director').text('Director:  ' + data.Director);
	$movie.find('.Writer').text('Writer:  ' + data.Writer);
	$movie.find('.Actors').text('Actors:  ' + data.Actors);
	$movie.find('.Plot').text('Plot:  ' + data.Plot);
	$movie.find('.Awards').text('Awards:  ' + data.Awards);
	$movie.find('.Poster').attr('src', data.Poster);
	$('#movieInput').val('');
	$('#Year').val('');
	$('#Type').val('');
	return $movie;
}



