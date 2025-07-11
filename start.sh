#!/bin/bash

echo "正在启动个人博客系统..."
echo

# 检查是否安装了Ruby
if ! command -v ruby &> /dev/null; then
    echo "错误：未找到Ruby，请先安装Ruby"
    echo "Ubuntu/Debian: sudo apt-get install ruby ruby-dev"
    echo "CentOS/RHEL: sudo yum install ruby ruby-devel"
    echo "macOS: brew install ruby"
    exit 1
fi

# 检查是否安装了Bundler
if ! command -v bundle &> /dev/null; then
    echo "正在安装Bundler..."
    gem install bundler
fi

# 安装依赖
echo "正在安装依赖..."
bundle install

# 启动本地服务器
echo
echo "启动本地服务器..."
echo "访问地址：http://localhost:4000"
echo "按 Ctrl+C 停止服务器"
echo
bundle exec jekyll serve --livereload 