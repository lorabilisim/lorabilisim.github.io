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

/* CRITICAL: Intercept iframe creation to block Google Translate evaluation popup BEFORE it renders */
(function() {
    const origCreate = document.createElement.bind(document);
    document.createElement = function(tag) {
        const el = origCreate(tag);
        if (tag.toLowerCase() === 'iframe') {
            /* Monitor src changes to kill translate popups */
            const origSet = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src') ||
                            Object.getOwnPropertyDescriptor(Element.prototype, 'src');
            if (origSet && origSet.set) {
                Object.defineProperty(el, 'src', {
                    set: function(val) {
                        if (val && (val.includes('translate.google') || val.includes('survey') || val.includes('feedback'))) {
                            el.style.display = 'none';
                            el.style.width = '0';
                            el.style.height = '0';
                            return;
                        }
                        origSet.set.call(this, val);
                    },
                    get: function() { return origSet.get ? origSet.get.call(this) : ''; }
                });
            }
            /* Also watch class assignments */
            const origSetAttr = el.setAttribute.bind(el);
            el.setAttribute = function(name, value) {
                if (name === 'class' && value && (value.includes('goog-te') || value.includes('skiptranslate'))) {
                    el.style.display = 'none';
                    el.style.position = 'fixed';
                    el.style.top = '-9999px';
                }
                origSetAttr(name, value);
            };
        }
        return el;
    };
})();

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'tr', includedLanguages: 'tr,en,de,fr,ar,ru,es', autoDisplay: false, layout: 0 }, 'google_translate_element');
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

    /* Clear ALL googtrans cookies across every possible path and domain */
    function clearGoogTransCookies() {
        const hostname = window.location.hostname;
        const paths = ['/', '', '/index.html', '/apps.html', '/staj.html'];
        const domains = ['', hostname, '.' + hostname];
        paths.forEach(p => {
            domains.forEach(d => {
                const domainStr = d ? '; domain=' + d : '';
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + (p || '/') + domainStr;
                document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + (p || '/') + '; SameSite=None; Secure' + domainStr;
            });
        });
    }

    if (saved !== 'tr') applyGT(saved);

    options.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === (localStorage.getItem(KEY) || 'tr')) { dropdown.classList.remove('open'); return; }
            localStorage.setItem(KEY, lang);
            updateUI(lang);
            dropdown.classList.remove('open');
            if (lang === 'tr') {
                clearGoogTransCookies();
                /* Force Google Translate to restore original page */
                const combo = document.querySelector('select.goog-te-combo');
                if (combo) {
                    combo.value = 'tr';
                    combo.dispatchEvent(new Event('change', { bubbles: true }));
                }
                /* Reload after a brief delay to ensure cookie is cleared */
                setTimeout(() => location.reload(), 300);
            } else {
                applyGT(lang);
            }
        });
    });

    /* Aggressively kill ALL Google Translate UI injections */
    const killFeedback = () => {
        /* Kill iframes */
        document.querySelectorAll('iframe').forEach(f => {
            const src = f.src || f.getAttribute('src') || '';
            const cls = f.className || '';
            if (src.includes('translate') || cls.includes('goog-te') || cls.includes('skiptranslate')) {
                f.style.display = 'none';
                f.style.visibility = 'hidden';
                f.style.height = '0';
                f.style.width = '0';
                f.style.position = 'fixed';
                f.style.top = '-9999px';
            }
        });
        /* Kill all known Google Translate UI elements */
        document.querySelectorAll('.goog-te-banner-frame, .goog-te-balloon-frame, .goog-tooltip, .goog-te-menu-frame, .goog-te-ftab-frame, .goog-te-spinner-pos, #goog-gt-tt, div[id^="goog-gt-"], body > .skiptranslate').forEach(el => {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
        });
        /* Ensure body is never pushed down */
        if (document.body.style.top && document.body.style.top !== '0px') {
            document.body.style.top = '0px';
        }
        document.body.style.position = '';
    };

    killFeedback();
    setInterval(killFeedback, 300);
    new MutationObserver(killFeedback).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
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

