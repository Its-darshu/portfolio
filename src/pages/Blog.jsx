import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import BlogPost from '../components/BlogPost';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function Blog() {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogPosts(postsData);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Page Title */}
      <section className="max-w-[1024px] mx-auto px-4 py-8">
        <div className="flex items-start text-3xl font-semibold mb-4">
          <span className="text-primary">/</span>
          <span className="text-white">blog</span>
        </div>
        <p className="text-white text-base">My thoughts and experiences</p>
      </section>

      {/* Blog Posts Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <SectionTitle title="recent-posts" />
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray text-lg">Loading posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <svg
              className="w-24 h-24 text-gray/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-gray text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section - Optional */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="border border-gray p-8 flex flex-col items-center gap-6 text-center">
          <h3 className="text-white text-2xl font-semibold">
            Subscribe to my newsletter
          </h3>
          <p className="text-gray text-base max-w-[600px]">
            Get notified when I publish new articles. No spam, unsubscribe anytime.
          </p>
          <div className="flex gap-4 w-full max-w-[500px] flex-col sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-gray bg-transparent px-4 py-2 text-white placeholder-gray focus:outline-none focus:border-primary transition-colors"
            />
            <button className="border border-primary px-6 py-2 text-white font-medium hover:bg-primary/10 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
