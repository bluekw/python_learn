@echo off
chcp 65001 >nul
echo ========================================================
echo   GitHub Pages 發布小幫手 (Deploy to GitHub Pages)
echo ========================================================
echo.
echo 請先確認您已在 GitHub 網站上建立了一個空白 Repository：
echo 建立網址：https://github.com/new
echo.
set /p GH_USER=1. 請輸入您的 GitHub 帳號名稱 (Username): 
if "%GH_USER%"=="" goto error

set /p GH_REPO=2. 請輸入您的 Repository 倉庫名稱 (預設直接按 Enter 為 python_learn): 
if "%GH_REPO%"=="" set GH_REPO=python_learn

echo.
echo 設定遠端倉庫網址：https://github.com/%GH_USER%/%GH_REPO%.git
git remote remove origin 2>nul
git remote add origin https://github.com/%GH_USER%/%GH_REPO%.git
git branch -M main

echo.
echo 正在將程式碼推送至 GitHub main 分支...
echo （若系統彈出 GitHub 登入驗證視窗，請依照畫面完成登入授權）
echo --------------------------------------------------------
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   🎉 [推送成功] 專案已成功上傳至 GitHub！
    echo ========================================================
    echo.
    echo 【最後一個步驟：啟用 GitHub Pages】
    echo 1. 請前往您的倉庫設定頁面：
    echo    https://github.com/%GH_USER%/%GH_REPO%/settings/pages
    echo.
    echo 2. 在「Build and deployment」區塊中的「Source」下拉選單：
    echo    請將預設的「Deploy from a branch」切換為「GitHub Actions」
    echo.
    echo 3. GitHub Actions 會自動執行測試並部署，約 1~2 分鐘後即可上線！
    echo.
    echo 🌐 您的正式 GitHub Pages 網址將為：
    echo    https://%GH_USER%.github.io/%GH_REPO%/
    echo ========================================================
) else (
    echo.
    echo ❌ 推送未完成。請確認：
    echo 1. 該 Repository 是否已在 GitHub 上建立。
    echo 2. 帳號名稱與倉庫名稱是否拼寫正確。
    echo 3. 是否具備該倉庫的寫入權限。
)

goto end

:error
echo [錯誤] 帳號名稱不可為空，已取消操作。

:end
pause
