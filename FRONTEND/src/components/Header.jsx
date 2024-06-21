import "./Header.css";
import logo from "../assets/logo.jpg";

function Header({username, setUsername, openModal, token, setToken, setLogged, setNsfw, nsfw}) {

  const handleClick = (event) => {
    event.preventDefault();
    openModal();
  };

  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setLogged(false);
  };


  return (
    <header className="header">

          <div className="top-header">
            <img className="logo" src={logo} alt="" />
            {token && 
            <>
              <p className="username"> {"> " + username || ""}</p>
              <button className="header-button" onClick={logout}>Cerrar</button>
            </>}
          </div>

      {token && 
          <div className="bottom-header">
            <div className="checkbox-parent">
              <p>NSFW</p>
            <label className="switch">
              <input type="checkbox" onClick={()=>{setNsfw(!nsfw)}} />
              <span className="slider round"></span>
            </label>
            </div>
            <button className="header-button" onClick={handleClick}>Crear</button>
          </div>
          }
          
    </header>
  )
}

export default Header
