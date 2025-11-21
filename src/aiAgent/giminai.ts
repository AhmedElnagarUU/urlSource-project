import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { NewsArticle } from "@/modules/scraping/types";
import logger from "@/lib/logger/logger";

const MODEL_NAME = "gemini-2.5-flash";
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY ?? "",
});

export async function giminai(source: string, baseUrl: string): Promise<NewsArticle[]> {
  const startTime = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    await logger.info("AI processing started", {
      requestId,
      url: baseUrl,
      inputSize: source.length,
      model: MODEL_NAME,
    });

    const prompt = buildPrompt(source, baseUrl);
    
    await logger.debug("AI prompt generated", {
      requestId,
      promptLength: prompt.length,
      promptPreview: prompt.substring(0, 200),
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    const responseText = extractText(response);
    const processingTime = Date.now() - startTime;

    if (!responseText) {
      const error = new Error("AI returned empty response");
      await logger.error("AI returned empty response", error, {
        requestId,
        url: baseUrl,
        processingTime,
      });
      throw error;
    }

    await logger.debug("AI response received", {
      requestId,
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 500),
      processingTime,
    });

    const jsonText = sanitizeToJsonArray(responseText);
    const newsArticles: NewsArticle[] = JSON.parse(jsonText);

    const cleanedArticles = newsArticles
      .filter((article) => article && article.title)
      .map((article) => ({
        title: article.title.trim(),
        image: article.image ? resolveUrl(article.image, baseUrl) : "",
        link: article.link ? resolveUrl(article.link, baseUrl) : "",
        description: article.description ? article.description.trim() : "",
      }))
      .slice(0, 12);

    await logger.info("AI processing completed", {
      requestId,
      url: baseUrl,
      articlesExtracted: cleanedArticles.length,
      processingTime,
    });

    return cleanedArticles;
  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    await logger.error("AI processing failed", error, {
      requestId,
      url: baseUrl,
      inputSize: source.length,
      processingTime,
      errorType: error.constructor?.name || "Unknown",
      errorMessage: error.message || "Unknown error",
      errorCode: error.code || error.status || "N/A",
    });
    // Re-throw error so it can be properly handled by the caller
    throw error;
  }
}

function buildPrompt(source: string, baseUrl: string) {
  return `Extract the latest news articles from this HTML content. 
For each news article, extract:
1. Title/Heading of the article
2. Image URL (if available)
3. Link/URL to the full article
4. Short description or summary (if available)

Base URL for resolving relative links: ${baseUrl}

Return ONLY a valid JSON array in this exact format (no markdown, no code blocks, just pure JSON):
[
  {
    "title": "Article title here",
    "image": "full image URL or empty string",
    "link": "full article URL or empty string",
    "description": "Article description or summary"
  }
]

If an image URL is relative, convert it to absolute using the base URL.
If a link is relative, convert it to absolute using the base URL.
Extract at least 5-10 latest news articles if available.
If no news articles found, return an empty array [].

HTML Content:
${source.substring(0, 50000)}`;
}

function extractText(response?: GenerateContentResponse): string {
  if (!response) {
    return "";
  }

  return response.text?.trim() ?? "";
}

function sanitizeToJsonArray(rawText: string) {
  let jsonText = rawText.trim();

  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  }

  const match = jsonText.match(/\[[\s\S]*\]/);
  if (match) {
    jsonText = match[0];
  }

  return jsonText;
}

// Helper function to resolve relative URLs to absolute
function resolveUrl(url: string, baseUrl: string): string {
  if (!url || url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  try {
    const base = new URL(baseUrl);
    if (url.startsWith("//")) {
      return `${base.protocol}${url}`;
    } else if (url.startsWith("/")) {
      return `${base.protocol}//${base.host}${url}`;
    } else {
      return `${base.protocol}//${base.host}/${url}`;
    }
  } catch (e) {
    return url;
  }
}

