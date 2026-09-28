// YouTube-ի բաժանորդների քանակը → Web Scraping-ով → առանց API key
export async function getSubscriberCount(req, res) {
  try {
    const channelUrl = 'https://www.youtube.com/@evayanagrigoryans';

    const response = await fetch(channelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9,hy;q=0.8'
      }
    });

    if (!response.ok) {
      throw new Error(`YouTube error: ${response.status}`);
    }

    const html = await response.text();

    // Փնտրում ենք բաժանորդների քանակը HTML-ից
    let subscriberCount = 0;
    let found = false;

    // Ձև 1. "subscriberCountText":{"simpleText":"1.2K subscribers"}
    const match1 = html.match(/"subscriberCountText":\{"simpleText":"([^"]+)"/);
    if (match1) {
      subscriberCount = parseCount(match1[1]);
      found = true;
    }

    // Ձև 2. "subscriberCountText":{"accessibility":...}
    if (!found) {
      const match2 = html.match(/"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([^"]+)"/);
      if (match2) {
        subscriberCount = parseCount(match2[1]);
        found = true;
      }
    }

    // Ձև 3. Ավելի նոր
    if (!found) {
      const match3 = html.match(/"subscriberCountText".*?"simpleText":"([\d.,KMkm]+)/);
      if (match3) {
        subscriberCount = parseCount(match3[1]);
        found = true;
      }
    }

    // Ձև 4. մետատվյալներից
    if (!found) {
      const match4 = html.match(/"interactionCount":"([\d.,KMkm]+)"/);
      if (match4) {
        subscriberCount = parseCount(match4[1]);
        found = true;
      }
    }

    if (!found) {
      return res.status(404).json({
        error: 'Բաժանորդների թիվը չհաջողվեց գտնել',
        subscriberCount: 0
      });
    }

    res.json({
      subscriberCount,
      channelUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message, subscriberCount: 0 });
  }
}

// "1.2K" → 1200  |  "1.5M" → 1500000  |  "1,234" → 1234
function parseCount(text) {
  if (!text) return 0;

  const cleaned = text.replace(/subscribers?/i, '').trim();

  if (/M/i.test(cleaned)) {
    return Math.round(parseFloat(cleaned) * 1000000);
  }

  if (/K/i.test(cleaned)) {
    return Math.round(parseFloat(cleaned) * 1000);
  }

  return parseInt(cleaned.replace(/[^\d]/g, '')) || 0;
}