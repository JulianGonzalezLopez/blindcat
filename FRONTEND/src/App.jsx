import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import Modal from "./components/Modal";
import Signup from './components/Signup';
import FormsContainer from './components/FormsContainer';
import Comments from './components/Comments';
import CommentsSection from './components/CommentsSection';
import { useEffect, useState, useRef } from "react";

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
    const prevOrder = useRef(null);

    async function fetchPosts(newOrder){
      let posts = await fetch(`http://localhost:3001/post/all?page=${page}&order=${order}`,
      {
        headers: new Headers({
          "Authorization": token
        })
      }
      );
      let postsJSON = await posts.json();   
      if(postsJSON.length > 0){
        console.log("LAST POSTS");
        console.log(lastPosts);
        if(newOrder == true){
          setLastPosts([]);
          setLastPosts(postsJSON);
          
        }
        else{
          console.log("SE CONSERVA EL ORDEN");
          setLastPosts([...lastPosts, ...postsJSON]);
        }
        console.log(lastPosts);
        
      }
    }
  
    useEffect(() => {
      async function fetchData() {
        let tk = localStorage.getItem("token");
        if (tk != null) {
          try {
            const response = await fetch('http://localhost:3001/authorize/check', {
              headers: new Headers({
                "Authorization": tk
              })
            });
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
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
    }, [page, order, token]);
  
    useEffect(() => {
      console.log("Prev: " + prevOrder.current);
      console.log("Current: " + order);
  
      // Si el modo de orden cambia, limpiamos la lista de posts
      if (order !== prevOrder.current) {
        prevOrder.current = order;
        console.log("Prev: " + prevOrder.current);
        setPage(0);
        console.log("GOKUUUUUUUUUUUUUU");
        fetchPosts(true); // Llamamos a fetchPosts para cargar los nuevos posts
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
