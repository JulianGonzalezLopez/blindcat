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

            if(username == null || password == null || rePassword == null || creation_date == null){
                throw {statusCode: 400, errorMessage: 'Uno de los campos está vacio'};
            }
        
            if(password != rePassword){
                throw {statusCode: 400, errorMessage:"No coinciden las contraseñas"};
            }

            if(typeof username != "string" || typeof password != "string"){
                throw {statusCode: 400, errorMessage:"Uno de los campos no es del tipo adecuado"};
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
            if(username == "" || password == ""){
                throw {statusCode: 500, errorMessage: 'Uno de los campos está vacio'};
             }
         
             if(typeof username != "string" || typeof password != "string"){
                throw {statusCode: 500, errorMessage: 'Uno de los campos es de tipo string'};
             }   
             let response = await this.userService.matchData({username, password});
             if(response.status == true){
                let token = this.authHelper.authorize(response.user_id);
                console.log("Logged in");
                res.json({token:token}); 
             }
             else{
                throw {statusCode: 500, errorMessage: 'No existe ningun usuario con dicha combinacion'};
             }
        }
        catch(err){
            handleError(res,err);
        }
    }



}