// This grabs the article in JSON
$.getJSON('/articles', function(data){
	for( var i=0; i < data.length; i++){
		//Writes to HTML
		$('#articles').append('<p data-id="' + data[i]._id + '">' + data[i].title + '<br/>' + data[i].link + '</p>');
	}
});

// On Click function for paragraph with Ajax call
$(document).on('click', 'p', function(){
	$('#notes').empty();
	var thisId = $(this).attr('data-id');
    //GET request
	$.ajax({
		method: "GET",
		url: "/articles/" + thisId,
	})
	.done(function(data){
		console.log(data);
		//Posts info from the article to HTML
		$('#notes').append('<h2 class="noteTitle">' + data.title + '</h2>');
		$('#notes').append('<input id="titleinput" name="title" placeholder="Message Title">');
		$('#notes').append('<textarea id="bodyinput" name="body" placeholder="Message"></textarea>');
		$('#notes').append('<button data-id="' + data._id + '"id="savenote">Save Note</button>');

		if(data.note){
			$('#titleinput').val(data.note.title);
			$('#bodyinput').val(data.note.body);
		}
	});
});

//Saves the note on click
$(document).on('click', '#savenote', function(){
	var thisId = $(this).attr('data-id');

	//POST reqest
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			title: $('#titleinput').val(),
			body: $('#bodyinput').val()
		}
	})
	.done(function(data){
		console.log(data);
		$('#notes').empty();
	});

	$('#titleinput').val("");
	$('#bodyinput').val("");
});