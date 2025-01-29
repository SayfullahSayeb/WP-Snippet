const fetch = require("node-fetch");

exports.handler = async (event) => {
    const { url } = event.queryStringParameters;
    if (!url) return { statusCode: 400, body: "Missing URL" };

    try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const html = await response.text();

        // Extract video URLs from the page
        const videoLinks = [...html.matchAll(/https:\/\/video\.twimg\.com\/[^\s"]+/g)].map(match => match[0]);

        return {
            statusCode: 200,
            body: JSON.stringify({ media: videoLinks }),
            headers: { "Content-Type": "application/json" }
        };
    } catch (error) {
        return { statusCode: 500, body: "Error fetching video" };
    }
};
