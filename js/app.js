'use strict';
//Initialize defined global variables
var secretNumber, numGuess, userInput, count, pastGuesses, guessHtml, userGuessList, guessList, guessContent, i

$(document).ready(function(){

  /*--- Display information modal box ---*/
    $(".what").click(function(){
      $(".overlay").fadeIn(1000);

    });
    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
    });
    newGame();
    getSecretNumber();

    userInput = $('#userGuess');

    $('#guessButton').click(function() {
      numGuess = userInput.val();
      userInput.val('');
      userInput.focus();
      userGuess(numGuess);
    });
    $('a.new').click(newGame);

});

/*--- Functions ---*/
function getSecretNumber() {
  secretNumber = Math.floor(Math.random() * (99) + 1 );
  console.log(secretNumber);
}
// New game
function newGame() {
  // reset all
  count = 0;
  pastGuesses = [];
  guessContent = '';
  // re-render all
  $('#count').html(count);
  $('ul#guessList').html(guessContent);
  $('#feedback').html("Please enter a number.");
}

//  Track how many guesses in span#count defaults to 0 on pageLoad
function userGuess(numGuess) {
  console.log(numGuess);

  //Check to see if value enter is not a number
  if (isNaN(numGuess)) {
    $('#feedback').html("Please enter a number.");
    // End this statement
    return;
  }

  //Check if the number guess is NOT between 1-100
  if (numGuess < 1 || numGuess > 100) {
    $('#feedback').html("Please enter a number between 1-100.");
    return;
  }

  // Get the difference between number guess and secret number
  if (numGuess > secretNumber) {
    var diffNum = numGuess - secretNumber;
  } else {
    var diffNum = secretNumber - numGuess;
  }
  console.log(diffNum);

  /*--- Feedback ---*/
  //50 or more "Ice Cold"
  if (diffNum > 50 ) {
    $('#feedback').html("Ice Cold");
  }
  //Between 31 and 50 "Cold"
  if (diffNum <= 49 && diffNum > 30) {
    $('#feedback').html("Cold");
  }
  //Between 21 and 30 "Warm"
  if (diffNum <= 30 && diffNum > 20) {
    $('#feedback').html("Warm");
  }
  //Between 11 and 20 "Hot"
  if (diffNum <= 20 && diffNum > 10) {
    $('#feedback').html("Hot");
  }
  //Between 1 and 10 "Very hot"
  if (diffNum <= 10 && diffNum >= 1) {
    $('#feedback').html("Very Hot");
  }
  if (numGuess == secretNumber) {
    $('#feedback').html("You Win!");
  }

  //increment the  guess count for each click
  count++;
  $('#count').html(count);

  // Track guesses
  pastGuesses.push(numGuess);
  guessContent = '';
  console.log(pastGuesses);
  if (pastGuesses[0].length) {
    $.each(pastGuesses, function(guess, value) {
      guessContent += '<li>' + value + '</li>';
    });
  }
  console.log(guessContent);
  $('ul#guessList').html(guessContent);
}
