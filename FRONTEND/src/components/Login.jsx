import "./FormLoginSignup.css";

function Login() {
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form action="http://localhost:3001/login" method="post">
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
