var timerEl = document.querySelector("#timer");
var mainTextEl = document.querySelector("#main-text");
var mainTextHeaderEl = mainTextEl.children[0];
var mainTextParagraphEl = mainTextEl.children[1];
var startButton = document.createElement("button");
var secondsLeft = 0;
var finalScore = 0;
var qNum = 0;
var inMenu = true;

var questions = ["What does DOM stand for?", "Which of the following is not considered a primitive type in Javascript?", "Which comparison symbol is used to check for strict equality?", "Which letter is most commonly used as the name for an iterator variable?", "What unit of time does a Javascript timer use?"];
var answerOptions = [["Dramatic Overreaction, Mom", "Document Object Model", "Data-Oriented Mechanism", "Dentists' Organization of Mouths"], ["String", "Boolean", "Number", "Object"], ["==", "!=", "===", "!=="],["h","i","j","k"],["seconds","minutes","milliseconds","gigawatts"]];
var correctAnswers = ["Document Object Model", "Object", "===", "i", "milliseconds"];


function setTime() {
    secondsLeft = 60;
    timerEl.children[0].textContent = secondsLeft;
    timer.style.display = "block";
    var timerInterval = setInterval(
        function() {
            secondsLeft--;
            updateTime();
            if (secondsLeft === 0){
                clearInterval(timerInterval);
                if (!inMenu) {
                    resultsMenu();
                }
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
    inMenu = false;
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
        answerButton.classList.add("center", "answer-button");
        mainTextParagraphEl.appendChild(answerButton);
        
        
    }
    // mainTextParagraphEl.textContent = answerOptions[qNum];
}

function correctAnswer() {
    //
}

function incorrectAnswer() {
    secondsLeft -= 15;
    updateTime();
}


function resultsMenu() {
    inMenu = true;
    timerEl.style.display = "none";
    finalScore = secondsLeft;
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
    var initialLabel = document.createElement("label");
    initialLabel.textContent = "Enter initials: ";
    initialLabel.classList.add("center");
    initialLabel.setAttribute("id", "initial-label");
    var initialField = document.createElement("input");
    initialField.setAttribute("id","initials");
    mainTextEl.appendChild(initialLabel);
    initialLabel.appendChild(initialField);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.display = "inline";
    submitButton.classList.add("submit-button");
    initialLabel.appendChild(submitButton);
    
}

function showScores() {
    inMenu = true;
    mainTextHeaderEl.textContent = "Highscores";
    mainTextParagraphEl.textContent = "";
    document.querySelector("#initial-label").remove();
    
    var scoresList = document.createElement("ol");
    scoresList.classList.add("center");
    mainTextEl.appendChild(scoresList);
    
    for (var i = 0; i < Object.keys(localStorage).length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = Object.keys(localStorage)[i] + "\t\t --- \t\t" + localStorage.getItem(Object.keys(localStorage)[i]);
        scoresList.appendChild(scoreItem);
    }
    var goBackButton = document.createElement("button");
    goBackButton.classList.add("center");
    goBackButton.display = "block";
    goBackButton.textContent = "Go Back";

    var clearScoresButton = document.createElement("button");
    clearScoresButton.classList.add("center");
    clearScoresButton.display = "inline";
    clearScoresButton.textContent = "Clear Scores";
    
    mainTextEl.appendChild(goBackButton);
    mainTextEl.appendChild(clearScoresButton);
    

}

function startMenu() {
    inMenu = true;
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

mainTextEl.addEventListener("click", function(event) {
    console.log(event.target);
    if (event.target.classList.contains("answer-button")) {
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
    else if (event.target.classList.contains("submit-button")) {
        initials = document.querySelector("#initials").value.trim().toUpperCase();
        console.log(initials);
        localStorage.setItem(initials,finalScore);
        showScores();
    }
})

function init() {
    timer.children[0].textContent = secondsLeft;
    timerEl.style.display="none";
    startMenu();
}


init();