/**
 * ==============================================================================
 * LIGHTBOX SCREENSHOT GALLERY
 * ==============================================================================
 * Enables full-screen screenshot previewing with next/previous controls,
 * image caption, keyboard arrows navigation, and touch swipe gestures.
 */

(function () {
  let activeImages = [];
  let currentIndex = 0;

  function initGallery() {
    const lightbox = document.getElementById('lightbox-overlay');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    if (!lightbox) return;

    // Event listeners
    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', prevImage);
    nextBtn?.addEventListener('click', nextImage);

    // Background overlay click to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });

    // Touch swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextImage();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevImage();
      }
    }
  }

  function openLightbox(imagesList, startIndex = 0) {
    if (!imagesList || imagesList.length === 0) return;
    activeImages = imagesList;
    currentIndex = startIndex;

    const lightbox = document.getElementById('lightbox-overlay');
    if (!lightbox) return;

    renderImage();
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox-overlay');
    if (!lightbox) return;

    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderImage() {
    const current = activeImages[currentIndex];
    if (!current) return;

    const imgEl = document.getElementById('lightbox-image');
    const captionEl = document.getElementById('lightbox-caption');
    const counterEl = document.getElementById('lightbox-counter');

    if (imgEl) {
      imgEl.src = current.src;
      imgEl.alt = current.title || `Project Screenshot ${currentIndex + 1}`;
    }

    if (captionEl) {
      captionEl.textContent = current.caption || current.title || '';
    }

    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${activeImages.length}`;
    }
  }

  function nextImage() {
    if (activeImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % activeImages.length;
    renderImage();
  }

  function prevImage() {
    if (activeImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
    renderImage();
  }

  window.GalleryManager = {
    init: initGallery,
    open: openLightbox,
    close: closeLightbox
  };
})();
