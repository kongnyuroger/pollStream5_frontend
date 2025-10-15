import { useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";
import "./Register.css";
import "../login/Login.css"

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const res = await api("/api/host/register", {
        method: "POST",
        body: { name, email, password },
      });
      setOk("Account created. You can login now.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-wrap card">
      <div className="auth-side">
        <h2>Welcome </h2>
        <p className="small">Create an account to manage sessions and polls.</p>
      </div>
      <form className="auth-form" onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {ok && <div className="ok">{ok}</div>}
        
        <button>Create account</button>
        <p className=" link login">
          i have an acount.{" "}
          <Link  to={"/login"}>
            login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
