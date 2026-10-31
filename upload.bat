@echo off
title GitHub Pages Upload
cls
echo ========================================================
echo   Uploading to https://github.com/bluekw/python_learn
echo ========================================================
echo.
cd /d "C:\python_learn"
git branch -M main
echo Running: git push -u origin main
echo (If a browser window pops up, please sign in and click Authorize)
echo --------------------------------------------------------
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Code pushed to GitHub successfully!
    echo ========================================================
    echo.
    echo Opening GitHub Pages Settings in browser...
    start https://github.com/bluekw/python_learn/settings/pages
    echo.
    echo FINAL STEP:
    echo Under "Build and deployment" -> "Source", select "GitHub Actions"
    echo.
    echo Your site will be published at:
    echo https://bluekw.github.io/python_learn/
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. Please check your GitHub login credentials.
)
echo.
pause
