/* ===========================
   STATO GENERALE DEL GIOCO
   =========================== */

let currentLevel = 1;
const maxLevel = 4;

let unlockedSummaries = [];
let memoryState = {
    cards: [],
    revealed: [],
    matchedPairs: 0,
    totalPairs: 0,
    lock: false,
    timerId: null,
    timeLeft: 0,
    config: null
};

/* ===========================
   CONFIGURAZIONE LIVELLI
   =========================== */

const levelConfigs = {
    1: {
        title: "Livello 1 – Le origini di Nettie",
        description: "Scopri le origini di Nettie Maria Stevens: nascita, famiglia e primi studi.",
        pairs: 4,
        timer: false,
        timeLimit: 0,
        swapOnError: false
    },
    2: {
        title: "Livello 2 – Studi e ricerca",
        description: "Approfondisci gli studi universitari e l’inizio della carriera scientifica di Nettie.",
        pairs: 6,
        timer: true,
        timeLimit: 40, // secondi
        swapOnError: false
    },
    3: {
        title: "Livello 3 – La grande scoperta",
        description: "Ricostruisci la scoperta dei cromosomi sessuali e le difficoltà incontrate.",
        pairs: 6,
        timer: false,
        timeLimit: 0,
        swapOnError: true
    },
    4: {
        title: "Livello 4 – Eredità e riconoscimento",
        description: "Ripercorri la vita privata, la morte e l’eredità scientifica di Nettie.",
        pairs: 8,
        timer: true,
        timeLimit: 45, // secondi
        swapOnError: true
    }
};

/* ===========================
   INFORMAZIONI (POPUP + ARCHIVIO)
   Ordine fisso:
   1) Nascita/Biografia
   2) Studi/Carriera
   3) Scoperte
   4) Discriminazioni
   5) Vita privata/Morte
   =========================== */

const nettieInfo = {
    birth: [
        "Nettie Maria Stevens nacque il 7 luglio 1861 a Cavendish, Vermont (USA).",
        "Proveniva da una famiglia modesta e perse la madre da piccola.",
        "Fin da bambina era molto studiosa, riservata e determinata."
    ],
    studies: [
        "Studiò al Mount Holyoke Female Seminary, dove eccelleva in molte materie.",
        "Si laureò alla Stanford University, pagandosi gli studi lavorando.",
        "Iniziò la carriera scientifica tardi, quasi a 40 anni."
    ],
    discoveries: [
        "Studiò i cromosomi degli insetti al microscopio.",
        "Nel 1905 scoprì che i maschi hanno cromosomi XY e le femmine XX.",
        "Dimostrò che il sesso biologico è determinato dai cromosomi."
    ],
    discrimination: [
        "Era donna in un ambiente scientifico dominato dagli uomini.",
        "Guadagnava meno dei colleghi e le vennero negati ruoli stabili.",
        "Per anni il merito della sua scoperta fu attribuito a Edmund Wilson."
    ],
    death: [
        "Non si sposò e dedicò la vita alla ricerca.",
        "Morì il 4 maggio 1912 a Baltimora, a 50 anni, per un tumore al seno.",
        "Oggi è considerata una pioniera della genetica moderna."
    ]
};

/* ===========================
   COPPIE DI CARTE (IMMAGINI)
   (Sostituisci i path con le tue immagini reali)
   Ogni coppia ha due immagini diverse ma stesso pairId
   =========================== */

