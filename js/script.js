// --- 1. SISTEMA DE TEMA COM LOCALSTORAGE ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

// Verifica se há tema salvo na memória
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
    localStorage.setItem('theme', newTheme); // Salva a preferência
    
    if (newTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- 2. CROSSFADE SUAVE DE FUNDOS (HERO) ---
const backgroundImages = [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://i.imgur.com/Ky0LoVk.jpeg',
    'https://imgur.com/a/yE0XZt8#fgOCLvi',
    'https://imgur.com/a/r5Aq3O1#KW7G1on'
];

const bgContainer = document.getElementById('hero-bg-container');
let currentBgIndex = 0;
let layers = [];

// Cria as divs para o crossfade (pré-carrega as imagens)
backgroundImages.forEach((src, index) => {
    const div = document.createElement('div');
    div.classList.add('bg-layer');
    if (index === 0) div.classList.add('active'); // Primeira imagem ativa
    div.style.backgroundImage = `url('${src}')`;
    bgContainer.appendChild(div);
    layers.push(div);
});

const changeBgBtn = document.getElementById('change-bg-btn');
const btnIcon = changeBgBtn.querySelector('i');

changeBgBtn.addEventListener('click', () => {
    // Efeito no botão
    btnIcon.style.transform = 'rotate(360deg)';
    btnIcon.style.transition = 'transform 0.5s ease';
    setTimeout(() => { btnIcon.style.transform = 'rotate(0deg)'; }, 500);

    // Remove classe ativa da atual
    layers[currentBgIndex].classList.remove('active');
    
    // Próximo index
    currentBgIndex = (currentBgIndex + 1) % layers.length;
    
    // Adiciona classe ativa na nova (gera o crossfade pelo CSS)
    layers[currentBgIndex].classList.add('active');
});

// --- 3. CARROSSEL ESTILO NETFLIX ---
const netflixRow = document.getElementById('netflix-row');
const navLeft = document.getElementById('nav-left');
const navRight = document.getElementById('nav-right');

// Quantidade de pixels a rolar por clique
const scrollAmount = window.innerWidth > 768 ? 600 : 300; 

navLeft.addEventListener('click', () => {
    netflixRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

navRight.addEventListener('click', () => {
    netflixRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// --- 4. MUSIC PLAYER ---
const audio = document.getElementById('our-song');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('audio-progress');

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

// --- 5. PROGRESS BAR DA ROLAGEM GERAL ---
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
    // Calcula o progresso do scroll da página inteira
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollBar.style.width = `${progress}%`;
    
    // Efeito na Navbar
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- 6. SCROLL REVEAL (Animações de entrada) ---
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// --- 7. CARTÃO 3D (FLIP CARD) ---
const loveCard = document.getElementById('love-card');
loveCard.addEventListener('click', () => {
    loveCard.classList.toggle('is-flipped');
});
