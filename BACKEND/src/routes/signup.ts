import { Router } from "express";
import signupController from "../controllers/signupController.js";
const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA SIGNUP");
});

router.post("/", signupController.createUser)

export default router;