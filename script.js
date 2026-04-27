// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

const sections = document.querySelectorAll('section[id]');

function updateNav() {
    const scrollY = window.scrollY;
    if (scrollY > 50) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }

    let current = 'hero';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (scrollY >= top) current = section.getAttribute('id');
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) link.classList.add('active');
    });
}

window.addEventListener('scroll', updateNav);
updateNav();

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
    .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8 }, 0.3)
    .from('.hero-line', { opacity: 0, y: 80, duration: 1, stagger: 0.15 }, 0.5)
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, 0.9)
    .from('.hero-cta', { opacity: 0, y: 30, duration: 0.8 }, 1.1)
    .from('.hero-socials', { opacity: 0, y: 20, duration: 0.6 }, 1.3)
    .from('.hero-visual', { opacity: 0, x: 60, duration: 1.2, ease: 'power2.out' }, 0.6)
    .from('.floating-card', { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.15 }, 1.2);

gsap.to('.card-1', { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.card-2', { y: 12, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
gsap.to('.card-3', { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

// About section
gsap.from('#about .section-header', {
    scrollTrigger: { trigger: '#about .section-header', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
});
gsap.from('#about .about-text', {
    scrollTrigger: { trigger: '#about .about-text', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.7, ease: 'power3.out'
});
gsap.from('#about .about-visual', {
    scrollTrigger: { trigger: '#about .about-visual', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.7, delay: 0.15, ease: 'power3.out'
});

// Skills section - marquee & blocks
gsap.from('#skills .section-header', {
    scrollTrigger: { trigger: '#skills .section-header', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
});

gsap.from('.skills-marquee-wrapper', {
    scrollTrigger: { trigger: '.skills-marquee-wrapper', start: 'top 90%' },
    opacity: 0, duration: 0.8, ease: 'power3.out'
});

gsap.from('.skill-block', {
    scrollTrigger: { trigger: '.skills-showcase', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out'
});

// Animate circular meters on scroll
const meterFills = document.querySelectorAll('.meter-fill');
meterFills.forEach(fill => {
    const percent = parseInt(fill.getAttribute('data-percent'));
    const circumference = 2 * Math.PI * 52; // r=52
    const offset = circumference - (percent / 100) * circumference;

    ScrollTrigger.create({
        trigger: fill,
        start: 'top 90%',
        onEnter: () => {
            fill.style.strokeDashoffset = offset;
        }
    });
});

// Projects section - timeline rows
gsap.from('#projects .section-header', {
    scrollTrigger: { trigger: '#projects .section-header', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
});

gsap.from('.project-row', {
    scrollTrigger: { trigger: '.projects-list', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.6, stagger: 0.12, ease: 'power3.out'
});

// Contact section
gsap.from('#contact .section-header', {
    scrollTrigger: { trigger: '#contact .section-header', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out'
});
gsap.from('.contact-info', {
    scrollTrigger: { trigger: '.contact-content', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.7, ease: 'power3.out'
});
gsap.from('.contact-form', {
    scrollTrigger: { trigger: '.contact-content', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.7, delay: 0.15, ease: 'power3.out'
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(num => {
    const target = parseInt(num.getAttribute('data-count'));
    gsap.to({ val: 0 }, {
        val: target,
        scrollTrigger: { trigger: num, start: 'top 90%' },
        duration: 1.5, ease: 'power2.out',
        onUpdate: function() { num.textContent = Math.round(this.targets()[0].val); }
    });
});

// Parallax on hero orbs
gsap.to('.orb-1', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    y: -80, x: 30
});
gsap.to('.orb-2', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    y: 60, x: -20
});

gsap.to('.scroll-indicator', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '15% top', scrub: true },
    opacity: 0
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        contactForm.reset();
        formSuccess.classList.add('show');
        setTimeout(() => { formSuccess.classList.remove('show'); }, 4000);
    }, 1500);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});