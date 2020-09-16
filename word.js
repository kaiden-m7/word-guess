//Requiring the Letter constructor function that was exported from letter.js
let Letter = require("./letter.js");

//Constructor for words
function Word(answer) {
    this.objectArray = [];

    //For loop to create letter object for each letter in the answer
    for (var i = 0; i < answer.length; i++) {
        let letter = new Letter (answer[i]);
        //push letter from object array
        this.objectArray.push(letter);
    };
     
    //Log function to display data in terminal
    this.log = function() {
        answerLog = "";

        for (var i = 0; i < this.objectArray.length; i++) {
            answerLog += this.objectArray[i] + " ";
        };

        console.log(answerLog + "\n");
    };

    //Function takes a character as an argument and calls the guess function on each letter object
    this.userGuess = function(input) {
        for (var i = 0; i < this.objectArray.length; i++) {
            this.objectArray[i].guess(input);
        };
    };
};
module.exports = Word;