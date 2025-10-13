import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'
import './HostDashboard.css'

export default function HostDashboard(){
  const [sessions, setSessions] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function load(){
    try{
      const data = await api('/api/host/sessions')
      setSessions(data.sessions || [])
    }catch(err){
      setError(err.message)
    }
  }
  useEffect(() => { load()}, [])

  async function createSession(e){
    e.preventDefault()
    try{
      const res = await api('/api/host/sessions', { method:'POST', body:{ name } })
      setName('')
      await load()
    }catch(err){
      setError(err.message)
    }
  }

  if(error.includes("Invalid token") || error.includes('No token provided')){
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <div className="card">
      <h2>Your Sessions</h2>
      <form className="form" onSubmit={createSession}>
        <div>
          <label>Session name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Weekly standup" required />
        </div>
        <button>Create session</button>
      </form>
      {error && <div className="error">{error}</div>}
      <table className="table">
        <thead><tr><th>Name</th><th>Code</th><th></th></tr></thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td><span className="kbd">{s.session_code}</span></td>
              <td><button onClick={()=>navigate(`/host/sessions/${s.id}`)}>Manage</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
