import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import API_URL from '../api'

export function useSocket(sessionId){
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = io(API_URL, { transports: ['websocket'] })
    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      if(sessionId){
        socket.emit('joinSession', sessionId)
      }
    })
    socket.on('disconnect', () => setConnected(false))

    return () => {
      socket.disconnect()
    }
  }, [sessionId])

  return { socket: socketRef.current, connected }
}
