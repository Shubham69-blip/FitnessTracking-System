
import { createContext, useContext, useEffect, useState } from "react";
import { workouts as initialWorkouts } from "../data/workoutData";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(() => {
    try {
      const saved = localStorage.getItem("fittrack-workouts");
      return saved ? JSON.parse(saved) : initialWorkouts;
    } catch {
      return initialWorkouts;
    }
  });

  useEffect(() => {
    localStorage.setItem("fittrack-workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout) => {
    setWorkouts((current) => [
      { ...workout, id: Date.now() },
      ...current
    ]);
  };

  const updateWorkout = (id, updatedWorkout) => {
    setWorkouts((current) =>
      current.map((workout) =>
        workout.id === id ? { ...updatedWorkout, id } : workout
      )
    );
  };

  const deleteWorkout = (id) => {
    setWorkouts((current) =>
      current.filter((workout) => workout.id !== id)
    );
  };

  return (
    <WorkoutContext.Provider
      value={{ workouts, addWorkout, updateWorkout, deleteWorkout }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkouts must be used inside WorkoutProvider");
  }

  return context;
}
