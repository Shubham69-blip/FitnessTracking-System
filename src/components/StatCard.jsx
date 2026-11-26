
function StatCard({ title, value, unit, change, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon" style={{ background: `${color}18`, color }}>
          <Icon size={21} />
        </div>
        <span className="stat-change">{change}</span>
      </div>

      <p className="stat-title">{title}</p>

      <div className="stat-value">
        {value}
        <span>{unit}</span>
      </div>
    </div>
  );
}

export default StatCard;
