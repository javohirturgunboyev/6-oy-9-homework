import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const useremailRef = useRef("");
  const userpasswordRef = useRef("");
  const userrepasswordRef = useRef("");

  function validate() {
    return true;
  }

  function handleForm(event) {
    event.preventDefault();
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: useremailRef.current.value,
      password: userpasswordRef.current.value,
    };
    setLoading(true)
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Failed! Username is already in use!") {
          alert(data.message);
          nameRef.current.focus();
          return;
        }
        if (data.message === "Failed! Email is already in use!") {
          alert(data.message);
          emailRef.current.focus();
          return;
        }
        if (data.message === "User registered successfully!") {
          alert(data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function(){
        setLoading(false)
      })
  }
  return (
    <div className={styles.Forms}>
      <form className={styles.form}>
        <input ref={usernameRef} type="text" placeholder="User name" />
        <input ref={useremailRef} type="email" placeholder="User Email" />
        <input ref={userpasswordRef} type="password" placeholder="User Password" />
        <input
          ref={userrepasswordRef}
          type="password"
          placeholder="Repeat Password"
        />

        {
          loading && <button disabled>Loading...</button>
        }
        {
          !loading && <button onClick={handleForm}>Register</button>
        }
        <Link className={styles.nextBtn} to = '/login'>Login</Link>
      </form>
    </div>
  );
}

export default Register;
