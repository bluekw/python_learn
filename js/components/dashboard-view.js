/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 學習儀表板視圖組件 (Dashboard View Component)
 *
 * 呈現客觀學習指標、階段進度條、答題正確率、成就徽章與進度重設/匯出備份功能。
 */

const DashboardViewComponent = {
  render() {
    const completedLessons = StorageManager.getCompletedLessons();
    const totalLessons = Object.keys(CURRICULUM_DATA.lessons).length;
    const lessonPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

    const quizStats = StorageManager.getQuizStats();
    const completedProjects = StorageManager.getCompletedProjects();
    const lastRoute = StorageManager.getLastRoute();

    // 階段別完成度分析
    let stageProgressHtml = '';
    CURRICULUM_DATA.stages.forEach(stage => {
      const stageTotal = stage.lessonIds.length;
      const stageDone = stage.lessonIds.filter(id => completedLessons.includes(id)).length;
      const stagePct = stageTotal > 0 ? Math.round((stageDone / stageTotal) * 100) : 0;

      stageProgressHtml += `
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="small fw-bold">${stage.title}</span>
            <span class="small text-muted">${stageDone} / ${stageTotal} 單元 (${stagePct}%)</span>
          </div>
          <div class="progress-bar-custom">
            <div class="progress-bar-fill" style="width: ${stagePct}%;"></div>
          </div>
        </div>
      `;
    });

    // 動態成就徽章
    const badges = [
      { name: "字串啟航", desc: "完成第 1 階段所有基礎課程", unlocked: CURRICULUM_DATA.stages[0].lessonIds.every(id => completedLessons.includes(id)) },
      { name: "操作好手", desc: "完成第 2 階段運算與方法", unlocked: CURRICULUM_DATA.stages[1].lessonIds.every(id => completedLessons.includes(id)) },
      { name: "搜尋專家", desc: "完成第 3 階段搜尋與拆分", unlocked: CURRICULUM_DATA.stages[2].lessonIds.every(id => completedLessons.includes(id)) },
      { name: "格式化達人", desc: "完成第 4 階段 f-string 與資料處理", unlocked: CURRICULUM_DATA.stages[3].lessonIds.every(id => completedLessons.includes(id)) },
      { name: "進階大師", desc: "完成第 5 階段編碼與正則表達式", unlocked: CURRICULUM_DATA.stages[4].lessonIds.every(id => completedLessons.includes(id)) },
      { name: "實戰宗師", desc: "實作完成全部 5 大專題工具", unlocked: completedProjects.length === 5 }
    ];

    let badgesHtml = '';
    badges.forEach(b => {
      badgesHtml += `
        <div class="col-sm-6 col-md-4 mb-3">
          <div class="card-custom p-3 text-center h-100 ${b.unlocked ? 'border-success' : 'opacity-50'}">
            <div class="fs-1 mb-2">${b.unlocked ? '🏆' : '🔒'}</div>
            <div class="fw-bold mb-1">${b.name}</div>
            <div class="small text-muted">${b.desc}</div>
            <div class="mt-2">
              <span class="badge ${b.unlocked ? 'bg-success' : 'bg-secondary'} small">
                ${b.unlocked ? '已解鎖' : '未解鎖'}
              </span>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <div class="container-xl py-4">
        <!-- 儀表板頂部標題與快捷按鈕 -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
          <div>
            <h1 class="h3 fw-bold mb-1">個人學習儀表板</h1>
            <p class="text-muted mb-0">追蹤您的 Python 字串學習軌跡、測驗勝率與專題實作成就。</p>
          </div>
          <div class="d-flex gap-2">
            <a href="${lastRoute}" class="btn btn-primary-custom">
              ▶ 繼續上次進度
            </a>
            <button class="btn btn-outline-danger" onclick="DashboardViewComponent.confirmReset()">
              重設所有進度
            </button>
          </div>
        </div>

        <!-- 四大核心數據卡片 -->
        <div class="row g-3 mb-4">
          <div class="col-sm-6 col-lg-3">
            <div class="card-custom p-3 h-100">
              <div class="text-muted small fw-bold mb-1">課程總進度</div>
              <div class="h2 fw-bold text-primary mb-1">${lessonPercent}%</div>
              <div class="small text-muted">已修畢 ${completedLessons.length} / ${totalLessons} 單元</div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card-custom p-3 h-100">
              <div class="text-muted small fw-bold mb-1">練習答對題數</div>
              <div class="h2 fw-bold text-success mb-1">${quizStats.correctCount} 題</div>
              <div class="small text-muted">已作答 ${quizStats.totalAnswered} / ${QUIZ_DATA.length} 題</div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card-custom p-3 h-100">
              <div class="text-muted small fw-bold mb-1">答題正確率</div>
              <div class="h2 fw-bold text-info mb-1">${quizStats.accuracy}%</div>
              <div class="small text-muted">包含單選、多選、預測與除錯題</div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card-custom p-3 h-100">
              <div class="text-muted small fw-bold mb-1">實戰專題完成</div>
              <div class="h2 fw-bold text-warning mb-1">${completedProjects.length} / 5</div>
              <div class="small text-muted">已完成文字清理、統計、替換等專題</div>
            </div>
          </div>
        </div>

        <div class="row g-4 mb-4">
          <!-- 階段進度細項 -->
          <div class="col-lg-6">
            <div class="card-custom p-4 h-100">
              <h2 class="h5 fw-bold mb-3 border-bottom pb-2">六大階段完成進度</h2>
              ${stageProgressHtml}
            </div>
          </div>

          <!-- 資料備份與安全性 -->
          <div class="col-lg-6">
            <div class="card-custom p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <h2 class="h5 fw-bold mb-3 border-bottom pb-2">儲存機制與備份</h2>
                <p class="text-muted small">
                  本系統使用瀏覽器標準 <code>LocalStorage</code> 技術記錄進度。所有資料均留存在您目前的裝置與瀏覽器中，無任何後端伺服器收集您的隱私。
                </p>
                <div class="callout-box callout-info py-2 small">
                  💡 若您需要切換電腦或更換瀏覽器，可點擊下方按鈕將學習紀錄匯出成 JSON 檔案，並在另一台電腦匯入還原！
                </div>
              </div>
              <div class="d-flex gap-2 pt-3">
                <button class="btn btn-outline-custom w-100" onclick="DashboardViewComponent.exportProgress()">
                  📤 匯出進度備份
                </button>
                <button class="btn btn-outline-custom w-100" onclick="DashboardViewComponent.importProgress()">
                  📥 匯入進度檔
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 學習成就徽章 -->
        <div class="card-custom p-4 mb-4">
          <h2 class="h5 fw-bold mb-3 border-bottom pb-2">學習成就榮譽榜</h2>
          <div class="row">
            ${badgesHtml}
          </div>
        </div>
      </div>
    `;
  },

  confirmReset() {
    const ok = confirm("【警告】您確定要重設所有學習進度嗎？\n此操作將會清空所有已完成課程、測驗得分與專題實作紀錄，且無法復原。");
    if (ok) {
      StorageManager.resetAllProgress();
      alert("學習進度已成功重設。");
      const container = document.getElementById('main-content');
      if (container) container.innerHTML = this.render();
      if (window.App) window.App.updateNavProgress();
    }
  },

  exportProgress() {
    const data = {
      completedLessons: StorageManager.getCompletedLessons(),
      quizResults: StorageManager.getQuizResults(),
      completedProjects: StorageManager.getCompletedProjects(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `python-string-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.completedLessons) StorageManager._set(STORAGE_KEYS.COMPLETED_LESSONS, imported.completedLessons);
          if (imported.quizResults) StorageManager._set(STORAGE_KEYS.QUIZ_RESULTS, imported.quizResults);
          if (imported.completedProjects) StorageManager._set(STORAGE_KEYS.COMPLETED_PROJECTS, imported.completedProjects);
          StorageManager._notifyChange();
          alert("進度已成功匯入！");
          const container = document.getElementById('main-content');
          if (container) container.innerHTML = DashboardViewComponent.render();
          if (window.App) window.App.updateNavProgress();
        } catch (err) {
          alert("匯入失敗：檔案格式不正確。");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
};

window.DashboardViewComponent = DashboardViewComponent;
