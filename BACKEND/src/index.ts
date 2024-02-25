import express from "express";
import cors from "cors";
import signup from "./routes/signup.js";


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/ok",(req,res)=>{
    res.header('Content-Type', 'application/json');
    res.send("ok");
})

app.use(signup);

app.listen(port,()=>{
    console.log("opa");
})