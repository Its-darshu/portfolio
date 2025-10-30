import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMetaTags } from '../hooks/useMetaTags';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Update meta tags when post loads
  useMetaTags({
    title: post?.title || 'Blog Post',
    description: post?.excerpt || 'Read my latest blog post',
    image: post?.image || 'https://darsha.dev/og-image.png',
    url: window.location.href,
    type: 'article',
    tags: post?.tags || []
  });

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="border border-primary px-6 py-2 text-white hover:bg-primary/10 transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/blog')}
          className="text-gray hover:text-white transition-colors mb-6 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-lg overflow-hidden border border-gray">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        {/* Post Meta */}
        <div className="mb-6">
          <div className="flex items-center gap-4 text-gray text-sm mb-4">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-primary text-sm border border-primary/30 px-3 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray/30 mb-8"></div>

        {/* Post Content (render Markdown) */}
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="text-gray text-lg leading-relaxed"
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Divider */}
        <div className="w-full h-px bg-gray/30 my-12"></div>

        {/* Share Section */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white text-sm font-semibold mb-2">Share this post</p>
            <div className="flex gap-3">
              {/* Quick Share Links */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-primary transition-colors p-2 border border-gray hover:border-primary"
                title="Share link on X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-primary transition-colors p-2 border border-gray hover:border-primary"
                title="Share link on LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="border border-primary px-6 py-2 text-white hover:bg-primary/10 transition-colors"
          >
            ← More Posts
          </button>
        </div>
      </div>
    </div>
  );
}
