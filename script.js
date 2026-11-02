// Número da empresa com DDI e DDD, só dígitos. Ex.: '5592999999999'
const WHATSAPP_NUMBER = '5592984361882';

const whatsappUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

document.addEventListener('DOMContentLoaded', () => {

    // Header gets a glass background once the page leaves the top
    const header = document.querySelector('.header');
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const setMenuOpen = (open) => {
        navMenu.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    navToggle.addEventListener('click', () => setMenuOpen(!navMenu.classList.contains('open')));
    navMenu.addEventListener('click', (e) => {
        if (e.target.closest('a')) setMenuOpen(false);
    });

    // WhatsApp links open the chat with a ready message (sem número, levam à seção de contato)
    if (WHATSAPP_NUMBER) {
        document.querySelectorAll('[data-whatsapp]').forEach(link => {
            link.href = whatsappUrl(link.dataset.whatsapp);
            link.target = '_blank';
            link.rel = 'noopener';
        });
    }

    // Respect visitors who prefer reduced motion
    const heroVideo = document.querySelector('.hero-video');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.pause();
    }

    // Simple fade-in effect on scroll for section content
    const revealElements = document.querySelectorAll('.section .container');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
});
