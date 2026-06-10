/* ============================================================================
 * deck-editplus.js — geometry + typography editing for feishu-deck-h5 canvas
 * decks (pptx-to-deck output). NON-INVASIVE overlay: loads alongside the
 * canonical assets/edit-mode/deck-edit-mode.js and only acts while the canonical
 * editor is active (<body>.deck-edit-mode, entered with the `E` key).
 *
 * Adds, per selected text box (.el.tb):
 *   • drag to move           → writes inline left/top   (cqw/cqh)
 *   • 8-handle resize        → writes inline left/top/width/height
 *   • font size  A− / A+     → scales every run <span> font-size (cqw)
 *   • horizontal align L/C/R → .tb-inner text-align
 *   • vertical align  T/C/B  → .el.tb justify-content (the PPT anchor)
 *   • AutoFit (shrink-to-fit)→ scales font so text fits the box
 *   • 独字成行 de-orphan      → nudges font so no single-char last line
 *
 * Persistence: edits are plain inline-style mutations on the live DOM, so the
 * canonical ⌘S (buildSavedHTML → documentElement clone) bakes them into the
 * saved index.html for free; sync-index-to-deck.py already round-trips
 * left/top/width/height back to deck.json x/y/w/h. (font-size/align round-trip
 * to deck.json needs the small sync patch shipped in this skill; the SAVED HTML
 * keeps them regardless.)
 *
 * Why this is clean on the new architecture: the hybrid background image is
 * TEXT-STRIPPED, so moving/restyling the overlay text never reveals baked-in
 * original text (the ghosting that the old dual-background skill had to mask).
 * ==========================================================================*/
