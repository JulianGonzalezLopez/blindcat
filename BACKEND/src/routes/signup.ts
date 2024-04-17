import { Router } from "express";
import signupController from "../controllers/signupController";
const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA SIGNUP");
});

router.post("/", signupController.createUser) //FALTA TEST

export default router;