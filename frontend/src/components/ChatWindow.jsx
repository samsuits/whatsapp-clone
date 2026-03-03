import React, { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function ChatWindow() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = async () => {
    if (!message) return

    try {
      await axios.post(`${API_URL}/messages`, {
        receiver_id: 2,
        content: message,
      })

      setMessages([...messages, { content: message }])
      setMessage('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 border rounded p-3 mb-3 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="badge bg-primary">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-success" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}