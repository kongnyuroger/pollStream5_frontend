import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx";
import HostDashboard from "./pages/HostDashboard/HostDashboard.jsx";
import SessionDetail from "./pages/sessiondetail/SessionDetail.jsx";
import ParticipantJoin from "./pages/participantJoin/ParticipantJoin.jsx";
import ParticipantPolls from "./pages/participantPolls/ParticipantPolls.jsx";
export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div>
      <header className="header">
        <div className="brand">✨ PollStream5</div>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/host"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Host
          </NavLink>
          <NavLink
            to="/participant"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Participant
          </NavLink>
        </nav>
        <div className="actions">
          {!token && (
            <button className="link" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
          {!token && (
            <button className="link" onClick={() => navigate("/register")}>
              Register
            </button>
          )}
          {token && <span className="small">Signed in</span>}
          {token && <button onClick={logout}>Logout</button>}
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/host/sessions/:id" element={<SessionDetail />} />
          <Route path="/participant" element={<ParticipantJoin />} />
          <Route
            path="/participant/:sessionCode"
            element={<ParticipantPolls />}
          />
        </Routes>
      </div>
    </div>
  );
}
function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome To PollStream5</h1>
        <p className="home-subtitle">
          Engage your audience in real time. Create polls, publish instantly,
          and watch responses live.
        </p>
        <p className="home-subtitle">
          Experience live engagement like never before create polls, launch
          sessions, and see votes update instantly in real time. Perfect for
          hosts and participants alike.
        </p>
        <div className="home-actions">
          <a href="/login" className="btn primary">
            Host Login
          </a>
          <a href="/participant" className="btn secondary">
            Join as Participant
          </a>
        </div>
      </div>
    </div>
  );
}