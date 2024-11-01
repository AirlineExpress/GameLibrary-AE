document.addEventListener('DOMContentLoaded', () => {
    const bubbleWrap = document.getElementById('bubble-wrap');
    createBubbleWrap();

    function createBubbleWrap() {
        bubbleWrap.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.addEventListener('click', popBubble);
            bubbleWrap.appendChild(bubble);
        }
    }

    function popBubble(e) {
        e.target.classList.add('popped');
    }

    window.resetBubbleWrap = function() {
        createBubbleWrap();
    }
});
