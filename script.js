const MAX_ATTEMPTS = 10;
const INITIAL_LEVEL = 1;
const MAX_LEVEL = 3;

let attempts = MAX_ATTEMPTS;
let score = 0;
let currentLevel = INITIAL_LEVEL;

function play(playerChoice) {
    const computerChoice = getRandomChoice();
    const result = getResult(playerChoice, computerChoice);

    displayResult(result);

    if (result === 'You win!') {
        score += currentLevel;
    }

    attempts--;
    updateUI();

    if (attempts === 0) {
        nextLevel();
    }
}

function getRandomChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (
        (playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'lizard')) ||
        (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (playerChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock'))
    ) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
}

function displayResult(result) {
    document.getElementById('message').innerText = result;
}

function updateUI() {
    document.getElementById('level').innerText = currentLevel;
    document.getElementById('attempts').innerText = attempts;
    document.getElementById('score').innerText = score;
}

function chooseLevel(level) {
    currentLevel = level === 'easy' ? 1 : level === 'medium' ? 2 : 3;
    resetGame();

    document.body.className = level;
    
 
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(button => {
        button.className = level;
    });
}

function nextLevel() {
    if (currentLevel < MAX_LEVEL) {
        currentLevel++;
        alert(`Congratulations! Moving to Level ${currentLevel}`);
        resetGame();
    } else {
        endGame();
    }
}

function endGame() {
    alert(`Game over! Your final score is ${score}.`);
    resetGame();
}

function resetGame() {
    attempts = MAX_ATTEMPTS;
    score = 0;
    updateUI();
    displayResult('Choose an option:');
}
