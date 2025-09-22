@echo off
echo Building Android APK for Learn Hebrew English Play...
echo.

echo Step 1: Building web assets...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build web assets
    pause
    exit /b 1
)

echo Step 2: Syncing with Capacitor...
call npx cap sync android
if %errorlevel% neq 0 (
    echo Error: Failed to sync with Capacitor
    pause
    exit /b 1
)

echo Step 3: Opening Android Studio...
call npx cap open android

echo.
echo Instructions:
echo 1. Wait for Android Studio to load the project
echo 2. Go to Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
echo 3. APK will be created in android/app/build/outputs/apk/debug/
echo.
pause


