/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 頂部導覽列與行動選單組件 (Navbar Component)
 */

const NavbarComponent = {
  render() {
    const completedCount = StorageManager.getCompletedLessons().length;
    const totalLessons = Object.keys(CURRICULUM_DATA.lessons).length;
    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return `
    <nav class="navbar navbar-expand-lg site-header">
      <div class="container-xl">
        <a class="brand-logo" href="#/">
          <div class="brand-icon">Py</div>
          <span>Python 初學到進階</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNavbar" aria-controls="siteNavbar" aria-expanded="false" aria-label="切換導覽列">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="siteNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            <li class="nav-item">
              <a class="nav-link" href="#/" id="nav-home">首頁</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/courses" id="nav-courses">
                課程列表
                <span class="nav-progress-badge">${percent}%</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/quizzes" id="nav-quizzes">互動練習</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/lab" id="nav-lab">程式碼實驗室</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/projects" id="nav-projects">實戰專題</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/dashboard" id="nav-dashboard">學習儀表板</a>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-2">
            <a href="#/courses" class="btn btn-sm btn-outline-custom">
              繼續學習
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- LocalStorage 儲存提示橫幅 -->
    <div id="storage-notice" class="storage-notice-banner ${StorageManager.isNoticeDismissed() ? 'd-none' : ''}">
      <div class="container-xl d-flex justify-content-between align-items-center">
        <span>
          💡 <strong>學習進度提醒</strong>：本網站學習進度與練習答題紀錄皆儲存在您的「目前瀏覽器」（LocalStorage），不會自動同步至其他裝置。
        </span>
        <button type="button" class="close-btn ms-2" onclick="NavbarComponent.dismissNotice()" aria-label="關閉提示">&times;</button>
      </div>
    </div>
    `;
  },

  dismissNotice() {
    StorageManager.setNoticeDismissed(true);
    const banner = document.getElementById('storage-notice');
    if (banner) banner.classList.add('d-none');
  },

  updateActive(route) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(el => el.classList.remove('active'));
    if (route === '' || route === '#/' || route === '#') {
      document.getElementById('nav-home')?.classList.add('active');
    } else if (route.startsWith('#/course')) {
      document.getElementById('nav-courses')?.classList.add('active');
    } else if (route.startsWith('#/quiz')) {
      document.getElementById('nav-quizzes')?.classList.add('active');
    } else if (route.startsWith('#/lab')) {
      document.getElementById('nav-lab')?.classList.add('active');
    } else if (route.startsWith('#/project')) {
      document.getElementById('nav-projects')?.classList.add('active');
    } else if (route.startsWith('#/dashboard')) {
      document.getElementById('nav-dashboard')?.classList.add('active');
    }
  }
};

window.NavbarComponent = NavbarComponent;
