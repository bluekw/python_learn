/**
 * Python 初學到進階 (Python Beginner to Advanced)
 * 六大階段完整課程資料庫 (Curriculum Database)
 *
 * 設計原則：
 * 1. 繁體中文（台灣習慣用語）：程式碼、變數、字串、切片、函式、引數、傳回值。
 * 2. 遵循 ASD-STE100 簡明技術寫作核心概念：文字直接、結構統一、步驟具體。
 * 3. 範例程式碼皆符合標準 Python 3 語法，輸出結果保證可精確驗證。
 */

const CURRICULUM_DATA = {
  stages: [
    {
      id: 1,
      title: "第一階段：字串基礎",
      enTitle: "Stage 1: String Basics",
      description: "建立 Python 字串核心概念，掌握單雙引號、多行文字、索引、切片與不可變特性。",
      badgeClass: "stage-1",
      lessonIds: ["1-1", "1-2", "1-3", "1-4"]
    },
    {
      id: 2,
      title: "第二階段：字串基本操作",
      enTitle: "Stage 2: Basic Operations",
      description: "學習字串運算子、空白去除與大小寫轉換方法，掌握文字正規化基礎。",
      badgeClass: "stage-2",
      lessonIds: ["2-1", "2-2", "2-3"]
    },
    {
      id: 3,
      title: "第三階段：字串搜尋與替換",
      enTitle: "Stage 3: Search, Replace & Split",
      description: "深入辨析 find 與 index、split 與 partition 的實務差異，高效拆解與組合文字。",
      badgeClass: "stage-3",
      lessonIds: ["3-1", "3-2", "3-3", "3-4"]
    },
    {
      id: 4,
      title: "第四階段：字串格式化與資料處理",
      enTitle: "Stage 4: Formatting & Data Processing",
      description: "掌握現代 f-string、數字小數對齊、型態轉換、中文字元處理與 enumerate 走訪。",
      badgeClass: "stage-4",
      lessonIds: ["4-1", "4-2", "4-3", "4-4"]
    },
    {
      id: 5,
      title: "第五階段：進階字串處理",
      enTitle: "Stage 5: Advanced String Manipulation",
      description: "理解 translate 字典對應、Unicode 與 UTF-8 編碼差異、正規表示式 re 與效能優化。",
      badgeClass: "stage-5",
      lessonIds: ["5-1", "5-2", "5-3", "5-4"]
    },
    {
      id: 6,
      title: "第六階段：實戰專題工具",
      enTitle: "Stage 6: Real-World Projects",
      description: "結合理論與實務，提供 5 大互動式文字處理工具，提升解決真實問題能力。",
      badgeClass: "stage-6",
      lessonIds: ["6-1", "6-2", "6-3", "6-4", "6-5"]
    }
  ],

  lessons: {
    // -------------------------------------------------------------------------
    // 階段一：字串基礎
    // -------------------------------------------------------------------------
    "1-1": {
      id: "1-1",
      stageId: 1,
      title: "1.1 什麼是字串（String）",
      enTitle: "What is a String",
      difficulty: "入門",
      estTime: "10 分鐘",
      objectives: [
        "理解字串（str）的定義與資料型態",
        "掌握單引號、雙引號與三引號的適用場合",
        "學會使用跳脫字元（Escape Characters）與原生字串（Raw Strings）"
      ],
      syntax: `text_1 = '單引號字串'
text_2 = "雙引號字串"
multiline = '''三引號多行字串'''
raw_str = r"C:\\new_folder\\test"`,
      description: `在 Python 中，字串（String，簡記為 str）是用來表示文字資料的循序序列。字串必須被成對的引號包圍。

1. **單引號與雙引號**：Python 對單引號（'）與雙引號（"）一視同仁。當字串內容包含單引號時，外層使用雙引號可避免語法衝突；反之亦然。
2. **三引號多行字串**：使用三個單引號（'''）或三個雙引號（"""）可以建立跨行字串，常作為函式的文件註解（Docstring）或長篇段落。
3. **跳脫字元（Escape Character）**：以反斜線（\\）開頭，例如 \\n 代表換行、\\t 代表 Tab 縮排、\\\\ 代表單一反斜線。
4. **原生字串（Raw String）**：在字串引號前加上 r 前綴（例如 r"C:\\path"），Python 將不會解析反斜線跳脫字元，特別適合檔案路徑與正規表示式。`,
      codeSnippet: `# 字串宣告與引號用法
greeting = "Hello, Python!"
quote = '愛因斯坦曾說："想像力比知識更重要。"'
multiline = """第一行文字
第二行文字"""

# 跳脫字元與原生字串比較
normal_path = "C:\\new_folder\\test"
raw_path = r"C:\\new_folder\\test"

print(greeting)
print(quote)
print(multiline)
print("一般字串:", normal_path)
print("原生字串:", raw_path)`,
      expectedOutput: `Hello, Python!
愛因斯坦曾說："想像力比知識更重要。"
第一行文字
第二行文字
一般字串: C:\new_folder\test
原生字串: C:\\new_folder\\test`,
      lineExplanations: [
        { line: 'greeting = "Hello, Python!"', desc: '以雙引號建立標準英文字串並指派給變數 greeting。' },
        { line: 'quote = \'愛因斯坦曾說："想像力比知識更重要。"\'', desc: '外層使用單引號，內部可直接使用雙引號而不需要跳脫。' },
        { line: 'multiline = """..."""', desc: '三引號允許直接保留換行格式。' },
        { line: 'normal_path = "C:\\\\new_folder\\\\test"', desc: '\\\\ 會被轉譯為單一反斜線，\\n 會被視為換行，因此寫路徑需雙反斜線。' },
        { line: 'raw_path = r"C:\\\\new_folder\\\\test"', desc: 'r 前綴字串會完整保留字面所有反斜線字元。' }
      ],
      commonMistakes: [
        {
          error: "SyntaxError: unterminated string literal",
          why: "引號前後未成對，例如開頭用單引號、結尾用雙引號，或者在單引號字串中直接出現未跳脫的單引號。",
          fix: "確認引號成對，或將外層換成另一種引號，例如 `message = \"It's raining\"`。"
        }
      ],
      basicPractice: {
        question: "宣告一個名為 course 的變數，內容為字串「Python 字串教學」，並印出該變數。",
        hint: "使用雙引號將文字包圍，並傳入 print() 函式。",
        solution: `course = "Python 字串教學"\nprint(course)`
      },
      advancedChallenge: {
        question: "建立一個 Windows 檔案路徑變數 path，值為 C:\\Users\\Data\\new_file.txt，避免 \\n 被誤認為換行符號。",
        hint: "在引號前加上 r，使用原生字串（Raw String）。",
        solution: `path = r"C:\\Users\\Data\\new_file.txt"\nprint(path)`
      }
    },

    "1-2": {
      id: "1-2",
      stageId: 1,
      title: "1.2 字串長度與索引（Indexing）",
      enTitle: "String Length & Indexing",
      difficulty: "入門",
      estTime: "12 分鐘",
      objectives: [
        "學會使用 len() 函式取得字串字元長度",
        "理解以 0 為起始的正向索引（Zero-based Indexing）",
        "掌握以 -1 為結尾的負向索引（Negative Indexing）",
        "理解超出索引邊界會引發 IndexError 的原因"
      ],
      syntax: `length = len(text)
first_char = text[0]
last_char = text[-1]`,
      description: `字串是由個別字元組成的有序序列。每個字元都對應一個整數編號，稱為「索引（Index）」。

1. **正向索引**：由左至右，從 0 開始遞增。第一個字元是 text[0]，第二個字元是 text[1]，最後一個字元是 text[len(text) - 1]。
2. **負向索引**：由右至左，從 -1 開始遞減。最後一個字元是 text[-1]，倒數第二個是 text[-2]。
3. **長度計算**：使用內建函式 \`len(text)\` 可以取得字串包含的字元總數。中文、英文、數字、空白各佔 1 個字元長度。
4. **索引邊界**：若存取的索引值大於等於長度，或負向索引小於負的長度，Python 會拋出 \`IndexError: string index out of range\`。`,
      codeSnippet: `word = "Python程式"

# 計算字串長度
total_chars = len(word)
print("字串長度:", total_chars)

# 正向索引存取
print("第一個字元:", word[0])
print("第二個字元:", word[1])

# 負向索引存取
print("最後一個字元:", word[-1])
print("倒數第二個字元:", word[-2])`,
      expectedOutput: `字串長度: 8
第一個字元: P
第二個字元: y
最後一個字元: 式
倒數第二個字元: 程`,
      lineExplanations: [
        { line: 'total_chars = len(word)', desc: '"Python程式" 共包含 6 個英文字母與 2 個中文字，總長度為 8。' },
        { line: 'word[0]', desc: '取得索引 0 的字元 "P"。' },
        { line: 'word[-1]', desc: '使用負向索引取得最末字元 "式"。' }
      ],
      commonMistakes: [
        {
          error: "IndexError: string index out of range",
          why: "長度為 8 的字串最大正索引是 7，若存取 word[8] 就會超出範圍。",
          fix: "記住最後一個字元的合法正索引永遠是 `len(text) - 1`，或直接使用 `text[-1]`。"
        }
      ],
      basicPractice: {
        question: "已知 text = 'Developer'，請使用負向索引印出倒數第三個字元。",
        hint: "最末字元是 -1，倒數第二是 -2，倒數第三是 -3。",
        solution: `text = 'Developer'\nprint(text[-3])`
      },
      advancedChallenge: {
        question: "撰寫一段程式碼，若字串為空字串，印出「字串為空」；否則印出字串的第一個與最後一個字元。",
        hint: "先用 len(s) == 0 進行保護判斷，避免存取空字串的索引導致 IndexError。",
        solution: `s = "AI科技"\nif len(s) == 0:\n    print("字串為空")\nelse:\n    print(s[0], s[-1])`
      }
    },

    "1-3": {
      id: "1-3",
      stageId: 1,
      title: "1.3 字串切片（Slicing）",
      enTitle: "String Slicing",
      difficulty: "基礎",
      estTime: "15 分鐘",
      objectives: [
        "掌握切片完整語法 [start:stop:step]",
        "理解「含頭不含尾」的邊界閉開區間特性 [start, stop)",
        "學會省略參數的預設行為與步贅（Step）應用",
        "使用 [::-1] 技巧將字串快速反轉"
      ],
      syntax: `sub = text[start:stop]
sub_step = text[start:stop:step]
reverse = text[::-1]`,
      description: `切片（Slicing）能讓我們從既有字串中擷取一部分子字串，產生新的字串物件。

完整切片格式為：\`text[start:stop:step]\`
- **start**：起始索引（包含）。省略時預設為 0（若 step 為負則為末端）。
- **stop**：結束索引（**不包含**，數學上的半開區間 [start, stop)）。省略時預設為字串結尾。
- **step**：步贅（每隔幾個字元取一次）。預設為 1。

**重要特點**：
1. 切片操作**不會**引發 IndexError！若 stop 超過字串長度，Python 會自動截斷在邊界。
2. 當 step 為 -1 且 start/stop 省略時（\`text[::-1]\`），字串將被倒序翻轉。`,
      codeSnippet: `msg = "Hello, World!"

# 基本切片（包含索引 0，不包含索引 5）
print("前 5 個字元:", msg[0:5])

# 省略 start 或 stop
print("從開頭到索引 4:", msg[:5])
print("從索引 7 到最後:", msg[7:])

# 步贅 step
print("每隔 2 個字元取一個:", msg[::2])

# 字串反轉
print("字串反轉:", msg[::-1])`,
      expectedOutput: `前 5 個字元: Hello
從開頭到索引 4: Hello
從索引 7 到最後: World!
每隔 2 個字元取一個: Hlo ol!
字串反轉: !dlroW ,olleH`,
      lineExplanations: [
        { line: 'msg[0:5]', desc: '取出索引 0, 1, 2, 3, 4 的字元，組成 "Hello"。' },
        { line: 'msg[:5]', desc: '省略 start 預設從 0 開始，結果等同 msg[0:5]。' },
        { line: 'msg[7:]', desc: '省略 stop 預設擷取至字串結尾，取出 "World!"。' },
        { line: 'msg[::-1]', desc: 'step 設為 -1，代表由後向前依序走訪，形成反轉字串。' }
      ],
      commonMistakes: [
        {
          error: "誤以為 msg[0:5] 會包含索引 5 的字元",
          why: "Python 切片採用左閉右開 [start, stop)，stop 位置的字元永遠不包含在結果中。",
          fix: "若要包含索引 5，stop 必須設為 6（即 msg[0:6]）。"
        }
      ],
      basicPractice: {
        question: "已知 s = 'ABCDEFGHIJ'，請使用切片取出中間的 'DEF'。",
        hint: "'D' 的索引是 3，'F' 的索引是 5，因此 stop 應設為 6。",
        solution: `s = 'ABCDEFGHIJ'\nprint(s[3:6])`
      },
      advancedChallenge: {
        question: "撰寫一個判斷迴文（正著讀與倒著讀都相同）的簡單邏輯，檢驗 word = 'level' 是否為迴文。",
        hint: "將 word 與 word[::-1] 進行相等性比較（==）。",
        solution: `word = "level"\nis_palindrome = (word == word[::-1])\nprint("是否為迴文:", is_palindrome)`
      }
    },

    "1-4": {
      id: "1-4",
      stageId: 1,
      title: "1.4 字串不可變性（Immutability）",
      enTitle: "String Immutability",
      difficulty: "基礎",
      estTime: "10 分鐘",
      objectives: [
        "理解 Python 字串的不可變性（Immutable）本質",
        "認識修改字串時引發 TypeError 的原因",
        "學會透過組合與切片建立「新字串」以達成修改目的"
      ],
      syntax: `# 錯誤方式：
# text[0] = 'h' -> TypeError

# 正確方式：
new_text = 'h' + text[1:]`,
      description: `在 Python 中，字串屬於**不可變物件（Immutable Object）**。
這意味著字串一旦在記憶體中建立，其內部字元就無法被直接更換、新增或刪除。

1. **不可變的原生保護**：若嘗試使用 \`text[0] = 'H'\` 直接指定，Python 會拋出 \`TypeError: 'str' object does not support item assignment\`。
2. **正確修改方式**：所有字串操作方法（如 replace、strip、切片等）都**不會修改原字串**，而是**建立並回傳一個全新的字串物件**。
3. **變數重新綁定**：我們可以將產生的新字串重新指派回原本的變數名稱（如 \`s = "J" + s[1:]\`）。`,
      codeSnippet: `original = "Python"

# 嘗試透過索引修改（以下若執行會報錯，因此示範正確改法）
# original[0] = "J"  # TypeError!

# 正確改法：切片重新組合
modified = "J" + original[1:]

print("原字串:", original)
print("新字串:", modified)
print("記憶體位址是否相同:", id(original) == id(modified))`,
      expectedOutput: `原字串: Python
新字串: Jython
記憶體位址是否相同: False`,
      lineExplanations: [
        { line: 'modified = "J" + original[1:]', desc: '取 "J" 加上原字串從索引 1 開始的其餘部分 "ython"，產生全新字串 "Jython"。' },
        { line: 'id(original) == id(modified)', desc: '比較兩者在記憶體中的 id，結果為 False，證實建立了新物件。' }
      ],
      commonMistakes: [
        {
          error: "TypeError: 'str' object does not support item assignment",
          why: "試圖對字串特定索引直接賦值，違反 Python 字串不可變原則。",
          fix: "使用切片結合運算子產生新字串，或使用 str.replace() 轉換。"
        }
      ],
      basicPractice: {
        question: "字串 s = 'cat'，請將其開頭修改為 'b'，產生 'bat' 並印出。",
        hint: "使用 'b' + s[1:]。",
        solution: `s = 'cat'\nnew_s = 'b' + s[1:]\nprint(new_s)`
      },
      advancedChallenge: {
        question: "說明為什麼執行 s = 'hello'; s.upper() 後，印出 s 仍然是 'hello'？該如何修正？",
        hint: "s.upper() 傳回新字串，原字串不變。修正方式是將結果指派回變數：s = s.upper()。",
        solution: `s = 'hello'\ns = s.upper()\nprint(s)`
      }
    },

    // -------------------------------------------------------------------------
    // 階段二：字串基本操作
    // -------------------------------------------------------------------------
    "2-1": {
      id: "2-1",
      stageId: 2,
      title: "2.1 字串運算子：串接、重複與成員檢查",
      enTitle: "String Operators",
      difficulty: "基礎",
      estTime: "12 分鐘",
      objectives: [
        "掌握加號 + 串接字串與乘號 * 重複字串",
        "使用 in 與 not in 檢查子字串是否存在",
        "理解字串比較運算子（==, !=, <, >）的字典順序"
      ],
      syntax: `full = str1 + str2
repeated = str1 * 3
is_in = "abc" in text
is_not_in = "xyz" not in text`,
      description: `Python 提供了直覺的運算子來操作字串：

1. **串接（Concatenation, +）**：將兩個字串合併為一個新字串。注意兩邊都必須是字串，不能直接將字串與整數相加。
2. **重複（Repetition, *）**：將字串與整數相乘，將字串重複特定次數。
3. **成員檢查（Membership, in / not in）**：回傳布林值（True / False），用來檢查某個子字串是否存在於目標字串中，此檢查有區分大小寫。
4. **字串比較（Comparison, ==, <, >）**：依據字元的 Unicode 編碼順序（字典序）逐字元進行比對。`,
      codeSnippet: `first_name = "Guido"
last_name = "van Rossum"

# 1. 串接
full_name = first_name + " " + last_name
print("全名:", full_name)

# 2. 重複
divider = "-" * 20
print(divider)

# 3. 成員檢查
print("Rossum 是否在姓名中:", "Rossum" in full_name)
print("Java 是否在姓名中:", "Java" in full_name)

# 4. 字典序比較 ('apple' < 'banana')
print("'apple' < 'banana':", "apple" < "banana")`,
      expectedOutput: `全名: Guido van Rossum
--------------------
Rossum 是否在姓名中: True
Java 是否在姓名中: False
'apple' < 'banana': True`,
      lineExplanations: [
        { line: 'full_name = first_name + " " + last_name', desc: '使用 + 運算子串接三個字串。' },
        { line: 'divider = "-" * 20', desc: '將字元 "-" 重複 20 次，建立分隔線。' },
        { line: '"Rossum" in full_name', desc: '檢查 "Rossum" 是否包含於字串中，結果為 True。' }
      ],
      commonMistakes: [
        {
          error: "TypeError: can only concatenate str (not 'int') to str",
          why: "嘗試將字串與數字直接用 + 相加，例如 `\"Age: \" + 25`。",
          fix: "使用 `str(25)` 將數字轉為字串，或使用 f-string 格式化 `f\"Age: {25}\"`。"
        }
      ],
      basicPractice: {
        question: "印出一條長度為 30 的等號線（'=' 重複 30 次）。",
        hint: "使用字串重複運算子 *。",
        solution: `print("=" * 30)`
      },
      advancedChallenge: {
        question: "給定 email = 'user@example.com'，請使用 not in 檢查是否遺漏 '@' 符號，若是則印出「無效的信箱」。",
        hint: "if '@' not in email: ...",
        solution: `email = "user.example.com"\nif "@" not in email:\n    print("無效的信箱")`
      }
    },

    "2-2": {
      id: "2-2",
      stageId: 2,
      title: "2.2 去除空白：strip(), lstrip(), rstrip()",
      enTitle: "Stripping Whitespace",
      difficulty: "基礎",
      estTime: "12 分鐘",
      objectives: [
        "學會 strip() 移除字串頭尾的空白或自訂字元",
        "理解 lstrip() 只移除左側（Left）與 rstrip() 只移除右側（Right）",
        "掌握自訂字元參數的運作邏輯（移除字元集而非整個子字串）"
      ],
      syntax: `cleaned = text.strip()
left_cleaned = text.lstrip()
right_cleaned = text.rstrip()
custom_cleaned = text.strip("._")`,
      description: `在處理使用者輸入或讀取檔案時，文字前後常會帶有多餘的空白、換行（\\n）或定位鍵（\\t）。

1. **strip()**：移除字串**開頭與結尾**的所有空白字元（包含半形空白、全形空白、\\n, \\r, \\t）。
2. **lstrip()**：只移除**左側（開頭）**的空白字元。
3. **rstrip()**：只移除**右側（結尾）**的空白字元。
4. **自訂字元**：若傳入參數字串（如 \`text.strip("#*")\`），Python 會將參數內的每個字元視為可移除的字元集合，由外向內連續剝除，直到遇到不屬於該集合的字元為止。
5. **注意**：strip 系列方法**不會**移除字串中間的空白！`,
      codeSnippet: `raw_user_input = "   王小明 \\n\\t"

# 1. 預設移除空白字元
print("原始長度:", len(raw_user_input))
clean_name = raw_user_input.strip()
print("清理後:", repr(clean_name))
print("清理後長度:", len(clean_name))

# 2. 單側移除
code = "###PYTHON***"
print("lstrip('#'):", code.lstrip("#"))
print("rstrip('*'):", code.rstrip("*"))

# 3. 同時移除多種符號
print("strip('#*'):", code.strip("#*"))`,
      expectedOutput: `原始長度: 9
清理後: '王小明'
清理後長度: 3
lstrip('#'): PYTHON***
rstrip('*'): ###PYTHON
strip('#*'): PYTHON`,
      lineExplanations: [
        { line: 'clean_name = raw_user_input.strip()', desc: '將前後半形空白、\\n 及 \\t 完全移除，只留下 "王小明"。' },
        { line: 'code.strip("#*")', desc: '將 "#" 與 "*" 同時納入移除字元集，頭尾連續匹配的符號皆被剔除。' }
      ],
      commonMistakes: [
        {
          error: "誤以為 strip() 可以去除文字中間的空格",
          why: "strip() 僅針對開頭與結尾進行修剪，無法影響內文字元。",
          fix: "若要移除中間空格，請使用 `replace(\" \", \"\")` 或 `split()` 後重新 `join()`。"
        }
      ],
      basicPractice: {
        question: "處理來自表單的手機號碼 raw_phone = '   0912345678 \\n'，將其前後多餘空白與換行清理乾淨。",
        hint: "使用 strip() 方法。",
        solution: `raw_phone = "   0912345678 \\n"\nphone = raw_phone.strip()\nprint(phone)`
      },
      advancedChallenge: {
        question: "給定網址 url = 'https://www.example.com/'，請使用 rstrip 移除結尾的斜線 '/'。",
        hint: "url.rstrip('/')",
        solution: `url = "https://www.example.com/"\nclean_url = url.rstrip("/")\nprint(clean_url)`
      }
    },

    "2-3": {
      id: "2-3",
      stageId: 2,
      title: "2.3 大小寫轉換方法",
      enTitle: "Case Conversion Methods",
      difficulty: "基礎",
      estTime: "10 分鐘",
      objectives: [
        "掌握 lower() 與 upper() 的全文轉換",
        "理解 capitalize(), title() 與 swapcase() 的行為差異",
        "應用 lower() 進行不分大小寫的文字搜尋比對"
      ],
      syntax: `s_lower = text.lower()
s_upper = text.upper()
s_cap = text.capitalize()
s_title = text.title()
s_swap = text.swapcase()`,
      description: `Python 提供了豐富的字串大小寫轉換方法，在資料清理與不分大小寫比對時極為重要：

1. **lower()**：將所有英文字母轉為小寫。常用於比對使用者輸入（如 'Yes'.lower() == 'yes'）。
2. **upper()**：將所有英文字母轉為大寫。常用於代碼規範或強調提示。
3. **capitalize()**：僅將字串「第一個字元」轉為大寫，其餘字母全部轉為小寫。
4. **title()**：將每個單字的首字母轉為大寫（標題格式，以空格或標點為單字界線）。
5. **swapcase()**：大小寫反轉（原本大寫轉小寫，小寫轉大寫）。
6. **注意**：中文與符號不受大小寫方法影響。`,
      codeSnippet: `text = "python PROGRAMMING language"

print("lower()     :", text.lower())
print("upper()     :", text.upper())
print("capitalize():", text.capitalize())
print("title()     :", text.title())
print("swapcase()  :", text.swapcase())

# 實務應用：不區分大小寫比對
user_role = "Admin"
if user_role.lower() == "admin":
    print("驗證通過：使用者具有管理員權限")`,
      expectedOutput: `lower()     : python programming language
upper()     : PYTHON PROGRAMMING LANGUAGE
capitalize(): Python programming language
title()     : Python Programming Language
swapcase()  : PYTHON programming LANGUAGE
驗證通過：使用者具有管理員權限`,
      lineExplanations: [
        { line: 'text.lower()', desc: '所有字元轉小寫。' },
        { line: 'text.capitalize()', desc: '字串開頭 "p" 轉大寫 "P"，其餘大寫轉小寫。' },
        { line: 'text.title()', desc: '每個以空白分隔的單字首字皆轉為大寫。' },
        { line: 'user_role.lower() == "admin"', desc: '將輸入轉為全小寫後進行比較，確保無論輸入 ADMIN、Admin 或 admin 都能命中。' }
      ],
      commonMistakes: [
        {
          error: "title() 在縮寫或連字符號上的非預期轉譯",
          why: "例如 \"they're\".title() 會變成 \"They'Re\"，因為單引號會被視為單字邊界。",
          fix: "若處理複雜英文縮寫，需改用正規表示式或字串替換輔助。"
        }
      ],
      basicPractice: {
        question: "給定 query = 'PYTHON'，請轉換為小寫後印出。",
        hint: "使用 query.lower()。",
        solution: `query = 'PYTHON'\nprint(query.lower())`
      },
      advancedChallenge: {
        question: "輸入 name = 'tSMC'，請使用 swapcase() 將其大小寫對調，輸出 'Tsmc'。",
        hint: "name.swapcase()",
        solution: `name = 'tSMC'\nprint(name.swapcase())`
      }
    },

    // -------------------------------------------------------------------------
    // 階段三：字串搜尋與替換
    // -------------------------------------------------------------------------
    "3-1": {
      id: "3-1",
      stageId: 3,
      title: "3.1 搜尋與計數：find(), index(), count()",
      enTitle: "Searching & Counting",
      difficulty: "中階",
      estTime: "15 分鐘",
      objectives: [
        "掌握 find() 與 rfind() 的回傳值特性",
        "理解 find() 與 index() 的核心差異（-1 vs ValueError）",
        "學會使用 count() 計算子字串出現次數"
      ],
      syntax: `pos1 = text.find(sub)          # 找不到回傳 -1
pos2 = text.rfind(sub)         # 由右向左搜尋
pos3 = text.index(sub)         # 找不到拋出 ValueError
total = text.count(sub)        # 計算次數`,
      description: `在長篇字串中定位特定文字是日常程式開發的基礎任務。

1. **find() vs index()（關鍵差異）**：
   - \`find(sub)\`：由左向右搜尋，找到時回傳第一個符合的索引；**若找不到則回傳 -1**。
   - \`index(sub)\`：由左向右搜尋，找到時回傳索引；**若找不到則直接拋出 ValueError 異常**。
   - **實務建議**：如果無法確定子字串是否存在，優先使用 \`find()\` 或先以 \`in\` 檢查，避免程式意外崩潰。
2. **rfind() 與 rindex()**：從右側（末端）開始向前搜尋最後一次出現的位置。
3. **count(sub)**：統計子字串在字串中出現的總次數（非重疊計算）。可指定 start 與 end 範圍。`,
      codeSnippet: `article = "Python 是一門優秀的程式語言，學好 Python 很有用。"

# 1. find 與 rfind
first_py = article.find("Python")
last_py = article.rfind("Python")
missing = article.find("Java")

print("第一個 Python 索引:", first_py)
print("最後一個 Python 索引:", last_py)
print("搜尋 Java 結果:", missing)

# 2. count 計數
count_py = article.count("Python")
print("Python 出現次數:", count_py)

# 3. index 與異常防護
try:
    idx = article.index("Java")
except ValueError:
    print("index('Java') 找不到文字，引發 ValueError！")`,
      expectedOutput: `第一個 Python 索引: 0
最後一個 Python 索引: 21
搜尋 Java 結果: -1
Python 出現次數: 2
index('Java') 找不到文字，引發 ValueError！`,
      lineExplanations: [
        { line: 'article.find("Python")', desc: '搜尋第一個出現的 "Python"，起始索引為 0。' },
        { line: 'article.rfind("Python")', desc: '由右側往左搜尋，找到第二個 "Python" 起始於索引 21。' },
        { line: 'article.find("Java")', desc: '未找到目標字串，安全回傳 -1。' },
        { line: 'article.index("Java")', desc: '未找到目標時拋出 ValueError 例外。' }
      ],
      commonMistakes: [
        {
          error: "誤用 if text.find(sub): 來判斷是否存在",
          why: "若 sub 剛好出現在索引 0（開頭），find 回傳 0，在布林判斷中 0 會被判定為 False！",
          fix: "正確判斷方式為 `if text.find(sub) != -1:`，或直接用 `if sub in text:`。"
        }
      ],
      basicPractice: {
        question: "給定 text = 'banana'，請使用 count() 計算字母 'a' 出現了幾次。",
        hint: "text.count('a')",
        solution: `text = 'banana'\nprint(text.count('a'))`
      },
      advancedChallenge: {
        question: "撰寫一個安全搜尋函式 safe_find(text, sub)，若找不到傳回 None，若找到則傳回索引值。",
        hint: "pos = text.find(sub); return None if pos == -1 else pos",
        solution: `def safe_find(text, sub):\n    pos = text.find(sub)\n    return None if pos == -1 else pos\n\nprint(safe_find("Hello World", "World"))\nprint(safe_find("Hello World", "Python"))`
      }
    },

    "3-2": {
      id: "3-2",
      stageId: 3,
      title: "3.2 檢查前後綴：startswith() 與 endswith()",
      enTitle: "Checking Prefix & Suffix",
      difficulty: "基礎",
      estTime: "12 分鐘",
      objectives: [
        "掌握 startswith() 檢查字串開頭",
        "掌握 endswith() 檢查字串結尾",
        "使用 Tuple 傳入多重條件進行一次性比對"
      ],
      syntax: `is_start = text.startswith("prefix")
is_end = text.endswith(".pdf")
is_multi = text.endswith((".jpg", ".png", ".webp"))`,
      description: `在檔案處理、網址驗證與協議解析時，經常需要檢查文字的開頭或結尾特徵。

1. **startswith(prefix)**：判斷字串是否以指定的子字串開頭，傳回 True 或 False。
2. **endswith(suffix)**：判斷字串是否以指定的子字串結尾，常用於判斷副檔名。
3. **多重條件傳入（Tuple）**：可傳入一個元組（Tuple），只要符合其中任何一個條件即回傳 True。注意必須是 Tuple（圓括號），不可傳入 List。
4. **範圍限制**：兩者皆支援可選的 start 與 end 參數，限定檢查的區間。`,
      codeSnippet: `filename = "profile_picture.PNG"
url = "https://www.python.org"

# 1. 檢查開頭協議
is_secure = url.startswith("https://")
print("是否為安全 HTTPS 協議:", is_secure)

# 2. 檢查結尾副檔名（利用 lower 忽略大小寫）
is_image = filename.lower().endswith((".png", ".jpg", ".jpeg", ".gif"))
print("是否為合法圖片格式:", is_image)

# 3. 指定範圍檢查
text = "ABCDEF"
print("索引 2 到 5 是否以 'C' 開頭:", text.startswith("C", 2, 5))`,
      expectedOutput: `是否為安全 HTTPS 協議: True
是否為合法圖片格式: True
索引 2 到 5 是否以 'C' 開頭: True`,
      lineExplanations: [
        { line: 'url.startswith("https://")', desc: '檢查字串是否以 "https://" 開頭。' },
        { line: 'filename.lower().endswith(...)', desc: '先將檔名轉小寫，再以 Tuple 傳入多種副檔名一次性驗證。' }
      ],
      commonMistakes: [
        {
          error: "TypeError: tuple for startswith must only contain str, not list",
          why: "傳遞了清單 `['.png', '.jpg']` 給 endswith，Python 規定多條件必須使用元組 Tuple `('.png', '.jpg')`。",
          fix: "改用圓括號 `endswith(('.png', '.jpg'))`。"
        }
      ],
      basicPractice: {
        question: "給定 phone = '+886-912345678'，請使用 startswith 檢查是否為台灣國碼 '+886' 開頭。",
        hint: "phone.startswith('+886')",
        solution: `phone = '+886-912345678'\nprint(phone.startswith('+886'))`
      },
      advancedChallenge: {
        question: "過濾一個清單 files = ['a.py', 'b.txt', 'c.py', 'd.md']，只印出所有副檔名為 .py 的檔案。",
        hint: "使用 for 迴圈搭配 f.endswith('.py')。",
        solution: `files = ['a.py', 'b.txt', 'c.py', 'd.md']\nfor f in files:\n    if f.endswith('.py'):\n        print(f)`
      }
    },

    "3-3": {
      id: "3-3",
      stageId: 3,
      title: "3.3 拆分與分割：split(), rsplit(), partition()",
      enTitle: "Splitting & Partitioning",
      difficulty: "中階",
      estTime: "15 分鐘",
      objectives: [
        "掌握 split() 預設與自訂分隔符號之行為",
        "理解 rsplit() 搭配 maxsplit 的由右向左拆分應用",
        "深入比較 split() 與 partition() 的三元組回傳特性"
      ],
      syntax: `parts = text.split(",")
parts_max = text.split(" ", maxsplit=1)
parts_right = text.rsplit(".", maxsplit=1)
before, sep, after = text.partition("=")`,
      description: `將字串拆分為多個片段是資料清理的核心技法。Python 提供了兩種概念完全不同的分割方式：

1. **split(sep, maxsplit)**：
   - 預設（sep=None）：會將**任何連續空白字元**（包含半形空格、\\n, \\t）視為單一分隔符，並自動去除頭尾空白，回傳清單（List）。
   - 指定 sep（如 sep=','）：嚴格依據該字元拆分。
   - maxsplit：限制最大拆分次數。
2. **rsplit()**：與 split 相同，但在有指定 maxsplit 時會由右側開始拆分。例如拆分副檔名時，\`file.rsplit('.', 1)\` 可安全分離主檔名與最後副檔名。
3. **partition(sep)（關鍵差異）**：
   - 永遠回傳**固定長度為 3 的元組（Tuple）**：\`(分隔符前, 分隔符本身, 分隔符後)\`。
   - 若找不到分隔符，回傳 \`(原字串, '', '')\`。
   - **實務優勢**：在拆解 key=value 鍵值對時，使用 partition 可以精確取得前中後，即使找不到也不會拋出 ValueError。`,
      codeSnippet: `# 1. split 預設空白拆分
sentence = "Python    資料分析   機器學習"
print("預設 split:", sentence.split())

# 2. rsplit 實戰：分離檔名與副檔名
doc = "archive.2026.final.tar.gz"
base_name, ext = doc.rsplit(".", 1)
print("主檔名:", base_name, "| 副檔名:", ext)

# 3. partition vs split 拆解設定檔
config_entry = "database_host=127.0.0.1"
key, sep, val = config_entry.partition("=")
print("Key:", key, "| Val:", val)

# 4. partition 找不到分隔符時的表現
not_found_key, sep2, val2 = "standalone_token".partition("=")
print("未找到時:", (not_found_key, sep2, val2))`,
      expectedOutput: `預設 split: ['Python', '資料分析', '機器學習']
主檔名: archive.2026.final.tar | 副檔名: gz
Key: database_host | Val: 127.0.0.1
未找到時: ('standalone_token', '', '')`,
      lineExplanations: [
        { line: 'sentence.split()', desc: '自動將連續多個空格視為同一分隔，回傳乾淨的單字清單。' },
        { line: 'doc.rsplit(".", 1)', desc: '從右邊只切 1 次，精確分離最後的副檔名 "gz"。' },
        { line: 'config_entry.partition("=")', desc: '將 "database_host=127.0.0.1" 拆成 ("database_host", "=", "127.0.0.1")。' }
      ],
      commonMistakes: [
        {
          error: "直接用 split(' ') 處理多個空格",
          why: "傳入 ' ' 會導致連續空格之間產生大量空字串 `['', '']`。",
          fix: "若要拆分不規則空白，使用不傳參數的 `split()` 即可自動處理。"
        }
      ],
      basicPractice: {
        question: "給定 tags = 'python,data,ai'，請使用 split 拆分成清單並印出。",
        hint: "tags.split(',')",
        solution: `tags = 'python,data,ai'\nprint(tags.split(','))`
      },
      advancedChallenge: {
        question: "給定一個可能沒有冒號的字串 header = 'Content-Type: text/html'，請用 partition 安全拆分出標頭名稱與內容，避免報錯。",
        hint: "k, _, v = header.partition(': '); 接著可用 v.strip() 清理。",
        solution: `header = 'Content-Type: text/html'\nkey, sep, val = header.partition(': ')\nprint("鍵:", key)\nprint("值:", val)`
      }
    },

    "3-4": {
      id: "3-4",
      stageId: 3,
      title: "3.4 組合與替換：replace() 與 join()",
      enTitle: "Replacing & Joining",
      difficulty: "中階",
      estTime: "12 分鐘",
      objectives: [
        "掌握 replace(old, new, count) 的替換與次數限制",
        "掌握 str.join(iterable) 組合字串的語法與效能優勢",
        "深入理解 replace() 與 join() 的應用場景差異"
      ],
      syntax: `new_text = text.replace(old, new)
new_text_count = text.replace(old, new, 1)
combined = ",".join(items_list)`,
      description: `文字的修改與組合在 Python 中透過 replace 與 join 達到極致效率：

1. **replace(old, new, count)**：
   - 將字串中的 old 子字串全部替換為 new 子字串，回傳新字串。
   - 可選參數 count：指定最多替換前幾次。
2. **join(iterable)**：
   - **注意語法結構**：\`"分隔符".join(清單)\`，是由分隔符號物件來呼叫 join 方法！
   - 清單（或元組）內的所有元素**必須皆為字串型態**。若包含整數會拋出 TypeError。
3. **場景對比**：
   - 替換特定字詞或修正錯字 -> \`replace()\`。
   - 將資料清單串成 CSV 格式或網址路徑 -> \`join()\`。
   - 效能考量：在迴圈中千萬不要用 \`+\` 串接長字串，應先放入清單再用 \`join()\`。`,
      codeSnippet: `# 1. replace 基礎替換與次數限制
intro = "我喜歡 Java，因為 Java 很有趣。"
print("全部替換:", intro.replace("Java", "Python"))
print("僅替換第 1 次:", intro.replace("Java", "Python", 1))

# 2. join 組合字串清單
skills = ["Python", "SQL", "Git", "Docker"]
csv_line = ", ".join(skills)
path = "/".join(["usr", "local", "bin"])

print("技能 CSV:", csv_line)
print("路徑:", path)

# 3. 處理包含非字串的清單（結合推導式）
numbers = [2026, 10, 31]
date_str = "-".join(str(n) for n in numbers)
print("日期字串:", date_str)`,
      expectedOutput: `全部替換: 我喜歡 Python，因為 Python 很有趣。
僅替換第 1 次: 我喜歡 Python，因為 Java 很有趣。
技能 CSV: Python, SQL, Git, Docker
路徑: usr/local/bin
日期字串: 2026-10-31`,
      lineExplanations: [
        { line: 'intro.replace("Java", "Python")', desc: '將字串內所有 "Java" 一併替換為 "Python"。' },
        { line: 'intro.replace("Java", "Python", 1)', desc: '指定 count=1，只替換最前面的第一個 "Java"。' },
        { line: '", ".join(skills)', desc: '以 ", " 為中間間隔，將清單串接為單一字串。' },
        { line: '"-".join(str(n) for n in numbers)', desc: '先將整數轉為字串後，再以 "-" 串接。' }
      ],
      commonMistakes: [
        {
          error: "TypeError: sequence item 0: expected str instance, int found",
          why: "嘗試對包含數字的清單直接呼叫 join，例如 `','.join([1, 2, 3])`。",
          fix: "使用生成器推導式先轉型：`','.join(str(x) for x in [1, 2, 3])`。"
        }
      ],
      basicPractice: {
        question: "給定 words = ['Hello', 'World']，請使用空格 ' ' 將其 join 成 'Hello World'。",
        hint: "' '.join(words)",
        solution: `words = ['Hello', 'World']\nprint(' '.join(words))`
      },
      advancedChallenge: {
        question: "有一段含有敏感個資的字串 card = '4111-2222-3333-4444'，請將前三組號碼替換為 '****'，保留最後一組。",
        hint: "可先用 split('-') 拆開，將前 3 個元素替換為 '****'，再用 join('-') 組裝。",
        solution: `card = '4111-2222-3333-4444'\nparts = card.split('-')\nmasked = ['****' if i < 3 else parts[i] for i in range(len(parts))]\nprint('-'.join(masked))`
      }
    },

    // -------------------------------------------------------------------------
    // 階段四：字串格式化與資料處理
    // -------------------------------------------------------------------------
    "4-1": {
      id: "4-1",
      stageId: 4,
      title: "4.1 f-string 與 format() 現代格式化",
      enTitle: "f-strings & str.format",
      difficulty: "中階",
      estTime: "15 分鐘",
      objectives: [
        "掌握 Python 3.6+ f-string 的運算式嵌入",
        "學會數值格式化：小數點位數與千分位標記",
        "掌握字串對齊（靠左、置中、靠右）與填充字元"
      ],
      syntax: `f_str = f"Hello {name}, your score is {score}"
f_float = f"{pi:.2f}"
f_align = f"{text:>10}"
f_pad = f"{num:0>5}"`,
      description: `在現代 Python 中，**格式化字串常值（f-string）** 是最推薦的字串格式化工具，具備執行速度最快、可讀性最高的優點。

1. **基本語法**：在引號前加上 \`f\` 或 \`F\`，在大括號 \`{expression}\` 內可直接撰寫任何合法的 Python 運算式、變數或函式呼叫。
2. **數值與浮點數格式化**：
   - \`{value:.2f}\`：保留 2 位小數點（會自動四捨五入）。
   - \`{value:,}\`：加上千分位逗號（例如 1,000,000）。
   - \`{value:.1%}\`：轉換為百分比格式。
3. **字串對齊與填充**：
   - \`{text:<10}\`：靠左對齊，佔 10 格寬度。
   - \`{text:>10}\`：靠右對齊，佔 10 格寬度。
   - \`{text:^10}\`：置中對齊。
   - \`{num:0>5}\`：靠右對齊，空位以 '0' 補足（常用於編號如 00042）。`,
      codeSnippet: `name = "小明"
score = 89.657
balance = 1250000
item_id = 42

# 1. 運算式與小數點格式化
print(f"學員：{name}，調整後成績：{score + 2:.1f}")

# 2. 千分位與貨幣
print(f"帳戶餘額：NT$ {balance:,}")

# 3. 對齊與補零排版
print(f"序號補零：{item_id:0>6}")
print(f"靠左對齊：|{name:<6}|")
print(f"置中對齊：|{name:^6}|")
print(f"靠右對齊：|{name:>6}|")`,
      expectedOutput: `學員：小明，調整後成績：91.7
帳戶餘額：NT$ 1,250,000
序號補零：000042
靠左對齊：|小明    |
置中對齊：|  小明  |
靠右對齊：|    小明|`,
      lineExplanations: [
        { line: 'f"學員：{name}，調整後成績：{score + 2:.1f}"', desc: '大括號內直接做加法運算，並以 .1f 格式化為一位小數。' },
        { line: 'f"{balance:,}"', desc: '加上英文千分位符號，輸出 1,250,000。' },
        { line: 'f"{item_id:0>6}"', desc: '寬度 6，靠右對齊，前方補 0，輸出 000042。' }
      ],
      commonMistakes: [
        {
          error: "忘記在字串前加上 f 前綴",
          why: "若寫成 `\"{name}\"`，Python 會將其當作一般純字串，輸出字面上的 '{name}' 而非變數值。",
          fix: "記得檢查引號最前方是否有字母 `f`。"
        }
      ],
      basicPractice: {
        question: "有圓周率 pi = 3.1415926，請使用 f-string 將其格式化為保留兩位小數的字串並印出。",
        hint: "f'{pi:.2f}'",
        solution: `pi = 3.1415926\nprint(f"{pi:.2f}")`
      },
      advancedChallenge: {
        question: "製作一張排版整齊的商品明細，包含品名 '蘋果'（靠左佔 8 格）與價格 35（靠右佔 5 格），格式為 |品名|價格|。",
        hint: "f'|{item:<8}|{price:>5}|'",
        solution: `item = "蘋果"\nprice = 35\nprint(f"|{item:<8}|{price:>5}|")`
      }
    },

    "4-2": {
      id: "4-2",
      stageId: 4,
      title: "4.2 字串與數字轉換",
      enTitle: "String & Number Conversion",
      difficulty: "基礎",
      estTime: "12 分鐘",
      objectives: [
        "掌握 int(), float(), str() 的相互轉換",
        "理解字串轉數字時的 ValueError 觸發時機",
        "學會使用 str.isdigit() 與 try-except 進行安全轉換"
      ],
      syntax: `num_int = int("123")
num_float = float("3.14")
text = str(123)
is_digit = "123".isdigit()`,
      description: `在處理外部資料（如表單、CSV 或使用者輸入 input()）時，所有數字最初都是以字串形式存在。

1. **基本轉型函式**：
   - \`int(text)\`：將字串轉為整數。字串必須是純整數格式，不可包含小數點或文字。
   - \`float(text)\`：將字串轉為浮點數（支援小數與科學記號如 "1e-3"）。
   - \`str(val)\`：將任何 Python 物件轉為字串型態。
2. **安全驗證**：
   - \`s.isdigit()\`：檢查字串是否全由半形數字字元組成。
   - 注意：若字串含有負號（"-12"）或小數點（"3.14"），\`isdigit()\` 皆會回傳 False。
3. **最佳實務**：使用 \`try ... except ValueError\` 區塊攔截轉型失敗，是處理不可預期使用者輸入的最佳防護。`,
      codeSnippet: `raw_price = " 199 "
raw_discount = "0.85"
invalid_input = "abc"

# 1. 正常轉換（記得先清理空白）
price = int(raw_price.strip())
discount = float(raw_discount)
final_price = price * discount
print(f"折後價格：{final_price:.2f}")

# 2. 安全驗證與例外處理
def parse_int_safely(value_str, default=0):
    try:
        return int(value_str)
    except ValueError:
        return default

print("解析有效數字:", parse_int_safely("456"))
print("解析無效文字:", parse_int_safely(invalid_input, default=-1))`,
      expectedOutput: `折後價格：169.15
解析有效數字: 456
解析無效文字: -1`,
      lineExplanations: [
        { line: 'price = int(raw_price.strip())', desc: '先用 strip() 去除首尾空格，再傳入 int() 轉為整數 199。' },
        { line: 'discount = float(raw_discount)', desc: '將 "0.85" 轉為浮點數型態以進行數學相乘。' },
        { line: 'except ValueError:', desc: '當字串無法被解析為數字時，捕捉異常並回傳預設值。' }
      ],
      commonMistakes: [
        {
          error: "ValueError: invalid literal for int() with base 10: '3.14'",
          why: "int() 無法直接解析含有小數點的字串。",
          fix: "若要讀取帶小數的字串，應先用 `float('3.14')` 轉換；若需整數再使用 `int(float('3.14'))`。"
        }
      ],
      basicPractice: {
        question: "給定字串 s = '50'，請轉為整數並加上 10，最後印出結果。",
        hint: "int(s) + 10",
        solution: `s = '50'\nresult = int(s) + 10\nprint(result)`
      },
      advancedChallenge: {
        question: "撰寫一個函式 is_valid_float(s)，若字串能成功轉為 float 傳回 True，否則傳回 False。",
        hint: "在 try 區塊嘗試 float(s)，except ValueError 傳回 False。",
        solution: `def is_valid_float(s):\n    try:\n        float(s)\n        return True\n    except ValueError:\n        return False\n\nprint(is_valid_float("3.14"))\nprint(is_valid_float("NaN"))\nprint(is_valid_float("hello"))`
      }
    },

    "4-3": {
      id: "4-3",
      stageId: 4,
      title: "4.3 Unicode、中文字串與多行文字",
      enTitle: "Unicode & Chinese Text Processing",
      difficulty: "中階",
      estTime: "15 分鐘",
      objectives: [
        "理解 Python 3 字串原生即為 Unicode 字元序列",
        "掌握中文字串長度、索引與對齊特性",
        "學會多行文字拆解 splitlines() 與常見換行符號相容性"
      ],
      syntax: `length = len("繁體中文")  # 結果為 4
lines = multiline.splitlines()
lines_keep = multiline.splitlines(keepends=True)`,
      description: `Python 3 最大的革新之一，就是將所有 \`str\` 原生採用 Unicode（每個字元代表一個 Unicode Code Point）。

1. **中文字串長度與索引**：
   - 在 Python 3 中，\`len("台灣")\` 的長度就是 2，不會像舊語言或位元組層級將一個中文字算成 3 個單位。
   - 索引存取：\`"台灣"[0]\` 即得到字元 \`'台'\`。
2. **全形半形對齊議題**：
   - 雖然字元長度為 1，但在多數等寬字體（Monospace）中，一個漢字的顯示寬度約為半形英文字母的 2 倍。這在純字串格式化時會造成視覺排版略有偏差。
3. **多行文字拆解（splitlines）**：
   - 文字資料常混合不同作業系統的換行符（Windows 的 \\r\\n、Linux 的 \\n、Mac 舊格式 \\r）。
   - \`text.splitlines()\` 能自動相容並辨識所有常見換行符，安全地將多行文字切分為每一行的清單，且預設不會留下行尾換行字元。`,
      codeSnippet: `chinese_text = "Python程式設計"
article = """第一行：緒論\\r\\n第二行：變數與型態\\n第三行：迴圈與判斷"""

# 1. 中文字元長度
print("中文字串:", chinese_text)
print("字元總數:", len(chinese_text))
print("第一個字元:", chinese_text[0])

# 2. 自動相容 \\r\\n 與 \\n 的多行拆解
lines = article.splitlines()
print("\\n拆解後的行數:", len(lines))
for idx, line in enumerate(lines, 1):
    print(f"第 {idx} 行 -> {line}")`,
      expectedOutput: `中文字串: Python程式設計
字元總數: 10
第一個字元: P

拆解後的行數: 3
第 1 行 -> 第一行：緒論
第 2 行 -> 第二行：變數與型態
第 3 行 -> 第三行：迴圈與判斷`,
      lineExplanations: [
        { line: 'len(chinese_text)', desc: '"Python" 佔 6 字元，"程式設計" 佔 4 字元，合計恰為 10。' },
        { line: 'article.splitlines()', desc: '自動辨識 \\r\\n 與 \\n，將文章分割為 3 行乾淨字串。' }
      ],
      commonMistakes: [
        {
          error: "手動用 split('\\n') 分割 Windows 格式檔案",
          why: "會導致每一行的行末殘留隱藏的 '\\r' 回車字元，影響後續字串比對與顯示。",
          fix: "處理跨平台檔案文字時，一律優先使用 `text.splitlines()`。"
        }
      ],
      basicPractice: {
        question: "有一段多行文字 poem = '春眠不覺曉\\n處處聞啼鳥'，請使用 splitlines() 取得行數。",
        hint: "len(poem.splitlines())",
        solution: `poem = '春眠不覺曉\\n處處聞啼鳥'\nprint(len(poem.splitlines()))`
      },
      advancedChallenge: {
        question: "給定一組多行文字，請將每一行開頭加上行號（例如 '1. 第一行'）後重新組合為一個字串。",
        hint: "使用 splitlines() 遍歷，搭配 f'{i}. {line}' 與 '\\n'.join()。",
        solution: `raw = "蘋果\\n香蕉\\n橘子"\nlines = raw.splitlines()\nnumbered = [f"{i+1}. {line}" for i, line in enumerate(lines)]\nprint("\\n".join(numbered))`
      }
    },

    "4-4": {
      id: "4-4",
      stageId: 4,
      title: "4.4 迴圈走訪與字元統計",
      enTitle: "Looping & Character Frequency",
      difficulty: "中階",
      estTime: "15 分鐘",
      objectives: [
        "學會使用 for 迴圈逐字走訪字串",
        "掌握 enumerate() 同時取得索引與字元",
        "使用字典（dict）統計字串中的字元出現頻率"
      ],
      syntax: `for char in text:
    pass

for idx, char in enumerate(text):
    pass

counts = {}
for char in text:
    counts[char] = counts.get(char, 0) + 1`,
      description: `字串本質上是可迭代物件（Iterable），因此能直接透過迴圈逐一處理每個字元。

1. **直接走訪**：\`for char in text:\` 能依序取出每個字元。
2. **帶索引走訪（enumerate）**：
   - 當處理字串時同時需要知道字元的「位置編號」，使用 \`enumerate(text)\` 可以省去手動維護計數變數的麻煩。
   - 可指定起始索引：\`enumerate(text, start=1)\`。
3. **字元頻率統計（Frequency Count）**：
   - 統計字串中各字元出現次數是經典程式題。
   - 使用字典搭配 \`counts.get(char, 0) + 1\` 模式，能優雅地在鍵不存在時設定預設值 0 並累計。`,
      codeSnippet: `text = "python string"

# 1. enumerate 逐字走訪
for index, char in enumerate("AI時代", start=1):
    print(f"位置 {index}: {char}")

# 2. 統計字元出現頻率
sample = "abracadabra"
char_counts = {}

for ch in sample:
    char_counts[ch] = char_counts.get(ch, 0) + 1

print("\\n字元統計結果:")
for char, count in sorted(char_counts.items()):
    print(f"'{char}': {count} 次")`,
      expectedOutput: `位置 1: A
位置 2: I
位置 3: 時
位置 4: 代

字元統計結果:
'a': 5 次
'b': 2 次
'c': 1 次
'd': 1 次
'r': 2 次`,
      lineExplanations: [
        { line: 'enumerate("AI時代", start=1)', desc: '產生 (1, "A"), (2, "I"), (3, "時"), (4, "代") 的序對。' },
        { line: 'char_counts.get(ch, 0) + 1', desc: '若 ch 尚未在字典中則取 0，存在則取既有值，並將次數 +1。' }
      ],
      commonMistakes: [
        {
          error: "KeyError: 'a'",
          why: "在字典中第一次出現某字元時，若直接執行 `counts[char] += 1`，會因鍵尚未初始化而引發 KeyError。",
          fix: "使用 `counts[char] = counts.get(char, 0) + 1`，或先檢查 `if char not in counts:`。"
        }
      ],
      basicPractice: {
        question: "使用 for 迴圈走訪字串 'Cat'，逐行印出每個字元。",
        hint: "for ch in 'Cat': print(ch)",
        solution: `for ch in 'Cat':\n    print(ch)`
      },
      advancedChallenge: {
        question: "給定字串 s = 'hello world'，請統計其中出現次數最多的字元（忽略空白）。",
        hint: "過濾掉空白後，使用字典統計，再以 max(counts, key=counts.get) 找出最高頻字元。",
        solution: `s = 'hello world'\ncounts = {}\nfor ch in s.replace(' ', ''):\n    counts[ch] = counts.get(ch, 0) + 1\nmax_char = max(counts, key=counts.get)\nprint(f"最高頻字元是 '{max_char}'，出現了 {counts[max_char]} 次")`
      }
    },

    // -------------------------------------------------------------------------
    // 階段五：進階字串處理
    // -------------------------------------------------------------------------
    "5-1": {
      id: "5-1",
      stageId: 5,
      title: "5.1 快速對應與字元替換：maketrans() 與 translate()",
      enTitle: "str.maketrans & str.translate",
      difficulty: "進階",
      estTime: "15 分鐘",
      objectives: [
        "掌握 str.maketrans() 建立 Unicode 映射轉換表",
        "使用 translate() 一次性快速替換多個字元",
        "使用 maketrans 刪除指定字元集（高效過濾標點符號）"
      ],
      syntax: `table = str.maketrans("abc", "123")
result = text.translate(table)

# 刪除特定字元
del_table = str.maketrans("", "", ",.!?")
clean_text = text.translate(del_table)`,
      description: `當需要**同時替換多個不同字元**（例如字元加密、密碼代換、全半形轉換），或**一次性刪除大量標點符號**時，反覆呼叫 \`replace()\` 會多次建立新物件且效率低落。
Python 提供了底層 C 等級的映射工具：

1. **str.maketrans(x, y, z)**：
   - 第一種用法：傳入兩個長度相同的字串 x 與 y，表示將 x 內的字元一對一映射至 y。
   - 第二種用法：第三個參數 z 為要直接刪除的字元字串。
   - 第三種用法：直接傳入 dictionary 字典。
2. **str.translate(table)**：
   - 根據建立好的對應表進行一次性全文掃描轉換。
   - 效能極高，特別適合巨量文字資料的前處理與清理。`,
      codeSnippet: `# 1. 簡易密碼替換（a->@, e->3, o->0）
trans_table = str.maketrans("aeo", "@30")
secret = "awesome python developer".translate(trans_table)
print("替換後密文:", secret)

# 2. 一次性清除所有英文標點符號
import string
punctuation_to_remove = string.punctuation
print("常見標點:", punctuation_to_remove[:10])

del_table = str.maketrans("", "", punctuation_to_remove)
raw_article = "Hello, World! Python: is (awesome)..."
clean_article = raw_article.translate(del_table)
print("清除標點後:", clean_article)`,
      expectedOutput: `替換後密文: @w3s0m3 pyth0n d3v3l0p3r
常見標點: !"#$%&'()*
清除標點後: Hello World Python is awesome`,
      lineExplanations: [
        { line: 'str.maketrans("aeo", "@30")', desc: '建立 Unicode 映射字典，將 a 轉為 @，e 轉為 3，o 轉為 0。' },
        { line: 'str.maketrans("", "", punctuation_to_remove)', desc: '前兩個參數為空字串，第三個參數指定要刪除的所有標點符號。' },
        { line: 'raw_article.translate(del_table)', desc: '一次掃描完成所有標點刪除，比連續多次 replace() 快上數倍。' }
      ],
      commonMistakes: [
        {
          error: "ValueError: the first two maketrans arguments must have equal length",
          why: "前兩個參數長度不一致（例如 `str.maketrans('abc', '12')`）。",
          fix: "確認一對一轉換的來源與目標字串長度完全相同。"
        }
      ],
      basicPractice: {
        question: "使用 maketrans 與 translate，將字串 '123' 中的 '1' 換成 'A'，'2' 換成 'B'，'3' 換成 'C'。",
        hint: "table = str.maketrans('123', 'ABC'); '123'.translate(table)",
        solution: `table = str.maketrans('123', 'ABC')\nprint("123".translate(table))`
      },
      advancedChallenge: {
        question: "撰寫一個清除中文全形標點符號（'，'、'。'、'！'、'？'）的 translate 對應表，將句子 '你好，世界！' 轉為 '你好世界'。",
        hint: "del_table = str.maketrans('', '', '，。！？')",
        solution: `sentence = "你好，世界！"\ntable = str.maketrans("", "", "，。！？")\nprint(sentence.translate(table))`
      }
    },

    "5-2": {
      id: "5-2",
      stageId: 5,
      title: "5.2 字元編碼與位元組：ord(), chr(), encode(), decode()",
      enTitle: "Character Encoding & Bytes",
      difficulty: "進階",
      estTime: "15 分鐘",
      objectives: [
        "掌握 ord() 與 chr() 在字元與 Unicode 碼位間的轉換",
        "理解 str（字串）與 bytes（位元組）的本質差異",
        "掌握 encode('utf-8') 與 decode('utf-8')",
        "重點釐清：字串索引位置 ≠ UTF-8 位元組位置"
      ],
      syntax: `code_point = ord("A")         # 65
char = chr(65)                # "A"
byte_data = text.encode("utf-8")
decoded_text = byte_data.decode("utf-8")`,
      description: `在現代網路傳輸與檔案儲存中，理解編碼（Encoding）是資深工程師的必備基本功。

1. **ord() 與 chr()**：
   - \`ord(char)\`：傳回單一字元的 Unicode 碼位整數值（例如 \`ord('A')\` 為 65，\`ord('中')\` 為 20013）。
   - \`chr(code)\`：將整數碼位轉換回對應的字元。
2. **字串（str）vs 位元組（bytes）**：
   - **str**：人類可讀的抽象 Unicode 字元序列，如 \`"台"\`。長度是字元數（len 為 1）。
   - **bytes**：電腦二進位儲存與網路傳輸的位元組資料，字面值前綴為 \`b\`，如 \`b'\\xe5\\x8f\\xb0'\`。
3. **encode() 與 decode()**：
   - \`str.encode('utf-8')\`：將字串編碼為 UTF-8 位元組。
   - \`bytes.decode('utf-8')\`：將位元組解碼為人類可讀字串。
4. **【重要概念辨析】字串索引 ≠ 位元組位置**：
   - 在 UTF-8 編碼中，英文字母佔 1 個位元組，繁體中文常佔 3 個位元組，部分 Emoji 佔 4 個位元組。
   - 因此 \`s = "台灣"\` 中，字串索引 \`s[1]\` 是 \`'灣'\`；但其 UTF-8 位元組長度是 6 位元組。**絕對不可將字串索引直接當作位元組切片操作，否則會破壞中文字元的二進位結構！**`,
      codeSnippet: `# 1. ord 與 chr
print("字元 'A' 的碼位:", ord("A"))
print("字元 '台' 的碼位:", ord("台"))
print("碼位 21488 對應的字元:", chr(21488))

# 2. 字串與 UTF-8 位元組
text = "Python程式"
utf8_bytes = text.encode("utf-8")

print("\\n字串長度 (字元數):", len(text))
print("UTF-8 位元組長度:", len(utf8_bytes))
print("位元組表示:", utf8_bytes)

# 3. 解碼回字串
restored_text = utf8_bytes.decode("utf-8")
print("解碼成功:", restored_text == text)`,
      expectedOutput: `字元 'A' 的碼位: 65
字元 '台' 的碼位: 21488
碼位 21488 對應的字元: 台

字串長度 (字元數): 8
UTF-8 位元組長度: 12
位元組表示: b'Python\\xe7\\xa8\\x8b\\xe5\\xbc\\x8f'
解碼成功: True`,
      lineExplanations: [
        { line: 'ord("台")', desc: '取得漢字「台」的 Unicode 十進位碼位 21488（十六進位為 0x53F0）。' },
        { line: 'text.encode("utf-8")', desc: '將字串轉為 UTF-8 位元組序列，中文字「程」與「式」各佔 3 個位元組，加上 6 個英文字母共 12 位元組。' },
        { line: 'utf8_bytes.decode("utf-8")', desc: '將位元組序列正確解碼還原為 Unicode 字串。' }
      ],
      commonMistakes: [
        {
          error: "UnicodeDecodeError: 'utf-8' codec can't decode byte ...",
          why: "嘗試對被截斷的位元組切片解碼（例如中文字 3 位元組只切了前 2 個），或是用了錯誤的編碼格式（如用 UTF-8 解碼 Big5 檔案）。",
          fix: "確認檔案來源編碼，切片應在 str 字串層級進行而非 bytes 層級。"
        }
      ],
      basicPractice: {
        question: "取得字元 'Z' 的 Unicode 數值，並印出結果。",
        hint: "使用 ord('Z')",
        solution: `print(ord('Z'))`
      },
      advancedChallenge: {
        question: "計算字串 'AI繁體中文' 分別在字元層級（len）與 UTF-8 位元組層級（encode 後的 len）各是多少長度。",
        hint: "len(s) 與 len(s.encode('utf-8'))",
        solution: `s = 'AI繁體中文'\nprint("字元長度:", len(s))\nprint("UTF-8 位元組長度:", len(s.encode('utf-8')))`
      }
    },

    "5-3": {
      id: "5-3",
      stageId: 5,
      title: "5.3 正規表示式入門：re 模組",
      enTitle: "Regular Expressions Basics",
      difficulty: "進階",
      estTime: "15 分鐘",
      objectives: [
        "認識 re.search(), re.findall() 與 re.sub()",
        "理解常用的正規表示式符號：\\d, \\w, +, *, ^, $",
        "使用正規表示式驗證台灣手機號碼與電子郵件格式"
      ],
      syntax: `import re
match = re.search(r"\\d+", text)
all_matches = re.findall(r"\\b[A-Za-z]+\\b", text)
clean_text = re.sub(r"\\s+", " ", text)`,
      description: `當字串比對涉及複雜規則（例如「符合電話格式」、「抓取所有信箱」），內建字串方法已不敷使用，此時必須借助正規表示式（Regular Expression，簡稱 Regex）。

1. **核心函式**：
   - \`re.search(pattern, text)\`：掃描全文尋找「第一個」符合的匹配物件（Match Object）。找不到回傳 None。
   - \`re.findall(pattern, text)\`：抓出全文中「所有」符合的子字串，回傳字串清單。
   - \`re.sub(pattern, repl, text)\`：以新內容替換所有符合規則的文字。
2. **常見萬用符號**：
   - \`\\d\`：代表任意數字（0-9）。
   - \`\\w\`：代表英文字母、數字與底線。
   - \`\\s\`：代表空白字元（包含半形空格、\\t、\\n）。
   - \`+\`：前面項目出現 1 次或多次（例如 \`\\d+\` 代表連續數字）。
   - \`*\`：前面項目出現 0 次或多次。
   - \`^\`：字串開頭；\`$\`：字串結尾。
3. **原生字串慣例**：撰寫 regex pattern 時**務必加上 r 前綴**（如 \`r"\\d+"\`），防止 Python 將反斜線轉義。`,
      codeSnippet: `import re

log = "使用者 user01 在 2026-10-31 登入，IP 為 192.168.1.100，手機：0912-345678"

# 1. 搜尋第一個符合的日期 (re.search)
date_match = re.search(r"\\d{4}-\\d{2}-\\d{2}", log)
if date_match:
    print("找到日期:", date_match.group())

# 2. 抓取所有數字片段 (re.findall)
all_numbers = re.findall(r"\\d+", log)
print("所有數字串:", all_numbers[:4])

# 3. 壓縮連續多個空格為單一空格 (re.sub)
messy_text = "這是一段   帶有   過多     空格的文字。"
cleaned = re.sub(r"\\s+", " ", messy_text)
print("整理後文字:", cleaned)

# 4. 驗證台灣手機格式 (09xx-xxxxxx 或 09xxxxxxxx)
def validate_tw_mobile(phone):
    pattern = r"^09\\d{2}-?\\d{6}$"
    return bool(re.match(pattern, phone))

print("0912-345678 是否有效:", validate_tw_mobile("0912-345678"))
print("0912345678 是否有效:", validate_tw_mobile("0912345678"))
print("0800-000123 是否有效:", validate_tw_mobile("0800-000123"))`,
      expectedOutput: `找到日期: 2026-10-31
所有數字串: ['01', '2026', '10', '31']
整理後文字: 這是一段 帶有 過多 空格的文字。
0912-345678 是否有效: True
0912345678 是否有效: True
0800-000123 是否有效: False`,
      lineExplanations: [
        { line: 're.search(r"\\d{4}-\\d{2}-\\d{2}", log)', desc: '匹配 4 位數字-2 位數字-2 位數字的日期格式。' },
        { line: 're.findall(r"\\d+", log)', desc: '提取所有由 1 位以上數字組成的連續子字串。' },
        { line: 're.sub(r"\\s+", " ", messy_text)', desc: '將 1 個或多個連續空白字元替換為單一標準空格。' },
        { line: 'r"^09\\d{2}-?\\d{6}$"', desc: '^ 錨定開頭為 09，接 2 位數字，-? 表示可有可無的橫線，接 6 位數字，$ 錨定結尾。' }
      ],
      commonMistakes: [
        {
          error: "AttributeError: 'NoneType' object has no attribute 'group'",
          why: "當 re.search() 沒有找到符合項目時會回傳 None，若直接呼叫 `.group()` 就會崩潰。",
          fix: "務必先用 `if match:` 進行判斷，或使用安全賦值運算子。"
        }
      ],
      basicPractice: {
        question: "使用 re.findall 找出字串 '訂單編號: 101, 205, 999' 中所有的數字。",
        hint: "import re; re.findall(r'\\d+', text)",
        solution: `import re\ntext = '訂單編號: 101, 205, 999'\nprint(re.findall(r'\\d+', text))`
      },
      advancedChallenge: {
        question: "撰寫一個簡單的電子郵件格式驗證函式 validate_email(email)，需包含使用者名稱、@ 與網域名稱。",
        hint: "pattern = r'^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'",
        solution: `import re\ndef validate_email(email):\n    pattern = r"^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$"\n    return bool(re.match(pattern, email))\n\nprint(validate_email("test@example.com"))\nprint(validate_email("invalid_email"))`
      }
    },

    "5-4": {
      id: "5-4",
      stageId: 5,
      title: "5.4 字串效能與最佳實踐",
      enTitle: "Performance & Best Practices",
      difficulty: "進階",
      estTime: "12 分鐘",
      objectives: [
        "理解字串不可變性對迴圈串接效能的影響（O(N^2) 陷阱）",
        "掌握列表收集後使用 str.join() 的 O(N) 線性效率",
        "掌握字串記憶體駐留機制（String Interning）基本常識"
      ],
      syntax: `# 避免低效作法：
# s = ""
# for w in words: s += w

# 推薦最佳實踐：
s = "".join(words)`,
      description: `因為 Python 字串具備不可變特性，每次使用 \`+\` 串接兩個字串時，Python 必須在記憶體中配置一塊「全新空間」，並將原先兩個字串的內容全部複製過去。

1. **迴圈中 + 串接的危機（$O(N^2)$ 複雜度）**：
   - 若在包含 10,000 次的迴圈內持續 \`s += item\`，每次都需要複製前一次累積的所有字元，總複製成本將高達 $O(N^2)$，造成明顯卡頓與記憶體浪費。
2. **最佳實踐：List + join（$O(N)$ 線性複雜度）**：
   - 正確的做法是建立一個空的 List，在迴圈中使用 \`list.append()\` 收集字串片段，最後一次性使用 \`"".join(list)\` 完成合併。
   - Python 能精確計算總長度並只進行一次記憶體配置，時間複雜度僅為 $O(N)$。
3. **字串駐留（String Interning）**：
   - Python 內部會對常見的簡短識別碼字串進行駐留共享，使得 \`a is b\` 可能為 True，但千萬**不要依賴 \`is\` 來比較字串內容**，永遠使用 \`==\` 進行內容比對！`,
      codeSnippet: `import time

# 比較 join 與 + 在大數據組合下的效能概念
words = ["item"] * 5000

# 最佳實踐：清單收集後使用 join (O(N))
start = time.perf_counter()
fast_result = "".join(words)
time_join = time.perf_counter() - start

# 低效作法：累加字串 (O(N^2))
start = time.perf_counter()
slow_result = ""
for w in words:
    slow_result += w
time_plus = time.perf_counter() - start

print(f"兩者產生的字串是否相同: {fast_result == slow_result}")
print(f"字串長度: {len(fast_result)}")
print(f"join 耗時極低，時間複雜度為 O(N)")
print("結論：處理大量字串串接時，一律使用 ''.join()！")`,
      expectedOutput: `兩者產生的字串是否相同: True
字串長度: 20000
join 耗時極低，時間複雜度為 O(N)
結論：處理大量字串串接時，一律使用 ''.join()！`,
      lineExplanations: [
        { line: 'fast_result = "".join(words)', desc: 'Python 底層一次計算全部長度後單次分配記憶體，效率為 O(N)。' },
        { line: 'slow_result += w', desc: '迴圈內反覆配置記憶體並複製舊字串，在龐大資料量時會急速變慢。' }
      ],
      commonMistakes: [
        {
          error: "使用 is 來判斷兩個字串內容是否相等",
          why: "`is` 是比較記憶體位址（Identity），`==` 才是比較字串值（Equality）。字串只要不是駐留常數，`is` 就可能回傳 False。",
          fix: "字串內容比較永遠使用 `==` 與 `!=`。"
        }
      ],
      basicPractice: {
        question: "有一串清單 items = ['A', 'B', 'C', 'D']，請以最符合效能規範的方式將其串接成 'ABCD'。",
        hint: "''.join(items)",
        solution: `items = ['A', 'B', 'C', 'D']\nprint("".join(items))`
      },
      advancedChallenge: {
        question: "寫出一段生成 1 到 100 數字以逗號分隔字串（'1,2,3,...,100'）的高效寫法。",
        hint: "','.join(str(i) for i in range(1, 101))",
        solution: `result = ",".join(str(i) for i in range(1, 101))\nprint(result[:20] + "...")`
      }
    },

    // -------------------------------------------------------------------------
    // 階段六：實戰專題導覽
    // -------------------------------------------------------------------------
    "6-1": {
      id: "6-1",
      stageId: 6,
      title: "專題一：文字清理工具（Text Cleaner）",
      enTitle: "Project 1: Text Cleaner",
      difficulty: "專題實戰",
      estTime: "20 分鐘",
      objectives: [
        "整合 strip(), splitlines() 與大小寫轉換",
        "實作去除多餘空行與頭尾空格功能",
        "即時輸出清理前後文字與字數變化"
      ],
      syntax: `cleaned = "\\n".join(line.strip() for line in raw_text.splitlines() if line.strip())`,
      description: `**專題目標**：
在資料科學與後端 API 開發中，清理髒文字是第一步。本專題引導學員運用前面章節所學，建立一個實用的文字清理工具。

**核心功能**：
1. **清除前後空白**：消除每一行開頭與結尾的半形/全形空白。
2. **移除多餘空行**：過濾連續或孤立的無內容空白行。
3. **大小寫統一**：支援轉換為全大寫、全小寫或標題大寫。
4. **字數統計回饋**：即時回報清理前與清理後的字元數變化。`,
      codeSnippet: `def clean_text(raw_text, case_option="none"):
    # 1. 逐行拆分並去除每行前後空白
    lines = [line.strip() for line in raw_text.splitlines()]
    
    # 2. 移除空行
    non_empty_lines = [line for line in lines if line]
    
    # 3. 重新以換行合併
    result = "\\n".join(non_empty_lines)
    
    # 4. 大小寫處理
    if case_option == "upper":
        result = result.upper()
    elif case_option == "lower":
        result = result.lower()
        
    return result

sample_data = """   
   Python 資料清理專題   
   
   第一行資料     
   第二行資料   
"""
print("=== 清理前 ===")
print(repr(sample_data))
print("=== 清理後 ===")
print(clean_text(sample_data, case_option="upper"))`,
      expectedOutput: `=== 清理前 ===
'   \\n   Python 資料清理專題   \\n   \\n   第一行資料     \\n   第二行資料   \\n'
=== 清理後 ===
PYTHON 資料清理專題
第一行資料
第二行資料`,
      lineExplanations: [
        { line: 'lines = [line.strip() for line in raw_text.splitlines()]', desc: '以 splitlines() 相容所有作業系統換行，並對每行 strip() 去除首尾空白。' },
        { line: 'non_empty_lines = [line for line in lines if line]', desc: '過濾掉空字串，徹底排除無意義的空行。' },
        { line: '"\\n".join(non_empty_lines)', desc: '將清理乾淨的行重新結合成標準多行字串。' }
      ],
      commonMistakes: [
        {
          error: "只對整篇文字呼叫 raw_text.strip()",
          why: "這樣只去除了整篇的最前頭與最後頭，內文每一行的前後空格與中間的空行依然殘留。",
          fix: "先用 splitlines() 逐行處理，每行分別 strip() 後再重新組裝。"
        }
      ],
      basicPractice: {
        question: "測試專題一：切換至「實戰專題」頁面中的【文字清理工具】，貼上一段帶有空行的文字進行清理測試。",
        hint: "可在實戰專題頁面即時操作並檢驗結果。",
        solution: `# 請在實戰專題操作介面測試`
      },
      advancedChallenge: {
        question: "為清理函式增加一個移除重複相鄰行（Deduplication）的功能。",
        hint: "走訪清單時，若當前行與上一行相同則略過。",
        solution: `def dedup_lines(lines):\n    out = []\n    for l in lines:\n        if not out or l != out[-1]:\n            out.append(l)\n    return out`
      }
    },

    "6-2": {
      id: "6-2",
      stageId: 6,
      title: "專題二：文字統計工具（Text Statistics）",
      enTitle: "Project 2: Text Statistics",
      difficulty: "專題實戰",
      estTime: "20 分鐘",
      objectives: [
        "精確計算字元數（含/不含空白）、單字數與行數",
        "理解中英文混合統計時的空白與標點符號影響",
        "統計出現頻率最高的前 N 個字元"
      ],
      syntax: `char_count = len(text)
char_no_spaces = len(text.replace(" ", "").replace("\\n", ""))
words = len(text.split())`,
      description: `**專題目標**：
文字編輯器（如 Word 或 Medium）都需要提供字數統計功能。在繁體中文環境中，英文單字以空格為界，中文則以字元為界，兩者的統計邏輯需要仔細區分。

**核心功能**：
1. **字元總數（含空白）**：len(text)。
2. **純字元數（不含空白換行）**：過濾空白後的實際字數。
3. **單字數（Word Count）**：以空格與換行分割的單字數量。
4. **指定字元出現次數**：快速查詢特定字母或漢字出現幾次。
5. **最高頻率字元排行**：列出出現最多次的字元排行榜。`,
      codeSnippet: `def analyze_text(text):
    total_chars = len(text)
    no_space_chars = len([c for c in text if not c.isspace()])
    lines = len(text.splitlines()) if text else 0
    words = len(text.split())
    
    # 統計非空白字元頻率
    freq = {}
    for c in text:
        if not c.isspace():
            freq[c] = freq.get(c, 0) + 1
            
    top_char = max(freq, key=freq.get) if freq else None
    top_count = freq[top_char] if top_char else 0
    
    return {
        "總字元數": total_chars,
        "不含空白字元": no_space_chars,
        "行數": lines,
        "單字數": words,
        "最高頻字元": f"'{top_char}' ({top_count} 次)"
    }

sample = "Python 學習 很有趣！ Python is fun."
stats = analyze_text(sample)
for k, v in stats.items():
    print(f"{k}: {v}")`,
      expectedOutput: `總字元數: 29
不含空白字元: 24
行數: 1
單字數: 6
最高頻字元: 'n' (3 次)`,
      lineExplanations: [
        { line: 'no_space_chars = len([c for c in text if not c.isspace()])', desc: '利用 c.isspace() 判斷並排除空格、\\t 與換行。' },
        { line: 'words = len(text.split())', desc: 'split() 不傳引數時自動依連續空白拆分，計算單字總數。' },
        { line: 'max(freq, key=freq.get)', desc: '以出現次數為依據找出最高頻字元。' }
      ],
      commonMistakes: [
        {
          error: "誤以為中文文章的單字數等於中文字數",
          why: "中文語句中通常沒有空格分隔詞彙，`split()` 只會把連續的中文句子算作一個單字。",
          fix: "在繁體中文情境下，說明「字元數（不含空白）」代表中文字數，而「單字數」主要適用於英文。"
        }
      ],
      basicPractice: {
        question: "測試專題二：在「實戰專題」頁面切換至【文字統計工具】，輸入一段中英文夾雜文字觀察統計差異。",
        hint: "切換至專題頁籤操作。",
        solution: `# 請在實戰專題操作介面測試`
      },
      advancedChallenge: {
        question: "擴充統計工具，計算中文標點符號（，。！？）在文章中一共出現了幾次。",
        hint: "sum(text.count(p) for p in '，。！？')",
        solution: `sample = "你好，世界！今天天氣真好。"\npunc_count = sum(sample.count(p) for p in '，。！？')\nprint("標點符號總數:", punc_count)`
      }
    },

    "6-3": {
      id: "6-3",
      stageId: 6,
      title: "專題三：文字搜尋與替換工具（Search & Replace Diff）",
      enTitle: "Project 3: Search & Replace Tool",
      difficulty: "專題實戰",
      estTime: "20 分鐘",
      objectives: [
        "實作文字精準搜尋與出現次數統計",
        "支援全選替換與區分大小寫切換",
        "視覺化呈現處理前後的對比差異（Diff 視圖）"
      ],
      syntax: `import re
# 區分大小寫：
new_text = text.replace(target, replacement)
# 不區分大小寫：
new_text = re.sub(re.escape(target), replacement, text, flags=re.IGNORECASE)`,
      description: `**專題目標**：
打造一個具備即時預覽與前後差異對比（Diff）的文字替換工具。

**核心功能**：
1. **搜尋文字**：輸入關鍵字，即時回傳出現位置與總出現次數。
2. **條件替換**：提供「區分大小寫」與「不區分大小寫」切換開關。
3. **差異比對（Diff View）**：在前端以高亮色彩清楚標記被刪除（紅色刪除線）與新增（綠色底線）的內容。`,
      codeSnippet: `import re

def search_and_replace(text, search_str, replace_str, ignore_case=False):
    if not search_str:
        return text, 0
        
    if ignore_case:
        pattern = re.compile(re.escape(search_str), re.IGNORECASE)
        matches = len(pattern.findall(text))
        result = pattern.sub(replace_str, text)
    else:
        matches = text.count(search_str)
        result = text.replace(search_str, replace_str)
        
    return result, matches

original = "Python 2 已經停用，請全面改用 Python 3！"
new_text, count = search_and_replace(original, "python", "Python", ignore_case=True)
print(f"替換次數: {count}")
print("結果:", new_text)`,
      expectedOutput: `替換次數: 2
結果: Python 2 已經停用，請全面改用 Python 3！`,
      lineExplanations: [
        { line: 're.compile(re.escape(search_str), re.IGNORECASE)', desc: '使用 re.escape 確保搜尋關鍵字內的特殊符號（如 . 或 ?）被當作一般文字，並開啟不分大小寫旗標。' },
        { line: 'pattern.sub(replace_str, text)', desc: '執行正規表示式替換。' }
      ],
      commonMistakes: [
        {
          error: "若搜尋字串包含正則特殊符號（如 '.' 或 '*'）導致異常",
          why: "在正規表示式中，'.' 代表任意字元，未經轉義會誤匹配所有字母。",
          fix: "使用 `re.escape(search_str)` 進行安全轉義。"
        }
      ],
      basicPractice: {
        question: "測試專題三：在實戰專題切換至【文字搜尋與替換工具】，體驗 Diff 差異高亮標記。",
        hint: "在專題頁面輸入文字與欲替換關鍵字。",
        solution: `# 請在實戰專題操作介面測試`
      },
      advancedChallenge: {
        question: "在替換時若只想替換整詞（Word Boundary，例如換 'cat' 但不要換到 'caterpillar' 裡面的 cat），正則 pattern 該如何撰寫？",
        hint: "使用單字邊界符號 \\b，如 rf'\\b{re.escape(word)}\\b'。",
        solution: `import re\ns = "the cat in the caterpillar"\nres = re.sub(r"\\bcat\\b", "dog", s)\nprint(res)`
      }
    },

    "6-4": {
      id: "6-4",
      stageId: 6,
      title: "專題四：資料格式整理工具（Data Formatter）",
      enTitle: "Project 4: Delimiter & Data Formatter",
      difficulty: "專題實戰",
      estTime: "20 分鐘",
      objectives: [
        "解析以逗號、Tab 或垂直線分隔的不規則資料",
        "清除欄位內多餘空白並重新對齊",
        "一鍵將資料轉換為乾淨的 Markdown 表格或標準 CSV"
      ],
      syntax: `rows = [line.split(sep) for line in text.splitlines()]
clean_rows = [[col.strip() for col in row] for row in rows]`,
      description: `**專題目標**：
在資料處理流程中，經常遇到從網頁、PDF 或舊系統複製貼上的髒資料（各欄位包含不規則空格、混用分隔符）。本專題提供自動化整理功能。

**核心功能**：
1. **自訂輸入分隔符**：支援半形逗號（,）、全形逗號（，）、Tab（\\t）、空格或垂直線（|）。
2. **欄位空白修整**：自動清理每個儲存格前後的多餘空格。
3. **格式輸出轉換**：
   - 標準逗號 CSV
   - Markdown 語法表格（自動加上對齊線 \`| --- | --- |\`）
   - JSON 陣列物件`,
      codeSnippet: `def format_delimiter_data(raw_data, in_sep=",", out_format="csv"):
    lines = [line.strip() for line in raw_data.splitlines() if line.strip()]
    table = []
    for line in lines:
        cols = [c.strip() for c in line.split(in_sep)]
        table.append(cols)
        
    if not table:
        return ""
        
    if out_format == "csv":
        return "\\n".join(",".join(row) for row in table)
    elif out_format == "markdown":
        header = table[0]
        divider = ["---"] * len(header)
        md_lines = [
            "| " + " | ".join(header) + " |",
            "| " + " | ".join(divider) + " |"
        ]
        for row in table[1:]:
            md_lines.append("| " + " | ".join(row) + " |")
        return "\\n".join(md_lines)

raw_csv = """
姓名 ,   年齡 ,   城市   
小明 , 25 , 台北 
小華 ,   30,  高雄
"""
print("=== 轉為乾淨 Markdown 表格 ===")
print(format_delimiter_data(raw_csv, in_sep=",", out_format="markdown"))`,
      expectedOutput: `=== 轉為乾淨 Markdown 表格 ===
| 姓名 | 年齡 | 城市 |
| --- | --- | --- |
| 小明 | 25 | 台北 |
| 小華 | 30 | 高雄 |`,
      lineExplanations: [
        { line: 'cols = [c.strip() for c in line.split(in_sep)]', desc: '拆分每一行並對每個欄位去除前後空白。' },
        { line: '"| " + " | ".join(header) + " |"', desc: '組合成標準 Markdown 表格標頭語法。' }
      ],
      commonMistakes: [
        {
          error: "各行欄位數量不一致導致表格破損",
          why: "某一行少了逗號或多了逗號，造成欄位數參差不齊。",
          fix: "在進階實作中，應先計算最大欄位數，不足時自動補上空欄位。"
        }
      ],
      basicPractice: {
        question: "測試專題四：在實戰專題切換至【資料格式整理工具】，貼上一段髒資料轉換為 Markdown 表格。",
        hint: "在專題頁面操作。",
        solution: `# 請在實戰專題操作介面測試`
      },
      advancedChallenge: {
        question: "撰寫一段程式碼，將上面的 table 資料轉為包含字典的 JSON 格式清單（第一行為鍵值 Key）。",
        hint: "keys = table[0]; json_list = [dict(zip(keys, row)) for row in table[1:]]",
        solution: `keys = ["姓名", "年齡", "城市"]\nrow = ["小明", "25", "台北"]\nprint(dict(zip(keys, row)))`
      }
    },

    "6-5": {
      id: "6-5",
      stageId: 6,
      title: "專題五：文字分析挑戰（Text Analysis Suite）",
      enTitle: "Project 5: Text Analysis Challenge",
      difficulty: "專題挑戰",
      estTime: "25 分鐘",
      objectives: [
        "整合前五個階段所有字串技法",
        "產生完整的文字摘要分析報告",
        "體驗從純文字輸入到洞察產出的完整流程"
      ],
      syntax: `report = generate_analysis_report(article_text)`,
      description: `**專題目標**：
作為本課程的終極挑戰，專題五將字串基礎、清理、統計、正則表達式與格式化融會貫通，產生一份專業的文字分析儀表報告。

**分析維度**：
1. **基礎計量**：段落數、句子數、單字數、總字元數。
2. **詞彙豐富度（Type-Token Ratio）**：相異詞數 / 總詞數比例。
3. **關鍵字分析**：過濾停用詞後的詞頻排行榜。
4. **數字與特定格式偵測**：自動偵測文中出現的數字、電子郵件與日期。
5. **文字結構健檢**：警告過長句子或過多空白。`,
      codeSnippet: `import re

def comprehensive_analysis(text):
    paragraphs = [p for p in text.splitlines() if p.strip()]
    sentences = [s for s in re.split(r"[。！？!?\\n]", text) if s.strip()]
    words = re.findall(r"\\b\\w+\\b", text.lower())
    
    # 相異字詞
    unique_words = set(words)
    ttr = (len(unique_words) / len(words) * 100) if words else 0
    
    # 格式偵測
    dates = re.findall(r"\\d{4}-\\d{2}-\\d{2}", text)
    emails = re.findall(r"[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}", text)
    
    return f"""=============================
     文字結構分析摘要報告
=============================
- 段落數量：{len(paragraphs)} 段
- 句子數量：{len(sentences)} 句
- 詞彙總數：{len(words)} 個
- 相異詞數：{len(unique_words)} 個
- 詞彙多樣度 (TTR)：{ttr:.1f}%
- 偵測到日期：{', '.join(dates) if dates else '無'}
- 偵測到信箱：{', '.join(emails) if emails else '無'}
============================="""

sample_article = """2026-10-31 專案正式啟動！
這是一篇繁體中文文字分析範例。Python 提供了豐富的字串處理函式。
如有問題請聯絡 admin@example.com。祝學習愉快！"""

print(comprehensive_analysis(sample_article))`,
      expectedOutput: `=============================
     文字結構分析摘要報告
=============================
- 段落數量：3 段
- 句子數量：5 句
- 詞彙總數：12 個
- 相異詞數：12 個
- 詞彙多樣度 (TTR)：100.0%
- 偵測到日期：2026-10-31
- 偵測到信箱：admin@example.com
=============================`,
      lineExplanations: [
        { line: 'sentences = [s for s in re.split(r"[。！？!?\\n]", text) if s.strip()]', desc: '以中英文常見標點及換行符切分完整句子。' },
        { line: 'unique_words = set(words)', desc: '利用 set 集合天然去重特性計算相異詞數。' },
        { line: 'f"- 詞彙多樣度 (TTR)：{ttr:.1f}%"', desc: '以 f-string 格式化百分比輸出分析指標。' }
      ],
      commonMistakes: [
        {
          error: "除以零 ZeroDivisionError",
          why: "當輸入為完全空白或無單字時，計算 `len(unique_words) / len(words)` 會除以 0。",
          fix: "加入保護條件 `if words else 0`。"
        }
      ],
      basicPractice: {
        question: "測試專題五：前往「實戰專題」執行【文字分析挑戰】，輸入自訂文章取得分析摘要。",
        hint: "在專題頁面點選「執行綜合分析」。",
        solution: `# 請在實戰專題操作介面測試`
      },
      advancedChallenge: {
        question: "恭喜您完成全部課程！請前往「Python 程式碼實驗室」，結合所學撰寫一個屬於自己的字串處理函式並執行驗證。",
        hint: "點選頂部導覽列的「程式碼實驗室」開始探索！",
        solution: `print("字串大師挑戰達成！")`
      }
    }
  }
};

window.CURRICULUM_DATA = CURRICULUM_DATA;
