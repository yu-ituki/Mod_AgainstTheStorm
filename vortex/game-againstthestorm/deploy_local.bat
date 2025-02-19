:: VORTEXのプラグインインストール先.
:: https://www.nexusmods.com/about/vortex のやつでインストールするとデフォでここになる.
:: github版は知らん.
set "VORTEX_PLUGINS=%AppData%\Vortex\plugins"

:: 以下処理..
set "CURRENT_DIR=%~dp0"
for %%I in (%~dp0.) do set "CURRENT_FOLDER=%%~nxI"

:: Vortex拡張機能はシンボリックリンクが対応していない...
:: 仕方ないので物理コピーでやる...
::mklink /J "%VORTEX_PLUGINS%\%CURRENT_FOLDER%" "%CURRENT_DIR%"
::icacls "%VORTEX_PLUGINS%\%CURRENT_FOLDER%" /grant Everyone:F /T /C
mkdir "%VORTEX_PLUGINS%\%CURRENT_FOLDER%" 2>nul
xcopy "%CURRENT_DIR%\*" "%VORTEX_PLUGINS%\%CURRENT_FOLDER%\" /E /H /C /I /Y

pause
