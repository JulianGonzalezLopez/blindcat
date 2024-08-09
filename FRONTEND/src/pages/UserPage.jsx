import { useEffect, useState } from "react"
import { useContext } from "react";
import { TokenContext } from "../App";

import deletePost from "../helpers/deletePost";
import deleteComment from "../helpers/deleteComment";
import retrieveAllUserInteractions from "../helpers/retrieveAllUserInteractions";
import CategorySelector from "../components/CategorySelector";

import b from "../assets/letter_b.svg";

//STYLES
import "../components/Header.css";
import "./UserPage.css";

import categories from "../helpers/categories";

export default function UserPage(){
    const [token] = useContext(TokenContext);
    const [myPosts,setMyPosts] = useState([1,2]);
    const [myComments,setMyComments] = useState([]);

    useEffect(()=>{
        async function auxFunction(){
            let res = await retrieveAllUserInteractions(token, localStorage.getItem("username"));
            console.log(res);
            console.log(res.posts[0])
            setMyPosts(res.posts);
            setMyComments(res.comments);
        }


        auxFunction();
    },[]);


    return(

        <>
            <header className="header">
                <img className="logo" src={b} alt="blindcat logo" />
                <p className="username" onClick={()=>{navegate("/user")}} > {"> " + localStorage.getItem("username")}</p>
                <button className="header-button logout-button" onClick={()=>{handleLogout()}}>Cerrar</button>
            </header>  
            <div className="contenido">
                <h3 className="left-title">Actividad de hoy</h3>
                <div className="posteos">
                    <h4>Posteos</h4>
                    <button onClick={(e)=>{
                        let curtain = document.getElementById("posts");
                        curtain.classList.toggle('closed');
                    }}>▼</button>
                    <div className="curtain" id="posts">
                        {myPosts.map(myPost=>{
                            return (
                                <div className="post" onClick={()=>{}}>
                                    <p>Titulo: {myPost.post_title}</p>
                                    <p>Contenido: {myPost.post_content}</p>
                                    <p>Fecha: {myPost.post_creation_date}</p>
                                    <button className="delete-button" onClick={()=>{deletePost(token, myPost.post_id)}}>🗑️</button>
                                </div>
                            )
                        })}
                </div>
                <div className="comentarios">
                    <h4>Comentarios</h4>
                    <button onClick={(e)=>{
                        let curtain = document.getElementById("comments");
                        curtain.classList.toggle('closed');
                    }}>▼</button>
                    <div className="curtain" id="comments">
                        {myComments.map(myComment=>{
                                return (
                                    <div className="post" onClick={()=>{}}>
                                        <p>Post original: {myComment.original_post_title}</p>
                                        <p>Contenido: {myComment.comment_content}</p>
                                        <button className="delete-button" onClick={()=>{deleteComment(token, myComment.comment_id)}}>🗑️</button>
                                    </div>
                                )
                            })}
                    </div>
                </div>


                

            </div>   
            </div>

        </>

    )
}