import { useNavigate } from 'react-router-dom';

export default function BlogPost({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <article 
      onClick={handleClick}
      className="border border-gray flex flex-col max-w-[380px] group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-2"
    >
      {/* Blog Image */}
      {post.image && (
        <div className="border-b border-gray h-[220px] overflow-hidden bg-gray/5 flex items-center justify-center">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.log('Image failed to load:', post.image);
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray">Image not found</div>`;
            }}
          />
        </div>
      )}

      {/* Meta Information */}
      <div className="p-2 border-b border-gray flex items-center gap-4 text-gray text-sm">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime} min read</span>
      </div>

      {/* Blog Content */}
      <div className="p-4 flex flex-col gap-3 transition-colors duration-300 group-hover:bg-background/50 flex-1">
        <h3 className="text-white text-xl font-medium transition-colors duration-300 group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray text-base leading-relaxed transition-colors duration-300 group-hover:text-white line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-primary text-sm border border-primary/30 px-2 py-1 hover:bg-primary/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="mt-auto pt-4">
          <div className="text-white text-base font-medium hover:text-primary transition-colors duration-300 flex items-center gap-2 group/btn">
            <span>Read more</span>
            <svg
              className="w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
