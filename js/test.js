let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;

const questions = [

    {
        question: "«Балдарыбыздын» сөзүндө канча мүчө бар жана алардын ирети кайсы?",
        answers: [
            "2 мүчө: -дар, -ыбыз",
            "3 мүчө: -дар, -ыбыз, -дын",
            "3 мүчө: -лар, -ыбыз, -дын",
            "4 мүчө: -ба, -лар, -ыбыз, -дын"
        ],
        correct: 1
    },

    {
        question: "Кайсы сүйлөмдө шарттуу ыңгайдагы этиш колдонулган?",
        answers: [
            "Эгер убактым болсо, китеп окуйм.",
            "Мен бүгүн китеп окудум.",
            "Ал эртең мектепке барат.",
            "Балдар короодо ойноп жатышат."
        ],
        correct: 0
    },

    {
        question: "«Окуучулар тапшырманы кунт коюп аткарышты.» сүйлөмүндө «кунт коюп» кандай милдет аткарат?",
        answers: [
            "Ээ",
            "Баяндооч",
            "Аныктооч",
            "Бышыктооч"
        ],
        correct: 3
    },

    {
        question: "Кайсы вариантта сөз туура жазылган?",
        answers: [
            "жоопкерчиликтүү",
            "жоопкерчиликтүү",
            "жооп керчиликтүү",
            "жоопкерчилик туу"
        ],
        correct: 0
    },

    {
        question: "«Китепти окуган бала сынактан жогорку упай алды.» сүйлөмүндө «окуган» кайсы сөз түркүмүнө тиешелүү?",
        answers: [
            "Көсемче",
            "Атоочтук",
            "Туюк этиш",
            "Тактооч"
        ],
        correct: 1
    },

    {
        question: "Кайсы сүйлөмдө себеп мааниси туюнтулган?",
        answers: [
            "Жамгыр жаагандыктан, жол тайгак болду.",
            "Жамгыр жааса, үйдө калабыз.",
            "Жамгыр жаап, аба салкындады.",
            "Жамгыр жааган жол менен бардык."
        ],
        correct: 0
    },

    {
        question: "«Мугалимдин берген тапшырмасы баарына түшүнүктүү болду.» сүйлөмүндө «мугалимдин» сөзү кайсы жөндөмөдө турат?",
        answers: [
            "Атоо жөндөмө",
            "Барыш жөндөмө",
            "Илик жөндөмө",
            "Жатыш жөндөмө"
        ],
        correct: 2
    },

    {
        question: "Кайсы сүйлөмдө салыштырма маанидеги форма туура колдонулган?",
        answers: [
            "Бул китеп тигил китептен кызыктуураак.",
            "Бул китеп тигил китепке кызыктуураак.",
            "Бул китеп тигил китепти кызыктуураак.",
            "Бул китеп тигил китепте кызыктуураак."
        ],
        correct: 0
    },

    {
        question: "«Көп окусаң, көптү билесиң.» сүйлөмүнүн биринчи бөлүгү кандай маанини билдирет?",
        answers: [
            "Себеп",
            "Шарт",
            "Максат",
            "Каршылык"
        ],
        correct: 1
    },

    {
        question: "Кайсы сүйлөмдө кыймыл-аракеттин максаты туура туюнтулган?",
        answers: [
            "Ал сынакка катышуу үчүн көп даярданды.",
            "Ал сынакка катышкан үчүн көп даярданды.",
            "Ал сынакка катышып, көп даярданды.",
            "Ал сынакка катышканда көп даярданды."
        ],
        correct: 0
    }

];


// ===============================
// ТЕСТТИ БАШТОО
// ===============================

function startTest() {

    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    answered = false;

    document.getElementById("testStart").style.display = "none";
    document.getElementById("testArea").style.display = "block";
    document.getElementById("testResult").style.display = "none";

    showQuestion();
}


// ===============================
// СУРООНУ КӨРСӨТҮҮ
// ===============================

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        currentQuestion + 1;

    document.getElementById("testScore").textContent =
        score;

    document.getElementById("questionText").textContent =
        question.question;

    const answersBox = document.getElementById("answers");

    answersBox.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.onclick = function () {
            checkAnswer(index);
        };

        answersBox.appendChild(button);

    });

    document.getElementById("nextTestButton").style.display =
        "none";

    updateProgress();
}


// ===============================
// ЖООПТУ ТЕКШЕРҮҮ
// ===============================

function checkAnswer(selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];

    const buttons =
        document.querySelectorAll("#answers button");


    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }

        if (
            index === selectedAnswer &&
            index !== question.correct
        ) {
            button.classList.add("wrong");
        }

    });


    if (selectedAnswer === question.correct) {

        score += 10;
        correctAnswers++;

    }


    document.getElementById("testScore").textContent =
        score;

    document.getElementById("nextTestButton").style.display =
        "block";
}


// ===============================
// КИЙИНКИ СУРОО
// ===============================

function nextTestQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishTest();

    }
}


// ===============================
// ПРОГРЕСС
// ===============================

function updateProgress() {

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    const progressBar =
        document.getElementById("testProgress");

    progressBar.style.width =
        progress + "%";
}


// ===============================
// ТЕСТТИ АЯКТОО
// ===============================

function finishTest() {

    document.getElementById("testArea").style.display =
        "none";

    document.getElementById("testResult").style.display =
        "block";

    document.getElementById("finalScore").textContent =
        score;

    document.getElementById("correctCount").textContent =
        correctAnswers;


    let message = "";


    if (score === 100) {

        message =
            "🏆 Фантастикалык жыйынтык! Сен татаал кыргыз тилинин суроолорун мыкты билесиң!";

    }

    else if (score >= 80) {

        message =
            "🔥 Абдан жакшы! Кыргыз тилинин татаал темаларын жакшы өздөштүрүпсүң.";

    }

    else if (score >= 60) {

        message =
            "👍 Жакшы! Бирок татаал грамматикалык темаларды дагы кайталап көр.";

    }

    else if (score >= 40) {

        message =
            "📚 Орточо жыйынтык. Морфология жана синтаксис темаларын кайра карап чык.";

    }

    else {

        message =
            "💪 Татаал тест болду. Сабактарды кайталап, кайра аракет кыл.";

    }


    document.getElementById("resultMessage").textContent =
        message;


    // Упайды сактоо

    localStorage.setItem(
        "tilbil_test_score",
        score
    );

    localStorage.setItem(
        "tilbil_test_correct",
        correctAnswers
    );

    localStorage.setItem(
        "tilbil_test_completed",
        "true"
    );
}


// ===============================
// КАЙРА ТАПШЫРУУ
// ===============================

function restartTest() {

    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    answered = false;

    document.getElementById("testResult").style.display =
        "none";

    document.getElementById("testArea").style.display =
        "block";

    showQuestion();
}