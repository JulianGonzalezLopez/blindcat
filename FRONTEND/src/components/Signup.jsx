import "./FormLoginSignup.css";

function Signup() {
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form action="http://localhost:3001/signup" method="post">
        <label htmlFor="newUsername">Username</label>
        <input type="text" id="newUsername" name="newUsername" required />
        <label htmlFor="newPassword">Password</label>
        <input type="password" id="newPassword" name="newPassword" required />
        <label htmlFor="newPassword">Repeat password</label>
        <input type="password" id="reNewPassword" name="reNewPassword" required />
        <button type="submit" className="login-button" >Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
