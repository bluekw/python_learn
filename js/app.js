/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 單頁應用程式 (SPA) 主路由與狀態控管器 (App Router & Controller)
 */

const App = {
  init() {
    // 1. 渲染導覽列
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
      navContainer.innerHTML = NavbarComponent.render();
    }

    // 2. 監聽 LocalStorage 狀態變更事件
    StorageManager.onProgressChange(() => {
      this.updateNavProgress();
    });

    // 3. 監聽瀏覽器 Hash 路由切換
    window.addEventListener('hashchange', () => this.handleRoute());

    // 4. 首次載入分發路由
    this.handleRoute();
  },

  updateNavProgress() {
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
      navContainer.innerHTML = NavbarComponent.render();
      NavbarComponent.updateActive(window.location.hash || '#/');
    }
  },

  handleRoute() {
    const hash = window.location.hash || '#/';
    const container = document.getElementById('main-content');
    if (!container) return;

    NavbarComponent.updateActive(hash);

    // 儲存最後造訪路徑
    if (!hash.startsWith('#/dashboard')) {
      StorageManager.setLastRoute(hash);
    }

    // 1. 首頁
    if (hash === '#/' || hash === '#' || hash === '') {
      container.innerHTML = this.renderHome();
      window.scrollTo(0, 0);
      return;
    }

    // 2. 課程目錄
    if (hash === '#/courses') {
      container.innerHTML = CourseViewComponent.renderCatalog();
      window.scrollTo(0, 0);
      return;
    }

    // 3. 單元課程詳細頁：#/course/1-1
    if (hash.startsWith('#/course/')) {
      const lessonId = hash.replace('#/course/', '').trim();
      container.innerHTML = CourseViewComponent.renderLesson(lessonId);
      window.scrollTo(0, 0);
      return;
    }

    // 4. 互動練習題庫：#/quizzes 或 #/quiz/q1-1
    if (hash === '#/quizzes' || hash.startsWith('#/quiz')) {
      let targetQuizId = null;
      if (hash.startsWith('#/quiz/')) {
        targetQuizId = hash.replace('#/quiz/', '').trim();
      }
      container.innerHTML = QuizViewComponent.render(targetQuizId);
      window.scrollTo(0, 0);
      return;
    }

    // 5. Python 程式碼實驗室：#/lab 或 #/lab?lesson=1-1
    if (hash.startsWith('#/lab')) {
      let initialLessonId = null;
      if (hash.includes('?lesson=')) {
        initialLessonId = hash.split('?lesson=')[1];
      }
      container.innerHTML = LabViewComponent.render(initialLessonId);
      LabViewComponent.initListeners();
      window.scrollTo(0, 0);
      return;
    }

    // 6. 實戰專題工具：#/projects 或 #/project/p1
    if (hash === '#/projects' || hash.startsWith('#/project')) {
      let targetProjectId = null;
      if (hash.startsWith('#/project/')) {
        targetProjectId = hash.replace('#/project/', '').trim();
      }
      container.innerHTML = ProjectsViewComponent.render(targetProjectId);
      window.scrollTo(0, 0);
      return;
    }

    // 7. 學習儀表板：#/dashboard
    if (hash === '#/dashboard') {
      container.innerHTML = DashboardViewComponent.render();
      window.scrollTo(0, 0);
      return;
    }

    // 未知路由：404 容錯導向
    container.innerHTML = `
      <div class="container-xl py-5 text-center">
        <h2 class="h3 fw-bold text-danger mb-3">頁面不存在 (404 Not Found)</h2>
        <p class="text-muted">您請求的路徑 <code>${CourseViewComponent.escapeHtml(hash)}</code> 查無對應頁面。</p>
        <a href="#/" class="btn btn-primary-custom">返回首頁</a>
      </div>
    `;
    window.scrollTo(0, 0);
  },

  /**
   * 渲染首頁（Home View）
   */
  renderHome() {
    const completedLessons = StorageManager.getCompletedLessons();
    const totalLessons = Object.keys(CURRICULUM_DATA.lessons).length;
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
    const stats = StorageManager.getQuizStats();

    // 6 階段卡片
    let stageCardsHtml = '';
    CURRICULUM_DATA.stages.forEach(stage => {
      const stageDone = stage.lessonIds.filter(id => completedLessons.includes(id)).length;
      stageCardsHtml += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card-custom h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="stage-badge ${stage.badgeClass}">階段 ${stage.id}</span>
                <span class="small fw-bold text-muted">${stageDone}/${stage.lessonIds.length} 單元</span>
              </div>
              <h3 class="h5 fw-bold mb-2">${stage.title}</h3>
              <p class="text-muted small mb-3">${stage.description}</p>
            </div>
            <div>
              <div class="progress-bar-custom mb-3">
                <div class="progress-bar-fill" style="width: ${Math.round((stageDone / stage.lessonIds.length) * 100)}%;"></div>
              </div>
              <a href="#/course/${stage.lessonIds[0]}" class="btn btn-sm btn-outline-custom w-100">
                開始此階段課程 →
              </a>
            </div>
          </div>
        </div>
      `;
    });

    return `
      <!-- Hero 核心橫幅 -->
      <section class="hero-section">
        <div class="container-xl">
          <div class="hero-badges">
            <span class="hero-badge-item">🚀 專為初學者打造</span>
            <span class="hero-badge-item">⚡ 零安裝！瀏覽器內建 Python 執行環境</span>
            <span class="hero-badge-item">🌐 支援 GitHub Pages 靜態部署</span>
            <span class="hero-badge-item">🇹🇼 全繁體中文 Taiwan</span>
          </div>

          <h1 class="hero-title">Python 初學到進階：字串處理完整攻略</h1>
          <p class="hero-subtitle">
            從單雙引號、切片索引、搜尋替換，一路進階到正規表示式與 5 大實戰專題工具。
            循序漸進的觀念解說、即時互動練習與沙盒程式碼實驗室，助您扎實打穩程式設計基本功！
          </p>

          <div class="d-flex flex-wrap justify-content-center gap-3 mb-4">
            <a href="#/course/1-1" class="btn btn-lg btn-primary-custom px-4 py-2">
              🚀 開始學習第一課 (1.1 什麼是字串)
            </a>
            <a href="#/lab" class="btn btn-lg btn-outline-custom px-4 py-2">
              🧪 進入 Python 實驗室
            </a>
          </div>

          <!-- 快速狀態小列 -->
          <div class="d-inline-flex align-items-center gap-3 p-2 px-3 bg-white border rounded-pill shadow-sm small text-muted">
            <span>目前進度：<strong class="text-primary">${progressPercent}%</strong></span>
            <span>已修單元：<strong>${completedLessons.length}/${totalLessons}</strong></span>
            <span>測驗得分：<strong>${stats.correctCount} 題</strong></span>
            <a href="#/dashboard" class="text-decoration-none fw-semibold">查看儀表板 →</a>
          </div>
        </div>
      </section>

      <!-- 六大階段課程地圖 -->
      <section class="container-xl py-5">
        <div class="text-center mb-5">
          <h2 class="h3 fw-bold mb-2">六大階段完整學習路徑 (Learning Roadmap)</h2>
          <p class="text-muted max-w-600 mx-auto">
            課程由淺入深精心規劃，每個單元均附帶語法解說、可驗證範例、逐行說明與實戰挑戰。
          </p>
        </div>

        <div class="row">
          ${stageCardsHtml}
        </div>
      </section>

      <!-- 核心特色區塊 -->
      <section class="bg-white border-top border-bottom py-5">
        <div class="container-xl">
          <div class="row g-4 text-center">
            <div class="col-md-4">
              <div class="fs-1 mb-2">💡</div>
              <h3 class="h5 fw-bold mb-2">正確觀念與錯誤分析</h3>
              <p class="text-muted small mb-0">
                深入探討不可變性、find 與 index 差異、UTF-8 位元組與字串索引的本質區別，避免初學者踩坑。
              </p>
            </div>
            <div class="col-md-4">
              <div class="fs-1 mb-2">🧪</div>
              <h3 class="h5 fw-bold mb-2">Pyodide 瀏覽器執行沙盒</h3>
              <p class="text-muted small mb-0">
                無需在本機安裝任何 Python 解譯器，直接在瀏覽器 WebAssembly 中執行標準 Python 3.12 程式碼。
              </p>
            </div>
            <div class="col-md-4">
              <div class="fs-1 mb-2">🛠️</div>
              <h3 class="h5 fw-bold mb-2">五大真實專題實作</h3>
              <p class="text-muted small mb-0">
                包含文字清理、字元統計、搜尋替換 Diff、資料格式整理與綜合文字分析報告，能立刻應用於工作之中。
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
};

window.App = App;

// DOM 就緒後啟動
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
