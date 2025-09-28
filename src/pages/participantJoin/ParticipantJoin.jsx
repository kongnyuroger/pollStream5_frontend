import { useState, useEffect } from 'react'
import { api } from '../../api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './ParticipantJoin.css'

export default function ParticipantJoin(){
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Autofill code from query param
  useEffect(() => {
    const prefill = searchParams.get('code')
    if (prefill) setCode(prefill.toUpperCase())
  }, [searchParams])

  async function join(e){
    e.preventDefault()
    setError('')
    try{
      await api(`/api/participant/sessions/${code}`)
      const res = await api(`/api/participant/sessions/${code}/join`, { 
        method:'POST', 
        body:{ name, email } 
      })
      sessionStorage.setItem('participant', JSON.stringify(res))
      navigate(`/participant/${code}`)
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>Join Session</h2>
      <form className="form" onSubmit={join}>
        <div>
          <label>Session Code</label>
          <input 
            value={code} 
            onChange={e=>setCode(e.target.value.toUpperCase())} 
            placeholder="e.g., 7H2KQX" 
            required 
          />
        </div>
        <div className="row grid-2">
          <div>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <button>Join</button>
      </form>
    </div>
  )
}
