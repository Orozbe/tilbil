// ==========================================
// TILBIL — СӨЗДҮК
// ==========================================

const dictionary = [

    // 👨‍👩‍👧 ҮЙ-БҮЛӨ
    {
        word: "Ата",
        meaning: "Үй-бүлөдөгү эркек ата-эне.",
        example: "Менин атам мугалим.",
        category: "family"
    },
    {
        word: "Эне",
        meaning: "Баланын апасы.",
        example: "Менин энем даамдуу тамак жасайт.",
        category: "family"
    },
    {
        word: "Ага",
        meaning: "Өзүңдөн улуу эркек бир тууган.",
        example: "Менин агам университетте окуйт.",
        category: "family"
    },
    {
        word: "Ини",
        meaning: "Өзүңдөн кичүү эркек бир тууган.",
        example: "Менин иним мектепте окуйт.",
        category: "family"
    },
    {
        word: "Эже",
        meaning: "Өзүңдөн улуу кыз бир тууган.",
        example: "Эжем мага жардам берди.",
        category: "family"
    },
    {
        word: "Карындаш",
        meaning: "Эркек адамдын өзүнөн кичүү кыз бир тууганы.",
        example: "Менин карындашым бешинчи класста окуйт.",
        category: "family"
    },
    {
        word: "Үй-бүлө",
        meaning: "Бири-бири менен жакын байланышта жашаган адамдар.",
        example: "Мен үй-бүлөмдү жакшы көрөм.",
        category: "family"
    },
    {
        word: "Чоң ата",
        meaning: "Атанын же эненин атасы.",
        example: "Чоң атам айылда жашайт.",
        category: "family"
    },
    {
        word: "Чоң эне",
        meaning: "Атанын же эненин апасы.",
        example: "Чоң энем бизге жомок айтып берди.",
        category: "family"
    },
    {
        word: "Дос",
        meaning: "Сага жакын жана сени колдогон адам.",
        example: "Менин жакшы досум бар.",
        category: "family"
    },


    // 🏫 МЕКТЕП
    {
        word: "Мектеп",
        meaning: "Окуучулар билим алган билим берүү мекемеси.",
        example: "Мен мектепке эртең менен барам.",
        category: "school"
    },
    {
        word: "Мугалим",
        meaning: "Окуучуларга билим берген адам.",
        example: "Мугалим сабак түшүндүрдү.",
        category: "school"
    },
    {
        word: "Окуучу",
        meaning: "Мектепте билим алган бала.",
        example: "Окуучу тапшырманы аткарды.",
        category: "school"
    },
    {
        word: "Сабак",
        meaning: "Белгилүү бир предмет боюнча билим берүү процесси.",
        example: "Бүгүн информатика сабагы бар.",
        category: "school"
    },
    {
        word: "Китеп",
        meaning: "Маалымат же чыгарма жазылган басылма.",
        example: "Мен кызыктуу китеп окудум.",
        category: "school"
    },
    {
        word: "Дептер",
        meaning: "Жазуу үчүн колдонулган барактуу окуу куралы.",
        example: "Дептериме жаңы тема жаздым.",
        category: "school"
    },
    {
        word: "Калем",
        meaning: "Жазуу үчүн колдонулуучу окуу куралы.",
        example: "Мен көк калем менен жаздым.",
        category: "school"
    },
    {
        word: "Такта",
        meaning: "Сабак учурунда жазуу жана түшүндүрүү үчүн колдонулган жабдык.",
        example: "Мугалим тактага мисал жазды.",
        category: "school"
    },
    {
        word: "Билим",
        meaning: "Окуу жана тажрыйба аркылуу алынган маалымат.",
        example: "Билим адам үчүн абдан маанилүү.",
        category: "school"
    },
    {
        word: "Тапшырма",
        meaning: "Аткаруу үчүн берилген иш.",
        example: "Мен үй тапшырмамды аткардым.",
        category: "school"
    },


    // 🏠 ҮЙ
    {
        word: "Үй",
        meaning: "Адам жашаган турак жай.",
        example: "Биздин үй чоң.",
        category: "home"
    },
    {
        word: "Эшик",
        meaning: "Үйгө кирип-чыгуу үчүн колдонулган бөлүк.",
        example: "Эшикти акырын жап.",
        category: "home"
    },
    {
        word: "Терезе",
        meaning: "Бөлмөгө жарык жана аба киргизүүчү бөлүк.",
        example: "Терезеден күндүн нуру кирди.",
        category: "home"
    },
    {
        word: "Бөлмө",
        meaning: "Үйдүн ичиндеги өзүнчө жай.",
        example: "Менин бөлмөм жарык.",
        category: "home"
    },
    {
        word: "Стол",
        meaning: "Тамактануу же иштөө үчүн колдонулган эмерек.",
        example: "Китеп столдун үстүндө турат.",
        category: "home"
    },
    {
        word: "Отургуч",
        meaning: "Отуруу үчүн колдонулган эмерек.",
        example: "Отургучка отур.",
        category: "home"
    },
    {
        word: "Керебет",
        meaning: "Уктоо үчүн колдонулган эмерек.",
        example: "Бала керебетте уктап жатат.",
        category: "home"
    },
    {
        word: "Ашкана",
        meaning: "Тамак даярдалуучу жана тамактануучу жай.",
        example: "Апам ашканада тамак жасап жатат.",
        category: "home"
    },
    {
        word: "Шыпыргы",
        meaning: "Үйдү тазалоо үчүн колдонулуучу буюм.",
        example: "Шыпыргы менен бөлмөнү тазаладым.",
        category: "home"
    },
    {
        word: "Короо",
        meaning: "Үйдүн айланасындагы ачык жер.",
        example: "Балдар короодо ойноп жатышат.",
        category: "home"
    },


    // 🌳 ЖАРАТЫЛЫШ
    {
        word: "Жаратылыш",
        meaning: "Адамды курчап турган табигый дүйнө.",
        example: "Жаратылышты коргоо керек.",
        category: "nature"
    },
    {
        word: "Дарак",
        meaning: "Сөңгөгү жана бутактары бар өсүмдүк.",
        example: "Короо-колотко дарактар отургузулду.",
        category: "nature"
    },
    {
        word: "Гүл",
        meaning: "Өсүмдүктүн кооз бөлүгү.",
        example: "Бакта кызыл гүлдөр өсүп жатат.",
        category: "nature"
    },
    {
        word: "Суу",
        meaning: "Адамдар, жаныбарлар жана өсүмдүктөр үчүн зарыл болгон суюктук.",
        example: "Таза суу ичүү пайдалуу.",
        category: "nature"
    },
    {
        word: "Тоо",
        meaning: "Жер бетинин бийик көтөрүлгөн бөлүгү.",
        example: "Кыргызстанда бийик тоолор көп.",
        category: "nature"
    },
    {
        word: "Дарыя",
        meaning: "Белгилүү нук менен агып жаткан табигый суу.",
        example: "Дарыянын суусу тунук экен.",
        category: "nature"
    },
    {
        word: "Көл",
        meaning: "Кургактык менен курчалган табигый суу.",
        example: "Ысык-Көл — Кыргызстандын белгилүү көлү.",
        category: "nature"
    },
    {
        word: "Күн",
        meaning: "Жерге жарык жана жылуулук берүүчү жылдыз.",
        example: "Күн бүгүн жаркырап турат.",
        category: "nature"
    },
    {
        word: "Ай",
        meaning: "Жердин табигый жандоочусу.",
        example: "Түнкүсүн ай асманда көрүндү.",
        category: "nature"
    },
    {
        word: "Жамгыр",
        meaning: "Булуттан жерге түшкөн суу тамчылары.",
        example: "Бүгүн жамгыр жаады.",
        category: "nature"
    },


    // 🍎 ТАМАК-АШ
    {
        word: "Нан",
        meaning: "Ундан жасалган негизги азыктардын бири.",
        example: "Нан дасторкондо турат.",
        category: "food"
    },
    {
        word: "Алма",
        meaning: "Мөмө берген дарактын жемиши.",
        example: "Мен кызыл алма жедим.",
        category: "food"
    },
    {
        word: "Сүт",
        meaning: "Айрым жаныбарлардан алынуучу ак түстөгү азык.",
        example: "Мен эртең менен сүт ичем.",
        category: "food"
    },
    {
        word: "Эт",
        meaning: "Жаныбарлардан алынган азык.",
        example: "Атам эт сатып алды.",
        category: "food"
    },
    {
        word: "Шорпо",
        meaning: "Суюк түрдө даярдалган тамак.",
        example: "Апам ысык шорпо жасады.",
        category: "food"
    },
    {
        word: "Күрүч",
        meaning: "Тамак жасоодо колдонулган дан азыгы.",
        example: "Апам күрүчтөн тамак жасады.",
        category: "food"
    },
    {
        word: "Картошка",
        meaning: "Тамакка колдонулган түймөк өсүмдүк.",
        example: "Картошкадан тамак жасадык.",
        category: "food"
    },
    {
        word: "Сабиз",
        meaning: "Кызгылт сары түстөгү жашылча.",
        example: "Сабиз ден соолукка пайдалуу.",
        category: "food"
    },
    {
        word: "Жашылча",
        meaning: "Тамак-ашка колдонулган өсүмдүк азыктары.",
        example: "Мен жашылча жегенди жакшы көрөм.",
        category: "food"
    },
    {
        word: "Мөмө",
        meaning: "Өсүмдүктөрдөн алынуучу ширелүү азык.",
        example: "Мөмө-жемиштер пайдалуу.",
        category: "food"
    },


    // 💬 КҮНҮМДҮК СӨЗДӨР
    {
        word: "Салам",
        meaning: "Учурашууда айтылган сөз.",
        example: "Салам, досум!",
        category: "daily"
    },
    {
        word: "Рахмат",
        meaning: "Ыраазычылык билдирген сөз.",
        example: "Жардамың үчүн рахмат.",
        category: "daily"
    },
    {
        word: "Сураныч",
        meaning: "Өтүнүч билдирүүдө колдонулган сөз.",
        example: "Сураныч, мага жардам бер.",
        category: "daily"
    },
    {
        word: "Кечиресиз",
        meaning: "Кечирим суроодо же сылык кайрылууда айтылган сөз.",
        example: "Кечиресиз, саат канча болду?",
        category: "daily"
    },
    {
        word: "Кандайсыз",
        meaning: "Адамдын абалын сураган сылык сөз.",
        example: "Саламатсызбы, кандайсыз?",
        category: "daily"
    },
    {
        word: "Мүмкүнчүлүк",
        meaning: "Бир нерсени жасоого болгон шарт же мүмкүнчүлүк.",
        example: "Бул жакшы билим алууга мүмкүнчүлүк.",
        category: "daily"
    },
    {
        word: "Максат",
        meaning: "Адам жетүүнү каалаган нерсе.",
        example: "Менин максатым жакшы окуу.",
        category: "daily"
    },
    {
        word: "Аракет",
        meaning: "Бир нерсеге жетүү үчүн жасалган аракет же иш.",
        example: "Максатка жетүү үчүн аракет кылуу керек.",
        category: "daily"
    },
    {
        word: "Жардам",
        meaning: "Бирөөгө колдоо көрсөтүү.",
        example: "Досум мага жардам берди.",
        category: "daily"
    },
    {
        word: "Кубаныч",
        meaning: "Адамдын сүйүнгөндөгү жакшы сезими.",
        example: "Жеңиш мага чоң кубаныч тартуулады.",
        category: "daily"
    }

];


