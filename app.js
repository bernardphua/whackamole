const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

const totalTime = 30;
let result = 0;
let currentTime = totalTime;
let moveMoleTimer = null;
let countDownTimer = null;
let hitPosition = null;

timeLeft.textContent = totalTime;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole');
        className.classList.remove('mole-hit');
    });

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id;
}

square.forEach(elem => {
    elem.addEventListener('click', () => {
        if (hitPosition != null && elem.id === hitPosition) {
            elem.classList.replace('mole','mole-hit');
            result += 1;
            score.textContent = result;
        }
    })
})

function moveMole() {
    moveMoleTimer = setInterval(randomSquare, 1000);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime.toString();

    if (currentTime === 0) {
        clearInterval(countDownTimer);
        clearInterval(moveMoleTimer);
        setTimeout(() => { alert('GAME OVER! Your final score is ' + result) }, 100);
    }
}

function StartGame() {
    if (currentTime === totalTime) {
        countDownTimer = setInterval(countDown, 1000);
        moveMole();
    }
}

function ResetGame() {
    clearInterval(countDownTimer);
    clearInterval(moveMoleTimer);
    result = 0;
    currentTime = totalTime;
    timeLeft.textContent = totalTime;
    score.textContent = result;
    randomSquare();
    StartGame();
}