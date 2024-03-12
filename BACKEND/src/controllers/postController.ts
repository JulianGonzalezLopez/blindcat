import { Request,Response } from "express";
import PostUser from "../models/PostUser.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/user.js";
import PostComment from "../models/PostComment.js";
import authControler from "./authControler.js";
import jwt from "jsonwebtoken";


const SECRET = process.env.SECRET as string || "default_secret"; // Usando una aserción de tipo


//FALTA ERROR HANDLING
async function getPosts(req: Request,res: Response){
    const page = req.query.page || "0";
    let response = await Post.getPostPaged(page);
    if(response != undefined){
        let promise = response.map( async (post)=>{
            //@ts-ignore
            let obj = await PostUser.getPostUser(post.id);
            return {
                ...post,
                //@ts-ignore
                user_id: obj.user_id
            }
        });
        let resolved = await Promise.all(promise);
    
        let promiseUsername = resolved.map(async (post)=>{
            let username = await User.getUserById(post.user_id);

            let {user_id, ...resto} = post; 

            return{
                ...resto,
                username
            }
        })
    
        let resolvedUsername = await Promise.all(promiseUsername);
        console.log("Resolved with username");
        console.log(resolvedUsername);
        

    
        res.json(resolvedUsername);
    }
    res.end(false);

}

//FALTA ERROR HANDLING
async function getPostsPaged(req: Request,res: Response){
  console.log("diossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  let page = req.params.page;
  let response = await Post.getPostPaged(page);
  if(response != undefined){
      let promise = response.map( async (post)=>{
          //@ts-ignore
          let obj = await PostUser.getPostUser(post.id);
          return {
              ...post,
              //@ts-ignore
              user_id: obj.user_id
          }
      });
      let resolved = await Promise.all(promise);
  
      let promiseUsername = resolved.map(async (post)=>{
          let username = await User.getUserById(post.user_id);

          let {user_id, ...resto} = post; 

          return{
              ...resto,
              username
          }
      })
  
      let resolvedUsername = await Promise.all(promiseUsername);
      console.log("Resolved with username");
      console.log(resolvedUsername);
      

  
      res.json(resolvedUsername);
  }
  res.end(false);

}



async function createPost(req: Request,res: Response){
        const {title, content, nsfw, user_id, creation_date} = req.body;
        // if(title != "" || content != ""){
        //     console.log("Fallo en asercion")
        //     res.end("???");
        //     return true;
        // }

        console.log("22222222222222222222222222222222222");
        console.log(title, content, nsfw, user_id, creation_date);
        console.log(typeof creation_date)
        if(typeof title != "string" || typeof content != "string"){
            res.end("???");
            return true;
        }

        try{
            let response = await Post.createNewPost({title, content, nsfw, creation_date});
            let post_id = response;
            console.log("VALORES DUDOSOS");
            console.log(post_id);
            console.log(user_id);
            console.log(nsfw);
            await PostUser.createNewUsersPosts({user_id, post_id});
            res.send("ok"); // => Esto lo tengo que cambiar
        }
        catch (err){
            console.log("Error creating a Post in");
            res.json(err);
        }
}


async function getComments(req: Request, res: Response) {
    let response = await PostComment.getPostsCommets(req.params.post_id);
  
    //@ts-ignore;
    let commentsData = [];
    if (typeof response != 'undefined') {
      const promises = response.map(async (comment) => {
        //@ts-ignore
        let aux = await Comment.getComments(comment.comment_id);
        return aux;
      });
  
      //Esperas que procese usando `await`
      let commentsData; 
      try {
        commentsData = await Promise.all(promises);
      }
      catch(e){
        console.error('There was an error:', e);
      }
  
      //@ts-ignore
      const promisesUsername = commentsData.map(async (comment) => {
        let username = await User.getUserById(comment.creator_id);
        return {
          id: comment.id,
          content: comment.content,
          username: username,
        };
      });
  
      Promise.all(promisesUsername).then((final) => {
        res.json(final);
      });
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
    getComments,
    getPostsPaged
}