// ==========================================
// БАРДЫК СӨЗДӨРДҮ КӨРСӨТҮҮ
// ==========================================

function showAllWords() {

    displayWords(dictionary);

}


// ==========================================
// СӨЗДӨРДҮ ЭКРАНГА ЧЫГАРУУ
// ==========================================

function displayWords(words) {

    const container =
        document.getElementById("dictionaryWords");

    const noResult =
        document.getElementById("noDictionaryResult");

    container.innerHTML = "";

    if (words.length === 0) {

        noResult.style.display = "block";

        return;

    }

    noResult.style.display = "none";


    words.forEach(item => {

        const card = document.createElement("div");

        card.className = "dictionary-card";

        card.innerHTML = `

            <div class="dictionary-word">

                <h2>📕 ${item.word}</h2>

                <button
                    class="speak-button"
                    onclick="speakWord('${item.word}')">

                    🔊

                </button>

            </div>

            <p>
                <strong>Мааниси:</strong>
                ${item.meaning}
            </p>

            <p>
                <strong>Мисал:</strong>
                «${item.example}»
            </p>

        `;

        container.appendChild(card);

    });

}


// ==========================================
// ИЗДӨӨ
// ==========================================

function searchDictionary() {

    const input =
        document.getElementById("dictionarySearch");

    const searchText =
        input.value.trim().toLowerCase();


    if (searchText === "") {

        showAllWords();

        return;

    }


    const results =
        dictionary.filter(item =>

            item.word.toLowerCase().includes(searchText) ||

            item.meaning.toLowerCase().includes(searchText) ||

            item.example.toLowerCase().includes(searchText)

        );


    displayWords(results);

}


// ==========================================
// КАТЕГОРИЯ БОЮНЧА ЧЫГАРУУ
// ==========================================

function filterCategory(category) {

    if (category === "all") {

        displayWords(dictionary);

        return;

    }


    const results =
        dictionary.filter(item =>
            item.category === category
        );


    displayWords(results);

}


// ==========================================
// СӨЗДҮ ҮН МЕНЕН ОКУУ
// ==========================================

function speakWord(word) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Бул браузер үн чыгарууну колдобойт."
        );

        return;

    }


    speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(word);

    speech.lang = "ky-KG";

    speech.rate = 0.8;

    speech.pitch = 1;


    speechSynthesis.speak(speech);

}


// ==========================================
// ENTER БАСЫЛГАНДА ИЗДӨӨ
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const search =
            document.getElementById("dictionarySearch");


        if (search) {

            search.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        searchDictionary();

                    }

                }
            );

        }


        // Башында бардык сөздөрдү көрсөтүү
        showAllWords();

    }
);