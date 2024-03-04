import Login from "./Login";
import Signup from "./Signup";
import "./FormsContainer.css";

function FormsContainer({token, setToken, logged, setLogged, setLastPosts, username, setUsername}) {
  return (
    <div className="forms-container">
        <Login token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername}></Login>
        <Signup logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup>
    </div>
  )
}

export default FormsContainer;