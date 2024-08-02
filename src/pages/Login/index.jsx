import React,{useState} from 'react'
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const userRef = useRef("")
  const userpasswordRef = useRef("")

  function validate(){
    return true;
  }
  function handleForm(event){
    event.preventDefault()

    const isValid = validate()
    if(!isValid){
      return;
    }
    const user = {
      username: userRef.current.value,
      password: userpasswordRef.current.value,
    };
    setLoading(true)
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if(data.message === "User Not found."){
          alert(data.message),
          userRef.current.focus()
          return
        }
        if(data.message === "Invalid Password!"){
          alert(data.message),
          passwordRef.current.focus()
          return
        }
        if(data.accessToken){
          alert('Sucsses')
          localStorage.setItem('user', JSON.stringify(data))
          localStorage.setItem('token', data.accessToken)

          navigate('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(function(){
        setLoading(false)
      })  
  }
  return (
    <div className={styles.Forms}>
      <form className={styles.form}>
        <input ref={userRef} type="text" placeholder="User name" />
        <input ref={userpasswordRef} type="password" placeholder="User Password" />

        {
          loading && <button disabled>Loading...</button>
        }
        {
          !loading && <button onClick={handleForm}>Login</button>
        }
        <Link className={styles.nextBtn} to = '/register'>Register</Link>
      </form>
    </div>
  )
}

export default Login
