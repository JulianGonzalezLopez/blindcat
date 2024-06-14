import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthHelper from "../helpers/AuthHelper";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authHelper = new AuthHelper();

const UserC = new UserController(userService, authHelper);
router.post("/",UserC.loginUser.bind(UserC));

export default router;