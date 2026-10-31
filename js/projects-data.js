/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 五大實戰專題工具設定與實作引擎 (Projects Data & Engine)
 */

const PROJECTS_DATA = [
  // -------------------------------------------------------------
  // 專題一：文字清理工具
  // -------------------------------------------------------------
  {
    id: "p1",
    title: "專題一：文字清理工具（Text Cleaner）",
    enTitle: "Text Cleaner Tool",
    description: "清除文字中每一行前後的多餘空白、移除空白行、統一大小寫並統計清理前後的長度變化。",
    defaultInput: `   Python 字串處理實戰   

   第一行：基礎語法     
   第二行：方法應用   
   
   第三行：專題實作   `,
    options: [
      { id: "trim_lines", label: "清除每行前後空白 (strip)", type: "checkbox", default: true },
      { id: "remove_blank_lines", label: "移除多餘空行", type: "checkbox", default: true },
      {
        id: "case_mode",
        label: "大小寫轉換",
        type: "select",
        options: [
          { value: "none", text: "保持原樣" },
          { value: "upper", text: "轉為全大寫 (upper)" },
          { value: "lower", text: "轉為全小寫 (lower)" },
          { value: "title", text: "轉為標題格式 (title)" }
        ],
        default: "none"
      }
    ],
    execute: function(input, opts) {
      const originalLen = input.length;
      let lines = input.split(/\r?\n/);

      if (opts.trim_lines) {
        lines = lines.map(l => l.trim());
      }

      if (opts.remove_blank_lines) {
        lines = lines.filter(l => l.length > 0);
      }

      let result = lines.join("\n");

      if (opts.case_mode === "upper") {
        result = result.toUpperCase();
      } else if (opts.case_mode === "lower") {
        result = result.toLowerCase();
      } else if (opts.case_mode === "title") {
        result = result.replace(/\b\w/g, c => c.toUpperCase());
      }

      const newLen = result.length;
      const savedChars = originalLen - newLen;

      return {
        output: result,
        meta: `原始字元數：${originalLen} ｜ 清理後字元數：${newLen} ｜ 減少冗餘：${savedChars} 字元`
      };
    }
  },

  // -------------------------------------------------------------
  // 專題二：文字統計工具
  // -------------------------------------------------------------
  {
    id: "p2",
    title: "專題二：文字統計工具（Text Statistics）",
    enTitle: "Text Statistics Tool",
    description: "精確計算字元數（含/不含空白）、單字數、行數、特定字元出現次數與高頻字元統計，分析中英文與標點影響。",
    defaultInput: `Python 是一門優雅的程式語言！
它廣泛應用於人工智慧（AI）、資料科學與網路爬蟲。
Python is versatile, clean, and powerful.`,
    options: [
      { id: "query_char", label: "搜尋指定字元出現次數", type: "text", default: "Python", placeholder: "輸入欲查詢字詞" }
    ],
    execute: function(input, opts) {
      const totalChars = input.length;
      const noSpaceChars = input.replace(/\s/g, "").length;
      const lines = input ? input.split(/\r?\n/).length : 0;
      
      // 單字數（以空白分隔）
      const words = input.trim() ? input.trim().split(/\s+/).length : 0;

      // 查詢字元/字詞
      const query = opts.query_char || "";
      let queryCount = 0;
      if (query) {
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
        const matches = input.match(regex);
        queryCount = matches ? matches.length : 0;
      }

      // 非空白字元頻率統計（前 5 名）
      const freq = {};
      for (const ch of input) {
        if (!/\s/.test(ch)) {
          freq[ch] = (freq[ch] || 0) + 1;
        }
      }

      const sortedFreq = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([c, count]) => `'${c}': ${count} 次`)
        .join("， ");

      const report = `【文字統計分析報表】
--------------------------------------------------
- 總字元數（含空白換行）：${totalChars}
- 純字元數（不含任何空白）：${noSpaceChars}
- 總行數：${lines}
- 單字數（依空白切割）：${words}
- 查詢「${query}」出現次數：${queryCount} 次
- 出現頻率最高的前 5 個非空白字元：
  ${sortedFreq || "無資料"}
--------------------------------------------------
備註：在繁體中文文章中，字詞間通常無空格，因此「純字元數」最符合中文字數標準；「單字數」則主要衡量英文字詞。`;

      return {
        output: report,
        meta: `分析完成：共掃描 ${totalChars} 字元`
      };
    }
  },

  // -------------------------------------------------------------
  // 專題三：文字搜尋與替換工具
  // -------------------------------------------------------------
  {
    id: "p3",
    title: "專題三：文字搜尋與替換工具（Search & Replace Diff）",
    enTitle: "Search & Replace Diff Tool",
    description: "尋找指定內容並執行替換，提供區分大小寫選項，並以紅綠高亮直觀呈現處理前後的對比差異（Diff）。",
    defaultInput: `Python 2 已經在 2020 年正式停止維護支援。
現今所有主流函式庫皆全面擁抱 Python 3。
若您還在學習舊版，請盡速升級至 Python 3！`,
    options: [
      { id: "search_str", label: "搜尋文字", type: "text", default: "Python", placeholder: "要尋找的文字" },
      { id: "replace_str", label: "替換為", type: "text", default: "Modern Python", placeholder: "新文字" },
      { id: "ignore_case", label: "忽略大小寫 (Ignore Case)", type: "checkbox", default: false }
    ],
    execute: function(input, opts) {
      const search = opts.search_str || "";
      const replace = opts.replace_str || "";
      const ignoreCase = opts.ignore_case;

      if (!search) {
        return {
          output: input,
          meta: "請輸入搜尋關鍵字",
          diffHtml: input
        };
      }

      const flags = ignoreCase ? "gi" : "g";
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, flags);

      let count = 0;
      const replacedText = input.replace(regex, (match) => {
        count++;
        return replace;
      });

      // 產生高亮 Diff HTML（安全轉義）
      function escapeHtml(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      let diffHtml = escapeHtml(input);
      const diffRegex = new RegExp(escaped, flags);
      diffHtml = diffHtml.replace(diffRegex, (match) => {
        return `<span class="diff-del">${escapeHtml(match)}</span><span class="diff-add">${escapeHtml(replace)}</span>`;
      });

      return {
        output: replacedText,
        meta: `成功找到並替換了 ${count} 處符合項目`,
        diffHtml: diffHtml
      };
    }
  },

  // -------------------------------------------------------------
  // 專題四：資料格式整理工具
  // -------------------------------------------------------------
  {
    id: "p4",
    title: "專題四：資料格式整理工具（Data Formatter）",
    enTitle: "Delimiter & Data Formatter",
    description: "整理以逗號、Tab 或其他符號分隔的雜亂資料，去除欄位多餘空白，並轉換為 Markdown 表格、標準 CSV 或 JSON 格式。",
    defaultInput: `姓名 ,   年齡 ,   職業   ,  居住城市  
王小明 , 28 , 軟體工程師 , 台北市
陳美麗 , 32 , 產品經理   , 新竹市
李大同 , 24 , 資料分析師 , 台中市`,
    options: [
      { id: "in_delimiter", label: "輸入分隔符", type: "text", default: ",", placeholder: "例如 , 或 \\t" },
      {
        id: "out_format",
        label: "輸出格式",
        type: "select",
        options: [
          { value: "markdown", text: "Markdown 語法表格" },
          { value: "csv", text: "標準 CSV 格式" },
          { value: "json", text: "JSON 陣列物件" }
        ],
        default: "markdown"
      }
    ],
    execute: function(input, opts) {
      let sep = opts.in_delimiter;
      if (sep === "\\t") sep = "\t";
      if (!sep) sep = ",";

      const lines = input.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length === 0) {
        return { output: "", meta: "無輸入資料" };
      }

      const rows = lines.map(line => line.split(sep).map(c => c.trim()));
      const outFormat = opts.out_format;

      if (outFormat === "csv") {
        const csvText = rows.map(r => r.join(", ")).join("\n");
        return { output: csvText, meta: `成功整理 ${rows.length} 筆資料為標準 CSV` };
      } else if (outFormat === "json") {
        const headers = rows[0];
        const dataRows = rows.slice(1);
        const jsonArr = dataRows.map(row => {
          const obj = {};
          headers.forEach((h, idx) => {
            obj[h || `col_${idx}`] = row[idx] || "";
          });
          return obj;
        });
        return { output: JSON.stringify(jsonArr, null, 2), meta: `成功轉為 JSON 陣列（${dataRows.length} 筆紀錄）` };
      } else {
        // Markdown table
        const headers = rows[0];
        const colCount = headers.length;
        const separator = Array(colCount).fill("---");
        
        let md = `| ${headers.join(" | ")} |\n| ${separator.join(" | ")} |\n`;
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          while (row.length < colCount) row.push("");
          md += `| ${row.slice(0, colCount).join(" | ")} |\n`;
        }
        return { output: md.trim(), meta: `成功產出包含 ${rows.length - 1} 筆紀錄的 Markdown 表格` };
      }
    }
  },

  // -------------------------------------------------------------
  // 專題五：文字分析挑戰
  // -------------------------------------------------------------
  {
    id: "p5",
    title: "專題五：文字分析挑戰（Text Analysis Suite）",
    enTitle: "Text Analysis Challenge",
    description: "綜合字串處理分析工具：結合多行解析、詞頻統計、正則表達式偵測（日期、信箱、手機）與詞彙多樣度（TTR）報表產出。",
    defaultInput: `Antigravity 專案於 2026-10-31 盛大發表！
這是一篇繁體中文技術驗證報告，旨在評估 Python 字串處理系統的教學效益。
系統核心具備高效能的文字清理、格式化與正則表達式功能。
如對課程內容有任何建議，請隨時寄信至 service@example.com 或致電 0912-345678。
祝各位學員在 Python 程式設計之路上收穫滿滿！`,
    options: [
      { id: "clean_first", label: "分析前先執行自動去冗餘清理", type: "checkbox", default: true }
    ],
    execute: function(input, opts) {
      let text = input;
      if (opts.clean_first) {
        text = text.split(/\r?\n/).map(l => l.trim()).filter(l => l).join("\n");
      }

      // 1. 段落與句子
      const paragraphs = text.split(/\r?\n/).filter(p => p.trim());
      const sentences = text.split(/[。！？!?\n]/).filter(s => s.trim());

      // 2. 單字與字詞
      const words = (text.match(/[\w\u4e00-\u9fa5]+/g) || []).map(w => w.toLowerCase());
      const totalWords = words.length;
      const uniqueWords = new Set(words);
      const ttr = totalWords > 0 ? ((uniqueWords.size / totalWords) * 100).toFixed(1) : 0;

      // 3. 實體偵測 (Regex)
      const dates = text.match(/\d{4}-\d{2}-\d{2}/g) || [];
      const emails = text.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/g) || [];
      const mobiles = text.match(/09\d{2}-?\d{6}/g) || [];

      // 4. 產生摘要報告
      const report = `=====================================================
         📊 Python 文字多維度分析報告 (Text Summary)
=====================================================
【架構度量】
- 段落總數        ：${paragraphs.length} 段
- 句子總數        ：${sentences.length} 句
- 詞彙總數        ：${totalWords} 個
- 相異詞彙數      ：${uniqueWords.size} 個
- 詞彙豐富度 (TTR)：${ttr}%

【關鍵實體偵測】
- 日期格式 (YYYY-MM-DD)：${dates.join(", ") || "未偵測到"}
- 電子郵件 (Email)      ：${emails.join(", ") || "未偵測到"}
- 台灣手機 (Mobile)     ：${mobiles.join(", ") || "未偵測到"}

【健康評估】
- ${sentences.length > 0 ? "文章結構完整，包含良好標點分隔。" : "注意：未偵測到標準標點符號。"}
- ${ttr > 70 ? "詞彙多樣度豐富，重複用詞率低。" : "詞彙重複率偏高，建議增加詞彙變異性。"}
=====================================================`;

      return {
        output: report,
        meta: `分析完成：偵測到 ${paragraphs.length} 段落、${sentences.length} 句子與 ${dates.length + emails.length + mobiles.length} 處實體`
      };
    }
  }
];

window.PROJECTS_DATA = PROJECTS_DATA;
