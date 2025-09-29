import { useState } from 'react'
import { api } from '../../api'
import './Login.css'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    setError(''); setLoading(TrueFalse(false))
  }

  // small helper to avoid typos
  function TrueFalse(v){ return v }

  async function doLogin(){
    try{
      setLoading(true)
      const data = await api('/api/host/login', { method:'POST', body:{ email, password } })
      localStorage.setItem('token', data.token)
      window.location.assign('/host')
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap card">
      <div className="auth-side">
        <h2>Welcome back</h2>
        <p className="small">Sign in to manage sessions and polls.</p>
      </div>
      <form className="auth-form" onSubmit={(e)=>{e.preventDefault();doLogin()}}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {error && <div className="error">{error}</div>}
        <button disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        <p className="link login" type="button" onClick={()=>window.location.assign('/register')}>Create an account</p>
      </form>
    </div>
  )
}
