import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import { useState } from "react";
function App() {
  const [logged,setLogged] = useState(true);

  return (
    <>
      <Header></Header>
      <main>
        {logged ? <Posts></Posts> : <Login></Login>}
      </main>
    </>
  )
}

export default App
