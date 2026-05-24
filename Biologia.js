// inizio file Biologia.js
function isMobile() {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function checkOrientation() {
  const warning = document.getElementById("rotate-warning");

  if (window.innerHeight > window.innerWidth) {
    warning.style.display = "flex";
  } else {
    warning.style.display = "none";
  }
}


// --- DATI: fatti su Alice Ball, divisi per categoria ---
const facts = [
    // BIOGRAFIA
    {
        id: "bio1",
        category: "Biografia",
        title: "Origini e infanzia",
        text: "Alice Ball nacque a Seattle nel 1892 in una famiglia della classe media, con forte attenzione all’istruzione."
    },
    {
        id: "bio2",
        category: "Biografia",
        title: "Studi universitari",
        text: "Studiò chimica all’Università delle Hawaii, dove divenne la prima donna e la prima persona afroamericana a laurearsi in chimica."
    },
    {
        id: "bio3",
        category: "Biografia",
        title: "Carriera accademica",
        text: "Fu anche la prima donna docente di chimica all’Università delle Hawaii, a soli 23 anni."
    },
    {
        id: "bio4",
        category: "Biografia",
        title: "Contesto storico",
        text: "Lavorò in un’epoca in cui le donne e le persone nere avevano pochissime opportunità nel mondo scientifico."
    },

    // SCOPERTE
    {
        id: "scop1",
        category: "Scoperte",
        title: "Il Ball Method",
        text: "Alice sviluppò il Ball Method, un metodo per rendere iniettabile l’olio di chaulmoogra, usato per curare la lebbra."
    },
    {
        id: "scop2",
        category: "Scoperte",
        title: "Innovazione chimica",
        text: "Isolò gli acidi grassi attivi e li rese solubili, permettendo al corpo di assorbirli in modo efficace."
    },
    {
        id: "scop3",
        category: "Scoperte",
        title: "Impatto medico",
        text: "Il suo metodo divenne il trattamento standard per la lebbra fino agli anni ’40."
    },
    {
        id: "scop4",
        category: "Scoperte",
        title: "Ricerca in laboratorio",
        text: "Lavorò intensamente in laboratorio, sperimentando diverse formulazioni dell’olio di chaulmoogra."
    },

    // RICONOSCIMENTI
    {
        id: "ric1",
        category: "Riconoscimenti",
        title: "Riconoscimento tardivo",
        text: "Per anni il suo lavoro fu attribuito ad altri, e solo decenni dopo le fu riconosciuto il merito."
    },
    {
        id: "ric2",
        category: "Riconoscimenti",
        title: "Onori accademici",
        text: "L’Università delle Hawaii ha intitolato a lei una targa e una giornata commemorativa."
    },
    {
        id: "ric3",
        category: "Riconoscimenti",
        title: "Figura simbolo",
        text: "Oggi è considerata un simbolo di eccellenza scientifica e di lotta contro le discriminazioni."
    },
    {
        id: "ric4",
        category: "Riconoscimenti",
        title: "Memoria storica",
        text: "La sua storia viene sempre più raccontata in libri, documentari e corsi di storia della scienza."
    },

    // VITA PRIVATA
    {
        id: "vita1",
        category: "Vita privata",
        title: "Famiglia",
        text: "Proveniva da una famiglia che valorizzava l’istruzione e la curiosità scientifica."
    },
    {
        id: "vita2",
        category: "Vita privata",
        title: "Trasferimento alle Hawaii",
        text: "Si trasferì alle Hawaii per studiare e lavorare, lontano dalla sua città natale."
    },
    {
        id: "vita3",
        category: "Vita privata",
        title: "Difficoltà personali",
        text: "Affrontò ostacoli legati al sessismo e al razzismo, ma continuò a perseguire la ricerca."
    },
    {
        id: "vita4",
        category: "Vita privata",
        title: "Morte prematura",
        text: "Morì molto giovane, a 24 anni, prima di vedere pienamente riconosciuto il suo lavoro."
    }
];

// --- LIVELLI: ogni carta ha un'immagine e un factId ---
const levels = {
    bio: {
        title: "Livello Biografia",
        subtitle: "Scopri la vita e il percorso di Alice Ball.",
        cards: [
            { img:"img1/1Immagine.png", factId: "bio1" },
            { img:"img1/1Immagine.png", factId: "bio1" },
            { img: "img1/2Immagine.png", factId: "bio2" },
            { img: "img1/2Immagine.png", factId: "bio2" },
            { img: "img1/3Immagine.png", factId: "bio3" },
            { img: "img1/3Immagine.png", factId: "bio3" },
            { img: "img1/4Immagine.png", factId: "bio4" },
            { img: "img1/4Immagine.png", factId: "bio4" }
        ]
    },
    scoperte: {
        title: "Livello Scoperte",
        subtitle: "Approfondisci le scoperte scientifiche di Alice Ball.",
        cards: [
            { img: "img1/1.1Immagine.png", factId: "scop1" },
            { img: "img1/1.1Immagine.png", factId: "scop1" },
            { img: "img1/1.2Immagine.png", factId: "scop2" },
            { img: "img1/1.2Immagine.png", factId: "scop2" },
            { img: "img1/1.3Immagine.png", factId: "scop3" },
            { img: "img1/1.3Immagine.png", factId: "scop3" },
            { img: "img1/1.4Immagine.png", factId: "scop4" },
            { img: "img1/1.4Immagine.png", factId: "scop4" }
        ]
    },
    riconoscimenti: {
        title: "Livello Riconoscimenti",
        subtitle: "Scopri come il suo lavoro è stato riconosciuto nel tempo.",
        cards: [
            { img: "img2/2.1Immagine.png", factId: "ric1" },
            { img: "img2/2.1Immagine.png", factId: "ric1" },
            { img: "img2/2.2Immagine.png", factId: "ric2" },
            { img: "img2/2.2Immagine.png", factId: "ric2" },
            { img: "img2/2.3Immagine.png", factId: "ric3" },
            { img: "img2/2.3Immagine.png", factId: "ric3" },
            { img: "img2/2.4Immagine.png", factId: "ric4" },
            { img: "img2/2.4Immagine.png", factId: "ric4" }
        ]
    },
    vita: {
        title: "Livello Vita privata",
        subtitle: "Conosci il lato umano e personale di Alice Ball.",
        cards: [
            { img: "img2/3.1Immagine.png", factId: "vita1" },
            { img: "img2/3.1Immagine.png", factId: "vita1" },
            { img: "img2/3.2Immagine.png", factId: "vita2" },
            { img: "img2/3.2Immagine.png", factId: "vita2" },
            { img: "img2/3.3Immagine.png", factId: "vita3" },
            { img: "img2/3.3Immagine.png", factId: "vita3" },
            { img: "img2/3.4Immagine.png", factId: "vita4" },
            { img: "img2/3.4Immagine.png", factId: "vita4" }
        ]
    }
};

// --- STATO DI GIOCO ---
let currentLevelKey = null;
let flipped = [];
let matchedPairs = 0;
let totalPairs = 0;
const unlockedFacts = new Set();

// --- RIFERIMENTI DOM ---
const mainMenu = document.getElementById("main-menu");
const levelSelect = document.getElementById("level-select");
const gameSection = document.getElementById("game-section");
const archiveSection = document.getElementById("archive-section");
const aboutSection = document.getElementById("about-section");
const gameContainer = document.getElementById("game");
const gameTitle = document.getElementById("game-title");
const gameSubtitle = document.getElementById("game-subtitle");
const archiveList = document.getElementById("archive-list");
const archiveEmpty = document.getElementById("archive-empty");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const popupCloseBtn = document.getElementById("popup-close");

// --- NAVIGAZIONE ---
function showSection(section) {
    // Nascondi tutte le sezioni interne
    levelSelect.classList.add("hidden");
    gameSection.classList.add("hidden");
    archiveSection.classList.add("hidden");
    aboutSection.classList.add("hidden");

    // Nascondi la home
    mainMenu.classList.add("hidden");
    mainMenu.classList.remove("home-layout");

    // Mostra la sezione richiesta
    if (section) {
        section.classList.remove("hidden");
    }
}

function backToMenu() {
    // Nascondi tutte le sezioni interne
    levelSelect.classList.add("hidden");
    gameSection.classList.add("hidden");
    archiveSection.classList.add("hidden");
    aboutSection.classList.add("hidden");

    // Mostra la home
    mainMenu.classList.remove("hidden");
    mainMenu.classList.add("home-layout");
}




// Menu principale
mainMenu.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    if (action === "play-default") {
        startLevel("bio");
    } else if (action === "choose-level") {
        showSection(levelSelect);
    } else if (action === "open-archive") {
        renderArchive();
        showSection(archiveSection);
    } else if (action === "about") {
        showSection(aboutSection);
    }
});

