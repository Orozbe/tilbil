let gameQuestionIndex = 0;
let gameScore = 0;
let gameCorrect = 0;
let gameAnswered = false;

const gameQuestions = [
    {
        question: "«Алма» деген сөз кайсыны билдирет?",
        answers: ["Мөмө", "Ичимдик", "Эмерек", "Кийим"],
        correct: 0
    },

    {
        question: "«Салам!» деген сөз качан колдонулат?",
        answers: ["Коштошкондо", "Учурашканда", "Уктаганда", "Тамактанганда"],
        correct: 1
    },

    {
        question: "«Ата» деген ким?",
        answers: ["Апамдын апасы", "Менин атам", "Агамдын досу", "Мугалим"],
        correct: 1
    },

    {
        question: "«Үй» деген эмне?",
        answers: ["Адам жашаган жай", "Тамак", "Кийим", "Унаа"],
        correct: 0
    },

    {
        question: "«Сүттү» эмне кылабыз?",
        answers: ["Жейбиз", "Ичебиз", "Жазабыз", "Кийебиз"],
        correct: 1
    },

    {
        question: "«Кайырлуу таң!» деген сөз качан айтылат?",
        answers: ["Эртең менен", "Түнкүсүн", "Уктаганда", "Коштошкондо"],
        correct: 0
    },

    {
        question: "«Эже» деген ким?",
        answers: [
            "Улуу кыз бир тууган",
            "Ата",
            "Кичүү эркек бир тууган",
            "Чоң ата"
        ],
        correct: 0
    },

    {
        question: "«Терезе» эмне үчүн керек?",
        answers: [
            "Уктоо үчүн",
            "Жарык кирүү үчүн",
            "Тамак жасоо үчүн",
            "Окуу үчүн"
        ],
        correct: 1
    },

    {
        question: "«Мен студентмин» деген сүйлөм эмнени билдирет?",
        answers: [
            "Мен мугалиммин",
            "Мен студентмин",
            "Мен дарыгермин",
            "Мен окуучу эмесмин"
        ],
        correct: 1
    },

    {
        question: "Кайсынысы жашылча?",
        answers: ["Алма", "Сүт", "Сабиз", "Нан"],
        correct: 2
    }
];


// ===============================
// ОЮНДУ БАШТОО
// ===============================

function startGame() {

    gameQuestionIndex = 0;
    gameScore = 0;
    gameCorrect = 0;
    gameAnswered = false;

    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("gameFinished").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    document.getElementById("gameScore").textContent = "0";

    loadGameQuestion();
}


// ===============================
// СУРООНУ ЖҮКТӨӨ
// ===============================

function loadGameQuestion() {

    gameAnswered = false;

    const question = gameQuestions[gameQuestionIndex];

    const container = document.getElementById("gameQuestion");

    const result = document.getElementById("gameResult");

    const nextButton = document.getElementById("nextGameButton");


    document.getElementById("gameQuestionNumber").textContent =
        "Суроо " +
        (gameQuestionIndex + 1) +
        " / " +
        gameQuestions.length;


    const progress =
        ((gameQuestionIndex + 1) / gameQuestions.length) * 100;

    document.getElementById("gameProgress").style.width =
        progress + "%";


    result.innerHTML = "";

    nextButton.style.display = "none";


    container.innerHTML = `
        <div class="quiz-card">

            <div class="question-number">
                Суроо ${gameQuestionIndex + 1}
            </div>

            <h3>
                ${question.question}
            </h3>

            <div class="answers">

                ${question.answers.map((answer, index) => `
                    <button
                        class="answer-button"
                        onclick="checkGameAnswer(${index})">

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

function checkGameAnswer(selectedIndex) {

    if (gameAnswered) {
        return;
    }

    gameAnswered = true;


    const question =
        gameQuestions[gameQuestionIndex];


    const buttons =
        document.querySelectorAll(".answer-button");


    buttons.forEach((button, index) => {

        button.disabled = true;


        if (index === question.correct) {

            button.classList.add("correct");

        }


        if (
            index === selectedIndex &&
            selectedIndex !== question.correct
        ) {

            button.classList.add("wrong");

        }

    });


    const result =
        document.getElementById("gameResult");


    if (selectedIndex === question.correct) {

        gameScore += 10;
        gameCorrect++;


        result.innerHTML = `
            <div class="correct-message">

                ✅ Туура жооп!

                <br>

                ⭐ +10 упай

            </div>
        `;

    } else {

        result.innerHTML = `
            <div class="wrong-message">

                ❌ Туура эмес!

                <br>

                Туура жооп:
                <strong>
                    ${question.answers[question.correct]}
                </strong>

            </div>
        `;

    }


    document.getElementById("gameScore").textContent =
        gameScore;


    const nextButton =
        document.getElementById("nextGameButton");


    nextButton.style.display = "block";


    if (
        gameQuestionIndex ===
        gameQuestions.length - 1
    ) {

        nextButton.textContent =
            "Жыйынтыкты көрүү →";

    } else {

        nextButton.textContent =
            "Кийинки →";

    }
}


// ===============================
// КИЙИНКИ СУРОО
// ===============================

function nextGameQuestion() {

    if (!gameAnswered) {
        return;
    }


    gameQuestionIndex++;


    if (
        gameQuestionIndex <
        gameQuestions.length
    ) {

        loadGameQuestion();

    } else {

        finishGame();

    }
}


// ===============================
// ОЮНДУ АЯКТОО
// ===============================

function finishGame() {

    document.getElementById("gameArea").style.display =
        "none";

    document.getElementById("gameFinished").style.display =
        "block";


    document.getElementById("gameFinalScore").textContent =
        gameScore;


    document.getElementById("gameCorrect").textContent =
        gameCorrect + " / " + gameQuestions.length;


    const message =
        document.getElementById("gameFinalMessage");


    if (gameCorrect === 10) {

        message.textContent =
            "🏆 Мыкты! Бардык суроого туура жооп бердиң!";

    } else if (gameCorrect >= 7) {

        message.textContent =
            "👏 Азаматсың! Кыргыз тилин жакшы билесиң.";

    } else if (gameCorrect >= 5) {

        message.textContent =
            "👍 Жакшы! Дагы бир аз машык.";

    } else {

        message.textContent =
            "💪 Сабактарды кайталап, кайра аракет кыл!";

    }


    saveGameScore();
}


// ===============================
// УПАЙДЫ САКТОО
// ===============================

function saveGameScore() {

    localStorage.setItem(
        "tilbil_game_score",
        gameScore
    );


    localStorage.setItem(
        "tilbil_game_correct",
        gameCorrect
    );


    let totalScore =
        Number(
            localStorage.getItem(
                "tilbil_total_score"
            )
        ) || 0;


    totalScore += gameScore;


    localStorage.setItem(
        "tilbil_total_score",
        totalScore
    );

}


// ===============================
// ЖАКЫНДА БОЛОТ
// ===============================

function showComingSoon() {

    alert(
        "🚧 Бул оюн жакында кошулат!"
    );

}