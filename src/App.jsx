import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import HostDashboard from './pages/HostDashboard.jsx'
import SessionDetail from './pages/SessionDetail.jsx'
import ParticipantJoin from './pages/ParticipantJoin.jsx'
import ParticipantPolls from './pages/ParticipantPolls.jsx'

export default function App(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function logout(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <header className="header">
        <div className="brand">Realtime Polling</div>
        <nav>
          <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/host" className={({isActive}) => isActive ? 'active' : ''}>Host</NavLink>
          <NavLink to="/participant" className={({isActive}) => isActive ? 'active' : ''}>Participant</NavLink>
        </nav>
        <div className="actions">
          {!token && <button className="link" onClick={() => navigate('/login')}>Login</button>}
          {!token && <button className="link" onClick={() => navigate('/register')}>Register</button>}
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
          <Route path="/participant/:sessionCode" element={<ParticipantPolls />} />
        </Routes>
      </div>
    </div>
  )
}

function Home(){
  return (
    <div className="card">
      <h2>Welcome</h2>
      <p className="small">This simple frontend touches most endpoints: host auth, sessions, polls, publish/close, live updates, participant join and submit.</p>
      <ul>
        <li>Use <span className="kbd">/login</span> or <span className="kbd">/register</span> to authenticate as Host.</li>
        <li>Go to <span className="kbd">/host</span> to create sessions and manage polls.</li>
        <li>Participants use <span className="kbd">/participant</span> to join and respond in real-time.</li>
      </ul>
    </div>
  )
}
