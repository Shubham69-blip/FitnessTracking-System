
import { useState } from "react";
import { UserRound, Save, Target, Ruler, Weight, CalendarDays } from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("fittrack-profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Shivam",
          email: "shivam@example.com",
          age: "19",
          height: "170",
          weight: "54",
          goal: "Build Muscle"
        };
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("fittrack-profile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="welcome-text">PERSONAL INFORMATION</p>
          <h1>My Profile</h1>
          <p>Manage your personal details and fitness goals.</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-summary">
          <div className="profile-avatar">
            <UserRound size={45} />
          </div>
          <h2>{profile.name}</h2>
          <p>Fitness Enthusiast</p>
          <div className="profile-badge">ACTIVE MEMBER</div>
        </div>

        <div className="profile-form">
          <div className="section-heading">
            <h2>Personal Details</h2>
          </div>

          <div className="profile-fields">
            <label>
              Full Name
              <input name="name" value={profile.name} onChange={handleChange} />
            </label>

            <label>
              Email Address
              <input name="email" type="email" value={profile.email} onChange={handleChange} />
            </label>

            <label>
              <CalendarDays size={15} /> Age
              <input name="age" type="number" value={profile.age} onChange={handleChange} />
            </label>

            <label>
              <Ruler size={15} /> Height (cm)
              <input name="height" type="number" value={profile.height} onChange={handleChange} />
            </label>

            <label>
              <Weight size={15} /> Weight (kg)
              <input name="weight" type="number" value={profile.weight} onChange={handleChange} />
            </label>

            <label>
              <Target size={15} /> Fitness Goal
              <select name="goal" value={profile.goal} onChange={handleChange}>
                <option>Build Muscle</option>
                <option>Lose Weight</option>
                <option>Maintain Fitness</option>
                <option>Improve Endurance</option>
              </select>
            </label>
          </div>

          <button className="primary-button save-button" onClick={handleSave}>
            <Save size={17} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
