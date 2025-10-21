import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: '',
    readTime: 5,
  });

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/blog-data.json');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check - you can change this password
    if (password === 'darshan@admin2025') {
      sessionStorage.setItem('adminAuth', 'authenticated');
      setIsAuthenticated(true);
      loadPosts();
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewPost = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      tags: '',
      readTime: 5,
    });
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      tags: post.tags.join(', '),
      readTime: post.readTime,
    });
    setEditingPost(post.id);
    setShowEditor(true);
  };

  const handleSavePost = () => {
    const newPost = {
      id: editingPost || Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: parseInt(formData.readTime),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    };

    let updatedPosts;
    if (editingPost) {
      updatedPosts = posts.map(post => post.id === editingPost ? newPost : post);
    } else {
      updatedPosts = [newPost, ...posts];
    }

    setPosts(updatedPosts);
    downloadJSON(updatedPosts);
    setShowEditor(false);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      tags: '',
      readTime: 5,
    });
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      downloadJSON(updatedPosts);
    }
  };

  const downloadJSON = (postsData) => {
    const dataStr = JSON.stringify({ posts: postsData }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blog-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Blog data downloaded! Replace /public/blog-data.json with this file and push to GitHub.');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-gray p-8">
          <h1 className="text-white text-3xl font-bold mb-6 flex items-start">
            <span className="text-primary">#</span>
            <span>admin-login</span>
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="border border-gray bg-transparent px-4 py-3 text-white placeholder-gray focus:outline-none focus:border-primary"
              autoFocus
            />
            <button
              type="submit"
              className="border border-primary px-6 py-3 text-white font-medium hover:bg-primary/10 transition-colors"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 text-gray hover:text-white transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Editor Screen
  if (showEditor) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-white text-3xl font-bold flex items-start">
              <span className="text-primary">#</span>
              <span>{editingPost ? 'edit-post' : 'new-post'}</span>
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowEditor(false)}
                className="border border-gray px-4 py-2 text-gray hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                className="border border-primary px-6 py-2 text-white font-medium hover:bg-primary/10 transition-colors"
              >
                Save Post
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="text-white mb-2 block">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray bg-transparent px-4 py-2 text-white focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray bg-transparent px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                required
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Content * (Markdown supported)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="15"
                className="w-full border border-gray bg-transparent px-4 py-2 text-white focus:outline-none focus:border-primary resize-y font-mono text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white mb-2 block">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/blog/image.jpg"
                  className="w-full border border-gray bg-transparent px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-white mb-2 block">Read Time (minutes)</label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full border border-gray bg-transparent px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="React, JavaScript, WebDev"
                className="w-full border border-gray bg-transparent px-4 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>

            {formData.image && (
              <div>
                <label className="text-white mb-2 block">Image Preview</label>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="max-w-md border border-gray"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-white text-3xl font-bold flex items-start">
            <span className="text-primary">#</span>
            <span>blog-dashboard</span>
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/blog')}
              className="border border-gray px-4 py-2 text-gray hover:text-white transition-colors"
            >
              View Blog
            </button>
            <button
              onClick={handleNewPost}
              className="border border-primary px-6 py-2 text-white font-medium hover:bg-primary/10 transition-colors"
            >
              + New Post
            </button>
            <button
              onClick={handleLogout}
              className="border border-gray px-4 py-2 text-gray hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 border border-primary/30 bg-primary/5 p-4">
          <p className="text-white text-sm">
            📝 <strong>Total Posts:</strong> {posts.length}
          </p>
          <p className="text-gray text-sm mt-2">
            💡 After saving, download the JSON file and replace <code className="text-primary">/public/blog-data.json</code> then push to GitHub.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="border border-gray p-12 text-center">
            <p className="text-gray text-lg mb-4">No blog posts yet</p>
            <button
              onClick={handleNewPost}
              className="border border-primary px-6 py-2 text-white font-medium hover:bg-primary/10 transition-colors"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border border-gray p-6 flex items-start gap-6">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-32 h-32 object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-white text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-gray text-sm mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-gray text-sm mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>{post.tags.join(', ')}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="text-primary hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-gray hover:text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
