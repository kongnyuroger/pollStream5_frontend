import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import HostDashboard from './pages/HostDashboard/HostDashboard';
import SessionDetail from './pages/sessiondetail/SessionDetail';
import ParticipantJoin from './pages/participantJoin/ParticipantJoin';
import ParticipantPolls from './pages/participantPolls/ParticipantPolls';
import Home from './pages/home/home';
import Navbar from './components/navbar/Navbar';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/host"
            element={token ? <HostDashboard /> : <Navigate to="/login" />}
          />
          <Route path="/host/sessions/:id" element={<SessionDetail />} />
          <Route path="/participant" element={<ParticipantJoin />} />
          <Route path="/participant/:sessionCode" element={<ParticipantPolls />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;