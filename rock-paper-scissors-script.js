function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = document.getElementById('result');

    if (playerChoice === aiChoice) {
        result.value = `It's a draw! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && aiChoice === 'scissors') ||
        (playerChoice === 'paper' && aiChoice === 'rock') ||
        (playerChoice === 'scissors' && aiChoice === 'paper')
    ) {
        result.value = `You win! ${playerChoice} beats ${aiChoice}.`;
    } else {
        result.value = `You lose! ${aiChoice} beats ${playerChoice}.`;
    }
}

function restartGame() {
    const result = document.getElementById('result');
    result.value = 'Results';
}
