/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 靜態頁面、資源路徑與專案引擎自動化測試 (Static Assets & Engine Test)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('='.repeat(60));
console.log('開始執行靜態檔案、路徑完整性與專題引擎測試');
console.log('='.repeat(60));

// 1. 驗證核心檔案存在性
const requiredFiles = [
  'index.html',
  '404.html',
  'css/style.css',
  'css/code-theme.css',
  'js/storage.js',
  'js/curriculum-data.js',
  'js/quiz-data.js',
  'js/projects-data.js',
  'js/pyodide-runner.js',
  'js/components/navbar.js',
  'js/components/course-view.js',
  'js/components/quiz-view.js',
  'js/components/lab-view.js',
  'js/components/projects-view.js',
  'js/components/dashboard-view.js',
  'js/app.js'
];

requiredFiles.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  assert(fs.existsSync(fullPath), `檔案存在性檢查: ${relPath}`);
});

// 2. 驗證 index.html 資源引用完整性
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

assert(indexHtml.includes('id="navbar-container"'), 'index.html 包含導覽列容器 #navbar-container');
assert(indexHtml.includes('id="main-content"'), 'index.html 包含主視圖容器 #main-content');
assert(indexHtml.includes('./css/style.css'), 'style.css 採用 GitHub Pages 安全之相對路徑 ./');
assert(indexHtml.includes('./css/code-theme.css'), 'code-theme.css 採用相對路徑 ./');

// 檢查所有內部 script src 是否皆存在
const scriptRegex = /<script\s+src="(\.\/js\/[^"]+)"/g;
let match;
let scriptCount = 0;
while ((match = scriptRegex.exec(indexHtml)) !== null) {
  scriptCount++;
  const src = match[1];
  const localFile = path.join(rootDir, src.replace('./', ''));
  assert(fs.existsSync(localFile), `HTML 內部引用之 Script 實體檔案存在: ${src}`);
}
assert(scriptCount >= 10, `至少引入 10 個核心模組 (目前: ${scriptCount})`);

// 3. 測試專題工具引擎純 JavaScript 運算邏輯
global.window = {};
require(path.join(rootDir, 'js/projects-data.js'));
const projects = window.PROJECTS_DATA;

assert(Array.isArray(projects) && projects.length === 5, '5 大實戰專題工具均已載入');

// 測試專題一：文字清理
const p1 = projects.find(p => p.id === 'p1');
const p1Res = p1.execute('   Hello World   \n\n   Python   ', { trim_lines: true, remove_blank_lines: true, case_mode: 'upper' });
assert(p1Res.output === 'HELLO WORLD\nPYTHON', '專題一 (Text Cleaner) 清理空白與大寫轉換正確');

// 測試專題二：文字統計
const p2 = projects.find(p => p.id === 'p2');
const p2Res = p2.execute('Python 學習', { query_char: 'Python' });
assert(p2Res.output.includes('總字元數（含空白換行）：9'), '專題二 (Text Statistics) 字元計算正確');

// 測試專題三：搜尋替換
const p3 = projects.find(p => p.id === 'p3');
const p3Res = p3.execute('cat and CAT', { search_str: 'cat', replace_str: 'dog', ignore_case: true });
assert(p3Res.output === 'dog and dog', '專題三 (Search & Replace) 忽略大小寫替換正確');

// 測試專題四：資料格式整理
const p4 = projects.find(p => p.id === 'p4');
const p4Res = p4.execute('A, B\n1, 2', { in_delimiter: ',', out_format: 'markdown' });
assert(p4Res.output.includes('| A | B |') && p4Res.output.includes('| --- | --- |'), '專題四 (Data Formatter) Markdown 表格生成正確');

// 測試專題五：綜合分析
const p5 = projects.find(p => p.id === 'p5');
const p5Res = p5.execute('2026-10-31 發表於 test@example.com。', { clean_first: true });
assert(p5Res.output.includes('2026-10-31') && p5Res.output.includes('test@example.com'), '專題五 (Text Analysis) 日期與信箱正則偵測正確');

console.log('='.repeat(60));
console.log(`測試統計：通過 ${passed} 項，失敗 ${failed} 項。`);
console.log('='.repeat(60));

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 靜態資源、路徑與前端專題引擎全數驗證通過！');
  process.exit(0);
}
