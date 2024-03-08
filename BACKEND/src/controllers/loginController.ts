import { Request,Response } from "express";
import User from "../models/user.js";
import authControler from "./authControler.js";

async function login(req: Request,res: Response){
        const {username, password} = req.body;
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
            if(response.status == true){
                let token = authControler.authorize(response.user_id);
                console.log("Logged in");
                res.json({token:token, user_id:response.user_id});
                return {token:token, user_id:response.user_id};
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