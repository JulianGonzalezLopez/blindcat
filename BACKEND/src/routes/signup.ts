import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthHelper from "../helpers/AuthHelper";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";

const router = Router();
const UserC = new UserController(new UserService(new UserRepository()), new AuthHelper());

router.get("/",(req,res)=>{
    res.send("PAGINA SIGNUP");
});

router.post("/", UserC.createUser.bind(UserC)) //FALTA TEST

export default router;