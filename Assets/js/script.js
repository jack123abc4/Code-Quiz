var timerEl = document.querySelector("#timer");
var mainTextEl = document.querySelector("#main-text");
var mainTextHeaderEl = mainTextEl.children[0];
var mainTextParagraphEl = mainTextEl.children[1];
var startButton = document.createElement("button");
var secondsLeft = 0;

var questions = ["What does DOM stand for?", "Which of the following is not considered a primitive type in Javascript?", "Which comparison symbol is used to check for strict equality?"];
var answerOptions = [["Dramatic Overreaction, Mom", "Document Object Model", "Data-Oriented Mechanism", "Dentists' Organization of Mouths"], ["String", "Boolean", "Number", "Object"], ["==", "!=", "===", "!=="]];
var correctAnswers = ["Document Object Model", "Object", "==="];


function setTime() {
    secondsLeft = 10;
    timerEl.children[0].textContent = secondsLeft;
    var timerInterval = setInterval(
        function() {
            secondsLeft--;
            timerEl.children[0].textContent = secondsLeft;
            if (secondsLeft === 0){
                clearInterval(timerInterval);
                // alert("Time's up!");
            }
        },
        1000
    )
}

function displayQuestion(qNum) {
    mainTextHeaderEl.textContent = questions[qNum];
    mainTextParagraphEl.textContent = "";
    // var answerListEl = document.createElement("ul");
    // mainTextEl.append(answerListEl);
    for (var i = 0; i < answerOptions[qNum].length; i++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = answerOptions[qNum][i];
        mainTextParagraphEl.appendChild(answerButton);
        // answerButton.classList.addStyle(".center");
        
    }
    // mainTextParagraphEl.textContent = answerOptions[qNum];
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
    displayQuestion(0);
}

startButton.addEventListener("click", function() {
    startGame()
})

mainTextParagraphEl.addEventListener("click", function(event) {
    console.log(event.target);
    console.log(event.target.tagName);
    if (event.target.tagName === "BUTTON") {
        console.log("Answer selected:",event.target.textContent);
        
    }
    else {
        console.log("No answer selected.");
    }
    
    
})

function init() {
    timer.children[0].textContent = secondsLeft;
    startMenu();
}


init();