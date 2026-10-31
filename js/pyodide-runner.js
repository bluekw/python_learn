/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * Pyodide WebAssembly 瀏覽器端 Python 執行環境模組
 *
 * 核心特性：
 * 1. 按需延遲載入（Lazy Loading），首頁載入零負擔。
 * 2. 攔截 sys.stdout 與 sys.stderr，精確捕獲 print() 輸出。
 * 3. 初學者友善的繁體中文錯誤訊息輔助分析（SyntaxError, IndexError, TypeError 等）。
 * 4. 執行時間安全監控，保護瀏覽器免於死迴圈凍結。
 * 5. 明確標示瀏覽器端沙盒環境限制（無本機硬碟存取、無任意 socket 通訊）。
 */

const PyodideRunner = {
  status: 'unloaded', // 'unloaded' | 'loading' | 'ready' | 'error'
  pyodideInstance: null,
  errorMessage: null,
  listeners: [],

  onStatusChange(cb) {
    if (typeof cb === 'function') {
      this.listeners.push(cb);
      cb(this.status, this.errorMessage);
    }
  },

  _setStatus(newStatus, err = null) {
    this.status = newStatus;
    this.errorMessage = err;
    this.listeners.forEach(cb => {
      try { cb(newStatus, err); } catch (e) { console.error(e); }
    });
  },

  /**
   * 按需動態載入 Pyodide JS 與 WASM 核心
   */
  async init() {
    if (this.status === 'ready') return true;
    if (this.status === 'loading') return false;

    this._setStatus('loading');

    try {
      // 1. 若尚未載入 pyodide.js，動態建立 script 標籤
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('無法從 CDN 下載 Pyodide 核心。請檢查您的網路連線。'));
          document.head.appendChild(script);
        });
      }

      // 2. 初始化 Pyodide 執行個體
      this.pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });

      // 3. 設定標準輸出與錯誤捕捉機制
      await this.pyodideInstance.runPythonAsync(`
import sys
import io

class OutputCatcher:
    def __init__(self):
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()
    
    def start(self):
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()
        sys.stdout = self.stdout_buffer
        sys.stderr = self.stderr_buffer
        
    def get_output(self):
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
        return self.stdout_buffer.getvalue(), self.stderr_buffer.getvalue()

_catcher = OutputCatcher()
`);

      this._setStatus('ready');
      return true;
    } catch (err) {
      console.error('[PyodideRunner] 初始化失敗:', err);
      this._setStatus('error', err.message || 'Pyodide 載入失敗');
      return false;
    }
  },

  /**
   * 執行 Python 程式碼
   * @param {string} code 欲執行的 Python 原始碼
   * @param {number} timeoutMs 逾時限制毫秒（預設 8000ms）
   */
  async runCode(code, timeoutMs = 8000) {
    if (this.status !== 'ready') {
      const ok = await this.init();
      if (!ok) {
        return {
          success: false,
          output: '',
          error: `【執行環境尚未就緒】\n${this.errorMessage || '請檢查網路並重試。'}`
        };
      }
    }

    try {
      // 啟動 stdout / stderr 捕捉
      await this.pyodideInstance.runPythonAsync(`_catcher.start()`);

      // 逾時安全包裝
      const runPromise = this.pyodideInstance.runPythonAsync(code);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('EXECUTION_TIMEOUT')), timeoutMs);
      });

      const startTime = performance.now();
      await Promise.race([runPromise, timeoutPromise]);
      const duration = ((performance.now() - startTime) / 1000).toFixed(2);

      // 提取輸出
      const [stdout, stderr] = await this.pyodideInstance.runPythonAsync(`_catcher.get_output()`);

      let fullOutput = stdout || '';
      if (stderr) {
        fullOutput += (fullOutput ? '\n' : '') + `[標準錯誤輸出 stderr]:\n${stderr}`;
      }

      if (!fullOutput.trim()) {
        fullOutput = '（程式執行完畢，無任何 print 終端輸出）';
      }

      return {
        success: true,
        output: fullOutput,
        executionTime: `${duration} 秒`,
        error: null
      };
    } catch (err) {
      // 確保將 sys.stdout 復原
      try {
        await this.pyodideInstance.runPythonAsync(`_catcher.get_output()`);
      } catch (e) {}

      let errMsg = err.message || String(err);

      if (errMsg.includes('EXECUTION_TIMEOUT')) {
        return {
          success: false,
          output: '',
          error: `【執行逾時（超過 ${timeoutMs / 1000} 秒）】\n您的程式碼可能陷入了死迴圈（例如 while True 未設置中斷條件）。`
        };
      }

      // 初學者錯誤診斷
      const hint = this._explainError(errMsg);

      return {
        success: false,
        output: '',
        error: errMsg + (hint ? `\n\n💡【初學者除錯指引】：\n${hint}` : '')
      };
    }
  },

  /**
   * 針對常見的 Python 例外提供清晰的繁體中文引導
   */
  _explainError(errMsg) {
    if (errMsg.includes('IndexError: string index out of range')) {
      return '字串索引超出範圍！請檢查字串長度，記住長度為 N 的字串最大正索引是 N-1，或者檢查空字串存取。';
    }
    if (errMsg.includes("TypeError: 'str' object does not support item assignment")) {
      return '字串具有不可變性（Immutable），無法透過 s[0] = ... 直接修改！請改用切片組裝新字串。';
    }
    if (errMsg.includes('TypeError: can only concatenate str')) {
      return '無法將整數或其他型態直接與字串用「+」相加！請使用 f-string 或 str() 將變數轉型。';
    }
    if (errMsg.includes('ValueError: substring not found')) {
      return '使用 index() 找不到指定子字串！若無法確定是否存在，建議改用 find()（找不到會傳回 -1）或使用 "in" 運算子先判斷。';
    }
    if (errMsg.includes('SyntaxError: invalid syntax')) {
      return '語法錯誤！請檢查引號是否成對閉合、括號是否有對應、冒號「:」是否遺漏。';
    }
    if (errMsg.includes('IndentationError')) {
      return '縮排錯誤！Python 嚴格依賴縮排定義區塊，請確認 if/for/def 下方的程式碼是否有統一縮排 4 個空白鍵。';
    }
    return '';
  }
};

window.PyodideRunner = PyodideRunner;
