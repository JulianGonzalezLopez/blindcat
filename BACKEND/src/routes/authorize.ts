import jwt from "jsonwebtoken";
import { Router } from "express";
import authControler from "../controllers/authControler.js";

const router = Router();
const SECRET = process.env.SECRET as string || "default_secret";

router.post("/", (req, res) => {
    try{
        jwt.sign({user:req.body.username}, SECRET, {expiresIn:"3h"} ,(err,token)=>{
            if(err){
                throw err;
            }
            res.json({token});
        });
    }
    catch(err){
        res.status(400).send(err);
    };
});


export default router;