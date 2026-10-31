/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * Python 程式碼實驗室視圖組件 (Lab View Component)
 *
 * 整合 Pyodide WebAssembly 執行環境，提供標準 Python 3 程式碼即時編寫、執行與終端輸出。
 */

const LabViewComponent = {
  currentCode: `# 歡迎使用 Python 初學到進階程式碼實驗室！
# 您可以直接在此撰寫標準 Python 3 程式碼，或從上方下拉選單載入各階段範例。

def greet(name):
    # 使用 f-string 組合問候語
    return f"哈囉，{name}！歡迎來到 Python 字串處理世界！"

sample_name = "Python 學習者"
print(greet(sample_name))

# 測試字串長度與切片
print("字串長度:", len(sample_name))
print("倒序反轉:", sample_name[::-1])`,

  render(initialLessonId = null) {
    if (initialLessonId && CURRICULUM_DATA.lessons[initialLessonId]) {
      this.currentCode = CURRICULUM_DATA.lessons[initialLessonId].codeSnippet;
    }

    // 建立範例下拉選項
    let presetsHtml = '<option value="">-- 快速載入課程範例程式碼 --</option>';
    CURRICULUM_DATA.stages.forEach(st => {
      presetsHtml += `<optgroup label="${st.title}">`;
      st.lessonIds.forEach(id => {
        const l = CURRICULUM_DATA.lessons[id];
        if (l) {
          const selected = id === initialLessonId ? 'selected' : '';
          presetsHtml += `<option value="${id}" ${selected}>${l.title}</option>`;
        }
      });
      presetsHtml += `</optgroup>`;
    });

    return `
      <div class="container-xl py-4">
        <!-- 頁面標題與簡介 -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <h1 class="h3 fw-bold mb-1">Python 程式碼實驗室 (Code Lab)</h1>
            <p class="text-muted mb-0">免安裝任何 Python 軟體，直接在瀏覽器 WebAssembly 沙盒中執行標準 Python 3.12 程式碼！</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span id="pyodide-status-badge" class="badge bg-secondary">
              ${this.getStatusBadgeText(PyodideRunner.status)}
            </span>
          </div>
        </div>

        <!-- 沙盒環境說明與快捷鍵提示 -->
        <div class="alert alert-secondary py-2 small d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <span>
            🛡️ <strong>瀏覽器沙盒限制說明</strong>：程式碼於瀏覽器隔離環境中運行，無法存取您電腦中的本機硬碟檔案，以保障您的資安。
          </span>
          <span class="text-muted">
            ⌨️ 快捷鍵：<kbd>Ctrl</kbd> + <kbd>Enter</kbd> (Mac: <kbd>Cmd</kbd> + <kbd>Enter</kbd>)
          </span>
        </div>

        <!-- 編輯器與終端機主區塊 -->
        <div class="lab-container">
          <!-- 左側：程式碼編輯區 -->
          <div class="editor-wrapper">
            <div class="editor-toolbar">
              <div class="d-flex align-items-center gap-2">
                <span class="text-white small fw-bold">main.py</span>
                <select id="preset-selector" class="form-select form-select-sm bg-dark text-light border-secondary" style="max-width: 250px;" onchange="LabViewComponent.loadPreset(this.value)">
                  ${presetsHtml}
                </select>
              </div>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-light" onclick="LabViewComponent.clearCode()">
                  重設
                </button>
                <button id="run-code-btn" class="btn btn-sm btn-success fw-bold px-3" onclick="LabViewComponent.run()">
                  ▶ 執行 (Run)
                </button>
              </div>
            </div>
            <textarea id="lab-editor" class="code-editor-textarea" spellcheck="false" placeholder="在此輸入 Python 程式碼...">${CourseViewComponent.escapeHtml(this.currentCode)}</textarea>
          </div>

          <!-- 右側：執行終端機 -->
          <div class="terminal-wrapper">
            <div class="terminal-header">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-dark border text-light font-monospace">Console Output</span>
                <span id="terminal-exec-time" class="text-muted small"></span>
              </div>
              <div>
                <button class="btn btn-sm btn-outline-secondary text-light py-0 px-2" onclick="LabViewComponent.clearOutput()">
                  清除輸出
                </button>
              </div>
            </div>
            <div id="terminal-output" class="terminal-output">
點擊上方「▶ 執行」按鈕開始運行 Python 程式碼。
初次執行時會自動自 CDN 下載 Pyodide WebAssembly 核心（約需 3~5 秒）。
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getStatusBadgeText(status) {
    if (status === 'ready') return '✓ Python 環境已就緒';
    if (status === 'loading') return '⏳ Python 核心載入中...';
    if (status === 'error') return '❌ 載入失敗';
    return '○ 待命（按需載入）';
  },

  initListeners() {
    // 綁定編輯器鍵盤監聽（Tab 鍵縮排 4 空白，Ctrl+Enter 執行）
    const editor = document.getElementById('lab-editor');
    if (editor) {
      editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          this.run();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
          editor.selectionStart = editor.selectionEnd = start + 4;
        }
      });
    }

    // 監聽 Pyodide 狀態變化更新 Badge
    PyodideRunner.onStatusChange((status, err) => {
      const badge = document.getElementById('pyodide-status-badge');
      if (badge) {
        badge.innerText = this.getStatusBadgeText(status);
        if (status === 'ready') badge.className = 'badge bg-success';
        else if (status === 'loading') badge.className = 'badge bg-warning text-dark';
        else if (status === 'error') badge.className = 'badge bg-danger';
        else badge.className = 'badge bg-secondary';
      }
    });
  },

  async run() {
    const editor = document.getElementById('lab-editor');
    const terminal = document.getElementById('terminal-output');
    const timeLabel = document.getElementById('terminal-exec-time');
    const runBtn = document.getElementById('run-code-btn');

    if (!editor || !terminal) return;

    const code = editor.value;
    this.currentCode = code;

    runBtn.disabled = true;
    runBtn.innerText = '執行中...';
    timeLabel.innerText = '';
    terminal.innerHTML = '<span class="terminal-status-loading">⏳ 正在執行 Python 程式碼，請稍候...</span>';

    try {
      const result = await PyodideRunner.runCode(code);

      if (result.success) {
        terminal.innerHTML = `<span class="terminal-status-success">${CourseViewComponent.escapeHtml(result.output)}</span>`;
        timeLabel.innerText = `耗時：${result.executionTime}`;
      } else {
        terminal.innerHTML = `<span class="terminal-status-error">${CourseViewComponent.escapeHtml(result.error)}</span>`;
      }
    } catch (e) {
      terminal.innerHTML = `<span class="terminal-status-error">系統執行錯誤：${CourseViewComponent.escapeHtml(e.message)}</span>`;
    } finally {
      runBtn.disabled = false;
      runBtn.innerText = '▶ 執行 (Run)';
      terminal.scrollTop = terminal.scrollHeight;
    }
  },

  loadPreset(lessonId) {
    if (!lessonId) return;
    const lesson = CURRICULUM_DATA.lessons[lessonId];
    if (!lesson) return;

    const editor = document.getElementById('lab-editor');
    if (editor) {
      editor.value = lesson.codeSnippet;
      this.currentCode = lesson.codeSnippet;
    }
  },

  clearCode() {
    const editor = document.getElementById('lab-editor');
    if (editor) {
      editor.value = '# 在此開始撰寫您的 Python 程式碼\n';
      this.currentCode = editor.value;
    }
  },

  clearOutput() {
    const terminal = document.getElementById('terminal-output');
    const timeLabel = document.getElementById('terminal-exec-time');
    if (terminal) terminal.innerHTML = '（輸出已清空）';
    if (timeLabel) timeLabel.innerText = '';
  }
};

window.LabViewComponent = LabViewComponent;
