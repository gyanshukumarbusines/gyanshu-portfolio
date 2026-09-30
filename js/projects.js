/**
 * ==============================================================================
 * PROJECTS GRID RENDERER
 * ==============================================================================
 * Reads project array from data/projects.js and dynamically builds responsive
 * project cards. Supports easy expansion for Project 2, Project 3, etc.
 */

(function () {
  function renderProjects() {
    const gridEl = document.getElementById('projects-grid');
    if (!gridEl) return;

    const projectList = window.projects || (typeof projects !== 'undefined' ? projects : []);

    if (!Array.isArray(projectList) || projectList.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <p style="color: var(--text-muted);">No projects found in <code>data/projects.js</code>. Add your first project to display it here!</p>
        </div>
      `;
      return;
    }

    // Cache-buster: ensures updated images always load fresh — no hard-refresh needed
    const cb = Date.now();

    gridEl.innerHTML = projectList.map((proj, idx) => {
      const badgeClass = window.ProjectModalManager?.getStatusBadgeClass(proj.status) || 'badge-dev';
      const techTags = (proj.technologies || [])
        .slice(0, 5) // Show top 5 on card, all in modal
        .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
        .join('');

      const hasLiveDemo = proj.liveDemo && proj.liveDemo !== 'YOUR_LIVE_DEMO_URL' && proj.liveDemo.trim() !== '';
      const liveHref = hasLiveDemo ? escapeHtml(proj.liveDemo) : '#';
      const liveAttrs = hasLiveDemo ? 'target="_blank" rel="noopener noreferrer"' : '';
      const displayUrl = hasLiveDemo ? proj.liveDemo.replace(/^https?:\/\//, '') : '';

      const hasGithub = proj.github && proj.github !== 'YOUR_GITHUB_URL' && proj.github.trim() !== '';
      const ghHref = hasGithub ? escapeHtml(proj.github) : '#';
      const ghAttrs = hasGithub ? 'target="_blank" rel="noopener noreferrer"' : '';

      const hasBlueprint = proj.blueprint && proj.blueprint !== 'YOUR_BLUEPRINT_URL' && proj.blueprint.trim() !== '';
      const blueprintHref = hasBlueprint ? escapeHtml(proj.blueprint) : '#';
      const blueprintFilename = hasBlueprint ? escapeHtml(proj.blueprint.split('/').pop()) : 'Blueprint.pdf';

      // Append cache-buster to thumbnail so browser always loads the latest image
      const thumbSrc = (proj.image || 'assets/images/projects/education-platform/01-homepage.png') + '?cb=' + cb;

      return `
        <article class="project-card reveal delay-${(idx % 3) + 1}" data-id="${proj.id || idx}">
          <div class="project-thumbnail-wrapper">
            <span class="badge ${badgeClass} project-badge-top">
              <span class="hero-badge-pulse" style="width:6px; height:6px;"></span>
              ${escapeHtml(proj.status || 'Under Development')}
            </span>
            <img 
              src="${thumbSrc}" 
              alt="${escapeHtml(proj.title)}" 
              class="project-thumbnail"
              loading="lazy"
              onerror="this.onerror=null; this.src='assets/images/projects/education-platform/01-homepage.png?cb=${cb}';"
            />
          </div>

          <div class="project-card-body">
            <span class="project-category">${escapeHtml(proj.category || 'Software Project')}</span>
            <h3 class="project-card-title">${escapeHtml(proj.title)}</h3>
            
            ${hasLiveDemo ? `
              <div class="project-live-indicator" style="display:flex; align-items:center; gap:0.4rem; font-size:0.8125rem; margin-bottom:0.75rem; padding: 0.35rem 0.65rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-sm);">
                <span style="width:7px; height:7px; background:#10b981; border-radius:50%; box-shadow:0 0 6px #10b981; flex-shrink:0;"></span>
                <span style="color:var(--text-secondary); font-size:0.75rem;">Live App:</span>
                <a href="${liveHref}" target="_blank" rel="noopener noreferrer" style="color:#34d399; font-weight:600; text-decoration:none; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${displayUrl}</a>
              </div>
            ` : ''}

            ${hasBlueprint ? `
              <div class="project-blueprint-indicator" style="display:flex; align-items:center; justify-content:space-between; gap:0.4rem; font-size:0.8125rem; margin-bottom:0.75rem; padding: 0.35rem 0.65rem; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-sm);">
                <div style="display:flex; align-items:center; gap:0.4rem; overflow:hidden;">
                  <span style="width:7px; height:7px; background:#6366f1; border-radius:50%; box-shadow:0 0 6px #6366f1; flex-shrink:0;"></span>
                  <span style="color:var(--text-secondary); font-size:0.75rem;">Blueprint:</span>
                  <span style="color:#818cf8; font-weight:600; font-size:0.75rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Architecture PDF</span>
                </div>
                <div style="display:flex; gap:0.45rem; align-items:center;">
                  <a href="${blueprintHref}" target="_blank" rel="noopener noreferrer" style="color:#a5b4fc; font-weight:600; font-size:0.75rem; text-decoration:underline;">View</a>
                  <span style="color:var(--border-subtle); font-size:0.75rem;">|</span>
                  <a href="${blueprintHref}" download="${blueprintFilename}" style="color:#a5b4fc; font-weight:600; font-size:0.75rem; text-decoration:underline;">Download</a>
                </div>
              </div>
            ` : ''}

            <p class="project-card-desc">${escapeHtml(proj.tagline || proj.description || '')}</p>

            <div class="project-tech-tags">
              ${techTags}
              ${proj.technologies && proj.technologies.length > 5 ? `<span class="tech-tag">+${proj.technologies.length - 5} more</span>` : ''}
            </div>

            <div class="project-card-actions">
              <button type="button" class="btn btn-primary btn-sm view-details-btn" data-index="${idx}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                View Details
              </button>

              <a href="${liveHref}" ${liveAttrs} class="btn btn-secondary btn-sm card-live-btn" data-index="${idx}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                Live Demo
              </a>

              <a href="${ghHref}" ${ghAttrs} class="btn btn-outline btn-sm card-github-btn" data-index="${idx}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub
              </a>

              <a href="${blueprintHref}" ${hasBlueprint ? 'target="_blank" rel="noopener noreferrer"' : ''} class="btn btn-outline btn-sm card-blueprint-btn" data-index="${idx}" title="View System Architecture Blueprint (PDF)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                View Blueprint
              </a>

              <a href="${blueprintHref}" ${hasBlueprint ? `download="${blueprintFilename}"` : ''} class="btn btn-outline btn-sm card-blueprint-dl-btn" data-index="${idx}" title="Download System Architecture Blueprint (PDF)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Blueprint
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach event handlers
    attachCardListeners();
  }

  function attachCardListeners() {
    const projectList = window.projects || (typeof projects !== 'undefined' ? projects : []);
    const detailBtns = document.querySelectorAll('.view-details-btn');
    const liveBtns = document.querySelectorAll('.card-live-btn');
    const ghBtns = document.querySelectorAll('.card-github-btn');
    const bpBtns = document.querySelectorAll('.card-blueprint-btn');
    const bpDlBtns = document.querySelectorAll('.card-blueprint-dl-btn');

    detailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const proj = projectList[idx];
        if (proj) {
          window.ProjectModalManager?.open(proj);
        }
      });
    });

    liveBtns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const proj = projectList[idx];
      if (proj && (!proj.liveDemo || proj.liveDemo === 'YOUR_LIVE_DEMO_URL' || proj.liveDemo.trim() === '')) {
        btn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Demo coming soon. This project is actively under development.');
        };
      }
    });

    ghBtns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const proj = projectList[idx];
      if (proj && (!proj.github || proj.github === 'YOUR_GITHUB_URL' || proj.github.trim() === '')) {
        btn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Repository link will be published once code cleanup is finalized.');
        };
      }
    });

    bpBtns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const proj = projectList[idx];
      if (proj && (!proj.blueprint || proj.blueprint === 'YOUR_BLUEPRINT_URL' || proj.blueprint.trim() === '')) {
        btn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Project blueprint document will be published soon.');
        };
      }
    });

    bpDlBtns.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      const proj = projectList[idx];
      if (proj && (!proj.blueprint || proj.blueprint === 'YOUR_BLUEPRINT_URL' || proj.blueprint.trim() === '')) {
        btn.onclick = (e) => {
          e.preventDefault();
          window.MainApp?.showToast('Project blueprint document will be published soon.');
        };
      }
    });
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

  window.ProjectsGridManager = {
    init: renderProjects,
    refresh: renderProjects
  };
})();
