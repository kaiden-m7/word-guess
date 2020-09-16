let Word = require("./word.js");
let inquirer = require("inquirer");

//Letter entry
let letterArray = "abcdefghijklmnopqrstuvwxyz";

//List of words to choose from
let wordBank = [
    "cookie",
    "cake",
    "candy",
    "sauce",
    "knife",
    "pots",
    "oven",
    "wisk",
    "spices",
];

//Selects a random index from the wordBank array
let randomIndex = Math.floor(Math.random() * wordBank.length);
let randomWord = wordBank[randomIndex];
let compWord = new Word(randomWord);
let requireNewWord = false;
//Array for guessed letters
let incorrectLetters = [];
let correctLetters = [];
let guessesLeft = 10;

function Logic() {
    //Generates the new word from the word constructor
    if (requireNewWord) {
        //Selects a random word from the wordBank array
        let randomIndex = Math.floor(Math.random() * wordBank.length);
        let randomWord = wordBank[randomIndex];
        
        compWord = new Word(randomWord);
        requireNewWord = false
    };

    //Checks if the users letter guess is correct
    let completeWord = [];
    compWord.objectArray.forEach(completeCheck);

    if (completeWord.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter:",
                    name: "userinput"
                }
            ]).then(function(input) {
                if (
                    !letterArray.includes(input.userinput) ||
                    input.userinput.length > 1
                ) {
                    console.log("\nPlease try again!\n");
                    Logic();
                } else {
                    //If statement handles the guesses
                    if (
                        incorrectLetters.includes(input.userinput) ||
                        correctLetters.includes(input.userinput) ||
                        input.userinput === ""
                    ) {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        Logic();
                    //Checks if the word is guessed correctly
                    } else {
                        let wordCheckArray = [];
                        compWord.userGuess(input.userinput);
                        
                        compWord.objectArray.forEach(wordCheck);
                        if (wordCheckArray.join("") === completeWord.join("")) {
                            console.log("\nIncorrect\n");

                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect\n");
                            correctLetters.push(input.userinput);
                        };

                        compWord.log();
                        //Shows guesses left in terminal
                        console.log("Guesses Left: " + guessesLeft + "\n");
                        //Shows letters guessed in terminal
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");
                        
                        //If users out of guesses, it'll console.log "Sorry you lost" and call restartGame function
                        if (guessesLeft > 0) {
                            Logic();
                        } else {
                            console.log("Sorry, you lost!\n");
                            restartGame ();
                        };

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        };
                    };
                };
            });
    } else {
        console.log("You won!\n");
        restartGame();
    };

    function completeCheck(key) {
        completeWord.push(key.guessed);
    };
};

//Function prompts user to "play again" or "exit" 
function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["play Again", "Exit"],
                name: "restart"
            }
        ]).then(function(input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                Logic();
            } else {
                return;
            };
        });
};

//Calls Logic function
Logic();