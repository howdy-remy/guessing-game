/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
    pastGuesses = [],
    guessesLeft = 5;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
		playersGuess = +$('#player-input').val();
		$('#player-input').val("");

		checkGuess();
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	if(playersGuess == winningNumber){
		return "You win!"
	}else if(playersGuess > winningNumber){
		return "Too high! You are within " + Math.ceil((playersGuess - winningNumber)/10)*10 + " numbers.";
	} else {
		return "Too low! You are within " + Math.ceil((winningNumber - playersGuess)/10)*10 + " numbers.";
	};
};

function guessMessage(){
	$('.feedback').text(lowerOrHigher());	
}

function gameEnd(winlose){
	if(winlose == 'lose'){
		$('.winlose').find('h1').text('Sorry. You lost.');
	}
	$('.winlose').animate({'top':'0'});
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if(playersGuess == winningNumber){
		gameEnd();
	} else if(pastGuesses.indexOf(playersGuess) != -1){
		$('.feedback').text("You’ve already guessed that number!");
	} else if(playersGuess > 100){
		$('.feedback').text("That’s over 100! Try a guess from 1–100.");
	} else {
		guessMessage();
		guessesLeft--;
		$('.guesses-left').text(guessesLeft + " guesses left");	
		pastGuesses.push(playersGuess);
	}
	if(guessesLeft < 1){
		gameEnd('lose');
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	hintArray = [winningNumber];
	while(hintArray.length < 5){
		hintArray.push(Math.floor(Math.random() * 100));
	};

	$('.hint-box').append('<p class="numberhints">' + hintArray.sort().join('&nbsp;&nbsp;') + '</p>').show();
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	pastGuesses = [];
	guessesLeft = 5;
	hintArray = winningNumber;
	$('.feedback').text("Input any number from 1-100");
	$('.winlose').animate({'top':'-100vh'});
	$('.hint-box').hide();
	//need hint button reset
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
	$('.hint').one('click', function(){
		provideHint();
	});
	$('.play-again').on('click', function(){
		playAgain();
	});
});


