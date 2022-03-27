/*Random text*/
let randomTextArray = [
    "Positive anything is better than negative nothing.",
    "Miracles happen to those who believe in them.",
    "One small positive thought can change your whole day.",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart",
    "Whoever is happy will make others happy too",
    "Until the lions have their own historians, the history of the hunt will always glorify the hunter.",
    "The secrets of evolution, are time and death.",
    "There's an unbroken thread that stretches from those first cells to us.",
    "It is the winners who write history - their way."
];

/* Elements */

var WPMValue = document.querySelector("#WPM .scoreValue");
var CPMValue = document.querySelector("#CPM .scoreValue");
var ErrorsValue = document.querySelector("#Errors .scoreValue");
var TimeValue = document.querySelector("#Time .scoreValue");
var AccuracyValue = document.querySelector("#Accuracy .scoreValue");


var TypingDisplay = document.getElementsByClassName("typingDisplay")[0];
var TypingInput = document.getElementsByClassName("typingInput")[0];

/* Global Variables */

/* Game Status */
var running = "Running";
var notRunning = "NotRunning"
var gameStatus = notRunning;
var TimeLimit = 60;
var totalErrors = 0;
var totalCharTyped = 0;
var totalWordTyped = 0;

var currentStatementCharTyped = 0;
var currentStatementWordTyped = 0;
let currentTextIndex = 0;


/* Event Functions*/

function restart() {

    totalErrors = 0;
    totalCharTyped = 0;
    totalWordTyped = 0;
    currentStatementWordTyped = 0;
    currentStatementCharTyped = 0;

    WPMValue.innerHTML = totalWordTyped;
    CPMValue.innerHTML = totalCharTyped;
    ErrorsValue.innerHTML = totalErrors;
    TimeValue.innerHTML = "60s";
    AccuracyValue.innerHTML = 100;
    
    var WPM = document.getElementById("WPM");
    var CPM = document.getElementById("CPM");
    var restart = document.getElementById("restart");

    WPM.classList.add('hidden');
    CPM.classList.add('hidden');
    restart.classList.add('hidden');

    TypingDisplay.innerHTML = "Click on the area below to start the game.";
    TypingInput.value = "";
    TypingInput.disabled = false;
    
    gameStatus = notRunning;
}

function startGame() {
    if(gameStatus !== notRunning){
        return;
    }

    startTimer();
    showNewText();

    gameStatus = running;
}

function spellCheck() {
    var errors = 0;

    const expectTextArray = TypingDisplay.querySelectorAll('span')
    const actualTextArray = TypingInput.value.split('')

    currentStatementWordTyped = 0;
    currentStatementCharTyped = 0;
    expectTextArray.forEach((charSpan, index) => {
        const character = actualTextArray[index]
        if (character == null) {
            charSpan.classList.remove('correctText')
            charSpan.classList.remove('incorrectText')
        } 
        else {
            currentStatementCharTyped++;
            if (character === charSpan.innerText) {
                charSpan.classList.add('correctText')
                charSpan.classList.remove('incorrectText')
            } else {    
                charSpan.classList.remove('correctText')
                charSpan.classList.add('incorrectText')
                errors++;
            }

            //space encountered means word completed.
            if (charSpan.innerText == ' '){
                currentStatementWordTyped++;
            }
        }
    })

    //Update Errors
    ErrorsValue.innerHTML = totalErrors + errors;

    //Update accuracy
    var tatalChar = (totalCharTyped + currentStatementCharTyped)

    let correctChars = (tatalChar - (totalErrors + errors));
    let accuracy = ((correctChars / tatalChar) * 100);

    AccuracyValue.innerHTML = Math.round(accuracy);

    if (expectTextArray.length == actualTextArray.length) {

        //including the last word of the statement, as there will be no space in the end.
        totalWordTyped += currentStatementWordTyped + 1;

        totalCharTyped += currentStatementCharTyped;
        showNewText();
        totalErrors += errors;
        TypingInput.value = "";
    }
}

/* Internal functions */

function startTimer(){
    var countDown = TimeLimit;
    
    var timePassed = 0;
    
    x = setInterval(function(){
        timePassed++;
        var timeLeft = countDown - timePassed;

        TimeValue.innerHTML = timeLeft + "s";
        
        if (timeLeft === 0){
            clearInterval(x);
            stopGame();
        }
    }, 1000)
}

function stopGame() {
    
    if(gameStatus !== running){
        return;
    }

    var WPM = document.getElementById("WPM");
    var CPM = document.getElementById("CPM");
    var restart = document.getElementById("restart");

    WPM.classList.remove('hidden');
    CPM.classList.remove('hidden');
    restart.classList.remove('hidden');

    const expectTextArray = TypingDisplay.querySelectorAll('span')
    const actualTextArray = TypingInput.value.split('')

    var lastChar = expectTextArray[actualTextArray.length];

    if(lastChar.innerHTML == ' '){
        currentStatementWordTyped++;
    }

    WPMValue.innerHTML = totalWordTyped + currentStatementWordTyped;
    CPMValue.innerHTML = totalCharTyped + currentStatementCharTyped;

    TypingInput.disabled = true;

    gameStatus = notRunning;
}

async function showNewText() {
    var textToType = randomTextArray[currentTextIndex];

    TypingDisplay.innerHTML = ''
    textToType.split('').forEach(char => {
        const charElement = document.createElement('span')
        charElement.innerText = char
        TypingDisplay.appendChild(charElement)
    })
    
    if (currentTextIndex < randomTextArray.length - 1)
        currentTextIndex++;
    else
        currentTextIndex = 0;
    
    TypingInput.value = null
}