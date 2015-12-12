$(document).ready(function(){
    console.log("hello");
    var wordArray=[]; //assigning all these variables to global scope so can be used in all functions below
    var correctLetters=[];
    var guessedLetters=["~"]; //adding in a character to guessedletters so it has a length > 0
    var wordToGuess;

    $(document).on('click',".wordSubmit",function(event){ //when they submit a word
        event.preventDefault();
        $(".guessLetters").removeClass("hidden"); //show the letter guessing form
        $(".wordForm").addClass("hidden");  //hide the word entry form
        wordToGuess=$("#word").val(); //gets the value from the word entry form, assigns to wordToGuess
        for (var i=0; i<wordToGuess.length; i++) { //parses the various characters of the word, into an array
        	wordArray.push(wordToGuess.charAt(i));
        }
    });

    $(document).on('click',".letterSubmit",function(event){ //when they submit a letter
        event.preventDefault();
   		var letter=$("#letter").val();  //gets the value from the letter entry form, assignes to var letter
  		$("#letter").val(""); //blanks out the letter form on the page
  		$(".alertUser").text(""); //blanks out the alert section (in case they were alerted to something earlier)
   		var guessedLettersLength=guessedLetters.length; //gets the length of the guessedletters array - done outside of the "for" below so that when something gets added, the loop doesn't continue
   		console.log(typeof letter);
   		console.log(parseInt(letter));
   		console.log(parseInt(letter)!==NaN);
   		if(letter.length > 1) {
   			$(".alertUser").text("You must enter a single letter as a guess!");
   			return;
   		}

   		for (var b=0; b<guessedLettersLength; b++) {  //allows looping through the guessedletters array, to check if letter has already been guessed
   			if(guessedLetters[b]===letter) {
   				$(".alertUser").text("You already guessed this letter!");
   				break;  //stops the For loop if you've already guessed the letter, so it doesn't have to keep looping through the rest
   			} else if(b===guessedLettersLength-1) { //if you're at the end of the guessedletters array
   				guessedLetters.push(letter);  //adds the letter to the guessed letters array
   				$(".allGuesses").append(letter+", "); //puts the letter onto the page
   				for (var i=0; i<wordArray.length; i++) { //this is a loop to check if the guessed letter is in the word
   					if(letter===wordArray[i]) { 
   						correctLetters.push(letter); //if the letter is in the word, add it to the array of correct guesses
   						$(".correctGuesses").append(letter+", ");
   						if(correctLetters.length===wordArray.length) {
   							$(".winner").text("Congratulations, you have correctly guessed the word: "+wordToGuess+"!");
   							$(".guessLetters").addClass("hidden");
   							$(".clearGame").removeClass("hidden");
   							break; 
   						}
   						//break; //commented this out because if the same letter is in the word multiple times, needs to loop through the whole word
   					} 
   				}
   			}
   		}
    });
});