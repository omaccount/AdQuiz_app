// Questions
const questions = [
    {
        question: "Which HTML tag is used for JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<javascript>", correct: false },
            { text: "<code>", correct: false },
        ],
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Mozilla", correct: false },
            { text: "Netscape", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
        ],
    },
    {
        question: "Which method is used to fetch an element?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "querySelectorAll()", correct: false },
            { text: "fetchElement()", correct: false },
            { text: "getHTML()", correct: false },
        ],
    },
    {
        question: "How do you write a comment in JavaScript?",
        answers: [
            { text: "// comment", correct: true },
            { text: "<!-- comment -->", correct: false },
            { text: "/* comment */", correct: false },
            { text: "** comment **", correct: false },
        ],
    }
];

const questionElement = document.getElementById("question");
const answersBox = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerText = document.getElementById("time");

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Start quiz
function startQuiz() {
    currentIndex = 0;
    score = 0;
    updateProgressBar();
    showQuestion();
}

// Show question
function showQuestion() {
    resetState();
    startTimer();

    let current = questions[currentIndex];
    questionElement.innerText = current.question;

    current.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerText = answer.text;
        btn.classList.add("btn");

        if (answer.correct) btn.dataset.correct = answer.correct;

        btn.addEventListener("click", selectAnswer);
        answersBox.appendChild(btn);
    });
}

// Timer
function startTimer() {
    timeLeft = 15;
    timerText.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            lockOptions();
            nextButton.style.display = "block";
        }
    }, 1000);
}

// Reset UI
function resetState() {
    clearInterval(timer);
    nextButton.style.display = "none";
    answersBox.innerHTML = "";
}

// Select answer
function selectAnswer(e) {
    clearInterval(timer);

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    lockOptions();
    nextButton.style.display = "block";
}

// Disable all buttons
function lockOptions() {
    Array.from(answersBox.children).forEach(btn => {
        if (btn.dataset.correct === "true") btn.classList.add("correct");
        btn.disabled = true;
    });
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentIndex) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

// Show score
function showScore() {
    resetState();
    questionElement.innerHTML = `
         Quiz Completed!<br>
        <br>You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.
    `;

    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";

    progressBar.style.width = "100%";
}

// Next Question Button
nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < questions.length) {
        updateProgressBar();
        showQuestion();
    } else {
        showScore();
    }
});

// Start the app
startQuiz();
