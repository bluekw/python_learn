"""
Python 初學到進階 (Python Beginner to Advanced)
互動練習題庫驗證測試 (Quiz Verification Test)

用途：
驗證 js/quiz-data.js 內所有題目資料結構、選項邊界、答案有效性與解析完整度。
"""

import sys
import json
import subprocess
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

def get_quizzes_via_node():
    js_cmd = "window={}; require('./js/quiz-data.js'); console.log(JSON.stringify(window.QUIZ_DATA));"
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    res = subprocess.run(["node", "-e", js_cmd], cwd=base_dir, capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        raise RuntimeError(f"Node.js 執行失敗: {res.stderr}")
    return json.loads(res.stdout)

def main():
    print("=" * 60)
    print("開始執行互動練習題庫驗證測試")
    print("=" * 60)

    try:
        quizzes = get_quizzes_via_node()
    except Exception as e:
        print(f"錯誤：無法載入題庫資料：{e}")
        sys.exit(1)

    print(f"成功載入 {len(quizzes)} 道題目。\n")

    valid_types = {"single", "multiple", "fill", "reading", "prediction", "debugging", "coding"}
    passed = 0
    errors = []

    for q in quizzes:
        qid = q.get("id")
        qtype = q.get("type")
        prompt = q.get("prompt")
        answer = q.get("answer")
        options = q.get("options")
        explanation = q.get("explanation")

        if not qid or not prompt:
            errors.append(f"題目 [{qid}] 缺少 id 或 prompt！")
            continue

        if qtype not in valid_types:
            errors.append(f"題目 [{qid}] 型態 '{qtype}' 不在允許的 7 大題型清單中！")
            continue

        if qtype == "fill":
            if not isinstance(answer, str) or not answer.strip():
                errors.append(f"填空題 [{qid}] 答案必須為非空字串！")
                continue
        elif qtype == "multiple":
            if not isinstance(options, list) or len(options) < 2:
                errors.append(f"多選題 [{qid}] 選項數量少於 2 個！")
                continue
            if not isinstance(answer, list) or len(answer) == 0:
                errors.append(f"多選題 [{qid}] 答案必須為包含正解索引之非空陣列！")
                continue
            for idx in answer:
                if not (0 <= idx < len(options)):
                    errors.append(f"多選題 [{qid}] 答案索引 {idx} 超出選項範圍 [0, {len(options)-1}]！")
        else: # single, reading, prediction, debugging, coding
            if not isinstance(options, list) or len(options) < 2:
                errors.append(f"選擇題 [{qid}] 選項數量少於 2 個！")
                continue
            if not isinstance(answer, int) or not (0 <= answer < len(options)):
                errors.append(f"選擇題 [{qid}] 答案索引 {answer} 超出選項範圍 [0, {len(options)-1}]！")
                continue

        if not explanation or len(explanation) < 10:
            errors.append(f"題目 [{qid}] 缺少正解詳細說明或字數不足！")
            continue

        passed += 1

    print(f"驗證結果：通過 {passed} 題，發現 {len(errors)} 個問題。")
    if errors:
        for err in errors:
            print(f"❌ {err}")
        sys.exit(1)
    else:
        print("🎉 恭喜！所有練習題庫資料結構與答案邊界 100% 驗證通過！")
        sys.exit(0)

if __name__ == "__main__":
    main()
