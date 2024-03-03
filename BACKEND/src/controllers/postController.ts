import { Request,Response } from "express";
import PostUser from "../models/PostUser.js";
import Post from "../models/Post.js";

async function getPosts(req: Request,res: Response){
    let response = await Post.getPosts();
    res.json(response);
}


async function createPost(req: Request,res: Response){
        const {title, content, user_id} = req.body;
        // if(title != "" || content != ""){
        //     console.log("Fallo en asercion")
        //     res.end("???");
        //     return true;
        // }
        if(typeof title != "string" || typeof content != "string"){
            res.end("???");
            return true;
        }

        try{
            let response = await Post.createNewPost({title, content});
            let post_id = response;
            await PostUser.createNewUsersPosts({user_id, post_id});
            res.send("ok"); // => Esto lo tengo que cambiar
        }
        catch (err){
            console.log("Error creating a Post in");
            res.json(err);
        }
}

export default{
    createPost,
    getPosts
}