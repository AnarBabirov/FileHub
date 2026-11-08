import { useState, useEffect } from "react";

export const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    handleUser();
  }, []);

  return (
    <header className="header">
      <div className="header-title">
        <h2>Welcome back, {user ? user.name : "User"}!</h2>
        <p>Here is what's happening with your files today.</p>
      </div>

      <div className="header-actions">
        <input
          type="search"
          placeholder="Search your files..."
          className="header-search"
        />

        <div className="header-avatar">
          {user ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      </div>
    </header>
  );
};
