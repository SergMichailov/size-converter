const sizeData = {
    clothing: {
        men: {
            systems: ["EU", "US", "UK", "FR", "CN", "INT"],
            rows: [
                [44, 34, 34, 44, 170, "S"],
                [46, 36, 36, 46, 175, "M"],
                [48, 38, 38, 48, 180, "M"],
                [50, 40, 40, 50, 185, "L"],
                [52, 42, 42, 52, 190, "L"],
                [54, 44, 44, 54, 195, "XL"],
                [56, 46, 46, 56, 200, "XL"],
                [58, 48, 48, 58, 205, "XXL"],
                [60, 50, 50, 60, 210, "XXL"]
            ]
        },
        women: {
            systems: ["EU", "US", "UK", "FR", "CN", "INT"],
            rows: [
                [32, 0, 4, 34, 155, "XS"],
                [34, 2, 6, 36, 160, "S"],
                [36, 4, 8, 38, 165, "S"],
                [38, 6, 10, 40, 170, "M"],
                [40, 8, 12, 42, 175, "M"],
                [42, 10, 14, 44, 180, "L"],
                [44, 12, 16, 46, 185, "L"],
                [46, 14, 18, 48, 190, "XL"],
                [48, 16, 20, 50, 195, "XL"]
            ]
        },
        kids: {
            systems: ["EU", "US", "UK", "FR", "CN", "INT"],
            rows: [
                [110, 4, 4, 110, 110, "XS"],
                [116, 6, 6, 116, 116, "S"],
                [122, 8, 8, 122, 122, "S"],
                [128, 10, 10, 128, 128, "M"],
                [134, 12, 12, 134, 134, "M"],
                [140, 14, 14, 140, 140, "L"],
                [146, 16, 16, 146, 146, "L"]
            ]
        }
    },
    shoes: {
        men: {
            systems: ["EU", "US", "UK", "CN"],
            rows: [
                [39, 6, 5.5, 38],
                [40, 7, 6.5, 39],
                [41, 8, 7.5, 40],
                [42, 9, 8.5, 41],
                [43, 10, 9.5, 42],
                [44, 11, 10.5, 43],
                [45, 12, 11.5, 44],
                [46, 13, 12.5, 45],
                [47, 14, 13.5, 46],
                [48, 15, 14.5, 47]
            ]
        },
        women: {
            systems: ["EU", "US", "UK", "CN"],
            rows: [
                [35, 5, 2.5, 35],
                [36, 6, 3.5, 36],
                [37, 7, 4.5, 37],
                [38, 8, 5.5, 38],
                [39, 9, 6.5, 39],
                [40, 10, 7.5, 40],
                [41, 11, 8.5, 41],
                [42, 12, 9.5, 42],
                [43, 13, 10.5, 43]
            ]
        },
        kids: {
            systems: ["EU", "US", "UK", "CN"],
            rows: [
                [28, 10, 9, 28],
                [29, 11, 10, 29],
                [30, 12, 11, 30],
                [31, 13, 12, 31],
                [32, 1, 13, 32],
                [33, 2, 13.5, 33],
                [34, 3, 1.5, 34],
                [35, 4, 2.5, 35],
                [36, 5, 3.5, 36]
            ]
        }
    }
};

const pageType = document.documentElement.dataset.page || "index";

