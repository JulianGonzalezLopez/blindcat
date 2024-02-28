import { Request,Response } from "express";
import NewUser from "../models/NewUser.js";


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
        let response = await NewUser.createNewUser({username,password,rePassword})
        .then(data=>{
            res.json(data); //The user has been created successfully
        })
        .catch(data=>{
            res.json(data); //Response: This username is alredy taken
        })
}

export default{
    createUser
}