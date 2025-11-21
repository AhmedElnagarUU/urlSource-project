import * as cheerio from "cheerio";
import axios from "axios";
import { giminai } from "@/aiAgent/giminai";
import { NewsItem } from "@/modules/news/types";
import logger from "@/lib/logger/logger";

export async function scrapeNewsFromUrl(url: string): Promise<NewsItem[]> {
  const startTime = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    await logger.info("Scraping started", {
      requestId,
      url,
    });

    // Fetch the webpage using axios
    const fetchStartTime = Date.now();
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 30000,
    });

    const fetchTime = Date.now() - fetchStartTime;
    const html = response.data;
    const htmlSize = Buffer.byteLength(html, 'utf8');

    await logger.info("Webpage fetched", {
      requestId,
      url,
      statusCode: response.status,
      htmlSize,
      fetchTime,
    });

    const $ = cheerio.load(html);

    // Filter HTML: Remove scripts, styles, and non-content elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('footer').remove();
    $('header').remove();
    $('noscript').remove();
    $('iframe').remove();

    // Get clean text content from body (limit to reasonable size for AI)
    const bodyText = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50000); // Limit to 50k characters for AI processing

    await logger.debug("HTML processed", {
      requestId,
      url,
      bodyTextLength: bodyText.length,
    });

    // Send filtered content to AI agent
    const newsLinks = await giminai(bodyText, url);

    // Transform to NewsItem format
    const newsItems: NewsItem[] = newsLinks.map(item => ({
      title: item.title,
      description: item.description,
      image: item.image || undefined,
      imageAlt: item.title,
      link: item.link || undefined,
      linkText: 'Read more',
    }));

    const totalTime = Date.now() - startTime;
    await logger.info("Scraping completed", {
      requestId,
      url,
      articlesFound: newsItems.length,
      totalTime,
    });

    return newsItems;
  } catch (error: any) {
    const totalTime = Date.now() - startTime;
    await logger.error("Scraping failed", error, {
      requestId,
      url,
      totalTime,
      errorType: error.constructor?.name || "Unknown",
      errorMessage: error.message || "Unknown error",
    });
    // Re-throw error so it can be properly handled by the caller
    throw error;
  }
}

