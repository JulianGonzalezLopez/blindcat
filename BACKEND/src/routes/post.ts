import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA LOGIN");
});

router.post("/",postController.createPost);

router.get("/all", postController.getPosts);

export default router;