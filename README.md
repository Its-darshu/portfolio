# 🎨 Darshan's Portfolio

Modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## ✨ Features

- 🏠 Home page with hero section
- 💼 Projects showcase
- 👤 About me section
- 📝 **Blog with Admin Dashboard**
- 📧 Contact page
- 📱 Fully responsive design
- 🎯 Clean, modern UI

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Blog System

This portfolio includes a **Firebase-powered blog system** with an admin dashboard!

### Quick Access
- **Blog**: `/blog`
- **Admin Dashboard**: `/admin`
- **Password**: `darshan@admin2025`

### How It Works
1. Visit `/admin` and login
2. Create/edit blog posts
3. Click "Save" - **Posts go live instantly!** ⚡

No more JSON files, no more git commits for blog posts!

📖 **Setup guide**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Database**: Firebase Firestore
- **Deployment**: Vercel

## 📁 Project Structure

```
portfolio/
├── public/
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── BlogPost.jsx    # Blog post card
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── About.jsx
│   │   ├── Blog.jsx        # Blog page
│   │   ├── AdminDashboard.jsx  # Blog admin
│   │   └── Contact.jsx
│   ├── App.jsx
│   └── main.jsx
└── ...
```

## 🔒 Security

The admin dashboard uses simple password authentication. For production:
- Change the default password in `AdminDashboard.jsx`
- Consider using environment variables
- Add proper backend authentication if needed

## 📦 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Vercel auto-detects Vite
3. Deploy! 🚀

### Manual Deploy
```bash
npm run build
# Upload dist/ folder to hosting
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

---

Made with ❤️ by Darshan
