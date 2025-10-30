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
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 1080,
        height: 1920
      });

      // Convert to blob
      canvas.toBlob(async (blob) => {
        const file = new File([blob], `${post.title.slice(0, 30)}.png`, { type: 'image/png' });

        if (platform === 'instagram') {
          // Check if Web Share API is available (mobile)
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: post.title,
                text: `Check out my blog post: ${post.title}`
              });
            } catch (shareError) {
              if (shareError.name !== 'AbortError') {
                // Fallback to download
                downloadImage(blob, `${post.title.slice(0, 30)}-story.png`);
                alert('📸 Image downloaded! Open Instagram and upload to your Story.');
              }
            }
          } else {
            // Desktop - download the image
            downloadImage(blob, `${post.title.slice(0, 30)}-story.png`);
            alert('📸 Image downloaded! Open Instagram on your phone and upload to Stories.');
          }
        } else if (platform === 'linkedin') {
          downloadImage(blob, `${post.title.slice(0, 30)}-linkedin.png`);
          setTimeout(() => {
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
            window.open(linkedinUrl, '_blank');
          }, 500);
          alert('📸 Image downloaded! Attach it to your LinkedIn post.');
        } else if (platform === 'twitter') {
          downloadImage(blob, `${post.title.slice(0, 30)}-twitter.png`);
          setTimeout(() => {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + '\n\n' + window.location.href)}`;
            window.open(twitterUrl, '_blank');
          }, 500);
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

  const downloadImage = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" 
         style={{
           background: 'radial-gradient(ellipse at center, #8b5cf6 0%, #3b82f6 40%, #1e40af 80%, #1e1b4b 100%)'
         }}>
      <div className="bg-background/95 backdrop-blur-xl border-2 border-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray/30 p-4 flex items-center justify-between sticky top-0 bg-background/90 backdrop-blur-md z-10">
          <h3 className="text-white text-xl font-semibold">📸 Share Blog Post</h3>
          <button
            onClick={onClose}
            className="text-gray hover:text-white transition-colors hover:rotate-90 transform duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview Card */}
        <div className="p-6">
          <p className="text-gray text-sm mb-6 text-center">Preview your blog card</p>
          
          {/* Phone Frame with Gradient Border - Clean Card Design */}
          <div className="relative w-[320px] h-[640px] mx-auto p-[4px] rounded-[40px]"
               style={{
                 background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #ec4899 50%, #f97316 75%, #fbbf24 100%)'
               }}>
            {/* Inner Phone Content - Clean Blog Card */}
            <div
              id="share-card-preview"
              className="w-full h-full flex flex-col relative overflow-hidden rounded-[36px] bg-black p-8 justify-center"
            >
              {/* Blog Card Content Only */}
              <div className="flex flex-col items-center text-center space-y-6">
                
                {/* Featured Image */}
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center border border-white/20">
                      <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 w-full">
                  {/* Blog Title */}
                  <h2 className="text-gray-900 text-xl font-bold mb-3 line-clamp-2 leading-tight">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt || 'Read my latest blog post and discover insights about web development, design, and technology.'}
                  </p>

                  {/* Date and Tags */}
                  <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                    <span className="text-gray-500 text-sm">📅 {post.date}</span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary text-sm font-medium">#{post.tags[0]}</span>
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="relative">
                    <button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white rounded-xl py-3 text-sm font-semibold shadow-lg transition-all duration-300">
                      Read Full Article →
                    </button>
                  </div>
                </div>

                {/* Website Attribution */}
                <div className="text-white/80 text-sm font-medium">
                  darsha.dev
                </div>
              </div>
            </div>
            </div>
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
