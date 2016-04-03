(function(){ //use IIFE to get variables out of global scope

var winningNumber = generateRandomNumber(),
		playersGuess,
		feedback,
		pastGuesses = [],
		guessesLeft = 5;

//generate random number between 1 and 100
function generateRandomNumber(){
	return Math.floor(Math.random() * 100);
}

//generate hint box content
function hintBox(){
	hintArray = [winningNumber]; //add winning number to array
	while(hintArray.length < 5){ //add 4 random numbers to array
		hintArray.push(generateRandomNumber());//same random number generator as winning number
	};
	//add these random numbers to the hintbox in DOM
	$('.hint-box').append('<p class="numberhints">' + hintArray.sort().join('&nbsp;&nbsp;') + '</p>');//sort isn't really sorting correctly but at least it is jumbling up the winning number into the array.
}
hintBox(); //update hintbox after winning number is generated. if i generate it here instead of on button press it will only add numbers once instead of as many times the button is clicked (don't want to enable cheaters!)

//assign input number to player guess
function playersGuessSubmission(){
		playersGuess = +$('#player-input').val(); //get value of the player input and assign it to guess
		$('#player-input').val(""); //reset input field to blank so they can guess again

		checkGuess(); //move into checkGuess
}

//is a losing guess lower or higher?
function lowerOrHigher(){
	if(playersGuess > winningNumber){
		feedback = "Too high! You are within " + Math.ceil((playersGuess - winningNumber)/10)*10 + " numbers.";
	} else {
		feedback = "Too low! You are within " + Math.ceil((winningNumber - playersGuess)/10)*10 + " numbers.";
	};
};

function generateConfetti(){
	//add 100 pieces of confetti
	for(var i = 0; i < 100; i++){
		$('.winlose').append('<i></i>');
	};
	//assign each a random 'left' position, a random transition time, and one of 10 color classes
	$('i').each(function() {
		var left = generateRandomNumber() + 'vw';
		var transitionTime = Math.ceil(generateRandomNumber()/10) + 's';
		var colorClass = 'color' + Math.ceil(generateRandomNumber()/10);
    $(this).css({'left': left, 'transition-duration': transitionTime}).addClass(colorClass);
  });
}
generateConfetti();

//end of game, win or lose animation
function gameEnd(winlose){
	if(winlose == 'win'){
		$('.winlose').find('h1').text('Woo! You won!');
		$('.winlose').animate({'top':'0'}).find('i').show().animate({'top':'120vh'});
	} else {
		$('.winlose').find('h1').text('Sorry. You lost.');
		$('.winlose').animate({'top':'0'});
	}
}

//check the guess
function checkGuess(){
	//first check if guess is valid (between 1-100 and not a duplicate guess), number input field in html only allows numbers
	if(pastGuesses.indexOf(playersGuess) != -1){
		feedback = "You’ve already guessed that number!"
	} else if(playersGuess > 100 || playersGuess < 0){
		feedback = "Try a guess from 1–100."
	} else {
		//check if it won
		if(playersGuess == winningNumber){
			gameEnd('win');
		} else { //if they did not win
			lowerOrHigher(); //check if it is too high or too low and provide appropriate feedback
			guessesLeft--; //reduce number of guesses
			pastGuesses.push(playersGuess); //store the guess
			$('.guesses-left').text(guessesLeft + " guesses left. Previous guesses: " + pastGuesses.join(', '));	//update guesses left message and list previous guesses.
		}
		//if they run out of guesses they lose
		if(guessesLeft < 1){
			gameEnd('lose');
		}
	};
	//update feedback message in DOM
	$('.feedback').text(feedback);	
}
	
//reset all the variables and messages
function playAgain(){
	//update game variables
	winningNumber = generateRandomNumber();
	pastGuesses = [];
	guessesLeft = 5;

	//reset hint box
	$('.hint-box').hide();
	$('.numberhints').remove();
	hintBox();

	//update feedback/remove win/lose overlay and reset confetti
	$('.feedback').text("Input any number from 1-100");
	$('.guesses-left').text(guessesLeft + " guesses left")
	$('.winlose').animate({'top':'-100vh'});
	$('.winlose').find('i').css({'display': 'none', 'top':'-20px'});
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
	$('.submit').on('click', function(){
		playersGuessSubmission();
	});
	$('#player-input').on('keydown', function(whatKey){
		if(whatKey.which == 13){
			playersGuessSubmission();
		};
	});
	$('.hint').on('click', function(){
		$('.hint-box').slideToggle();
	});
	$('.play-again').on('click', function(){
		playAgain();
	});
});

})();