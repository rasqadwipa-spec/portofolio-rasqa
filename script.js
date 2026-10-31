/* ============================================================
   PORTFOLIO — INTERACTIONS & ANIMATIONS
   Navbar blur, mobile menu, scroll reveal, custom cursor,
   active link highlighting, smooth scroll
   ============================================================ */

(function () {
    'use strict';

    // ===== NAVBAR SCROLL EFFECT =====
    // Adds 'scrolled' class when user scrolls down past threshold
    const navbar = document.getElementById('navbar');
    const SCROLL_THRESHOLD = 50;

    function handleNavScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ===== MOBILE NAVIGATION TOGGLE =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Update aria-expanded for accessibility
        const isOpen = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // ===== SCROLL REVEAL ANIMATION =====
    // Uses Intersection Observer to add 'visible' class when elements enter viewport
    const revealElements = document.querySelectorAll('.reveal');

    // Options: trigger when 15% of element is visible
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Stagger delay for grouped elements (projects, skills, stats)
                const index = Array.from(revealElements).indexOf(entry.target);
                const delay = Math.min(index % 4, 3) * 100;

                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, delay);

                // Stop observing once revealed (animate only once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    // Highlights the nav link of the section currently in view
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink, { passive: true });

    // ===== CUSTOM CURSOR =====
    // Dot follows mouse instantly, ring follows with smooth lerp
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth lerp animation for the ring follower
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Grow ring when hovering interactive elements
    const interactiveSelectors = 'a, button, .project-item, .nav-link, .btn';
    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cursorRing.classList.add('hovering');
        });
        el.addEventListener('mouseleave', function () {
            cursorRing.classList.remove('hovering');
        });
    });

    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', function () {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

    // ===== INITIAL CALLS =====
    // Run on load to set correct states
    handleNavScroll();
    highlightActiveLink();

})();
