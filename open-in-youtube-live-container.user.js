// ==UserScript==
// @name         Open in Youtube Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://*.youtube.com/*
// @downloadURL  https://gist.github.com/nathandaven/76fd9c1e9e7c30eaea29003120acb4ae/raw/62f5aa9d52998135346bc622244a66879becc6d2/open-in-youtube-live-container.user.js
// @updateURL    https://gist.github.com/nathandaven/76fd9c1e9e7c30eaea29003120acb4ae/raw/62f5aa9d52998135346bc622244a66879becc6d2/open-in-youtube-live-container.user.js
// @homepage     https://gist.github.com/nathandaven/76fd9c1e9e7c30eaea29003120acb4ae
// ==/UserScript==

// need to encode the string to base64 for live container link to work
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function openInYoutube() {
  if (window.self !== window.top) return; // iframe
  if (window.location.pathname === "/redirect") return; // Opening link in browser from app

  window.location.href =
    `livecontainer://open-web-page?url=` +
    utf8_to_b64(
      `youtube://${window.location.pathname.slice(1)}${window.location.search}${
        window.location.hash
      }`
    );
}

openInYoutube();
