/* hero-graph.js: a faint, seeded network behind the title band, with one
 * "message" that random-walks along the edges. Inspired by the hero
 * illustration of log4science.github.io; written from scratch for this site.
 * Usage: <canvas class="hero-net" aria-hidden="true"></canvas> inside .hero.
 */
(function () {
  'use strict';
  var canvases = document.querySelectorAll('canvas.hero-net');
  if (!canvases.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function build(seed, n) {
    var rnd = mulberry32(seed), nodes = [], tries = 0;
    function gauss() { return Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(6.2832 * rnd()); }
    var clusters = [];
    for (var c = 0; c < 5; c++) clusters.push({ x: 0.1 + rnd() * 0.8, y: 0.15 + rnd() * 0.7, sx: 0.06 + rnd() * 0.1, sy: 0.08 + rnd() * 0.12 });
    while (nodes.length < n && tries++ < 20000) {
      var cl = clusters[Math.floor(rnd() * clusters.length)];
      var x = cl.x + gauss() * cl.sx, y = cl.y + gauss() * cl.sy;
      if (x < 0.02 || x > 0.98 || y < 0.05 || y > 0.95) continue;
      var ok = true, minD = 0.035 + rnd() * 0.03;
      for (var i = 0; i < nodes.length; i++) { var dx = nodes[i].x - x, dy = nodes[i].y - y; if (dx * dx + dy * dy < minD * minD) { ok = false; break; } }
      if (!ok) continue;
      nodes.push({ x: x, y: y, r: rnd() < 0.2 ? 3.2 + rnd() * 2.2 : 1.6 + rnd() * 1.6, nb: [] });
    }
    var edges = [], seen = {};
    for (var a = 0; a < nodes.length; a++) {
      var d = [];
      for (var b = 0; b < nodes.length; b++) if (b !== a) { var ex = nodes[a].x - nodes[b].x, ey = (nodes[a].y - nodes[b].y) * 0.6; d.push([ex * ex + ey * ey, b]); }
      d.sort(function (p, q) { return p[0] - q[0]; });
      var k = 2 + (rnd() < 0.4 ? 1 : 0);
      for (var j = 0; j < k && j < d.length; j++) {
        var bb = d[j][1], key = a < bb ? a + '-' + bb : bb + '-' + a;
        if (seen[key]) continue; seen[key] = 1; edges.push([a, bb]); nodes[a].nb.push(bb); nodes[bb].nb.push(a);
      }
    }
    return { nodes: nodes, edges: edges, rnd: rnd };
  }

  function colors(el) {
    var cs = getComputedStyle(el);
    var ink = cs.getPropertyValue('--ink-strong').trim() || '#161a18';
    var accent = cs.getPropertyValue('--accent').trim() || '#2f7a57';
    return { ink: ink, accent: accent, msg: '#d93a4b' };
  }

  Array.prototype.forEach.call(canvases, function (cv) {
    var ctx = cv.getContext('2d'), host = cv.parentNode;
    var seed = parseInt(cv.getAttribute('data-seed') || '11', 10);
    var g = build(seed, parseInt(cv.getAttribute('data-nodes') || '42', 10));
    var W = 0, H = 0, dpr = 1, col = colors(document.documentElement);
    var walk = { at: 0, to: g.nodes[0].nb[0] || 0, t: 0, trail: [] };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }
    function px(n) { return [n.x * W, n.y * H]; }
    function draw(dt) {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      ctx.strokeStyle = col.ink; ctx.globalAlpha = 0.13;
      ctx.beginPath();
      g.edges.forEach(function (e) { var p = px(g.nodes[e[0]]), q = px(g.nodes[e[1]]); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); });
      ctx.stroke();
      g.nodes.forEach(function (n, i) {
        var p = px(n); ctx.globalAlpha = n.r > 3 ? 0.32 : 0.24;
        ctx.fillStyle = (i % 3 === 0) ? col.accent : col.ink;
        ctx.beginPath(); ctx.arc(p[0], p[1], n.r, 0, 6.2832); ctx.fill();
      });
      if (reduce) return;
      // message: move along the current edge
      var a = g.nodes[walk.at], b = g.nodes[walk.to], pa = px(a), pb = px(b);
      var len = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]) || 1;
      walk.t += (dt / 1000) * 90 / len;
      if (walk.t >= 1) {
        walk.t = 0; walk.at = walk.to;
        var nb = g.nodes[walk.at].nb; walk.to = nb[Math.floor(g.rnd() * nb.length)];
        if (walk.to === undefined) walk.to = walk.at;
      }
      var mx = pa[0] + (pb[0] - pa[0]) * walk.t, my = pa[1] + (pb[1] - pa[1]) * walk.t;
      walk.trail.push([mx, my]); if (walk.trail.length > 26) walk.trail.shift();
      for (var i = 1; i < walk.trail.length; i++) {
        ctx.globalAlpha = 0.55 * i / walk.trail.length; ctx.strokeStyle = col.msg; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(walk.trail[i - 1][0], walk.trail[i - 1][1]); ctx.lineTo(walk.trail[i][0], walk.trail[i][1]); ctx.stroke();
      }
      ctx.globalAlpha = 0.9; ctx.fillStyle = col.msg; ctx.beginPath(); ctx.arc(mx, my, 3.2, 0, 6.2832); ctx.fill();
      ctx.globalAlpha = 1;
    }
    var last = 0, running = true;
    function frame(ts) {
      if (!running) return;
      var dt = last ? Math.min(ts - last, 50) : 0; last = ts;
      draw(dt); requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener('resize', resize);
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onTheme = function () { col = colors(document.documentElement); };
      if (mq.addEventListener) mq.addEventListener('change', onTheme);
      new MutationObserver(onTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
    if (!reduce) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          var vis = es.some(function (e) { return e.isIntersecting; });
          if (vis && !running) { running = true; last = 0; requestAnimationFrame(frame); }
          if (!vis) running = false;
        }).observe(cv);
      }
      requestAnimationFrame(frame);
    }
  });
})();
