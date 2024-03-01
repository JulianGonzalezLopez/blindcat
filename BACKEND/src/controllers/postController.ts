import { Request,Response } from "express";
import PostUser from "../models/PostUser.js";
import Post from "../models/Post.js";

async function createPost(req: Request,res: Response){
        const {title, content} = req.body;

        let user_id : number;
        if(typeof req.body.user_id == "string"){
            user_id = parseInt(req.body.user_id,10);
        }
        else{
            user_id = req.body.user_id;
        }

        // if(title != "" || content != ""){
        //     console.log("Fallo en asercion")
        //     res.end("???");
        //     return true;
        // }
    
        if(typeof title != "string" || typeof content != "string" || typeof user_id != "number"){
            console.log("Fallo en tipos")
            console.log(title);
            console.log(typeof title);
            console.log(content);
            console.log(typeof content);
            console.log(user_id);
            console.log(typeof user_id);
            res.end("???");
            return true;
        }

        try{
            let response = await Post.createNewPost({title, content});
            let post_id = response;
            await PostUser.createNewUsersPosts({user_id, post_id});
        }
        catch (err){
            console.log("Error creating a Post in");
            res.json(err);
        }
}

export default{
    createPost
}