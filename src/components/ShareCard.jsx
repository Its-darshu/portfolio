import React from 'react';

const ShareCard = ({ post, onClose }) => {
  const cardRef = React.useRef(null);

  const downloadCard = async () => {
    const html2canvas = (await import('html2canvas')).default;
    
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create a file from blob
        const file = new File([blob], 'story.png', { type: 'image/png' });
        
        // Check if Web Share API is available
        if (navigator.share && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: post.title,
            text: `Check out my blog post: ${post.title}`,
          }).catch((error) => {
            console.log('Share failed:', error);
            // Fallback to download
            downloadImage(canvas);
          });
        } else {
          // Fallback to download
          downloadImage(canvas);
        }
      });
    }
  };

  const downloadImage = (canvas) => {
    const link = document.createElement('a');
    link.download = 'instagram-story.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-bg rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold text-white mb-4">Share to Instagram Story</h3>

        {/* Instagram Story Card Preview */}
        <div 
          ref={cardRef}
          className="w-full aspect-[9/16] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-lg overflow-hidden relative"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Top Section - Blog Title */}
            <div className="space-y-4">
              <div className="text-sm text-blue-300 font-medium tracking-wider uppercase">
                New Blog Post
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight line-clamp-4">
                {post.title}
              </h2>
            </div>

            {/* Middle Section - Excerpt */}
            <div className="flex-1 flex items-center">
              <p className="text-lg text-gray-200 line-clamp-6">
                {post.excerpt}
              </p>
            </div>

            {/* Bottom Section - Author/Brand */}
            <div className="space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-xl">Darshan</div>
                  <div className="text-blue-300 text-sm">darshan99806@gmail.com</div>
                </div>
                
                {/* Logo or Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-blue-300 text-sm font-medium">Read the full article</div>
                <div className="text-white text-xs mt-1">darsha.dev/blog</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={downloadCard}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Share to Instagram Story
          </button>
          
          <p className="text-xs text-gray-400 text-center">
            On mobile: Tap to share directly. On desktop: Image will download - upload it to Instagram.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
