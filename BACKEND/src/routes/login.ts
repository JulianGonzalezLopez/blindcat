import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthHelper from "../helpers/AuthHelper";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import UserController from "../controllers/UserController";
import AuthHelper from "../helpers/AuthHelper";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import { CommentRepository } from "../repositories/CommentRepository";
import PostUserService from "../services/PostUserService";
import PostUserRepository from "../repositories/PostUserRepository";
import PostService from "../services/PostService";
import PostRepository from "../repositories/PostRepository";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authHelper = new AuthHelper();

const UserC = new UserController(new UserService(new UserRepository()), new PostUserService( new PostUserRepository), new CommentService(new CommentRepository()), new PostService( new PostRepository()) , new AuthHelper());

router.post("/",UserC.loginUser.bind(UserC));





export default router;