# Python 初學到進階 (Python Beginner to Advanced)

> 專為初學者打造的現代化 Python 字串處理互動教學平台，純前端靜態架構，支援零依賴部署至 GitHub Pages。

---

## 📖 專案簡介 (Project Overview)

本專案旨在協助沒有程式設計經驗的初學者與希望精進字串操作的中階學習者，從基礎語法、切片索引、字串方法、現代格式化，一路紮實掌握正規表示式與 5 大實戰工具。

全站採用 **純前端靜態單頁應用程式 (SPA)** 架構，整合 **WebAssembly (Pyodide)** 技術，讓使用者無需在本機安裝任何 Python 解譯器，即可在瀏覽器沙盒中即時執行標準 Python 3.12 程式碼！

---

## ✨ 核心特色 (Key Highlights)

1. **六大階段循序漸進課程**：
   - 階段一：字串基礎（定義、單雙引號、多行、len、索引、切片、不可變性、跳脫字元）
   - 階段二：字串基本操作（運算子、空白去除 strip 系列、大小寫轉換）
   - 階段三：字串搜尋與替換（find vs index 關鍵差異、startswith/endswith、split vs partition、replace vs join）
   - 階段四：字串格式化與資料處理（f-string、數值小數排版、型態轉換、Unicode 中文字元、enumerate 走訪統計）
   - 階段五：進階字串處理（maketrans/translate 快速對應、Unicode vs UTF-8 位元組本質辨析、正規表示式 re 基礎、字串效能陷阱 $O(N^2)$ 與最佳實踐）
   - 階段六：實戰專題工具（文字清理、文字統計、文字搜尋替換 Diff、資料格式整理、文字分析挑戰）
2. **免安裝 Python 實驗室**：按需延遲載入 Pyodide WebAssembly，提供安全隔離的即時執行沙盒、終端輸出攔截與初學者友善的除錯指引。
3. **七大題型互動測驗**：單選題、多選題、填空題、程式閱讀題、結果預測題、程式除錯題、程式撰寫題，具備即時判題、完整解說與常見錯誤分析。
4. **五大互動實戰工具**：包含文字清理、字元統計、Diff 高亮搜尋替換、Markdown/CSV 格式化與綜合文字分析報告。
5. **本地儲存與學習儀表板**：使用 `LocalStorage` 記錄課程完成狀態、答題正確率與成就榮譽榜，支援進度重設與 JSON 匯出備份。
6. **ASD-STE100 簡明技術寫作規範**：教學文字精煉、句構簡明直接，採用台灣常用繁體中文，清楚區分語法、範例與執行結果。

---

## 📂 專案目錄結構 (Directory Structure)

```
python-beginner-to-advanced/
├── index.html                   # 網站主單頁應用程式 (SPA) 入口
├── 404.html                     # GitHub Pages 路由容錯重新導向
├── README.md                    # 專案詳細說明與部署手冊
├── .gitignore                   # Git 版本控制忽略清單
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions Pages 自動化部署流程
├── css/
│   ├── style.css                # 設計系統、卡片、按鈕、響應式佈局
│   └── code-theme.css           # 程式碼區塊高亮、一鍵複製與終端樣式
├── js/
│   ├── app.js                   # SPA 路由分發器與頁面狀態管理器
│   ├── storage.js               # LocalStorage 進度儲存與重設管理
│   ├── pyodide-runner.js        # Pyodide 延遲載入、沙盒執行與錯誤分析
│   ├── curriculum-data.js       # 六個階段完整課程資料庫（繁體中文、範例、逐行解說）
│   ├── quiz-data.js             # 互動練習題庫（7 種題型、答案、解析）
│   ├── projects-data.js         # 五個實戰專題設定與互動執行引擎
│   └── components/
│       ├── navbar.js            # 導覽列與即時進度比例組件
│       ├── course-view.js       # 課程目錄與單元詳細教學視圖組件
│       ├── quiz-view.js         # 互動式測驗答題與解析視圖組件
│       ├── lab-view.js          # Python 程式碼實驗室視圖組件
│       ├── projects-view.js     # 五大實戰工具操作介面視圖組件
│       └── dashboard-view.js    # 學習儀表板與成就徽章視圖組件
└── tests/
    ├── verify_curriculum.py     # Python 測試：實際編譯執行驗證 24 個單元範例與輸出
    ├── verify_quizzes.py        # Python 測試：驗證題庫 18 道題目資料結構與答案邊界
    └── test_pages.js            # Node 測試：驗證靜態資源引用完整性與專案引擎
```

