import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-neutral-800 px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-4 h-4" />
          <span className="font-bold text-base text-white font-mono">Darshan</span>
        </Link>
        
        {/* Mobile Hamburger Button */}
        <button 
          className="w-6 h-6 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {!isMobileMenuOpen ? (
            <>
              <div className="absolute top-[5px] left-0 w-6 h-0.5 bg-gray"></div>
              <div className="absolute top-3 left-[9px] w-[15px] h-0.5 bg-gray"></div>
            </>
          ) : (
            <>
              <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
            </>
          )}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-[1024px] mx-auto flex items-center justify-between bg-neutral-800 px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-4 h-4" />
            <span className="font-bold text-xl text-white">Darshan</span>
          </Link>

          <nav className="flex gap-8">
            <Link
              to="/"
              className={`flex items-start font-medium text-base ${
                isActive('/') ? 'text-white' : 'text-gray'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/') ? 'text-white' : 'text-gray'}>home</span>
            </Link>
            <Link
              to="/projects"
              className={`flex items-start font-normal text-base ${
                isActive('/projects') ? 'text-white' : 'text-gray'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/projects') ? 'text-white' : 'text-gray'}>works</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-start font-normal text-base ${
                isActive('/about') ? 'text-white' : 'text-gray'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/about') ? 'text-white' : 'text-gray'}>about-me</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-start font-normal text-base ${
                isActive('/contact') ? 'text-white' : 'text-gray'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/contact') ? 'text-white' : 'text-gray'}>contacts</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-neutral-800 z-40 md:hidden">
          {/* Header in overlay */}
          <div className="px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="w-4 h-4" />
              <span className="font-bold text-base text-white font-mono">Darshan</span>
            </Link>
            
            <button 
              className="w-6 h-6 relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-start text-[32px] font-mono ${
                isActive('/') ? 'font-medium' : 'font-normal'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/') ? 'text-white' : 'text-gray'}>home</span>
            </Link>
            <Link
              to="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-start text-[32px] font-mono ${
                isActive('/projects') ? 'font-medium' : 'font-normal'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/projects') ? 'text-white' : 'text-gray'}>works</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-start text-[32px] font-mono ${
                isActive('/about') ? 'font-medium' : 'font-normal'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/about') ? 'text-white' : 'text-gray'}>about-me</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-start text-[32px] font-mono ${
                isActive('/contact') ? 'font-medium' : 'font-normal'
              }`}
            >
              <span className="text-primary">#</span>
              <span className={isActive('/contact') ? 'text-white' : 'text-gray'}>contacts</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
            {/* GitHub */}
            <a
              href="https://github.com/Its-darshu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 border border-gray flex items-center justify-center hover:opacity-80"
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 4C9.37 4 4 9.37 4 16C4 21.31 7.435 25.795 12.205 27.385C12.805 27.49 13.03 27.13 13.03 26.815C13.03 26.53 13.015 25.585 13.015 24.58C10 25.135 9.22 23.845 8.98 23.17C8.845 22.825 8.26 21.76 7.75 21.475C7.33 21.25 6.73 20.695 7.735 20.68C8.68 20.665 9.355 21.55 9.58 21.91C10.66 23.725 12.385 23.215 13.075 22.9C13.18 22.12 13.495 21.595 13.84 21.295C11.17 20.995 8.38 19.96 8.38 15.37C8.38 14.065 8.845 12.985 9.61 12.145C9.49 11.845 9.07 10.615 9.73 8.965C9.73 8.965 10.735 8.65 13.03 10.195C13.99 9.925 15.01 9.79 16.03 9.79C17.05 9.79 18.07 9.925 19.03 10.195C21.325 8.635 22.33 8.965 22.33 8.965C22.99 10.615 22.57 11.845 22.45 12.145C23.215 12.985 23.68 14.05 23.68 15.37C23.68 19.975 20.875 20.995 18.205 21.295C18.64 21.67 19.015 22.39 19.015 23.515C19.015 25.12 19 26.41 19 26.815C19 27.13 19.225 27.505 19.825 27.385C24.565 25.795 28 21.295 28 16C28 9.37 22.63 4 16 4Z"
                  fill="#D9D9D9"
                />
              </svg>
            </a>

            {/* Dribbble */}
            <a
              href="https://dribbble.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 border border-gray flex items-center justify-center hover:opacity-80"
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4ZM24.697 11.617C25.685 12.919 26.307 14.519 26.381 16.247C26.133 16.199 23.515 15.67 20.871 15.994C20.805 15.853 20.745 15.707 20.679 15.561C20.487 15.133 20.277 14.699 20.061 14.277C23.035 13.091 24.521 11.859 24.697 11.617ZM16 5.625C17.923 5.625 19.697 6.287 21.131 7.397C20.985 7.619 19.643 8.743 16.759 9.793C15.421 7.259 13.933 5.175 13.717 4.875C14.465 5.721 15.207 5.625 16 5.625ZM11.867 5.487C12.077 5.775 13.541 7.865 14.891 10.363C10.597 11.527 6.799 11.503 6.385 11.497C7.027 8.667 9.183 6.397 11.867 5.487ZM5.619 16.007C5.619 15.895 5.619 15.784 5.625 15.673C6.033 15.679 10.597 15.733 15.193 14.323C15.469 14.853 15.727 15.391 15.973 15.927C15.835 15.967 15.691 16.009 15.553 16.051C10.807 17.617 8.227 21.787 8.027 22.117C6.745 20.653 5.619 18.459 5.619 16.007ZM16 26.387C14.239 26.387 12.599 25.839 11.229 24.909C11.387 24.591 13.273 21.019 18.481 19.177C18.505 19.165 18.523 19.159 18.547 19.147C19.657 22.279 20.103 24.879 20.229 25.629C18.949 26.143 17.513 26.387 16 26.387ZM21.845 24.753C21.755 24.231 21.341 21.745 20.313 18.649C22.775 18.265 24.911 18.907 25.195 18.997C24.841 21.517 23.613 23.733 21.845 24.753Z"
                  fill="#D9D9D9"
                />
              </svg>
            </a>

            {/* Figma */}
            <a
              href="https://figma.com/@yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 border border-gray flex items-center justify-center hover:opacity-80"
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 26C14.2091 26 16 24.2091 16 22V18H12C9.79086 18 8 19.7909 8 22C8 24.2091 9.79086 26 12 26Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M8 14C8 11.7909 9.79086 10 12 10H16V18H12C9.79086 18 8 16.2091 8 14Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M8 6C8 3.79086 9.79086 2 12 2H16V10H12C9.79086 10 8 8.20914 8 6Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M16 2H20C22.2091 2 24 3.79086 24 6C24 8.20914 22.2091 10 20 10H16V2Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M24 14C24 16.2091 22.2091 18 20 18C17.7909 18 16 16.2091 16 14C16 11.7909 17.7909 10 20 10C22.2091 10 24 11.7909 24 14Z"
                  fill="#D9D9D9"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
