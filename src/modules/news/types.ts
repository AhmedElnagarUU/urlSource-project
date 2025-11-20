export interface NewsItem {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  linkText?: string;
}

export interface NewsBySource {
  source: {
    id: string;
    url: string;
    name: string | null;
  };
  news: NewsItem[];
}

