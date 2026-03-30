document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    function getPref() { const s = localStorage.getItem('chirohealth-theme'); if (s === 'light' || s === 'dark') return s; if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'; return 'light'; }
    function setTheme(t) { html.setAttribute('data-theme', t); localStorage.setItem('chirohealth-theme', t); }
    setTheme(getPref());
    themeToggle?.addEventListener('click', () => setTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { if (!localStorage.getItem('chirohealth-theme')) setTheme(e.matches ? 'dark' : 'light'); });

    const hamburger = document.getElementById('hamburger'), navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navLinks.classList.toggle('open'); document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : ''; });
        navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { hamburger.classList.remove('active'); navLinks.classList.remove('open'); document.body.style.overflow = ''; }));
        document.addEventListener('click', e => { if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) { hamburger.classList.remove('active'); navLinks.classList.remove('open'); document.body.style.overflow = ''; } });
    }

    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const a = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(o => { o.classList.remove('active'); o.querySelector('.faq-question').setAttribute('aria-expanded', 'false'); });
            if (!a) { item.classList.add('active'); item.querySelector('.faq-question').setAttribute('aria-expanded', 'true'); }
        });
    });

    const sections = document.querySelectorAll('section[id]'), navEls = document.querySelectorAll('.nav-link');
    function setActive() { const p = window.scrollY + 120; sections.forEach(s => { if (p >= s.offsetTop && p < s.offsetTop + s.offsetHeight) navEls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + s.id)); }); }
    window.addEventListener('scroll', setActive, { passive: true });

    const btt = document.getElementById('backToTop');
    function toggleBTT() { btt?.classList.toggle('visible', window.scrollY > 400); }
    window.addEventListener('scroll', toggleBTT, { passive: true });
    btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', e => { e.preventDefault(); const d = Object.fromEntries(new FormData(form)); if (!d.firstName || !d.lastName || !d.email || !d.phone) { alert('Please fill in all required fields.'); return; } alert("Thank you! We'll be in touch shortly."); form.reset(); });

    const els = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .blog-card, .faq-item, .contact-item, .intro-item');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => { entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }, i * 60); obs.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; obs.observe(el); });
    }
    setActive(); toggleBTT();
});
