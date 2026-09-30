/**
 * ==============================================================================
 * PROJECT DETAILS MODAL
 * ==============================================================================
 * Renders in-depth architectural breakdown, honest feature statuses (Working vs
 * Planned vs Future), screenshots gallery, and HTML5 video player.
 */

(function () {
  let activeProject = null;

  function initModal() {
    const modalOverlay = document.getElementById('project-modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');
    const footerCloseBtn = document.getElementById('modal-footer-close-btn');

    if (!modalOverlay) return;

    closeBtn?.addEventListener('click', closeModal);
    footerCloseBtn?.addEventListener('click', closeModal);

    // Click outside modal dialog to close
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  function getStatusBadgeClass(status) {
    switch (status) {
      case 'Completed': return 'badge-completed';
      case 'Under Development': return 'badge-dev';
      case 'Prototype': return 'badge-prototype';
      default: return 'badge-planned';
    }
  }

  function openProjectModal(project) {
    if (!project) return;
    activeProject = project;

    const modalOverlay = document.getElementById('project-modal-overlay');
    const titleEl = document.getElementById('modal-project-title');
    const statusEl = document.getElementById('modal-project-status');
    const overviewEl = document.getElementById('modal-project-overview');
    const problemEl = document.getElementById('modal-project-problem');
    const solutionEl = document.getElementById('modal-project-solution');
    const techTagsEl = document.getElementById('modal-project-technologies');
    const architectureEl = document.getElementById('modal-project-architecture');
    const learningsEl = document.getElementById('modal-project-learnings');
    const currentStatusEl = document.getElementById('modal-project-current-status');
    const improvementsEl = document.getElementById('modal-project-improvements');
    const liveDemoBtn = document.getElementById('modal-live-demo-btn');
    const githubBtn = document.getElementById('modal-github-btn');
    const blueprintBtn = document.getElementById('modal-blueprint-btn');
    const blueprintDlBtn = document.getElementById('modal-blueprint-download-btn');
    const featuresContainer = document.getElementById('modal-features-container');
    const galleryContainer = document.getElementById('modal-gallery-container');
    const videoSection = document.getElementById('modal-video-section');
    const videoPlayer = document.getElementById('modal-video-player');

    // Title & Status
    if (titleEl) titleEl.textContent = project.title;
    if (statusEl) {
      statusEl.className = `badge ${getStatusBadgeClass(project.status)}`;
      statusEl.innerHTML = `<span class="hero-badge-pulse" style="width:6px; height:6px;"></span> ${project.status}`;
    }

    // Overview, Problem, Solution
    if (overviewEl) overviewEl.textContent = project.overview || project.tagline;
    if (problemEl) problemEl.textContent = project.problem || 'Not specified.';
    if (solutionEl) solutionEl.textContent = project.solution || 'Not specified.';

    // Explicit Live Links, Repository Box & Blueprint Document inside Modal
    const linksContainer = document.getElementById('modal-project-links');
    if (linksContainer) {
      const hasLive = project.liveDemo && project.liveDemo !== 'YOUR_LIVE_DEMO_URL' && project.liveDemo.trim() !== '';
      const hasGh = project.github && project.github !== 'YOUR_GITHUB_URL' && project.github.trim() !== '';
      const hasBp = project.blueprint && project.blueprint !== 'YOUR_BLUEPRINT_URL' && project.blueprint.trim() !== '';
      const bpFilename = hasBp ? escapeHtml(project.blueprint.split('/').pop()) : 'AI_Education_Exam_Platform_Full_Blueprint.pdf';

      linksContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
          <div style="background: var(--bg-surface-elevated); border: 1px solid rgba(16, 185, 129, 0.35); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: #34d399; font-weight: 700;">🌐 Live Application</span>
              ${hasLive ? '<span style="font-size: 0.7rem; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 600;">Online</span>' : '<span style="font-size: 0.7rem; color: var(--text-muted);">In Progress</span>'}
            </div>
            ${hasLive ? `
              <a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-secondary); font-weight: 600; font-size: 0.9375rem; text-decoration: underline; word-break: break-all;">
                ${project.liveDemo}
              </a>
            ` : `
              <span style="font-size: 0.875rem; color: var(--text-muted);">Demo URL will be available once deployed.</span>
            `}
          </div>

          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent-secondary); font-weight: 700;">💻 Source Code</span>
              ${hasGh ? '<span style="font-size: 0.7rem; background: rgba(6, 182, 212, 0.2); color: #38bdf8; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 600;">GitHub</span>' : '<span style="font-size: 0.7rem; color: var(--text-muted);">Repository</span>'}
            </div>
            ${hasGh ? `
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" style="color: var(--text-primary); font-weight: 600; font-size: 0.9375rem; text-decoration: underline; word-break: break-all;">
                ${project.github}
              </a>
            ` : `
              <span style="font-size: 0.875rem; color: var(--text-muted);">Repository link will be published soon.</span>
            `}
          </div>

          <div style="background: var(--bg-surface-elevated); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; font-weight: 700;">📐 Architecture Blueprint</span>
              ${hasBp ? '<span style="font-size: 0.7rem; background: rgba(99, 102, 241, 0.2); color: #a5b4fc; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 600;">PDF Document</span>' : '<span style="font-size: 0.7rem; color: var(--text-muted);">In Progress</span>'}
            </div>
            ${hasBp ? `
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem; flex-wrap: wrap;">
                <a href="${project.blueprint}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-size: 0.8125rem; padding: 0.35rem 0.75rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  View Blueprint
                </a>
                <a href="${project.blueprint}" download="${bpFilename}" class="btn btn-secondary btn-sm" style="font-size: 0.8125rem; padding: 0.35rem 0.75rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Blueprint
                </a>
              </div>
            ` : `
              <span style="font-size: 0.875rem; color: var(--text-muted);">System blueprint document will be available soon.</span>
            `}
          </div>
        </div>
      `;
    }

    // Technologies
    if (techTagsEl && Array.isArray(project.technologies)) {
      techTagsEl.innerHTML = project.technologies
        .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
        .join('');
    }

    // Categorized Features: Working, Planned, Future Vision
    if (featuresContainer && project.features) {
      const working = project.features.working || [];
      const planned = project.features.planned || [];
      const future = project.features.future || [];

      featuresContainer.innerHTML = `
        <div class="feature-box current">
          <div class="feature-box-title">
            <span>✓ Current / Working</span>
          </div>
          <ul class="feature-list">
            ${working.length ? working.map(f => `<li>${escapeHtml(f)}</li>`).join('') : '<li>Initial setup in progress.</li>'}
          </ul>
        </div>
        <div class="feature-box planned">
          <div class="feature-box-title">
            <span>⚙ Planned Next</span>
          </div>
          <ul class="feature-list">
            ${planned.length ? planned.map(f => `<li>${escapeHtml(f)}</li>`).join('') : '<li>Pending backlog definition.</li>'}
          </ul>
        </div>
        <div class="feature-box future">
          <div class="feature-box-title">
            <span>🚀 Future Vision</span>
          </div>
          <ul class="feature-list">
            ${future.length ? future.map(f => `<li>${escapeHtml(f)}</li>`).join('') : '<li>Long-term architectural roadmap.</li>'}
          </ul>
        </div>
      `;
    }

    // Architecture & Learnings
    if (architectureEl) architectureEl.textContent = project.architecture || 'Modular client-server architecture.';
    if (learningsEl) learningsEl.textContent = project.learnings || 'Hands-on technical implementation learnings.';
    if (currentStatusEl) currentStatusEl.textContent = project.currentStatus || project.status;
    if (improvementsEl) improvementsEl.textContent = project.futureImprovements || 'Continuous performance and feature refinements.';

    // Screenshots Gallery Grid in Modal
    if (galleryContainer && Array.isArray(project.screenshots) && project.screenshots.length > 0) {
      // Cache-bust timestamp so replacing an image file always shows the new version
      const cb = Date.now();
      galleryContainer.innerHTML = project.screenshots.map((s, idx) => `
        <div class="modal-gallery-item" data-index="${idx}" role="button" tabindex="0" title="Click to enlarge: ${escapeHtml(s.title || '')}">
          <img src="${s.src}?cb=${cb}" alt="${escapeHtml(s.title || project.title)}" loading="lazy" />
          <div class="modal-gallery-caption">${escapeHtml(s.title || 'Screenshot')}</div>
        </div>
      `).join('');

      // Add click handler to open Lightbox — pass cache-busted srcs too
      const cbScreenshots = project.screenshots.map(s => ({ ...s, src: s.src + '?cb=' + cb }));
      galleryContainer.querySelectorAll('.modal-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.getAttribute('data-index'), 10) || 0;
          window.GalleryManager?.open(cbScreenshots, idx);
        });
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const idx = parseInt(item.getAttribute('data-index'), 10) || 0;
            window.GalleryManager?.open(cbScreenshots, idx);
          }
        });
      });
    } else if (galleryContainer) {
      galleryContainer.innerHTML = '<p style="color:var(--text-muted); font-size:0.875rem;">Screenshots will be added as interfaces are finalized.</p>';
    }

    // Video Section — show the video player if a video path is provided
    const videoContainer = document.getElementById('modal-video-container');
    const videoSource = document.getElementById('modal-video-source');

    if (videoSection) {
      if (project.video && project.video.trim() !== '') {
        // Show the section first
        videoSection.style.display = 'block';

        if (videoPlayer && videoSource && videoContainer) {
          // Pause any currently playing video first
          videoPlayer.pause();

          // Cache-bust so replacing the video file always loads fresh
          const videoCb = Date.now();
          const videoUrl = project.video + '?cb=' + videoCb;

          // Set source via the <source> element for cross-browser reliability
          videoSource.setAttribute('src', videoUrl);
          videoSource.setAttribute('type', 'video/mp4');

          // Reload the player with the new source
          videoPlayer.load();

          // Graceful fallback — only replaces the container, not the whole section
          videoPlayer.onerror = function () {
            if (videoContainer) {
              videoContainer.innerHTML = `
                <div style="background: var(--bg-surface-elevated); padding: 1.5rem; border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); text-align: center;">
                  <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🎬</span>
                  <p style="font-weight: 600; margin-bottom: 0.25rem;">Demo Video</p>
                  <p style="font-size: 0.875rem; color: var(--text-muted);">
                    Make sure the video file is placed at:<br>
                    <code style="font-size:0.8rem; background:var(--bg-card); padding:0.15rem 0.4rem; border-radius:4px;">${project.video}</code>
                  </p>
                </div>
              `;
            }
          };
        }
      } else {
        // No video path set — hide the section completely
        videoSection.style.display = 'none';
        if (videoPlayer) videoPlayer.pause();
        if (videoSource) videoSource.setAttribute('src', '');
      }
    }

    // Action Buttons (Live Demo, GitHub, and Blueprint) with Honest Placeholder Handling
    setupActionButtons(project, liveDemoBtn, githubBtn, blueprintBtn, blueprintDlBtn);

    // Show modal dialog
    modalOverlay.classList.add('is-active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function setupActionButtons(project, liveBtn, ghBtn, bpBtn, bpDlBtn) {
    if (liveBtn) {
      if (!project.liveDemo || project.liveDemo === 'YOUR_LIVE_DEMO_URL' || project.liveDemo.trim() === '') {
        liveBtn.removeAttribute('href');
        liveBtn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Demo coming soon. This project is actively under development.');
        };
      } else {
        liveBtn.href = project.liveDemo;
        liveBtn.target = '_blank';
        liveBtn.rel = 'noopener noreferrer';
        liveBtn.onclick = null;
      }
    }

    if (ghBtn) {
      if (!project.github || project.github === 'YOUR_GITHUB_URL' || project.github.trim() === '') {
        ghBtn.removeAttribute('href');
        ghBtn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Repository link will be published once code cleanup is finalized.');
        };
      } else {
        ghBtn.href = project.github;
        ghBtn.target = '_blank';
        ghBtn.rel = 'noopener noreferrer';
        ghBtn.onclick = null;
      }
    }

    if (bpBtn) {
      if (!project.blueprint || project.blueprint === 'YOUR_BLUEPRINT_URL' || project.blueprint.trim() === '') {
        bpBtn.style.display = 'none';
        bpBtn.removeAttribute('href');
        bpBtn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Project blueprint document will be published soon.');
        };
      } else {
        bpBtn.style.display = 'inline-flex';
        bpBtn.href = project.blueprint;
        bpBtn.target = '_blank';
        bpBtn.rel = 'noopener noreferrer';
        bpBtn.onclick = null;
      }
    }

    if (bpDlBtn) {
      if (!project.blueprint || project.blueprint === 'YOUR_BLUEPRINT_URL' || project.blueprint.trim() === '') {
        bpDlBtn.style.display = 'none';
        bpDlBtn.removeAttribute('href');
        bpDlBtn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Project blueprint document will be published soon.');
        };
      } else {
        bpDlBtn.style.display = 'inline-flex';
        bpDlBtn.href = project.blueprint;
        const filename = project.blueprint.split('/').pop() || 'AI_Education_Exam_Platform_Full_Blueprint.pdf';
        bpDlBtn.setAttribute('download', filename);
        bpDlBtn.onclick = null;
      }
    }
  }

  function closeModal() {
    const modalOverlay = document.getElementById('project-modal-overlay');
    const videoPlayer = document.getElementById('modal-video-player');
    const videoSource = document.getElementById('modal-video-source');

    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
    // Clear the source so video fully unloads (stops buffering in background)
    if (videoSource) {
      videoSource.setAttribute('src', '');
    }
    if (videoPlayer) {
      videoPlayer.load(); // Reset to empty state
    }

    if (modalOverlay) {
      modalOverlay.classList.remove('is-active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  window.ProjectModalManager = {
    init: initModal,
    open: openProjectModal,
    close: closeModal,
    setupActionButtons: setupActionButtons,
    getStatusBadgeClass: getStatusBadgeClass
  };
})();
