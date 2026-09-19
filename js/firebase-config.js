// Firebase SDK
const firebaseScript = document.createElement("script");
firebaseScript.src =
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js";
firebaseScript.onload = () => {
    const authScript = document.createElement("script");
    authScript.src =
        "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js";

    authScript.onload = () => {
        const firestoreScript = document.createElement("script");
        firestoreScript.src =
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js";

        firestoreScript.onload = () => {
            // Firebase конфигурациясы
            const firebaseConfig = {
                apiKey: "AIzaSyAdh3E8IJA1x0931hUV-Q4deYbTScCQEHQ",
                authDomain: "tilbil-8c92c.firebaseapp.com",
                projectId: "tilbil-8c92c",
                storageBucket: "tilbil-8c92c.firebasestorage.app",
                messagingSenderId: "483166308660",
                appId: "1:483166308660:web:35af7e92a3592708e57d61",
                measurementId: "G-ND32NY36WE"
            };

            // Firebase иштетүү
            firebase.initializeApp(firebaseConfig);

            // Authentication
            window.tilbilAuth = firebase.auth();

            // Firestore Database
            window.tilbilDB = firebase.firestore();

            console.log("🔥 TilBil Firebase ийгиликтүү туташты!");
        };

        document.head.appendChild(firestoreScript);
    };

    document.head.appendChild(authScript);
};

document.head.appendChild(firebaseScript);
