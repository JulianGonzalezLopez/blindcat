import "./Header.css";

function Header() {
  return (
    <header className="header">
        <p>USERNAME</p>
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
