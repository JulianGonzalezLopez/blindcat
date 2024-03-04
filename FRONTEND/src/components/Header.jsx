import "./Header.css";
import logo from "../assets/logo.jpg";

function Header({username, setUsername, openModal, token}) {

  const handleClick = (event) => {
    event.preventDefault();
    openModal();
  };


  return (
    <header className="header">
        <img className="logo" src={logo} alt="" />
        <p>{username || ""}</p>
        {token && <button onClick={handleClick}>Create</button>}
            <select name="category" id="category">
                <option value="" disabled selected>Categories</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
                <option value="">1</option>
            </select>
    </header>
  )
}

export default Header
