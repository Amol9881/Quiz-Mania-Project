const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizsection = document.querySelector('.quize-section');
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizsection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    resetQuiz();
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
};

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');

    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    optionList.innerHTML = `
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `;

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.onclick = () => optionSelected(option);
        option.classList.remove('correct', 'incorrect', 'disabled');
        option.style.pointerEvents = 'auto';
    });
}

function optionSelected(answer) {
    const userAnswer = answer.querySelector('span').textContent.trim();
    const correctAnswer = questions[questionCount].answer.trim();
    const options = document.querySelectorAll('.option');

    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        options.forEach(option => {
            if (option.querySelector('span').textContent.trim() === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    let progressStartValue = 0;
    const progressEndValue = Math.round((userScore / questions.length) * 100);
    const speed = 20;

    const progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background =
            `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}

tryAgainBtn.onclick = () => {
    resultBox.classList.remove('active');
    quizBox.classList.add('active');

    resetQuiz();
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
    nextBtn.classList.remove('active');

    resetProgress();
};

goHomeBtn.onclick = () => {
    resultBox.classList.remove('active');
    quizBox.classList.remove('active');
    quizsection.classList.remove('active');
    main.classList.remove('active');

    resetQuiz();
    resetProgress();
};

function resetQuiz() {
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
}

function resetProgress() {
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    progressValue.textContent = '0%';
    circularProgress.style.background =
        `conic-gradient(#c40094 0deg, rgba(255,255,255,.1) 0deg)`;
}
