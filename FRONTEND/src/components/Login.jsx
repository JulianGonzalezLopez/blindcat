import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../App';
import "./FormLoginSignup.css";


function Login({setUsername, setError}) {
  const [token, setToken] = useContext(TokenContext);
  const navegate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    const requestData = {
      username: formData.get('username'),
      password: formData.get('password')
    };
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (response.ok) {
        let res = await response.json();
        let tk = res.token;
        console.log("Token de respuesta");
        console.log(tk);
        setToken(tk);
        localStorage.setItem("token", tk);
        console.log(tk);
        console.log(token);
        localStorage.setItem("username", formData.get('username'));
        setUsername(formData.get('username'));
        navegate("/app");
      } else {
        let res = await response.json();
        console.log(res.error);
        setError(res.error);
        console.error('Error al iniciar sesión:', response.statusText);
        // Aquí puedes manejar el error de inicio de sesión de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      console.log(error);
      
      // Aquí puedes manejar errores de conexión de red
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form action="http://localhost:3001/login" method="post" onSubmit={()=>{handleLoginSubmit(event)}}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
