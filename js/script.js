// --- 1. SISTEMA DE TEMA COM LOCALSTORAGE ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- 2. CROSSFADE SUAVE DE FUNDOS (HERO) ---
const backgroundImages = [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
];

const bgContainer = document.getElementById('hero-bg-container');
let currentBgIndex = 0;
let layers = [];

backgroundImages.forEach((src, index) => {
    const div = document.createElement('div');
    div.classList.add('bg-layer');
    if (index === 0) div.classList.add('active');
    div.style.backgroundImage = `url('${src}')`;
    bgContainer.appendChild(div);
    layers.push(div);
});

const changeBgBtn = document.getElementById('change-bg-btn');
const btnIcon = changeBgBtn.querySelector('i');

changeBgBtn.addEventListener('click', () => {
    btnIcon.style.transform = 'rotate(360deg)';
    btnIcon.style.transition = 'transform 0.5s ease';
    setTimeout(() => { btnIcon.style.transform = 'rotate(0deg)'; }, 500);

    layers[currentBgIndex].classList.remove('active');
    currentBgIndex = (currentBgIndex + 1) % layers.length;
    layers[currentBgIndex].classList.add('active');
});

// --- 3. CARROSSEL ESTILO NETFLIX (COM AUTO-SCROLL) ---
const netflixRow = document.getElementById('netflix-row');
const navLeft = document.getElementById('nav-left');
const navRight = document.getElementById('nav-right');

const scrollAmount = window.innerWidth > 768 ? 600 : 300; 

if(navLeft) {
    navLeft.addEventListener('click', () => {
        netflixRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

if(navRight) {
    navRight.addEventListener('click', () => {
        netflixRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// 🌟 NOVO: Lógica de Rolagem Automática
let autoScrollTimer;

const startAutoScroll = () => {
    autoScrollTimer = setInterval(() => {
        if (netflixRow) {
            // Verifica a rolagem máxima disponível
            const maxScrollLeft = netflixRow.scrollWidth - netflixRow.clientWidth;
            
            // Se chegou ao fim (com uma margem de erro de 10px), volta pro inicio
            if (netflixRow.scrollLeft >= maxScrollLeft - 10) {
                netflixRow.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Senão, rola um "card" pro lado
                const scrollStep = window.innerWidth > 768 ? 300 : window.innerWidth * 0.78; 
                netflixRow.scrollBy({ left: scrollStep, behavior: 'smooth' });
            }
        }
    }, 3500); // Executa a cada 3.5 segundos
};

const stopAutoScroll = () => {
    clearInterval(autoScrollTimer);
};

// Inicia o carrossel sozinho e gerencia as pausas
if (netflixRow) {
    startAutoScroll();
    
    // Pausa a animação se a pessoa colocar o mouse em cima ou tocar na tela
    netflixRow.addEventListener('mouseenter', stopAutoScroll);
    netflixRow.addEventListener('mouseleave', startAutoScroll);
    netflixRow.addEventListener('touchstart', stopAutoScroll, {passive: true});
    netflixRow.addEventListener('touchend', startAutoScroll);
}

// --- 4. MUSIC PLAYER ---
const audio = document.getElementById('our-song');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('audio-progress');

if(playPauseBtn && audio) {
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.classList.add('playing');
        } else {
            audio.pause();
            playPauseBtn.classList.remove('playing');
        }
    });

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });
}

// --- 5. PROGRESS BAR DA ROLAGEM GERAL ---
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if(scrollBar) scrollBar.style.width = `${progress}%`;
    
    const nav = document.querySelector('.glass-nav');
    if(nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// --- 6. SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

// --- 7. CARTÃO 3D (FLIP CARD) ---
const loveCard = document.getElementById('love-card');
if(loveCard) {
    loveCard.addEventListener('click', () => {
        loveCard.classList.toggle('is-flipped');
    });
}
