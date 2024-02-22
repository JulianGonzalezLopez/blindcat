import express from "express";
import cors from "cors";
/// @ts-ignore
import { createUser, getUser } from "./models/user"

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/ok",(req,res)=>{
    res.header('Content-Type', 'application/json');
    res.send("ok");
})

app.post("/login", async (req,res)=>{
    let val = await getUser(req.body);
    if(val == true){
        res.send({"en":{
            username:req.body.username,
            message:"Logged in"
        }});
    }
    else{
        console.log("nao");
    }
});

app.post("/signup", async (req,res)=>{
    let {username, password} = req.body;
    console.log(username, " ",  password);
    try{
        await createUser(req.body);
        res.json({en:"Signed up"});
    }
    catch(error){
        res.end();
    }
});

app.listen(port,()=>{
    console.log("opa");
})