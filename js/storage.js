/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * LocalStorage 狀態與學習進度管理模組
 *
 * 特點：
 * 1. 封裝所有 LocalStorage 讀寫，防止直接操作拋出 QuotaExceededError 或存取受限。
 * 2. 嚴格記錄已完成課程、測驗得分、專題實作狀態與最後瀏覽紀錄。
 * 3. 提供完整的進度計算與重設進度功能。
 * 4. 遵守隱私原則，不儲存任何個人機密或外部追蹤識別碼。
 */

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'py_edu_completed_lessons',
  QUIZ_RESULTS: 'py_edu_quiz_results',
  COMPLETED_PROJECTS: 'py_edu_completed_projects',
  LAST_ROUTE: 'py_edu_last_route',
  NOTICE_DISMISSED: 'py_edu_notice_dismissed'
};

const StorageManager = {
  // 安全讀取 JSON
  _get(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`[StorageManager] 無法讀取 key: ${key}`, e);
      return defaultValue;
    }
  },

  // 安全寫入 JSON
  _set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[StorageManager] 無法寫入 key: ${key}`, e);
      return false;
    }
  },

  // === 課程完成度管理 ===
  getCompletedLessons() {
    return this._get(STORAGE_KEYS.COMPLETED_LESSONS, []);
  },

  isLessonCompleted(lessonId) {
    const list = this.getCompletedLessons();
    return list.includes(lessonId);
  },

  markLessonCompleted(lessonId) {
    const list = this.getCompletedLessons();
    if (!list.includes(lessonId)) {
      list.push(lessonId);
      this._set(STORAGE_KEYS.COMPLETED_LESSONS, list);
      this._notifyChange();
    }
    return list;
  },

  toggleLessonCompleted(lessonId) {
    let list = this.getCompletedLessons();
    if (list.includes(lessonId)) {
      list = list.filter(id => id !== lessonId);
    } else {
      list.push(lessonId);
    }
    this._set(STORAGE_KEYS.COMPLETED_LESSONS, list);
    this._notifyChange();
    return list.includes(lessonId);
  },

  // === 測驗答題管理 ===
  getQuizResults() {
    return this._get(STORAGE_KEYS.QUIZ_RESULTS, {});
  },

  saveQuizAnswer(questionId, isCorrect, userAnswer) {
    const results = this.getQuizResults();
    results[questionId] = {
      isCorrect: Boolean(isCorrect),
      userAnswer: userAnswer,
      timestamp: new Date().toISOString()
    };
    this._set(STORAGE_KEYS.QUIZ_RESULTS, results);
    this._notifyChange();
    return results;
  },

  getQuizStats() {
    const results = this.getQuizResults();
    const keys = Object.keys(results);
    const totalAnswered = keys.length;
    const correctCount = keys.filter(k => results[k].isCorrect).length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    return {
      totalAnswered,
      correctCount,
      accuracy
    };
  },

  // === 專題實作管理 ===
  getCompletedProjects() {
    return this._get(STORAGE_KEYS.COMPLETED_PROJECTS, []);
  },

  markProjectCompleted(projectId) {
    const list = this.getCompletedProjects();
    if (!list.includes(projectId)) {
      list.push(projectId);
      this._set(STORAGE_KEYS.COMPLETED_PROJECTS, list);
      this._notifyChange();
    }
    return list;
  },

  // === 瀏覽狀態管理 ===
  getLastRoute() {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_ROUTE) || '#/';
    } catch (e) {
      return '#/';
    }
  },

  setLastRoute(route) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_ROUTE, route);
    } catch (e) {
      // 忽視
    }
  },

  isNoticeDismissed() {
    return this._get(STORAGE_KEYS.NOTICE_DISMISSED, false);
  },

  setNoticeDismissed(dismissed = true) {
    return this._set(STORAGE_KEYS.NOTICE_DISMISSED, dismissed);
  },

  // === 進度重設與監聽 ===
  resetAllProgress() {
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.LAST_ROUTE);
      this._notifyChange();
      return true;
    } catch (e) {
      console.error('[StorageManager] 重設失敗', e);
      return false;
    }
  },

  _listeners: [],
  onProgressChange(callback) {
    if (typeof callback === 'function') {
      this._listeners.push(callback);
    }
  },

  _notifyChange() {
    this._listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error(e); }
    });
  }
};

window.StorageManager = StorageManager;
