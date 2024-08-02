import React from 'react'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  function handleLogout(event){
    event.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
