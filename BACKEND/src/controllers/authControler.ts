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
        console.log("ESTO ESTO ESTO");
        console.log(authData)
        //@ts-ignore
        req.user_id = authData.user_id;
        console.log("ESTO ESTO ESTO");
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

  function authorize(user_id: number){ //La idea de usar el user_id es tener un valor que en teoria la persona nunca podria ni deberia ser capaz de adquirir (y en el caso de pasar uno que no es, la autenticacion va a fallar)
      try{
        let token = jwt.sign({ user_id }, SECRET, { expiresIn: "3h" });
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