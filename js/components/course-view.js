/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 課程目錄與單元詳細教學視圖組件 (Course View Component)
 */

const CourseViewComponent = {
  /**
   * 渲染完整課程清單（依 6 大階段分類）
   */
  renderCatalog() {
    const completedList = StorageManager.getCompletedLessons();
    const totalLessons = Object.keys(CURRICULUM_DATA.lessons).length;
    const completedCount = completedList.length;
    const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    let stagesHtml = '';
    CURRICULUM_DATA.stages.forEach(stage => {
      let lessonsHtml = '';
      let stageCompletedCount = 0;

      stage.lessonIds.forEach(id => {
        const lesson = CURRICULUM_DATA.lessons[id];
        if (!lesson) return;

        const isDone = completedList.includes(id);
        if (isDone) stageCompletedCount++;

        lessonsHtml += `
          <a href="#/course/${id}" class="lesson-item-link">
            <div class="d-flex align-items-center">
              <span class="lesson-status-icon ${isDone ? 'completed' : 'pending'}">
                ${isDone ? '✓' : '○'}
              </span>
              <div>
                <span class="fw-semibold">${lesson.title}</span>
                <span class="text-muted ms-2 small">(${lesson.enTitle})</span>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-light text-dark border">${lesson.difficulty}</span>
              <span class="text-muted small">${lesson.estTime}</span>
              <span class="text-primary small fw-semibold">開始 →</span>
            </div>
          </a>
        `;
      });

      const stagePercent = stage.lessonIds.length > 0
        ? Math.round((stageCompletedCount / stage.lessonIds.length) * 100)
        : 0;

      stagesHtml += `
        <div class="card-custom mb-4">
          <div class="stage-card-header">
            <div>
              <span class="stage-badge ${stage.badgeClass}">${stage.title}</span>
              <h3 class="h5 fw-bold mt-2 mb-1">${stage.title}</h3>
              <p class="text-muted small mb-0">${stage.description}</p>
            </div>
            <div class="text-end">
              <span class="small fw-bold text-muted">${stageCompletedCount}/${stage.lessonIds.length} 單元</span>
              <div class="progress-bar-custom mt-1" style="width: 120px;">
                <div class="progress-bar-fill" style="width: ${stagePercent}%;"></div>
              </div>
            </div>
          </div>
          <div class="lesson-list">
            ${lessonsHtml}
          </div>
        </div>
      `;
    });

    return `
      <div class="container-xl py-4">
        <!-- 頂部進度總覽 -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1">課程路徑總覽</h1>
            <p class="text-muted mb-0">從零開始掌握 Python 字串處理，全繁體中文循序漸進架構。</p>
          </div>
          <div class="card-custom p-3 d-flex align-items-center gap-3">
            <div>
              <div class="small text-muted fw-bold">學習完成進度</div>
              <div class="h4 fw-bold text-primary mb-0">${progressPercent}% (${completedCount}/${totalLessons})</div>
            </div>
            <div class="progress-bar-custom" style="width: 140px;">
              <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>

        ${stagesHtml}
      </div>
    `;
  },

  /**
   * 渲染個別單元詳細教學頁面
   */
  renderLesson(lessonId) {
    const lesson = CURRICULUM_DATA.lessons[lessonId];
    if (!lesson) {
      return `
        <div class="container-xl py-5 text-center">
          <h2 class="h4 text-danger mb-3">找不到指定的課程單元（${lessonId}）</h2>
          <p class="text-muted">請返回課程列表選擇其他章節。</p>
          <a href="#/courses" class="btn btn-primary-custom">返回課程列表</a>
        </div>
      `;
    }

    const stage = CURRICULUM_DATA.stages.find(s => s.id === lesson.stageId);
    const isDone = StorageManager.isLessonCompleted(lessonId);

    // 計算前後課 ID
    const allLessonIds = Object.keys(CURRICULUM_DATA.lessons);
    const currIndex = allLessonIds.indexOf(lessonId);
    const prevId = currIndex > 0 ? allLessonIds[currIndex - 1] : null;
    const nextId = currIndex < allLessonIds.length - 1 ? allLessonIds[currIndex + 1] : null;

    // 逐行解說 HTML
    let lineRowsHtml = '';
    lesson.lineExplanations.forEach(item => {
      lineRowsHtml += `
        <tr>
          <td><code class="text-dark bg-light px-1">${CourseViewComponent.escapeHtml(item.line)}</code></td>
          <td>${item.desc}</td>
        </tr>
      `;
    });

    // 常見錯誤 HTML
    let mistakesHtml = '';
    lesson.commonMistakes.forEach(m => {
      mistakesHtml += `
        <div class="callout-box callout-danger mb-3">
          <div class="fw-bold mb-1">⚠️ 常見錯誤：${m.error}</div>
          <div class="mb-1"><span class="fw-semibold">原因說明：</span>${m.why}</div>
          <div><span class="fw-semibold">正確修正：</span>${m.fix}</div>
        </div>
      `;
    });

    // 教學目標清單
    const objectivesList = lesson.objectives.map(obj => `<li>${obj}</li>`).join('');

    return `
      <div class="container-xl py-4">
        <!-- 麵包屑導航 -->
        <nav class="breadcrumb-custom">
          <a href="#/">首頁</a> / 
          <a href="#/courses">課程列表</a> / 
          <span>${stage ? stage.title : '課程單元'}</span> / 
          <span class="text-dark fw-bold">${lesson.title}</span>
        </nav>

        <!-- 單元標題與標籤 -->
        <div class="unit-header">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
            <div>
              <span class="badge ${stage ? stage.badgeClass : 'bg-primary'} mb-2">階段 ${lesson.stageId}</span>
              <h1 class="h3 fw-bold mb-1">${lesson.title}</h1>
              <p class="text-muted mb-0">${lesson.enTitle}</p>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button id="toggle-complete-btn" class="btn ${isDone ? 'btn-success' : 'btn-outline-custom'}" onclick="CourseViewComponent.toggleComplete('${lessonId}')">
                ${isDone ? '✓ 已完成此課' : '標記為已完成'}
              </button>
            </div>
          </div>
          <div class="unit-meta">
            <span>難度：<strong>${lesson.difficulty}</strong></span>
            <span>預估學習時間：<strong>${lesson.estTime}</strong></span>
            <span>狀態：<strong class="${isDone ? 'text-success' : 'text-muted'}">${isDone ? '已完成' : '學習中'}</strong></span>
          </div>
        </div>

        <div class="row g-4">
          <!-- 主教學內容 -->
          <div class="col-lg-8">
            <!-- 學習目標 -->
            <div class="unit-content-section">
              <div class="section-title">🎯 教學目標</div>
              <ul class="mb-0 ps-3">
                ${objectivesList}
              </ul>
            </div>

            <!-- 核心概念與語法 -->
            <div class="unit-content-section">
              <div class="section-title">📖 語法說明與核心概念</div>
              <div class="mb-3" style="white-space: pre-line; line-height: 1.8;">
                ${lesson.description}
              </div>

              ${lesson.syntax ? `
                <div class="callout-box callout-info">
                  <div class="fw-bold mb-1">語法摘要：</div>
                  <pre class="m-0 font-monospace text-dark"><code>${CourseViewComponent.escapeHtml(lesson.syntax)}</code></pre>
                </div>
              ` : ''}
            </div>

            <!-- 程式碼範例與預期結果 -->
            <div class="unit-content-section">
              <div class="section-title">💻 Python 範例程式碼</div>
              
              <div class="code-block-wrapper">
                <div class="code-header">
                  <span class="code-lang-tag"><span>🐍</span> Python 3</span>
                  <div class="code-actions">
                    <button class="copy-btn" onclick="CourseViewComponent.copyCode('code-block-${lessonId}')">
                      📋 複製程式碼
                    </button>
                    <a href="#/lab?lesson=${lessonId}" class="run-in-lab-btn">
                      ▶ 在實驗室執行
                    </a>
                  </div>
                </div>
                <pre class="code-content" id="code-block-${lessonId}"><code>${CourseViewComponent.escapeHtml(lesson.codeSnippet)}</code></pre>
              </div>

              <div class="output-block-wrapper">
                <div class="output-header">
                  <span>⚡ 預期執行結果 (Expected Output)</span>
                </div>
                <pre class="output-content"><code>${CourseViewComponent.escapeHtml(lesson.expectedOutput)}</code></pre>
              </div>
            </div>

            <!-- 逐行解說 -->
            <div class="unit-content-section">
              <div class="section-title">🔍 程式碼逐行解說</div>
              <div class="table-responsive">
                <table class="line-table">
                  <thead>
                    <tr>
                      <th style="width: 45%;">程式碼片段</th>
                      <th>功能與執行原理說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${lineRowsHtml}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 常見錯誤 -->
            <div class="unit-content-section">
              <div class="section-title">⚠️ 初學者常見錯誤與除錯指南</div>
              ${mistakesHtml}
            </div>

            <!-- 單元練習與挑戰 -->
            <div class="unit-content-section">
              <div class="section-title">✍️ 單元課後練習</div>
              
              <!-- 基礎練習 -->
              <div class="card-custom p-3 mb-3 bg-light">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="badge bg-primary">基礎練習</span>
                </div>
                <p class="mb-2 fw-semibold">${lesson.basicPractice.question}</p>
                <div class="collapse" id="hint-basic-${lessonId}">
                  <div class="callout-box callout-info my-2 py-2">
                    💡 提示：${lesson.basicPractice.hint}
                  </div>
                </div>
                <div class="collapse" id="sol-basic-${lessonId}">
                  <div class="code-block-wrapper my-2">
                    <div class="code-header"><span class="code-lang-tag">參考解答</span></div>
                    <pre class="code-content"><code>${CourseViewComponent.escapeHtml(lesson.basicPractice.solution)}</code></pre>
                  </div>
                </div>
                <div class="d-flex gap-2 mt-2">
                  <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#hint-basic-${lessonId}">
                    查看提示
                  </button>
                  <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#sol-basic-${lessonId}">
                    檢視解答
                  </button>
                </div>
              </div>

              <!-- 進階挑戰 -->
              <div class="card-custom p-3 bg-light">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="badge bg-warning text-dark">進階挑戰</span>
                </div>
                <p class="mb-2 fw-semibold">${lesson.advancedChallenge.question}</p>
                <div class="collapse" id="hint-adv-${lessonId}">
                  <div class="callout-box callout-info my-2 py-2">
                    💡 提示：${lesson.advancedChallenge.hint}
                  </div>
                </div>
                <div class="collapse" id="sol-adv-${lessonId}">
                  <div class="code-block-wrapper my-2">
                    <div class="code-header"><span class="code-lang-tag">參考解答</span></div>
                    <pre class="code-content"><code>${CourseViewComponent.escapeHtml(lesson.advancedChallenge.solution)}</code></pre>
                  </div>
                </div>
                <div class="d-flex gap-2 mt-2">
                  <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#hint-adv-${lessonId}">
                    查看提示
                  </button>
                  <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#sol-adv-${lessonId}">
                    檢視解答
                  </button>
                </div>
              </div>
            </div>

            <!-- 上下課導航按鈕 -->
            <div class="d-flex justify-content-between align-items-center py-3">
              ${prevId ? `
                <a href="#/course/${prevId}" class="btn btn-outline-custom">
                  ← 上一課
                </a>
              ` : `<span></span>`}

              <a href="#/courses" class="btn btn-outline-secondary btn-sm">
                返回目錄
              </a>

              ${nextId ? `
                <a href="#/course/${nextId}" class="btn btn-primary-custom">
                  下一課 →
                </a>
              ` : `
                <a href="#/quizzes" class="btn btn-success">
                  前往互動測驗 🎉
                </a>
              `}
            </div>
          </div>

          <!-- 側邊欄快速導航 -->
          <div class="col-lg-4">
            <div class="card-custom p-3 position-sticky" style="top: 80px;">
              <h4 class="h6 fw-bold mb-3 border-bottom pb-2">本階段課程清單</h4>
              <div class="list-group list-group-flush small">
                ${stage ? stage.lessonIds.map(id => {
                  const l = CURRICULUM_DATA.lessons[id];
                  const done = StorageManager.isLessonCompleted(id);
                  const isCurrent = id === lessonId;
                  return `
                    <a href="#/course/${id}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-2 py-2 ${isCurrent ? 'active fw-bold' : ''}">
                      <span>${done ? '✓ ' : '○ '}${l.title}</span>
                      <span class="badge ${isCurrent ? 'bg-light text-dark' : 'bg-secondary'}">${l.difficulty}</span>
                    </a>
                  `;
                }).join('') : ''}
              </div>

              <div class="mt-4 pt-3 border-top">
                <a href="#/lab?lesson=${lessonId}" class="btn btn-primary-custom w-100 mb-2">
                  🧪 開啟實驗室實作
                </a>
                <a href="#/quizzes" class="btn btn-outline-custom w-100">
                  📝 前往練習題庫
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggleComplete(lessonId) {
    const isNowCompleted = StorageManager.toggleLessonCompleted(lessonId);
    const btn = document.getElementById('toggle-complete-btn');
    if (btn) {
      if (isNowCompleted) {
        btn.className = 'btn btn-success';
        btn.innerText = '✓ 已完成此課';
      } else {
        btn.className = 'btn btn-outline-custom';
        btn.innerText = '標記為已完成';
      }
    }
    // 觸發導覽列進度即時更新
    if (window.App) window.App.updateNavProgress();
  },

  copyCode(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('已成功複製範例程式碼至剪貼簿！');
    }).catch(err => {
      console.error('複製失敗:', err);
    });
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

window.CourseViewComponent = CourseViewComponent;
