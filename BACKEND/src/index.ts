import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import post from "./routes/post.js";
import authControler from "./controllers/authControler.js";
//@ts-ignore
import pool from "./pool.js"; 
import { Request, Response } from "express";
import { createConnection } from "mysql2/promise";

const app = express();
const port = process.env.PORT || 3001;
const SECRET = process.env.SECRET as string || "default_secret";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//@ts-ignore
app.get("/ok",(req,res)=>{
    res.header('Content-Type', 'application/json');
    res.send("ok");
})

//Rutas sin token
app.get("/authorize/check", (req: Request, res: Response)=>{
    try{
        if(typeof req.headers["authorization"] !== "undefined"){
            jwt.verify(req.headers["authorization"], SECRET , (err,authData)=>{
                if(typeof authData == "undefined"){
                  throw err;
                }
                res.send(true);
              });
        }
        res.send(false);
    }
    catch(err){
        res.status(401).send(err);
    };
});
app.use("/signup",signup);
app.use("/login", login);

app.use(authControler.checkAuthorization);

app.use("/post",post);
//Rutas con token




app.use(function(err : Error, req: Request, res: Response, next: Function) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


app.listen(port,()=>{
    console.log("opa");
})