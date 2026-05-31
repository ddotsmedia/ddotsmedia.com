@echo off
REM ===== Ddotsmedia one-click deploy from Windows =====
REM Pushes local commits to GitHub, then SSHes into the VPS and runs deploy.sh.
REM Requires OpenSSH (built into Windows 11) and SSH access to the VPS as root.

setlocal
set VPS=root@194.164.151.202
set BRANCH=master
set CERTBOT_EMAIL=admin@ddotsmedia.com
REM If repo is private, set a token:  set GITHUB_TOKEN=ghp_xxxx
set GITHUB_TOKEN=

echo.
echo === 1/2  Pushing %BRANCH% to GitHub ===
git push origin %BRANCH%
if errorlevel 1 (
  echo Push failed - fix git first, aborting.
  exit /b 1
)

echo.
echo === 2/2  Running deploy.sh on %VPS% ===
ssh %VPS% "curl -fsSL https://raw.githubusercontent.com/ddotsmedia/ddotsmedia.com/%BRANCH%/deploy.sh -o /tmp/deploy.sh && CERTBOT_EMAIL=%CERTBOT_EMAIL% GITHUB_TOKEN=%GITHUB_TOKEN% bash /tmp/deploy.sh"

echo.
if errorlevel 1 (echo DEPLOY FAILED - see output above.) else (echo DONE: https://ddotsmedia.com)
endlocal
pause
