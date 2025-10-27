import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { postsApi } from "@/services/api";
import { Post } from "@/types/post";
import { ArrowRight, Newspaper } from "lucide-react";

export const LastNewsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await postsApi.getPosts(4);
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleViewAllNews = () => {
    window.open('https://professional-institute.com/blog');
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Newspaper className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-secondary">
                Latest News & Updates
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest developments in renewable energy technology, 
              industry insights, and educational updates from our expert team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg shadow-lg">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Latest News & Updates
            </h2>
            <p className="text-xl text-red-600 mb-8">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-secondary">
              Latest News & Updates
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest developments in renewable energy technology, 
            industry insights, and educational updates from our expert team.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No posts available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold group"
            onClick={handleViewAllNews}
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};