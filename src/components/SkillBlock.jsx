export default function SkillBlock({ title, skills, className = "" }) {
  return (
    <div className={`border border-gray flex flex-col h-fit ${className}`}>
      <div className="px-3 py-1.5">
        <h3 className="text-white text-base font-semibold">{title}</h3>
      </div>
      <div className="w-full h-px bg-gray"></div>
      <div className="px-3 py-1.5">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {skills.flat().map((skill, index) => (
            <span key={index} className="text-gray text-sm whitespace-nowrap">
              <span className="text-primary">#</span>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