const categorySelect = document.getElementById("categorySelect");
const genderSelect = document.getElementById("genderSelect");
const sizeSystemSelect = document.getElementById("sizeSystemSelect");
const sizeInput = document.getElementById("sizeInput");
const convertBtn = document.getElementById("convertBtn");
const resultCard = document.getElementById("resultCard");
const resultList = document.getElementById("resultList");
const resultNote = document.getElementById("resultNote");
const clothingTableBody = document.getElementById("clothingTableBody");
const shoesTableBody = document.getElementById("shoesTableBody");
const languageSelect = document.getElementById("languageSelect");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const openCalcBtn = document.getElementById("openCalcBtn");
const tableBtn = document.getElementById("tableBtn");
const langLabel = document.getElementById("langLabel");
const section1Title = document.getElementById("section1Title");
const section1Desc = document.getElementById("section1Desc");
const categoryLabel = document.getElementById("categoryLabel");
const genderLabel = document.getElementById("genderLabel");
const systemLabel = document.getElementById("systemLabel");
const sizeLabel = document.getElementById("sizeLabel");
const clothingTitle = document.getElementById("clothingTitle");
const shoesTitle = document.getElementById("shoesTitle");
const clothingH1 = document.getElementById("clothingH1");
const clothingH2 = document.getElementById("clothingH2");
const clothingH3 = document.getElementById("clothingH3");
const clothingH4 = document.getElementById("clothingH4");
const clothingH5 = document.getElementById("clothingH5");
const clothingH6 = document.getElementById("clothingH6");
const shoesH1 = document.getElementById("shoesH1");
const shoesH2 = document.getElementById("shoesH2");
const shoesH3 = document.getElementById("shoesH3");
const shoesH4 = document.getElementById("shoesH4");
const shoesH5 = document.getElementById("shoesH5");

function updateSizeSystems() {
    const category = categorySelect.value;
    const gender = genderSelect.value;
    const current = sizeData[category][gender];
    sizeSystemSelect.innerHTML = "";

    current.systems.forEach(system => {
        const option = document.createElement("option");
        option.value = system;
        option.textContent = system;
        sizeSystemSelect.append(option);
    });
}

function normalizeValue(value) {
    return String(value).trim().replace(',', '.');
}

function findRow(chart, systemName, sizeValue) {
    const index = chart.systems.indexOf(systemName);
    if (index === -1) return null;

    return chart.rows.find(row => normalizeValue(row[index]) === normalizeValue(sizeValue));
}

function renderResult(row, chart) {
    resultList.innerHTML = "";
    chart.systems.forEach((system, index) => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.innerHTML = `<strong>${system}</strong><span>${row[index]}</span>`;
        resultList.append(item);
    });
}

function showError(message) {
    resultList.innerHTML = "";
    resultNote.textContent = message;
    resultCard.classList.remove("hidden");
}

function convertSize() {
    const category = categorySelect.value;
    const gender = genderSelect.value;
    const system = sizeSystemSelect.value;
    const size = sizeInput.value.trim();

    if (!size) {
        showError(translations[languageSelect.value].messages.enterSize);
        return;
    }

    const chart = sizeData[category][gender];
    const row = findRow(chart, system, size);
    if (!row) {
        showError(translations[languageSelect.value].messages.notFound);
        return;
    }

    renderResult(row, chart);
    resultNote.textContent = translations[languageSelect.value].messages.resultNote;
    resultCard.classList.remove("hidden");
}

