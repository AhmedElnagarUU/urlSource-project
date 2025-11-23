import { NextResponse } from "next/server";

// Static data for content rows - in future, this will fetch from database
export async function GET() {
  const contentRowsData = [
    {
      id: "trending",
      title: "Trending Now",
      items: [
        {
          id: 1,
          title: "Global Markets Update",
          description: "Latest financial news and market analysis",
          image: "/images/news-1.jpg",
          category: "Finance",
        },
        {
          id: 2,
          title: "Climate Summit Highlights",
          description: "Key decisions from the international climate conference",
          image: "/images/news-2.jpg",
          category: "Environment",
        },
        {
          id: 3,
          title: "Sports Championship Results",
          description: "Breaking news from major sporting events",
          image: "/images/news-3.jpg",
          category: "Sports",
        },
        {
          id: 4,
          title: "Tech Innovation Roundup",
          description: "Latest breakthroughs in technology and innovation",
          image: "/images/news-4.jpg",
          category: "Technology",
        },
      ],
    },
    {
      id: "continue-watching",
      title: "Continue Reading",
      items: [
        {
          id: 5,
          title: "Political Analysis",
          description: "In-depth coverage of current political events",
          image: "/images/news-5.jpg",
          category: "Politics",
          progress: 45,
        },
        {
          id: 6,
          title: "Health & Wellness",
          description: "Latest health news and wellness tips",
          image: "/images/news-6.jpg",
          category: "Health",
          progress: 30,
        },
        {
          id: 7,
          title: "Entertainment Buzz",
          description: "What's happening in the entertainment world",
          image: "/images/news-7.jpg",
          category: "Entertainment",
          progress: 60,
        },
        {
          id: 8,
          title: "Science Discoveries",
          description: "Recent scientific breakthroughs and research",
          image: "/images/news-8.jpg",
          category: "Science",
          progress: 25,
        },
      ],
    },
    {
      id: "parties",
      title: "Shared Articles",
      items: [
        {
          id: 9,
          title: "Business Strategy",
          description: "Strategic insights for modern businesses",
          image: "/images/news-9.jpg",
          category: "Business",
          participants: 3,
        },
        {
          id: 10,
          title: "Education Reform",
          description: "Latest developments in education policy",
          image: "/images/news-10.jpg",
          category: "Education",
          participants: 2,
        },
      ],
    },
  ];

  return NextResponse.json({ success: true, data: contentRowsData });
}
