import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request,Response } from "express";
dotenv.config();


export default class AuthHelper{
    async checkAuthorization(req: Request, res: Response, next: Function) {
        console.log("Checking TOKEN ownership");
        try {
          const authData = await new Promise((resolve, reject) => {
              if (typeof req.headers["authorization"] !== "undefined") {
                //@ts-ignore
                  jwt.verify(req.headers["authorization"], process.env.SECRET , (err, authData) => {
                      console.log("Authorization data");
                      console.log(req.headers["authorization"]);
                      console.log(authData);
                      //@ts-ignore
                      req.body.user_id = authData.user_id;
                      console.log(req.body.user_id);
                      if (err) throw(err);
                      else resolve(authData);
                  });
              } else {
                  throw("Authorization header is undefined");
              }
          });
      
          next();
        } catch (error) {
          res.status(401).send(error);
        }
      }
      
    authorize(user_id: number){ //La idea de usar el user_id es tener un valor que en teoria la persona nunca podria ni deberia ser capaz de adquirir (y en el caso de pasar uno que no es, la autenticacion va a fallar)
            try{
                //@ts-ignore
              let token = jwt.sign({ user_id }, process.env.SECRET, { expiresIn: "3h" });
              return token;
          }
          catch(err){
              throw err;
          };
        }

        
};


