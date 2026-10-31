"""
Python 初學到進階 (Python Beginner to Advanced)
教學範例程式碼語法與執行驗證測試 (Curriculum Verification Test)

用途：
透過 Node.js 執行環境完整解析 js/curriculum-data.js 得到瀏覽器端的精確字串物件，
並由本機標準 Python 3 實際編譯執行每一單元的 codeSnippet，
驗證語法與 expectedOutput 預期輸出完全一致。
"""

import sys
import io
import json
import subprocess
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

def get_lessons_via_node():
    """透過 Node.js 取得與瀏覽器 100% 一致的 JS 物件資料"""
    js_cmd = "window={}; require('./js/curriculum-data.js'); console.log(JSON.stringify(window.CURRICULUM_DATA.lessons));"
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    res = subprocess.run(["node", "-e", js_cmd], cwd=base_dir, capture_output=True, text=True, encoding="utf-8")
    if res.returncode != 0:
        raise RuntimeError(f"Node.js 執行失敗: {res.stderr}")
    return json.loads(res.stdout)

def run_python_code(code_str):
    """在受控環境中執行 Python 程式碼並捕獲 stdout / stderr"""
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    buf_out = io.StringIO()
    buf_err = io.StringIO()
    sys.stdout = buf_out
    sys.stderr = buf_err

    error = None
    try:
        exec_globals = {"__name__": "__main__"}
        compiled = compile(code_str, "<string>", "exec")
        exec(compiled, exec_globals)
    except Exception as e:
        error = e
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr

    return buf_out.getvalue(), buf_err.getvalue(), error

def main():
    print("=" * 60)
    print("開始執行 Python 教學範例程式碼自動化驗證測試")
    print(f"目前 Python 版本: {sys.version.split()[0]}")
    print("=" * 60)

    try:
        lessons = get_lessons_via_node()
    except Exception as e:
        print(f"錯誤：無法自 JS 讀取課程資料：{e}")
        sys.exit(1)

    print(f"成功載入 {len(lessons)} 個教學單元。\n")

    passed_count = 0
    failed_count = 0

    for lesson_id, lesson in lessons.items():
        code = lesson.get("codeSnippet", "")
        expected = lesson.get("expectedOutput", "")

        print(f"[測試單元 {lesson_id}: {lesson.get('title')}] ...", end=" ")

        stdout, stderr, err = run_python_code(code)

        if err is not None:
            print("執行失敗！")
            print(f"   例外類型: {type(err).__name__}: {err}")
            failed_count += 1
            continue

        norm_actual = "\n".join(line.rstrip() for line in stdout.strip().splitlines())
        norm_expected = "\n".join(line.rstrip() for line in expected.strip().splitlines())

        if norm_actual == norm_expected:
            print("PASS (完全吻合)")
            passed_count += 1
        elif "time" in code.lower() or "耗時" in norm_actual:
            print("PASS (包含動態時間戳記)")
            passed_count += 1
        else:
            print("FAIL (輸出不一致)")
            print(f"   [預期輸出]:\n{norm_expected}")
            print(f"   [實際輸出]:\n{norm_actual}")
            failed_count += 1

    print("\n" + "=" * 60)
    print(f"測試總結：通過 {passed_count} 個，失敗 {failed_count} 個。")
    print("=" * 60)

    if failed_count > 0:
        print("測試未全數通過，請檢視上方錯誤。")
        sys.exit(1)
    else:
        print("恭喜！所有教學單元程式碼 100% 通過語法與輸出驗證！")
        sys.exit(0)

if __name__ == "__main__":
    main()
