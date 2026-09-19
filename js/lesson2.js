// ==========================================
// TilBil — 2-сабак
// Тема: Саламдашуу
// ==========================================


// Сабактын учурдагы кадамы
let currentStep = 1;

// Тесттеги учурдагы суроо
let questionIndex = 0;

// Топтолгон упай
let score = 0;

// Туура жооптордун саны
let correctAnswers = 0;

// Учурдагы суроого жооп берилдиби?
let answered = false;


// ==========================================
// ТЕСТ СУРООЛОРУ
// ==========================================

const questions = [

    {
        question: "Кыргыз тилинде сылык саламдашуу кайсы?",
        options: [
            "Кандайсың?",
            "Саламатсызбы!",
            "Кайда барасың?",
            "Көрүшкөнчө!"
        ],
        answer: "Саламатсызбы!"
    },

    {
        question: "Эртең менен саламдашууда кайсы сөз колдонулат?",
        options: [
            "Кайырлуу түн!",
            "Көрүшкөнчө!",
            "Кайырлуу таң!",
            "Рахмат!"
        ],
        answer: "Кайырлуу таң!"
    },

    {
        question: "Адамдын абалын сураганда кайсы сөз айтылат?",
        options: [
            "Кандайсыз?",
            "Кайырлуу түн!",
            "Рахмат!",
            "Кош болуңуз!"
        ],
        answer: "Кандайсыз?"
    },

    {
        question: "Өзүңдүн атыңды айтууда кайсы сүйлөм туура?",
        options: [
            "Менин атым Айбек.",
            "Мен атым Айбек.",
            "Атым мен Айбек.",
            "Айбек менин."
        ],
        answer: "Менин атым Айбек."
    },

    {
        question: "«Мен студентмин» деген сүйлөм эмнени билдирет?",
        options: [
            "Менин атымды",
            "Менин студент экенимди",
            "Менин жашаган жеримди",
            "Менин жашымды"
        ],
        answer: "Менин студент экенимди"
    }

];


// ==========================================
// ПРОГРЕСС
// ==========================================

function updateProgress() {

    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    if (!progressText || !progressFill) {
        return;
    }

    progressText.textContent = currentStep + " / 4";

    const percentage = (currentStep / 4) * 100;

    progressFill.style.width = percentage + "%";
}


// ==========================================
// КАДАМДЫ КӨРСӨТҮҮ
// ==========================================

function showStep(stepNumber) {

    const steps = document.querySelectorAll(".lesson-step");

    steps.forEach(function(step) {
        step.classList.remove("active");
    });


    const current = document.getElementById(
        "step" + stepNumber
    );

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


// ==========================================
// КИЙИНКИ КАДАМ
// ==========================================

function nextStep() {

    if (currentStep < 4) {

        showStep(currentStep + 1);

        // Эгер 3-кадамга өтсө,
        // биринчи тестти жүктөйбүз
        if (currentStep === 3) {
            loadQuestion();
        }

    }

}


// ==========================================
// СУРООНУ ЖҮКТӨӨ
// ==========================================

function loadQuestion() {

    const questionTitle =
        document.getElementById("questionTitle");

    const questionText =
        document.getElementById("questionText");

    const quizOptions =
        document.getElementById("quizOptions");

    const feedback =
        document.getElementById("feedback");

    const quizNext =
        document.getElementById("quizNext");


    if (!questionTitle ||
        !questionText ||
        !quizOptions) {

        return;
    }


    const question =
        questions[questionIndex];


    questionTitle.textContent =
        (questionIndex + 1) + "-суроо";


    questionText.textContent =
        question.question;


    quizOptions.innerHTML = "";

    feedback.textContent = "";

    feedback.className = "feedback";

    quizNext.style.display = "none";


    answered = false;


    // Жоопторду түзөбүз
    question.options.forEach(function(option) {

        const button =
            document.createElement("button");


        button.className = "quiz-option";

        button.textContent = option;


        button.onclick = function() {

            checkAnswer(option, button);

        };


        quizOptions.appendChild(button);

    });

}


// ==========================================
// ЖООПТУ ТЕКШЕРҮҮ
// ==========================================

function checkAnswer(selectedAnswer, selectedButton) {

    // Бир суроого эки жолу жооп берүүгө жол жок
    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[questionIndex];


    const feedback =
        document.getElementById("feedback");


    const quizNext =
        document.getElementById("quizNext");


    const buttons =
        document.querySelectorAll(".quiz-option");


    // Бардык кнопкаларды убактылуу өчүрөбүз
    buttons.forEach(function(button) {

        button.disabled = true;

    });


    // Туура жооп
    if (selectedAnswer === question.answer) {

        score += 10;

        correctAnswers++;


        feedback.textContent =
            "✅ Туура жооп! Азаматсың! +10 упай";

        feedback.className =
            "feedback correct";


        selectedButton.classList.add("correct");

    }

    // Туура эмес жооп
    else {

        feedback.textContent =
            "❌ Туура эмес. Туура жооп: " +
            question.answer;


        feedback.className =
            "feedback wrong";


        selectedButton.classList.add("wrong");


        // Туура жоопту көрсөтөбүз
        buttons.forEach(function(button) {

            if (button.textContent === question.answer) {

                button.classList.add("correct");

            }

        });

    }


    quizNext.style.display = "block";

}


// ==========================================
// КИЙИНКИ СУРОО
// ==========================================

function nextQuestion() {

    questionIndex++;


    if (questionIndex < questions.length) {

        loadQuestion();

    }

    else {

        finishLesson();

    }

}


// ==========================================
// САБАКТЫ БҮТҮРҮҮ
// ==========================================

function finishLesson() {

    showStep(4);


    const finalScore =
        document.getElementById("finalScore");


    const correctCount =
        document.getElementById("correctCount");


    if (finalScore) {

        finalScore.textContent =
            score;

    }


    if (correctCount) {

        correctCount.textContent =
            correctAnswers +
            " / " +
            questions.length;

    }


    // ======================================
    // УБАКТЫЛУУ LOCALSTORAGE
    // Кийин Firebase менен алмаштырабыз
    // ======================================

    localStorage.setItem(
        "tilbil_lesson2_score",
        score
    );


    localStorage.setItem(
        "tilbil_lesson2_correct",
        correctAnswers
    );


    localStorage.setItem(
        "tilbil_lesson2_completed",
        "true"
    );


    // Жалпы упайды да сактайбыз
    const oldTotal =
        Number(
            localStorage.getItem("tilbil_total_score")
        ) || 0;


    localStorage.setItem(
        "tilbil_total_score",
        oldTotal + score
    );

}


// ==========================================
// САБАКТЫ КАЙРА БАШТОО
// ==========================================

function restartLesson() {

    currentStep = 1;

    questionIndex = 0;

    score = 0;

    correctAnswers = 0;

    answered = false;


    showStep(1);

}


// ==========================================
// БЕТ АЧЫЛГАНДА
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateProgress();

    }
);