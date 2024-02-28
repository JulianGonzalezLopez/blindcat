import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request,Response } from "express";
dotenv.config();

const SECRET = process.env.SECRET as string || "default_secret"; // Usando una aserción de tipo


function checkAuthorization(req: Request,res: Response,next: Function){
    console.log("Tiene token?");
    console.log(req.headers["authorization"] ? "Si" : "No");
    if(typeof req.headers["authorization"] !== "undefined"){
      jwt.verify(req.headers["authorization"], SECRET , (err,authData)=>{
        console.log(authData)
        if(err){
          res.send(false);
        }
        else{
            next();
        }
      });
    }
    else{
      res.send(false);
    }
  };

  function authorize(username: string){
      try{
        let token = jwt.sign({ username }, SECRET, { expiresIn: "3h" });
        console.log(token);
        return token;
    }
    catch(err){
        throw err;
    };
  }

  export default {
    checkAuthorization,
    authorize
  };