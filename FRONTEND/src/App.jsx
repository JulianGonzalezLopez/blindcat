import './App.css';
import Header from "./components/Header";
import Posts from "./components/Posts";
import Login from './components/Login';
import Modal from "./components/Modal";
import ErrorModal from './components/ErrorModal';
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
    const [currentError, setCurrentError] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    
    async function fetchPosts(token){
      let posts = await fetch(`http://localhost:3001/post/all?page=${page}&order=${order}`,
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
  
    useEffect(()=>{
      
    },[order])

    useEffect(() => {

      console.log("Pagina: "+ page);
      console.log("Orden: " + order);

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
    }, [page, order]);
  


  if (screen.width < 800){
    return (
      <>
        <ErrorModal error={currentError}></ErrorModal>
        <Header setNsfw={setNsfw} nsfw={nsfw} token={token} setToken={setToken} setLogged={setLogged}  openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
        {token && <Modal fetchData={fetchPosts} token={token} openModal={modal} closeModal={() => {console.log("CERRANDO"); setModal(false)}}></Modal>}
        <main className='main-mobile'>
          {logged ? 
            <>
              <Posts order={order} setLastPosts={setLastPosts}  setOrder={setOrder} page={page} setPage={setPage} nsfw={nsfw} lastPosts={lastPosts} token={token} setSelectedPost={setSelectedPost} setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} post_id={selectedPost} ></Posts>
            </> : 
            <FormsContainer token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername} setPage={setPage} setCurrentError={setCurrentError} ></FormsContainer>  
          }
        </main>
      </>
    )
  }
  else{
    return (
      <>
        <ErrorModal error={currentError}  openModal={errorModal} closeModal={() => {console.log("CERRANDO"); setErrorModal(false)}}></ErrorModal>
        <Header setNsfw={setNsfw} nsfw={nsfw} token={token} setToken={setToken} setLogged={setLogged}  openModal={() => setModal(true)}  username={username} setUsername={setUsername}></Header>
        {token && <Modal openErrorModal={() => setErrorModal(true)} setCurrentError={setCurrentError} fetchData={fetchPosts} token={token} openModal={modal} closeModal={() => {console.log("CERRANDO"); setModal(false)}}></Modal>}
        <main className='main'>
          {logged ? 
            <>
              <Posts order={order} setLastPosts={setLastPosts} setOrder={setOrder} page={page} setPage={setPage} nsfw={nsfw} lastPosts={lastPosts} token={token} setSelectedPost={setSelectedPost} setRelatedCommets={setRelatedCommets}></Posts>
              {selectedPost && <CommentsSection openErrorModal={() => setErrorModal(true)} setCurrentError={setCurrentError} setRelatedCommets={setRelatedCommets} relatedComments={relatedComments} token={token} post_id={selectedPost} ></CommentsSection>}
              {console.log(relatedComments)}
            </> : 
            <FormsContainer setCurrentError={setCurrentError} openErrorModal={() => setErrorModal(true)} token={token} setToken={setToken} logged={logged} setLogged={setLogged} setLastPosts={setLastPosts} username={username} setUsername={setUsername} setPage={setPage} openModal={() => setErrorModal(true)}></FormsContainer>  
          }
        </main>
      </>
    )
  }



}


export default App