const allPairs = [
    // Coppie legate a nascita/biografia
    { pairId: "birth1", imgA: "img/birth_place_1.png", imgB: "img/birth_place_2.png" },
    { pairId: "family", imgA: "img/family_1.png", imgB: "img/family_2.png" },

    // Coppie legate a studi/carreira
    { pairId: "mount_holyoke", imgA: "img/mount_holyoke_1.png", imgB: "img/mount_holyoke_2.png" },
    { pairId: "stanford", imgA: "img/stanford_1.png", imgB: "img/stanford_2.png" },

    // Coppie legate a ricerca/scoperte
    { pairId: "microscope", imgA: "img/microscope_1.png", imgB: "img/microscope_2.png" },
    { pairId: "chromosomes", imgA: "img/chromosomes_1.png", imgB: "img/chromosomes_2.png" },
    { pairId: "insects", imgA: "img/insects_1.png", imgB: "img/insects_2.png" },
    { pairId: "lab_tools", imgA: "img/lab_tools_1.png", imgB: "img/lab_tools_2.png" },

    // Coppie legate a discriminazioni
    { pairId: "professor_male", imgA: "img/professor_male_1.png", imgB: "img/professor_male_2.png" },
    { pairId: "researcher_female", imgA: "img/researcher_female_1.png", imgB: "img/researcher_female_2.png" },
    { pairId: "documents", imgA: "img/documents_1.png", imgB: "img/documents_2.png" },
    { pairId: "rejected", imgA: "img/rejected_1.png", imgB: "img/rejected_2.png" },

    // Coppie legate a vita privata/morte/eredità
    { pairId: "hospital", imgA: "img/hospital_1.png", imgB: "img/hospital_2.png" },
    { pairId: "tombstone", imgA: "img/tombstone_1.png", imgB: "img/tombstone_2.png" },
    { pairId: "medal", imgA: "img/medal_1.png", imgB: "img/medal_2.png" },
    { pairId: "plaque", imgA: "img/plaque_1.png", imgB: "img/plaque_2.png" }
    // Se vuoi, puoi aggiungerne altre
];

/* ===========================
   GESTIONE SCHERMATE
   =========================== */

function showScreen(id) {
    const screens = document.querySelectorAll(".screen");
    const newScreen = document.getElementById(id);

    screens.forEach(s => {
        if (s.classList.contains("active")) {
            s.classList.remove("active");
            s.classList.add("exit-left");
            setTimeout(() => {
                s.classList.remove("exit-left");
            }, 400);
        }
    });

    setTimeout(() => {
        newScreen.classList.add("active");
    }, 10);
}

function backToMenu() {
    showScreen("menu-screen");
}

/* ===========================
   AVVIO GIOCO E LIVELLI
   =========================== */

function startGame() {
    currentLevel = 1;
    loadLevel();
}

function loadLevel() {
    const cfg = levelConfigs[currentLevel];
    document.getElementById("level-title").textContent = cfg.title;
    document.getElementById("level-description").textContent = cfg.description;

    // Mostra popup informativo all'inizio del livello
    loadLevelPopup();

    showScreen("level-screen");
}

function startLevelMemory() {
    const cfg = levelConfigs[currentLevel];
    startMemory(cfg);
}

/* ===========================
   POPUP LIVELLO (INFO ORDINATE)
   =========================== */

function loadLevelPopup() {
    const popup = document.getElementById("level-popup");
    if (!popup) return;

    // Ordine fisso: nascita → studi → scoperte → discriminazioni → morte
    const texts = [
        ...nettieInfo.birth,
        ...nettieInfo.studies,
        ...nettieInfo.discoveries,
        ...nettieInfo.discrimination,
        ...nettieInfo.death
    ];

    popup.innerHTML = "";
    texts.forEach(t => {
        const p = document.createElement("p");
        p.textContent = t;
        popup.appendChild(p);
    });
}

/* ===========================
   MEMORY – LOGICA GENERALE
   =========================== */

