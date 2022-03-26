function restart() {

    //Value Reset
    var WPMValue = document.querySelector("#WPM .scoreValue");
    var CPMValue = document.querySelector("#CPM .scoreValue");
    var ErrorsValue = document.querySelector("#Errors .scoreValue");
    var TimeValue = document.querySelector("#Time .scoreValue");
    var AccuracyValue = document.querySelector("#Accuracy .scoreValue");

    WPMValue.innerHTML = 0;
    CPMValue.innerHTML = 0;
    ErrorsValue.innerHTML = 0;
    TimeValue.innerHTML = "60s";
    AccuracyValue.innerHTML = 100;
    
    var WPM = document.getElementById("WPM");
    var CPM = document.getElementById("CPM");
    var restart = document.getElementById("restart");

    WPM.classList.add('hidden');
    CPM.classList.add('hidden');
    restart.classList.add('hidden');

    var display = document.getElementsByClassName("typingDisplay")[0];
    var input = document.getElementsByClassName("typingInput")[0];

    display.innerHTML = "Click on the area below to start the game.";
    input.value = "";
    input.disabled = false;
}

function startGame() {
    var display = document.getElementsByClassName("typingDisplay")[0];
    display.innerHTML = "The Journey of a thousand miles begins with one step."
    
    var input = document.getElementsByClassName("typingInput")[0];
    
    input.addEventListener("keyup", function(event) {
        if (event.key === ' ') {
            event.preventDefault();
            spellCheck();
        }
    });
    
    startTimer();
}

function startTimer(){
    var countDown = 5;
    
    var timePassed = 0;
    
    x = setInterval(function(){
        timePassed++;
        var timeLeft = countDown - timePassed;

        var timeValue = document.querySelector("#Time .scoreValue");
        timeValue.innerHTML = timeLeft + "s";
        
        if (timeLeft === 0){
            clearInterval(x);
            stopGame();
        }
    }, 1000)
}

function stopGame() {
    var WPM = document.getElementById("WPM");
    var CPM = document.getElementById("CPM");
    var restart = document.getElementById("restart");

    WPM.classList.remove('hidden');
    CPM.classList.remove('hidden');
    restart.classList.remove('hidden');

    var WPMValue = document.querySelector("#WPM .scoreValue");
    var CPMValue = document.querySelector("#CPM .scoreValue");
    var ErrorsValue = document.querySelector("#Errors .scoreValue");
    var TimeValue = document.querySelector("#Time .scoreValue");
    var AccuracyValue = document.querySelector("#Accuracy .scoreValue");

    WPMValue.innerHTML = 8;
    CPMValue.innerHTML = 41;
    ErrorsValue.innerHTML = 3;
    TimeValue.innerHTML = "0s";
    AccuracyValue.innerHTML = 93;

    var input = document.getElementsByClassName("typingInput")[0];
    input.disabled = true;
}


function spellCheck() {
    var displayText = document.getElementsByClassName("typingInput")[0].innerHTML();
    var inputValue = document.getElementsByClassName("typingDisplay")[0].value;

    
}