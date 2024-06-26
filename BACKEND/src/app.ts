import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import signup from "./routes/signup";
import login from "./routes/login";
import post from "./routes/post";
import AuthHelper from "./helpers/AuthHelper";
//@ts-ignore
import { Request, Response } from "express";
import { createConnection } from "mysql2/promise";

const app = express();
const port = process.env.PORT || 3001;
const SECRET = process.env.SECRET as string || "default_secret";
const AuthH = new AuthHelper();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    console.log("Authorization Header:", authorizationHeader);
    next();
  });

//@ts-ignore
app.get("/ok",(req,res)=>{
    res.header('Content-Type', 'application/json');
    res.status(200).end();
})

// //Rutas sin token
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
app.use(AuthH.checkAuthorization);
app.use("/post",post);

app.use(function(err : Error, req: Request, res: Response, next: Function) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});