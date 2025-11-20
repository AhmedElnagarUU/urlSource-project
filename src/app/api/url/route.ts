import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { giminai } from "@/aiAgent/giminai"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const urlName = formData.get("urlName");
    if (!urlName || typeof urlName !== "string") {
      return NextResponse.json(
        { 
          success: false,
          error: "URL is required" 
        },
        { status: 200 } // Return 200 but with error in body
      );
    }

    // Ensure URL has protocol
    let url = urlName.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false,
          error: `Failed to fetch URL: ${response.status} ${response.statusText}. The website may require authentication or block automated requests.` 
        },
        { status: 200 } // Return 200 but with error in body
      );
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
    
    // Extract body content
    const bodyContent = $('body').html() || html;
    
    // Get clean text content from body (limit to reasonable size for AI)
    const bodyText = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50000); // Limit to 50k characters for AI processing

    // Get page title and description for context
    const pageTitle = $("title").text().trim() || "No title found";
    const pageDescription = $('meta[name="description"]').attr("content") || 
                           $('meta[property="og:description"]').attr("content") || 
                           "No description found";

    // Send filtered content to AI agent
    const newsLinks = await giminai(bodyText, url);

    // // Extract data from the page
    // const scrapedData = {
    //   title: $("title").text().trim() || "No title found",
    //   description:
    //     $('meta[name="description"]').attr("content") ||
    //     $('meta[property="og:description"]').attr("content") ||
    //     "No description found",
    //   headings: {
    //     h1: $("h1")
    //       .map((_, el) => $(el).text().trim())
    //       .get()
    //       .filter((text) => text.length > 0),
    //     h2: $("h2")
    //       .map((_, el) => $(el).text().trim())
    //       .get()
    //       .filter((text) => text.length > 0),
    //   },
    //   links: $("a")
    //     .map((_, el) => ({
    //       text: $(el).text().trim(),
    //       href: $(el).attr("href") || "",
    //     }))
    //     .get()
    //     .filter((link) => link.text.length > 0)
    //     .slice(0, 20), // Limit to first 20 links
    //   images: $("img")
    //     .map((_, el) => ({
    //       alt: $(el).attr("alt") || "",
    //       src: $(el).attr("src") || $(el).attr("data-src") || "",
    //     }))
    //     .get()
    //     .filter((img) => img.src.length > 0)
    //     .slice(0, 10), // Limit to first 10 images
    //   paragraphs: $("p")
    //     .map((_, el) => $(el).text().trim())
    //     .get()
    //     .filter((text) => text.length > 50) // Only paragraphs with substantial content
    //     .slice(0, 5), // Limit to first 5 paragraphs
    //   meta: {
    //     keywords:
    //       $('meta[name="keywords"]').attr("content") || "No keywords found",
    //     author: $('meta[name="author"]').attr("content") || "No author found",
    //   },
    // };

    // Transform AI response to match ScrapedData format
    const scrapedData = {
      title: pageTitle,
      description: pageDescription,
      headings: {
        h1: newsLinks.map(item => item.title).filter(Boolean),
        h2: [],
      },
      links: newsLinks.map(item => ({
        text: item.title || 'Read more',
        href: item.link || '',
      })).filter(link => link.href),
      images: newsLinks.map(item => ({
        alt: item.title || 'News image',
        src: item.image || '',
      })).filter(img => img.src),
      paragraphs: newsLinks.map(item => item.description || '').filter(Boolean),
      meta: {
        keywords: "No keywords found",
        author: "No author found",
      },
    };

    return NextResponse.json(
      {
        success: true,
        url: url,
        data: scrapedData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to scrape the webpage",
      },
      { status: 200 } // Return 200 but with error in body
    );
  }
}