(function () {
  'use strict';

  var CQ = /(-?[\d.]+)cq[wh]/;
  var sel = null;             // selected .el.tb
  var layer = null;           // transient overlay root
  var outline = null, toolbar = null, fsLabel = null, lhLabel = null, hint = null;
  var handles = {}, moveH = null;
  var LH_STEP = 0.1, LH_MIN = 0.8, LH_MAX = 3.0, LH_DEFAULT = 1.2;
  var rafGlued = 0;
  var MIN_W = 1.5, MIN_H = 1.0;   // cqw / cqh floor so a box can't vanish
  var MIN_FS = 0.4, MAX_FS = 40;  // cqw font-size clamp

  /* ---- cq helpers ------------------------------------------------------- */
  function canvasOf(el) { return el && el.closest('.canvas'); }
  function getCq(el, prop) {
    var m = (el.style[prop] || '').match(CQ);
    return m ? parseFloat(m[1]) : 0;
  }
  function setCqLeft(el, v) { el.style.left = v.toFixed(3) + 'cqw'; }
  function setCqTop(el, v) { el.style.top = v.toFixed(3) + 'cqh'; }
  function setCqW(el, v) { el.style.width = Math.max(MIN_W, v).toFixed(3) + 'cqw'; }
  function setCqH(el, v) { el.style.height = Math.max(MIN_H, v).toFixed(3) + 'cqh'; }
  // screen px delta → cq delta, transform-scale aware (uses the canvas on-screen rect)
  function dxToCqw(box, dxPx) { var r = canvasOf(box).getBoundingClientRect(); return dxPx / r.width * 100; }
  function dyToCqh(box, dyPx) { var r = canvasOf(box).getBoundingClientRect(); return dyPx / r.height * 100; }

  /* ---- font / align ----------------------------------------------------- */
  function spansOf(box) { return box.querySelectorAll('.tb-inner span'); }
  function innerOf(box) { return box.querySelector('.tb-inner'); }
  function fontScale(box, factor) {
    spansOf(box).forEach(function (s) {
      var m = (s.style.fontSize || '').match(CQ);
      var cur = m ? parseFloat(m[1]) : 3;
      var nv = Math.min(MAX_FS, Math.max(MIN_FS, cur * factor));
      s.style.fontSize = nv.toFixed(3) + 'cqw';
    });
    refreshFsLabel();
  }
  function curFsCqw(box) {
    var s = box.querySelector('.tb-inner span');
    var m = s && (s.style.fontSize || '').match(CQ);
    return m ? parseFloat(m[1]) : 0;
  }
  function setHAlign(box, v) { var i = innerOf(box); if (i) { i.style.textAlign = v; i.style.maxWidth = '100%'; } markAlign(); }
  function setVAlign(box, v) {
    box.style.display = 'flex'; box.style.flexDirection = 'column';
    box.style.justifyContent = v; markAlign();
  }

  /* ---- line height ------------------------------------------------------- */
  function curLineHeight(box) {
    var inner = innerOf(box);
    var lh = inner && inner.style.lineHeight;
    if (!lh) { var sp = box.querySelector('.tb-inner span'); lh = sp && sp.style.lineHeight; }
    return lh ? parseFloat(lh) : LH_DEFAULT;
  }
  function setLineHeight(box, v) {
    v = Math.min(LH_MAX, Math.max(LH_MIN, v));
    var inner = innerOf(box);
    if (inner) inner.style.lineHeight = v.toFixed(2);
    box.querySelectorAll('.tb-inner span').forEach(function (s) { s.style.lineHeight = v.toFixed(2); });
    if (lhLabel) lhLabel.textContent = v.toFixed(1);
  }
  function refreshLhLabel() {
    if (!lhLabel || !sel) return;
    lhLabel.textContent = curLineHeight(sel).toFixed(1);
  }

  /* ---- line measurement (shared by autofit + de-orphan) ----------------- */
  function lineRects(inner) {
    var rng = document.createRange();
    rng.selectNodeContents(inner);
    var rects = Array.prototype.slice.call(rng.getClientRects());
    rng.detach && rng.detach();
    // merge fragment rects that share a line (rounded top)
    var lines = [];
    rects.forEach(function (r) {
      if (r.width < 0.5 || r.height < 0.5) return;
      var t = Math.round(r.top);
      var ln = lines.find(function (L) { return Math.abs(L.top - t) <= 2; });
      if (ln) { ln.left = Math.min(ln.left, r.left); ln.right = Math.max(ln.right, r.right); }
      else lines.push({ top: t, left: r.left, right: r.right });
    });
    lines.forEach(function (L) { L.width = L.right - L.left; });
    lines.sort(function (a, b) { return a.top - b.top; });
    return lines;
  }
  var CJK = /[㐀-鿿豈-﫿]/;     // Han ideographs
  // Count how many characters sit on the LAST visual line, by measuring each
  // glyph's top via a Range (transform-scale agnostic — tops compare to tops).
  // A width heuristic over-flags English words / numbers / tiny stat boxes; an
  // exact last-line char count + a CJK gate flags ONLY a real 独字成行.
  function charsOnLastLine(inner) {
    var walker = document.createTreeWalker(inner, NodeFilter.SHOW_TEXT, null);
    var chars = [], n;
    while ((n = walker.nextNode())) {
      var s = n.nodeValue || '';
      for (var k = 0; k < s.length; k++) { if (s[k] !== WJ && s[k].trim()) chars.push([n, k]); }
    }
    if (chars.length < 2) return { count: chars.length, last: chars.length ? chars[chars.length - 1][0].nodeValue[chars[chars.length - 1][1]] : '' };
    var rng = document.createRange();
    function topOf(i) { rng.setStart(chars[i][0], chars[i][1]); rng.setEnd(chars[i][0], chars[i][1] + 1); var r = rng.getClientRects(); return r.length ? Math.round(r[r.length - 1].top) : -1; }
    var lastTop = topOf(chars.length - 1), cnt = 0;
    for (var i = chars.length - 1; i >= 0; i--) { if (topOf(i) === lastTop) cnt++; else break; }
    return { count: cnt, last: chars[chars.length - 1][0].nodeValue[chars[chars.length - 1][1]] };
  }
  function isOrphan(box) {
    var inner = innerOf(box); if (!inner) return false;
    var txt = (inner.textContent || '').replace(new RegExp(WJ, 'g'), '');
    if (!CJK.test(txt)) return false;                 // only CJK boxes can 独字成行
    if (lineRects(inner).length < 2) return false;     // single line → fine
    var info = charsOnLastLine(inner);
    return info.count === 1 && CJK.test(info.last);     // exactly one Han glyph alone
  }

  /* ---- AutoFit: shrink font until content fits the box ------------------ */
  function fitBox(box) {
    var inner = innerOf(box); if (!inner) return;
    for (var i = 0; i < 10; i++) {
      var availH = box.clientHeight - padV(box);
      var availW = box.clientWidth - padH(box);
      var sh = inner.scrollHeight, sw = inner.scrollWidth;
      if (sh <= availH + 0.5 && sw <= availW + 0.5) break;
      var ratio = Math.min(availH / Math.max(1, sh), availW / Math.max(1, sw));
      fontScale(box, Math.max(0.80, ratio * 0.985));   // damped, never <0.8 per step
    }
  }
  function padV(box) { var c = getComputedStyle(box); return parseFloat(c.paddingTop) + parseFloat(c.paddingBottom); }
  function padH(box) { var c = getComputedStyle(box); return parseFloat(c.paddingLeft) + parseFloat(c.paddingRight); }

  /* ---- de-orphan (独字成行) --------------------------------------------- *
   * Shrinking the font does NOT reliably remove an orphan (a narrow box leaves
   * one glyph on the last line at any size). The robust fix is structural: bind
   * the last two glyphs with a WORD JOINER (U+2060, zero-width no-break) so the
   * last line can never be a single character. text-wrap:pretty (CSS baseline)
   * already prevents most; the joiner is the guarantee. */
  var WJ = String.fromCharCode(0x2060);   // WORD JOINER (zero-width); kept for skip-check
  function lastTextSpan(box) {
    var sp = box.querySelectorAll('.tb-inner span');
    for (var i = sp.length - 1; i >= 0; i--) { if ((sp[i].textContent || '').trim()) return sp[i]; }
    return null;
  }
  function deorphanBox(box) {
    var inner = innerOf(box); if (!inner) return false;
    inner.style.textWrap = 'pretty';
    if (!isOrphan(box)) return false;
    var sp = lastTextSpan(box); if (!sp) return false;
    if (sp.dataset.epxBond) return false;                      // already bonded
    var t = sp.textContent;
    if (t.length < 2) return false;
    // split the last glyph-pair into a sibling span that can't break internally —
    // physically guarantees the last line holds ≥2 glyphs (kept flat so the sync
    // <span> regex still sees clean sibling runs).
    sp.textContent = t.slice(0, -2);
    var b = sp.cloneNode(false);
    b.removeAttribute('data-el-id');
    b.dataset.epxBond = '1';
    b.style.whiteSpace = 'nowrap';
    b.textContent = t.slice(-2);
    sp.parentNode.insertBefore(b, sp.nextSibling);
    if (!sp.textContent) sp.remove();                          // drop now-empty head
    return true;
  }

  /* ---- selection + overlay --------------------------------------------- */
  function ensureLayer() {
    if (layer && document.body.contains(layer)) return;
    layer = mk('div', 'epx-layer');
    outline = mk('div', 'epx-outline'); layer.appendChild(outline);
    ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(function (k) {
      var h = mk('div', 'epx-h ' + k + ''); h.dataset.k = k;
      h.addEventListener('pointerdown', onResizeDown); handles[k] = h; layer.appendChild(h);
    });
    moveH = mk('div', 'epx-move'); moveH.textContent = '✥';
    moveH.title = '拖动移动'; moveH.addEventListener('pointerdown', onMoveDown);
    layer.appendChild(moveH);
    buildToolbar();
    hint = mk('div', 'epx-hint');
    hint.innerHTML = '编辑态 · 点选文本框 → <b>拖框体移动</b> / 拖角手柄缩放 / 工具条改字号·对齐·AutoFit · 单击进文字编辑 · ⌘S 保存 · Esc 退出';
    layer.appendChild(hint);
    document.body.appendChild(layer);
  }
  function mk(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }

  function buildToolbar() {
    toolbar = mk('div', 'epx-toolbar');
    function btn(label, title, fn, cls) {
      var b = mk('button', cls || ''); b.textContent = label; b.title = title || '';
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); });
      b.addEventListener('click', function (e) { e.stopPropagation(); if (sel) { fn(sel); glue(); } });
      toolbar.appendChild(b); return b;
    }
    function sep() { toolbar.appendChild(mk('span', 'epx-sep')); }
    btn('A−', '减小字号', function (b) { fontScale(b, 1 / 1.08); });
    fsLabel = mk('span', 'epx-fs'); toolbar.appendChild(fsLabel);
    btn('A+', '增大字号', function (b) { fontScale(b, 1.08); });
    sep();
    var hg = mk('span', 'epx-grp');
    [['⫷', 'left', '左对齐'], ['≡', 'center', '居中'], ['⫸', 'right', '右对齐']].forEach(function (a) {
      var b = mk('button'); b.textContent = a[0]; b.title = a[2]; b.dataset.ha = a[1];
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); });
      b.addEventListener('click', function (e) { e.stopPropagation(); if (sel) { setHAlign(sel, a[1]); glue(); } });
      hg.appendChild(b);
    });
    toolbar.appendChild(hg);
    sep();
    var vg = mk('span', 'epx-grp');
    [['⤒', 'flex-start', '顶对齐'], ['⊟', 'center', '垂直居中'], ['⤓', 'flex-end', '底对齐']].forEach(function (a) {
      var b = mk('button'); b.textContent = a[0]; b.title = a[2]; b.dataset.va = a[1];
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); });
      b.addEventListener('click', function (e) { e.stopPropagation(); if (sel) { setVAlign(sel, a[1]); glue(); } });
      vg.appendChild(b);
    });
    toolbar.appendChild(vg);
    sep();
    btn('≡−', '减小行间距', function (b) { setLineHeight(b, curLineHeight(b) - LH_STEP); });
    lhLabel = mk('span', 'epx-fs'); lhLabel.title = '行间距'; toolbar.appendChild(lhLabel);
    btn('≡+', '增大行间距', function (b) { setLineHeight(b, curLineHeight(b) + LH_STEP); });
    sep();
    btn('AutoFit', '缩放字号以适配文本框', function (b) { fitBox(b); });
    btn('去孤字', '消除独字成行', function (b) { deorphanBox(b); });
    layer.appendChild(toolbar);
  }

  function refreshFsLabel() {
    if (!fsLabel || !sel) return;
    var cqw = curFsCqw(sel);
    // express as design px on the 1920-wide canvas (matches deck.json `size`)
    fsLabel.textContent = Math.round(cqw / 100 * 1920) + 'px';
  }
  function markAlign() {
    if (!toolbar || !sel) return;
    var i = innerOf(sel), ta = i ? (i.style.textAlign || 'left') : 'left';
    var jc = sel.style.justifyContent || 'flex-start';
    toolbar.querySelectorAll('[data-ha]').forEach(function (b) { b.classList.toggle('on', b.dataset.ha === ta); });
    toolbar.querySelectorAll('[data-va]').forEach(function (b) { b.classList.toggle('on', b.dataset.va === jc); });
    refreshLhLabel();
  }

  function select(box) {
    if (typeof box === 'string') box = document.querySelector('[data-el-id="' + box + '"]');
    if (!box || !box.classList.contains('tb')) return;
    if (sel) sel.classList.remove('epx-selected');
    sel = box; sel.classList.add('epx-selected');
    ensureLayer();
    show(true); glue(); refreshFsLabel(); markAlign();
    startGlue();
  }
  function deselect() {
    if (sel) sel.classList.remove('epx-selected');
    sel = null; show(false); stopGlue();
  }
  function show(on) {
    if (!layer) return;
    [outline, toolbar, moveH].concat(Object.values(handles)).forEach(function (e) {
      if (e) e.style.display = on ? '' : 'none';
    });
  }

  // glue the overlay onto the selected box's current screen rect
  function glue() {
    if (!sel) return;
    var r = sel.getBoundingClientRect();
    pos(outline, r.left, r.top, r.width, r.height);
    var H = { nw: [r.left, r.top], n: [r.left + r.width / 2, r.top], ne: [r.right, r.top],
      e: [r.right, r.top + r.height / 2], se: [r.right, r.bottom], s: [r.left + r.width / 2, r.bottom],
      sw: [r.left, r.bottom], w: [r.left, r.top + r.height / 2] };
    Object.keys(H).forEach(function (k) { handles[k].style.left = H[k][0] + 'px'; handles[k].style.top = H[k][1] + 'px'; });
    // move handle sits OUTSIDE the box's left edge, clear of the toolbar above
    // (the toolbar used to cover the handle → its buttons ate the mousedown, so
    // the handle could never start a drag — the "can't move" bug).
    moveH.style.left = (r.left - 28) + 'px'; moveH.style.top = (r.top - 2) + 'px';
    // anchor the toolbar's LEFT edge above the box (no transform centering — a
    // transformed fixed overlay triggers the phantom-circle compositing bug).
    toolbar.style.left = Math.max(8, Math.min(window.innerWidth - 360, r.left)) + 'px';
    toolbar.style.top = Math.max(44, r.top - 46) + 'px';
  }
  function pos(el, l, t, w, h) { el.style.left = l + 'px'; el.style.top = t + 'px'; el.style.width = w + 'px'; el.style.height = h + 'px'; }
  // Re-glue on scroll/resize ONLY — NOT a continuous rAF loop. A per-frame
  // glue() reads getBoundingClientRect every frame; that continuous forced
  // reflow over the transform-scaled / container-query / content-visibility deck
  // made Chrome mis-paint (green vignette + circle) the whole time a box was
  // selected. Drag/resize handlers already call glue() during their gestures, so
  // event-driven glue covers every case with zero idle reflow.
  function onGlue() { if (sel) glue(); }
  function startGlue() { stopGlue(); window.addEventListener('scroll', onGlue, true); window.addEventListener('resize', onGlue); }
  function stopGlue() { window.removeEventListener('scroll', onGlue, true); window.removeEventListener('resize', onGlue); }

  /* ---- drag move -------------------------------------------------------- */
  // Drag/resize bind pointermove+up to WINDOW (capture phase), NOT to the handle.
  // setPointerCapture on the handle is unreliable here (the deck's stacking +
  // the move slipping off the 22px handle made the captured target miss the
  // moves, so nothing updated — the "can't drag" bug). Window-capture always
  // sees every move until pointerup, regardless of what's under the cursor.
  function onMoveDown(e) {
    if (!sel) return; e.preventDefault(); e.stopPropagation();
    var sx = e.clientX, sy = e.clientY, l0 = getCq(sel, 'left'), t0 = getCq(sel, 'top');
    function mv(ev) { ev.preventDefault(); setCqLeft(sel, l0 + dxToCqw(sel, ev.clientX - sx)); setCqTop(sel, t0 + dyToCqh(sel, ev.clientY - sy)); glue(); }
    function up() { window.removeEventListener('pointermove', mv, true); window.removeEventListener('pointerup', up, true); }
    window.addEventListener('pointermove', mv, true); window.addEventListener('pointerup', up, true);
  }

  /* ---- resize ----------------------------------------------------------- */
  function onResizeDown(e) {
    if (!sel) return; e.preventDefault(); e.stopPropagation();
    var k = e.currentTarget.dataset.k, h = e.currentTarget;
    var sx = e.clientX, sy = e.clientY;
    var l0 = getCq(sel, 'left'), t0 = getCq(sel, 'top'), w0 = getCq(sel, 'width'), h0 = getCq(sel, 'height');
    function mv(ev) {
      ev.preventDefault();
      var dw = dxToCqw(sel, ev.clientX - sx), dh = dyToCqh(sel, ev.clientY - sy);
      var l = l0, t = t0, w = w0, hh = h0;
      if (k.indexOf('e') >= 0) w = w0 + dw;
      if (k.indexOf('s') >= 0) hh = h0 + dh;
      if (k.indexOf('w') >= 0) { w = w0 - dw; l = l0 + dw; }
      if (k.indexOf('n') >= 0) { hh = h0 - dh; t = t0 + dh; }
      if (w < MIN_W) { if (k.indexOf('w') >= 0) l = l0 + (w0 - MIN_W); w = MIN_W; }
      if (hh < MIN_H) { if (k.indexOf('n') >= 0) t = t0 + (h0 - MIN_H); hh = MIN_H; }
      setCqLeft(sel, l); setCqTop(sel, t); setCqW(sel, w); setCqH(sel, hh); glue();
    }
    function up() { window.removeEventListener('pointermove', mv, true); window.removeEventListener('pointerup', up, true); }
    window.addEventListener('pointermove', mv, true); window.addEventListener('pointerup', up, true);
  }

  /* ---- whole-deck typography pass -------------------------------------- */
  function fixAll(opts) {
    opts = opts || { deorphan: true, autofit: false };
    var n = 0;
    document.querySelectorAll('.el.tb').forEach(function (box) {
      if (opts.autofit) fitBox(box);
      if (opts.deorphan && deorphanBox(box)) n++;
    });
    return n;
  }

  /* ---- selection wiring (delegated) ------------------------------------ */
  function onDocPointerDown(e) {
    if (!document.body.classList.contains('deck-edit-mode')) return;
    if (e.target.closest('.epx-layer')) return;            // our handles/toolbar handle themselves
    var box = e.target.closest('.el.tb');
    if (!box) { deselect(); return; }
    select(box);
    // BODY DRAG: dragging anywhere on the box moves it (the intuitive gesture —
    // the ✥ handle alone was non-obvious AND got covered by the toolbar). A small
    // threshold distinguishes a drag (move the box) from a click (edit the text):
    // below threshold we never preventDefault, so the click still lands a caret.
    var sx = e.clientX, sy = e.clientY, l0 = getCq(box, 'left'), t0 = getCq(box, 'top'), dragging = false;
    function mv(ev) {
      var dx = ev.clientX - sx, dy = ev.clientY - sy;
      if (!dragging && Math.abs(dx) + Math.abs(dy) < 5) return;
      if (!dragging) {
        dragging = true;
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        var s = window.getSelection && window.getSelection(); if (s && s.removeAllRanges) s.removeAllRanges();
        box.style.userSelect = 'none';
      }
      ev.preventDefault();
      setCqLeft(box, l0 + dxToCqw(box, dx)); setCqTop(box, t0 + dyToCqh(box, dy)); glue();
    }
    function up() { window.removeEventListener('pointermove', mv, true); window.removeEventListener('pointerup', up, true); box.style.userSelect = ''; }
    window.addEventListener('pointermove', mv, true); window.addEventListener('pointerup', up, true);
  }

  /* ---- save guard: strip transient UI before canonical buildSavedHTML --- *
   * Canonical ⌘S handler lives on document (capture). A window-capture
   * listener fires earlier in the capture path, so we tear our UI down first;
   * we do NOT preventDefault, so the canonical save then clones a clean DOM. */
  function onWinKeydownCapture(e) {
    if (!document.body.classList.contains('deck-edit-mode')) return;
    if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 's') {
      var hadSel = sel;
      teardownTransient();
      if (hadSel) setTimeout(function () { select(hadSel); }, 0);   // restore after save
    }
  }
  function teardownTransient() { stopGlue(); if (layer) { layer.remove(); layer = null; handles = {}; } }

  /* ---- lifecycle: follow the canonical editor on/off ------------------- */
  function activate() {
    document.addEventListener('pointerdown', onDocPointerDown, true);
    window.addEventListener('keydown', onWinKeydownCapture, true);
  }
  function deactivate() {
    document.removeEventListener('pointerdown', onDocPointerDown, true);
    window.removeEventListener('keydown', onWinKeydownCapture, true);
    deselect(); teardownTransient();
  }
  var wasEdit = false;
  new MutationObserver(function () {
    var on = document.body.classList.contains('deck-edit-mode');
    if (on && !wasEdit) activate();
    else if (!on && wasEdit) deactivate();
    wasEdit = on;
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* ---- (removed) injectEditBackgrounds ---------------------------------- *
   * An earlier version re-emitted the present-only slide-frame `:has()`
   * background rules under body.deck-edit-mode, believing edit/scroll mode lost
   * the LibreOffice backgrounds. It does NOT: every slide carries its background
   * as a canvas <img data-el-id="bgN"> element, visible in BOTH modes. So the
   * injection was redundant — AND emitting many `:has()` backgrounds onto the
   * stacked, transform-scaled, content-visibility slide-frames in scroll mode
   * triggered the green-vignette + dark-circle compositing artifact. Dropped. */

  /* ---- de-orphan is BAKED at install time, NOT run live -----------------
   * Earlier this ran per-slide on scroll via IntersectionObserver. That fired
   * charsOnLastLine()'s per-glyph Range.getClientRects() across many slides at
   * once in scroll/edit layout (transform-scaled + container-query + content-
   * visibility), and the forced synchronous reflow storm made Chrome mis-paint
   * the whole slide as a green vignette + dark circle (repro'd headless AND in a
   * real browser). So de-orphan now runs ONCE, headless, at install time
   * (install.py → bake.js calls fixAll then writes the bonds into the static
   * HTML). The delivered deck is orphan-free with ZERO runtime measurement.
   * The toolbar 去孤字 button still works — but only on the ONE selected box
   * (a single-box measure is cheap and never triggers the storm). */

  /* ---- public API (humans use the UI; this is for scripts/tests) ------- */
  window.deckEditPlus = {
    select: select, deselect: deselect,
    move: function (dxCqw, dyCqh) { if (sel) { setCqLeft(sel, getCq(sel, 'left') + dxCqw); setCqTop(sel, getCq(sel, 'top') + dyCqh); glue(); } },
    resize: function (dwCqw, dhCqh) { if (sel) { setCqW(sel, getCq(sel, 'width') + dwCqw); setCqH(sel, getCq(sel, 'height') + dhCqh); glue(); } },
    fontScale: function (f) { if (sel) fontScale(sel, f); },
    hAlign: function (v) { if (sel) setHAlign(sel, v); },
    vAlign: function (v) { if (sel) setVAlign(sel, v); },
    autofit: function () { if (sel) fitBox(sel); },
    deorphan: function () { if (sel) return deorphanBox(sel); },
    isOrphan: function (id) { var b = document.querySelector('[data-el-id="' + id + '"]'); return b && isOrphan(b); },
    fixAll: fixAll,
    sel: function () { return sel && sel.dataset.elId; }
  };
})();

