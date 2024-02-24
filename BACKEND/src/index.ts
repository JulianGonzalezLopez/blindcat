import express from "express";
import cors from "cors";
import signup from "./controllers/signup";


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/ok",(req,res)=>{
    res.header('Content-Type', 'application/json');
    res.send("ok");
})

// app.post("/login", async (req,res)=>{
//     let val = await getUser(req.body);
//     if(val == true){
//         res.send({"en":{
//             username:req.body.username,
//             message:"Logged in"
//         }});
//     }
//     else{
//         console.log("nao");
//     }
// });

app.use(signup);



app.listen(port,()=>{
    console.log("opa");
})