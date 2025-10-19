import { useState } from 'react';
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', title: '', message: '' });
  };
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Page Title */}
      <section className="max-w-[1024px] mx-auto px-4 py-8">
        <div className="flex items-start text-3xl font-semibold mb-4">
          <span className="text-primary">/</span>
          <span className="text-white">contacts</span>
        </div>
        <p className="text-white text-base">Who am i?</p>
      </section>
      {/* Contact Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-gray text-base leading-relaxed">
              I'm interested in freelance opportunities. However, if you have other request or question,
              don't hesitate to contact me
            </p>
          </div>
          <div className="border border-gray p-4 flex flex-col gap-4">
            <h3 className="text-white text-base font-semibold">Message me here</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://discord.com/users/darshan_66"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M25.12 7.945C23.55 7.22 21.875 6.69 20.125 6.395C19.89 6.81 19.615 7.36 19.425 7.795C17.55 7.52 15.695 7.52 13.845 7.795C13.655 7.36 13.375 6.81 13.135 6.395C11.385 6.69 9.705 7.225 8.135 7.95C5.065 12.52 4.24 16.985 4.64 21.385C6.755 22.965 8.81 23.92 10.835 24.545C11.34 23.86 11.79 23.13 12.18 22.36C11.44 22.08 10.73 21.74 10.055 21.345C10.23 21.215 10.4 21.08 10.565 20.94C14.365 22.645 18.5 22.645 22.25 20.94C22.42 21.08 22.59 21.215 22.76 21.345C22.08 21.745 21.37 22.08 20.63 22.365C21.02 23.13 21.465 23.86 21.975 24.55C24.005 23.925 26.06 22.97 28.17 21.385C28.635 16.34 27.355 11.92 25.12 7.945ZM12.24 18.79C11.095 18.79 10.145 17.71 10.145 16.385C10.145 15.06 11.07 13.975 12.24 13.975C13.41 13.975 14.36 15.055 14.335 16.385C14.335 17.71 13.41 18.79 12.24 18.79ZM20.57 18.79C19.425 18.79 18.475 17.71 18.475 16.385C18.475 15.06 19.4 13.975 20.57 13.975C21.74 13.975 22.69 15.055 22.665 16.385C22.665 17.71 21.745 18.79 20.57 18.79Z" />
                </svg>
                <span>darshan_66</span>
              </a>
              <a
                href="mailto:darshan99806@gmail.com"
                className="flex items-center gap-2 text-gray hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M26 6H6C4.895 6 4.01 6.895 4.01 8L4 24C4 25.105 4.895 26 6 26H26C27.105 26 28 25.105 28 24V8C28 6.895 27.105 6 26 6ZM26 10L16 16L6 10V8L16 14L26 8V10Z" />
                </svg>
                <span>darshan99806@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        {/* Decorations */}
      </section>
      {/* All Media Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="flex items-start font-medium text-3xl">
            <span className="text-primary">#</span>
            <span className="text-white">all-media</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-8 h-8 text-gray"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <a
            href="https://x.com/cookmithick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray hover:text-white transition-colors"
          >
            @cookmithick
          </a>
        </div>
      </section>
      {/* Contact Form (Mobile View) - Commented out for future use */}
      {/* 
      <section className="max-w-[505px] mx-auto px-8 py-16 md:hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray bg-transparent p-2 text-gray placeholder-gray focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray bg-transparent p-2 text-gray placeholder-gray focus:outline-none focus:border-primary"
            />
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray bg-transparent p-2 text-gray placeholder-gray focus:outline-none focus:border-primary"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="border border-gray bg-transparent p-2 text-gray placeholder-gray focus:outline-none focus:border-primary resize-none"
          />
          <button
            type="submit"
            className="border border-primary px-4 py-2 text-white text-base font-medium hover:bg-primary/10 transition-colors w-fit"
          >
            Send
          </button>
        </form>
      </section>
      */}
    </div>
  );
}
