import UserService from "../services/UserService"
import PostUserService from "../services/PostUserService";
import AuthHelper from "../helpers/AuthHelper";
import { Request,Response } from "express";
import handleError from "../helpers/ErrorSenderHelper";
import CommentService from "../services/CommentService";
import PostService from "../services/PostService";

export default class UserController{
    userService: UserService;
    postUserService : PostUserService;
    commentService: CommentService;
    authHelper: AuthHelper;
    postService: PostService


    constructor(userService: UserService, postUserService: PostUserService, commentService: CommentService , postService: PostService,authHelper: AuthHelper){
        this.userService = userService;
        this.postUserService = postUserService;
        this.commentService = commentService;
        this.postService = postService;
        this.authHelper = authHelper;
        
    }

    async createUser(req: Request, res: Response){
        const {username, password, rePassword, creation_date} = req.body;        
        try{
      
            if(username == "" && password == "" && rePassword){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username, password ni rePassword'};
            }

            if(username == "" && password == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username ni password'};
            }

            if(username == "" && rePassword == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username ni rePassword'};
            }

            if(password == "" && rePassword == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo password ni rePassword'};
            }

            if(username == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username'};
            }

            if(password == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo password'};
            }

            if(rePassword == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo rePassword'};
            }

            if(typeof username != "string"){
                throw {statusCode: 400, errorMessage: 'El campo username tiene que ser de tipo texto'};
             }

            if(typeof password != "string"){
                throw {statusCode: 400, errorMessage: 'El campo contraseña tiene que ser de tipo texto'};
             }

            if(typeof rePassword != "string"){
                throw {statusCode: 400, errorMessage: 'El campo rePassword tiene que ser de tipo texto'};
             }
        
            if(password != rePassword){
                throw {statusCode: 400, errorMessage:"No coinciden las contraseñas"};
            }

            if(username.length > 16){
                throw {statusCode:400, errorMessage:"El campo username tiene que tener 16 caracteres como maximo"}
            }

            if(password.length > 16){
                throw {statusCode:400, errorMessage:"El campo password tiene que tener 16 caracteres como maximo"}
            }

            let response = await this.userService.createNewUser({username, password, rePassword, creation_date})
            .then(data=>{
                res.json(data); //The user has been created successfully
            })
            .catch(err=>{
                throw err; //Response: This username is alredy taken
            })
        }
        catch(e){
            console.log(e);
            handleError(res,e);
        }
    }

    async loginUser(req: Request, res: Response){
        const {username, password} = req.body;
        console.log(req.body);
        console.log("aaa");
        try{

            if(username == "" && password == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username ni contraseña'};
             }
            
            if(username == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username'};
             }

            if(password == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo password'};
             }
         
            if(typeof username != "string"){
                throw {statusCode: 400, errorMessage: 'El campo username tiene que ser de tipo texto'};
             }

            if(typeof password != "string"){
                throw {statusCode: 400, errorMessage: 'El campo contraseña tiene que ser de tipo texto'};
             }

            if(username.length > 16){
                throw {statusCode:400, errorMessage:"El campo username tiene que tener 16 caracteres como maximo"}
             }

            if(password.length > 16){
                throw {statusCode:400, errorMessage:"El campo password tiene que tener 16 caracteres como maximo"}
             }
                
             let response = await this.userService.matchData({username, password});
             if(response.status == true){
                let token = this.authHelper.authorize(response.user_id);
                console.log("Logged in");
                res.json({token:token}); 
             }
             else{
                throw {statusCode: 404, errorMessage: 'No existe ningun usuario con dicha combinacion'};
             }
        }
        catch(err){
            console.log(err);
            handleError(res,err);
        }
    }

    async getInteractions(req: Request, res: Response){
        try{
            console.log("COMIENZA LA COPA PISTON!");
            let username = req.params.username;
            console.log(username);

            if(username == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username'}; 
            }

            if(typeof username != "string"){
                throw {statusCode: 400, errorMessage: 'El campo username debe ser tipo string'}; 
            }
            //HAY QUE VER COMO DEVUELVE LA INFORMACION getUser    
            let udata = await this.userService.getUser(username);
            let uid = udata[0].id;
            console.log(udata);
            console.log(udata[0]);
            console.log(udata[0].id);
            //NO CREADO (METODO)
            //@ts-ignore
            let posts_ids = await this.postUserService.getUserPosts(uid);
            //@ts-ignore
            posts_ids = posts_ids.map((post)=>post.post_id)
            let posts = await this.postService.getPostsByID(posts_ids);
            //NO CREADO (METODO NI CLASE)
            //@ts-ignore
            let comments = await this.commentService.getCommentsByUID(uid);
            console.log(comments);



            res.json({
                posts,
                comments
            });
        }
        catch(e){
            handleError(res,e);
        }
    }
    

}