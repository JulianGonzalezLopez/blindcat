import { Request,Response } from "express";
import PostUser from "../models/PostUser.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/user.js";
import PostComment from "../models/PostComment.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET as string || "default_secret"; // Usando una aserción de tipo


async function getPosts(req: Request,res: Response){
    let response = await Post.getPosts();
    console.log("Ahora buscamos esto");
    console.log(response);

    if(response != undefined){
        console.log("Response no es undefined");
        let promise = response.map(async (post)=>{
            //@ts-ignore
            let relatedUserId = await PostUser.getPostUser(post.id).user_id;
            console.log("ID del usuario buscado: " + relatedUserId);
            //@ts-ignore
            let relatedUsername = await User.getUserById(relatedUserId).username;
            console.log("Username del usuario buscado: " + relatedUsername);
            return {
                ...post,
                username: relatedUsername,
            }
        });

        let final = await Promise.all(promise);
        console.log("A VER AHORA AHORA SIII");
        console.log(final);

    }

    res.json(response);
}


async function createPost(req: Request,res: Response){
        const {title, content, user_id} = req.body;
        // if(title != "" || content != ""){
        //     console.log("Fallo en asercion")
        //     res.end("???");
        //     return true;
        // }
        if(typeof title != "string" || typeof content != "string"){
            res.end("???");
            return true;
        }

        try{
            let response = await Post.createNewPost({title, content});
            let post_id = response;
            await PostUser.createNewUsersPosts({user_id, post_id});
            res.send("ok"); // => Esto lo tengo que cambiar
        }
        catch (err){
            console.log("Error creating a Post in");
            res.json(err);
        }
}


async function getComments(req: Request,res: Response){
    //@ts-ignore;
    let commentsData = [];
    //@ts-ignore;
    let promisesUsername = [];

    let response = await PostComment.getPostsCommets(req.params.post_id);

    if(typeof response != "undefined"){

        const promises = response.map(async (comment) => {
            //@ts-ignore
            let aux = await Comment.getComments(comment.comment_id);
            return aux;
        });
        const resPromise = await Promise.all(promises);

        let promiseUsername = resPromise.map(async (comment)=>{
            if(typeof comment != "undefined"){
                //@ts-ignore
                let username = await User.getUserById(comment.creator_id).username;
                return {
                    //@ts-ignore
                    id:comment.id,
                    //@ts-ignore
                    content:comment.content,
                    username: username
                }
            }
        });
        const finalRes = await Promise.all(promiseUsername);
        res.json(finalRes);
        
    } 
}


async function commentPost(req: Request,res: Response){
    const {content, post_id} = req.body;
    let user_id;
    //Desconozco el porqué, pero sin importar lo que yo haga, no me trae el user id desde el middleware de autorizacion. Dejo esta megafuncion acá y dps veo que la hago
    if(typeof req.headers["authorization"] !== "undefined"){
    jwt.verify(req.headers["authorization"], SECRET , (err,authData)=>{
        if(typeof authData == "undefined"){
          throw "error";
        }
        //@ts-ignore
        user_id = authData.user_id;
      });
    }

    // if(title != "" || content != ""){
    //     console.log("Fallo en asercion")
    //     res.end("???");
    //     return true;
    // }
    // if(typeof post_id != "number" || typeof content != "string" || typeof user_id != "number"){
    //     res.end("???");
    //     return true;
    // }

    try{
        //@ts-ignore
        let response = await Comment.createNewComment({content, post_id, user_id});
        let comment_id = response;
        await PostComment.createNewPostComment({post_id, comment_id});
        res.send("ok"); // => Esto lo tengo que cambiar
    }
    catch (err){
        console.log("Error creating a Post in");
        res.json(err);
    }
}



export default{
    createPost,
    getPosts,
    commentPost,
    getComments
}