const translations = {
    ru: {
        heroEyebrow: "Размеры одежды и обуви",
        title: "Конвертер размеров",
        description: "Переводите европейские, американские, английские, китайские размеры одежды и обуви за секунды.",
        openCalculator: "Открыть калькулятор",
        tableSizes: "Таблица размеров",
        language: "Язык",
        section1Title: "Параметры перевода",
        section1Desc: "Выберите тип, систему и размер — калькулятор покажет соответствия во всех основных странах.",
        categoryLabel: "Тип перевода",
        genderLabel: "Пол / категория",
        systemLabel: "Система размера",
        sizeLabel: "Ваш размер",
        sizePlaceholder: "Например 42 или 8.5",
        convertBtn: "Перевести",
        section2Title: "Основные таблицы соответствий",
        section2Desc: "Быстрый доступ к наиболее популярным соответствиям для одежды и обуви.",
        clothingTitle: "Одежда",
        shoesTitle: "Обувь",
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "Межд."],
        shoesHeaders: ["EU", "US", "UK", "CN", "Пол"],
        categoryOptions: ["Обувь", "Одежда"],
        genderOptions: ["Мужское", "Женское", "Детское"],
        messages: {
            enterSize: "Введите размер для перевода.",
            notFound: "Мы не нашли точное соответствие. Попробуйте другой размер или систему.",
            resultNote: "Результаты приведены для более точного сравнения между системами размеров."
        }
    },
    en: {
        heroEyebrow: "Clothing & shoe sizes",
        title: "Size converter",
        description: "Convert clothing and shoe sizes between EU, US, UK, CN and more.",
        openCalculator: "Open calculator",
        tableSizes: "Size chart",
        language: "Language",
        section1Title: "Conversion settings",
        section1Desc: "Select type, system and size — the calculator will show matching sizes across major countries.",
        categoryLabel: "Conversion type",
        genderLabel: "Gender / category",
        systemLabel: "Size system",
        sizeLabel: "Your size",
        sizePlaceholder: "For example 42 or 8.5",
        convertBtn: "Convert",
        section2Title: "Main reference tables",
        section2Desc: "Quick access to common size correspondences for clothing and shoes.",
        clothingTitle: "Clothing",
        shoesTitle: "Shoes",
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "INT"],
        shoesHeaders: ["EU", "US", "UK", "CN", "Gender"],
        categoryOptions: ["Shoes", "Clothing"],
        genderOptions: ["Men", "Women", "Kids"],
        messages: {
            enterSize: "Enter a size to convert.",
            notFound: "No exact match found. Try another size or system.",
            resultNote: "Results are shown for better comparison across size systems."
        }
    },
    fr: {
        heroEyebrow: "Tailles vêtements et chaussures",
        title: "Convertisseur de tailles",
        description: "Convertissez les tailles de vêtements et de chaussures entre EU, US, UK, CN et plus.",
        openCalculator: "Ouvrir le calculateur",
        tableSizes: "Tableau des tailles",
        language: "Langue",
        section1Title: "Paramètres de conversion",
        section1Desc: "Sélectionnez le type, le système et la taille — le calculateur affichera les correspondances dans les principaux pays.",
        categoryLabel: "Type de conversion",
        genderLabel: "Genre / catégorie",
        systemLabel: "Système de taille",
        sizeLabel: "Votre taille",
        sizePlaceholder: "Par exemple 42 ou 8.5",
        convertBtn: "Convertir",
        section2Title: "Tableaux de référence principaux",
        section2Desc: "Accès rapide aux correspondances de tailles courantes pour les vêtements et les chaussures.",
        clothingTitle: "Vêtements",
        shoesTitle: "Chaussures",
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "INT"],
        shoesHeaders: ["EU", "US", "UK", "CN", "Genre"],
        categoryOptions: ["Chaussures", "Vêtements"],
        genderOptions: ["Homme", "Femme", "Enfants"],
        messages: {
            enterSize: "Entrez une taille à convertir.",
            notFound: "Aucune correspondance exacte trouvée. Essayez une autre taille ou un autre système.",
            resultNote: "Les résultats sont affichés pour une meilleure comparaison entre les systèmes de taille."
        }
    },
    nl: {
        heroEyebrow: "Kleding- & schoenmaten",
        title: "Maatconverter",
        description: "Converteer kleding- en schoenmaten tussen EU, US, UK, CN en meer.",
        openCalculator: "Open rekenmachine",
        tableSizes: "Maattabel",
        language: "Taal",
        section1Title: "Conversie-instellingen",
        section1Desc: "Selecteer type, systeem en maat — de rekenmachine toont overeenkomende maten in belangrijke landen.",
        categoryLabel: "Conversietype",
        genderLabel: "Geslacht / categorie",
        systemLabel: "Maatsysteem",
        sizeLabel: "Uw maat",
        sizePlaceholder: "Bijvoorbeeld 42 of 8.5",
        convertBtn: "Converteren",
        section2Title: "Belangrijkste referentietabellen",
        section2Desc: "Snelle toegang tot veelgebruikte correspondenties voor kleding- en schoenmaten.",
        clothingTitle: "Kleding",
        shoesTitle: "Schoenen",
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "INT"],
        shoesHeaders: ["EU", "US", "UK", "CN", "Geslacht"],
        categoryOptions: ["Schoenen", "Kleding"],
        genderOptions: ["Heren", "Dames", "Kinderen"],
        messages: {
            enterSize: "Voer een maat in om te converteren.",
            notFound: "Geen exacte overeenkomst gevonden. Probeer een andere maat of systeem.",
            resultNote: "Resultaten worden weergegeven voor een betere vergelijking tussen maatsystemen."
        }
    }
};

