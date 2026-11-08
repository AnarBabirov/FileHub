import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>FileHub</h1>
          <p>Create your account</p>
        </div>

        <div className="auth-heading">
          <h2>Sign Up</h2>
          <p>Join FileHub and manage your files.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="auth-input-group">
            <label>Confirm Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-checkbox">
            <label>
              <input type="checkbox" required />I agree to the Terms &
              Conditions
            </label>
          </div>

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
