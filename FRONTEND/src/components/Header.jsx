import "./Header.css";
import logo from "../assets/logo.jpg";

function Header({username, setUsername, openModal, token, setToken, setLogged}) {

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
          <select name="category" id="category">
                <option value="" disabled selected>Categories</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
            <button onClick={logout}>Log out</button>
        </>     
        }
    </header>
  )
}

export default Header
