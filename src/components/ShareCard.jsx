import { useState } from 'react';
import html2canvas from 'html2canvas';

export default function ShareCard({ post, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndShare = async (platform) => {
    setIsGenerating(true);
    
    try {
      // Get the card element
      const cardElement = document.getElementById('share-card-preview');
      
      // Generate canvas from the card
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#1e1e1e',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      // Convert to blob
      canvas.toBlob(async (blob) => {
        const file = new File([blob], `${post.title.slice(0, 30)}.png`, { type: 'image/png' });

        if (platform === 'instagram') {
          // For Instagram - download the image
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${post.title.slice(0, 30)}-instagram.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          alert('📸 Image downloaded! Upload it to Instagram Stories or Post.');
        } else if (platform === 'linkedin') {
          // For LinkedIn - open share dialog with downloaded image
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${post.title.slice(0, 30)}-linkedin.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          // Open LinkedIn share with text
          const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
          window.open(linkedinUrl, '_blank');
          
          alert('📸 Image downloaded! Upload it to your LinkedIn post and share the link.');
        } else if (platform === 'twitter') {
          // For Twitter - download and open composer
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${post.title.slice(0, 30)}-twitter.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          // Open Twitter composer
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + '\n\n' + window.location.href)}`;
          window.open(twitterUrl, '_blank');
          
          alert('📸 Image downloaded! Attach it to your tweet.');
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Error generating share card:', error);
      alert('Failed to generate share card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray p-4 flex items-center justify-between sticky top-0 bg-background z-10">
          <h3 className="text-white text-xl font-semibold">Share as Image</h3>
          <button
            onClick={onClose}
            className="text-gray hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview Card */}
        <div className="p-6">
          <p className="text-gray text-sm mb-4">Preview your share card:</p>
          
          <div
            id="share-card-preview"
            className="w-full aspect-[1.91/1] bg-gradient-to-br from-background via-background to-primary/10 border-2 border-primary p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff00' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-primary text-xs border border-primary/50 px-3 py-1 bg-primary/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-white text-3xl font-bold mb-3 leading-tight line-clamp-3">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray text-base leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-end justify-between">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-primary flex items-center justify-center text-primary text-xl font-bold">
                  D
                </div>
                <div>
                  <div className="text-white font-semibold">Darshan</div>
                  <div className="text-gray text-sm">darsha.dev</div>
                </div>
              </div>

              {/* Date */}
              <div className="text-right">
                <div className="text-primary text-sm font-medium">{post.date}</div>
                <div className="text-gray text-xs">{post.readTime} min read</div>
              </div>
            </div>

            {/* Featured Image Overlay (if exists) */}
            {post.image && (
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            )}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="border-t border-gray p-6">
          <p className="text-white text-sm font-semibold mb-4">Share to:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Instagram */}
            <button
              onClick={() => generateAndShare('instagram')}
              disabled={isGenerating}
              className="border border-pink-500 px-6 py-3 text-white hover:bg-pink-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {isGenerating ? 'Generating...' : 'Instagram Story'}
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => generateAndShare('linkedin')}
              disabled={isGenerating}
              className="border border-blue-500 px-6 py-3 text-white hover:bg-blue-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {isGenerating ? 'Generating...' : 'LinkedIn Post'}
            </button>

            {/* Twitter/X */}
            <button
              onClick={() => generateAndShare('twitter')}
              disabled={isGenerating}
              className="border border-primary px-6 py-3 text-white hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {isGenerating ? 'Generating...' : 'X/Twitter'}
            </button>
          </div>

          <p className="text-gray text-xs mt-4 text-center">
            💡 The image will be downloaded. Upload it when creating your post.
          </p>
        </div>
      </div>
    </div>
  );
}
