import { useNavigate } from 'react-router-dom';

export default function BlogPost({ post }) {
  const navigate = useNavigate();
  return (
    <article className="bpost" onClick={() => navigate(`/blog/${post.id}`)}>
      {post.image && (
        <div className="bpost-media">
          <img src={post.image} alt={post.title} onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
      <div className="bpost-body">
        <h3 className="bpost-title">{post.title}</h3>
        <p className="bpost-excerpt">{post.excerpt}</p>
        <div className="bpost-meta">
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
      <div className="bpost-arrow">→</div>
    </article>
  );
}