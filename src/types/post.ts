export interface Post {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  category?: string;
  link: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
  featured_media: number;
  excerpt: {
    rendered: string;
  };
  date: string;
  author: number;
  content: {
    rendered: string;
  };
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}