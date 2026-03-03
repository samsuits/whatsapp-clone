import React from 'react'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'

export default function App() {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-4 border-end p-3">
          <ChatList />
        </div>
        <div className="col-8 p-3">
          <ChatWindow />
        </div>
      </div>
    </div>
  )
}