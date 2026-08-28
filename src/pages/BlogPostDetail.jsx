import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMetaTags } from '../hooks/useMetaTags.jsx';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const snap = await getDoc(docRef);
        if (!alive) return;
        setPost(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      } catch (error) {
        console.error('Error loading post:', error);
        if (alive) setPost(null);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="pill" style={{ cursor: 'default' }}><span className="dot" style={{ background: 'var(--orange-deep)' }}></span>READING THE INK…</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
        <div className="panel" style={{ textAlign: 'center', maxWidth: '520px' }}>
          <div style={{ fontFamily: 'var(--ff-fat)', fontSize: '2.4rem', marginBottom: '.8rem' }}>404 — POST GONE</div>
          <p style={{ opacity: '.7', fontSize: '.8rem', marginBottom: '1.6rem' }}>The blog post you're looking for doesn't exist (or got deleted).</p>
          <button className="pill solid" onClick={() => navigate('/blog')}>← BACK TO BLOG</button>
        </div>
      </div>
    );
  }

  return (
    <div data-light-section>
      {useMetaTags({
        title: post.title,
        description: post.excerpt,
        image: post.image || 'https://darsha.dev/og-image.png',
        url: `${window.location.origin}/blog/${id}`,
        type: 'article',
        tags: post.tags || [],
      })}

      <section className="page-head" data-light-section style={{ paddingBottom: '2rem' }}>
        <div className="page-head-inner" style={{ maxWidth: '860px' }}>
          <button className="pill" onClick={() => navigate('/blog')} style={{ marginBottom: '2rem' }}>← BACK TO BLOG</button>

          {post.image && (
            <div style={{ border: `${'var(--bw)'} solid var(--ink)`, boxShadow: '8px 8px 0 var(--orange)', marginBottom: '2.4rem', overflow: 'hidden' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}

          <h1 style={{ fontFamily: 'var(--ff-fat)', fontSize: 'clamp(2.2rem, 6vw, 4.4rem)', lineHeight: '.94', marginBottom: '1.2rem' }}>{post.title}</h1>
          <div className="bpost-meta" style={{ marginBottom: '1.2rem' }}>
            <span>{post.date}</span>
            {post.time && <span>{post.time}</span>}
            <span>{post.readTime} MIN READ</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="bpost-tags">
              {post.tags.map((tag, i) => <span className="wtag" key={i}>#{tag}</span>)}
            </div>
          )}
        </div>
      </section>

      <div className="page-rule"></div>

      <section data-light-section style={{ padding: '3.5rem 1.6rem' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <article className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          <hr className="page-rule" style={{ margin: '3rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div>
              <p className="label" style={{ marginBottom: '.8rem' }}>SHARE THIS POST</p>
              <div style={{ display: 'flex', gap: '.6rem' }}>
                <a className="pill" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${window.location.origin}/blog/${id}`)}`} target="_blank" rel="noopener noreferrer">X ↗</a>
                <a className="pill" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/blog/${id}`)}`} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
              </div>
            </div>
            <button className="pill solid" onClick={() => navigate('/blog')}>← MORE POSTS</button>
          </div>
        </div>
      </section>
    </div>
  );
}