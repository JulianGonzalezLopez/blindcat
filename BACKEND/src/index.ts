import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import post from "./routes/post.js";
import authControler from "./controllers/authControler.js";

const app = express();
const port = process.env.PORT || 3001;
const SECRET = process.env.SECRET as string || "default_secret";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/ok",(req,res)=>{
    res.header('Content-Type', 'application/json');
    res.send("ok");
})

//Rutas sin token
app.use("/signup",signup);
app.use("/login", login);

app.use("/authorize/check", (req,res)=>{
    try{
        if(typeof req.headers["authorization"] !== "undefined"){
            jwt.verify(req.headers["authorization"], SECRET , (err,authData)=>{
                if(typeof authData == "undefined"){
                  throw "error";
                }
                res.send(true);
              });
        }
        res.send(false);
    }
    catch(err){
        res.send(false);
    };
});
app.use(authControler.checkAuthorization);

app.use("/post",post);
//Rutas con token

app.listen(port,()=>{
    console.log("opa");
})