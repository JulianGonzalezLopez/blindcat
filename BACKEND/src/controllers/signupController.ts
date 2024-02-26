import { Request,Response } from "express";
import NewUser from "../models/NewUser.js";

async function createUser(req: Request,res: Response){
        const {username, password, rePassword} = req.body;
        if(username == "" || password == "" || rePassword == ""){
            res.send("???");
        }
    
        if(password != rePassword){
            res.send("???");
        }
    
        if(typeof username != "string" || typeof password != "string"){
            res.send("???");
        }

        let response = await NewUser.createNewUser({username,password,rePassword});
        console.log(response);
        //TENDRIA QUE USAR UN .THEN Y .CATCH PARA ELIMINAR LOS TRY CATCH
}

export default{
    createUser
}