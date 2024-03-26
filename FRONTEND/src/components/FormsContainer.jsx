import Login from "./Login";
import Signup from "./Signup";
import "./FormsContainer.css";

function FormsContainer({token, setToken, logged, setLogged, setLastPosts, username, setUsername,setPage, setShowErrorModal, setCurrentError}) {
  return (
    <div className="forms-container">
        <Login setPage={setPage} token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername}></Login>
        <Signup setShowErrorModal={setShowErrorModal} setCurrentError={setCurrentError} logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup>
    </div>
  )
}

export default FormsContainer;