import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/admin");
    } catch (error) {
      console.log(error);

      alert("Invalid username or password");
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          +
        </div>

        <div className="login-header">
          <h1>Admin Login</h1>

          <p>
            Medical Jobs Administration
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="login-field">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter your username"
              required
            />

          </div>

          <div className="login-field">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />

          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login to Dashboard
          </button>

        </form>

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Job Listings
        </Link>

        <div className="login-footer">
          Medical Jobs Portal
        </div>

      </div>

    </div>
  );
}

export default Login;