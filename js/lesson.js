let currentStep = 1;
let questionIndex = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;

const questions = [
    {
        question: "Алма эмне?",
        answers: [
            "Мөмө-жемиш",
            "Ичимдик",
            "Эт",
            "Дан азыгы"
        ],
        correct: 0
    },

    {
        question: "Нанды эмне кылабыз?",
        answers: [
            "Ичебиз",
            "Жейбиз",
            "Уктайбыз",
            "Окуйбуз"
        ],
        correct: 1
    },

    {
        question: "Сүттү эмне кылабыз?",
        answers: [
            "Ичебиз",
            "Жейбиз",
            "Жазабыз",
            "Кийебиз"
        ],
        correct: 0
    },

    {
        question: "Шорпо кандай тамак?",
        answers: [
            "Кургак тамак",
            "Суюк тамак",
            "Мөмө",
            "Жашылча"
        ],
        correct: 1
    },

    {
        question: "Кайсынысы жашылча?",
        answers: [
            "Алма",
            "Нан",
            "Сабиз",
            "Сүт"
        ],
        correct: 2
    }
];

function updateProgress() {
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    if (progressText) {
        progressText.textContent = currentStep + " / 4";
    }

    if (progressFill) {
        const percent = (currentStep / 4) * 100;
        progressFill.style.width = percent + "%";
    }
}

function showStep(stepNumber) {
    const steps = document.querySelectorAll(".lesson-step");

    steps.forEach(step => {
        step.classList.remove("active");
    });

    const current = document.getElementById("step" + stepNumber);

    if (current) {
        current.classList.add("active");
    }

    currentStep = stepNumber;
    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function nextStep() {
    if (currentStep < 4) {
        currentStep++;
        showStep(currentStep);

        if (currentStep === 3) {
            loadQuestion();
        }
    }
}

function loadQuestion() {
    const container = document.getElementById("quizContainer");
    const result = document.getElementById("quizResult");
    const nextButton = document.getElementById("nextQuestionButton");

    if (!container) return;

    answered = false;

    if (result) {
        result.innerHTML = "";
    }

    if (nextButton) {
        nextButton.style.display = "none";
    }

    const q = questions[questionIndex];

    container.innerHTML = `
        <div class="quiz-card">

            <div class="question-number">
                Суроо ${questionIndex + 1} / ${questions.length}
            </div>

            <h3>${q.question}</h3>

            <div class="answers">

                ${q.answers.map((answer, index) => `
                    <button
                        class="answer-button"
                        onclick="checkAnswer(${index})">
                        ${answer}
                    </button>
                `).join("")}

            </div>

        </div>
    `;
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const q = questions[questionIndex];
    const buttons = document.querySelectorAll(".answer-button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.correct) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && selectedIndex !== q.correct) {
            button.classList.add("wrong");
        }
    });

    const result = document.getElementById("quizResult");

    if (selectedIndex === q.correct) {
        score += 10;
        correctAnswers++;

        if (result) {
            result.innerHTML = `
                <div class="correct-message">
                    ✅ Туура жооп!
                    <br>
                    ⭐ +10 упай
                </div>
            `;
        }
    } else {
        if (result) {
            result.innerHTML = `
                <div class="wrong-message">
                    ❌ Туура эмес.
                    <br>
                    Туура жооп:
                    <strong>${q.answers[q.correct]}</strong>
                </div>
            `;
        }
    }

    const nextButton = document.getElementById("nextQuestionButton");

    if (nextButton) {
        nextButton.style.display = "block";

        if (questionIndex === questions.length - 1) {
            nextButton.textContent = "Жыйынтыкты көрүү →";
        } else {
            nextButton.textContent = "Кийинки суроо →";
        }
    }
}

function nextQuestion() {
    if (!answered) return;

    questionIndex++;

    if (questionIndex < questions.length) {
        loadQuestion();
    } else {
        finishLesson();
    }
}

function finishLesson() {
    saveProgress();

    document.getElementById("finalScore").textContent = score;

    document.getElementById("correctAnswers").textContent =
        correctAnswers + " / " + questions.length;

    const message = document.getElementById("resultMessage");

    if (correctAnswers === 5) {
        message.textContent =
            "🏆 Азаматсың! Бардык суроого туура жооп бердиң!";
    } else if (correctAnswers >= 3) {
        message.textContent =
            "👏 Жакшы! Теманы жакшы өздөштүрдүң.";
    } else {
        message.textContent =
            "💪 Теманы дагы бир жолу кайталап көр.";
    }

    showStep(4);
}

function saveProgress() {
    localStorage.setItem(
        "tilbil_lesson5_score",
        score
    );

    localStorage.setItem(
        "tilbil_lesson5_correct",
        correctAnswers
    );

    localStorage.setItem(
        "tilbil_lesson5_completed",
        "true"
    );

    let totalScore =
        Number(localStorage.getItem("tilbil_total_score")) || 0;

    totalScore += score;

    localStorage.setItem(
        "tilbil_total_score",
        totalScore
    );
}

function restartLesson() {
    currentStep = 1;
    questionIndex = 0;
    score = 0;
    correctAnswers = 0;
    answered = false;

    showStep(1);
}

document.addEventListener("DOMContentLoaded", function () {
    updateProgress();
});