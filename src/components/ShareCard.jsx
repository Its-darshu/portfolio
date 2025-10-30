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
          <p className="text-gray text-sm mb-4">Preview your Instagram Story:</p>
          
          <div
            id="share-card-preview"
            className="w-[360px] h-[640px] mx-auto bg-white flex flex-col relative overflow-hidden"
            style={{ aspectRatio: '9/16' }}
          >
            {/* Profile Header */}
            <div className="absolute top-4 left-4 right-4 flex items-center gap-3 z-20">
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center text-primary text-lg font-bold">
                D
              </div>
              <div className="text-sm font-medium text-gray-800">darsha.dev</div>
            </div>

            {/* Main Card Content */}
            <div className="flex-1 flex flex-col p-6 pt-20">
              {/* Featured Image */}
              <div className="w-full flex-1 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center border-2 border-blue-400">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="text-gray-400 text-6xl font-bold">image</div>
                )}
              </div>

              {/* Content Section */}
              <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
                {/* Blog Title */}
                <h2 className="text-gray-900 text-xl font-bold mb-2 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Date and Time */}
                <div className="text-gray-500 text-xs mb-3">
                  {post.date} {post.time && `• ${post.time}`}
                </div>

                {/* CTA Button */}
                <button className="w-full border-2 border-gray-300 rounded-lg py-2.5 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                  to read more click
                </button>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 z-20">
              <input
                type="text"
                placeholder="Send message"
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm placeholder-white/70"
                readOnly
              />
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
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
