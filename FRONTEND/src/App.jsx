import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import { useEffect, useState } from "react";
import Signup from './components/Signup';
function App() {
  const [logged,setLogged] = useState(false);
  const [username,setUsername] = useState("");

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
      <Header></Header>
      <main className='main'>
        {logged ? <Posts></Posts> : <><Login logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Login> <Signup logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup></>}
      </main>
    </>
  )
}

export default App
