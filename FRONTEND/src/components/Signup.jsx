import "./FormLoginSignup.css";
import { useState } from "react";

function Signup({username, setUsername, logged, setLogged}) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const requestData = {
      username: formData.get('username'),
      password: formData.get('password'),
      rePassword: formData.get('rePassword'),
      creation_date: date
    };

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        event.target.reset();
        let positiveVerificacion = document.getElementById("positive-verification");
        positiveVerificacion.classList.add("show-verification");
      } else {
        console.error('Error al registrarse:', response.statusText);
        let negativeVerification = document.getElementById("negative-verification");
        negativeVerification.classList.add("show-verification");
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:', error);
      let negativeVerification = document.getElementById("negative-verification");
      negativeVerification.classList.add("show-verification");
      // Aquí puedes manejar errores de conexión de red
    }
  };


  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form action="http://localhost:3001/signup" method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <label htmlFor="newPassword">Repeat password</label>
        <input type="password" id="rePassword" name="rePassword" required />
        <button type="submit" className="login-button" >Sign Up</button>
      </form>
          <span id="positive-verification" className="verification" onAnimationEnd={()=>{
            let positiveVerificacion = document.getElementById("positive-verification");
            positiveVerificacion.classList.remove("show-verification");
          }} >✅</span>
          <span id="negative-verification" className="verification" onAnimationEnd={()=>{
            let negativeVerification = document.getElementById("negative-verification");
            negativeVerification.classList.remove("show-verification");
          }}>❌</span>
    </div>
  )
}

export default Signup
