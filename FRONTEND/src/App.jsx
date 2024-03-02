import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import Signup from './components/Signup';
function App() {
  const [logged,setLogged] = useState(false);
  const [username,setUsername] = useState("");
  const [token, setToken] = useState("");
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(0);

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
      <Header token={token} openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
      {token && <Modal userId={userId} token={token} openModal={modal} closeModal={() => setModal(false)}></Modal>}
      <main className='main'>
        {logged ? 
          <Posts token={token} ></Posts> : 
          <><Login token={token} setUserId={setUserId} setToken={setToken} logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Login> <Signup logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup>
        </>}
      </main>
    </>
  )
}

export default App
