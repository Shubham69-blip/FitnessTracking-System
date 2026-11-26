
import { Bell, Search, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-search">
        <Search size={18} />
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="navbar-right">
        <button className="notification-button">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="navbar-profile">
          <div className="user-avatar">S</div>
          <div className="navbar-user-info">
            <strong>Shivam</strong>
            <span>Free Plan</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
