# Implementation Plan - Fix Metadata and Custom Filenames

## Goal
Fix the issue where video thumbnails and author names are not displaying correctly, and ensure downloaded files have a custom filename (`tikloader_...`) instead of the default provider's name (`ssstik_...`).

## Proposed Changes

### Backend (`server.js`)
- [x] **Add Proxy Endpoint**: Create a `/api/proxy` endpoint that streams the video file from the external URL to the user, setting the `Content-Disposition` header to force a custom filename.
- [x] **Improve Scraping**: Update `cheerio` selectors to be more robust in finding the thumbnail image and author name, handling different HTML structures returned by the provider.

### Frontend (`public/index.html`)
- [ ] **Update Download Logic**: Modify the `processVideo` function to:
    - Clean up the author name (remove duplicate '@' if needed).
    - clear the `linksContainer` before adding new buttons.
    - Generate download buttons that point to `/api/proxy` instead of the direct external link.
    - Pass `url`, `name`, and `type` parameters to the proxy.

## Verification Plan

### Manual Verification
1.  **Start Server**: Run `npm start`.
2.  **Test Download**:
    - Open `http://localhost:3000`.
    - Paste a valid TikTok URL.
    - Click "Baixar".
3.  **Verify UI**:
    - Check if the **Thumbnail** image loads correctly (no longer broken or placeholder).
    - Check if the **Author Name** is displayed correctly (e.g., `@User`).
4.  **Verify Download**:
    - Click the "Without watermark" button.
    - Verify that the downloaded file is named `tikloader_User_timestamp.mp4`.
    - Verify that the video plays correctly.
