import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-0 border-t border-gray">
      <div className="max-w-[1025px] mx-auto flex flex-col gap-12 items-center">
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Logo className="w-4 h-4" />
                <span className="font-medium text-base text-white">Darshan</span>
              </div>
              <a href="mailto:darshan99806@gmail.com" className="text-gray text-base">
                darshan99806@gmail.com
              </a>
            </div>
            <p className="text-white text-base">
              Web designer and front-end developer
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white font-medium text-2xl">Media</h3>
            <div className="flex gap-2">
              <a
                href="https://github.com/Its-darshu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4C9.37 4 4 9.37 4 16C4 21.31 7.435 25.795 12.205 27.385C12.805 27.49 13.03 27.13 13.03 26.815C13.03 26.53 13.015 25.585 13.015 24.58C10 25.135 9.22 23.845 8.98 23.17C8.845 22.825 8.26 21.76 7.75 21.475C7.33 21.25 6.73 20.695 7.735 20.68C8.68 20.665 9.355 21.55 9.58 21.91C10.66 23.725 12.385 23.215 13.075 22.9C13.18 22.12 13.495 21.595 13.84 21.295C11.17 20.995 8.38 19.96 8.38 15.37C8.38 14.065 8.845 12.985 9.61 12.145C9.49 11.845 9.07 10.615 9.73 8.965C9.73 8.965 10.735 8.65 13.03 10.195C13.99 9.925 15.01 9.79 16.03 9.79C17.05 9.79 18.07 9.925 19.03 10.195C21.325 8.635 22.33 8.965 22.33 8.965C22.99 10.615 22.57 11.845 22.45 12.145C23.215 12.985 23.68 14.05 23.68 15.37C23.68 19.975 20.875 20.995 18.205 21.295C18.64 21.67 19.015 22.39 19.015 23.515C19.015 25.12 19 26.41 19 26.815C19 27.13 19.225 27.505 19.825 27.385C24.565 25.795 28 21.295 28 16C28 9.37 22.63 4 16 4Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </a>
              <a
                href="https://figma.com/@yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-full h-full"
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
              <a
                href="https://discord.com/users/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.12 7.945C23.55 7.22 21.875 6.69 20.125 6.395C19.89 6.81 19.615 7.36 19.425 7.795C17.55 7.52 15.695 7.52 13.845 7.795C13.655 7.36 13.375 6.81 13.135 6.395C11.385 6.69 9.705 7.225 8.135 7.95C5.065 12.52 4.24 16.985 4.64 21.385C6.755 22.965 8.81 23.92 10.835 24.545C11.34 23.86 11.79 23.13 12.18 22.36C11.44 22.08 10.73 21.74 10.055 21.345C10.23 21.215 10.4 21.08 10.565 20.94C14.365 22.645 18.5 22.645 22.25 20.94C22.42 21.08 22.59 21.215 22.76 21.345C22.08 21.745 21.37 22.08 20.63 22.365C21.02 23.13 21.465 23.86 21.975 24.55C24.005 23.925 26.06 22.97 28.17 21.385C28.635 16.34 27.355 11.92 25.12 7.945ZM12.24 18.79C11.095 18.79 10.145 17.71 10.145 16.385C10.145 15.06 11.07 13.975 12.24 13.975C13.41 13.975 14.36 15.055 14.335 16.385C14.335 17.71 13.41 18.79 12.24 18.79ZM20.57 18.79C19.425 18.79 18.475 17.71 18.475 16.385C18.475 15.06 19.4 13.975 20.57 13.975C21.74 13.975 22.69 15.055 22.665 16.385C22.665 17.71 21.745 18.79 20.57 18.79Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="text-gray text-base">© Copyright 2025. Made by Darshan</p>
      </div>
    </footer>
  );
}
