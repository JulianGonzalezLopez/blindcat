import "./Entry.css";

import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//CONTEXT IMPORTS
import { EntryContext } from "../App";
//
import fetchEntry from "../helpers/fetchEntry";

function Entry({title,content, creation_date, setSelectedPost, post_id, token, nsfw, setRelatedCommets, creator_username, relatedComments}) {
  const [showComments, setShowComments] = useState(false);
  const [entryData, setEntryData] = useState({title,content,creation_date});

  const navegate = useNavigate();
  const location = useLocation();

  useEffect(()=>{

    async function auxFuncion(){
      //SALIDA AUXILIAR - AL REFRESCAR SE MONTA PRIMERO EL COMPONTENTE HIJO Y POR LO TANTO NO PUEDO USAR EL CONTEXTO DEL PADRE
      let res = await fetchEntry(localStorage.getItem("token"),post_id);
      let date =new Date(entryData.creation_date);
      date.setHours(date.getHours() - 3);
      const formatedDate = date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });  
  
      setEntryData({title:res.title,content:res.content,creation_date:formatedDate, creator_username:res.creator_username});
    }

  auxFuncion();
  },[]);


  async function createRelationship(token, post_id) {
    const requestData = {
      post_id: post_id
    };
    try {
      const response = await fetch('http://localhost:3001/posts/opened', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });
      let responseJSON = await response.json();
  
    } catch (error) {
      console.error("Error al crear relacion:", error);
      throw error;
    }
  }  

  return (
        <div className="entry_container" id={post_id} onClick={ async (e)=>{
          console.log("clickeado")
          if(location.pathname != "/entry"){
            createRelationship(token, post_id);
            localStorage.setItem("post_id",post_id);
            navegate("/entry");
          }
          }}>
            <h3 className="title">{entryData.title} asdasdsad</h3>
            <p className="content">{entryData.content} asdasdasd</p>
            <p className="creator"> {entryData.creation_date} - {entryData.creator_username} asdasd</p> 
        </div>
  )
}

export default Entry
