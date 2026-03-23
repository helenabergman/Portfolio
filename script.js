const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

window.addEventListener('scroll', () => {
    nav.classList.toggle('sticky', window.scrollY > 40);

    // Active section
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
    });

    revealElements();
    animateBars();
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
function closeMobile() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

function revealElements() {
    document.querySelectorAll('.reveal:not(.in), .reveal-left:not(.in)').forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            setTimeout(() => el.classList.add('in'), i * 80);
        }
    });
}
revealElements();

// Skill bars
let barsAnimated = false;
function animateBars() {
    if (barsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        barsAnimated = true;
        document.querySelectorAll('.skill-bar').forEach(bar => {
            setTimeout(() => {
                bar.style.width = bar.dataset.width + '%';
            }, 150);
        });
    }
}
animateBars();


// Podaci o posterima
const posters = [
    { src: 'posteri/kafic.png',   caption: 'Zlatna Zrna — Café Opening' },
    { src: 'posteri/maraton.png', caption: 'Beograd Maraton 2026' },
    { src: 'posteri/estrada.png', caption: 'Nataša Bekvalac — Splav Poseidon' },
    { src: 'posteri/Oil.jpg', caption: 'Nature face oil poster' },
];

let currentPoster = 0;


function openGallery() {
    document.getElementById('galleryOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeGallery() {
    document.getElementById('galleryOverlay').classList.remove('active');
    document.body.style.overflow = '';
}


function closeGalleryOutside(e) {
    if (e.target === document.getElementById('galleryOverlay')) {
        closeGallery();
    }
}

function openLightbox(index) {
    currentPoster = index;
    const lb = document.getElementById('posterLightbox');
    document.getElementById('lbImg').src = posters[index].src;
    document.getElementById('lbCaption').textContent = posters[index].caption;
    lb.classList.add('active');
}

function closePosterLightbox() {
    document.getElementById('posterLightbox').classList.remove('active');
}

function nextPoster(e) {
    e.stopPropagation();
    currentPoster = (currentPoster + 1) % posters.length;
    document.getElementById('lbImg').src = posters[currentPoster].src;
    document.getElementById('lbCaption').textContent = posters[currentPoster].caption;
}

function prevPoster(e) {
    e.stopPropagation();
    currentPoster = (currentPoster - 1 + posters.length) % posters.length;
    document.getElementById('lbImg').src = posters[currentPoster].src;
    document.getElementById('lbCaption').textContent = posters[currentPoster].caption;
}


document.addEventListener('keydown', function(e) {
    const lb = document.getElementById('posterLightbox');
    const gallery = document.getElementById('galleryOverlay');

    if (lb.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextPoster(e);
        if (e.key === 'ArrowLeft') prevPoster(e);
        if (e.key === 'Escape') closePosterLightbox();
    } else if (gallery.classList.contains('active')) {
        if (e.key === 'Escape') closeGallery();
    }
});