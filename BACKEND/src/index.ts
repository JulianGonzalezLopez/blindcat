import express from "express";
import cors from "cors";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import authControler from "./controllers/authControler.js";

const app = express();
const port = process.env.PORT || 3001;

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
app.use(authControler.checkAuthorization);


app.listen(port,()=>{
    console.log("opa");
})