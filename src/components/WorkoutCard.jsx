
import { Clock, Flame, Dumbbell, ArrowUpRight } from "lucide-react";

function WorkoutCard({ workout }) {
  return (
    <div className="workout-card">
      <div
        className="workout-card-icon"
        style={{ background: `${workout.color}18`, color: workout.color }}
      >
        <Dumbbell size={23} />
      </div>

      <div className="workout-card-content">
        <div className="workout-card-heading">
          <div>
            <span className="workout-category">{workout.category}</span>
            <h3>{workout.name}</h3>
          </div>
          <ArrowUpRight size={19} />
        </div>

        <p>{workout.description}</p>

        <div className="workout-card-details">
          <span><Clock size={15} /> {workout.duration} min</span>
          <span><Flame size={15} /> {workout.calories} kcal</span>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;
