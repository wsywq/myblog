// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initTheme();
    
    // 初始化访问统计
    initAnalytics();
    
    // 初始化图片懒加载
    initLazyLoading();
    
    // 初始化代码高亮
    initCodeHighlighting();
    
    // 初始化数学公式渲染
    initMathRendering();
});

// 主题切换功能
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // 获取保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    }
}

function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'bi bi-sun';
        }
    } else {
        body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'bi bi-moon';
        }
    }
    
    localStorage.setItem('theme', theme);
}

// 访问统计功能
function initAnalytics() {
    const currentPath = window.location.pathname;
    const pageKey = 'page_views_' + currentPath;
    
    // 增加访问量
    let views = localStorage.getItem(pageKey) || 0;
    views = parseInt(views) + 1;
    localStorage.setItem(pageKey, views);
    
    // 更新总访问量
    updateTotalViews();
    
    // 更新页面访问量显示
    updatePageViews(currentPath, views);
}

function updateTotalViews() {
    const totalViewsElement = document.getElementById('total-views');
    if (totalViewsElement) {
        let totalViews = 0;
        
        // 计算所有页面的访问量总和
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('page_views_')) {
                totalViews += parseInt(localStorage.getItem(key) || 0);
            }
        }
        
        totalViewsElement.textContent = totalViews;
    }
}

function updatePageViews(path, views) {
    const viewElements = document.querySelectorAll(`[data-url="${path}"]`);
    viewElements.forEach(element => {
        element.textContent = views;
    });
}

// 图片懒加载功能
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // 降级处理
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// 代码高亮功能
function initCodeHighlighting() {
    // 使用Prism.js进行代码高亮
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
        
        // 添加复制按钮
        addCopyButtons();
    }
}

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        if (!pre.querySelector('.copy-button')) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button btn btn-sm btn-outline-secondary';
            copyButton.textContent = '复制';
            copyButton.style.position = 'absolute';
            copyButton.style.top = '10px';
            copyButton.style.right = '10px';
            
            copyButton.addEventListener('click', function() {
                copyToClipboard(block.textContent);
                copyButton.textContent = '已复制';
                setTimeout(() => {
                    copyButton.textContent = '复制';
                }, 2000);
            });
            
            pre.style.position = 'relative';
            pre.appendChild(copyButton);
        }
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // 降级处理
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// 数学公式渲染功能
function initMathRendering() {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
    }
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 页面加载进度条
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #007bff, #28a745);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 100));
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initProgressBar();
    initSmoothScroll();
}); 