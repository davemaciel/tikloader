const axios = require('axios');
const cheerio = require('cheerio');

async function debugScrape() {
    try {
        console.log('Fetching homepage...');
        const homeResponse = await axios.get('https://ssstik.io/en', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const html = homeResponse.data;
        const match = html.match(/s_tt\s*=\s*['"]([^'"]+)['"]/);
        if (!match) throw new Error('No token found');
        const token = match[1];
        console.log('Token found:', token);

        // Valid test URL
        const realUrl = 'https://www.tiktok.com/@khaby.lame/video/7195764263435128070';

        const params = new URLSearchParams();
        params.append('id', realUrl);
        params.append('locale', 'en');
        params.append('tt', token);

        console.log('Posting to API...');
        const apiResponse = await axios.post('https://ssstik.io/abc?url=dl', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://ssstik.io',
                'Referer': 'https://ssstik.io/en',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        const $ = cheerio.load(apiResponse.data);

        console.log('--- HTML DUMP START ---');
        const index = apiResponse.data.indexOf('khaby');
        if (index !== -1) {
            console.log('Found "khaby" at index', index);
            console.log('Context:', apiResponse.data.substring(index - 500, index + 500));
        } else {
            console.log('"khaby" NOT FOUND in response.');
            console.log('First 500 chars:', apiResponse.data.substring(0, 500));
        }
        console.log('--- HTML DUMP END ---');

        const author1 = $('.result_author').text();
        const author2 = $('h2').text();
        const author3 = $('.result_author_name').text();
        const author4 = $('img').first().attr('alt'); // Sometimes alt tag has name

        console.log('Selector .result_author:', author1);
        console.log('Selector h2:', author2);
        console.log('Selector .result_author_name:', author3);
        console.log('Selector img alt:', author4);

    } catch (e) {
        console.error(e);
    }
}

debugScrape();
