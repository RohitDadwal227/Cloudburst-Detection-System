# ⛈️ CloudBurst India — Weather & Storm Risk

Live weather + cloudburst risk for any Indian city. Works on phone, tablet, desktop.  
Can be **installed as an app** on Android & iPhone — no app store needed.

---

## 🚀 Deploy in 2 minutes (Vercel — recommended)

1. Go to **[vercel.com](https://vercel.com)** → Sign up free with GitHub/Google
2. Click **"Add New Project"** → **"Upload"** (or connect GitHub repo)
3. Drag and drop **this entire folder**
4. Click **Deploy** — you get a link like `https://cloudburst-india.vercel.app`
5. Share that link — works on any phone anywhere!

---

## 📱 Install on Phone (after deploying)

### Android
1. Open the link in **Chrome**
2. Tap the **"Add to Home Screen"** banner — or tap ⋮ → "Install app"
3. App icon appears on home screen, works like a native app

### iPhone (iOS)
1. Open the link in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (box with arrow at bottom)
3. Tap **"Add to Home Screen"** → Add

---

## 🌐 Other free deploy options

### Netlify
1. Go to **[netlify.com](https://netlify.com)**
2. Drag this folder into the deploy zone on the dashboard
3. Instantly live at `https://random-name.netlify.app`

### GitHub Pages
1. Push folder to a GitHub repo
2. Settings → Pages → Deploy from main branch
3. Live at `https://yourusername.github.io/repo-name`

---

## 💻 Run locally

```bash
node server.js
# Open http://localhost:3000
```

---

## 🔑 API Key

Your OpenWeatherMap key: `ccc12e9508e68e923cd1f0d502d3ea23`
- New keys take **up to 2 hours** to activate
- Free tier: **1,000 calls/day**
- To change: edit `API_KEY` in `index.html` and `server.js`

---

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app |
| `manifest.json` | PWA — enables phone install |
| `sw.js` | Service worker — offline support |
| `vercel.json` | Vercel config |
| `netlify.toml` | Netlify config |
| `server.js` | Local dev server (not needed for deploy) |

**Emergency numbers:** NDMA 1078 · Police 100 · Ambulance 108
