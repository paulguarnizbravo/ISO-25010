/* =====================================================
   VARIABLES DEL JUEGO
===================================================== */

let currentQuestions = [];

let currentQuestion = 0;

let score = 0;

let correctCount = 0;

let wrongCount = 0;

let streak = 0;

let lives = 3;

let currentMode = "";

let timerInterval = null;

let timeLeft = 20;

let answered = false;


/* =====================================================
   ELEMENTOS
===================================================== */

const scoreElement =
    document.getElementById("score");

const streakElement =
    document.getElementById("streak");

const bestScoreElement =
    document.getElementById("bestScore");


/* =====================================================
   PUNTUACIÓN GUARDADA
===================================================== */

function getBestScore() {

    return Number(
        localStorage.getItem("iso25010BestScore") || 0
    );

}


function updateHeader() {

    scoreElement.textContent = score;

    streakElement.textContent = streak;

    bestScoreElement.textContent =
        getBestScore();
}


updateHeader();


/* =====================================================
   CAMBIAR PANTALLA
===================================================== */

function showSection(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   GENERAR CARACTERÍSTICAS
===================================================== */

function loadCharacteristics() {

    const grid =
        document.getElementById(
            "characteristicsGrid"
        );


    grid.innerHTML = "";


    characteristics.forEach(characteristic => {

        const card =
            document.createElement("div");


        card.className =
            "characteristic-card";


        card.onclick = () =>
            showCharacteristic(
                characteristic.id
            );


        card.innerHTML = `

            <div class="characteristic-number">
                CARACTERÍSTICA ${characteristic.id}
            </div>

            <h3>
                ${characteristic.icon}
                ${characteristic.name}
            </h3>

            <p>
                ${characteristic.description}
            </p>

            <div class="sub-count">
                ${characteristic.subcategories.length}
                subcaracterísticas →
            </div>

        `;


        grid.appendChild(card);

    });

}


loadCharacteristics();


/* =====================================================
   MOSTRAR DETALLE
===================================================== */

function showCharacteristic(id) {

    const characteristic =
        characteristics.find(
            item => item.id === id
        );


    const content =
        document.getElementById(
            "detailContent"
        );


    content.innerHTML = `

        <div class="detail-header">

            <div class="badge">
                CARACTERÍSTICA ${characteristic.id}
            </div>

            <h2>
                ${characteristic.icon}
                ${characteristic.name}
            </h2>

            <p>
                ${characteristic.description}
            </p>

        </div>


        <div class="sub-list">

            ${characteristic.subcategories
                .map((sub, index) => `

                <div class="sub-card">

                    <div class="characteristic-number">
                        SUBCARACTERÍSTICA ${index + 1}
                    </div>

                    <h3>
                        ${sub.name}
                    </h3>

                    <p>
                        ${sub.description}
                    </p>

                    <div class="example">
                        <strong>💡 Ejemplo:</strong><br>
                        ${sub.example}
                    </div>

                </div>

            `)
            .join("")}

        </div>

    `;


    showSection("detailScreen");

}


/* =====================================================
   INICIAR JUEGO
===================================================== */

function startGame(mode) {

    currentMode = mode;

    score = 0;

    correctCount = 0;

    wrongCount = 0;

    streak = 0;

    lives = 3;

    currentQuestion = 0;


    let filtered =
        questions.filter(
            question =>
                question.type === mode
        );


    /* Si el examen usa todas */

    if (mode === "exam") {

        filtered = [...questions];

    }


    currentQuestions =
        shuffle([...filtered])
        .slice(0, 10);


    showSection("gameScreen");


    setupGame();


    loadQuestion();

}


/* =====================================================
   CONFIGURAR JUEGO
===================================================== */

function setupGame() {

    document
        .getElementById("timerBox")
        .classList.toggle(
            "hidden",
            currentMode !== "quick"
        );


    updateLives();

    updateHeader();

}


/* =====================================================
   CARGAR PREGUNTA
===================================================== */

function loadQuestion() {

    clearInterval(timerInterval);

    answered = false;


    if (
        currentQuestion >=
        currentQuestions.length
    ) {

        finishGame();

        return;

    }


    const question =
        currentQuestions[
            currentQuestion
        ];


    const total =
        currentQuestions.length;


    document.getElementById(
        "questionCounter"
    ).textContent =
        `Pregunta ${currentQuestion + 1} / ${total}`;


    document.getElementById(
        "progressBar"
    ).style.width =
        `${(currentQuestion / total) * 100}%`;


    document.getElementById(
        "questionType"
    ).textContent =
        getQuestionTypeName(
            question.type
        );


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    document.getElementById(
        "questionDescription"
    ).textContent =
        "Selecciona la respuesta correcta.";


    document
        .getElementById("feedback")
        .className =
        "feedback hidden";


    document
        .getElementById("nextBtn")
        .classList.add("hidden");


    createAnswers(question);


    if (currentMode === "quick") {

        startTimer();

    }

}


/* =====================================================
   TIPO DE PREGUNTA
===================================================== */

function getQuestionTypeName(type) {

    const names = {

        characteristic:
            "🎯 IDENTIFICA LA CARACTERÍSTICA",

        subcategory:
            "🔎 IDENTIFICA LA SUBCARACTERÍSTICA",

        cases:
            "🏢 CASO PRÁCTICO"

    };


    if (currentMode === "exam") {

        return "📝 EXAMEN FINAL";

    }


    return names[type] || "PREGUNTA";

}


/* =====================================================
   CREAR RESPUESTAS
===================================================== */

function createAnswers(question) {

    const answers =
        document.getElementById(
            "answers"
        );


    answers.innerHTML = "";


    let options;


    if (question.type === "characteristic") {

        options =
            characteristics.map(
                item => item.name
            );

    }

    else {

        options =
            characteristics
                .flatMap(
                    item =>
                        item.subcategories
                            .map(
                                sub =>
                                    sub.name
                            )
                );

    }


    options =
        shuffle(
            options.filter(
                option =>
                    option !==
                    question.correct
            )
        )
        .slice(0, 3);


    options.push(question.correct);


    options = shuffle(options);


    options.forEach(option => {

        const button =
            document.createElement("button");


        button.className =
            "answer-btn";


        button.textContent =
            option;


        button.onclick = () =>
            checkAnswer(
                button,
                option,
                question
            );


        answers.appendChild(button);

    });

}


/* =====================================================
   COMPROBAR RESPUESTA
===================================================== */

function checkAnswer(
    button,
    selected,
    question
) {

    if (answered) return;

    answered = true;

    clearInterval(timerInterval);


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(btn => {

        btn.classList.add("disabled");

    });


    const feedback =
        document.getElementById(
            "feedback"
        );


    if (
        selected ===
        question.correct
    ) {

        button.classList.add("correct");


        correctCount++;

        streak++;


        const points =
            100 +
            ((streak - 1) * 25);


        score += points;


        feedback.className =
            "feedback correct-feedback";


        feedback.innerHTML = `

            <strong>✅ ¡Correcto!</strong>

            <br>

            +${points} puntos

            <br><br>

            ${question.explanation}

        `;

    }

    else {

        button.classList.add("wrong");


        buttons.forEach(btn => {

            if (
                btn.textContent ===
                question.correct
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        });


        wrongCount++;

        streak = 0;

        lives--;


        feedback.className =
            "feedback wrong-feedback";


        feedback.innerHTML = `

            <strong>❌ Incorrecto</strong>

            <br><br>

            La respuesta correcta es:

            <strong>
                ${question.correct}
            </strong>

            <br><br>

            ${question.explanation}

        `;


        updateLives();

    }


    feedback.classList.remove(
        "hidden"
    );


    document
        .getElementById("nextBtn")
        .classList.remove("hidden");


    updateHeader();


    if (lives <= 0) {

        document.getElementById(
            "nextBtn"
        ).textContent =
            "Ver resultado →";

    }

}


/* =====================================================
   SIGUIENTE PREGUNTA
===================================================== */

function nextQuestion() {

    if (lives <= 0) {

        finishGame();

        return;

    }


    currentQuestion++;

    loadQuestion();

}


/* =====================================================
   VIDAS
===================================================== */

function updateLives() {

    const container =
        document.getElementById(
            "lives"
        );


    let result = "";


    for (let i = 0; i < 3; i++) {

        result +=
            i < lives
                ? "❤️ "
                : "🖤 ";

    }


    container.textContent =
        result;

}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    timeLeft = 20;


    const timer =
        document.getElementById(
            "timer"
        );


    timer.textContent =
        timeLeft;


    timerInterval =
        setInterval(() => {

            timeLeft--;


            timer.textContent =
                timeLeft;


            if (timeLeft <= 0) {

                clearInterval(
                    timerInterval
                );


                if (!answered) {

                    handleTimeout();

                }

            }

        }, 1000);

}


/* =====================================================
   TIEMPO AGOTADO
===================================================== */

function handleTimeout() {

    answered = true;

    wrongCount++;

    streak = 0;

    lives--;


    const question =
        currentQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(button => {

        button.classList.add(
            "disabled"
        );


        if (
            button.textContent ===
            question.correct
        ) {

            button.classList.add(
                "correct"
            );

        }

    });


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "feedback wrong-feedback";


    feedback.innerHTML = `

        <strong>⏰ ¡Tiempo agotado!</strong>

        <br><br>

        La respuesta correcta era:

        <strong>
            ${question.correct}
        </strong>

        <br><br>

        ${question.explanation}

    `;


    feedback.classList.remove(
        "hidden"
    );


    document
        .getElementById("nextBtn")
        .classList.remove(
            "hidden"
        );


    updateLives();

    updateHeader();

}


/* =====================================================
   FINALIZAR
===================================================== */

function finishGame() {

    clearInterval(timerInterval);


    const total =
        currentQuestions.length;


    const accuracy =
        total > 0
            ? Math.round(
                (correctCount / total) *
                100
            )
            : 0;


    const bestScore =
        getBestScore();


    if (score > bestScore) {

        localStorage.setItem(
            "iso25010BestScore",
            score
        );

    }


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "correctAnswers"
    ).textContent =
        correctCount;


    document.getElementById(
        "wrongAnswers"
    ).textContent =
        wrongCount;


    document.getElementById(
        "accuracy"
    ).textContent =
        `${accuracy}%`;


    let title;

    let message;

    let icon;


    if (accuracy >= 90) {

        title = "¡Experto ISO 25010!";

        message =
            "Dominas muy bien las características y subcaracterísticas.";

        icon = "🏆";

    }

    else if (accuracy >= 70) {

        title = "¡Muy buen trabajo!";

        message =
            "Tienes un buen dominio de ISO/IEC 25010.";

        icon = "🥇";

    }

    else if (accuracy >= 50) {

        title = "¡Buen intento!";

        message =
            "Ya tienes una base, pero todavía puedes mejorar.";

        icon = "🥈";

    }

    else {

        title = "¡Sigue practicando!";

        message =
            "Revisa las características y vuelve a intentarlo.";

        icon = "📚";

    }


    document.getElementById(
        "resultTitle"
    ).textContent =
        title;


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;


    document.getElementById(
        "resultIcon"
    ).textContent =
        icon;


    updateHeader();


    showSection(
        "resultScreen"
    );

}


/* =====================================================
   REINICIAR
===================================================== */

function restartGame() {

    startGame(currentMode);

}


/* =====================================================
   CONFIRMAR SALIDA
===================================================== */

function confirmExit() {

    const exit =
        confirm(
            "¿Seguro que quieres salir del juego? Perderás el progreso de esta partida."
        );


    if (exit) {

        clearInterval(
            timerInterval
        );

        showSection(
            "homeScreen"
        );

    }

}


/* =====================================================
   MEZCLAR ARRAY
===================================================== */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            const game =
                document.getElementById(
                    "gameScreen"
                );


            if (
                game.classList.contains(
                    "active"
                )
            ) {

                confirmExit();

            }

        }

    }
);


/* =====================================================
   INICIALIZACIÓN
===================================================== */

updateHeader();

loadCharacteristics();