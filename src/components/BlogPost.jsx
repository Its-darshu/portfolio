import { useNavigate } from 'react-router-dom';

export default function BlogPost({ post, index = 0 }) {
  const navigate = useNavigate();
  const num = String(index + 1).padStart(2, '0');
  return (
    <article className="bpost" onClick={() => navigate(`/blog/${post.id}`)}>
      {post.image && (
        <div className="bpost-media">
          <img src={post.image} alt={post.title} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
      <div className="bpost-body">
        <div className="bpost-top">
          <span className="bpost-num">{num} / {post.date}</span>
        </div>
        <h3 className="bpost-title">{post.title}</h3>
        <p className="bpost-excerpt">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="bpost-tags">
            {post.tags.map((tag, i) => <span className="wtag" key={i}>#{tag}</span>)}
          </div>
        )}
        <div className="bpost-foot">
          <span className="bpost-read">{post.readTime} MIN READ</span>
          <span className="bpost-arrow">READ →</span>
        </div>
      </div>
    </article>
  );
}