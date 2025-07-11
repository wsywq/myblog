@echo off
echo 正在启动个人博客系统...
echo.

REM 检查是否安装了Ruby
ruby --version >nul 2>&1
if errorlevel 1 (
    echo 错误：未找到Ruby，请先安装Ruby
    echo 下载地址：https://rubyinstaller.org/
    pause
    exit /b 1
)

REM 检查是否安装了Bundler
bundle --version >nul 2>&1
if errorlevel 1 (
    echo 正在安装Bundler...
    gem install bundler
)

REM 安装依赖
echo 正在安装依赖...
bundle install

REM 启动本地服务器
echo.
echo 启动本地服务器...
echo 访问地址：http://localhost:4000
echo 按 Ctrl+C 停止服务器
echo.
bundle exec jekyll serve --livereload 