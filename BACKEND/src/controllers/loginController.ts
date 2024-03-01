import { Request,Response } from "express";
import User from "../models/user.js";
import authControler from "./authControler.js";

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

        try{
            let response = await User.matchData({username, password});
            if(response == true){
                let token = authControler.authorize(username);
                console.log("Logged in");
                console.log(token);
                res.json(token);
                return token;
            }
        }
        catch (err){
            console.log("Error logging in");
            res.json(err);
        }
}

export default{
    login
}