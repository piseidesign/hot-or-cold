'use strict';
//Initialize defined global variables
var secretNumber, numGuess, userInput, count, pastGuesses, guessContent

$(document).ready(function(){

  /*--- Display information modal box ---*/
    $(".what").click(function(){
      $(".overlay").fadeIn(1000);

    });
    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
    });
    //Call new game to Initialize secretNumber and reset all variables and rendering
    newGame();

    //When button is click get the value of input and pass to userGuess
    $('#guessButton').click(function() {
      userInput = $('#userGuess');
      numGuess = userInput.val();
      userInput.val('');
      userInput.focus();
      userGuess(numGuess);
    });

    //Add submit when enter key is press
    $(document).keyup(function(e) {
      if (e.keyCode == 13) {
        $('#guessButton').click();
      };
    });

    //Call newGame when new game link is click
    $('a.new').click(newGame);

});

/*--- Functions ---*/
// New game
function newGame() {
  secretNumber = Math.floor(Math.random() * (99) + 1 );
  console.log("Secret Number is: " + secretNumber);
  // reset all
  count = 0;
  pastGuesses = [];
  guessContent = '';
  // re-render all
  $('#count').html(count);
  $('ul#guessList').html(guessContent);
  $('#feedback').html("Please enter a number.").css("background-color", "#cc324b");
}

//  Track how many guesses in span#count defaults to 0 on pageLoad
function userGuess(numGuess) {
  console.log("Number guess: " + numGuess);

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
  // Check if number is repeated
  if ($.inArray(numGuess, pastGuesses) > -1) {
    $('#feedback').html("You've already guessed this number.");
    return;
  }

  // Get the difference between number guess and secret number
  if (numGuess > secretNumber) {
    var diffNum = numGuess - secretNumber;
  } else {
    var diffNum = secretNumber - numGuess;
  }
  console.log("Difference: " + diffNum);

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
    $('#feedback').html("You Win!").css("background-color", "green");
  }

  //increment the  guess count for each click
  count++;
  $('#count').html(count);

  // Track guesses
  pastGuesses.push(numGuess);
  // reset the content on each userGuess
  guessContent = '';
  console.log("Past guess: " + pastGuesses);
  //check to see if pastGuesses array at index 0 is present
  if (pastGuesses[0].length) {
    pastGuesses.forEach(function (element, index, arr) {
      guessContent += '<li>' + element + '</li>';
    });
  }
  console.log("Guess list ul content: " + guessContent);
  $('ul#guessList').html(guessContent);
}
