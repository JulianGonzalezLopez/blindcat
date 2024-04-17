import { Router, Request, Response } from "express";
import postController from "../controllers/postController";

const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA LOGIN");
});

router.post("/comment", postController.commentPost); //FALTA TEST

router.post("/",postController.createPost); //FALTA TEST

router.get("/all", postController.getPosts);

router.get("/:post_id/comments/", postController.getComments);

router.post("/opened", postController.createOpenedPost); //FALTA TEST

export default router;