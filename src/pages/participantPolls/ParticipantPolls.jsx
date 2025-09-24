import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api.js'
import { useSocket } from '../../hooks/useSocket.js'
import './ParticipantPolls.css'

export default function ParticipantPolls(){
  const { sessionCode } = useParams()
  const [session, setSession] = useState(null)
  const [polls, setPolls] = useState([])
  const [error, setError] = useState('')
  const [participant, setParticipant] = useState(null)

  useEffect(() => {
  const p = sessionStorage.getItem('participant');
  if (p) {
    setParticipant(JSON.parse(p));
  } else {
    // optional: redirect back to join page
    window.location.assign('/participant');
  }
}, []);


  const sessionId = useMemo(() => session?.session?.id || null, [session])
  console.log(`session id form particpant page is ${sessionId}`)
  const { socket, connected } = useSocket(sessionId)

  async function load(){
    try{
      const s = await api(`/api/participant/sessions/${sessionCode}`)
      setSession(s)
      const data = await api(`/api/participant/sessions/${sessionCode}/polls`)
      setPolls(data.polls || [])
    }catch(err){ setError(err.message) }
  }
  useEffect(()=>{ load() }, [sessionCode])

  useEffect(() => {
    if(!socket) return
    socket.on('pollPublished', (poll) => {
      console.log("pollPublished")
      setPolls(prev => {
        // only add if not present and status published
        const exists = prev.find(p => p.id === poll.id)
        if(exists) return prev
        return [...prev, poll]
      })
    })
    return () => { socket?.off('pollPublished') }
  }, [socket])

  async function submit(pollId, payload){
    try{
      await api(`/api/participant/polls/${pollId}/submit`, {
        method:'POST',
        body:{
          participantId: participant?.participantId,
          responseData: payload
        }
      })
      alert('Response submitted')
    }catch(err){ setError(err.message) }
  }

  if(!session) return <div className="card">Loading...</div>

  return (
    <div className="card">
      <h2>Session: {session?.session?.name}</h2>
      <p className="small">Socket: {connected ? 'connected' : 'disconnected'}</p>
      {error && <div className="error">{error}</div>}
      {polls.length === 0 && <p>No active polls yet. Please wait…</p>}
      <div className="row">
        {polls.map(p => (
          <PollCard key={p.id} poll={p} onSubmit={submit} />
        ))}
      </div>
    </div>
  )
}

function PollCard({ poll, onSubmit }){
  const [answer, setAnswer] = useState(poll.type === 'multiple-choice' ? [] : '')
  function toggle(id){
    setAnswer(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
  }
  function send(){
    const payload = poll.type === 'open-ended' ? { text: answer } :
      (poll.type === 'single-choice' ? { optionId: answer } : { optionIds: answer })
    onSubmit(poll.id, payload)
  }
  return (
    <div className="poll card">
      <div className="q">{poll.question}</div>
      {poll.type === 'open-ended' && (
        <div><textarea rows={3} value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Your thoughts…" /></div>
      )}
      {poll.type !== 'open-ended' && (
        <ul className="options">
          {poll.options?.map(opt => (
            <li key={opt.id}>
              {poll.type === 'single-choice' ? (
                <label><input type="radio" name={`p-${poll.id}`} onChange={()=>setAnswer(opt.id)} /> {opt.text}</label>
              ) : (
                <label><input type="checkbox" checked={answer.includes(opt.id)} onChange={()=>toggle(opt.id)} /> {opt.text}</label>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="actions"><button onClick={send}>Submit</button></div>
    </div>
  )
}
