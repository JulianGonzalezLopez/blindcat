import { Router } from "express";
import loginController from "../controllers/loginController";
const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA LOGIN");
});

router.post("/",loginController.login);

export default router;