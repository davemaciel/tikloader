const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint to get the download link
app.post('/api/convert', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log('Step 1: Fetching ssstik.io homepage to get session token...');
        // 1. Get the homepage to find the 'tt' token (s_tt)
        const homeResponse = await axios.get('https://ssstik.io/en', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const html = homeResponse.data;
        // Extract the token using regex
        // Pattern usually looks like: s_tt = '...';
        const match = html.match(/s_tt\s*=\s*['"]([^'"]+)['"]/);

        if (!match) {
            throw new Error('Could not find session token (s_tt) on homepage.');
        }

        const token = match[1];
        console.log(`Token found: ${token}`);

        console.log('Step 2: Sending request to /abc endpoint...');
        // 2. Post to the API
        const params = new URLSearchParams();
        params.append('id', url);
        params.append('locale', 'en');
        params.append('tt', token);

        const apiResponse = await axios.post('https://ssstik.io/abc?url=dl', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://ssstik.io',
                'Referer': 'https://ssstik.io/en',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        // 3. Parse the result HTML to find the links
        const $ = cheerio.load(apiResponse.data);

        // The structure usually has links with class 'download_link'
        const downloadLinks = [];
        $('.download_link').each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr('href');
            if (href) {
                downloadLinks.push({ text, href });
            }
        });

        // Try multiple selectors for the thumbnail
        let thumb = $('.result_overlay_img img').attr('src');
        if (!thumb) thumb = $('.result_overlay img').attr('src');
        if (!thumb) thumb = $('img.u-round').attr('src'); // Common variant
        if (!thumb) thumb = $('img').first().attr('src'); // Fallback to first image

        const author = $('.result_author').text().trim();

        if (downloadLinks.length === 0) {
            // Sometimes it returns a slide or error
            const errorText = $('.error-message').text() || 'No download links found. The link might be invalid or the service is blocking us.';
            return res.status(400).json({ error: errorText });
        }

        res.json({
            success: true,
            author,
            thumbnail: thumb,
            links: downloadLinks
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to process request: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
