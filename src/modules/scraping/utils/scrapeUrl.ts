import * as cheerio from "cheerio";
import { giminai } from "@/aiAgent/giminai";
import { NewsItem } from "@/modules/news/types";

export async function scrapeNewsFromUrl(url: string): Promise<NewsItem[]> {
  try {
    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
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

    return newsItems;
  } catch (error: any) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}

