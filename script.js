/* =========================
   INTRO
========================= */

const startButton = document.getElementById("startButton");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

startButton.addEventListener("click", () => {

    /* Iniciar la canción */
    audio.play().catch(() => {
        console.log("El navegador bloqueó el autoplay.");
    });

    intro.classList.add("hide");

    setTimeout(() => {

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 900);

});


/* =========================
   CONTADOR
========================= */

const startDate = new Date("2026-04-19T00:00:00");

function updateCounter() {

    const now = new Date();

    let totalSeconds =
        Math.floor((now - startDate) / 1000);

    if (totalSeconds < 0) {
        totalSeconds = 0;
    }

    const totalDays =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    let months =
        (now.getFullYear() - startDate.getFullYear()) * 12
        +
        (now.getMonth() - startDate.getMonth());


    if (
        now.getDate() < startDate.getDate()
    ) {
        months--;
    }

    if (months < 0) {
        months = 0;
    }


    document.getElementById("months").textContent =
        months;

    document.getElementById("days").textContent =
        totalDays;

    document.getElementById("hours").textContent =
        hours.toString().padStart(2, "0");

    document.getElementById("minutes").textContent =
        minutes.toString().padStart(2, "0");

    document.getElementById("seconds").textContent =
        seconds.toString().padStart(2, "0");

}

updateCounter();

setInterval(updateCounter, 1000);


/* =========================
   CORAZONES
========================= */

const heartsContainer =
    document.getElementById("hearts");

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML =
        Math.random() > .5 ? "♡" : "♥";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (Math.random() * 12 + 8) + "px";

    heart.style.animationDuration =
        (Math.random() * 7 + 7) + "s";

    heart.style.setProperty(
        "--move",
        (Math.random() * 120 - 60) + "px"
    );

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);

}

setInterval(createHeart, 900);


/* =========================
   MÚSICA
========================= */

const audio =
    document.getElementById("audio");

const vinyl =
    document.getElementById("vinyl");

audio.addEventListener("play", () => {

    vinyl.classList.add("playing");

});

audio.addEventListener("pause", () => {

    vinyl.classList.remove("playing");

});

audio.addEventListener("ended", () => {

    vinyl.classList.remove("playing");

});


/* =========================
   ANIMACIONES AL HACER SCROLL
========================= */

const animatedElements =
    document.querySelectorAll(
        ".timeline-card, .letter-card, .reason, .music-card"
    );

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .9s ease, transform .9s ease";

    observer.observe(element);

});


/* =========================
   PREGUNTA:
   ¿QUIERES SER MI NOVIA?
========================= */

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const yesMessage =
    document.getElementById("yesMessage");


/* BOTÓN SÍ */

yesButton.addEventListener("click", () => {

    yesMessage.classList.add("show");

    yesButton.style.display = "none";

    noButton.style.display = "none";

    createCelebration();

});


/* =========================
   BOTÓN NO
========================= */

function moveNoButton() {

    const section =
        document.querySelector(".question-section");

    const rect =
        section.getBoundingClientRect();

    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    const maxX =
        Math.max(
            20,
            rect.width - buttonWidth - 40
        );

    const maxY =
        Math.max(
            20,
            rect.height - buttonHeight - 40
        );


    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;


    noButton.style.position = "absolute";

    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";

}


/* PC */

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/* CELULAR */

noButton.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/* Si por alguna razón logra tocarlo */

noButton.addEventListener("click", () => {

    moveNoButton();

});


/* =========================
   CELEBRACIÓN
========================= */

function createCelebration() {

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");

        heart.classList.add("heart");

        heart.innerHTML =
            Math.random() > .5 ? "♥" : "♡";

        heart.style.left =
            (Math.random() * 100) + "vw";

        heart.style.bottom =
            "10vh";

        heart.style.fontSize =
            (Math.random() * 20 + 12) + "px";

        heart.style.animationDuration =
            (Math.random() * 3 + 3) + "s";

        heart.style.setProperty(
            "--move",
            (Math.random() * 300 - 150) + "px"
        );

        heartsContainer.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 7000);

    }

}