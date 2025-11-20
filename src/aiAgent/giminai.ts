import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "@/modules/scraping/types";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCXjsWGpWobPhk_W8zSIkTKjyk8hlPh0oE" });


export async function giminai(source: string, baseUrl: string): Promise<NewsArticle[]> {
    console.log("source===============================================");
    console.log(source);
    console.log("source===============================================");
  try {
    // Create a detailed prompt for extracting news articles
    const prompt = `Extract the latest news articles from this HTML content. 
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

    // Call the AI API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log("response===============================================");
    console.log(response.text);
    console.log("response===============================================");
    // Extract response text - handle different possible response structures
    let responseText = "";
    
    // Check if response has candidates (standard Google GenAI structure)
    if (response.candidates && Array.isArray(response.candidates) && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        responseText = candidate.content.parts
          .map((part: any) => part.text || "")
          .join("");
      }
    }
    
    // Fallback: try to get text directly if available
    if (!responseText && (response as any).text) {
      responseText = String((response as any).text);
    }
    
    if (!responseText) {
      console.error("No response text from AI. Response structure:", JSON.stringify(response, null, 2));
      return [];
    }

    console.log(responseText);
    // Parse JSON from response (remove markdown code blocks if present)
    let jsonText = responseText.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "");
    }
    
    // Try to extract JSON array from the response
    const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    // Parse the JSON
    const newsArticles: NewsArticle[] = JSON.parse(jsonText);

    // Validate and clean up the data
    const cleanedArticles = newsArticles
      .filter(article => article && article.title)
      .map(article => ({
        title: article.title.trim(),
        image: article.image ? resolveUrl(article.image, baseUrl) : "",
        link: article.link ? resolveUrl(article.link, baseUrl) : "",
        description: article.description ? article.description.trim() : "",
      }))
      .slice(0, 12); // Limit to 12 articles

    return cleanedArticles;
  } catch (error: any) {
    console.error("Error in giminai:", error);
    // Return empty array on error
    return [];
  }
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

