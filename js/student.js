// ==========================================
// TilBil — Student Cabinet + Firebase
// ==========================================

function waitForFirebase() {
    return new Promise((resolve, reject) => {

        let attempts = 0;

        const timer = setInterval(() => {

            attempts++;

            if (
                typeof firebase !== "undefined" &&
                window.tilbilAuth &&
                window.tilbilDB
            ) {
                clearInterval(timer);
                resolve();
            }

            if (attempts >= 100) {
                clearInterval(timer);
                reject(new Error("Firebase жүктөлгөн жок."));
            }

        }, 100);
    });
}


// ==========================================
// Барак ачылганда
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await waitForFirebase();

        const auth = window.tilbilAuth;

        // Учурдагы колдонуучуну текшерүү
        auth.onAuthStateChanged(async (user) => {

            if (!user) {

                // Кирбеген адамды login.htmlге жөнөтөбүз
                window.location.href = "login.html";
                return;
            }

            console.log("👤 Кирген окуучу:", user.email);

            await loadStudentData(user);

        });

    } catch (error) {

        console.error(
            "Firebase катасы:",
            error
        );

    }

});


// ==========================================
// Окуучунун маалыматтарын Firebase'ден алуу
// ==========================================

async function loadStudentData(user) {

    try {

        const userRef = window.tilbilDB
            .collection("users")
            .doc(user.uid);

        const document = await userRef.get();

        let data;

        if (document.exists) {

            data = document.data();

        } else {

            // Эгер документ жок болсо, түзүп коёбуз
            data = {
                uid: user.uid,
                name: user.displayName || "TilBil окуучусу",
                email: user.email,

                totalScore: 0,
                level: 1,
                streak: 0,

                completedLessons: [],

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp()
            };

            await userRef.set(data);
        }


        // Маалыматты экранга чыгаруу
        updateStudentPage(data);

    } catch (error) {

        console.error(
            "Окуучунун маалыматтарын алуу катасы:",
            error
        );

    }
}


// ==========================================
// Экранды жаңыртуу
// ==========================================

function updateStudentPage(data) {

    const name =
        data.name || "TilBil окуучусу";

    const totalScore =
        Number(data.totalScore) || 0;

    const streak =
        Number(data.streak) || 0;

    const completedLessons =
        Array.isArray(data.completedLessons)
            ? data.completedLessons
            : [];


    // Деңгээл
    const level =
        Math.floor(totalScore / 100) + 1;

    const levelScore =
        totalScore % 100;


    // ==========================================
    // Аты-жөнү
    // ==========================================

    const nameElements = document.querySelectorAll(
        "#studentName, .student-name"
    );

    nameElements.forEach(element => {
        element.textContent = name;
    });


    // ==========================================
    // Деңгээл
    // ==========================================

    const levelElements = document.querySelectorAll(
        "#studentLevel, .student-level"
    );

    levelElements.forEach(element => {
        element.textContent =
            `🏆 ${level}-деңгээл`;
    });


    // ==========================================
    // Жалпы упай
    // ==========================================

    const scoreElements = document.querySelectorAll(
        "#studentTotalScore, .student-total-score"
    );

    scoreElements.forEach(element => {
        element.textContent =
            `${totalScore} упай`;
    });


    // ==========================================
    // Серия
    // ==========================================

    const streakElements = document.querySelectorAll(
        "#studentStreak, .student-streak"
    );

    streakElements.forEach(element => {
        element.textContent =
            `${streak} күн`;
    });


    // ==========================================
    // Сабактардын саны
    // ==========================================

    const lessonElements = document.querySelectorAll(
        "#completedLessons, .completed-lessons"
    );

    lessonElements.forEach(element => {
        element.textContent =
            completedLessons.length;
    });


    // ==========================================
    // Деңгээлдин прогресси
    // ==========================================

    const progressElements = document.querySelectorAll(
        "#levelProgress, .level-progress"
    );

    progressElements.forEach(element => {

        element.textContent =
            `${levelScore}/100`;

    });


    // Progress bar болсо
    const progressBars = document.querySelectorAll(
        ".progress-fill"
    );

    progressBars.forEach(bar => {

        bar.style.width =
            `${levelScore}%`;

    });


    // ==========================================
    // Сабактардын тизмеси
    // ==========================================

    const lessonNames = [
        "🔤 Тамгалар жана тыбыштар",
        "👋 Саламдашуу",
        "👨‍👩‍👧 Үй-бүлө",
        "🏠 Үй жана күнүмдүк жашоо",
        "🍎 Тамак-аш"
    ];


    const lessonContainer =
        document.getElementById("lessonProgressList");

    if (lessonContainer) {

        lessonContainer.innerHTML = "";

        for (let i = 0; i < lessonNames.length; i++) {

            const lessonNumber = i + 1;

            const completed =
                completedLessons.includes(
                    lessonNumber
                );

            const item =
                document.createElement("div");

            item.className =
                completed
                    ? "lesson-progress-item completed"
                    : "lesson-progress-item";


            item.innerHTML = `
                <span>
                    ${completed ? "✅" : "🔒"}
                    ${lessonNames[i]}
                </span>

                <strong>
                    ${completed ? "Аяктады" : "Баштала элек"}
                </strong>
            `;

            lessonContainer.appendChild(item);
        }
    }


    // ==========================================
    // Мотивация
    // ==========================================

    const message =
        document.getElementById("studentMessage");

    if (message) {

        if (totalScore === 0) {

            message.textContent =
                "🌱 Алгачкы сабагыңды башта!";

        } else if (totalScore < 100) {

            message.textContent =
                "🔥 Жакшы башталыш! Уланта бер!";

        } else if (totalScore < 300) {

            message.textContent =
                "🚀 Азаматсың! Дагы бир аз аракет кыл!";

        } else {

            message.textContent =
                "🏆 Мыкты! Кыргыз тилин жакшы өздөштүрүп жатасың!";
        }
    }


    console.log(
        "✅ Student page жаңыртылды"
    );
}


// ==========================================
// Firebase аккаунттан чыгуу
// ==========================================

async function logoutStudent() {

    try {

        await waitForFirebase();

        await window.tilbilAuth.signOut();

        window.location.href =
            "login.html";

    } catch (error) {

        console.error(
            "Чыгуу катасы:",
            error
        );

        alert(
            "❌ Аккаунттан чыгууда ката кетти."
        );
    }
}