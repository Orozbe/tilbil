// ==========================================
// TilBil — Firebase Authentication
// ==========================================

let firebaseReady = false;


// Firebase толук жүктөлгөнчө күтөбүз
function waitForFirebase() {
    return new Promise((resolve, reject) => {

        let attempts = 0;

        const check = setInterval(() => {

            attempts++;

            if (
                typeof firebase !== "undefined" &&
                window.tilbilAuth &&
                window.tilbilDB
            ) {
                firebaseReady = true;
                clearInterval(check);
                resolve();
            }

            // 10 секунддан ашык күтпөйбүз
            if (attempts >= 100) {
                clearInterval(check);
                reject(new Error("Firebase жүктөлгөн жок."));
            }

        }, 100);
    });
}


// ==========================================
// Билдирүү көрсөтүү
// ==========================================

function showAuthMessage(message, type = "info") {

    const box = document.getElementById("authMessage");

    if (!box) return;

    box.style.display = "block";
    box.textContent = message;

    if (type === "success") {
        box.style.border = "1px solid #2e7d32";
    } else if (type === "error") {
        box.style.border = "1px solid #d32f2f";
    } else {
        box.style.border = "1px solid #1976d2";
    }

    box.style.padding = "12px";
    box.style.borderRadius = "10px";
}


// ==========================================
// Кирүү / Катталуу формаларын которуу
// ==========================================

function showLoginForm() {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.style.display = "block";
    }

    if (registerForm) {
        registerForm.style.display = "none";
    }

    const message = document.getElementById("authMessage");

    if (message) {
        message.style.display = "none";
    }
}


function showRegisterForm() {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.style.display = "none";
    }

    if (registerForm) {
        registerForm.style.display = "block";
    }

    const message = document.getElementById("authMessage");

    if (message) {
        message.style.display = "none";
    }
}


// ==========================================
// КАТТАЛУУ
// ==========================================

async function registerUser(event) {

    event.preventDefault();

    const name = document
        .getElementById("registerName")
        .value
        .trim();

    const email = document
        .getElementById("registerEmail")
        .value
        .trim();

    const password = document
        .getElementById("registerPassword")
        .value;

    if (!name || !email || !password) {
        showAuthMessage(
            "❌ Бардык талааларды толтуруңуз.",
            "error"
        );
        return;
    }

    if (password.length < 6) {
        showAuthMessage(
            "❌ Сырсөз кеминде 6 символ болушу керек.",
            "error"
        );
        return;
    }

    try {

        showAuthMessage(
            "⏳ Аккаунт түзүлүүдө...",
            "info"
        );

        await waitForFirebase();

        // Firebase Authentication аркылуу аккаунт түзүү
        const userCredential =
            await window.tilbilAuth.createUserWithEmailAndPassword(
                email,
                password
            );

        const user = userCredential.user;


        // Колдонуучунун атын Firebase Authentication'ге сактоо
        await user.updateProfile({
            displayName: name
        });


        // Firestore'го окуучунун маалыматтарын сактоо
        await window.tilbilDB
            .collection("users")
            .doc(user.uid)
            .set({
                uid: user.uid,
                name: name,
                email: email,

                totalScore: 0,
                level: 1,
                streak: 0,

                completedLessons: [],

                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });


        showAuthMessage(
            "✅ Аккаунт ийгиликтүү түзүлдү! Жеке кабинетиңиз ачылууда...",
            "success"
        );


        // Жеке кабинетке жөнөтүү
        setTimeout(() => {
            window.location.href = "student.html";
        }, 1200);


    } catch (error) {

        console.error("Катталуу катасы:", error);

        let message = "❌ Катталууда ката кетти.";

        if (error.code === "auth/email-already-in-use") {
            message = "❌ Бул Email менен аккаунт мурунтан бар.";
        }

        else if (error.code === "auth/invalid-email") {
            message = "❌ Email дареги туура эмес.";
        }

        else if (error.code === "auth/weak-password") {
            message = "❌ Сырсөз өтө начар. Кеминде 6 символ жазыңыз.";
        }

        else if (error.code === "auth/network-request-failed") {
            message = "❌ Интернет байланышын текшериңиз.";
        }

        showAuthMessage(message, "error");
    }
}


// ==========================================
// КИРҮҮ
// ==========================================

async function loginUser(event) {

    event.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value
        .trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    if (!email || !password) {
        showAuthMessage(
            "❌ Email жана сырсөздү жазыңыз.",
            "error"
        );
        return;
    }

    try {

        showAuthMessage(
            "⏳ Кирүү текшерилүүдө...",
            "info"
        );

        await waitForFirebase();


        await window.tilbilAuth
            .signInWithEmailAndPassword(
                email,
                password
            );


        showAuthMessage(
            "✅ Ийгиликтүү кирдиңиз! Жеке кабинет ачылууда...",
            "success"
        );


        setTimeout(() => {
            window.location.href = "student.html";
        }, 1000);


    } catch (error) {

        console.error("Кирүү катасы:", error);

        let message = "❌ Email же сырсөз туура эмес.";

        if (error.code === "auth/user-not-found") {
            message = "❌ Мындай аккаунт табылган жок.";
        }

        else if (error.code === "auth/wrong-password") {
            message = "❌ Сырсөз туура эмес.";
        }

        else if (error.code === "auth/invalid-credential") {
            message = "❌ Email же сырсөз туура эмес.";
        }

        else if (error.code === "auth/invalid-email") {
            message = "❌ Email дареги туура эмес.";
        }

        else if (error.code === "auth/too-many-requests") {
            message = "⚠️ Көп жолу аракет жасалды. Бир аздан кийин кайра аракет кылыңыз.";
        }

        showAuthMessage(message, "error");
    }
}


// ==========================================
// ЧЫГУУ
// ==========================================

async function logoutUser() {

    try {

        await waitForFirebase();

        await window.tilbilAuth.signOut();

        window.location.href = "index.html";

    } catch (error) {

        console.error("Чыгуу катасы:", error);

        alert("❌ Аккаунттан чыгууда ката кетти.");
    }
}


// ==========================================
// Колдонуучунун учурдагы аккаунтун алуу
// ==========================================

async function getCurrentUser() {

    try {

        await waitForFirebase();

        return window.tilbilAuth.currentUser;

    } catch (error) {

        console.error(error);

        return null;
    }
}


// ==========================================
// Барак ачылганда Firebase даяр экенин текшерүү
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await waitForFirebase();

        console.log(
            "🔥 TilBil Authentication даяр!"
        );

    } catch (error) {

        console.error(
            "Firebase даяр эмес:",
            error
        );
    }

});