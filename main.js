/**
 * LoraLabs — main.js
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Scroll Progress Bar ---- */
    const header = document.getElementById('header');
    const scrollBar = document.createElement('div');
    scrollBar.className = 'scroll-progress';
    document.body.appendChild(scrollBar);

    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        scrollBar.style.width = percent + '%';
        
        /* Header sticky */
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 40);
        }
    }, { passive: true });


    /* ---- Hamburger / Mobile menu ---- */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');
    let savedScrollY = 0;

    function openMenu() {
        savedScrollY = window.scrollY;
        document.body.style.top = `-${savedScrollY}px`;
        hamburger.classList.add('open');
        navMenu.classList.add('open');
        document.body.classList.add('no-scroll');
    }

    function closeMenu() {
        if (!hamburger.classList.contains('open')) return;
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ---- Reveal on scroll ---- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    /* ---- Active nav link highlight ---- */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-menu a');
    const linkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => linkObserver.observe(s));

    /* ---- Internship form ---- */
    const form = document.querySelector('.form-card form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            const orig = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Başvurunuz Alındı!';
                btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

});

/* ---- Dynamic Translation System ---- */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'tr', includedLanguages: 'tr,en,de,fr,ar,ru,es', autoDisplay: false }, 'google_translate_element');
}

function initTranslation() {
    const LABELS = { tr:'TR', en:'EN', de:'DE', fr:'FR', ar:'AR', ru:'RU', es:'ES' };
    const KEY = 'll_lang';
    const langBtn = document.getElementById('lang-btn');
    const dropdown = document.getElementById('lang-dropdown');
    const label = document.getElementById('lang-current');
    const options = document.querySelectorAll('.lang-option');
    if (!langBtn || !dropdown || !label) return;
    let saved = localStorage.getItem(KEY) || 'tr';
    const updateUI = (lang) => {
        label.textContent = LABELS[lang] || lang.toUpperCase();
        options.forEach(opt => opt.classList.toggle('active', opt.getAttribute('data-lang') === lang));
    };
    updateUI(saved);
    langBtn.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('open'); });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    dropdown.addEventListener('click', (e) => e.stopPropagation());
    const applyGT = (lang, attempt = 0) => {
        const combo = document.querySelector('select.goog-te-combo');
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (attempt < 50) {
            setTimeout(() => applyGT(lang, attempt + 1), 150);
        }
    };
    if (saved !== 'tr') applyGT(saved);
    options.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === (localStorage.getItem(KEY) || 'tr')) { dropdown.classList.remove('open'); return; }
            localStorage.setItem(KEY, lang);
            updateUI(lang);
            dropdown.classList.remove('open');
            if (lang === 'tr') {
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                location.reload();
            } else applyGT(lang);
        });
    });
    const killFeedback = () => {
        ['.goog-te-banner-frame', '.goog-te-balloon-frame', '.goog-tooltip', '.goog-te-menu-frame', '.goog-te-gadget-icon'].forEach(s => {
            const el = document.querySelector(s);
            if (el) el.style.display = 'none';
        });
        if (document.body.style.top && document.body.style.top !== '0px') document.body.style.top = '0px';
    };
    setInterval(killFeedback, 500);
    new MutationObserver(killFeedback).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
}

// Ensure it runs after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslation);
} else {
    initTranslation();
}

/**
 * Image Slider Helper for Apps page
 */
function setupSlider(sliderId, dotsId) {
    const slider = document.getElementById(sliderId);
    const dotsContainer = document.getElementById(dotsId);
    if (!slider || !dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;
    let isDragging = false;
    let interval;

    function updateDots(index) { 
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index)); 
    }

    function scrollNext() {
        if (isDragging) return;
        currentIndex = (currentIndex + 1) % dots.length;
        slider.scrollTo({ left: slider.offsetWidth * currentIndex, behavior: 'smooth' });
        updateDots(currentIndex);
    }

    interval = setInterval(scrollNext, 4000);

    slider.addEventListener('scroll', () => {
        const index = Math.round(slider.scrollLeft / slider.offsetWidth);
        if (index !== currentIndex) { 
            currentIndex = index; 
            updateDots(currentIndex); 
        }
    });

    slider.addEventListener('mousedown', () => { isDragging = true; clearInterval(interval); });
    slider.addEventListener('mouseup', () => { isDragging = false; interval = setInterval(scrollNext, 4000); });
}

// Auto-init sliders if they exist
// Theme Toggle Logic
function initTheme() {
    const KEY = 'll_theme';
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const currentTheme = localStorage.getItem(KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    toggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(KEY, theme);
    });
}

// Ensure theme is applied immediately
const savedTheme = localStorage.getItem('ll_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    if (document.getElementById('slider-sweepy')) {
        setupSlider('slider-sweepy', 'dots-sweepy');
    }
    if (document.getElementById('slider-kpsskoc')) {
        setupSlider('slider-kpsskoc', 'dots-kpsskoc');
    }
});

