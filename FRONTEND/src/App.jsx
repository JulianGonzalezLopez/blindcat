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
  const [relatedComments, setRelatedCommets] = useState([]);
  const [nsfw,setNsfw] = useState(false);

  async function fetchData(){
    let posts = await fetch("http://localhost:3001/post/all",
    {
      headers: new Headers({
        "Authorization": token
      })
    }
    );
    let postsJSON = await posts.json();
    setLastPosts(postsJSON);
  }

  useEffect(() => {

    async function fetchPosts(token){
      let posts = await fetch("http://localhost:3001/post/all",
      {
        headers: new Headers({
          "Authorization": token
        })
      }
      );
      let postsJSON = await posts.json();
      setLastPosts(postsJSON);
  
    };


    const fetchData = async () => {
    
      let tk = localStorage.getItem("token");
      if(tk != null){
        try {
          const response = await fetch('http://localhost:3001/authorize/check', {
            headers: new Headers({
              "Authorization": tk
            })
          });
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          console.log("logged: " + logged);
          setToken(tk);
          setLogged(true);
          setUsername(localStorage.getItem("username"));
          console.log(tk);
          fetchPosts(tk);
          console.log("ANDA");
          console.log("logged: " + logged);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
    };

    fetchData();

    return () => {
      // Realizar limpieza, si es necesario
    };
  }, []); // El segundo argumento de useEffect ([]) indica que este efecto se ejecuta solo una vez, al montar el componente

  return (
    <>
      <Header setNsfw={setNsfw} nsfw={nsfw} token={token} setToken={setToken} setLogged={setLogged}  openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
      {token && <Modal fetchData={fetchData} token={token} openModal={modal} closeModal={() => setModal(false)}></Modal>}
      <main className='main'>
        {logged ? 
          <>
            <Posts nsfw={nsfw} lastPosts={lastPosts} token={token} setSelectedPost={setSelectedPost} setRelatedCommets={setRelatedCommets}></Posts>
            {selectedPost && <CommentsSection setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} token={token} post_id={selectedPost} ></CommentsSection>}
          </> : 
          <FormsContainer token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername}></FormsContainer>  
        }
      </main>
    </>
  )
}


export default App
