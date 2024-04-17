import { Request, Response } from "express";
import PostUser from "../models/PostUser";
import Post from "../models/Post";
import Comment from "../models/Comment";
import User from "../models/user";
import PostComment from "../models/PostComment";
import authControler from "./authControler.js";
import jwt from "jsonwebtoken";

const SECRET = (process.env.SECRET as string) || "default_secret"; // Usando una aserción de tipo

function ageRequired(age: Date){

  let creationDate = new Date(age);
  let actualDate = new Date(Date.now());
  //@ts-ignore
  console.log(creationDate);
  console.log(actualDate);
  //@ts-ignore
  let differenceMS = actualDate - creationDate;
  let differenceMin = Math.round(differenceMS / (1000 * 60));
  console.log("Diferencia < 4 ");
  console.log(differenceMin < 4)
  if(differenceMin < 4){
    throw ` Necesitas esperar 5 minutos desde la creacion de tu cuenta para interactuar. Llevas ${differenceMin} minutos`; 
  }
  console.log("La diferencia en minutos es: ", differenceMin);
};


//FALTA ERROR HANDLING
async function getPosts(req: Request, res: Response) {
  const page = req.query.page || "0";
  const order = req.query.order || "new";
  const DEFAULT_ERROR = "Fallo general al traer posteos";
  console.log("EL ORDEN ES:" + order);
  try {
    //@ts-ignore
    let response = await Post.getPostPaged(page, order);
    if (response != undefined) {
      
      let postsIDs = response.map((post)=>{
        //@ts-ignore
        return post.id;
      });

      let posts_users = await PostUser.getPostsUsers(postsIDs);
      //@ts-ignore
      let auxIDArray = [];
      let postsUsersIDs = posts_users.map((pu)=>{
        //@ts-ignore
        if(auxIDArray.findIndex(item=>pu.user_id == item) == -1){
          //@ts-ignore
          auxIDArray.push(pu.user_id);
          //@ts-ignore
          return pu.user_id;
        }
      });
      postsUsersIDs = postsUsersIDs.filter((elm)=>typeof elm != "undefined");
      //
      //Toda esa tramoya es para filtrar los IDs, ya que en caso de tener 10000 registros, implicaria capaz repetir muchas veces un ID
      //Capaz lo saco a la mierda igual, qcy
      //

      let mappedResponse = response.map((post)=>{
        //@ts-ignore
        let position = posts_users.findIndex(item => item.post_id == post.id);
        return {
            ...post,
            //@ts-ignore
            user_id: posts_users[position].user_id
          }
      });

      let usernamesById = await User.getUsernamesById(postsUsersIDs);
      
      let finalMappedResponse = mappedResponse.map((response)=>{
        //@ts-ignore
        let position = usernamesById.findIndex(item=>item.id == response.user_id);
        return{
          ...response,
          //@ts-ignore
          username: usernamesById[position].username,
          user_id: null
        }
      });
      res.send(finalMappedResponse);
    }
    
  } catch (error) {
    res.status(400).send(error || DEFAULT_ERROR);
  }
}

async function createPost(req: Request, res: Response) {
  console.log("Entramos a la funcion");
  const { title, content, nsfw, user_id, creation_date } = req.body;
  console.log(req.body);
  const DEFAULT_ERROR = "Fallo general al crear un posteo";

  try {
    console.log("Seguimos");
    if (!title || !content) {
      throw "El titulo o el contenido estaba vacio"
    }

    console.log("Seguimos2");
    let userData = await User.getUserDataById(user_id);
    //@ts-ignore
    ageRequired(userData.creation_date);

    let response = await Post.createNewPost({
      title,
      content,
      nsfw,
      creation_date,
    });
    let post_id = response;

    await PostUser.createNewUsersPosts({ user_id, post_id });
    res.send("ok"); // => Esto lo tengo que cambiar

  } catch (err) {
    console.error(err)
    res.status(400).send({"error":err} || {"error":DEFAULT_ERROR});
  }
}

async function getComments(req: Request, res: Response) {
  let response = await PostComment.getPostsCommets(req.params.post_id);

  //@ts-ignore;
  let commentsData = [];
  if (typeof response != "undefined") {
    const promises = response.map(async (comment) => {
      //@ts-ignore
      let aux = await Comment.getComments(comment.comment_id);
      return aux;
    });

    //Esperas que procese usando `await`
    let commentsData;
    try {
      commentsData = await Promise.all(promises);
    } catch (e) {
      console.error("There was an error:", e);
    }

    //@ts-ignore
    const promisesUsername = commentsData.map(async (comment) => {
      //@ts-ignore
      let username = await User.getUserById(comment.creator_id);
      return {
        //@ts-ignore
        id: comment.id,
        //@ts-ignore
        content: comment.content,
        username: username,
      };
    });

    Promise.all(promisesUsername).then((final) => {
      res.json(final);
    });
  }
}

async function commentPost(req: Request, res: Response) {
  const { content, post_id, user_id } = req.body;
  try {
    let userData = await User.getUserDataById(user_id);
    //@ts-ignore
    ageRequired(userData.creation_date);
    //@ts-ignore
    let response = await Comment.createNewComment({
      content,
      post_id,
      user_id,
    });
    let comment_id = response;
    await PostComment.createNewPostComment({ post_id, comment_id });
    res.send("ok"); // => Esto lo tengo que cambiar
  } catch (err) {
    console.log("Error creating a Post in");
    res.status(400).send({"error":err});
  }
}

async function createOpenedPost(req: Request, res: Response) {
  console.log("Entramos a la funcion");
  const { user_id, post_id} = req.body;
  
  const DEFAULT_ERROR = "Fallo general al crear un posteo";

  try {
    console.log("Seguimos");
    if (!user_id || !post_id) {
      throw "El titulo o el contenido estaba vacio"
    }
    PostUser.createOpenedPost({post_id, user_id});
    res.send("ok"); // => Esto lo tengo que cambiar

  } catch (err) {
    console.error(err)
    res.status(400).send(err || DEFAULT_ERROR);
  }
}


export default {
  createPost,
  getPosts,
  commentPost,
  getComments,
  createOpenedPost
};
