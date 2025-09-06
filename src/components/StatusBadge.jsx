import './StatusBadge.css'

export default function StatusBadge({ status }){
  return <span className={`badge status-${status}`}>{status}</span>
}