function applyTranslations(lang) {
    const data = translations[lang] || translations.ru;

    document.documentElement.lang = lang;
    setText(heroEyebrow, data.heroEyebrow);
    setText(heroTitle, data.title);
    setText(heroDescription, data.description);
    setText(openCalcBtn, data.openCalculator);
    setText(tableBtn, data.tableSizes);
    setText(langLabel, data.language);
    setText(section1Title, data.section1Title);
    setText(section1Desc, data.section1Desc);
    setText(categoryLabel, data.categoryLabel);
    setText(genderLabel, data.genderLabel);
    setText(systemLabel, data.systemLabel);
    setText(sizeLabel, data.sizeLabel);
    setPlaceholder(sizeInput, data.sizePlaceholder);
    setText(convertBtn, data.convertBtn);
    setText(section2Title, data.section2Title);
    setText(section2Desc, data.section2Desc);
    setText(clothingTitle, data.clothingTitle);
    setText(shoesTitle, data.shoesTitle);
    setText(clothingH1, data.clothingHeaders[0]);
    setText(clothingH2, data.clothingHeaders[1]);
    setText(clothingH3, data.clothingHeaders[2]);
    setText(clothingH4, data.clothingHeaders[3]);
    setText(clothingH5, data.clothingHeaders[4]);
    setText(clothingH6, data.clothingHeaders[5]);
    setText(shoesH1, data.shoesHeaders[0]);
    setText(shoesH2, data.shoesHeaders[1]);
    setText(shoesH3, data.shoesHeaders[2]);
    setText(shoesH4, data.shoesHeaders[3]);
    setText(shoesH5, data.shoesHeaders[4]);
    updateSelectOptions(data);
    if (pageType === "index") {
        populateTables(lang);
    }
}

function setText(element, text) {
    if (element) {
        element.textContent = text;
    }
}

function setPlaceholder(element, text) {
    if (element) {
        element.placeholder = text;
    }
}

function hideElement(element) {
    if (element) {
        element.classList.add("hidden");
    }
}

function showElement(element) {
    if (element) {
        element.classList.remove("hidden");
    }
}

function populateSelect(select, items) {
    if (!select) return;
    select.innerHTML = "";
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.append(option);
    });
}

function renderResultList(listElement, row, systems) {
    if (!listElement || !row || !systems) return;
    listElement.innerHTML = "";
    systems.forEach((system, index) => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.innerHTML = `<strong>${system}</strong><span>${row[index] || "—"}</span>`;
        listElement.append(item);
    });
}

function showError(message, cardElement, noteElement) {
    if (!cardElement || !noteElement) return;
    const list = cardElement.querySelector(".result-list");
    if (list) list.innerHTML = "";
    noteElement.textContent = message;
    showElement(cardElement);
}

function updateSelectOptions(data) {
    if (!categorySelect || !genderSelect) return;
    const categoryOptions = categorySelect.querySelectorAll("option");
    if (categoryOptions.length >= 2) {
        categoryOptions[0].textContent = data.categoryOptions[0];
        categoryOptions[1].textContent = data.categoryOptions[1];
    }

    const genderOptions = genderSelect.querySelectorAll("option");
    if (genderOptions.length >= 3) {
        genderOptions[0].textContent = data.genderOptions[0];
        genderOptions[1].textContent = data.genderOptions[1];
        genderOptions[2].textContent = data.genderOptions[2];
    }
}

