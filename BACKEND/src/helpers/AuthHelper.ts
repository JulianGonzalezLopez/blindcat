import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request,Response } from "express";
import handleError from "./ErrorSenderHelper.js";
dotenv.config();


export default class AuthHelper{
    // async checkAuthorization(req: Request, res: Response, next: Function) {
    //     console.log("Checking TOKEN ownership");
    //     try {
    //       const authData = await new Promise((resolve, reject) => {
    //           if (typeof req.headers["authorization"] !== "undefined") {
    //             //@ts-ignore
    //               jwt.verify(req.headers["authorization"], process.env.SECRET , (err, authData) => {
    //                   console.log("Authorization data");
    //                   console.log(req.headers["authorization"]);
    //                   console.log(authData);
    //                   if(typeof authData != undefined){
    //                     if("user_id" in authData){
    //                       req.body.user_id = authData.user_id;
    //                     }
    //                     if (err) throw({statusCode:500,errorMessage:"Hubo un error al intentar otorgar el token"});
    //                     else resolve(authData);  
    //                   }
                      
    //               });
    //           } else {
    //             throw {statusCode: 403, errorMessage:"El token de ingreso no está presente"};
    //           }
    //       });
      
    //       next();
    //     } catch (err) {
    //       handleError(res,err);
    //     }
    //   }

    async checkAuthorization(req: Request, res: Response, next: Function) {
      console.log("Checking TOKEN ownership");
      try {
        const authData = await new Promise((resolve, reject) => {
            if (typeof req.headers["authorization"] !== "undefined") {
              
              if(req.headers["authorization"] == "") throw {statusCode: 401, errorMessage:"Header de autorizacion presente pero vacio"};

              if(typeof process.env.SECRET != "undefined"){
                jwt.verify(req.headers["authorization"], process.env.SECRET , (err, authData) => {
                  if(typeof authData != undefined){
                    if("user_id" in authData){
                      req.body.user_id = authData.user_id;
                    }
                    if (err) throw({statusCode:500,errorMessage:"Hubo un error al intentar otorgar el token"});
                    else resolve(authData);  
                  }
                  
              });
              }

            } else {
              throw {statusCode: 401, errorMessage:"El token de ingreso no está presente"};
            }
        });
    
        next();
      } catch (err) {
        handleError(res,err);
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


