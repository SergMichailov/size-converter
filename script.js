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
const languageSelect = document.getElementById("languageSelect");

// Utility functions
function normalizeValue(value) {
    return String(value).trim().replace(',', '.');
}

function findRow(chart, systemName, sizeValue) {
    const index = chart.systems.indexOf(systemName);
    if (index === -1) return null;
    return chart.rows.find(row => normalizeValue(row[index]) === normalizeValue(sizeValue));
}

function hideElement(element) {
    if (element) element.classList.add("hidden");
}

function showElement(element) {
    if (element) element.classList.remove("hidden");
}

function setText(element, text) {
    if (element) element.textContent = text;
}

function setPlaceholder(element, text) {
    if (element) element.placeholder = text;
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

// Translations object with all languages and keys
const translations = {
    ru: {
        // Navigation and common
        navHome: "Главная",
        navClothing: "Одежда",
        navShoes: "Обувь",
        navAccessories: "Аксессуары",
        language: "Язык",
        
        // Index page
        heroEyebrow: "Размеры одежды и обуви",
        indexTitle: "Конвертер размеров",
        indexDescription: "Переводите европейские, американские, английские, китайские размеры одежды и обуви за секунды.",
        openCalculator: "Открыть калькулятор",
        tableSizes: "Таблица размеров",
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
        categoryOptions: ["Обувь", "Одежда"],
        genderOptions: ["Мужское", "Женское", "Детское"],
        
        // Clothing page
        clothingPageTitle: "Конвертер размеров одежды",
        clothingPageDesc: "Мужская, женская и детская одежда — EU, US, UK, CN, JP, KR, AU, CA, MX, BR, IN и универсальные S/M/L.",
        clothingCalcTitle: "Калькулятор одежды",
        clothingCalcDesc: "Выберите категорию, систему и размер, чтобы получить полное соответствие.",
        clothingTableTitle: "Таблица размеров",
        clothingTableDesc: "Сравнение по категориям и универсальным обозначениям.",
        menClothingTitle: "Мужская одежда",
        womenClothingTitle: "Женская одежда",
        kidsClothingTitle: "Детская одежда",
        
        // Shoes page
        shoesPageTitle: "Конвертер размеров обуви",
        shoesPageDesc: "Мужская, женская и детская обувь — EU, US, UK, CN и другие системы.",
        shoesCalcTitle: "Калькулятор обуви",
        shoesCalcDesc: "Выберите категорию, систему и размер, чтобы получить полное соответствие.",
        shoesTableTitle: "Таблица размеров",
        shoesTableDesc: "Сравнение размеров обуви по категориям и системам.",
        menShoesTitle: "Мужская обувь",
        womenShoesTitle: "Женская обувь",
        kidsShoesTitle: "Детская обувь",
        
        // Accessories page
        accessoriesPageEyebrow: "Страница аксессуаров",
        accessoriesPageTitle: "Калькулятор аксессуаров",
        accessoriesPageDesc: "Размеры джинсов, бюстгальтеров, перчаток и шапок в одной удобной форме.",
        jeansTitle: "Джинсы W/L",
        braTitle: "Бюстгальтеры",
        glovesTitle: "Перчатки",
        hatsTitle: "Шапки",
        gloveSizeLabel: "Обхват ладони",
        hatSizeLabel: "Обхват головы",
        
        // Messages
        translationResultsTitle: "Результаты перевода",
        resultTitle: "Результат",
        enterSize: "Введите размер для перевода.",
        notFound: "Мы не нашли точное соответствие. Попробуйте другой размер или систему.",
        resultNote: "Результаты приведены для более точного сравнения между системами размеров.",
        
        // Table headers
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "Межд."],
        shoesHeaders: ["EU", "US", "UK", "CN"]
    },
    en: {
        // Navigation and common
        navHome: "Home",
        navClothing: "Clothing",
        navShoes: "Shoes",
        navAccessories: "Accessories",
        language: "Language",
        
        // Index page
        heroEyebrow: "Clothing & shoe sizes",
        indexTitle: "Size converter",
        indexDescription: "Convert clothing and shoe sizes between EU, US, UK, CN and more.",
        openCalculator: "Open calculator",
        tableSizes: "Size chart",
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
        categoryOptions: ["Shoes", "Clothing"],
        genderOptions: ["Men", "Women", "Kids"],
        
        // Clothing page
        clothingPageTitle: "Clothing size converter",
        clothingPageDesc: "Men's, women's and children's clothing — EU, US, UK, CN, JP, KR, AU, CA, MX, BR, IN and universal S/M/L.",
        clothingCalcTitle: "Clothing calculator",
        clothingCalcDesc: "Select category, system and size to get full correspondence.",
        clothingTableTitle: "Size chart",
        clothingTableDesc: "Comparison by categories and universal designations.",
        menClothingTitle: "Men's clothing",
        womenClothingTitle: "Women's clothing",
        kidsClothingTitle: "Kids clothing",
        
        // Shoes page
        shoesPageTitle: "Shoe size converter",
        shoesPageDesc: "Men's, women's and children's shoes — EU, US, UK, CN and other systems.",
        shoesCalcTitle: "Shoes calculator",
        shoesCalcDesc: "Select category, system and size to get full correspondence.",
        shoesTableTitle: "Size chart",
        shoesTableDesc: "Comparison of shoe sizes by categories and systems.",
        menShoesTitle: "Men's shoes",
        womenShoesTitle: "Women's shoes",
        kidsShoesTitle: "Kids shoes",
        
        // Accessories page
        accessoriesPageEyebrow: "Accessories page",
        accessoriesPageTitle: "Accessories calculator",
        accessoriesPageDesc: "Sizes for jeans, bras, gloves and hats in one convenient form.",
        jeansTitle: "Jeans W/L",
        braTitle: "Bras",
        glovesTitle: "Gloves",
        hatsTitle: "Hats",
        gloveSizeLabel: "Palm circumference",
        hatSizeLabel: "Head circumference",
        
        // Messages
        translationResultsTitle: "Translation Results",
        resultTitle: "Result",
        enterSize: "Enter a size to convert.",
        notFound: "No exact match found. Try another size or system.",
        resultNote: "Results are shown for better comparison across size systems.",
        
        // Table headers
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "INT"],
        shoesHeaders: ["EU", "US", "UK", "CN"]
    },
    fr: {
        // Navigation and common
        navHome: "Accueil",
        navClothing: "Vêtements",
        navShoes: "Chaussures",
        navAccessories: "Accessoires",
        language: "Langue",
        
        // Index page
        heroEyebrow: "Tailles vêtements et chaussures",
        indexTitle: "Convertisseur de tailles",
        indexDescription: "Convertissez les tailles de vêtements et de chaussures entre EU, US, UK, CN et plus.",
        openCalculator: "Ouvrir le calculateur",
        tableSizes: "Tableau des tailles",
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
        categoryOptions: ["Chaussures", "Vêtements"],
        genderOptions: ["Homme", "Femme", "Enfants"],
        
        // Clothing page
        clothingPageTitle: "Convertisseur de tailles de vêtements",
        clothingPageDesc: "Vêtements pour hommes, femmes et enfants — EU, US, UK, CN, JP, KR, AU, CA, MX, BR, IN et S/M/L universels.",
        clothingCalcTitle: "Calculatrice de vêtements",
        clothingCalcDesc: "Sélectionnez la catégorie, le système et la taille pour obtenir la correspondance complète.",
        clothingTableTitle: "Tableau des tailles",
        clothingTableDesc: "Comparaison par catégories et désignations universelles.",
        menClothingTitle: "Vêtements pour hommes",
        womenClothingTitle: "Vêtements pour femmes",
        kidsClothingTitle: "Vêtements pour enfants",
        
        // Shoes page
        shoesPageTitle: "Convertisseur de tailles de chaussures",
        shoesPageDesc: "Chaussures pour hommes, femmes et enfants — EU, US, UK, CN et autres systèmes.",
        shoesCalcTitle: "Calculatrice de chaussures",
        shoesCalcDesc: "Sélectionnez la catégorie, le système et la taille pour obtenir la correspondance complète.",
        shoesTableTitle: "Tableau des tailles",
        shoesTableDesc: "Comparaison des tailles de chaussures par catégories et systèmes.",
        menShoesTitle: "Chaussures pour hommes",
        womenShoesTitle: "Chaussures pour femmes",
        kidsShoesTitle: "Chaussures pour enfants",
        
        // Accessories page
        accessoriesPageEyebrow: "Page des accessoires",
        accessoriesPageTitle: "Calculatrice d'accessoires",
        accessoriesPageDesc: "Tailles de jeans, soutiens-gorge, gants et chapeaux en une seule forme pratique.",
        jeansTitle: "Jeans W/L",
        braTitle: "Soutiens-gorge",
        glovesTitle: "Gants",
        hatsTitle: "Chapeaux",
        gloveSizeLabel: "Circonférence de la paume",
        hatSizeLabel: "Circonférence de la tête",
        
        // Messages
        translationResultsTitle: "Résultats de la conversion",
        resultTitle: "Résultat",
        enterSize: "Entrez une taille à convertir.",
        notFound: "Aucune correspondance exacte trouvée. Essayez une autre taille ou un autre système.",
        resultNote: "Les résultats sont affichés pour une meilleure comparaison entre les systèmes de taille.",
        
        // Table headers
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "INT"],
        shoesHeaders: ["EU", "US", "UK", "CN"]
    },
    nl: {
        // Navigation and common
        navHome: "Startpagina",
        navClothing: "Kleding",
        navShoes: "Schoenen",
        navAccessories: "Accessoires",
        language: "Taal",
        
        // Index page
        heroEyebrow: "Kleding- & schoenmaten",
        indexTitle: "Maatconverter",
        indexDescription: "Converteer kleding- en schoenmaten tussen EU, US, UK, CN en meer.",
        openCalculator: "Open rekenmachine",
        tableSizes: "Maattabel",
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
        categoryOptions: ["Schoenen", "Kleding"],
        genderOptions: ["Heren", "Dames", "Kinderen"],
        
        // Clothing page
        clothingPageTitle: "Kledingmaat-converter",
        clothingPageDesc: "Heren-, dames- en kinderkleding — EU, US, UK, CN, JP, KR, AU, CA, MX, BR, IN en universeel S/M/L.",
        clothingCalcTitle: "Kledingrekenmachine",
        clothingCalcDesc: "Selecteer categorie, systeem en maat om volledige overeenkomst te verkrijgen.",
        clothingTableTitle: "Maattabel",
        clothingTableDesc: "Vergelijking per categorie en universele aanduidingen.",
        menClothingTitle: "Herenkleding",
        womenClothingTitle: "Dameskleding",
        kidsClothingTitle: "Kinderkleding",
        
        // Shoes page
        shoesPageTitle: "Schoenmaat-converter",
        shoesPageDesc: "Heren-, dames- en kinderschoenen — EU, US, UK, CN en andere systemen.",
        shoesCalcTitle: "Schoenenrekenmachine",
        shoesCalcDesc: "Selecteer categorie, systeem en maat om volledige overeenkomst te verkrijgen.",
        shoesTableTitle: "Maattabel",
        shoesTableDesc: "Vergelijking van schoenmaten per categorie en systeem.",
        menShoesTitle: "Herenschoenen",
        womenShoesTitle: "Dameschoenen",
        kidsShoesTitle: "Kinderschoenen",
        
        // Accessories page
        accessoriesPageEyebrow: "Accessoirespagina",
        accessoriesPageTitle: "Accessoiresrekenmachine",
        accessoriesPageDesc: "Maten voor jeans, beha's, handschoenen en hoeden in één handig formulier.",
        jeansTitle: "Jeans W/L",
        braTitle: "Beha's",
        glovesTitle: "Handschoenen",
        hatsTitle: "Hoeden",
        gloveSizeLabel: "Handpalm-omvang",
        hatSizeLabel: "Hoofdomvang",
        
        // Messages
        translationResultsTitle: "Conversieresultaten",
        resultTitle: "Resultaat",
        enterSize: "Voer een maat in om te converteren.",
        notFound: "Geen exacte overeenkomst gevonden. Probeer een andere maat of systeem.",
        resultNote: "Resultaten worden weergegeven voor een betere vergelijking tussen maatsystemen.",
        
        // Table headers
        clothingHeaders: ["EU", "US", "UK", "FR", "CN", "INT"],
        shoesHeaders: ["EU", "US", "UK", "CN"]
    }
};

