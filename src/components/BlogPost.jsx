import { useNavigate } from 'react-router-dom';

export default function BlogPost({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <article 
      onClick={handleClick}
      className="border border-gray w-full group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 flex flex-col md:flex-row"
    >
      {/* Blog Image */}
      {post.image && (
        <div className="md:w-[320px] w-full h-[200px] md:h-auto overflow-hidden bg-gray/5 flex items-center justify-center flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.log('Image failed to load:', post.image);
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray">Image not found</div>`;
            }}
          />
        </div>
      )}

      {/* Blog Content - Center */}
      <div className="flex-1 p-6 flex flex-col gap-3">
        <h3 className="text-white text-2xl font-semibold transition-colors duration-300 group-hover:text-primary line-clamp-1">
          {post.title}
        </h3>
        <p className="text-gray text-base leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-primary text-sm border border-primary/30 px-3 py-1 hover:bg-primary/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Date/Time - Right */}
      <div className="md:w-[180px] w-full p-6 border-t md:border-t-0 md:border-l border-gray flex md:flex-col flex-row md:items-end items-center justify-between md:justify-start gap-2 text-gray text-sm flex-shrink-0">
        <div className="text-right">
          <div className="text-white font-medium mb-1">{post.date}</div>
          {post.time && <div className="text-primary text-xs mb-1">{post.time}</div>}
          <div>{post.readTime} min read</div>
        </div>
      </div>
    </article>
  );
}
