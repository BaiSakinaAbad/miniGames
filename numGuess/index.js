var msg1 = document.getElementById("message1");
var msg2 = document.getElementById("message2");
var msg3 = document.getElementById("message3");

var answer = Math.floor(Math.random() * 100) + 1;
var numGuess = 0; //no_of_guesses
var guessedNum = [];  // guessed nums

function play() {
    var userGuess = document.getElementById("guess").value; // user guess
    if (userGuess < 1 || userGuess > 100) {
        alert("Please enter a number BETWEEN 1 and 100!")
    } else {
        guessedNum.push(userGuess)
        numGuess += 1;
        if (userGuess < answer) {
            msg1.textContent = "Your guess is too low.";
            msg2.textContent = "Number of Guesses: " + numGuess;
            msg3.textContent = "Guessed numbers are: " + guessedNum;
        }
        else if (userGuess > answer) {
            msg1.textContent = "Your guess is too high.";
            msg2.textContent = "Number of Guesses: " + numGuess;
            msg3.textContent = "Guessed numbers are: " + guessedNum;
        }
        else if (userGuess == answer) {
            msg1.textContent = "YES! YOU WIN!!!";
            msg2.textContent = "The number was " + answer;
            msg3.textContent = "You guessed it in " + numGuess + " attempts.";
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.textContent = '🎉';
            confetti.style.position = 'fixed';
            confetti.style.top = '50%';
            confetti.style.left = '50%';
            confetti.style.fontSize = '3rem';
            confetti.style.zIndex = 9999;
            confetti.style.transform = 'translate(-50%, -50%) scale(1)';
            confetti.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            document.body.appendChild(confetti);
            setTimeout(() => {
                confetti.style.opacity = 0;
                confetti.style.transform = 'translate(-50%, -50%) scale(2)';
            }, 200);
            setTimeout(() => confetti.remove(), 10000);
        }
    }


}