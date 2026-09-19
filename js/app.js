/* =====================================================
   TILBIL
   Main JavaScript
   ===================================================== */


/* ================= ELEMENTS ================= */

const startButton = document.getElementById("startButton");
const dailyButton = document.getElementById("dailyButton");
const dailyStart = document.getElementById("dailyStart");
const loginButton = document.getElementById("loginButton");

const featureButtons = document.querySelectorAll(".feature-btn");


/* ================= START LEARNING ================= */

if (startButton) {

    startButton.addEventListener("click", function () {

        const lessonsSection = document.getElementById("lessons");

        if (lessonsSection) {

            lessonsSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* ================= DAILY TASK ================= */

function startDailyTask() {

    alert(
        "🔥 Задание дня\n\n" +
        "Выучите 5 новых кыргызских слов.\n\n" +
        "В следующем этапе здесь появится настоящее интерактивное задание."
    );

}


if (dailyButton) {

    dailyButton.addEventListener("click", startDailyTask);

}


if (dailyStart) {

    dailyStart.addEventListener("click", startDailyTask);

}


/* ================= LOGIN ================= */

if (loginButton) {

    loginButton.addEventListener("click", function () {

        alert(
            "👤 Личный кабинет\n\n" +
            "Система авторизации будет добавлена на следующем этапе."
        );

    });

}


/* ================= FEATURE BUTTONS ================= */

featureButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card = button.closest(".feature-card");

        if (!card) {
            return;
        }

        const title = card.querySelector("h3");

        if (!title) {
            return;
        }

        alert(
            "📚 Раздел: " +
            title.textContent.trim() +
            "\n\n" +
            "Этот раздел будет доступен в следующих этапах разработки TilBil."
        );

    });

});


/* ================= CONSOLE ================= */

console.log("🇰🇬 TilBil запущен успешно!");
console.log("📚 Платформа изучения кыргызского языка");