// Selezione livello
levelSelect.addEventListener("click", (e) => {
    const levelKey = e.target.dataset.level;
    const action = e.target.dataset.action;
    if (levelKey) {
        startLevel(levelKey);
    } else if (action === "back-menu") {
        backToMenu();
    }
});

// Pulsanti "torna al menu"
document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        backToMenu();
    });
});

// Popup
popupCloseBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// --- AVVIO LIVELLO ---
function startLevel(levelKey) {
    console.log("startLevel chiamata con:", levelKey);

    const level = levels[levelKey];
    console.log("level trovato:", level);
    if (!level) {
        console.error("Nessun livello trovato per key:", levelKey);
        return;
    }

    // AVVISO SOLO SU MOBILE
    if (isMobile()) {
        checkOrientation();
    }

    currentLevelKey = levelKey;

    // Protezioni sugli elementi DOM
    if (gameTitle) {
        gameTitle.textContent = level.title;
    } else {
        console.error("gameTitle è null");
    }

    if (gameSubtitle) {
        gameSubtitle.textContent = level.subtitle;
    } else {
        console.error("gameSubtitle è null");
    }

    loadLevel(levelKey);
    generateCards();

    if (gameSection) {
        showSection(gameSection);
    } else {
        console.error("gameSection è null");
    }
}

