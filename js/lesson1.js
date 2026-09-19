// ==========================================
// TilBil — 1-сабак
// Firebase Progress
// ==========================================

let currentStep = 1;
let questionIndex = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;


// ==========================================
// Суроолор
// ==========================================

const questions = [
    {
        question: "Кайсы тамга үндүү?",
        answers: ["М", "А", "Т", "Н"],
        correct: 1
    },

    {
        question: "Кайсы тамга үндүү?",
        answers: ["К", "Ө", "С", "Б"],
        correct: 1
    },

    {
        question: "«Ата» сөзүндө канча үндүү бар?",
        answers: ["1", "2", "3", "4"],
        correct: 1
    },

    {
        question: "Кыргыз тилине мүнөздүү тамганы тап.",
        answers: ["Ө", "В", "Ц", "Щ"],
        correct: 0
    },

    {
        question: "«Үй» сөзү кайсы тамга менен башталат?",
        answers: ["У", "Ү", "И", "Й"],
        correct: 1
    }
];


// ==========================================
// Прогресс
// ==========================================

function updateProgress() {

    const progress =
        document.getElementById("lessonProgress");

    if (!progress) return;

    progress.textContent =
        `Кадам ${currentStep}/4`;
}


// ==========================================
// Кадам көрсөтүү
// ==========================================

function showStep(step) {

    currentStep = step;

    document
        .querySelectorAll(".lesson-step")
        .forEach(element => {
            element.style.display = "none";
        });

    const selectedStep =
        document.getElementById(`step${step}`);

    if (selectedStep) {
        selectedStep.style.display = "block";
    }

    updateProgress();
}


// ==========================================
// Кийинки кадам
// ==========================================

function nextStep() {

    if (currentStep < 4) {

        currentStep++;

        showStep(currentStep);

        if (currentStep === 3) {
            loadQuestion();
        }
    }
}


// ==========================================
// Суроону жүктөө
// ==========================================

function loadQuestion() {

    const question =
        questions[questionIndex];

    if (!question) return;

    answered = false;

    const questionText =
        document.getElementById("questionText");

    const answersContainer =
        document.getElementById("answers");

    const nextButton =
        document.getElementById("nextQuestionButton");

    if (questionText) {
        questionText.textContent =
            question.question;
    }

    if (answersContainer) {

        answersContainer.innerHTML = "";

        question.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.textContent =
                    answer;

                button.onclick = () =>
                    checkAnswer(index);

                answersContainer.appendChild(button);
            }
        );
    }

    if (nextButton) {
        nextButton.style.display = "none";
    }

    const number =
        document.getElementById("questionNumber");

    if (number) {

        number.textContent =
            `${questionIndex + 1}/${questions.length}`;
    }
}


// ==========================================
// Жоопту текшерүү
// ==========================================

function checkAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const question =
        questions[questionIndex];

    const buttons =
        document.querySelectorAll(
            "#answers button"
        );

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selectedIndex === question.correct) {

        score += 10;
        correctAnswers++;

        buttons[selectedIndex].textContent +=
            " ✅";

    } else {

        buttons[selectedIndex].textContent +=
            " ❌";

        buttons[question.correct].textContent +=
            " ✅";
    }


    const nextButton =
        document.getElementById(
            "nextQuestionButton"
        );

    if (nextButton) {
        nextButton.style.display = "block";
    }
}


// ==========================================
// Кийинки суроо
// ==========================================

function nextQuestion() {

    if (!answered) return;

    questionIndex++;

    if (questionIndex < questions.length) {

        loadQuestion();

    } else {

        finishLesson();
    }
}


// ==========================================
// Firebase'ге прогрессти сактоо
// ==========================================

async function saveLessonProgress() {

    try {

        // Firebase даяр болушун күтөбүз
        if (
            typeof firebase === "undefined" ||
            !window.tilbilAuth ||
            !window.tilbilDB
        ) {

            console.log(
                "Firebase азырынча даяр эмес."
            );

            return;
        }


        const user =
            window.tilbilAuth.currentUser;

        if (!user) {

            console.log(
                "Колдонуучу кире элек."
            );

            return;
        }


        const userRef =
            window.tilbilDB
                .collection("users")
                .doc(user.uid);


        const userDoc =
            await userRef.get();


        const oldData =
            userDoc.exists
                ? userDoc.data()
                : {};


        let completedLessons =
            Array.isArray(
                oldData.completedLessons
            )
                ? oldData.completedLessons
                : [];


        // 1-сабакты тизмеге кошобуз
        if (!completedLessons.includes(1)) {

            completedLessons.push(1);
        }


        const oldTotalScore =
            Number(oldData.totalScore) || 0;


        // Бул сабак биринчи жолу бүтсө гана упай кошобуз
        const alreadyCompleted =
            Array.isArray(oldData.completedLessons) &&
            oldData.completedLessons.includes(1);


        let newTotalScore =
            oldTotalScore;


        if (!alreadyCompleted) {

            newTotalScore =
                oldTotalScore + score;
        }


        const newLevel =
            Math.floor(
                newTotalScore / 100
            ) + 1;


        await userRef.set({

            totalScore: newTotalScore,

            level: newLevel,

            completedLessons:
                completedLessons,

            lesson1: {
                score: score,
                correctAnswers: correctAnswers,
                totalQuestions: questions.length,
                completed: true,
                completedAt:
                    firebase.firestore.FieldValue.serverTimestamp()
            }

        }, {

            merge: true

        });


        // Жергиликтүү маалыматты да сактап коёбуз
        localStorage.setItem(
            "tilbil_lesson1_score",
            score
        );

        localStorage.setItem(
            "tilbil_lesson1_correct",
            correctAnswers
        );

        localStorage.setItem(
            "tilbil_lesson1_completed",
            "true"
        );

        localStorage.setItem(
            "tilbil_total_score",
            newTotalScore
        );


        console.log(
            "🔥 1-сабак Firebase'ге сакталды!"
        );


    } catch (error) {

        console.error(
            "Firebase сактоо катасы:",
            error
        );
    }
}


// ==========================================
// Сабакты бүтүрүү
// ==========================================

async function finishLesson() {

    currentStep = 4;

    showStep(4);


    const finalScore =
        document.getElementById("finalScore");

    const finalCorrect =
        document.getElementById("finalCorrect");


    if (finalScore) {
        finalScore.textContent =
            `${score} упай`;
    }


    if (finalCorrect) {
        finalCorrect.textContent =
            `${correctAnswers}/${questions.length}`;
    }


    await saveLessonProgress();
}


// ==========================================
// Сабакты кайра баштоо
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
// Баштапкы абал
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showStep(1);

        console.log(
            "📚 1-сабак даяр!"
        );
    }
);