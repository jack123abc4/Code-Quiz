var timerEl = document.querySelector("#timer");
var mainTextEl = document.querySelector("#main-text");
var mainTextHeaderEl = mainTextEl.children[0];
var mainTextParagraphEl = mainTextEl.children[1];
var startButton = document.createElement("button");
var secondsLeft = 0;
var qNum = 0;

var questions = ["What does DOM stand for?", "Which of the following is not considered a primitive type in Javascript?", "Which comparison symbol is used to check for strict equality?", "Which letter is most commonly used as the name for an iterator variable?", "What unit of time does a Javascript timer use?"];
var answerOptions = [["Dramatic Overreaction, Mom", "Document Object Model", "Data-Oriented Mechanism", "Dentists' Organization of Mouths"], ["String", "Boolean", "Number", "Object"], ["==", "!=", "===", "!=="],["h","i","j","k"],["seconds","minutes","milliseconds","gigawatts"]];
var correctAnswers = ["Document Object Model", "Object", "===", "i","milliseconds"];


function setTime() {
    secondsLeft = 30;
    timerEl.children[0].textContent = secondsLeft;
    timer.style.display = "block";
    var timerInterval = setInterval(
        function() {
            secondsLeft--;
            updateTime();
            if (secondsLeft === 0){
                clearInterval(timerInterval);
                // alert("Time's up!");
            }
        },
        1000
    )
}

function updateTime() {
    timerEl.children[0].textContent = secondsLeft;
}

function displayQuestion() {
    if (qNum === questions.length || secondsLeft <= 0) {
        resultsMenu();
        return;
    }
    mainTextHeaderEl.textContent = questions[qNum];
    mainTextParagraphEl.textContent = "";
    // var answerListEl = document.createElement("ul");
    // mainTextEl.append(answerListEl);
    for (var i = 0; i < answerOptions[qNum].length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = answerOptions[qNum][i];
        answerButton.classList.add("center");
        mainTextParagraphEl.appendChild(answerButton);
        
        
    }
    // mainTextParagraphEl.textContent = answerOptions[qNum];
}

function correctAnswer() {
    //
}

function incorrectAnswer() {
    secondsLeft -= 10;
    updateTime();
}


function resultsMenu() {
    timerEl.style.display = "none";
    var finalScore = secondsLeft;
    if (finalScore < 0) {
        finalScore = 0;
    }
    console.log(finalScore);
    if (finalScore === 0) {
        mainTextHeaderEl.textContent = "Time's Up!"
    }
    else {
        mainTextHeaderEl.textContent = "All Done!";
    }
    mainTextParagraphEl.textContent = "Your score was: " + finalScore;
    
}

function startMenu() {
    mainTextHeaderEl.textContent = "Coding Quiz Challenge";
    mainTextParagraphEl.textContent = "Test your skills in this coding quiz challenge! Answer correctly and beat the timer to set a new highscore. But remember - wrong answers will cost you!";

    startButton.style.display = "block";
    startButton.classList.add("center");
    startButton.textContent = "Start Game";
    mainTextEl.appendChild(startButton);
}

function startGame() {
    console.log("Start Game!");
    setTime();
    startButton.style.display = "none";
    qNum = 0;
    displayQuestion();
}

startButton.addEventListener("click", function() {
    startGame()
})

mainTextParagraphEl.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        console.log("Answer selected:", event.target.textContent);
        console.log("Correct answer: ", correctAnswers[qNum]);
        if (event.target.textContent === correctAnswers[qNum]) {
            console.log("Correct!");
            correctAnswer();
        }
        else {
            console.log("Incorrect...");
            incorrectAnswer();
        }
        qNum++;
        displayQuestion();
        
    }
    else {
        console.log("No answer selected.");
    }
    
    
})

function init() {
    timer.children[0].textContent = secondsLeft;
    timerEl.style.display="none";
    startMenu();
}


init();