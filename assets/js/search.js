// 搜索功能
class BlogSearch {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.sidebarSearchInput = document.getElementById('sidebar-search-input');
    this.searchForm = document.getElementById('search-form');
    this.sidebarSearchForm = document.getElementById('sidebar-search-form');
    this.searchResults = document.getElementById('search-results');
    this.searchResultsList = document.getElementById('search-results-list');
    this.searchData = [];
    
    this.init();
  }
  
  init() {
    this.loadSearchData();
    this.bindEvents();
  }
  
  // 加载搜索数据
  async loadSearchData() {
    try {
      const response = await fetch('/search.json');
      this.searchData = await response.json();
    } catch (error) {
      console.error('Failed to load search data:', error);
      this.searchData = [];
    }
  }
  
  // 绑定事件
  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
      this.searchInput.addEventListener('focus', this.showSearchResults.bind(this));
    }
    
    if (this.sidebarSearchInput) {
      this.sidebarSearchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
    }
    
    if (this.searchForm) {
      this.searchForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    
    if (this.sidebarSearchForm) {
      this.sidebarSearchForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    
    // 点击外部关闭搜索结果
    document.addEventListener('click', (e) => {
      if (!this.searchResults?.contains(e.target) && !this.searchInput?.contains(e.target)) {
        this.hideSearchResults();
      }
    });
  }
  
  // 处理搜索
  handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }
    
    const results = this.search(query);
    this.displayResults(results);
  }
  
  // 执行搜索
  search(query) {
    if (!this.searchData.length) return [];
    
    return this.searchData.filter(item => {
      const title = item.title.toLowerCase();
      const content = item.content.toLowerCase();
      const tags = item.tags ? item.tags.join(' ').toLowerCase() : '';
      const categories = item.categories ? item.categories.join(' ').toLowerCase() : '';
      
      return title.includes(query) || 
             content.includes(query) || 
             tags.includes(query) || 
             categories.includes(query);
    }).slice(0, 10); // 限制结果数量
  }
  
  // 显示搜索结果
  displayResults(results) {
    if (!this.searchResultsList) return;
    
    this.searchResultsList.innerHTML = '';
    
    if (results.length === 0) {
      this.searchResultsList.innerHTML = '<p class="text-muted">没有找到相关结果</p>';
    } else {
      results.forEach(result => {
        const resultElement = this.createResultElement(result);
        this.searchResultsList.appendChild(resultElement);
      });
    }
    
    this.showSearchResults();
  }
  
  // 创建结果元素
  createResultElement(result) {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.style.cssText = `
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background-color 0.2s;
    `;
    
    div.innerHTML = `
      <h6 style="margin: 0 0 5px 0; color: #007bff;">
        <a href="${result.url}" style="text-decoration: none; color: inherit;">
          ${this.highlightText(result.title, this.getCurrentQuery())}
        </a>
      </h6>
      <p style="margin: 0; font-size: 0.875rem; color: #6c757d; line-height: 1.4;">
        ${this.highlightText(this.truncateText(result.content, 100), this.getCurrentQuery())}
      </p>
      <small style="color: #adb5bd;">
        ${result.date} • ${result.categories ? result.categories.join(', ') : ''}
      </small>
    `;
    
    div.addEventListener('click', () => {
      window.location.href = result.url;
    });
    
    div.addEventListener('mouseenter', () => {
      div.style.backgroundColor = '#f8f9fa';
    });
    
    div.addEventListener('mouseleave', () => {
      div.style.backgroundColor = 'transparent';
    });
    
    return div;
  }
  
  // 高亮文本
  highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #fff3cd; padding: 0 2px;">$1</mark>');
  }
  
  // 截断文本
  truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }
  
  // 获取当前查询
  getCurrentQuery() {
    const input = this.searchInput || this.sidebarSearchInput;
    return input ? input.value.trim().toLowerCase() : '';
  }
  
  // 显示搜索结果
  showSearchResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'block';
    }
  }
  
  // 隐藏搜索结果
  hideSearchResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }
  
  // 处理表单提交
  handleFormSubmit(event) {
    event.preventDefault();
    const query = this.getCurrentQuery();
    
    if (query.trim()) {
      // 跳转到搜索结果页面
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }
  
  // 防抖函数
  debounce(func, wait) {
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
}

// 搜索页面功能
class SearchPage {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.searchData = [];
    
    this.init();
  }
  
  init() {
    this.loadSearchData();
    this.bindEvents();
    this.performInitialSearch();
  }
  
  // 加载搜索数据
  async loadSearchData() {
    try {
      const response = await fetch('/search.json');
      this.searchData = await response.json();
    } catch (error) {
      console.error('Failed to load search data:', error);
      this.searchData = [];
    }
  }
  
  // 绑定事件
  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
    }
  }
  
  // 执行初始搜索
  performInitialSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query && this.searchInput) {
      this.searchInput.value = query;
      this.handleSearch({ target: this.searchInput });
    }
  }
  
  // 处理搜索
  handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      this.displayResults([]);
      return;
    }
    
    const results = this.search(query);
    this.displayResults(results);
  }
  
  // 执行搜索
  search(query) {
    if (!this.searchData.length) return [];
    
    return this.searchData.filter(item => {
      const title = item.title.toLowerCase();
      const content = item.content.toLowerCase();
      const tags = item.tags ? item.tags.join(' ').toLowerCase() : '';
      const categories = item.categories ? item.categories.join(' ').toLowerCase() : '';
      
      return title.includes(query) || 
             content.includes(query) || 
             tags.includes(query) || 
             categories.includes(query);
    });
  }
  
  // 显示搜索结果
  displayResults(results) {
    if (!this.searchResults) return;
    
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="text-center py-5">
          <h4>没有找到相关结果</h4>
          <p class="text-muted">请尝试使用不同的关键词</p>
        </div>
      `;
    } else {
      this.searchResults.innerHTML = `
        <div class="row">
          ${results.map(result => this.createResultCard(result)).join('')}
        </div>
      `;
    }
  }
  
  // 创建结果卡片
  createResultCard(result) {
    return `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          ${result.image ? `<img src="${result.image}" class="card-img-top" alt="${result.title}">` : ''}
          <div class="card-body">
            <h5 class="card-title">
              <a href="${result.url}">${result.title}</a>
            </h5>
            <p class="card-text">${this.truncateText(result.content, 150)}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">${result.date}</small>
              <a href="${result.url}" class="btn btn-primary btn-sm">阅读全文</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // 截断文本
  truncateText(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }
  
  // 防抖函数
  debounce(func, wait) {
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
}

// 初始化搜索功能
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否在搜索页面
  if (window.location.pathname === '/search') {
    new SearchPage();
  } else {
    new BlogSearch();
  }
}); 