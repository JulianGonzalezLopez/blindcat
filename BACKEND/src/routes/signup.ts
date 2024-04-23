import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthHelper from "../helpers/AuthHelper.js";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";

const router = Router();
const UserC = new UserController(new UserService(new UserRepository()), new AuthHelper());

router.get("/",(req,res)=>{
    res.send("PAGINA SIGNUP");
});

router.post("/", UserC.createUser) //FALTA TEST

export default router;