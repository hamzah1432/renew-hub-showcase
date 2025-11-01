import { Course } from '../types/course';
import { Post, WordPressPost, WordPressMedia } from '../types/post';

const API_BASE_URL = 'https://professional-institute.com/wp-json/learnpress/v1';
const WP_API_BASE_URL = "https://professional-institute.com/wp-json/wp/v2";

export const coursesApi = {
  async getCourses(): Promise<Course[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses?per_page=100`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
};

// Default values to reduce repetition
const DEFAULT_FEATURED_IMAGE = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80";
const DEFAULT_AUTHOR = {
  name: "Professional Institute",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
};

// Helper function to clean HTML content
const cleanHtmlContent = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&hellip;/g, '...') // Replace HTML entity
    .replace(/&amp;/g, '&') // Replace HTML entity  
    .replace(/&nbsp;/g, ' ') // Replace non-breaking space
    .trim();
};

// Helper function to extract featured image
const getFeaturedImage = (wpPost: any): string => {
  return wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || DEFAULT_FEATURED_IMAGE;
};

export const postsApi = {
  async getPosts(limit: number = 4): Promise<Post[]> {
    try {
      const postsResponse = await fetch(`${WP_API_BASE_URL}/posts?per_page=${limit}&_embed`);
      
      if (!postsResponse.ok) {
        throw new Error(`HTTP error! status: ${postsResponse.status}`);
      }
      
      const wordpressPosts: any[] = await postsResponse.json();
      
      // Transform WordPress posts to our Post interface
      return wordpressPosts.map((wpPost) => ({
        id: wpPost.id,
        title: wpPost.title.rendered,
        image: getFeaturedImage(wpPost),
        excerpt: cleanHtmlContent(wpPost.excerpt.rendered),
        date: wpPost.date,
        link: wpPost.link,
        author: DEFAULT_AUTHOR
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }
};
