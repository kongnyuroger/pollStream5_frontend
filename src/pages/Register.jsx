import { useState } from 'react'
import { api } from '../api'
import './Register.css'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  async function handleRegister(e){
    e.preventDefault()
    setError(''); setOk('')
    try{
      const res = await api('/api/host/register', { method:'POST', body:{ name, email, password } })
      setOk('Account created. You can login now.')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Create account</h2>
      <form className="form" onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 8 characters" required/>
        </div>
        {error && <div className="error">{error}</div>}
        {ok && <div className="ok">{ok}</div>}
        <button>Create account</button>
      </form>
    </div>
  )
}
