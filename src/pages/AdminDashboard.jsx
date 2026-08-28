import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const FIELD = 'field';
const LABEL = 'label';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const CLOUDINARY_CLOUD_NAME = 'dg2rrya2l';
  const CLOUDINARY_UPLOAD_PRESET = 'portfolio_blog';

  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', image: '', tags: '', readTime: 5,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { setIsAuthenticated(true); loadPosts(); }
      else setIsAuthenticated(false);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') setLoginError('Incorrect email or password');
      else if (error.code === 'auth/user-not-found') setLoginError('User not found. Please check your email');
      else if (error.code === 'auth/invalid-email') setLoginError('Invalid email format');
      else setLoginError('Login failed. Please try again');
    }
  };

  const handleLogout = async () => {
    try { await signOut(auth); setEmail(''); setPassword(''); }
    catch (error) { console.error('Logout error:', error); }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) { alert('❌ Image too large! Maximum size is 50MB.'); return; }
    if (!file.type.startsWith('image/')) { alert('❌ Please upload an image file.'); return; }
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      fd.append('folder', 'blog');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.secure_url) { setFormData(prev => ({ ...prev, image: data.secure_url })); alert('✅ Image uploaded successfully!'); }
      else throw new Error('Upload failed');
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload image. Please try again.');
    } finally { setUploadingImage(false); }
  };

  const handleContentImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploadingImage(true);
    try {
      const uploadPromises = files.map(async (file) => {
        if (file.size > 50 * 1024 * 1024) throw new Error(`${file.name} is too large (max 50MB)`);
        if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image`);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        fd.append('folder', 'blog');
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
        const data = await res.json();
        if (!data.secure_url) throw new Error('Upload failed');
        return { url: data.secure_url, name: file.name };
      });
      const results = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...results]);
      alert(`✅ ${results.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ ' + error.message);
    } finally { setUploadingImage(false); }
  };

  const insertImageIntoContent = (imageUrl) => {
    const md = `\n\n![Image](${imageUrl})\n\n`;
    setFormData(prev => ({ ...prev, content: prev.content + md }));
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('✅ Image URL copied to clipboard!');
  };

  const handleNewPost = () => {
    setFormData({ title: '', excerpt: '', content: '', image: '', tags: '', readTime: 5 });
    setEditingPost(null);
    setUploadedImages([]);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title, excerpt: post.excerpt, content: post.content,
      image: post.image, tags: post.tags.join(', '), readTime: post.readTime,
    });
    setEditingPost(post.id);
    setUploadedImages([]);
    setShowEditor(true);
  };

  const handleSavePost = async () => {
    try {
      const generateSlug = (title) => title.toLowerCase().split(' ').slice(0, 2).join('-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
      const now = new Date();
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        readTime: parseInt(formData.readTime),
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        timestamp: Date.now(),
      };
      if (editingPost) {
        await updateDoc(doc(db, 'posts', editingPost), postData);
        alert('✅ Post updated successfully!');
      } else {
        const slug = generateSlug(formData.title);
        await setDoc(doc(db, 'posts', slug), postData);
        alert('✅ Post published successfully!');
      }
      await loadPosts();
      setShowEditor(false);
      setEditingPost(null);
      setFormData({ title: '', excerpt: '', content: '', image: '', tags: '', readTime: 5 });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('❌ Error saving post: ' + error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        alert('✅ Post deleted successfully!');
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('❌ Error deleting post: ' + error.message);
      }
    }
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="pill" style={{ cursor: 'default' }}><span className="dot" style={{ background: 'var(--orange-deep)' }}></span>CHECKING THE DOOR…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }} data-light-section>
        <div className="panel" style={{ maxWidth: '440px', width: '100%' }}>
          <div className="panel-head"><span>ADMIN LOGIN</span><span>🔒</span></div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', paddingTop: '1.4rem' }}>
            <div>
              <label className={LABEL}>EMAIL</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setLoginError(''); }} placeholder="admin@darsha.dev" className={FIELD} required autoFocus />
            </div>
            <div>
              <label className={LABEL}>PASSWORD</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setLoginError(''); }} placeholder="••••••••" className={FIELD} required />
            </div>
            {loginError && (
              <div style={{ border: '2px solid var(--ink)', background: 'var(--orange)', padding: '.6rem .9rem', fontSize: '.72rem', letterSpacing: '.1em' }}>❌ {loginError}</div>
            )}
            <button type="submit" className="pill solid" style={{ justifyContent: 'center' }}>LOGIN ✦</button>
          </form>
          <button onClick={() => navigate('/blog')} className="top-btn" style={{ color: 'var(--ink)', marginTop: '1.2rem' }}>← BACK TO BLOG</button>
        </div>
      </div>
    );
  }

  if (showEditor) {
    return (
      <div style={{ minHeight: '80vh', padding: '0 1rem 4rem' }} data-light-section>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="page-head" style={{ paddingTop: '7.5rem', paddingLeft: 0, paddingRight: 0 }}>
            <div className="page-head-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="sec-tag">{editingPost ? 'EDIT POST' : 'NEW POST'}</div>
              <div style={{ display: 'flex', gap: '.8rem' }}>
                <button className="pill" onClick={() => setShowEditor(false)}>CANCEL</button>
                <button className="pill solid" onClick={handleSavePost}>SAVE POST ✦</button>
              </div>
            </div>
          </div>

          <div className="panel" style={{ padding: '1.8rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div>
                <label className={LABEL}>TITLE *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className={FIELD} required />
              </div>
              <div>
                <label className={LABEL}>EXCERPT *</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows="3" className={FIELD} required />
              </div>
              <div>
                <label className={LABEL}>CONTENT * (MARKDOWN SUPPORTED)</label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} rows="15" className={`${FIELD} resize-y`} style={{ fontFamily: 'var(--ff-mono)', fontSize: '.78rem' }} required />
                <div className="mt-2 flex gap-2" style={{ marginTop: '.7rem' }}>
                  <label className="pill" style={{ cursor: 'pointer', position: 'relative' }}>
                    {uploadingImage ? <span>⏳ UPLOADING…</span> : '📷 UPLOAD CONTENT IMAGES'}
                    <input type="file" accept="image/*" multiple onChange={handleContentImageUpload} disabled={uploadingImage} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </label>
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div>
                  <label className={LABEL}>UPLOADED IMAGES ({uploadedImages.length})</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                    {uploadedImages.map((img, index) => (
                      <div key={index} style={{ border: '2px solid var(--ink)', padding: '.6rem' }}>
                        <img src={img.url} alt={img.name} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block', marginBottom: '.5rem' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                          <button type="button" onClick={() => insertImageIntoContent(img.url)} style={{ color: 'var(--orange-deep)', fontSize: '.66rem', textAlign: 'left', background: 'none', border: 'none', padding: 0, letterSpacing: '.08em' }}>＋ INSERT IN CONTENT</button>
                          <button type="button" onClick={() => copyImageUrl(img.url)} style={{ color: 'var(--ink)', opacity: '.7', fontSize: '.66rem', textAlign: 'left', background: 'none', border: 'none', padding: 0, letterSpacing: '.08em' }}>📋 COPY URL</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div>
                  <label className={LABEL}>COVER IMAGE</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="URL or upload" className={FIELD} />
                  <label className="pill" style={{ cursor: 'pointer', display: 'inline-flex', marginTop: '.7rem', position: 'relative' }}>
                    {uploadingImage ? <span>⏳ UPLOADING…</span> : '📤 UPLOAD IMAGE'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </label>
                  <p style={{ fontSize: '.58rem', letterSpacing: '.16em', textTransform: 'uppercase', opacity: '.55', marginTop: '.5rem' }}>MAX 50MB · JPG, PNG, GIF, WEBP</p>
                </div>
                <div>
                  <label className={LABEL}>READ TIME (MINUTES)</label>
                  <input type="number" name="readTime" value={formData.readTime} onChange={handleInputChange} min="1" className={FIELD} />
                </div>
              </div>

              <div>
                <label className={LABEL}>TAGS (COMMA SEPARATED)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="React, JavaScript, WebDev" className={FIELD} />
              </div>

              {formData.image && (
                <div>
                  <label className={LABEL}>IMAGE PREVIEW</label>
                  <img src={formData.image} alt="Preview" style={{ maxWidth: '420px', border: '2px solid var(--ink)', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', padding: '0 1rem 4rem' }} data-light-section>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="page-head" style={{ paddingTop: '7.5rem', paddingLeft: 0, paddingRight: 0 }}>
          <div className="page-head-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="sec-tag">BLOG DASHBOARD</div>
            <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
              <button className="pill" onClick={() => navigate('/blog')}>VIEW BLOG</button>
              <button className="pill solid" onClick={handleNewPost}>+ NEW POST</button>
              <button className="pill" onClick={handleLogout}>LOGOUT</button>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontFamily: 'var(--ff-fat)', fontSize: '2rem', marginBottom: '.8rem' }}>NO POSTS YET</div>
            <p style={{ opacity: '.65', marginBottom: '1.4rem' }}>The desk is clean. Time to dirty it.</p>
            <button className="pill solid" onClick={handleNewPost}>CREATE YOUR FIRST POST</button>
          </div>
        ) : (
          <div className="flex" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map(post => (
              <div key={post.id} className="panel" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1.4rem', alignItems: 'start', padding: '1.3rem' }}>
                {post.image && (
                  <img src={post.image} alt={post.title} style={{ width: '140px', height: '110px', objectFit: 'cover', border: '2px solid var(--ink)', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                )}
                <div>
                  <div style={{ fontFamily: 'var(--ff-fat)', fontSize: '1.35rem', marginBottom: '.4rem' }}>{post.title}</div>
                  <p style={{ opacity: '.7', fontSize: '.78rem', marginBottom: '.7rem' }}>{post.excerpt}</p>
                  <div className="bpost-meta" style={{ marginBottom: '.8rem' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} MIN READ</span>
                    <span>•</span>
                    <span>{post.tags.join(', ')}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="pill" onClick={() => handleEditPost(post)}>EDIT</button>
                    <button className="pill" onClick={() => handleDeletePost(post.id)}>DELETE</button>
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