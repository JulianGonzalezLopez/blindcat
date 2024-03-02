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
  const [lastPosts,setLastPosts] = useState([]); //NECESITO UN BOTON FIXED QUE SE ENCARGUE DE ACTUALIZAR A PEDIDO DE LA PERSONA

  async function fetchData(){
    console.log("FETCH REPIOLA");
    let posts = await fetch("http://localhost:3001/post/all",
    {
      headers: new Headers({
        "Authorization": token
      })
    }
    );
    let postsJSON = await posts.json();
    console.log(postsJSON);
    setLastPosts(postsJSON);
  }

  return (
    <>
      <Header token={token} openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
      {token && <Modal fetchData={fetchData} userId={userId} token={token} openModal={modal} closeModal={() => setModal(false)}></Modal>}
      <main className='main'>
        {logged ? 
          <Posts lastPosts={lastPosts} token={token} ></Posts> : 
          <><Login token={token} setUserId={setUserId} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername}></Login> <Signup logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}></Signup>
        </>}
      </main>
    </>
  )
}


export default App
