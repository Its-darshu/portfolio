export default function Marquee({ items = [], inverse = false, speed = '28s' }) {
  const chunk = items.map(t => `<span>${t}<span class="star"> ✦ </span></span>`).join('');
  return (
    <div className={`marquee${inverse ? ' inverse' : ''}`} aria-hidden="true">
      <div className="mq-track" style={{ animationDuration: speed }} dangerouslySetInnerHTML={{ __html: chunk + chunk }} />
    </div>
  );
}