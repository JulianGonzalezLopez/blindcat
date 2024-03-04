import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import Modal from "./components/Modal";
import Signup from './components/Signup';
import FormsContainer from './components/FormsContainer';
import Comments from './components/Comments';
import CommentsSection from './components/CommentsSection';
import { useEffect, useState } from "react";

function App() {
  const [logged,setLogged] = useState(false);
  const [username,setUsername] = useState("");
  const [token, setToken] = useState("");
  const [selectedPost,setSelectedPost] = useState("");
  const [modal, setModal] = useState(false);
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
      {token && <Modal fetchData={fetchData} token={token} openModal={modal} closeModal={() => setModal(false)}></Modal>}
      <main className='main'>
        {logged ? 
          <>
            <Posts lastPosts={lastPosts} token={token} setSelectedPost={setSelectedPost}></Posts>
            <CommentsSection></CommentsSection>
          </> : 
          <FormsContainer token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername}></FormsContainer>  
        }
      </main>
    </>
  )
}


export default App
