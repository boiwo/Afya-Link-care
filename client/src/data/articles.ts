export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "Understanding Malaria Prevention in Kenya",
    excerpt: "Learn about the latest malaria prevention strategies and how to protect yourself and your family.",
    category: "Prevention",
    author: "Dr. Sarah Kimani",
    date: "2025-10-20",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Mental Health Awareness: Breaking the Stigma",
    excerpt: "Mental health is as important as physical health. Discover resources and support available in Kenya.",
    category: "Mental Health",
    author: "Dr. James Ochieng",
    date: "2025-10-18",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=400",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Maternal Health: What Every Expectant Mother Should Know",
    excerpt: "Essential information for pregnant women about prenatal care and safe delivery practices.",
    category: "Maternal Health",
    author: "Dr. Grace Wanjiru",
    date: "2025-10-15",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Childhood Vaccinations: A Complete Guide",
    excerpt: "Stay up to date with the recommended vaccination schedule for children in Kenya.",
    category: "Pediatrics",
    author: "Dr. Peter Mwangi",
    date: "2025-10-12",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=400",
    readTime: "8 min read"
  },
  {
    id: "5",
    title: "Managing Diabetes: Diet and Lifestyle Tips",
    excerpt: "Practical advice for living well with diabetes through proper nutrition and exercise.",
    category: "Chronic Diseases",
    author: "Dr. Ann Mutua",
    date: "2025-10-10",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=400",
    readTime: "10 min read"
  },
  {
    id: "6",
    title: "COVID-19: Current Guidelines and Safety Measures",
    excerpt: "Stay informed about the latest COVID-19 protocols and vaccination information.",
    category: "Public Health",
    author: "Dr. Martin Kamau",
    date: "2025-10-08",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=400",
    readTime: "5 min read"
  }
];
