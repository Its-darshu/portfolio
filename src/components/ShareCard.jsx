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
          backgroundColor: '#ffffff',
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
        <div className="mb-6 w-full aspect-[9/16] bg-white rounded-lg overflow-hidden relative">
          {/* Background Image - using post image as background */}
          <div className="absolute inset-0">
            {post.image ? (
              <img src={post.image} alt="Background" className="w-full h-full object-cover blur-sm" crossOrigin="anonymous" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-purple-200"></div>
            )}
          </div>
          
          {/* Glassmorphism Card */}
          <div className="absolute inset-[8%] bg-white/5 backdrop-blur-md rounded-[45px] flex flex-col p-3 border border-white/10">
            {/* /blog label */}
            <div className="mb-2">
              <p className="font-mono text-xs">
                <span className="text-blue-600">/</span>
                <span className="text-black">blog</span>
              </p>
            </div>
            
            {/* Blog Image */}
            <div className="bg-gray-300 border border-black rounded-[26px] overflow-hidden mb-auto" style={{ height: '45%' }}>
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" crossOrigin="anonymous" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image</div>
              )}
            </div>
            
            {/* CTA Button */}
            <div className="mt-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-[15px] px-3 py-2 border border-white/20">
                <p className="font-mono font-semibold text-black text-xs text-center">Click here to read</p>
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
              background: '#ffffff',
              position: 'relative',
              fontFamily: "'Fira Code', monospace"
            }}
          >
            {/* Background Image - full bleed with blur */}
            <div style={{ position: 'absolute', inset: 0 }}>
              {post.image ? (
                <img 
                  src={post.image} 
                  alt="Background"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)'
                  }} 
                  crossOrigin="anonymous"
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(to bottom right, #86efac, #93c5fd, #c4b5fd)' 
                }}></div>
              )}
            </div>
            
            {/* Glassmorphism Card */}
            <div style={{ 
              position: 'absolute', 
              top: '170px',
              left: '71px',
              right: '71px',
              bottom: '170px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '91px',
              display: 'flex',
              flexDirection: 'column',
              padding: '60px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {/* /blog label */}
              <div style={{ marginBottom: '60px' }}>
                <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '40px', fontWeight: 500 }}>
                  <span style={{ color: '#0015ff' }}>/</span>
                  <span style={{ color: '#000' }}>blog</span>
                </p>
              </div>
              
              {/* Blog Image */}
              <div style={{ 
                background: '#d9d9d9', 
                border: '2px solid black',
                borderRadius: '52px',
                overflow: 'hidden',
                marginBottom: 'auto',
                height: '708px',
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
              
              {/* CTA Button */}
              <div style={{ marginTop: '60px' }}>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '30px',
                  padding: '30px 60px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    fontFamily: "'Fira Code', monospace", 
                    color: '#000', 
                    fontSize: '48px',
                    fontWeight: 600,
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
