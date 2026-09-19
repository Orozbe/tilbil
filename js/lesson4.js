let currentStep = 1;
let questionIndex = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;

const questions = [
    {
        question: "Адам жашаган жай эмне деп аталат?",
        answers: ["Эшик", "Үй", "Терезе", "Отургуч"],
        correct: 1
    },
    {
        question: "Үйгө кирип-чыгуучу нерсе кайсы?",
        answers: ["Керебет", "Терезе", "Эшик", "Шыпыргы"],
        correct: 2
    },
    {
        question: "Жарык кирүүчү бөлүк эмне деп аталат?",
        answers: ["Терезе", "Эшик", "Үй", "Отургуч"],
        correct: 0
    },
    {
        question: "Уктоо үчүн эмнени колдонобуз?",
        answers: ["Шыпыргы", "Керебет", "Эшик", "Терезе"],
        correct: 1
    },
    {
        question: "Үйдү тазалоо үчүн эмне колдонулат?",
        answers: ["Шыпыргы", "Керебет", "Терезе", "Отургуч"],
        correct: 0
    }
];


// ===============================
// ПРОГРЕСС
// ===============================

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


// ===============================
// КАДАМДЫ КӨРСӨТҮҮ
// ===============================

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


// ===============================
// КИЙИНКИ КАДАМ
// ===============================

function nextStep() {

    if (currentStep < 4) {

        currentStep++;

        showStep(currentStep);

        if (currentStep === 3) {
            loadQuestion();
        }
    }
}


// ===============================
// СУРООНУ ЖҮКТӨӨ
// ===============================

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


// ===============================
// ЖООПТУ ТЕКШЕРҮҮ
// ===============================

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
                    ✅ Туура жооп! +10 упай
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


// ===============================
// КИЙИНКИ СУРОО
// ===============================

function nextQuestion() {

    if (!answered) return;

    questionIndex++;

    if (questionIndex < questions.length) {

        loadQuestion();

    } else {

        finishLesson();
    }
}


// ===============================
// САБАКТЫ АЯКТОО
// ===============================

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
            "💪 Дагы бир жолу кайталап көрсөң, жакшы болот!";

    }


    showStep(4);
}


// ===============================
// ПРОГРЕССТИ САКТОО
// ===============================

function saveProgress() {

    localStorage.setItem(
        "tilbil_lesson4_score",
        score
    );

    localStorage.setItem(
        "tilbil_lesson4_correct",
        correctAnswers
    );

    localStorage.setItem(
        "tilbil_lesson4_completed",
        "true"
    );


    // Жалпы упай
    let totalScore =
        Number(localStorage.getItem("tilbil_total_score")) || 0;

    totalScore += score;

    localStorage.setItem(
        "tilbil_total_score",
        totalScore
    );
}


// ===============================
// САБАКТЫ КАЙРА БАШТОО
// ===============================

function restartLesson() {

    currentStep = 1;
    questionIndex = 0;
    score = 0;
    correctAnswers = 0;
    answered = false;

    showStep(1);
}


// ===============================
// БАШТАПКЫ ИШТӨӨ
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    updateProgress();

});