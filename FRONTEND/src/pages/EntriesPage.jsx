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
import { CreateModalContext } from "../App";
//HELPERS IMPORTS
import fetchAuthorization from "../helpers/fetchAuthorization";

  function EntriesPage({username, setUsername, categories}) {
    const [token,setToken] = useContext(TokenContext);
    const [showCreateModal, setShowCreateModal] = useContext(CreateModalContext)
    const navegate = useNavigate();
    const [lastPosts,setLastPosts] = useState([]);
    const [nsfw,setNsfw] = useState(false);
    //A tener en cuenta para pedidos de información
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("new");
    const [selectedCategory, setSelectedCategory] = useState("");

    console.log(token);

    async function fetchPosts(tk){
        
      let url;
      
      if(selectedCategory == "none"){
        url = `http://localhost:3001/posts/?page=${page}&order=${order}`;
      }
      else{
        url = `http://localhost:3001/posts/?page=${page}&order=${order}&category=${selectedCategory}`;
      }

      let posts = await fetch(url,
      {
        headers: new Headers({
          "Authorization": tk
        })
      }
      );
      let postsJSON = await posts.json();   
      if(postsJSON.length > 0){
        return postsJSON;
      }
    }

    function handleLogout(){
      localStorage.removeItem("token");
      setToken("");
      setUsername("");
      localStorage.removeItem("username");
      navegate("/login");
    }

    useEffect(()=>{

      async function auxFunction(){
        try{
          let res = await fetchPosts(token);
          setLastPosts(res);
        }
        catch(err){
          console.log(err);
        }
      }

      auxFunction();

    },[token]);

    useEffect(()=>{

      async function auxFunction(){
        try{
          let res = await fetchPosts(token);
          let final = [...lastPosts, ...res]
          setLastPosts(final);
        }
        catch(err){
          console.log(err);
        }
      }

      auxFunction();

    },[page]);

    useEffect(()=>{

      async function auxFunction(){
        try{
          setPage(0)
          setLastPosts([]);
          let res = await fetchPosts(token);
          setLastPosts(res);
        }
        catch(err){
          console.log(err);
        }
      }
      
      auxFunction();

    },[order, selectedCategory]);

    return (
      <>
        <header className="header">
          <img className="logo" src={b} alt="blindcat logo" />
          <p className="username" onClick={()=>{navegate("/user")}} > {"> " + localStorage.getItem("username")}</p>
          <CategorySelector className="header-button category-selector" categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}></CategorySelector>
          <button className="header-button create-button" onClick={()=>{setShowCreateModal(true)}}>Crear</button>
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