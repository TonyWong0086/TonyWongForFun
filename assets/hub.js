/* ============================================================
   Fun Stuffs — Shared hub helper
   Loaded by every project. Two jobs:
     1. Inject a consistent floating "Back to Hub" pill.
     2. Expose a tiny FX namespace (toast, copy, random helpers)
        so individual toys stop re-implementing the basics.

   Usage in a project page:
     <link rel="stylesheet" href="../../assets/theme.css">
     <script src="../../assets/hub.js" data-hub="../../index.html"></script>

   Opt out of the auto pill with data-no-back on the <script> tag,
   or force the dark variant with data-dark.
   ============================================================ */
(function () {
  'use strict';

  var script = document.currentScript;
  var hubHref = (script && script.getAttribute('data-hub')) || '../../index.html';
  var noBack = script && script.hasAttribute('data-no-back');
  var forceDark = script && script.hasAttribute('data-dark');

  /* ---- helpers ------------------------------------------- */

  function luminanceIsDark() {
    if (forceDark) return true;
    try {
      var bg = getComputedStyle(document.body).backgroundColor;
      var m = bg.match(/\d+(\.\d+)?/g);
      if (!m) return false;
      var r = +m[0], g = +m[1], b = +m[2], a = m[3] != null ? +m[3] : 1;
      if (a < 0.5) return false; // transparent bodies → assume light
      // perceived luminance
      return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
    } catch (e) { return false; }
  }

  function injectBackPill() {
    if (noBack || document.querySelector('.fx-back')) return;
    var a = document.createElement('a');
    a.className = 'fx-back';
    a.href = hubHref;
    a.setAttribute('aria-label', 'Back to the hub');
    a.innerHTML = '<span class="fx-back-arrow" aria-hidden="true">&larr;</span>' +
                  '<span>Back to Hub</span>';
    if (luminanceIsDark()) a.setAttribute('data-fx-dark', '');
    document.body.appendChild(a);
  }

  function injectProjectStamp() {
    if (document.querySelector('.fx-project-stamp')) return;
    var a = document.createElement('a');
    a.className = 'fx-project-stamp';
    a.href = hubHref;
    a.setAttribute('aria-label', 'Return to the Fun Stuffs collection');
    a.innerHTML = '<span>Fun Stuffs / Exhibit</span>';
    document.body.appendChild(a);
  }

  /* ---- public FX namespace ------------------------------- */

  var toastWrap = null;
  function toast(message, ms) {
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.className = 'fx-toast-wrap';
      document.body.appendChild(toastWrap);
    }
    var el = document.createElement('div');
    el.className = 'fx-toast';
    el.textContent = message;
    toastWrap.appendChild(el);
    setTimeout(function () {
      el.classList.add('fx-leaving');
      setTimeout(function () { el.remove(); }, 300);
    }, ms || 1800);
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () {
        toast('Copied to clipboard');
        return true;
      }).catch(function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast('Copied to clipboard');
      return true;
    } catch (e) {
      toast('Copy failed — select manually');
      return false;
    }
  }

  /* Pick a random array element that isn't the same as `avoid`
     (so generators don't repeat back-to-back). */
  function pick(arr, avoid) {
    if (!arr || !arr.length) return undefined;
    if (arr.length === 1) return arr[0];
    var v;
    do { v = arr[Math.floor(Math.random() * arr.length)]; } while (v === avoid);
    return v;
  }

  window.FX = { toast: toast, copy: copy, pick: pick };

  /* ---- boot ---------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectBackPill();
      injectProjectStamp();
    });
  } else {
    injectBackPill();
    injectProjectStamp();
  }
})();