function startMemory(config) {
    const grid = document.getElementById("memory-grid");
    const info = document.getElementById("memory-info");
    const extra = document.getElementById("memory-extra");
    const timerEl = document.getElementById("memory-timer");

    if (!grid) return;

    grid.innerHTML = "";
    extra.textContent = "";
    if (timerEl) timerEl.textContent = "";

    memoryState.config = config;
    memoryState.revealed = [];
    memoryState.matchedPairs = 0;
    memoryState.lock = false;

    // Seleziona le coppie per questo livello
    const pairsNeeded = config.pairs;
    const selectedPairs = allPairs.slice(0, pairsNeeded); // semplice: prime N coppie

    memoryState.totalPairs = pairsNeeded;

    // Crea le carte (2 per ogni coppia)
    let cards = [];
    selectedPairs.forEach(pair => {
        cards.push({
            pairId: pair.pairId,
            img: pair.imgA,
            matched: false
        });
        cards.push({
            pairId: pair.pairId,
            img: pair.imgB,
            matched: false
        });
    });

    // Mischia le carte
    cards = shuffleArray(cards);
    memoryState.cards = cards;

    // Render carte
    cards.forEach((card, index) => {
        const cardEl = document.createElement("div");
        cardEl.className = "memory-card card-vintage";
        cardEl.dataset.index = index;
        cardEl.dataset.pairId = card.pairId;

        const front = document.createElement("div");
        front.className = "card-face card-front";
        // retro carta (pattern generico)
        front.textContent = ""; // puoi lasciare vuoto o mettere un simbolo

        const back = document.createElement("div");
        back.className = "card-face card-back";

        const img = document.createElement("img");
        img.src = card.img;
        img.alt = card.pairId;
        back.appendChild(img);

        cardEl.appendChild(front);
        cardEl.appendChild(back);

        cardEl.onclick = () => clickMemoryCard(cardEl);

        grid.appendChild(cardEl);
    });

    // Info livello
    if (info) {
        info.textContent = getMemoryInfoTextForLevel(currentLevel);
    }

    // Timer
    stopMemoryTimer();
    if (config.timer) {
        memoryState.timeLeft = config.timeLimit;
        updateTimerDisplay();
        memoryState.timerId = setInterval(() => {
            memoryState.timeLeft--;
            updateTimerDisplay();
            if (memoryState.timeLeft <= 0) {
                stopMemoryTimer();
                handleTimeOver();
            }
        }, 1000);
    }

    showScreen("memory-screen");
}

function clickMemoryCard(cardEl) {
    if (memoryState.lock) return;
    const index = parseInt(cardEl.dataset.index, 10);
    const cardData = memoryState.cards[index];

    if (cardData.matched) return;
    if (cardEl.classList.contains("flipped")) return;

    // gira la carta
    cardEl.classList.add("flipped");
    memoryState.revealed.push({ index, el: cardEl, pairId: cardData.pairId });

    if (memoryState.revealed.length === 2) {
        memoryState.lock = true;
        const [c1, c2] = memoryState.revealed;

        if (c1.pairId === c2.pairId) {
            // match
            memoryState.cards[c1.index].matched = true;
            memoryState.cards[c2.index].matched = true;
            memoryState.matchedPairs++;

            memoryState.revealed = [];
            memoryState.lock = false;

            if (memoryState.matchedPairs === memoryState.totalPairs) {
                // livello completato
                stopMemoryTimer();
                setTimeout(() => {
                    completeLevel();
                }, 600);
            }
        } else {
            // errore
            setTimeout(() => {
                c1.el.classList.remove("flipped");
                c2.el.classList.remove("flipped");
                memoryState.revealed = [];
                memoryState.lock = false;

                // se il livello prevede scambio coppie
                if (memoryState.config.swapOnError) {
                    swapRandomCards();
                }
            }, 700);
        }
    }
}

/* ===========================
   TIMER
   =========================== */

function updateTimerDisplay() {
    const timerEl = document.getElementById("memory-timer");
    if (!timerEl) return;
    timerEl.textContent = "Tempo: " + memoryState.timeLeft + "s";
}

function stopMemoryTimer() {
    if (memoryState.timerId) {
        clearInterval(memoryState.timerId);
        memoryState.timerId = null;
    }
}

