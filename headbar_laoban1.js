// Persistent headbar injection script
// Inserts a site-wide headbar with logo and search form.
(function() {
  if (document.querySelector('.site-headbar')) return; // avoid duplicate
  // Determine asset base prefix depending on script inclusion path
  var basePrefix = '';
  try {
    var s = document.currentScript && document.currentScript.getAttribute('src') || '';
    var m = s.match(/^((?:\.\.\/)+)/);
    if (m && m[1]) basePrefix = m[1];
  } catch(e) {}
  var bar = document.createElement('div');
  bar.innerHTML = '<div class="site-headbar" role="banner">\n    <div class="headbar-inner">\n      <a href="1.官网主页.html" class="headbar-link headbar-home">←首页</a>\n  <a href="第二页告知.html" class="logo-wrap" aria-label="返回首页">\n  <img src="logo_black.png" alt="添清小院 Logo" class="site-logo">\n     <span class="site-name-block"><span class="site-name">添清小院</span><span class="site-meta">地址：云南省玉溪市新平县戛洒镇耀南村朱家寨3号</span></span>\n      </a>\n      <form action="#" method="get" class="head-search-form" role="search" aria-label="站内搜索">\n        <input name="query" type="text" class="head-search-input" placeholder="搜索..." autocomplete="off" aria-label="搜索关键词">\n        <button type="submit" class="head-search-btn">搜索</button>\n      </form>\n      <a href="公告设置.html" class="headbar-link">公告</a>\n      <a href="菜单搜索栏.html" class="headbar-link">菜单</a>\n      <a href = "登录界面跳转到谢应文.html" class = "headbar-link">登录</a>\n      <a href="天气预报.html" class="headbar-link">天气</a>\n      <a href="搜索记录.html" class="headbar-link">操作记录</a>\n   </div>\n  </div>';
  var node = bar.firstElementChild;
  document.body.prepend(node);

  // Ensure logo uses logo_black with correct relative base
  try {
    var logoImg = node.querySelector('.site-logo');
    if (logoImg) logoImg.src = basePrefix + 'logo_black.png';
  } catch(e) {}

  // 在 site-name-block 下添加邮编信息（与 headbar.js 一致）
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
  style.textContent = style.textContent.replace('z-index: 1000', 'z-index: 10001');
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
  // Responsive overrides similar to main headbar
  try {
    var style3 = document.createElement('style');
    style3.textContent = '\n      .headbar-inner{ flex-wrap: wrap; justify-content: space-between; gap: 16px; padding: 10px 20px; }\n      .logo-wrap{ flex: 1 1 260px; min-width: 220px; }\n      .head-search-form{ flex: 2 1 360px; min-width: 280px; }\n      .headbar-link{ flex: 1 1 140px; text-align: center; }\n      .headbar-home{ order: -1; }\n      @media (max-width: 960px){\n        .logo-wrap{ flex-basis: 220px; }\n        .head-search-form{ flex-basis: 320px; }\n        .headbar-link{ flex-basis: 120px; }\n      }\n      @media (max-width: 640px){\n        .logo-wrap{ flex: 1 1 100%; }\n        .head-search-form{ flex: 1 1 100%; }\n        .headbar-link{ flex: 1 1 calc(50% - 12px); }\n      }\n    ';
    document.head.appendChild(style3);
    var style4 = document.createElement('style');
    style4.textContent = '\n      .headbar-inner{ flex-wrap: nowrap; justify-content: space-between; gap: 12px; padding: 10px 20px; }\n      .logo-wrap{ flex: 0 0 auto; min-width: 180px; }\n      .head-search-form{ flex: 1 1 340px; min-width: 240px; }\n      .headbar-link{ flex: 0 0 auto; white-space: nowrap; text-align: center; }\n      @media (max-width: 960px){\n        .headbar-link{ font-size: 14px; padding: 10px 16px; }\n      }\n      @media (max-width: 640px){\n        .site-logo{ height: 44px; }\n        .site-name{ font-size: 18px; }\n        .headbar-link{ font-size: 12px; padding: 8px 12px; }\n        .head-search-form{ flex-basis: 280px; }\n      }\n    ';
    document.head.appendChild(style4);
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
