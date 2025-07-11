# 项目结构说明

## 📁 目录结构

```
myblog/
├── _config.yml              # Jekyll配置文件
├── Gemfile                  # Ruby依赖管理
├── README.md               # 项目说明文档
├── LICENSE                 # Apache 2.0许可证
├── start.bat              # Windows启动脚本
├── start.sh               # Linux/Mac启动脚本
├── robots.txt             # 搜索引擎爬虫规则
├── .gitignore             # Git忽略文件
├── index.html             # 网站首页
├── about.html             # 关于页面
│
├── _layouts/              # 布局文件
│   ├── default.html       # 默认布局
│   ├── post.html          # 文章布局
│   ├── page.html          # 页面布局
│   └── home.html          # 首页布局
│
├── _includes/             # 组件文件
│   ├── header.html        # 网站头部
│   ├── footer.html        # 网站底部
│   ├── sidebar.html       # 侧边栏
│   └── post-card.html     # 文章卡片
│
├── _posts/               # 文章目录
│   └── 2024-01-15-welcome-to-my-blog.md  # 示例文章
│
├── _sass/                # Sass样式文件
│   ├── _variables.scss   # 变量定义
│   ├── _base.scss        # 基础样式
│   ├── _layout.scss      # 布局样式
│   ├── _components.scss  # 组件样式
│   └── _utilities.scss   # 工具类样式
│
├── assets/               # 静态资源
│   ├── css/
│   │   └── main.scss     # 主样式文件
│   ├── js/
│   │   ├── main.js       # 主要JavaScript
│   │   ├── search.js     # 搜索功能
│   │   └── analytics.js  # 访问统计
│   └── images/           # 图片资源（需要创建）
│       ├── logo.png      # 网站Logo
│       ├── avatar.jpg    # 作者头像
│       ├── favicon.ico   # 网站图标
│       └── posts/        # 文章图片
│
├── .github/              # GitHub配置
│   └── workflows/
│       └── deploy.yml    # 自动部署配置
│
└── 个人博客项目需求文档.md  # 详细需求文档
```

## 🎯 核心功能模块

### 1. 布局系统 (`_layouts/`)
- **default.html**: 基础HTML结构，包含SEO、分析、脚本等
- **post.html**: 文章页面布局，包含标题、元信息、目录、分享等
- **page.html**: 普通页面布局，简洁的页面展示
- **home.html**: 首页布局，包含欢迎区域、文章列表、分类统计

### 2. 组件系统 (`_includes/`)
- **header.html**: 导航栏、搜索框、主题切换
- **footer.html**: 版权信息、社交媒体、订阅、统计
- **sidebar.html**: 作者信息、分类、标签云、热门文章
- **post-card.html**: 文章卡片组件，用于列表展示

### 3. 样式系统 (`_sass/`)
- **variables.scss**: 颜色、字体、间距等变量定义
- **base.scss**: 全局重置、基础样式、深色主题
- **layout.scss**: 头部、首页、文章、侧边栏、页脚样式
- **components.scss**: 卡片、按钮、搜索、标签等组件样式
- **utilities.scss**: 间距、文本、显示、位置等工具类

### 4. 功能脚本 (`assets/js/`)
- **main.js**: 主题切换、访问统计、图片懒加载、代码高亮
- **search.js**: 全文搜索功能，支持实时搜索和结果高亮
- **analytics.js**: 访问统计、字数统计、阅读时间估算

### 5. 配置文件
- **_config.yml**: Jekyll主配置，包含网站信息、插件、分页等
- **Gemfile**: Ruby依赖管理，包含Jekyll和相关插件
- **robots.txt**: 搜索引擎爬虫规则
- **.gitignore**: Git版本控制忽略文件

## 🚀 快速开始

### 环境要求
- Ruby 3.0+
- Bundler
- Git

### 安装步骤

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
   # Windows
   start.bat
   
   # Linux/Mac
   chmod +x start.sh
   ./start.sh
   ```

4. **访问网站**
   打开浏览器访问 `http://localhost:4000`

## 📝 创建新文章

在 `_posts/` 目录下创建新的Markdown文件：

```markdown
---
layout: post
title: "文章标题"
date: 2024-01-15 10:00:00
categories: [分类]
tags: [标签1, 标签2]
description: "文章描述"
image: /assets/images/posts/example.jpg
author: "作者名"
---

文章内容...
```

## 🎨 自定义配置

### 修改网站信息
编辑 `_config.yml` 文件：

```yaml
title: "你的博客标题"
description: "博客描述"
author: "你的名字"
email: "wsywq94@163.com"
url: "https://wsywq.github.io"
```

### 修改主题颜色
编辑 `_sass/_variables.scss` 文件：

```scss
$primary-color: #007bff;    // 主色调
$secondary-color: #6c757d;  // 次要色调
```

### 添加社交媒体
在 `_config.yml` 中添加：

```yaml
social:
  github: wsywq
  email: wsywq94@163.com
```

## 🔧 部署到GitHub Pages

1. **推送到GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库设置
   - 找到Pages选项
   - 选择Source为GitHub Actions

3. **自动部署**
   - 每次推送到main分支会自动触发部署
   - 部署完成后可通过 `https://wsywq.github.io` 访问

## 📊 功能特性

### ✅ 已实现功能
- [x] 响应式设计
- [x] 深色/浅色主题切换
- [x] 全文搜索
- [x] 访问统计
- [x] 字数统计
- [x] 阅读时间估算
- [x] 文章目录
- [x] 代码高亮
- [x] 数学公式渲染
- [x] 图片懒加载
- [x] SEO优化
- [x] 社交媒体分享
- [x] 分类和标签系统
- [x] 相关文章推荐
- [x] 自动部署

### 🔄 待开发功能
- [ ] 评论系统
- [ ] 邮件订阅
- [ ] 多语言支持
- [ ] 高级搜索过滤
- [ ] 文章归档页面
- [ ] 标签云页面
- [ ] 站点地图
- [ ] RSS订阅

## 🛠️ 开发指南

### 添加新页面
1. 在根目录创建HTML文件
2. 添加YAML前置数据
3. 选择适当的布局

### 添加新组件
1. 在 `_includes/` 创建HTML文件
2. 使用 `{% include filename.html %}` 引用

### 修改样式
1. 编辑对应的Sass文件
2. 重新编译样式：`bundle exec jekyll build`

### 添加JavaScript功能
1. 在 `assets/js/` 创建JS文件
2. 在布局文件中引入
3. 确保功能与现有代码兼容

## 📚 技术栈

- **静态站点生成器**: Jekyll 4.x
- **CSS框架**: Bootstrap 5
- **样式预处理**: Sass
- **代码高亮**: Prism.js
- **数学公式**: KaTeX
- **图标**: Bootstrap Icons
- **字体**: Google Fonts (Noto Sans SC)
- **部署**: GitHub Pages + Actions

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 📄 许可证

本项目采用 Apache 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。 