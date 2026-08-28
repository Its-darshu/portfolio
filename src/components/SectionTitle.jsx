export default function SectionTitle({ title, showLine = false }) {
  return (
    <div className="sec-tag" data-reveal>
      {title}
    </div>
  );
}