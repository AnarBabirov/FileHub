import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
   const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    if(!formData.email || !formData.password){
      alert("Wrong password or email");
      return;
    }
    const response= await fetch("http://localhost:5000/users/login",{


      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
         email:formData.email,
         password:formData.password


      })
    })
    const data= await response.json();
    if(!response.ok){
      throw new Error(data.message)

    }
    localStorage.setItem("token",data.user.token)





    navigate("/")




  }
  catch(error){console.log(error.message)}
    

   
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <h1>FileHub</h1>
          <p>Welcome back!</p>
        </div>

        <div className="auth-heading">
          <h2>Sign In</h2>
          <p>Enter your account details to continue.</p>
        </div>

        <form onSubmit={handleSubmit}>

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
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

          <div className="auth-options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot-password">
              Forgot password?
            </a>

          </div>

          <button type="submit" className="auth-submit">
            Sign In
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};
