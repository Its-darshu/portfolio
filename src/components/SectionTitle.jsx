export default function SectionTitle({ title, showLine = true }) {
  return (
    <div className="flex items-center gap-8 w-full">
      <h2 className="flex items-start font-medium text-3xl whitespace-nowrap">
        <span className="text-primary">#</span>
        <span className="text-white">{title}</span>
      </h2>
      {showLine && <div className="w-[650px] h-px bg-primary"></div>}
    </div>
  );
}
