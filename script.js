const wordContainer = document.querySelector(".word");
wordContainer.innerHTML = "";

const words = ["juice", "weather", "window", "school", "apple", "beautiful", "unbelivable", "march", "happiness", "home", "live", "mistake"];

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
};

function getWord() {
    return words[getRandomIndex(words.length)];
};

function addWord() {
    const fragment = new DocumentFragment();

    const randomWord = getWord();
    let letters = randomWord.split("");
    letters.forEach((item) => {
        const letterContainer = document.createElement("span");
        letterContainer.textContent = item;
        fragment.append(letterContainer);
    });

    wordContainer.append(fragment);
    return randomWord;
};

let word = addWord();

const correcrCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const wordMistakes = document.querySelector(".word-mistakes");
let i = 0;
let correct = 0;
let wrong = 0;
let mistakes = 0;
let isTimer = false;

document.addEventListener("keydown", (event) => {
    if (!isTimer) {
        timerId = setInterval(startTimer, 1000);
        isTimer = true;
    };

    let wordLetters = Array.from(document.querySelectorAll(".word span"));
    if (event.key === word[i]) {
        wordLetters[i].classList.remove("w");
        wordLetters[i].classList.add("c");
        i++;
    } else {
        wordLetters[i].classList.add("w");
        mistakes++;
        wordMistakes.textContent = mistakes;
    };

    if (i === wordLetters.length) {
        if ( mistakes === 0) {
            correct++;
            correcrCount.textContent = correct;
        } else {
            wrong++;
            wrongCount.textContent = wrong;
        }
    };

    if (i >= wordLetters.length) {
        i = 0;
        mistakes = 0;
        wordMistakes.textContent = mistakes;
        wordContainer.innerHTML = "";
        word = addWord();
    };

    if (correct === 5) {
        alert(`Ура, победа! твое время ${timer.textContent}`);
        reset();
    } else if (wrong === 5) {
        alert('Ты проиграл :(');
        reset();
    }
});

function reset() {
    wordContainer.innerHTML = "";
    word = addWord();
    i = 0;
    correct = 0;
    correcrCount.textContent = correct;
    mistakes = 0;
    wordMistakes.textContent = mistakes;
    wrong = 0;
    wrongCount.textContent = wrong;
    stopTimer();
};

const timer = document.querySelector("#timer");
let minutes = 0;
let seconds = 0;
let timerId;

function makeTimer() {
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
};

function startTimer() {
    seconds++;
    if (seconds > 59) {
        seconds = 0;
        minutes++;
    };

    makeTimer();
};

function stopTimer() {
    clearInterval(timerId);
    seconds = 0;
    minutes = 0;
    makeTimer()
    isTimer = false;
};