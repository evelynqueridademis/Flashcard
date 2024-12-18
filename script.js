const cards = [
    '🍎', '🍎', '🍌', '🍌', 
    '🍇', '🍇', '🍍', '🍍', 
    '🍓', '🍓', '🍉', '🍉',
    '🍒', '🍒', '🥭', '🥭'
];

let cardValues = [];
let cardIds = [];
let cardsFlipped = 0;

function startGame() {
    cardsFlipped = 0;
    cardValues = [];
    cardIds = [];
    document.getElementById("game-container").innerHTML = '';
    const shuffledCards = cards.sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        card.innerHTML = '?';
        document.getElementById('game-container').appendChild(card);
    }
}

function flipCard() {
    const selectedCard = this;
    const cardId = selectedCard.getAttribute('data-id');

    if (cardIds.length < 2 && !selectedCard.classList.contains('flipped')) {
        selectedCard.innerHTML = cards[cardId];
        selectedCard.classList.add('flipped');
        cardValues.push(cards[cardId]);
        cardIds.push(cardId);

        if (cardValues.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCard, secondCard] = cardIds;

    if (cardValues[0] === cardValues[1]) {
        cards[firstCard].removeEventListener('click', flipCard);
        cards[secondCard].removeEventListener('click', flipCard);
        cardsFlipped += 2;
        if (cardsFlipped === cards.length) {
            alert('Você venceu!');
        }
    } else {
        cards[firstCard].innerHTML = '?';
        cards[secondCard].innerHTML = '?';
        cards[firstCard].classList.remove('flipped');
        cards[secondCard].classList.remove('flipped');
    }
    cardValues = [];
    cardIds = [];
}

// Inicie o jogo ao carregar
startGame();