function populateTables(lang) {
    if (!clothingTableBody || !shoesTableBody) return;
    const data = translations[lang] || translations.ru;
    clothingTableBody.innerHTML = "";
    shoesTableBody.innerHTML = "";

    sizeData.clothing.women.rows.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.append(td);
        });
        clothingTableBody.append(tr);
    });

    sizeData.shoes.men.rows.forEach((row, index) => {
        const womenRow = sizeData.shoes.women.rows[index] || row;
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${data.genderOptions[0]}</td>`;
        shoesTableBody.append(tr);
        const tr2 = document.createElement("tr");
        tr2.innerHTML = `<td>${womenRow[0]}</td><td>${womenRow[1]}</td><td>${womenRow[2]}</td><td>${womenRow[3]}</td><td>${data.genderOptions[1]}</td>`;
        shoesTableBody.append(tr2);
    });
}

function updateClothingSizeSystems() {
    if (!clothingCategory || !clothingSystem) return;
    const category = clothingCategory.value;
    const current = sizeData.clothing[category];
    if (!current) return;
    populateSelect(clothingSystem, current.systems);
}

function convertSize() {
    if (!categorySelect || !genderSelect || !sizeSystemSelect || !sizeInput || !resultCard || !resultList || !resultNote) return;
    const category = categorySelect.value;
    const gender = genderSelect.value;
    const system = sizeSystemSelect.value;
    const size = sizeInput.value.trim();

    if (!size) {
        showError(translations[languageSelect.value].messages.enterSize, resultCard, resultNote);
        return;
    }

    const chart = sizeData[category][gender];
    const row = findRow(chart, system, size);
    if (!row) {
        showError(translations[languageSelect.value].messages.notFound, resultCard, resultNote);
        return;
    }

    renderResultList(resultList, row, chart.systems);
    resultNote.textContent = translations[languageSelect.value].messages.resultNote;
    showElement(resultCard);
}

function convertClothingSize() {
    if (!clothingCategory || !clothingSystem || !clothingSize || !clothingResult || !clothingResultList || !clothingResultNote) return;
    const category = clothingCategory.value;
    const system = clothingSystem.value;
    const size = clothingSize.value.trim();

    if (!size) {
        showError(translations[languageSelect.value].messages.enterSize, clothingResult, clothingResultNote);
        return;
    }

    const chart = sizeData.clothing[category];
    const row = findRow(chart, system, size);
    if (!row) {
        showError(translations[languageSelect.value].messages.notFound, clothingResult, clothingResultNote);
        return;
    }

    renderResultList(clothingResultList, row, chart.systems);
    clothingResultNote.textContent = translations[languageSelect.value].messages.resultNote;
    showElement(clothingResult);
}

function populateClothingPageTables() {
    if (!clothingTableBody || !clothingTableBodyWomen || !clothingTableBodyKids) return;
    clothingTableBody.innerHTML = "";
    clothingTableBodyWomen.innerHTML = "";
    clothingTableBodyKids.innerHTML = "";

    const renderRows = (rows, body) => {
        rows.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.append(td);
            });
            body.append(tr);
        });
    };

    renderRows(sizeData.clothing.men.rows, clothingTableBody);
    renderRows(sizeData.clothing.women.rows, clothingTableBodyWomen);
    renderRows(sizeData.clothing.kids.rows, clothingTableBodyKids);
}

function convertJeans() {
    if (!jeansW || !jeansL || !jeansResult || !jeansResultList) return;
    const w = normalizeValue(jeansW.value);
    const l = normalizeValue(jeansL.value);
    if (!w || !l) {
        showError("Введите размеры W и L.", jeansResult, jeansResultList.parentElement.querySelector('.result-note') || jeansResultList);
        return;
    }
    const numericW = parseFloat(w);
    const numericL = parseFloat(l);
    const waistInCm = Number.isFinite(numericW) ? Math.round(numericW * 2.54) : null;
    const lengthInCm = Number.isFinite(numericL) ? Math.round(numericL * 2.54) : null;

    jeansResultList.innerHTML = "";
    const resultText = [
        `W: ${w}`,
        `L: ${l}`,
        waistInCm !== null ? `Обхват талии: ${waistInCm} см` : `W: ${w}`,
        lengthInCm !== null ? `Длина: ${l} дюймов (${lengthInCm} см)` : `Длина: ${l}`
    ];
    resultText.forEach(text => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.textContent = text;
        jeansResultList.append(item);
    });
    showElement(jeansResult);
}

function convertBra() {
    if (!braEU || !braUK || !braUS || !braResult || !braResultList) return;
    const eu = braEU.value.trim();
    const uk = braUK.value.trim();
    const us = braUS.value.trim();
    if (!eu && !uk && !us) {
        showError("Введите хотя бы один размер бюстгальтера.", braResult, braResultList.parentElement.querySelector('.result-note') || braResultList);
        return;
    }
    braResultList.innerHTML = "";
    const resultText = [];
    if (eu) resultText.push(`EU: ${eu}`);
    if (uk) resultText.push(`UK: ${uk}`);
    if (us) resultText.push(`US: ${us}`);
    resultText.push("Примерное соответствие: используйте указанные значения как отправную точку.");
    resultText.forEach(text => {
        const item = document.createElement("div");
        item.className = "result-item";
        item.textContent = text;
        braResultList.append(item);
    });
    showElement(braResult);
}

function convertGloves() {
    if (!gloveSize || !gloveResult || !gloveResultList) return;
    const size = parseFloat(normalizeValue(gloveSize.value));
    if (Number.isNaN(size)) {
        showError("Введите размер в см.", gloveResult, gloveResultList.parentElement.querySelector('.result-note') || gloveResultList);
        return;
    }
    gloveResultList.innerHTML = "";
    let label = "M";
    if (size <= 18) label = "S";
    else if (size <= 20) label = "M";
    else if (size <= 22) label = "L";
    else label = "XL";
    const item = document.createElement("div");
    item.className = "result-item";
    item.textContent = `Обхват ${size} см — приблизительный размер: ${label}`;
    gloveResultList.append(item);
    showElement(gloveResult);
}

function convertHat() {
    if (!hatSize || !hatResult || !hatResultList) return;
    const size = parseFloat(normalizeValue(hatSize.value));
    if (Number.isNaN(size)) {
        showError("Введите обхват головы в см.", hatResult, hatResultList.parentElement.querySelector('.result-note') || hatResultList);
        return;
    }
    hatResultList.innerHTML = "";
    let label = "M";
    if (size < 56) label = "S";
    else if (size <= 58) label = "M";
    else if (size <= 60) label = "L";
    else label = "XL";
    const item = document.createElement("div");
    item.className = "result-item";
    item.textContent = `Обхват ${size} см — приблизительный размер: ${label}`;
    hatResultList.append(item);
    showElement(hatResult);
}

function initIndexPage() {
    if (!categorySelect || !genderSelect || !sizeSystemSelect) return;
    updateSizeSystems();
    if (categorySelect) {
        categorySelect.addEventListener("change", () => {
            updateSizeSystems();
            hideElement(resultCard);
        });
    }
    if (genderSelect) {
        genderSelect.addEventListener("change", () => {
            updateSizeSystems();
            hideElement(resultCard);
        });
    }
    if (convertBtn) {
        convertBtn.addEventListener("click", convertSize);
    }
}

function initClothingPage() {
    if (!clothingCategory || !clothingSystem || !convertClothingBtn) return;
    updateClothingSizeSystems();
    populateClothingPageTables();
    clothingCategory.addEventListener("change", () => {
        updateClothingSizeSystems();
        hideElement(clothingResult);
    });
    convertClothingBtn.addEventListener("click", convertClothingSize);
}

function initAccessoriesPage() {
    if (jeansBtn) {
        jeansBtn.addEventListener("click", () => {
            hideElement(jeansResult);
            convertJeans();
        });
    }
    if (braBtn) {
        braBtn.addEventListener("click", () => {
            hideElement(braResult);
            convertBra();
        });
    }
    if (gloveBtn) {
        gloveBtn.addEventListener("click", () => {
            hideElement(gloveResult);
            convertGloves();
        });
    }
    if (hatBtn) {
        hatBtn.addEventListener("click", () => {
            hideElement(hatResult);
            convertHat();
        });
    }
}

if (languageSelect) {
    languageSelect.addEventListener("change", () => {
        applyTranslations(languageSelect.value);
        if (pageType === "clothing") {
            updateClothingSizeSystems();
        }
    });
}

if (pageType === "index") {
    initIndexPage();
} else if (pageType === "clothing") {
    initClothingPage();
} else if (pageType === "accessories") {
    initAccessoriesPage();
}

applyTranslations(languageSelect ? languageSelect.value : "ru");
