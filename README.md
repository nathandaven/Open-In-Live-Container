# Open-In-Live-Container

A userscript fork of [Open-In-Apollo](https://github.com/AnthonyGress/Open-In-Apollo) by Anthony Gress to support Apollo running within [Live Container](https://github.com/AnthonyGress/Open-In-Apollo). Supports Live Container **only**, for normal sideloaded Apollo see original script.

I've also adapted this to a few other scripts for Twitter, Youtube, Instagram, Strava/Fitbod and uploaded here. Thanks to https://gist.github.com/ryuya0124/e6e59ceba8f03bf40f3b5accedc52e44 for Twitter script.

## Available Userscripts

### Strava ↔ Fitbod OAuth (Featured)
- **[Strava to Fitbod OAuth Live Container](strava-fitbod-oauth-live-container.user.js)** - Enables Strava authorization within Fitbod in Live Container
  - Intercepts OAuth flow and redirects directly to Live Container
  - No intermediate web pages or 404 errors
  - Seamless integration experience

### Other App Scripts
- [Open In Apollo Live Container](https://github.com/nathandaven/Open-In-Apollo-Live-Container/raw/525f547ed2cbca1d8edaeee8a9a8c52715521224/open-in-apollo-live-container.user.js) - Reddit links
- [Open In Twitter Live Container](open-in-twitter-live-container.user.js) - Twitter/X links
- [Open In Instagram Live Container](open-in-instagram-live-container.user.js) - Instagram links
- [Open In YouTube Live Container](open-in-youtube-live-container.user.js) - YouTube links

## How to install

- Install the free open source app [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887)  
- Launch the app and choose path for scripts  
- Enable userscripts on your iPhone in Settings > Safari > Extensions and allow access to sites
- On iPhone/iPad tap to see the open the code [Open In Apollo Live Container Userscript](https://github.com/nathandaven/Open-In-Apollo-Live-Container/raw/525f547ed2cbca1d8edaeee8a9a8c52715521224/open-in-apollo-live-container.user.js)  
- Tap Aa in safari and Tap Userscripts  
- Install the detected Userscript.

## Usage

- Open any reddit link in Safari, you should see a pop up asking if you want to "Open this page in LiveContainer"
  
  <img width="386" alt="image" src="https://github.com/user-attachments/assets/36f5b6bb-9a22-4637-aa0e-490cef45ba1d" />

- It will redirect to Live Container breifly and open Apollo inside Live Container.

- Tested on iOS 18.2.1, with Apollo 1.15.11 + ApolloPatcher 0.0.9 and Live Container 3.1.59-release

### Strava ↔ Fitbod OAuth Connection

**What it does**: Enables linking your Strava account to Fitbod when running inside Live Container.

**Why it's needed**: Fitbod uses deep links (`fitbod://`) for OAuth callbacks, but Safari can't open these URLs directly. This script intercepts the authorization flow and redirects to Live Container instead.

**How to use**:
1. Install the [Strava OAuth userscript](strava-fitbod-oauth-live-container.user.js)
2. In Fitbod (within Live Container), go to Settings → Link Strava
3. Click "Authorize" on the Strava page
4. Script automatically captures the OAuth response and opens Fitbod
5. Your Strava account is now linked!

**Technical flow**:
1. Intercepts form submission on Strava OAuth page
2. Submits authorization request via fetch
3. Captures the `fitbod://` redirect URL from response headers
4. Converts to `livecontainer://open-web-page?url=...`
5. Redirects directly to Fitbod in Live Container
