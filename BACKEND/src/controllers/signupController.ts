import { Request,Response } from "express";
import NewUser from "../models/NewUser.js";

//Actualmente funciona, pero si no le pasas los parametros correctos explota (o si ingresas un user ya usado)
async function createUser(req: Request,res: Response){
        const {username, password, rePassword} = req.body;
        console.log(req.body);
        console.log(username, password, rePassword)
        if(username == "" || password == "" || rePassword == ""){
            res.end("???");
            return true;
        }
    
        if(password != rePassword){
            res.end("???");
            return true;
        }
    
        if(typeof username != "string" || typeof password != "string"){
            res.end("???");
            return true;
        }
        try{
            let response = await NewUser.createNewUser({username,password,rePassword})
            .then(data=>{
                console.log(data);
                console.log(response);
                res.json(data);
            })
        }
        catch(data){
                console.log(data);
                console.log("LLEGAMOS ACÁ")
                res.json(data);
        }

        //TENDRIA QUE USAR UN .THEN Y .CATCH PARA ELIMINAR LOS TRY CATCH
}

export default{
    createUser
}