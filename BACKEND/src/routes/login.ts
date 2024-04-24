import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthHelper from "../helpers/AuthHelper.js";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authHelper = new AuthHelper();

const UserC = new UserController(userService, authHelper);
router.post("/",UserC.loginUser.bind(UserC));

export default router;