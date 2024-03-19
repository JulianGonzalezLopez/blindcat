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
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("new");
  const [prevOrder, setPrevOrder] = useState("new");

  async function fetchPosts(){
    let posts = await fetch(`http://localhost:3001/post/all?page=${page}`,
    {
      headers: new Headers({
        "Authorization": token
      })
    }
    );
    let postsJSON = await posts.json();   
    if(postsJSON.length > 0){
      setLastPosts([...lastPosts, ...postsJSON]);
    }
  }

  useEffect(() => {
    async function fetchPosts(token){
      let posts = await fetch(`http://localhost:3001/post/all?page=${page}`,
      {
        headers: new Headers({
          "Authorization": token
        })
      });
      let postsJSON = await posts.json();
      if(postsJSON.length > 0){
        setLastPosts([...lastPosts, ...postsJSON]);
      }
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
          fetchPosts(tk);
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      }
    };
  
    fetchData();
  
    return () => {
      // Realizar limpieza, si es necesario
    };
  }, [page]); // Dependencias: page y order
  
  // Este useEffect se ejecutará solo cuando order cambie
  useEffect(() => {
    if(prevOrder !== order){
      order == "new" ? setPrevOrder("top") : setPrevOrder("new");
      setPage(0);
      setLastPosts([]);
    }

  }, [order]);

  if (screen.width < 800){
    return (
      <>
        <Header setNsfw={setNsfw} nsfw={nsfw} token={token} setToken={setToken} setLogged={setLogged}  openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
        {token && <Modal fetchData={fetchPosts} token={token} openModal={modal} closeModal={() => {console.log("CERRANDO"); setModal(false)}}></Modal>}
        <main className='main-mobile'>
          {logged ? 
            <>
              <Posts order={order} setOrder={setOrder} page={page} setPage={setPage} nsfw={nsfw} lastPosts={lastPosts} token={token} setSelectedPost={setSelectedPost} setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} post_id={selectedPost} ></Posts>
            </> : 
            <FormsContainer token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername} setPage={setPage}></FormsContainer>  
          }
        </main>
      </>
    )
  }
  else{
    return (
      <>
        <Header setNsfw={setNsfw} nsfw={nsfw} token={token} setToken={setToken} setLogged={setLogged}  openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
        {token && <Modal fetchData={fetchPosts} token={token} openModal={modal} closeModal={() => {console.log("CERRANDO"); setModal(false)}}></Modal>}
        <main className='main'>
          {logged ? 
            <>
              <Posts order={order} setOrder={setOrder} page={page} setPage={setPage} nsfw={nsfw} lastPosts={lastPosts} token={token} setSelectedPost={setSelectedPost} setRelatedCommets={setRelatedCommets}></Posts>
              {selectedPost && <CommentsSection setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} token={token} post_id={selectedPost} ></CommentsSection>}
            </> : 
            <FormsContainer token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername} setPage={setPage}></FormsContainer>  
          }
        </main>
      </>
    )
  }



}


export default App
