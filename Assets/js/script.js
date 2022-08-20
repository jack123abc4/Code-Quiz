timerEl = document.querySelector("#timer");



var secondsLeft = 10;
function setTime() {
    var timerInterval = setInterval(
        function() {
            secondsLeft--;
            timerEl.children[0].textContent = secondsLeft;
            if (secondsLeft === 0){
                clearInterval(timerInterval);
                alert("Time's up!");
            }
        },
        1000
    )
}




function init() {
    timer.children[0].textContent = secondsLeft;
    setTime();
}


init();