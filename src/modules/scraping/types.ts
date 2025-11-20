export interface ScrapedData {
  title: string;
  description: string;
  headings: {
    h1: string[];
    h2: string[];
  };
  links: Array<{ text: string; href: string }>;
  images: Array<{ alt: string; src: string }>;
  paragraphs: string[];
  meta: {
    keywords: string;
    author: string;
  };
}

export interface NewsArticle {
  title: string;
  image: string;
  link: string;
  description: string;
}

