import { Request,Response } from "express";
import User from "../models/user.js";
import authControler from "./authControler.js";

//COMENZÓ A FALLAR EL LOGIN, DEBO USAR MANEJO DE ERRORES EN LOS MODELOS, SINO EXPLOTA TODO

async function login(req: Request,res: Response){

        const {username, password} = req.body;
    
        try{
            if(username == "" || password == ""){
               throw "Uno o mas de los campos está vacio";
            }
        
            if(typeof username != "string" || typeof password != "string"){
                throw "Uno o mas de los campos no es de tipo string";
            }    
            let response = await User.matchData({username, password});
            //@ts-ignore
            if(response.status == true){
                //@ts-ignore
                let token = authControler.authorize(response.user_id);
                console.log("Logged in");
                res.json({token:token});
            }
        }
        catch(err){
            res.status(400).send({"error":err});
        }
}

export default{
    login
}