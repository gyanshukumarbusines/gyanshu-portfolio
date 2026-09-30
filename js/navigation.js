/**
 * ==============================================================================
 * NAVIGATION & SCROLL OBSERVER
 * ==============================================================================
 * Handles sticky navigation styling, mobile drawer interactions,
 * smooth scrolling, and active link indicator via IntersectionObserver.
 */

(function () {
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 1. Sticky Navigation on Scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('navbar-scrolled');
      } else {
        navbar?.classList.remove('navbar-scrolled');
      }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('is-open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });

      // Close menu when clicking outside or clicking any nav link
      document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('is-open') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
          closeMobileMenu();
        }
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Escape key closes mobile menu
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
          closeMobileMenu();
        }
      });
    }

    function openMobileMenu() {
      navLinks.classList.add('is-open');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // 3. Active Link Spy via IntersectionObserver
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            links.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    }
  }

  window.NavigationManager = {
    init: initNavigation
  };
})();
