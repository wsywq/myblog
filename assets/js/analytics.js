// 访问统计功能
class BlogAnalytics {
  constructor() {
    this.currentPath = window.location.pathname;
    this.analyticsData = this.loadAnalyticsData();
    
    this.init();
  }
  
  init() {
    this.recordPageView();
    this.updateAnalytics();
    this.bindEvents();
  }
  
  // 加载统计数据
  loadAnalyticsData() {
    const data = localStorage.getItem('blog_analytics');
    return data ? JSON.parse(data) : {
      totalViews: 0,
      pageViews: {},
      visitHistory: [],
      lastVisit: null
    };
  }
  
  // 保存统计数据
  saveAnalyticsData() {
    localStorage.setItem('blog_analytics', JSON.stringify(this.analyticsData));
  }
  
  // 记录页面访问
  recordPageView() {
    const now = new Date();
    
    // 更新总访问量
    this.analyticsData.totalViews++;
    
    // 更新页面访问量
    if (!this.analyticsData.pageViews[this.currentPath]) {
      this.analyticsData.pageViews[this.currentPath] = 0;
    }
    this.analyticsData.pageViews[this.currentPath]++;
    
    // 记录访问历史
    this.analyticsData.visitHistory.push({
      path: this.currentPath,
      timestamp: now.getTime(),
      date: now.toISOString()
    });
    
    // 限制历史记录数量
    if (this.analyticsData.visitHistory.length > 100) {
      this.analyticsData.visitHistory = this.analyticsData.visitHistory.slice(-100);
    }
    
    // 更新最后访问时间
    this.analyticsData.lastVisit = now.getTime();
    
    this.saveAnalyticsData();
  }
  
  // 更新统计显示
  updateAnalytics() {
    this.updateTotalViews();
    this.updatePageViews();
    this.updateVisitStats();
  }
  
  // 更新总访问量显示
  updateTotalViews() {
    const elements = document.querySelectorAll('#total-views, .total-views');
    elements.forEach(element => {
      element.textContent = this.analyticsData.totalViews.toLocaleString();
    });
  }
  
  // 更新页面访问量显示
  updatePageViews() {
    const elements = document.querySelectorAll('[data-url]');
    elements.forEach(element => {
      const url = element.dataset.url;
      const views = this.analyticsData.pageViews[url] || 0;
      element.textContent = views.toLocaleString();
    });
  }
  
  // 更新访问统计
  updateVisitStats() {
    const stats = this.calculateVisitStats();
    
    // 更新今日访问量
    const todayElements = document.querySelectorAll('.today-views');
    todayElements.forEach(element => {
      element.textContent = stats.todayViews;
    });
    
    // 更新本周访问量
    const weekElements = document.querySelectorAll('.week-views');
    weekElements.forEach(element => {
      element.textContent = stats.weekViews;
    });
    
    // 更新本月访问量
    const monthElements = document.querySelectorAll('.month-views');
    monthElements.forEach(element => {
      element.textContent = stats.monthViews;
    });
  }
  
  // 计算访问统计
  calculateVisitStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekAgo = today - (7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime();
    
    let todayViews = 0;
    let weekViews = 0;
    let monthViews = 0;
    
    this.analyticsData.visitHistory.forEach(visit => {
      const visitTime = visit.timestamp;
      
      if (visitTime >= today) {
        todayViews++;
      }
      
      if (visitTime >= weekAgo) {
        weekViews++;
      }
      
      if (visitTime >= monthAgo) {
        monthViews++;
      }
    });
    
    return {
      todayViews,
      weekViews,
      monthViews
    };
  }
  
