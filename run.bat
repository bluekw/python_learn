@echo off
chcp 65001 >nul
echo ========================================================
echo   正在啟動「Python 初學到進階」本機教學網站...
echo ========================================================
cd /d "C:\python_learn"
start http://localhost:8080
echo.
echo 伺服器已在 http://localhost:8080 啟動！
echo 瀏覽器已自動為您開啟網站。
echo.
echo 【提示】若要停止網站伺服器，請在此視窗中按下 Ctrl + C。
echo ========================================================
echo.
py -3 -m http.server 8080
pause
