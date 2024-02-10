const express = require("express");
const cors = require("cors");

const {createUser, getUser} = require("./model/users");

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
        res.send("ingresaste");
    }
    else{
        console.log("nao");
    }
});

app.post("/signup", async (req,res)=>{
    let {username, password} = req.body;
    console.log(username, " ",  password);
    await createUser(req.body);
    res.send("ingresaste");
});

app.listen(port,()=>{
    console.log("opa");
})