
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fittrack-sessions")) || [];
    } catch {
      return [];
    }
  });

  const [activeSession, setActiveSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fittrack-active-session")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("fittrack-sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem("fittrack-active-session", JSON.stringify(activeSession));
    } else {
      localStorage.removeItem("fittrack-active-session");
    }
  }, [activeSession]);

  const startSession = (workout) => {
    if (activeSession) return false;

    setActiveSession({
      workoutId: workout.id,
      name: workout.name,
      category: workout.category,
      caloriesPerMinute: workout.duration > 0
        ? workout.calories / workout.duration
        : 0,
      startedAt: Date.now()
    });

    return true;
  };

  const finishSession = () => {
    if (!activeSession) return null;

    const endTime = Date.now();
    const elapsedSeconds = Math.floor(
      (endTime - activeSession.startedAt) / 1000
    );

    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    const calories = Math.round(
      activeSession.caloriesPerMinute * durationMinutes
    );

    const completedWorkout = {
      id: endTime,
      workoutId: activeSession.workoutId,
      name: activeSession.name,
      category: activeSession.category,
      duration: durationMinutes,
      calories,
      startedAt: activeSession.startedAt,
      completedAt: endTime
    };

    setSessions((current) => [completedWorkout, ...current]);
    setActiveSession(null);

    return completedWorkout;
  };

  const cancelSession = () => {
    setActiveSession(null);
  };

  return (
    <SessionContext.Provider
      value={{ sessions, activeSession, startSession, finishSession, cancelSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessions() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSessions must be used inside SessionProvider");
  }

  return context;
}
