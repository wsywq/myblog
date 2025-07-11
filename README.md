# 个人博客系统

一个基于Jekyll的现代化个人博客系统，支持Markdown格式的博文、自定义图片显示、时间日期显示、字数统计和访问量记录等功能。

## ✨ 功能特性

### 📝 内容管理
- **Markdown支持**：完整的Markdown语法支持，包括代码高亮、数学公式、表格等
- **图片管理**：支持本地和外部图片，自动优化和懒加载
- **分类标签**：完整的文章分类和标签系统
- **草稿管理**：支持草稿文章和预览功能

### 📊 数据统计
- **字数统计**：自动统计文章字数，支持中英文混合统计
- **访问量记录**：页面访问统计和文章阅读量
- **时间显示**：发布时间、更新时间，支持相对时间显示
- **阅读时间**：基于字数自动估算阅读时间

### 🔍 用户体验
- **全文搜索**：支持文章标题和内容搜索，实时高亮显示
- **文章目录**：自动生成文章目录，支持滚动高亮
- **相关推荐**：基于标签和分类推荐相关文章
- **响应式设计**：完美适配PC、平板、手机等设备

### 🎨 界面设计
- **现代化主题**：简洁美观的卡片式布局
- **深色模式**：支持深色/浅色主题切换
- **平滑动画**：优雅的过渡效果和交互反馈
- **可读性优化**：合理的字体、间距和视觉层级

### ⚡ 性能优化
- **静态生成**：基于Jekyll的静态站点生成
- **图片优化**：自动压缩、WebP支持、渐进式加载
- **资源压缩**：CSS、JavaScript文件压缩和合并
- **SEO优化**：完整的meta标签和结构化数据

## 🛠️ 技术栈

### 核心框架
- **Jekyll 4.x** - 静态站点生成器
- **Bootstrap 5** - 响应式CSS框架
- **原生JavaScript** - 轻量级交互功能

### 功能增强
- **Prism.js** - 代码语法高亮
- **KaTeX** - 数学公式渲染
- **Lazy Loading** - 图片懒加载
- **LocalStorage** - 本地数据存储

### 部署平台
- **GitHub Pages** - 免费静态网站托管
- **GitHub Actions** - 自动化构建部署
- **Cloudflare** - CDN加速（可选）

## 📁 项目结构

```
myblog/
├── _posts/                    # Markdown文章目录
├── _layouts/                  # 页面布局模板
├── _includes/                 # 可复用组件
├── _sass/                    # Sass样式文件
├── assets/                   # 静态资源
│   ├── css/                 # 编译后的CSS文件
│   ├── js/                  # JavaScript文件
│   ├── images/              # 图片资源
│   └── fonts/               # 字体文件
├── _config.yml              # Jekyll配置文件
├── index.html               # 首页
├── about.html               # 关于页面
├── categories.html          # 分类页面
├── tags.html                # 标签页面
├── search.html              # 搜索页面
└── 404.html                # 404错误页面
```

## 🚀 快速开始

### 环境要求
- Ruby 2.5.0 或更高版本
- RubyGems
- Git

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/wsywq/myblog.git
cd myblog
```

2. **安装依赖**
```bash
bundle install
```

3. **启动本地服务器**
```bash
bundle exec jekyll serve
```

4. **访问网站**
打开浏览器访问 `http://localhost:4000`

### 部署到GitHub Pages

1. **创建GitHub仓库**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/wsywq/myblog.git
git push -u origin main
```

2. **配置GitHub Pages**
- 进入仓库设置
- 找到Pages选项
- 选择Source为GitHub Actions

3. **自动部署**
项目已配置GitHub Actions，推送代码到main分支后会自动构建和部署。

## 📝 使用指南

### 创建新文章

1. 在 `_posts/` 目录下创建新的Markdown文件
2. 文件名格式：`YYYY-MM-DD-title.md`
3. 添加Front Matter：

```yaml
---
layout: post
title: "文章标题"
date: 2024-01-15 10:00:00
categories: [技术]
tags: [前端, JavaScript]
description: "文章描述"
image: /assets/images/posts/featured-image.jpg
author: "作者名"
---
```

### 添加图片

1. 将图片文件放入 `assets/images/posts/` 目录
2. 在文章中使用：
```markdown
![图片描述](/assets/images/posts/image-name.jpg)
```

### 自定义配置

编辑 `_config.yml` 文件来自定义网站设置：

```yaml
# 网站基本信息
title: "我的个人博客"
description: "分享技术文章和生活感悟"
author: "你的名字"
url: "https://wsywq.github.io"

# 社交媒体
social:
  github: wsywq
  twitter: wsywq
  email: wsywq94@163.com

# 分析工具
analytics:
  google: "GA_MEASUREMENT_ID"
```

## 🎨 主题定制

### 颜色主题
在 `_sass/_variables.scss` 中修改颜色变量：

```scss
// 主色调
$primary-color: #007bff;
$secondary-color: #6c757d;

// 深色主题
$dark-bg: #1a1a1a;
$dark-text: #ffffff;
```

### 布局修改
- 修改 `_layouts/` 目录下的布局文件
- 调整 `_includes/` 目录下的组件
- 更新 `_sass/` 目录下的样式文件

## 📊 功能配置

### 搜索功能
搜索功能基于JavaScript实现，支持：
- 全文搜索
- 实时结果
- 关键词高亮
- 搜索历史

### 访问统计
使用LocalStorage实现本地访问统计：
- 页面访问次数
- 文章阅读量
- 访问时间记录

### SEO优化
- 完整的meta标签配置
- Open Graph和Twitter Card支持
- JSON-LD结构化数据
- 自动生成sitemap.xml

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 开发流程
1. Fork 这个项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用 Apache 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Jekyll](https://jekyllrb.com/) - 静态站点生成器
- [Bootstrap](https://getbootstrap.com/) - CSS框架
- [Prism.js](https://prismjs.com/) - 代码高亮
- [GitHub Pages](https://pages.github.com/) - 免费托管服务

## 📞 联系方式

- 邮箱：wsywq94@163.com
- GitHub：[@wsywq](https://github.com/wsywq)
- 博客：[https://wsywq.github.io](https://wsywq.github.io)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
