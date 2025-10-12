export default function Logo({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="1" y="4" width="7" height="11" stroke="white" strokeWidth="1" fill="none"/>
        <rect x="8" y="1" width="7" height="11" stroke="white" strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}
