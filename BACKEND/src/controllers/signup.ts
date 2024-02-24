import { Router } from "express";
import user from "../models/user";
const router = Router();


router.get("/",(req,res)=>{
    res.send("PAGINA SIGNUP");
});

router.post("/", async (req,res)=>{
    const {user, password, rePassword} = req.body;
    if(user == "" || password == "" || rePassword == ""){
        res.send("???");
    }

    if(password != rePassword){
        res.send("???");
    }

    try{
        await user.createUser({user,password});
        res.send("ok");
    }
    catch(e){
        res.end("???");
    }
    

})

export default router;