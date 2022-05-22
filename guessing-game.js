const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min); // min is inclusive, max is exclusive
}

function askGuess() {
    rl.question("Enter a guess: ", (answer) => {
        let answerNum = Number(answer);
        let guess = checkGuess(answerNum);

        if (guess) {
            console.log("You win!");
            rl.close();
        }

        numAttempts--;

        if (numAttempts === 0) {
            console.log("You lose!");
            rl.close();
        } else {
            askGuess();
        }
    });
}

function checkGuess(num) {
    if (num === secretNumber) {
        console.log("Correct!");
        return true;
    } else if (num > secretNumber) {
        console.log("Too high.");
        return false;
    } else if (num < secretNumber) {
        console.log("Too low.");
        return false;
    }
}

function askRange() {
    let answersRange = [];

    const handleFirstQuestion = (answerMin) => {
        answersRange.push(Number(answerMin));
        rl.question("Enter a max number: ", handleSecondQuestion)
    }

    const handleSecondQuestion = (answerMax) => {
        answersRange.push(Number(answerMax));
        console.log(`I'm thinking of a number between ${answersRange[0]} and ${answersRange[1]}`);
        secretNumber = randomInRange(answersRange[0], answersRange[1]);
        askGuess();
    }

    rl.question("Enter a min number: ", handleFirstQuestion);
}

function askLimit() {
    rl.question("Enter the number of turns: ", (turns) => {
        numAttempts = turns;
        askRange();
    })
}


// Begin game
askLimit();
