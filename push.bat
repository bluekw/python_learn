@echo off
chcp 65001 >nul
echo ========================================================
echo   正在上傳至 GitHub: https://github.com/bluekw/python_learn
echo ========================================================
echo.
cd /d "C:\python_learn"
git branch -M main
echo 執行推送指令: git push -u origin main
echo （若系統彈出瀏覽器登入授權視窗，請點選 Authorize 登入）
echo --------------------------------------------------------
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   🎉 程式碼已成功推送至 GitHub！
    echo ========================================================
    echo.
    echo 正在為您打開 GitHub Pages 設定頁面...
    start https://github.com/bluekw/python_learn/settings/pages
    echo.
    echo 【最後一個步驟：啟用 GitHub Pages】
    echo 1. 在打開的瀏覽器設定頁面中：
    echo    找到「Build and deployment」區塊。
    echo 2. 將「Source」下拉選單切換為「GitHub Actions」。
    echo 3. GitHub Actions 會自動完成測試與部署（約需 1~2 分鐘）。
    echo.
    echo 🌐 部署完成後，您的正式網站網址為：
    echo 👉 https://bluekw.github.io/python_learn/
    echo ========================================================
) else (
    echo.
    echo ❌ 推送未完成，請確認您已登入 GitHub 並且為該倉庫擁有者。
)
pause
