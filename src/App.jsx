import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Effects from './components/Effects';
import ProjectOverlay from './components/ProjectOverlay';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function RouteLoader() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="pill" style={{ cursor: 'default' }}><span className="dot" style={{ background: 'var(--orange-deep)' }}></span>LOADING…</span>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Effects />
        <ProjectOverlay />
        <Header />
        <main>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;