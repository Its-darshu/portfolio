import React from 'react';

const ShareCard = ({ post, onClose }) => {
  const cardRef = React.useRef(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateAndShareCard = async () => {
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: '#110540',
          logging: false,
          width: 1080,
          height: 1920,
          useCORS: true,
          allowTaint: true,
        });

        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          const file = new File([blob], 'instagram-story.png', { type: 'image/png' });
          
          // Check if on mobile and Web Share API is available
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
          if (isMobile && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: post.title,
                text: `Check out: ${post.title}`,
              });
              onClose();
            } catch (error) {
              if (error.name !== 'AbortError') {
                console.log('Share failed, downloading instead:', error);
                downloadImage(canvas);
              }
            }
          } else {
            // Desktop or share not supported - download the image
            downloadImage(canvas);
            
            // Show instructions
            setTimeout(() => {
              alert('✅ Image downloaded!\n\nTo share on Instagram:\n1. Open Instagram on your phone\n2. Create a new Story\n3. Upload the downloaded image\n4. Share!');
            }, 500);
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Error generating image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (canvas) => {
    const link = document.createElement('a');
    link.download = 'instagram-story.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-dark-bg rounded-lg p-6 max-w-md w-full relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold text-white mb-4">Instagram Story Preview</h3>

        {/* Instagram Story Card Preview - Visible */}
        <div className="mb-6 w-full aspect-[9/16] bg-gradient-to-br from-[#110540] via-purple-900 to-blue-900 rounded-lg overflow-hidden relative">
          {/* Decorative background blur effects */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600 rounded-full blur-[100px] opacity-30"></div>
          
          {/* Phone Frame */}
          <div className="absolute inset-[5%] bg-gradient-to-b from-yellow-200 via-yellow-400 to-orange-400 rounded-[25px] shadow-lg flex flex-col p-4">
            {/* /blog label */}
            <div className="mb-2">
              <p className="font-mono text-xs">
                <span className="text-blue-600">/</span>
                <span className="text-black">blog</span>
              </p>
            </div>
            
            {/* Blog Image */}
            <div className="bg-gray-300 border border-black rounded-[15px] overflow-hidden mb-2" style={{ height: '45%' }}>
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" crossOrigin="anonymous" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image</div>
              )}
            </div>
            
            {/* Blog Title */}
            <h2 className="font-mono text-sm font-semibold text-black mb-1 line-clamp-2">{post.title}</h2>
            
            {/* Blog Excerpt */}
            <p className="font-mono text-xs text-black mb-2 line-clamp-2">{post.excerpt}</p>
            
            {/* CTA Button */}
            <div className="mt-auto">
              <div className="bg-black rounded-lg px-3 py-1.5">
                <p className="font-mono text-white text-xs text-center">Click here to read</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden High-Res Card for Generation */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <div 
            ref={cardRef}
            style={{ 
              width: '1080px', 
              height: '1920px',
              background: '#110540',
              position: 'relative',
              fontFamily: "'Fira Code', monospace"
            }}
          >
            {/* Decorative background blur effects */}
            <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: '#2563eb', borderRadius: '50%', filter: 'blur(200px)', opacity: 0.3 }}></div>
            <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: '#9333ea', borderRadius: '50%', filter: 'blur(200px)', opacity: 0.3 }}></div>
            
            {/* Phone Frame */}
            <div style={{ 
              position: 'absolute', 
              top: '5%', 
              left: '5%', 
              right: '5%', 
              bottom: '5%', 
              background: 'linear-gradient(to bottom, #fef08a, #facc15, #fb923c)',
              borderRadius: '60px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              padding: '80px'
            }}>
              {/* /blog label */}
              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '48px', fontWeight: 500 }}>
                  <span style={{ color: '#0004ff' }}>/</span>
                  <span style={{ color: '#000' }}>blog</span>
                </p>
              </div>
              
              {/* Blog Image */}
              <div style={{ 
                background: '#d9d9d9', 
                border: '2px solid black',
                borderRadius: '40px',
                overflow: 'hidden',
                marginBottom: '40px',
                height: '850px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div style={{ color: '#666', fontSize: '36px' }}>No Image</div>
                )}
              </div>
              
              {/* Blog Title */}
              <h2 style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: '68px', 
                fontWeight: 'normal',
                color: '#000',
                marginBottom: '30px',
                lineHeight: '1.2',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {post.title}
              </h2>
              
              {/* Blog Excerpt */}
              <p style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: '42px',
                color: '#000',
                marginBottom: '50px',
                lineHeight: '1.4',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {post.excerpt}
              </p>
              
              {/* CTA Button */}
              <div style={{ marginTop: 'auto' }}>
                <div style={{ 
                  background: '#000',
                  borderRadius: '20px',
                  padding: '30px 50px',
                  display: 'inline-block'
                }}>
                  <p style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    color: '#fff', 
                    fontSize: '42px',
                    textAlign: 'center',
                    margin: 0
                  }}>
                    Click here to read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={generateAndShareCard}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Generate & Download for Instagram
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-400 text-center">
            Mobile: Share directly to Instagram.<br />
            Desktop: Download image, then upload to Instagram app on your phone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
