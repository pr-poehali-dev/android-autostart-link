@echo off
chcp 1251 >nul
setlocal EnableDelayedExpansion

:: ========================================
:: Скрипт выгрузки файла 45.pos из Кассир 5
:: ========================================

:: Настройки путей
set "SOURCE_PATH=C:\Program Files\Kassa5"
set "FILE_NAME=45.pos"
set "TARGET_PATH=\\192.168.0.3\Update\CJlaBa"
set "LOG_FILE=%~dp0kassir5_sync_log.txt"

:: Заголовок
echo ========================================
echo   Выгрузка данных из Кассир 5
echo ========================================
echo.

:: Логирование времени запуска
echo [%date% %time%] Запуск скрипта >> "%LOG_FILE%"

:: Проверка существования исходной папки
echo Проверка исходной папки...
if not exist "%SOURCE_PATH%" (
    echo [ОШИБКА] Папка Кассир 5 не найдена: %SOURCE_PATH%
    echo [%date% %time%] ОШИБКА: Исходная папка не найдена >> "%LOG_FILE%"
    pause
    exit /b 1
)
echo [OK] Папка найдена: %SOURCE_PATH%

:: Проверка существования файла
echo.
echo Проверка файла %FILE_NAME%...
if not exist "%SOURCE_PATH%\%FILE_NAME%" (
    echo [ОШИБКА] Файл %FILE_NAME% не найден в папке Кассир 5
    echo [%date% %time%] ОШИБКА: Файл %FILE_NAME% не найден >> "%LOG_FILE%"
    pause
    exit /b 1
)
echo [OK] Файл найден

:: Проверка доступности сетевой папки
echo.
echo Проверка доступности сетевой папки...
if not exist "%TARGET_PATH%" (
    echo [ПРЕДУПРЕЖДЕНИЕ] Сетевая папка недоступна: %TARGET_PATH%
    echo Попытка создания папки...
    mkdir "%TARGET_PATH%" 2>nul
    if errorlevel 1 (
        echo [ОШИБКА] Не удалось получить доступ к сетевой папке
        echo [%date% %time%] ОШИБКА: Сетевая папка недоступна >> "%LOG_FILE%"
        pause
        exit /b 1
    )
)
echo [OK] Сетевая папка доступна

:: Получение размера файла
for %%A in ("%SOURCE_PATH%\%FILE_NAME%") do set FILE_SIZE=%%~zA
echo Размер файла: %FILE_SIZE% байт

:: Перемещение файла
echo.
echo Перемещение файла...
move /Y "%SOURCE_PATH%\%FILE_NAME%" "%TARGET_PATH%\%FILE_NAME%" >nul 2>&1

:: Проверка результата
if errorlevel 1 (
    echo [ОШИБКА] Не удалось переместить файл
    echo [%date% %time%] ОШИБКА: Перемещение не выполнено >> "%LOG_FILE%"
    pause
    exit /b 1
)

:: Проверка что файл действительно в целевой папке
if exist "%TARGET_PATH%\%FILE_NAME%" (
    echo [УСПЕХ] Файл успешно перемещен!
    echo Целевая папка: %TARGET_PATH%
    echo [%date% %time%] УСПЕХ: Файл перемещен. Размер: %FILE_SIZE% байт >> "%LOG_FILE%"
) else (
    echo [ОШИБКА] Файл не найден в целевой папке
    echo [%date% %time%] ОШИБКА: Файл не обнаружен после перемещения >> "%LOG_FILE%"
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Операция завершена успешно
echo ========================================
echo.
echo Лог операций сохранен: %LOG_FILE%
echo.

:: Ожидание 3 секунды перед закрытием
timeout /t 3 /nobreak >nul
exit /b 0
