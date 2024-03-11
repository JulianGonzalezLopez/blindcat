import "./FormLoginSignup.css";
import { useState } from "react";

function Signup({username, setUsername, logged, setLogged}) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const requestData = {
      username: formData.get('username'),
      password: formData.get('password'),
      rePassword: formData.get('rePassword')
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
      } else {
        console.error('Error al registrarse:', response.statusText);
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:', error);
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
    </div>
  )
}

export default Signup
