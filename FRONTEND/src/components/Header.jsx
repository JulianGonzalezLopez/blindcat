import "./Header.css";

function Header({username, setUsername}) {
  return (
    <header className="header">
        <p>{username || ""}</p>
        <form action="">
            <button>Create</button>
        </form>
        <div>
            <p>ESPACIO EN BLANCO</p>
        </div>
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
