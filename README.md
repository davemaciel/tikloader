# TikLoader - Premium TikTok Downloader 🎵

![TikLoader Banner](public/screen.png) 
*(If you have a screenshot, place it in public/screen.png and uncomment the line above)*

**TikLoader** is a high-performance web application that allows users to download TikTok videos **without watermarks** in HD quality. 

Built with **Node.js** and a modern **HTML5/Tailwind-inspired** frontend, it mimics the functionality of top-tier services like SSSTik but with a cleaner, ad-free, and premium interface.

---

## ✨ Features

- **No Watermarks**: Fetches the direct video file from TikTok's CDN.
- **HD Quality**: Prioritizes the highest resolution available.
- **Audio Extraction**: Option to download just the MP3 audio.
- **Premium UI**: 
  - Dark Mode by default.
  - Cyan/Red "Glow" aesthetic matching TikTok's brand.
  - Fully responsive design (Mobile & Desktop).
- **Privacy Focused**: No logs, no user tracking.

---

## 🚀 Deployment (Render.com)

This project is ready to be deployed on Render. Follow these steps:

1.  **Push this repository to GitHub/GitLab**.
2.  Go to [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your repository.
5.  **Configure the settings**:
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
6.  Click **Create Web Service**.

That's it! Your downloader will be live in minutes.

---

## 🛠️ Local Development

To run this project on your local machine:

```bash
# 1. Clone the repo
git clone https://github.com/your-username/tikloader.git

# 2. Install dependencies
cd tikloader
npm install

# 3. Start the server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ API Endpoint

### `POST /api/convert`

- **Body**: `{ "url": "https://vm.tiktok.com/..." }`
- **Response**:
  ```json
  {
    "success": true,
    "author": "User Name",
    "thumbnail": "https://...",
    "links": [
      { "text": "Without watermark", "href": "..." },
      { "text": "Download MP3", "href": "..." }
    ]
  }
  ```

---

## ⚠️ Disclaimer

This project is for educational purposes only. This tool is not affiliated with, authorized, maintained, sponsored, or endorsed by TikTok or any of its affiliates or subsidiaries.
