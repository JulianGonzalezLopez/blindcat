import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./LoginPage.css";
import logo from "../assets/logo.jpg";
import MessageModal from "../components/ErrorModal";


function LoginPage({setUsername, setError}){
    const [logging,setLogging] = useState(true);

    return(
        <div className="parent-container-login">
            <div className="container-login-logo">
                <img className="login-logo" src={logo} alt="LOGO"/>
                <h1>Blindcat</h1>
            </div>
            <div className="container-login-login">
                {logging ? <Login setUsername={setUsername} setError={setError}></Login> : <Signup  setError={setError}></Signup>}
                {logging ? 
                    (<p onClick={() => setLogging(false)}>¿No tienes una cuenta? <span className="register-link">Registrate</span></p>) : 
                    (<p onClick={() => setLogging(true)}>¿Tienes una cuenta? <span className="register-link">Logeate</span></p>)}
            </div>
        </div>
    )
}


export default LoginPage