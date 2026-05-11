/**
 * LoraLabs — main.js
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Header sticky on scroll ---- */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 40);
        }, { passive: true });
    }

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
