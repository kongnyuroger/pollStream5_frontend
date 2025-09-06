const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function authHeaders(){
  const token = localStorage.getItem('token')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export async function api(path, { method='GET', body, headers }={}){
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(headers || {})
    }
  }
  if(body !== undefined) opts.body = JSON.stringify(body)
  const res = await fetch(`${API_URL}${path}`, opts)
  const data = await res.json().catch(() => ({}))
  if(!res.ok){
    const msg = data?.error || data?.message || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}

export default API_URL
