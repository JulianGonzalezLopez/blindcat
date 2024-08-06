import PostService from "../services/PostService";
import PostUserService from "../services/PostUserService";
import UserService from "../services/UserService";
import PostCategoryService from "../services/PostCategoryService";
import ageRequired from "../helpers/AgeRequiredHelper";
import { Request, Response } from "express";
import handleError from "../helpers/ErrorSenderHelper";
import dotenv from 'dotenv';

export default class PostController{
    #postService: PostService;
    #postUserService: PostUserService;
    #userService: UserService;
    #postCategoryService: PostCategoryService;
    postsCategories;

    constructor(postService : PostService, postUserService: PostUserService, userService: UserService, postCategoryService: PostCategoryService){
      this.#postService = postService;
      this.#postUserService = postUserService;
      this.#userService = userService;
      this.#postCategoryService = postCategoryService;
      this.postsCategories = ["gen", "dep", "ani"];
    }

    async  createPost(req: Request, res: Response) {
      console.log("Entramos a la funcion");
      const { title, content, user_id, creation_date, category } = req.body;
      let nsfw;
      nsfw == "on" ? nsfw = true : nsfw = false; 

      try {
        if(!user_id && title == "" && content == "" && category == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id, title, content ni category"};
        }

        if(!user_id && title == "" && content == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id, title ni content"};
        }

        if(!user_id && content == "" && category == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id, content ni category"};
        }

        if(!user_id && title == "" && category == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos user_id, title ni category"};
        }

        if(content == "" && title == "" && category == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos content, title ni category"};
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

        if(category  == "" && title == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos category ni title"};
        }

        if(category  == "" && content == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos category ni content"};
        }
        
        if(category  == "" && user_id == ""){
          throw {statusCode: 400, errorMessage: "No pueden estar vacios los campos category ni user_id"};
        }

        if(category == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo category"};
        }

        if(!user_id){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo user_id"};
        }

        if(title == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo title"};
        }

        if(title.length > 31){
          throw {statusCode:400, errorMessage:"El titulo no puede superar los 31 caracteres"};
        }

        if(content == ""){
          throw {statusCode: 400, errorMessage:"No puede estar vacio el campo content"};
        }

        if(content.length > 999){
          throw {statusCode:400, errorMessage:"El contenido del post no puede ser mayor a 999 caracteres"};
        }
        
        if(typeof content != "string"){
          throw {statusCode: 400, errorMessage:"El campo content tiene que ser de tipo texto"};
        }
        
        if(typeof title != "string"){
          throw {statusCode: 400, errorMessage:"El campo title tiene que ser de tipo texto"};
        }

        console.log("LLEGAMOS ACÁ");
        if(!this.postsCategories.includes(category)){
          throw {statusCode: 400, errroMessage:"El campo category no es de un parametro apropiado"};
        };
        console.log("LLEGAMOS AHORA ACÁAAAAAAAA");

        const userData = await this.#userService.getUserDataById(user_id);
        
        // if("creation_date" in userData){
        //   ageRequired(userData.creation_date);
        // }
        // else{
        //   throw {statusCode:404, errorMessage:"Datos del usuario invalidos, falta fecha"}
        // }

        const response = await this.#postService.createPost({
          title,
          content,
          nsfw,
          creation_date
        });
        const post_id = response;
    
        await this.#postUserService.createNewUserPosts({ user_id, post_id });
        res.send("ok"); // => Esto lo tengo que cambiar

        console.log("FINAL BOSS POR DELANTE");
        console.log(category);
        console.log(post_id);

        await this.#postCategoryService.createNewCategoryPost({ category, post_id });
        
        console.log("WP");

      } catch (err) {
        console.log(err);
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
  
        if(typeof user_id != "string"){
          throw {statusCode: 400, errorMessage:"El campo user_id tiene que ser de tipo texto"};
        }
  
        if(typeof post_id != "number"){
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
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        console.log(req.query.category);
        try {
          let response;
          if(req.query.category){
            //@ts-ignore
            if(this.postsCategories.includes(req.query.category)){
              console.log("VENIMOS POR ACÁ");
              //@ts-ignore
              response = await this.#postService.getPostsByCategoryPaged(req.query.category, page, order);
            }
            else{
              res.status(400).send("Categoria inexistente");
            }
          }
          else{
            //@ts-ignore
            response = await this.#postService.getPostsPaged(page, order);
          }
          if (response != undefined && response.length > 0) {  
            const postsIDs = response.map((post)=>{
              //@ts-ignore
              return post.id;
            });
            const posts_users = await this.#postUserService.getPostsUsers(postsIDs);
            console.log("Post's users");
            console.log(posts_users);
            //@ts-ignore
            const auxIDArray = [];
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
      
            const mappedResponse = response.map((post)=>{
              //@ts-ignore
              const position = posts_users.findIndex(item => item.post_id == post.id);
              return {
                  ...post,
                  //@ts-ignore
                  user_id: posts_users[position].user_id
                }
            });
            console.log("mappedResponse");
            console.log(mappedResponse);

            const usernamesById = await this.#userService.getUsernamesById(postsUsersIDs); //ACÁ ESTÁ EL ERROR
            console.log("USERNAMES BY ID");
            console.log(usernamesById);

            const finalMappedResponse = mappedResponse.map((response)=>{
              //@ts-ignore
              const position = usernamesById.findIndex(item=>item.id == response.user_id);
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

      async getPost(req: Request, res: Response) {
        const post_id = req.query.post_id;
        console.log("DIABLO");
        console.log(post_id);
        try {
          if(!post_id){
            throw "No se encuentra el id del post deseado";
          }
          if(typeof post_id != "number" && typeof post_id != "string"){
            throw "post_id no es del tipo apropiado";
          }

          const response = await this.#postService.getPost(post_id);
          if (response != undefined && response.length > 0) {  
            //@ts-ignore
            const post_id = response[0].id;
            console.log("LLEGAMOS ACÁ");
            console.log(response[0].id);
            const post_user = await this.#postUserService.getPostUser(post_id);
            console.log("Post's users");
            console.log(post_user);
            const getUserByIdResponse = await this.#userService.getUserById(post_user.user_id); //ACÁ ESTÁ EL ERROR
            const username = getUserByIdResponse[0].username;
            console.log("USERNAMES BY ID");
            console.log(username);
            //@ts-ignore
            const final = {
              ...response[0],
              username
            }
            console.log(final);
            res.send(final);
          }
        } catch (err) {
          handleError(res,err);
        }
      }

      // async getPostsByCategory(req: Request, res: Response) {
      //   console.log("el que no salta es ingles");
      //   const page = req.query.page || "0";
      //   const order = req.query.order || "new";
      //   console.log("GOKU AAAAAAAAAAAAAA");
      //   try {
      //     //@ts-ignore
      //     let response = await this.#postService.getPostsByCategoryPaged(tag, page, order);
      //     console.log("Posts paginados");
      //     console.log(response);
      //     if (response != undefined && response.length > 0) {  
      //       let postsIDs = response.map((post)=>{
      //         //@ts-ignore
      //         return post.id;
      //       });
      //       let posts_users = await this.#postUserService.getPostsUsers(postsIDs);
      //       console.log("Post's users");
      //       console.log(posts_users);
      //       //@ts-ignore
      //       let auxIDArray = [];
      //       let postsUsersIDs = posts_users.map((pu)=>{
      //         //@ts-ignore
      //         if(auxIDArray.findIndex(item=>pu.user_id == item) == -1){
      //           //@ts-ignore
      //           auxIDArray.push(pu.user_id);
      //           //@ts-ignore
      //           return pu.user_id;
      //         }
      //       });

      //       postsUsersIDs = postsUsersIDs.filter((elm)=>typeof elm != "undefined");
      //       console.log("Posts Users Id");
      //       console.log(postsUsersIDs);

      //       //
      //       //Toda esa tramoya es para filtrar los IDs, ya que en caso de tener 10000 registros, implicaria capaz repetir muchas veces un ID
      //       //Capaz lo saco a la mierda igual, qcy
      //       //
      
      //       let mappedResponse = response.map((post)=>{
      //         //@ts-ignore
      //         let position = posts_users.findIndex(item => item.post_id == post.id);
      //         return {
      //             ...post,
      //             //@ts-ignore
      //             user_id: posts_users[position].user_id
      //           }
      //       });
      //       console.log("mappedResponse");
      //       console.log(mappedResponse);

      //       let usernamesById = await this.#userService.getUsernamesById(postsUsersIDs); //ACÁ ESTÁ EL ERROR
      //       console.log("USERNAMES BY ID");
      //       console.log(usernamesById);

      //       let finalMappedResponse = mappedResponse.map((response)=>{
      //         //@ts-ignore
      //         let position = usernamesById.findIndex(item=>item.id == response.user_id);
      //         return{
      //           ...response,
      //           //@ts-ignore
      //           username: usernamesById[position].username,
      //           user_id: null
      //         }
      //       });

      //       console.log("VAS A CAGAR FREEZER");
      //       res.send(finalMappedResponse);
      //     }
          
      //   } catch (err) {
      //     handleError(res,err);
      //   }
      // }


      async deleteEntry(req: Request, res: Response){
        try{
          const uid = req.body.user_id;
          let eid: string | number = req.params.post_id;

          console.log(uid);
          console.log(eid);
          console.log(req.params);
  
          if(typeof uid != "string"){
            throw {statusCode: 400, errorMessage:"Error tipo de dato UID"};
          }
  
          if(typeof eid == "string"){
            eid = Number(eid);
          }

          if(typeof eid != "number"){
            throw {statusCode: 400, errorMessage:"Error tipo de dato EID"};
          }
          
          await this.#postService.deleteEntry(uid,eid);


        }
        catch(err){
          console.log("DIOS");
          console.log(err);
          handleError(res,err);
        }

      }

}