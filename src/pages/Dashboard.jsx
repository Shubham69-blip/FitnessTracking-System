
import { Flame, Clock, Dumbbell, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ProgressChart from "../components/ProgressChart";
import WorkoutCard from "../components/WorkoutCard";
import { weeklyActivity, workoutStats } from "../data/workoutData";
import { useWorkouts } from "../context/WorkoutContext";

const icons = [Dumbbell, Flame, Clock, Target];

function Dashboard() {
  const { workouts } = useWorkouts();

  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="welcome-text">WELCOME BACK 👋</p>
          <h1>Good evening, Shivam!</h1>
          <p>Here's your fitness overview for today.</p>
        </div>

        <span className="today-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </span>
      </div>

      <section className="stats-grid">
        {workoutStats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} icon={icons[index]} />
        ))}
      </section>

      <section className="dashboard-grid">
        <ProgressChart data={weeklyActivity} />

        <div className="goal-card">
          <div className="section-heading">
            <h3>Weekly Goal</h3>
            <Target size={20} color="#a3e635" />
          </div>

          <div className="goal-progress">
            <div className="goal-circle">
              <strong>4/5</strong>
              <span>Workouts</span>
            </div>
          </div>

          <p>
            You're almost there! Complete one more workout to reach your
            weekly goal.
          </p>

          <div className="goal-bar">
            <span style={{ width: "80%" }}></span>
          </div>

          <small>80% completed</small>
        </div>
      </section>

      <section className="recent-workouts">
        <div className="section-heading">
          <div>
            <h2>Recommended Workouts</h2>
            <p>Keep pushing towards your fitness goals.</p>
          </div>

          <Link to="/workouts">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="workout-grid">
          {workouts.slice(0, 3).map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
