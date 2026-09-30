/**
 * ==============================================================================
 * CONTACT FORM HANDLER
 * ==============================================================================
 * Manages form validation, user feedback alerts, and provides a direct
 * mailto fallback without exposing private credentials.
 */

(function () {
  function initContact() {
    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('contact-alert');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();
      const honeypot = document.getElementById('contact-honey')?.value;

      // Anti-bot honeypot check
      if (honeypot) {
        return;
      }

      // Basic client-side validation
      if (!name || !email || !message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate sending and trigger mailto option
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        showAlert('Thank you for reaching out! Your message has been prepared.', 'success');

        // Provide mailto link fallback so user can send directly via their client if desired
        const recipient = (window.developerConfig && window.developerConfig.email !== 'YOUR_EMAIL')
          ? window.developerConfig.email
          : '';

        if (recipient) {
          const mailtoUri = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
          window.location.href = mailtoUri;
        }
      }, 700);
    });

    function showAlert(text, type) {
      if (!alertBox) return;
      alertBox.textContent = text;
      alertBox.className = `form-status-alert ${type}`;
      alertBox.style.display = 'block';

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 5000);
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }

  window.ContactManager = {
    init: initContact
  };
})();
