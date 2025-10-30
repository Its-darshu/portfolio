// Vercel Serverless Function to generate dynamic OG tags
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send('Blog post ID is required');
  }

  try {
    // Fetch blog post from Firestore
    const docRef = db.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send('Blog post not found');
    }

    const post = doc.data();
    const baseUrl = process.env.VERCEL_URL || 'https://darsha.dev';
    const postUrl = `${baseUrl}/blog/${id}`;

    // Generate HTML with proper meta tags
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${post.title} | Darshan</title>
    <meta name="title" content="${post.title}">
    <meta name="description" content="${post.excerpt}">
    
    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${postUrl}">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:image" content="${post.image || `${baseUrl}/og-image.png`}">
    <meta property="og:site_name" content="Darshan - Portfolio">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${postUrl}">
    <meta property="twitter:title" content="${post.title}">
    <meta property="twitter:description" content="${post.excerpt}">
    <meta property="twitter:image" content="${post.image || `${baseUrl}/og-image.png`}">
    
    <!-- Redirect to actual blog post -->
    <meta http-equiv="refresh" content="0; url=${postUrl}">
    <script>window.location.href = '${postUrl}';</script>
</head>
<body>
    <p>Redirecting to <a href="${postUrl}">${post.title}</a>...</p>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).send('Internal Server Error');
  }
}