function handleTimeOver() {
    const extra = document.getElementById("memory-extra");
    if (extra) {
        extra.textContent = "Tempo scaduto! Riprova il livello.";
    }
    // reset livello dopo un attimo
    setTimeout(() => {
        startMemory(levelConfigs[currentLevel]);
    }, 1500);
}

/* ===========================
   SCAMBIO DI COPPIE (ERRORI)
   =========================== */

function swapRandomCards() {
    const grid = document.getElementById("memory-grid");
    if (!grid) return;

    const cardEls = Array.from(grid.querySelectorAll(".memory-card"));
    if (cardEls.length < 2) return;

    // prendi due indici diversi
    let i1 = Math.floor(Math.random() * cardEls.length);
    let i2 = Math.floor(Math.random() * cardEls.length);
    while (i2 === i1) {
        i2 = Math.floor(Math.random() * cardEls.length);
    }

    const el1 = cardEls[i1];
    const el2 = cardEls[i2];

    // scambia posizione nel DOM
    const clone1 = el1.cloneNode(true);
    const clone2 = el2.cloneNode(true);

    // mantieni gli handler
    clone1.onclick = el1.onclick;
    clone2.onclick = el2.onclick;

    grid.replaceChild(clone1, el2);
    grid.replaceChild(clone2, el1);
}

/* ===========================
   COMPLETAMENTO LIVELLO
   =========================== */

function completeLevel() {
    const extra = document.getElementById("memory-extra");
    if (extra) {
        extra.textContent = "Livello completato!";
    }

    // sblocca riassunto
    if (!unlockedSummaries.includes(currentLevel)) {
        unlockedSummaries.push(currentLevel);
    }

    // mostra riassunto
    loadSummary();
    showScreen("summary-screen");
}

function nextLevel() {
    if (currentLevel < maxLevel) {
        currentLevel++;
        loadLevel();
    } else {
        backToMenu();
    }
}

/* ===========================
   TESTO INFO MEMORY PER LIVELLO
   =========================== */

function getMemoryInfoTextForLevel(level) {
    switch (level) {
        case 1:
            return "Memory base: poche coppie per conoscere le origini di Nettie.";
        case 2:
            return "Memory con timer: più coppie e tempo limitato sugli studi e la carriera.";
        case 3:
            return "Memory avanzato: ogni errore può cambiare la posizione delle carte!";
        case 4:
            return "Memory finale: timer + scambio di coppie, il livello più difficile.";
        default:
            return "";
    }
}

/* ===========================
   ARCHIVIO / RIASSUNTI
   =========================== */

function openArchive() {
    const list = document.getElementById("archive-list");
    if (!list) return;

    list.innerHTML = "";

    if (unlockedSummaries.length === 0) {
        list.innerHTML = "<p>Nessuna scheda sbloccata.</p>";
    } else {
        unlockedSummaries.sort((a, b) => a - b);
        unlockedSummaries.forEach(level => {
            const div = document.createElement("div");
            div.className = "archive-card";
            div.textContent = "Livello " + level + " – Scheda riassuntiva";
            div.onclick = () => openSummaryFromArchive(level);
            list.appendChild(div);
        });
    }

    showScreen("archive-screen");
}

function openSummaryFromArchive(level) {
    currentLevel = level;
    loadSummary();
    showScreen("summary-screen");
}

function loadSummary() {
    const list = document.getElementById("summary-list");
    if (!list) return;

    list.innerHTML = "";

    // Ordine fisso delle info
    const orderedBlocks = [
        nettieInfo.birth,
        nettieInfo.studies,
        nettieInfo.discoveries,
        nettieInfo.discrimination,
        nettieInfo.death
    ];

    orderedBlocks.forEach(block => {
        block.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            list.appendChild(li);
        });
    });
}

/* ===========================
   UTILS
   =========================== */

function shuffleArray(arr) {
    return arr
        .map(v => ({ v, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map(o => o.v);
}
