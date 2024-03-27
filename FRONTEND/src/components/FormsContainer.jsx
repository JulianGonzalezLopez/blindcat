import Login from "./Login";
import Signup from "./Signup";
import "./FormsContainer.css";

function FormsContainer({token, setToken, logged, setLogged, setLastPosts, username, setUsername,setPage, openErrorModal, setCurrentError}) {
  return (
    <div className="forms-container">
        <Login setCurrentError={setCurrentError} openErrorModal={openErrorModal} setPage={setPage} token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername}></Login>
        <Signup setCurrentError={setCurrentError} openErrorModal={openErrorModal} logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup>
    </div>
  )
}

export default FormsContainer;