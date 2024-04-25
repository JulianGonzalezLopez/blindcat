import PostService from "../services/PostService.js";
import PostUserService from "../services/PostUserService.js";
import UserService from "../services/UserService.js";
import ageRequired from "../helpers/AgeRequiredHelper.js";
import { Request, Response } from "express";

export default class PostController{
    #postService: PostService;
    #postUserService: PostUserService;
    #userService: UserService;

    constructor(postService : PostService, postUserService: PostUserService, userService: UserService){
      this.#postService = postService;
      this.#postUserService = postUserService;
      this.#userService = userService;
    }

    async  createPost(req: Request, res: Response) {
      console.log("Entramos a la funcion");
      const { title, content, user_id, creation_date } = req.body;
      let {nsfw} = req.body;
      console.log(req.body);
      nsfw == "on" ? nsfw = true : nsfw = false; 
      console.log("que es nsfw?");
      console.log(nsfw);
      const DEFAULT_ERROR = "Fallo general al crear un posteo";
    
      try {
        console.log("Seguimos");
        if (!title || !content) {
          throw "El titulo o el contenido estaba vacio"
        }
        
        let userData = await this.#userService.getUserDataById(user_id);
        //@ts-ignore
        ageRequired(userData.creation_date);
    
        let response = await this.#postService.createPost({
          title,
          content,
          nsfw,
          creation_date,
        });
        let post_id = response;
    
        await this.#postUserService.createNewUserPosts({ user_id, post_id });
        res.send("ok"); // => Esto lo tengo que cambiar
    
      } catch (err) {
        console.error(err)
        res.status(400).send({"error":err} || {"error":DEFAULT_ERROR});
      }
    }



    async createOpenedPost(req: Request, res: Response) {
      console.log("Entramos a la funcion");
      const { user_id, post_id} = req.body;
      
      const DEFAULT_ERROR = "Fallo general al crear un posteo";
    
      try {
        console.log("Seguimos");
        if (!user_id || !post_id) {
          throw "El titulo o el contenido estaba vacio"
        }
        this.#postUserService.createOpenedPost({post_id, user_id});
        res.send("ok"); // => Esto lo tengo que cambiar
    
      } catch (err) {
        console.error(err)
        res.status(400).send(err || DEFAULT_ERROR);
      }
    }



    async getPosts(req: Request, res: Response) {
        const page = req.query.page || "0";
        const order = req.query.order || "new";
        const DEFAULT_ERROR = "Fallo general al traer posteos";
        
        try {
          //@ts-ignore
          let response = await this.#postService.getPostsPaged(page, order);
          
          if (response != undefined) {  
            let postsIDs = response.map((post)=>{
              //@ts-ignore
              return post.id;
            });
      
            let posts_users = await this.#postUserService.getPostsUsers(postsIDs);
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
      
            let usernamesById = await this.#userService.getUsernamesById(postsUsersIDs);
            
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

}