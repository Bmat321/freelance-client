import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { makeRequest } from "../utils/makeRequest";
import "./login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const noUserPass = !username || !password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await makeRequest.post("/auth/login", { username, password });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <button disabled style={{ cursor: "no-drop" }}>
            <Loader />
          </button>
        ) : (
          <button type="submit" disabled={noUserPass}>
            Login
          </button>
        )}
        {error && (
          <span
            style={{
              textAlign: "center",
            }}
          >
            {error}
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
