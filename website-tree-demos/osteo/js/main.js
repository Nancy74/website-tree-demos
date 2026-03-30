/**
 * OsteoCare — Main JavaScript
 * Version: 1.0.0
 * 
 * Modules:
 *  - Theme Toggle (dark/light mode)
 *  - Navbar Scroll Effects
 *  - Back to Top Button
 *  - Scroll Reveal Animations
 *  - Active Nav Link Highlighting
 *  - Appointment Form Handler
 *  - Newsletter Form Handler
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ================================================================
       THEME TOGGLE
       Persists user preference in localStorage.
    ================================================================ */
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    // Apply saved theme on page load (prevents flash of wrong theme)
    const savedTheme = localStorage.getItem('osteocare-theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        // Enable transition class for smooth colour swap
        htmlEl.classList.add('theme-transition');

        const current = htmlEl.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('osteocare-theme', next);

        // Remove transition class after animation completes
        setTimeout(() => htmlEl.classList.remove('theme-transition'), 500);
    });


    /* ================================================================
       NAVBAR SCROLL EFFECT
       Adds shadow + compact style when user scrolls down.
    ================================================================ */
    const navbar = document.querySelector('.navbar-main');
    const backToTopBtn = document.getElementById('backToTop');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar shadow on scroll
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Show/hide back-to-top button
        backToTopBtn.classList.toggle('show', scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });


    /* ================================================================
       BACK TO TOP BUTTON
    ================================================================ */
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ================================================================
       SCROLL REVEAL ANIMATIONS
       Uses IntersectionObserver for performant fade-up effects.
    ================================================================ */
    const fadeElements = document.querySelectorAll('.fade-up');

    if (fadeElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Stagger the animation slightly for adjacent elements
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        fadeElements.forEach((el) => revealObserver.observe(el));
    }


    /* ================================================================
       ACTIVE NAV LINK ON SCROLL
       Highlights the nav link corresponding to the current section.
    ================================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-main .nav-link');

    const highlightNav = () => {
        let currentSection = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });


    /* ================================================================
       APPOINTMENT FORM HANDLER
       Basic client-side handler — replace with Formspree/backend
       integration for production use.
    ================================================================ */
    const appointmentForm = document.getElementById('appointmentForm');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.phone) {
                showFormMessage(appointmentForm, 'Please fill in all required fields.', 'error');
                return;
            }

            // TODO: Replace with actual form submission
            // Example Formspree integration:
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Accept': 'application/json' }
            // })
            // .then(response => {
            //     if (response.ok) {
            //         showFormMessage(appointmentForm, 'Thank you! We\'ll confirm your appointment within 2 hours.', 'success');
            //         appointmentForm.reset();
            //     } else {
            //         showFormMessage(appointmentForm, 'Something went wrong. Please call us directly.', 'error');
            //     }
            // });

            // Placeholder success response
            showFormMessage(
                appointmentForm,
                'Thank you! Your appointment request has been submitted. We\'ll confirm within 2 hours.',
                'success'
            );
            appointmentForm.reset();
        });
    }


    /* ================================================================
       NEWSLETTER FORM HANDLER
    ================================================================ */
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterInput.value.trim();

            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // TODO: Connect to mailing list service (Mailchimp, ConvertKit, etc.)
            alert('Thank you for subscribing! You\'ll receive our monthly wellness tips.');
            newsletterInput.value = '';
        });

        // Allow Enter key to submit
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                newsletterBtn.click();
            }
        });
    }


    /* ================================================================
       UTILITY FUNCTIONS
    ================================================================ */

    /**
     * Displays a temporary message below a form.
     * @param {HTMLFormElement} form  - The form element
     * @param {string}         msg   - Message text
     * @param {string}         type  - 'success' or 'error'
     */
    function showFormMessage(form, msg, type) {
        // Remove any existing message
        const existing = form.parentNode.querySelector('.form-message');
        if (existing) existing.remove();

        const el = document.createElement('div');
        el.className = `form-message form-message--${type}`;
        el.style.cssText = `
            margin-top: 16px;
            padding: 14px 20px;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 500;
            text-align: center;
            background: ${type === 'success' ? 'var(--primary-light)' : '#fef2f2'};
            color: ${type === 'success' ? 'var(--primary)' : '#dc2626'};
            border: 1px solid ${type === 'success' ? 'var(--primary)' : '#fca5a5'};
        `;
        el.textContent = msg;
        form.parentNode.appendChild(el);

        // Auto-remove after 6 seconds
        setTimeout(() => el.remove(), 6000);
    }

    /**
     * Basic email validation.
     * @param {string} email
     * @returns {boolean}
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

});