// Apply translations to page
function applyTranslations(lang) {
    const data = translations[lang] || translations.ru;
    
    document.documentElement.lang = lang;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.dataset.translate;
        if (data[key]) {
            element.textContent = data[key];
        }
    });
    
    // Update navigation
    const navLinks = {
        navHome: document.getElementById("navHome"),
        navClothing: document.getElementById("navClothing"),
        navShoes: document.getElementById("navShoes"),
        navAccessories: document.getElementById("navAccessories"),
        langLabel: document.getElementById("langLabel")
    };
    
    Object.entries(navLinks).forEach(([key, element]) => {
        if (element && data[key]) {
            element.textContent = data[key];
        }
    });
    
    // Update category and gender options
    const categorySelect = document.getElementById("categorySelect") || document.getElementById("clothingCategory") || document.getElementById("shoesCategory");
    const genderSelect = document.getElementById("genderSelect");
    
    if (categorySelect) {
        const categoryOptions = categorySelect.querySelectorAll("option");
        if (categoryOptions.length >= 2) {
            categoryOptions[0].textContent = data.categoryOptions[0];
            categoryOptions[1].textContent = data.categoryOptions[1];
        }
    }
    
    if (genderSelect) {
        const genderOptions = genderSelect.querySelectorAll("option");
        if (genderOptions.length >= 3) {
            genderOptions[0].textContent = data.genderOptions[0];
            genderOptions[1].textContent = data.genderOptions[1];
            genderOptions[2].textContent = data.genderOptions[2];
        }
    }
    
    // Populate tables for index page
    if (pageType === "index") {
        populateIndexTables(lang);
    }
    // Populate tables for clothing page
    else if (pageType === "clothing") {
        populateClothingPageTables(lang);
    }
    // Populate tables for shoes page
    else if (pageType === "shoes") {
        populateShoesPageTables(lang);
    }
}

