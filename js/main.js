/**
 * ==============================================================================
 * MAIN APPLICATION CONTROLLER
 * ==============================================================================
 * Bootstraps all modules, handles resume action verification, scroll reveals,
 * and toast feedback.
 */

(function () {
  let toastTimeout = null;

  function showToast(message, duration = 4000) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-message');

    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, duration);
  }

  function setupScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  }


  function syncDeveloperConfig() {
    const config = window.developerConfig || (typeof developerConfig !== 'undefined' ? developerConfig : null);
    if (!config) return;

    const hasGh = config.githubUrl && config.githubUrl !== 'YOUR_GITHUB_URL' && config.githubUrl.trim() !== '';
    const hasLi = config.linkedinUrl && config.linkedinUrl !== 'YOUR_LINKEDIN_URL' && config.linkedinUrl.trim() !== '';
    const hasEmail = config.email && config.email !== 'YOUR_EMAIL' && config.email.trim() !== '';

    // Apply social link URLs from config
    const ghLinks = document.querySelectorAll('.social-github-link');
    const liLinks = document.querySelectorAll('.social-linkedin-link');
    const emailLinks = document.querySelectorAll('.social-email-link');

    ghLinks.forEach(a => {
      if (!hasGh) {
        a.onclick = (e) => {
          e.preventDefault();
          showToast('GitHub link will be configured once repositories are finalized.');
        };
      } else {
        a.href = config.githubUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.onclick = null;
        if (a.id === 'contact-github-display') {
          a.textContent = config.githubUrl.replace(/^https?:\/\//, '');
        }
      }
    });

    liLinks.forEach(a => {
      if (!hasLi) {
        a.onclick = (e) => {
          e.preventDefault();
          showToast('LinkedIn profile will be linked shortly.');
        };
      } else {
        a.href = config.linkedinUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.onclick = null;
        if (a.id === 'contact-linkedin-display') {
          a.textContent = config.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '');
        }
      }
    });

    emailLinks.forEach(a => {
      if (!hasEmail) {
        a.onclick = (e) => {
          e.preventDefault();
          showToast('Please use the contact form below to send a message directly.');
        };
      } else {
        a.href = `mailto:${config.email}`;
        a.onclick = null;
        if (a.id === 'contact-email-display') {
          a.textContent = config.email;
        }
      }
    });

    // Sync resume download and view links from developerConfig
    const resumePath = config.resumePath || 'assets/resume/Gyanshu_Kumar_Resume.pdf';
    const resumeFilename = resumePath.split('/').pop() || 'Gyanshu_Kumar_Resume.pdf';

    const resumeDownloadElements = document.querySelectorAll('.resume-download-btn, .resume-download-link');
    resumeDownloadElements.forEach(el => {
      if (el.tagName === 'A') {
        el.href = resumePath;
        el.setAttribute('download', resumeFilename);
      } else if (el.tagName === 'BUTTON') {
        el.onclick = (e) => {
          e.preventDefault();
          const tempA = document.createElement('a');
          tempA.href = resumePath;
          tempA.download = resumeFilename;
          document.body.appendChild(tempA);
          tempA.click();
          document.body.removeChild(tempA);
        };
      }
    });

    const resumeViewElements = document.querySelectorAll('.resume-view-btn, .resume-view-link');
    resumeViewElements.forEach(el => {
      if (el.tagName === 'A') {
        el.href = resumePath;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      } else if (el.tagName === 'BUTTON') {
        el.onclick = (e) => {
          e.preventDefault();
          window.open(resumePath, '_blank');
        };
      }
    });

    // Sync profile picture from developerConfig
    // To change the profile picture: update profileImage in data/projects.js
    if (config.profileImage && config.profileImage.trim() !== '') {
      const avatarImg = document.getElementById('hero-avatar-img');
      if (avatarImg) {
        // Cache-bust so a replaced image file always loads fresh
        avatarImg.src = config.profileImage + '?cb=' + Date.now();
        avatarImg.alt = (config.name || 'Developer') + ' - Profile Picture';
        // Fallback: if image fails to load, keep existing src silently
        avatarImg.onerror = function () {
          this.onerror = null; // prevent infinite loop
          // leave src as-is — don't replace with broken placeholder
        };
      }
    }
  }

  // DOM ready entry point
  document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic copyright year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Initialize sub-systems
    window.ThemeManager?.init();
    window.NavigationManager?.init();
    window.ProjectsGridManager?.init();
    window.ProjectModalManager?.init();
    window.GalleryManager?.init();
    window.ContactManager?.init();

    // Scroll reveal observer
    setupScrollReveals();


    // Sync developer social placeholders
    syncDeveloperConfig();
  });

  window.MainApp = {
    showToast: showToast
  };
})();
