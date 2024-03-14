import { Request,Response } from "express";
import NewUser from "../models/NewUser.js";


async function createUser(req: Request,res: Response){
        const {username, password, rePassword} = req.body;

        try{

            if(username == "" || password == "" || rePassword == ""){
                throw "Uno o mas de los campos están vacios";
            }
        
            if(password != rePassword){
                throw "No coinciden las contraseñas";
            }

            if(typeof username != "string" || typeof password != "string"){
                throw "Uno de los campos no es del tipo adecuado";
            }
            
            let response = await NewUser.createNewUser({username,password,rePassword})
            .then(data=>{
                res.json(data); //The user has been created successfully
            })
            .catch(err=>{
                throw err; //Response: This username is alredy taken
            })
        }   
        catch(err){
            res.status(400).send(err);
        }     
}

export default{
    createUser
}