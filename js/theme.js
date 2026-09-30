/**
 * ==============================================================================
 * THEME MANAGER (DARK / LIGHT MODE)
 * ==============================================================================
 * Handles user preference persistence via localStorage and syncs with
 * system preference.
 */

(function () {
  const STORAGE_KEY = 'gyanshu_portfolio_theme';
  const htmlEl = document.documentElement;

  // Determine initial theme
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Apply theme to document
  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      const isDark = theme === 'dark';
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      toggleBtn.innerHTML = isDark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  // Toggle function
  function toggleTheme() {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // Listen for system theme changes if user hasn't set explicit choice
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  // Export to global scope
  window.ThemeManager = {
    init: function () {
      const theme = getPreferredTheme();
      applyTheme(theme);

      const toggleBtn = document.getElementById('theme-toggle-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
      }
    },
    toggle: toggleTheme,
    getCurrentTheme: function () {
      return htmlEl.getAttribute('data-theme') || 'dark';
    }
  };

  // Immediate execution for anti-flicker
  applyTheme(getPreferredTheme());
})();
