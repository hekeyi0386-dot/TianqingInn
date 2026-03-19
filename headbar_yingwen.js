// Persistent headbar injection script
// Inserts a site-wide headbar with logo and search form.
(function() {
  if (document.querySelector('.site-headbar')) return; // avoid duplicate
  var bar = document.createElement('div');
  bar.innerHTML = '<div class="site-headbar" role="banner">\n    <div class="headbar-inner">\n      <a href="1.官网主页.html" class="headbar-link headbar-home">←首页</a>\n      <a href="第二页告知.html" class="logo-wrap" aria-label="返回第二页告知">\n   <img src="logo_black.png" alt="添清小院 Logo" class="site-logo">\n     <span class="site-name-block"><span class="site-name">添清小院</span><span class="site-meta">地址：云南省玉溪市新平县戛洒镇耀南村朱家寨3号</span></span>\n      </a>\n      <form action="#" method="get" class="head-search-form" role="search" aria-label="站内搜索">\n        <input name="query" type="text" class="head-search-input" placeholder="搜索..." autocomplete="off" aria-label="搜索关键词">\n        <button type="submit" class="head-search-btn">搜索</button>\n      </form>\n      <a href="公告设置.html" class="headbar-link">公告</a>\n      <a href="菜单搜索栏.html" class="headbar-link">菜单</a>\n    <a href = "登录界面跳转到谢应文.html" class = "headbar-link">登录</a>\n    <a href="天气预报.html" class="headbar-link">天气</a>\n    <a href="搜索记录.html" class="headbar-link">操作记录</a>\n   </div>\n  </div>';
  var node = bar.firstElementChild;
  document.body.prepend(node);

  // 在 site-name-block 下添加邮编信息（与 headbar_laoban.js 一致）
  try {
    var nameBlockEl = node.querySelector('.site-name-block');
    if (nameBlockEl && !node.querySelector('.site-postcode')) {
      var pcEl = document.createElement('span');
      pcEl.className = 'site-postcode';
      pcEl.textContent = '邮编：653405';
      nameBlockEl.appendChild(pcEl);
    }
  } catch(e) {}

  // Inject styles
  var style = document.createElement('style');
  style.textContent = '\n    .site-headbar {\n      position: sticky;\n      top: 0;\n      z-index: 1000;\n      width: 100%; \n      backdrop-filter: blur(8px);\n      background: rgba(0, 68, 0, 0.9);\n      box-shadow: 0 4px 12px rgba(0,0,0,0.25);\n    }\n    .headbar-inner {\n      width: 85%;\n      margin: 0 auto;\n      display: flex;\n      align-items: center;\n      gap: 32px;\n      padding: 10px 40px;\n    }\n    .logo-wrap {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n      text-decoration: none;\n    }\n    .site-logo {\n      height: 64px;\n      width: auto;\n      border-radius: 0;\n      box-shadow: none;\n    }\n    .site-name {\n      font-size: 24px;\n      font-weight: 600;\n      letter-spacing: 3px;\n      color: #d4f1d4;\n      text-shadow: 0 1px 3px rgba(0,0,0,0.4);\n    }\n    .site-name-block {\n      display: flex;\n      flex-direction: column;\n      line-height: 1.15;\n    }\n    .site-meta {\n      font-size: 12px;\n      letter-spacing: 1px;\n      color: #b9d9b9;\n      margin-top: 4px;\n      font-weight: 400;\n    }\n    .head-search-form {\n      flex: 1;\n      display: flex;\n      background: #ffffff;\n      border-radius: 40px;\n      box-shadow: 0 3px 10px rgba(0,0,0,0.25);\n      overflow: hidden;\n      border: 2px solid #2d5f2d;\n    }\n    .head-search-input {\n      flex: 1;\n      padding: 12px 20px;\n      border: none;\n      outline: none;\n      font-size: 16px;\n      background: transparent;\n      color: #0f2d0f;\n    }\n    .head-search-input::placeholder { color: #4a6b4a; }\n    .head-search-btn {\n      padding: 12px 30px;\n      background: linear-gradient(135deg,#2d5f2d,#004400);\n      color: #e8f5e8;\n      font-size: 16px;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      letter-spacing: 2px;\n      transition: background .3s, transform .2s;\n    }\n    .head-search-btn:hover { background: linear-gradient(135deg,#3d7f3d,#1a5c1a); }\n    .head-search-btn:active { transform: scale(.96); }\n    .headbar-link {\n      padding: 12px 24px;\n      background: linear-gradient(135deg,#2d5f2d,#004400);\n      color: #e8f5e8;\n      font-size: 16px;\n      font-weight: 600;\n      border: none;\n      border-radius: 40px;\n      text-decoration: none;\n      cursor: pointer;\n      letter-spacing: 1px;\n      transition: background .3s, transform .2s;\n      display: inline-block;\n      white-space: nowrap;\n    }\n    .headbar-link:hover { background: linear-gradient(135deg,#3d7f3d,#1a5c1a); }\n    .headbar-link:active { transform: scale(.96); }\n    .headbar-home {\n      order: -1;\n      margin-right: auto;\n    }\n    body { padding-top: 0; }\n    @media (max-width: 640px){\n      .headbar-inner { flex-wrap: wrap; gap: 16px; padding: 10px 20px; }\n      .site-logo { height: 52px; }\n      .site-name { font-size: 20px; letter-spacing:2px; }\n      .head-search-btn { padding: 10px 22px; font-size:14px; }\n      .head-search-input { font-size:14px; padding:10px 16px; }\n      .site-meta { font-size:11px; }\n      .headbar-link { padding: 10px 18px; font-size:14px; }\n    }\n  ';
  document.head.appendChild(style);
  // 为邮编添加专用样式
  try {
    var stylePost = document.createElement('style');
    stylePost.textContent = '\n    .site-postcode { font-size: 12px; color: #b9d9b9; margin-top: 2px; font-weight: 400; }\n  ';
    document.head.appendChild(stylePost);
  } catch(e) {}
  // Ensure search history storage is initialized on first load
  try {
    (function ensureHistoryInitialized(){
      var key = 'searchHistory';
      try {
        var raw = localStorage.getItem(key);
        if (!raw) {
          localStorage.setItem(key, JSON.stringify([]));
          return;
        }
        var arr = JSON.parse(raw);
        if (!Array.isArray(arr)) localStorage.setItem(key, JSON.stringify([]));
      } catch(e) {
        try { localStorage.setItem(key, JSON.stringify([])); } catch(_) {}
      }
    })();
  } catch(e) {}

  // Prefill search input from query param if present on pages other than searchbar
  try {
    var params = new URLSearchParams(location.search);
    var q = params.get('query');
    if (q) {
      var inp = node.querySelector('.head-search-input');
      if (inp) inp.value = q;
    }
  } catch(e) {}


  // Intercept submit: special mapping for email -> target page
  try {
    var form = node.querySelector('.head-search-form');
    var input = node.querySelector('.head-search-input');
    if (form && input) {
      function localAdd(q){
        try {
          q = (q||'').trim(); if (!q) return;
          var key = 'searchHistory';
          var arr = [];
          try { arr = JSON.parse(localStorage.getItem(key)||'[]'); } catch(e) {}
          arr = arr.filter(function(x){ return x !== q; });
          arr.unshift(q);
          if (arr.length > 50) arr = arr.slice(0, 50);
          localStorage.setItem(key, JSON.stringify(arr));
        } catch(e) {}
      }
      form.addEventListener('submit', function(ev){
        var v = (input.value || '').trim();
        // record query
        try { if (window.SearchHistory && window.SearchHistory.add) window.SearchHistory.add(v); else localAdd(v); } catch(e) {}
        if (v === 'adwejfjgw@mail.bhbu.edu.cn') {
          ev.preventDefault();
          var target = 'nature刘江涛paper.html';
          try { if (location.pathname.indexOf('/账号/') !== -1) { target = '../' + target; } } catch(e) {}
          window.location.href = target;
        } else if (v === '戛洒' || v === '戛洒镇') {
          ev.preventDefault();
          window.location.href = '跳转.html';
        } else if (v === '补天祀仪式' || v === '补天仪式') {
          ev.preventDefault();
          window.location.href = 'a_leval.html';
        } else if (v === '山林祈愿线') {
          ev.preventDefault();
          window.location.href = 'forstwalk.html';
        } else if (v === '护身粥') {
          ev.preventDefault();
          window.location.href = '种草贴.html';
        } else if (v === '杨立强') {
          ev.preventDefault();
          window.location.href = '4.老板视频 带搜索框.html';
              }else if (v === '清灵之人') {
          ev.preventDefault();
          window.location.href = 'invitation_and_two_ending.html';
        } else {
          ev.preventDefault();
          window.location.href = '搜索不存在.html';
        }
      });
    }
  } catch(e) {}
})();
