var animals = ['Rabbit', 'Dog'];
var state;
	// ========================================================

	// displayAnimalInfo function now re-renders the HTML to display the appropriate content. 
	function displayAnimalInfo(){
		$('#animalsView').empty();

		var animal = $(this).attr('data-name');
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
		// Creates AJAX call for the specific movie being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			// Creates a generic div to hold the movie
			var results = response.data;
			for(var i=0; i<10; i++){
			var animalDiv = $('<div class="animal gif animalDiv">');

			// Retrieves the Rating Data
			var rating = results[i].rating;

			// Creates an element to have the rating displayed
			var pOne = $('<p class= "rating">').text( "Rating: " + rating);

			// Displays the rrating
			animalDiv.append(pOne);

			// Creates an element to hold the image 
			var img = $('<img id="giffed">');

 			img.attr({'src': results[i].images.fixed_height_still.url,
                	'data-still' : results[i].images.fixed_height_still.url,
                	'data-animate' : results[i].images.fixed_height.url,
                	'data-state' : 'still'
                });

			// Appends the image
			animalDiv.append(img);

			// Puts the entire animal above the previous animal.
			$('#animalsView').prepend(animalDiv);
		}
		});

	}


	//==========Function for gif to animate and stop ===========//

function pauseGif(){
	console.log("inside on click ")
	state = $(this).attr('data-state');
	console.log("state"+state)
	 if ( state == 'still'){
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
    else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }


};

	// ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();

		// Loops through the array of movies
		for (var i = 0; i < animals.length; i++){

			// Then dynamicaly generates buttons for each movie in the array
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('animalBtn'); // Added a class
		    a.attr('data-name', animals[i]); // Added a data-attribute
		    a.text(animals[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addAnimal').on('click', function(){

		// This line of code will grab the input from the textbox
		var animalInput = $('#animal-input').val().trim();

		// The movie from the textbox is then added to our array
		if(animalInput!=""){
		animals.push(animalInput);
		
		// Our array then runs which handles the processing of our animal array
		renderButtons();
		}
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

	// ========================================================





//=========================================

	// Generic function for displaying the movieInfo
	$(document).on('click', '.animalBtn', displayAnimalInfo);

	// This calls the renderButtons() function
	renderButtons();
	$(document).on("click", '#giffed', pauseGif);

