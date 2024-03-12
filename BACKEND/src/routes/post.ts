import { Router, Request, Response } from "express";
import postController from "../controllers/postController.js";
const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA LOGIN");
});

router.post("/comment", postController.commentPost);

router.post("/",postController.createPost);

router.get("/all", postController.getPosts);

router.get("/all/:page", postController.getPosts);

router.get("/:post_id/comments/", postController.getComments);

export default router;