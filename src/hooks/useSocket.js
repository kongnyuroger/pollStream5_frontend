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


/* import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import API_URL from "../api";

export function useSocket(sessionId) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  // Connect once
  useEffect(() => {
    const socket = io(API_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // <-- run once

  // Handle session join separately
  useEffect(() => {
    if (sessionId && socketRef.current?.connected) {
      console.log("🔗 Joining session:", sessionId);
      socketRef.current.emit("joinSession", sessionId);
    }
  }, [sessionId, connected]);

  return { socket: socketRef.current, connected };
}*/
