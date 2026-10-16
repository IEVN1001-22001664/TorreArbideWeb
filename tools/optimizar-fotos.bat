@echo off
setlocal

if "%~1"=="" (
  set "TARGET=%~dp0"
) else (
  set "TARGET=%~1"
)

python "%~dp0optimizar-fotos.py" "%TARGET%"

echo.
pause
