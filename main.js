// HTML elementlarini tanlash
const firstBtn = document.querySelector('.firstBtn');
const timeDisplay = document.querySelector('.time');
const questionBtn = document.querySelector('.questionBtn');
const inputNumber = document.querySelector('#number');
const btnTrue = document.querySelector('.btnTrue');
const btnFalse = document.querySelector('.btnFalse');
const resetBtn = document.querySelector('.resetBtn');
const startBtn = document.querySelector('.startBtn');

// O'zgaruvchilar
let correctAnswer;
let timer;
let timeLeft;
let correctCount = 0;
let incorrectCount = 0;

// Vaqtni boshlash
startBtn.addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    timeLeft = parseInt(document.querySelector('#second').value);

    if (!name || isNaN(timeLeft)) {
        alert('Ismingizni va vaqtni kiriting!');
        return;
    }

    startTimer();
    generateQuestion();
    correctCount = 0;
    incorrectCount = 0;
    updateScore();
});

// Vaqtni hisoblash funksiyasi
function startTimer() {
    timeDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

// Tasodifiy ko'paytirish misolini yaratish
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;

    questionBtn.textContent = `${num1} * ${num2} = ?`;
    inputNumber.value = ''; // Maydonni tozalash
    inputNumber.disabled = false; // Input maydonini faollashtirish
    inputNumber.focus(); // Inputga fokuslash
}

// Tugmalar o'rniga raqam kiritilganida avtomatik tekshirish
inputNumber.addEventListener('keydown', (event) => {
    // Enter tugmasi bosilganda javobni tekshirish
    if (event.key === 'Enter') {
        const userAnswer = parseInt(inputNumber.value);

        if (!isNaN(userAnswer)) {
            if (userAnswer === correctAnswer) {
                correctCount++;
                btnTrue.textContent = correctCount;
            } else {
                incorrectCount++;
                btnFalse.textContent = incorrectCount;
            }
            generateQuestion(); // Yangi savolni yaratish
            updateScore(); // Hisobni yangilash
        }
    }
});

// O'yinni tugatganda natijani ko'rsatish
function showResults() {
    alert(`O'yin tugadi! To'g'ri javoblar: ${correctCount}, noto'g'ri javoblar: ${incorrectCount}`);
    resetGame();
}

// Hisobni yangilash
function updateScore() {
    btnTrue.textContent = correctCount;
    btnFalse.textContent = incorrectCount;
}

// O'yinni qayta boshlash
resetBtn.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    clearInterval(timer);
    timeDisplay.textContent = 0;
    questionBtn.textContent = '7 * 8 = ?';
    inputNumber.value = '';
    inputNumber.disabled = true; // Input maydonini o'chirish
    correctCount = 0;
    incorrectCount = 0;
    updateScore();
}
