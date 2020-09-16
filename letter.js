//Construct for letters
function Letter(value) {
    this.letter = value;
    this.guessed = false;

    //Displays the letter or underscore
    this.toString = function() {
        //If the letter has been guessed, then return the character 
        if (this.letter === " ") {
            this.guessed = true;
            return " ";
        } else {
             // If the letter has not been guessed, return an underscore;
            if (this.guessed === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    };

    //Checks if the user input is the same as the letter
    this.guess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true;
        }
    };
};

// Exports the letter constructor to be used in word.js
module.exports = Letter;