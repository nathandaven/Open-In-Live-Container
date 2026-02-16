// ==UserScript==
// @name         Strava to Fitbod OAuth Live Container
// @version      1.0.0
// @author       AnasHafsi
// @description  Intercepts Strava OAuth and redirects directly to Fitbod in Live Container
// @match        *://www.strava.com/oauth/*
// @match        *://www.strava.com/oauth/authorize*
// @match        *://www.strava.com/oauth/mobile/authorize*
// @downloadURL  https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/strava-fitbod-oauth-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Live-Container/raw/refs/heads/main/strava-fitbod-oauth-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    function extractRedirectUri(formAction) {
        const match = formAction.match(/redirect_uri=([^&]+)/);
        if (match) {
            return decodeURIComponent(match[1]);
        }
        return null;
    }

    // Intercept form submission and redirect directly to Live Container
    function interceptForm() {
        try {
            const form = document.querySelector('form[action*="redirect_uri"]');
            if (!form) {
                console.log('No authorization form found');
                return false;
            }

            console.log('Found authorization form');

            const formAction = form.getAttribute('action');
            const redirectUri = extractRedirectUri(formAction);

            if (!redirectUri || !redirectUri.includes('fitbod://')) {
                console.log('Not a Fitbod OAuth flow, skipping');
                return false;
            }

            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const formData = new FormData(form);
                const actionUrl = new URL(form.action, window.location.origin);

                const params = new URLSearchParams(actionUrl.search);
                for (const [key, value] of formData.entries()) {
                    params.set(key, value);
                }

                try {
                    const response = await fetch(actionUrl.pathname + '?' + params.toString(), {
                        method: 'POST',
                        credentials: 'include',
                        redirect: 'manual'
                    });
                    const location = response.headers.get('Location');

                    if (location) {
                        if (location.startsWith('fitbod://')) {
                            // Convert to Live Container URL
                            const liveContainerUrl = `livecontainer://open-web-page?url=${utf8_to_b64(location)}`;
                            window.location.href = liveContainerUrl;
                        } else if (location.startsWith('https://fitbod.me')) {
                            // Fallback: convert https to fitbod:// then to Live Container
                            const fitbodUrl = location.replace('https://', 'fitbod://');
                            const liveContainerUrl = `livecontainer://open-web-page?url=${utf8_to_b64(fitbodUrl)}`;
                            window.location.href = liveContainerUrl;
                        } else {
                            console.error('Unexpected redirect URL:', location);
                            alert('Unexpected OAuth redirect. Check console for details.');
                        }
                    } else {
                        alert('OAuth authorization failed - no redirect found');
                    }
                } catch (error) {
                    console.error('Error during OAuth submission:', error);
                    alert('Error during authorization: ' + error.message);
                }
            });
            return true;

        } catch (error) {
            console.error('Error setting up form interceptor:', error);
            return false;
        }
    }

    // Run when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', interceptForm);
        } else {
            interceptForm();
        }

        // Retry a few times in case of dynamic loading
        setTimeout(interceptForm, 500);
        setTimeout(interceptForm, 1000);
    }

    init();
})();