function loadLevel(levelKey) {
    const level = levels[levelKey];
    if (!level) return;

    // reset stato
    flipped = [];
    matchedPairs = 0;
    totalPairs = level.cards.length / 2;

    // pulisci il contenitore
    gameContainer.innerHTML = "";
}

function generateCards() {
    flipped = [];
    matchedPairs = 0;
    gameContainer.innerHTML = "";

    const level = levels[currentLevelKey];
    if (!level) return;

    const cardsData = [...level.cards].sort(() => Math.random() - 0.5);
    totalPairs = cardsData.length / 2;

    cardsData.forEach((cardData, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.factId = cardData.factId;

        const back = document.createElement("div");
        back.classList.add("card-back");

        const front = document.createElement("div");
        front.classList.add("card-front");

        const img = document.createElement("img");
        img.src = cardData.img;

        front.appendChild(img);
        card.appendChild(back);
        card.appendChild(front);

        card.addEventListener("click", () => flipCard(card));
        gameContainer.appendChild(card);
    });
}

// --- LOGICA MEMORY ---
function flipCard(card) {
    if (card.classList.contains("flipped")) return;
    if (flipped.length === 2) return;

    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
        setTimeout(checkMatch, 400);
    }
}

function checkMatch() {
    const [c1, c2] = flipped;
    if (!c1 || !c2) {
        flipped = [];
        return;
    }

    if (c1.dataset.factId === c2.dataset.factId) {
        matchedPairs++;
        const factId = c1.dataset.factId;
        unlockFact(factId);
        showFactPopup(factId);

        // fine livello
        if (matchedPairs === totalPairs) {
            // aspetta che il popup della scoperta venga chiuso
            popupCloseBtn.onclick = () => {
                popup.style.display = "none";
                showLevelCompletePopup();
            };
        } else {
            // comportamento normale per le coppie non finali
            popupCloseBtn.onclick = () => {
                popup.style.display = "none";
            };
        }

    } else {
        c1.classList.remove("flipped");
        c2.classList.remove("flipped");
    }

    flipped = [];
}

// --- GESTIONE FATTI / ARCHIVIO ---
function unlockFact(factId) {
    unlockedFacts.add(factId);
}

function getFactById(id) {
    return facts.find(f => f.id === id);
}

function showFactPopup(factId) {
    const fact = getFactById(factId);
    if (!fact) return;

    popupTitle.textContent = fact.title + " (" + fact.category + ")";
    popupText.textContent = fact.text;
    popup.style.display = "block";
}

function renderArchive() {
    archiveList.innerHTML = "";

    if (unlockedFacts.size === 0) {
        archiveEmpty.style.display = "block";
        return;
    } else {
        archiveEmpty.style.display = "none";
    }

    // raggruppa per categoria
    const byCategory = {};
    unlockedFacts.forEach(id => {
        const fact = getFactById(id);
        if (!fact) return;
        if (!byCategory[fact.category]) byCategory[fact.category] = [];
        byCategory[fact.category].push(fact);
    });

    Object.keys(byCategory).forEach(cat => {
        const catDiv = document.createElement("div");
        catDiv.classList.add("archive-category");

        const h3 = document.createElement("h3");
        h3.textContent = cat;
        catDiv.appendChild(h3);

        byCategory[cat].forEach(fact => {
            const item = document.createElement("div");
            item.classList.add("archive-item");
            item.textContent = fact.title + " – " + fact.text;
            catDiv.appendChild(item);
        });

        archiveList.appendChild(catDiv);
    });
}

const levelOrder = ["bio", "scoperte", "riconoscimenti", "vita"];

function showLevelCompletePopup() {
    const popup = document.getElementById("level-complete-popup");
    const title = document.getElementById("level-complete-title");

    title.textContent = "Hai completato: " + levels[currentLevelKey].title;

    popup.style.display = "block";

    // trova livello successivo
    const currentIndex = levelOrder.indexOf(currentLevelKey);
    const nextLevel = levelOrder[currentIndex + 1];

    const continueBtn = document.getElementById("continue-btn");

    if (nextLevel) {
        continueBtn.textContent = "Continua →";
        continueBtn.onclick = () => {
            popup.style.display = "none";
            startLevel(nextLevel);
        };
    } else {
        continueBtn.textContent = "Torna al menu";
        continueBtn.onclick = () => {
            popup.style.display = "none";
            backToMenu();
        };
    }
}

window.addEventListener("resize", () => {
  if (isMobile()) checkOrientation();
});

document.getElementById("close-rotate").addEventListener("click", () => {
  document.getElementById("rotate-warning").style.display = "none";
});
