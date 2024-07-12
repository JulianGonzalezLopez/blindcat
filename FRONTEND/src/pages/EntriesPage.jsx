//FILES
import CategorySelector from "../components/CategorySelector";
import Entry from "../components/Entry";
//STYLES
import "../components/Header.css";
import "../components/Posts.css";
import "./EntriesPage.css";
//ASSETS
import logo from "../assets/logo.jpg";
import b from "../assets/letter_b.svg";
//REACT IMPORTS
import { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
//CONTEXT IMPORTS
import { TokenContext } from "../App";
//HELPERS IMPORTS
import fetchAuthorization from "../helpers/fetchAuthorization";

  function EntriesPage({username, setUsername}) {
    const [token,setToken] = useContext(TokenContext);
    const navegate = useNavigate();
    const [lastPosts,setLastPosts] = useState([]); //NECESITO UN BOTON FIXED QUE SE ENCARGUE DE ACTUALIZAR A PEDIDO DE LA PERSONA
    const [nsfw,setNsfw] = useState(false);
    const [categories] = useState([{key:"General", value:"gen"},{key:"Deporte", value:"dep"},{key:"Anime", value:"ani"}]); // Ejemplo de categorías
    //A tener en cuenta para pedidos de información
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("new");
    const [selectedCategory, setSelectedCategory] = useState("");

    console.log(token);

    async function fetchPosts(tk){
        let posts = await fetch(`http://localhost:3001/posts/?page=${page}&order=${order}&category=${selectedCategory}`,
      {
        headers: new Headers({
          "Authorization": tk
        })
      }
      );
      let postsJSON = await posts.json();   
      if(postsJSON.length > 0){
        setLastPosts([...lastPosts, ...postsJSON]);
      }
    }

    function handleLogout(){
      localStorage.removeItem("token");
      setToken("");
      setUsername("");
      navegate("/login");
    }

    // function handleCreate(){

    // }

    useEffect(()=>{
      fetchPosts(token);
    },[token]);



    // useEffect(()=>{
    //   setLastPosts([]);
    //   fetchPosts(token);
    // },[selectedCategory])




    // useEffect(() => {
  

    //   fetchAuthorization();
  
    //   return () => {
    //     // Realizar limpieza, si es necesario
    //   };
    // }, [page, order]);
  


    return (
      <>
        <header className="header">
          <img className="logo" src={b} alt="blindcat logo" />
          <p className="username"> {"> " + username || ""}</p>
          <CategorySelector className="header-button" categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}></CategorySelector>
          <button className="header-button" onClick={()=>{console.log("CREAR")}}>Crear</button>
          <button className="header-button logout-button" onClick={()=>{handleLogout()}}>Cerrar</button>
        </header>        
        
        <main className='main'>
          <div className="posts">
            <div className="orden-btn-container">
                  <button className="orden-btn" onClick={()=>{if(order != "new"){setPage(0); setLastPosts([]);} setOrder("new");  }}> Nuevo</button>
                  <button className="orden-btn"onClick={()=>{if(order != "top"){setPage(0); setLastPosts([]);} setOrder("top");  }}> Top</button>
            </div>
            {lastPosts?.map(post => {
                return (
                  <Entry onClick={()=>{console.log("clickeado")}}
                    title={post.title}
                    content={post.content}
                    creation_date={post.creation_date}
                    key={post.id}
                    post_id={post.id}
                    likes={post.likes}
                    nsfw={nsfw ? false : post.nsfw}
                    creator_username={post.username}
                    token={token}
                  />
                );
            })}
            <button className="button-53" onClick={()=>{setPage(page+1)}}>Leer mas...</button>
          </div>        
        </main>  
      </>
    )
}


export default EntriesPage