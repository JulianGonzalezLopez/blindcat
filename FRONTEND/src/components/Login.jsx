import "./FormLoginSignup.css";

function Login({username, setUsername, logged, setLogged, token, setToken}) {

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
        let tk = await response.json();
        setToken(tk);
        setLogged(true); // Establecer logged en true si el inicio de sesión es exitoso
        setUsername(formData.get('username'));
        console.log("OK");
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
        // Aquí puedes manejar el error de inicio de sesión de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:', error);
      // Aquí puedes manejar errores de conexión de red
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form action="http://localhost:3001/login" method="post" onSubmit={handleLoginSubmit}>
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
