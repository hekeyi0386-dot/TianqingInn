// Persistent headbar injection script (English)
// Inserts a site-wide headbar with logo and search form.
(function() {
  try {
    if (document.querySelector('.site-headbar')) return; // avoid duplicate

    var bar = document.createElement('div');
    bar.innerHTML = '<div class="site-headbar" role="banner">\n    <div class="headbar-inner">\n      <a href="1.官网主页.html" class="headbar-link headbar-home" aria-label="Go to homepage">← Home</a>\n      <a href="第二页告知.html" class="logo-wrap" aria-label="Go to homepage">\n        <img src="logo_white.png" alt="Tianqing Courtyard Logo" class="site-logo">\n        <span class="site-name-block"><span class="site-name">Tianqing Courtyard</span><span class="site-meta">Address: No. 3, Zhujiazhai, Yaonan Village, Jiasa Town, Xinping County, Yuxi, Yunnan, China</span></span>\n      </a>\n      <form action="#" method="get" class="head-search-form" role="search" aria-label="Site search">\n        <input name="query" type="text" class="head-search-input" placeholder="Search..." autocomplete="off" aria-label="Search keywords">\n        <button type="submit" class="head-search-btn">Search</button>\n      </form>\n      <div class="headbar-actions" role="navigation" aria-label="Quick links">\n        <a href="公告设置.html" class="headbar-link">Announcements</a>\n        <a href="菜单搜索栏.html" class="headbar-link">Menu</a>\n        <a href="登录界面跳转到谢应文.html" class="headbar-link">Login</a>\n        <a href="天气预报_英文版.html" class="headbar-link">Weather</a>\n        <a href="搜索记录.html" class="headbar-link">Search History</a>\n      </div>\n    </div>\n  </div>';

    var node = bar.firstElementChild;
    document.body.prepend(node);

    // Add postcode under site-name-block (if not already present)
    try {
      var nameBlockEl = node.querySelector('.site-name-block');
      if (nameBlockEl && !node.querySelector('.site-postcode')) {
        var pcEl = document.createElement('span');
        pcEl.className = 'site-postcode';
        pcEl.textContent = 'Postal Code: 653405';
        nameBlockEl.appendChild(pcEl);
      }
    } catch(e) {}

    // Styles
    var style = document.createElement('style');
    style.textContent = `
      html, body { margin: 0; padding: 0; }
      .site-headbar {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2147483647;
        width: 100%;
        backdrop-filter: blur(8px);
        background: rgba(0, 68, 0, 0.9);
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      }
      .headbar-inner {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 8px 20px;
        margin: 0 auto;
      }
      .logo-wrap {
        display: flex;
        align-items: center;
        gap: 14px;
        text-decoration: none;
      }
      .site-logo { height: 52px; width: auto; }
      .site-name { font-size: 18px; font-weight: 600; letter-spacing: 2px; color: #d4f1d4; text-shadow: 0 1px 3px rgba(0,0,0,0.4); }
      .site-name-block { display: flex; flex-direction: column; line-height: 1.15; }
      .site-meta { font-size: 12px; letter-spacing: 1px; color: #b9d9b9; margin-top: 4px; font-weight: 400; }

      .head-search-form {
        flex: 2 1 420px;
        display: flex;
        background: #ffffff;
        border-radius: 40px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        overflow: hidden;
        border: 2px solid #2d5f2d;
        min-width: 300px;
        order: 2;
      }
      .head-search-input { flex: 1; padding: 9px 14px; border: none; outline: none; font-size: 13px; background: transparent; color: #0f2d0f; }
      .head-search-input::placeholder { color: #4a6b4a; }
      .head-search-btn { padding: 9px 14px; background: linear-gradient(135deg,#2d5f2d,#004400); color: #e8f5e8; font-size: 13px; font-weight: 600; border: none; cursor: pointer; letter-spacing: 1px; transition: background .3s, transform .2s; }
      .head-search-btn:hover { background: linear-gradient(135deg,#3d7f3d,#1a5c1a); }
      .head-search-btn:active { transform: scale(.96); }

      .headbar-link { padding: 9px 14px; background: linear-gradient(135deg,#2d5f2d,#004400); color: #e8f5e8; font-size: 13px; font-weight: 600; border: none; border-radius: 40px; text-decoration: none; cursor: pointer; letter-spacing: 1px; transition: background .3s, transform .2s; display: inline-block; white-space: nowrap; }
      .headbar-link:hover { background: linear-gradient(135deg,#3d7f3d,#1a5c1a); }
      .headbar-link:active { transform: scale(.96); }
      .headbar-home { order: -1; margin-right: auto; }

      /* Actions row: always one line below search bar */
      .headbar-actions {
        flex: 0 0 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        flex-wrap: nowrap;
        order: 3;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding-top: 4px;
      }
      .headbar-actions::-webkit-scrollbar { height: 6px; }
      .headbar-actions::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.25); border-radius: 3px; }

      @media (max-width: 960px){
        .site-logo { height: 44px; }
        .site-name { font-size: 17px; }
        .headbar-link { font-size: 12px; padding: 8px 12px; }
        .head-search-form { flex: 1 1 100%; width: 100%; }
        .headbar-actions { gap: 10px; }
      }
      @media (max-width: 640px){
        .headbar-inner { flex-wrap: wrap; gap: 12px; padding: 8px 12px; }
        .site-logo { height: 40px; }
        .site-name { font-size: 16px; letter-spacing: 1.2px; }
        .head-search-form { flex: 1 1 100%; width: 100%; }
        .head-search-input { font-size: 12px; padding: 8px 10px; }
        .head-search-btn { padding: 8px 10px; font-size: 12px; }
        .site-meta { font-size: 10px; }
        .headbar-link { padding: 7px 10px; font-size: 11px; }
        .headbar-actions { gap: 8px; }
      }
    `;
    document.head.appendChild(style);

    // Dedicated style for postcode text
    try {
      var stylePost = document.createElement('style');
      stylePost.textContent = '.site-postcode { font-size: 12px; color: #b9d9b9; margin-top: 2px; font-weight: 400; }';
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

    // Prefill search input from query param if present
    try {
      var params = new URLSearchParams(location.search);
      var q = params.get('query');
      if (q) {
        var inp = node.querySelector('.head-search-input');
        if (inp) inp.value = q;
      }
    } catch(e) {}

    // Intercept submit: special mapping rules
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
            if (location.pathname.indexOf('/账号/') !== -1) {
              target = '../' + target;
            }
            window.location.href = target;
          } else if (v.toLowerCase() === 'jiasa' || v.toLowerCase() === 'jiasa town') {
            ev.preventDefault();
            window.location.href = '跳转.html';
          } else if (v.toLowerCase() === 'butian ritual' || v.toLowerCase() === 'sky-mending ritual') {
            ev.preventDefault();
            window.location.href = 'a_leval.html';
          } else if (v.toLowerCase() === 'forest prayer line' || v.toLowerCase() === 'mountain prayer thread') {
            ev.preventDefault();
            window.location.href = 'forstwalk.html';
          } else if (v.toLowerCase() === 'protective porridge' || v.toLowerCase() === 'amulet porridge') {
            ev.preventDefault();
            window.location.href = '种草贴.html';
          } else if (v.toLowerCase() === 'yang liqiang') {
            ev.preventDefault();
            window.location.href = '4.老板视频 带搜索框.html';
          } else if (v.toLowerCase() === 'pure spirit' || v.toLowerCase() === 'the pure-hearted') {
            ev.preventDefault();
            window.location.href = 'invitation_and_two_ending.html';
          } else {
            // Unmatched keywords: go to empty-result page
            ev.preventDefault();
            window.location.href = '搜索不存在.html';
          }
        });
      }
    } catch(e) {}
  } catch(err) {
    // fail-safe: do nothing if headbar fails
  }
})();
