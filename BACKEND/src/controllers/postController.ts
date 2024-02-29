import { Request,Response } from "express";
import PostUser from "../models/PostUser.js";
import Post from "../models/Post.js";

async function createPost(req: Request,res: Response){
        const {title, content, user_id} = req.body;
        console.log(req.body);
        if(!title || !content || !user_id){
            res.end("???");
            return true;
        }
    
        if(typeof title != "string" || typeof content != "string" || typeof user_id != "number"){
            res.end("???");
            return true;
        }

        try{
            let response = await Post.createNewPost({title, content});
            //let post_id = response.post_id;
            //await PostUser.createNewUsersPosts({user_id, post_id});

        }
        catch (err){
            console.log("Error creating a Post in");
            res.json(err);
        }
}

export default{
    createPost
}