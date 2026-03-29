document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dots = Array.from(document.querySelectorAll('.dot'));
    const particlesContainer = document.getElementById('particles-container');

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // CSS Bouquets HTML Generator
    function buildCSSBouquets() {
        const bouquetConfigs = {
            'margarita': {
                flowers: 16,
                className: 'daisy',
                wrapper: '<div class="ribbon-tie"></div>',
                html: '<div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="center"></div>'
            },
            'gerbera': {
                flowers: 8,
                className: 'gerbera',
                wrapper: '<div class="wrapper gerbera-wrapper"></div><div class="ribbon-bow-green"></div>',
                html: '<div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal outer"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="petal inner"></div><div class="center"></div>'
            },
            'jazmin': {
                flowers: 14,
                className: 'jasmine',
                wrapper: '<div class="cord-tie"></div>',
                html: '<div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="petal"></div><div class="center"></div>'
            },
            'tulipan': {
                flowers: 12,
                className: 'tulip',
                wrapper: '<div class="wrapper tulip-wrapper"></div>',
                html: '<div class="leaf left"></div><div class="leaf right"></div><div class="petal back"></div><div class="petal left"></div><div class="petal right"></div><div class="petal front"></div>'
            }
        };

        for (let type in bouquetConfigs) {
            const container = document.getElementById('bouquet-' + type);
            if (!container) continue;

            const config = bouquetConfigs[type];

            // Stems specific to each bouquet
            let stemCount = type === 'jazmin' ? 8 : (type === 'margarita' ? 12 : 6);
            let stemsClass = type === 'jazmin' ? 'brown-stems' : '';

            let stemsHtml = `<div class="stems-container ${stemsClass}">`;
            for (let i = 1; i <= stemCount; i++) {
                let rx = Math.random() * 20 - 10;
                stemsHtml += `<div class="stem" style="transform: rotate(${rx}deg); left: ${Math.random() * 30 + 5}px;"></div>`;
            }
            // Add custom wrapper/bow
            stemsHtml += config.wrapper + '</div>';

            // Add background wrapping elements if any
            let bgWrapper = '';
            if (type === 'gerbera') bgWrapper = '<div class="bg-wrap gerbera-wrap"></div>';
            if (type === 'tulipan') bgWrapper = '<div class="bg-wrap tulip-wrap"></div>';

            // Add flowers
            let flowersHtml = '<div class="flowers-container">';
            for (let i = 1; i <= config.flowers; i++) {
                flowersHtml += `<div class="flower ${config.className} f${i}">${config.html}</div>`;
            }
            flowersHtml += '</div>';

            // Convert to back css-bouquet wrapper just in case
            container.className = "css-bouquet bouquet-" + type;
            container.innerHTML = bgWrapper + stemsHtml + flowersHtml;
        }

        const lirioContainer = document.getElementById('bouquet-lirio');
        if (lirioContainer) {
            lirioContainer.className = "css-bouquet bouquet-lirio";
            lirioContainer.innerHTML = getLilySvg();
        }

        const margaritaContainer = document.getElementById('bouquet-margarita');
        if (margaritaContainer) {
            margaritaContainer.className = "css-bouquet bouquet-margarita";
            margaritaContainer.innerHTML = getDaisySvg();
        }

        const gerberaContainer = document.getElementById('bouquet-gerbera');
        if (gerberaContainer) {
            gerberaContainer.className = "css-bouquet bouquet-gerbera";
            gerberaContainer.innerHTML = getGerberaSvg();
        }

        const jazminContainer = document.getElementById('bouquet-jazmin');
        if (jazminContainer) {
            jazminContainer.className = "css-bouquet bouquet-jazmin";
            jazminContainer.innerHTML = getJasmineSvg();
        }

        const tulipanContainer = document.getElementById('bouquet-tulipan');
        if (tulipanContainer) {
            tulipanContainer.className = "css-bouquet bouquet-tulipan";
            tulipanContainer.innerHTML = getTulipSvg();
        }
    }

    function getDaisySvg() {
        return `
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="overflow:visible;" class="svg-bouquet">
            <defs>
                <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffeb3b" />
                    <stop offset="70%" stop-color="#ffc107" />
                    <stop offset="100%" stop-color="#ff9800" />
                </radialGradient>
                <linearGradient id="daisyStem" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#8bc34a" />
                    <stop offset="100%" stop-color="#558b2f" />
                </linearGradient>

                <g id="daisy-petal">
                    <path d="M0,0 C8,-30 8,-55 0,-65 C-8,-55 -8,-30 0,0" fill="#ffffff" stroke="#f0f0f0" stroke-width="1.5" />
                    <path d="M0,-10 L0,-50" fill="none" stroke="#f5f5f5" stroke-width="1" />
                </g>

                <g id="daisy-leaf">
                    <path d="M0,0 M10,-30 L20,-60 M0,-15 L-15,-30 M5,-30 L25,-40" fill="none" stroke="#8bc34a" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M10,-45 M2,-5 L-10,-25 M0,-35 L-5,-55" fill="none" stroke="#8bc34a" stroke-width="2" stroke-linecap="round" />
                </g>

                <g id="daisy-flower">
                    <!-- 16 Petals -->
                    <use href="#daisy-petal" transform="rotate(0)" />
                    <use href="#daisy-petal" transform="rotate(22.5)" />
                    <use href="#daisy-petal" transform="rotate(45)" />
                    <use href="#daisy-petal" transform="rotate(67.5)" />
                    <use href="#daisy-petal" transform="rotate(90)" />
                    <use href="#daisy-petal" transform="rotate(112.5)" />
                    <use href="#daisy-petal" transform="rotate(135)" />
                    <use href="#daisy-petal" transform="rotate(157.5)" />
                    <use href="#daisy-petal" transform="rotate(180)" />
                    <use href="#daisy-petal" transform="rotate(202.5)" />
                    <use href="#daisy-petal" transform="rotate(225)" />
                    <use href="#daisy-petal" transform="rotate(247.5)" />
                    <use href="#daisy-petal" transform="rotate(270)" />
                    <use href="#daisy-petal" transform="rotate(292.5)" />
                    <use href="#daisy-petal" transform="rotate(315)" />
                    <use href="#daisy-petal" transform="rotate(337.5)" />
                    <!-- Center -->
                    <circle cx="0" cy="0" r="16" fill="url(#daisyCenter)" />
                    <!-- Dot texture passing inside center -->
                    <circle cx="-5" cy="-5" r="1" fill="#d84315" opacity="0.3"/>
                    <circle cx="5" cy="5" r="1" fill="#d84315" opacity="0.3"/>
                    <circle cx="0" cy="8" r="1" fill="#d84315" opacity="0.4"/>
                    <circle cx="-6" cy="2" r="1" fill="#d84315" opacity="0.3"/>
                </g>

                <!-- Tight Stems Base with smooth U cut edge (from Reference) -->
                <g id="tied-stems">
                    <!-- Background shading block -->
                    <path d="M-30,0 L-30,80 Q0,110 30,80 L30,0 Z" fill="#33691e" />
                    <!-- Vertical Tight Stem Lines Layer 1 -->
                    <path d="M-25,0 L-25,88 M-20,0 L-20,93 M-15,0 L-15,97 M-10,0 L-10,100 M-5,0 L-5,102 M0,0 L0,103 M5,0 L5,102 M10,0 L10,100 M15,0 L15,97 M20,0 L20,93 M25,0 L25,88" fill="none" stroke="url(#daisyStem)" stroke-width="4.5" stroke-linecap="round" />
                    <!-- Vertical Tight Stem Lines Layer 2 (Highlights) -->
                    <path d="M-22,0 L-22,90 M-17,0 L-17,95 M-12,0 L-12,98 M-7,0 L-7,101 M-2,0 L-2,102 M3,0 L3,102 M8,0 L8,101 M13,0 L13,98 M18,0 L18,95 M23,0 L23,90" fill="none" stroke="#aed581" stroke-width="2.5" stroke-linecap="round" />
                    <!-- Left and Right Edge stems -->
                    <path d="M-28,0 L-28,83 M28,0 L28,83" fill="none" stroke="url(#daisyStem)" stroke-width="4" stroke-linecap="round" />
                </g>
                
                <g id="pink-bow">
                    <path d="M0,0 C-40,-35 -70,25 0,20 C70,25 40,-35 0,0" fill="none" stroke="#ffb6c1" stroke-width="9" stroke-linecap="round" />
                    <path d="M0,0 C-40,-35 -70,25 0,20 C70,25 40,-35 0,0" fill="none" stroke="#fce4ec" stroke-width="3" stroke-linecap="round" />
                    <!-- Ribbon tails -->
                    <path d="M-5,15 Q-30,70 -60,95" fill="none" stroke="#ffb6c1" stroke-width="8" stroke-linecap="round" />
                    <path d="M5,15 Q30,70 60,95" fill="none" stroke="#ffb6c1" stroke-width="8" stroke-linecap="round" />
                    <circle cx="0" cy="8" r="8" fill="#ffb6c1" />
                </g>
            </defs>

            <g transform="translate(250, 240)">
                <!-- MEGA MASSIVE TIGHT STEM BASE -->
                <use href="#tied-stems" transform="translate(0, 80) scale(1.1)" />
                
                <!-- Hojas Inferiores extra que caen al lado de los tallos -->
                <use href="#daisy-leaf" transform="rotate(-160) translate(-35,-95) scale(1.6)" />
                <use href="#daisy-leaf" transform="rotate(160) translate(35,-95) scale(1.6)" />

                <!-- Ribon de amarre rosa ancho tapando los tallos limpios -->
                <use href="#pink-bow" transform="translate(0, 100) scale(1.1)" />

                <!-- Hojas Finas Perimetrales -->
                <g transform="scale(1.15)">
                    <use href="#daisy-leaf" transform="rotate(-40) translate(-80,-20) scale(1.5)" />
                    <use href="#daisy-leaf" transform="rotate(40) translate(80,-20) scale(1.5)" />
                    <use href="#daisy-leaf" transform="rotate(-80) translate(-80,10) scale(1.5)" />
                    <use href="#daisy-leaf" transform="rotate(80) translate(80,10) scale(1.5)" />
                    <use href="#daisy-leaf" transform="rotate(-120) translate(-60,30) scale(1.2)" />
                    <use href="#daisy-leaf" transform="rotate(120) translate(60,30) scale(1.2)" />
                    <use href="#daisy-leaf" transform="rotate(-15) translate(-20,-110) scale(1.5)" />
                    <use href="#daisy-leaf" transform="rotate(15) translate(20,-110) scale(1.5)" />
                </g>

                <!-- GLOBE MARGARITAS MEGA SCALED FOR MASSIVE BOUQUET FEEL -->
                <g transform="scale(1.15) translate(0, -10)">
                    <!-- Capa Trasera / Perímetro Alto -->
                    <g transform="translate(0, -110)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.85) rotate(15)" /></g>
                    <g transform="translate(-60, -90)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.8) rotate(-25)" /></g>
                    <g transform="translate(60, -90)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.6s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.9) rotate(35)" /></g>
                    <!-- Extra top rim -->
                    <g transform="translate(-100, -70)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.8) rotate(-15)" /></g>
                    <g transform="translate(100, -70)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.0s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.8) rotate(15)" /></g>

                    <!-- Corona Media -->
                    <g transform="translate(-100, -30)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.85) rotate(-10)" /></g>
                    <g transform="translate(100, -40)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.8) rotate(20)" /></g>
                    <!-- Extra outer sides -->
                    <g transform="translate(-130, 10)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.8) rotate(-30)" /></g>
                    <g transform="translate(120, 0)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.85) rotate(60)" /></g>

                    <!-- Corona Lateral Inferior -->
                    <g transform="translate(-110, 30)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="5s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.85) rotate(-45)" /></g>
                    <g transform="translate(100, 20)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="3.5s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.8) rotate(55)" /></g>

                    <!-- Base Tapa-Tallos -->
                    <g transform="translate(-70, 70)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.9) rotate(-140)" /></g>
                    <g transform="translate(60, 80)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(0.85) rotate(140)" /></g>
                    <g transform="translate(-10, 95)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.6s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(1) rotate(180)" /></g>

                    <!-- Foco Central Llenador (Corazón del ramo) -->
                    <g transform="translate(-40, -40)"><animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="3.9s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(1.05) rotate(5)" /></g>
                    <g transform="translate(40, -30)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.3s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(1) rotate(-15)" /></g>
                    <g transform="translate(-30, 20)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(1.1) rotate(25)" /></g>
                    <g transform="translate(40, 30)"><animateTransform attributeName="transform" type="scale" values="1;1.07;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(1) rotate(-5)" /></g>
                    <g transform="translate(0, -10)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3.6s" repeatCount="indefinite" additive="sum"/><use href="#daisy-flower" transform="scale(1.15) rotate(10)" /></g>
                </g>
            </g>
        </svg>
        `;
    }

    function getGerberaSvg() {
        const createFlower = (id, color, centerColor) => {
            let petals = '';
            for (let i = 0; i < 20; i++) petals += `<use href="#gerbera-petal" transform="rotate(${i * 18})" />`;
            for (let i = 0; i < 20; i++) petals += `<use href="#gerbera-petal" transform="rotate(${(i * 18) + 9}) scale(0.85)" />`;
            return `<g id="${id}" color="${color}">${petals}<circle cx="0" cy="0" r="18" fill="${centerColor}" /><circle cx="0" cy="0" r="14" fill="transparent" stroke="rgba(0,0,0,0.15)" stroke-dasharray="2 3" stroke-width="3"/></g>`;
        };

        return `
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="overflow:visible;" class="svg-bouquet">
            <defs>
                <radialGradient id="gCenterDark" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#3e2723" />
                    <stop offset="80%" stop-color="#212121" />
                    <stop offset="100%" stop-color="#000000" />
                </radialGradient>
                <radialGradient id="gCenterLight" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffca28" />
                    <stop offset="70%" stop-color="#ffb300" />
                    <stop offset="100%" stop-color="#f57c00" />
                </radialGradient>

                <linearGradient id="gStem" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#8bc34a" />
                    <stop offset="100%" stop-color="#33691e" />
                </linearGradient>

                <!-- Orange wrapping band gradient -->
                <linearGradient id="orgBand" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#f57c00" />
                    <stop offset="50%" stop-color="#ffb300" />
                    <stop offset="100%" stop-color="#e65100" />
                </linearGradient>

                <!-- Universal Gerbera Petal -->
                <g id="gerbera-petal">
                    <path d="M0,0 C12,-35 12,-65 0,-70 C-12,-65 -12,-35 0,0" fill="currentColor" opacity="0.95" />
                    <path d="M0,-15 L0,-60" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="1.5"/>
                    <path d="M-4,-25 Q-6,-45 -2,-55 M4,-25 Q6,-45 2,-55" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="1"/>
                </g>

                ${createFlower('g-red', '#e53935', 'url(#gCenterLight)')}
                ${createFlower('g-darkred', '#c62828', 'url(#gCenterDark)')}
                ${createFlower('g-orange', '#fb8c00', 'url(#gCenterDark)')}
                ${createFlower('g-yellow', '#ffd54f', 'url(#gCenterDark)')}
                ${createFlower('g-coral', '#ff7043', 'url(#gCenterLight)')}                <g id="tied-stems-g">
                    <path d="M-30,0 L-30,80 Q0,110 30,80 L30,0 Z" fill="#2e7d32" />
                    <!-- Tight Vertical Lines Gerbera -->
                    <path d="M-25,0 L-25,88 M-20,0 L-20,93 M-15,0 L-15,97 M-10,0 L-10,100 M-5,0 L-5,102 M0,0 L0,103 M5,0 L5,102 M10,0 L10,100 M15,0 L15,97 M20,0 L20,93 M25,0 L25,88" fill="none" stroke="url(#gStem)" stroke-width="4.5" stroke-linecap="round" />
                    <!-- Details -->
                    <path d="M-22,0 L-22,90 M-17,0 L-17,95 M-12,0 L-12,98 M-7,0 L-7,101 M-2,0 L-2,102 M3,0 L3,102 M8,0 L8,101 M13,0 L13,98 M18,0 L18,95 M23,0 L23,90" fill="none" stroke="#689f38" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M-28,0 L-28,83 M28,0 L28,83" fill="none" stroke="url(#gStem)" stroke-width="4" stroke-linecap="round" />
                </g>
                
                <!-- Huge wide orange wrapping fabric band -->
                <g id="orange-band">
                    <!-- Base Wrap -->
                    <path d="M-35,0 L35,-5 L35,45 L-35,55 Z" fill="url(#orgBand)" />
                    <!-- Wrinkles/Folds in fabric -->
                    <path d="M-35,20 Q0,30 35,15" fill="none" stroke="#e65100" stroke-width="2.5" />
                    <path d="M-35,35 Q0,40 35,25" fill="none" stroke="#e65100" stroke-width="2" />
                    <path d="M-35,10 Q0,15 35,5" fill="none" stroke="#e65100" stroke-width="2" />
                </g>
            </defs>

            <g transform="translate(250, 240)">
                <!-- MEGA MASSIVE TIGHT STEM BASE FOR GERBERA -->
                <use href="#tied-stems-g" transform="translate(0, 80) scale(1.15)" />

                <!-- Tightly Wrapped Wide Orange Fabric Band -->
                <use href="#orange-band" transform="translate(0, 105) scale(1.1)" />

                <!-- GERBERA GLOBE (MASSIVE MULTICOLORED FLOWERS SCALED UP) -->
                <g transform="scale(1.15)">
                    <!-- BACK LAYER -->
                    <g transform="translate(-80, -100)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#g-orange" transform="scale(0.85) rotate(-15)" /></g>
                    <g transform="translate(80, -90)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#g-yellow" transform="scale(0.8) rotate(25)" /></g>
                    <g transform="translate(0, -120)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#g-red" transform="scale(0.85) rotate(-5)" /></g>

                    <!-- MIDDLE CROWN -->
                    <g transform="translate(-130, -30)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#g-darkred" transform="scale(0.8) rotate(-45)" /></g>
                    <g transform="translate(130, -40)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3s" repeatCount="indefinite" additive="sum"/><use href="#g-coral" transform="scale(0.8) rotate(40)" /></g>
                    <g transform="translate(-100, 30)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="5s" repeatCount="indefinite" additive="sum"/><use href="#g-yellow" transform="scale(0.85) rotate(-75)" /></g>
                    <g transform="translate(110, 40)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="3.5s" repeatCount="indefinite" additive="sum"/><use href="#g-orange" transform="scale(0.85) rotate(55)" /></g>

                    <!-- LOWER BASE (Covering Stems) -->
                    <g transform="translate(-60, 80)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#g-red" transform="scale(0.8) rotate(-120)" /></g>
                    <g transform="translate(70, 75)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.6s" repeatCount="indefinite" additive="sum"/><use href="#g-yellow" transform="scale(0.75) rotate(140)" /></g>
                    <g transform="translate(0, 100)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#g-coral" transform="scale(0.85) rotate(180)" /></g>

                    <!-- FRONT FOCUS (Huge Heroes) -->
                    <g transform="translate(-40, -40)"><animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="3.9s" repeatCount="indefinite" additive="sum"/><use href="#g-red" transform="scale(1.1) rotate(5)" /></g>
                    <g transform="translate(50, -20)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.3s" repeatCount="indefinite" additive="sum"/><use href="#g-yellow" transform="scale(1.05) rotate(-15)" /></g>
                    <g transform="translate(-30, 20)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#g-orange" transform="scale(1.1) rotate(25)" /></g>
                    <g transform="translate(45, 35)"><animateTransform attributeName="transform" type="scale" values="1;1.07;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#g-coral" transform="scale(1) rotate(-5)" /></g>
                    <g transform="translate(10, -10)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3.6s" repeatCount="indefinite" additive="sum"/><use href="#g-darkred" transform="scale(1.15) rotate(10)" /></g>
                </g>
            </g>
        </svg>
        `;
    }

    function getJasmineSvg() {
        return `
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="overflow:visible;" class="svg-bouquet">
            <defs>
                <radialGradient id="jCenter" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fff59d" />
                    <stop offset="50%" stop-color="#fbc02d" />
                    <stop offset="100%" stop-color="#f57f17" />
                </radialGradient>
                <linearGradient id="jPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="70%" stop-color="#fafafa" />
                    <stop offset="100%" stop-color="#e0e0e0" />
                </linearGradient>
                <linearGradient id="jLeafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#689f38" />
                    <stop offset="50%" stop-color="#33691e" />
                    <stop offset="100%" stop-color="#1b5e20" />
                </linearGradient>
                <linearGradient id="jStemGrp" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#558b2f" />
                    <stop offset="100%" stop-color="#1b5e20" />
                </linearGradient>

                <g id="jazmin-petal">
                    <path d="M0,0 C20,-20 18,-55 0,-60 C-18,-55 -20,-20 0,0" fill="url(#jPetalGrad)" stroke="rgba(0,0,0,0.03)" stroke-width="1"/>
                    <path d="M0,0 Q3,-30 0,-55" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="1.5"/>
                </g>

                <g id="jazmin-stamen">
                    <path d="M0,0 Q3,-5 0,-12" fill="none" stroke="#fbc02d" stroke-width="1.5" />
                    <circle cx="0" cy="-13" r="1.5" fill="#f57f17" />
                </g>

                <g id="jazmin-flower">
                    <use href="#jazmin-petal" transform="rotate(0)" />
                    <use href="#jazmin-petal" transform="rotate(72)" />
                    <use href="#jazmin-petal" transform="rotate(144)" />
                    <use href="#jazmin-petal" transform="rotate(216)" />
                    <use href="#jazmin-petal" transform="rotate(288)" />
                    <!-- Center Detail -->
                    <use href="#jazmin-stamen" transform="rotate(0)"/>
                    <use href="#jazmin-stamen" transform="rotate(72)"/>
                    <use href="#jazmin-stamen" transform="rotate(144)"/>
                    <use href="#jazmin-stamen" transform="rotate(216)"/>
                    <use href="#jazmin-stamen" transform="rotate(288)"/>
                    <circle cx="0" cy="0" r="5" fill="url(#jCenter)" />
                </g>

                <g id="jazmin-leaf">
                    <path d="M0,0 C25,-30 20,-85 0,-110 C-20,-85 -25,-30 0,0" fill="url(#jLeafGrad)" />
                    <!-- Nervadura central clareada -->
                    <path d="M0,0 L0,-105" fill="none" stroke="#9ccc65" stroke-width="1.5" />
                    <!-- Nervaduras laterales -->
                    <path d="M0,-20 L10,-40 M0,-35 L-12,-55 M0,-50 L10,-70 M0,-65 L-8,-85 M0,-80 L6,-95" fill="none" stroke="#9ccc65" stroke-width="1" />
                </g>                <g id="tied-stems-j">
                    <path d="M-30,0 L-30,80 Q0,110 30,80 L30,0 Z" fill="#1b5e20" />
                    <!-- Tight Vertical Lines Jazmin -->
                    <path d="M-25,0 L-25,88 M-20,0 L-20,93 M-15,0 L-15,97 M-10,0 L-10,100 M-5,0 L-5,102 M0,0 L0,103 M5,0 L5,102 M10,0 L10,100 M15,0 L15,97 M20,0 L20,93 M25,0 L25,88" fill="none" stroke="url(#jStemGrp)" stroke-width="4.5" stroke-linecap="round" />
                    <!-- Highlights inner -->
                    <path d="M-22,0 L-22,90 M-17,0 L-17,95 M-12,0 L-12,98 M-7,0 L-7,101 M-2,0 L-2,102 M3,0 L3,102 M8,0 L8,101 M13,0 L13,98 M18,0 L18,95 M23,0 L23,90" fill="none" stroke="#558b2f" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M-28,0 L-28,83 M28,0 L28,83" fill="none" stroke="url(#jStemGrp)" stroke-width="4" stroke-linecap="round" />
                </g>
                
                <g id="jute-tie">
                    <!-- Rustic Jute strings crossing each other -->
                    <path d="M-36,0 C-15,-10 15,-10 36,0 C15,10 -15,10 -36,0 Z" fill="#8d6e63" />
                    <path d="M-34,-8 C-14,-15 14,-15 34,-8 C14,-1 -14,-1 -34,-8 Z" fill="#795548" />
                    <path d="M-38,8 C-16,3 16,3 38,8 C16,13 -16,13 -38,8 Z" fill="#6d4c41" />
                    
                    <path d="M0,10 Q-30,50 -35,65" fill="none" stroke="#795548" stroke-width="5" stroke-linecap="round" />
                    <path d="M10,8 Q25,30 20,50 Q12,70 30,80" fill="none" stroke="#8d6e63" stroke-width="4.5" stroke-linecap="round" />
                </g>
            </defs>

            <g transform="translate(250, 240)">
                <!-- MEGA MASSIVE TIGHT STEM BASE FOR JASMINE -->
                <use href="#tied-stems-j" transform="translate(0, 80) scale(1.15)" />

                <!-- The Jute Tie -->
                <use href="#jute-tie" transform="translate(0, 110) scale(1.15)" />

                <!-- BACKGROUND LEAVES (Giant bright green pointy leaves radiating out) -->
                <g transform="scale(1.15)">
                    <g transform="translate(0, -50)">
                        <use href="#jazmin-leaf" transform="rotate(-40) translate(-40,0) scale(1.3)" />
                        <use href="#jazmin-leaf" transform="rotate(40) translate(40,0) scale(1.3)" />
                        <use href="#jazmin-leaf" transform="rotate(-80) translate(-40,20) scale(1)" />
                        <use href="#jazmin-leaf" transform="rotate(80) translate(40,20) scale(1)" />
                        <use href="#jazmin-leaf" transform="rotate(-15) translate(-20,-40) scale(1.4)" />
                        <use href="#jazmin-leaf" transform="rotate(15) translate(20,-40) scale(1.4)" />
                        <use href="#jazmin-leaf" transform="rotate(-120) translate(-30,40) scale(1.1)" />
                        <use href="#jazmin-leaf" transform="rotate(120) translate(30,40) scale(1.1)" />
                    </g>
                </g>

                <!-- JASMINE GLOBE MEGA SCALED -->
                <g transform="scale(1.2)">
                    <!-- LOWER BASE (Covering Stems) -->
                    <g transform="translate(-50, 70)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.85) rotate(-30)" /></g>
                    <g transform="translate(50, 65)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.8) rotate(40)" /></g>
                    <g transform="translate(0, 90)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.6s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.9) rotate(180)" /></g>

                    <!-- MIDDLE CORONA -->
                    <g transform="translate(-90, 0)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.9) rotate(-70)" /></g>
                    <g transform="translate(90, 10)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.5s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.85) rotate(60)" /></g>
                    <g transform="translate(-80, -60)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.9) rotate(-15)" /></g>
                    <g transform="translate(80, -50)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.9s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.85) rotate(25)" /></g>
                    <g transform="translate(0, -90)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.4s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(0.9) rotate(80)" /></g>

                    <!-- FRONT FOCUS (Central packed star blooms) -->
                    <g transform="translate(-40, -20)"><animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="3.9s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(1.1) rotate(5)" /></g>
                    <g transform="translate(30, -30)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.3s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(1.05) rotate(-25)" /></g>
                    <g transform="translate(-20, 30)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(1) rotate(45)" /></g>
                    <g transform="translate(40, 20)"><animateTransform attributeName="transform" type="scale" values="1;1.07;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(1.1) rotate(-15)" /></g>
                    <g transform="translate(0, 0)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3.6s" repeatCount="indefinite" additive="sum"/><use href="#jazmin-flower" transform="scale(1.2) rotate(10)" /></g>
                </g>
            </g>
        </svg>
        `;
    }

    function getTulipSvg() {
        return `
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="overflow:visible;" class="svg-bouquet">
            <defs>
                <linearGradient id="tPetalBack" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#f48fb1" />
                    <stop offset="50%" stop-color="#e91e63" />
                    <stop offset="100%" stop-color="#c2185b" />
                </linearGradient>
                <linearGradient id="tPetalFront" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#fce4ec" />
                    <stop offset="40%" stop-color="#f06292" />
                    <stop offset="100%" stop-color="#d81b60" />
                </linearGradient>
                <linearGradient id="tPetalHighlight" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="60%" stop-color="#f8bbd0" />
                    <stop offset="100%" stop-color="#e91e63" />
                </linearGradient>

                <linearGradient id="tStem" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#8bc34a" />
                    <stop offset="50%" stop-color="#cddc39" />
                    <stop offset="100%" stop-color="#558b2f" />
                </linearGradient>
                
                <linearGradient id="tLeafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#1b5e20" />
                    <stop offset="40%" stop-color="#4caf50" />
                    <stop offset="100%" stop-color="#81c784" />
                </linearGradient>

                <g id="tulip-leaf-left">
                    <path d="M0,0 Q20,-50 30,-120 Q5,-160 -10,-200 Q-35,-120 -20,-50 Z" fill="url(#tLeafGrad)" />
                    <path d="M0,0 Q10,-100 -10,-190" fill="none" stroke="#2e7d32" stroke-width="2" />
                </g>
                <g id="tulip-leaf-right">
                    <path d="M0,0 Q-20,-50 -30,-120 Q-5,-160 10,-200 Q35,-120 20,-50 Z" fill="url(#tLeafGrad)" />
                    <path d="M0,0 Q-10,-100 10,-190" fill="none" stroke="#2e7d32" stroke-width="2" />
                </g>

                <g id="tulip-flower">
                    <!-- Base glow/shadow for depth -->
                    <!-- Back layer petals -->
                    <path d="M-12,-5 C-25,-30 -25,-60 -10,-85 C-5,-70 0,-40 0,-5 Z" fill="url(#tPetalBack)" />
                    <path d="M12,-5 C25,-30 25,-60 10,-85 C5,-70 0,-40 0,-5 Z" fill="url(#tPetalBack)" />
                    
                    <!-- Main Front Left -->
                    <path d="M0,0 C-30,-5 -35,-45 -12,-85 C-5,-45 0,-20 0,0" fill="url(#tPetalFront)" />
                    <!-- Main Front Right -->
                    <path d="M0,0 C30,-5 35,-45 12,-85 C5,-45 0,-20 0,0" fill="url(#tPetalFront)" />
                    
                    <!-- Center Front Petal overlap (Classic tulip look) -->
                    <path d="M-10,-5 C-20,-45 0,-85 0,-90 C0,-85 20,-45 10,-5 C5,0 -5,0 -10,-5 Z" fill="url(#tPetalHighlight)" />
                    <!-- Bottom Shadow where it meets stem -->
                    <path d="M-10,-5 C-5,-2 5,-2 10,-5 C5,-8 -5,-8 -10,-5 Z" fill="#880e4f" /> 
                </g>

                <g id="tied-stems-t">
                    <path d="M-30,0 L-30,80 Q0,110 30,80 L30,0 Z" fill="#2e7d32" />
                    <path d="M-25,0 L-25,88 M-20,0 L-20,93 M-15,0 L-15,97 M-10,0 L-10,100 M-5,0 L-5,102 M0,0 L0,103 M5,0 L5,102 M10,0 L10,100 M15,0 L15,97 M20,0 L20,93 M25,0 L25,88" fill="none" stroke="url(#tStem)" stroke-width="4.5" stroke-linecap="round" />
                    <!-- Highlights inner -->
                    <path d="M-22,0 L-22,90 M-17,0 L-17,95 M-12,0 L-12,98 M-7,0 L-7,101 M-2,0 L-2,102 M3,0 L3,102 M8,0 L8,101 M13,0 L13,98 M18,0 L18,95 M23,0 L23,90" fill="none" stroke="#689f38" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M-28,0 L-28,83 M28,0 L28,83" fill="none" stroke="url(#tStem)" stroke-width="4" stroke-linecap="round" />
                </g>
                
                <g id="pink-tie">
                    <!-- Band -->
                    <path d="M-25,-2 L25,-8 L25,12 L-25,18 Z" fill="#c2185b" />
                    <!-- Bow loops -->
                    <path d="M0,5 C-35,-25 -45,20 0,5" fill="none" stroke="#f06292" stroke-width="7" stroke-linecap="round" />
                    <path d="M0,5 C35,-25 45,20 0,5" fill="none" stroke="#f06292" stroke-width="7" stroke-linecap="round" />
                    <!-- loop inner shadow -->
                    <path d="M0,5 C-25,-15 -30,10 0,5" fill="none" stroke="#d81b60" stroke-width="2" />
                    <path d="M0,5 C25,-15 30,10 0,5" fill="none" stroke="#d81b60" stroke-width="2" />
                    <!-- Tails -->
                    <path d="M-2,8 Q-25,35 -40,60" fill="none" stroke="#f06292" stroke-width="8" stroke-linecap="round" />
                    <path d="M2,8 Q25,35 40,60" fill="none" stroke="#f06292" stroke-width="8" stroke-linecap="round" />
                    <path d="M-2,8 Q-25,35 -40,60" fill="none" stroke="#fce4ec" stroke-width="2" stroke-linecap="round" />
                    <path d="M2,8 Q25,35 40,60" fill="none" stroke="#fce4ec" stroke-width="2" stroke-linecap="round" />
                    <!-- Center knot -->
                    <circle cx="0" cy="5" r="7" fill="#f48fb1" />
                </g>
            </defs>

            <g transform="translate(250, 240)">
                <!-- MEGA MASSIVE TIGHT STEM BASE FOR TULIP -->
                <use href="#tied-stems-t" transform="translate(0, 80) scale(1.1)" />

                <!-- The Pink Tie -->
                <use href="#pink-tie" transform="translate(0, 110) scale(1.1)" />

                <!-- TULIP GLOBE SCALED UP -->
                <g transform="scale(1.15)">
                    <!-- BACKGROUND LEAVES (Giant tall thick green leaves) -->
                    <g transform="translate(0,-10)">
                        <use href="#tulip-leaf-left" transform="rotate(-40) translate(-30,20) scale(1.1)" />
                        <use href="#tulip-leaf-right" transform="rotate(40) translate(30,20) scale(1.1)" />
                        <use href="#tulip-leaf-left" transform="rotate(-20) translate(-20,0) scale(1.2)" />
                        <use href="#tulip-leaf-right" transform="rotate(20) translate(20,0) scale(1.2)" />
                        <use href="#tulip-leaf-left" transform="rotate(-60) translate(-50,50) scale(1)" />
                        <use href="#tulip-leaf-right" transform="rotate(60) translate(50,50) scale(1)" />
                        <use href="#tulip-leaf-left" transform="rotate(-5) translate(-10,-10) scale(1.3)" />
                        <use href="#tulip-leaf-right" transform="rotate(5) translate(10,-10) scale(1.3)" />
                    </g>
                    
                    <!-- BASE BUDS (To fill the visual gap directly with petals instead of leaves) -->
                    <g transform="translate(-45, 75)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.7) rotate(-65)" /></g>
                    <g transform="translate(50, 75)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.65) rotate(70)" /></g>
                    <g transform="translate(0, 85)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.75) rotate(0)" /></g>
                    <g transform="translate(-20, 70)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.8) rotate(-25)" /></g>
                    <g transform="translate(25, 70)"><animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.8) rotate(30)" /></g>
                    

                    <!-- TULIP GLOBE (Dense closed pink buds) -->
                    
                    <!-- TOP FILL (relleno superior para quitar vacío) -->
                    <g transform="translate(0, -140)">
                    <animateTransform attributeName="transform" type="scale"
                    values="1;1.04;1" dur="4s" repeatCount="indefinite" additive="sum"/>
                    <use href="#tulip-flower" transform="scale(0.8) rotate(0)" />
                    </g>

                    <g transform="translate(-70, -120)">
                    <animateTransform attributeName="transform" type="scale"
                    values="1;1.03;1" dur="4.2s" repeatCount="indefinite" additive="sum"/>
                    <use href="#tulip-flower" transform="scale(0.75) rotate(-20)" />
                    </g>

                    <g transform="translate(70, -120)">
                    <animateTransform attributeName="transform" type="scale"
                    values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/>
                    <use href="#tulip-flower" transform="scale(0.75) rotate(20)" />
                    </g>
                    
                    <!-- BACK ROW -->
                    <g transform="translate(-60, -80)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.85) rotate(-20)" /></g>
                    <g transform="translate(60, -75)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.8) rotate(25)" /></g>
                    <g transform="translate(0, -90)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.85) rotate(0)" /></g>

                    <!-- MIDDLE ROW -->
                    <g transform="translate(-100, -20)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.9) rotate(-35)" /></g>
                    <g transform="translate(100, -10)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.85) rotate(40)" /></g>
                    <g transform="translate(-40, -45)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="5s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.95) rotate(-10)" /></g>
                    <g transform="translate(45, -40)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="3.5s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.9) rotate(15)" /></g>

                    <!-- LOWER SIDES -->
                    <g transform="translate(-70, 40)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.8) rotate(-45)" /></g>
                    <g transform="translate(80, 50)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.6s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.75) rotate(50)" /></g>
                    <g transform="translate(0, 50)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(0.85) rotate(0)" /></g>

                    <!-- FRONT CENTER HEROS -->
                    <g transform="translate(-30, 10)"><animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="3.9s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(1.1) rotate(-10)" /></g>
                    <g transform="translate(35, 20)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.3s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(1.05) rotate(20)" /></g>
                    <g transform="translate(0, -10)"><animateTransform attributeName="transform" type="scale" values="1;1.07;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#tulip-flower" transform="scale(1.15) rotate(5)" /></g>
                </g>
            </g>
        </svg>
        `;
    }

    function getLilySvg() {
        return `
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="overflow:visible;" class="svg-bouquet">
            <defs>
                <radialGradient id="petalGrad" cx="50%" cy="80%" r="80%">
                    <stop offset="0%" stop-color="#ffb114" />
                    <stop offset="40%" stop-color="#fadd42" />
                    <stop offset="80%" stop-color="#ffee90" />
                    <stop offset="100%" stop-color="#fff8ce" />
                </radialGradient>
                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#648A3C" />
                    <stop offset="100%" stop-color="#2c4217" />
                </linearGradient>

                <g id="stamen">
                    <path d="M0,0 Q10,-30 5,-50" fill="none" stroke="#d5dc92" stroke-width="2" />
                    <ellipse cx="6" cy="-52" rx="3" ry="6" fill="#801c10" transform="rotate(-15 6 -52)" />
                </g>

                <path id="lily-petal" d="M0,0 C30,-30 20,-90 0,-110 C-20,-90 -30,-30 0,0" fill="url(#petalGrad)" />
                <path id="lily-petal-nerve" d="M0,-10 Q5,-50 0,-100" fill="none" stroke="#dcb431" stroke-width="1.5" />
                
                <g id="lily-petal-group">
                    <use href="#lily-petal" />
                    <use href="#lily-petal-nerve" />
                    <!-- Dots -->
                    <circle cx="5" cy="-25" r="1.5" fill="#801c10" opacity="0.6"/>
                    <circle cx="-6" cy="-30" r="1" fill="#801c10" opacity="0.6"/>
                    <circle cx="8" cy="-35" r="1" fill="#801c10" opacity="0.6"/>
                    <circle cx="-3" cy="-45" r="1.5" fill="#801c10" opacity="0.5"/>
                    <circle cx="2" cy="-55" r="1.2" fill="#801c10" opacity="0.5"/>
                </g>

                <g id="lily-flower">
                    <use href="#lily-petal-group" transform="rotate(0) scale(1, 1.1)" />
                    <use href="#lily-petal-group" transform="rotate(60) scale(0.95, 1.05)" />
                    <use href="#lily-petal-group" transform="rotate(120) scale(1, 1.1)" />
                    <use href="#lily-petal-group" transform="rotate(180) scale(0.9, 1)" />
                    <use href="#lily-petal-group" transform="rotate(240) scale(1, 1.1)" />
                    <use href="#lily-petal-group" transform="rotate(300) scale(0.95, 1.05)" />
                    <!-- Estambres -->
                    <use href="#stamen" transform="rotate(0)" />
                    <use href="#stamen" transform="rotate(60)" />
                    <use href="#stamen" transform="rotate(120)" />
                    <use href="#stamen" transform="rotate(180)" />
                    <use href="#stamen" transform="rotate(240)" />
                    <use href="#stamen" transform="rotate(300)" />
                    <!-- Centro verde -->
                    <circle cx="0" cy="0" r="8" fill="#a4c639" />
                </g>

                <path id="leaf" d="M0,0 C25,-50 35,-120 0,-160 C-35,-120 -25,-50 0,0" fill="url(#leafGrad)" />
                
                <g id="bud">
                    <path d="M0,0 C15,-40 20,-90 0,-120 C-20,-90 -15,-40 0,0" fill="#dfdc79" />
                    <path d="M0,0 C20,-40 10,-90 0,-120" fill="none" stroke="#648A3C" stroke-width="3" />
                </g>

                <g id="tied-stems-l">
                    <path d="M-30,0 L-30,80 Q0,110 30,80 L30,0 Z" fill="#2c4217" />
                    <!-- Lily Stems are thicker -->
                    <path d="M-24,0 L-24,88 M-16,0 L-16,96 M-8,0 L-8,100 M0,0 L0,103 M8,0 L8,100 M16,0 L16,96 M24,0 L24,88" fill="none" stroke="#648A3C" stroke-width="7" stroke-linecap="round" />
                    <path d="M-20,0 L-20,93 M-12,0 L-12,98 M-4,0 L-4,101 M4,0 L4,101 M12,0 L12,98 M20,0 L20,93" fill="none" stroke="#486829" stroke-width="6" stroke-linecap="round" />
                    <!-- Edge -->
                    <path d="M-28,0 L-28,83 M28,0 L28,83" fill="none" stroke="#486829" stroke-width="5" stroke-linecap="round" />
                </g>
                
                <g id="lily-bow">
                    <path d="M0,0 C-40,-30 -60,20 0,15 C60,20 40,-30 0,0" fill="none" stroke="#a4c639" stroke-width="8" stroke-linecap="round" />
                    <path d="M-5,15 Q-30,60 -50,85" fill="none" stroke="#648A3C" stroke-width="7" stroke-linecap="round" />
                    <path d="M5,15 Q30,60 50,85" fill="none" stroke="#648A3C" stroke-width="7" stroke-linecap="round" />
                    <circle cx="0" cy="8" r="6" fill="#a4c639" />
                </g>
            </defs>

            <!-- Ramos ensamblados con animaciones SVG nativas para no romper transform base -->
            <g transform="translate(250, 240)">
                
                <!-- MEGA MASSIVE TIGHT STEM BASE FOR LILY -->
                <use href="#tied-stems-l" transform="translate(0, 80) scale(1.1)" />
                
                <!-- Hojas Inferiores extra para rellenar vacios y tapar tallos -->
                <use href="#leaf" transform="rotate(-130) translate(-30,-50) scale(1.1)" />
                <use href="#leaf" transform="rotate(130) translate(30,-50) scale(1.1)" />
                
                <use href="#lily-bow" transform="translate(0,105) scale(1.1)" />

                <g transform="scale(1.15) translate(0, -10)">
                    <use href="#leaf" transform="rotate(-150) translate(-50,-10) scale(1)" />
                    <use href="#leaf" transform="rotate(150) translate(50,-10) scale(1)" />
                    <use href="#leaf" transform="rotate(-90) translate(-40,-70) scale(1)" />
                    <use href="#leaf" transform="rotate(90) translate(40,-70) scale(1)" />

                    <!-- Capullos florales laterales y traseros -->
                    <g transform="rotate(-60) translate(-20,-80) scale(0.9)"><use href="#leaf" /><use href="#bud" transform="translate(10,-10) scale(0.8)"/></g>
                    <g transform="rotate(-20) translate(0,-100) scale(1)"><use href="#leaf" /><use href="#bud" transform="translate(-10,-10) scale(0.7)"/></g>
                    <g transform="rotate(30) translate(20,-90) scale(1.1)"><use href="#leaf" /><use href="#bud" transform="translate(10,-10) scale(0.8)"/></g>
                    <g transform="rotate(50) translate(60,-80) scale(0.9)"><use href="#leaf" /><use href="#bud" transform="translate(-10,-5) scale(0.7)"/></g>
                    <g transform="rotate(-70) translate(-60,-70) scale(1)"><use href="#leaf" /><use href="#bud" transform="translate(5,-10) scale(0.8)"/></g>
                    <!-- Capullos Extras para MEGA Ramo -->
                    <g transform="rotate(-40) translate(-100,-40) scale(1)"><use href="#leaf" /><use href="#bud" transform="translate(5,-10) scale(0.9)"/></g>
                    <g transform="rotate(70) translate(90,-50) scale(0.95)"><use href="#leaf" /><use href="#bud" transform="translate(0,-10) scale(0.8)"/></g>
                    
                    <use href="#leaf" transform="rotate(80) translate(20,-80) scale(0.8)" />
                    <use href="#leaf" transform="rotate(-100) translate(-30,-50) scale(1)" />
                    <use href="#leaf" transform="rotate(120) translate(10,-70) scale(0.9)" />

                    <!-- Lirios Amarillos Base e Inferiores (Tapan los Tallos) -->
                    <g transform="translate(-80, 100)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4.2s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.8) rotate(-140)" /></g>
                    <g transform="translate(80, 90)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.8s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.8) rotate(140)" /></g>
                    <g transform="translate(0, 115)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.6s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.9) rotate(180)" /></g>

                    <!-- Lirios Amarillos Perimetrales CLASICOS (Anchos) -->
                    <g transform="translate(-120, -20)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="4s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.85) rotate(-35)" /></g>
                    <g transform="translate(110, -30)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.8) rotate(40)" /></g>
                    <g transform="translate(-110, 60)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="5s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.85) rotate(-75)" /></g>
                    <g transform="translate(110, 50)"><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="3.5s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.85) rotate(65)" /></g>

                    <!-- Lirios Amarillos Corona Superior Posterior (AGREGADOS PARA REDONDEAR ARRIBA) -->
                    <g transform="translate(0, -110)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.3s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.75) rotate(5)" /></g>
                    <g transform="translate(-80, -95)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.8) rotate(-40)" /></g>
                    <g transform="translate(75, -85)"><animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="3.7s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.75) rotate(40)" /></g>
                    
                    <!-- EXTRAS FRONT FOCAL -->
                    <g transform="translate(-40, -65)"><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="4.5s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.85) rotate(-15)" /></g>
                    <g transform="translate(40, -10)"><animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="4.1s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(0.95) rotate(15)" /></g>
                    <g transform="translate(-30, 20)"><animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="3.9s" repeatCount="indefinite" additive="sum"/><use href="#lily-flower" transform="scale(1) rotate(5)" /></g>
                </g>
            </g>
        </svg>
        `;
    }

    buildCSSBouquets();

    // Set initial configuration
    updateSlidePosition();

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}vw)`;

        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (particlesContainer) {
            particlesContainer.innerHTML = '';
        }

        // Hide/show arrows
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex === slides.length - 1 ? 'none' : 'flex';
    }

    // Navigation handlers
    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlidePosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        }
    });

    // Touch Events for Swipe
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${diff}px))`;
    });

    track.addEventListener('touchend', (e) => {
        isDragging = false;
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        // thresholds to consider as swipe
        if (diff < -50 && currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (diff > 50 && currentIndex > 0) {
            currentIndex--;
        }

        updateSlidePosition();
    });

    // Particle system (Petals / Hearts)
    const petalClasses = ['petal-lirio', 'petal-margarita', 'petal-gerbera', 'petal-jazmin', 'petal-tulipan'];

    function createParticle() {
        if (!particlesContainer) return;

        const particle = document.createElement('div');
        particle.classList.add('petal');

        // Menos corazones en lirio para que se vean más pétalos del ramo
        const heartChance = currentIndex === 0 ? 0.88 : 0.7;
        let isHeart = Math.random() > heartChance;
        let heartIcon = '🤍';

        // Último slide son puros corazones
        if (currentIndex === 5) {
            isHeart = true;
            heartIcon = '❤️';
            if (Math.random() > 0.5) heartIcon = '💖';
        }

        if (isHeart) {
            particle.classList.add('petal-heart');
            particle.innerHTML = heartIcon;
            particle.style.fontSize = (Math.random() * 15 + 15) + 'px';
        } else {
            // Add specific shape class based on current slide
            const pClass = petalClasses[currentIndex] || petalClasses[0];
            particle.classList.add(pClass);

            // Randomly flip or slightly rotate
            const initialRotation = Math.random() * 360;
            const flip = Math.random() > 0.5 ? -1 : 1;
        }

        // Apply random scale using CSS custom property that is read in the keyframes
        const scale = Math.random() * 0.6 + 0.5; // Scale from 0.5 to 1.1
        particle.style.setProperty('--scale', scale);

        particle.style.left = `${Math.random() * 100}vw`;
        const durationSec = Math.random() * 3 + 6; // 6 to 9s falling time
        particle.style.animationDuration = `${durationSec}s`;

        particlesContainer.appendChild(particle);

        // Timeout robusto ajeno a pausas de GPU The browser
        setTimeout(() => {
            particle.remove();
        }, durationSec * 1000);
    }

    function spawnParticlesTick() {
        createParticle();
        if (currentIndex === 0) {
            createParticle();
            if (Math.random() < 0.45) {
                createParticle();
            }
        }
    }

    const particleIntervalMs = 240;
    setInterval(spawnParticlesTick, particleIntervalMs);

    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    function syncMusicButton() {
        if (!musicBtn || !bgMusic) return;
        if (!bgMusic.paused) {
            musicBtn.classList.add('playing');
            musicBtn.setAttribute('aria-label', 'Pausar música');
        } else {
            musicBtn.classList.remove('playing');
            musicBtn.setAttribute('aria-label', 'Reproducir música');
        }
    }

    if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.addEventListener('play', syncMusicButton);
        bgMusic.addEventListener('pause', syncMusicButton);
        bgMusic.play()
            .then(syncMusicButton)
            .catch(syncMusicButton);
    }

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
            } else {
                bgMusic.pause();
            }
        });
    }

    // Final Slide Heart Explosion Effect
    const finalHeart = document.getElementById('final-heart');
    if (finalHeart) {
        finalHeart.addEventListener('click', (e) => {
            const rect = finalHeart.getBoundingClientRect();
            // Get center of the heart
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Pop animation on the heart itself
            finalHeart.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.8)' },
                { transform: 'scale(0.8)' },
                { transform: 'scale(1)' }
            ], { duration: 400, easing: 'ease-out' });

            // Create explosion of mini hearts
            // Aumentamos cantidad a 80 para una explosión más llenadora
            for (let i = 0; i < 80; i++) {
                createExplosionParticle(centerX, centerY);
            }
        });
    }

    function createExplosionParticle(x, y) {
        const particle = document.createElement('div');
        particle.innerHTML = ['❤️', '💖', '💕', '💗', '🤍'][Math.floor(Math.random() * 5)];
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = (Math.random() * 25 + 10) + 'px'; // 10px to 35px
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';

        // Físicas exageradas para una explosión MUCHO más grande
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 100; // Viajan el doble de lejos
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 200; // Tiro inicial fuerte hacia arriba
        const rot = Math.random() * 360;
        const rotEnd = rot + (Math.random() > 0.5 ? 720 : -720); // Giran más

        document.body.appendChild(particle);

        const anim = particle.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1, offset: 0 },
            { transform: `translate(-50%, -50%) scale(1) rotate(0deg)`, opacity: 1, offset: 0.1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(${rot}deg)`, opacity: 0.9, offset: 0.5 },
            { transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty + (velocity * 2)}px)) scale(0) rotate(${rotEnd}deg)`, opacity: 0, offset: 1 }
        ], {
            // Duracion prolongada: de 2.0 a 3.5 segundos
            duration: Math.random() * 1500 + 2000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });

        anim.onfinish = () => {
            particle.remove();
        };
    }
});
