
import { Flame, Clock, Trophy, TrendingUp } from "lucide-react";
import ProgressChart from "../components/ProgressChart";
import { weeklyActivity } from "../data/workoutData";

const progressStats = [
  { title: "Workouts Completed", value: "24", unit: "sessions", icon: Trophy },
  { title: "Total Calories", value: "8,450", unit: "kcal", icon: Flame },
  { title: "Workout Duration", value: "18.5", unit: "hours", icon: Clock },
  { title: "Consistency", value: "85%", unit: "this month", icon: TrendingUp }
];

function Progress() {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="welcome-text">TRACK YOUR JOURNEY</p>
          <h1>Your Progress</h1>
          <p>See how far you've come and keep improving.</p>
        </div>
      </div>

      <div className="stats-grid">
        {progressStats.map(({ title, value, unit, icon: Icon }) => (
          <div className="stat-card" key={title}>
            <div className="stat-icon" style={{ color: "#a3e635", background: "#a3e63118" }}>
              <Icon size={21} />
            </div>
            <p className="stat-title">{title}</p>
            <div className="stat-value">
              {value} <span>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="progress-main-chart">
        <ProgressChart data={weeklyActivity} />
      </div>

      <div className="achievement-card">
        <div className="achievement-icon">
          <Trophy size={27} />
        </div>
        <div>
          <h3>Consistency Champion</h3>
          <p>You've completed 24 workouts. Keep up the excellent work!</p>
        </div>
      </div>
    </div>
  );
}

export default Progress;
