import { useState, useEffect } from "react";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState(null);
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await response.json();

        setUser(data);
        setSavedUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      const updatedUser = data.user ?? data.res ?? data;

      setUser(updatedUser);
      setSavedUser(updatedUser);

      setIsEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setUser(savedUser);
    setIsEditing(false);
    setError("");
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>{error || "User not found"}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings.</p>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-user-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <span>FileHub Member</span>
          </div>
        </div>

        <div className="profile-divider"></div>

        <div className="profile-form">
          <h3>Personal Information</h3>

          <div className="profile-input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={user.name}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={user.email}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Account Created</label>

            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString()}
              disabled
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          {success && <p className="success-message">{success}</p>}

          <div className="profile-actions">
            {!isEditing ? (
              <button
                onClick={() => {
                  setSuccess("");
                  setIsEditing(true);
                }}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>

                <button onClick={handleSave}>Save Changes</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
