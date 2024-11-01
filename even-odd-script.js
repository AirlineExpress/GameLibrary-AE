function checkEvenOdd(choice) {
    const result = document.getElementById('result');
    const randomChoice = Math.random() < 0.5 ? 'Even 丁' : 'Odd 半';
    if (choice === randomChoice) {
        result.value = `You win! It was ${randomChoice}.`;
    } else {
        result.value = `You lose! It was ${randomChoice}.`;
    }
}

function restartGame() {
    const result = document.getElementById('result');
    result.value = 'Results';
}
