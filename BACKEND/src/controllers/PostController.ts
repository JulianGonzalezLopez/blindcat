import PostService from "../services/PostService.js";
import PostUserService from "../services/PostUserService.js";
import UserService from "../services/UserService.js";
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

    async  getPosts(req: Request, res: Response) {
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