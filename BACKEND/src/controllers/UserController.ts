import UserService from "../services/UserService.js"
import AuthHelper from "../helpers/AuthHelper.js";
import { Request,Response } from "express";
import handleError from "../helpers/ErrorSenderHelper.js";

export default class UserController{
    userService: UserService;
    authHelper: AuthHelper;

    constructor(userService: UserService, authHelper: AuthHelper){
        this.userService = userService;
        this.authHelper = authHelper;
    }

    async createUser(req: Request, res: Response){
        const {username, password, rePassword, creation_date} = req.body;        
        console.log(req.body);
        console.log("ACÁ ARRIBA");
        try{

            if(username == "" && password == "" && rePassword == "" && creation_date == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username, password, rePassword ni creation_date'};
            }
            
            if(username == "" && password == "" && rePassword){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username, password ni rePassword'};
            }

            if(username == "" && password == "" && creation_date == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username, password ni creation_date'};
            }

            if(rePassword == "" && password == "" && creation_date == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo password, rePassword ni creation_date'};
            }

            if(username == "" && creation_date == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username ni creation_date'};
            }

            if(username == "" && password == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username ni contraseña'};
            }

            if(rePassword == "" && creation_date == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo rePassword ni creation_date'};
            }

            if(username == "" && password == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo username ni contraseña'};
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
             if(creation_date == ""){
                throw {statusCode: 400, errorMessage: 'No puede estar vacio el campo creation_date'};
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

            let response = await this.userService.createNewUser({username, password, rePassword, creation_date})
            .then(data=>{
                res.json(data); //The user has been created successfully
            })
            .catch(err=>{
                throw err; //Response: This username is alredy taken
            })
        }
        catch(e){
            handleError(res,e);
        }
    }

    async loginUser(req: Request, res: Response){
        const {username, password} = req.body;

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
            handleError(res,err);
        }
    }



}