/* ============================================================================
 * deck-editplus · ENCRYPTED SPEAKER NOTES (口播稿加密)
 * ----------------------------------------------------------------------------
 * The canonical presenter (feishu-deck.js, press P) stores speaker notes as
 * PLAINTEXT in a #fs-deck-notes JSON island that gets baked into the delivered
 * HTML — anyone who opens the file can read the script. For client-confidential
 * scripts that's unacceptable. This addon, NON-INVASIVELY:
 *   • hides the canonical plaintext notes textarea inside the speaker view,
 *   • injects a password gate + its own notes textarea,
 *   • stores notes AES-GCM-encrypted (PBKDF2 150k) in a separate
 *     #epx-enc-notes island → only ciphertext `v1:salt:iv:ct` ever hits disk,
 *   • keeps the password in memory only (never stored, never written).
 * Unlock in the speaker view to read/edit; ⌘S / 💾 bakes the ciphertext island.
 * Opt out with <body data-epx-no-encnotes>.
 * ==========================================================================*/
(function () {
  'use strict';
  if (document.body.hasAttribute('data-epx-no-encnotes')) return;
  if (!(window.crypto && crypto.subtle)) return;   // needs a secure context (https/file://)

  var pw = null;                 // in-memory password (never persisted)
  var ITER = 150000;
  var te = new TextEncoder(), td = new TextDecoder();
  function b64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
  function ub64(s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0); }); }
  function deriveKey(p, salt) {
    return crypto.subtle.importKey('raw', te.encode(p), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations: ITER, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      });
  }
  function enc(text, p) {
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    return deriveKey(p, salt).then(function (k) {
      return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, te.encode(text));
    }).then(function (ct) { return 'v1:' + b64(salt) + ':' + b64(iv) + ':' + b64(ct); });
  }
  function dec(blob, p) {
    var a = blob.split(':'); if (a[0] !== 'v1') return Promise.reject(new Error('bad'));
    var salt = ub64(a[1]), iv = ub64(a[2]), ct = ub64(a[3]);
    return deriveKey(p, salt).then(function (k) {
      return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, ct);
    }).then(function (pt) { return td.decode(pt); });
  }

  // ciphertext store (its own island; canonical #fs-deck-notes is left empty)
  function island() {
    var el = document.getElementById('epx-enc-notes');
    if (!el) { el = document.createElement('script'); el.type = 'application/json'; el.id = 'epx-enc-notes'; el.textContent = '{}'; document.body.appendChild(el); }
    return el;
  }
  function readEnc() { try { return JSON.parse(island().textContent || '{}'); } catch (e) { return {}; } }
  function writeEnc(o) { island().textContent = JSON.stringify(o); }
  function hasAnyNotes() { var o = readEnc(); for (var k in o) if (o[k]) return true; return false; }
  function curKey() {
    var s = document.querySelector('.slide-frame.is-current .slide[data-slide-key]') ||
            document.querySelector('.slide-frame.is-current [data-slide-key]');
    return s ? s.getAttribute('data-slide-key') : null;
  }

  var panel = null, ta = null, pwInput = null, lockBadge = null, unlockBtn = null, msg = null;

  function setupPanel(pv) {
    if (pv.querySelector('.epx-notes-wrap')) { panel = pv.querySelector('.epx-notes-wrap'); return; }
    var canon = pv.querySelector('.pv-notes'), canonLab = pv.querySelector('.pv-notes-lab');
    if (canon) canon.style.display = 'none';
    if (canonLab) canonLab.style.display = 'none';
    panel = document.createElement('div'); panel.className = 'epx-notes-wrap';
    panel.innerHTML =
      '<div class="epx-notes-lab">🔒 加密讲稿 <span class="epx-lock">已锁定</span>' +
        '<span class="epx-msg"></span></div>' +
      '<div class="epx-pwrow"><input class="epx-pw" type="password" autocomplete="off" placeholder="密码"/>' +
        '<button class="epx-unlock" type="button">🔓 解锁 / 设密码</button></div>' +
      '<textarea class="epx-notes" spellcheck="false" disabled ' +
        'placeholder="输入密码后可读写本页加密讲稿（密文存盘，明文绝不落地）"></textarea>';
    (canon || canonLab || pv.querySelector('.pv-col') || pv).parentNode
      ? (canon ? canon.parentNode.insertBefore(panel, canon.nextSibling) : pv.appendChild(panel))
      : pv.appendChild(panel);
    ta = panel.querySelector('.epx-notes');
    pwInput = panel.querySelector('.epx-pw');
    lockBadge = panel.querySelector('.epx-lock');
    unlockBtn = panel.querySelector('.epx-unlock');
    msg = panel.querySelector('.epx-msg');
    unlockBtn.addEventListener('click', onUnlock);
    pwInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); onUnlock(); } });
    ta.addEventListener('input', onEdit);
  }

  function setMsg(t, ok) { if (msg) { msg.textContent = t ? ' · ' + t : ''; msg.style.color = ok ? '#5ad19a' : '#ff8a8a'; } }

  // ── resizable 预览/讲稿 split (draggable divider, persisted) ──────────── *
  // The speaker view is an OPAQUE full-screen overlay covering the whole deck,
  // so adding/dragging elements inside it never touches the deck's compositing
  // (no phantom-circle risk). A vertical divider between the two .pv-col columns
  // re-proportions grid-template-columns; the ratio persists in localStorage. */
  var SPLIT_KEY = 'epx-pv-split';
  function setupSplitter(pv) {
    var grid = pv.querySelector('.pv-grid');
    if (!grid || grid.querySelector('.epx-split')) return;
    var cols = grid.querySelectorAll(':scope > .pv-col');
    if (cols.length < 2) return;
    var ratio = 0.608;                                   // default = 1.55fr / (1.55fr+1fr)
    try { var s = parseFloat(localStorage.getItem(SPLIT_KEY)); if (s > 0.2 && s < 0.8) ratio = s; } catch (e) {}
    function apply(r) { grid.style.gridTemplateColumns = (r * 100).toFixed(2) + 'fr 8px ' + ((1 - r) * 100).toFixed(2) + 'fr'; }
    apply(ratio);
    var sp = document.createElement('div');
    sp.className = 'epx-split'; sp.title = '拖动调整 预览 / 讲稿 占比';
    grid.insertBefore(sp, cols[1]);
    sp.addEventListener('pointerdown', function (e) {
      e.preventDefault(); sp.setPointerCapture(e.pointerId);
      function mv(ev) { var r = grid.getBoundingClientRect(); var f = (ev.clientX - r.left) / r.width; ratio = Math.max(0.2, Math.min(0.8, f)); apply(ratio); }
      function up() { sp.removeEventListener('pointermove', mv); sp.removeEventListener('pointerup', up); try { localStorage.setItem(SPLIT_KEY, ratio.toFixed(4)); } catch (e) {} }
      sp.addEventListener('pointermove', mv); sp.addEventListener('pointerup', up);
    });
  }

  function onUnlock() {
    var p = pwInput.value;
    if (!p) { setMsg('请输入密码'); return; }
    var o = readEnc();
    var firstKey = null; for (var k in o) { if (o[k]) { firstKey = k; break; } }
    if (!firstKey) {                       // no notes yet → this password becomes the key
      pw = p; afterUnlock('已设密码', true); return;
    }
    dec(o[firstKey], p).then(function () {  // verify against an existing note
      pw = p; afterUnlock('已解锁', true);
    }).catch(function () { setMsg('密码错误'); });
  }
  function afterUnlock(t, ok) {
    pwInput.value = ''; pwInput.style.display = 'none'; unlockBtn.textContent = '🔐 锁定';
    unlockBtn.onclick = null; unlockBtn.addEventListener('click', onLock, { once: true });
    lockBadge.textContent = '已解锁'; lockBadge.style.color = '#5ad19a';
    ta.disabled = false; setMsg(t, ok); refresh();
  }
  function onLock() {
    pw = null; ta.value = ''; ta.disabled = true;
    pwInput.style.display = ''; unlockBtn.textContent = '🔓 解锁 / 设密码';
    unlockBtn.onclick = null; unlockBtn.addEventListener('click', onUnlock);
    lockBadge.textContent = '已锁定'; lockBadge.style.color = '';
    setMsg('');
  }

  var editTimer = null;
  function onEdit() {
    if (!pw) return;
    var key = curKey(); if (!key) return;
    var val = ta.value;
    clearTimeout(editTimer);
    editTimer = setTimeout(function () {
      var o = readEnc();
      if (!val) { delete o[key]; writeEnc(o); return; }
      enc(val, pw).then(function (blob) { o[key] = blob; writeEnc(o); });
    }, 250);
  }

  function refresh() {
    if (!panel) return;
    var key = curKey();
    if (!pw) { ta.value = ''; ta.disabled = true; ta.placeholder = (hasAnyNotes() ? '🔒 本页讲稿已加密 — 上方输入密码解锁' : '输入密码以新建加密讲稿'); return; }
    ta.disabled = false;
    var o = readEnc();
    if (!key || !o[key]) { ta.value = ''; return; }
    dec(o[key], pw).then(function (t) { if (pw) ta.value = t; })
      .catch(function () { ta.value = ''; setMsg('本页解密失败(密码不一致?)'); });
  }

  // wrap the presenter's per-nav hook so our textarea follows slide changes
  function wrapNav() {
    var orig = window.__fsOnNav;
    if (orig && orig.__epxWrapped) return;
    var w = function (idx) { try { if (orig) orig(idx); } finally { setTimeout(refresh, 0); } };
    w.__epxWrapped = true; window.__fsOnNav = w;
  }

  // the speaker view (.fs-presenter) is built lazily on first P; watch for it
  new MutationObserver(function () {
    var pv = document.querySelector('.fs-presenter');
    if (pv && pv.style.display !== 'none') { setupPanel(pv); setupSplitter(pv); wrapNav(); setTimeout(refresh, 0); }
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

  // expose for scripts/tests
  window.deckEncNotes = {
    unlock: function (p) { pwInput && (pwInput.value = p); return onUnlock(); },
    lock: function () { pw = null; if (ta) { ta.value = ''; ta.disabled = true; } },
    setNote: function (key, text) { return enc(text, pw).then(function (b) { var o = readEnc(); o[key] = b; writeEnc(o); }); },
    getNote: function (key) { var o = readEnc(); return o[key] ? dec(o[key], pw) : Promise.resolve(''); },
    raw: readEnc, locked: function () { return !pw; }
  };
})();
