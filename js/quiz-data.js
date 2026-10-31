/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 互動練習題庫 (Interactive Quiz Database)
 *
 * 包含 7 大題型：
 * 1. single: 單選題
 * 2. multiple: 多選題
 * 3. fill: 填空題
 * 4. reading: 程式碼閱讀題
 * 5. prediction: 執行結果預測題
 * 6. debugging: 程式除錯題
 * 7. coding: 程式碼撰寫/重組題
 */

const QUIZ_DATA = [
  // -------------------------------------------------------------
  // 階段一：字串基礎
  // -------------------------------------------------------------
  {
    id: "q1-1",
    stageId: 1,
    type: "single",
    title: "字串不可變性觀念",
    difficulty: "基礎",
    prompt: "在 Python 中執行以下程式碼，會發生什麼結果？",
    code: `s = "python"
s[0] = "P"`,
    options: [
      "s 變為 \"Python\"",
      "拋出 TypeError 例外，因為字串為不可變物件",
      "拋出 IndexError 例外",
      "s 變為 [\"P\", \"y\", \"t\", \"h\", \"o\", \"n\"]"
    ],
    answer: 1,
    explanation: "Python 的字串是不可變物件（Immutable），不支援透過索引直接賦值修改字元。嘗試直接修改會引發 TypeError: 'str' object does not support item assignment。",
    commonMistakeAnalysis: "初學者常將 Python 字串誤認為可變清單（List）。若要修改字串，應使用切片組合新字串，如 `s = 'P' + s[1:]`。"
  },
  {
    id: "q1-2",
    stageId: 1,
    type: "prediction",
    title: "負索引與長度預測",
    difficulty: "入門",
    prompt: "請問以下程式碼的執行輸出為何？",
    code: `msg = "AI時代"
print(len(msg), msg[-1])`,
    options: [
      "4 代",
      "6 代",
      "4 時",
      "8 代"
    ],
    answer: 0,
    explanation: "Python 3 中 len() 計算的是 Unicode 字元個數，「AI時代」由 2 個英文與 2 個中文組成，len 為 4。負向索引 -1 指向最末尾的字元，即「代」。",
    commonMistakeAnalysis: "容易誤將位元組數（如 UTF-8 8 位元組）混淆為字元長度，在 Python 3 中 len('中') 恆為 1。"
  },
  {
    id: "q1-3",
    stageId: 1,
    type: "reading",
    title: "切片語法 [start:stop:step]",
    difficulty: "基礎",
    prompt: "閱讀以下切片程式碼，請問 output 的值為何？",
    code: `alphabet = "ABCDEFGHIJ"
output = alphabet[1:6:2]`,
    options: [
      "\"BDF\"",
      "\"ACE\"",
      "\"BCDEF\"",
      "\"BDFH\""
    ],
    answer: 0,
    explanation: "切片範圍為索引 1 到 5（stop=6 不包含），對應字元為 'B', 'C', 'D', 'E', 'F'。步贅 step=2，因此每 2 個取一個，依序取出索引 1('B')、3('D')、5('F')，組合為 'BDF'。",
    commonMistakeAnalysis: "常忘記 stop 邊界是「不包含」（右開區間），或誤算索引 1 對應的字元。"
  },
  {
    id: "q1-4",
    stageId: 1,
    type: "fill",
    title: "字串倒序翻轉填空",
    difficulty: "入門",
    prompt: "若要利用切片將字串 `word` 進行前後反轉倒序，請在切片中填入適當的語法（例如 [::-1] 中的三個字元）：",
    code: `word = "Python"
reversed_word = word[ ___ ]`,
    answer: "::-1",
    explanation: "當省略 start 與 stop 並將 step 設為 -1 時（即 `[::-1]`），Python 會由後往前逐一取出字元，達成字串倒序反轉。",
    commonMistakeAnalysis: "容易漏打冒號寫成 `[-1]`，那樣只會取出最後一個字元；切片必須有兩個冒號表示省略前後邊界。"
  },
  {
    id: "q1-5",
    stageId: 1,
    type: "debugging",
    title: "原生字串除錯",
    difficulty: "基礎",
    prompt: "以下路徑字串因為跳脫字元導致顯示錯誤（\\t 被當成 Tab 縮排，\\n 被當成換行），請選出最佳修正方式：",
    code: `path = "C:\\tools\\new_data\\file.txt"`,
    options: [
      "在引號前加上 r，改為原生字串：r\"C:\\tools\\new_data\\file.txt\"",
      "將引號改為單引號：'C:\\tools\\new_data\\file.txt'",
      "將所有單引號改為三引號：\"\"\"C:\\tools\\new_data\\file.txt\"\"\"",
      "使用 path.replace('\\t', 't')"
    ],
    answer: 0,
    explanation: "在字串前加上字母 `r`（Raw String）會指示 Python 不將反斜線解析為跳脫字元，是處理 Windows 檔案路徑與正規表示式的業界最佳實務。",
    commonMistakeAnalysis: "單引號或三引號依然會解析跳脫字元 \\t 與 \\n，只有加上 `r` 前綴才能徹底停用轉譯。"
  },

  // -------------------------------------------------------------
  // 階段二：字串基本操作
  // -------------------------------------------------------------
  {
    id: "q2-1",
    stageId: 2,
    type: "multiple",
    title: "字串大小寫轉換方法辨析",
    difficulty: "基礎",
    prompt: "關於字串的大小寫轉換方法，哪些敘述是正確的？（請選出所有正確選項）",
    code: `s = "hello WORLD"`,
    options: [
      "s.capitalize() 的結果為 'Hello world'",
      "s.title() 會將每個單字首字母轉大寫，結果為 'Hello World'",
      "s.upper() 會直接原地修改變數 s 的內部值",
      "s.swapcase() 的結果為 'HELLO world'"
    ],
    answer: [0, 1, 3],
    explanation: "選項 A 正確（只有首字大寫，其餘皆轉小寫）；選項 B 正確（每個單字首字母大寫）；選項 D 正確（大小寫互換）；選項 C 錯誤，字串不可變，所有方法皆回傳全新字串，不會修改原字串。",
    commonMistakeAnalysis: "常有學員誤以為呼叫 `s.upper()` 後變數 s 本身就會變成大寫，忽略了字串不可變性與指派的重要性。"
  },
  {
    id: "q2-2",
    stageId: 2,
    type: "prediction",
    title: "strip() 自訂字元行為預測",
    difficulty: "中階",
    prompt: "請問以下程式碼執行的輸出為何？",
    code: `text = "xx..Hello World..yy"
print(text.strip("xy."))`,
    options: [
      "\"Hello World\"",
      "\"..Hello World..\"",
      "\"xx..Hello World\"",
      "拋出 ValueError"
    ],
    answer: 0,
    explanation: "strip(\"xy.\") 傳入的是「待移除字元集」。Python 會從字串左右兩端向內剝除，只要字元是 'x', 'y' 或 '.' 就會持續移除，直到遇到第一個不是該集合的字元 'H' 與 'd' 為止，因此留下 'Hello World'。",
    commonMistakeAnalysis: "誤以為 strip 傳入的是固定連續單詞，其實是將所有字元當作可移除的候選集合。"
  },
  {
    id: "q2-3",
    stageId: 2,
    type: "debugging",
    title: "型態相加錯誤除錯",
    difficulty: "入門",
    prompt: "以下程式碼執行時引發 `TypeError: can only concatenate str (not 'int') to str`，哪一種修改方式最符合 Pythonic 寫法？",
    code: `count = 10
msg = "數量：" + count`,
    options: [
      "改用 f-string：msg = f\"數量：{count}\"",
      "改為 msg = \"數量：\" + [count]",
      "改為 msg = count + \"數量：\"",
      "改為 msg = \"數量：\" * count"
    ],
    answer: 0,
    explanation: "Python 不支援字串與整數直接用 + 相加。使用現代 f-string `f\"數量：{count}\"` 最具備可讀性且效能優異，也可使用 `str(count)` 轉型後相加。",
    commonMistakeAnalysis: "其他程式語言（如 JavaScript 或 Java）支援自動轉型相加，但 Python 是強型態語言，不允許隱式型態強制轉換。"
  },

  // -------------------------------------------------------------
  // 階段三：字串搜尋與替換
  // -------------------------------------------------------------
  {
    id: "q3-1",
    stageId: 3,
    type: "single",
    title: "find() 與 index() 的核心差異",
    difficulty: "中階",
    prompt: "當在字串中搜尋一個「不存在」的子字串時，find() 與 index() 的行為差異是什麼？",
    code: `s = "Python"
# s.find("Java")
# s.index("Java")`,
    options: [
      "find() 回傳 -1，index() 拋出 ValueError 例外",
      "find() 拋出 KeyError，index() 回傳 0",
      "兩者皆回傳 None",
      "find() 拋出 IndexError，index() 回傳 -1"
    ],
    answer: 0,
    explanation: "這是 Python 經典設計：find() 找不到時傳回 -1（安全回傳值）；而 index() 找不到時拋出 ValueError（強制例外處理）。",
    commonMistakeAnalysis: "很多初學者直接使用 index() 卻未包裹 try-except，導致在無預期的使用者輸入下程式崩潰。"
  },
  {
    id: "q3-2",
    stageId: 3,
    type: "prediction",
    title: "partition() 三元組回傳預測",
    difficulty: "中階",
    prompt: "請問以下程式碼輸出的 tuple 內容為何？",
    code: `entry = "user_name=alice"
result = entry.partition("=")`,
    options: [
      "('user_name', '=', 'alice')",
      "['user_name', 'alice']",
      "('user_name', 'alice')",
      "('alice', '=', 'user_name')"
    ],
    answer: 0,
    explanation: "partition(sep) 永遠回傳長度為 3 的 tuple：(分隔符前, 分隔符本身, 分隔符後)。因此結果為 ('user_name', '=', 'alice')。",
    commonMistakeAnalysis: "容易將 partition() 與 split() 混淆。split('=', 1) 回傳的是兩元素的 list `['user_name', 'alice']`，不保留分隔符。"
  },
  {
    id: "q3-3",
    stageId: 3,
    type: "single",
    title: "startswith 多條件檢查",
    difficulty: "中階",
    prompt: "若要同時檢查網址是否以 'http://' 或 'https://' 開頭，正確的傳入型態為何？",
    code: `url = "https://www.python.org"
# 正確寫法：`,
    options: [
      "url.startswith((\"http://\", \"https://\"))  # 元組 Tuple",
      "url.startswith([\"http://\", \"https://\"])  # 清單 List",
      "url.startswith(\"http://\", \"https://\")    # 兩個引數",
      "url.startswith({\"http://\", \"https://\"})  # 集合 Set"
    ],
    answer: 0,
    explanation: "startswith() 與 endswith() 支援多條件檢查，但 Python 嚴格限制多條件必須包裝在元組（Tuple，圓括號）中傳入，傳入 List 會引發 TypeError。",
    commonMistakeAnalysis: "最常見錯誤是隨手使用中括號 List，引發 TypeError: tuple for startswith must only contain str, not list。"
  },
  {
    id: "q3-4",
    stageId: 3,
    type: "coding",
    title: "使用 join 組合字串",
    difficulty: "中階",
    prompt: "請選出能將清單 `tags = ['ai', 'python', 'nlp']` 串接為 `'ai#python#nlp'` 的正確程式碼：",
    code: `tags = ['ai', 'python', 'nlp']`,
    options: [
      "'#'.join(tags)",
      "tags.join('#')",
      "join('#', tags)",
      "'#'.concat(tags)"
    ],
    answer: 0,
    explanation: "Python 的 join 方法是由「分隔符號字串」來呼叫，語法為 `\"分隔符\".join(可迭代對象)`，因此 `'#'.join(tags)` 是唯一正確寫法。",
    commonMistakeAnalysis: "受其他語言影響，初學者常直覺寫成 `tags.join('#')`，但 Python 的 List 並沒有 join 方法。"
  },

  // -------------------------------------------------------------
  // 階段四：字串格式化與資料處理
  // -------------------------------------------------------------
  {
    id: "q4-1",
    stageId: 4,
    type: "prediction",
    title: "f-string 格式化數值預測",
    difficulty: "中階",
    prompt: "請問以下程式碼的輸出結果為何？",
    code: `rate = 0.856
code = 7
print(f"{rate:.1%} - {code:0>3}")`,
    options: [
      "85.6% - 007",
      "85.6% - 700",
      "0.9% - 007",
      "86% - 07"
    ],
    answer: 0,
    explanation: "{rate:.1%} 會自動將數值乘以 100 並保留 1 位小數加上百分比符號（85.6%）；{code:0>3} 表示寬度 3，靠右對齊且以 0 填充，輸出 007。",
    commonMistakeAnalysis: "混淆了對齊符號：`>` 是靠右對齊（向右指），`<` 是靠左對齊。"
  },
  {
    id: "q4-2",
    stageId: 4,
    type: "reading",
    title: "splitlines() 相容性解析",
    difficulty: "中階",
    prompt: "以下文字混合了 Linux(\\n) 與 Windows(\\r\\n) 換行，呼叫 splitlines() 後產生的清單長度為何？",
    code: `data = "第一行\\r\\n第二行\\n第三行"
result = data.splitlines()`,
    options: [
      "3",
      "4",
      "2",
      "拋出 ValueError"
    ],
    answer: 0,
    explanation: "splitlines() 具備強大跨平台相容性，能正確識別 \\r\\n、\\n 與 \\r，將此字串分割為恰好 3 行，且自動去除尾端換行字元。",
    commonMistakeAnalysis: "若用手動 `data.split('\\n')`，第一行結尾會殘留 '\\r'，導致後續比對出錯。"
  },
  {
    id: "q4-3",
    stageId: 4,
    type: "debugging",
    title: "字串轉整數異常處理",
    difficulty: "基礎",
    prompt: "以下程式碼執行時會因為輸入帶有小數點而崩潰：`int('19.9') -> ValueError`。請問應如何正確將其轉為整數 19？",
    code: `raw_val = "19.9"
# 錯誤寫法：int(raw_val)`,
    options: [
      "先轉 float 再轉 int：int(float(raw_val))",
      "直接使用 int(raw_val, 10)",
      "使用 raw_val.to_int()",
      "使用 str(int(raw_val))"
    ],
    answer: 0,
    explanation: "int() 函式要求字串必須是純整數格式；若字串帶有小數點，必須先以 float() 解析為浮點數，再傳入 int() 進行無條件捨去取整。",
    commonMistakeAnalysis: "初學者常以為 int('19.9') 會自動四捨五入或截斷，但在 Python 中會直接引發 ValueError。"
  },

  // -------------------------------------------------------------
  // 階段五：進階字串處理
  // -------------------------------------------------------------
  {
    id: "q5-1",
    stageId: 5,
    type: "single",
    title: "字串索引 vs UTF-8 位元組位置",
    difficulty: "進階",
    prompt: "給定繁體中文字串 `s = \"程式\"`，以下哪一項敘述是正確的？",
    code: `s = "程式"`,
    options: [
      "s 的長度 len(s) 為 2，而其 UTF-8 位元組 len(s.encode('utf-8')) 為 6",
      "s[1] 代表第二個 UTF-8 位元組",
      "字串索引 s[0] 只能取出半個中文字",
      "Python 3 字串在記憶體中永遠以 ASCII 編碼儲存"
    ],
    answer: 0,
    explanation: "Python 3 字串是 Unicode 字元序列，len(s) 為 2；在 UTF-8 編碼中常用漢字每個佔 3 位元組，因此 2 個中文字佔 6 位元組。字串索引是基於字元（Unicode Code Point），絕非位元組位置！",
    commonMistakeAnalysis: "不可將字串索引操作與底層二進位位元組切片混為一談，字串索引永遠能取得完整中文字元。"
  },
  {
    id: "q5-2",
    stageId: 5,
    type: "prediction",
    title: "re.sub 正則替換預測",
    difficulty: "進階",
    prompt: "請問以下正規表示式執行後輸出為何？",
    code: `import re
text = "蘋果100元，香蕉50元"
cleaned = re.sub(r"\\d+", "X", text)
print(cleaned)`,
    options: [
      "蘋果X元，香蕉X元",
      "蘋果XXX元，香蕉XX元",
      "蘋果100元，香蕉50元",
      "蘋果X元"
    ],
    answer: 0,
    explanation: "\\d 代表數字，+ 代表一個或多個連續符合。因此 '100' 與 '50' 分別被整塊替換為單一 'X'，輸出「蘋果X元，香蕉X元」。",
    commonMistakeAnalysis: "若 pattern 寫為 `\\d`（沒有加號），則每個數字會被個別換成 X，變成「蘋果XXX元，香蕉XX元」。加號 + 具備貪婪合併連續字元的效果。"
  },
  {
    id: "q5-3",
    stageId: 5,
    type: "single",
    title: "字串串接效能考量",
    difficulty: "進階",
    prompt: "在迴圈中需要將 10 萬個字串片段組合成一個大字串，哪一種做法的時間複雜度最低且效能最佳？",
    code: `# 選項 A: s = ""; for x in items: s += x
# 選項 B: "".join(items)`,
    options: [
      "使用 \"\".join(items)，時間複雜度為 O(N)",
      "使用 += 運算子在迴圈中逐一累加，時間複雜度為 O(1)",
      "使用 s = s.replace('', x)",
      "兩者在 Python 3 中效能完全沒有差異"
    ],
    answer: 0,
    explanation: "因為字串不可變，迴圈中使用 += 會反覆配置新記憶體並複製舊字串，導致 O(N^2) 的可怕代價；而 join() 能預先計算總長度並進行單次記憶體配置，達到線性 O(N) 效能。",
    commonMistakeAnalysis: "少量資料時 += 看不出差異，但在大量日誌處理或爬蟲資料整合時，+= 會造成程式嚴重卡死。"
  }
];

window.QUIZ_DATA = QUIZ_DATA;
