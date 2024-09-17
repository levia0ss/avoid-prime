let selectedNumbers = [];
let primeNumber;
let gameOver = false;
const primeListBelow1000 = sieveOfEratosthenes(1000);
const primeListAbove1000 = sieveOfEratosthenes(10000).filter(n => n >= 1000);

// HTML要素
const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const buttonGrid = document.getElementById('button-grid');
const retryButton = document.getElementById('retry-btn');
const startButton = document.getElementById('start-btn');
const messageElement = document.getElementById('message');

// 素数判定を行う関数（エラトステネスの篩）
function sieveOfEratosthenes(limit) {
    const sieve = Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i <= Math.sqrt(limit); i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= limit; j += i) {
                sieve[j] = false;
            }
        }
    }
    return sieve.map((isPrime, index) => isPrime ? index : null).filter(n => n);
}

// ゲームリセット
function resetGame() {
    selectedNumbers = [];
    gameOver = false;
    messageElement.innerHTML = '';
    buttonGrid.innerHTML = '';
    initializeGame();
}

// ゲームを初期化
function initializeGame() {
    const compositeSample = generateComposites().slice(0, 24);
    const primeSample = [primeListAbove1000[Math.floor(Math.random() * primeListAbove1000.length)]];
    const questionNumbers = primeSample.concat(compositeSample).sort(() => 0.5 - Math.random());

    primeNumber = primeSample[0];

    questionNumbers.forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.onclick = () => handleButtonClick(number, button);
        buttonGrid.appendChild(button);
    });
}

// 合成数を生成
function generateComposites() {
    const composites = [];
    for (let i = 1000; i < 10000; i++) {
        if (!primeListBelow1000.includes(i)) composites.push(i);
    }
    return composites;
}

// ボタンクリック処理
function handleButtonClick(number, button) {
    if (gameOver || selectedNumbers.includes(number)) return;

    selectedNumbers.push(number);

    if (number === primeNumber) {
        button.classList.add('failed');
        messageElement.innerHTML = `<span class="failed-text">Failed... You selected a prime number!</span>`;
        gameOver = true;
    } else {
        button.classList.add('selected');
        messageElement.innerHTML = `<span class="safe-text">Safe! You selected ${number}.</span>`;
    }
}

// スタートボタンクリック
startButton.onclick = () => {
    titleScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    resetGame();
};

// リトライボタンクリック
retryButton.onclick = () => {
    resetGame();
};
