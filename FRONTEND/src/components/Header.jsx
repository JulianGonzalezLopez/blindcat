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
        <img className="logo" src={logo} alt="" />
        {token && <>
          <p className="username"> {"> " + username || ""}</p>
          <button className="header-button" onClick={handleClick}>Create</button>
          <label className="switch">
            <input type="checkbox" onClick={()=>{setNsfw(!nsfw)}} />
            <span className="slider round"></span>
          </label>
          <button className="header-button" onClick={logout}>Log out</button>
        </>     
        }
    </header>
  )
}

export default Header