  // 绑定事件
  bindEvents() {
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.recordPageView();
      }
    });
    
    // 监听页面卸载
    window.addEventListener('beforeunload', () => {
      this.saveAnalyticsData();
    });
  }
  
  // 获取页面访问量
  getPageViews(path) {
    return this.analyticsData.pageViews[path] || 0;
  }
  
  // 获取总访问量
  getTotalViews() {
    return this.analyticsData.totalViews;
  }
  
  // 获取访问历史
  getVisitHistory(limit = 10) {
    return this.analyticsData.visitHistory.slice(-limit).reverse();
  }
  
  // 获取热门页面
  getPopularPages(limit = 5) {
    const pages = Object.entries(this.analyticsData.pageViews);
    return pages
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([path, views]) => ({ path, views }));
  }
  
  // 导出统计数据
  exportAnalytics() {
    const data = {
      exportDate: new Date().toISOString(),
      analytics: this.analyticsData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // 重置统计数据
  resetAnalytics() {
    if (confirm('确定要重置所有统计数据吗？此操作不可恢复。')) {
      this.analyticsData = {
        totalViews: 0,
        pageViews: {},
        visitHistory: [],
        lastVisit: null
      };
      this.saveAnalyticsData();
      this.updateAnalytics();
    }
  }
}

// 字数统计功能
class WordCounter {
  constructor() {
    this.init();
  }
  
  init() {
    this.countWords();
    this.bindEvents();
  }
  
  // 统计字数
  countWords() {
    const elements = document.querySelectorAll('.word-count, [data-word-count]');
    
    elements.forEach(element => {
      const content = this.getContent(element);
      const wordCount = this.calculateWordCount(content);
      element.textContent = wordCount;
    });
  }
  
  // 获取内容
  getContent(element) {
    if (element.dataset.wordCount) {
      return element.dataset.wordCount;
    }
    
    // 如果是文章内容区域
    const contentElement = document.querySelector('.post-content');
    if (contentElement) {
      return contentElement.textContent || contentElement.innerText;
    }
    
    return element.textContent || element.innerText;
  }
  
  // 计算字数
  calculateWordCount(text) {
    if (!text) return 0;
    
    // 移除HTML标签
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // 计算中文字符
    const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
    
    // 计算英文单词
    const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length;
    
    // 计算数字
    const numbers = (cleanText.match(/\d+/g) || []).length;
    
    // 计算标点符号
    const punctuation = (cleanText.match(/[^\w\s\u4e00-\u9fa5]/g) || []).length;
    
    // 总字符数
    const totalChars = cleanText.length;
    
    return {
      total: totalChars,
      chinese: chineseChars,
      english: englishWords,
      numbers: numbers,
      punctuation: punctuation,
      display: `${totalChars} 字`
    };
  }
  
  // 绑定事件
  bindEvents() {
    // 监听内容变化
    const observer = new MutationObserver(() => {
      this.countWords();
    });
    
    const contentElement = document.querySelector('.post-content');
    if (contentElement) {
      observer.observe(contentElement, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }
}

// 阅读时间估算
class ReadingTimeEstimator {
  constructor() {
    this.init();
  }
  
  init() {
    this.estimateReadingTime();
  }
  
  // 估算阅读时间
  estimateReadingTime() {
    const elements = document.querySelectorAll('.reading-time, [data-reading-time]');
    
    elements.forEach(element => {
      const content = this.getContent(element);
      const readingTime = this.calculateReadingTime(content);
      element.textContent = readingTime;
    });
  }
  
  // 获取内容
  getContent(element) {
    if (element.dataset.readingTime) {
      return element.dataset.readingTime;
    }
    
    const contentElement = document.querySelector('.post-content');
    if (contentElement) {
      return contentElement.textContent || contentElement.innerText;
    }
    
    return element.textContent || element.innerText;
  }
  
  // 计算阅读时间
  calculateReadingTime(text) {
    if (!text) return '0 分钟';
    
    // 移除HTML标签
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // 计算中文字符
    const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
    
    // 计算英文单词
    const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length;
    
    // 假设阅读速度：中文300字/分钟，英文200词/分钟
    const chineseTime = chineseChars / 300;
    const englishTime = englishWords / 200;
    
    const totalTime = Math.ceil(chineseTime + englishTime);
    
    if (totalTime < 1) {
      return '1 分钟';
    } else if (totalTime > 60) {
      const hours = Math.floor(totalTime / 60);
      const minutes = totalTime % 60;
      return minutes > 0 ? `${hours} 小时 ${minutes} 分钟` : `${hours} 小时`;
    } else {
      return `${totalTime} 分钟`;
    }
  }
}

// 初始化统计功能
document.addEventListener('DOMContentLoaded', function() {
  // 初始化访问统计
  window.blogAnalytics = new BlogAnalytics();
  
  // 初始化字数统计
  new WordCounter();
  
  // 初始化阅读时间估算
  new ReadingTimeEstimator();
  
  // 添加统计面板（可选）
  if (window.location.search.includes('analytics=true')) {
    createAnalyticsPanel();
  }
});

// 创建统计面板（开发调试用）
function createAnalyticsPanel() {
  const panel = document.createElement('div');
  panel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 10000;
    font-size: 12px;
    max-width: 300px;
  `;
  
  panel.innerHTML = `
    <h6 style="margin: 0 0 10px 0;">统计面板</h6>
    <div>
      <p>总访问量: <span id="panel-total">${window.blogAnalytics.getTotalViews()}</span></p>
      <p>当前页面: <span id="panel-current">${window.blogAnalytics.getPageViews(window.location.pathname)}</span></p>
      <button onclick="window.blogAnalytics.exportAnalytics()" style="margin: 2px;">导出</button>
      <button onclick="window.blogAnalytics.resetAnalytics()" style="margin: 2px;">重置</button>
      <button onclick="this.parentElement.parentElement.remove()" style="margin: 2px;">关闭</button>
    </div>
  `;
  
  document.body.appendChild(panel);
} 