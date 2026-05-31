@echo off
REM ===== Ddotsmedia one-click deploy from Windows =====
REM Pushes local commits to GitHub, then SSHes into the VPS and runs deploy.sh.
REM Requires OpenSSH (built into Windows 11) and SSH access to the VPS as root.

setlocal
cd /d "%~dp0"

set VPS=root@194.164.151.202
set BRANCH=master
set CERTBOT_EMAIL=admin@ddotsmedia.com
REM If repo is private, set a token:  set GITHUB_TOKEN=ghp_xxxx
set GITHUB_TOKEN=

echo.
echo Project: %CD%
echo.

REM --- prerequisite checks ---
where git >nul 2>&1 || (echo [ERROR] git not found on PATH. Install Git for Windows. & goto :end)
where ssh >nul 2>&1 || (echo [ERROR] ssh not found. Enable "OpenSSH Client" in Windows Optional Features. & goto :end)

echo === 1/2  Pushing %BRANCH% to GitHub ===
git push origin %BRANCH%
if errorlevel 1 (echo [ERROR] git push failed - see above. & goto :end)

echo.
echo === 2/2  Running deploy.sh on %VPS% ===
ssh %VPS% "curl -fsSL https://raw.githubusercontent.com/ddotsmedia/ddotsmedia.com/%BRANCH%/deploy.sh -o /tmp/deploy.sh && CERTBOT_EMAIL=%CERTBOT_EMAIL% GITHUB_TOKEN=%GITHUB_TOKEN% bash /tmp/deploy.sh"
if errorlevel 1 (echo [ERROR] remote deploy failed - see above.) else (echo DONE: https://ddotsmedia.com)

:end
echo.
pause
endlocal
