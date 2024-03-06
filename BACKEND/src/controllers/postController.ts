import { Request,Response } from "express";
import PostUser from "../models/PostUser.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import PostComment from "../models/PostComment.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET as string || "default_secret"; // Usando una aserción de tipo


async function getPosts(req: Request,res: Response){
    let response = await Post.getPosts();
    res.json(response);
}


async function createPost(req: Request,res: Response){
        console.log(req.body);
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
    console.log(req.params);
    console.log("ID DEL POST" + req.params.post_id);
    let response = await PostComment.getPostsCommets(req.params.post_id);
    console.log("POST COMMENTS");
    console.log(response);
    //@ts-ignore;
    let commentsData = [];
    if(typeof response != "undefined"){
        const promises = response.map(async (comment) => {
            //@ts-ignore
            let aux = await Comment.getComments(comment.comment_id);
            console.log(aux);
            return aux;
        });
        
        // Esperamos a que todas las promesas se resuelvan utilizando Promise.all
        Promise.all(promises)
            .then((result) => {
                // Cuando todas las promesas se resuelvan, commentsData contendrá todos los comentarios relacionados
                commentsData = result;
                console.log(commentsData);
                res.json(commentsData);
            })
            .catch((error) => {
                console.error('There was an error:', error);
            });
    }
    //@ts-ignore
    console.log(commentsData);
    console.log("LO ANTERIORR");
        //@ts-ignore
    
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
        //@ts-ignore
        console.log("Me aseguro que el id esté:" + req.user_id);
        console.log("ESTO ESTO ESTO");
      });
    }


    console.log(req.body);
    console.log(content, post_id, req.body.user_id);
    console.log("FALLÓ ACA ARRIBA DESDE LA PAGINA");
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
        console.log("Llegó acá");
        let response = await Comment.createNewComment({content, post_id, user_id});
        console.log("salió de la funcion");
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