import { Request,Response } from "express";

async function createUser(req: Request,res: Response){
        const {user, password, rePassword} = req.body;
        if(user == "" || password == "" || rePassword == ""){
            res.send("???");
        }
    
        if(password != rePassword){
            res.send("???");
        }
    
        let response = await user.createUser({user,password});
        console.log(response);
        //TENDRIA QUE USAR UN .THEN Y .CATCH PARA ELIMINAR LOS TRY CATCH
}


export default{
    createUser
}