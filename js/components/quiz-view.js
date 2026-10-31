/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 互動練習題庫與答題組件 (Quiz View Component)
 *
 * 支援 7 大題型：單選、多選、填空、閱讀、預測、除錯、撰寫。
 */

const QuizViewComponent = {
  currentQuizIndex: 0,
  selectedAnswers: {}, // 暫存使用者選擇 { [quizId]: value }

  render(targetQuizId = null) {
    if (targetQuizId) {
      const idx = QUIZ_DATA.findIndex(q => q.id === targetQuizId);
      if (idx !== -1) {
        this.currentQuizIndex = idx;
      }
    }

    const quiz = QUIZ_DATA[this.currentQuizIndex] || QUIZ_DATA[0];
    const results = StorageManager.getQuizResults();
    const stats = StorageManager.getQuizStats();

    // 題目導航按鈕列
    let navBadgesHtml = '';
    QUIZ_DATA.forEach((q, idx) => {
      const qRes = results[q.id];
      let badgeStyle = 'btn-outline-secondary';
      if (qRes) {
        badgeStyle = qRes.isCorrect ? 'btn-success text-white' : 'btn-danger text-white';
      }
      if (idx === this.currentQuizIndex) {
        badgeStyle += ' border-primary border-2 fw-bold';
      }

      navBadgesHtml += `
        <button class="btn btn-sm ${badgeStyle} m-1" style="min-width: 36px;" onclick="QuizViewComponent.jumpTo(${idx})">
          ${idx + 1}
        </button>
      `;
    });

    // 取得當前題目狀態
    const currRes = results[quiz.id];
    const isAnswered = Boolean(currRes);

    // 題目選項或填空輸入介面
    let inputInterfaceHtml = '';
    const tempChoice = this.selectedAnswers[quiz.id];

    if (quiz.type === 'fill') {
      const filledVal = isAnswered ? currRes.userAnswer : (tempChoice || '');
      inputInterfaceHtml = `
        <div class="mb-3">
          <label class="form-label fw-bold">請輸入填空答案：</label>
          <input type="text" id="fill-input-${quiz.id}" class="form-control font-monospace" style="max-width: 360px;" 
                 value="${filledVal}" ${isAnswered ? 'disabled' : ''} placeholder="例如 ::-1">
        </div>
      `;
    } else {
      // 選擇題型 (single, multiple, reading, prediction, debugging, coding)
      const isMultiple = quiz.type === 'multiple';
      let optionsListHtml = '';

      quiz.options.forEach((optText, optIdx) => {
        let optClass = 'quiz-option';
        let isChecked = false;

        if (isAnswered) {
          if (isMultiple) {
            const userArr = Array.isArray(currRes.userAnswer) ? currRes.userAnswer : [];
            const ansArr = Array.isArray(quiz.answer) ? quiz.answer : [];
            if (ansArr.includes(optIdx)) optClass += ' correct';
            else if (userArr.includes(optIdx)) optClass += ' incorrect';
            isChecked = userArr.includes(optIdx);
          } else {
            if (optIdx === quiz.answer) optClass += ' correct';
            else if (optIdx === currRes.userAnswer) optClass += ' incorrect';
            isChecked = (optIdx === currRes.userAnswer);
          }
        } else {
          if (isMultiple) {
            const selectedArr = Array.isArray(tempChoice) ? tempChoice : [];
            isChecked = selectedArr.includes(optIdx);
            if (isChecked) optClass += ' selected';
          } else {
            isChecked = (tempChoice === optIdx);
            if (isChecked) optClass += ' selected';
          }
        }

        const inputType = isMultiple ? 'checkbox' : 'radio';
        optionsListHtml += `
          <label class="${optClass}" onclick="QuizViewComponent.selectOption('${quiz.id}', ${optIdx}, ${isMultiple})">
            <div class="d-flex align-items-center">
              <input type="${inputType}" name="opt-${quiz.id}" class="form-check-input me-3 mt-0" 
                     ${isChecked ? 'checked' : ''} ${isAnswered ? 'disabled' : ''}>
              <span class="font-monospace">${CourseViewComponent.escapeHtml(optText)}</span>
            </div>
          </label>
        `;
      });

      inputInterfaceHtml = `
        ${isMultiple ? '<div class="alert alert-info py-2 small mb-3">📌 此題為<strong>多選題</strong>，請勾選所有正確的選項。</div>' : ''}
        <div class="options-container">
          ${optionsListHtml}
        </div>
      `;
    }

    // 解析區塊
    let feedbackHtml = '';
    if (isAnswered) {
      feedbackHtml = `
        <div class="callout-box ${currRes.isCorrect ? 'callout-success' : 'callout-danger'} mt-3">
          <div class="h6 fw-bold mb-2">
            ${currRes.isCorrect ? '🎉 答對了！太棒了！' : '❌ 答錯了，請參考解析思考正確方式：'}
          </div>
          <div class="mb-2"><strong>正解說明：</strong>${quiz.explanation}</div>
          ${quiz.commonMistakeAnalysis ? `<div class="text-muted small"><strong>⚠️ 常見錯誤分析：</strong>${quiz.commonMistakeAnalysis}</div>` : ''}
        </div>
      `;
    }

    // 題目型態中文名稱
    const typeNames = {
      single: '單選題',
      multiple: '多選題',
      fill: '填空題',
      reading: '程式碼閱讀題',
      prediction: '執行結果預測題',
      debugging: '程式除錯題',
      coding: '程式撰寫/重組題'
    };

    return `
      <div class="container-xl py-4">
        <!-- 頂部統計指標 -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1">互動練習題庫</h1>
            <p class="text-muted mb-0">共收錄 ${QUIZ_DATA.length} 題，涵蓋 7 大題型，即時回饋並提供深度錯誤分析。</p>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="text-end">
              <span class="small text-muted">答題統計：</span>
              <span class="fw-bold text-success">${stats.correctCount} 對</span> /
              <span class="fw-bold">${stats.totalAnswered} 已作答</span>
              <span class="badge bg-primary ms-2">正確率 ${stats.accuracy}%</span>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- 題目答題主區 -->
          <div class="col-lg-8">
            <div class="quiz-card">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary">${typeNames[quiz.type] || '練習題'}</span>
                  <span class="badge bg-light text-dark border">階段 ${quiz.stageId}</span>
                  <span class="badge bg-warning text-dark">${quiz.difficulty}</span>
                </div>
                <div class="text-muted small fw-semibold">
                  第 ${this.currentQuizIndex + 1} / ${QUIZ_DATA.length} 題
                </div>
              </div>

              <h2 class="h5 fw-bold mb-3">${quiz.title}</h2>
              <p class="mb-3" style="font-size: 1.05rem;">${quiz.prompt}</p>

              ${quiz.code ? `
                <div class="code-block-wrapper my-3">
                  <div class="code-header"><span class="code-lang-tag">Python 題目程式碼</span></div>
                  <pre class="code-content"><code>${CourseViewComponent.escapeHtml(quiz.code)}</code></pre>
                </div>
              ` : ''}

              <!-- 作答選項 -->
              <div class="my-3">
                ${inputInterfaceHtml}
              </div>

              <!-- 提交與導航按鈕 -->
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-4">
                <button class="btn btn-outline-secondary" onclick="QuizViewComponent.prevQuestion()" ${this.currentQuizIndex === 0 ? 'disabled' : ''}>
                  ← 上一題
                </button>

                <div class="d-flex gap-2">
                  ${!isAnswered ? `
                    <button class="btn btn-primary-custom" onclick="QuizViewComponent.submitAnswer('${quiz.id}')">
                      確認送出答案
                    </button>
                  ` : `
                    <button class="btn btn-outline-custom" onclick="QuizViewComponent.retryQuiz('${quiz.id}')">
                      重新挑戰此題
                    </button>
                  `}
                </div>

                <button class="btn btn-primary-custom" onclick="QuizViewComponent.nextQuestion()" ${this.currentQuizIndex === QUIZ_DATA.length - 1 ? 'disabled' : ''}>
                  下一題 →
                </button>
              </div>

              <!-- 結果反饋 -->
              ${feedbackHtml}
            </div>
          </div>

          <!-- 側邊欄題目選單 -->
          <div class="col-lg-4">
            <div class="card-custom p-3 position-sticky" style="top: 80px;">
              <h4 class="h6 fw-bold mb-2">題號快速導航</h4>
              <div class="d-flex flex-wrap mb-3">
                ${navBadgesHtml}
              </div>
              <div class="border-top pt-2 small text-muted">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="badge bg-success" style="width: 14px; height: 14px; padding: 0;"> </span>
                  <span>答對題目</span>
                </div>
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="badge bg-danger" style="width: 14px; height: 14px; padding: 0;"> </span>
                  <span>答錯題目</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge border border-2 border-primary" style="width: 14px; height: 14px; padding: 0;"> </span>
                  <span>目前正在作答</span>
                </div>
              </div>

              <div class="mt-4 pt-3 border-top">
                <a href="#/lab" class="btn btn-outline-custom w-100 mb-2">
                  🧪 開啟 Python 實驗室測試
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectOption(quizId, optIdx, isMultiple) {
    const results = StorageManager.getQuizResults();
    if (results[quizId]) return; // 已作答則鎖定

    if (isMultiple) {
      let current = this.selectedAnswers[quizId] || [];
      if (!Array.isArray(current)) current = [];
      if (current.includes(optIdx)) {
        current = current.filter(i => i !== optIdx);
      } else {
        current.push(optIdx);
      }
      this.selectedAnswers[quizId] = current;
    } else {
      this.selectedAnswers[quizId] = optIdx;
    }

    // 重新渲染當前題
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = this.render();
  },

  submitAnswer(quizId) {
    const quiz = QUIZ_DATA.find(q => q.id === quizId);
    if (!quiz) return;

    let isCorrect = false;
    let userAnswer = null;

    if (quiz.type === 'fill') {
      const inputEl = document.getElementById(`fill-input-${quizId}`);
      userAnswer = inputEl ? inputEl.value.trim() : '';
      if (!userAnswer) {
        alert('請先在輸入框中輸入您的答案！');
        return;
      }
      // 容錯檢查（忽略空格）
      const cleanUser = userAnswer.replace(/\s+/g, '');
      const cleanAns = String(quiz.answer).replace(/\s+/g, '');
      isCorrect = (cleanUser === cleanAns);
    } else if (quiz.type === 'multiple') {
      userAnswer = this.selectedAnswers[quizId] || [];
      if (!userAnswer.length) {
        alert('此題為多選題，請至少勾選一個選項！');
        return;
      }
      const sortedUser = [...userAnswer].sort();
      const sortedAns = [...quiz.answer].sort();
      isCorrect = (JSON.stringify(sortedUser) === JSON.stringify(sortedAns));
    } else {
      userAnswer = this.selectedAnswers[quizId];
      if (userAnswer === undefined || userAnswer === null) {
        alert('請先選擇一個選項！');
        return;
      }
      isCorrect = (userAnswer === quiz.answer);
    }

    StorageManager.saveQuizAnswer(quizId, isCorrect, userAnswer);

    // 重新渲染更新
    const container = document.getElementById('main-content');
    if (container) container.innerHTML = this.render();
    if (window.App) window.App.updateNavProgress();
  },

  retryQuiz(quizId) {
    const results = StorageManager.getQuizResults();
    delete results[quizId];
    StorageManager._set(STORAGE_KEYS.QUIZ_RESULTS, results);
    delete this.selectedAnswers[quizId];

    const container = document.getElementById('main-content');
    if (container) container.innerHTML = this.render();
    if (window.App) window.App.updateNavProgress();
  },

  jumpTo(index) {
    if (index >= 0 && index < QUIZ_DATA.length) {
      this.currentQuizIndex = index;
      const container = document.getElementById('main-content');
      if (container) container.innerHTML = this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  prevQuestion() {
    this.jumpTo(this.currentQuizIndex - 1);
  },

  nextQuestion() {
    this.jumpTo(this.currentQuizIndex + 1);
  }
};

window.QuizViewComponent = QuizViewComponent;
