
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  ChartNoAxesCombined,
  UserRound,
  Activity,
  Settings,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Workouts", path: "/workouts", icon: Dumbbell },
  { name: "Progress", path: "/progress", icon: ChartNoAxesCombined },
  { name: "My Profile", path: "/profile", icon: UserRound }
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Activity size={23} />
        </div>
        <div>
          <h2>FitTrack</h2>
          <span>FITNESS STUDIO</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-nav">
          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              to={path}
              key={path}
              end={path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">S</div>
          <div>
            <h4>Shivam</h4>
            <span>Personal Account</span>
          </div>
        </div>
        <button className="logout-button">
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
