import { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const LoadingBlock = () => (
  <div style={{ padding: '5rem 0', textAlign: 'center' }}>
    <span className="pill" style={{ cursor: 'default' }}><span className="dot" style={{ background: 'var(--orange-deep)' }}></span>LOADING POSTS…</span>
  </div>
);

const EmptyBlock = () => (
  <div className="panel" style={{ padding: '3rem', textAlign: 'center' }}>
    <div style={{ fontFamily: 'var(--ff-fat)', fontSize: '2.2rem', marginBottom: '.8rem' }}>NO POSTS YET</div>
    <p style={{ opacity: '.65', fontSize: '.8rem', marginBottom: '1.4rem' }}>The ink is still drying. Check back soon.</p>
    <a className="pill solid" href="https://github.com/Its-darshu" target="_blank" rel="noopener noreferrer">MY GITHUB ↗</a>
  </div>
);

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        if (!alive) return;
        setBlogPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading blog posts:', error);
        if (alive) setBlogPosts([]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => { alive = false; };
  }, []);

  return (
    <>
      <section className="page-head" data-light-section>
        <div className="page-head-inner">
          <div className="sec-tag">BLOG</div>
          <h2 className="sec-giant" style={{ marginBottom: '.4rem' }}>THE<br />NOTEBOOK.</h2>
          <p style={{ fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase', opacity: '.65', marginBottom: '2.4rem' }}>
            thoughts, breakdowns, and stuff I learned the hard way
          </p>
        </div>
      </section>

      <section id="story" data-light-section style={{ paddingTop: '1rem' }}>
        <div className="story-inner">
          <div className="sec-tag" data-reveal>Recent Posts</div>
          {loading ? <LoadingBlock /> : blogPosts.length === 0 ? <EmptyBlock /> : (
            <div className="flex flex-col gap-6" data-reveal>
              {blogPosts.map(post => <BlogPost key={post.id} post={post} />)}
            </div>
          )}
        </div>
      </section>

      <section id="proof" data-light-section style={{ paddingTop: '1rem' }}>
        <div className="proof-inner">
          <div className="sec-tag" data-reveal>Stay Tuned</div>
          <div className="panel" data-reveal>
            <div className="panel-head"><span>NEWSLETTER</span><span>✦</span></div>
            <div className="news-grid">
              <div>
                <label className="label">EMAIL</label>
                <input type="email" className="field" placeholder="your@email.com" />
              </div>
              <button className="pill solid">SUBSCRIBE ✦</button>
            </div>
            <p style={{ fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', opacity: '.5', marginTop: '1rem' }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}