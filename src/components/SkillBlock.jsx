export default function SkillBlock({ title, skills, className = "" }) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-head"><span>{title}</span><span>✦</span></div>
      <div className="flex flex-wrap gap-1.5" style={{ paddingTop: '1.1rem' }}>
        {skills.flat().map((skill, index) => (
          <span key={index} className="wtag" style={{ borderColor: 'var(--ink)' }}>{skill}</span>
        ))}
      </div>
    </div>
  );
}