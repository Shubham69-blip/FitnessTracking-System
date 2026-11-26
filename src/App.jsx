
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import { WorkoutProvider } from "./context/WorkoutContext";
import { SessionProvider } from "./context/SessionContext";
import "./App.css";

function App() {
  return (
    <WorkoutProvider>
      <SessionProvider>
        <BrowserRouter>
          <div className="app-layout">
            <Sidebar />
            <main className="main-content">
              <Navbar />
              <div className="page-container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </SessionProvider>
    </WorkoutProvider>
  );
}

export default App;
