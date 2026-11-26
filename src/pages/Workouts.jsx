
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Dumbbell,
  Pencil,
  Trash2,
  X,
  Play,
  Square,
  Clock,
  Flame
} from "lucide-react";
import WorkoutCard from "../components/WorkoutCard";
import { useWorkouts } from "../context/WorkoutContext";
import { useSessions } from "../context/SessionContext";

const emptyForm = {
  name: "",
  category: "STRENGTH",
  description: "",
  duration: "30",
  calories: "200",
  color: "#a3e635"
};

function Workouts() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  const { activeSession, startSession, finishSession, cancelSession } = useSessions();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!activeSession) {
      setElapsed(0);
      return;
    }

    const updateElapsed = () => {
      setElapsed(Math.floor((Date.now() - activeSession.startedAt) / 1000));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  };

  const categories = ["All", "STRENGTH", "CARDIO", "FULL BODY"];

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.name.toLowerCase().includes(search.toLowerCase()) ||
      workout.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || workout.category === filter;

    return matchesSearch && matchesFilter;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (workout) => {
    setEditingId(workout.id);
    setForm({
      ...workout,
      duration: String(workout.duration),
      calories: String(workout.calories)
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const workoutData = {
      ...form,
      duration: Number(form.duration),
      calories: Number(form.calories)
    };

    if (editingId !== null) {
      updateWorkout(editingId, workoutData);
    } else {
      addWorkout(workoutData);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (activeSession?.workoutId === id) {
      alert("You cannot delete a workout while its session is active.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this workout?")) {
      deleteWorkout(id);
    }
  };

  const handleStart = (workout) => {
    if (activeSession) {
      alert("Finish or cancel your current workout before starting another.");
      return;
    }

    startSession(workout);
  };

  const handleFinish = () => {
    const completed = finishSession();

    if (completed) {
      alert(
        `Workout completed!\n\n${completed.name}\nDuration: ${completed.duration} minutes\nCalories: ${completed.calories} kcal`
      );
    }
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="welcome-text">YOUR FITNESS ROUTINE</p>
          <h1>Workout Plans</h1>
          <p>Create, manage and perform your workouts.</p>
        </div>

        <button className="primary-button" onClick={openCreateModal}>
          <Plus size={18} /> Create Workout
        </button>
      </div>

      {activeSession && (
        <div className="active-session-banner">
          <div className="active-session-info">
            <div className="active-session-icon">
              <Dumbbell size={22} />
            </div>
            <div>
              <span className="active-label">WORKOUT IN PROGRESS</span>
              <h2>{activeSession.name}</h2>
            </div>
          </div>

          <div className="session-timer">
            <Clock size={18} />
            <strong>{formatTime(elapsed)}</strong>
          </div>

          <div className="active-session-actions">
            <button className="finish-session-button" onClick={handleFinish}>
              <Square size={15} /> Finish
            </button>
            <button className="cancel-session-button" onClick={() => {
              if (window.confirm("Discard this workout session?")) {
                cancelSession();
              }
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="workout-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={filter === category ? "filter-active" : ""}
              onClick={() => setFilter(category)}
            >
              {category === "All" ? "All" : category}
            </button>
          ))}
        </div>
      </div>

      <div className="workout-grid">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <div className="managed-workout" key={workout.id}>
              <WorkoutCard workout={workout} />

              <div className="workout-actions">
                <button
                  className="start-workout-button"
                  disabled={!!activeSession}
                  onClick={() => handleStart(workout)}
                >
                  <Play size={14} /> Start
                </button>

                <button onClick={() => openEditModal(workout)}>
                  <Pencil size={14} /> Edit
                </button>

                <button
                  className="delete-workout"
                  onClick={() => handleDelete(workout.id)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Dumbbell size={35} />
            <h3>No workouts found</h3>
            <p>Try another search or create a new workout.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <form className="workout-modal" onSubmit={handleSubmit}>
            <div className="modal-heading">
              <div>
                <h2>{editingId !== null ? "Edit Workout" : "Create Workout"}</h2>
                <p>Enter the details of your workout.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <label>
              Workout Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Upper Body Strength"
                required
                maxLength={60}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your workout..."
                required
                maxLength={180}
                rows={3}
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="STRENGTH">Strength</option>
                <option value="CARDIO">Cardio</option>
                <option value="FULL BODY">Full Body</option>
              </select>
            </label>

            <div className="modal-fields-row">
              <label>
                Duration (minutes)
                <input
                  name="duration"
                  type="number"
                  min="1"
                  max="600"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Calories (kcal)
                <input
                  name="calories"
                  type="number"
                  min="0"
                  max="10000"
                  value={form.calories}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label>
              Theme Color
              <select
                name="color"
                value={form.color}
                onChange={handleChange}
              >
                <option value="#a3e635">Lime Green</option>
                <option value="#38bdf8">Sky Blue</option>
                <option value="#fb923c">Orange</option>
                <option value="#c084fc">Purple</option>
                <option value="#f472b6">Pink</option>
              </select>
            </label>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="primary-button">
                {editingId !== null ? "Save Changes" : "Create Workout"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Workouts;