---

## 💻 本機預覽方式 (Local Preview)

由於本專案為純前端架構，可透過任何輕量 HTTP 伺服器啟動預覽：

### 方法一：使用 Python 內建 HTTP 伺服器（推薦）
```powershell
# 切換至專案目錄
cd C:\Users\USER\.gemini\antigravity\scratch\python-beginner-to-advanced

# 啟動本機伺服器
py -3 -m http.server 8080
```
開啟瀏覽器訪問：`http://localhost:8080/`

### 方法二：使用 Node.js npx serve
```powershell
npx serve . -p 8080
```

---

## 🧪 自動化測試執行方式 (Running Tests)

專案包含三組嚴謹的自動化測試，確保教材與程式碼品質無誤：

### 1. 教學範例程式碼真實驗證測試 (Python)
使用本機標準 Python 3 實際編譯執行每一單元的範例程式碼，確認語法正確且輸出與教材完全吻合：
```powershell
py -3 tests/verify_curriculum.py
```

### 2. 練習題庫結構與答案有效性測試 (Python)
檢查所有題目的題型、答案邊界、解析文字與防呆邏輯：
```powershell
py -3 tests/verify_quizzes.py
```

### 3. 靜態資源與專案引擎運算測試 (Node.js)
檢查 HTML 標籤、相對路徑正確性與五大專題演算法邏輯：
```powershell
node tests/test_pages.js
```

---

## 🚀 GitHub Pages 部署手冊 (Deployment Guide)

### 步驟 1：建立 GitHub Repository
1. 登入您的 GitHub 帳號。
2. 點擊右上角 **New repository**。
3. 設定 Repository 名稱（例如：`python-beginner-to-advanced`）。
4. 選擇 **Public**（公開），且**不要**勾選 Initialize with README（專案內已有）。
5. 點擊 **Create repository**。

### 步驟 2：將專案檔案推送至 GitHub
在專案本機目錄執行以下指令：
```powershell
cd C:\Users\USER\.gemini\antigravity\scratch\python-beginner-to-advanced

# 初始化 Git 版本控制
git init

# 加入所有檔案並提交初始版本
git add .
git commit -m "feat: 初版發布 Python 初學到進階教學網站"

# 設定主分支並關聯遠端倉庫（請替換 USERNAME 與 REPO_NAME）
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 推送至 GitHub
git push -u origin main
```

### 步驟 3：啟用 GitHub Pages 自動部署
1. 進入該 GitHub Repository 頁面，點選頂部 **Settings**。
2. 在左側側邊欄點選 **Pages**。
3. 在 **Build and deployment** 下方的 **Source**，請將預設的 `Deploy from a branch` 切換為 **`GitHub Actions`**。
4. 切換後，每當推送程式碼至 `main` 分支時，`.github/workflows/deploy.yml` 將會自動執行測試並部署至 GitHub Pages！

### 部署後網址說明
- **使用者型網站**（若 Repository 名稱為 `USERNAME.github.io`）：
  `https://USERNAME.github.io/`
- **專案型網站**（一般專案 Repository）：
  `https://USERNAME.github.io/REPO_NAME/`

> **安全保證**：全站所有內部連結與靜態資源引用皆採用相對路徑（`./css/...`, `./js/...`）及 Hash 路由（`#/course/...`），無論部署於哪一種網址型態皆可完美相容，不產生資源 404 錯誤。

---

## 🔒 資安與隱私權聲明 (Security & Privacy)

- **零機密金鑰**：前端程式碼不包含任何 API Key、Token 或機密憑證。
- **純本地儲存**：學習進度、測驗成績與專題狀態僅儲存在使用者的瀏覽器 `LocalStorage`，無外部資料收集。
- **WebAssembly 隔離**：Pyodide 執行環境在瀏覽器沙盒內運作，無權存取使用者的本機作業系統檔案系統。

---

## 📜 授權協議 (License)

本專案採用 [MIT License](LICENSE) 授權釋出。歡迎用於教學、自學與自由擴充。
