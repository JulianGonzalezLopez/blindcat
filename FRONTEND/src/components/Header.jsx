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
          <p>{username || ""}</p>
          <button onClick={handleClick}>Create</button>
          <label class="switch">
            <input type="checkbox" onClick={()=>{setNsfw(!nsfw)}} />
            <span class="slider round"></span>
          </label>
          <button onClick={logout}>Log out</button>
        </>     
        }
    </header>
  )
}

export default Header
