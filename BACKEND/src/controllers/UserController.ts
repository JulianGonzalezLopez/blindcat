import UserService from "../services/UserService.js"
import { Request,Response } from "express";

export default class UserController{
    #userService: UserService;

    constructor(userService: UserService){
        this.#userService = userService;
    }

    async createUser(req: Request, res: Response){
        const {username, password, rePassword, creation_date} = req.body;        

        try{
            if(username == "" || password == "" || rePassword == ""){
                throw {status: 500, message: 'Uno de los campos está vacio'};
            }
        
            if(password != rePassword){
                throw "No coinciden las contraseñas";
            }

            if(typeof username != "string" || typeof password != "string"){
                throw "Uno de los campos no es del tipo adecuado";
            }

            let response = await this.#userService.createNewUser({username, password, rePassword, creation_date})
            .then(data=>{
                res.json(data); //The user has been created successfully
            })
            .catch(err=>{
                throw err; //Response: This username is alredy taken
            })
        }
        catch(e){
            //@ts-ignore
            res.status(e.status || 500).json(e || "Error");
        }
    }

    async loginUser(req: Request, res: Response){
        const {username, password} = req.body;

        try{
            if(username == "" || password == ""){
                throw {status: 500, message: 'Uno de los campos está vacio'};
             }
         
             if(typeof username != "string" || typeof password != "string"){
                throw {status: 500, message: 'Uno de los campos es de tipo string'};
             }   

             let response = await this.#userService.matchData({username, password});
             if(response.status == true){
                let token = authControler.authorize(response.user_id);
                console.log("Logged in");
                res.json({token:token}); 
             }
             else{
                throw {status: 500, message: 'No existe ningun usuario con dicha combinacion'};
             }
        }
        catch(err){
            res.status(e.status || 500).json(e || "Error");
        }
    }



}