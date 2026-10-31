/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 實戰專題工具視圖組件 (Projects View Component)
 *
 * 提供五大實戰文字工具的互動操作介面、參數調整、執行結果與 Diff 對比呈現。
 */

const ProjectsViewComponent = {
  currentProjectId: 'p1',

  render(targetProjectId = null) {
    if (targetProjectId) {
      this.currentProjectId = targetProjectId;
    }

    const completedProjects = StorageManager.getCompletedProjects();
    const project = PROJECTS_DATA.find(p => p.id === this.currentProjectId) || PROJECTS_DATA[0];
    const isCompleted = completedProjects.includes(project.id);

    // 專題切換頁籤
    let tabsHtml = '';
    PROJECTS_DATA.forEach(p => {
      const isDone = completedProjects.includes(p.id);
      const isActive = p.id === this.currentProjectId;
      tabsHtml += `
        <button class="nav-link ${isActive ? 'active fw-bold' : ''} text-start d-flex justify-content-between align-items-center mb-1" 
                onclick="ProjectsViewComponent.switchProject('${p.id}')">
          <span>${p.title}</span>
          ${isDone ? '<span class="badge bg-success ms-2">✓ 已完成</span>' : ''}
        </button>
      `;
    });

    // 專題選項 HTML
    let optionsHtml = '';
    project.options.forEach(opt => {
      if (opt.type === 'checkbox') {
        optionsHtml += `
          <div class="form-check me-3 mb-2">
            <input class="form-check-input" type="checkbox" id="opt-${opt.id}" ${opt.default ? 'checked' : ''}>
            <label class="form-check-label small" for="opt-${opt.id}">
              ${opt.label}
            </label>
          </div>
        `;
      } else if (opt.type === 'select') {
        let optsList = opt.options.map(o => `<option value="${o.value}" ${o.value === opt.default ? 'selected' : ''}>${o.text}</option>`).join('');
        optionsHtml += `
          <div class="me-3 mb-2 d-flex align-items-center gap-2">
            <label class="small text-muted fw-bold mb-0 text-nowrap">${opt.label}：</label>
            <select class="form-select form-select-sm" id="opt-${opt.id}" style="max-width: 180px;">
              ${optsList}
            </select>
          </div>
        `;
      } else if (opt.type === 'text') {
        optionsHtml += `
          <div class="me-3 mb-2 d-flex align-items-center gap-2">
            <label class="small text-muted fw-bold mb-0 text-nowrap">${opt.label}：</label>
            <input type="text" class="form-control form-control-sm" id="opt-${opt.id}" 
                   value="${opt.default}" placeholder="${opt.placeholder || ''}" style="max-width: 200px;">
          </div>
        `;
      }
    });

    return `
      <div class="container-xl py-4">
        <!-- 頁面標題 -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1">字串實戰專題工具箱</h1>
            <p class="text-muted mb-0">提供 5 大可立即互動操作的 Python 字串工具，結合演算法與實務應用。</p>
          </div>
          <div>
            <span class="badge bg-primary fs-6 px-3 py-2">
              已完成專題：${completedProjects.length} / ${PROJECTS_DATA.length}
            </span>
          </div>
        </div>

        <div class="row g-4">
          <!-- 左側專題清單頁籤 -->
          <div class="col-lg-4">
            <div class="card-custom p-3">
              <h2 class="h6 fw-bold mb-3 border-bottom pb-2">專題工具選單</h2>
              <nav class="nav nav-pills flex-column">
                ${tabsHtml}
              </nav>
            </div>
          </div>

          <!-- 右側工具互動操作面板 -->
          <div class="col-lg-8">
            <div class="tool-interface">
              <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                <div>
                  <h2 class="h4 fw-bold mb-1">${project.title}</h2>
                  <p class="text-muted small mb-0">${project.description}</p>
                </div>
                <div class="d-flex gap-2">
                  <button id="project-complete-btn" class="btn btn-sm ${isCompleted ? 'btn-success' : 'btn-outline-custom'}" onclick="ProjectsViewComponent.toggleComplete('${project.id}')">
                    ${isCompleted ? '✓ 專題已實作完成' : '標記專題已完成'}
                  </button>
                </div>
              </div>

              <!-- 輸入區 -->
              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <label class="form-label small fw-bold text-muted mb-0">原始輸入文字 (Input Text)：</label>
                  <button class="btn btn-link btn-sm text-decoration-none p-0 text-muted" onclick="ProjectsViewComponent.resetDefaultInput('${project.id}')">
                    重設為範例資料
                  </button>
                </div>
                <textarea id="project-input" class="form-control font-monospace" rows="6" style="font-size: 0.9rem;">${CourseViewComponent.escapeHtml(project.defaultInput)}</textarea>
              </div>

              <!-- 參數選項列 -->
              <div class="p-3 bg-light rounded border mb-3">
                <div class="small fw-bold text-dark mb-2">⚙️ 處理參數設定：</div>
                <div class="d-flex flex-wrap align-items-center">
                  ${optionsHtml}
                </div>
              </div>

              <!-- 執行按鈕 -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <button class="btn btn-primary-custom px-4" onclick="ProjectsViewComponent.executeProject('${project.id}')">
                  🚀 執行處理
                </button>
                <span id="project-meta-info" class="text-muted small">點擊「執行處理」檢視運算結果</span>
              </div>

              <!-- 輸出區 -->
              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <label class="form-label small fw-bold text-muted mb-0">處理產出結果 (Output Result)：</label>
                  <button class="btn btn-link btn-sm text-decoration-none p-0" onclick="ProjectsViewComponent.copyOutput()">
                    📋 複製結果
                  </button>
                </div>
                <textarea id="project-output" class="form-control font-monospace bg-light" rows="7" readonly style="font-size: 0.9rem;" placeholder="處理結果將在此顯示..."></textarea>
              </div>

              <!-- 專題三專用 Diff 檢視容器 -->
              <div id="diff-container" class="d-none">
                <div class="small fw-bold text-muted mb-1">🔍 前後差異比對 (Diff View，紅色刪除，綠色新增)：</div>
                <div id="diff-output" class="diff-view"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  switchProject(projectId) {
    this.currentProjectId = projectId;
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = this.render(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  resetDefaultInput(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;
    const inputEl = document.getElementById('project-input');
    if (inputEl) inputEl.value = project.defaultInput;
  },

  executeProject(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    const input = document.getElementById('project-input')?.value || '';
    const opts = {};

    project.options.forEach(opt => {
      const el = document.getElementById(`opt-${opt.id}`);
      if (!el) return;
      if (opt.type === 'checkbox') opts[opt.id] = el.checked;
      else opts[opt.id] = el.value;
    });

    const result = project.execute(input, opts);

    const outputEl = document.getElementById('project-output');
    const metaEl = document.getElementById('project-meta-info');
    const diffContainer = document.getElementById('diff-container');
    const diffOutput = document.getElementById('diff-output');

    if (outputEl) outputEl.value = result.output;
    if (metaEl) metaEl.innerText = result.meta || '處理完成';

    if (result.diffHtml && diffContainer && diffOutput) {
      diffContainer.classList.remove('d-none');
      diffOutput.innerHTML = result.diffHtml;
    } else if (diffContainer) {
      diffContainer.classList.add('d-none');
    }
  },

  toggleComplete(projectId) {
    let completed = StorageManager.getCompletedProjects();
    const btn = document.getElementById('project-complete-btn');
    if (completed.includes(projectId)) {
      completed = completed.filter(id => id !== projectId);
      StorageManager._set(STORAGE_KEYS.COMPLETED_PROJECTS, completed);
      StorageManager._notifyChange();
      if (btn) {
        btn.className = 'btn btn-sm btn-outline-custom';
        btn.innerText = '標記專題已完成';
      }
    } else {
      completed.push(projectId);
      StorageManager._set(STORAGE_KEYS.COMPLETED_PROJECTS, completed);
      StorageManager._notifyChange();
      if (btn) {
        btn.className = 'btn btn-sm btn-success';
        btn.innerText = '✓ 專題已實作完成';
      }
    }
    // 重新渲染左側選單狀態
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = this.render(projectId);
  },

  copyOutput() {
    const el = document.getElementById('project-output');
    if (!el || !el.value) {
      alert('目前尚無輸出結果可複製！');
      return;
    }
    navigator.clipboard.writeText(el.value).then(() => {
      alert('已複製處理結果至剪貼簿！');
    }).catch(err => {
      console.error(err);
    });
  }
};

window.ProjectsViewComponent = ProjectsViewComponent;
