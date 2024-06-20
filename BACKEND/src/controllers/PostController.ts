import PostService from "../services/PostService";
import PostUserService from "../services/PostUserService";
import UserService from "../services/UserService";
import ageRequired from "../helpers/AgeRequiredHelper";
import { Request, Response } from "express";
import handleError from "../helpers/ErrorSenderHelper";

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

      try {

        if(!user_id && title == "" && content == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id, title ni content"};
        }

        if(!user_id && content == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id ni content"};
        }

        if(!user_id && title == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id ni title"};
        }

        if(content == "" && title == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos content ni title"};
        }

        if(!user_id){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo user_id"};
        }

        if(title == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo title"};
        }

        if(content == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo content"};
        }
        
        if(typeof content != "string"){
          throw {statusCode: 400, errorMessage:"El campo content tiene que ser de tipo texto"};
        }
        
        if(typeof title != "string"){
          throw {statusCode: 400, errorMessage:"El campo title tiene que ser de tipo texto"};
        }
        

        let userData = await this.#userService.getUserDataById(user_id);
        
        // if("creation_date" in userData){
        //   ageRequired(userData.creation_date);
        // }
        // else{
        //   throw {statusCode:404, errorMessage:"Datos del usuario invalidos, falta fecha"}
        // }

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
        handleError(res,err);
      }
    }



    async createOpenedPost(req: Request, res: Response) {
      const { user_id, post_id} = req.body;

      try {

        if(user_id == "" && post_id == ""){
          throw {statusCode:400, errorMessage:"No pueden estar vacios los campo user_id ni post_id"}
        }

        if(user_id == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo user_id"};
        }
  
        if(post_id == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo post_id"};
        }
  
        if(typeof user_id != "string" || typeof user_id != "number"){
          throw {statusCode: 400, errorMessage:"El campo user_id tiene que ser de tipo texto"};
        }
  
        if(typeof post_id != "string" || typeof post_id != "number"){
          throw {statusCode: 400, errorMessage:"El campo post_id tiene que ser de tipo texto"};
        }

        this.#postUserService.createOpenedPost({post_id, user_id});
        res.send("ok"); // => Esto lo tengo que cambiar
    
      } catch (err) {
        handleError(res,err);
      }
    }



    async getPosts(req: Request, res: Response) {
        const page = req.query.page || "0";
        const order = req.query.order || "new";
        console.log("GOKU AAAAAAAAAAAAAA");
        try {
          //@ts-ignore
          let response = await this.#postService.getPostsPaged(page, order);
          console.log("Posts paginados");
          console.log(response);
          if (response != undefined && response.length > 0) {  
            let postsIDs = response.map((post)=>{
              //@ts-ignore
              return post.id;
            });
            let posts_users = await this.#postUserService.getPostsUsers(postsIDs);
            console.log("Post's users");
            console.log(posts_users);
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
            console.log("Posts Users Id");
            console.log(postsUsersIDs);

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
            console.log("mappedResponse");
            console.log(mappedResponse);

            let usernamesById = await this.#userService.getUsernamesById(postsUsersIDs); //ACÁ ESTÁ EL ERROR
            console.log("USERNAMES BY ID");
            console.log(usernamesById);

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

            console.log("VAS A CAGAR FREEZER");
            res.send(finalMappedResponse);
          }
          
        } catch (err) {
          handleError(res,err);
        }
      }

}