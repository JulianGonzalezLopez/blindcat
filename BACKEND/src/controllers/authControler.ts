import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request,Response } from "express";
dotenv.config();

const SECRET = process.env.SECRET as string || "default_secret"; // Usando una aserción de tipo


async function checkAuthorization(req: Request, res: Response, next: Function) {
  console.log("Checking TOKEN ownership");
  try {
    const authData = await new Promise((resolve, reject) => {
        if (typeof req.headers["authorization"] !== "undefined") {
            jwt.verify(req.headers["authorization"], SECRET, (err, authData) => {
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
    res.end(error);
  }
}

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