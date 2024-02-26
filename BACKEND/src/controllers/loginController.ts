import { Request,Response } from "express";
import User from "../models/user.js";

async function login(req: Request,res: Response){
        const {username, password} = req.body;
        console.log(req.body);
        if(username == "" || password == ""){
            res.end("???");
            return true;
        }
    
        if(typeof username != "string" || typeof password != "string"){
            res.end("???");
            return true;
        }
        let response = await User.matchData({username, password})
        .then(data=>{
            res.json(data); //The user has been created successfully
        })
        .catch(data=>{
            res.json(data); //Response: This username is alredy taken
        })
}

export default{
    login
}