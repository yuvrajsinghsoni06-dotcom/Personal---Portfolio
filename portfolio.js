/* portfolio.js — Interactions & Scroll Logic */

// ── Nav scroll state ──────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Active nav link on scroll ─────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ── Reveal on scroll ──────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.project-row, .about-grid, .stack-col, .stack-grid');
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            // stagger children if they share a parent
            e.target.style.transitionDelay = (i % 4) * 0.08 + 's';
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

// ── Mobile nav toggle ─────────────────────────────────────────────────────────
const burger   = document.getElementById('burger');
const navUl    = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
    navUl.classList.toggle('open');
    nav.classList.toggle('menu-open', navUl.classList.contains('open'));
    burger.classList.toggle('active', navUl.classList.contains('open'));
    burger.setAttribute('aria-expanded', navUl.classList.contains('open'));
});
// Close on link click
navUl?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navUl.classList.remove('open');
    nav.classList.remove('menu-open');
    burger.classList.remove('active');
}));

// ── Smooth project row hover (tilt) ──────────────────────────────────────────
document.querySelectorAll('.project-row').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 4;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -2;
        card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ── Cursor blink in logo ──────────────────────────────────────────────────────
// Already handled via CSS animation
