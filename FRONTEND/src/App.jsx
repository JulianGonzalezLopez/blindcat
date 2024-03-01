import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import { useEffect, useState } from "react";
import Signup from './components/Signup';
function App() {
  const [logged,setLogged] = useState(false);
  const [username,setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {

    async function asd(){
      const res = await fetch("http://localhost:3001/ok");
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      console.log(res);
      const resJSON = await res.text();
      console.log(resJSON);
    };

    asd();

  }, []);

  return (
    <>
      <Header username={username} setUsername={setUsername}></Header>
      <main className='main'>
        {logged ? <Posts token={token} ></Posts> : <><Login token={token} setToken={setToken} logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Login> <Signup logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup></>}
      </main>
    </>
  )
}

export default App