function populateIndexTables(lang) {
    const clothingTableBody = document.getElementById("clothingTableBody");
    const shoesTableBody = document.getElementById("shoesTableBody");
    if (!clothingTableBody || !shoesTableBody) return;
    
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
        tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td>`;
        shoesTableBody.append(tr);
        const tr2 = document.createElement("tr");
        tr2.innerHTML = `<td>${womenRow[0]}</td><td>${womenRow[1]}</td><td>${womenRow[2]}</td><td>${womenRow[3]}</td>`;
        shoesTableBody.append(tr2);
    });
}

function populateClothingPageTables(lang) {
    const clothingTableBody = document.getElementById("clothingTableBody");
    const clothingTableBodyWomen = document.getElementById("clothingTableBodyWomen");
    const clothingTableBodyKids = document.getElementById("clothingTableBodyKids");
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

function populateShoesPageTables(lang) {
    const shoesTableBodyMen = document.getElementById("shoesTableBodyMen");
    const shoesTableBodyWomen = document.getElementById("shoesTableBodyWomen");
    const shoesTableBodyKids = document.getElementById("shoesTableBodyKids");
    if (!shoesTableBodyMen || !shoesTableBodyWomen || !shoesTableBodyKids) return;
    
    shoesTableBodyMen.innerHTML = "";
    shoesTableBodyWomen.innerHTML = "";
    shoesTableBodyKids.innerHTML = "";
    
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
    
    renderRows(sizeData.shoes.men.rows, shoesTableBodyMen);
    renderRows(sizeData.shoes.women.rows, shoesTableBodyWomen);
    renderRows(sizeData.shoes.kids.rows, shoesTableBodyKids);
}

// Index page functions
function initIndexPage() {
    const categorySelect = document.getElementById("categorySelect");
    const genderSelect = document.getElementById("genderSelect");
    const sizeSystemSelect = document.getElementById("sizeSystemSelect");
    const convertBtn = document.getElementById("convertBtn");
    const resultCard = document.getElementById("resultCard");
    
    if (!categorySelect || !genderSelect || !sizeSystemSelect) return;
    
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
    
    function convertSize() {
        const category = categorySelect.value;
        const gender = genderSelect.value;
        const system = sizeSystemSelect.value;
        const size = document.getElementById("sizeInput").value.trim();
        const resultList = document.getElementById("resultList");
        const resultNote = document.getElementById("resultNote");
        
        if (!size) {
            showError(translations[languageSelect.value].enterSize, resultCard, resultNote);
            return;
        }
        
        const chart = sizeData[category][gender];
        const row = findRow(chart, system, size);
        if (!row) {
            showError(translations[languageSelect.value].notFound, resultCard, resultNote);
            return;
        }
        
        renderResultList(resultList, row, chart.systems);
        resultNote.textContent = translations[languageSelect.value].resultNote;
        showElement(resultCard);
    }
    
    updateSizeSystems();
    categorySelect.addEventListener("change", () => {
        updateSizeSystems();
        hideElement(resultCard);
    });
    genderSelect.addEventListener("change", () => {
        updateSizeSystems();
        hideElement(resultCard);
    });
    if (convertBtn) {
        convertBtn.addEventListener("click", convertSize);
    }
}

// Clothing page functions
function initClothingPage() {
    const clothingCategory = document.getElementById("clothingCategory");
    const clothingSystem = document.getElementById("clothingSystem");
    const clothingSize = document.getElementById("clothingSize");
    const convertClothingBtn = document.getElementById("convertClothingBtn");
    const clothingResult = document.getElementById("clothingResult");
    
    if (!clothingCategory || !clothingSystem || !convertClothingBtn) return;
    
    function updateClothingSizeSystems() {
        const category = clothingCategory.value;
        const current = sizeData.clothing[category];
        if (!current) return;
        populateSelect(clothingSystem, current.systems);
    }
    
    function convertClothingSize() {
        const category = clothingCategory.value;
        const system = clothingSystem.value;
        const size = clothingSize.value.trim();
        const clothingResultList = document.getElementById("clothingResultList");
        const clothingResultNote = document.getElementById("clothingResultNote");
        
        if (!size) {
            showError(translations[languageSelect.value].enterSize, clothingResult, clothingResultNote);
            return;
        }
        
        const chart = sizeData.clothing[category];
        const row = findRow(chart, system, size);
        if (!row) {
            showError(translations[languageSelect.value].notFound, clothingResult, clothingResultNote);
            return;
        }
        
        renderResultList(clothingResultList, row, chart.systems);
        clothingResultNote.textContent = translations[languageSelect.value].resultNote;
        showElement(clothingResult);
    }
    
    updateClothingSizeSystems();
    populateClothingPageTables(languageSelect.value);
    clothingCategory.addEventListener("change", () => {
        updateClothingSizeSystems();
        hideElement(clothingResult);
    });
    convertClothingBtn.addEventListener("click", convertClothingSize);
}

// Shoes page functions
function initShoesPage() {
    const shoesCategory = document.getElementById("shoesCategory");
    const shoesSystem = document.getElementById("shoesSystem");
    const shoesSize = document.getElementById("shoesSize");
    const convertShoesBtn = document.getElementById("convertShoesBtn");
    const shoesResult = document.getElementById("shoesResult");
    
    if (!shoesCategory || !shoesSystem || !convertShoesBtn) return;
    
    function updateShoesSizeSystems() {
        const category = shoesCategory.value;
        const current = sizeData.shoes[category];
        if (!current) return;
        populateSelect(shoesSystem, current.systems);
    }
    
    function convertShoesSize() {
        const category = shoesCategory.value;
        const system = shoesSystem.value;
        const size = shoesSize.value.trim();
        const shoesResultList = document.getElementById("shoesResultList");
        const shoesResultNote = document.getElementById("shoesResultNote");
        
        if (!size) {
            showError(translations[languageSelect.value].enterSize, shoesResult, shoesResultNote);
            return;
        }
        
        const chart = sizeData.shoes[category];
        const row = findRow(chart, system, size);
        if (!row) {
            showError(translations[languageSelect.value].notFound, shoesResult, shoesResultNote);
            return;
        }
        
        renderResultList(shoesResultList, row, chart.systems);
        shoesResultNote.textContent = translations[languageSelect.value].resultNote;
        showElement(shoesResult);
    }
    
    updateShoesSizeSystems();
    populateShoesPageTables(languageSelect.value);
    shoesCategory.addEventListener("change", () => {
        updateShoesSizeSystems();
        hideElement(shoesResult);
    });
    convertShoesBtn.addEventListener("click", convertShoesSize);
}

// Accessories page functions
function initAccessoriesPage() {
    const jeansW = document.getElementById("jeansW");
    const jeansL = document.getElementById("jeansL");
    const jeansBtn = document.getElementById("jeansBtn");
    const jeansResult = document.getElementById("jeansResult");
    const jeansResultList = document.getElementById("jeansResultList");
    
    const braEU = document.getElementById("braEU");
    const braUK = document.getElementById("braUK");
    const braUS = document.getElementById("braUS");
    const braBtn = document.getElementById("braBtn");
    const braResult = document.getElementById("braResult");
    const braResultList = document.getElementById("braResultList");
    
    const gloveSize = document.getElementById("gloveSize");
    const gloveBtn = document.getElementById("gloveBtn");
    const gloveResult = document.getElementById("gloveResult");
    const gloveResultList = document.getElementById("gloveResultList");
    
    const hatSize = document.getElementById("hatSize");
    const hatBtn = document.getElementById("hatBtn");
    const hatResult = document.getElementById("hatResult");
    const hatResultList = document.getElementById("hatResultList");
    
    if (jeansBtn && jeansW && jeansL) {
        jeansBtn.addEventListener("click", () => {
            const w = normalizeValue(jeansW.value);
            const l = normalizeValue(jeansL.value);
            if (!w || !l) {
                showError("Введите размеры W и L.", jeansResult, jeansResultList);
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
        });
    }
    
    if (braBtn && braEU && braUK && braUS) {
        braBtn.addEventListener("click", () => {
            const eu = braEU.value.trim();
            const uk = braUK.value.trim();
            const us = braUS.value.trim();
            if (!eu && !uk && !us) {
                showError("Введите хотя бы один размер бюстгальтера.", braResult, braResultList);
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
        });
    }
    
    if (gloveBtn && gloveSize) {
        gloveBtn.addEventListener("click", () => {
            const size = parseFloat(normalizeValue(gloveSize.value));
            if (Number.isNaN(size)) {
                showError("Введите размер в см.", gloveResult, gloveResultList);
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
        });
    }
    
    if (hatBtn && hatSize) {
        hatBtn.addEventListener("click", () => {
            const size = parseFloat(normalizeValue(hatSize.value));
            if (Number.isNaN(size)) {
                showError("Введите обхват головы в см.", hatResult, hatResultList);
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
        });
    }
}

// Initialize language selector
if (languageSelect) {
    languageSelect.addEventListener("change", () => {
        applyTranslations(languageSelect.value);
        if (pageType === "clothing") {
            const clothingSystem = document.getElementById("clothingSystem");
            const clothingCategory = document.getElementById("clothingCategory");
            if (clothingCategory && clothingSystem) {
                const category = clothingCategory.value;
                const current = sizeData.clothing[category];
                if (current) {
                    populateSelect(clothingSystem, current.systems);
                }
            }
        } else if (pageType === "shoes") {
            const shoesSystem = document.getElementById("shoesSystem");
            const shoesCategory = document.getElementById("shoesCategory");
            if (shoesCategory && shoesSystem) {
                const category = shoesCategory.value;
                const current = sizeData.shoes[category];
                if (current) {
                    populateSelect(shoesSystem, current.systems);
                }
            }
        }
    });
}

// Initialize appropriate page
if (pageType === "index") {
    initIndexPage();
} else if (pageType === "clothing") {
    initClothingPage();
} else if (pageType === "shoes") {
    initShoesPage();
} else if (pageType === "accessories") {
    initAccessoriesPage();
}

// Apply initial translations
applyTranslations(languageSelect ? languageSelect.value : "ru");
