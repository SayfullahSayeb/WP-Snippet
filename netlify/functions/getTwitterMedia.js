const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async function(event) {
    const url = event.queryStringParameters.url;
    if (!url) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing URL" }) };
    }

    try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const html = await response.text();
        const $ = cheerio.load(html);

        let mediaUrls = [];
        $("meta[property='og:image'], meta[property='og:video']").each((_, element) => {
            mediaUrls.push($(element).attr("content"));
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ media: mediaUrls }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch media", details: error.message }),
        };
    }
};
