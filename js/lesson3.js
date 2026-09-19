// ==========================================
// TilBil — 3-сабак
// Тема: Үй-бүлө
// ==========================================


// ------------------------------------------
// Баштапкы өзгөрмөлөр
// ------------------------------------------

let currentStep = 1;

let questionIndex = 0;

let score = 0;

let correctAnswers = 0;

let answered = false;


// ------------------------------------------
// Тест суроолору
// ------------------------------------------

const questions = [

    {
        question: "Үй-бүлөдөгү эркек ата-эне ким?",
        options: [
            "Ата",
            "Эже",
            "Эне",
            "Карындаш"
        ],
        answer: "Ата"
    },

    {
        question: "Баланын апасы ким?",
        options: [
            "Ага",
            "Эне",
            "Чоң ата",
            "Ини"
        ],
        answer: "Эне"
    },

    {
        question: "Өзүңдөн улуу эркек бир тууганың ким?",
        options: [
            "Ини",
            "Карындаш",
            "Ага",
            "Эже"
        ],
        answer: "Ага"
    },

    {
        question: "Өзүңдөн улуу кыз бир тууганың ким?",
        options: [
            "Эже",
            "Ини",
            "Ата",
            "Чоң ата"
        ],
        answer: "Эже"
    },

    {
        question: "«Бул менин атам» деген сүйлөм ким жөнүндө?",
        options: [
            "Эне жөнүндө",
            "Ата жөнүндө",
            "Эже жөнүндө",
            "Ини жөнүндө"
        ],
        answer: "Ата жөнүндө"
    }

];


// ------------------------------------------
// Прогрессти жаңыртуу
// ------------------------------------------

function updateProgress() {

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");


    if (!progressText || !progressFill) {
        return;
    }


    progressText.textContent =
        currentStep + " / 4";


    const percentage =
        (currentStep / 4) * 100;


    progressFill.style.width =
        percentage + "%";
}


// ------------------------------------------
// Керектүү кадамды көрсөтүү
// ------------------------------------------

function showStep(stepNumber) {

    const steps =
        document.querySelectorAll(".lesson-step");


    steps.forEach(function(step) {

        step.classList.remove("active");

    });


    const current =
        document.getElementById(
            "step" + stepNumber
        );


    if (current) {

        current.classList.add("active");

    }


    currentStep =
        stepNumber;


    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ------------------------------------------
// Кийинки кадам
// ------------------------------------------

function nextStep() {

    if (currentStep < 4) {

        currentStep++;

        showStep(currentStep);


        // 3-кадамга келгенде
        // тестти баштайбыз

        if (currentStep === 3) {

            questionIndex = 0;

            score = 0;

            correctAnswers = 0;

            loadQuestion();

        }

    }
}


// ------------------------------------------
// Суроону жүктөө
// ------------------------------------------

function loadQuestion() {

    const questionTitle =
        document.getElementById(
            "questionTitle"
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const quizOptions =
        document.getElementById(
            "quizOptions"
        );


    const feedback =
        document.getElementById(
            "feedback"
        );


    const quizNext =
        document.getElementById(
            "quizNext"
        );


    if (
        !questionTitle ||
        !questionText ||
        !quizOptions
    ) {
        return;
    }


    const question =
        questions[questionIndex];


    questionTitle.textContent =
        (questionIndex + 1) + "-суроо";


    questionText.textContent =
        question.question;


    quizOptions.innerHTML =
        "";


    feedback.textContent =
        "";


    feedback.className =
        "feedback";


    quizNext.style.display =
        "none";


    answered = false;


    // --------------------------------------
    // Жооп кнопкаларын түзүү
    // --------------------------------------

    question.options.forEach(
        function(option) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.onclick =
                function() {

                    checkAnswer(
                        option,
                        button
                    );

                };


            quizOptions.appendChild(
                button
            );

        }
    );

}


// ------------------------------------------
// Жоопту текшерүү
// ------------------------------------------

function checkAnswer(
    selectedAnswer,
    selectedButton
) {

    // Бир суроого эки жолу
    // жооп берүүгө болбойт

    if (answered) {
        return;
    }


    answered = true;


    const question =
        questions[questionIndex];


    const feedback =
        document.getElementById(
            "feedback"
        );


    const quizNext =
        document.getElementById(
            "quizNext"
        );


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    // Бардык жоопторду өчүрүү

    buttons.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    // --------------------------------------
    // ТУУРА ЖООП
    // --------------------------------------

    if (
        selectedAnswer ===
        question.answer
    ) {

        score += 10;

        correctAnswers++;


        feedback.textContent =
            "✅ Туура жооп! Азаматсың! +10 упай";


        feedback.className =
            "feedback correct";


        selectedButton.classList.add(
            "correct"
        );

    }


    // --------------------------------------
    // ТУУРА ЭМЕС ЖООП
    // --------------------------------------

    else {

        feedback.textContent =
            "❌ Туура эмес. Туура жооп: " +
            question.answer;


        feedback.className =
            "feedback wrong";


        selectedButton.classList.add(
            "wrong"
        );


        // Туура жоопту жашыл көрсөтүү

        buttons.forEach(
            function(button) {

                if (
                    button.textContent ===
                    question.answer
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );

    }


    quizNext.style.display =
        "block";

}


// ------------------------------------------
// Кийинки суроо
// ------------------------------------------

function nextQuestion() {

    questionIndex++;


    if (
        questionIndex <
        questions.length
    ) {

        loadQuestion();

    }

    else {

        finishLesson();

    }

}


// ------------------------------------------
// Сабакты бүтүрүү
// ------------------------------------------

function finishLesson() {

    showStep(4);


    const finalScore =
        document.getElementById(
            "finalScore"
        );


    const correctCount =
        document.getElementById(
            "correctCount"
        );


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


    // --------------------------------------
    // Азырынча localStorage
    // Кийин Firebase болот
    // --------------------------------------

    localStorage.setItem(
        "tilbil_lesson3_score",
        score
    );


    localStorage.setItem(
        "tilbil_lesson3_correct",
        correctAnswers
    );


    localStorage.setItem(
        "tilbil_lesson3_completed",
        "true"
    );


    // --------------------------------------
    // Жалпы упай
    // --------------------------------------

    const oldTotal =
        Number(
            localStorage.getItem(
                "tilbil_total_score"
            )
        ) || 0;


    localStorage.setItem(
        "tilbil_total_score",
        oldTotal + score
    );

}


// ------------------------------------------
// Сабакты кайра баштоо
// ------------------------------------------

function restartLesson() {

    currentStep = 1;

    questionIndex = 0;

    score = 0;

    correctAnswers = 0;

    answered = false;


    showStep(1);

}


// ------------------------------------------
// Барак ачылганда
// ------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateProgress();

    }
);